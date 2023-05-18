    function readingView() {
        var loc = document.location;
        var uri = {
            spec: loc.href,
            host: loc.host,
            prePath: loc.protocol + "//" + loc.host,
            scheme: loc.protocol.substr(0, loc.protocol.indexOf(":")),
            pathBase: loc.protocol + "//" + loc.host + loc.pathname.substr(0, loc.pathname.lastIndexOf("/") + 1)
        };
        var readingDoc = document.cloneNode(true);

        var article = new Readability(uri, readingDoc, {debug: false}).parse();

        var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false);
        var nodes = [];
        while (tw.nextNode()) {
            nodes.push(tw.currentNode);
        }

        nodes
        .forEach((n) => {
            if (n.style) {
                n.style.transition = '0.5s opacity ease-in-out';
                n.style.opacity = 0;
            }
        });

        var readingContent = document.createElement('div');
        readingContent.setAttribute('class', 'reading-content');
        readingContent.innerHTML = article.content;
        document.body.appendChild(readingContent);
        setTimeout(() => {
          readingContent.style.opacity = 1;
      }, 100);
    }