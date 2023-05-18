function ViewManager(views) {
    var dummyView = new View(View.DUMMY);
        dummyView.setOpposite(dummyView);

    var selected = dummyView;

    var vs = _.values(views);
    vs.forEach((v) => {
        v.addEventListener('mouseover', (evt) => {
            // selectView(v);
        });
        v.addEventListener('mouseout', (evt) => {
            // deselectView(v);
        });
    });

    var listener = new window.keypress.Listener();
    listener.simple_combo('up', _.partial(selectView, views.top));
    listener.simple_combo('down', _.partial(selectView, views.bottom));

    selectView(views.top);
    
    function isViewSelected() {
        return selected != dummyView;
    }
    function selectView(view) {
        if (view === selected) { 
            // Do nothing if view is already selected
            return;
        } 

        selected.setSelected(false); // Deselect old view
        selected = view;
        selected.setSelected(true);

    }

    function deselectView(view) {
        if (view !== selected) {
            throw new Error('Deselected a view which is not selected');
        }

        view.setSelected(false);
        selected = dummyView;
    }

    function sizeChange(perc) {
        perc = Math.min(perc, 98);
        // Change size of selected view
        selected.initSizeChange(perc).start();

        // Consider the views 'opposite' view - we must ensure their sizes add up to 100
        // N.B. For now the behaviour is for the views to fill up 100% at all times - this feels better
        var opp = selected.getOpposite();
        opp.initSizeChange(100 - perc).start();
    }

    function setSrc(src) { // sets the src of currently selected view
        // If no view is selected then select one so that something happens
        if (!isViewSelected()) {
            selectView(views.top); 
        }

        selected.setSrc(src);
    }

    this.sizeChange = sizeChange;
    this.setSrc = setSrc;

}