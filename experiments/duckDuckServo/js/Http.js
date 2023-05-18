function Http() {

}

Http.get = function(url, cb, onError) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.addEventListener('load', (evt) => {
        if (req.status.toString()[0] != 2 ) {
            if (onError) {
                onError({status: req.status});
            }

            return;
        }
        cb(req.response);
    });

    req.addEventListener('error', onError ? onError : () => {});
    req.open('GET', url);
    req.send();
};