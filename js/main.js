$(document).ready(function () {
    $("#our-works").lightGallery({
        thumbnail: false,
        download: false
    });
    $("#real-build").lightGallery({
        thumbnail: false,
        download: false
    });
    $("#feedback").lightGallery({
        thumbnail: false,
        download: false
    });
    var etapCarousel = $('.etaps');
    etapCarousel.owlCarousel({
        items: 5,
        responsive: {
            0: {
                items: 1,
                dotsEach: 4
            },
            768: {
                items: 6,
                dotsEach: 4
            }
        }
    });
    $('.etaps__container .owl-btn-left').on('click', function () {
        etapCarousel.trigger('prev.owl.carousel')
    });
    $('.etaps__container .owl-btn-right').on('click', function () {
        etapCarousel.trigger('next.owl.carousel')
    });
});


// $('.block-4').parallax({imageSrc: 'assets/block-4-bg.jpg'});
$(".block-4 .parallax").paroller({ factor: 0.2, factorXs: .1, });


//input float

$('.form_input input').on('focus', function () {
    $(this).next().addClass('floating');
})
$('.form_input input').on('focusout', function () {
    if ($(this).val() !== '') {
        $(this).next().addClass('floating');
    } else {
        $(this).next().removeClass('floating');
    }
});

//last-app input file


function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

//last app
// let files_container = $('.files__container');
// let text = $('.block-13 .text');
//
// $('.upload-icon,.upload-icon+.text').on('click', function () {
//     $('#files-input').val('');
//     $('#files-input').click();
//     files_container.hide();
//     files_container.empty();
// });
// $('#files-input').on('change', function () {
//     let files = $('#files-input').prop('files');
//     if (files.length === 0) {
//         files_container.hide();
//         text.show();
//         files_container.empty();
//         return;
//     }
//
//     Object.keys(files).forEach(item => {
//
//         files_container.append('<div class="file-name">' + files[item].name + '</div>')
//     });
//     text.hide();
//     files_container.show();
// });


//forms
$('#small-app button[type="submit"]').on('click', function (e) {
    $('.error-text').fadeOut();
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/small-form.php',
        data: $("#small-app").serialize(),
        success: function (data) {
            if (data.result) {
                $('#small-app .error-block').fadeOut();
                $('#small-app .success-block').fadeIn();
                $('#small-app button').attr('disabled', true);
                setTimeout(function () {
                    $('#small-app .success-block').fadeOut();
                    $('#small-app input').val('');
                    $('#small-app input').trigger('focusout');
                    $('#small-app button').attr('disabled', false);
                }, 3000)
            } else {
                $('#small-app .error-block').text(data.message);
                $('#small-app .error-block').fadeIn();
            }
        }
    })
});
$('#last-form button[type="submit"]').on('click', function (e) {
    $('.error-text').fadeOut();
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/last-form.php',
        data: $("#last-form").serialize(),
        success: function (data) {
            if (data.result) {
                // alert('form success')
                $('#last-form .error-block').fadeOut();
                $('#last-form .success-block').fadeIn();
                $('#last-form button').attr('disabled', true);
                setTimeout(function () {
                    $('#last-form .success-block').fadeOut();
                    $('#last-form input,#last-form textarea').val('');
                    $('#last-form button').attr('disabled', false);
                }, 3000)
            } else {
                // alert(data.message);
                $('#last-form .error-block').text(data.message);
                $('#last-form .error-block').fadeIn();
            }
        }
    })
});

$('header .nav-item a').on('click', function (e) {
    e.preventDefault();
    let el = document.querySelector(e.target.attributes.href.value)
    let offset = $(e.target.attributes.href.value).offset().top;
    window.scroll({
        top: offset,
        left: 0,
        behavior: 'smooth'
    });
});
