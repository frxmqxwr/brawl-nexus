/* BRAWL//NEXUS 1.15 — fan dashboard. No fabricated live player or esport statistics. */
(() => {
'use strict';
const CDN = 'https://cdn.brawlify.com';
const API = 'https://api.brawlapi.com/v1';
// Curated real Telegram UI emoji images from "Brawl Stars UI by @hdrbrawl" (194-piece pack),
// displayed by source URL with accessible Lucide fallback. No generated icons.
const UI_PACK_ROOT='https://assets.stickers.wiki/img/';
const UI_PACK=Object.freeze({
 trophy:'bd90e40a39271fa38ed57562020a7f75.webp',
 award:'f88e1964091301847f1d95ed8e289238.webp',
 coins:'b46a35c3ad458af2e58d5da671eda16d.webp',
 star:'4076150041021c36b39fd226f9ce9571.webp',
 shield:'d6c978172a2c9059a1d59a04ddc3f7e4.webp',
 'shield-half':'d6c978172a2c9059a1d59a04ddc3f7e4.webp',
 'shield-check':'d6c978172a2c9059a1d59a04ddc3f7e4.webp',
 'users':'c8687005e89b30b73b036b77c31d9bdb.webp',
 'users-round':'c8687005e89b30b73b036b77c31d9bdb.webp',
 'contact-round':'493152ab6074e39a500752d529ad08e2.webp',
 'scroll-text':'ec4b6f352711b83d67e3e466a66d8b87.webp',
 newspaper:'ec4b6f352711b83d67e3e466a66d8b87.webp',
 'lightbulb':'2e33c788cd556ab3b6d3cef7a9121954.webp',
 'flame':'30853750f570775c5b95c420efd2400c.webp',
 'clock':'6253d9967881c9851a4355ec2af8f7aa.webp',
 'search':'32213b9ebfdc0b405db5385c52db23b9.webp',
 'crown':'2f45b1255f9d206ca4b9c779c19719ac.webp',
 'sparkles':'2bb25fd9717638b3998b102863c2ba60.webp',
 'gem':'732861916d60d2585c5ef55d86322ce2.webp',
 'ticket':'06f615589c010dde139536a6ec9677d2.webp',
 'settings':'c97cb811d3bfe1364833a40d2925d19e.webp',
 'chart-no-axes-column':'dd007e104503e8d8ddafffb03d8b1752.webp'
});
const uiPackImg=(key,cls='')=>UI_PACK[key]?`<span class="bn17-img-glyph ${cls}" aria-hidden="true"><img src="${UI_PACK_ROOT}${UI_PACK[key]}" loading="lazy" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='inline-flex'"><span class="bn17-fallback" style="display:none">${icon(key)}</span></span>`:icon(key);

const BRAWLERS_SEED = [
 ['Shelly',0,'Damage Dealer'],['Colt',1,'Damage Dealer'],['Bull',2,'Tank'],['Brock',3,'Marksman'],['Rico',4,'Damage Dealer'],['Spike',5,'Damage Dealer'],['Barley',6,'Artillery'],['Jessie',7,'Controller'],['Nita',8,'Damage Dealer'],['Dynamike',9,'Artillery'],['El Primo',10,'Tank'],['Mortis',11,'Assassin'],['Crow',12,'Assassin'],['Poco',13,'Support'],['Bo',14,'Controller'],['Piper',15,'Marksman'],['Pam',16,'Support'],['Tara',17,'Damage Dealer'],['Darryl',18,'Tank'],['Penny',19,'Artillery'],['Frank',20,'Tank'],['Gene',21,'Controller'],['Tick',22,'Artillery'],['Leon',23,'Assassin'],['Rosa',24,'Tank'],['Carl',25,'Damage Dealer'],['Bibi',26,'Tank'],['8-Bit',27,'Damage Dealer'],['Sandy',28,'Controller'],['Bea',29,'Marksman'],['Emz',30,'Controller'],['Mr. P',31,'Controller'],['Max',32,'Support'],['Jacky',34,'Tank'],['Gale',35,'Controller'],['Nani',36,'Marksman'],['Sprout',37,'Artillery'],['Surge',38,'Damage Dealer'],['Colette',39,'Damage Dealer'],['Amber',40,'Damage Dealer'],['Lou',41,'Controller'],['Byron',42,'Support'],['Edgar',43,'Assassin'],['Ruffs',44,'Support'],['Stu',45,'Assassin'],['Belle',46,'Marksman'],['Squeak',47,'Controller'],['Grom',48,'Artillery'],['Buzz',49,'Assassin'],['Griff',50,'Damage Dealer'],['Ash',51,'Tank'],['Meg',52,'Tank'],['Lola',53,'Damage Dealer'],['Fang',54,'Assassin'],['Eve',55,'Controller'],['Janet',56,'Marksman'],['Bonnie',57,'Marksman'],['Otis',58,'Controller'],['Sam',59,'Tank'],['Gus',60,'Support'],['Buster',61,'Tank'],['Chester',62,'Damage Dealer'],['Gray',63,'Support'],['Mandy',64,'Marksman'],['R-T',65,'Damage Dealer'],['Willow',66,'Controller'],['Maisie',67,'Marksman'],['Hank',68,'Tank'],['Cordelius',69,'Assassin'],['Doug',70,'Support'],['Pearl',71,'Damage Dealer'],['Chuck',72,'Damage Dealer'],['Charlie',73,'Controller'],['Mico',74,'Assassin'],['Kit',75,'Support'],['Larry & Lawrie',76,'Artillery'],['Angelo',77,'Marksman'],['Melodie',78,'Assassin'],['Draco',79,'Tank'],['Lily',80,'Assassin'],['Berry',81,'Support'],['Clancy',82,'Damage Dealer'],['Moe',83,'Artillery'],['Kenji',84,'Assassin'],['Shade',85,'Assassin'],['Juju',86,'Artillery'],['Ollie',87,'Tank']
].map(([name,index,role])=>({id:16000000+index,name,class:{name:role},imageUrl:`${CDN}/brawlers/borders/${16000000+index}.png`,imageUrl2:`${CDN}/brawlers/borderless/${16000000+index}.png`,released:true}));
// Real esports PNG logos served by the official Brawl Stars event website.
// The URL map is curated from actual team logo assets, never generated initials masquerading as logos.
const TEAM_LOGOS = Object.freeze({
  'hmble':'16xju8lomzrPiwKvC6FBMN.png',
  'team hm​ble':'16xju8lomzrPiwKvC6FBMN.png',
  'navi':'3pRmdwaqTQKHFF8BJzEOLP.png',
  'natus vincere':'3pRmdwaqTQKHFF8BJzEOLP.png',
  'tribe':'3pSJUd2TWmw39UCL4VPSwc.png',
  'tribe gaming':'3pSJUd2TWmw39UCL4VPSwc.png',
  'zeta':'WFM2oUkoF34usT06QHOGY.png',
  'zeta division':'WFM2oUkoF34usT06QHOGY.png',
  'team elektros':'3wY5ZXUWnesIppsYdB8j96.png',
  'elektros':'3wY5ZXUWnesIppsYdB8j96.png',
  'te':'3wY5ZXUWnesIppsYdB8j96.png',
  'reply totem':'2LOISwpgPNNyIxFw98eqva.png',
  'totem':'2LOISwpgPNNyIxFw98eqva.png',
  'fut esports':'47zqSUZEnFD9YLvuE6Xw9Y.png',
  'fut':'47zqSUZEnFD9YLvuE6Xw9Y.png',
  'crazy raccoon':'6PY38EDIiAaVCQVtn6lUdF.png',
  'loud':'6x8QloxqL5TLhiA5sb3SzH.png',
  'novo esports':'1DoirEws5xb5XPNNQFbfYj.png',
  'bounty hunters allu':'2Zi4kMAK414i12C7rtrhDm.png',
  'bounty hunters':'2Zi4kMAK414i12C7rtrhDm.png'
});
const ESPORTS_TEAMS = ['HMBLE','NAVI','ZETA DIVISION','Tribe Gaming','Team Elektros','Reply Totem','FUT Esports','Crazy Raccoon'];
const logoForTeam = n => {const key=String(n||'').trim().toLowerCase().replace(/\s+/g,' ');const file=TEAM_LOGOS[key];return file?`https://event.supercell.com/brawlstars/assets/team-logos/${file}`:''};
const ROLES_RU = {'Marksman':'Стрелок','Tank':'Танк','Damage Dealer':'Урон','Assassin':'Ассасин','Controller':'Контроль','Artillery':'Метатель','Support':'Поддержка'};
const MODE_EN={'Броулбол':'Brawl Ball','Нокаут':'Knockout','Захват кристаллов':'Gem Grab','Ограбление':'Heist','Горячая зона':'Hot Zone','Награда за поимку':'Bounty'};
const MODES = ['Броулбол','Нокаут','Захват кристаллов','Ограбление','Горячая зона','Награда за поимку'];
const COUNTERS = {
 Piper:['Nani','Max','Mortis','Leon','Mandy','Angelo'],Angelo:['Nani','Piper','Max','Leon','Mandy'],Mortis:['Shelly','Bull','Gale','Surge','Otis','Cordelius'],Edgar:['Shelly','Gale','Surge','Bull','Cordelius'],Frank:['Colette','Spike','Shelly','Crow','Gale'],Kenji:['Gale','Cordelius','Shelly','Surge'],Buzz:['Gale','Shelly','Surge','Cordelius'],Tick:['Mortis','Mico','Edgar','Leon'],Gene:['Mortis','Max','Leon','Crow'],Spike:['Piper','Brock','Nani','Crow'],Colt:['Piper','Brock','Nani'],Bea:['Mortis','Leon','Max','Piper'],Clancy:['Colette','Piper','Crow'],Sandy:['Crow','Gale','Cordelius'],Dynamike:['Mortis','Mico','Edgar','Leon'],ElPrimo:['Colette','Shelly','Spike','Gale'],Mandy:['Mortis','Max','Leon','Nani'],Rico:['Brock','Barley','Dynamike'],Jessie:['Piper','Brock','Dynamike'],Melodie:['Gale','Shelly','Otis'],Draco:['Colette','Crow','Shelly']
};
const MODE_PREFS = {
 'Броулбол':['Tank','Controller','Damage Dealer','Support'], 'Нокаут':['Marksman','Controller','Support','Assassin'],
 'Захват кристаллов':['Controller','Support','Marksman'], 'Ограбление':['Damage Dealer','Artillery','Marksman'],
 'Горячая зона':['Controller','Tank','Artillery','Support'], 'Награда за поимку':['Marksman','Controller','Support']
};
const FALLBACK_NEWS = [
 {title:'Release Notes November 2026',href:'https://supercell.com/brawlstars/en/blog/game-updates/release-notes-november-2026/',sub:'Новый рейтинговый режим, карты и интерфейс',kind:'GAME UPDATE'},
 {title:'Your Path to BSC 2027',href:'https://supercell.com/brawlstars/en/blog/esports/',sub:'Официальные новости киберспорта',kind:'ESPORTS'},
 {title:'2026 World Finals & Championship',href:'https://event.supercell.com/brawlstars/en/',sub:'Расписание, прогнозы и трансляции — на официальном сайте',kind:'CHAMPIONSHIP'}
];
const state={page:'home',rotationEvents:[],rotationSource:'not-configured',rotationSelected:'',rotationTerrain:'mixed',mapStats:{},catalog:BRAWLERS_SEED,maps:[],icons:{},player:null,battles:[],otherPlayer:null,otherBattles:[],otherError:'',otherLoading:false,clubData:null,clubError:'',clubLoading:false,gameModes:[],connected:false,dataSource:'Загрузка данных',catalogLive:false,mapLive:false,news:FALLBACK_NEWS,esportsFeed:null,aiAvailable:false,playerLookupError:'',draft:{ally:[],enemy:[],bans:[],side:'ally',mode:'Броулбол',mapId:'',terrain:'mixed',query:'',classFilter:'Все',favorites:[],favoritesOnly:false,ownedOnly:true,playlist:'trophy',trophyMode:'brawlBall',trophyMapName:'',trophyOwnedOnly:true,liveMode:false,token:'ally',phase:'bans',pickHistory:[]},squad:{tags:[],members:[],error:''},scenario:{a:'HMBLE',b:'NAVI',formA:3,formB:3,mode:'Броулбол',result:null}};
try{state.squad.tags=JSON.parse(localStorage.getItem('bn_squad')||'[]');state.draft.favorites=JSON.parse(localStorage.getItem('bn_fav_brawlers')||'[]');const lastTag=localStorage.getItem('bn_my_tag')||localStorage.getItem('bn_lasttag');if(lastTag)state.lastTag=lastTag;
 const saved=JSON.parse(localStorage.getItem('bn_draft_v12')||'null');
 if(saved&&typeof saved==='object'){
   const d=state.draft;
   if(['ally','enemy'].includes(saved.token))d.token=saved.token;
   if(['bans','picks'].includes(saved.phase))d.phase=saved.phase;
   if(Array.isArray(saved.bans))d.bans=saved.bans.filter(x=>typeof x==='string').slice(0,6);
   if(Array.isArray(saved.pickHistory))d.pickHistory=saved.pickHistory.filter(x=>x&&['ally','enemy'].includes(x.side)&&(typeof x.name==='string'||x.name===null)).slice(0,6);
   if(MODES.includes(saved.mode))d.mode=saved.mode;
   if(['mixed','open','closed'].includes(saved.terrain))d.terrain=saved.terrain;
   if(typeof saved.mapId==='string')d.mapId=saved.mapId;
   if(typeof saved.ownedOnly==='boolean')d.ownedOnly=saved.ownedOnly;
   if(['trophy','ranked'].includes(saved.playlist))d.playlist=saved.playlist;
   if(typeof saved.trophyMode==='string')d.trophyMode=saved.trophyMode;
   if(typeof saved.trophyMapName==='string')d.trophyMapName=saved.trophyMapName;
   if(typeof saved.trophyOwnedOnly==='boolean')d.trophyOwnedOnly=saved.trophyOwnedOnly;
   for(const side of ['ally','enemy'])d[side]=d.pickHistory.filter(x=>x.side===side&&x.name).map(x=>x.name);
 }
}catch{}
const $=(sel,root=document)=>root.querySelector(sel);const $$=(sel,root=document)=>[...root.querySelectorAll(sel)];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>typeof n==='number'&&Number.isFinite(n)?n.toLocaleString('ru-RU'):'—';
const cap=s=>s?String(s).slice(0,1).toUpperCase()+String(s).slice(1):'';
const img=(url,alt='',cl='',opts='')=>`<img loading="lazy" class="${cl}" src="${esc(url||'')}" alt="${esc(alt)}" ${opts} onerror="this.style.opacity='.17';this.title='Изображение недоступно на CDN'">`;
const bimg=(name,cl='')=>{const b=getB(name);return img(b?.imageUrl||`${CDN}/brawlers/borders/16000000.png`,name,cl)};
const playerIconUrl=(id)=>state.icons?.[String(id)]?.imageUrl||`${CDN}/profile-icons/regular/${encodeURIComponent(id)}.png`;
const proPic=(id=28000003,cl='')=>`<img loading="lazy" class="${esc(cl)}" src="${esc(playerIconUrl(id))}" alt="Игровая аватарка Brawl Stars" onerror="this.onerror=null;this.src='assets/nexus-guest.webp'">`;
const clubBadgeUrl=(id)=>id?(state.clubIcons?.[String(id)]?.imageUrl||`${CDN}/club-badges/regular/${encodeURIComponent(id)}.png`):'';
const clubBadge=(id,cl='')=>id?`<img class="${esc(cl)}" loading="lazy" alt="Оригинальный значок клуба" src="${esc(clubBadgeUrl(id))}" onerror="this.style.display='none';this.parentElement.classList.add('badge-no-art')">`:`<span class="club-badge-empty">${icon('shield')}</span>`;
const rankPic=(rank='Legendary',cl='')=>{const name=String(rank).trim().toLowerCase().replace(/[^a-z]/g,'');const canonical={bronze:'Bronze',silver:'Silver',gold:'Gold',diamond:'Diamond',mythic:'Mythic',legendary:'Legendary',master:'Masters',masters:'Masters',pro:'Pro'}[name]||'Bronze';return `<img class="${esc(cl)}" loading="lazy" src="${CDN}/ranked/regular/${canonical}.png" alt="Значок ранга ${esc(canonical)}" onerror="this.style.display='none';this.parentElement.classList.add('rank-asset-unavailable')">`};
function localizedRank(v){if(typeof v==='string')return v;if(v&&typeof v==='object'){for(const k of ['name','default','en','en_US','en-US','ru','ru_RU'])if(typeof v[k]==='string'&&v[k].trim())return v[k];if(typeof v.defaultName==='string')return v.defaultName;}return '';}
function actualRank(p,period='current'){
 if(!p)return {label:'Нет данных',elo:null,raw:''};
 const current=period==='current';
 const obj=current?(p.rankedRankName||p.currentRank?.name||p.rankedRank?.name):(p.highestAllTimeRankedRankName||p.highestSeasonRankedRankName||p.highestRank?.name);
 const raw=localizedRank(obj);
 const num=current?p.rankedRank:p.highestAllTimeRankedId||p.highestAllTimeRankedRank;
 const name=raw||(!isNaN(Number(num))&&num!=null&&num!==0?'Уровень '+num:'Нет данных');
 const elo=current?p.rankedElo:p.highestAllTimeRankedElo;
 return {label:name,elo:typeof elo==='number'&&Number.isFinite(elo)?elo:null,raw};
}
function rankBadgeFor(v){const s=String(v||'').toLowerCase();const known=['bronze','silver','gold','diamond','mythic','legendary','masters','pro'];const detected=known.find(k=>s.includes(k));return detected?rankPic(detected,'rank-dynamic-img'):`<span class="rank-badge-generic">${icon('shield-half')}</span>`;}

// Original game artwork and game-mode art: URLs from Brawlify CDN/API, not generated illustrations.
const bModel=(name,cl='')=>{const b=getB(name);const id=b?.id;return id?`<img class="${esc(cl)}" loading="lazy" src="${CDN}/brawlers/model/${id}.png" alt="Игровая PNG-модель ${esc(name)}" onerror="this.onerror=()=>{this.style.display='none'};this.src='${esc(b?.imageUrl2||b?.imageUrl||'')}';this.classList.add('model-fallback')">`:bimg(name,cl)};
const bPortrait=(name,cl='')=>{const b=getB(name);return b?.id?`<img class="${esc(cl)}" loading="lazy" src="${CDN}/brawlers/portraits/${b.id}.png" alt="Оригинальный портрет ${esc(name)}" onerror="this.onerror=null;this.src='${esc(b.imageUrl2||b.imageUrl)}'">`:bimg(name,cl)};
const prestigeLevel=b=>{let raw=b?.prestigeLevel??b?.prestigeTier??b?.prestige;if(raw&&typeof raw==='object')raw=raw.level??raw.tier??raw.value;const n=Number(raw);return raw!==undefined&&raw!==null&&raw!==''&&Number.isInteger(n)&&n>=0?n:null};
const prestigeSummary=p=>{
 const brawlers=Array.isArray(p?.brawlers)?p.brawlers:[];
 const known=brawlers.filter(b=>prestigeLevel(b)!==null);
 const active=known.filter(b=>prestigeLevel(b)>0).sort((a,b)=>prestigeLevel(b)-prestigeLevel(a)||Number(b.trophies||0)-Number(a.trophies||0));
 const rawTotal=p?.totalPrestige??p?.prestigeTotal??p?.prestige?.total??p?.totalPrestiges;
 const apiTotal=rawTotal!==undefined&&rawTotal!==null&&rawTotal!==''&&Number.isFinite(Number(rawTotal))?Number(rawTotal):null;
 const full=known.length>0&&known.length===brawlers.length;
 const summed=known.reduce((n,b)=>n+prestigeLevel(b),0);
 const stages=[0,0,0,0];let incomplete=0;
 for(const b of brawlers){
   const level=prestigeLevel(b);
   if(level!==null&&level>0)continue;
   const trophy=Number(b?.trophies);
   if(b?.trophies===undefined||b?.trophies===null||!Number.isFinite(trophy)||trophy<0||trophy>=1000){incomplete++;continue}
   stages[trophy<250?0:trophy<500?1:trophy<750?2:3]++;
 }
 const stageLabels=stages.map(n=>brawlers.length?(incomplete?'≥':'')+n:'—');
 return {total:apiTotal??(full?summed:null),count:known.length?(full?String(active.length):'≥'+active.length):null,tiers:[1,2,3].map(level=>known.length?(full?String(active.filter(b=>level===3?prestigeLevel(b)>=3:prestigeLevel(b)===level).length):'≥'+active.filter(b=>level===3?prestigeLevel(b)>=3:prestigeLevel(b)===level).length):null),stages:stageLabels,stageIncomplete:incomplete,active,known:known.length,full};
};
// Brawlify: 0=wood, 1=bronze, 2=silver, 3=gold, 4/5/6=Prestige I/II/III.
// These are real in-game PNG assets; levels >3 use the level-3 badge plus exact text.
const prestigeShield=(level,cls='')=>{const val=Number(level);if(!Number.isFinite(val)||val<=0)return `<span class="bs-prestige-missing">—</span>`;const step=Math.min(3,Math.floor(val));return `<img class="bs-prestige-shield ${esc(cls)}" src="${CDN}/prestiges/regular/${3+step}.png" alt="Престиж ${step}${val>3?'+':''}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.hidden=false"><span hidden class="bs-prestige-missing">P${step}</span>`};
const prestigePath=z=>`<div class="bs-prestige-path" aria-label="Игровая шкала прогрессии от дерева до третьего престижа">${['Дерево','Бронза','Серебро','Золото','Прайм 1','Прайм 2','Прайм 3+'].map((name,i)=>`<div class="bs-prestige-step ${i<4?'is-prestige-road':''}"><img src="${CDN}/prestiges/regular/${i}.png" loading="lazy" alt="${name}" onerror="this.style.display='none'"><span>${name}</span>${i>=4?`<b>${z.tiers[i-4]??'—'}<small> бойцов</small></b>`:`<b>${z.stages[i]??'—'}<small> бойцов</small></b>`}</div>`).join('')}</div>`;
const prestigeEntries=z=>`<div class="bs-prestige-controls" role="group" aria-label="Фильтр бойцов по престижам"><span>${uiPackImg('crown')} Бойцы с престижем</span><div>${[['all','Все'],['1','Прайм 1'],['2','Прайм 2'],['3','Прайм 3+']].map(([key,label])=>`<button type="button" class="bs-prestige-filter ${key==='all'?'active':''}" data-action="prestige-filter" data-tier="${key}" aria-pressed="${key==='all'}">${label}</button>`).join('')}</div></div><div class="bs-prestige-list" id="bsPrestigeList">${z.active.map(b=>`<div class="bs-prestige-entry" data-prestige-tier="${prestigeLevel(b)}">${bimg(b.name)}<div class="bs-prestige-entry-info"><strong>${esc(b.name)}</strong><span>${uiPackImg('trophy')} ${fmt(b.trophies)} кубков</span></div><div class="bs-prestige-entry-badge">${prestigeShield(prestigeLevel(b))}<small>ПРЕСТИЖ ${prestigeLevel(b)}</small></div></div>`).join('')||`<div class="bs-prestige-empty">${z.known?'Бойцов с престижем пока нет.':'Supercell не передал данные по престижам.'}</div>`}</div><div class="bs-prestige-noresults" hidden>На этом уровне престижей бойцов пока нет.</div>`;
const podiumBrawler=(b,idx)=>`<div class="bs-podium-card bs-podium-${idx+1}" aria-label="Топ ${idx+1}: ${esc(b.name)}"><div class="bs-podium-ordinal">${idx+1}</div><div class="bs-podium-figure">${bModel(b.name)}</div><div class="bs-podium-content"><strong>${esc(b.name)}</strong><span>${uiPackImg('trophy')} ${fmt(b.trophies)} кубков</span><div class="bs-podium-rank">${prestigeLevel(b)?prestigeShield(prestigeLevel(b)):uiPackImg('star')}<small>${prestigeLevel(b)?`ПРЕСТИЖ ${prestigeLevel(b)}`:b.power?'СИЛА '+b.power:'СТАТУС НЕДОСТУПЕН'}</small></div></div><div class="bs-podium-base">ТОП ${idx+1}</div></div>`;
const brawlerShowcase=(strongest,demo)=>`<div class="bs-showcase panel panel-pad"><div class="panel-header"><div class="panel-title">${gameStatIcon('crown','gold')} ЛУЧШИЕ БОЙЦЫ</div><span class="tag red">${demo?'ПРИМЕР ИГРОВОГО ОФОРМЛЕНИЯ':'ПО КУБКАМ · ТОП 3'}</span></div><div class="bs-podium-landscape">${strongest.slice(0,3).map(podiumBrawler).join('')||'<div class="empty-note">Нет данных о бойцах.</div>'}</div>${strongest.length>3?`<div class="bs-showcase-subhead"><b>${uiPackImg('contact-round')} ОСТАЛЬНЫЕ БОЙЦЫ</b><span>ЛИСТАЙ КАРТОЧКИ ${icon('move-horizontal')}</span><div class="bs-rail-controls"><button type="button" data-action="brawler-rail" data-dir="-1" aria-label="Предыдущие бойцы">${icon('chevron-left')}</button><button type="button" data-action="brawler-rail" data-dir="1" aria-label="Следующие бойцы">${icon('chevron-right')}</button></div></div><div class="bs-showcase-rail" id="bsShowcaseRail" tabindex="0" aria-label="Лента бойцов с горизонтальной прокруткой">${strongest.slice(3).map(b=>`<article class="bs-rail-card"><div class="bs-rail-art">${bModel(b.name)}</div><strong>${esc(b.name)}</strong><span>${uiPackImg('trophy')} ${fmt(b.trophies)}</span><small>${prestigeLevel(b)?`${prestigeShield(prestigeLevel(b))} ПРЕСТИЖ ${prestigeLevel(b)}`:b.power?`СИЛА ${b.power}`:'—'}</small></article>`).join('')}</div>`:''}</div>`;
const prestigeFor=b=>{const l=prestigeLevel(b);const id=b?.id||getB(b?.name)?.id;return l&&id?`<span class="prestige-mark" title="Прайм ${l} — согласно данным API">${prestigeShield(l)} <b>ПРАЙМ ${l}</b></span>`:''};
const gameStatIcon=(symbol,cls='')=>`<span class="game-stat-glyph ${esc(cls)}" aria-hidden="true">${uiPackImg(symbol)}</span>`;
const modeGameIcon=mode=>{const o=modeData(mode);return o?.imageUrl?`<img src="${esc(o.imageUrl)}" alt="" loading="lazy" class="real-mode-glyph" onerror="this.style.display='none'">`:icon('gamepad-2')};
const mapImage=(name)=>state.maps.find(m=>NORM_MAP(m.name)===NORM_MAP(name))?.imageUrl||'';
const getB=name=>state.catalog.find(b=>b.name.toLowerCase().replace(/[^\w]/g,'')===String(name).toLowerCase().replace(/[^\w]/g,''))||BRAWLERS_SEED.find(b=>b.name.toLowerCase()===String(name).toLowerCase());
const role=b=>b?.class?.name||'Damage Dealer';
const tag=(text,style='')=>`<span class="tag ${style}">${esc(text)}</span>`;
const icon=name=>`<i data-lucide="${name}"></i>`;
const panel=(body,cls='')=>`<div class="panel ${cls}">${body}</div>`;
const intro=(kicker,title,desc,art)=>`<div class="page-intro"><div><div class="eyebrow">${kicker}</div><h1 class="display-title">${title}</h1><p class="description">${desc}</p></div>${art?`<div class="page-intro-side">${bimg(art,'page-intro-art')}</div>`:''}</div>`;
const section=(title,sub='',right='')=>`<div class="section-head"><div><h2>${title}</h2>${sub?`<p>${sub}</p>`:''}</div>${right}</div>`;
const button=(label,page,style='secondary')=>`<button class="button ${style}" data-page="${page}">${label} ${icon('arrow-up-right')}</button>`;
const detail=(name)=>`<span style="color:var(--muted)">${esc(name)}</span>`;
const learnIcons=()=>{if(window.lucide?.createIcons)window.lucide.createIcons({attrs:{'stroke-width':2}})};
let toastTimeout;function toast(message){const z=$('#toastZone');if(!z)return;z.innerHTML=`<div class="toast">${esc(message)}</div>`;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>z.innerHTML='',3800)}
function openPage(page){if(!['home','profile','players','club','esports','meta','squad'].includes(page))page='home';state.page=page;if(page!=='meta'&&state.draft.liveMode){state.draft.liveMode=false;document.body.classList.remove('live-draft-mode')}$$('.page').forEach(e=>e.classList.toggle('active',e.id===`page-${page}`));$$('[data-page]').forEach(e=>e.classList.toggle('active',e.matches('.nav-link,.bn110-mobile-tabs button')&&e.dataset.page===page));const labels={home:'ОБЗОР',profile:'МОЙ ПРОФИЛЬ',players:'ПОИСК ИГРОКОВ',club:'МОЙ КЛУБ',esports:'КИБЕРСПОРТ',meta:'META LAB',squad:'SQUAD HUB'};$('#crumbCurrent').textContent=labels[page];window.location.hash=page;$('#sidebar').classList.remove('open');renderPage(page);window.scrollTo({top:0,behavior:'instant'})}
function renderPage(page){({home:renderHome,profile:renderProfile,players:renderExplorer,club:renderClub,esports:renderEsports,meta:renderMeta,squad:renderSquad}[page]||renderHome)();learnIcons()}
function renderAll(){['home','profile','players','club','esports','meta','squad'].forEach(p=>({home:renderHome,profile:renderProfile,players:renderExplorer,club:renderClub,esports:renderEsports,meta:renderMeta,squad:renderSquad}[p])());learnIcons()}
function countRoles(){const counts={};state.catalog.forEach(b=>{counts[role(b)]=(counts[role(b)]||0)+1});return counts}
// Event rotation is sourced from Supercell /events/rotation, not BrawlAPI's static /events.
// The map inspector uses real map images. Lane suggestions are labeled heuristics, never win rates.
const NORM_MAP = s=>String(s||'').trim().toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g,'');
const byMapId = id=>state.maps.find(x=>String(x.id)===String(id));

