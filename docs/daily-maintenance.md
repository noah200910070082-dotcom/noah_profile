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
