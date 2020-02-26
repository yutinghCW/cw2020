$(function() {
    var width = $(window).width();
    if (width >= 1024) {
        $('.ad--970by250 img').attr('src', 'assets_new/images/ad-cartier-970-250.jpg')
    } else {
        $('.ad--970by250 img').attr('src', 'assets_new/images/ad-300-250-04.jpg')
    }
    if (width < 1024) {
        $('.webaccessbar .bar__titile button').click(function() {
            $(this).toggleClass('active');
            $(this).parent().siblings().slideToggle();
        })
    }
    $('a, button').click(function(e) {
            e.preventDefault();
        })
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
})