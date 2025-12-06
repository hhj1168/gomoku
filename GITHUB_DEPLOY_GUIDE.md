# 🚀 GitHub 部署完整指南

## 📋 当前状态
✅ Git 仓库已初始化  
✅ 文件已添加到暂存区  
❌ 需要配置 Git 用户信息  
❌ 需要创建提交  
❌ 需要推送到 GitHub  

---

## 🔧 步骤 1: 配置 Git 用户信息

在 PowerShell 或命令提示符中运行以下命令（替换为你的信息）：

```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub邮箱"
```

**示例：**
```bash
git config --global user.name "JimHu"
git config --global user.email "jimhu@example.com"
```

---

## 💾 步骤 2: 创建首次提交

```bash
git commit -m "🎮 Initial commit: 3D Gomoku Game with responsive design"
```

---

## 🌐 步骤 3: 在 GitHub 上创建仓库

1. 访问：https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `gomoku-game` （或你喜欢的名字）
   - **Description**: `3D Gomoku Game with responsive design`
   - **Public** ✅ （选择公开）
   - **❌ 不要勾选** "Add a README file"
   - **❌ 不要勾选** "Add .gitignore"
   - **❌ 不要勾选** "Choose a license"
3. 点击 **Create repository**

---

## 🔗 步骤 4: 添加远程仓库并推送

创建仓库后，GitHub 会显示一些命令。使用以下命令（替换为你的用户名和仓库名）：

```bash
# 重命名分支为 main
git branch -M main

# 添加远程仓库（替换 YOUR_USERNAME 和 YOUR_REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 推送到 GitHub
git push -u origin main
```

**示例：**
```bash
git branch -M main
git remote add origin https://github.com/JimHu/gomoku-game.git
git push -u origin main
```

**注意：** 首次推送可能需要登录 GitHub。建议使用 **Personal Access Token** 代替密码。

---

## 🌍 步骤 5: 启用 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 下：
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
5. 点击 **Save**
6. 等待 5-10 分钟，GitHub Pages 会自动部署

---

## 🎮 步骤 6: 访问你的游戏

部署完成后，你的游戏将在以下地址可访问：

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**示例：**
```
https://JimHu.github.io/gomoku-game/
```

---

## 🔑 如何获取 Personal Access Token

如果推送时需要密码，建议使用 Personal Access Token：

1. 访问：https://github.com/settings/tokens
2. 点击 **Generate new token** → **Generate new token (classic)**
3. 设置：
   - **Note**: `Gomoku Game Deployment`
   - **Expiration**: 选择有效期
   - **Select scopes**: 勾选 `repo`（完整仓库访问权限）
4. 点击 **Generate token**
5. **复制 token**（只显示一次，务必保存）
6. 推送时使用 token 作为密码

---

## 📝 快速命令参考

```bash
# 查看当前状态
git status

# 查看远程仓库
git remote -v

# 查看提交历史
git log --oneline

# 添加所有更改
git add .

# 创建提交
git commit -m "更新说明"

# 推送到 GitHub
git push
```

---

## ⚠️ 常见问题

### 问题 1: 推送失败 - 认证错误
**解决方案：** 使用 Personal Access Token 代替密码

### 问题 2: 远程仓库已存在
**解决方案：**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 问题 3: GitHub Pages 没有显示
**解决方案：**
- 等待 5-10 分钟
- 检查 Settings → Pages 是否正确配置
- 确保 `index.html` 在仓库根目录

---

## 🎉 完成！

部署成功后，你可以：
- ✅ 在线访问你的五子棋游戏
- ✅ 分享链接给朋友
- ✅ 在任何设备上玩游戏（手机、平板、电脑）

---

## 📞 需要帮助？

如果遇到问题，请告诉我：
1. 你在哪一步遇到了问题
2. 错误信息是什么
3. 你的 GitHub 用户名（如果方便的话）

祝你部署顺利！🚀
