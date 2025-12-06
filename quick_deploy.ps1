# ========================================
# 五子棋游戏 GitHub 快速部署脚本
# ========================================

Write-Host "🎮 五子棋游戏 GitHub 快速部署" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# 获取用户信息
Write-Host "📝 请输入你的 GitHub 用户名:" -ForegroundColor Yellow
$username = Read-Host

Write-Host "`n📝 请输入你的 GitHub 邮箱:" -ForegroundColor Yellow
$email = Read-Host

# 仓库名称
$repoName = "gomoku"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "📋 部署信息确认" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub 用户名: $username" -ForegroundColor White
Write-Host "GitHub 邮箱: $email" -ForegroundColor White
Write-Host "仓库名称: $repoName" -ForegroundColor White
Write-Host "仓库地址: https://github.com/$username/$repoName" -ForegroundColor White
Write-Host "部署后访问: https://$username.github.io/$repoName/" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "确认信息无误? (y/n):" -ForegroundColor Yellow
$confirm = Read-Host
if ($confirm -ne "y") {
    Write-Host "`n❌ 已取消部署" -ForegroundColor Red
    exit
}

# 步骤 1: 配置 Git
Write-Host "`n🔧 [1/5] 配置 Git 用户信息..." -ForegroundColor Yellow
git config --global user.name "$username"
git config --global user.email "$email"
Write-Host "✅ Git 配置完成" -ForegroundColor Green

# 步骤 2: 创建提交
Write-Host "`n💾 [2/5] 创建 Git 提交..." -ForegroundColor Yellow
git add .
git commit -m "🎮 Initial commit: 3D Gomoku Game with responsive design"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 提交创建成功" -ForegroundColor Green
} else {
    Write-Host "⚠️  提交可能已存在，继续..." -ForegroundColor Yellow
}

# 步骤 3: 设置分支
Write-Host "`n🔄 [3/5] 设置主分支为 main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ 分支设置完成" -ForegroundColor Green

# 步骤 4: 配置远程仓库
Write-Host "`n🔗 [4/5] 配置远程仓库..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/$username/$repoName.git"

# 移除已存在的 origin（如果有）
git remote remove origin 2>$null

# 添加新的 origin
git remote add origin $remoteUrl
Write-Host "✅ 远程仓库配置完成" -ForegroundColor Green

# 步骤 5: 推送到 GitHub
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "⚠️  重要提示" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "在推送之前，请确保:" -ForegroundColor White
Write-Host "1. 已在 GitHub 创建仓库: https://github.com/new" -ForegroundColor White
Write-Host "   - 仓库名: $repoName" -ForegroundColor White
Write-Host "   - 选择 Public" -ForegroundColor White
Write-Host "   - 不要勾选任何选项" -ForegroundColor White
Write-Host "2. 准备好 GitHub 登录凭据" -ForegroundColor White
Write-Host "   - 建议使用 Personal Access Token" -ForegroundColor White
Write-Host "   - 获取地址: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "是否现在推送到 GitHub? (y/n):" -ForegroundColor Yellow
$push = Read-Host

if ($push -eq "y") {
    Write-Host "`n🚀 [5/5] 推送到 GitHub..." -ForegroundColor Yellow
    Write-Host "正在推送到: $remoteUrl`n" -ForegroundColor Cyan
    
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n========================================" -ForegroundColor Cyan
        Write-Host "✅ 部署成功！" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "`n📋 下一步操作:" -ForegroundColor Yellow
        Write-Host "1. 访问仓库: https://github.com/$username/$repoName" -ForegroundColor White
        Write-Host "2. 进入 Settings → Pages" -ForegroundColor White
        Write-Host "3. Source 选择: main 分支, / (root) 目录" -ForegroundColor White
        Write-Host "4. 点击 Save" -ForegroundColor White
        Write-Host "5. 等待 5-10 分钟后访问:" -ForegroundColor White
        Write-Host "   https://$username.github.io/$repoName/" -ForegroundColor Cyan
        Write-Host "`n🎉 恭喜！你的五子棋游戏即将上线！" -ForegroundColor Green
    } else {
        Write-Host "`n========================================" -ForegroundColor Cyan
        Write-Host "❌ 推送失败" -ForegroundColor Red
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "`n可能的原因:" -ForegroundColor Yellow
        Write-Host "1. GitHub 仓库尚未创建" -ForegroundColor White
        Write-Host "   → 访问 https://github.com/new 创建仓库" -ForegroundColor White
        Write-Host "2. 认证失败" -ForegroundColor White
        Write-Host "   → 使用 Personal Access Token 代替密码" -ForegroundColor White
        Write-Host "   → 获取地址: https://github.com/settings/tokens" -ForegroundColor White
        Write-Host "3. 仓库名称不匹配" -ForegroundColor White
        Write-Host "   → 确保仓库名为: $repoName" -ForegroundColor White
        Write-Host "`n📝 稍后可以手动推送:" -ForegroundColor Yellow
        Write-Host "   git push -u origin main" -ForegroundColor Cyan
    }
} else {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "📝 本地配置已完成" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "`n手动推送步骤:" -ForegroundColor Yellow
    Write-Host "1. 在 GitHub 创建仓库: https://github.com/new" -ForegroundColor White
    Write-Host "   - 仓库名: $repoName" -ForegroundColor White
    Write-Host "2. 运行命令:" -ForegroundColor White
    Write-Host "   git push -u origin main" -ForegroundColor Cyan
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "📖 详细文档" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "查看 GITHUB_DEPLOY_GUIDE.md 获取完整指南" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor Cyan
