// Data loaded from external JSON
let laborLawData = [];
let aiMonitorData = [];
let countryNameMap = {};
let countryDetailPages = {};

async function loadData() {
  try {
    const res = await fetch('./data/laws.json');
    const data = await res.json();
    laborLawData = data.laborLawData;
    aiMonitorData = data.aiMonitorData;
    countryNameMap = data.countryNameMap;
    countryDetailPages = data.countryDetailPages;
  } catch (e) {
    console.error('Failed to load law data:', e);
  }
}

const i18n={
  zh:{title:"全球劳动法规智能监控",heroTitle:"全球劳动法规智能监控",notifications:"通知中心",close:"关闭",all:"全部",sortDate:"按更新日期",sortCountry:"按国家",libTitle:"就业法规库",libSub:"所选国家/地区的全部就业法规",searchPlaceholder:"🔍 搜索法规、国家或HR主题...",globeInfo:"点击国家放大 · 滚轮缩放 · 返回世界视图",backToWorld:"返回世界视图",resetFilters:"重置筛选",countryRegion:"国家/地区",regulationType:"法规类型",updated:"排序方式",classificationLevel1:"一级分类",classificationLevel2:"二级分类",effectiveYear:"生效年份",viewDetails:"查看详情 →",viewAll:"查看全部更新 →",regulationTimeline:"── 法规时间线 ──",regulationLibrary:"── 法规库 ──",regulatoryInsights:"法规洞察",upcomingDates:"即将生效日期",aiImpactSummary:"AI影响摘要",naLabel:"暂无",detailBasicInfo:"基本信息",detailCategory:"法规类别",detailLevel1:"一级分类",detailLevel2:"二级分类",detailCategorySource:"分类来源",detailStatus:"法规状态",detailEffectiveDate:"生效时间",detailEffectiveDateSource:"生效时间来源",detailEffectiveDateEvidence:"生效时间依据",detailCountry:"国家/地区",detailSummary:"法规摘要",detailEnglish:"English",detailChinese:"中文",detailKeyChanges:"核心变更",detailHRImpact:"HR影响评估",detailOfficialSource:"官方来源",detailViewFull:"查看完整法规"},
  en:{title:"Global Labor Law Intelligence",heroTitle:"Global Labor Law Intelligence",notifications:"Notifications",close:"Close",all:"All",sortDate:"By Update Date",sortCountry:"By Country",libTitle:"Regulation Library",libSub:"All employment regulations for selected countries",searchPlaceholder:"🔍 Search regulations, countries or HR topics...",globeInfo:"Click country to zoom · Scroll to zoom · Return to world view",backToWorld:"Return to World View",resetFilters:"Reset filters",countryRegion:"Country / Region",regulationType:"Regulation Type",updated:"Sort",classificationLevel1:"Classification L1",classificationLevel2:"Classification L2",effectiveYear:"Effective Year",viewDetails:"View Details →",viewAll:"View All Updates →",regulationTimeline:"── REGULATORY TIMELINE ──",regulationLibrary:"── REGULATION LIBRARY ──",regulatoryInsights:"REGULATORY INSIGHTS",upcomingDates:"UPCOMING EFFECTIVE DATES",aiImpactSummary:"AI IMPACT SUMMARY",naLabel:"N/A",detailBasicInfo:"Basic Info",detailCategory:"Category",detailLevel1:"Level 1 Category",detailLevel2:"Level 2 Category",detailCategorySource:"Category Source",detailStatus:"Status",detailEffectiveDate:"Effective Date",detailEffectiveDateSource:"Effective Date Source",detailEffectiveDateEvidence:"Effective Date Evidence",detailCountry:"Country / Region",detailSummary:"Summary",detailEnglish:"English",detailChinese:"Chinese",detailKeyChanges:"Key Changes",detailHRImpact:"HR Impact Assessment",detailOfficialSource:"Official Source",detailViewFull:"View Full Regulation"},
  es:{title:"Inteligencia Laboral Global",heroTitle:"Inteligencia Laboral Global",notifications:"Notificaciones",close:"Cerrar",all:"Todos",sortDate:"Por Fecha",sortCountry:"Por País",libTitle:"Biblioteca de Regulaciones",libSub:"Todas las regulaciones laborales",searchPlaceholder:"🔍 Buscar regulaciones, países o temas de RRHH...",globeInfo:"Haga clic para ampliar · Rueda del ratón para zoom",backToWorld:"Vista Mundial",resetFilters:"Restablecer filtros",countryRegion:"País / Región",regulationType:"Tipo de Regulación",updated:"Ordenar",classificationLevel1:"Clasificación L1",classificationLevel2:"Clasificación L2",effectiveYear:"Año de Vigencia",viewDetails:"Ver Detalles →",viewAll:"Ver Todas las Actualizaciones →",regulationTimeline:"── LÍNEA DE TIEMPO ──",regulationLibrary:"── BIBLIOTECA ──",regulatoryInsights:"PERSPECTIVAS",upcomingDates:"FECHAS PRÓXIMAS",aiImpactSummary:"RESUMEN DE IMPACTO IA",naLabel:"N/A",detailBasicInfo:"Información Básica",detailCategory:"Categoría",detailLevel1:"Categoría Nivel 1",detailLevel2:"Categoría Nivel 2",detailCategorySource:"Fuente de Categoría",detailStatus:"Estado",detailEffectiveDate:"Fecha de Vigencia",detailEffectiveDateSource:"Fuente de Fecha",detailEffectiveDateEvidence:"Evidencia de Fecha",detailCountry:"País / Región",detailSummary:"Resumen",detailEnglish:"English",detailChinese:"Chino",detailKeyChanges:"Cambios Clave",detailHRImpact:"Evaluación de Impacto HR",detailOfficialSource:"Fuente Oficial",detailViewFull:"Ver Regulación Completa"}
};

