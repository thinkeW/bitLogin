interface resErr {
  errcode?: number
  errmsg?: string
}
interface resSueccss {
  access_token?: string
  expires_in?: number
  refresh_token?: string
  openid?: string
  scope?: string
}

type resData = resErr & resSueccss
