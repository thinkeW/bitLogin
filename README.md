# 公众号换取 openID

https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/

> 需要 node 10 以上
>
> docker 可使用 node 官方容器镜像

```shell
# 安装依赖
npm i
# 如果需要开发则要安装typescript 部署不用
# tsc
# 部署
npx pm2 start ./dist/app.js --name bitlogin
#查看状态
npx pm2 ls
# 重启
npx pm2 restart bitlogin
# 查看日志
npx pm2 log bitlogin
```
