$(function() {
    var width = $(window).width(),
        height = $(window).height(),
        authorMightTop = $('.author__might').offset().top,
        authorMightHeight = $('.author__might').outerHeight(),
        articleNextHeight = Math.round($('.author__next').outerHeight());
    $('.webaccessbar .bar__titile button').click(function() {
        $(this).toggleClass('active');
        $(this).parent().siblings().slideToggle();
    });
    if (width < 1024) {
        var footerLength = $('footer > .container > .channel__group').length;
        $('footer > .container > .channel__group > h4').click(function() {
            console.log('a');
            $(this).toggleClass('active');
            $(this).siblings('.channel').slideToggle();
            $(this).parent().siblings().children('.channel').slideUp();
            $(this).parent().siblings().children('h4').removeClass('active');
        })
    }
    // 讓所有連結失效
    function disabled() {
        $('a, button').click(function(e) {
            e.preventDefault();
        })
    }
    disabled();
    // 判斷有沒有值
    $("input").each(function() {
        if (this.value) {
            $(this).parent().addClass('hasValue');
        }
        $(this).on('change keyup copy paste cut', function() {
            if (!this.value) {
                $(this).parent().removeClass('hasValue');
            } else {
                $(this).parent().addClass('hasValue');
            }
        })
    });

    function input() {
        $("input").parent().addClass('form__group--defalt');
        $("input[disabled]").parent().removeClass('form__group--defalt').addClass('form__group--disabled');
    };
    input();
    $("input").change(function() {
        input();
    });
    // 打開小辭典
    function openDictionary() {
        $(".more").each(function() {
            $(this).click(function() {
                $(this).siblings('.more__text').slideToggle({
                    start: function() {
                        jQuery(this).css('display', 'block');
                    }
                });
            })
        });
    }
    openDictionary();
    // 圖片全螢幕
    function imgZoom() {
        $('.imgzoom').each(function() {
            var imgcode = $(this).data('zoom');
            $(this).click(function() {
                $('body').addClass('message__open');
                $('.black').addClass('opened black-fullscreen');
                $('.img--fullscreen img').attr('src', imgcode);
                $('.img--fullscreen').fadeIn();
            })
        });
        $('.black, .fullscreen__close').click(function() {
            $('.img--fullscreen').fadeOut();
            $('.img--fullscreen img').attr('src', '');
            $('body').removeClass('message__open');
            $('.black').removeClass('opened black-fullscreen');
        })
    }
    if (width >= 1024) {
        imgZoom();
    }

    function adBlock() {
        $('[class*="ad "]').each(function() {
            if ($(this).height() < 200) {
                $(this).hide();
            }
        })
    }
    $(window).load(function() {
        adBlock();
    })

    $(window).scroll(function() {
        var windowHeight = $(window).height(),
            scroll = $(this).scrollTop(),
            articleBodyTop = $('.article__content').offset().top - 80,
            articleHeight = $('.article__content').outerHeight(),
            articleNextStart = (articleHeight * 0.8) - articleNextHeight,
            articleNextBottom = $('.author__might').offset().top - articleNextHeight - 120,
            articleHeaderBottom = $('.article__header').offset().top + $('.article__header').outerHeight() - 105;
        $('.article__function').each(function() {
            var articleTop = $(this).parent('.article__body').offset().top - 105,
                authorMightTop = $(this).siblings('.author__might').offset().top;
            if (width >= 1024) {
                if ((scroll >= articleTop) && (scroll <= (authorMightTop - (windowHeight / 2) - ($(this).outerHeight() / 2) - 40))) {
                    $(this).fadeIn(150)
                } else {
                    $(this).fadeOut(150)
                }
            }
        });
        // 往上滾動出現<nav>
        if (scroll >= articleHeaderBottom) {
            $('header').addClass('scroll');
        } else {
            $('header').removeClass('scroll');
        }
        // if (scroll < (authorMightTop + authorMightHeight)) {
        //     var originH1 = $('article').parent().children().eq(0).children('.main--article').children('.article__header').children('h1').text();
        //     $('header .title').text(originH1);
        // } else if (scroll > (authorMightTop - windowHeight)) {
        //     var newH1 = $('article').parent().children().eq(1).children('.main--article').children('.article__header').children('h1').text();
        //     $('header .title').text(newH1);
        // }
        $('.author__next').each(function() {
            var articleBodyTop = $(this).parent('.article__content').offset().top - 80,
                articleHeight = $(this).parent('.article__content').outerHeight(),
                articleNextHeight = Math.round($(this).outerHeight()),
                articleNextStart = (articleHeight * 0.8) - articleNextHeight,
                articleNextBottom = $(this).parent('.article__content').siblings('.author__might').offset().top - articleNextHeight - 120;
            if (width >= 1024) {
                if ((scroll >= (articleBodyTop + (articleHeight * 0.8) - height)) && (scroll < ($(this).parent('.article__content').siblings('.author__might').offset().top + $(this).outerHeight() + 10 - height))) {
                    $(this).fadeIn()
                } else {
                    $(this).fadeOut()
                }
            }
        })
        if ($('.ad--970by250').outerHeight() > 10) {
            if (scroll >= $('.ad--970by250').outerHeight()) {
                $('header, body > .ad--970by250').addClass('fixed');
            } else {
                $('header, body > .ad--970by250').removeClass('fixed');
            }
        } else {
            $('header, body').addClass('fixed');
        }
    });
    $('main').infinitescroll('binding', 'unbind');
    $('main').data('infinitescroll', null);
    $(window).unbind('.infscr');
    $('main').infinitescroll({
        loading: {
            speed: '500'
        },
        navSelector: 'a#next:last',
        nextSelector: 'a#next:last',
        itemSelector: '.ad--970by250, article',
        dataType: 'html',
        maxPage: 2
    }, function() {
        if (width >= 1024) {
            imgZoom();
        }
        disabled();
        adBlock();
        $('#infscr-loading').remove();
    })
});