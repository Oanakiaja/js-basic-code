const getJSON = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.response));
      }
    };
  });
};
