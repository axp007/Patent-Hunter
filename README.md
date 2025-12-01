# 专利猎人 - 全球专利侵权风险智能预警系统

## 项目简介
专利猎人是一款基于React和TypeScript开发的全球专利侵权风险智能预警系统，提供专利检索、分析、比对和风险评估等功能。

## 功能展示

#### 1. 专利风险监控预警功能 

![img](https://ai.feishu.cn/space/api/box/stream/download/asynccode/?code=MWU4Yzk1MDY2OGE2YzgzMzM1Y2U2MmM2ZTJkMmNlMjZfbzBzdDdidUlIaFVOQ0R4NmFiWXdqRDluTkZUYlBRMXRfVG9rZW46RWdJeWJnbUFnb24zZzV4c2VZQ2NvcG1QbkFnXzE3NjQ1NzM4MDA6MTc2NDU3NzQwMF9WNA)

#### 2. 专利检索功能

![img](https://ai.feishu.cn/space/api/box/stream/download/asynccode/?code=YjdmYjA5YzNiNDk4ZTFlMTljMjBiNzExZjJhMmEyMzJfSHBSSmVNMmdUek1DS0NzaG5aYmI4ZkgydE1URURVMTZfVG9rZW46UGVHNmJRbW1Zb3FTdmZ4alFtc2Nxa2lVbkZOXzE3NjQ1NzM4MDA6MTc2NDU3NzQwMF9WNA)

#### 3. 专利相似度对比功能

![img](https://ai.feishu.cn/space/api/box/stream/download/asynccode/?code=YWJlYTY1NDUzNDk5ZTY2MWVmYmQ3NzJlOTdhOWEyOTVfNG5xRUwwTWNMR05EbnhPd0paRXkzWjdmS3E3S2d4MHlfVG9rZW46Szh3VmJOa01Bb0Vrdzl4MnJpcGNaYjZUbmxjXzE3NjQ1NzM4MDA6MTc2NDU3NzQwMF9WNA)

#### 4. 个人中心功能

![img](https://ai.feishu.cn/space/api/box/stream/download/asynccode/?code=MzA4NjAxNDEyYjM3ZDM1MWViYjM2OGI5NmNmOTYyZTBfMU1YR2piNkhCdFJHQ1E0Zk9XQlNYTlR0VUVWaktZRTRfVG9rZW46Q0tMVGJaNFlQb2FxZjh4MUpZZmMyNmZnbnBjXzE3NjQ1NzM4NTM6MTc2NDU3NzQ1M19WNA)

## 技术栈
- React 18+
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- Recharts
- Framer Motion

## 本地开发

### 环境要求
- Node.js 18+
- pnpm 9+

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```
开发服务器将在 http://localhost:3000 启动

## 部署指南（Linux服务器）

### 1. 克隆项目代码
首先，将项目代码克隆到您的Linux服务器上：

```bash
git clone https://github.com/axp007/Patent-Hunter.git
cd [项目目录]
```

### 2. 安装Node.js和pnpm
如果服务器上尚未安装Node.js和pnpm，请按照以下步骤安装：

#### 安装Node.js
```bash
# 使用nvm安装Node.js（推荐）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# 或者直接安装系统包（Ubuntu/Debian）
# sudo apt update
# sudo apt install nodejs npm
# sudo npm install -g n
# sudo n 18
```

#### 安装pnpm
```bash
npm install -g pnpm
```

### 3. 安装依赖并构建项目
在项目目录中执行以下命令：

```bash
pnpm install
pnpm build
```

构建成功后，项目文件将生成在 `dist` 目录中。

### 4. 配置Web服务器
推荐使用Nginx作为Web服务器来托管React应用。

#### 安装Nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
# sudo yum install nginx
```

#### 配置Nginx
创建一个新的Nginx配置文件：

```bash
sudo nano /etc/nginx/sites-available/patent-hunter
```

将以下内容粘贴到文件中，替换`your_domain.com`为您的域名或服务器IP地址，并确保`root`路径指向正确的项目构建目录：

```nginx
server {
    listen 80;
    server_name your_domain.com;

    root /path/to/your/project/dist/static;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 可选：添加安全头部
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    # 可选：添加gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_proxied any;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
}
```

保存并退出文件，然后创建符号链接启用该配置：

```bash
sudo ln -s /etc/nginx/sites-available/patent-hunter /etc/nginx/sites-enabled/
```

### 5. 验证配置并重启Nginx
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### 6. 配置防火墙
如果服务器启用了防火墙，请确保允许HTTP流量：

```bash
# Ubuntu/Debian
sudo ufw allow 'Nginx HTTP'
sudo ufw reload

# CentOS/RHEL
# sudo firewall-cmd --permanent --add-service=http
# sudo firewall-cmd --reload
```

### 7. 设置为开机自启
```bash
sudo systemctl enable nginx
```

## 部署优化建议

### 1. 使用HTTPS
为了提高安全性，建议配置SSL证书：

```bash
# 使用Let's Encrypt获取免费SSL证书
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com
```

### 2. 设置定期更新
创建一个简单的shell脚本用于自动更新和重新部署项目：

```bash
#!/bin/bash
cd /path/to/your/project
git pull
pnpm install
pnpm build
sudo systemctl restart nginx
```

保存为`deploy.sh`并设置执行权限：

```bash
chmod +x deploy.sh
```

### 3. 监控日志
定期检查Nginx和应用日志以便排查问题：

```bash
# Nginx错误日志
sudo tail -f /var/log/nginx/error.log

# Nginx访问日志
sudo tail -f /var/log/nginx/access.log
```

## 项目结构
```
├── src/
│   ├── components/      # 可复用组件
│   ├── contexts/        # React上下文
│   ├── hooks/           # 自定义Hooks
│   ├── lib/             # 工具函数
│   ├── pages/           # 页面组件
│   ├── App.tsx          # 应用主组件
│   ├── index.css        # 全局样式
│   └── main.tsx         # 应用入口
├── index.html           # HTML入口
├── package.json         # 项目配置和依赖
├── tailwind.config.js   # Tailwind配置
└── vite.config.ts       # Vite配置
```

## 功能说明
1. **专利检索**：支持多条件高级检索
2. **专利比对**：分析多个专利之间的相似度和差异
3. **数据分析**：提供专利风险趋势和分布分析
4. **风险评估**：智能评估专利侵权风险
5. **报告生成**：生成详细的分析报告

## 注意事项
- 项目默认已配置响应式布局，支持PC端和移动端
- 所有数据目前为模拟数据，可根据实际需求对接后端API
- 如果遇到性能问题，可考虑启用CDN和缓存策略