let currentLang='zh',currentRegion='',currentSort='date',mapInstance=null,geoLayer=null,geoData=null,currentZoom=2,selectedCountry=null,filteredData=[...laborLawData];

function getCountryName(country){if(currentLang==='zh')return countryNameMap[country]||country;return country}

function switchLang(lang){currentLang=lang;applyFilters();updateLangButton();renderNotifPanel();updateI18nText();populateRegionTabs();populateCountryFilter();populateYearFilter();if(currentViewingLaw)openDetail(currentViewingLaw.id)}
function updateLangButton(){const b=document.getElementById('langBtn');b.textContent=currentLang==='zh'?'🌐 中文':currentLang==='en'?'🌐 English':'🌐 Español'}
function updateI18nText(){const t=i18n[currentLang];document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n');if(t[k])el.textContent=t[k]});document.querySelectorAll('[data-i18n-ph]').forEach(el=>{const k=el.getAttribute('data-i18n-ph');if(t[k])el.placeholder=t[k]})}
function toggleDD(id){document.getElementById(id).classList.toggle('open')}
function toggleTheme(){const h=document.documentElement;const d=h.getAttribute('data-theme')==='dark';h.setAttribute('data-theme',d?'light':'dark');document.getElementById('themeBtn').textContent=d?'☀️':'🌙'}
function toggleNotifPanel(){document.getElementById('notifPanel').classList.toggle('open')}
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)}

function populateCountryFilter(){const sel=document.getElementById('filterCountry');const countries=[...new Set(laborLawData.map(d=>d.country))].sort((a,b)=>{const na=currentLang==='zh'?(countryNameMap[a]||a):a;const nb=currentLang==='zh'?(countryNameMap[b]||b):b;return na.localeCompare(nb)});sel.innerHTML='<option value="">'+i18n[currentLang].all+'</option>';countries.forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=getCountryName(c);sel.appendChild(o)})}

function populateYearFilter(){const sel=document.getElementById('filterYear');const years=new Set();laborLawData.forEach(d=>{if(d.effectiveDate&&d.effectiveDateStatus!=='unavailable'){const y=new Date(d.effectiveDate).getFullYear();if(!isNaN(y))years.add(y)}});const hasNA=laborLawData.some(d=>!d.effectiveDate||d.effectiveDateStatus==='unavailable');sel.innerHTML='<option value="">'+i18n[currentLang].all+'</option>';Array.from(years).sort((a,b)=>b-a).forEach(y=>{const o=document.createElement('option');o.value=y;o.textContent=y;sel.appendChild(o)});if(hasNA){const o=document.createElement('option');o.value='N/A';o.textContent=i18n[currentLang].naLabel;sel.appendChild(o)}}

