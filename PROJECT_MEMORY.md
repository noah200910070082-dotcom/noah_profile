# Noah Profile 项目记忆

> 更新时间：2026-10-13
> 适用目录：`C:\Users\LENOVO\OneDrive\文档\Noah profile`
> 目的：为后续新对话提供可靠的项目背景、用户偏好、已完成内容和继续开发规则。

## 1. 项目定位

这是 Noah Xu 的个人网站与成长档案，公开站点为 [noahxu.org](https://www.noahxu.org/)。网站把个人介绍、作品、兴趣技能、人生经历和旅行照片组合成一个带有编辑感、动态卡片和多语言切换的单页体验；旅行内容有独立的 `/travel` 页面。

当前代码库是 Astro 静态站点，主要技术包括 Astro 7、TypeScript、原生 CSS、Astro Image，以及 `Space Grotesk` 和 `ZCOOL KuaiLe` 字体。首页和旅行页都由 Astro 在构建时生成静态 HTML/CSS/JS。

## 2. 用户资料与内容事实

以下内容来自用户在旧对话中的明确提供，除非用户后续修改，不要擅自改写为其他身份：

- 姓名/署名：Noah Xu / Noah_Xu。
- 来自澳门，是濠江中学学生和开发者。
- 兴趣与方向：MO、OI、AI 竞赛、网球（喜欢德约科维奇）、围棋三段、小提琴、音乐、旅行、社交。
- 身高曾提供为 180 cm；目标是北京大学。
- 中文引言：`桃李春风一杯酒，江湖夜雨十年灯。`
- 英文引言：`What doesn’t kill you makes you stronger.`
- GitHub 用户名：`noah200910070082-dotcom`。
- 旧对话中还提供过 WeChat `Noah107`、Instagram `noah_chanwa`、Discord `noah_xu_50118`；只有在页面内容确实需要时才使用这些公开标识。

## 3. 当前网站结构

### 首页 `/`

- Hero、About、Projects、Skills/生活、Journey/Explore、Contact 等分区在一个连续页面中展示。
- 顶部支持 English、简体中文、繁体中文；语言保存于浏览器 `localStorage` 的 `noah-language`。
- 主要项目展示：濠江通校运会管理助手、FieldGuard AI、AI Transit Station，以及 AI/机器人相关内容。
- FieldGuard AI 和 AI Transit Station 只是外部项目的展示卡片，不修改这两个仓库的源码。
- Skills 卡片包含 Tennis、Go、Violin、MO/IMSC、Music；MO/IMSC 是视觉上最大的卡片。Travel 卡片进入 `/travel`，其他技能通过共享图片故事弹窗打开。
- 图片故事弹窗保留图片、标题、说明、前后切换、Escape 关闭、焦点恢复、`inert` 和音乐链接；Jay Chou 链接使用 YouTube 搜索链接，不自动播放。
- 项目卡使用真实截图和 Astro 图片优化；“新地图，新朋友”使用真实上海照片。

### 旅行页 `/travel`

- 旅行分为 Abroad、China/Outdoors、Universities 三章。
- 使用真实照片：东京/大阪/乐高、纽约/波士顿/尼亚加拉/华盛顿、洛阳/长城/上海/江南/房车、北京大学/交通大学等。
- 章节之间使用全宽、窄高度的动态 orbit-route 分隔带，包含路线点、云、鸟、轨道和视差；支持 `prefers-reduced-motion`。
- 旅行卡片可打开共享图片查看器，支持前后切换、Escape 和响应式布局。
- 2026-10-08 本地维护已补齐旅行查看器焦点进入、Tab 循环、关闭后焦点恢复、背景 `inert` 和快速重新打开保护；照片说明及查看器按钮标签跟随三种语言，保存语言的按钮状态也在首次加载时初始化。是否已发布以维护记录为准。
- 2026-10-09 为 16 张旅行照片生成独立查看器 WebP，通过 `getImage()` 在构建时缩放，长边最多 1600 像素，不放大原图；客户端优先使用卡片的 `data-viewer-src`，避免复用已加载缩略图或未加载卡片的原尺寸图片。卡片缩略图和原始照片保持不变。
- 首页“打开完整图集 ↗”是进入 `/travel` 的显眼入口。
- 桌面端旅行导航保持单行；移动端折叠菜单。

## 4. 已确认的视觉与交互方向

- 视觉方向是 **Editorial Orbit / 杂志轨道**：暖白纸张、深墨文字、紫/蓝/荧光绿/珊瑚强调色、编辑式网格、适度 3D 倾斜和轨道装饰。
- 用户喜欢个性、潮流、幽默但温和流畅的风格；可以有明显动态效果，但必须保持内容可读、响应式和不横向溢出。
- 不要重新设计整站或改成普通模板；优先在现有结构上优化区块、间距、层级、图片和动效。
- 小文字标签、元信息和“完整图集”等入口应有清楚的胶囊/按钮背景，让用户知道可点击。
- 动态效果要尊重 reduced-motion，并尽量只使用 `transform` 和 `opacity`。

## 5. 仓库和部署事实

- GitHub 仓库：[noah200910070082-dotcom/noah_profile](https://github.com/noah200910070082-dotcom/noah_profile)。
- 远程：`origin` 指向上述仓库；默认分支是 `main`。
- 生产域名：[https://www.noahxu.org/](https://www.noahxu.org/)，旅行页为 `/travel`。
- Astro 配置为 `site: https://www.noahxu.org`、`output: static`；生产 canonical、JSON-LD、robots 和 sitemap 统一使用 www 域名。
- README 已记录本地开发、验证、部署和站点地图。
- 生产部署可使用 Vercel、Netlify、Cloudflare Pages 或 GitHub Pages；重新连接域名时必须保留现有邮件 MX/TXT 记录。
- `Hongshuling/` 是同工作区内的另一套“羽迹·深湾”候鸟地图展示目录，不属于 Noah Profile 的实现范围。除非用户明确要求，不能修改、删除、加入提交或把它混入本项目记忆中的主站架构。

## 6. 常用命令与验收顺序

```bash
npm install
npm run dev
npm run test:profile
npm run check
npm run build
git diff --check
```

推荐每次改动按 `test → check → build → commit/push` 验收。`test:profile` 检查关键内容、项目链接、旅行场景和图片资产；`check` 做 Astro/TypeScript 检查；`build` 确认首页和旅行页可以生成。

当前 Git 状态基线：网站主代码已经提交在 `main`；`Hongshuling/` 通常显示为未跟踪目录，但应保持原样，不要顺手清理。

## 7. 旧对话提取摘要

主要来源是本机历史对话 **“搭建个人Profile”**（thread id：`019f5ab2-20f4-7ae2-80dc-daa547ed150d`，工作目录与本项目相同）。关键决策演变如下：

1. 先要求参考 GitHub 高热度个人主页，但明确要原创，不复制模板。
2. 确定个人资料、项目、兴趣、目标和照片素材。
3. 选择单页主页，分区通过滚动和小卡片进入；后来追加独立旅行页。
4. 加入 English/简体/繁体三语言、动态背景、卡片互动、旅行/机器人/人生历程/大学合集。
5. 明确 MO/IMSC 卡片最大，技能卡开启共享图片故事；音乐区加入周杰伦 YouTube 链接。
6. 选择“动态风景层”，后来收敛为“Editorial Orbit”视觉方向和窄动态旅行分隔带。
7. 增加 FieldGuard AI 与 AI Transit Station 展示卡，仅作展示，不改外部仓库。
8. 用户要求项目首页使用真实网站截图、旅行使用真实照片，并把“完整图集”入口做得明显。
9. 最近一次旧对话已完成旅行导航单行、小标签按钮背景、缺失分隔带补齐，并推送到 `main`；该旧对话阶段最后相关提交为 `b0b948e`，后续维护提交以 Git 历史和维护记录为准。

## 8. 继续开发规则

- 用户是 Web 构建初学者：做项目时只在合适位置用一两句解释 HTML、CSS、JavaScript、Astro、图片优化和 Git 流程；其余时间专心完成构建。
- 用户偏好直接执行，通常不希望重复确认已明确的设计选择。
- 先读本文件，再检查当前代码和 `git status`，不要只按旧对话计划推断现状。
- 把“旧对话计划”与“当前代码事实”分开核对；已经实现的内容不要重复重做。
- 任何新增个人资料、照片、外部链接或部署状态，优先向用户确认或在记忆文件中标明“待确认”。
- 每次完成页面修改后，至少运行 `npm run test:profile`、`npm run check`、`npm run build` 和 `git diff --check`；不要把 `Hongshuling/` 的既有警告误判为本项目新错误。
- 修改后保持语言切换、键盘可访问性、移动端布局、reduced-motion 和图片 alt 文本。

## 9. 待确认/风险

- `https://houkong.up.railway.app` 在旧对话中曾返回 404；不要把它描述为已验证可用，除非重新检查。
- 2026-10-08 实时 HTTP 检查：公开首页与 `/travel` 返回 200，濠江通外链仍返回 404。
- 2026-10-09 命令行 `git push origin main` 已成功，之前的 Git 认证阻塞解除；`40553fb` 与此前本地记忆、弹窗修复提交已推送。`40553fb` 的 Vercel 状态为 success，公开站点三语言、桌面/手机/减少动画及 16 张查看器图片的浏览器验证通过。详情见 `docs/daily-maintenance.md`。公开首页与 `/travel` 仍为 HTTP 200，濠江通外链仍为 404。
- 2026-10-10 已将 Astro `site`、页面 canonical/JSON-LD、robots 和 sitemap 统一为 `https://www.noahxu.org`，并把 `/travel/` 加入 sitemap；本地构建与浏览器回归通过，线上发布状态见维护记录。
- 2026-10-10 提交 `e08f7d9` 的 Vercel 状态为 success；线上 robots、sitemap、首页和旅行页均返回 200，canonical 与 sitemap 已确认使用 www 地址。
- 2026-10-11 修复首页故事弹窗关闭时焦点和 `inert` 延迟恢复的问题：关闭立即恢复触发卡片焦点并解除背景 `inert`，弹窗保持淡出后隐藏；打开时取消旧的关闭计时器和动画帧，支持快速重新打开。旅行页查看器逻辑保持不变。
- 2026-10-11 提交 `f08e8d8` 已推送，Vercel success；线上首页专用回归在桌面、手机、减少动画 × 三语言共 9 组均通过。
- 2026-10-12 语言偏好存储改为容错：浏览器禁止或写满 `localStorage` 时仍按浏览器语言启动、可切换三语言和更新弹窗标签；只有“记住偏好”被跳过，不再产生 `SecurityError`。
- 2026-10-12 提交 `78d54e0` 的 Vercel 状态为 success；线上禁止存储模式下首页和旅行页均按繁体启动、旅行关闭标签正确且无浏览器错误。
- 2026-10-13 首页图片故事卡片的 `aria-label` 会跟随当前语言，从可见标题生成 English/简体/繁体标签；原有视觉内容和弹窗行为不变。
- 2026-10-13 提交 `4cfa3cc` 已推送，Vercel success；线上三语言卡片标签和页面错误检查通过。
- noahxu.org 的域名/DNS/部署状态可能随时间变化；需要实时确认时再访问，不要把旧对话中的 HTTP 200 当作永久事实。
- 旧对话里的 Git 提交号只代表当时状态；继续开发前以本地 `git log` 和远程状态为准。
- 本记忆文件本身需要随重大内容、部署、结构或用户偏好变化而更新。

## 10. 后续新对话启动模板

开始任何新任务时，先确认：

1. 目标属于首页、旅行页、项目展示、内容资料还是部署。
2. 读取本文件和相关源文件，查看 `git status`。
3. 明确哪些是现有事实、哪些是新需求、哪些需要外部验证。
4. 完成修改后按验收命令检查，并在回复中说明改了什么、怎么验证、是否提交。

## 11. 每日维护任务

- 2026-10-07 已创建并启用自动任务：**Noah Profile 每日检查与优化**（ID：`noah-profile`）。
- 时间：每天 09:00，Asia/Shanghai；在本对话中继续工作，保留已有上下文。
- 内容：结合已安装及 GitHub 上可信、适合本项目的 skills，巡检首页、旅行页、响应式、多语言、弹窗、外链、性能、无障碍、构建，以及实际存在的后端/API 集成，实施有依据的改进。
- 每次改动需验证，并按已有 Git 约定提交和推送；认证或权限失败时保存成果、记录阻塞，不宣称已发布。
- 维护记录保存到 `docs/daily-maintenance.md`；项目事实变化时同步更新本文件。
- 没有重要变化时保持安静；完成有意义的改进、发现新故障或需要用户处理新阻塞时通知。
- 本地任务运行时需要电脑开机、应用保持运行，以及项目目录可用。
