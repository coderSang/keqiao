const baseUrl = 'http://192.168.1.48:9498'

export function getCurrentCircle(param) {
  //GET或POST
  if (param.method) {
    param.method = param.method.toUpperCase();//小写改为大写
  }
  let url = baseUrl + param.url,
    header = param.header,
    data = param.data,
    token = "";

  return uni.request({
    url,
    method: param.method || "GET",
    header: header || {'content-type': "application/json"},
    data: data || {},
  })
}
