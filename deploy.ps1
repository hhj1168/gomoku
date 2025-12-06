# ========================================
# 五子棋游戏 GitHub 部署脚本
# ========================================

Write-Host "🎮 五子棋游戏 GitHub 部署助手" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# 检查 Git 是否安装
Write-Host "📋 检查 Git 安装..." -ForegroundColor Yellow
$gitVersion = git --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Git 未安装！请先安装 Git: https://git-scm.com/" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Git 已安装: $gitVersion`n" -ForegroundColor Green

# 获取用户信息
Write-Host "📝 配置 Git 用户信息" -ForegroundColor Yellow
Write-Host "请输入你的 GitHub 用户名:" -ForegroundColor Cyan
$username = Read-Host
Write-Host "请输入你的 GitHub 邮箱:" -ForegroundColor Cyan
$email = Read-Host

# 配置 Git
Write-Host "`n🔧 配置 Git..." -ForegroundColor Yellow
git config --global user.name "$username"
git config --global user.email "$email"
Write-Host "✅ Git 配置完成`n" -ForegroundColor Green

# 检查是否已经是 Git 仓库
if (Test-Path ".git") {
    Write-Host "⚠️  已存在 Git 仓库" -ForegroundColor Yellow
    Write-Host "是否重新初始化? (y/n):" -ForegroundColor Cyan
    $reinit = Read-Host
    if ($reinit -eq "y") {
        Remove-Item -Recurse -Force .git
        git init
        Write-Host "✅ 重新初始化完成`n" -ForegroundColor Green
    }
} else {
    Write-Host "🔧 初始化 Git 仓库..." -ForegroundColor Yellow
    git init
    Write-Host "✅ 初始化完成`n" -ForegroundColor Green
}

# 添加文件
Write-Host "📦 添加文件到 Git..." -ForegroundColor Yellow
git add .
Write-Host "✅ 文件添加完成`n" -ForegroundColor Green

# 提交
Write-Host "💾 创建首次提交..." -ForegroundColor Yellow
git commit -m "🎮 Initial commit: 3D Gomoku Game with responsive design"
Write-Host "✅ 提交完成`n" -ForegroundColor Green

# 获取仓库信息
Write-Host "🌐 GitHub 仓库配置" -ForegroundColor Yellow
Write-Host "请输入你的 GitHub 仓库名称 (例如: gomoku-game):" -ForegroundColor Cyan
$repoName = Read-Host

# 添加远程仓库
$remoteUrl = "https://github.com/$username/$repoName.git"
Write-Host "`n🔗 添加远程仓库: $remoteUrl" -ForegroundColor Yellow

# 检查是否已有 origin
$hasOrigin = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "⚠️  已存在 origin，将更新为新地址" -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
} else {
    git remote add origin $remoteUrl
}
Write-Host "✅ 远程仓库配置完成`n" -ForegroundColor Green

# 重命名分支为 main
Write-Host "🔄 设置主分支为 main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ 分支设置完成`n" -ForegroundColor Green

# 显示下一步操作
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ 本地配置完成！" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "📋 接下来的步骤:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  在 GitHub 上创建仓库:" -ForegroundColor Cyan
Write-Host "   访问: https://github.com/new" -ForegroundColor White
Write-Host "   仓库名: $repoName" -ForegroundColor White
Write-Host "   选择 Public (公开)" -ForegroundColor White
Write-Host "   ❌ 不要勾选 'Add a README file'" -ForegroundColor White
Write-Host ""

Write-Host "2️⃣  推送代码到 GitHub:" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""

Write-Host "3️⃣  启用 GitHub Pages:" -ForegroundColor Cyan
Write-Host "   - 进入仓库的 Settings" -ForegroundColor White
Write-Host "   - 点击左侧的 Pages" -ForegroundColor White
Write-Host "   - Source 选择: main 分支, / (root) 目录" -ForegroundColor White
Write-Host "   - 点击 Save" -ForegroundColor White
Write-Host ""

Write-Host "4️⃣  访问你的游戏:" -ForegroundColor Cyan
Write-Host "   https://$username.github.io/$repoName/" -ForegroundColor White
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "💡 提示:" -ForegroundColor Yellow
Write-Host "- 首次推送可能需要输入 GitHub 用户名和密码" -ForegroundColor White
Write-Host "- 建议使用 Personal Access Token 代替密码" -ForegroundColor White
Write-Host "- GitHub Pages 部署可能需要 5-10 分钟" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "是否现在推送到 GitHub? (y/n):" -ForegroundColor Cyan
$push = Read-Host

if ($push -eq "y") {
    Write-Host "`n🚀 推送到 GitHub..." -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ 推送成功！" -ForegroundColor Green
        Write-Host "🌐 你的游戏将在几分钟后可以访问:" -ForegroundColor Cyan
        Write-Host "   https://$username.github.io/$repoName/" -ForegroundColor White
    } else {
        Write-Host "`n⚠️  推送失败，请检查:" -ForegroundColor Yellow
        Write-Host "1. GitHub 仓库是否已创建" -ForegroundColor White
        Write-Host "2. 仓库名称是否正确" -ForegroundColor White
        Write-Host "3. 是否有推送权限" -ForegroundColor White
        Write-Host "`n你可以稍后手动推送: git push -u origin main" -ForegroundColor Cyan
    }
} else {
    Write-Host "`n📝 记得稍后手动推送:" -ForegroundColor Yellow
    Write-Host "   git push -u origin main" -ForegroundColor White
}

Write-Host "`n🎉 部署准备完成！祝你好运！" -ForegroundColor Green
Write-Host "📖 详细说明请查看 DEPLOY.md 文件`n" -ForegroundColor Cyan
