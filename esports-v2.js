/* BRAWL//NEXUS • Esports Command Center v2. Authentic Brawl UI emoji from the site's UI_PACK. */
(function(){
'use strict';
var mode='overview',matchFilter='all',newsFilter='all',busy=false,context=null;
var OFFICIAL='https://event.supercell.com/brawlstars/en/live';
var BRACKET='https://liquipedia.net/brawlstars/Brawl_Stars_World_Finals/2026';
var GUIDE='https://supercell.com/brawlstars/en/blog/esports/your-guide-to-the-biggest-brawl-stars-world-finals-ever-/';
var STREAM='https://www.youtube.com/channel/UCjvzNXGGlnC4jcCnhglf8-Q';
var teams=['HMBLE','NAVI','Team Elektros','Crazy Raccoon','NOVO Esports','Reply Totem','Tribe Gaming','ZETA DIVISION','FUT Esports','Team Heretics','RED Canids'];
var tabs=[['overview','ОБЗОР','trophy'],['matches','МАТЧИ','swords'],['teams','КОМАНДЫ','users-round'],['news','НОВОСТИ','newspaper'],['analysis','АНАЛИЗ','star']];
function safe(url,fallback){return /^https:\/\/[^ "'<>]+$/i.test(String(url||''))?String(url):fallback||OFFICIAL}
function niceDate(raw){var d=new Date(raw||'');return Number.isFinite(d.getTime())?d.toLocaleString('ru-RU',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}):'Время уточняется'}
function humanDate(raw){var d=new Date(raw||'');return Number.isFinite(d.getTime())?d.toLocaleDateString('ru-RU',{day:'2-digit',month:'long',year:'numeric'}):''}
function icon(key){return context.u.uiPackImg(key,'es26-imgicon')}
function ico(k){return context.u.icon(k)}
function esc(s){return context.u.esc(String(s==null?'':s))}
function badge(text,type){return '<span class="es26-badge '+(type||'')+'">'+esc(text)+'</span>'}
function link(url,text,cls){return '<a href="'+esc(safe(url))+'" target="_blank" rel="noopener noreferrer" class="'+(cls||'es26-link')+'">'+text+' '+ico('arrow-up-right')+'</a>'}
function section(title,detail,extra){return '<div class="es26-heading"><div><h2>'+title+'</h2><p>'+detail+'</p></div>'+(extra||'')+'</div>'}
function eventStage(){
 var now=Date.now(),start=Date.parse('2026-11-20T00:00:00+09:00'),end=Date.parse('2026-11-23T00:00:00+09:00');
 if(now<start)return {name:'СКОРО СТАРТ',style:'upcoming'};
 if(now<end)return {name:'ДНИ ФИНАЛА',style:'event'};
 return {name:'ТУРНИР ЗАВЕРШЁН',style:'finished'};
}
function hero(){
 var stage=eventStage();
 return '<div class="es26-hero"><div class="es26-rays"></div><div class="es26-hero-main">'+
 '<div class="es26-eyeline">'+icon('award')+' <span>GLOBAL ESPORTS / 2026</span> '+badge(stage.name,stage.style)+'</div>'+
 '<h1>WORLD <span>FINALS.</span></h1>'+
 '<div class="es26-season">BRAWL STARS CHAMPIONSHIP • TOKYO</div>'+
 '<p>Все важное о чемпионате в одном месте: турнир, команды, новости и подтверждённые результаты. У эфиров и матчей — прямые ссылки на источники.</p>'+
 '<div class="es26-actions">'+link(OFFICIAL,icon('flame')+' СМОТРЕТЬ / РАСПИСАНИЕ','es26-primary')+
 link(BRACKET,ico('git-merge')+' ТУРНИРНАЯ СЕТКА','es26-secondary')+'</div></div>'+
 '<div class="es26-hero-side"><div class="es26-hero-mark">'+icon('trophy')+'</div><div class="es26-stat"><b>12</b><small>КОМАНД</small></div><div class="es26-stat"><b>$1M</b><small>ПРИЗОВОЙ ФОНД</small></div><div class="es26-stat"><b>20—22.11</b><small>ТОКИО · ЯПОНИЯ</small></div></div></div>';
}
function toolbar(){
 return '<nav class="es26-tabs" aria-label="Разделы киберспорта">'+tabs.map(function(t){return '<button type="button" class="es26-tab '+(mode===t[0]?'active':'')+'" data-es-tab="'+t[0]+'" aria-pressed="'+String(mode===t[0])+'">'+icon(t[2])+' '+t[1]+'</button>'}).join('')+'</nav>';
}
function entry(m){
 var a=m.teamA||'Команда A',b=m.teamB||'Команда B',status=String(m.status||'').toLowerCase();
 var ended=['finished','completed','ended','final'].includes(status);
 var live=!!m.live||status==='live';
 var rawA=m.scoreA,rawB=m.scoreB;
 var score=rawA!=null&&rawB!=null&&Number.isFinite(Number(rawA))&&Number.isFinite(Number(rawB));
 return '<article class="es26-match"><div class="es26-match-top"><span>'+icon('ticket')+' '+esc(m.tournament||'BSC')+'</span>'+badge(live?'LIVE · ПОДТВЕРЖДЕНО':ended?'ЗАВЕРШЁН':'ЗАПЛАНИРОВАНО',live?'live':ended?'finished':'upcoming')+'</div>'+
 '<div class="es26-versus"><div>'+context.u.teamSymbol(a)+'<b>'+esc(a)+'</b></div><strong>'+ (score?esc(rawA+' : '+rawB):'VS')+'</strong><div>'+context.u.teamSymbol(b,true)+'<b>'+esc(b)+'</b></div></div>'+
 '<div class="es26-match-foot"><small>'+ (m.winner?'Победитель: '+esc(m.winner):niceDate(m.when))+'</small><div>'+ (m.url?link(m.url,'ИСТОЧНИК','es26-minilink'):'')+
 '<button type="button" class="es26-minilink" data-action="set-match" data-a="'+esc(a)+'" data-b="'+esc(b)+'">РАЗОБРАТЬ '+ico('arrow-right')+'</button></div></div></article>';
}
function matchList(isOverview){
 var list=Array.isArray(context.s.esportsFeed)?context.s.esportsFeed:[];
 if(!isOverview){list=list.filter(function(m){var status=String(m.status||'').toLowerCase();return matchFilter==='all'||(matchFilter==='live'&&(m.live||status==='live'))||(matchFilter==='finished'&&['finished','completed','ended','final'].includes(status))||(matchFilter==='upcoming'&&!m.live&&!['live','finished','completed','ended','final'].includes(status))})}
 var filters=isOverview?'':'<div class="es26-filters">'+[['all','ВСЕ'],['live','LIVE'],['upcoming','ПРЕДСТОЯЩИЕ'],['finished','ЗАВЕРШЁННЫЕ']].map(function(f){return '<button data-es-filter="'+f[0]+'" class="'+(matchFilter===f[0]?'active':'')+'">'+f[1]+'</button>'}).join('')+'</div>';
 var content=list.length?'<div class="es26-matchgrid">'+list.slice(0,isOverview?4:20).map(entry).join('')+'</div>':
 '<div class="es26-empty"><div class="es26-emptyicon">'+icon('clock')+'</div><div><b>Подтверждённые счёты пока недоступны</b><p>Для автоматического отображения матчей нужен источник турнирных результатов. Не подменяем его выдуманными победами или статусами LIVE.</p><div class="es26-emptylinks">'+link(OFFICIAL,'ОФИЦИАЛЬНОЕ РАСПИСАНИЕ')+link(BRACKET,'СЕТКА И РЕЗУЛЬТАТЫ')+'</div></div></div>';
 return section('МАТЧ-ЦЕНТР','Результаты только из подключённой турнирной ленты, не из догадок.',badge(context.s.esportsFeed&&context.s.esportsFeed.length?'FEED CONNECTED':'ОФИЦИАЛЬНЫЕ ССЫЛКИ',context.s.esportsFeed&&context.s.esportsFeed.length?'connected':''))+filters+content;
}
function teamGallery(short){
 return section('КОМАНДЫ СЦЕНЫ','Оригинальные эмблемы команд; нажми на команду, чтобы открыть сценарный анализ.',link(GUIDE,'УЧАСТНИКИ 2026','es26-minilink'))+
 '<div class="es26-teamgrid">'+teams.slice(0,short?6:teams.length).map(function(t){return '<button type="button" class="es26-team" data-action="choose-team" data-name="'+esc(t)+'">'+context.u.teamSymbol(t)+'<span>'+esc(t)+'</span>'+ico('arrow-up-right')+'</button>'}).join('')+'</div>'+
 (short?'<button class="es26-all" data-es-tab="teams">ВСЕ КОМАНДЫ '+ico('arrow-right')+'</button>':'<p class="es26-caveat">Список включает команды мировой сцены, не только участников финалов 2026. Полный состав турнира — в официальном руководстве.</p>');
}
function article(n){
 var dest=safe(n.href,'https://supercell.com/brawlstars/en/blog/esports/');
 var kind=String(n.kind||'NEWS').toUpperCase(),isGame=kind.includes('GAME')||kind.includes('UPDATE');
 return '<a class="es26-article" href="'+esc(dest)+'" target="_blank" rel="noopener noreferrer"><div class="es26-article-top">'+icon(isGame?'star':'newspaper')+badge(isGame?'ОБНОВЛЕНИЕ':kind.includes('OFFICIAL')?'SUPERCELL':'КИБЕРСПОРТ','')+'</div>'+
 '<h3>'+esc(n.title||'Материал Brawl Stars')+'</h3><p>'+esc(n.sub||n.source||'Официальный материал')+'</p><div class="es26-article-bottom"><span>'+esc(n.source||'Источник')+' '+(n.published?'· '+esc(humanDate(n.published)):'')+'</span>'+ico('arrow-up-right')+'</div></a>';
}
function news(short){
 var list=Array.isArray(context.s.news)?context.s.news:[];
 list=list.filter(function(n){var kind=String(n.kind||'').toUpperCase();return newsFilter==='all'||(newsFilter==='game'?kind.includes('GAME')||kind.includes('UPDATE'):!(kind.includes('GAME')||kind.includes('UPDATE')))});
 var filters=short?'':'<div class="es26-filters">'+[['all','ВСЕ'],['esports','КИБЕРСПОРТ'],['game','ОБНОВЛЕНИЯ']].map(function(f){return '<button data-es-news="'+f[0]+'" class="'+(newsFilter===f[0]?'active':'')+'">'+f[1]+'</button>'}).join('')+'</div>';
 return section('НОВОСТНАЯ ЛЕНТА','Публикации с открытыми ссылками на источники; обновление при открытии и далее автоматически.',link('https://supercell.com/brawlstars/en/blog/esports/','БЛОГ SUPERCELL','es26-minilink'))+filters+
 (list.length?'<div class="es26-newsgrid">'+list.slice(0,short?3:18).map(article).join('')+'</div>':'<div class="es26-empty"><div class="es26-emptyicon">'+icon('newspaper')+'</div><p>Новые публикации не найдены. Открой официальный блог для актуальных объявлений.</p></div>');
}
function analysis(){
 var s=context.s.scenario||{},u=context.u;
 return section('MATCH ANALYZER','Сценарная оценка по вручную выбранной форме. Это не реальная вероятность победы.')+
 '<div class="es26-analyzer"><form id="esportsPredictForm"><div class="es26-analyzer-top"><label><small>КОМАНДА A</small><input class="input" id="predictA" maxlength="40" required value="'+esc(s.a||'')+'"></label><label><small>КОМАНДА B</small><input class="input" id="predictB" maxlength="40" required value="'+esc(s.b||'')+'"></label><button type="submit" class="button">'+ico('brain-circuit')+' АНАЛИЗ</button></div>'+
 '<div class="es26-ranges"><label>ФОРМА A · <span id="fALabel">'+esc(s.formA||3)+' / 5</span><input type="range" id="formA" min="1" max="5" value="'+esc(s.formA||3)+'"></label><label>ФОРМА B · <span id="fBLabel">'+esc(s.formB||3)+' / 5</span><input type="range" id="formB" min="1" max="5" value="'+esc(s.formB||3)+'"></label></div></form>'+
 '<div id="esportsResult">'+(s.result?u.makeScenarioResult(s.result):'<div class="es26-analyzer-note">Выбери команды и оцени их форму (1–5). Итог — учебный сценарный индекс, а не прогноз реальных матчей.</div>')+'</div></div>';
}
function overview(){
 return '<div class="es26-two"><div>'+section('ЧЕМПИОНАТ В ФОКУСЕ','Официальная информация о World Finals 2026.')+
 '<div class="es26-focus">'+badge('2026 · WORLD FINALS','event')+'<h3>20–22 ноября · Токио</h3><p>12 команд, мировой титул, призовой фонд $1 000 000. Награды зрителям и прогнозы доступны на официальном сайте турнира.</p>'+
 '<div class="es26-focuslinks">'+link(OFFICIAL,icon('ticket')+' ПРОГНОЗЫ И НАГРАДЫ')+link(GUIDE,'РЕГЛАМЕНТ И УЧАСТНИКИ')+'</div></div></div>'+
 '<div>'+section('БЫСТРЫЕ ПЕРЕХОДЫ','Официальные площадки и архив эфиров.')+
 '<div class="es26-quick">'+link(OFFICIAL,icon('flame')+' ТУРНИРНЫЙ ПОРТАЛ','es26-quicklink')+link(BRACKET,icon('award')+' СЕТКА МАТЧЕЙ','es26-quicklink')+link(STREAM,icon('clock')+' ЗАПИСИ ТРАНСЛЯЦИЙ','es26-quicklink')+'</div></div></div>'+
 '<div class="es26-block">'+matchList(true)+'</div><div class="es26-block">'+news(true)+'</div>';
}
function render(s,u){
 context={s:s,u:u};var root=document.getElementById('page-esports');if(!root)return;
 var top='<div class="es26">'+hero()+toolbar()+
 '<div class="es26-meta"><span>'+icon('clock')+' ИСТОЧНИК: '+(s.esportsFeed&&s.esportsFeed.length?'ТУРНИРНАЯ ЛЕНТА':'SUPERCELL / OFFICIAL LINKS')+'</span><button type="button" class="es26-refresh" data-es-refresh '+(busy?'disabled':'')+'>'+ico('refresh-cw')+' '+(busy?'ОБНОВЛЕНИЕ...':'ОБНОВИТЬ ДАННЫЕ')+'</button></div>';
 var body=mode==='matches'?matchList(false):mode==='teams'?teamGallery(false):mode==='news'?news(false):mode==='analysis'?analysis():overview();
 root.innerHTML=top+'<div class="es26-body">'+body+'</div><div class="es26-footer">BRAWL // NEXUS · UNOFFICIAL FAN PROJECT · РЕЗУЛЬТАТЫ ТОЛЬКО ИЗ ПРОВЕРЯЕМЫХ ИСТОЧНИКОВ</div></div>';
 u.learnIcons();
}
function showAnalyzer(){mode='analysis'}
document.addEventListener('click',async function(e){
 if(!context)return;
 var tab=e.target.closest('[data-es-tab]');if(tab){e.preventDefault();mode=tab.dataset.esTab;render(context.s,context.u);return}
 var filter=e.target.closest('[data-es-filter]');if(filter){e.preventDefault();matchFilter=filter.dataset.esFilter;render(context.s,context.u);return}
 var nf=e.target.closest('[data-es-news]');if(nf){e.preventDefault();newsFilter=nf.dataset.esNews;render(context.s,context.u);return}
 var refresh=e.target.closest('[data-es-refresh]');if(!refresh||busy)return;
 e.preventDefault();busy=true;render(context.s,context.u);
 try{
  var result=await Promise.allSettled([context.u.apiRequest('/api/esports'),context.u.apiRequest('/api/news')]);
  if(result[0].status==='fulfilled'&&Array.isArray(result[0].value.matches))context.s.esportsFeed=result[0].value.matches;
  if(result[1].status==='fulfilled'&&Array.isArray(result[1].value.news)&&result[1].value.news.length)context.s.news=result[1].value.news.map(context.u.normalizeNews);
 }finally{busy=false;render(context.s,context.u)}
});
window.NexusEsportsV2={render:render,showAnalyzer:showAnalyzer};
})();