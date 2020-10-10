/// <reference path = "./app.d.ts" />
import express from 'express'
import axios from 'axios'
import config from './config'
import morgan from 'morgan'

const app = express()
// 日志
app.use(morgan('short'))
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=http:/xxxx.com&response_type=code&scope=snsapi_base&state=2#wechat_redirect

app.get('/', (req, res) => {
  // 获取到url上的code
  const code = req.query['code']
  let target = config.ID2url[<string>req.query['state']]

  console.log({ code, target })

  if (!(code && target)) {
    res.send('参数缺失or错误 或 目标地址未配置')
  }
  target = encodeURIComponent(target)
  //
  axios
    .get(
      `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appid}&secret=${config.secret}&code=${code}&grant_type=authorization_code`
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

app.listen(config.port)
/* 开启 https 
 * 
 * 
http.createServer(app).listen(80);
https.createServer({  }, app).listen(443);
 * 
 */