// Level1 → Level2 hierarchy based on cloud document
const categoryHierarchy = {
  "基础信息Basic Information": [],
  "法定缴费类Social Security / Statutory Funds": ["养老金Pension", "医疗保险Medical", "失业保险Unemployment", "工伤保险Work Injury", "生育保险Maternity", "住房基金Housing Fund", "其他福利Others"],
  "休假类Leave": ["年假Annual Leave", "病假Sick Leave", "产假Maternity Leave", "陪产假Paternity Leave", "育儿假Childcare Leave"],
  "强制支付/法定津贴Mandatory Payments & Allowances": [],
  "工时与加班Working Time & Overtime": ["工作日加班Weekday Overtime", "节假日加班Holiday Overtime", "夜间加班Night Overtime"],
  "离职与遣散Termination & Severance": ["法定标准Legal standard", "协商离职Negotiate Resignation", "主动离职Voluntarily Resign"],
  "个税Income Tax": ["累进税率Progressive Tax Rates", "固定税率Fixed Rate"]
};

function populateLevel1Filter(){
  const sel=document.getElementById('filterLevel1');
  sel.innerHTML='<option value="">'+i18n[currentLang].all+'</option>';
  Object.keys(categoryHierarchy).forEach(l=>{
    const o=document.createElement('option');
    o.value=l;o.textContent=l;sel.appendChild(o);
  });
}

function onLevel1Change(){
  const l1=document.getElementById('filterLevel1').value;
  const sel2=document.getElementById('filterLevel2');
  sel2.innerHTML='<option value="">'+i18n[currentLang].all+'</option>';
  if(l1 && categoryHierarchy[l1] && categoryHierarchy[l1].length > 0){
    categoryHierarchy[l1].forEach(l=>{
      const o=document.createElement('option');
      o.value=l;o.textContent=l;sel2.appendChild(o);
    });
    sel2.disabled=false;
  } else {
    sel2.innerHTML='<option value="">请先选择一级分类</option>';
    sel2.disabled=true;
  }
  applyFilters();
}

const regions=[{key:'',label:{zh:'全球',en:'Global',es:'Global'}},{key:'Asia',label:{zh:'亚洲',en:'Asia',es:'Asia'}},{key:'Europe',label:{zh:'欧洲',en:'Europe',es:'Europa'}},{key:'Americas',label:{zh:'美洲',en:'Americas',es:'Américas'}},{key:'Africa',label:{zh:'非洲',en:'Africa',es:'África'}},{key:'Oceania',label:{zh:'大洋洲',en:'Oceania',es:'Oceanía'}}];
let currentTabRegion='';

function populateRegionTabs(){const el=document.getElementById('heroChips');el.innerHTML='';regions.forEach(r=>{const btn=document.createElement('button');btn.className='tab-btn'+(r.key===currentTabRegion?' active':'');btn.textContent=r.label[currentLang];btn.onclick=()=>{currentTabRegion=r.key;document.getElementById('filterRegion').value=r.key;applyFilters();populateRegionTabs()};el.appendChild(btn)})}

function onCountrySelectChange(){applyFilters()}

function applyFilters(){
  const region=document.getElementById('filterRegion').value||currentTabRegion;
  const country=document.getElementById('filterCountry').value;
  const level1=document.getElementById('filterLevel1').value;
  const level2=document.getElementById('filterLevel2').value;
  const year=document.getElementById('filterYear').value;
  const search=document.getElementById('searchInput').value.toLowerCase().trim();
  currentRegion=region;currentTabRegion=region;
  let d=[...laborLawData];
  if(region)d=d.filter(r=>r.region===region);
  if(country)d=d.filter(r=>r.country===country);
  if(level1)d=d.filter(r=>r.primaryCategory===level1);
  if(level2)d=d.filter(r=>r.secondaryCategory===level2);
  if(year){if(year==='N/A'){d=d.filter(r=>!r.effectiveDate||r.effectiveDateStatus==='unavailable')}else{d=d.filter(r=>r.effectiveDate&&new Date(r.effectiveDate).getFullYear().toString()===year)}}
  if(search)d=d.filter(r=>(r.country+' '+getCountryName(r.country)+' '+r.law+' '+r.category+' '+r.summary+' '+r.summaryZh+' '+r.flag+' '+r.modules.join(' ')).toLowerCase().includes(search));
  d.sort((a,b)=>getCountryName(a.country).localeCompare(getCountryName(b.country)));
  filteredData=d;
  renderTimeline();renderLawCards();updateKPIs();renderUpcoming();renderAISummary();renderTicker();
  document.getElementById('libCount').textContent='Showing '+d.length+' regulations';
}

