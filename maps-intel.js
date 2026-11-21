/* NEXUS MAP INTELLIGENCE — complete map catalog, real source-aware meta and own battles. */
(()=>{
'use strict';
let current='',search='',mode='all',filter='active',band='all',owned=false,limit=36,enemy=0,view='picks';
let state=null,u=null;
const cache=new Map(),pending=new Set();
const q=x=>String(x??'').trim().toLowerCase().replace(/[^a-z0-9]/g,'');
const esc=x=>u.esc(String(x??''));
const mapMode=m=>String(m?.gameMode?.name||m?.mode||'');
const mapList=()=>Array.isArray(state?.allMaps)?state.allMaps:Array.isArray(state?.maps)?state.maps:[];
const currentMap=()=>mapList().find(m=>String(m.id)===String(current))||null;
const currentRotation=m=>Array.isArray(state?.rotationEvents)&&state.rotationEvents.some(x=>String(x.mapId||'')===String(m.id)||q(x.map)===q(m.name));
const ownedSet=()=>new Set((state?.player?.brawlers||[]).map(x=>q(x.name)));
const tr=x=>window.NexusLocale?.translate(x)||x;
function localHistory(map){
 const player=state?.player,game=window.NexusInsights?.getHistory(player,state?.battles||[])?.battles||state?.battles||[];
 const relevant=game.filter(x=>q(x?.event?.map)===q(map.name));
 const summary={games:0,wins:0,losses:0,rows:[]},bs=new Map();
 for(const row of relevant){
  const [result]=u.battleOutcome(row);
  if(!['win','loss'].includes(result))continue;
  summary.games++;if(result==='win')summary.wins++;else summary.losses++;
  const players=(row.battle?.teams||[]).flat();
  const me=players.find(x=>String(x.tag||'').replace('#','')===String(player?.tag||'').replace('#',''));
  const b=me?.brawler?.name||row.battle?.players?.find(x=>String(x.tag||'')===String(player?.tag||''))?.brawler?.name;
  if(!b)continue;
  const r=bs.get(b)||{name:b,wins:0,losses:0,games:0};
  r.games++;if(result==='win')r.wins++;else r.losses++;bs.set(b,r);
 }
 summary.rows=[...bs.values()].sort((a,b)=>b.games-a.games);return summary;
}
function archive(map){
 // Curated subset of the concrete Quintillion example supplied in chat.
 // NOT live, NOT a licensed Brawlify feed, and no made-up per-brawler match counts.
 if(q(map.name)!=='quintillion'||q(mapMode(map))!=='heist'||band!=='all')return null;
 const rows=[
 ['NORI',62,4.8],['MELODIE',59,5.0],['GIGI',59,1.0],['MICO',57,2.6],
 ['NITA',57,4.0],['BULL',56,1.8],['KAZE',55,1.9],['GRIFF',55,2.3],
 ['BIBI',54,1.9],['JESSIE',53,5.3],['8-BIT',53,3.5],['SIRIUS',53,1.1],
 ['EDGAR',51,5.1],['COLT',47,4.1],['TICK',34,0.5],['ANGELO',33,0.1]
 ];
 const teams=[
 [['JESSIE','MELODIE','NORI'],81,530],
 [['JESSIE','NITA','MELODIE'],75,710],
 [['NITA','MELODIE','NORI'],73,520],
 [['MICO','MELODIE','NORI'],71,450],
 [['JESSIE','EDGAR','MELODIE'],69,450],
 [['COLT','COLETTE','MELODIE'],68,500],
 [['EDGAR','MELODIE','NORI'],66,440]
 ];
 return {source:'shared-reference',provider:'Brawlify — snapshot provided by user',sample:429090,window:'31d (shared snapshot)',updatedAt:null,
  stats:rows.map(([name,winRate,useRate])=>({name,winRate,useRate,sampleSize:null})),
  teams:teams.map(([names,winRate,games])=>({names,winRate,games})),pairs:[],counters:[]};
}
function metaFor(map){
 const key=String(map.id)+'|'+band;
 const found=cache.get(key);
 if(found?.stats?.length&&Number(found.sample||0)>=20)return found;
 return archive(map)||found||null;
}
function fetchIntel(map){
 if(!map?.id)return;
 const k=String(map.id)+'|'+band;
 if(cache.has(k)||pending.has(k))return;
 pending.add(k);
 const params=new URLSearchParams({mapId:String(map.id),map:String(map.name),mode:q(mapMode(map)),band});
 u.apiRequest('/api/map-intel?'+params.toString()).then(result=>{
  cache.set(k,result&&typeof result==='object'?result:{source:'unavailable',stats:[]});
 }).catch(e=>cache.set(k,{source:'error',stats:[],error:String(e.message||e)}))
 .finally(()=>{pending.delete(k);if(state?.page==='maps'&&String(current)===String(map.id))render(state,u)});
}
function readable(s){return s!==null&&s!==undefined&&s!==''&&Number.isFinite(Number(s))?Math.round(Number(s)*10)/10+'%':'—'}
function chip(name,cls=''){return '<span class="mi-chip '+cls+'">'+name+'</span>'}
function brawler(name){
 const b=state?.catalog?.find(x=>q(x.name)===q(name));
 return b?u.bimg(b.name):'<span class="mi-brawler-fallback">'+esc(name).slice(0,2)+'</span>';
}
function brawlName(id){return state?.catalog?.find(x=>String(x.id)===String(id))?.name||''}
function brawlerRank(row){
 const n=Number(row.sampleSize||0),rate=Number(row.winRate);
 // Wilson lower bound, small sample protection; archives don't claim measured sample per pick.
 if(!Number.isFinite(rate))return -99;
 if(!n)return rate*0.5 + Number(row.useRate||0)*0.3;
 const p=rate/100,z=1.96;
 const w=(p+z*z/(2*n)-z*Math.sqrt((p*(1-p)+z*z/(4*n))/n))/(1+z*z/n);
 return w*100 + Math.min(3,Number(row.useRate||0)*0.3);
}
function rowStats(row){
 return '<div class="mi-pick"><div class="mi-pick-person">'+brawler(row.name||brawlName(row.brawlerId))+'<strong>'+esc(row.name||brawlName(row.brawlerId)||'Brawler')+'</strong></div>'+
 '<div class="mi-stat"><b>'+readable(row.winRate)+'</b><small>WIN RATE</small></div>'+
 '<div class="mi-stat"><b>'+readable(row.useRate)+'</b><small>USE RATE</small></div>'+
 '<div class="mi-stat mi-count"><b>'+(row.sampleSize?u.fmt(row.sampleSize):'—')+'</b><small>GAMES</small></div></div>';
}
function pills(){
 return '<div class="mi-bands">'+['all','0-499','500-999','1000+'].map(x=>'<button type="button" data-mi-band="'+x+'" class="'+(band===x?'active':'')+'">'+(x==='all'?'ВСЕ КУБКИ':x)+'</button>').join('')+'</div>';
}
function overview(map,data){
 const source=data?.source||'unavailable',archiveData=source==='shared-reference',live=source==='nexus-d1',external=source==='configured-statistics-provider';
 const status=live?'СОБСТВЕННАЯ ВЫБОРКА':external?'ВНЕШНИЙ ПРОВАЙДЕР':archiveData?'АРХИВНЫЙ ПРИМЕР':'НЕТ СТАТИСТИКИ';
 const note=live?'Реальные результаты, накопленные NEXUS через Supercell API. Выборка не репрезентирует всех игроков.':
  external?'Показатели предоставлены подключённым внешним источником. Сверяй размер и дату выборки.':
  archiveData?'Числа из присланного примера Brawlify для Quintillion. Не текущая мета и не LIVE статистика.':
  'Пока нет массовой выборки для этой карты. Тактические варианты ниже не являются измеренными винрейтами.';
 const mine=localHistory(map);
 return '<div class="mi-hero">'+
 '<div class="mi-map-art">'+(map.imageUrl?'<img loading="lazy" src="'+esc(map.imageUrl)+'" alt="'+esc(map.name)+'">':'<span>MAP</span>')+'</div>'+
 '<div class="mi-hero-text"><div class="mi-super">NEXUS / MAP INTELLIGENCE</div><h2>'+esc(map.name)+'</h2><div class="mi-metadata">'+u.uiPackImg('trophy')+' '+esc(u.modeName(mapMode(map)))+' '+(currentRotation(map)?chip('● LIVE ROTATION','live'):chip('MAP CATALOG'))+'</div>'+
 '<p>'+note+'</p><div class="mi-kpis">'+
 '<div><span>МАТЧЕЙ В ВЫБОРКЕ</span><b>'+(data?.sample?u.fmt(data.sample):'—')+'</b></div>'+
 '<div><span>ТВОИ БОИ</span><b>'+mine.games+'</b></div>'+
 '<div><span>ТВОЙ ВИНРЕЙТ</span><b>'+(mine.games?readable(mine.wins/mine.games*100):'—')+'</b></div>'+
 '</div><div class="mi-attribution">'+chip(status,live?'live':'')+' '+esc(data?.provider||data?.source||'')+(data?.updatedAt?' · '+esc(new Date(data.updatedAt).toLocaleDateString('ru-RU')):'')+'</div></div></div>';
}
function list(map,data){
 const all=Array.isArray(data?.stats)?data.stats.filter(x=>Number.isFinite(Number(x.winRate))):[];
 const own=ownedSet();
 const filtered=owned?all.filter(x=>own.has(q(x.name||brawlName(x.brawlerId)))):all;
 const popular=[...filtered].sort((a,b)=>Number(b.useRate||0)-Number(a.useRate||0)).slice(0,12);
 const winners=[...filtered].filter(x=>!x.sampleSize||x.sampleSize>=20).sort((a,b)=>brawlerRank(b)-brawlerRank(a)).slice(0,12);
 const tabs='<div class="mi-tabs">'+[['picks','УМНЫЕ ПИКИ'],['popular','ЧАЩЕ ВЫБИРАЮТ'],['squads','СИЛЬНЫЕ СВЯЗКИ'],['counters','КОНТРПИКИ']].map(([k,label])=>'<button type="button" data-mi-view="'+k+'" class="'+(view===k?'active':'')+'">'+label+'</button>').join('')+'</div>';
 let body='';
 if(view==='picks'||view==='popular'){
  const rows=view==='picks'?winners:popular;
  body=rows.length?'<div class="mi-pick-list">'+rows.map(rowStats).join('')+'</div>':
   '<div class="mi-none">Недостаточно проверенных данных. Подключи статистический источник или накопи матчи в NEXUS.</div>';
  if(!rows.length){
    const heuristic=u.rotationPicksFor({name:map.name,mode:mapMode(map)}).slice(0,5);
    if(heuristic.length)body+='<div class="mi-heuristic"><strong>ТАКТИЧЕСКИЕ ВАРИАНТЫ · НЕ WIN RATE</strong><div>'+heuristic.map(n=>'<span>'+brawler(n)+'<b>'+esc(n)+'</b></span>').join('')+'</div></div>';
  }
 }else if(view==='squads'){
  const rows=(data?.teams||[]).filter(x=>Array.isArray(x.names||x.ids)&&Number(x.games)>=5).sort((a,b)=>Number(b.winRate)-Number(a.winRate)).slice(0,15);
  body=rows.length?'<div class="mi-team-list">'+rows.map(t=>'<div class="mi-team"><div>'+((t.names||t.ids.map(brawlName)).filter(Boolean)).map(n=>'<span>'+brawler(n)+'<b>'+esc(n)+'</b></span>').join('')+'</div><strong>'+readable(t.winRate)+'</strong><small>'+u.fmt(t.games)+' игр</small></div>').join('')+'</div>':
  '<div class="mi-none">Нужна реальная выборка полных команд. Без неё NEXUS не выдумывает проценты побед для связок.</div>';
 }else{
  const counters=data?.counters||[],ids=[...new Set(counters.map(x=>x.b))].slice(0,65);
  const chosen=Number(enemy)||Number(ids[0])||0;
  const rows=counters.filter(x=>Number(x.b)===chosen&&Number(x.games)>=10).sort((a,b)=>Number(b.winRate)-Number(a.winRate)).slice(0,12);
  body='<label class="mi-counter-picker">ПРОТИВ КОГО? <select data-mi-enemy><option value="0">ВЫБЕРИ БОЙЦА</option>'+ids.map(id=>'<option value="'+id+'" '+(chosen===Number(id)?'selected':'')+'>'+esc(brawlName(id)||id)+'</option>').join('')+'</select></label>'+
  (rows.length?'<div class="mi-pick-list">'+rows.map(x=>rowStats({name:brawlName(x.a),winRate:x.winRate,sampleSize:x.games,useRate:null})).join('')+'</div>':
   '<div class="mi-none">Нет достаточного числа прямых встреч (минимум 10) для этих бойцов на данной карте. Общий винрейт не доказывает, что боец является контрпиком.</div>');
 }
 return '<section class="mi-board">'+tabs+
 '<div class="mi-toolbar">'+pills()+'<button data-mi-owned type="button" class="'+(owned?'active':'')+'" '+(!state.player?.brawlers?.length?'disabled':'')+'>'+u.uiPackImg('contact-round')+' ТОЛЬКО МОИ БОЙЦЫ</button></div>'+
 body+'<p class="mi-method">WIN RATE = победы / известные исходы. USE RATE = доля пиков среди всех участников. Выборки из D1 собираются только по доступным боям. Малые выборки не считаются надёжными.</p></section>';
}
function mapCards(){
 let maps=mapList().filter(m=>m&&m.id&&m.imageUrl);
 if(filter==='active')maps=maps.filter(m=>!m.disabled);
 if(filter==='rotation')maps=maps.filter(currentRotation);
 if(mode!=='all')maps=maps.filter(m=>q(mapMode(m))===q(mode));
 if(search)maps=maps.filter(m=>q(m.name).includes(q(search))||String(m.name).toLowerCase().includes(search.toLowerCase()));
 const modes=[...new Set(mapList().map(mapMode).filter(Boolean))].sort();
 return '<div class="mi-library"><div class="mi-library-header"><div><span>NEXUS / MAP DATABASE</span><h1>БАЗА <em>КАРТ.</em></h1><p>Все карты каталога, текущая ротация и доступная статистика.</p></div>'+chip(maps.length+' КАРТ','')+'</div>'+
 '<div class="mi-library-controls"><input id="miMapSearch" value="'+esc(search)+'" placeholder="ПОИСК КАРТЫ..." aria-label="Поиск карты"><select id="miModeFilter"><option value="all">ВСЕ РЕЖИМЫ</option>'+modes.map(m=>'<option '+(mode===m?'selected':'')+' value="'+esc(m)+'">'+esc(m)+'</option>').join('')+'</select>'+
 '<select id="miMapFilter">'+[['active','АКТУАЛЬНЫЙ КАТАЛОГ'],['rotation','СЕЙЧАС В РОТАЦИИ'],['all','ВСЕ, ВКЛЮЧАЯ СТАРЫЕ']].map(([v,l])=>'<option value="'+v+'" '+(filter===v?'selected':'')+'>'+l+'</option>').join('')+'</select></div>'+
 '<div class="mi-catalog">'+maps.slice(0,limit).map(m=>'<button type="button" class="mi-map-card '+(String(m.id)===String(current)?'selected':'')+'" data-mi-map="'+esc(m.id)+'"><span class="mi-map-art"><img loading="lazy" src="'+esc(m.imageUrl)+'" alt=""></span><span class="mi-map-card-meta"><b>'+esc(m.name)+'</b><small>'+esc(mapMode(m))+'</small>'+(currentRotation(m)?'<i>● LIVE</i>':'')+'</span></button>').join('')+'</div>'+
 (!maps.length?'<div class="mi-none">Карты не найдены. Измени фильтры или дождись загрузки каталога.</div>':'')+
 (maps.length>limit?'<button class="mi-more" type="button" data-mi-more>ПОКАЗАТЬ ЕЩЁ ('+(maps.length-limit)+')</button>':'')+'</div>';
}
function render(s,utils){
 state=s;u=utils;
 const root=document.getElementById('page-maps');if(!root)return;
 const maps=mapList();
 if(!current||!maps.some(m=>String(m.id)===String(current))){const init=maps.find(x=>currentRotation(x)&&!x.disabled)||maps.find(x=>q(x.name)==='quintillion'&&!x.disabled)||maps.find(x=>!x.disabled)||maps[0];current=init?String(init.id):''}
 const map=currentMap();
 root.innerHTML='<div class="mi-shell">'+mapCards()+(map?'<div class="mi-detail">'+overview(map,metaFor(map))+list(map,metaFor(map))+
 '<div class="mi-footer"><button class="mi-draft-btn" type="button" data-mi-draft>'+u.uiPackImg('star')+' ОТКРЫТЬ ДРАФТ ДЛЯ ЭТОЙ КАРТЫ</button>'+
 '<a href="'+esc(map.link&&/^https:\/\/brawlify\.com\/maps\//.test(map.link)?map.link:'https://brawlify.com/maps/'+map.id)+'" target="_blank" rel="noopener">ПРОВЕРИТЬ ДАННЫЕ В BRAWLIFY ↗</a></div></div>':
 '<div class="mi-none">Загружаем каталог BrawlAPI…</div>')+'</div>';
 if(map)fetchIntel(map);
 u.learnIcons();
}
function selectMap(id){
 current=String(id);band='all';view='picks';enemy=0;
 if(state&&u){render(state,u);document.getElementById('page-maps')?.scrollIntoView({behavior:'smooth',block:'start'})}
}
function init(){
 document.addEventListener('click',e=>{
  const map=e.target.closest('[data-mi-map]');if(map){selectMap(map.dataset.miMap);return}
  const f=e.target.closest('[data-mi-band]');if(f){band=f.dataset.miBand;render(state,u);return}
  const v=e.target.closest('[data-mi-view]');if(v){view=v.dataset.miView;render(state,u);return}
  if(e.target.closest('[data-mi-owned]')){owned=!owned;render(state,u);return}
  if(e.target.closest('[data-mi-more]')){limit+=36;render(state,u);return}
  if(e.target.closest('[data-mi-draft]')){
   const m=currentMap();if(!m||!u?.openPage)return;
   state.draft.playlist='trophy';state.draft.trophyMode=mapMode(m);state.draft.trophyMapName=String(m.name);
   if(typeof u.draftSave==='function')u.draftSave();
   u.openPage('meta');return;
  }
 });
 document.addEventListener('input',e=>{
  if(e.target?.id==='miMapSearch'){search=e.target.value;limit=36;render(state,u);const x=document.getElementById('miMapSearch');x?.focus();x?.setSelectionRange(search.length,search.length)}
 });
 document.addEventListener('change',e=>{
  if(e.target?.id==='miModeFilter'){mode=e.target.value;limit=36;render(state,u)}
  if(e.target?.id==='miMapFilter'){filter=e.target.value;limit=36;render(state,u)}
  if(e.target?.matches('[data-mi-enemy]')){enemy=Number(e.target.value);render(state,u)}
 });
}
window.NexusMapIntel={render,selectMap,ready:init};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();
