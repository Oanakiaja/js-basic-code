const jsonp = ({ url, params, callbackName }) => {
  const generateUrl = () => {
    let dataSrc = '';
    for (let key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        dataSrc += `${key}=${params[key]}&`;
      }
    }
    dataSrc += `callback=${callbackName}`;
    return `${url}?${dataSrc}`;
  };
  return new Promise((resolve, reject) => {
    const ele = document.createElement('script');
    ele.src = generateUrl();
    document.body.appendChild(ele);
    window[callbackName] = (data) => {
      resolve(data);
      document.removeChild(ele);
    };
  });
};