function resetFilters(){
  document.getElementById('filterRegion').value='';
  document.getElementById('filterCountry').value='';
  document.getElementById('filterLevel1').value='';
  document.getElementById('filterLevel2').value='';
  document.getElementById('filterLevel2').disabled=true;
  document.getElementById('filterLevel2').innerHTML='<option value="">请先选择一级分类</option>';
  document.getElementById('filterYear').value='';
  document.getElementById('searchInput').value='';
  currentTabRegion='';
  populateLevel1Filter();
  populateYearFilter();
  applyFilters();
  populateRegionTabs();
}

function renderTimeline(){
  const el=document.getElementById('timeline');
  const sorted=[...filteredData].sort((a,b)=>(b.effectiveDate||'').localeCompare(a.effectiveDate||''));
  const groups={};
  sorted.forEach(item=>{const d=item.effectiveDate?new Date(item.effectiveDate):null;if(!d)return;const y=d.getFullYear();if(!groups[y])groups[y]=[];groups[y].push(item)});
  let html='';
  Object.keys(groups).sort((a,b)=>b-a).forEach(year=>{
    html+='<div class="tl-group"><div class="tl-year">'+year+'</div>';
    groups[year].forEach(item=>{
      const d=new Date(item.effectiveDate);const months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
      const dateStr=months[d.getMonth()]+' '+String(d.getDate()).padStart(2,'0');
      html+='<div class="tl-entry" onclick="openDetail(\''+item.id+'\')">';
      html+='<div class="tl-left"><div class="tl-dot"></div><div class="tl-date">'+dateStr+'</div></div>';
      html+='<div class="tl-right"><div class="tl-meta"><span class="tl-flag">'+item.flag+'</span><span class="tl-country">'+getCountryName(item.country)+'</span><span class="tl-cat">'+item.category+'</span></div>';
      html+='<div class="tl-law">'+item.law+'</div>';
      html+='<div class="tl-summary">'+(currentLang==='zh'?item.summaryZh:item.summary)+'</div>';
      html+='<div class="tl-link">'+i18n[currentLang].viewDetails+'</div></div></div>';
    });
    html+='</div>';
  });
  if(!html)html='<div style="padding:20px;text-align:center;color:var(--text3)">No regulations match your filters.</div>';
  el.innerHTML=html;
}

function renderLawCards(){
  const el=document.getElementById('lawCards');let html='';
  filteredData.forEach(item=>{
    const sc=item.status==='effective'?'effective':item.status==='upcoming'?'upcoming':item.status==='action-required'?'action-required':'active';
    const sl=item.status==='effective'?'Effective':item.status==='upcoming'?'Upcoming':item.status==='action-required'?'Action Required':'Active';
    html+='<div class="law-card" onclick="openDetail(\''+item.id+'\')">';
    html+='<div class="lc-top"><span class="lc-flag">'+item.flag+'</span><span class="lc-country">'+getCountryName(item.country)+'</span></div>';
    html+='<div class="lc-title">'+item.law+'</div>';
    html+='<div class="lc-cat"><span class="lc-cat-primary">'+item.primaryCategory+'</span> → <span class="lc-cat-secondary">'+item.category+'</span></div>';
    html+='<div class="lc-date">· 生效时间：'+formatEffectiveDate(item)+'</div>';
    html+='<div class="lc-summary">'+(currentLang==='zh'?item.summaryZh:item.summary)+'</div>';
    html+='<div class="lc-footer"><span class="lc-status '+sc+'">'+sl+'</span><span class="lc-link">'+i18n[currentLang].viewDetails+'</span></div>';
    html+='</div>';
  });
  if(!html)html='<div class="lib-empty">No regulations match your filters.</div>';
  el.innerHTML=html;
}

function updateKPIs(){
  document.getElementById('kTotal').textContent=laborLawData.length;
  document.getElementById('kCountries').textContent=[...new Set(laborLawData.map(d=>d.country))].length;
  const thirty=new Date();thirty.setDate(thirty.getDate()-30);
  document.getElementById('kUpdated30').textContent=laborLawData.filter(d=>d.effectiveDate&&new Date(d.effectiveDate)>=thirty).length;
  document.getElementById('kAction').textContent=laborLawData.filter(d=>d.status==='action-required'||d.status==='upcoming').length;
}

