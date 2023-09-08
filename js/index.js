function Http() {}

Http.get = function (url, cb) {
    let req = new XMLHttpRequest()
    req.responseType = 'json'
    req.addEventListener('load', function (evt) {
        cb(req.response)
    })
    req.open('GET', url)
    req.send()
}

window.addEventListener('load', function () {
    Http.get('experiments.json', function (data) {
        addExperiments(
            document.querySelector('#other-experiments .experiment-previews'),
            data.experiments,
            true
        )
        addExperiments(
            document.querySelector('#technical-tests .experiment-previews'),
            data.tests,
            true
        )
    })

    let tagWrap = function (tagName, el) {
        let tagEl = document.createElement(tagName)
        tagEl.appendChild(el)
        return tagEl
    }

    let hrefWrap = function (el, href) {
        let a = tagWrap('a', el)
        a.href = href
        return a
    }

    let pWrap = tagWrap.bind(null, 'p')
    let experimentsPerRow = 3

    function addExperiments(ul, experiments, showDesc) {
        let lis = experiments.map(function (info, i) {
            let article = document.createElement('article')
            article.classList.add('experiment-preview')

            let h2 = document.createElement('h2')
            h2.textContent = info.name
            article.appendChild(hrefWrap(h2, info.href))

            let screen = document.createElement('img')
            screen.src = info.href + 'thumb.png'
            screen.width = 256
            screen.height = 256
            article.appendChild(hrefWrap(screen, info.href))

            if (i % experimentsPerRow === 0) {
                article.classList.add('clear')
            }

            if (showDesc) {
                let desc = document.createElement('div')
                desc.classList.add('experiment-desc')

                let short_description = document.createElement('div')
                short_description.innerHTML = info.desc
                desc.appendChild(short_description)

                let long_decs = info.long_description;
                if(long_decs !== "") {
                    let long_description = document.createElement('div')
                    long_description.innerHTML = long_decs;
                    long_description.style.display = 'none'
                    desc.appendChild(long_description)

                    let toggle = document.createElement('a');
                    toggle.textContent = 'Read More';
                    toggle.classList.add('toggle-button');
                    toggle.style.display = 'block';
                    toggle.style.marginTop = '10px';
                    toggle.style.color = 'blue';
                    toggle.style.cursor = 'pointer';
                    desc.appendChild(toggle);

                    toggle.addEventListener('click', function () {
                    if (long_description.style.display === 'none') {
                        long_description.style.display = 'block';
                        toggle.textContent = 'Read Less';
                    } else {
                        long_description.style.display = 'none';
                        toggle.textContent = 'Read More';
                    }
                    });
                }

                article.appendChild(desc);
            }

            return article
        })

        // Add the preview elements to dom
        lis.forEach(function (li) {
            ul.appendChild(li)
        })
    }

})
