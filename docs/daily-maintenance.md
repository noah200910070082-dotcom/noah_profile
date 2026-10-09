# Noah Profile 每日维护记录

## 2026-10-08 — 旅行图片查看器的键盘与语言修复

### 发现与复现

- 本轮开始时，`PROJECT_MEMORY.md` 已有 2026-10-07 自动任务配置的未提交修改，完整保留；`Hongshuling/` 是已有未跟踪目录，未改动。
- 工作流：打开 `/travel` → 选择繁体中文 → 按 Enter 打开第一张照片 → 用键盘浏览 → 关闭。
- 修复前的浏览器实测：`focusInside: false`、`mainInert: false`；弹窗显示 `Shibuya at full speed.`，卡片显示 `澀谷，城市全速運轉。`。旅行弹窗没有 Tab 循环，关闭计时器也未在重新打开时取消。
- 站点是 Astro 静态网站，没有本项目的后端/API；没有新增服务器、框架或依赖。

### 技能与参考来源

- [UI/UX Pro Max](C:/Users/LENOVO/.codex/skills/ui-ux-pro-max/SKILL.md)：运行 `keyboard focus modal --domain ux`，检索到键盘焦点可见性和不被遮挡的指导。系统 Python 别名不可用，改用桌面应用提供的 bundled Python 成功运行。
- [Vercel verification](C:/Users/LENOVO/.codex/plugins/cache/openai-curated-remote/vercel/0.54.1/skills/verification/SKILL.md)：沿打开图片、键盘导航、关闭返回的用户流程复现和验证。
- [W3C APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)：进入弹窗时移动焦点，限制 Tab/Shift+Tab 到弹窗内，Escape 关闭，关闭后返回触发元素。
- 使用已安装的适用技能；没有安装新 skills 或复制外部代码。

### 实际修改

修改 `src/pages/travel.astro`：

- 打开后将焦点移入对话框，并把首页导航和旅行正文设为 `inert`，关闭后恢复原状态和最初打开的卡片焦点。
- Tab/Shift+Tab 在对话框按钮间循环，方向键切换照片并阻止背景滚动，Escape 关闭。
- 分离图片渲染与打开逻辑，使翻页不会覆盖返回焦点或重新打开弹窗；取消旧关闭计时器和打开动画帧，保护快速关闭/重新打开流程。
- 使用卡片当前可见的语言说明；关闭、上一张、下一张的辅助标签跟随 English/简体/繁体。保存的语言在首次加载时同步到按钮的 `aria-pressed`。
- 背景关闭层保留点击功能，从 Tab 顺序和辅助技术中隐藏；没有改变主站视觉设计和照片内容。

### 验证

- `npm run test:profile`：通过。
- `npm run check`：退出码 0；15 files、0 errors、0 warnings、89 hints。诊断提示来自已有 `Hongshuling/` 文件，没有修改该目录。
- `npm run build`：退出码 0，成功生成首页和旅行页，148 个图片输出完成。
- `git diff --check`：通过。
- 无头 Chrome/Playwright：1280×900 桌面、390×844 手机、减少动画三种场景，每种检查 English/简体/繁体，共 9 组语言场景。检查 16 张旅行卡片、4 条动态分隔、首次语言状态、焦点进入与循环、背景不可交互、键盘前后及首尾切换、关闭返回、220ms 内重新打开、图片加载、弹窗适应视口；全部通过。
- 首页冒烟检查：三语言网球故事、音乐四个 YouTube 链接、外部项目链接、IMSC 大卡；全部通过。手机菜单开关、页面无横向溢出、减少动画和浏览器错误检查通过，3 个场景均为 0 browser errors。
- 手机旅行弹窗截图在图片加载完成后已人工核对。临时验证脚本与截图留在被忽略的 `.superpowers/`，不加入提交；检查和构建输出在 `.daily-check.log`、`.daily-build.log`。

### 远程与发布

- 公开首页及旅行页 HTTP 200；`https://houkong.up.railway.app` 返回 404，保留用户原链接，作为待修复外部部署问题记录。
- 本轮开始时远程 `main` 是 `b0b948e5c50b51c2b1b1a520832d106d7f195b34`，本地原 HEAD 是 `207eff5`（项目记忆提交）。GitHub 连接器读到 `b0b948e` 的 Vercel 状态为 success，这不代表本轮修复已上线。
- 本轮代码和维护记录保存为独立本地提交，提交说明为 `fix: contain travel viewer focus and localize captions`。项目记忆中的既有自动任务段落已完整保留，一并保存。
- 命令行 `gh auth status` 未登录；本轮发布状态为待推送，不得将本地验证通过描述为线上已修复。
- 修复提交：`d22b2c0`。本轮收尾推送未完成：第一次等待认证，已中止；禁用交互登录后得到 `fatal: unable to get password from user`。认证恢复前保留本地提交，不标记发布成功。

### 后续

- 恢复命令行 GitHub 认证后推送本地提交，再检查线上旅行弹窗。
- 下一轮可单独检查照片查看器选择原尺寸图片对首次加载的影响；本轮只记录，避免扩大已经验证通过的修复范围。
- 学习提示：`aria-modal` 描述弹窗的含义；焦点管理和 `inert` 才能让键盘操作与这个含义一致。

## 2026-10-09 — 为旅行图片查看器准备独立图片

### 发现与复现

