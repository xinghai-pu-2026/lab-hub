# 学长资源站 🧭

给实验室学弟学妹的软件与学习资料分享站。全部内容由 `data/resources.js` 一个文件驱动，
网页会自动渲染成漂亮的卡片，改完保存 → 浏览器刷新即可。

```
lab-hub/
├── index.html           # 页面骨架（一般不用动）
├── css/style.css        # 样式（想换颜色改最上面的变量）
├── js/main.js           # 渲染逻辑（一般不用动）
├── data/resources.js    # ⭐ 你要编辑的文件：站点信息 + 分类 + 所有资源
└── README.md            # 本说明
```

## 1. 本地预览

**直接双击 `index.html`** 就能在浏览器里打开看效果（不需要装任何东西）。

## 2. 往里面加内容（核心）

打开 `data/resources.js`，文件里注释写得很详细。只需记住：

- **站点名字/标语/公告** → 改 `window.SITE` 里的文字
- **加/删分类** → 改 `window.CATEGORIES`
- **加一个资源** → 复制一块 `{ ... }`，填：名字、分类代号、下载链接、说明…

改完**保存文件 → 浏览器按 F5 刷新**，就生效了。不需要重新部署（本地预览阶段）。

> 小技巧：想分享一个软件，把安装包传到网盘（百度/夸克/蓝奏云）拿到"分享链接"，
> 填到资源的 `url` 里即可；也可以把 <2GB 的安装包直接传到 **GitHub Releases**
> 拿直链（教程见下）。网页本身很小，别把大文件放进这个文件夹。

## 3. 部署到 GitHub Pages（免费公网，之后要发布时做一次）

1. 在 [github.com](https://github.com) 新建一个仓库，名字随意（如 `lab-hub`）
2. 把本文件夹内容传上去（可用 GitHub 网页"upload"按钮，或装 GitHub Desktop）
3. 仓库页面 → **Settings → Pages** → Source 选 **main** 分支 / root → Save
4. 等 1 分钟，你的网址就是：`https://<你的用户名>.github.io/lab-hub/`
5. 以后每次改完 `data/resources.js`，把改动提交推送到 GitHub，网站自动更新

把这个网址甩给学弟学妹，任何网络都能打开 👌

## 4. 大文件用 GitHub Releases 直链（可选进阶）

适合把几十 MB ~ 2GB 的安装包放在网页上直接下载：

1. 仓库页 → **Releases → Create a new release** → 把安装包拖进去 → Publish
2. 在 Release 页面右键"下载"按钮 → 复制链接 → 填到资源条目的 `url`
3. 学弟学妹下载慢的话，把 `https://github.com/...` 开头换成
   `https://ghproxy.com/https://github.com/...` 作为 `url2` 镜像链接