function renderUpcoming(){
  const el=document.getElementById('upcomingList');
  const upcoming=laborLawData.filter(d=>d.effectiveDate).sort((a,b)=>new Date(a.effectiveDate)-new Date(b.effectiveDate)).slice(0,6);
  let html='';
  upcoming.forEach(item=>{
    html+='<div class="upcoming-item" onclick="openDetail(\''+item.id+'\')">';
    html+='<div class="upcoming-date">'+item.effectiveDate+' · '+item.flag+' '+getCountryName(item.country)+'</div>';
    html+='<div class="upcoming-title">'+item.law.substring(0,50)+(item.law.length>50?'...':'')+'</div>';
    html+='</div>';
  });
  el.innerHTML=html;
}

function renderAISummary(){
  const el=document.getElementById('aiSummary');
  const thirty=new Date();thirty.setDate(thirty.getDate()-30);
  const recent=laborLawData.filter(d=>d.effectiveDate&&new Date(d.effectiveDate)>=thirty);
  const byCat={};recent.forEach(d=>{byCat[d.category]=(byCat[d.category]||0)+1});
  const actionR=recent.filter(d=>d.status==='upcoming'||d.status==='action-required').length;
  let html='过去 30 天共有 <strong>'+recent.length+'</strong> 项法规生效:<br>';
  Object.entries(byCat).forEach(([cat,count])=>{html+='• '+count+' 项影响 '+cat+'<br>'});
  if(actionR)html+='• '+actionR+' 项需要 HR Policy Update<br>';
  html+='• '+(recent.length-actionR)+' 项仅为信息更新';
  el.innerHTML=html;
}

function renderTicker(){
  const el=document.getElementById('tickerTrack');
  const sorted=[...laborLawData].sort((a,b)=>(b.effectiveDate||'').localeCompare(a.effectiveDate||'')).slice(0,12);
  let html='';const months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const build=()=>{sorted.forEach(item=>{const d=item.effectiveDate?new Date(item.effectiveDate):null;if(!d)return;const ds=months[d.getMonth()]+' '+String(d.getDate()).padStart(2,'0');const isNew=item.effectiveDate&&(Date.now()-new Date(item.effectiveDate).getTime())<7*86400000;html+='<div class="tc-item" onclick="openDetail(\''+item.id+'\')"><span class="flag">'+item.flag+'</span><span class="name">'+getCountryName(item.country)+'</span><span class="sep">·</span><span class="cat">'+item.category+'</span><span class="title">'+item.law.substring(0,30)+(item.law.length>30?'...':'')+'</span><span class="date">'+ds+'</span>'+(isNew?'<span class="new-tag">NEW</span>':'')+'</div>'})};
  build();build();
  html+='<div class="ticker-viewall" onclick="document.getElementById(\'libraryLabel\').scrollIntoView({behavior:\'smooth\'})">View All Updates →</div>';
  el.innerHTML=html;el.classList.add('auto');
}

function renderNotifPanel(){
  const el=document.getElementById('notifBody');
  let html='<div class="notif-group-label">RECENT UPDATES</div>';
  aiMonitorData.forEach(n=>{
    html+='<div class="notif-item"><span class="ni-flag">'+n.flag+'</span><div class="ni-body">';
    html+='<div class="ni-title">'+n.title+'</div><div class="ni-sub">'+n.country+' · '+n.category+'</div>';
    html+='<div class="ni-date">'+n.date+'</div></div>';
    if(n.severity==='high')html+='<span class="ni-badge">!</span>';
    html+='</div>';
  });
  el.innerHTML=html;
  document.getElementById('notifBadge').textContent=aiMonitorData.filter(n=>n.severity==='high').length||aiMonitorData.length;
}

function formatEffectiveDate(item){
  if(!item.effectiveDate)return '暂无';
  if(item.effectiveDateStatus==='unavailable')return '暂无';
  const d=item.effectiveDate;
  if(/^\d{4}-\d{2}-\d{2}$/.test(d))return d;
  if(/^\d{4}-\d{2}$/.test(d)){
    const parts=d.split('-');
    return parts[0]+'年'+parseInt(parts[1])+'月';
  }
  if(/^\d{4}$/.test(d))return d+'年';
  return d;
}