// The official API includes map name/ID, NOT the geometric topology of the map.
// Known map-specific assessments are curated below; unknown maps get a provisional
// image-texture estimate (when CDN permits pixel access), NOT a verified wall scan.
const TERRAIN_OPEN = [
 'Shooting Star','Out in the Open','Deep End','Open Business','Open Space','Flaring Phoenix',
 'Hideout','Dry Season','Infinite Doom','Layer Cake','Canal Grande','Deeper Danger',
 'New Horizons','Hard Lane','Last Stop','Quick Skip','Bounty House','Spare Space',
 'Safe Zone','Bridge Too Far','Kaboom Canyon','Long Range','Purple Paradise',
 'Excel','Grass Knot','Overgrown Canyon','Close Quarters'
];
const TERRAIN_CLOSED = [
 'Sneaky Fields','Pinball Dreams','Triple Dribble','Super Beach','Center Stage',
 'Pinhole Punt','Dueling Beetles','Parallel Plays','Split','Hot Potato','Pit Stop',
 'Hard Rock Mine','Gem Fort','Double Swoosh','Rustic Arcade','Crystal Arcade',
 'Four Doors','Deathcap Trap','Rattlesnake Ravine','Stone Fort','Beach Ball',
 'Undermine','Wavedash','Junk Park','Open Goal','Backyard Bowl'
];
const TERRAIN_MIXED = [
 'Goldarm Gulch','Belle’s Rock','Belles Rock','Ring of Fire','Penalty Kick',
 'Field Goal','Super Stadium','Winter Party','Minecart Madness','Crystal Cavern',
 'Flooded Dam','Undermine','Crossroads','Safe Zone','Twisted Plan',
 'Undercurrent','Double Trouble','Stepping Stone','New Perspective'
];
const MAP_TERRAIN_OVERRIDES = new Map();
for(const n of TERRAIN_OPEN)MAP_TERRAIN_OVERRIDES.set(NORM_MAP(n),'open');
for(const n of TERRAIN_CLOSED)MAP_TERRAIN_OVERRIDES.set(NORM_MAP(n),'closed');
for(const n of TERRAIN_MIXED)MAP_TERRAIN_OVERRIDES.set(NORM_MAP(n),'mixed');
const imageTerrainCache=new Map(),terrainLoading=new Set();
function terrainEstimate(map){
 if(!map)return {type:'mixed',label:'Карта не выбрана',basis:'Не задана карта',certainty:'none'};
 const key=NORM_MAP(map.name),manual=MAP_TERRAIN_OVERRIDES.get(key);
 if(manual)return {type:manual,label:terrainLabel(manual),basis:'Тактический справочник: '+map.name,certainty:'curated'};
 const fromImage=imageTerrainCache.get(key);
 if(fromImage)return fromImage;
 if(map.imageUrl)queueTerrainAnalysis(map,key);
 return {type:'mixed',label:'Смешанная (предварительно)',basis:'Геометрия этой карты ещё не оценена',certainty:'unknown'};
}
function terrainLabel(t){return {open:'Открытая',mixed:'Смешанная',closed:'Много стен'}[t]||'Смешанная'}
function queueTerrainAnalysis(map,key){
 if(terrainLoading.has(key)||!map.imageUrl||typeof Image==='undefined')return;
 terrainLoading.add(key);
 const image=new Image();image.crossOrigin='anonymous';
 image.onload=()=>{
  let result={type:'mixed',label:'Смешанная (предварительно)',basis:'Детальная геометрия не подтверждена',certainty:'unknown'};
  try{
   const canvas=document.createElement('canvas');canvas.width=80;canvas.height=80;
   const cx=canvas.getContext('2d',{willReadFrequently:true});cx.drawImage(image,0,0,80,80);
   const p=cx.getImageData(0,0,80,80).data;let edges=0,checked=0;
   // Exclude outer border/ornament; adjacent-luminance transitions are an approximate
   // proxy for map cover density, not a claim to know exact wall placement.
   const lum=i=>p[i]*.2126+p[i+1]*.7152+p[i+2]*.0722;
   for(let y=13;y<67;y+=2)for(let x=13;x<67;x+=2){
     const i=(y*80+x)*4;const dx=((y*80+x+2)*4),dy=(((y+2)*80+x)*4);
     const d=Math.max(Math.abs(lum(i)-lum(dx)),Math.abs(lum(i)-lum(dy)));
     edges+=d>46?1:0;checked++;
   }
   const rate=checked?edges/checked:0;
   const type=rate<.12?'open':rate>.29?'closed':'mixed';
   result={type,label:terrainLabel(type)+' · оценка по изображению',basis:'Алгоритмическая оценка миниатюры; проверь укрытия',certainty:'estimated'};
  }catch(e){result.basis='CDN не разрешил автоматический анализ изображения';}
  imageTerrainCache.set(key,result);terrainLoading.delete(key);
  if(state.page==='home'||state.page==='meta'){if(state.page==='meta'){const selected=byMapId(state.draft.mapId);if(selected&&NORM_MAP(selected.name)===key)state.draft.terrain=result.type;}renderPage(state.page);}
 };
 image.onerror=()=>{imageTerrainCache.set(key,{type:'mixed',label:'Не определено',basis:'Изображение карты недоступно',certainty:'unknown'});terrainLoading.delete(key)};
 image.src=map.imageUrl;
}
function terrainBadge(map){const t=terrainEstimate(map);return `<span class="terrain-auto-badge ${t.certainty}">${icon('scan-line')} ${esc(t.label)}</span>`}

