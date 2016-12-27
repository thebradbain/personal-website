$(function(){
  'use strict';
  var options = {
    prefetch: true,
    cacheLength: 2,
    onStart: {
      duration: 300, // Duration of our animation
      render: function ($container) {
        // Add your CSS animation reversing class
        $container.addClass('animated fadeOut');

        // Restart your animation
        smoothState.restartCSSAnimations();
      }
    },
    onReady: {
      duration: 300,
      render: function ($container, $newContent) {
        // Remove your CSS animation reversing class
        $container.removeClass('animated fadeOut');

        // Inject the new content
        $container.hide();
        $container.html($newContent);
        $container.show();

        $container.addClass('animated fadeIn');
      }
    },
    onAfter: {
      render: function ($container) {
        // Remove your CSS animation intro class
        $container.removeClass('animated fadeIn');
      }
    }
  },
  smoothState = $('#content').smoothState(options).data('smoothState');
});
