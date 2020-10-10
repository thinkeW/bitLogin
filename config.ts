// 跳转配置，key:value，
// key => 业务id
// value => 业务地址
const ID2url: { [key: string]: string } = {
  appa: 'http://qq.com',
}

const ED = {
  ID2url,
  port: 3000, //端口
  appid: 'wx251f8bda035be26e', //
  secret: '90b2bb3541618609189c97f898c343e8', //
}

export default ED
