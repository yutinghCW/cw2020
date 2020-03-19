$(function() {
    var width = $(window).width(),
        height = $(window).height(),
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
    // 手機版分享用
    function mobileArticle() {
        $('article').each(function() {
            $(this).children().children().children('.article__function').children('.article__function--share').clone().insertBefore($(this).children().children('.article__header').children('.article__img')).addClass('article__function--clone mb-m-20');
            $(this).children().children().children('.article__function').children('.article__function--share').clone().insertBefore($(this).children().children('.article__body').children('.author__extended')).addClass('article__function--clone mb-m-20');
        });
    }
    if (width < 1024) {
        // mobileArticle()
    }

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
        $('.author__next').css('top', ($('.article__body').outerHeight() * 0.8) - $('.author__next').outerHeight());
    })

    $(window).scroll(function() {
        var windowHeight = $(window).height(),
            scroll = $(this).scrollTop(),
            articleBodyTop = $('.article__body').offset().top - 80,
            articleHeight = $('.article__body').outerHeight(),
            articleNextStart = (articleHeight * 0.8) - articleNextHeight,
            articleNextBottom = $('.author__might').offset().top - articleNextHeight - 120,
            articleHeaderBottom = $('.article__header').offset().top + $('.article__header').outerHeight() - 105;
        $('.article__function').each(function() {
            var articleTop = $(this).parent('article').offset().top - 105,
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
        // $('.author__next').each(function() {
        //     var articleBodyTop = $('.article__body').offset().top - 80,
        //         articleHeight = $('.article__body').outerHeight(),
        //         articleNextStart = (articleHeight * 0.8) - articleNextHeight,
        //         articleNextBottom = $('.author__might').offset().top - articleNextHeight - 120;
        //     if (width >= 1024) {
        //         if (scroll >= (articleBodyTop + articleNextStart - 10)) {
        //             $('.author__next').addClass('author__next--fixedtop');
        //         } else {
        //             $('.author__next').removeClass('author__next--fixedtop');
        //             $('.author__next').css('top', articleNextStart);
        //         }
        //         if (scroll >= articleNextBottom) {
        //             $('.author__next').addClass('author__next--fixedbottom');
        //         } else {
        //             $('.author__next').removeClass('author__next--fixedbottom');
        //         }
        //     } else {
        //         if ((scroll >= (articleBodyTop + (articleHeight * 0.8) - height)) && (scroll < ($('.author__might').offset().top + $('.author__next').outerHeight() + 60 - height))) {
        //             $('.author__next').fadeIn()
        //         } else {
        //             $('.author__next').fadeOut()
        //         }
        //     }
        // })
        if ($('.ad--970by250').outerHeight() > 10) {
            if (scroll >= $('.ad--970by250').outerHeight()) {
                $('header, .ad--970by250').addClass('fixed');
            } else {
                $('header, .ad--970by250').removeClass('fixed');
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
        itemSelector: 'main',
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