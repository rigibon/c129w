function $_GET(key) {
    var s = decodeURIComponent(window.location.search);
    s = s.match(new RegExp(key + '=([^&=]+)'));
    return s ? s[1] : false;
}
var dmn = $_GET('domain');
var redirect_url = 'https://'+ dmn +'/click.php?lp=1';
var back_url_link =  'https://settpl.com/';
var
months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
time = ["12:01 am", "2:24 pm", "11:55 am", "8:47 am", "6:16 pm", "4:16 pm", "6:48 pm", "17:07"],
d = new Date(),
dateNow = months[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear();
if($('.message').length){
    var el = $('.message');
    el.html(el.html().replace(/To claim, simply answer a few quick questions regarding your experience with us./ig, "For your chance to claim your tier 1 reward, simply answer a few quick questions regarding your experience."));
}
if($('.message').length){
    var el = $('.message');
    el.html(el.html().replace(/You've been chosen to receive a brand new /ig, "You’ve been chosen for the chance to receive a brand new"));
}
if($('.thankyou-text_s').length){
    var el = $('.thankyou-text_s');
    el.html(el.html().replace(/Please don't leave this page as we will have no choice to give another visitor a chance to choose a reward./ig, "Please don’t leave this page as products are limited."));
}
if($('.thankyou-text_s_b').length){
    var el = $('.thankyou-text_s_b');
    el.html(el.html().replace(/Please don't leave this page as we will have no choice to give another visitor a chance to choose a reward./ig, "Please don’t leave this page as products are limited."));
}
$(document).ready(function(){
    $("head").append('<link rel="stylesheet" type="text/css" href="../addstyle.css" />');
    $('.attent').html('<b style="font-weight: 700;"><i class="att_img"></i>Attention: This survey offer expires today, <b class="date-full"></b></b>');
    $('.thankyou-text_s_b').append('<span class="promo_code">✓	Successfully redeemed coupon code <b>SECRETSHOP<b class="year">2023</b></b></span>');
    $('.thankyou-text_s').append('<span class="promo_code">✓	Successfully redeemed coupon code <b>SECRETSHOP<b class="year">2023</b></b></span>');
    $('#buttonLink').html('I\'LL TAKE IT! <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>');
    $('.thankyou-text_s span:first').html('Please choose your <b>(1)</b> exclusive offer.');
    $('.frs_ttx').html('You\'ve been chosen to receive a brand new tier 1');
    $('.top_bar.hd-top').html('<div></div><div></div><div></div><div></div>');
    $('.copyright').html('Copyright © <span class="year"></span> <a id="policy-btn">Privacy Policy</a> | <a id="terms-btn">Terms and Conditions</a>');
    $('.year').html(d.getFullYear());
    for (let i = 1; i <= 15; i++) {
        $('.comment').eq(i - 1).addClass(`comm${i}`);
    }
    $('.comment .img-col').html('<span></span><i class="confirm_icon_new"></i>');
    $('.continue.button').after('<div class="buttonFinger"><div class="fingerWave"><div class="wave1"></div><div class="wave2"></div></div><div class="finger"></div></div>');
    $('.sub_title span').html('Independent Survey about');


    $( ".comment:nth-child(3) .desc_tx span" ).html('<b>Daniel Clark</b>');
    $( ".comment:nth-child(4) .desc_tx span" ).html('<b>Anantara Evans</b>');
    $( ".comment:nth-child(5) .desc_tx span" ).html('<b>Linda Crystal Born</b>');
    $( ".comment:nth-child(6) .desc_tx span" ).html('<b>Bryan Krebs</b>');
    $( ".comment:nth-child(7) .desc_tx span" ).html('<b>Alice Mark</b>');
    $( ".comment:nth-child(8) .desc_tx span" ).html('<b>Josh Jt Neumann</b>');
    $( ".comment:nth-child(9) .desc_tx span" ).html('<b>Lanea Bayless</b>');
    $( ".comment:nth-child(10) .desc_tx span" ).html('<b>Kaur Samreen</b>');


})
