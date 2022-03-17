## 初始化

```bash
$ npm install
```

## 启动项目

```bash
# 开发模式
$ npm run start

# 热更新模式
$ npm run start:dev

# 生产模式
$ npm run start:prod
```

## 测试

```bash
# 单元测试
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 简介

使用 Nest.js 搭建相关的疫情小程序 API 服务支持

- 接入 Alibaba 疫情防控相关 API

## 数据库

使用 mongodb 数据库
相关 npm 包：mongoose @nestjs/mongoose

# Windows 本机启动 mongodb 数据库

## Windows 系统下的开发配置

启动 redis, cd 到 redis 所在目录运行

```bash
redis-server.exe redis.windows.conf
```

```bash
# 在管理员模式下启动 mongodb 数据库
net start MongoDB
# 连接数据库
mongo -u 账号 -p 密码
```

项目中根目录建立.env 文件，里面写入 MongoDB 连接路径地址

```bash
MONGO_URL=mongodb://你的账号:你的密码@localhost:27017/epidemic-server
```
