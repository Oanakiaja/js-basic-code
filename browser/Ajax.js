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
// 请求图片
var xmlhttp;
xmlhttp = new XMLHttpRequest();
xmlhttp.open(
  'GET',
  'http://10.10.0.62:10001/api/charge/admin/v1/image/code',
  true,
);
xmlhttp.responseType = 'blob';
xmlhttp.onload = function () {
  console.log(this);
  if (this.status == 200) {
    var blob = this.response;
    var img = document.createElement('img');
    img.onload = function (e) {
      window.URL.revokeObjectURL(img.src);
    };
    img.src = window.URL.createObjectURL(blob);
    document.body.appendChild(img);
  }
};
xmlhttp.send();
// fetch
fetch(url, {
  body: JSON.stringify(data), // must match 'Content-Type' header
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, same-origin, *omit
  headers: {
    'user-agent': 'Mozilla/4.0 MDN Example',
    'content-type': 'application/json',
  },
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, cors, *same-origin
  redirect: 'follow', // manual, *follow, error
  referrer: 'no-referrer', // *client, no-referrer
  credentials: 'include', // *cors cookie, *include,same-origin,omit
}).then((response) => response.json()); // parses response to JSON
