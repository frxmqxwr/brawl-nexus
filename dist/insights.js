/* BRAWL // NEXUS — Insights / honest per-device history and battle analysis.
   The official API has only the most recent matches. Never claim full Brawlify history. */
(()=>{
'use strict';
const PREFIX='bn_insights_v2_';
const MAX_BATTLES=700, MAX_POINTS=150;
const norm=t=>String(t||'').toUpperCase().replace(/[^0289PYLQGRJCUV]/g,'');
const safeTag=t=>norm(t).slice(0,15);
const storageKey=t=>PREFIX+safeTag(t);
function load(t){
 const key=storageKey(t);if(!safeTag(t))return {battles:[],points:[]};
 try{
 const raw=JSON.parse(localStorage.getItem(key)||'null');
 return {battles:Array.isArray(raw?.battles)?raw.battles.slice(0,MAX_BATTLES):[],
         points:Array.isArray(raw?.points)?raw.points.slice(-MAX_POINTS):[]};
 }catch{return {battles:[],points:[]}}
}
function battleId(x){
 const b=x?.battle||{},evt=x?.event||{};
 const time=String(x?.battleTime||''),mode=String(evt.mode||b.mode||'');
 const team=Array.isArray(b.teams)?b.teams.flat().map(p=>String(p?.tag||'')).join('-'):Array.isArray(b.players)?b.players.map(p=>String(p?.tag||'')).join('-'):'';
 return [time,mode,evt.map||'',b.result||b.rank||'',b.trophyChange??'',team].join('|');
}
function capture(p,recent){
 if(!p?.tag)return;
 const old=load(p.tag),seen=new Map();
 for(const x of old.battles){if(x?.battleTime)seen.set(battleId(x),x)}
 if(Array.isArray(recent)){for(const x of recent){if(x?.battleTime)seen.set(battleId(x),x)}}
 const battles=[...seen.values()].sort((a,b)=>String(b.battleTime).localeCompare(String(a.battleTime))).slice(0,MAX_BATTLES);
 const points=old.points.slice();
 if(Number.isFinite(Number(p.trophies))&&p.trophies!==null){
   const n=Number(p.trophies),now=Date.now(),prev=points[points.length-1];
   if(!prev||prev.trophies!==n||now-prev.at>12*60*60*1000)points.push({at:now,trophies:n});
 }
 const next={battles,points:points.slice(-MAX_POINTS)};
 try{localStorage.setItem(storageKey(p.tag),JSON.stringify(next))}catch{ /* storage full or unavailable: still show recent battles */ }
}
function getHistory(p,latest=[]){
 if(!p?.tag)return {battles:[],points:[]};
 const previous=load(p.tag),m=new Map();
 for(const x of [...previous.battles,...(Array.isArray(latest)?latest:[])])if(x?.battleTime)m.set(battleId(x),x);
 return {battles:[...m.values()].sort((a,b)=>String(b.battleTime).localeCompare(String(a.battleTime))).slice(0,MAX_BATTLES),points:previous.points};
}
function calc(p,latest,util){
 const hist=getHistory(p,latest),battles=hist.battles,owned=Array.isArray(p?.brawlers)?p.brawlers:[];
 const groups=new Map(),maps=new Map(),allies=new Map();
 const outcome=util.battleOutcome;
 let wins=0,losses=0,star=0;
 for(const x of battles){
  const b=x.battle||{},res=outcome(x)[0],name=x.event?.mode||b.mode||'Unknown';
  if(res==='win')wins++;if(res==='loss')losses++;
  if(b.starPlayer?.tag&&norm(b.starPlayer.tag)===norm(p.tag))star++;
  const m=groups.get(name)||{name,all:0,w:0,l:0};
  m.all++;if(res==='win')m.w++;if(res==='loss')m.l++;groups.set(name,m);
  const mapName=String(x.event?.map||'').trim();
  if(mapName){const t=maps.get(mapName)||{name:mapName,all:0,w:0,l:0};t.all++;if(res==='win')t.w++;if(res==='loss')t.l++;maps.set(mapName,t)}
  const teams=Array.isArray(b.teams)?b.teams:[];
  const own=teams.find(team=>Array.isArray(team)&&team.some(y=>norm(y?.tag)===norm(p.tag)));
  if(own){
    for(const mate of own)if(mate?.tag&&norm(mate.tag)!==norm(p.tag)){
      const tag=norm(mate.tag),v=allies.get(tag)||{name:mate.name||tag,tag,all:0,w:0,l:0};
      v.all++;if(res==='win')v.w++;if(res==='loss')v.l++;allies.set(tag,v);
    }
  }
 }
 const valid=wins+losses;
 const bestMap=[...maps.values()].filter(x=>x.w+x.l>=3).sort((a,b)=>(b.w/(b.w+b.l))-(a.w/(a.w+a.l))||b.all-a.all).slice(0,5);
 const modes=[...groups.values()].sort((a,b)=>b.all-a.all).slice(0,6);
 const teammates=[...allies.values()].sort((a,b)=>b.all-a.all).slice(0,5);
 const cutoffs=[300,500,750,1000,1250].map(n=>({value:n,count:owned.filter(b=>Number(b.trophies)>=n).length}));
 const levelCount=[9,10,11].map(n=>({level:n,count:owned.filter(b=>Number(b.power)===n).length}));
 const totalWithEquipment=owned.filter(b=>Array.isArray(b.gadgets)&&Array.isArray(b.starPowers));
 const gadgetCount=totalWithEquipment.length?owned.reduce((n,b)=>n+(Array.isArray(b.gadgets)?b.gadgets.length:0),0):null;
 const starCount=totalWithEquipment.length?owned.reduce((n,b)=>n+(Array.isArray(b.starPowers)?b.starPowers.length:0),0):null;
 return {hist,battles,valid,wins,losses,star,modeStats:modes,mapStats:bestMap,teammates,cutoffs,levelCount,gadgetCount,starCount,owned};
}
function render(p,recent,util){
 const u=util,esc=u.esc,fmt=u.fmt,gameIcon=u.uiPackImg,modeName=u.modeName;
 if(!p?.tag)return '<div class="ni-empty">Подключи профиль, чтобы открыть расширенную статистику.</div>';
 const data=calc(p,recent,u);
 const {hist,battles,valid,wins,losses,star,modeStats,mapStats,teammates,cutoffs,levelCount,owned}=data;
 const rate=(w,l)=>w+l?Math.round(100*w/(w+l))+'%':'—';
 const value=(v)=>typeof v==='string'?v:Number.isFinite(v)?fmt(v):'—';
 const section=(title,caption,body)=>'<section class="ni-section"><div class="ni-head"><h3>'+title+'</h3><small>'+caption+'</small></div>'+body+'</section>';
 const meter=(label,stat,max,color)=>'<div class="ni-meter"><div class="ni-meter-top"><span>'+label+'</span><b>'+value(stat)+'</b></div><div class="ni-meter-line"><i style="width:'+Math.max(0,Math.min(100,100*stat/Math.max(1,max)))+'%;--ni-meter:'+color+'"></i></div></div>';
 const metrics='<div class="ni-kpis">'+[
  [gameIcon('trophy'),'ИЗУЧЕНО БОЁВ',battles.length],
  [gameIcon('award'),'ПОБЕДЫ',wins],
  [gameIcon('shield'),'ПОРАЖЕНИЯ',losses],
  [gameIcon('star'),'ВИНРЕЙТ',rate(wins,losses)],
  [gameIcon('crown'),'STAR PLAYER',star]
 ].map(([i,k,v])=>'<div class="ni-kpi">'+i+'<span>'+k+'</span><strong>'+value(v)+'</strong></div>').join('')+'</div>';
 const sample='<p class="ni-source">'+(battles.length
 ?'Выборка: '+battles.length+' сохранённых или недавно полученных боёв. Для винрейта использовано '+valid+' матчей с известным результатом. История хранится только на этом устройстве.'
 :'Боевой журнал ещё не получен. После загрузки API здесь появятся реальные результаты.')+'</p>';
 const maxCutoff=Math.max(1,...cutoffs.map(x=>x.count));
 const collection=section('ПРОГРЕСС КОЛЛЕКЦИИ','Текущие трофеи бойцов — Supercell API',
 '<div class="ni-grid2"><div><h4>БОЙЦЫ ПО КУБКАМ</h4>'+cutoffs.map(x=>meter(x.value+'+ '+gameIcon('trophy'),x.count,maxCutoff,'#ffb94b')).join('')+
 '</div><div><h4>СИЛА И ЭКИПИРОВКА</h4>'+levelCount.map(x=>meter('Сила '+x.level,x.count,Math.max(1,owned.length),'#d452ff')).join('')+
 '<div class="ni-equipment"><span>ГАДЖЕТЫ <b>'+value(data.gadgetCount)+'</b></span><span>ЗВЁЗДНЫЕ СИЛЫ <b>'+value(data.starCount)+'</b></span></div></div></div>');
 const listed=(items,renderLine,empty)=>items.length?'<div class="ni-list">'+items.map(renderLine).join('')+'</div>':'<p class="ni-empty">'+empty+'</p>';
 const modeSection=section('РЕЗУЛЬТАТЫ ПО РЕЖИМАМ','Из накопленных боёв с известным исходом',
 listed(modeStats,x=>'<div class="ni-list-row"><b>'+esc(modeName(x.name))+'</b><small>'+x.w+'W / '+x.l+'L · '+x.all+' матчей</small><strong>'+rate(x.w,x.l)+'</strong></div>','Нет данных о режимах.'));
 const mapSection=section('ЛУЧШИЕ КАРТЫ','Минимум 3 боя с известным исходом',
 listed(mapStats,x=>'<div class="ni-list-row"><b>'+esc(x.name)+'</b><small>'+x.w+'W / '+x.l+'L · '+x.all+' матчей</small><strong>'+rate(x.w,x.l)+'</strong></div>','Для рейтинга карт пока недостаточно боёв.'));
 const mateSection=section('ЧАСТЫЕ СОЮЗНИКИ','Только матчи, где API указывает твою команду',
 listed(teammates,x=>'<div class="ni-list-row"><b data-no-translate="true">'+esc(x.name)+'</b><small>'+x.w+'W / '+x.l+'L · '+x.all+' матчей</small><strong>'+rate(x.w,x.l)+'</strong></div>','Составы команд пока недоступны.'));
 const pts=hist.points.filter(x=>Number.isFinite(x.at)&&Number.isFinite(x.trophies)).slice(-26);
 let chart;
 if(pts.length<2)chart='<div class="ni-empty">Пока недостаточно наблюдений для графика. Прогресс начнёт строиться при следующих посещениях.</div>';
 else {
  const min=Math.min(...pts.map(x=>x.trophies)),max=Math.max(...pts.map(x=>x.trophies));
  const xy=pts.map((x,i)=>[14+(i*572/Math.max(1,pts.length-1)),18+(98*(max-x.trophies)/Math.max(1,max-min))]);
  const path=xy.map((p,i)=>(i===0?'M':'L')+p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
  const delta=pts.at(-1).trophies-pts[0].trophies;
  chart='<div class="ni-chart-head"><strong class="'+(delta>=0?'ni-positive':'ni-negative')+'">'+(delta>0?'+':'')+fmt(delta)+' '+gameIcon('trophy')+'</strong><small>'+fmt(min)+' — '+fmt(max)+' · '+pts.length+' наблюдений</small></div>'+
   '<svg class="ni-chart" viewBox="0 0 600 144" preserveAspectRatio="none" role="img" aria-label="График накопленных кубков"><path d="M14 18H586 M14 67H586 M14 116H586" fill="none" stroke="#7f4457" stroke-opacity=".3" stroke-dasharray="5,7"></path><path d="'+path+'" fill="none" stroke="#ff526f" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"></path><circle cx="'+xy.at(-1)[0]+'" cy="'+xy.at(-1)[1]+'" r="5" fill="#ffb35b" /></svg>'+
   '<div class="ni-chart-foot"><span>'+new Date(pts[0].at).toLocaleDateString('ru-RU')+'</span><span>'+new Date(pts.at(-1).at).toLocaleDateString('ru-RU')+'</span></div>';
 }
 const trophySection=section('ДИНАМИКА КУБКОВ','Наблюдения с этого устройства',chart);
 const ext='https://brawlify.com/player/'+encodeURIComponent(safeTag(p.tag));
 return '<div class="ni-root"><div class="ni-title"><div><span>NEXUS / INTELLIGENCE</span><h2>'+gameIcon('award')+' РАСШИРЕННАЯ СТАТИСТИКА</h2><p>Никаких выдуманных рейтингов: только данные аккаунта и доступная история.</p></div><a href="'+esc(ext)+'" target="_blank" rel="noopener noreferrer" class="ni-brawlify">ПОЛНАЯ ИСТОРИЯ В BRAWLIFY ↗</a></div>'+
 metrics+sample+'<div class="ni-panels">'+trophySection+collection+modeSection+mapSection+mateSection+'</div><p class="ni-bottom">История боёв сохраняется на этом устройстве при открытии профиля. Данные других трекеров сюда не импортируются.</p></div>';
}
window.NexusInsights={capture,load,getHistory,render,calc};
})();