# 公众号换取 openID

https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/

> 需要 node 12 以上
>
> docker 可使用 node 官方容器镜像

```shell
# 安装依赖
npm i
# 如果需要开发则要安装typescript
# tsc
# 部署
npx pm2 start ./dist/app.js
```

### 查看日志

```shell
npx pm2 log
```
