$(function() {
    var width = $(window).width(),
        articleNextHeight = Math.round($('.author__next').outerHeight()),
        iScrollPos = 0;
    $('a, button').click(function(e) {
        e.preventDefault();
    })
    if (width < 1024) {
        $('.article__function--other').clone().insertBefore('.article__img, .author__intro').addClass('article__function--clone');
        $('.article__function--share').clone().prependTo('.container--default');
        $('.list__group').each(function() {
            $(this).append('<button class="btn btn--text">顯示更多</button>');
            var liLength = $(this).children().length;
            $(this).children().slice((liLength / 2), (liLength - 1)).hide();
            $(this).children('button').click(function() {
                $(this).hide();
                $(this).siblings().show();
            })
        });
        $('.article__body').css({
            'padding-bottom': articleNextHeight
        })
    }
    $('.webaccessbar .bar__titile button').click(function() {
        $(this).toggleClass('active');
        $(this).parent().siblings().slideToggle();
    });
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
    // 當tooltips大於等於15字
    $(".tooltips").each(function() {
        if ($(this).data("tooltips").length >= 15) {
            $(this).addClass("tooltips-wrap");
        }
    });
    // 打開小辭典
    $(".more").each(function() {
        $(this).click(function() {
            $(this).siblings('.more__text').slideToggle({
                start: function() {
                    jQuery(this).css('display', 'block');
                }
            });
        })
    });
    // 圖片全螢幕
    if (width >= 1024) {
        $('.imgzoom').each(function() {
            var imgcode = $(this).data('zoom');
            $(this).click(function() {
                $('body').addClass('message__open');
                $('.black').addClass('opened black-fullscreen');
                $('.img--fullscreen img').attr('src', imgcode);
                $('.img--fullscreen').fadeIn();
            })
        });
    }
    if (width < 1024) {
        var footerLength = $('footer > .container > .channel__group').length;
        $('footer > .container > .channel__group > h4').click(function() {
            $(this).toggleClass('active');
            $(this).siblings('.channel').slideToggle();
            $(this).parent().siblings().children('.channel').slideUp();
            $(this).parent().siblings().children('h4').removeClass('active');
            $(this).parent().parent().children().last().children('.channel__group').children('.channel').slideUp();
            $(this).parent().parent().children().last().children('.channel__group').children('h4').removeClass('active');
        })
        $('footer > .container > .channel__group > .channel__group > h4').click(function() {
            $(this).toggleClass('active');
            $(this).siblings('.channel').slideToggle();
            $(this).parent().siblings().children('.channel').slideUp();
            $(this).parent().siblings().children('h4').removeClass('active');
            $(this).parent().parent().siblings().children('.channel').slideUp();
            $(this).parent().parent().siblings().children('h4').removeClass('active');
        })
    };
    $('.black, .fullscreen__close').click(function() {
        $('.img--fullscreen').fadeOut();
        $('.img--fullscreen img').attr('src', '');
        $('body').removeClass('message__open');
        $('.black').removeClass('opened black-fullscreen');
    });
    $('.author__next').css('top', ($('.article__body').outerHeight() * 0.8) - $('.author__next').outerHeight());
    $(window).resize(function() {
        var width = $(window).width();
        if (width >= 1024) {
            $('.ad--970by250 img').attr('src', 'assets_new/images/ad-970-250.jpg')
        } else {
            $('.ad--970by250 img').attr('src', 'assets_new/images/ad-300-250-07.jpg')
        }
    });
    $(window).on('scroll resize', function() {
        var height = $(window).height(),
            scroll = $(this).scrollTop(),
            iCurScrollPos = $(this).scrollTop(),
            articleImgTop = $('.article__img').offset().top,
            articleBodyTop = $('.article__body').offset().top - 80,
            articleFunctionHeight = $('.article__function').outerHeight(),
            articleHeight = $('.article__body').outerHeight(),
            articleNextStart = (articleHeight * 0.8) - articleNextHeight,
            articleNextBottom = $('.author__might').offset().top - articleNextHeight - 145,
            articleMight = $('.author__might').offset().top,
            articleBodyBottom = $('.author__might').offset().top - articleFunctionHeight - 115;
        if (width >= 1024) {
            if ((scroll >= articleBodyTop) && (scroll < articleBodyBottom)) {
                $('.article__function').addClass('article__function--fixedtop');
            } else {
                $('.article__function').removeClass('article__function--fixedtop');
            }
            if (scroll >= articleBodyBottom) {
                $('.article__function').addClass('article__function--fixedbottom');
            } else {
                $('.article__function').removeClass('article__function--fixedbottom');
            }
            if (scroll >= (articleBodyTop + articleNextStart - 10)) {
                $('.author__next').addClass('author__next--fixedtop');
            } else {
                $('.author__next').removeClass('author__next--fixedtop');
                $('.author__next').css('top', articleNextStart);
            }
            if (scroll >= articleNextBottom) {
                $('.author__next').addClass('author__next--fixedbottom');
            } else {
                $('.author__next').removeClass('author__next--fixedbottom');
            }
        } else {
            console.log(scroll, (articleBodyTop + (articleHeight * 0.8) - height - articleNextHeight));
            if (scroll >= (articleBodyTop + (articleHeight * 0.8) - height + articleNextHeight + 40)) {
                $('.author__next').addClass('author__next--fixedtop');
            } else {
                $('.author__next').removeClass('author__next--fixedtop');
                $('.author__next').css('top', articleNextStart);
            }
            if (scroll >= (articleMight - height + 20)) {
                $('.author__next').addClass('author__next--fixedbottom');
            } else {
                $('.author__next').removeClass('author__next--fixedbottom');
            }
        }
        // 往上滾動出現<nav>
        if (iCurScrollPos < iScrollPos) {
            $("header").addClass("fixed");
        } else {
            $("header").removeClass("fixed");
        }
        iScrollPos = iCurScrollPos;
        if (scroll >= articleImgTop) {
            $('header').addClass('scroll');
        } else {
            $('header').removeClass('scroll');
        }
    });
});