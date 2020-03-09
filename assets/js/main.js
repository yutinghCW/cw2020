$(function() {
    var width = $(window).width(),
        footerTop = $('footer').offset().top,
        authorMightTop = $('.author__might').offset().top,
        documentHeigh = $(document).outerHeight();
    $('.webaccessbar .bar__titile button').click(function() {
        $(this).toggleClass('active');
        $(this).parent().siblings().slideToggle();
    });
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
        mobileArticle()
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
    })
    $(window).scroll(function() {
        var windowHeight = $(window).height(),
            scroll = $(this).scrollTop(),
            // documentHeigh = $(document).outerHeight(),
            headerHeigh = $('header').outerHeight(),
            breakingHeight = $('.breaking').outerHeight(),
            article1Height = $('article').outerHeight(),
            article2Height = $('article--load').outerHeight(),
            authorMightHeight = $('.author__might').outerHeight(),
            newsletterHeight = $('.newsletter').outerHeight(),
            footerHeight = $('footer').outerHeight(),
            articleImgTop = $('.article__img').offset().top - 65;
        console.log((scroll - headerHeigh - breakingHeight - article1Height), (article2Height + authorMightHeight + newsletterHeight + footerHeight));

        if (scroll < (authorMightTop + authorMightHeight)) {
            $('header .process span').css('width', (((scroll + windowHeight) / (headerHeigh + breakingHeight + article1Height + authorMightHeight)) * 100) + '%');
            var originH1 = $('article').parent().children().eq(0).children('.main--article').children('.article__header').children('h1').text();
            $('header .title').text(originH1);
        } else if (scroll > (authorMightTop - windowHeight)) {
            $('header .process span').css('width', (((scroll - headerHeigh - breakingHeight - article1Height) / (article2Height + authorMightHeight + newsletterHeight + footerHeight)) * 100) / 3.9 + '%');
            var newH1 = $('article').parent().children().eq(1).children('.main--article').children('.article__header').children('h1').text();
            $('header .title').text(newH1);
        }
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
        loading: {
            speed: '500'
        },
        navSelector: 'a#next:last',
        nextSelector: 'a#next:last',
        itemSelector: 'article',
        dataType: 'html',
        maxPage: 2
    }, function() {
        if (width < 1024) {
            $('article').parent().children().eq(2).addClass('article--load').each(function() {
                var originShare = $(this).children().children().children('.article__function').children('.article__function--share'),
                    newSharePositionTop = $(this).children().children('.article__header').children('.article__img'),
                    newSharePositionBottom = $(this).children().children('.article__body').children('.author__extended');
                originShare.clone().insertBefore(newSharePositionTop).addClass('article__function--clone mb-m-20');
                originShare.clone().insertBefore(newSharePositionBottom).addClass('article__function--clone mb-m-20');
            });
        } else {
            imgZoom();
        }
        disabled();
        adBlock();
        $('#infscr-loading').remove();
    })
});