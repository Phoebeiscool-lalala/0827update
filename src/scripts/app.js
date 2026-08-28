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

// ============ Supported Countries ============
const SUPPORTED_COUNTRIES = ['SG', 'MY', 'TH'];

const countryNameFallback = {
  en: { Singapore: 'Singapore', Malaysia: 'Malaysia', Thailand: 'Thailand' },
  es: { Singapore: 'Singapur', Malaysia: 'Malasia', Thailand: 'Tailandia' }
};

const countryFlagMap = {
  SG: '\u{1F1F8}\u{1F1EC}',
  MY: '\u{1F1F2}\u{1F1FE}',
  TH: '\u{1F1F9}\u{1F1ED}'
};

function getCountryName(country) {
  if (currentLang === 'zh') return countryNameMap[country] || country;
  return (countryNameFallback[currentLang] && countryNameFallback[currentLang][country]) || country;
}

// ============ i18n ============
const i18n = {
  zh: {
    title: "\u5168\u7403\u52B3\u52A8\u6CD5\u89C4\u667A\u80FD\u76D1\u63A7",
    heroTitle: "\u4E1C\u5357\u4E9A\u52B3\u52A8\u6CD5\u89C4\u667A\u80FD\u76D1\u63A7",
    notifications: "\u901A\u77E5\u4E2D\u5FC3",
    close: "\u5173\u95ED",
    all: "\u5168\u90E8",
    sortDate: "\u6309\u66F4\u65B0\u65E5\u671F",
    sortCountry: "\u6309\u56FD\u5BB6",
    libTitle: "\u5C31\u4E1A\u6CD5\u89C4\u5E93",
    libSub: "\u6240\u9009\u56FD\u5BB6/\u5730\u533A\u7684\u5168\u90E8\u5C31\u4E1A\u6CD5\u89C4",
    searchPlaceholder: "\uD83D\uDD0D \u641C\u7D22\u6CD5\u89C4\u3001\u56FD\u5BB6\u6216HR\u4E3B\u9898...",
    globeInfo: "\u70B9\u51FB\u56FD\u5BB6\u653E\u5927 \u00B7 \u6EDA\u8F6E\u7F29\u653E \u00B7 \u8FD4\u56DE\u4E1C\u5357\u4E9A\u89C6\u56FE",
    backToWorld: "\u8FD4\u56DE\u4E1C\u5357\u4E9A\u89C6\u56FE",
    resetFilters: "\u91CD\u7F6E\u7B5B\u9009",
    region: "\u5730\u533A",
    countryRegion: "\u56FD\u5BB6/\u5730\u533A",
    regulationType: "\u6CD5\u89C4\u7C7B\u578B",
    updated: "\u6392\u5E8F\u65B9\u5F0F",
    classificationLevel1: "\u6CD5\u89C4\u7C7B\u76EE",
    classificationLevel2: "\u7EC6\u5206\u7C7B\u76EE",
    effectiveYear: "\u751F\u6548\u5E74\u4EFD",
    viewDetails: "\u67E5\u770B\u8BE6\u60C5 \u2192",
    viewAll: "\u67E5\u770B\u5168\u90E8\u66F4\u65B0 \u2192",
    regulationTimeline: "\u2500\u2500 \u6CD5\u89C4\u65F6\u95F4\u7EBF \u2500\u2500",
    regulationLibrary: "\u2500\u2500 \u6CD5\u89C4\u5E93 \u2500\u2500",
    regulatoryInsights: "\u6CD5\u89C4\u6D1E\u5BDF",
    upcomingDates: "\u5373\u5C06\u751F\u6548\u65E5\u671F",
    aiImpactSummary: "AI\u5F71\u54CD\u6458\u8981",
    naLabel: "\u6682\u65E0",
    selectLevel1First: "\u8BF7\u5148\u9009\u62E9\u6CD5\u89C4\u7C7B\u76EE",
    noSubcategories: "\u6682\u65E0\u7EC6\u5206\u7C7B\u76EE",
    detailBasicInfo: "\u57FA\u672C\u4FE1\u606F",
    detailCategory: "\u6CD5\u89C4\u7C7B\u522B",
    detailLevel1: "\u6CD5\u89C4\u7C7B\u76EE",
    detailLevel2: "\u7EC6\u5206\u7C7B\u76EE",
    detailCategorySource: "\u5206\u7C7B\u6765\u6E90",
    detailStatus: "\u6CD5\u89C4\u72B6\u6001",
    detailEffectiveDate: "\u751F\u6548\u65F6\u95F4",
    detailEffectiveDateSource: "\u751F\u6548\u65F6\u95F4\u6765\u6E90",
    detailEffectiveDateEvidence: "\u751F\u6548\u65F6\u95F4\u4F9D\u636E",
    detailCountry: "\u56FD\u5BB6/\u5730\u533A",
    detailSummary: "\u6CD5\u89C4\u6458\u8981",
    detailEnglish: "English",
    detailChinese: "\u4E2D\u6587",
    detailSpanish: "Espa\u00F1ol",
    detailKeyChanges: "\u6838\u5FC3\u53D8\u66F4",
    detailHRImpact: "HR\u5F71\u54CD\u8BC4\u4F30",
    detailOfficialSource: "\u5B98\u65B9\u6765\u6E90",
    detailViewFull: "\u67E5\u770B\u5B8C\u6574\u6CD5\u89C4",
    upcomingRegulations: "\u5373\u5C06\u751F\u6548\u6CD5\u89C4",
    immediateHRAction: "\u9700\u8981HR\u9A6C\u4E0A\u91C7\u53D6\u884C\u52A8",
    daysUntilEffective: "\u8DDD\u751F\u6548\u8FD8\u6709",
    detailDays: "\u5929",
    hrActionRequired: "\u9700\u8981HR\u884C\u52A8",
    requiredHRActions: "HR\u9700\u8981\u91C7\u53D6\u7684\u884C\u52A8",
    noUpcoming: "\u6682\u65E0\u5373\u5C06\u751F\u6548\u7684\u6CD5\u89C4",
    noHRAction: "\u6682\u65E0\u9700\u8981HR\u884C\u52A8\u7684\u6CD5\u89C4",
    effectiveDateLabel: "\u751F\u6548\u65F6\u95F4",
    noResults: "\u6CA1\u6709\u7B26\u5408\u7B5B\u9009\u6761\u4EF6\u7684\u6CD5\u89C4",
    libCount: "\u5171 {n} \u6761\u6CD5\u89C4",
    statusEffective: "\u751F\u6548\u4E2D",
    statusUpcoming: "\u5373\u5C06\u751F\u6548",
    statusActionRequired: "\u9700\u8981\u91C7\u53D6\u884C\u52A8",
    statusActive: "\u6709\u6548",
    viewAllUpdates: "\u67E5\u770B\u5168\u90E8\u66F4\u65B0 \u2192",
    recentUpdates: "\u8FD1\u671F\u66F4\u65B0",
    legend3: "3+ \u6761\u6CD5\u89C4",
    legend2: "2 \u6761\u6CD5\u89C4",
    legend1: "1 \u6761\u6CD5\u89C4",
    regulationText: " \u6761\u6CD5\u89C4",
    businessDetails: "\u4E1A\u52A1\u8BE6\u60C5",
    summaryZhLabel: "\u4E2D\u6587\u6458\u8981",
    summaryEnLabel: "English Summary",
    summaryEsLabel: "Resumen en Espa\u00F1ol",
    aiSummary30d: "\u8FC7\u53BB 30 \u5929\u5171\u6709 <strong>{n}</strong> \u6761\u6CD5\u89C4\u751F\u6548:",
    aiSummaryCat: "{count} \u6761\u5F71\u54CD {cat}",
    aiSummaryHr: "{n} \u6761\u9700\u8981 HR Policy Update",
    aiSummaryInfo: "{n} \u6761\u4EC5\u4E3A\u4FE1\u606F\u66F4\u65B0",
    noDetailPage: "\u6682\u65E0\u8BE6\u60C5\u9875\u9762",
    effectiveDatePrefix: "\u751F\u6548\u65F6\u95F4\uFF1A",
    countryRegionShort: "\u56FD\u5BB6/\u5730\u533A",
    heroTag: "AI \u6CD5\u89C4\u60C5\u62A5",
    heroSub: "\u76D1\u63A7 \u00B7 \u5BF9\u6BD4 \u00B7 \u5206\u6790\u4E1C\u5357\u4E9AHR\u6CD5\u89C4",
    heroBadge: "AI \u76D1\u63A7\u4E2D",
    kpiActive: "\u751F\u6548\u6CD5\u89C4",
    kpiCountries: "\u8986\u76D6\u56FD\u5BB6",
    filtersLabel: "\u7B5B\u9009",
    regionSoutheastAsia: "\u4E1C\u5357\u4E9A",
    aiPanelTitle: "\uD83E\uDD16 DeepSeek AI \u52A9\u624B",
    aiTabChat: "\uD83D\uDCAC \u95EE\u7B54",
    aiTabTranslate: "\uD83C\uDF10 \u7FFB\u8BD1",
    aiTabAnalyze: "\uD83D\uDCCA \u5206\u6790",
    aiChatWelcome: "\uD83D\uDC4B \u4F60\u597D\uFF0C\u6211\u662F\u4F60\u7684\u52B3\u52A8\u6CD5\u89C4 AI \u52A9\u624B\u3002\u6211\u53EF\u4EE5\u5E2E\u52A9\u4F60\uFF1A<br>\u2022 \u56DE\u7B54\u5404\u56FD\u52B3\u52A8\u6CD5\u89C4\u95EE\u9898<br>\u2022 \u5BF9\u6BD4\u4E0D\u540C\u56FD\u5BB6\u6CD5\u89C4<br>\u2022 \u63D0\u4F9B HR \u5408\u89C4\u5EFA\u8BAE<br><br>\u6709\u4EC0\u4E48\u53EF\u4EE5\u5E2E\u4F60\u7684\uFF1F",
    aiChatPlaceholder: "\u95EE\u6211\u4EFB\u4F55\u5173\u4E8E\u52B3\u52A8\u6CD5\u89C4\u7684\u95EE\u9898...",
    aiSend: "\u53D1\u9001",
    aiTranslatePlaceholder: "\u8F93\u5165\u8981\u7FFB\u8BD1\u7684\u6CD5\u89C4\u6587\u672C...",
    aiTranslateBtn: "\u7FFB\u8BD1",
    aiAnalyzeCurrent: "\uD83D\uDD0D \u5206\u6790\u5F53\u524D\u6CD5\u89C4",
    aiRegionalInsight: "\uD83C\uDF0D \u5730\u533A\u8D8B\u52BF\u5206\u6790",
    aiKeyTitle: "\uD83D\uDD11 DeepSeek API \u8BBE\u7F6E",
    aiKeyDesc: "\u8F93\u5165\u4F60\u7684 DeepSeek API Key \u4EE5\u542F\u7528 AI \u529F\u80FD\u3002<br>Key \u4EC5\u5B58\u50A8\u5728\u672C\u5730\u6D4F\u89C8\u5668\u4E2D\uFF0C\u4E0D\u4F1A\u4E0A\u4F20\u5230\u4EFB\u4F55\u670D\u52A1\u5668\u3002",
    aiKeyPlaceholder: "sk-xxxxxxxxxxxxxxxx",
    aiKeySave: "\u4FDD\u5B58",
    aiKeyCancel: "\u53D6\u6D88",
    aiKeyGet: "\u83B7\u53D6 Key: ",
    aiKeyInvalid: "API Key \u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u540E\u91CD\u65B0\u8F93\u5165",
    aiKeyRequired: "\u8BF7\u5148\u8BBE\u7F6E DeepSeek API Key",
    aiKeySaved: "API Key \u5DF2\u4FDD\u5B58",
    aiKeyEmpty: "\u8BF7\u8F93\u5165 API Key",
    aiAnalyzeHint: "\u9009\u62E9\u4E00\u6761\u6CD5\u89C4\u70B9\u51FB\u201C\u5206\u6790\u5F53\u524D\u6CD5\u89C4\u201D\uFF0C\u6216\u9009\u62E9\u5730\u533A\u70B9\u51FB\u201C\u5730\u533A\u8D8B\u52BF\u5206\u6790\u201D",
    aiNoLaw: "\u8BF7\u5148\u70B9\u51FB\u4E00\u6761\u6CD5\u89C4\u67E5\u770B\u8BE6\u60C5",
    aiTranslating: "\u7FFB\u8BD1\u4E2D...",
    aiThinking: "\u601D\u8003\u4E2D...",
    closeCountryPage: "\u2715 \u5173\u95ED",
    aiRateLimited: "\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5",
    heroTagEN: "AI REGULATORY INTELLIGENCE",
    heroSubEN: "Monitor \u00B7 Compare \u00B7 Analyze Southeast Asia HR regulations",
    heroBadgeEN: "AI Monitoring Active"
  },
  en: {
    title: "Southeast Asia Labor Law Intelligence",
    heroTitle: "Southeast Asia Labor Law Intelligence",
    notifications: "Notifications",
    close: "Close",
    all: "All",
    sortDate: "By Update Date",
    sortCountry: "By Country",
    libTitle: "Regulation Library",
    libSub: "All employment regulations for Singapore, Malaysia & Thailand",
    searchPlaceholder: "\uD83D\uDD0D Search regulations, countries or HR topics...",
    globeInfo: "Click country to zoom \u00B7 Scroll to zoom \u00B7 Return to SE Asia view",
    backToWorld: "Return to SE Asia View",
    resetFilters: "Reset filters",
    region: "Region",
    countryRegion: "Country / Region",
    regulationType: "Regulation Type",
    updated: "Sort",
    classificationLevel1: "Regulation Category",
    classificationLevel2: "Subcategory",
    effectiveYear: "Effective Year",
    viewDetails: "View Details \u2192",
    viewAll: "View All Updates \u2192",
    regulationTimeline: "\u2500\u2500 REGULATORY TIMELINE \u2500\u2500",
    regulationLibrary: "\u2500\u2500 REGULATION LIBRARY \u2500\u2500",
    regulatoryInsights: "REGULATORY INSIGHTS",
    upcomingDates: "UPCOMING EFFECTIVE DATES",
    aiImpactSummary: "AI IMPACT SUMMARY",
    naLabel: "N/A",
    selectLevel1First: "Please select a Regulation Category first",
    noSubcategories: "No subcategories available",
    detailBasicInfo: "Basic Info",
    detailCategory: "Category",
    detailLevel1: "Regulation Category",
    detailLevel2: "Subcategory",
    detailCategorySource: "Category Source",
    detailStatus: "Status",
    detailEffectiveDate: "Effective Date",
    detailEffectiveDateSource: "Effective Date Source",
    detailEffectiveDateEvidence: "Effective Date Evidence",
    detailCountry: "Country / Region",
    detailSummary: "Summary",
    detailEnglish: "English",
    detailChinese: "Chinese",
    detailSpanish: "Espa\u00F1ol",
    detailKeyChanges: "Key Changes",
    detailHRImpact: "HR Impact Assessment",
    detailOfficialSource: "Official Source",
    detailViewFull: "View Full Regulation",
    upcomingRegulations: "Upcoming Regulations",
    immediateHRAction: "Immediate HR Action Required",
    daysUntilEffective: "Days Until Effective",
    detailDays: "",
    hrActionRequired: "HR Action Required",
    requiredHRActions: "Required HR Actions",
    noUpcoming: "No upcoming regulations",
    noHRAction: "No HR action required",
    effectiveDateLabel: "Effective Date",
    noResults: "No regulations match your filters.",
    libCount: "Showing {n} regulations",
    statusEffective: "Effective",
    statusUpcoming: "Upcoming",
    statusActionRequired: "Action Required",
    statusActive: "Active",
    viewAllUpdates: "View All Updates \u2192",
    recentUpdates: "RECENT UPDATES",
    legend3: "3+ regulations",
    legend2: "2 regulations",
    legend1: "1 regulation",
    regulationText: " regulations",
    businessDetails: "Business Details",
    summaryZhLabel: "Chinese Summary",
    summaryEnLabel: "English Summary",
    summaryEsLabel: "Resumen en Espa\u00F1ol",
    aiSummary30d: "<strong>{n}</strong> regulations took effect in the last 30 days:",
    aiSummaryCat: "{count} affecting {cat}",
    aiSummaryHr: "{n} requiring HR Policy Update",
    aiSummaryInfo: "{n} are information-only updates",
    noDetailPage: "No detail page available",
    effectiveDatePrefix: "Effective: ",
    countryRegionShort: "Country / Region",
    heroTag: "AI REGULATORY INTELLIGENCE",
    heroSub: "Monitor \u00B7 Compare \u00B7 Analyze Southeast Asia HR regulations",
    heroBadge: "AI Monitoring Active",
    kpiActive: "Active Regulations",
    kpiCountries: "Countries Covered",
    filtersLabel: "FILTERS",
    regionSoutheastAsia: "Southeast Asia",
    aiPanelTitle: "\uD83E\uDD16 DeepSeek AI Assistant",
    aiTabChat: "\uD83D\uDCAC Chat",
    aiTabTranslate: "\uD83C\uDF10 Translate",
    aiTabAnalyze: "\uD83D\uDCCA Analyze",
    aiChatWelcome: "\uD83D\uDC4B Hi! I'm your labor law AI assistant. I can help you:<br>\u2022 Answer labor law questions by country<br>\u2022 Compare regulations across countries<br>\u2022 Provide HR compliance advice<br><br>How can I help you?",
    aiChatPlaceholder: "Ask me anything about labor law...",
    aiSend: "Send",
    aiTranslatePlaceholder: "Enter regulation text to translate...",
    aiTranslateBtn: "Translate",
    aiAnalyzeCurrent: "\uD83D\uDD0D Analyze Current Regulation",
    aiRegionalInsight: "\uD83C\uDF0D Regional Trend Analysis",
    aiKeyTitle: "\uD83D\uDD11 DeepSeek API Settings",
    aiKeyDesc: "Enter your DeepSeek API Key to enable AI features.<br>The key is stored only in your local browser, never uploaded to any server.",
    aiKeyPlaceholder: "sk-xxxxxxxxxxxxxxxx",
    aiKeySave: "Save",
    aiKeyCancel: "Cancel",
    aiKeyGet: "Get Key: ",
    aiKeyInvalid: "API Key is invalid, please check and re-enter",
    aiKeyRequired: "Please set your DeepSeek API Key first",
    aiKeySaved: "API Key saved",
    aiKeyEmpty: "Please enter an API Key",
    aiAnalyzeHint: "Select a regulation then click \"Analyze Current Regulation\", or select a region and click \"Regional Trend Analysis\"",
    aiNoLaw: "Please click a regulation to view its details first",
    aiTranslating: "Translating...",
    aiThinking: "Thinking...",
    closeCountryPage: "\u2715 Close",
    aiRateLimited: "Too many requests, please try again later"
  },
  es: {
    title: "Inteligencia Laboral del Sudeste Asi\u00E1tico",
    heroTitle: "Inteligencia Laboral del Sudeste Asi\u00E1tico",
    notifications: "Notificaciones",
    close: "Cerrar",
    all: "Todos",
    sortDate: "Por Fecha",
    sortCountry: "Por Pa\u00EDs",
    libTitle: "Biblioteca de Regulaciones",
    libSub: "Todas las regulaciones laborales de Singapur, Malasia y Tailandia",
    searchPlaceholder: "\uD83D\uDD0D Buscar regulaciones, pa\u00EDses o temas de RRHH...",
    globeInfo: "Haga clic para ampliar \u00B7 Rueda del rat\u00F3n para zoom \u00B7 Volver a vista del Sudeste Asi\u00E1tico",
    backToWorld: "Vista del Sudeste Asi\u00E1tico",
    resetFilters: "Restablecer filtros",
    region: "Regi\u00F3n",
    countryRegion: "Pa\u00EDs / Regi\u00F3n",
    regulationType: "Tipo de Regulaci\u00F3n",
    updated: "Ordenar",
    classificationLevel1: "Categor\u00EDa normativa",
    classificationLevel2: "Subcategor\u00EDa",
    effectiveYear: "A\u00F1o de entrada en vigor",
    viewDetails: "Ver Detalles \u2192",
    viewAll: "Ver Todas las Actualizaciones \u2192",
    regulationTimeline: "\u2500\u2500 L\u00CDNEA DE TIEMPO \u2500\u2500",
    regulationLibrary: "\u2500\u2500 BIBLIOTECA \u2500\u2500",
    regulatoryInsights: "PERSPECTIVAS",
    upcomingDates: "FECHAS PR\u00D3XIMAS",
    aiImpactSummary: "RESUMEN DE IMPACTO IA",
    naLabel: "N/D",
    selectLevel1First: "Seleccione primero una categor\u00EDa normativa",
    noSubcategories: "No hay subcategor\u00EDas disponibles",
    detailBasicInfo: "Informaci\u00F3n B\u00E1sica",
    detailCategory: "Categor\u00EDa",
    detailLevel1: "Categor\u00EDa normativa",
    detailLevel2: "Subcategor\u00EDa",
    detailCategorySource: "Fuente de Categor\u00EDa",
    detailStatus: "Estado",
    detailEffectiveDate: "Fecha de entrada en vigor",
    detailEffectiveDateSource: "Fuente de Fecha",
    detailEffectiveDateEvidence: "Evidencia de Fecha",
    detailCountry: "Pa\u00EDs / Regi\u00F3n",
    detailSummary: "Resumen",
    detailEnglish: "English",
    detailChinese: "Chino",
    detailSpanish: "Espa\u00F1ol",
    detailKeyChanges: "Cambios Clave",
    detailHRImpact: "Evaluaci\u00F3n de Impacto HR",
    detailOfficialSource: "Fuente Oficial",
    detailViewFull: "Ver Regulaci\u00F3n Completa",
    upcomingRegulations: "Normativas de pr\u00F3xima entrada en vigor",
    immediateHRAction: "Acci\u00F3n inmediata de RR. HH. requerida",
    daysUntilEffective: "D\u00EDas hasta la entrada en vigor",
    detailDays: "d\u00EDas",
    hrActionRequired: "Acci\u00F3n HR Requerida",
    requiredHRActions: "Acciones HR Requeridas",
    noUpcoming: "No hay regulaciones pr\u00F3ximas",
    noHRAction: "No se requiere acci\u00F3n HR",
    effectiveDateLabel: "Fecha de entrada en vigor",
    noResults: "Ninguna regulaci\u00F3n coincide con los filtros.",
    libCount: "Mostrando {n} regulaciones",
    statusEffective: "Vigente",
    statusUpcoming: "Pr\u00F3xima",
    statusActionRequired: "Acci\u00F3n requerida",
    statusActive: "Activa",
    viewAllUpdates: "Ver Todas las Actualizaciones \u2192",
    recentUpdates: "ACTUALIZACIONES RECIENTES",
    legend3: "3+ regulaciones",
    legend2: "2 regulaciones",
    legend1: "1 regulaci\u00F3n",
    regulationText: " regulaciones",
    businessDetails: "Detalles del Negocio",
    summaryZhLabel: "Resumen Chino",
    summaryEnLabel: "Resumen English",
    summaryEsLabel: "Resumen en Espa\u00F1ol",
    aiSummary30d: "<strong>{n}</strong> regulaciones entraron en vigor en los \u00FAltimos 30 d\u00EDas:",
    aiSummaryCat: "{count} que afectan {cat}",
    aiSummaryHr: "{n} requieren actualizaci\u00F3n de pol\u00EDticas de RR. HH.",
    aiSummaryInfo: "{n} son solo actualizaciones informativas",
    noDetailPage: "No hay p\u00E1gina de detalle disponible",
    effectiveDatePrefix: "Entrada en vigor: ",
    countryRegionShort: "Pa\u00EDs / Regi\u00F3n",
    heroTag: "INTELIGENCIA REGULATORIA IA",
    heroSub: "Monitorear \u00B7 Comparar \u00B7 Analizar regulaciones laborales del Sudeste Asi\u00E1tico",
    heroBadge: "Monitoreo IA Activo",
    kpiActive: "Regulaciones Vigentes",
    kpiCountries: "Pa\u00EDses Cubiertos",
    filtersLabel: "FILTROS",
    regionSoutheastAsia: "Sudeste Asi\u00E1tico",
    aiPanelTitle: "\uD83E\uDD16 Asistente IA DeepSeek",
    aiTabChat: "\uD83D\uDCAC Chat",
    aiTabTranslate: "\uD83C\uDF10 Traducir",
    aiTabAnalyze: "\uD83D\uDCCA Analizar",
    aiChatWelcome: "\uD83D\uDC4B \u00A1Hola! Soy tu asistente de derecho laboral. Puedo ayudarte:<br>\u2022 Responder preguntas de derecho laboral por pa\u00EDs<br>\u2022 Comparar regulaciones entre pa\u00EDses<br>\u2022 Dar consejos de cumplimiento de RR. HH.<br><br>\u00BFEn qu\u00E9 puedo ayudarte?",
    aiChatPlaceholder: "Preg\u00FAntame sobre derecho laboral...",
    aiSend: "Enviar",
    aiTranslatePlaceholder: "Ingrese el texto de la regulaci\u00F3n a traducir...",
    aiTranslateBtn: "Traducir",
    aiAnalyzeCurrent: "\uD83D\uDD0D Analizar Regulaci\u00F3n Actual",
    aiRegionalInsight: "\uD83C\uDF0D An\u00E1lisis de Tendencias Regionales",
    aiKeyTitle: "\uD83D\uDD11 Configuraci\u00F3n de API DeepSeek",
    aiKeyDesc: "Ingrese su clave de API de DeepSeek para habilitar las funciones de IA.<br>La clave se guarda solo en su navegador local, nunca se sube a ning\u00FAn servidor.",
    aiKeyPlaceholder: "sk-xxxxxxxxxxxxxxxx",
    aiKeySave: "Guardar",
    aiKeyCancel: "Cancelar",
    aiKeyGet: "Obtener clave: ",
    aiKeyInvalid: "La clave de API no es v\u00E1lida, rev\u00EDsela e intente de nuevo",
    aiKeyRequired: "Configure primero su clave de API de DeepSeek",
    aiKeySaved: "Clave de API guardada",
    aiKeyEmpty: "Ingrese una clave de API",
    aiAnalyzeHint: "Seleccione una regulaci\u00F3n y haga clic en \"Analizar Regulaci\u00F3n Actual\", o seleccione una regi\u00F3n y haga clic en \"An\u00E1lisis de Tendencias Regionales\"",
    aiNoLaw: "Haga clic en una regulaci\u00F3n para ver sus detalles primero",
    aiTranslating: "Traduciendo...",
    aiThinking: "Pensando...",
    closeCountryPage: "\u2715 Cerrar",
    aiRateLimited: "Demasiadas solicitudes, int\u00E9ntelo de nuevo m\u00E1s tarde"
  }
};

