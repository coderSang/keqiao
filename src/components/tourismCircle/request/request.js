const baseUrl = 'http://192.168.1.48:9498'
import store from "@/store";
export function aboutCircle(param) {
  //GET或POST
  if (param.method) {
    param.method = param.method.toUpperCase();//小写改为大写
  }
  let url = baseUrl + param.url,
    header = param.header,
    data = param.data

  return uni.request({
    url,
    method: param.method || "GET",
    header: header || {'content-type': "application/json"},
    data: data || {},
  })
}

export function uploadImage(params) {
  let tempFilePaths =params.tempFilePaths,
    url = baseUrl + params.url,
    name = params.name,
    formData = params.formData
  return uni.uploadFile({
    url:url,
    filePath:tempFilePaths,
    name:name,
    formData:formData
  });
}
