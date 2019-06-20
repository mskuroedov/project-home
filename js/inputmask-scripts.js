$(document).ready(function () {


    // $('[data-inputmask],[data-inputmask-regex]').inputmask({
    //     jitMasking: true
    // });

    $('input[required]').on('focusout', function () {
// console.log($(this))
        if ($(this).attr('data-inputmask')) {

            if ($(this).inputmask("isComplete")) {
                if ($(this).hasClass('error')) {
                    $(this).removeClass('error')
                }
            } else {
                $(this).addClass('error');
            }
        } else {
            if ($(this).val() === '') {
                $(this).addClass('error');
            } else {
                if ($(this).hasClass('error')) {
                    $(this).removeClass('error')
                }
            }
        }

    });
});