let currentLang = 'zh', currentRegion = '', currentSort = 'date', mapInstance = null, geoLayer = null, geoData = null, currentZoom = 5, selectedCountry = null, filteredData = [...laborLawData], mapMarker = null, mapLabel = null;

// ============ Category Labels (trilingual) ============
const categoryLabels = {
  "\u6CD5\u5B9A\u7F34\u8D39\u7C7BSocial Security / Statutory Funds": { zh: "\u6CD5\u5B9A\u7F34\u8D39\u7C7B", en: "Social Security / Statutory Funds", es: "Seguridad Social / Fondos Estatutarios" },
  "\u4F11\u5047\u7C7BLeave": { zh: "\u4F11\u5047\u7C7B", en: "Leave", es: "Permisos" },
  "\u5F3A\u5236\u652F\u4ED8/\u6CD5\u5B9A\u6D25\u8D34Mandatory Payments & Allowances": { zh: "\u5F3A\u5236\u652F\u4ED8/\u6CD5\u5B9A\u6D25\u8D34", en: "Mandatory Payments & Allowances", es: "Pagos Obligatorios y Asignaciones" },
  "\u5DE5\u65F6\u4E0E\u52A0\u73EDWorking Time & Overtime": { zh: "\u5DE5\u65F6\u4E0E\u52A0\u73ED", en: "Working Time & Overtime", es: "Jornada Laboral y Horas Extra" },
  "\u79BB\u804C\u4E0E\u9063\u6563Termination & Severance": { zh: "\u79BB\u804C\u4E0E\u9063\u6563", en: "Termination & Severance", es: "Terminaci\u00F3n y Indemnizaci\u00F3n" },
  "\u6700\u4F4E\u5DE5\u8D44Minimum Wages": { zh: "\u6700\u4F4E\u5DE5\u8D44", en: "Minimum Wages", es: "Salarios M\u00EDnimos" },
  "\u4E2A\u7A0EIncome Tax": { zh: "\u4E2A\u7A0E", en: "Income Tax", es: "Impuesto sobre la Renta" }
};