function rotationEntries(){
 const entries=(state.rotationEvents||[]).filter(e=>e?.map).map((e,i)=>{
   const map=byMapId(e.mapId)||state.maps.find(x=>NORM_MAP(x.name)===NORM_MAP(e.map));
   const k=String(e.mapId||map?.id||e.map)+'-'+i;
   return {key:k,id:String(map?.id||e.mapId||''),name:String(map?.name||e.map||'Карта'),mode:String(e.mode||map?.gameMode?.name||'Игровой режим'),imageUrl:map?.imageUrl||e.imageUrl||'',endTime:e.endTime||'',live:true};
 });
 if(entries.length)return entries.slice(0,12);
 // Real catalogue preview. This is explicitly NOT the current rotation.
 const preferred=['Brawl Ball','Gem Grab','Knockout','Hot Zone','Heist','Bounty'];
 let maps=state.maps.filter(m=>m.imageUrl&&!m.disabled);
 const chosen=[];const seen=new Set();
 for(const mode of preferred){const m=maps.find(m=>m.gameMode?.name===mode&&!seen.has(m.id));if(m){seen.add(m.id);chosen.push(m)}}
 for(const m of maps){if(chosen.length>=8)break;if(!seen.has(m.id)){chosen.push(m);seen.add(m.id)}}
 return chosen.map(m=>({key:String(m.id),id:String(m.id),name:String(m.name),mode:String(m.gameMode?.name||'Игра'),imageUrl:m.imageUrl,endTime:'',live:false}));
}
function rotationTime(s){if(!s)return '';let str=String(s);if(/^\d{8}T\d{6}/.test(str))str=str.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,'$1-$2-$3T$4:$5:$6');const d=new Date(str);return Number.isNaN(+d)?'':new Intl.DateTimeFormat('ru-RU',{hour:'2-digit',minute:'2-digit'}).format(d)}
function rotationTeamAdvice(){
 const terrain=terrainEstimate(rotationSelected()).type;
 const mode=rotationSelected()?.mode?.toLowerCase()||'';
 const lineOrder=terrain==='closed'?
   [['Rico','Bibi','Jacky','Carl'],['Sandy','Gale','Emz','Gene'],['Stu','Cordelius','Buzz','Max']]:
   terrain==='open'?
   [['Piper','Belle','Nani','Brock'],['Gene','Gus','Byron','Max'],['Angelo','Max','Belle','Brock']]:
   [['Belle','Rico','Carl','Piper'],['Gene','Sandy','Gale','Gus'],['Max','Stu','Spike','Surge']];
 if(mode.includes('heist'))lineOrder[1]=['Colt','Colette','Jessie','8-Bit'];
 if(mode.includes('brawl ball'))lineOrder[1]=['Gale','Sandy','Max','Gene'];
 return lineOrder.map(ns=>ns.filter(n=>getB(n)).slice(0,3));
}
function rotationSelected(){const arr=rotationEntries();return arr.find(x=>x.key===state.rotationSelected)||arr[0]||null}
function personalMapWinRate(mapName){
 const samples=(state.battles||[]).filter(x=>NORM_MAP(x?.event?.map||'')===NORM_MAP(mapName));
 const outcomes=samples.map(battleOutcome).filter(x=>x[0]==='win'||x[0]==='loss');
 const wins=outcomes.filter(x=>x[0]==='win').length;
 return {total:outcomes.length,wins,rate:outcomes.length?Math.round(wins/outcomes.length*100):null};
}
function renderRotationDetail(){
 const m=rotationSelected();if(!m)return '<div class="rotation-empty">Нет доступных карт для разбора. Подключи каталог игровых данных.</div>';
 const terr=terrainEstimate(m);state.rotationTerrain=terr.type;const lanes=rotationTeamAdvice();const labels=[['ЛЕВАЯ ЛИНИЯ','Держи фланг, не отдавай укрытия и не заходи в двойной фокус.'],['ЦЕНТР','Контролируй цель режима, помогай союзникам и отслеживай перезарядку соперников.'],['ПРАВАЯ ЛИНИЯ','Проверяй обходы и сохраняй возможность быстро вернуться в центр.']];
 const teamCount=modePickCount(m.mode);
 const situationalPicks=rotationPicksFor(m);
 const laneCards=teamCount===3
   ?labels.map(([l,desc],i)=>`<div class="lane-card"><h4>${l}</h4><p>${esc(desc)}</p><div class="lane-picks">${lanes[i].map(n=>`<span title="${esc(n)}">${bimg(n)}</span>`).join('')}</div></div>`).join('')
   :situationalPicks.map((n,i)=>`<div class="lane-card"><h4>${teamCount===1?'СОЛО ПИК':teamCount===2?'ИГРОК '+(i+1):'ВАРИАНТ '+(i+1)}</h4><p>${teamCount===1?'Один самостоятельный боец. Оценивай выживаемость и контроль зоны.':teamCount===2?'Подбирай пару с взаимодополняющими ролями.':'Выбор по карте и составу, без привязки к трём линиям.'}</p><div class="lane-picks"><span title="${esc(n)}">${bimg(n)}</span></div></div>`).join('');
 const intel=(state.mapStats||{})[m.id];
 const stats=intel?.stats||[];const personal=personalMapWinRate(m.name);
 return `<div class="rotation-detail" id="rotationDetail"><div class="rotation-detail-title"><div><div class="eyebrow">// MAP INTELLIGENCE · ${m.live?'ТЕКУЩАЯ РОТАЦИЯ':'КАТАЛОГ / ПРЕВЬЮ'}</div><h3>${esc(m.name)}</h3><p>${modeLabel(m.mode)}${m.endTime?' · до '+esc(rotationTime(m.endTime)):''}</p></div>${tag(m.live?'АКТУАЛЬНО':'КАТАЛОГ','cyan')}</div>
 <div class="rotation-detail-grid"><div class="map-art-big">${m.imageUrl?img(m.imageUrl,m.name):`<div class="rotation-empty">Изображение этой карты пока отсутствует в игровом каталоге.</div>`}</div>
 <div class="map-intel"><div class="eyeline" style="margin-bottom:10px">ТАКТИЧЕСКИЙ РАЗБОР / ${teamCount===3?'3 ЛИНИИ':teamCount+' БОЙЦ' + (teamCount===1?'А':'ОВ')}</div><div class="map-controls terrain-auto-row"><span class="small-label">ХАРАКТЕР КАРТЫ / АВТО:</span>${terrainBadge(m)}<small class="terrain-method">${esc(terr.basis)}</small></div>
 <div class="map-lanes">${laneCards}</div>
 <p class="map-caveat">Характер определяется автоматически для выбранной карты. Для знакомых карт используется тактический справочник, для остальных — предварительная оценка миниатюры (если доступна). Советы не заменяют разбор стен, кустов, матчапов и пиков соперника.</p>
 <div class="map-winrates"><div class="map-winrates-head"><span>WIN RATE / КОНКРЕТНАЯ КАРТА</span>${tag(stats.length?'ОБЩАЯ ВЫБОРКА':'ЛИЧНЫЕ МАТЧИ',stats.length?'cyan':'gold')}</div>
 ${stats.length?`<div class="map-stat-list">${stats.slice(0,6).map(s=>`<div class="map-stat">${bimg(s.name||getBIdName(s.brawlerId))}<div><b>${esc(s.name||getBIdName(s.brawlerId))}</b><small>${Number(s.winRate).toFixed(1)}% WR${s.sampleSize?' · '+fmt(s.sampleSize)+' игр':' · объём выборки неизвестен'}</small></div></div>`).join('')}</div><p class="map-caveat">Источник: ${esc(intel.source||'подключённый провайдер')}. Это статистика выборки, а не гарантия победы.</p>`:`<div class="bn19-personal-winrate"><div class="bn19-personal-wr-title">${uiPackImg('trophy')} ТВОИ РЕЗУЛЬТАТЫ НА ЭТОЙ КАРТЕ</div><strong>${personal.rate===null?'—':personal.rate+'%'}</strong><small>${personal.total?'На основе '+personal.total+' недавних матчей с победой или поражением':'В последних боях нет результатов на этой карте'}</small><span>Только твой боевой журнал · не глобальный винрейт</span></div>`}</div>
 <div class="map-detail-actions"><button class="button" data-action="rotation-to-draft" data-mapid="${esc(m.id)}">${icon('swords')} <span class="bn115-desktop-text">ДРАФТ НА ЭТОЙ КАРТЕ</span><span class="bn115-mobile-text">ПОДБОР ПИКОВ</span></button><button class="button secondary" data-action="rotation-refresh">${icon('refresh-cw')} <span class="bn115-desktop-text">ОБНОВИТЬ РОТАЦИЮ</span><span class="bn115-mobile-text">ОБНОВИТЬ</span></button></div></div></div></div>`;
}
function getBIdName(id){return state.catalog.find(b=>String(b.id)===String(id))?.name||'Боец';}
function renderRotationSection(){const entries=rotationEntries();const live=entries.some(e=>e.live);return `<section class="rotation-shell" id="rotationSection">${section('ТЕКУЩАЯ РОТАЦИЯ','Выбери карту для схемы линий, советов и доступной статистики.',`<div class="rotation-head-controls">${tag(live?'LIVE · АКТУАЛЬНО':'ПРЕВЬЮ КАРТ',live?'cyan':'gold')}<button class="button secondary sm" data-action="rotation-refresh">${icon('refresh-cw')} ОБНОВИТЬ</button></div>`)}
 ${entries.length?`<div class="rotation-grid n16-rotation-grid">${entries.map(e=>`<button class="map-rotation-card n16-map-card ${rotationSelected()?.key===e.key?'active':''}" data-action="rotation-select" data-key="${esc(e.key)}"><div class="n16-map-mode">${modeGameIcon(e.mode)}<span>${esc(modeName(e.mode))}</span></div><div class="map-rotation-img">${e.imageUrl?img(e.imageUrl,e.name):`<div class="n16-map-placeholder">${icon('map')}</div>`}<span class="map-rotation-live ${e.live?'':'preview'}">${e.live?'● СЕЙЧАС':'КАТАЛОГ'}</span></div><div class="map-rotation-meta"><b>${esc(e.name)}</b><small>${e.endTime?'⏱ ДО '+esc(rotationTime(e.endTime)):'Карта из каталога'}</small></div><div class="n16-map-picks"><span>ПИКИ · ${modePickCount(e.mode)} ${modePickCount(e.mode)===1?'БОЕЦ':'БОЙЦА / ВАРИАНТОВ'}</span><div>${rotationPicksFor(e).map(n=>bimg(n)).join('')}</div></div></button>`).join('')}</div>${renderRotationDetail()}`:`<div class="rotation-empty"><b>ПОДКЛЮЧАЕМ КАРТЫ</b><span>Для просмотра нужны данные каталога BrawlAPI. Чтобы видеть именно текущую ротацию, настрой Supercell API на сервере.</span></div>`}
 ${!live?`<p class="map-caveat">Сейчас показаны карты из настоящего игрового каталога, <b>не текущая ротация</b>. Для LIVE нужен BRAWL_API_TOKEN и разрешённый IP сервера. Официальный endpoint: /v1/events/rotation.</p>`:''}</section>`}
async function loadRotation(){
 try{const data=await apiRequest('/api/events');const items=Array.isArray(data?.events)?data.events:[];const changed=JSON.stringify(items)!==JSON.stringify(state.rotationEvents);state.rotationEvents=items;state.rotationSource=data?.source||'not-configured';if(changed&&state.page==='home'){renderHome();learnIcons()}}
 catch(e){state.rotationSource='error';if(state.page==='home'){renderHome();learnIcons()}}
}
async function loadMapStats(id){if(!id||state.mapStats[id])return;state.mapStats[id]={stats:[],source:'unavailable'};try{const d=await apiRequest('/api/map-stats?mapId='+encodeURIComponent(id));state.mapStats[id]={stats:Array.isArray(d.stats)?d.stats:[],source:d.source||'provider'}}catch{}if(state.page==='home'){renderHome();learnIcons()}}
function renderHome(){
 const p=state.player;const owned=p?.brawlers||[];const current=actualRank(p,'current');
 const topBrawler=owned.length?owned.slice().sort((a,b)=>Number(b.trophies||0)-Number(a.trophies||0))[0]:null;
 const choice=rotationSelected();const picks=choice?rotationPicksFor(choice):[];
 const active=rotationEntries().filter(e=>e.live);
 const headlines=state.news||[];
 $('#page-home').innerHTML=`
 <div class="n16-homehero">
  <div class="n16-homehero-content"><div class="eyebrow">// COMMAND CENTER <span class="n16-spark">✦</span> ТАКТИЧЕСКИЙ ШТАБ</div>
    <h1 class="n16-big-title">ОБЗОР<span class="n16-title-dot">.</span></h1>
    <p>Твоя ротация, драфты, профиль и киберспорт в одном месте. Игровые PNG — оригинальные, цифры — из подключённых источников.</p>
    <div class="n16-home-links">${button('ОТКРЫТЬ META LAB','meta','')}${button('МОЙ ПРОФИЛЬ','profile','secondary')}</div>
  </div>
  ${topBrawler?bPortrait(topBrawler.name,'n16-hero-brawler'):''}
  <div class="n16-hero-stats">
    <div>${gameStatIcon('trophy','gold')}<span><strong>${fmt(p?.trophies)}</strong><small>Кубки аккаунта</small></span></div>
    <div>${p?rankBadgeFor(current.raw):gameStatIcon('shield','pink')}<span><strong>${p?esc(current.label):'—'}</strong><small>Текущий ранг</small></span></div>
    <div>${gameStatIcon('star','rose')}<span><strong>${fmt(current.elo)}</strong><small>Рейтинговые очки</small></span></div>
    <div class="bn17-prestige-chip">${gameStatIcon('crown','gold')}<span><strong>${prestigeSummary(p).total===null?'—':fmt(prestigeSummary(p).total)}</strong><small>Всего престижей</small></span></div>
  </div>
 </div>
 ${renderRotationSection()}
 <div class="n16-overview-grid">
   ${panel(`<div class="panel-header"><div class="panel-title">${gameStatIcon('swords','pink')} МЕТА / ПОДБОР ПИКОВ</div>${tag('ТАКТИЧЕСКИЕ СОВЕТЫ','red')}</div><p class="n16-muted">Варианты на ${esc(choice?.name||'выбранной карте')} основаны на режиме и характере карты. Это не статистический тир-лист.</p><div class="n16-role-picks">${(picks.length?picks:['Piper','Gale','Spike']).map((n,i)=>`<div class="n16-pick-card">${bimg(n)}<div><b>${esc(n)}</b><small>${esc(ROLES_RU[role(getB(n))]||'Боец')}</small></div><span class="n16-pick-index">0${i+1}</span></div>`).join('')}</div><div style="margin-top:15px">${button('РАЗОБРАТЬ ДРАФТ','meta','secondary')}</div>`,'panel-pad n16-meta-card')}
   ${panel(`<div class="panel-header"><div class="panel-title">${gameStatIcon('shield','gold')} МОЙ КЛУБ</div><button type="button" data-page="club" class="n16-arrow-btn">${icon('arrow-up-right')}</button></div>${state.clubData?`<div class="n16-club-summary"><div class="n16-big-clubbadge">${clubBadge(state.clubData.badgeId||state.clubData.badge?.id)}</div><div><b>${esc(state.clubData.name||'Клуб')}</b><small>${esc(state.clubData.tag||'')}</small></div></div><div class="n16-club-metrics"><span>${gameStatIcon('users')} <b>${fmt(state.clubData.members?.length||state.clubData.membersCount)}</b> игроков</span><span>${gameStatIcon('trophy','gold')} <b>${fmt(state.clubData.trophies)}</b> кубков</span></div><div class="n16-members-mini">${(state.clubData.members||[]).slice(0,3).map(m=>`<button data-action="open-club-member" data-tag="${esc(m.tag)}"><span>${esc(m.name)}</span><b>${fmt(m.trophies)}</b></button>`).join('')}</div>`:`<p class="n16-muted">${p?.club?'Загружаем данные твоего клуба…':'Найди свой аккаунт, чтобы увидеть эмблему клуба, участников и общий счёт кубков.'}</p><div class="n16-empty-crest">${icon('shield')}</div>`}`,'panel-pad n16-club-card')}
   ${panel(`<div class="panel-header"><div class="panel-title">${gameStatIcon('lightbulb','gold')} РЕКОМЕНДАЦИИ</div>${tag('NEXUS TIP','red')}</div><div class="n16-advice-list"><div><span class="n16-advice-icon">${modeGameIcon(choice?.mode||'brawlBall')}</span><p><b>${choice?esc(choice.name):'Выбери карту'}</b><small>${choice?'Изучи три линии и подбери пики по местности.':'Кликни по карте текущей ротации.'}</small></p></div><div><span class="n16-advice-icon">${icon('shield-check')}</span><p><b>Не забудь баны</b><small>В Live Draft порядок пиков контролируется жетоном первого выбора.</small></p></div><div><span class="n16-advice-icon">${icon('crosshair')}</span><p><b>Контролируй центр</b><small>Не отдавай сопернику простые углы и проходы.</small></p></div></div>`,'panel-pad n16-advice-card')}
   ${panel(`<div class="panel-header"><div class="panel-title">${gameStatIcon('trophy','gold')} КИБЕРСПОРТ</div><button class="n16-arrow-btn" data-page="esports">${icon('arrow-up-right')}</button></div><div class="n16-esport-logos">${teamSymbol('NAVI')}${teamSymbol('HMBLE')}${teamSymbol('ZETA DIVISION')}</div><p class="n16-muted">${state.esportsFeed?.length?'Есть обновления подключённого турнирного источника.':'Логотипы настоящих команд. Результаты и Live-счёт без подключённого источника не подменяем примерами.'}</p><div class="n16-news-mini">${headlines.slice(0,2).map(n=>`<a href="${esc(n.href)}" target="_blank" rel="noopener">${icon('newspaper')} ${esc(n.title)} ${icon('arrow-up-right')}</a>`).join('')}</div>`,'panel-pad n16-esport-card')}
 </div>
 <div class="n16-tools-row">${quickCard('search','cyan','ПОИСК ИГРОКОВ','Найти профиль по тегу','players')}${quickCard('users-round','purple','SQUAD HUB','Сравнить состав и друзей','squad')}<button type="button" class="panel quick-card gold" style="text-align:left;color:inherit;width:100%" id="homeAIOpen"><div class="quick-head"><div class="icon-bubble gold">${icon('sparkles')}</div>${icon('arrow-up-right')}</div><div><h3>NEXUS ASSISTANT</h3><p>Контрпики и вопросы по игре</p></div></button></div>
 `;
}
// Recommended slots follow the real team size, rather than 3 for every rotation.
const modePickCount=(mode)=>{
 const m=normMode(mode);
 if(m.includes('soloshowdown')||m==='duels'||m==='takedown'||m==='hunters')return 1;
 if(m.includes('duoshowdown'))return 2;
 if(m.includes('trioshowdown'))return 3;
 if(m.includes('5v5')||m.includes('deathmatch5'))return 5;
 if(m==='biggame')return 5;
 return 3;
};
const ownedBrawlerNames=()=>new Set((state.player?.brawlers||[]).map(b=>String(b.name||'').trim().toLowerCase()).filter(Boolean));
const isOwnedBrawler=b=>ownedBrawlerNames().has(String(b?.name||b||'').trim().toLowerCase());
const rankedEligibleNames=()=>new Set((state.player?.brawlers||[]).filter(b=>Number(b.power)>=11).map(b=>String(b.name||'').trim().toLowerCase()));
const isRankedEligibleBrawler=b=>rankedEligibleNames().has(String(b?.name||b||'').trim().toLowerCase());
function rotationPicksFor(map){
 const terrain=terrainEstimate(map).type,mode=normMode(map?.mode);
 let names=terrain==='closed'?['Rico','Sandy','Bibi','Jacky','Cordelius']:terrain==='open'?['Piper','Nani','Belle','Brock','Angelo']:['Gale','Spike','Max','Gene','Stu'];
 if(mode.includes('soloshowdown'))names=terrain==='open'?['Piper','Leon','Cordelius','Max']:['Cordelius','Shelly','Leon','Surge'];
 else if(mode.includes('duoshowdown'))names=['Max','Gene','Sandy','Leon','Gus'];
 else if(mode.includes('trioshowdown'))names=['Max','Sandy','Gene','Spike','Stu'];
 else if(mode.includes('heist'))names=['Colt','Colette','Jessie','8-Bit','Chuck'];
 else if(mode.includes('brawlball'))names=['Gale','Max','Sandy','Stu','Bibi'];
 else if(mode.includes('gemgrab'))names=['Gene','Sandy','Belle','Max','Rico'];
 const count=modePickCount(map?.mode);
 return [...new Set([...names,...state.catalog.map(b=>b.name)])].filter(n=>getB(n)).slice(0,count);
}
function quickCard(ico,color,name,sub,page){return `<button type="button" class="panel quick-card ${color}" data-page="${page}" style="text-align:left;color:inherit;width:100%"><div class="quick-head"><div class="icon-bubble ${color==='cyan'?'':color}">${icon(ico)}</div>${icon('arrow-up-right')}</div><div><h3>${name}</h3><p>${sub}</p></div></button>`;}
const MODE_RU={brawlBall:'Броулбол',gemGrab:'Захват кристаллов',soloShowdown:'Одиночное столкновение',duoShowdown:'Парное столкновение',trioShowdown:'Тройное столкновение',heist:'Ограбление',hotZone:'Горячая зона',knockout:'Нокаут',bounty:'Награда за поимку',wipeout:'Зачистка',basketBrawl:'Баскетбой',volleyBrawl:'Волейбой',duels:'Дуэли',siege:'Осада',bigGame:'Большая игра',bossFight:'Бой с боссом',roboRumble:'Роборубка',brawlArena:'Бравл-арена',airHockey:'Бравл-хоккей',tagTeam:'Команда тегов',deathmatch5v5:'Командный бой 5 на 5',takedown:'Захват',hunters:'Охотники',paintBrawl:'Бравл-краски',presentPlunder:'Похищение подарков',lastStand:'Последний рубеж'};
const normMode=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
const modeData=(mode)=>state.gameModes.find(m=>normMode(m.scHash)===normMode(mode)||normMode(m.name)===normMode(mode));
function modeName(mode){if(!mode)return 'Неизвестный режим';const k=Object.keys(MODE_RU).find(k=>normMode(k)===normMode(mode));return k?MODE_RU[k]:modeData(mode)?.name||String(mode).replace(/([a-z])([A-Z])/g,'$1 $2')}
function modeLabel(mode){const d=modeData(mode);return `<span class="mode-label">${d?.imageUrl?img(d.imageUrl,modeName(mode),'mode-icon'):icon('gamepad-2')}<span>${esc(modeName(mode))}</span></span>`}
function battleOutcome(item){const b=item?.battle||{};const raw=String(b.result||b.rank||'').toLowerCase();if(raw.includes('victory')||raw==='1'||raw==='win')return ['win','ПОБЕДА'];if(raw.includes('defeat')||raw==='loss')return ['loss','ПОРАЖЕНИЕ'];return ['draw',raw?'НИЧЬЯ':'—']}

