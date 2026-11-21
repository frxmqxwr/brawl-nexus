/* NEXUS MAP DATA v1 — own deduplicated Supercell battle sample.
 * Public battle logs only, no credentials/personal information beyond public tags.
 * Win rates are observations from this crawler, NOT all Brawl Stars players. */
export const normMap=x=>String(x||'').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g,'');
export const normTag=x=>String(x||'').replace(/^#/,'').toUpperCase();
const safeName=x=>String(x||'').slice(0,80);
export function parseGame(row,ownerTag){
 const b=row?.battle||{}, evt=row?.event||{}, teams=b.teams;
 if(!Array.isArray(teams)||teams.length!==2||teams.some(t=>!Array.isArray(t)||t.length<1||t.length>5))return null;
 const mapName=String(evt.map||'').trim(),mode=String(evt.mode||b.mode||'').trim();
 if(!mapName||!mode||!row.battleTime)return null;
 const tags=teams.flatMap(t=>t.map(x=>normTag(x.tag))).filter(Boolean).sort();
 if(tags.length!==teams.flat().length||new Set(tags).size!==tags.length)return null;
 const owner=normTag(ownerTag),team=teams.findIndex(t=>t.some(x=>normTag(x.tag)===owner));
 if(team<0)return null;
 const result=String(b.result||'').toLowerCase();
 if(result!=='victory'&&result!=='defeat')return null;
 const winner=result==='victory'?team:1-team;
 const dateStr=String(row.battleTime);
 const time=/^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)/.exec(dateStr);
 if(!time)return null;
 const at=Date.parse(time[1]+'-'+time[2]+'-'+time[3]+'T'+time[4]+':'+time[5]+':'+time[6]+'Z');
 if(!Number.isFinite(at)||at>Date.now()+86400000||at<Date.now()-365*86400000)return null;
 const players=teams.flatMap((t,i)=>t.map(x=>({
  tag:normTag(x.tag),name:safeName(x.brawler?.name||''),brawlerId:Number(x.brawler?.id||0),
  trophies:Number.isFinite(Number(x.brawler?.trophies))?Number(x.brawler.trophies):null,team:i,
  won:i===winner?1:0,star:normTag(b.starPlayer?.tag)===normTag(x.tag)?1:0
 })));
 if(players.some(x=>!x.name||!Number.isSafeInteger(x.brawlerId)||x.brawlerId<1))return null;
 const trophies=players.map(x=>x.trophies).filter(x=>x!==null&&x>=0);
 const average=trophies.length>=players.length-1?trophies.reduce((a,b)=>a+b,0)/trophies.length:null;
 const band=average===null?'unknown':average<500?'0-499':average<1000?'500-999':'1000+';
 const id=[dateStr,mode,mapName,...tags].join('|');
 return {id,mapName,mapKey:normMap(mapName),mode,playedAt:new Date(at).toISOString(),band,winner,teamSize:teams[0].length,
  players,at};
}
export async function storeBattleLog(db,tag,logs){
 if(!db||!Array.isArray(logs))return {added:0,players:0};
 const games=logs.slice(0,25).map(x=>parseGame(x,tag)).filter(Boolean);
 let added=0,players=0;
 for(const g of games){
  try{
   // Insert one match at a time; D1 batch applies its writes transactionally.
   const statements=[
    db.prepare('INSERT OR IGNORE INTO meta_matches(id,map_key,map_name,mode,played_at,band,winner_team,team_size,observed_at) VALUES(?,?,?,?,?,?,?,?,?)')
      .bind(g.id,g.mapKey,g.mapName,g.mode,g.playedAt,g.band,g.winner,g.teamSize,Date.now()),
    ...g.players.map(x=>db.prepare('INSERT OR IGNORE INTO meta_picks(match_id,player_tag,brawler_id,brawler_name,team_idx,won,trophies,star) VALUES(?,?,?,?,?,?,?,?)')
      .bind(g.id,x.tag,x.brawlerId,x.name,x.team,x.won,x.trophies,x.star))
   ];
   await db.batch(statements);added++;players+=g.players.length;
  }catch{ /* Invalid/old schema? Other matches may still be imported. */ }
 }
 return {added,players};
}
const limitInt=(x,d=100)=>Math.max(0,Math.min(1000,Number(x)||d));
export async function readMapIntel(db,mapName,mode='',band='all'){
 if(!db||!mapName)return null;
 const key=normMap(mapName);
 if(!key||key.length>100)return null;
 const safeBand=['all','0-499','500-999','1000+'].includes(band)?band:'all';
 const conditions=['m.map_key=?'],params=[key];
 if(mode){conditions.push('LOWER(m.mode)=LOWER(?)');params.push(String(mode).slice(0,70))}
 if(safeBand!=='all'){conditions.push('m.band=?');params.push(safeBand)}
 const where=conditions.join(' AND ');
 const count=await db.prepare('SELECT COUNT(*) n,MAX(m.played_at) newest,MIN(m.played_at) oldest,SUM(m.team_size*2) pick_slots FROM meta_matches m WHERE '+where).bind(...params).first();
 const n=Number(count?.n||0);
 if(!n)return {source:'nexus-d1',sample:0,stats:[],teams:[],pairs:[],counters:[],updatedAt:null,band:safeBand,mapName};
 const statsQ='SELECT p.brawler_id id,MAX(p.brawler_name) name,COUNT(*) picks,SUM(p.won) wins,SUM(p.star) stars FROM meta_picks p JOIN meta_matches m ON m.id=p.match_id WHERE '+where+' GROUP BY p.brawler_id ORDER BY picks DESC LIMIT 160';
 const statsR=await db.prepare(statsQ).bind(...params).all();
 const slots=Number(count.pick_slots)||n*6;
 const stats=(statsR.results||[]).map(x=>{const games=Number(x.picks)||0,wins=Number(x.wins)||0;return {
  brawlerId:Number(x.id),name:x.name,winRate:Math.round(1000*wins/games)/10,
  useRate:Math.round(10000*games/slots)/100,sampleSize:games,wins,starRate:Math.round(1000*Number(x.stars||0)/games)/10
 }});
 // Real same-team pairs and opponent matchups; no inferred correlations from unrelated matches.
 const pairQ='SELECT a.brawler_id a, b.brawler_id b, COUNT(*) games,SUM(a.won) wins FROM meta_picks a JOIN meta_picks b ON a.match_id=b.match_id AND a.team_idx=b.team_idx AND a.brawler_id<b.brawler_id JOIN meta_matches m ON m.id=a.match_id WHERE '+where+' GROUP BY a.brawler_id,b.brawler_id HAVING COUNT(*)>=5 ORDER BY games DESC LIMIT 80';
 const pairsR=await db.prepare(pairQ).bind(...params).all();
 const pairRows=(pairsR.results||[]).map(x=>({a:Number(x.a),b:Number(x.b),games:Number(x.games),wins:Number(x.wins),winRate:Math.round(1000*Number(x.wins)/Number(x.games))/10}));
 const teamQ='SELECT a.brawler_id a,b.brawler_id b,c.brawler_id c,COUNT(*) games,SUM(a.won) wins FROM meta_picks a JOIN meta_picks b ON a.match_id=b.match_id AND a.team_idx=b.team_idx AND a.brawler_id<b.brawler_id JOIN meta_picks c ON a.match_id=c.match_id AND a.team_idx=c.team_idx AND b.brawler_id<c.brawler_id JOIN meta_matches m ON m.id=a.match_id WHERE '+where+' AND m.team_size=3 GROUP BY a.brawler_id,b.brawler_id,c.brawler_id HAVING COUNT(*)>=5 ORDER BY games DESC LIMIT 60';
 const teamR=await db.prepare(teamQ).bind(...params).all();
 const teams=(teamR.results||[]).map(x=>({ids:[x.a,x.b,x.c].map(Number),games:Number(x.games),winRate:Math.round(1000*Number(x.wins)/Number(x.games))/10}));
 const counterQ='SELECT a.brawler_id a,b.brawler_id b,COUNT(*) games,SUM(a.won) wins FROM meta_picks a JOIN meta_picks b ON a.match_id=b.match_id AND a.team_idx!=b.team_idx AND a.brawler_id!=b.brawler_id JOIN meta_matches m ON m.id=a.match_id WHERE '+where+' GROUP BY a.brawler_id,b.brawler_id HAVING COUNT(*)>=10 ORDER BY games DESC LIMIT 160';
 const counterR=await db.prepare(counterQ).bind(...params).all();
 const counters=(counterR.results||[]).map(x=>({a:Number(x.a),b:Number(x.b),games:Number(x.games),winRate:Math.round(1000*Number(x.wins)/Number(x.games))/10}));
 return {source:'nexus-d1',mapName,sample:n,totalPicks:slots,updatedAt:count.newest,oldestAt:count.oldest,band:safeBand,stats,teams,pairs:pairRows,counters};
}
export async function readMetaStatus(db){
 if(!db)return {configured:false,matches:0,players:0};
 const games=await db.prepare('SELECT COUNT(*) n,MAX(played_at) last_match FROM meta_matches').first();
 const picks=await db.prepare('SELECT COUNT(DISTINCT player_tag) n FROM meta_picks').first();
 const maps=await db.prepare('SELECT COUNT(DISTINCT map_key) n FROM meta_matches').first();
 return {configured:true,matches:Number(games?.n||0),players:Number(picks?.n||0),maps:Number(maps?.n||0),latest:games?.last_match||null};
}
