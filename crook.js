/**
* @file
* Main Javascript file.
*/

var CrookedMedia = {
  /**
  * Define Bootstrap Breakpoints
  */
  breakpoints: {
    xs: 0,
    sm: 768,
    md: 992,
    lg: 1200
  },

  /**
  * A namespace for all JS modules.
  * @namespace
  */
  Modules: {},

  /**
  * A namespace for standard library functions.
  * @namespace
  */
  Lib: {

    /**
    * Get the current breakpoint to use.
    * @returns {number}
    */
    getCurrentBreakpoint: function(){
      var windowWidth = $(window).width();

      if(windowWidth < CrookedMedia.breakpoints.sm){
        return CrookedMedia.breakpoints.xs;
      }else if(windowWidth >= CrookedMedia.breakpoints.sm && windowWidth < CrookedMedia.breakpoints.lg){
        return CrookedMedia.breakpoints.sm;
      }else if (windowWidth >= CrookedMedia.breakpoints.lg){
        return CrookedMedia.breakpoints.lg;
      }else{
        return 0;
      }
    },

    /**
    * Get a url parameter value
    * @param sParam
    * @returns {*}
    */
    getUrlParameter: function(sParam){
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
          return sParameterName[1];
        }
      }
      return false;
    },

    /**
    * Smooth scroll to an element on the page.
    * @param fromElement
    * @param toElement
    * @param duration
    */
    smoothScrollOnClick: function(fromElement, toElement, duration){
      $(fromElement).on('click', function(e){
        e.preventDefault();
        if(!$(toElement).length)return;
        $('html, body').animate({
          scrollTop: $(toElement).offset().top + 'px'
        }, duration, 'swing');
      });
    },

    /**
    * Apply equal heights to multiple elements inside of a container.
    * @param object $page Jquery object of the page container. E.g. $('.content-grants')
    * @param object $container Jquery object of the container element. E.g. $('.content-grants .row')
    * @param string el Class of the elements inside of the container. E.g. '.grant .content-top'
    * @param integer bp Breakpoint above which the equal heights takes affect.
    *
    * E.g.
    // Grant Overview Page: Grant top content
    CrookedMedia.Lib.equalHeights($('.content-grants'), $('.content-grants .row'), '.grant .top-content', 767);
    */
    equalHeights: function($page, $container, el, bp){
      if($page.length){
        $(window).on('load resize', function(){
          if($(window).width() > bp){
            // Reset before setting.

            $container.find(el).each(function() {
              if ($(this).css('background-image').length) {
                $(this).attr('bg-image', $(this).css('background-image'));
              }
              $(this).attr('style', '');
            });
            // Iterate over container elements.
            $container.each(function(){
              var h = 0;
              // Iterate over target elements.
              $(this).find(el).each(function(){
                var elHeight = $(this).height();
                if(elHeight > h)
                h = elHeight;
              });
              // Apply height to target elements.
              $(this).find(el).height(h);
            });
          }else{
            // Remove element styling.
            $container.find(el).each(function() {
              if ($(this).css('background-image').length) {
                $(this).attr('bg-image', $(this).css('background-image'));
              }
              $(this).attr('style', '');
            });
          }

          $container.find(el).each(function() {
            if ($(this).attr('bg-image').length) {
              $(this).css('background-image', $(this).attr('bg-image'));
            }
          });
        });
      }
    },

  },

  /**
  * Initialize all custom JS modules when document finishes loading.
  */
  initialize: function() {
    // *Note: Should be loaded in dependency order.
    var modules = [
      'Global',
      'Home',
      'Search',
      'Podcast',
      'Hive',
      'Newsletter'
    ];

    for (var i = 0; i < modules.length; i++) {
      new CrookedMedia.Modules[modules[i]]();
    }
  }

};
