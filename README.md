# 🎮 3D 国际五子棋游戏

一个精美的3D五子棋游戏，支持人人对战和人机对战，完美适配手机、平板、电脑、电视等多种设备。

## 🌟 在线体验

**[点击这里开始游戏](https://你的用户名.github.io/gomoku-game/)**

## ✨ 特性

### 游戏模式
- 👥 **人人对战** - 与朋友面对面对弈
- 🤖 **人机对战** - 挑战AI，支持普通和大师两种难度

### 视觉效果
- 🎨 精美的3D棋盘设计
- 🌈 流畅的动画效果
- 💎 玻璃态UI设计
- 🎯 清晰的落子标记

### 响应式设计
- 📱 **完美适配手机** - 竖屏和横屏优化
- 📱 **平板支持** - 自适应横竖屏
- 💻 **电脑优化** - 经典桌面布局
- 📺 **大屏支持** - 电视和超宽屏

### 技术特性
- ⚡ 纯前端实现，无需后端
- 🚀 快速加载，流畅运行
- 📴 支持离线使用
- 🎯 智能AI算法
- 🎨 现代化UI设计

## 🎯 游戏规则

五子棋是一种两人对弈的策略棋类游戏：

1. 棋盘为15×15的方格
2. 黑方先行，双方轮流落子
3. 先在横、竖、斜任一方向形成连续五子者获胜
4. 棋盘下满无人获胜则为平局

## 🚀 快速开始

### 在线游戏
直接访问 [游戏链接](https://你的用户名.github.io/gomoku-game/) 即可开始游戏。

### 本地运行

1. **克隆仓库**
```bash
git clone https://github.com/你的用户名/gomoku-game.git
cd gomoku-game
```

2. **启动本地服务器**
```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve
```

3. **打开浏览器**
访问 `http://localhost:8000`

### 直接打开
也可以直接双击 `index.html` 文件在浏览器中打开。

## 📱 设备支持

| 设备类型 | 屏幕尺寸 | 支持情况 |
|---------|---------|---------|
| 小手机 | < 400px | ✅ 完美支持 |
| 标准手机 | 400-600px | ✅ 完美支持 |
| 大手机 | 600-768px | ✅ 完美支持 |
| 平板 | 768-1024px | ✅ 完美支持 |
| 笔记本 | 1024-1400px | ✅ 完美支持 |
| 台式机 | 1400-1920px | ✅ 完美支持 |
| 超宽屏/电视 | > 1920px | ✅ 完美支持 |

## 🎮 游戏截图

### 桌面端
![桌面端截图](screenshots/desktop.png)

### 移动端
![移动端截图](screenshots/mobile.png)

### 平板端
![平板端截图](screenshots/tablet.png)

## 🛠️ 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
  - CSS 变量
  - Flexbox & Grid
  - 3D 变换
  - 媒体查询
  - 玻璃态效果
- **JavaScript (ES6+)** - 游戏逻辑
  - 智能AI算法
  - 事件处理
  - DOM 操作

## 📂 项目结构

```
gomoku-game/
├── index.html              # 主游戏页面
├── style.css              # 响应式样式表
├── script.js              # 游戏逻辑
├── test_responsive.html   # 响应式测试页面
├── README.md              # 项目说明
├── README_RESPONSIVE.md   # 响应式技术文档
└── OPTIMIZATION_SUMMARY.md # 优化总结
```

## 🎯 AI 算法

### 普通难度
- 检测获胜机会
- 阻挡对手获胜
- 寻找有利位置
- 随机落子

### 大师难度
- 立即获胜检测
- 阻挡立即失败
- 活四（双向四子）检测
- 双活三（必胜）检测
- 活三创建
- 冲四策略
- 高级位置评估

## 🌐 浏览器支持

- ✅ Chrome/Edge (推荐)
- ✅ Firefox
- ✅ Safari (iOS 12+)
- ✅ Safari (macOS)
- ✅ Samsung Internet
- ✅ UC Browser

## 📖 开发文档

- [响应式设计详解](README_RESPONSIVE.md)
- [优化总结](OPTIMIZATION_SUMMARY.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👨‍💻 作者

**Your Name**

- GitHub: [@你的用户名](https://github.com/你的用户名)

## 🙏 致谢

- 感谢所有贡献者
- 灵感来源于传统五子棋游戏
- UI 设计参考了现代 Web 设计趋势

## 📞 联系方式

如有问题或建议，欢迎：
- 提交 [Issue](https://github.com/你的用户名/gomoku-game/issues)
- 发送邮件至：your.email@example.com

---

**享受游戏，祝你好运！** 🎮✨

最后更新：2025-12-06
