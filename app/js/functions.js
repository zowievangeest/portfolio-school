/*
 Author: Zowie van Geest
 Version: 1.0
*/

(function () {

    /* ==============================================
     Page Scroll
     =============================================== */

    $('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 40
                }, 900);
                return false;
            }
        }
    });

    /*====================================
     Show Menu
     ======================================*/
    $(window).bind('scroll', function() {
        var navHeight = $(window).height() - 100;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
    });

    $('body').scrollspy({
        target: '.navbar-default',
        offset: 80
    });


    /*====================================
     Mobile Menu
     ======================================*/

    $(".nav a, .navbar-header a").click(function(event) {
        // check if window is small enough so dropdown is created
        $(".navbar-collapse").removeClass("in").addClass("collapse");
    });

    /*====================================
     Back to Top
     ======================================*/

    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }



    $('[data-toggle="modal"]').on('click', function (e) {
       $('.portfolio-box-caption').hide();
    });

    $('[data-dismiss="modal"]').on('click', function () {
        $('.portfolio-box-caption').show();
    });


    AOS.init({
        disable: window.innerWidth < 1024
    });


}());


