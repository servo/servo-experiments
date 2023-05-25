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

                let originalDesc = document.createElement('div')
                originalDesc.innerHTML = info.desc
                desc.appendChild(originalDesc)

                let long_description = document.createElement('div')
                long_description.innerHTML = info.long_description
                long_description.style.display = 'none'
                desc.appendChild(long_description)

                let toggleButton = document.createElement('a');
                toggleButton.textContent = 'Read More';
                toggleButton.classList.add('toggle-button');
                toggleButton.style.display = 'block';
                toggleButton.style.marginTop = '10px';
                toggleButton.style.color = 'blue';
                toggleButton.style.cursor = 'pointer';
                desc.appendChild(toggleButton);

                toggleButton.addEventListener('click', function () {
                  if (long_description.style.display === 'none') {
                    long_description.style.display = 'block';
                    toggleButton.textContent = 'Read Less';
                  } else {
                    long_description.style.display = 'none';
                    toggleButton.textContent = 'Read More';
                  }
                });
          
                article.appendChild(desc);
            }

            return article
        })

        // Add the preview elements to dom
        lis.forEach(function (li) {
            ul.appendChild(li)
        })
    }

    requestAnimationFrame(animate)
    function animate(t) {
        requestAnimationFrame(animate)

        TWEEN.update(t)
    }
})