function getCategoryLabel(rawKey) {
  if (categoryLabels[rawKey] && categoryLabels[rawKey][currentLang]) {
    return categoryLabels[rawKey][currentLang];
  }
  return rawKey;
}

// ============ Language Switch ============
function switchLang(lang) {
  currentLang = lang;
  applyFilters();
  updateLangButton();
  updateI18nText();
  populateRegionTabs();
  populateCountryFilter();
  populateYearFilter();
  populateLevel1Filter();
  if (currentViewingLaw) openDetail(currentViewingLaw.id);
  if (selectedCountry && mapInstance) {
    const regCount = filteredData.filter(d => d.country === selectedCountry).length;
    addMapLabel(selectedCountry, regCount);
    document.getElementById('mcCount').textContent = regCount + regCountText[currentLang];
  }
  renderLegend();
}

function updateLangButton() {
  const b = document.getElementById('langBtn');
  b.textContent = currentLang === 'zh' ? '\uD83C\uDF10 \u4E2D\u6587' : currentLang === 'en' ? '\uD83C\uDF10 English' : '\uD83C\uDF10 Espa\u00F1ol';
}

function updateI18nText() {
  const t = i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (t[k]) el.textContent = t[k];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const k = el.getAttribute('data-i18n-ph');
    if (t[k]) el.placeholder = t[k];
  });
}