function openDetail(id){
  const item=laborLawData.find(d=>d.id===id);if(!item)return;
  currentViewingLaw=item;
  const tl=currentLang==='zh';
  const t=i18n[currentLang];
  let html='<h2 style="font-size:16px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px">'+item.flag+' '+getCountryName(item.country)+' — '+(tl?(item.lawZh||item.law):item.law)+'</h2>';
  html+='<div class="dp-grid"><div class="dp-section"><h4>📋 '+t.detailBasicInfo+'</h4>';
  html+='<div class="dp-row"><div class="dp-label">'+t.detailCategory+'</div><div class="dp-val"><span class="dp-tag mod">'+item.category+'</span></div></div>';
  html+='<div class="dp-row"><div class="dp-label">'+t.detailLevel1+'</div><div class="dp-val">'+item.primaryCategory+'</div></div>';
  html+='<div class="dp-row"><div class="dp-label">'+t.detailLevel2+'</div><div class="dp-val">'+item.secondaryCategory+'</div></div>';
  html+='<div class="dp-row"><div class="dp-label">'+t.detailCategorySource+'</div><div class="dp-val">'+item.categorySource+'</div></div>';
  html+='<div class="dp-row"><div class="dp-label">'+t.detailStatus+'</div><div class="dp-val" style="text-transform:capitalize">'+item.status+'</div></div>';
  html+='<div class="dp-row"><div class="dp-label">'+t.detailEffectiveDate+'</div><div class="dp-val">'+formatEffectiveDate(item)+'</div></div>';
  if(item.effectiveDateSource){
    html+='<div class="dp-row"><div class="dp-label">'+t.detailEffectiveDateSource+'</div><div class="dp-val"><a href="'+item.effectiveDateSource+'" target="_blank" style="color:var(--accent);text-decoration:underline">'+item.effectiveDateSource.substring(0,60)+'...</a></div></div>';
  }
  if(item.effectiveDateEvidence){
    html+='<div class="dp-row"><div class="dp-label">'+t.detailEffectiveDateEvidence+'</div><div class="dp-val" style="font-size:11px;color:var(--text2)">'+item.effectiveDateEvidence+'</div></div>';
  }
  html+='<div class="dp-row"><div class="dp-label">'+t.detailCountry+'</div><div class="dp-val">'+getCountryName(item.country)+'</div></div>';
  html+='</div><div class="dp-section"><h4>📝 '+t.detailSummary+'</h4>';
  if(tl){
    html+='<div class="dp-row"><div class="dp-label">中文</div><div class="dp-val">'+(item.summaryZh||item.summary)+'</div></div>';
    html+='<div class="dp-row"><div class="dp-label">English</div><div class="dp-val" style="color:var(--text2);font-size:11px">'+item.summary+'</div></div>';
  }else{
    html+='<div class="dp-row"><div class="dp-label">English</div><div class="dp-val">'+item.summary+'</div></div>';
    html+='<div class="dp-row"><div class="dp-label">Chinese</div><div class="dp-val" style="color:var(--text2);font-size:11px">'+(item.summaryZh||item.summary)+'</div></div>';
  }
  html+='</div></div>';
  // Business Fields section
  if(item.businessFields && item.businessFields[currentLang]){
    const bf=item.businessFields[currentLang];
    const bfEntries=Object.entries(bf);
    if(bfEntries.length>0){
      html+='<div class="dp-section" style="margin-top:16px"><h4>📊 '+(tl?'业务详情':'Business Details')+'</h4>';
      bfEntries.forEach(([key,val])=>{
        if(val)html+='<div class="dp-row"><div class="dp-label">'+key+'</div><div class="dp-val">'+val+'</div></div>';
      });
      html+='</div>';
    }
  }
  html+='<div class="dp-section" style="margin-top:16px"><h4>🔄 '+t.detailKeyChanges+'</h4>';
  item.changes.forEach(c=>{html+='<div style="margin-bottom:4px;font-size:12px;color:var(--text)">• '+c+'</div>'});
  html+='</div><div class="dp-section" style="margin-top:16px"><h4>💼 '+t.detailHRImpact+'</h4>';
  item.hrImpact.forEach(h=>{html+='<div style="margin-bottom:4px;font-size:12px;color:var(--text)">• '+h+'</div>'});
  html+='</div><div class="dp-section" style="margin-top:16px"><h4>🔗 '+t.detailOfficialSource+'</h4><div class="dp-val"><a href="'+item.source+'" target="_blank">'+item.source+'</a></div></div>';
  if(countryDetailPages[item.country])html+='<button class="btn-fullview" onclick="openCountryPage(\''+item.country+'\')">📖 '+t.detailViewFull+'</button>';
  document.getElementById('detailContent').innerHTML=html;
  document.getElementById('detailOverlay').classList.add('open');
  document.getElementById('detailPanel').classList.add('open');
}
function closeDetail(){document.getElementById('detailOverlay').classList.remove('open');document.getElementById('detailPanel').classList.remove('open');currentViewingLaw=null}
function closeDrawer(){document.getElementById('drawerOverlay').classList.remove('open');document.getElementById('drawer').classList.remove('open')}
function openCountryPage(country){const url=countryDetailPages[country];if(!url){showToast('No detail page available');return}document.getElementById('countryModalTitle').innerHTML='📖 '+country+' ('+(countryNameMap[country]||country)+')';document.getElementById('countryModalIframe').src=url;document.getElementById('countryModal').classList.add('open')}
function closeCountryPage(){document.getElementById('countryModal').classList.remove('open');document.getElementById('countryModalIframe').src=''}

