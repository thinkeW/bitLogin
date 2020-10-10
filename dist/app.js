"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path = "./app.d.ts" />
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("./config"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
// 日志
app.use(morgan_1.default('short'));
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=http:/xxxx.com&response_type=code&scope=snsapi_base&state=2#wechat_redirect
app.get('/', (req, res) => {
    // 获取到url上的code
    const code = req.query['code'];
    let target = config_1.default.ID2url[req.query['state']];
    console.log({ code, target });
    if (!(code && target)) {
        res.send('参数缺失or错误 或 目标地址未配置');
    }
    target = encodeURIComponent(target);
    //
    axios_1.default
        .get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config_1.default.appid}&secret=${config_1.default.secret}&code=${code}&grant_type=authorization_code`)
        .then((RV) => {
        const data = RV.data;
        if (!data.openid) {
            res.json(data);
        }
        else {
            res.redirect(`${target}?openid=${data.openid}`);
        }
    })
        .catch((err) => {
        console.error('err\n', err);
        res.json({
            code: 500,
            msg: 'code 转换openid 请求错误',
        });
    });
});
app.listen(config_1.default.port);
/* 开启 https
 *
 *
http.createServer(app).listen(80);
https.createServer({  }, app).listen(443);
 *
 */
