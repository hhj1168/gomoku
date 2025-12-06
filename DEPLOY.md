# 🚀 GitHub 部署指南

本指南将帮助你将五子棋游戏部署到 GitHub Pages，让全世界的人都能访问你的游戏！

## 📋 前置要求

1. **GitHub 账号** - 如果没有，请先在 [GitHub](https://github.com) 注册
2. **Git 工具** - 确保已安装 Git

### 检查 Git 是否已安装
```bash
git --version
```

如果未安装，请访问 [Git 官网](https://git-scm.com/) 下载安装。

## 🎯 部署步骤

### 步骤 1: 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 `+` 号，选择 `New repository`
3. 填写仓库信息：
   - **Repository name**: `gomoku-game` (或你喜欢的名字)
   - **Description**: `一个精美的3D五子棋游戏，支持多设备响应式设计`
   - **Public** (选择公开，这样才能使用 GitHub Pages)
   - ❌ 不要勾选 "Add a README file"（我们已经有了）
4. 点击 `Create repository`

### 步骤 2: 初始化本地仓库

在游戏目录下打开命令行（PowerShell 或 CMD），执行以下命令：

```bash
# 进入项目目录
cd c:\Users\Thinkpad\AppData\Local\Programs\Python\Python313\gomoku_web

# 初始化 Git 仓库
git init

# 配置用户信息（如果还没配置过）
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub邮箱"

# 添加所有文件
git add .

# 创建第一次提交
git commit -m "🎮 Initial commit: 3D Gomoku Game with responsive design"
```

### 步骤 3: 连接到 GitHub 仓库

```bash
# 添加远程仓库（替换成你的用户名和仓库名）
git remote add origin https://github.com/你的用户名/gomoku-game.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 4: 启用 GitHub Pages

1. 在 GitHub 仓库页面，点击 `Settings`（设置）
2. 在左侧菜单找到 `Pages`
3. 在 `Source` 部分：
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
4. 点击 `Save`
5. 等待几分钟，页面会显示你的网站地址：
   ```
   https://你的用户名.github.io/gomoku-game/
   ```

### 步骤 5: 访问你的游戏

打开浏览器，访问：
```
https://你的用户名.github.io/gomoku-game/
```

🎉 恭喜！你的游戏已经成功部署到互联网上了！

## 🔄 更新游戏

当你修改了游戏代码后，使用以下命令更新：

```bash
# 添加修改的文件
git add .

# 提交更改
git commit -m "描述你的更改"

# 推送到 GitHub
git push
```

等待几分钟，GitHub Pages 会自动更新你的网站。

## 📱 自定义域名（可选）

如果你有自己的域名，可以这样配置：

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容为你的域名，例如：`gomoku.yourdomain.com`
3. 在域名提供商处添加 CNAME 记录指向 `你的用户名.github.io`

## 🎨 优化建议

### 1. 添加社交分享图片

创建 `og-image.png` (1200x630px) 并在 `index.html` 中添加：

```html
<meta property="og:image" content="https://你的用户名.github.io/gomoku-game/og-image.png">
<meta property="og:title" content="3D 国际五子棋游戏">
<meta property="og:description" content="精美的3D五子棋游戏，支持多设备响应式设计">
```

### 2. 添加网站图标

创建 `favicon.ico` 并在 `index.html` 中添加：

```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
```

### 3. 添加 Google Analytics（可选）

在 `index.html` 的 `</head>` 前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=你的GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '你的GA-ID');
</script>
```

## 🐛 常见问题

### Q: 推送时提示权限错误？
**A:** 需要配置 GitHub 认证：
- 使用 Personal Access Token (推荐)
- 或配置 SSH 密钥

### Q: GitHub Pages 没有更新？
**A:** 
- 等待 5-10 分钟
- 清除浏览器缓存
- 检查 Actions 标签页是否有构建错误

### Q: 游戏在 GitHub Pages 上显示不正常？
**A:** 
- 检查浏览器控制台是否有错误
- 确保所有文件路径都是相对路径
- 检查文件名大小写（GitHub Pages 区分大小写）

### Q: 如何删除仓库？
**A:** 
1. 进入仓库的 Settings
2. 滚动到最底部
3. 点击 "Delete this repository"

## 📊 监控访问量

### 使用 GitHub Insights
1. 进入仓库的 `Insights` 标签
2. 查看 `Traffic` 了解访问情况

### 使用第三方工具
- [Google Analytics](https://analytics.google.com/)
- [Cloudflare Analytics](https://www.cloudflare.com/analytics/)
- [Plausible](https://plausible.io/)

## 🔒 安全建议

1. **不要提交敏感信息**
   - API 密钥
   - 密码
   - 个人信息

2. **使用 .gitignore**
   - 已经包含在项目中
   - 排除临时文件和系统文件

3. **定期更新依赖**
   - 虽然这个项目是纯前端，但如果将来添加了依赖，要定期更新

## 🎯 下一步

部署成功后，你可以：

1. **分享你的游戏**
   - 在社交媒体上分享链接
   - 添加到你的个人网站
   - 发送给朋友试玩

2. **继续改进**
   - 添加更多功能
   - 优化 AI 算法
   - 改进 UI 设计
   - 添加音效

3. **收集反馈**
   - 在 GitHub 上开启 Issues
   - 收集用户建议
   - 持续改进游戏

## 📚 相关资源

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [Git 教程](https://git-scm.com/book/zh/v2)
- [Markdown 语法](https://guides.github.com/features/mastering-markdown/)

## 💡 提示

- 每次推送后，GitHub Pages 可能需要几分钟才能更新
- 可以在仓库的 Actions 标签查看部署状态
- 建议使用有意义的 commit 信息，方便以后查看历史

---

**祝你部署顺利！** 🚀✨

如有问题，欢迎在 GitHub Issues 中提问。
