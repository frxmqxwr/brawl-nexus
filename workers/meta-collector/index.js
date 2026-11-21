import {storeBattleLog,normTag} from '../../lib/nexus-map-data.js';
/** Hourly opt-in crawler. Requires META_DB D1 and secret BRAWL_API_TOKEN.
 * Bootstraps from the global Supercell leaderboard, then explores teammates/opponents.
 * Small bounded crawl; limit 8 players per run to respect API and D1 quotas.
 */
async function api(env,path){
 const base=String(env.BRAWL_API_BASE_URL||'https://api.brawlstars.com/v1').replace(/\/+$/,'');
 const r=await fetch(base+path,{headers:{Authorization:'Bearer '+env.BRAWL_API_TOKEN,Accept:'application/json'},signal:AbortSignal.timeout(9000)});
 if(!r.ok)throw Error('Supercell '+r.status+' '+path.split('/').slice(0,3).join('/'));
 return r.json();
}
export default{
 async scheduled(event,env,ctx){
  if(!env.META_DB||!env.BRAWL_API_TOKEN)return;
  const now=Date.now(),db=env.META_DB;
  // Leaderboard data provides real tags to seed the crawler.
  try{
   const leaders=await api(env,'/rankings/global/players?limit=45');
   const tags=(leaders.items||[]).map(x=>normTag(x.tag)).filter(t=>/^[0289PYLQGRJCUV]{3,14}$/.test(t)).slice(0,45);
   if(tags.length)await db.batch(tags.map(t=>db.prepare('INSERT OR IGNORE INTO meta_crawl_queue(tag,due_at,last_polled) VALUES(?,0,0)').bind(t)));
  }catch{}
  const due=await db.prepare('SELECT tag FROM meta_crawl_queue WHERE due_at<=? ORDER BY last_polled ASC LIMIT 8').bind(now).all();
  const rows=due.results||[];
  let count=0;
  for(const x of rows){
    try{
      const log=await api(env,'/players/'+encodeURIComponent('#'+x.tag)+'/battlelog');
      await storeBattleLog(db,'#'+x.tag,log.items||[]);
      // Expand to participants that have appeared in real matches. Bounded and deduplicated.
      const peers=(log.items||[]).flatMap(y=>(y.battle?.teams||[]).flat().map(z=>normTag(z?.tag)))
        .filter(t=>/^[0289PYLQGRJCUV]{3,14}$/.test(t)&&t!==x.tag).slice(0,60);
      const unique=[...new Set(peers)].slice(0,30);
      if(unique.length)await db.batch(unique.map(t=>db.prepare('INSERT OR IGNORE INTO meta_crawl_queue(tag,due_at,last_polled) VALUES(?,0,0)').bind(t)));
      count++;
      await db.prepare('UPDATE meta_crawl_queue SET due_at=?,last_polled=? WHERE tag=?').bind(now+6*60*60*1000,now,x.tag).run();
    }catch{
      await db.prepare('UPDATE meta_crawl_queue SET due_at=?,last_polled=? WHERE tag=?').bind(now+60*60*1000,now,x.tag).run().catch(()=>{});
    }
  }
  console.log('NEXUS meta crawl: '+count+' of '+rows.length+' players collected');
 },
 async fetch(){return new Response('NEXUS meta collector: scheduled ingestion only',{headers:{'Content-Type':'text/plain'}})}
};
