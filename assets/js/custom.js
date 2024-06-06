$(document).ready(function () {
    // $('.navbar-toggler').click(function () {
    //     $('.toggle-menu-icon').toggleClass('open');
    // })
    $(".nav-link").click(function () {
        if (!$(this).hasClass('active')) {
            $(".nav-link.active").removeClass("active");
            $(this).addClass("active");
        }
    });
    // Toggle Mobile Menu
    $(function () {
        $(".navbar-toggler").on("click", function (a) {
        $('.toggle-menu-icon').toggleClass('open');
        $("#navbar-right").toggleClass("show");
            // a.stopPropagation()
        });
        // $('.navbar-toggler').click(function () {
        //     $('.toggle-menu-icon').toggleClass('open');
        // })
        $(document).on("click", function (a) {
            if ($(a.target).is("#navbar-right") === false) {
                $("#navbar-right").removeClass("show");
                $('.toggle-menu-icon').removeClass('open');
            }
        });
    });
    $(function () {
        var pageScroll = 100;
        $(window).scroll(function () {
            var scroll = getCurrentScroll();
            if (scroll >= pageScroll) {
                $('header').addClass('fixed');
            }
            else {
                $('header').removeClass('fixed');
            }
        });
        function getCurrentScroll() {
            return window.pageYOffset || document.documentElement.scrollTop;
        }
    });
});