function initMap(){
  if (typeof L === 'undefined' || !L) { console.warn('Leaflet not available'); return; }
  if (mapInstance) { return; } // Prevent double initialization
  try{
    mapInstance=L.map('leafletMap',{zoomControl:true,scrollWheelZoom:true}).setView([20,0],2);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{attribution:'',maxZoom:18}).addTo(mapInstance);
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(r=>r.json()).then(data=>{
        geoData=data;
        const cc={};laborLawData.forEach(d=>{cc[d.country]=(cc[d.country]||0)+1});
        geoLayer=L.geoJSON(data,{style:f=>{const n=f.properties.ADMIN;const c=cc[n]||0;return{fillColor:c>3?'#2563eb':c>1?'#3b82f6':c>0?'#60a5fa':'#e2e8f0',fillOpacity:c>0?0.7:0.1,weight:1,color:'#fff',opacity:0.5}},onEachFeature:(f,l)=>{
          const n=f.properties.ADMIN;const c=cc[n]||0;
          if(c>0){l.bindTooltip(n+' ('+c+')',{className:'map-tip',direction:'top',offset:[0,-5]});l.on('click',()=>zoomToCountry(n,c));l.on('mouseover',function(){this.setStyle({fillOpacity:0.9,weight:2})});l.on('mouseout',function(){geoLayer.resetStyle(this)})}
        }}).addTo(mapInstance);
        renderLegend(cc);
      }).catch(()=>{});
  }catch(e){console.error('Map init error',e)}
}

function zoomToCountry(name,count){
  selectedCountry=name;currentZoom=6;
  mapInstance.eachLayer(layer=>{if(layer.feature&&layer.feature.properties.ADMIN===name){mapInstance.fitBounds(layer.getBounds(),{maxZoom:6})}});
  document.getElementById('mapReturnBtn').classList.add('show');
  document.getElementById('mapChip').classList.add('show');
  const cd=laborLawData.filter(d=>d.country===name);
  document.getElementById('mcName').innerHTML=(cd[0]?cd[0].flag+' ':'')+getCountryName(name)+(countryNameMap[name]?' ('+countryNameMap[name]+')':'');
  document.getElementById('mcCount').textContent=count+' regulation'+(count>1?'s':'');
  document.getElementById('filterCountry').value=name;
  applyFilters();
}

function returnToWorldView(){
  selectedCountry=null;currentZoom=2;mapInstance.setView([20,0],2);
  document.getElementById('mapReturnBtn').classList.remove('show');
  document.getElementById('mapChip').classList.remove('show');
  document.getElementById('filterCountry').value='';applyFilters();
}

function renderLegend(counts){
  const el=document.getElementById('globeLegend');
  el.innerHTML='<div class="gleg"><span class="gdot" style="background:#2563eb"></span>3+ regulations</div><div class="gleg"><span class="gdot" style="background:#3b82f6"></span>2 regulations</div><div class="gleg"><span class="gdot" style="background:#60a5fa"></span>1 regulation</div>';
}

function applyURLParams(){
  const p=new URLSearchParams(window.location.search);
  const lang=p.get('lang');if(lang&&i18n[lang])currentLang=lang;
  const region=p.get('region');if(region)document.getElementById('filterRegion').value=region;
  const country=p.get('country');if(country)document.getElementById('filterCountry').value=country;
  const search=p.get('q');if(search)document.getElementById('searchInput').value=search;
}

document.addEventListener('click',e=>{if(!e.target.closest('.dd-wrap'))document.querySelectorAll('.dd-menu').forEach(m=>m.classList.remove('open'))});

// ============ AI Panel Logic ============
let aiPanelOpen = false;
let currentViewingLaw = null; // Track which law detail is open

