(function() {
    var noneSelected = {
            el: document.createElement('div'),
            active: true,
            toggle: function() {}
    }; // dummy 

    var selected = noneSelected;

    Array.from(document.querySelectorAll('.book-tab'))
        .map(function (el) {
            var content = el.querySelector('.book-tab-content'),
                active = false;

            return {
                toggle: function() {
                    if (active) {
                        el.style.width = '140px';
                        content.style.opacity = '0';
                        content.style.pointerEvents = 'none';
                    } else {
                        el.style.width = 'calc(100vw - 560px - 12px - 2px)';
                        content.style.opacity = '1';
                        content.style.pointerEvents = 'auto';

                    }
                    active = !active;
                },
                el: el
            };
        })
        .forEach(function (tab) {
            // Animate in the book tab
            setTimeout(function() {
                tab.el.style.transform = 'translateX(0vw)'
            }, 500);

            tab.el.addEventListener('click', function(evt) {
                if (selected === tab) {
                    selected = noneSelected;
                    return tab.toggle();
                }   
                selected.toggle();
                tab.toggle();
                selected = tab;
        });
    });
})();