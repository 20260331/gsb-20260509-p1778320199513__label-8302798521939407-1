# 📊 Excel函数学习助手

一个现代化的Excel函数学习工具，帮助小白轻松学会Excel函数的使用。

## ✨ 功能特点

- 📚 **丰富的函数库**：涵盖数学、统计、逻辑、查找、文本等各类Excel函数
- 🎯 **分类浏览**：按函数类别快速查找
- 🔍 **智能搜索**：支持函数名称和描述搜索
- 📖 **详细说明**：每个函数包含语法、参数说明、使用示例
- 🎮 **交互式演示**：实时输入参数，查看计算结果
- 💡 **实用技巧**：每个函数都提供使用技巧和注意事项
- 📱 **响应式设计**：完美支持桌面和移动设备

## 🚀 快速开始

### 使用Docker Compose（推荐）

```bash
# 启动服务
docker compose up

# 后台运行
docker compose up -d

# 停止服务
docker compose down
```

启动后访问：http://localhost:8888

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 📦 技术栈

- **React 18** - 现代化的UI框架
- **TypeScript** - 类型安全
- **Vite** - 快速的构建工具
- **Lucide React** - 图标库
- **Docker** - 容器化部署
- **Nginx** - Web服务器

## 📁 项目结构

```
excelHelper/
├── src/
│   ├── components/      # React组件
│   │   ├── Header.tsx   # 顶部导航和搜索
│   │   ├── FunctionList.tsx  # 函数列表
│   │   ├── FunctionDetail.tsx # 函数详情
│   │   └── InteractiveDemo.tsx # 交互式演示
│   ├── data/
│   │   └── functions.ts # 函数数据
│   ├── types.ts         # TypeScript类型定义
│   ├── App.tsx          # 主应用组件
│   └── main.tsx         # 入口文件
├── Dockerfile           # Docker构建文件
├── docker-compose.yml   # Docker Compose配置
└── nginx.conf           # Nginx配置
```

## 🎯 支持的函数

当前版本包含以下Excel函数：

- **数学与三角函数**：SUM, MAX, MIN
- **统计函数**：AVERAGE, COUNT, COUNTIF
- **逻辑函数**：IF
- **查找与引用函数**：VLOOKUP
- **文本函数**：CONCATENATE

更多函数正在持续添加中...

## 🔧 开发说明

### 添加新函数

在 `src/data/functions.ts` 中添加新的函数定义：

```typescript
{
  id: 'function-id',
  name: 'FUNCTION_NAME',
  category: '函数分类',
  description: '函数描述',
  syntax: 'FUNCTION(param1, param2)',
  parameters: [...],
  examples: [...],
  tips: [...]
}
```

### 添加交互式演示

在 `src/components/InteractiveDemo.tsx` 的 `calculateResult` 函数中添加对应的计算逻辑。

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！