- 本轮开始时跟踪文件干净，本地 HEAD 为 `548f0a0`；远程最新提交仍为 `b0b948e`。只存在已有未跟踪目录 `Hongshuling/`，未改动。
- 在真实静态构建的预览中打开 `/travel`，滚动到第一张卡片并打开，再按方向键连续浏览 16 张照片。原逻辑使用卡片图片的 `currentSrc || src`，因此结果依赖卡片是否完成懒加载：已加载的东京卡片在大弹窗中只显示 420×218 缩略图；没有滚动到的长城照片却请求 5712×4284 的原尺寸 WebP。
- 对每个实际弹窗请求读取 HTTP 响应体，记录优化前、后的尺寸和字节数。以下为同一照片的实测示例，MB 使用十进制单位；不把单张照片的降幅描述成全站降幅。

| 照片 | 优化前弹窗图片 | 优化后弹窗图片 | 变化 |
| --- | --- | --- | --- |
| 东京涩谷 | 420×218，24,474 bytes | 1600×831，298,886 bytes | 使用适合放大查看的图片，修复缩略图放大模糊 |
| 长城 | 5712×4284，4,105,216 bytes | 1600×1200，615,776 bytes | 约 4.11 MB → 0.62 MB，减少约 85% |
| 江南 | 3024×4032，1,697,476 bytes | 1200×1600，356,660 bytes | 减少约 79%，竖图也限制长边 |

### 技能与参考来源

- [UI/UX Pro Max](C:/Users/LENOVO/.codex/skills/ui-ux-pro-max/SKILL.md)：运行 `responsive image optimization --stack astro`，使用 Astro assets 处理本地图片的指导。
- [Vercel verification](C:/Users/LENOVO/.codex/plugins/cache/openai-curated-remote/vercel/0.54.1/skills/verification/SKILL.md)：验证“点击卡片 → 实际图片请求 → 弹窗显示 → 键盘切换与关闭”的完整流程。
- [Astro 图片指南](https://docs.astro.build/en/guides/images/) 与 [astro:assets / getImage API](https://docs.astro.build/en/reference/modules/astro-assets/#getimage)：核对构建端生成图片、传递生成 URL 到客户端的用法，并在项目现有 Astro 7.0.7 中通过实际构建验证。
- 没有安装新技能或依赖，没有引入后端；站点仍为 Astro 静态输出。

### 实际修改

- `src/pages/travel.astro` 在构建时为全部 16 张照片生成独立 WebP：质量 80，长边最多 1600 像素，保持比例，不放大较小原图。
- 使用 `data-viewer-src` 把生成的地址传给客户端，查看器优先使用该地址；无须等待相应卡片滚动到视口并加载。
- 保留原始照片、图库缩略图、三语言文案、Editorial Orbit 布局，以及昨日的键盘焦点修复。

### 验证

- `npm run test:profile`：通过。
- `npm run check`：退出码 0，15 files、0 errors、0 warnings、89 hints，已有 `Hongshuling/` 提示未变。
- `npm run build`：退出码 0，生成 2 个静态页面，164 个图片输出完成。
- `git diff --check`：通过。
- 静态构建预览的 Chrome/Playwright 验证：16 张照片均加载 HTTP 200、WebP、最长边不超过 1600 像素，实际弹窗 URL 与专用地址一致。已核对东京和长城截图，图片完整显示。
- 首页和旅行页回归：1280×900 桌面、390×844 手机、减少动画模式，各检查 English/简体/繁体，共 9 组语言场景。焦点进入、Tab 循环、背景 `inert`、方向键首尾切换、Escape、关闭返回、快速重新打开、三语言说明、移动菜单、页面无横向溢出、音乐四个链接、外部项目展示和 IMSC 大卡均通过；3 个场景均为 0 browser errors。
- 忽略目录 `.superpowers/` 中保存本轮图片基线、优化后的测量 JSON 和浏览器截图；没有把临时脚本或生成文件加入提交。

### 提交与发布

- 代码提交：`40553fb`，`perf: size travel viewer images independently`，已成功推送到 `main`。
- 之前的命令行认证阻塞已解除；此次推送同时包含 `207eff5`、`d22b2c0`、`548f0a0` 等此前未推送提交。
- `40553fb` 的 [Vercel 部署](https://vercel.com/noah-xu/noah-profile/79pqU6wXQYHKhoYAYHSL6rQ73LcS) 已从 pending 变为 success；公开旅行页 HTTP 200，并包含 16 个 `data-viewer-src`。
- 已在 `https://www.noahxu.org` 完成上述 3 种视口/动画场景、9 组语言场景的线上回归，全部通过且无浏览器错误；线上 16 张查看器图片也均通过 HTTP、格式、尺寸及专用地址验证，测得字节数与本地静态构建一致。昨日的旅行弹窗焦点和语言修复也已上线。
- 项目记忆和本日维护记录另作文档提交，按相同约定推送到 `main`。
- 公开首页与 `/travel` 返回 HTTP 200，现有濠江通外链仍返回 HTTP 404。没有修改其独立项目或更换用户链接。

### 后续与学习提示

- SEO 巡检发现现有 `public/sitemap.xml` 只有首页，尚未列出 `/travel`；留待后续单独维护。
- 同一照片可以有卡片缩略图和弹窗查看图两个版本。`getImage()` 在构建时完成缩放和压缩，访问者拿到的仍是静态图片，不需要新增服务器。
