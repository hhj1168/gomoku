@echo off
chcp 65001 >nul
echo ========================================
echo 🎮 五子棋游戏 GitHub 快速部署
echo ========================================
echo.

REM 获取用户信息
set /p username="📝 请输入你的 GitHub 用户名: "
set /p email="📝 请输入你的 GitHub 邮箱: "

REM 仓库名称
set reponame=gomoku

echo.
echo ========================================
echo 📋 部署信息确认
echo ========================================
echo GitHub 用户名: %username%
echo GitHub 邮箱: %email%
echo 仓库名称: %reponame%
echo 仓库地址: https://github.com/%username%/%reponame%
echo 部署后访问: https://%username%.github.io/%reponame%/
echo ========================================
echo.

set /p confirm="确认信息无误? (y/n): "
if /i not "%confirm%"=="y" (
    echo.
    echo ❌ 已取消部署
    pause
    exit /b
)

REM 步骤 1: 配置 Git
echo.
echo 🔧 [1/5] 配置 Git 用户信息...
git config --global user.name "%username%"
git config --global user.email "%email%"
echo ✅ Git 配置完成

REM 步骤 2: 创建提交
echo.
echo 💾 [2/5] 创建 Git 提交...
git add .
git commit -m "🎮 Initial commit: 3D Gomoku Game with responsive design"
if %errorlevel% equ 0 (
    echo ✅ 提交创建成功
) else (
    echo ⚠️  提交可能已存在，继续...
)

REM 步骤 3: 设置分支
echo.
echo 🔄 [3/5] 设置主分支为 main...
git branch -M main
echo ✅ 分支设置完成

REM 步骤 4: 配置远程仓库
echo.
echo 🔗 [4/5] 配置远程仓库...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/%username%/%reponame%.git
echo ✅ 远程仓库配置完成

REM 步骤 5: 推送到 GitHub
echo.
echo ========================================
echo ⚠️  重要提示
echo ========================================
echo 在推送之前，请确保:
echo 1. 已在 GitHub 创建仓库: https://github.com/new
echo    - 仓库名: %reponame%
echo    - 选择 Public
echo    - 不要勾选任何选项
echo 2. 准备好 GitHub 登录凭据
echo    - 建议使用 Personal Access Token
echo    - 获取地址: https://github.com/settings/tokens
echo ========================================
echo.

set /p push="是否现在推送到 GitHub? (y/n): "
if /i "%push%"=="y" (
    echo.
    echo 🚀 [5/5] 推送到 GitHub...
    echo 正在推送到: https://github.com/%username%/%reponame%.git
    echo.
    
    git push -u origin main
    
    if %errorlevel% equ 0 (
        echo.
        echo ========================================
        echo ✅ 部署成功！
        echo ========================================
        echo.
        echo 📋 下一步操作:
        echo 1. 访问仓库: https://github.com/%username%/%reponame%
        echo 2. 进入 Settings → Pages
        echo 3. Source 选择: main 分支, / (root) 目录
        echo 4. 点击 Save
        echo 5. 等待 5-10 分钟后访问:
        echo    https://%username%.github.io/%reponame%/
        echo.
        echo 🎉 恭喜！你的五子棋游戏即将上线！
    ) else (
        echo.
        echo ========================================
        echo ❌ 推送失败
        echo ========================================
        echo.
        echo 可能的原因:
        echo 1. GitHub 仓库尚未创建
        echo    → 访问 https://github.com/new 创建仓库
        echo 2. 认证失败
        echo    → 使用 Personal Access Token 代替密码
        echo    → 获取地址: https://github.com/settings/tokens
        echo 3. 仓库名称不匹配
        echo    → 确保仓库名为: %reponame%
        echo.
        echo 📝 稍后可以手动推送:
        echo    git push -u origin main
    )
) else (
    echo.
    echo ========================================
    echo 📝 本地配置已完成
    echo ========================================
    echo.
    echo 手动推送步骤:
    echo 1. 在 GitHub 创建仓库: https://github.com/new
    echo    - 仓库名: %reponame%
    echo 2. 运行命令:
    echo    git push -u origin main
)

echo.
echo ========================================
echo 📖 详细文档
echo ========================================
echo 查看 GITHUB_DEPLOY_GUIDE.md 获取完整指南
echo ========================================
echo.
pause
