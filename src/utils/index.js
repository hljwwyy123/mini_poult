import Store from '@/utils/store';

export function toast(msg, callback) {
    wx.showToast({
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
                    wx.showToast({
                        title: '生成中',
                        icon: 'loading',
                        mask: true,
                    });
                },
                success: function(res) {
                    resolve(res)
                    wx.hideToast();
                },
                fail: function(error) {
                    reject(error)
                }
            })
        })
    }
    /**
     * 根据 appid + openid 获取 mfw 账号信息
     * 如获取到绑定信息 会自动登录 setLogin ，并且返回 mfw 账号相关信息
     * 如没有获取到绑定信息 什么都不会做
     */
export function getUserInfo(successCallback, failCallback) {
    mfwSdk.getMfwUserInfo({
        login: mfwSdk.LOGIN_GENTLE, // 非必须，默认为mfwSdk.LOGIN_GENTLE
        success: function(res) {
            if (res && res.wxInfo) {
                Store.commit('updateOpenId', res.wxInfo.openid);
            }
            if (res.userInfo) {
                syncOpenidAndUid(res.wxInfo.openid, res.userInfo.uid);
                Store.commit('updateMfwUserLogo', res.userInfo.logo);
                Store.commit('updateMfwUserName', res.userInfo.name);
                Store.commit('updateMfwUserId', res.userInfo.uid);
                Store.commit('updateHasBindTel', res.userInfo.verify);
                console.log('登录成功', res);
            } else {
                console.log('未绑定');
            }
            if (successCallback && typeof successCallback === 'function') {
                successCallback(res);
            }
        },
        fail: function() {
            if (failCallback && typeof failCallback === 'function') {
                failCallback();
            }
            console.log('获取失败')
        }
    });
}

export function autoUpdateManager() {
    if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function(res) {
            console.log("检查是否有新版本 ", res)
        });
        updateManager.onUpdateReady(function() {
            wx.showModal({
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