function Ddg() {

}

Ddg.query = (function() {
    var options = {
        'useragent': navigator.userAgent,
        'format': 'json',
        'pretty': '1',
        'no_redirects': '1',
        'no_html': '0',
        'skip_disambig': '0'
    };

    function getURL(query) {
        return 'https://api.duckduckgo.com/?q=' + encodeURIComponent(query) + '&format=' + options.format + '&t=' + encodeURIComponent(options.useragent)+ '&pretty=' + options.pretty + '&no_redirects=' + options.no_redirects + '&no_html=' + options.no_html + '&skip_disambig=' + options.skip_disambig;
    }

    return function(q, cb, onError) {
        Http.get(getURL(q), function (res) {
            cb({query: q, data: res})
        }, onError)
    };

})();

