$(function() {
    var width = $(window).width(),
        iScrollPos = 0;
    $('a, button').click(function(e) {
        e.preventDefault();
    })
    if (width >= 1024) {
        $('.ad--970by250 img').attr('src', 'assets_new/images/ad-970-250.jpg');
    } else {
        $('.ad--970by250 img').attr('src', 'assets_new/images/ad-300-250-07.jpg');
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

    if (width < 1024) {
        $('article').each(function() {
            $(this).children().children().children('.article__function').children('.article__function--share').clone().insertBefore($(this).children().children('.article__header').children('.article__img')).addClass('article__function--clone mb-m-20');
            $(this).children().children().children('.article__function').children('.article__function--share').clone().insertBefore($(this).children().children('.article__body').children('.author__extended')).addClass('article__function--clone mb-m-20');
        });
    }

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
            $('.ad--970by250 img').attr('src', 'assets_new/images/ad-970-250.jpg');
        } else {
            $('.ad--970by250 img').attr('src', 'assets_new/images/ad-300-250-07.jpg');
        }
    });

    $(window).scroll(function() {
        var windowHeight = $(window).height(),
            scroll = $(this).scrollTop(),
            documentHeigh = $(document).outerHeight(),
            articleImgTop = $('.article__img').offset().top - 65;
        $('header .process span').css('width', (((scroll + windowHeight) / documentHeigh) * 100) + '%');
        $('.article__function').each(function() {
            var articleImgTop = $(this).parent().siblings().children('.article__img').offset().top - 65,
                articleKeywordBottom = $(this).parent().parent().siblings('.author__might').offset().top - (windowHeight / 2);
            if (width >= 1024) {
                if ((scroll >= articleImgTop) && (scroll < articleKeywordBottom)) {
                    $(this).fadeIn(150)
                } else {
                    $(this).fadeOut(150)
                }
            }
        });
        // 往上滾動出現<nav>
        if (scroll >= articleImgTop) {
            $('header').addClass('scroll');
        } else {
            $('header').removeClass('scroll');
        }
    });
    $('main').infinitescroll('binding', 'unbind');
    $('main').data('infinitescroll', null);
    $(window).unbind('.infscr');
    $('main').infinitescroll({
        navSelector: 'a#next:last',
        nextSelector: 'a#next:last',
        itemSelector: 'article',
        dataType: 'html',
        maxPage: 2
    }, function() {
        if (width >= 1024) {
            $('.ad--970by250 img').attr('src', 'assets_new/images/ad-970-250.jpg');
        } else {
            $('.ad--970by250 img').attr('src', 'assets_new/images/ad-300-250-07.jpg');
            $('article').parent().children().eq(2).each(function() {
                var originShare = $(this).children().children().children('.article__function').children('.article__function--share'),
                    newSharePositionTop = $(this).children().children('.article__header').children('.article__img'),
                    newSharePositionBottom = $(this).children().children('.article__body').children('.author__extended');
                originShare.clone().insertBefore(newSharePositionTop).addClass('article__function--clone mb-m-20');
                originShare.clone().insertBefore(newSharePositionBottom).addClass('article__function--clone mb-m-20');
            });
        }
    });
});