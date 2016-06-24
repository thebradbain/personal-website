function GridSizer(prefix, maxHeight) {
    if (!prefix) prefix = "";
    this.vars = {
        navigationItems: $(prefix + " .nav-els").children(),
        maxHeight: maxHeight || $(window).height(),
    },
    this.init = function() {
        this.setRowHeight();
        this.events();
    };
    this.events = function() {
        var that = this;
        $(window).resize(function() {
            that.setRowHeight();
        });
    };
    this.setRowHeight = function() {
        var navigationItems = this.vars.navigationItems;
        var maxHeight = this.vars.maxHeight;

        var numberNavigationItems = navigationItems.length;
        var navigationItemHeight = maxHeight / numberNavigationItems;

        navigationItems.height(navigationItemHeight);
        navigationItems.css("font-size", navigationItemHeight.toString() + "px");

    };
}

var pageLoader = {
    init: function() {
        this.events();
    },
    events: function() {
        var that = this;
        $("#about").click(function() {
            that.loadPage("about.html");
        });
    },
    loadPage: function(page) {
        var that = this;
        $.get("pages/" + page, function(content) {
            var panel = $(".panel");
            panel.html(content);
            that.openPanel();
        });
    },
    openPanel: function(specifier) {
        $(".panel").show();

        var gridSizer = new GridSizer(".panel", ($(".panel").height() - $(".content h2").height()) * 0.7);
        gridSizer.init();

        //automatic scroll - http://stackoverflow.com/a/6677069
        $('html, body').animate({
            scrollTop: $(".panel").offset().top
        }, 500);
    },
    closePanels: function() {
        $(".panel").hide();
    }
};

$(document).ready(function() {
    var gridSizer = new GridSizer();
    gridSizer.init();
    pageLoader.init();

    $('body').flowtype({
        minFont: 14,
        maxFont: 30,
        fontRatio: 35
    });
});