// ============ Dropdowns ============
function toggleDD(id) { document.getElementById(id).classList.toggle('open'); }
function toggleTheme() {
  const h = document.documentElement;
  const d = h.getAttribute('data-theme') === 'dark';
  h.setAttribute('data-theme', d ? 'light' : 'dark');
  document.getElementById('themeBtn').textContent = d ? '\u2600\uFE0F' : '\uD83C\uDF19';
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function populateCountryFilter() {
  const sel = document.getElementById('filterCountry');
  const countries = [...new Set(laborLawData.map(d => d.country))].sort((a, b) => {
    const na = getCountryName(a); const nb = getCountryName(b);
    return na.localeCompare(nb);
  });
  sel.innerHTML = '<option value="">' + i18n[currentLang].all + '</option>';
  countries.forEach(c => {
    const o = document.createElement('option');
    o.value = c; o.textContent = getCountryName(c); sel.appendChild(o);
  });
}

function populateYearFilter() {
  const sel = document.getElementById('filterYear');
  const years = new Set();
  laborLawData.forEach(d => {
    if (d.effectiveDate && d.effectiveDateStatus !== 'unavailable') {
      const y = new Date(d.effectiveDate).getFullYear();
      if (!isNaN(y)) years.add(y);
    }
  });
  const hasNA = laborLawData.some(d => !d.effectiveDate || d.effectiveDateStatus === 'unavailable');
  sel.innerHTML = '<option value="">' + i18n[currentLang].all + '</option>';
  Array.from(years).sort((a, b) => b - a).forEach(y => {
    const o = document.createElement('option'); o.value = y; o.textContent = y; sel.appendChild(o);
  });
  if (hasNA) {
    const o = document.createElement('option'); o.value = 'N/A'; o.textContent = i18n[currentLang].naLabel; sel.appendChild(o);
  }
}

// ============ Category Hierarchy ============
const categoryHierarchy = {
  "\u6CD5\u5B9A\u7F34\u8D39\u7C7BSocial Security / Statutory Funds": ["\u517B\u8001\u91D1Pension", "\u533B\u7597\u4FDD\u9669Medical", "\u5931\u4E1A\u4FDD\u9669Unemployment", "\u5DE5\u4F24\u4FDD\u9669Work Injury", "\u751F\u80B2\u4FDD\u9669Maternity", "\u4F4F\u623F\u57FA\u91D1Housing Fund", "\u5176\u4ED6\u798F\u5229Others"],
  "\u4F11\u5047\u7C7BLeave": ["\u5E74\u5047Annual Leave", "\u75C5\u5047Sick Leave", "\u4EA7\u5047Maternity Leave", "\u966A\u4EA7\u5047Paternity Leave", "\u80B2\u513F\u5047Childcare Leave"],
  "\u5F3A\u5236\u652F\u4ED8/\u6CD5\u5B9A\u6D25\u8D34Mandatory Payments & Allowances": [],
  "\u5DE5\u65F6\u4E0E\u52A0\u73EDWorking Time & Overtime": ["\u5DE5\u4F5C\u65E5\u52A0\u73EDWeekday Overtime", "\u8282\u5047\u65E5\u52A0\u73EDHoliday Overtime", "\u591C\u95F4\u52A0\u73EDNight Overtime"],
  "\u79BB\u804C\u4E0E\u9063\u6563Termination & Severance": ["\u6CD5\u5B9A\u6807\u51C6Legal standard", "\u534F\u5546\u79BB\u804CNegotiate Resignation", "\u4E3B\u52A8\u79BB\u804CVoluntarily Resign"],
  "\u6700\u4F4E\u5DE5\u8D44Minimum Wages": [],
  "\u4E2A\u7A0EIncome Tax": ["\u7D2F\u8FDB\u7A0E\u7387Progressive Tax Rates", "\u56FA\u5B9A\u7A0E\u7387Fixed Rate"]
};

function populateLevel1Filter() {
  const sel = document.getElementById('filterLevel1');
  sel.innerHTML = '<option value="">' + i18n[currentLang].all + '</option>';
  Object.keys(categoryHierarchy).forEach(l => {
    const o = document.createElement('option');
    o.value = l; o.textContent = getCategoryLabel(l); sel.appendChild(o);
  });
}

function onLevel1Change() {
  const l1 = document.getElementById('filterLevel1').value;
  const sel2 = document.getElementById('filterLevel2');
  sel2.innerHTML = '<option value="">' + i18n[currentLang].all + '</option>';
  if (l1 && categoryHierarchy[l1] && categoryHierarchy[l1].length > 0) {
    categoryHierarchy[l1].forEach(l => {
      const o = document.createElement('option'); o.value = l; o.textContent = l; sel2.appendChild(o);
    });
    sel2.disabled = false;
  } else if (l1) {
    sel2.innerHTML = '<option value="">' + i18n[currentLang].noSubcategories + '</option>';
    sel2.disabled = true;
  } else {
    sel2.innerHTML = '<option value="">' + i18n[currentLang].selectLevel1First + '</option>';
    sel2.disabled = true;
  }
  applyFilters();
}

// ============ Region (Southeast Asia only) ============
const regions = [{ key: 'southeast-asia', label: { zh: '\u4E1C\u5357\u4E9A', en: 'Southeast Asia', es: 'Sudeste Asi\u00E1tico' } }];
let currentTabRegion = '';

function populateRegionTabs() {
  const el = document.getElementById('heroChips');
  el.innerHTML = '';
  regions.forEach(r => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (r.key === currentTabRegion ? ' active' : '');
    btn.textContent = r.label[currentLang];
    btn.onclick = () => { currentTabRegion = r.key; document.getElementById('filterRegion').value = r.key; applyFilters(); populateRegionTabs(); };
    el.appendChild(btn);
  });
}

