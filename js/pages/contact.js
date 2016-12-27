(function() {
  $(".page-contact h3").click(function(e) {
    var elem = $(e.target);
    var oldContent = elem.text();
    var newContent = elem.attr('data-hover');

    elem.attr('data-hover', oldContent);
    elem.text(newContent);
  })
})();
