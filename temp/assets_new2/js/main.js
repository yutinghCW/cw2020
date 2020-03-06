$(function() {
    $('a, button').click(function(e) {
        e.preventDefault();
    })
    var width = $(window).width();
    if (width >= 1024) {
        $('.ad--970by250 img').attr('src', 'assets_new/images/ad-cartier-970-250.jpg')
    } else {
        $('.ad--970by250 img').attr('src', 'assets_new/images/ad-300-250-04.jpg')
    }
    if (width < 1024) {
        $('.article__function').clone().insertBefore('.article__img, .author__message').addClass('article__function--clone');
        // $('.article__function--added').clone().prependTo('.container--default');
    }
    // 當tooltips大於等於15字
    $(".tooltips").each(function() {
        if ($(this).data("tooltips").length >= 15) {
            $(this).addClass("tooltips-wrap");
        }
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
    // 打開留言
    $(".btn--facebook").click(function() {
        $(this).hide();
        $(this).siblings('.author__message--hide').show();
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
    }
    $('.black, .fullscreen__close').click(function() {
        $('.img--fullscreen').fadeOut();
        $('.img--fullscreen img').attr('src', '');
        $('body').removeClass('message__open');
        $('.black').removeClass('opened black-fullscreen');
    })
    $(window).resize(function() {
        var width = $(window).width();
        if (width >= 1024) {
            $('.ad--970by250 img').attr('src', 'assets_new/images/ad-cartier-970-250.jpg')
        } else {
            $('.ad--970by250 img').attr('src', 'assets_new/images/ad-300-250-04.jpg')
        }
    });
    $(window).scroll(function() {
        var windowHeight = $(window).height(),
            scroll = $(this).scrollTop(),
            documentHeigh = $(document).outerHeight(),
            articleTop = $('main > .main > article').offset().top,
            articleHeight = $('main > .main > article').height(),
            articleKeywordTop = $('.article__keyword').offset().top,
            articleImgTop = $('.article__header h1').offset().top,
            articleBodyTop = $('.article__body').offset().top - 90,
            articleFunctionHeight = $('.article__function').outerHeight(),
            articleNextHeight = $('.author__next').outerHeight(),
            articleFunctionBottom = $('.author__might').offset().top - articleFunctionHeight - 162,
            articleNextBottom = $('.author__might').offset().top - articleNextHeight - 120,
            articleDiff = articleKeywordTop - articleTop,
            articleDiffRatio = (1 / articleDiff) * $(document).scrollTop(),
            articleLastestDiff = $('.author__lastest .list__group').height() - $('.author__lastest').height(),
            articleLastestScrollTop = articleDiffRatio * articleLastestDiff * 1.25;
        $('header .process span').css('width', (((scroll + windowHeight) / documentHeigh) * 100) + '%');
        if (scroll >= articleImgTop) {
            $('header').addClass('scroll');
        } else {
            $('header').removeClass('scroll');
        }
        if (width >= 1024) {
            if (scroll >= articleBodyTop) {
                $('.article__function').addClass('article__function--fixedtop');
            } else {
                $('.article__function').removeClass('article__function--fixedtop');
            }
            if (scroll >= articleFunctionBottom) {
                $('.article__function').addClass('article__function--fixedbottom');
            } else {
                $('.article__function').removeClass('article__function--fixedbottom');
            }
            if (scroll >= (articleKeywordTop - 60 - 30)) {
                $('.author__next').addClass('author__next--fixedtop');
            } else {
                $('.author__next').removeClass('author__next--fixedtop');
                $('.author__next').css('top', (articleKeywordTop - articleTop));
            }
            if (scroll >= articleNextBottom) {
                $('.author__next').addClass('author__next--fixedbottom');
            } else {
                $('.author__next').removeClass('author__next--fixedbottom');
            }
            if (scroll >= (articleTop - 80)) {
                $('.author__lastest').scrollTop(articleLastestScrollTop);
            } else {
                $('.author__lastest').scrollTop(0);
            }
            $('.author__lastest').css({
                'height': windowHeight - 90 - 30
            });
            $('main > .main > aside').css({
                'padding-bottom': articleHeight - articleKeywordTop + articleTop + 30
            });
            $('.author__next').css('top', (articleKeywordTop - articleTop));
        }
    });
});