/// <reference path = "./app.d.ts" />
import express from 'express'
import axios from 'axios'
import morgan from 'morgan'
import url from 'url'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
// 日志
app.use(morgan('short'))
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  // res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=http:/xxxx.com&response_type=code&scope=snsapi_base&state=2#wechat_redirect

// 重定向到微信登陆
app.get('/', (req, res) => {
  let target = key2url(<string>req.query['state'])
  const redirectOther = Boolean(<string>req.query['redirectOther'])
  if (!target) {
    res.json({
      code: 403,
      msg: '参数缺失or错误 或 目标地址未配置',
    })
    return
  }
  let myhost = url.format({
    protocol: req.protocol,
    host: req.get('host'),
  })
  myhost += '/code2openid'
  // 重定向
  res.redirect(
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
      process.env.APPID
    }&redirect_uri=${encodeURIComponent(
      redirectOther ? target : myhost
    )}&response_type=code&scope=snsapi_base&state=${req.query['state']}#wechat_redirect`
  )
})

app.get('/code2openid', (req, res) => {
  // 获取到url上的code
  const code = req.query['code']
  let target = key2url(<string>req.query['state'])

  console.log({ code, target })

  if (!(code && target)) {
    res.json({
      code: 403,
      msg: '参数缺失or错误 或 目标地址未配置',
    })
    return
  }
  target = encodeURIComponent(target)
  //
  axios
    .get(
      `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.APPID}&secret=${process.env.SECRET}&code=${code}&grant_type=authorization_code`
    )
    .then((RV) => {
      const data: resData = RV.data
      if (!data.openid) {
        res.json(data)
      } else {
        res.redirect(`${target}?openid=${data.openid}`)
      }
    })
    .catch((err) => {
      console.error('err\n', err)
      res.json({
        code: 500,
        msg: 'code 转换openid 请求错误',
      })
    })
})

console.log(app.listen(process.env.PORT).address())

/* 开启 https 
 * 
 * 
http.createServer(app).listen(80);
https.createServer({  }, app).listen(443);
 * 
 */

function key2url(key: string): string {
  return process.env[key] || ''
}
