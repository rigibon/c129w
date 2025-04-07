$(document).ready(function () {

    function endGame() {
        $('.questionaire').fadeOut(200);
        $('.end').delay(400).fadeIn(200);
        $('.end-button').delay(600).fadeIn(200);

    };

    var allQuest = $('.question');
    var allAnsw = $('.answer');
    allQuest.css({
    }).hide();
    allAnsw.css({
    }).hide();

    var currIdx = 0;
    allQuest.first().fadeIn(300);
    allAnsw.first().fadeIn(300);


    function next() {
        var nextIdx = currIdx + 1;
        if (nextIdx >= allQuest.length)
            endGame();
        allQuest.eq(currIdx).delay(100).fadeOut(200);
        allAnsw.eq(currIdx).delay(100).fadeOut(200);
        allQuest.eq(nextIdx).delay(400).fadeIn(200);
        allAnsw.eq(nextIdx).delay(400).fadeIn(200);
        currIdx = nextIdx;
    }

    $('.survey-button').one("click", function (evt) {
        evt.preventDefault();
        next();
    });
});