function battleParticipants(item,tag){
 const battle=item?.battle||{},norm=t=>String(t||'').toUpperCase().replace(/^#/,'');
 const target=norm(tag||state.player?.tag||'');
 const teams=Array.isArray(battle.teams)?battle.teams.map(t=>Array.isArray(t)?t:[t]):[];
 const grouped=teams.filter(t=>t.length).map(t=>t.filter(x=>x&&typeof x==='object'));
 if(!grouped.length&&Array.isArray(battle.players))grouped.push(battle.players.filter(x=>x&&typeof x==='object'));
 const all=grouped.flat(),self=all.find(x=>norm(x.tag)===target)||null;
 const myTeamIndex=grouped.findIndex(team=>team.some(x=>norm(x.tag)===target));
 return {teams:grouped,all,self,myTeamIndex,groupedTeams:teams.length>0};
}
function trophyChange(item){const v=item?.battle?.trophyChange??item?.trophyChange;return v==null||v===''||!Number.isFinite(Number(v))?null:Number(v)}
function battleWhen(item){const raw=String(item?.battleTime||'');const iso=raw.replace(/^(\d{4})(\d{2})(\d{2})T/,'$1-$2-$3T').replace(/(\d{2})(\d{2})(\d{2})\.(\d+)Z$/,'$1:$2:$3.$4Z');const d=new Date(iso);return Number.isNaN(d.getTime())?null:d}
function battlePerson(x,tag){const own=String(x?.tag||'').toUpperCase()===String(tag||'').toUpperCase(),b=x?.brawler||{},name=b?.name||'',t=b?.trophies??x?.trophies;
 return `<div class="bn112-person ${own?'mine':''}">${name?bimg(name):'<span>?</span>'}<div><b>${esc(x?.name||'Игрок')}${own?' ★':''}</b><small>${esc(name||'Боец неизвестен')}</small>${t==null?'':`<small>${uiPackImg('trophy')} ${fmt(t)} кубков</small>`}</div>${x?.tag?`<button data-action="open-club-member" data-tag="${esc(x.tag)}" aria-label="Открыть профиль">${icon('arrow-up-right')}</button>`:''}</div>`;
}
function battleDetail(item,tag){
 const b=item?.battle||{},x=battleParticipants(item,tag),date=battleWhen(item),delta=trophyChange(item),mode=item?.event?.mode||b.mode||'',map=item?.event?.map||'Карта неизвестна';
 return `<div class="bn112-detail"><header><b>${modeGameIcon(mode)} ${esc(modeName(mode))}</b><strong>${esc(map)}</strong>${date?`<time>${date.toLocaleString('ru-RU')}</time>`:''}</header><div class="bn112-match-metrics"><span>${battleOutcome(item)[1]}</span><span>${delta===null?'Изменение кубков: нет данных':`Кубки ${delta>0?'+':''}${delta}`}</span>${b.duration?`<span>${fmt(b.duration)} сек.</span>`:''}${b.rank?`<span>Место №${fmt(b.rank)}</span>`:''}</div>
 ${x.teams.length?`<div class="bn112-teams">${x.teams.map((team,i)=>`<section class="bn112-team ${x.myTeamIndex===i?'is-ally':''}"><h4>${x.groupedTeams?(x.myTeamIndex===i?'ТВОЯ КОМАНДА':'СОПЕРНИКИ'):'УЧАСТНИКИ'}</h4>${team.map(p=>battlePerson(p,tag)).join('')}</section>`).join('')}</div>`:'<p>Состав участников не передан Supercell.</p>'}</div>`;
}
function renderBattle(item,index,tag){
 const b=item?.battle||{},x=battleParticipants(item,tag),outcome=battleOutcome(item),change=trophyChange(item),mode=item?.event?.mode||b.mode||'',map=item?.event?.map||'Карта неизвестна',placement=Number(b.rank);
 let display=outcome[1],cls=outcome[0];if(!b.result&&Number.isFinite(placement)&&placement>0){display='#'+placement;cls=placement===1?'win':'draw'}
 const own=x.self?.brawler?.name||'',allies=x.groupedTeams&&x.myTeamIndex>=0?x.teams[x.myTeamIndex].filter(p=>p!==x.self):[];
 return `<details class="bn112-battle"><summary><span class="bn112-outcome ${cls}">${esc(display)}</span><span class="bn112-mode"><b>${modeGameIcon(mode)} ${esc(modeName(mode))}</b><small>${esc(map)}</small></span><span class="bn112-self">${own?bimg(own):'—'}<small>ТЫ</small></span><span class="bn112-allies">${allies.slice(0,2).map(p=>p?.brawler?.name?bimg(p.brawler.name):'—').join('')||'—'}<small>СОЮЗНИКИ</small></span><span class="bn112-delta ${change>0?'positive':change<0?'negative':''}">${change===null?'—':`${change>0?'+':''}${change}`} ${uiPackImg('trophy')}</span>${icon('chevron-down')}</summary>${battleDetail(item,tag)}</details>`;
}
function gameReport(){const data=state.battles||[];const wins=data.filter(x=>battleOutcome(x)[0]==='win').length,losses=data.filter(x=>battleOutcome(x)[0]==='loss').length,valid=wins+losses;
 const modes={};data.forEach(x=>{const m=x.event?.mode||x.battle?.mode;if(m)modes[m]=(modes[m]||0)+1});const top=Object.entries(modes).sort((a,b)=>b[1]-a[1]).slice(0,3);
 if(!data.length)return `<div class="empty-note">Подключи официальный API и открой последние матчи. Только после этого появится настоящая статистика — без вымышленных процентов.</div>`;
 return `<div class="battle-report-grid"><div class="report-metric"><span>ПОБЕДЫ</span><strong style="color:var(--cyan)">${wins}</strong></div><div class="report-metric"><span>ПОРАЖЕНИЯ</span><strong style="color:var(--pink)">${losses}</strong></div><div class="report-metric"><span>WIN RATE В ВЫБОРКЕ</span><strong>${valid?Math.round(wins/valid*100)+'%':'—'}</strong></div><div class="report-metric"><span>ПОЛУЧЕНО МАТЧЕЙ</span><strong>${data.length}</strong></div></div><div class="small-label" style="margin:16px 0 10px">ЧАСТЫЕ РЕЖИМЫ</div><div class="report-modes">${top.map(([m,n])=>`<span>${modeLabel(m)} <b>${n}</b></span>`).join('')||'<span>Нет данных о режимах</span>'}</div><p class="source-note">Процент считается только по матчам с явно определённым результатом; ничьи и неизвестные результаты исключены. Это небольшая доступная выборка, не сезонный винрейт.</p>`;
}
function playerAvatarId(p){return p?.icon?.id||p?.icon?.iconId||p?.profileIcon?.id||28000003}
function renderProfile(){const p=state.player, demo=!p, owned=p?.brawlers||[];const strongest=demo?['Kenji','Piper','Spike','Gale','Mortis','Crow','Nani','Surge'].map((n,i)=>({name:n,trophies:null,power:null})):owned.slice().sort((a,b)=>(b.trophies||0)-(a.trophies||0));const current=actualRank(p,'current'),best=actualRank(p,'best');const clubName=p?.club?.name||'Без клуба',clubTag=p?.club?.tag||'';const battleHtml=state.battles.length?state.battles.slice(0,25).map((b,i)=>renderBattle(b,i,p?.tag)).join(''):`<div class="empty-note">${demo?'Подключи профиль, чтобы загрузить настоящую историю боёв.':'Боевой журнал временно недоступен. Попробуй обновить страницу.'}</div>`;
 $('#page-profile').innerHTML=`${intro('PLAYER INTELLIGENCE','РАЗБОР <span>АККАУНТА.</span>','Кубки, ранги и история игр.','Piper')}
 ${panel(`<div><div class="small-label">PLAYER TAG / СИМВОЛ # НЕОБЯЗАТЕЛЕН</div><form class="form-row" id="profileSearch"><input class="input" id="profileTag" placeholder="#2PP..." value="${esc(p?.tag||state.lastTag||'')}" required pattern="[#A-Za-z0-9]+" aria-label="Тег игрока"/><button class="button" type="submit">${icon('search')} НАЙТИ ИГРОКА</button></form></div><span class="tag ${demo?'gold':'cyan'}">${demo?'НЕ ПОДКЛЮЧЕНО':'АККАУНТ ЗАГРУЖЕН'}</span>`,'profile-search')}
 ${state.playerLookupError?`<p class="warn-line">${esc(state.playerLookupError)}</p>`:''}
 <div class="profile-overview"><div class="profile-card n16-profile-card">${p&&strongest.length?`<div class="bn19-profile-figure" aria-hidden="true">${bModel(strongest[0].name)}</div>`:''}<div class="profile-row">${proPic(playerAvatarId(p),'profile-avatar')}<div><div class="eyeline">${demo?'ПРИМЕР ОФОРМЛЕНИЯ':'ПОДТВЕРЖДЁННЫЙ ПРОФИЛЬ'}</div><div class="profile-nick">${esc(p?.name||'YOUR BRAWLER')}</div><div class="profile-tagline">${esc(p?.tag||'ПОДКЛЮЧИ АККАУНТ ПО ТЕГУ')}</div><div style="margin-top:8px">${tag(clubName,clubTag?'red':'')}</div></div></div><div class="profile-stats n16-profile-stats"><div>${gameStatIcon('trophy','gold')}<b>${fmt(p?.trophies)}</b><small>Кубки сейчас</small></div><div>${gameStatIcon('award','gold')}<b>${fmt(p?.highestTrophies)}</b><small>Максимум кубков</small></div><div>${gameStatIcon('contact-round','rose')}<b>${fmt(p?owned.length:null)}</b><small>Бойцов</small></div><div class="bn17-summary-metric">${gameStatIcon('crown','gold')}<b>${prestigeSummary(p).total===null?'—':fmt(prestigeSummary(p).total)}</b><small>Всего престижей</small></div></div><div class="profile-club"><span class="club-shield">${clubBadge(state.clubData?.badgeId||state.clubData?.badge?.id)}</span><div><small>КЛУБ ИГРОКА</small><strong>${esc(clubName)}</strong><span>${clubTag?esc(clubTag):demo?'Найди аккаунт для просмотра клуба':'Игрок не состоит в клубе'}</span></div>${clubTag?`<button class="button secondary sm" data-page="club">КЛУБ ${icon('arrow-up-right')}</button>`:''}</div></div>
  <div class="panel panel-pad ranked-panel-v14"><div class="panel-header"><div class="panel-title">${gameStatIcon('shield-half','pink')} RANKED // ТЕКУЩИЙ И РЕКОРД</div>${p?'':'<span class="tag gold">НЕТ ДАННЫХ</span>'}</div>
  <div class="ranked-pair"><div class="ranked-stat now"><div class="ranked-icon">${p?rankBadgeFor(current.raw):icon('shield-half')}</div><div><div class="eyeline">ТЕКУЩИЙ РАНГ</div><b>${esc(current.label)}</b><strong>${fmt(current.elo)} <span>РЕЙТИНГОВЫХ ОЧКОВ</span></strong></div></div>
  <div class="ranked-stat record"><div class="ranked-icon">${p?rankBadgeFor(best.raw):icon('trophy')}</div><div><div class="eyeline">ЛУЧШИЙ РАНГ ЗА ВСЁ ВРЕМЯ</div><b>${esc(best.label)}</b><strong>${fmt(best.elo)} <span>МАКС. РЕЙТИНГОВЫХ ОЧКОВ</span></strong></div></div></div>
  </div></div>
 <div class="mt-18">${panel(`<div class="panel-header"><div class="panel-title">${gameStatIcon('crown','gold')} ПРЕСТИЖИ И ПРОГРЕСС</div><span class="tag red">ИГРОВАЯ ПРОГРЕССИЯ</span></div>
 ${(()=>{const z=prestigeSummary(p);return `<div class="bn17-prestige-overview"><div class="bn17-prestige-main"><span class="bn17-prestige-medal">${prestigeShield(3)}</span><div><small>СУММАРНЫЙ ПРЕСТИЖ</small><strong>${z.total===null?'—':fmt(z.total)}</strong><span>Сумма престижей всех бойцов</span></div></div><div class="bn17-prestige-count"><span class="bn17-prestige-medal">${prestigeShield(1)}</span><div><small>БОЙЦОВ С ПРЕСТИЖЕМ</small><strong>${z.count??'—'}</strong><span>С престижем 1 и выше</span></div></div></div>${prestigePath(z)}${prestigeEntries(z)}<p class="source-note">${z.full?'Подсчитано по подтверждённым уровням каждого бойца из Supercell API.':z.known?'Часть уровней не получена: значения с символом ≥ — нижняя граница.':'Недостающие показатели не заменяются вычислениями по кубкам.'} Дерево (0–249), бронза (250–499), серебро (500–749), золото (750–999 кубков): по текущим кубкам бойцов до престижа. ≥ означает неполную выборку. Щиты — игровые PNG Brawlify; сумма престижей и число бойцов с престижем — разные показатели.</p>`})()}`,'panel-pad bn17-prestige-panel')}</div>
 <div class="mt-18">${brawlerShowcase(strongest,demo)}</div>
 <div class="mt-18">${panel(`<div class="panel-header"><div class="panel-title">${gameStatIcon('scroll-text','pink')} БОЕВОЙ ЖУРНАЛ</div>${tag(state.battles.length+' МАТЧЕЙ')}</div><div class="bn112-journal">${battleHtml}</div><p class="source-note">Нажми на бой для просмотра составов и кубков.</p>`,'panel-pad bs-journal-panel')}</div>
  <div class="mt-18">${panel(`<div class="panel-header"><div class="panel-title">${gameStatIcon('contact-round','rose')} BRAWLIDEX / ПРОГРЕСС БОЙЦОВ</div>${tag(owned.length+' БОЙЦОВ','red')}</div>
  <div class="bn17-roster-tools"><label>${uiPackImg('search')}<input type="search" class="input" id="bn17RosterSearch" placeholder="Найти бойца по имени..." aria-label="Поиск по бойцам"></label><span id="bn17RosterCount">${owned.length} / ${owned.length}</span></div>
  <div class="bn17-roster-grid">${owned.slice().sort((a,b)=>(prestigeLevel(b)??-1)-(prestigeLevel(a)??-1)||Number(b.trophies||0)-Number(a.trophies||0)).map(b=>`<div class="bn17-roster-card" data-brawler-name="${esc(String(b.name||'').toLowerCase())}">${bimg(b.name)}<div class="bn17-roster-label"><b>${esc(b.name)}</b><small>Сила ${fmt(b.power)}</small></div><div class="bn17-roster-score">${uiPackImg('trophy')} ${fmt(b.trophies)}<small>Рекорд ${fmt(b.highestTrophies)}</small></div><div class="bn17-roster-prestige">${prestigeLevel(b)?`${prestigeShield(prestigeLevel(b))} Престиж ${prestigeLevel(b)}`:prestigeLevel(b)===0?'Пока без престижа':'Нет данных о престиже'}</div><div class="bn17-roster-powerups">${uiPackImg('shield')} ${Array.isArray(b.gadgets)?b.gadgets.length:'—'} гадж. <span>·</span> ${uiPackImg('star')} ${Array.isArray(b.starPowers)?b.starPowers.length:'—'} зв. сил</div></div>`).join('')||'<div class="empty-note">Загрузи профиль, чтобы увидеть своих бойцов и их достижения.</div>'}</div>
  <p class="source-note">Сортировка: престиж → кубки. Поля экипировки и престижа показываются только из ответа API, без попыток угадать по внешнему виду бойца.</p>`,'panel-pad bn17-roster-panel')}</div>
  <div class="mt-18">${panel(`<div class="panel-header"><div class="panel-title">${gameStatIcon('award','gold')} ОБЩИЕ ДОСТИЖЕНИЯ</div>${tag('ДАННЫЕ SUPERCELL','red')}</div><div class="bn17-achievements">
 ${[['trophy','Победы 3 на 3',p?.['3vs3Victories']],['award','Соло-победы',p?.soloVictories],['shield','Дуо-победы',p?.duoVictories],['star','Максимальная серия',p?.highestWinStreak??p?.bestWinStreak],['crown','Бойцы 11 силы',p?owned.filter(b=>Number(b.power)===11).length:null],['gem','Звёздные силы',p?owned.reduce((n,b)=>n+(Array.isArray(b.starPowers)?b.starPowers.length:0),0):null]].map(([iconName,label,value])=>`<div class="bn17-achievement"><span>${uiPackImg(iconName)}</span><small>${label}</small><strong>${fmt(value)}</strong></div>`).join('')}
 </div><p class="source-note">Если Supercell не возвращает значение показателя, показывается «—». Выдуманные показатели ресурсов, скинов и матчей не добавляются.</p>`,'panel-pad bn17-achievement-panel')}</div>
  <div class="mt-18">${panel(`<div class="panel-header"><div class="panel-title">РЕЗУЛЬТАТЫ ПОСЛЕДНИХ БОЁВ</div>${tag(state.battles.length+' MATCHES','cyan')}</div>${gameReport()}` ,'panel-pad')}</div>
 <div class="mt-18">${panel(`<div class="panel-header"><div class="panel-title">ИГРОВОЙ АНАЛИЗ</div><span class="icon-bubble">${icon('brain-circuit')}</span></div><p class="card-sub">${p?`Аккаунт ${esc(p.name)}: ${fmt(p.trophies)} кубков; ${fmt(owned.length)} бойцов. ${state.battles.length?`В доступном журнале ${state.battles.length} матчей. Можно разобрать их результаты и часто используемые составы.`:'Чтобы оценивать винрейт и ошибки, нужен доступный журнал боёв. Официальный API не содержит видеозаписи и положения игрока на карте.'}`:'Введи реальный тег, чтобы получить персональные рекомендации. Без данных игрока нельзя честно рассчитать персональный винрейт, ранг или ошибки.'}</p><div style="margin-top:17px"><button class="button secondary" id="profileAskAI">${icon('sparkles')} ОБСУДИТЬ С NEXUS</button></div>`,'panel-pad')}</div>`;
}
function normalizeNews(n){return {title:n.title||n.name||'Новость',href:n.url||n.href||'https://supercell.com/brawlstars/en/blog/esports/',sub:n.summary||n.description||'Материал официального блога',kind:n.kind||'NEWS',published:n.published||n.date||'',source:n.source||'Supercell'}}
function teamSymbol(name,enemy=false){const logo=logoForTeam(name);const initials=String(name||'TEAM').split(/\s+/).map(w=>w[0]).join('').slice(0,3).toUpperCase();return `<span class="team-symbol ${enemy?'enemy':''}">${logo?`<span class="team-initial-fallback">${esc(initials)}</span><img src="${esc(logo)}" loading="lazy" alt="" onload="this.previousElementSibling.hidden=true" onerror="this.remove()">`:esc(initials)}</span>`}

function cardMatch(m){
 const a=m.teamA||m.a||'Команда A',b=m.teamB||m.b||'Команда B',status=String(m.status||'').toLowerCase();
 const finished=['finished','completed','ended','final'].includes(status),score=m.scoreA!=null&&m.scoreB!=null;
 const when=m.when&&Number.isFinite(new Date(m.when).getTime())?new Date(m.when).toLocaleString('ru-RU',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}):'Время уточняется';
 return panel(`<div class="match-kicker"><span>${esc(m.tournament||'Brawl Stars Championship')}</span>${tag(m.live?'LIVE':finished?'ЗАВЕРШЁН':'РАСПИСАНИЕ',m.live?'green':finished?'gold':'purple')}</div><div class="match-teams"><div class="team-info">${teamSymbol(a)}<b>${esc(a)}</b></div><span class="vs">${score?`${Number(m.scoreA)} : ${Number(m.scoreB)}`:'VS'}</span><div class="team-info">${teamSymbol(b,true)}<b>${esc(b)}</b></div></div><div class="match-foot"><small class="card-sub">${m.winner?`Победитель: ${esc(m.winner)}`:esc(when)}</small>${m.url?`<a class="soft-link" href="${esc(m.url)}" target="_blank" rel="noopener">ИСТОЧНИК ${icon('arrow-up-right')}</a>`:''}<button class="soft-link" data-action="set-match" data-a="${esc(a)}" data-b="${esc(b)}">РАЗБОР ${icon('arrow-right')}</button></div>`,'match-card');
}
function newsCard(n,i){return `<a class="panel news-card" href="${esc(n.href)}" target="_blank" rel="noopener"><div class="panel-header"><span class="news-icon">${icon(i===0?'newspaper':i===1?'trophy':'radio')}</span><span class="eyeline">${esc(n.kind)}</span></div><div><h3>${esc(n.title)}</h3><small>${esc(n.sub)}</small>${n.published?`<time>${esc(new Date(n.published).toLocaleDateString('ru-RU'))}</time>`:''}</div><span class="soft-link">ЧИТАТЬ ${icon('arrow-up-right')}</span></a>`}
function renderEsports(){const live=Array.isArray(state.esportsFeed)&&state.esportsFeed.length;const matchList=live?state.esportsFeed.slice(0,8):[];
 const s=state.scenario;
 $('#page-esports').innerHTML=`${intro('GLOBAL COMPETITIVE SCENE','BRAWL <span>ESPORTS.</span>','Следи за чемпионатами, читай официальные новости и разбирай противостояния. Прогнозы — сценарная оценка, не гарантии результата.','Crow')}
 <div class="esports-hero"><img class="esports-brand-logo" src="https://i.logos-download.com/114291/31448-s640-5a036b5fe92f4275366e06a678754c88.png/Brawl_Stars_Logo_2025-s640.png?dl=" alt="Логотип Brawl Stars 2025" loading="lazy"><div class="eyebrow gold">BRAWL STARS CHAMPIONSHIP</div><h3>WORLD FINALS <span>2026.</span></h3><p>Расписание, реальные результаты и эфир — в официальном турнирном центре Supercell.</p><div class="esports-links"><a class="button" target="_blank" rel="noopener" href="https://event.supercell.com/brawlstars/ru/live/">${icon('radio')} ОФИЦИАЛЬНАЯ ТРАНСЛЯЦИЯ</a><a class="button secondary" target="_blank" rel="noopener" href="https://liquipedia.net/brawlstars/Brawl_Stars_World_Finals/2026">${icon('calendar-days')} СЕТКА ТУРНИРА</a></div></div>
 <div class="mt-24">${section('МАТЧИ И РАЗБОРЫ',live?'Список получен из подключенного esports-feed.':'Матчи, результаты и эфир — в официальном турнирном центре.',tag(live?'TOURNAMENT FEED':'SUPERCELL',live?'cyan':'gold'))}</div>
 <div class="grid-2">${matchList.length?matchList.map(cardMatch).join(''):`<a href="https://event.supercell.com/brawlstars/ru/live/" target="_blank" rel="noopener" class="panel bn112-bsc-link">${icon('radio')}<b>МАТЧИ И ЭФИР</b><span>Официальный турнирный портал ${icon('arrow-up-right')}</span></a>`}</div>
 <div class="mt-24">${section('КОМАНДЫ СЦЕНЫ','Оригинальные командные эмблемы из официальной медиатеки турниров Supercell.')}</div>
 <div class="team-logo-gallery">${ESPORTS_TEAMS.map(name=>`<button type="button" class="team-gallery-item" title="Выбрать ${esc(name)} для сравнения" data-action="choose-team" data-name="${esc(name)}">${teamSymbol(name)}<span>${esc(name)}</span></button>`).join('')}</div>
 <div class="mt-24">${section('NEXUS MATCH ANALYZER','Укажи обе команды и форму по собственным данным за последние серии — увидишь прозрачную сценарную оценку.')}</div>
 ${panel(`<form id="esportsPredictForm"><div class="predict-form"><label><span class="small-label">КОМАНДА A</span><input class="input" id="predictA" required maxlength="40" value="${esc(s.a)}"></label><label><span class="small-label">КОМАНДА B</span><input class="input" id="predictB" required maxlength="40" value="${esc(s.b)}"></label><button type="submit" class="button purple">${icon('brain-circuit')} АНАЛИЗ</button></div><div class="grid-2" style="margin-top:14px"><label><span class="small-label">ФОРМА КОМАНДЫ A (1–5)</span><input type="range" id="formA" min="1" max="5" value="${s.formA}" style="width:100%;accent-color:var(--cyan)"><span id="fALabel" class="help-text">${s.formA} / 5</span></label><label><span class="small-label">ФОРМА КОМАНДЫ B (1–5)</span><input type="range" id="formB" min="1" max="5" value="${s.formB}" style="width:100%;accent-color:var(--pink)"><span id="fBLabel" class="help-text">${s.formB} / 5</span></label></div></form><div id="esportsResult">${s.result?makeScenarioResult(s.result):`<div class="empty-note" style="margin-top:15px">Здесь появится сценарный индекс двух команд. Он вычисляется только из указанных тобой оценок формы, <strong>не представляет статистическую вероятность победы</strong>.</div>`}</div>`,'panel-pad')}
 <div class="mt-24">${section('НОВОСТИ СЦЕНЫ','Официальные материалы Supercell. Свежие публикации загружаются при доступности источника.',`<a class="soft-link" target="_blank" rel="noopener" href="https://supercell.com/brawlstars/en/blog/esports/">ВСЕ НОВОСТИ ${icon('arrow-up-right')}</a>`)}</div><div class="grid-3">${[...(live?state.esportsFeed.filter(m=>m.winner&&['finished','completed','ended','final'].includes(String(m.status||'').toLowerCase())).slice(0,4).map(m=>({title:`${m.winner} — победа над ${m.winner===m.teamA?m.teamB:m.teamA}`,href:m.url||'https://event.supercell.com/brawlstars/ru/live/',sub:`${m.tournament}${m.scoreA!=null&&m.scoreB!=null?' · '+m.scoreA+':'+m.scoreB:''}`,kind:'РЕЗУЛЬТАТ',published:m.when})):[]),...state.news].slice(0,12).map(newsCard).join('')}</div>`;
}
function makeScenarioResult(r){return `<div class="prediction-box" style="margin-top:16px"><div class="prediction-labels"><span>${esc(r.a)} · ${r.left}%</span><span>${esc(r.b)} · ${100-r.left}%</span></div><div class="prediction-meter"><span style="width:${r.left}%"></span></div><div class="prediction-note">Модельный индекс на основе выставленных оценок формы (${r.fa}/5 и ${r.fb}/5). <strong>Не вероятность победы и не результат анализа реальных матчей.</strong> Для настоящей модели нужны результаты серий, карты, составы и данные об уровне соперников.</div></div>`}
function assessDraft(){if(state.draft.mapId)state.draft.terrain=terrainEstimate(byMapId(state.draft.mapId)).type;const {ally,enemy,bans,mode}=state.draft;const used=new Set([...ally,...enemy,...bans]);const ownRoles=ally.map(n=>role(getB(n)));let all=state.catalog.filter(b=>b.released!==false&&!used.has(b.name));if(state.draft.ownedOnly&&state.player?.brawlers?.length)all=all.filter(isRankedEligibleBrawler);
 let scores=all.map(b=>{let score=45,reasons=[];const r=role(b);
 if((MODE_PREFS[mode]||[]).includes(r)){score+=13;reasons.push(`Роль «${ROLES_RU[r]||r}» подходит под задачи режима`)}
 if(state.draft.terrain==='open' && r==='Marksman'){score+=10;reasons.push('На открытых линиях стрелок может держать дистанцию')}
 if(state.draft.terrain==='closed' && ['Artillery','Tank','Controller'].includes(r)){score+=8;reasons.push('Укрытия и стены благоприятны для этой роли')}
 if(state.draft.terrain==='open' && r==='Tank'){score-=8;reasons.push('Танк рискует на открытой карте без прикрытия')}
 if(ally.length && !ownRoles.includes(r)){score+=9;reasons.push('Добавляет другую роль в состав')}
 const victims=enemy.filter(e=>COUNTERS[e]?.some(c=>c.toLowerCase().replace(/\W/g,'')===b.name.toLowerCase().replace(/\W/g,'')));
 if(victims.length){score+=Math.min(32,19+victims.length*8);reasons.push(`Контрпик против: ${victims.join(', ')}`)}
 if(ally.length && ownRoles.filter(a=>a===r).length>=2){score-=14;reasons.push('В команде уже много бойцов этой роли')}
 if(enemy.length && r==='Tank' && enemy.some(e=>['Colette','Spike','Shelly'].includes(e))){score-=22;reasons.push('Риск против врага с высоким уроном по танкам')}
 if(enemy.length && r==='Artillery' && enemy.some(e=>['Mortis','Edgar','Mico'].includes(e))){score-=19;reasons.push('Мобильные враги могут быстро сближаться')}
 if(!reasons.length)reasons.push('Универсальный вариант; проверь карту и состав команды');return {b,score:Math.max(10,Math.min(98,score)),reason:reasons.join(' · ')}
 });return scores.sort((a,b)=>b.score-a.score||a.b.name.localeCompare(b.b.name)).slice(0,5)}
// A single token controls all six pick turns. The official 1-2-2-1 snake is
// first, second, second, first, first, second. Bans are registered separately.
const SNAKE_ORDER=['first','second','second','first','first','second'];
function draftSequence(){const first=state.draft.token;return SNAKE_ORDER.map(x=>x==='first'?first:(first==='ally'?'enemy':'ally'))}
function draftCurrent(){const d=state.draft;if(d.phase==='bans')return {phase:'bans',index:d.bans.length};const index=d.pickHistory.length;return {phase:'picks',index,side:draftSequence()[index]||null}}
function draftRebuild(){const d=state.draft;for(const side of ['ally','enemy'])d[side]=d.pickHistory.filter(x=>x.side===side&&x.name).map(x=>x.name)}
function draftSave(){try{const d=state.draft;localStorage.setItem('bn_draft_v12',JSON.stringify({token:d.token,phase:d.phase,pickHistory:d.pickHistory,bans:d.bans,mode:d.mode,terrain:d.terrain,mapId:d.mapId,ownedOnly:d.ownedOnly,playlist:d.playlist,trophyMode:d.trophyMode,trophyMapName:d.trophyMapName,trophyOwnedOnly:d.trophyOwnedOnly}))}catch{}}
function draftAdd(name){const d=state.draft;if([...d.ally,...d.enemy,...d.bans].includes(name)){toast('Этот боец уже выбран или забанен');return false}const t=draftCurrent();if(t.phase==='bans'){if(d.bans.length>=6){toast('Все шесть банов уже выбраны');return false}d.bans.push(name);if(d.bans.length===6){d.phase='picks';toast('Баны готовы! Начинается фаза пиков')}return true}
 if(!t.side){toast('Все шесть пиков уже заполнены');return false}
 d.pickHistory.push({side:t.side,name});draftRebuild();if(d.pickHistory.length===6)toast('Драфт завершён — проверь итоговый состав');return true}
function draftUndo(){const d=state.draft;if(d.phase==='picks'&&d.pickHistory.length){d.pickHistory.pop();draftRebuild()}else if(d.phase==='picks'){d.phase='bans'}else if(d.bans.length){d.bans.pop()}else{toast('Отменять нечего');return}draftChange()}
function draftSlot(side,i){const d=state.draft;const entry=d.pickHistory.map((x,index)=>({...x,index})).filter(x=>x.side===side)[i];const n=entry?.name;const skipped=entry&&n===null;return `<div class="draft-slot ${n?'selected':''} ${side==='enemy'?'enemy':''} ${skipped?'slot-skipped':''} ${!entry?'empty':''}"><span class="slot-number">0${i+1}</span>${n?`${bimg(n)}<small>${esc(n)}</small>`:skipped?'<span class="slot-question">?</span><small>Неизвестен</small>':''}${entry?`<button class="remove" data-action="draft-rewind" data-index="${entry.index}" aria-label="Откатить до выбора ${i+1}">×</button>`:''}</div>`}
function draftProgressUI(){const d=state.draft,t=draftCurrent(),seq=draftSequence(),own=d.token==='ally';const picks=seq.map((side,i)=>{const entry=d.pickHistory[i];const name=entry?.name;return `<div class="snake-step ${i===t.index&&t.phase==='picks'?'current':''} ${entry?'done':''} ${side==='enemy'?'enemy':''}" title="Ход ${i+1}: ${side==='ally'?'наша команда':'соперники'}"><span class="snake-no">${i+1}</span>${name?bimg(name,'snake-portrait'):`<span class="snake-dot">${entry?'?':(side==='ally'?'◆':'◇')}</span>`}<small>${side==='ally'?'НАШИ':'ВРАГИ'}</small></div>`}).join('');
 const banner=t.phase==='bans'?`<div class="turn-banner ban-banner"><span class="turn-count">BAN PHASE · ${d.bans.length}/6</span><b>ОТМЕТЬ БАНЫ</b><small>До шести забаненных бойцов — одной сеткой. Первым пикнет ${own?'наша команда':'соперник'}.</small></div>`:t.side?`<div class="turn-banner ${t.side==='ally'?'turn-own':'turn-enemy'}"><span class="turn-count">PICK ${t.index+1} / 6</span><b>${t.side==='ally'?'НАШ ХОД — КОГО БЕРЁМ?':'ХОД СОПЕРНИКА — КОГО ВЗЯЛИ?'}</b><small>${t.side==='ally'?'Выбери своего бойца: подсказки справа уже учитывают предыдущие пики.':'Отметь выбранного соперником бойца — следующий ход определится автоматически.'}</small></div>`:`<div class="turn-banner turn-finished"><span class="turn-count">DRAFT COMPLETE</span><b>СОСТАВЫ ГОТОВЫ</b><small>Все шесть выборов внесены. Можно изучить контрпики или отменить последний ход.</small></div>`;
 return `<div class="draft-sequence"><div class="coin-head"><div><span class="small-label">ЖЕТОН ПЕРВОГО ВЫБОРА</span><div class="coin-hint">Выбери, кому выпал первый пик. Дальше команды переключаются сами.</div></div><div class="coin-buttons"><button type="button" class="coin-option ${own?'active':''}" data-action="draft-token" data-token="ally" ${d.pickHistory.length?'disabled':''}><span>🪙</span> У НАС</button><button type="button" class="coin-option ${!own?'active':''}" data-action="draft-token" data-token="enemy" ${d.pickHistory.length?'disabled':''}><span>🪙</span> У ВРАГОВ</button></div></div>${banner}<div class="snake-track" aria-label="Очередность шести пиков">${picks}</div><div class="draft-flow-actions">${t.phase==='bans'?`<button class="button sm" data-action="draft-start-picks">${d.bans.length?'ЗАКОНЧИТЬ БАНЫ':'ПРОПУСТИТЬ БАНЫ'} ${icon('arrow-right')}</button>`:t.side?`<button class="button secondary sm" data-action="draft-skip" title="Если не успел увидеть выбор, оставь неизвестного бойца в этом слоте">${icon('skip-forward')} ПРОПУСТИТЬ ПИК</button>`:''}${t.phase==='picks'&&!d.pickHistory.length?`<button class="button secondary sm" data-action="draft-reopen-bans">${icon('ban')} К БАНАМ</button>`:''}<button class="button secondary sm" data-action="draft-undo" ${t.phase==='bans'&&!d.bans.length?'disabled':''}>${icon('undo-2')} НАЗАД</button><span class="flow-caption">Баны: ${d.bans.length}/6 · Пики: ${d.pickHistory.length}/6 · Без ручного выбора стороны на каждом ходе</span></div></div>`;
}
function matchingMaps(){const en=MODE_EN[state.draft.mode];return state.maps.filter(m=>m&&m.gameMode&&(m.gameMode.name===en||String(m.gameMode.name||'').toLowerCase()===String(en).toLowerCase())).slice(0,90)}
function mapPreview(){const m=matchingMaps().find(x=>String(x.id)===String(state.draft.mapId));const t=terrainEstimate(m);if(m)state.draft.terrain=t.type;return `<div class="map-preview">${m?.imageUrl?img(m.imageUrl,m.name,'map-cover'): `<div class="map-placeholder">${icon('map')}</div>`}<div class="map-preview-info"><b>${esc(m?.name||'КАРТА НЕ ВЫБРАНА')}</b><span>${m?'Оригинальная миниатюра карты':'Выбери карту из игрового каталога'}</span><small>${esc(t.basis)}.</small></div></div>`}
function getVisibleBrawlers(){const d=state.draft;let a=state.catalog.filter(b=>b.released!==false);if(d.query){const q=d.query.trim().toLowerCase();a=a.filter(b=>b.name.toLowerCase().includes(q))}if(d.classFilter!=='Все')a=a.filter(b=>role(b)===d.classFilter);if(d.favoritesOnly)a=a.filter(b=>d.favorites.includes(b.name));if(d.ownedOnly&&state.player?.brawlers?.length&&d.phase==='picks'&&draftCurrent().side==='ally')a=a.filter(isRankedEligibleBrawler);return a.sort((a,b)=>Number(d.favorites.includes(b.name))-Number(d.favorites.includes(a.name))||a.name.localeCompare(b.name))}
function drawPicker(){const el=$('#brawlerPicker');if(!el)return;const {ally,enemy,bans,favorites}=state.draft;const visible=getVisibleBrawlers();const counter=$('#draftVisibleCount');if(counter)counter.textContent=`${visible.length} / ${state.draft.ownedOnly&&state.player?.brawlers?.length&&draftCurrent().phase==='picks'&&draftCurrent().side==='ally'?state.player.brawlers.length:state.catalog.length}`;el.innerHTML=visible.slice(0,160).map(b=>{const chosen=ally.includes(b.name)||enemy.includes(b.name),banned=bans.includes(b.name),fav=favorites.includes(b.name),disabled=chosen||banned||(state.draft.phase==='picks'&&state.draft.pickHistory.length>=6);return `<div class="pick-tile ${chosen?'chosen':''} ${banned?'banned':''}"><button type="button" class="brawler-pick ${chosen?'chosen':''} ${banned?'banned':''}" data-action="draft-pick" data-name="${esc(b.name)}" title="Выбрать ${esc(b.name)} · ${esc(ROLES_RU[role(b)]||role(b))}" ${disabled?'disabled':''}>${img(b.imageUrl,b.name)}<span>${esc(b.name)}</span>${banned?'<span class="banned-x">×</span>':''}</button><button class="pick-favorite ${fav?'saved':''}" type="button" data-action="draft-favorite" data-name="${esc(b.name)}" aria-label="${fav?'Убрать из избранного':'В избранное'}: ${esc(b.name)}" title="Избранное">${fav?'★':'☆'}</button></div>`}).join('')||'<div class="empty-note">Ничего не найдено. Измени поиск или фильтры.</div>'}

function drawRecommendations(){const el=$('#draftRecommendations');if(!el)return;const t=draftCurrent(),top=assessDraft(),canPick=t.phase==='picks'&&t.side==='ally',enemies=state.draft.enemy.filter(Boolean);el.innerHTML=`<div class="panel-header"><div class="panel-title">${t.phase==='bans'?'ПОДГОТОВКА СОСТАВА':t.side==='enemy'?'ПЛАН НА НАШ СЛЕДУЮЩИЙ ХОД':'NEXUS RECOMMENDS'}</div>${tag('HEURISTIC MODEL','purple')}</div>${t.phase==='bans'?'<p class="help-text">Пока отмечаешь баны, система показывает перспективные варианты для своей команды. После банов и пиков противника оценки пересчитаются.</p>':''}${enemies.length?`<div class="bn115-enemies"><b>СОПЕРНИК ВЫБРАЛ · КОНТРПИКИ ПЕРЕСЧИТАНЫ</b><div>${enemies.map(n=>`<span>${bimg(n)}${esc(n)}</span>`).join('')}</div></div>`:''}<div style="display:grid;gap:9px">${top.map((x,i)=>`<div class="analysis-line">${img(x.b.imageUrl,x.b.name)}<div class="reason"><b>${i+1}. ${esc(x.b.name)}</b><p>${esc(x.reason)}</p></div><div class="score-pill">${x.score}</div><button class="icon-btn" title="${canPick?'Выбрать для своей команды':'Доступно в свой ход пика'}" data-action="recommend-pick" data-name="${esc(x.b.name)}" ${canPick?'':'disabled'}>${icon('plus')}</button></div>`).join('')}</div><p class="source-note" style="margin:12px 0 0">Индекс 0–100 — эвристика по ролям, режиму, характеру карты и известным матчапам. Не официальный винрейт и не прогноз победы. Список предназначен для нашей команды.</p>`;learnIcons()}

const TROPHY_MODE_PRESETS=['soloShowdown','duoShowdown','trioShowdown','brawlBall','gemGrab','knockout','hotZone','heist','bounty','wipeout','basketBrawl','volleyBrawl','duels','brawlArena','deathmatch5v5'];
function metaModeSelector(){
 const d=state.draft;
 return `<div class="bn115-modes" role="group" aria-label="Выбери тип матча">
  <button type="button" data-action="meta-playlist" data-playlist="trophy" aria-pressed="${d.playlist!=='ranked'}" class="bn115-mode-button bn115-trophy ${d.playlist!=='ranked'?'selected':''}">
   <span class="bn115-mode-art">${uiPackImg('trophy')}</span><span class="bn115-mode-label"><b>ИГРА НА ТРОФЕИ</b><small>Ладдер · соло, дуо и командные режимы</small></span><span class="bn115-mode-check">${icon('check-circle-2')}</span>
  </button>
  <button type="button" data-action="meta-playlist" data-playlist="ranked" aria-pressed="${d.playlist==='ranked'}" class="bn115-mode-button bn115-ranked ${d.playlist==='ranked'?'selected':''}">
   <span class="bn115-mode-art">${rankPic('Legendary','bn115-ranked-symbol')}</span><span class="bn115-mode-label"><b>СИЛОВАЯ ЛИГА</b><small>Ranked · жетон, баны, пики и контрпики</small></span><span class="bn115-mode-check">${icon('check-circle-2')}</span>
  </button>
 </div>`;
}
function trophyModesAvailable(){
 const order=[...TROPHY_MODE_PRESETS,...(state.rotationEvents||[]).map(e=>e.mode),...(state.maps||[]).map(m=>m?.gameMode?.name)];
 return [...new Map(order.filter(Boolean).map(mode=>[normMode(mode),String(mode)])).values()].filter(mode=>normMode(mode)!=='').sort((a,b)=>{
  const i=TROPHY_MODE_PRESETS.findIndex(x=>normMode(x)===normMode(a)),j=TROPHY_MODE_PRESETS.findIndex(x=>normMode(x)===normMode(b));
  return (i<0?999:i)-(j<0?999:j)||modeName(a).localeCompare(modeName(b),'ru');
 });
}
function trophyMapsAvailable(){
 const d=state.draft,mode=normMode(d.trophyMode);
 const feed=rotationEntries().filter(e=>normMode(e.mode)===mode).map(e=>({...e,live:!!e.live}));
 const catalog=(state.maps||[]).filter(m=>normMode(m?.gameMode?.name)===mode).map(m=>({id:String(m.id||''),key:String(m.id||''),name:String(m.name||''),mode:d.trophyMode,imageUrl:m.imageUrl||'',live:false}));
 const set=new Set();
 return [...feed,...catalog].filter(m=>{const key=NORM_MAP(m.name);if(!key||set.has(key))return false;set.add(key);return true});
}
function chosenTrophyMap(){
 const d=state.draft,all=trophyMapsAvailable();
 return all.find(m=>NORM_MAP(m.name)===NORM_MAP(d.trophyMapName))||all[0]||null;
}
const TROPHY_BRAWLER_LISTS={
 soloShowdown:['Cordelius','Shelly','Leon','Surge','Max','Crow','Lily','Buzz','Piper','Stu','Angelo','Bibi'],
 duoShowdown:['Max','Gene','Sandy','Gus','Leon','Cordelius','Byron','Piper','Crow','Spike','Belle','Angelo'],
 trioShowdown:['Max','Sandy','Gene','Spike','Belle','Gale','Stu','Gus','Piper','Rico','Colette','Leon'],
 brawlBall:['Gale','Max','Sandy','Stu','Bibi','Surge','Cordelius','Rico','Colette','Gene','Jacky'],
 gemGrab:['Gene','Sandy','Belle','Max','Rico','Piper','Jessie','Byron','Pam','Gus','Spike'],
 heist:['Colt','Colette','Jessie','8-Bit','Chuck','Brock','Melodie','Nita','Rico','Crow'],
 knockout:['Piper','Belle','Nani','Angelo','Gus','Gene','Mandy','Brock','Max','Byron'],
 hotZone:['Sandy','Gale','Emz','Lou','Rico','Jessie','Spike','Poco','Jacky','Bibi'],
 bounty:['Piper','Belle','Mandy','Nani','Brock','Angelo','Gene','Gus'],
 wipeout:['Piper','Nani','Belle','Brock','Gene','Max','Angelo','Crow'],
 basketBrawl:['Gale','Max','Sandy','Bibi','Colette','Stu','Surge'],
 duels:['Cordelius','Shelly','Leon','Surge','Piper','Nani','Buzz','Max'],
 brawlArena:['Colt','Jessie','Piper','Max','Spike','Rico','8-Bit','Sandy'],
 deathmatch5v5:['Sandy','Gale','Gene','Max','Belle','Spike','Piper','Stu','Rico','Byron']
};
function trophyPickAdvice(map){
 const mode=normMode(map?.mode||state.draft.trophyMode);
 const terrain=terrainEstimate(map).type;
 const teamSize=modePickCount(map?.mode||state.draft.trophyMode);
 let names=TROPHY_BRAWLER_LISTS[mode]||[];
 if(mode==='soloshowdown'&&terrain==='open')names=['Piper','Max','Leon','Crow','Angelo','Cordelius','Shelly','Stu','Surge','Lily','Buzz'];
 const terrainNames=terrain==='open'?['Piper','Belle','Nani','Angelo','Brock']:terrain==='closed'?['Rico','Bibi','Sandy','Jacky','Cordelius']:['Gale','Max','Spike','Stu','Jessie'];
 const candidates=[...new Set([...names,...terrainNames,...(state.catalog||[]).map(b=>b.name)])].map(n=>getB(n)).filter(b=>b&&b.released!==false);
 const owned=new Map((state.player?.brawlers||[]).map(b=>[String(b.name||'').toLowerCase(),b]));
 const hasPlayer=owned.size>0;
 const pool=state.draft.trophyOwnedOnly&&hasPlayer?candidates.filter(b=>owned.has(b.name.toLowerCase())):candidates;
 const roleWanted=mode==='soloshowdown'?['Assassin','Damage Dealer','Controller']:mode==='duoshowdown'?['Support','Controller','Assassin','Marksman']:(MODE_PREFS[Object.keys(MODE_EN).find(k=>normMode(MODE_EN[k])===mode)]||[]);
 const result=pool.map((b,i)=>{
  const p=owned.get(b.name.toLowerCase());
  let points=70-(i<names.length?i*3:Math.min(30,14+i));
  const r=role(b);
  if(roleWanted.includes(r))points+=6;
  if(terrain==='open'&&r==='Marksman')points+=6;
  if(terrain==='closed'&&['Tank','Artillery','Controller'].includes(r))points+=5;
  if(p)points+=Math.min(9,Math.round(Number(p.trophies||0)/350));
  const reason=i<names.length?'Подходит под задачи режима и карту':'Запасной вариант по роли и характеру карты';
  return {b,points:Math.max(1,Math.min(99,points)),reason,player:p,role:r};
 }).sort((a,b)=>b.points-a.points||a.b.name.localeCompare(b.b.name));
 const lineup=[],roles=new Set();
 for(const item of result){if(lineup.length>=teamSize)break;if(!roles.has(item.role)){lineup.push(item);roles.add(item.role)}}
 for(const item of result){if(lineup.length>=teamSize)break;if(!lineup.includes(item))lineup.push(item)}
 return {result,teamSize,lineup,hasPlayer,terrain};
}
function renderTrophyAdvisor(){
 const d=state.draft,m=chosenTrophyMap();
 const chosen=m||{mode:d.trophyMode,name:'Карта не выбрана'};
 const modes=trophyModesAvailable(),maps=trophyMapsAvailable();
 const advice=trophyPickAdvice(chosen),count=advice.teamSize,solo=count===1;
 const selectable=advice.result.slice(0,Math.max(8,count+5));
 const modeInfo=modeName(d.trophyMode);
 const active=state.rotationEvents?.some(e=>NORM_MAP(e.map)===NORM_MAP(chosen.name)&&normMode(e.mode)===normMode(chosen.mode));
 const rosterLabel=state.player?.brawlers?.length?d.trophyOwnedOnly?'ТВОИ БОЙЦЫ':'ВСЕ БОЙЦЫ':'ГОСТЕВОЙ РЕЖИМ';
 const lineup=advice.lineup;
 return `<div class="bn115-trophy-page">
   <div class="bn115-trophy-intro"><div>${uiPackImg('trophy')}<span><b>TROPHY INTELLIGENCE</b><small>Выбирай лучшего бойца на карте без банов и очереди пиков. Советы учитывают режим и тип карты.</small></span></div><span class="bn115-live-label">${active?'● LIVE ROTATION':'MAP CATALOG'}</span></div>
   <div class="bn115-trophy-controls panel panel-pad">
    <label><span class="small-label">РЕЖИМ ИГРЫ</span><select class="select" id="trophyMode">${modes.map(mode=>`<option value="${esc(mode)}" ${normMode(mode)===normMode(d.trophyMode)?'selected':''}>${esc(modeName(mode))}</option>`).join('')}</select></label>
    <label><span class="small-label">КАРТА · BRAWLAPI / SUPERCELL</span><select class="select" id="trophyMap">${maps.length?maps.map(map=>`<option value="${esc(map.name)}" ${NORM_MAP(map.name)===NORM_MAP(chosen.name)?'selected':''}>${esc(map.name)}${map.live?' · LIVE':''}</option>`).join(''):'<option value="">Нет карт в каталоге</option>'}</select></label>
    <button class="bn115-roster-toggle ${state.player?.brawlers?.length&&d.trophyOwnedOnly?'active':''}" type="button" data-action="trophy-owned" ${!state.player?.brawlers?.length?'disabled title="Загрузи свой профиль, чтобы включить фильтр"':''}>${uiPackImg('contact-round')} ${rosterLabel}</button>
   </div>
   <div class="bn115-trophy-layout">
    <section class="bn115-map-panel panel panel-pad">
     <div class="panel-header"><div class="panel-title">${modeGameIcon(chosen.mode)} ${esc(modeInfo)}</div><span class="tag red">${count===1?'СОЛО':count+' ИГРОКА'}</span></div>
     <div class="bn115-map-art">${m?.imageUrl?img(m.imageUrl,m.name):`<div class="n16-map-placeholder">${icon('map')} Нет изображения</div>`}</div>
     <h3>${esc(m?.name||'Выбери карту')}</h3>
     ${terrainBadge(chosen)}
     <p class="card-sub">${solo?'В соло ты выбираешь одного бойца, но ниже показаны разные подходящие варианты — это не состав из трёх.':count===2?'В дуо важна взаимодополняющая пара. Ниже — пример связки и альтернативы для каждого игрока.':'В командном режиме показан пример состава и запасные варианты. Учитывай пики союзников и карту.'}</p>
    </section>
    <section class="bn115-picks-panel panel panel-pad">
      <div class="panel-header"><div class="panel-title">${uiPackImg('star')} ${solo?'КОГО ВЫБРАТЬ В СОЛО':`СОСТАВ НА ${count} ИГРОКОВ`}</div><span class="tag gold">ЭВРИСТИКА · НЕ WR</span></div>
      ${!solo&&lineup.length?`<div class="bn115-team-row">${lineup.map((x,i)=>`<div class="bn115-team-member">${bimg(x.b.name)}<b>${esc(x.b.name)}</b><small>${i+1} · ${esc(ROLES_RU[x.role]||'Боец')}</small></div>`).join('')}</div>`:''}
      <p class="bn115-tip">${solo?'Рекомендуемые альтернативы для одного игрока (не нужно выбирать всех).':`Ниже ещё варианты на случай недоступного бойца или другого состава.`}</p>
      <div class="bn115-candidates">${selectable.map((x,i)=>`<article class="bn115-pick-card">${bimg(x.b.name)}<div class="bn115-pick-meta"><b>${i+1}. ${esc(x.b.name)}</b><small>${esc(ROLES_RU[x.role]||'Боец')} · ${esc(x.reason)}</small>${x.player?`<em>${uiPackImg('trophy')} ${fmt(x.player.trophies)} твоих кубков · Сила ${fmt(x.player.power)}</em>`:''}</div><span class="bn115-pick-rank">#${i+1}</span></article>`).join('')||`<div class="empty-note">${advice.hasPlayer&&d.trophyOwnedOnly?'Нет доступных бойцов с подходящими данными. Отключи фильтр «Твои бойцы».':'Не удалось получить бойцов каталога. Проверь подключение BrawlAPI.'}</div>`}</div>
      <p class="source-note">Рекомендации основаны на характере карты, ролях, режиме и (при наличии профиля) кубках бойца. Это не официальный винрейт. Драфт с банами доступен во вкладке «Силовая лига».</p>
    </section>
   </div>
 </div>`;
}

function renderMeta(){const d=state.draft,t=draftCurrent();
 if(d.playlist!=='ranked'){$('#page-meta').innerHTML=`${intro('TROPHY INTELLIGENCE','META <span>LAB.</span>','Трофейные режимы: подбор одного бойца для соло, пары для дуо и состава для командной игры.','Max')}${metaModeSelector()}${renderTrophyAdvisor()}`;learnIcons();return}
 $('#page-meta').innerHTML=`${intro('TACTICAL DRAFT ENGINE','META <span>LAB.</span>','Реальный порядок выбора 1–2–2–1. Укажи владельца жетона первого пика, отметь баны и выбирай бойцов в очереди — переключать сторону больше не нужно.','Gale')}${metaModeSelector()}
 <div class="draft-live-bar ${d.liveMode?'is-live':''}"><div class="live-callout"><span class="live-beacon"></span><div><b>${d.liveMode?'LIVE DRAFT / РЕЖИМ МАТЧА':'DRAFT ASSIST / ПЕРЕД РАНГОВОЙ'}</b><small>${d.liveMode?'После каждого пика очередь и подсказки обновляются мгновенно. Ввод вручную: официальный API не передаёт живые пики.':'Запусти компактную рабочую панель для выбора во время матча.'}</small></div></div><div class="live-actions"><button class="button ${d.liveMode?'secondary':'purple'} sm" data-action="live-mode">${icon(d.liveMode?'minimize':'maximize')} ${d.liveMode?'ВЫЙТИ ИЗ LIVE':'ЗАПУСТИТЬ LIVE DRAFT'}</button><span class="hotkey-hint">/ ПОИСК · ENTER ПИК · CTRL+Z ОТМЕНА</span></div></div>
 ${panel(`<div class="draft-tools draft-tools-v12"><label><span class="small-label">РЕЖИМ</span><select class="select" id="draftMode">${MODES.map(m=>`<option ${m===d.mode?'selected':''}>${m}</option>`).join('')}</select></label><label><span class="small-label">КАРТА (BRAWLAPI)</span><select class="select" id="draftMap"><option value="">Выбрать карту...</option>${matchingMaps().map(m=>`<option value="${esc(m.id)}" ${String(d.mapId)===String(m.id)?'selected':''}>${esc(m.name)}</option>`).join('')}</select></label><button class="button secondary sm" data-action="draft-reset">${icon('rotate-ccw')} НОВЫЙ ДРАФТ</button></div><div class="terrain-bar">${mapPreview()}<div class="terrain-controls"><span class="small-label">ХАРАКТЕР КАРТЫ / АВТО</span>${terrainBadge(matchingMaps().find(x=>String(x.id)===String(d.mapId)))}<small class="terrain-caption">Без ручного переключателя — меняется с картой</small></div></div>${draftProgressUI()}<div class="draft-board"><div class="panel draft-team ${t.side==='ally'?'board-active-own':''}"><div class="draft-title"><strong style="color:var(--cyan)">НАША КОМАНДА</strong>${tag(d.pickHistory.filter(x=>x.side==='ally').length+'/3','cyan')}</div><div class="draft-slots">${[0,1,2].map(i=>draftSlot('ally',i)).join('')}</div></div><div class="panel draft-team ${t.side==='enemy'?'board-active-enemy':''}"><div class="draft-title"><strong style="color:var(--pink)">СОПЕРНИК</strong>${tag(d.pickHistory.filter(x=>x.side==='enemy').length+'/3','red')}</div><div class="draft-slots">${[0,1,2].map(i=>draftSlot('enemy',i)).join('')}</div></div></div><div class="eyeline" style="margin:16px 0 10px">ЗАБАНЕННЫЕ ${d.bans.length}/6</div><div class="bans-list bans-v12">${d.bans.map(n=>`<div class="ban-icon">${bimg(n)}<span>${esc(n)}</span>${d.phase==='bans'?`<button class="ban-remove" data-action="draft-unban" data-name="${esc(n)}" title="Убрать бан">×</button>`:''}</div>`).join('')||'<span class="help-text">Пока нет банов — можно перейти прямо к пикам</span>'}</div>`,'panel-pad')}
 <div class="grid-2 mt-18 meta-workspace"><div>${panel(`<div class="picker-turn-glance ${t.phase==='bans'?'glance-ban':t.side==='enemy'?'glance-enemy':'glance-ally'}"><span class="glance-light"></span><b>${t.phase==='bans'?'ФАЗА БАНОВ':!t.side?'ДРАФТ ЗАВЕРШЁН':t.side==='ally'?'СЕЙЧАС НАШ ПИК':'СЕЙЧАС ПИК СОПЕРНИКА'}</b><span>${t.phase==='picks'?'ХОД '+Math.min(t.index+1,6)+' / 6':d.bans.length+' / 6 БАНОВ'}</span></div><div class="panel-header"><div class="panel-title">${t.phase==='bans'?'ВЫБЕРИ БОЙЦА ДЛЯ БАНА':!t.side?'ДРАФТ ЗАВЕРШЁН':t.side==='ally'?'ВЫБЕРИ НАШ ПИК':'ОТМЕТЬ ПИК СОПЕРНИКА'} <span class="picker-counter" id="draftVisibleCount">${state.catalog.length}</span></div><button type="button" class="favorite-filter bn114-owned-filter ${d.ownedOnly&&state.player?.brawlers?.length?'active':''}" data-action="draft-only-owned" ${!state.player?.brawlers?.length?'disabled title="Сначала загрузи свой профиль"':'title="Только открытые на аккаунте бойцы 11-й силы"'}>${state.player?.brawlers?.length?d.ownedOnly?'✓ МОИ БОЙЦЫ · 11 СИЛА':'ВСЕ БОЙЦЫ':'ЗАГРУЗИ ПРОФИЛЬ'}</button><button class="favorite-filter ${d.favoritesOnly?'active':''}" data-action="draft-only-favorites" title="Показать избранных">★ ${d.favoritesOnly?'ТОЛЬКО ИЗБРАННЫЕ':'ИЗБРАННОЕ'}</button></div><label class="picker-search"><span>${icon('search')}</span><input class="input" placeholder="Быстрый поиск бойца по имени..." autocomplete="off" id="draftSearch" value="${esc(d.query)}" aria-label="Поиск бойца"></label><div class="pick-filter-row"><button class="role-chip ${d.classFilter==='Все'?'active':''}" data-action="draft-role" data-role="Все">ВСЕ</button>${Object.entries(ROLES_RU).map(([en,ru])=>`<button class="role-chip ${d.classFilter===en?'active':''}" data-action="draft-role" data-role="${en}">${ru}</button>`).join('')}</div><p class="help-text picker-hint">${t.phase==='bans'?'Нажми на бойца, чтобы забанить. После шести банов начнутся пики.':t.side==='ally'?'Сейчас выбирает наша команда. При фильтре «Мои бойцы» показаны только персонажи 11-й силы из твоего профиля. Сезонных бесплатных бойцов API не раскрывает.':t.side==='enemy'?'Нажми на бойца, которого забрал соперник. Не нужно менять команду вручную.':'Все пики внесены. Исправь последний ход кнопкой «Назад».'}</p><div id="brawlerPicker" class="brawler-picker"></div>`,'panel-pad')}</div><div>${panel(`<div id="draftRecommendations"></div>`,'panel-pad')}<div class="panel panel-pad mt-18"><div class="panel-header"><div class="panel-title">О РЕЖИМЕ LIVE DRAFT</div><span class="icon-bubble purple">${icon('brain-circuit')}</span></div><div class="card-sub" style="line-height:1.9">1. Укажи, у кого жетон первого пика.<br>2. Запиши до шести банов или пропусти их.<br>3. Дальше очередь 1–2–2–1 переключается сама.<br>4. Если не успел заметить пик, нажми «Пропустить пик» и продолжай.<br>5. Совет пересчитывается для своей команды после каждого выбора.</div><button class="button secondary sm" style="margin-top:14px" id="metaAskAI">${icon('sparkles')} ОБСУДИТЬ ДРАФТ</button></div></div></div>`;
 drawPicker();drawRecommendations();learnIcons();
}
function normalizePlayer(payload){let p=payload?.player||payload?.data?.player||payload?.data||payload;return p&&typeof p==='object'&&p.name&&p.tag?p:null}
function renderSquad(){const tags=state.squad.tags;const people=state.squad.members;
 $('#page-squad').innerHTML=`${intro('YOUR TEAM. ONE MIND.','SQUAD <span>HUB.</span>','Собери свою тройку по игровым тегам, сравни аккаунты, любимых бойцов и распределение ролей. Данные игроков загружаются из API, если доступен.','Max')}
 ${panel(`<div class="panel-header"><div class="panel-title">СОЗДАТЬ ТРОЙКУ</div>${tag('3 PLAYER SLOTS','cyan')}</div><form id="squadForm" class="squad-form">${[0,1,2].map((i)=>`<label><span class="small-label">PLAYER 0${i+1} TAG</span><input class="input" name="player${i}" value="${esc(tags[i]||'')}" placeholder="#PLAYER${i+1}" style="width:100%" maxlength="20"></label>`).join('')}<button type="submit" class="button">${icon('users')} АНАЛИЗ</button></form><p class="help-text" style="margin:12px 0 0">Теги сохраняются локально. Если API недоступен, реальные характеристики не подставляются случайными данными.</p>${state.squad.error?`<p class="warn-line">${esc(state.squad.error)}</p>`:''}`,'panel-pad')}
 <div class="grid-3 mt-18">${[0,1,2].map((i)=>{const p=people[i];return panel(`<span class="eyeline">TEAM SLOT 0${i+1}</span><div style="margin-top:8px">${proPic(playerAvatarId(p))}</div><b>${esc(p?.name||'ОЖИДАНИЕ ИГРОКА')}</b><small>${esc(p?.tag||tags[i]||'Тег не указан')}</small><div class="mini-sep" style="width:100%;margin:8px 0"></div><div class="metrics-row" style="width:100%"><div class="metric"><strong>${fmt(p?.trophies)}</strong><small>Кубков</small></div><div class="metric"><strong>${fmt(p?.brawlers?.length)}</strong><small>Бойцов</small></div><div class="metric"><strong>${fmt(p?.['3vs3Victories'])}</strong><small>3×3 Побед</small></div></div>`,'squad-member')}).join('')}</div>
 <div class="grid-2 mt-18"><div>${panel(`<div class="panel-header"><div class="panel-title">SYNERGY REPORT</div>${tag('ROLE-BASED','purple')}</div>${people.filter(Boolean).length===3?synergyContent(people):'<div class="empty-note">Введи три реальных тега. После загрузки NEXUS подсветит потенциально совместимые роли и поможет выбрать состав.</div>'}`,'panel-pad')}</div><div>${panel(`<div class="panel-header"><div class="panel-title">ИДЕАЛЬНАЯ ТРОЙКА</div>${tag('DRAFT LINK','cyan')}</div><p class="card-sub" style="line-height:1.8">Уже знаешь, кто будет играть? Выбери состав в Meta Lab и проверь его против конкретного пика врага. После этого можно спросить ассистента, как распределить линии.</p><div style="display:flex;gap:8px;align-items:center;margin:16px 0">${['Gale','Max','Spike'].map(n=>bimg(n,'')).join('')}</div>${button('ОТКРЫТЬ META LAB','meta')}`,'panel-pad')}</div></div>`;
}
function synergyContent(players){const stars=players.map(p=>(p.brawlers||[]).slice().sort((a,b)=>(b.trophies||0)-(a.trophies||0)).slice(0,6));const roleSets=stars.map(list=>new Set(list.map(b=>role(getB(b.name)))));const union=new Set(roleSets.flatMap(s=>[...s]));const score=Math.min(95,35+union.size*9+stars.filter(s=>s.length>=6).length*4);return `<div class="synergy-hero"><div><div class="eyeline">ROLE COVERAGE / ИНДЕКС</div><div class="synergy-num">${score}<span style="font-size:20px">/100</span></div><p class="help-text">Расчёт на основе разнообразия ролей среди бойцов с наибольшим количеством кубков; не подтверждённый общий винрейт.</p></div><span class="icon-bubble" style="width:67px;height:67px">${icon('shield-check')}</span></div><div class="divider"></div><div class="synergy-factors"><div class="synergy-factor"><span>Разнообразие ролей</span><b>${union.size} / 7</b></div><div class="synergy-factor"><span>Игроки с данными</span><b>${players.filter(Boolean).length} / 3</b></div></div>`}
function renderSettings(){
 $('#page-settings').innerHTML=`${intro('SYSTEM CONFIGURATION','DATA <span>CONNECTIONS.</span>','Настрой серверные ключи, чтобы полноценно подключить профили, журнал боёв, esports-feed и генеративный ИИ. Никогда не вставляй секретные API-ключи в HTML или браузерный JS.','Jessie')}
 <div class="grid-2"><div>${panel(`<div class="panel-header"><div class="panel-title">АКТИВНЫЕ ИСТОЧНИКИ</div>${tag('PROVIDERS','purple')}</div>
 ${setting('BrawlAPI / игровой каталог','Бойцы, арты, карты, игровые иконки',state.catalogLive)}
 ${setting('Ротация карт / Supercell','Текущие события, карты и время окончания; требуется серверный токен',state.serverStatus?.rotation||false)}
 ${setting('Map win rates / статистика боёв','Процент побед и объём выборки по карте из отдельного провайдера',state.serverStatus?.mapStats||false)}
 ${setting('Supercell Player API','Профили и журнал боёв, требует ключ с whitelist IP',state.serverStatus?.official||false)}
 ${setting('Netlify Functions','Серверные endpoints /api/* на Netlify',state.serverStatus?.netlify||false)}
 ${setting('Esports provider','Машинный импорт расписания: настраиваемый JSON feed',state.serverStatus?.esports||false)}
 ${setting('Nexus AI','OpenAI API через сервер, только с ключом',state.aiAvailable)}
 `,'panel-pad')}</div><div>${panel(`<div class="panel-header"><div class="panel-title">КАК ПОДКЛЮЧИТЬ</div><span class="icon-bubble">${icon('settings')}</span></div><div style="display:grid;gap:12px;color:#abbad4;font-size:12px;line-height:1.7"><div>01 — Запусти <code>node server.js</code> из папки сайта.</div><div>02 — В файле <code>.env</code> добавь <code>BRAWL_API_TOKEN</code> от Supercell.</div><div>03 — Для ИИ укажи <code>OPENAI_API_KEY</code>.</div><div>04 — Для живой ротации карт официальный ключ откроет <code>/v1/events/rotation</code> через серверный API.</div><div>05 — Для реальных винрейтов по картам укажи <code>MAP_STATS_FEED_URL</code> с выборками матчей.</div><div>06 — Для турниров укажи <code>ESPORTS_FEED_URL</code> с совместимым JSON.</div></div><p class="warn-line" style="margin-top:18px">Supercell требует белый список IP сервера. Без ключей доступны каталог, арт-ресурсы, Meta Lab и поиск игроков.</p><div style="margin-top:14px"><a target="_blank" rel="noopener" href="https://developer.brawlstars.com/" class="soft-link">ПОЛУЧИТЬ SUPERCELL API KEY ${icon('arrow-up-right')}</a></div>`,'panel-pad')}</div></div><div class="panel panel-pad mt-18"><div class="panel-header"><div class="panel-title">ЗАЩИТА ИИ НА ПУБЛИЧНОМ САЙТЕ</div>${tag('NETLIFY / SECURITY','gold')}</div><p class="card-sub">Если разместишь сайт публично и подключишь платный OpenAI API, задай <code>NEXUS_AI_ACCESS_CODE</code> в переменных Netlify. Чтобы пользоваться помощником, введи тот же код здесь. Код хранится только в текущей сессии браузера.</p><form id="aiAccessForm" class="form-row" style="margin-top:12px"><input id="aiAccessInput" class="input" type="password" placeholder="Код доступа к Nexus AI" autocomplete="off" /><button class="button secondary" type="submit">СОХРАНИТЬ КОД</button></form><p class="help-text" style="margin-top:8px">Для открытого публичного сервиса нужен ещё лимит запросов и защита от злоупотреблений.</p></div>`;
}
function setting(name,desc,on){return `<div class="setting-item">${icon(on?'check-circle-2':'circle-dashed')}<div><b>${esc(name)}</b><small>${esc(desc)}</small></div><span class="status-value ${on?'on':''}">${on?'CONNECTED':'NOT SET'}</span></div>`}
async function apiRequest(path,external){const urls=path.startsWith('/api/')?[path,...(external?[external]:[])]:[path];let lastError;for(const url of urls){try{const res=await fetch(url,{headers:{Accept:'application/json'},signal:AbortSignal.timeout(11000)});if(!res.ok){let detail='';try{detail=(await res.json())?.error||''}catch{}throw Error(detail||`HTTP ${res.status}`)}return await res.json()}catch(e){lastError=e}}throw lastError||Error('Данные не получены')}
async function initData(){const status=$('#dataStatus');const requests=[
 apiRequest('/api/catalog',API+'/brawlers').then(d=>{const items=d.list||d.brawlers||d;if(Array.isArray(items)&&items.length>20){state.catalog=items.filter(x=>x.released!==false);state.catalogLive=true}}).catch(()=>{}),
 apiRequest('/api/gamemodes',API+'/gamemodes').then(d=>{const modes=d.list||d.gamemodes||d;if(Array.isArray(modes))state.gameModes=modes}).catch(()=>{}),
 apiRequest('/api/maps',API+'/maps').then(d=>{const items=d.list||d.maps||d;if(Array.isArray(items)){state.maps=items.filter(x=>!x.disabled)}}).catch(()=>{}),
 apiRequest('/api/events').then(d=>{state.rotationEvents=Array.isArray(d?.events)?d.events:[];state.rotationSource=d?.source||'not-configured'}).catch(()=>{state.rotationSource='error'}),
 apiRequest('/api/icons',API+'/icons').then(d=>{state.icons=d.player||d.icons?.player||{};state.clubIcons=d.club||d.icons?.club||{};}).catch(()=>{}),
 apiRequest('/api/status').then(s=>{state.serverStatus=s;state.aiAvailable=Boolean(s.ai);const gate=$('#aiAccessGate');if(gate){gate.hidden=!s.aiAccessRequired;gate.classList.toggle('enabled',Boolean(s.aiAccessRequired))}}).catch(()=>{}),
 apiRequest('/api/news').then(d=>{if(Array.isArray(d.news)&&d.news.length)state.news=d.news.map(normalizeNews)}).catch(()=>{}),
 apiRequest('/api/esports').then(d=>{if(Array.isArray(d.matches))state.esportsFeed=d.matches}).catch(()=>{})
 ];await Promise.allSettled(requests);state.dataSource=state.catalogLive?'В СЕТИ':'ПРОВЕРЯЕМ';if(status)status.textContent=state.dataSource;renderAll();if(state.lastTag&&!state.player)loadProfile(state.lastTag,{silent:true});}
async function fetchPlayer(tag){tag=String(tag||'').trim().toUpperCase();if(!tag.startsWith('#'))tag='#'+tag;if(!/^#[0289PYLQGRJCUV]{3,14}$/.test(tag))throw Error('Проверь тег. В Brawl Stars используются символы 0289PYLQGRJCUV.');let data=await apiRequest('/api/player/'+encodeURIComponent(tag));const p=normalizePlayer(data);if(!p)throw Error('Сервис не вернул действительный профиль.');return p}
async function loadProfile(t,{silent=false}={}){
 const btn=$('#profileSearch button');if(btn){btn.disabled=true;btn.textContent='ЗАГРУЗКА...'}
 try{const p=await fetchPlayer(t);state.player=p;state.lastTag=p.tag;state.playerLookupError='';try{localStorage.setItem('bn_my_tag',p.tag)}catch{}
 updateAccountAvatar();renderProfile();if(state.page==='profile'&&!silent)toast('Мой профиль '+p.name+' загружен');
 state.battles=[];
 if(p.club?.tag)loadClub(p.club.tag);else{state.clubData=null;renderClub()}
 try{const battles=await apiRequest('/api/player/'+encodeURIComponent(p.tag)+'/log');state.battles=Array.isArray(battles)?battles:battles?.items||battles?.battleLog?.items||[];renderProfile()}
 catch(e){state.playerLookupError='Профиль загружен, но журнал боёв недоступен: '+e.message;renderProfile()}
 }catch(e){state.playerLookupError=e.message;renderProfile();if(!silent)toast('Ошибка: '+e.message)}
}
function updateAccountAvatar(){const p=state.player;$('#sidebarPlayerName').textContent=p?.name||'GUEST PLAYER';$('#sidebarPlayerTag').textContent=p?.tag||'Не подключён';const url=p?playerIconUrl(playerAvatarId(p)):'assets/nexus-guest.webp';$$('.sidebar-bottom img,.top-avatar img').forEach(x=>{x.onerror=()=>{x.onerror=null;x.src='assets/nexus-guest.webp'};x.src=url})}
async function loadClub(tag){state.clubLoading=true;state.clubError='';renderClub();try{let club=await apiRequest('/api/club/'+encodeURIComponent(tag));if(!Array.isArray(club?.members)){try{const list=await apiRequest('/api/club/'+encodeURIComponent(tag)+'/members');club.members=Array.isArray(list)?list:Array.isArray(list?.items)?list.items:[]}catch{club.members=[]}}state.clubData=club;}catch(e){state.clubError=e.message;state.clubData=null}finally{state.clubLoading=false;renderClub();renderProfile()}}
async function loadOtherProfile(tag){state.otherLoading=true;state.otherError='';state.otherPlayer=null;state.otherBattles=[];openPage('players');try{const p=await fetchPlayer(tag);state.otherPlayer=p;state.otherBattles=[];renderExplorer();try{const rows=await apiRequest('/api/player/'+encodeURIComponent(p.tag)+'/log');state.otherBattles=Array.isArray(rows)?rows:rows?.items||[];renderExplorer()}catch{}}catch(e){state.otherError=e.message;renderExplorer()}finally{state.otherLoading=false;renderExplorer()}}
function externalBrawlerDetail(b){
 const prestige=prestigeLevel(b), gadgetList=Array.isArray(b.gadgets)?b.gadgets:[], starList=Array.isArray(b.starPowers)?b.starPowers:[];
 const listNames=a=>a.length?a.map(x=>esc(x.name||'Неизвестно')).join(', '):'Нет данных';
 return `<details class="bn110-brawler-detail"><summary>${bimg(b.name)}<span><strong>${esc(b.name)}</strong><small>${uiPackImg('trophy')} ${fmt(b.trophies)} кубков</small></span><span class="bn110-brawler-crest">${prestige>0?prestigeShield(prestige):`<small>Сила ${fmt(b.power)}</small>`}</span>${icon('chevron-down')}</summary><div class="bn110-brawler-expand"><div><b>Рекорд</b><span>${fmt(b.highestTrophies)} ${uiPackImg('trophy')}</span></div><div><b>Сила</b><span>${fmt(b.power)}</span></div><div><b>Престиж</b><span>${prestige===null?'Нет данных':prestige}</span></div><p><b>Гаджеты:</b> ${listNames(gadgetList)}</p><p><b>Звёздные силы:</b> ${listNames(starList)}</p></div></details>`;
}
function renderExplorer(){
 const p=state.otherPlayer;
 const own=state.player;
 const owned=Array.isArray(p?.brawlers)?p.brawlers:[];
 const top=owned.slice().sort((a,b)=>Number(b.trophies||0)-Number(a.trophies||0));
 const current=actualRank(p,'current'),record=actualRank(p,'best'),pres=prestigeSummary(p);
 const battleList=Array.isArray(state.otherBattles)?state.otherBattles:[];
 const hasBattle=battleList.length>0;
 const summaryCard=(ico,label,value)=>`<div class="bn110-metric">${gameStatIcon(ico)}<span><b>${value}</b><small>${label}</small></span></div>`;
 const rankCard=(label,rank,cls)=>`<div class="bn110-rank-card ${cls}"><div class="bn110-rank-image">${rankBadgeFor(rank.raw)}</div><div><small>${label}</small><strong>${esc(rank.label)}</strong><span>${fmt(rank.elo)} рейтинговых очков</span></div></div>`;
 const prestigeBadges=pres.tiers.map((amount,i)=>`<div class="bn110-prestige-tier">${prestigeShield(i+1)}<small>Прайм ${i===2?'3+':i+1}</small><b>${amount??'—'}</b></div>`).join('');
 const extras=top.slice(3,12).map(b=>`<div class="bn110-mini-brawler">${bModel(b.name)}<span>${esc(b.name)}</span><b>${fmt(b.trophies)} ${uiPackImg('trophy')}</b></div>`).join('');
 const games=battleList.slice(0,5).map((b,i)=>renderBattle(b,i,p?.tag)).join('');
 const later=battleList.slice(5,25).map((b,i)=>renderBattle(b,i+5,p?.tag)).join('');
 const win=battleList.filter(r=>battleOutcome(r)[0]==='win').length,loss=battleList.filter(r=>battleOutcome(r)[0]==='loss').length;
 const extraAchievements=[['trophy','3×3',p?.['3vs3Victories']],['award','Соло',p?.soloVictories],['shield','Дуо',p?.duoVictories]];
 $('#page-players').innerHTML=`
 <div class="bn110-page-head"><div class="eyebrow">NEXUS / PLAYER EXPLORER</div><h1 class="display-title">ПОИСК <span>ИГРОКОВ.</span></h1><p class="description">Чужой аккаунт можно изучить, не меняя свой закреплённый профиль.</p></div>
 ${panel(`<div class="bn110-explorer-search"><div class="bn110-own-account"><span class="small-label">МОЙ АККАУНТ</span><div>${own?`${proPic(playerAvatarId(own),'bn110-own-avatar')}<span><b>${esc(own.name)}</b><small>${esc(own.tag)}</small></span>`:'<small>Не закреплён</small>'}</div></div><form id="otherSearch" class="bn110-search-form"><label class="small-label" for="bn110OtherTag">НАЙТИ ИГРОКА ПО ТЕГУ</label><div><input class="input" id="bn110OtherTag" name="tag" placeholder="#9YRLQG229" value="${esc(p?.tag||'')}" autocomplete="off" required/><button type="submit" class="button">${icon('search')} НАЙТИ</button></div></form><button class="button secondary sm bn110-my-button" data-page="profile">МОЙ ПРОФИЛЬ ${icon('arrow-right')}</button></div>`,'panel-pad bn110-search-panel')}
 ${state.otherLoading?panel('<p class="empty-note">Загружаем данные игрока из Supercell...</p>','panel-pad'):''}
 ${state.otherError?`<p class="warn-line" role="alert">${esc(state.otherError)}</p>`:''}
 ${p?`
 <div class="bn110-other-profile">
  <div class="bn110-overview-grid">
   <div class="bn110-player-hero">
     ${top.length?`<div class="bn110-character-art" aria-hidden="true">${bModel(top[0].name)}</div>`:''}
     <div class="bn110-id-row">${proPic(playerAvatarId(p),'bn110-profile-avatar')}<div><span class="eyeline">ПРОФИЛЬ ИГРОКА · SUPERCELL</span><h2>${esc(p.name)}</h2><small>${esc(p.tag)}</small><span class="bn110-club-pill">${uiPackImg('shield')} ${esc(p.club?.name||'Без клуба')}</span></div></div>
     <div class="bn110-hero-stats">
      ${summaryCard('trophy','Кубки сейчас',fmt(p.trophies))}
      ${summaryCard('award','Рекорд кубков',fmt(p.highestTrophies))}
      ${summaryCard('contact-round','Бойцов',fmt(owned.length))}
      ${summaryCard('crown','Престиж',pres.total===null?'—':fmt(pres.total))}
     </div>
     <div class="bn110-hero-cta"><span>${uiPackImg('shield')} ${p.club?.tag?esc(p.club.tag):'Данные клуба из профиля'}</span><button type="button" class="button secondary sm" data-action="set-own-player" data-tag="${esc(p.tag)}">СДЕЛАТЬ МОИМ ${icon('arrow-up-right')}</button></div>
   </div>
   <div class="bn110-rank-container panel panel-pad"><div class="panel-title">${gameStatIcon('shield-half','pink')} RANKED / РЕЙТИНГ</div>${rankCard('ТЕКУЩИЙ',current,'current')}${rankCard('ЛУЧШИЙ ЗА ВСЁ ВРЕМЯ',record,'best')}</div>
  </div>
  <div class="bn110-summary-grid">
   <div class="panel panel-pad bn110-prestige-summary"><div class="panel-title">${gameStatIcon('crown','gold')} ПРЕСТИЖИ / ПРОГРЕСС</div><div class="bn110-prestige-numbers"><div>${prestigeShield(3)}<span><strong>${pres.total===null?'—':fmt(pres.total)}</strong><small>СУММА ПРЕСТИЖЕЙ</small></span></div><div>${prestigeShield(1)}<span><strong>${pres.count??'—'}</strong><small>БОЙЦОВ С ПРЕСТИЖЕМ</small></span></div></div><div class="bn110-prestige-tiers">${prestigeBadges}</div><p class="source-note">Если API не возвращает престиж, показано «—», а не догадка.</p></div>
   <div class="panel panel-pad bn110-achievements"><div class="panel-title">${gameStatIcon('award','gold')} ДОСТИЖЕНИЯ</div><div class="bn110-achieve-grid">${extraAchievements.map(([ico,label,n])=>`<div>${uiPackImg(ico)}<strong>${fmt(n)}</strong><small>${label}</small></div>`).join('')}</div><div class="bn110-sample-note">${hasBattle?`${win} побед · ${loss} поражений в ${battleList.length} доступных боях`:'Боевой журнал появится после ответа API.'}</div></div>
  </div>
  <div class="panel panel-pad bn110-other-top"><div class="panel-header"><div class="panel-title">${gameStatIcon('crown','gold')} ЛУЧШИЕ БОЙЦЫ</div><span class="tag red">ТОП-3 · ПО КУБКАМ</span></div><div class="bn110-mini-podium">${top.slice(0,3).map(podiumBrawler).join('')||'<p class="empty-note">Данные о бойцах отсутствуют.</p>'}</div>${extras?`<div class="bn110-rail-label"><b>ЕЩЁ СИЛЬНЫЕ БОЙЦЫ</b><span>ЛИСТАЙ ${icon('move-horizontal')}</span></div><div class="bn110-mini-rail" tabindex="0" aria-label="Остальные бойцы, листайте горизонтально">${extras}</div>`:''}</div>
  <div class="bn110-lower-grid">
   <div class="panel panel-pad bn110-battle-panel"><div class="panel-header"><div class="panel-title">${gameStatIcon('scroll-text','pink')} ПОСЛЕДНИЕ МАТЧИ</div>${tag(battleList.length+' БОЁВ','red')}</div>${games||'<p class="empty-note">История боёв ещё не загружена.</p>'}${later?`<details class="bn110-more-battles"><summary>ПОКАЗАТЬ ЕЩЁ ${Math.min(20,battleList.length-5)} ${icon('chevron-down')}</summary><div>${later}</div></details>`:''}<p class="source-note">Только результаты из доступного battlelog Supercell.</p></div>
   <div class="panel panel-pad bn110-roster-panel"><div class="panel-header"><div class="panel-title">${gameStatIcon('contact-round','rose')} ВСЕ БОЙЦЫ</div><span class="tag">${owned.length}</span></div><p class="bn110-roster-desc">Нажми на бойца, чтобы увидеть силу, рекорд, престиж и оснащение.</p><div class="bn110-detailed-roster">${top.map(externalBrawlerDetail).join('')||'<p class="empty-note">Нет данных по бойцам.</p>'}</div></div>
  </div>
 </div>`:''}`;
}
function renderClub(){const c=state.clubData,players=Array.isArray(c?.members)?c.members:[];const badgeId=c?.badgeId||c?.badge?.id;$('#page-club').innerHTML=`${intro('CLUB INTELLIGENCE','МОЙ <span>КЛУБ.</span>','Живой состав клуба, общие кубки и профили участников — из Supercell API.','Rosa')}
 ${state.clubLoading?panel('<div class="empty-note">Подключаем клуб...</div>','panel-pad'):''}${state.clubError?`<p class="warn-line">Клуб не загрузился: ${esc(state.clubError)}</p>`:''}
 ${!c&&!state.clubLoading?panel(`<div class="empty-note">${state.player?.club?.tag?'Нет данных о клубе. Попробуй повторить позже.':'Загрузи свой профиль и вступи в клуб, чтобы просмотреть его состав.'}</div>`,'panel-pad'):''}
 ${c?`${panel(`<div class="club-banner"><span class="club-banner-badge">${clubBadge(badgeId)}</span><div><div class="eyeline">CLUB PROFILE / СТАТИСТИКА</div><h2>${esc(c.name||'Клуб')}</h2><small>${esc(c.tag||'')}</small><p>${esc(c.description||'')}</p></div></div><div class="club-metrics"><div><b>${fmt(c.trophies)}</b><small>Кубки клуба</small></div><div><b>${fmt(c.requiredTrophies)}</b><small>Минимум для вступления</small></div><div><b>${fmt(c.membersCount??players.length)}</b><small>Участники</small></div><div><b>${esc(c.type||'—')}</b><small>Тип клуба</small></div></div>`,'panel-pad')}
 <div class="mt-18">${panel(`<div class="panel-header"><div class="panel-title">УЧАСТНИКИ КЛУБА</div>${tag(players.length+' ИГРОКОВ')}</div><div class="club-member-grid">${players.map((m,i)=>`<button class="club-member" data-action="open-club-member" data-tag="${esc(m.tag)}"><span class="club-member-index">${String(i+1).padStart(2,'0')}</span>${proPic(playerAvatarId(m),'member-avatar')}<span class="member-identity"><b>${esc(m.name||'Игрок')}</b><small>${esc(m.tag||'')} · ${esc(({president:'Президент',vicePresident:'Вице-президент',senior:'Старший',member:'Участник'})[m.role]||m.role||'Участник')}</small></span><span class="member-trophies">${fmt(m.trophies)} ${icon('trophy')}</span>${icon('chevron-right')}</button>`).join('')||'<div class="empty-note">Список участников отсутствует в ответе API.</div>'}</div>`,'panel-pad')}</div>`:''}`;}
async function loadSquad(tags){state.squad.error='';state.squad.tags=tags.map(t=>t.trim());try{localStorage.setItem('bn_squad',JSON.stringify(state.squad.tags))}catch{}if(tags.filter(Boolean).length!==3){state.squad.error='Для анализа нужны ровно три игровых тега.';renderSquad();return}toast('Подключаем тройку...');const results=await Promise.allSettled(tags.map(fetchPlayer));state.squad.members=results.map(r=>r.status==='fulfilled'?r.value:null);if(results.some(r=>r.status==='rejected'))state.squad.error='Часть профилей не загрузилась. '+results.filter(r=>r.status==='rejected').map((r,i)=>`Ошибка ${i+1}: ${r.reason?.message||'API'}`).join(' · ');renderSquad();toast('Загружено '+state.squad.members.filter(Boolean).length+' из 3 профилей.')}
async function sendChat(query){query=String(query||'').trim();if(!query)return;const msgs=$('#chatMessages');msgs.insertAdjacentHTML('beforeend',`<div class="chat-msg user"><div>${esc(query)}</div></div>`);$('#chatInput').value='';msgs.insertAdjacentHTML('beforeend',`<div class="chat-msg bot" id="thinkingMsg"><span class="chat-ava">N</span><div>Анализирую вопрос...</div></div>`);msgs.scrollTop=msgs.scrollHeight;
 let content='';const draft={mode:state.draft.mode,ownedOnly:state.draft.ownedOnly,map:matchingMaps().find(m=>String(m.id)===String(state.draft.mapId))?.name||'',terrain:state.draft.terrain,allies:state.draft.ally,enemies:state.draft.enemy,bans:state.draft.bans,recommendations:assessDraft().slice(0,4).map(x=>({name:x.b.name,score:x.score,reason:x.reason}))};try{if(state.aiAvailable){const data=await apiRequestPost('/api/ai',{query,context:{section:state.page,draft,profile:state.player?{name:state.player.name,trophies:state.player.trophies,brawlers:state.player.brawlers?.slice(0,12).map(b=>({name:b.name,trophies:b.trophies}))}:null}});content=data.answer||''}else{content=localAnswer(query,draft)}}catch(e){content=localAnswer(query,draft)+'\n\n(Внешний ИИ сейчас недоступен: '+e.message+')'}
 const temp=$('#thinkingMsg');if(temp)temp.remove();msgs.insertAdjacentHTML('beforeend',`<div class="chat-msg bot"><span class="chat-ava">N</span><div>${esc(content)}</div></div>`);msgs.scrollTop=msgs.scrollHeight}
async function apiRequestPost(path,data){const r=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json','x-nexus-access-code':(()=>{try{return sessionStorage.getItem('bn_ai_access_code')||''}catch{return ''}})()},body:JSON.stringify(data),signal:AbortSignal.timeout(25000)});const json=await r.json();if(!r.ok)throw Error(json.error||`HTTP ${r.status}`);return json}
function localAnswer(q,d){const low=q.toLowerCase();const top=d.recommendations||[];if(/пик|контр|драфт|кого брать|выбр|против/.test(low)){if(/пайпер|piper/.test(low)&&/анджел|angelo/.test(low))return 'Против Пайпер и Анджело на открытой карте рассмотри Нани или Макс: дальняя дуэль либо мобильность для сближения. Не выбирай медленного танка без прикрытия. Проверяй третьего соперника и карту — контрпик не универсален.';if(d.enemies.length)return `В текущем драфте (${d.mode}) соперник выбрал: ${d.enemies.join(', ')}.\n\nМои варианты по правилам матчапов:\n${top.slice(0,3).map((x,i)=>`${i+1}. ${x.name} — ${x.reason}`).join('\n')}\n\nЭто объясняемая эвристика, а не измеренный винрейт.`;return 'Зайди в Meta Lab, выбери режим и двух-трёх соперников. Я покажу контрпики с пояснением по ролям и матчапам. Для персонального совета напиши карту, своих союзников и врагов.'}if(/академ|трен|улучш|скилл|ошиб/.test(low))return 'Для прогресса попробуй: 1) отрабатывать линии и позиционирование; 2) анализировать, где теряешь контроль карты; 3) в Meta Lab разбирать драфты и контрпики; 4) после матчей отмечать пики противников. Без видеозаписи или подробного журнала нельзя честно утверждать, где именно ты ошибся.';if(/нави|navi|hmble|хамбл|команд|киберспорт|прогноз/.test(low))return 'В киберспорте для прогноза нужны актуальные результаты, карты, составы и уровень оппонентов. Без подключенного esports-источника я не буду придумывать статистические шансы. Открой Киберспорт → сценарный анализ или официальный турнирный центр.';return 'Я помогу разобраться с Brawl Stars. Самые точные локальные рекомендации получаются, если назвать режим, карту, своих бойцов и состав соперника. Для свободного ИИ-диалога подключи OPENAI_API_KEY на сервере.'}
function openChat(prompt=''){$('#assistantPanel').classList.add('open');$('#assistantPanel').setAttribute('aria-hidden','false');$('#chatInput').focus();if(prompt)sendChat(prompt)}function closeChat(){$('#assistantPanel').classList.remove('open');$('#assistantPanel').setAttribute('aria-hidden','true')}
function draftChange(){draftSave();renderMeta()}
function listen(){
 document.addEventListener('input',e=>{if(e.target.id==='bn17RosterSearch'){const q=e.target.value.trim().toLowerCase();const cards=$$('.bn17-roster-card');let shown=0;for(const card of cards){const visible=card.dataset.brawlerName.includes(q);card.hidden=!visible;if(visible)shown++}const counter=$('#bn17RosterCount');if(counter)counter.textContent=shown+' / '+cards.length}});
 document.addEventListener('click',e=>{const nav=e.target.closest('[data-page]');if(nav){e.preventDefault();openPage(nav.dataset.page);return}const act=e.target.closest('[data-action]');if(act){const a=act.dataset.action,n=act.dataset.name,d=state.draft;
 if(a==='prestige-filter'){const root=act.closest('.bn17-prestige-panel');if(!root)return;const tier=act.dataset.tier;root.querySelectorAll('.bs-prestige-filter').forEach(b=>{const active=b===act;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});let shown=0;root.querySelectorAll('.bs-prestige-entry').forEach(item=>{const level=Number(item.dataset.prestigeTier);const visible=tier==='all'||(tier==='3'?level>=3:level===Number(tier));item.hidden=!visible;if(visible)shown++});const note=root.querySelector('.bs-prestige-noresults');if(note)note.hidden=shown>0;return}
 if(a==='brawler-rail'){const rail=$('#bsShowcaseRail');if(rail)rail.scrollBy({left:Number(act.dataset.dir||1)*Math.max(190,rail.clientWidth*.68),behavior:'smooth'});return}
 if(a==='open-club-member'){loadOtherProfile(act.dataset.tag);return}
 if(a==='set-own-player'){loadProfile(act.dataset.tag);openPage('profile');return}
 if(a==='rotation-select'){state.rotationSelected=act.dataset.key;renderHome();learnIcons();const m=rotationSelected();if(m?.id)loadMapStats(m.id);$('#rotationDetail')?.scrollIntoView({behavior:'smooth',block:'start'});return}
  else if(a==='rotation-refresh'){toast('Проверяем ротацию Supercell...');loadRotation();return}
 else if(a==='rotation-to-draft'){const m=rotationSelected();if(m){d.playlist='trophy';d.trophyMode=String(m.mode||'brawlBall');d.trophyMapName=String(m.name||'');d.terrain=terrainEstimate(m).type;const ranked=Object.entries(MODE_EN).find(([ru,en])=>normMode(en)===normMode(m.mode));if(ranked){d.mode=ranked[0];const map=state.maps.find(x=>NORM_MAP(x.name)===NORM_MAP(m.name)&&normMode(x.gameMode?.name)===normMode(m.mode));d.mapId=String(map?.id||'')}draftSave()}openPage('meta');return}
 if(a==='meta-playlist'){d.playlist=act.dataset.playlist==='ranked'?'ranked':'trophy';if(d.playlist==='ranked'&&!MODES.includes(d.mode))d.mode=MODES[0];if(d.playlist!=='ranked'&&d.liveMode){d.liveMode=false;document.body.classList.remove('live-draft-mode')}draftSave();renderMeta();return}
 else if(a==='trophy-owned'){d.trophyOwnedOnly=!d.trophyOwnedOnly;draftSave();renderMeta();return}
 if(a==='draft-token'){if(d.pickHistory.length){toast('Для смены жетона начни новый драфт');return}d.token=act.dataset.token;draftChange()}
 else if(a==='draft-start-picks'){d.phase='picks';draftChange();toast('Фаза пиков: порядок определяется жетоном')}
 else if(a==='draft-reopen-bans'){if(d.pickHistory.length){toast('Сначала отмени пики');return}d.phase='bans';draftChange()}
 else if(a==='draft-undo'){draftUndo()}
 else if(a==='draft-unban'){if(d.phase!=='bans')return;d.bans=d.bans.filter(x=>x!==n);draftChange()}
 else if(a==='draft-rewind'){const i=Number(act.dataset.index);d.pickHistory=d.pickHistory.slice(0,Math.max(0,i));draftRebuild();draftChange();toast('Драфт возвращён к выбранному ходу')}
 else if(a==='draft-skip'){const t=draftCurrent();if(!t.side)return;d.pickHistory.push({side:t.side,name:null});draftRebuild();draftChange();toast('Неизвестный пик отмечен вопросом')}
 else if(a==='live-mode'){d.liveMode=!d.liveMode;document.body.classList.toggle('live-draft-mode',d.liveMode);openPage('meta');toast(d.liveMode?'Live Draft запущен — отмечай пики по ходу матча':'Live Draft закрыт')}
 else if(a==='draft-role'){d.classFilter=act.dataset.role;drawPicker();$$('.role-chip').forEach(b=>b.classList.toggle('active',b.dataset.role===d.classFilter))}
 else if(a==='draft-only-owned'){if(!state.player?.brawlers?.length){toast('Сначала загрузи профиль по тегу');return}d.ownedOnly=!d.ownedOnly;draftChange();return}
 if(a==='draft-only-favorites'){d.favoritesOnly=!d.favoritesOnly;drawPicker();$('#page-meta .favorite-filter')?.classList.toggle('active',d.favoritesOnly);const f=$('#page-meta .favorite-filter');if(f)f.textContent=d.favoritesOnly?'★ ТОЛЬКО ИЗБРАННЫЕ':'★ ИЗБРАННОЕ'}
 else if(a==='draft-favorite'){const idx=d.favorites.indexOf(n);if(idx>=0)d.favorites.splice(idx,1);else d.favorites.push(n);try{localStorage.setItem('bn_fav_brawlers',JSON.stringify(d.favorites))}catch{}drawPicker()}
 else if(a==='draft-reset'){d.ally=[];d.enemy=[];d.bans=[];d.pickHistory=[];d.phase='bans';d.query='';draftChange();toast('Новый драфт создан')}
  else if(a==='draft-pick'){if(draftAdd(n)){d.query='';draftChange()}}
 else if(a==='recommend-pick'){const t=draftCurrent();if(t.phase!=='picks'||t.side!=='ally'){toast('Рекомендацию можно выбрать только в свой ход');return}if(draftAdd(n)){d.query='';draftChange()}}
 
 
 else if(a==='choose-team'){state.scenario.a=n;state.scenario.result=null;renderEsports();$('#esportsPredictForm')?.scrollIntoView({behavior:'smooth',block:'center'});toast('Выбрана команда '+n+' для сравнения')}
 else if(a==='set-match'){state.scenario.a=act.dataset.a;state.scenario.b=act.dataset.b;state.scenario.result=null;renderEsports();$('#esportsPredictForm')?.scrollIntoView({behavior:'smooth',block:'center'})}
 return}
 if(e.target.closest('#aiToggle,#openAIFromNav,#homeAIOpen,#profileAskAI,#metaAskAI')){const btn=e.target.closest('button');if(btn?.id==='metaAskAI'){const d=state.draft;openChat(`Помоги с драфтом ${d.mode}. Моя команда: ${d.ally.join(', ')||'пока пуста'}; враги: ${d.enemy.join(', ')||'пока не выбраны'}.`)}else if(btn?.id==='profileAskAI'){openChat('Дай советы по моему профилю и улучшению игры.')}else openChat();return}
 if(e.target.closest('#closeChat'))closeChat();
 if(e.target.closest('#refreshBtn')){toast('Обновляем данные...');initData()}
 if(e.target.closest('#menuToggle'))$('#sidebar').classList.toggle('open');
 if(e.target.closest('[data-chatprompt]'))sendChat(e.target.closest('[data-chatprompt]').dataset.chatprompt)
 });
 document.addEventListener('submit',e=>{if(e.target.id==='profileSearch'){e.preventDefault();loadProfile($('#profileTag').value)}else if(e.target.id==='otherSearch'){e.preventDefault();loadOtherProfile(new FormData(e.target).get('tag'))}else if(e.target.id==='squadForm'){e.preventDefault();const fd=new FormData(e.target);loadSquad([0,1,2].map(i=>fd.get('player'+i)||''))}else if(e.target.id==='chatForm'){e.preventDefault();sendChat($('#chatInput').value)}else if(e.target.id==='aiAccessForm'){e.preventDefault();const code=$('#aiAccessInput').value.trim();if(!code){toast('Введите код доступа');return}try{sessionStorage.setItem('bn_ai_access_code',code);$('#aiAccessInput').value='';toast('Код сохранён до закрытия вкладки')}catch{toast('Хранилище браузера недоступно. Открой сайт по HTTPS.')}}else if(e.target.id==='esportsPredictForm'){e.preventDefault();const a=$('#predictA').value.trim(),b=$('#predictB').value.trim(),fa=Number($('#formA').value),fb=Number($('#formB').value);if(a.toLowerCase()===b.toLowerCase()){toast('Выбери две разные команды');return}const left=Math.round(50+(fa-fb)*9);state.scenario={...state.scenario,a,b,formA:fa,formB:fb,result:{a,b,fa,fb,left:Math.max(14,Math.min(86,left))}};$('#esportsResult').innerHTML=makeScenarioResult(state.scenario.result)}});
 document.addEventListener('input',e=>{if(e.target.id==='draftSearch'){state.draft.query=e.target.value;drawPicker()}else if(e.target.id==='formA')$('#fALabel').textContent=e.target.value+' / 5';else if(e.target.id==='formB')$('#fBLabel').textContent=e.target.value+' / 5'});
 document.addEventListener('change',e=>{if(e.target.id==='trophyMode'){state.draft.trophyMode=e.target.value;state.draft.trophyMapName='';draftSave();renderMeta()}else if(e.target.id==='trophyMap'){state.draft.trophyMapName=e.target.value;draftSave();renderMeta()}else if(e.target.id==='draftMode'){state.draft.mode=e.target.value;state.draft.mapId='';renderMeta()}else if(e.target.id==='draftMap'){state.draft.mapId=e.target.value;state.draft.terrain=terrainEstimate(byMapId(e.target.value)).type;draftSave();renderMeta()}else if(e.target.id==='draftClass'){state.draft.classFilter=e.target.value;drawPicker()}});
 document.addEventListener('keydown',e=>{const formField=e.target.matches('input,textarea,select,[contenteditable]');if(e.key==='Escape'){closeChat();$('#sidebar').classList.remove('open');if(state.draft.liveMode){state.draft.liveMode=false;document.body.classList.remove('live-draft-mode');renderMeta()}else if(e.target.id==='draftSearch'){state.draft.query='';e.target.value='';drawPicker()}}
 if(state.page!=='meta'||$('#assistantPanel').classList.contains('open'))return;
 if(state.draft.playlist!=='ranked')return;
 if(e.key==='/'&&!formField){e.preventDefault();$('#draftSearch')?.focus();$('#draftSearch')?.select()}
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'&&!formField){e.preventDefault();draftUndo()}
 if(formField&&e.target.id==='draftSearch'&&e.key==='Enter'){e.preventDefault();const b=getVisibleBrawlers().find(b=>![...state.draft.ally,...state.draft.enemy,...state.draft.bans].includes(b.name));if(b&&draftAdd(b.name)){state.draft.query='';draftChange();$('#draftSearch')?.focus()}return}
 })
}
async function pollLiveSources(){if(document.hidden)return;
 await loadRotation();
 try{const d=await apiRequest('/api/esports');if(Array.isArray(d.matches)){const changed=JSON.stringify(d.matches)!==JSON.stringify(state.esportsFeed);state.esportsFeed=d.matches;if(changed&&state.page==='esports')renderEsports()}}catch{}
 if(state.player?.tag&&state.page==='profile'){try{const d=await apiRequest('/api/player/'+encodeURIComponent(state.player.tag)+'/log');const items=Array.isArray(d)?d:d?.items||[];if(items.length&&JSON.stringify(items)!==JSON.stringify(state.battles)){state.battles=items;renderProfile()}}catch{}}
}
let lastNewsPoll=0;async function refreshEsportsNews(){if(document.hidden||Date.now()-lastNewsPoll<5*60_000)return;lastNewsPoll=Date.now();try{const d=await apiRequest('/api/news');if(Array.isArray(d.news)&&d.news.length){const list=d.news.map(normalizeNews);if(JSON.stringify(list)!==JSON.stringify(state.news)){state.news=list;if(state.page==='esports')renderEsports()}}}catch{}}
function boot(){listen();setInterval(pollLiveSources,45000);setInterval(refreshEsportsNews,60_000);renderAll();state.page=(location.hash.slice(1)||'home');openPage(state.page);initData()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();