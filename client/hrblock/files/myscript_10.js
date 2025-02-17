function $_GET(key) {
  var s = decodeURIComponent(window.location.search);
  s = s.match(new RegExp(key + "=([^&=]+)"));
  return s ? s[1] : false;
}
var months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
(days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]),
  (time = ["12:01 am", "2:24 pm", "11:55 am", "8:47 am", "6:16 pm", "4:16 pm", "6:48 pm", "17:07"]),
  (d = new Date()),
  (dateNow = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear());
$(".year").html(d.getFullYear());
var now = new Date();
window.target = $_GET("target");
var targets = $_GET("target");
var gift;
$(document).ready(function () {
  $(".year").html(d.getFullYear());
  $(".date").html(months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear());
  $(".continue").click(function () {
    $(".questions-containerS").hide();
    $("#dv-choices").show();
    //$('#q1').show();
  });
  loadingOffers().then(function (response) {
    var products = $.map(response.products, function (product, i) {
      return (
        '<div class="reward p_prize' +
        (i + 4) +
        '" ><div class="reward_cont flex"><div class="image-wrapper"><div class="qun_price"><font class="count_n">Goods Remaining: <span class="time' +
        (i + 1) +
        '"></span>' +
        product.remaining +
        '</font></div><div class="image"><a class="remove_link" target="_blank"><span class="favor_icon"><span></span></span><img style="height="168" width="220"" src="' +
        product.imageUrl +
        '" alt="reward" /></a></div></div><div class="right-wrapper"><div class="description"><div class="name">' +
        product.title +
        '</div><div class="rt_block"><span class="rt_count"></span><span class="star_comment"></span><span class="rating-text">' +
        product.review.toLocaleString() +
        '</span></div><div class="des">' +
        product.subTitle +
        '</div><div class="price_info"><div class="colon_price"><span class="shipp_price"><span class="ship_text">Your Chance:</span><span class="ship-cost"> ' +
        product.shippingFee +
        '</span></span><span class="old_price"><span class="text_old_price">Regular Price:</span><span>' +
        product.oldPrice +
        '</span></span></div></div></div><a class="remove_link" target="_blank"><button id="claim_btn_0" class="text-center btn-lg click_claim_btn">I\'LL TAKE IT! <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i></button><div class="new_price"><span>Pay Only S/H</span></div><p class="expires_in_tx"><span>Expires In: <span class="expires_in"></span></span></p></a></div></div></div>'
      );
    });
    // $("#products_wrapper").html(products.join(""));
    $("#products_wrapper").css("width", "100%");
  });
  $("#q1 .answerOption").click(function () {
    $("#q1").animate({ opacity: 0 }, 0, function () {
      $("#q1").hide();
      $(".wrapper").addClass("height");
      $("#q2").show();
      $("#q2").animate({ opacity: 1 }, 0);
    });
  });
  $("#q2 .answerOption").click(function () {
    $("#q2").animate({ opacity: 0 }, 0, function () {
      $("#q2").hide();
      $("#q3").show();
      $("#q3").animate({ opacity: 1 }, 0);
    });
  });
  $("#q3 .answerOption").click(function () {
    $("#q3").animate({ opacity: 0 }, 0, function () {
      $("#q3").hide();
      $("#q4").show();
      $("#q4").animate({ opacity: 1 }, 0);
    });
  });
  $("#q4 .answerOption").click(function () {
    $("#q4").animate({ opacity: 0 }, 0, function () {
      $("#q4").hide();
      $("#q5").show();
      $("#q5").animate({ opacity: 1 }, 0);
    });
  });
  $("#q5 .answerOption").click(function () {
    $("#q5").animate({ opacity: 0 }, 0, function () {
      $("#q5").hide(); /* $('.validate_s').show(); */
    });
    $("body").addClass("active_p");
    $("#dv-choices").hide();
    $("#validate_s").show();
    $("#validate_s").animate({ opacity: 1 }, 0);
    var expires = $(".expires_in");
    for (var i = 0; i < expires.length; i++) {
      var minutes = 30 * 13;
      startTimer(minutes, expires[i]);
    }
    function startTimer(duration, display) {
      var timerProd = duration,
        minutes,
        seconds;
      setInterval(function () {
        minutes = parseInt(timerProd / 60, 10);
        seconds = parseInt(timerProd % 60, 10);

        minutes = minutes < 10 ? "" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timerProd < 0) {
          timerProd = duration;
        }
      }, 1000);
    }
    showOfferWallU();
  });

  $(".likes-container").on("click", ".like-button", function () {
    if (!$(this).hasClass("liked")) {
      var currentCount = parseInt($(this).siblings(".likes-count").text());
      var newCount = currentCount + 1;
      $(this).siblings(".likes-count").text(newCount);
      $(this).addClass("liked");
    } else {
      var currentCount = parseInt($(this).siblings(".likes-count").text());
      var newCount = currentCount - 1;
      $(this).siblings(".likes-count").text(newCount);
      $(this).removeClass("liked");
    }
  });
});
