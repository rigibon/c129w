var $curr;
var data = {};
var processing=false;

function showOfferWall() {
	$("#question-wrap, .disclaimer, .choices_s").fadeOut();
	setTimeout(function(){ $('.await-cont, .validate_s').slideDown();},400);
	$(".load_text1").fadeIn(500);
	$('.progress-bar').css({'width':'0%'});
	$('.progress-bar.dub').css({'width':'100%!important'})
	setTimeout(
		function(){
			$('.check1').removeClass('fa-spinner fa-spin').addClass('fa-check-circle').show();
			$('#percent_s').html('30%');
			$('.progress-bar').css({'width':'30%'});
			$(".load_text2").fadeIn(1000);
	}, 3000);
	setTimeout(
		function(){
			$('.check2').removeClass('fa-spinner fa-spin').addClass('fa-check-circle').show();
			$('#percent_s').html('60%');
			$('.progress-bar').css({'width':'60%'});
			$(".load_text3").fadeIn(1000);
	}, 5000);
	setTimeout(
		function(){
			$('.check3').removeClass('fa-spinner fa-spin').addClass('fa-check-circle').show();
			$('#percent_s').html('100%');
			$('.progress-bar').css({'width':'100%'});
	},7500);
	setTimeout(
		function(){
			$('#container-survey, .await-cont').hide();
			$('.reward-page, #thankyou-container, #product-container, .product-container').fadeIn(500);
	}, 8500)
	$("#policy-container, .comment-page,.footer,#how_was_survey_text_container").show();
}

window.onload = function() {
  var fiveMinutes = 30 * 13,
      display = document.querySelector('#time');
  startTimer(fiveMinutes, display);
};

$(document).ready(function(){
  $("#modal_s").modal('show');
  $curr = $("#curr");

  if($('.datehax').length){
    $('.datehax').text(datehax());
  }
   $( "#policy-btn" ).click(function() {	
    $("#policy-wrap").delay("500").fadeIn();
    $("#wrap-content").css("filter", "blur(4px)");
  });
  $( "#policy-close" ).click(function() {	
    $("#policy-wrap").delay("100").fadeOut();
    $("#wrap-content").css("filter", "");
  });
  $( "#terms-btn" ).click(function() {	
    $("#policy-wrap").delay("500").fadeIn();
    $("#wrap-content").css("filter", "blur(4px)");
  });

  $('.continue-btn').click(function() {
	$('#comment-page, .ccp').fadeOut();
    $(".continue-btn").fadeOut();
	$(".time-text").fadeOut();
	 $(".intro-text").slideUp(500,function(){
		 $('.cta').css({'margin-bottom': '30px'});
	 });
	  setTimeout(function(){
		 $('#comment-page, .ccp').addClass('hideComments');
		 $("#question-wrap").show();
	  },500)
    beforeShowQuestion();
  });

});

function days(n){
	var dayData= [];
	$("#days").empty();
	for(var i=1; i<n+1; i++){
			dayData.push(i);
	}
	for(var d=0; d<dayData.length; d++){
		$("#days").append(`<option value="`+dayData[d]+`">`+dayData[d]+`</option>`);
	}
	$("#days").prepend(`<option value="Day" disabled selected>Day</option>`);
}
function daysInMonth() {
		var m=$("select#months").children("option:selected").val();
		var data;
		if(m==2){
		   data= 29;
		   days(data);
		}else if(m==9 || m==4 || m==6 || m==11){
			data= 30;
			days(data);
		}else{
			data= 31
			days(data);
		}		
}
function overflowP(comment){
	if($(comment).hasClass('removeOverflowP')){
		$(comment).removeClass('removeOverflowP');
	   	$(comment).addClass('addOverflowP');
	}else{
	   $(comment).addClass('removeOverflowP');
	  $(comment).removeClass('addOverflowP');
	}
}
function showDisclaimer(){
	if($('.disclaimer_s').hasClass('all_tx')){
		$('.arrow-container i').removeClass('fa-arrow-up').addClass('fa-arrow-down');
		$('.disclaimer_s').removeClass('all_tx');
	}else{
		$('.arrow-container i').addClass('fa-arrow-up').removeClass('fa-arrow-down');
		$('.disclaimer_s').addClass('all_tx');				 
	}
}
function preventS(e){
	  if(e.keyCode == 32 || e.code == "Space") {
		return false;
	  }
}
function comment(){
	if($('#comment_input').val()!=""){
		$('.like-comment, .comment_input_container').hide();
		$('#comment_put').css({'color':'#14d51c'});
		$(`<div class="comment pt-3 row ml-0 dub2stripc">
			<div class="aboutuser flex">
				<div class="user_data">
					<div class="img-col avatar_user imgb1">
						`+imageSquare+`
					</div>
					<div class="name_user">
						Anonymous
					</div>
				</div>
			</div>
			<div class="description_block">
				`+$('#comment_input').val()+`
			</div>
		</div> `
		 ).insertBefore('.comment_input_container');
	}else{
		$('#comment_input').addClass('input_bad');
	}
}
function showModal(){
	$('#modal_claim').modal('show')
}
function showOfferWallU(){
	setTimeout(function(){ $('.await-cont, .validate_s').slideDown();},400);
	$(".load_text1").fadeIn(500);
	$('.progress-bar').css({'width':'0%'});
	$('.progress-bar.dub').css({'width':'100%'})
	setTimeout(
		function(){
			$('.check1').removeClass('fa-spinner fa-spin').addClass('fa-check-circle').show();
			$('.loader_item1').addClass('active');
			$('#percent_s').html('30%');
			$('.progress-bar').css({'width':'30%'});
			$(".load_text2").fadeIn(1000);
			$("#validate_s").addClass("flash");
			setTimeout(function() {
				$("#validate_s").removeClass("flash");
			}, 600);
	}, 3000);
	setTimeout(
		function(){
			$('.check2').removeClass('fa-spinner fa-spin').addClass('fa-check-circle').show();
			$('.loader_item2').addClass('active');
			$('#percent_s').html('60%');
			$('.progress-bar').css({'width':'60%'});
			$(".load_text3").fadeIn(1000);
			$("#validate_s").addClass("flash");
			setTimeout(function() {
				$("#validate_s").removeClass("flash");
			}, 600);
	}, 5000);
	setTimeout(
		function(){
			$('.check3').removeClass('fa-spinner fa-spin').addClass('fa-check-circle').show();
			$('.loader_item3').addClass('active');
			$('#percent_s').html('100%');
			$('.progress-bar').css({'width':'100%'});
			$("#validate_s").addClass("flash");
			setTimeout(function() {
				$("#validate_s").removeClass("flash");
			}, 600);
	},7500);
	setTimeout(
		function(){
			$('#container-survey, .await-cont').hide();
			$('.reward-page, #thankyou-container, #product-container, .product-container').fadeIn(500);
	}, 8500)
	$("#policy-container, .comment-page,.footer,#how_was_survey_text_container").show();
}