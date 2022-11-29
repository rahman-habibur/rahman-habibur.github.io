
(() => {
    const $ = window.jQuery;

    // Back to top
    let backtotop = $('.back-to-top')[0]
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 120) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop);
        document.addEventListener('scroll', toggleBacktotop);
    }

    // Open and close mobile nav
    $('.mobile-nav-toggle').on('click', function(e) {
        $('body')[0].classList.toggle('mobile-nav-active');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
        $('.mobile-nav-background')[0].classList.toggle('active');
    });

    // Close mobile nav on menu click
    $('#navbar li a').on('click', function(e) {
        $('body')[0].classList.remove('mobile-nav-active');
        this.classList.add('bi-list');
        this.classList.add('bi-x');
        $('.mobile-nav-background')[0].classList.remove('active');
    });

    // Close sidebar on bg click
    $('.mobile-nav-background').on('click', function(e) {
        $('body')[0].classList.remove('mobile-nav-active');
        this.classList.add('bi-list');
        this.classList.add('bi-x');
        $('.mobile-nav-background')[0].classList.remove('active');
    });

    // On load
    $(() => {
        // Scroll with ofset on page load with hash links in the url
        if (window.location.hash && (/^[a-z0-9_-]+$/).test(window.location.hash)) {
            let el = $('#' + window.location.hash);
            if (el) window.scrollTo({
                top: el.offsetTop,
                behavior: 'smooth'
            });
        }

        // Apply tooltips
        $('body').tooltip({
            selector: '[data-toggle=tooltip]'
        });
    });

    // Handle auto menu highlighting
    $(() => {
        var info = [];
        var active = $('#navbar a.active');
        var links = $('#navbar a');

        var init = function() {
            links.each(function() {
                var id = $(this).attr('href');
                if (id[0] === '#' && id.length > 1) {
                    var target = $(id);
                    if (target.length) {
                        info.push([target.offset().top, $(this)]);
                    }
                }
            });
        };

        init();
        $(window).resize(function() {
            init();
        });

        var update = function() {
            var top = $(document).scrollTop();
            var found = false;
            for (var i = info.length - 1; i >= 0; i--) {
                if (info[i][0] <= top + 10) {
                    if (active) active.removeClass('active');
                    active = info[i][1];
                    active.addClass('active');
                    found = true;
                    break;
                }
            };
            if (!found) active.removeClass('active');
        };

        update();
        $(document).scroll(function() {
            update();
        });
    });

})();