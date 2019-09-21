import { request } from '@/utils';

function sign(openId, callback) {
  request({
    url: '/mp/signed',
    method: 'POST',
    data: {
      openid: openId,
    },
  }).then(res => {
    uni.setStorage({
      key: 'signStamp',
      data: new Date().getTime(),
    });
    callback(res);
  });
}

let signTimer = null;

/**
 * 签到
 * @param {Function} request
 * @param {Function} callback
 */
export function handleSign(openId, callback) {
  clearTimeout(signTimer);
  signTimer = setTimeout(() => {
    uni.getStorage({
      key: 'signStamp',
      success(res) {
        const { data } = res;
        if (data) {
          const now = new Date();
          const strDate = now.toLocaleDateString();
          const signedDate = new Date(data);
          const signedStrDate = signedDate.toLocaleDateString();
          if (strDate !== signedStrDate) {
            sign(openId, callback);
          }
        } else {
          sign(openId, callback);
        }
      },
      fail() {
        sign(openId, callback);
      },
    });
  }, 160);
}

/**
 * 获取 用户数据 大力丸数量 排名 登录天数 等信息
 * @param {*} openId 
 */
export const fetchUserData = openId => {
  return request({
    url: '/mp/index',
    method: 'POST',
    data: {
      openid: openId,
    },
  });
};
