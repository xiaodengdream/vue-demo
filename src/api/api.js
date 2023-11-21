//封装接口调用
import service from "../service";
//登录
export function login(urlType, data) {
    return service({
        method: 'post',
        url: urlType,
        data
    })
}