// ============ Filtering ============
function applyFilters() {
  const region = document.getElementById('filterRegion').value || currentTabRegion;
  const country = document.getElementById('filterCountry').value;
  const level1 = document.getElementById('filterLevel1').value;
  const level2 = document.getElementById('filterLevel2').value;
  const year = document.getElementById('filterYear').value;
  const search = document.getElementById('searchInput').value.toLowerCase().trim();
  currentRegion = region; currentTabRegion = region;
  let d = [...laborLawData];
  if (region) d = d.filter(r => r.region === region);
  if (country) d = d.filter(r => r.country === country);
  if (level1) d = d.filter(r => r.primaryCategory === level1);
  if (level2) d = d.filter(r => r.secondaryCategory === level2);
  if (year) {
    if (year === 'N/A') { d = d.filter(r => !r.effectiveDate || r.effectiveDateStatus === 'unavailable'); }
    else { d = d.filter(r => r.effectiveDate && new Date(r.effectiveDate).getFullYear().toString() === year); }
  }
  if (search) d = d.filter(r => (r.country + ' ' + getCountryName(r.country) + ' ' + r.law + ' ' + r.category + ' ' + r.summary + ' ' + r.summaryZh + ' ' + (r.summaryEs || '') + ' ' + r.flag + ' ' + r.modules.join(' ')).toLowerCase().includes(search));
  d.sort((a, b) => getCountryName(a.country).localeCompare(getCountryName(b.country)));
  filteredData = d;
  renderTimeline(); renderLawCards(); updateKPIs(); renderUpcoming(); renderAISummary(); renderTicker();
  document.getElementById('libCount').textContent = i18n[currentLang].libCount.replace('{n}', d.length);
}

function resetFilters() {
  document.getElementById('filterRegion').value = '';
  document.getElementById('filterCountry').value = '';
  document.getElementById('filterLevel1').value = '';
  document.getElementById('filterLevel2').value = '';
  document.getElementById('filterLevel2').disabled = true;
  document.getElementById('filterLevel2').innerHTML = '<option value="">' + i18n[currentLang].selectLevel1First + '</option>';
  document.getElementById('filterYear').value = '';
  document.getElementById('searchInput').value = '';
  currentTabRegion = '';
  populateLevel1Filter();
  populateYearFilter();
  applyFilters();
  populateRegionTabs();
}

// ============ Effective Date Formatting ============
function formatEffectiveDate(item) {
  if (!item.effectiveDate) return i18n[currentLang].naLabel;
  if (item.effectiveDateStatus === 'unavailable') return i18n[currentLang].naLabel;
  const d = item.effectiveDate;
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  if (/^\d{4}-\d{2}$/.test(d)) {
    const parts = d.split('-');
    if (currentLang === 'zh') return parts[0] + '\u5E74' + parseInt(parts[1]) + '\u6708';
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[parseInt(parts[1])] + ' ' + parts[0];
  }
  if (/^\d{4}$/.test(d)) return d;
  return d;
}

function getStatusLabel(status) {
  const key = 'status' + status.charAt(0).toUpperCase() + status.slice(1).replace(/-([a-z])/g, (m, c) => c.toUpperCase());
  return i18n[currentLang][key] || status;
}

// ============ Timeline ============
function renderTimeline() {
  const el = document.getElementById('timeline');
  const sorted = [...filteredData].sort((a, b) => (b.effectiveDate || '').localeCompare(a.effectiveDate || ''));
  const groups = {};
  sorted.forEach(item => { const d = item.effectiveDate ? new Date(item.effectiveDate) : null; if (!d) return; const y = d.getFullYear(); if (!groups[y]) groups[y] = []; groups[y].push(item); });
  let html = '';
  Object.keys(groups).sort((a, b) => b - a).forEach(year => {
    html += '<div class="tl-group"><div class="tl-year">' + year + '</div>';
    groups[year].forEach(item => {
      const d = new Date(item.effectiveDate); const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const dateStr = months[d.getMonth()] + ' ' + String(d.getDate()).padStart(2, '0');
      html += '<div class="tl-entry" onclick="openDetail(\'' + item.id + '\')">';
      html += '<div class="tl-left"><div class="tl-dot"></div><div class="tl-date">' + dateStr + '</div></div>';
      html += '<div class="tl-right"><div class="tl-meta"><span class="tl-flag">' + item.flag + '</span><span class="tl-country">' + getCountryName(item.country) + '</span><span class="tl-cat">' + item.category + '</span></div>';
      html += '<div class="tl-law">' + getLawTitle(item) + '</div>';
      html += '<div class="tl-summary">' + getSummaryText(item) + '</div>';
      html += '<div class="tl-link">' + i18n[currentLang].viewDetails + '</div></div></div>';
    });
    html += '</div>';
  });
  if (!html) html = '<div style="padding:20px;text-align:center;color:var(--text3)">' + i18n[currentLang].noResults + '</div>';
  el.innerHTML = html;
}

