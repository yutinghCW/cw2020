$(function() {
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
    // 打開留言
    $(".btn--facebook").click(function() {
        $(this).hide();
        $(this).siblings('.author__message--hide').show();
    });
    // 圖片全螢幕
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
    $(window).scroll(function() {
        var scroll = $(this).scrollTop(),
            widthHeigh = $(window).outerHeight(),
            documentHeigh = $(document).outerHeight(),
            articleImgTop = $('.article__header h1').offset().top,
            articleBodyTop = $('.article__body').offset().top - 80,
            articleFunctionHeight = $('.article__function').outerHeight(),
            articleBodyBottom = $('.newsletter').offset().top - articleFunctionHeight - 135;
        $('header .process span').css('width', (((scroll + widthHeigh) / documentHeigh) * 100) + '%');
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
        if (scroll >= articleImgTop) {
            $('header').addClass('scroll');
        } else {
            $('header').removeClass('scroll');
        }
    })
})