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
    pageLoader.init();

    /*$('body').flowtype({
        minFont: 14,
        maxFont: 30,
        fontRatio: 35
    });*/
});