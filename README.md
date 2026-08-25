# 全球劳动法规智能监控平台

AI 驱动的全球劳动法规监控系统，覆盖 30+ 国家。

## 功能特点

- **实时监控**：追踪 30+ 国家劳动法规更新
- **交互式地图**：基于 GeoJSON 的可视化，使用 Leaflet.js
- **多语言支持**：中文 / 英文 / 西班牙语界面
- **智能筛选**：按地区、国家、法规类型、关键词搜索
- **深色模式**：完整的深色/浅色主题切换
- **响应式设计**：支持桌面和平板设备
- **AI 洞察**：自动生成影响摘要和合规提醒

## 项目结构

```
├── index.html               # 主入口文件
├── data/
│   └── laws.json            # 法规数据库（67 条法规，30+ 国家）
├── src/
│   ├── styles/
│   │   └── main.css         # 样式文件（CSS 变量、深色模式、响应式）
│   └── scripts/
│       └── app.js           # 应用逻辑（筛选、渲染、地图、国际化）
└── README.md
```

## 快速开始

```bash
# 安装依赖（可选，用于本地开发服务器）
npm install

# 启动本地开发服务器
npm run dev

# 或直接在浏览器中打开 index.html
```

## 部署

### GitHub Pages（推荐）

1. 访问仓库设置页面：Settings → Pages
2. **Source**：选择 **Deploy from a branch**
3. **Branch**：选择 **main**
4. **文件夹**：选择 **/ (root)**
5. 点击 **Save**

部署后访问：`https://phoebeiscool-lalala.github.io/0825update/`

### Cloudflare Pages（可从中国访问）

```bash
npm run deploy:cf
```

### Netlify

将仓库根文件夹拖放到 [Netlify Drop](https://app.netlify.com/drop)。

## 数据格式

法规数据存储在 `data/laws.json` 中，每条记录格式：

```json
{
  "id": "au01",
  "country": "Australia",
  "countryCode": "AU",
  "region": "Oceania",
  "flag": "🇦🇺",
  "law": "Fair Work Act 2009 – Modern Awards Update",
  "category": "工作日加班Weekday Overtime",
  "primaryCategory": "工时与加班Working Time & Overtime",
  "secondaryCategory": "工作日加班Weekday Overtime",
  "categorySource": "AI Classification",
  "categoryStatus": "confirmed",
  "classificationReason": "Fair Work Act Modern Awards - regulates minimum wages, overtime rates, penalty rates for working time",
  "summary": "English summary...",
  "summaryZh": "中文摘要...",
  "status": "effective",
  "effectiveDate": "2026-07-01",
  "effectiveDateStatus": "confirmed",
  "effectiveDateSource": "https://www.fwc.gov.au",
  "effectiveDateEvidence": "Annual Modern Awards update usually effective July 1",
  "source": "https://www.fwc.gov.au",
  "changes": ["..."],
  "hrImpact": ["..."],
  "modules": ["薪酬管理", "工时与加班"]
}
```

## 分类系统

### 一级分类（Primary Category）

- 基础信息 Basic Information
- 法定缴费类 Social Security / Statutory Funds
- 休假类 Leave
- 强制支付/法定津贴 Mandatory Payments & Allowances
- 工时与加班 Working Time & Overtime
- 离职与遣散 Termination & Severance
- 个税 Income Tax

### 二级分类（Secondary Category）

每个一级分类下包含多个二级分类，用于精确筛选和分类。

## 生效时间验证

- **已确认**：28 条法规有官方来源确认的生效时间
- **暂无**：39 条法规无法确认生效时间，显示"暂无"

## 技术栈

- **前端**：原生 HTML/CSS/JS（无框架依赖）
- **地图**：Leaflet.js（异步加载，CDN 不可用时优雅降级）
- **数据**：静态 JSON（无需后端）
- **样式**：CSS 自定义属性（支持主题切换）

## 许可证

MIT
