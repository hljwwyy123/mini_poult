import Store from '@/store/index';
const serverUrl = "https://poult.mttsmart.com";
export function login(data) {
    return new Promise((resolve, reject) => {
        uni.login({
            success(res) {
                if (res.code) {
                    let sessionId = null;
                    uni.getStorage({
                        key: 'sessionId',
                        success: function(storage) {
                            console.log(storage)
                            sessionId = storage.data;
                        },
                        complete: function() {
                            console.log('sessionId = ', sessionId)
                            uni.request({
                                url: serverUrl + "/mp/login",
                                method: "POST",
                                data: {
                                    code: res.code,
                                    ...data
                                },
                                // header: {
                                //     "sessionId": sessionId || 0
                                // },
                                success: loginRes => {
                                    if (loginRes.data.success) {
                                        Store.commit('updateOpenId', loginRes.data.result.openid);
                                        uni.setStorage({
                                            key: 'sessionId',
                                            data: loginRes.data.result.sessionId
                                        });
                                        resolve(loginRes.data.result)
                                    } else {
                                        reject(loginRes.data.message);
                                    }
                                }
                            });
                        }
                    });

                } else {
                    console.log("code获取失败！" + res.errMsg);
                    reject(res.errMsg)
                }
            }
        });
    })
}

export function request(param) {
    uni.getStorage({
        key: 'sessionId',
        success: function(storage) {
            return uni.request({
                ...param,
                url: serverUrl + param.url,
                header: {
                    "sessionId": storage.data
                }
            })
        }
    });
}

export function toast(msg, callback) {
    uni.showToast({
        icon: "none",
        title: msg,
        duration: 2000,
        success() {
            if (callback && typeof callback == 'function') {
                callback()
            }
        }
    })
}
export function promisify(fn) {
    return function(obj = {}) {
        return new Promise((resolve, reject) => {
            obj.success = function(res) {
                resolve(res)
            }

            obj.fail = function(res) {
                reject(res)
            }

            fn(obj)
        })
    }
}
export function loadImage(_src) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = _src;
    })
}

function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}
export const getHrefKeyValue = function(url) {
    var result = {};
    var resultValue = "";
    var reg = new RegExp("([\\?|&](.+?)=([^&?#]*))", "ig");
    var arr = reg.exec(url);
    while (arr) {
        result[arr[2]] = arr[3];
        arr = reg.exec(url)
    }
    return result;
}

export const getAddDayDate = (AddDayCount) => {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? ('0' + (dd.getMonth() + 1)) : (dd.getMonth() + 1);
        var d = dd.getDate() < 10 ? ('0' + dd.getDate()) : dd.getDate();
        return y + "-" + m + "-" + d;
    }
    /**
     * @param page 小程序页面路由
     * @param param 参数
     * @param type 获取二维码方式 unlimit 不限制生成二维码数量，但是参数不能超过32个字符。非unlimit方式，每天10w个码，参数128个字符
     */
export const getWXQrcode = (page, param, type = 'unlimit') => {
    return new Promise((resolve, reject) => {
        let requestUrl = type === 'unlimit' ? '/tickets/wxcode/getWxacodeUnlimit' : '/tickets/wxcode/getwxacode';
        mfwSdk.request({
            url: requestUrl,
            method: "GET",
            data: {
                "data_decorate": {
                    "page": page,
                    "param": param
                }
            },
            beforeSend: function() {
                uni.showToast({
                    title: '生成中',
                    icon: 'loading',
                    mask: true,
                });
            },
            success: function(res) {
                resolve(res)
                uni.hideToast();
            },
            fail: function(error) {
                reject(error)
            }
        })
    })
}

export function autoUpdateManager() {
    if (uni.canIUse('getUpdateManager')) {
        const updateManager = uni.getUpdateManager()
        updateManager.onCheckForUpdate(function(res) {
            console.log("检查是否有新版本 ", res)
        });
        updateManager.onUpdateReady(function() {
            uni.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启小程序？',
                success: function(res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        })
    }
}

export function formatScore(num) {
    return num;
}