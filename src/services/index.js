function sign(request, callback) {
  request().then(res => {
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
export function handleSign(request, callback) {
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
            sign(request, callback);
          }
        } else {
          sign(request, callback);
        }
        sign(request, callback);
      },
      fail() {
        sign(request, callback);
      },
    });
  }, 160);
}