// ============ Law Cards ============
function renderLawCards() {
  const el = document.getElementById('lawCards');
  let html = '';
  filteredData.forEach(item => {
    const sc = item.status === 'effective' ? 'effective' : item.status === 'upcoming' ? 'upcoming' : item.status === 'action-required' ? 'action-required' : 'active';
    const sl = getStatusLabel(item.status);
    html += '<div class="law-card" onclick="openDetail(\'' + item.id + '\')">';
    html += '<div class="lc-top"><span class="lc-flag">' + item.flag + '</span><span class="lc-country">' + getCountryName(item.country) + '</span></div>';
    html += '<div class="lc-title">' + getLawTitle(item) + '</div>';
    html += '<div class="lc-cat"><span class="lc-cat-primary">' + getCategoryLabel(item.primaryCategory) + '</span> \u2192 <span class="lc-cat-secondary">' + item.category + '</span></div>';
    html += '<div class="lc-date">\u00B7 ' + i18n[currentLang].effectiveDatePrefix + formatEffectiveDate(item) + '</div>';
    html += '<div class="lc-summary">' + getSummaryText(item) + '</div>';
    html += '<div class="lc-footer"><span class="lc-status ' + sc + '">' + sl + '</span><span class="lc-link">' + i18n[currentLang].viewDetails + '</span></div>';
    html += '</div>';
  });
  if (!html) html = '<div class="lib-empty">' + i18n[currentLang].noResults + '</div>';
  el.innerHTML = html;
}

// ============ Summary text helper ============
function getSummaryText(item) {
  if (currentLang === 'zh') return item.summaryZh || item.summary;
  if (currentLang === 'es') return item.summaryEs || item.summary;
  return item.summary;
}
function getLawTitle(item) {
  if (currentLang === 'zh') return item.lawZh || item.law;
  if (currentLang === 'es') return item.lawEs || item.law;
  return item.law;
}

// ============ KPIs ============
function updateKPIs() {
  document.getElementById('kTotal').textContent = laborLawData.length;
  document.getElementById('kCountries').textContent = [...new Set(laborLawData.map(d => d.country))].length;
  const now = new Date();
  const ninety = new Date(); ninety.setDate(ninety.getDate() + 90);
  const upcoming = laborLawData.filter(d => d.effectiveDate && d.effectiveDateStatus !== 'unavailable' && new Date(d.effectiveDate) >= now && new Date(d.effectiveDate) <= ninety);
  document.getElementById('kUpdated30').textContent = upcoming.length;
  document.getElementById('kAction').textContent = laborLawData.filter(d => d.status === 'action-required' || d.status === 'upcoming').length;
}

// ============ Upcoming ============
function renderUpcoming() {
  const el = document.getElementById('upcomingList');
  const now = new Date();
  const upcoming = laborLawData.filter(d => d.effectiveDate && d.effectiveDateStatus !== 'unavailable' && new Date(d.effectiveDate) >= now).sort((a, b) => new Date(a.effectiveDate) - new Date(b.effectiveDate)).slice(0, 6);
  let html = '';
  if (upcoming.length === 0) {
    html = '<div style="padding:12px;color:var(--text3);font-size:12px">' + i18n[currentLang].noUpcoming + '</div>';
  }
  upcoming.forEach(item => {
    html += '<div class="upcoming-item" onclick="openDetail(\'' + item.id + '\')">';
    html += '<div class="upcoming-date">' + item.effectiveDate + ' \u00B7 ' + item.flag + ' ' + getCountryName(item.country) + '</div>';
    html += '<div class="upcoming-title">' + getLawTitle(item).substring(0, 50) + (getLawTitle(item).length > 50 ? '...' : '') + '</div>';
    html += '</div>';
  });
  el.innerHTML = html;
}

// ============ AI Summary ============
function renderAISummary() {
  const el = document.getElementById('aiSummary');
  const thirty = new Date(); thirty.setDate(thirty.getDate() - 30);
  const recent = laborLawData.filter(d => d.effectiveDate && new Date(d.effectiveDate) >= thirty);
  const byCat = {}; recent.forEach(d => { byCat[d.category] = (byCat[d.category] || 0) + 1; });
  const actionR = recent.filter(d => d.status === 'upcoming' || d.status === 'action-required').length;
  const t = i18n[currentLang];
  let html = t.aiSummary30d.replace('{n}', recent.length) + '<br>';
  Object.entries(byCat).forEach(([cat, count]) => { html += '\u2022 ' + t.aiSummaryCat.replace('{count}', count).replace('{cat}', cat) + '<br>'; });
  if (actionR) html += '\u2022 ' + t.aiSummaryHr.replace('{n}', actionR) + '<br>';
  html += '\u2022 ' + t.aiSummaryInfo.replace('{n}', recent.length - actionR);
  el.innerHTML = html;
}

// ============ Ticker ============
function renderTicker() {
  const el = document.getElementById('tickerTrack');
  const now = Date.now();
  const cutoff = new Date(); cutoff.setMonth(cutoff.getMonth() - 12);
  const cutoffTs = cutoff.getTime();
  const sorted = [...laborLawData]
    .filter(item => ['SG', 'MY', 'TH'].includes(item.countryCode))
    .filter(item => item.effectiveDate && item.effectiveDateStatus !== 'unavailable')
    .filter(item => { const ts = new Date(item.effectiveDate).getTime(); return !isNaN(ts) && ts >= cutoffTs && ts <= now; })
    .sort((a, b) => new Date(b.effectiveDate) - new Date(a.effectiveDate));
  let html = ''; const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const build = () => { sorted.forEach(item => {
    const d = new Date(item.effectiveDate);
    const ds = months[d.getMonth()] + ' ' + String(d.getDate()).padStart(2, '0');
    const isNew = (now - d.getTime()) < 7 * 86400000;
    const title = getLawTitle(item);
    html += '<div class="tc-item" onclick="openDetail(\'' + item.id + '\')"><span class="flag">' + item.flag + '</span><span class="name">' + getCountryName(item.country) + '</span><span class="sep">\u00B7</span><span class="cat">' + item.category + '</span><span class="title">' + title.substring(0, 30) + (title.length > 30 ? '...' : '') + '</span><span class="date">' + ds + '</span>' + (isNew ? '<span class="new-tag">NEW</span>' : '') + '</div>';
  }); };
  build(); build();
  html += '<div class="ticker-viewall" onclick="document.getElementById(\'libraryLabel\').scrollIntoView({behavior:\'smooth\'})">' + i18n[currentLang].viewAllUpdates + '</div>';
  el.innerHTML = html; el.classList.add('auto');
}

