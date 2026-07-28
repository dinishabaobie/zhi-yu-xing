---
name: 知与行
description: 以冷银灰档案接触印样组织旅行、技术、学科与持续写作的个人知识入口。
colors:
  page-light: "#ecefeb"
  surface-light: "#f7f8f4"
  surface-strong-light: "#dfe3df"
  ink-light: "#141715"
  ink-soft-light: "#555c57"
  line-light: "rgb(20 23 21 / 16%)"
  line-strong-light: "rgb(20 23 21 / 34%)"
  accent-light: "#d15335"
  accent-ink-light: "#0f100e"
  header-light: "rgb(236 239 235 / 86%)"
  page-dark: "#111412"
  surface-dark: "#191d1a"
  surface-strong-dark: "#272d29"
  ink-dark: "#edf0eb"
  ink-soft-dark: "#adb5af"
  line-dark: "rgb(237 240 235 / 15%)"
  line-strong-dark: "rgb(237 240 235 / 34%)"
  accent-dark: "#df6748"
  accent-ink-dark: "#17110f"
  header-dark: "rgb(17 20 18 / 86%)"
typography:
  display:
    fontFamily: '"Avenir Next", "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    fontSize: "clamp(46px, 5.2vw, 82px)"
    fontWeight: 560
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Avenir Next", "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    fontSize: "clamp(40px, 5vw, 72px)"
    fontWeight: 560
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"Avenir Next", "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    fontSize: "clamp(27px, 2.4vw, 40px)"
    fontWeight: 590
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  body:
    fontFamily: '"Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: '"Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif'
    fontSize: "13px"
    fontWeight: 650
    lineHeight: 1.6
rounded:
  compact: "8px"
  surface: "14px"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "{colors.accent-light}"
    textColor: "{colors.accent-ink-light}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink-light}"
    textColor: "{colors.page-light}"
    rounded: "{rounded.pill}"
  theme-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.pill}"
    height: "44px"
    width: "44px"
  theme-toggle-hover:
    backgroundColor: "{colors.ink-light}"
    textColor: "{colors.page-light}"
    rounded: "{rounded.pill}"
  project-media:
    backgroundColor: "{colors.surface-strong-light}"
    rounded: "{rounded.surface}"
  writing-panel:
    backgroundColor: "{colors.accent-light}"
    textColor: "{colors.accent-ink-light}"
    rounded: "{rounded.surface}"
    padding: "clamp(72px, 8vw, 112px)"
---

# Design System: 知与行

## Overview

**Creative North Star: "知识索引桌"**

“知与行”把个人网站处理成一张会持续扩展的知识索引桌：冷银灰像档案纸面，墨色文字负责秩序，朱红负责定位关键行动与正在生长的内容。摄影以接触印样的方式承担首要证据，大尺度中文排版和非对称编排让旅行、工程、逻辑与科学共享一个世界，但不被压成同一种卡片。

系统整体宽松、安静、带有编辑感。视觉深度来自少量柔和阴影、半透明粘性页眉、细线框架与前后错位，不依赖高饱和色堆叠。浅色和深色主题共用同一套语义角色；移动端保留完整内容与视觉表达，同时把桌面索引收束为单列。

**Key Characteristics:**

- 冷银灰纸面、墨色文字与单一朱红强调。
- 四联摄影、档案标签、细线与大尺度中文标题。
- 宽松留白和非对称 12 栏作品索引。
- 浅深双主题，以及尊重减少动态与减少透明度偏好的降级路径。

## Colors

调色板像一组冷静的档案材料：浅色主题从冷银纸到墨黑，深色主题从夜墨到月白；朱红在两种主题中保持唯一强调角色。

### Primary

- **档案朱红**：用于主按钮、品牌菱形、文本选择、焦点轮廓、标题下划线和整块“笔记与评论”面板；浅色强调面文字达到 4.54:1 对比度，深色主题使用更明亮的朱红对应值以维持清晰度。

### Neutral

- **冷银纸**：浅色页面底色，也是浅色主题反转按钮的文字色。
- **雾白档案面**：移动导航等独立表面的底色。
- **压暗银灰**：项目图片加载底、导航项悬停底等次级表面。
- **墨黑与铅灰**：分别承担主要文字和说明文字。
- **夜墨与深绿黑档案面**：深色主题的页面与表面层级。
- **月白与雾银**：深色主题的主要文字与说明文字。
- **淡墨线与强墨线**：以不同透明度划分页眉、卡片说明、索引行和页面边界。