function toggleAIPanel() {
  aiPanelOpen = !aiPanelOpen;
  const panel = document.getElementById('aiPanel');
  const fab = document.getElementById('aiFab');
  if (aiPanelOpen) {
    if (!hasApiKey()) { openKeyModal(); return; }
    panel.classList.add('open');
    fab.classList.add('hidden');
  } else {
    panel.classList.remove('open');
    fab.classList.remove('hidden');
  }
}

function switchAITab(tab) {
  document.querySelectorAll('.ai-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.ai-tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  document.getElementById('aiTab' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
}

function openKeyModal() {
  document.getElementById('aiKeyModal').classList.add('open');
  document.getElementById('aiKeyInput').value = getApiKey();
}

function closeKeyModal() {
  document.getElementById('aiKeyModal').classList.remove('open');
}

function saveApiKey() {
  const key = document.getElementById('aiKeyInput').value.trim();
  if (!key) { showToast('请输入 API Key'); return; }
  setApiKey(key);
  closeKeyModal();
  showToast('API Key 已保存');
  // If panel was trying to open, open it now
  if (!aiPanelOpen) toggleAIPanel();
}

// Chat
async function sendAIChat() {
  const input = document.getElementById('aiChatInput');
  const msg = input.value.trim();
  if (!msg) return;
  if (!hasApiKey()) { openKeyModal(); return; }

  const messagesEl = document.getElementById('aiChatMessages');
  // Add user message
  messagesEl.innerHTML += `<div class="ai-msg ai-msg-user">${escapeHtml(msg)}</div>`;
  input.value = '';
  // Add loading
  messagesEl.innerHTML += `<div class="ai-msg ai-msg-loading" id="aiLoading">思考中...</div>`;
  messagesEl.scrollTop = messagesEl.scrollHeight;

  try {
    const context = currentViewingLaw ? currentViewingLaw : null;
    const reply = await chatWithAI(msg, context);
    document.getElementById('aiLoading')?.remove();
    messagesEl.innerHTML += `<div class="ai-msg ai-msg-bot">${escapeHtml(reply)}</div>`;
  } catch (e) {
    document.getElementById('aiLoading')?.remove();
    messagesEl.innerHTML += `<div class="ai-msg ai-msg-bot" style="color:var(--red)">❌ ${escapeHtml(e.message)}</div>`;
  }
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Translate
async function doTranslate() {
  const text = document.getElementById('aiTranslateInput').value.trim();
  if (!text) { showToast('请输入要翻译的文本'); return; }
  if (!hasApiKey()) { openKeyModal(); return; }

  const lang = document.getElementById('aiTranslateLang').value;
  const resultEl = document.getElementById('aiTranslateResult');
  resultEl.innerHTML = '<span style="color:var(--text3)">翻译中...</span>';

  try {
    const result = await translateText(text, lang);
    resultEl.textContent = result;
  } catch (e) {
    resultEl.innerHTML = `<span style="color:var(--red)">❌ ${escapeHtml(e.message)}</span>`;
  }
}

// Analyze
async function doAnalyzeCurrent() {
  if (!hasApiKey()) { openKeyModal(); return; }
  if (!currentViewingLaw) {
    showToast('请先点击一条法规查看详情');
    return;
  }

  const resultEl = document.getElementById('aiAnalyzeResult');
  resultEl.innerHTML = '<span style="color:var(--text3)">AI 正在深度分析...</span>';

  try {
    const result = await analyzeLaw(currentViewingLaw);
    resultEl.textContent = result;
  } catch (e) {
    resultEl.innerHTML = `<span style="color:var(--red)">❌ ${escapeHtml(e.message)}</span>`;
  }
}

async function doRegionalInsight() {
  if (!hasApiKey()) { openKeyModal(); return; }
  const region = currentRegion || 'Asia';
  const resultEl = document.getElementById('aiAnalyzeResult');
  resultEl.innerHTML = `<span style="color:var(--text3)">正在分析 ${region} 地区趋势...</span>`;

  try {
    const result = await generateRegionalInsight(region);
    resultEl.textContent = result;
  } catch (e) {
    resultEl.innerHTML = `<span style="color:var(--red)">❌ ${escapeHtml(e.message)}</span>`;
  }
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/\n/g,'<br>');
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  applyURLParams();
  populateCountryFilter();
  populateLevel1Filter();
  populateYearFilter();
  populateRegionTabs();
  updateLangButton();
  applyFilters();
  renderNotifPanel();
  updateI18nText();
  // Coordinate map init with Leaflet async loading
  window._domReady = true;
  if (window._leafletReady) {
    initMap();
  }
});
