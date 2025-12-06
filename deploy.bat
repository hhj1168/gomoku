@echo off
chcp 65001 >nul
echo ========================================
echo 🎮 五子棋游戏 GitHub 部署助手
echo ========================================
echo.

REM 检查 Git 是否安装
echo 📋 检查 Git 安装...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git 未安装！请先安装 Git: https://git-scm.com/
    pause
    exit /b 1
)
echo ✅ Git 已安装
echo.

REM 获取用户信息
echo 📝 配置 Git 用户信息
set /p username="请输入你的 GitHub 用户名: "
set /p email="请输入你的 GitHub 邮箱: "

REM 配置 Git
echo.
echo 🔧 配置 Git...
git config --global user.name "%username%"
git config --global user.email "%email%"
echo ✅ Git 配置完成
echo.

REM 初始化仓库
if exist .git (
    echo ⚠️  已存在 Git 仓库
    set /p reinit="是否重新初始化? (y/n): "
    if /i "%reinit%"=="y" (
        rmdir /s /q .git
        git init
        echo ✅ 重新初始化完成
    )
) else (
    echo 🔧 初始化 Git 仓库...
    git init
    echo ✅ 初始化完成
)
echo.

REM 添加文件
echo 📦 添加文件到 Git...
git add .
echo ✅ 文件添加完成
echo.

REM 提交
echo 💾 创建首次提交...
git commit -m "🎮 Initial commit: 3D Gomoku Game with responsive design"
echo ✅ 提交完成
echo.

REM 获取仓库信息
echo 🌐 GitHub 仓库配置
set /p reponame="请输入你的 GitHub 仓库名称 (例如: gomoku-game): "

REM 添加远程仓库
echo.
echo 🔗 添加远程仓库...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/%username%/%reponame%.git
echo ✅ 远程仓库配置完成
echo.

REM 重命名分支
echo 🔄 设置主分支为 main...
git branch -M main
echo ✅ 分支设置完成
echo.

REM 显示下一步操作
echo ========================================
echo ✅ 本地配置完成！
echo ========================================
echo.
echo 📋 接下来的步骤:
echo.
echo 1️⃣  在 GitHub 上创建仓库:
echo    访问: https://github.com/new
echo    仓库名: %reponame%
echo    选择 Public (公开)
echo    ❌ 不要勾选 'Add a README file'
echo.
echo 2️⃣  推送代码到 GitHub:
echo    git push -u origin main
echo.
echo 3️⃣  启用 GitHub Pages:
echo    - 进入仓库的 Settings
echo    - 点击左侧的 Pages
echo    - Source 选择: main 分支, / (root) 目录
echo    - 点击 Save
echo.
echo 4️⃣  访问你的游戏:
echo    https://%username%.github.io/%reponame%/
echo.
echo ========================================
echo 💡 提示:
echo - 首次推送可能需要输入 GitHub 用户名和密码
echo - 建议使用 Personal Access Token 代替密码
echo - GitHub Pages 部署可能需要 5-10 分钟
echo ========================================
echo.

set /p push="是否现在推送到 GitHub? (y/n): "
if /i "%push%"=="y" (
    echo.
    echo 🚀 推送到 GitHub...
    git push -u origin main
    
    if %errorlevel% equ 0 (
        echo.
        echo ✅ 推送成功！
        echo 🌐 你的游戏将在几分钟后可以访问:
        echo    https://%username%.github.io/%reponame%/
    ) else (
        echo.
        echo ⚠️  推送失败，请检查:
        echo 1. GitHub 仓库是否已创建
        echo 2. 仓库名称是否正确
        echo 3. 是否有推送权限
        echo.
        echo 你可以稍后手动推送: git push -u origin main
    )
) else (
    echo.
    echo 📝 记得稍后手动推送:
    echo    git push -u origin main
)

echo.
echo 🎉 部署准备完成！祝你好运！
echo 📖 详细说明请查看 DEPLOY.md 文件
echo.
pause