### Named Rules

**The One Vermilion Rule.** 朱红是唯一强调色；它用于行动、定位、焦点和关键内容面，不再引入第二种竞争性强调色。

**The Semantic Theme Rule.** 浅色与深色主题通过同名语义变量切换，组件不得把某一主题的表面色直接写死在局部样式中。

## Typography

**Display Font:** Avenir Next（回退至 Helvetica Neue、苹方及系统无衬线）
**Body Font:** Helvetica Neue（回退至苹方及系统无衬线）

**Character:** 展示字体用紧凑字距和中等字重形成冷静、宽幅的中文编辑标题；正文字体保持中性、清晰，不以等宽或装饰字体把站点收窄成单一技术身份。

### Hierarchy

- **Display**（560，响应式 46–82px，1.04）：首屏宣言；移动端收束到 43–62px，并限制为约 12 个汉字宽。
- **Headline**（560，响应式 40–72px，1.06）：章节标题；关于区标题另放大到 48–96px。
- **Title**（590，响应式 27–40px，1.1）：项目名称；写作索引标题使用 22–30px、610 字重的较紧层级。
- **Body**（400，16px，1.6）：说明与正文；首屏简介放大到响应式 17–20px、1.65 行高。
- **Label**（650，13px）：导航控制、分区标签与微型说明；项目类型和状态降至 12px。

### Named Rules

**The Large Chinese Statement Rule.** 主要章节靠大尺度中文陈述建立层级，说明文字只帮助选择，不与标题争夺注意力。

## Layout

页面内容容器在宽屏为 `min(1440px, 100vw - 64px)`，1024px 以下收为 `min(920px, 100% - 40px)`，767px 以下保留左右各 16px。70px 粘性页眉使用三栏网格将字标、主导航和主题控制分开；移动端页眉降为 64px、两栏，并以弹出菜单替代桌面导航。

首屏使用约 0.82:1.18 的非对称两栏，左侧是宣言和行动，右侧是 3:2 四联摄影；间距随视口在 34–84px 之间变化。作品区采用 12 栏索引：旅行跨 7 栏，电工占右侧 4 栏并下移，逻辑从第二栏起跨 4 栏，科学从第七栏延伸到末栏；横纵间距分别为响应式 22–44px 与 42–88px。写作区和关于区都使用不等分双栏，强调编辑节奏而非等宽卡片阵列。

在 1024px 以下，写作区和关于区先折为单列；在 767px 以下，首屏、作品区、项目说明和写作索引全部折为单列，竖向间距仍保持宽松，写作区扩展到全视口宽。390px 以下，首屏行动纵向排列，字标与菜单水平内边距收紧，但交互控件仍保持至少 44px 触控尺寸。

**The Asymmetric Index Rule.** 宽屏项目必须保留不同跨栏、纵向错位和横竖画幅的索引关系；移动端才统一为单列与横向画幅。

## Elevation & Depth

系统采用“平面为主、证据轻抬”的混合深度。大部分文字与结构线直接落在页面底色上；阴影只用于首屏摄影、项目摄影和移动导航，半透明页眉通过 18px 模糊与 120% 饱和度形成覆盖层。首屏摄影后方另有向左上错位的细线框，桌面页面边缘还有一像素内框，使深度更像叠放的档案纸而不是浮动卡片。

### Shadow Vocabulary

- **首屏浅色环境影**（`0 26px 70px rgb(43 49 45 / 13%)`）：用于首屏摄影和移动导航。
- **首屏深色环境影**（`0 28px 76px rgb(0 0 0 / 29%)`）：深色主题下替代浅色环境影。
- **项目摄影轻影**（`0 18px 50px rgb(43 49 45 / 10%)`）：仅轻抬作品图像，不包围整张项目说明。

### Named Rules

**The Evidence Lift Rule.** 摄影和临时浮层可以获得柔和抬升，普通文字区与项目说明保持平面，以细线和留白分层。

## Shapes

档案表面、摄影和移动菜单使用轻柔的 14px 圆角；局部菜单项与跳转链接使用 8px 紧凑圆角；主按钮、主题切换和菜单触发器使用 999px 胶囊形。品牌符号是一个 14px 方形，经 45° 旋转后成为菱形，配 4px 墨色边框和朱红填充。细线框、顶部边线和一像素页面内框提供方正秩序，避免所有内容都被圆角容器包住。

