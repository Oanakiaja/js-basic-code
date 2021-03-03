//使用Promise实现网络请求超时判断，超过三秒视为超时。 借助的是Promise.race这个方法：
const uploadFile = (url, param) => {
  return Promise.race([uploadFilePromise(url, param), uploadTimeout(3000)]);
};

const uploadFilePromise = (url, param) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    Object.keys(param).forEach((key) => {
      formData.append(key, param[key]);
    });
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'form-data',
      },
      body: formData,
      withCredential: true,
    }).then((res) => {
      if (res.status === 200) {
        resolve(res.json());
      }
    });
  });
};

const uploadFileTimeout = (time) => {
  return new Promise((res) => {
    setTimeout(() => {
      res({ msg: '超时' });
    }, time);
  });
};