// ============ Detail Panel ============
function openDetail(id) {
  const item = laborLawData.find(d => d.id === id); if (!item) return;
  currentViewingLaw = item;
  const t = i18n[currentLang];
  const changesArr = (currentLang === 'zh' && item.changesZh && item.changesZh.length) ? item.changesZh : ((currentLang === 'es' && item.changesEs && item.changesEs.length) ? item.changesEs : (item.changes || []));
  const hrImpactArr = (currentLang === 'zh' && item.hrImpactZh && item.hrImpactZh.length) ? item.hrImpactZh : ((currentLang === 'es' && item.hrImpactEs && item.hrImpactEs.length) ? item.hrImpactEs : (item.hrImpact || []));
  let html = '<h2 style="font-size:16px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px">' + item.flag + ' ' + getCountryName(item.country) + ' \u2014 ' + getLawTitle(item) + '</h2>';
  html += '<div class="dp-grid"><div class="dp-section"><h4>\uD83D\uDCCB ' + t.detailBasicInfo + '</h4>';
  html += '<div class="dp-row"><div class="dp-label">' + t.detailCategory + '</div><div class="dp-val"><span class="dp-tag mod">' + item.category + '</span></div></div>';
  html += '<div class="dp-row"><div class="dp-label">' + t.detailLevel1 + '</div><div class="dp-val">' + getCategoryLabel(item.primaryCategory) + '</div></div>';
  html += '<div class="dp-row"><div class="dp-label">' + t.detailLevel2 + '</div><div class="dp-val">' + item.secondaryCategory + '</div></div>';
  html += '<div class="dp-row"><div class="dp-label">' + t.detailCategorySource + '</div><div class="dp-val">' + item.categorySource + '</div></div>';
  html += '<div class="dp-row"><div class="dp-label">' + t.detailStatus + '</div><div class="dp-val" style="text-transform:capitalize">' + item.status + '</div></div>';
  html += '<div class="dp-row"><div class="dp-label">' + t.detailEffectiveDate + '</div><div class="dp-val">' + formatEffectiveDate(item) + '</div></div>';
  if (item.effectiveDateSource) {
    html += '<div class="dp-row"><div class="dp-label">' + t.detailEffectiveDateSource + '</div><div class="dp-val"><a href="' + item.effectiveDateSource + '" target="_blank" style="color:var(--accent);text-decoration:underline">' + item.effectiveDateSource.substring(0, 60) + '...</a></div></div>';
  }
  if (item.effectiveDateEvidence) {
    html += '<div class="dp-row"><div class="dp-label">' + t.detailEffectiveDateEvidence + '</div><div class="dp-val" style="font-size:11px;color:var(--text2)">' + item.effectiveDateEvidence + '</div></div>';
  }
  html += '<div class="dp-row"><div class="dp-label">' + t.detailCountry + '</div><div class="dp-val">' + getCountryName(item.country) + '</div></div>';
  html += '</div><div class="dp-section"><h4>\uD83D\uDCDD ' + t.detailSummary + '</h4>';
  // Trilingual summary
  html += '<div class="dp-row"><div class="dp-label">' + t.detailChinese + '</div><div class="dp-val">' + (item.summaryZh || item.summary) + '</div></div>';
  html += '<div class="dp-row"><div class="dp-label">' + t.detailEnglish + '</div><div class="dp-val" style="color:var(--text2);font-size:11px">' + item.summary + '</div></div>';
  if (item.summaryEs) {
    html += '<div class="dp-row"><div class="dp-label">' + t.detailSpanish + '</div><div class="dp-val" style="color:var(--text2);font-size:11px">' + item.summaryEs + '</div></div>';
  }
  html += '</div></div>';
  // Business Fields
  if (item.businessFields && item.businessFields[currentLang]) {
    const bf = item.businessFields[currentLang];
    const bfEntries = Object.entries(bf);
    if (bfEntries.length > 0) {
      html += '<div class="dp-section" style="margin-top:16px"><h4>\uD83D\uDCCA ' + t.businessDetails + '</h4>';
      bfEntries.forEach(([key, val]) => {
        if (val) html += '<div class="dp-row"><div class="dp-label">' + key + '</div><div class="dp-val">' + val + '</div></div>';
      });
      html += '</div>';
    }
  }
  html += '<div class="dp-section" style="margin-top:16px"><h4>\uD83D\uDD04 ' + t.detailKeyChanges + '</h4>';
  changesArr.forEach(c => { html += '<div style="margin-bottom:4px;font-size:12px;color:var(--text)">\u2022 ' + c + '</div>'; });
  html += '</div><div class="dp-section" style="margin-top:16px"><h4>\uD83D\uDCBC ' + t.detailHRImpact + '</h4>';
  hrImpactArr.forEach(h => { html += '<div style="margin-bottom:4px;font-size:12px;color:var(--text)">\u2022 ' + h + '</div>'; });
  html += '</div><div class="dp-section" style="margin-top:16px"><h4>\uD83D\uDD17 ' + t.detailOfficialSource + '</h4><div class="dp-val"><a href="' + item.source + '" target="_blank">' + item.source + '</a></div></div>';
  if (countryDetailPages[item.country]) html += '<button class="btn-fullview" onclick="openCountryPage(\'' + item.country + '\')">\uD83D\uDCD6 ' + t.detailViewFull + '</button>';
  document.getElementById('detailContent').innerHTML = html;
  document.getElementById('detailOverlay').classList.add('open');
  document.getElementById('detailPanel').classList.add('open');
}

function closeDetail() { document.getElementById('detailOverlay').classList.remove('open'); document.getElementById('detailPanel').classList.remove('open'); currentViewingLaw = null; }
function closeDrawer() { document.getElementById('drawerOverlay').classList.remove('open'); document.getElementById('drawer').classList.remove('open'); }
function openCountryPage(country) {
  const url = countryDetailPages[country];
  if (!url) { showToast(i18n[currentLang].noDetailPage); return; }
  document.getElementById('countryModalTitle').innerHTML = '\uD83D\uDCD6 ' + country + ' (' + (countryNameMap[country] || country) + ')';
  document.getElementById('countryModalIframe').src = url;
  document.getElementById('countryModal').classList.add('open');
}
function closeCountryPage() { document.getElementById('countryModal').classList.remove('open'); document.getElementById('countryModalIframe').src = ''; }

// ============ Map ============
const countryZoomCoords = {
  Singapore: [1.35, 103.82, 12],
  Malaysia: [4.21, 101.98, 7],
  Thailand: [15.87, 100.99, 7]
};

// Trilingual country label map for map overlay
const countryLabelMap = {
  Singapore: { zh: '新加坡', en: 'Singapore', es: 'Singapur' },
  Malaysia: { zh: '马来西亚', en: 'Malaysia', es: 'Malasia' },
  Thailand: { zh: '泰国', en: 'Thailand', es: 'Tailandia' }
};

// Regulation count suffix per language
const regCountText = { zh: ' 条法规', en: ' Regulations', es: ' normativas' };

// Style definitions for geo layers
const STYLES = {
  selected: { fillColor: '#1d4ed8', fillOpacity: 0.85, weight: 3, color: '#1e40af', opacity: 1 },
  supported: { fillColor: '#3b82f6', fillOpacity: 0.55, weight: 1.5, color: '#93c5fd', opacity: 0.7 },
  dimmed: { fillColor: '#93c5fd', fillOpacity: 0.15, weight: 1, color: '#bfdbfe', opacity: 0.4 },
  background: { fillColor: '#e2e8f0', fillOpacity: 0.05, weight: 0.5, color: '#ccc', opacity: 0.3 }
};

function getCountryStyle(name, counts) {
  const c = counts[name] || 0;
  if (name === selectedCountry) return STYLES.selected;
  if (SUPPORTED_COUNTRIES.some(sc => name === getCountryName(sc))) {
    if (c > 0) return { fillColor: c > 3 ? '#2563eb' : c > 1 ? '#3b82f6' : '#60a5fa', fillOpacity: selectedCountry ? 0.15 : 0.55, weight: 1.5, color: selectedCountry ? '#bfdbfe' : '#93c5fd', opacity: selectedCountry ? 0.4 : 0.7 };
    return { ...STYLES.supported, fillOpacity: selectedCountry ? 0.1 : 0.3 };
  }
  return STYLES.background;
}

function refreshGeoStyles() {
  if (!geoLayer) return;
  const cc = {};
  const data = selectedCountry ? filteredData : laborLawData;
  data.forEach(d => { cc[d.country] = (cc[d.country] || 0) + 1; });
  geoLayer.eachLayer(layer => {
    const n = layer.feature && layer.feature.properties.ADMIN;
    if (n) layer.setStyle(getCountryStyle(n, cc));
  });
}