移动端的朱红写作面板移除圆角并贴齐视口两侧，使其成为一次明确的版面切换，而不是缩小后的桌面卡片。

**The Selective Radius Rule.** 圆角属于图像、浮层和可按压控件；文本区与版面分区优先使用直线、留白和开放边界。

## Components

### Buttons

- **Shape:** 主按钮为胶囊形（999px），最小高度 48px，水平内边距 22px。
- **Primary:** 朱红底与深色文字；悬停或键盘聚焦时反转为墨色底与页面底色文字。
- **Hover / Focus:** 颜色与位移在 180ms ease 内过渡；全局键盘焦点为 3px 朱红轮廓、4px 外偏移；按下时下移 1px 并缩放至 0.98。
- **Text Link:** 至少 44px 高，文字与箭头并排；悬停或聚焦时，220ms 的一像素下划线从左展开。

### Cards / Containers

- **Corner Style:** 项目摄影与首屏摄影使用轻柔圆角（14px），项目说明本身不设封闭卡片。
- **Background:** 图片加载底使用压暗银灰；写作面板使用整块朱红；移动菜单使用雾白档案面。
- **Shadow Strategy:** 仅摄影和浮层使用 Elevation 章节中的环境影。
- **Border:** 项目说明以顶部一像素强线开始；首屏摄影后方使用错位细线框。
- **Internal Padding:** 项目说明顶部 20px；写作面板为响应式 72–112px，移动端为上下 72px、左右 24px。
- **Responsive Images:** 首屏图像声明 1536×1024 的真实尺寸，项目图像声明 735×480 的真实尺寸，并提供对应的 `sizes` 规则生成响应式 `srcset`；两类图像都由 CSS 绝对定位到容器四边，以 100% 宽高和 `object-fit: cover` 填满既定画幅。

### Navigation

70px 粘性页眉在桌面居中放置 14px 铅灰导航，左右分别是字标与主题控制。导航链接以无下划线为默认状态，悬停或键盘聚焦时出现方向明确的一像素下划线。767px 以下隐藏桌面导航，显示胶囊形“菜单”触发器和右对齐弹出菜单；菜单项使用 12×14px 内边距与 8px 圆角悬停面。

### Theme Toggle

主题切换是至少 44×44px 的圆形描边按钮，以“明/暗”文字表达当前操作环境。默认透明，悬停时反转为墨色底；选择写入 `zhiyuxing-theme`，首屏脚本优先恢复已保存主题，否则跟随系统偏好。

### Project Index

项目条目以摄影为主、说明为辅，不设置整卡背景。横向项目使用约 735:480 画幅，电工与逻辑在桌面使用 4:5 竖幅；图像组件保留 735×480 的真实尺寸与响应式 `sizes`，渲染后由绝对定位铺满画幅容器。图像在条目悬停或链接获得焦点时，以 600ms 强缓出曲线轻微放大到 1.025 并增加饱和度。已接入网址的条目整块可点击、状态显示“打开专题 ↗”并使用主文字色；未接入网址的条目保持静态，状态显示“网址待接入”并使用说明文字色。

### Writing Index

写作区是整块朱红签名面板。左侧大标题与右侧索引在桌面并列；索引以顶部和底部半透明深线分隔，每行使用 108px 标签列加正文列。移动端面板变为全宽无圆角，索引行折为单列。

## Do's and Don'ts

### Do:

- **Do** 使用语义颜色变量保持浅深主题一一对应。
- **Do** 保留朱红在主行动、焦点、品牌标记和写作面板中的统一角色。
- **Do** 在桌面保持作品跨栏、画幅和纵向错位，在移动端再收束为单列。
- **Do** 为动态提供减少动态降级，为模糊页眉提供减少透明度降级。

### Don't:

- **Don't** 引入蓝色或其他竞争性强调色，破坏单一朱红系统。
- **Don't** 把四个专题改成等宽、等高、等起点的通用卡片网格。
- **Don't** 给每个文本容器都加背景、圆角和阴影；开放版面与细线是主要结构。
- **Don't** 用等宽技术字体或单一职业视觉语言限制旅行、工程、逻辑与科学的共同入口。
