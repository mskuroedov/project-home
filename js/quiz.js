var step = 0;
var mssg = '';
var quizData = {};


function quizStart() {
    $('#quiz').fadeIn();
    showStep(step);
    $('body').css('overflow', 'hidden');
}

function quizStop() {
    $('#quiz').fadeOut();
    $('body').css('overflow', '');
}

function addData(step) {
    switch (step) {
        case 0:
            quizData.floors = [];
            $('[quiz-step="0"] input:checked').each(function () {
                quizData.floors.push($(this).next().text());
            });
            // console.log('success')
            // console.log(quizData)
            break;
        case 1:
            quizData.meters = $('[quiz-step="1"] input').val();
            // console.log('success')
            // console.log(quizData)
            break;
        case 2:
            quizData.material = [];
            $('[quiz-step="2"] input:checked').each(function () {
                quizData.material.push($(this).next().text());
            });
            // console.log('success')
            // console.log(quizData)
            break;
        case 3:
            quizData.style = $('[quiz-step="3"] input:checked + label span').text();
            // console.log('success')
            // console.log(quizData)
            break;
        case 4:
            quizData.name = $('[quiz-step="4"] input').val();
            // console.log('success')
            // console.log(quizData)
            break;
        case 5:
            quizData.phone = $('[quiz-step="5"] input:eq(0)').val();
            quizData.mail = $('[quiz-step="5"] input:eq(1)').val();
            // console.log('success')
            // console.log(quizData)
            break;
        default:
            break;

    }
}

function showStep(n) {
    $('[quiz-step]').fadeOut();
    setTimeout(function () {
        $('[quiz-step=' + n + ']').fadeIn();
    }, 500)
}

function showError(msg) {
    $('.quiz .error__block .msg').text(msg);
    $(".quiz").animate({scrollTop: 0}, "slow");
    $('.quiz .error__block').fadeIn();
    $('.quiz .btn-primary').prop('disabled', true);
    setTimeout(function () {
        $('.quiz .error__block').fadeOut();
        $('.quiz .btn-primary').prop('disabled', false);
    }, 1000)
}

function checkAnswer(stepN) {
    switch (stepN) {
        case 0:
            if ($('[quiz-step=' + stepN + '] input:checked').length !== 0) {
                return true;
            } else {
                mssg = "Пожалуйста, выберите хотя-бы один пункт!";
                return false;
            }
            break;
        case 1:
            if ($('[quiz-step=' + stepN + '] input').val() !== '' && $.isNumeric($('[quiz-step=' + stepN + '] input').val())) {
                return true;
            } else if ($('[quiz-step=' + stepN + '] input').val() === '') {
                mssg = "Пожалуйста, заполните поле!";
                return false;
            } else {
                mssg = "Поле должно содержать цифровое значение!";
                return false;
            }
            break;
        case 2:
            if ($('[quiz-step=' + stepN + '] input:checked').length !== 0) {
                return true;
            } else {
                mssg = "Пожалуйста, выберите хотя-бы один пункт!";
                return false;
            }
            break;
        case 3:
            if ($('[quiz-step=' + stepN + '] input:checked').length !== 0) {
                return true;
            } else {
                mssg = "Пожалуйста, выберите стиль дома!";
                return false;
            }
            break;
        case 4:
            if ($('[quiz-step=' + stepN + '] input').val() !== '') {
                return true;
            } else {
                mssg = "Пожалуйста, заполните поле!";
                return false;
            }
            break;
        case 5:
            if ($('[quiz-step=' + stepN + '] input').val() !== '') {
                return true;
            } else {
                mssg = "Пожалуйста, заполните поле!";
                return false;
            }
            break;
        default:
            break;
    }
}

function showNextStep() {
    if (checkAnswer(step)) {
        addData(step);
        step++;
        showStep(step);
    } else {
        showError(mssg)
    }
}

function showPrevStep() {
    step--;
    showStep(step);
}

$('.finish-quiz').on('click', function () {
    if ($('[quiz-step="5"] input:eq(0)').val() === '' || $('[quiz-step="5"] input:eq(1)').val() === '') {
        mssg = "Пожалуйста, заполните поля!";
        showError(mssg);
        return false;
    }
    addData(5);

    var data = new FormData();

    data.append('name', quizData.name)
    data.append('mail', quizData.mail)
    data.append('style', quizData.style)
    data.append('phone', quizData.phone)
    data.append('material', quizData.material)
    data.append('floors', quizData.floors)
    $.ajax({
        type: 'post',
        url: '/quiz-form.php',
        data: data,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (data) {
            if (data.result) {
                $('#quiz .success__block').fadeIn();
                setTimeout(function () {
                    $('#quiz .success__block').fadeOut();
                    quizStop();
                }, 1000);
                step = 0;
                quizData = {};
                $('#quiz input[type="text"]').val('');
                $('#quiz input[type="checkbox"]').prop('checked', false);
            } else {
                mssg = data.message;
                showError(mssg)
            }
        }
    });
});

$('#quiz-btn').on('click', quizStart);
$('#quiz .close-btn').on('click', quizStop);
