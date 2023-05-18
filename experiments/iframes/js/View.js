function View(type, url) {
    var div = document.createElement('div');

    div.id = type;
    div.className = 'view';
    div.textContent = '+';

    var frameContainer = document.createElement('div');
    frameContainer.style.height = '100%';
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.innerText = url;
    iframe.style.display = 'block';

    frameContainer.appendChild(iframe);

    div.appendChild(frameContainer);

    var sizeSpan = document.createElement('span');
    div.appendChild(sizeSpan);

    var animTime = 500;
    var size = {
        w: 100,
        h: 50
    };
    var isSelected = false;
    var oppositeView = null;

    setSelected(false);
    updateSize();

    function updateSize() {
        if (type === View.TOP) {
            div.style.height = size.h + 'vh';
        } else if (type === View.BOTTOM) {
            div.style.top = (100 - size.h) + 'vh';
            div.style.height = size.h + 'vh';
        }
        sizeSpan.textContent = size.h.toFixed(2) + '%';
    }

    function initSizeChange(perc) {
        return new TWEEN.Tween(size).to({h: perc}, animTime)
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .onUpdate(updateSize);
    }

    function setSelected(s) {
        isSelected = s;
        div.style.opacity = isSelected ? View.OPACITY_LEVEL.selected :
                            View.OPACITY_LEVEL.deselected;
    }

    this.addEventListener = div.addEventListener.bind(div);
    this.el = div;
    this.initSizeChange = initSizeChange;
    this.setSelected = setSelected;

    this.getWidth = () => size.w;
    this.getHeight = () => size.h;

    this.isTop = () => type === View.TOP;
    this.isBottom = () => type === View.BOTTOM;
    this.isLeft = () => type === View.LEFT;
    this.isRight = () => type === View.RIGHT;
    this.getType = () => type;

    this.setOpposite = (ov) => oppositeView = ov;
    this.getOpposite = () => oppositeView;

    this.setSrc = (src) => iframe.src = src;
}

View.TOP = 'topView';
View.BOTTOM = 'bottomView';
View.LEFT = 'leftView';
View.RIGHT = 'rightView';

View.DUMMY = 'dummyView';

View.OPACITY_LEVEL = {
    selected: '1',
    deselected: '0.4'
};