  window.addEventListener('load', function() {
        var activateReadingView = _.once(readingView);
        document.getElementById('readingViewButton').addEventListener('click',activateReadingView);
        // setTimeout(activateReadingView, 1000);
    });

    function transition(time, prop, easing) {
        return time + 's ' + prop + ' ' + easing;  
    }

    function mirrorComputedStyles(el, srcEl, props) {
        let compStyle = getComputedStyle(srcEl);
        props.forEach((prop) => {
            el.style[prop] = compStyle[prop];
        });
    }

    function getAbsolutePosition(el) {
        let left = 0;
        let top = 0;
        if (el.offsetParent) {
            do {
                left += el.offsetLeft;
                top += el.offsetTop;
            } while (el = el.offsetParent)
        }
        return [left, top];
    }

    function createLayer() {
        let layer = document.createElement('div');
        layer.setAttribute('class', 'layer');
        document.body.appendChild(layer);
        return layer;
    }

    function readingView() {
        // Make layer used for intermediate div positioning;
        let layer = createLayer();
       
        let selectAll = 'iframe, h1, h2, h3, h4, h5, h6, img, p, a, .remove, .ad';
        let keepCopies = [];
        // Creates 'absolutely' positioned copies for each element in the article, placed over the originals.  The original underlying elements are hidden. 
        Array.from(document.querySelectorAll(selectAll)).forEach((el) => {
            // Create copy from original
            let copy = el.cloneNode(false);
            copy.innerHTML = el.innerHTML;
            copy.classList.add('copy');
            // Copy styles
            mirrorComputedStyles(copy, el, ['width', 'height']);
            
            // Position the copy and add it to the body
            let [left, top] = getAbsolutePosition(el);
            copy.style.position = 'absolute';
            copy.style.left = left + 'px';
            copy.style.top = top + 'px';
            document.body.appendChild(copy);

            // Hide the original
            el.style.border = '5px solid red'; // Required to force Servo to redraw el - due to an issue with async updates. See https://github.com/servo/servo/issues/11891
            el.style.visibility = 'hidden';

            /*
             If this element is marked to be kept in the reading view then add another 'intermediate' 
             copy of it to the layer, to give it a target for where it should be animated to.
            */
            if (el.classList.contains('keep')) {
                let intermediateClone = el.cloneNode(true);
                // intermediateClone.style.visibility = 'visible';
                intermediateClone.classList.remove('keep');
                intermediateClone.classList.add('reading');
                keepCopies.push([copy, intermediateClone]); // Pair of copy, then tween target
                layer.appendChild(intermediateClone);
            }
        });

        removeNonReadingViewContent();
        transitionReadingViewContent();

        function removeNonReadingViewContent() {
            // Animate out everything not marked as 'keep'
            Array.from(document.querySelectorAll(selectAll))
            .filter((el) => !el.classList.contains('keep'))
            .forEach((el) => {
                var transitionTimeInSeconds = 1;
                el.style.transition = transition(transitionTimeInSeconds, 'left', 'ease-in-out');
                el.style.left = '-1500px';
                setTimeout(() => {
                    el.remove();
                }, transitionTimeInSeconds * 1000); // Remove the element once it has finished transitioning
            });
        }

        function transitionReadingViewContent() {
            // Transition the reading view 'copies' into final positions, using the target divs as reference
            let transitionTime = 0.8; 
            keepCopies.forEach((pair, i) => {
                let [copy, target] = pair;
                let tst = _.partial(transition, transitionTime, _, 'ease-in-out');

                // Setup transitions
                copy.style.transition = ['top', 'left', 'width', 'height', 'transform'].map(tst).join(', ');
                copy.classList.add('reading');
                
                // Calculate position of the intermediate target div
                let [left, top] = getAbsolutePosition(target);
                // Transition the element to its final position
                copy.style.top = top + 'px';
                copy.style.left = left + 'px';
                copy.style.transform = 'rotateY(360deg)';
                mirrorComputedStyles(copy, target, ['width', 'height']);
            });

            /*
                Manually tween all the font sizes as font-size transition not yet working in Servo
                It is the same transition for each so it can be done with one tween.
            */
            var font = {size: 100};
            new TWEEN.Tween(font)
                .to({size: '120'}, transitionTime * 1000)
                .onUpdate(
                    () => {
                        keepCopies.forEach((pair) => {
                                pair[0].style.fontSize = font.size + '%';
                            }
                        );
                    }
                )
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
        }

    }

    requestAnimationFrame(animate);

    function animate(t) {
        requestAnimationFrame(animate);
        TWEEN.update(t);
    }