function initMap() {
  if (typeof L === 'undefined' || !L) { console.warn('Leaflet not available'); return; }
  if (mapInstance) { return; }
  try {
    mapInstance = L.map('leafletMap', { zoomControl: true, scrollWheelZoom: true, fadeAnimation: true, zoomAnimation: true }).setView([10, 105], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors', maxZoom: 18 }).addTo(mapInstance);
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(r => r.json()).then(data => {
        geoData = data;
        const cc = {}; laborLawData.forEach(d => { cc[d.country] = (cc[d.country] || 0) + 1; });
        geoLayer = L.geoJSON(data, {
          style: f => getCountryStyle(f.properties.ADMIN, cc),
          onEachFeature: (f, l) => {
            const n = f.properties.ADMIN;
            const c = cc[n] || 0;
            const isSupported = SUPPORTED_COUNTRIES.some(sc => n === getCountryName(sc));
            if (isSupported && c > 0) {
              l.bindTooltip(n + ' (' + c + ')', { className: 'map-tip', direction: 'top', offset: [0, -5] });
              l.on('click', () => zoomToCountry(n, c));
              l.on('mouseover', function () { if (!selectedCountry || n === selectedCountry) this.setStyle({ fillOpacity: 0.9, weight: 3 }); });
              l.on('mouseout', function () { refreshGeoStyles(); });
            }
          }
        }).addTo(mapInstance);
        renderLegend(cc);
      }).catch(() => {});
  } catch (e) { console.error('Map init error', e); }
}

function focusMapOnCountry(name) {
  if (!mapInstance || !geoLayer) return;
  let bounds = null;
  geoLayer.eachLayer(layer => {
    if (layer.feature && layer.feature.properties.ADMIN === name) {
      bounds = layer.getBounds();
    }
  });
  if (bounds && bounds.isValid()) {
    mapInstance.flyToBounds(bounds, { paddingTopLeft: [30, 30], paddingBottomRight: [30, 30], maxZoom: countryZoomCoords[name] ? countryZoomCoords[name][2] : 10, duration: 0.5 });
  } else {
    const coords = countryZoomCoords[name];
    if (coords) mapInstance.flyTo([coords[0], coords[1]], coords[2], { duration: 0.5 });
  }
}

function addMapMarker(name) {
  removeMapMarker();
  if (!mapInstance) return;
  const coords = countryZoomCoords[name];
  if (!coords) return;
  const icon = L.divIcon({
    className: 'map-country-marker',
    html: '<div class="marker-pin"></div>',
    iconSize: [24, 36],
    iconAnchor: [12, 36]
  });
  mapMarker = L.marker([coords[0], coords[1]], { icon: icon, interactive: false }).addTo(mapInstance);
}

function removeMapMarker() {
  if (mapMarker) { mapInstance.removeLayer(mapMarker); mapMarker = null; }
}

function addMapLabel(name, count) {
  removeMapLabel();
  if (!mapInstance) return;
  const coords = countryZoomCoords[name];
  if (!coords) return;
  const label = countryLabelMap[name];
  const labelText = label ? (label[currentLang] || name) : name;
  const offset = name === 'Singapore' ? [20, -50] : name === 'Thailand' ? [0, -40] : [0, -45];
  mapLabel = L.divIcon({
    className: 'map-country-label-icon',
    html: '<div class="map-country-label"><span class="mcl-name">' + labelText + '</span><span class="mcl-count">' + count + regCountText[currentLang] + '</span></div>',
    iconSize: [160, 50],
    iconAnchor: [80, 50]
  });
  mapLabel = L.marker([coords[0], coords[1]], { icon: mapLabel, interactive: false, offset: offset }).addTo(mapInstance);
}

function removeMapLabel() {
  if (mapLabel) { mapInstance.removeLayer(mapLabel); mapLabel = null; }
}

function zoomToCountry(name, count) {
  selectedCountry = name;
  // Use filteredData count if available, fallback to all data
  const regCount = count || filteredData.filter(d => d.country === name).length;
  focusMapOnCountry(name);
  addMapMarker(name);
  addMapLabel(name, regCount);
  refreshGeoStyles();
  document.getElementById('mapReturnBtn').classList.add('show');
  document.getElementById('mapChip').classList.add('show');
  const cd = laborLawData.filter(d => d.country === name);
  document.getElementById('mcName').innerHTML = (cd[0] ? cd[0].flag + ' ' : '') + getCountryName(name) + (countryNameMap[name] ? ' (' + countryNameMap[name] + ')' : '');
  document.getElementById('mcCount').textContent = regCount + regCountText[currentLang];
  document.getElementById('filterCountry').value = name;
  applyFilters();
}

function returnToWorldView() {
  selectedCountry = null;
  removeMapMarker();
  removeMapLabel();
  mapInstance.flyTo([10, 105], 5, { duration: 0.5 });
  refreshGeoStyles();
  document.getElementById('mapReturnBtn').classList.remove('show');
  document.getElementById('mapChip').classList.remove('show');
  document.getElementById('filterCountry').value = '';
  applyFilters();
}

function onCountrySelectChange() {
  applyFilters();
  const country = document.getElementById('filterCountry').value;
  if (country && mapInstance) {
    const regCount = filteredData.filter(d => d.country === country).length;
    zoomToCountry(country, regCount);
  } else if (!country && mapInstance) {
    returnToWorldView();
  }
}

function renderLegend(counts) {
  const el = document.getElementById('globeLegend');
  el.innerHTML = '<div class="gleg"><span class="gdot" style="background:#2563eb"></span>' + i18n[currentLang].legend3 + '</div><div class="gleg"><span class="gdot" style="background:#3b82f6"></span>' + i18n[currentLang].legend2 + '</div><div class="gleg"><span class="gdot" style="background:#60a5fa"></span>' + i18n[currentLang].legend1 + '</div>';
}

// ============ URL Params ============
function applyURLParams() {
  const p = new URLSearchParams(window.location.search);
  const lang = p.get('lang'); if (lang && i18n[lang]) currentLang = lang;
  const region = p.get('region'); if (region) document.getElementById('filterRegion').value = region;
  const country = p.get('country'); if (country) document.getElementById('filterCountry').value = country;
  const search = p.get('q'); if (search) document.getElementById('searchInput').value = search;
}

document.addEventListener('click', e => { if (!e.target.closest('.dd-wrap')) document.querySelectorAll('.dd-menu').forEach(m => m.classList.remove('open')); });

// ============ AI Panel Logic ============
let aiPanelOpen = false;
let currentViewingLaw = null;

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
  document.querySelector('[data-tab="' + tab + '"]').classList.add('active');
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
  if (!key) { showToast(i18n[currentLang].aiKeyEmpty); return; }
  setApiKey(key);
  closeKeyModal();
  showToast(i18n[currentLang].aiKeySaved);
  if (!aiPanelOpen) toggleAIPanel();
}

// Chat
async function sendAIChat() {
  const input = document.getElementById('aiChatInput');
  const msg = input.value.trim();
  if (!msg) return;
  if (!hasApiKey()) { openKeyModal(); return; }

  const messagesEl = document.getElementById('aiChatMessages');
  messagesEl.innerHTML += '<div class="ai-msg ai-msg-user">' + escapeHtml(msg) + '</div>';
  input.value = '';
  messagesEl.innerHTML += '<div class="ai-msg ai-msg-loading" id="aiLoading">' + i18n[currentLang].aiThinking + '</div>';
  messagesEl.scrollTop = messagesEl.scrollHeight;

  try {
    const context = currentViewingLaw ? currentViewingLaw : null;
    const reply = await chatWithAI(msg, context);
    document.getElementById('aiLoading')?.remove();
    messagesEl.innerHTML += '<div class="ai-msg ai-msg-bot">' + escapeHtml(reply) + '</div>';
  } catch (e) {
    document.getElementById('aiLoading')?.remove();
    messagesEl.innerHTML += '<div class="ai-msg ai-msg-bot" style="color:var(--red)">\u274C ' + escapeHtml(e.message) + '</div>';
  }
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Translate
async function doTranslate() {
  const text = document.getElementById('aiTranslateInput').value.trim();
  if (!text) { showToast(i18n[currentLang].aiKeyEmpty); return; }
  if (!hasApiKey()) { openKeyModal(); return; }

  const lang = document.getElementById('aiTranslateLang').value;
  const resultEl = document.getElementById('aiTranslateResult');
  resultEl.innerHTML = '<span style="color:var(--text3)">' + i18n[currentLang].aiTranslating + '</span>';

  try {
    const result = await translateText(text, lang);
    resultEl.textContent = result;
  } catch (e) {
    resultEl.innerHTML = '<span style="color:var(--red)">\u274C ' + escapeHtml(e.message) + '</span>';
  }
}

// Analyze
async function doAnalyzeCurrent() {
  if (!hasApiKey()) { openKeyModal(); return; }
  if (!currentViewingLaw) {
    showToast(i18n[currentLang].aiNoLaw);
    return;
  }

  const resultEl = document.getElementById('aiAnalyzeResult');
  resultEl.innerHTML = '<span style="color:var(--text3)">' + i18n[currentLang].aiThinking + '</span>';

  try {
    const result = await analyzeLaw(currentViewingLaw);
    resultEl.textContent = result;
  } catch (e) {
    resultEl.innerHTML = '<span style="color:var(--red)">\u274C ' + escapeHtml(e.message) + '</span>';
  }
}

async function doRegionalInsight() {
  if (!hasApiKey()) { openKeyModal(); return; }
  const region = currentRegion || 'southeast-asia';
  const resultEl = document.getElementById('aiAnalyzeResult');
  resultEl.innerHTML = '<span style="color:var(--text3)">' + i18n[currentLang].aiThinking + '</span>';

  try {
    const result = await generateRegionalInsight(region);
    resultEl.textContent = result;
  } catch (e) {
    resultEl.innerHTML = '<span style="color:var(--red)">\u274C ' + escapeHtml(e.message) + '</span>';
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '<br>');
}

// ============ Init ============
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  applyURLParams();
  populateCountryFilter();
  populateLevel1Filter();
  populateYearFilter();
  populateRegionTabs();
  updateLangButton();
  applyFilters();
  updateI18nText();
  window._domReady = true;
  if (window._leafletReady) {
    initMap();
  }
});
