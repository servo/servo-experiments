function Http() {

}

Http.get = function(url, cb) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.addEventListener('load', (evt) => {cb(req.response);});
    req.open('GET', url);
    req.send();
};