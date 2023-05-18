function Demo() {
    var el = document.createElement('div');
    var listener = new window.keypress.Listener();

    var cb = new ControlBar();
    el.appendChild(cb.el);

    var ns = new NotificationService(2000);
    el.appendChild(ns.el);

    var notification = ns.emit.bind(ns);

    notification('Shift-Space to search.');
   
    var allPas = [];

    function noResultsNotification(query) {
        notification('No DuckDuckGo search results for the query <i>' + query +'</i>.');
    }
    function processQuery(query) {
        if (query.charAt(0) === '/') {
            // In this case, consider it a command
            if (query === '/clear') { // Remove all cards
                allPas.forEach((pa) => {pa.toggle(() => {
                    el.removeChild(pa.el);
                })});
                allPas.splice(0, allPas.length);
            }
        } else {
            Ddg.query(query, handleQueryResponse, _.partial(noResultsNotification, query));
        }
    }
    function handleQueryResponse(res) {
            var queryStr = res.query;
            res = res.data;
            var allCards = []; 
            if(res.RelatedTopics.length === 0) { // Stop if there are no results
                return noResultsNotification(queryStr);
            }
            // Partition related topics into cards and further topics
            var [cards, topics] = _.partition(res.RelatedTopics, (item) => 'Text' in item);
            allCards = allCards.concat(cards);

            // Extract cards from topics
            _.pluck(topics, 'Topics').forEach((cards) => {
                allCards = allCards.concat(cards);
            });

            // Filter out the cards without images
            allCards = allCards.filter((card) => card.Icon.URL);
            if (_.isEmpty(allCards)) {
                // Display message
                // snackbarNotification('No DuckDuckGo Search results for the query ' + queryStr +'.');
                return;
            }

            var cardTemplate = document.getElementById('cardTemplate');

            var cardPas = allCards
                .map((card) => {
                    var cardDiv = cardTemplate.cloneNode(true);
                    cardDiv.id = '';

                    cardDiv.querySelector('.mdl-card__title').style.backgroundColor = '#417BBA';
                    // Heading
                    var heading = cardDiv.querySelector('h2');
                    heading.textContent = queryStr;
                    // Img
                    var img = cardDiv.querySelector('img');
                    img.src = card.Icon.URL;
                    // img.className = 'hidden'; 

                    if (!card.Icon.URL) {
                        img.className = 'hidden'; 
                    }

                    // Text
                    var p = cardDiv.querySelector('.card-text');
                    p.innerHTML = card.Text;

                    // IFrame
                    var iframe = document.createElement('iframe');
                    iframe.className = 'hidden';
                    // iframe.src = card.FirstURL;
                    el.appendChild(iframe);
                    var iframePa = new PerspectiveAnimatable(iframe, 200);

                    cardDiv.addEventListener('click', () => {
                        if (iframePa.isActive()) {
                            iframePa.toggle(() => {
                                iframe.className = 'hidden';
                            });
                        } else {
                            iframe.className = '';
                            if (iframe.src) {
                                iframePa.toggle();
                            } else {
                                iframe.src = card.FirstURL;
                                iframe.onload = () => {
                                    iframePa.toggle();
                                };                                            
                            }
                        }
                      
                    });

                    // Actions
                    var actions = cardDiv.querySelector('.card-actions > a');
                    actions.textContent = 'Read More';
                    actions.setAttribute('href', card.FirstURL);

                    return new PerspectiveAnimatable(cardDiv, 400);
                });
           
            cardPas.forEach((cardPa) => {
                    el.appendChild(cardPa.el);
                    allPas.push(cardPa);
                    cardPa.toggle();
            });

    }

    cb.addEventListener('query', function (evt) {
        var query = evt.detail.query;
        processQuery(query);
    });

    cb.toggle(); // Activated by default;
    listener.simple_combo('shift space', cb.toggle.bind(cb));
    listener.simple_combo('esc', () => {
        if (cb.isActive()) {
            cb.toggle();
        }
    });

    this.dom = el;
    this.animate = function(t) {
        TWEEN.update(t);
    };
}
