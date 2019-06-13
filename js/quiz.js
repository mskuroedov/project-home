var step = 3;

function quizStart() {
    $('#quiz').fadeIn();
    showStep(step);
    $('body').css('overflow', 'hidden');
}

function quizStop() {
    $('#quiz').fadeOut();
    $('body').css('overflow', '');
}

function showStep(n) {
    $('[quiz-step]').fadeOut();
    setTimeout(function () {
        $('[quiz-step=' + n + ']').fadeIn();
    }, 500)
}

function showNextStep() {
    step++;
    showStep(step);
}

function showPrevStep() {
    step--;
    showStep(step);
}

function finishQuiz() {
    // alert('finished');
    quizStop();
    step = 0;
    $('#quiz input[type="text"]').val('');
    $('#quiz input[type="checkbox"]').prop('checked', false);
}

$('#quiz-btn').on('click', quizStart);
$('#quiz .close-btn').on('click', quizStop);
