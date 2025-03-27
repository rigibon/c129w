<!DOCTYPE html>

<?php
// w4 logo

$page_peel_brand = "";
if ($_GET['s'] == "1016") {
  $page_peel_brand = <<<page_peel_brand
<script type="text/javascript" src="/utils/banners/banner-brnd.js"></script>
<style>
img.banner {
    position: fixed;
    top: 0;
    width: 150px;
    z-index: 999999999999;
}
</style>
page_peel_brand;
}
// This is index-rp-nl-nw-exc.php - No Logo - New Window - Exclude by EPV
session_start();
require_once dirname(__FILE__) . "/../wall/nas-functions.php";
if (isset($_GET['nasTag']) && !empty($_GET['nasTag'])) {
  $tag = $_GET['nasTag'];
} else {
  $tag = "";
}

$data = GetNasWall("a4d656a7-091f-4126-a066-81e252440a7d", null, $tag);

$nas_domains_file = dirname(__FILE__) . "/../wall/nas-domains.json";
$nas_voluum_bridge_domains_file = dirname(__FILE__) . "/../wall/nas-voluum-bridge-domains.json";
$nas_tracker_domain = "";
$nas_impression_domain = "";
$nas_voluum_bridge_domain = "";

if (file_exists($nas_domains_file)) {
  $nas_domains = json_decode(file_get_contents($nas_domains_file), true);

  if (array_key_exists("NAS", $nas_domains)) {
    $tracker_domains = $nas_domains["NAS"];
    shuffle($tracker_domains);
    $nas_tracker_domain = $tracker_domains[0];
  }

  if (array_key_exists("NAS IMPRESSION", $nas_domains)) {
    $impression_domains = $nas_domains["NAS IMPRESSION"];
    shuffle($impression_domains);
    $nas_impression_domain = $impression_domains[0];
  }
}
if (file_exists($nas_voluum_bridge_domains_file)) {
  $nas_domains = json_decode(file_get_contents($nas_voluum_bridge_domains_file), true);

  if (array_key_exists("NAS-VOLUUM-BRIDGE", $nas_domains)) {
    $voluum_bridge_domains = $nas_domains["NAS-VOLUUM-BRIDGE"];
    shuffle($voluum_bridge_domains);
    $nas_voluum_bridge_domain = $voluum_bridge_domains[0];
  }
}

$objects = [];
foreach ($data as $item) {
  $objects[] = $item;
}

require_once(dirname(__FILE__) . "/../helpers.php");
if (getcwd() === "/var/surveys/redzun") {
  include("_php_voluum_clock_or_lptoken_check-w14.php");
} else {
  include(dirname(__FILE__) . "/../_php_voluum_clock_or_lptoken_check-w14.php");
}

if (isset($_GET['cc']))
  $country = strtolower($_GET['cc']); // country must be defined for include
else
  $country = 'us';

$_SESSION['cc'] = $country; // Set Country ID

if (isset($_GET['wid']))
  $wid = strtolower($_GET['wid']); // Wall ID
else
  $wid = 'default';

$_SESSION['wid'] = $_GET['wid']; // Set Wall ID

$offer_parameters = "?c=" . $_GET['c'] . "&k=" . "&v=" . $_GET['v'] . "&s=" . $_GET['s'] . "&t=" . $_GET['t'] . "&cr=" . $_GET['cr'] . "&src=" . $_GET['src'] . "&lp=" . $_GET['lp'] . "&id=" . $_GET['id'];
$offer_url = "https://" . $offer_link_domain_fold . "/de7d783b-d901-4973-8080-b75e3e249c7c" . $offer_parameters;

?>
<script>
  function r(b, a) { return ++a ? String.fromCharCode((b < "[" ? 91 : 123) > (b = b.charCodeAt() + 13) ? b : b - 26) : b.replace(/[a-zA-Z]/g, r) }
  pr_name = "<?php echo str_rot13("Screwfix"); ?>";
  br_name = "<?php echo str_rot13("Oral-B"); ?>";


</script>

<script>
  window.c_var = '<?= !empty($_GET['c']) ? $_GET['c'] : "" ?>';
  window.k_var = '<?= !empty($_GET['k']) ? str_rot13($_GET['k']) : "" ?>';
  window.s_var = '<?= !empty($_GET['s']) ? $_GET['s'] : "" ?>';
  window.src_var = '<?= !empty($_GET['src']) ? $_GET['src'] : "" ?>';
  window.id_var = '<?= !empty($_GET['id']) ? $_GET['id'] : "" ?>';

  var jumpurl;
  jumpurl = '<?php echo $data->url ?>';
</script>

<html lang="en-US">

<head>
  <base href="/hrblock/" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="cache-control" content="public">
  <title>[1] Reward Pending - We Want Your Opinion!</title>
  <link rel="icon" href="./files/hrlogo.png">
  <link rel="stylesheet" type="text/css" href="./files/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="./files/all.css">
  <link rel="stylesheet" type="text/css" href="./files/common.css?v=85">
  <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
  <script text="text/javascript" src="./files/bootstrap.min.js"></script>
  <script text="text/javascript" src="./files/myscript_10.js?v=12"></script>
  <link rel="stylesheet" href="./files/style.css?v=31">
  <style>
    .buttonFinger {
      display: none;
    }

    .main_text_content b {
      font-weight: 700;
    }

    .continue {
      position: relative;
      overflow: hidden;
    }

    .continue:after {
      animation: shine 3s ease-in-out infinite;
      animation-fill-mode: forwards;
      content: "";
      position: absolute;
      top: -80%;
      left: -200%;
      width: 150%;
      height: 500%;
      opacity: 0;
      transform: rotate(-10deg);
      background: rgba(255, 255, 255, 0.13);
      /* background: linear-gradient(to right, rgba(255, 255, 255, 0.0) 0%, rgba(255, 255, 255, 0.0) 30%, rgba(255, 255, 255, 0.13) 77%, rgba(255, 255, 255, 0.5) 92%, rgba(255, 255, 255, 1) 92%, rgba(255, 255, 255, 0.0) 100%); */
    }

    /*  */
    .site-logo {
      display: block !important;
    }

    .rlt_logo {
      display: none !important;
    }

    body {
      background: rgb(255, 255, 255);
      background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(16, 16, 16, 0.29597776610644255) 100%);
    }

    .site-logo {
      color: #101010;
    }

    .congrats_block,
    .tga_tt {
      color: #101010;
    }

    .blink-text {
      color: #000;
      animation: blinkingText 5s infinite;
    }

    .nm_prod {
      font-size: 22px;
    }

    @keyframes blinkingText {
      0% {
        color: #0091cf;
      }

      20% {
        color: #ff6407;
      }

      40% {
        color: #047882;
      }

      60% {
        color: #047882;
      }

      80% {
        color: #ff6407;
      }

      100% {
        color: #0091cf;
      }
    }

    @keyframes shine {
      10% {
        opacity: 1;
        top: -30%;
        left: -200%;
        transition-property: left, top, opacity;
        transition-duration: 0.7s, 0.7s, .15s;
        transition-timing-function: ease
      }

      100% {
        opacity: 0;
        top: -30%;
        left: 100%;
        transition-property: left, top, opacity
      }
    }

    .promo_code {
      color: #1e9a22;
      padding: 5px 10px;
      border: #1e9a22 dotted 1px;
      display: inline-block !important;
    }

    .action {
      font-size: 16px;
      font-weight: 700;
      text-align: center;
      margin: 15px 0 -10px;
    }

    /*  */
    .message-footer {
      position: relative;
    }

    .fingerWave {
      width: 50px;
      height: 50px;
      position: absolute;
      top: -0.17rem;
      left: -0.12rem;
      -webkit-animation: finger-wave .8s linear infinite both;
      animation: finger-wave .8s linear infinite both;
    }

    .wave1 {
      width: 50px;
      height: 50px;
      position: absolute;
      top: 0;
      left: 0;
      border: 0.01rem solid hsla(0, 0%, 100%, .7);
      border-radius: 50%;
    }

    .wave2 {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 5px;
      left: 5px;
      border: 0.01rem solid #fff;
      border-radius: 50%;
      background-color: hsla(0, 0%, 100%, .25);
    }

    .finger {
      width: 40px;
      height: 41px;
      background-position: 0 0;
      background-image: url(https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/finger_move.png);
      background-size: 100% auto;
      background-repeat: no-repeat;
      -webkit-animation: finger-ani .4s ease-in-out infinite alternate both;
      animation: finger-ani .4s ease-in-out infinite alternate both;
    }

    .finger {
      position: absolute;
      top: 15px;
      right: -62px;
    }

    .buttonFinger {
      position: absolute;
      right: 75px;
      top: 10px;
    }

    .continue,
    .choices .answerOption,
    .remove_link button {
      background-color: #101010 !important;
      -webkit-box-shadow: 0 2px 0 #2d2e2e !important;
      box-shadow: 0 2px 0 #2d2e2e !important;
    }

    .continue:hover,
    .choices .answerOption:hover,
    .remove_link button:hover {
      background-color: #2d2e2e !important;
    }

    .logo-container {
      text-indent: 0;
      color: #101010;
      font-size: 50px;
      font-weight: 700;
      margin: -10px auto 10px !important;
      max-width: 100% !important;
      width: 100%;
      text-transform: uppercase;
    }

    .logo-container span {
      display: block;
      font-size: 18px;
      margin-top: -20px;
    }

    .p_prize1 .des,
    .p_prize2 .des,
    .p_prize3 .des {
      height: 40px;
      font-size: 12px;
    }

    @keyframes finger-wave {
      0% {
        opacity: 1;
        -webkit-transform: scale(.8);
        transform: scale(.8)
      }

      50%,
      to {
        opacity: 0;
        -webkit-transform: scale(1.2);
        transform: scale(1.2)
      }
    }

    @keyframes finger-ani {
      0% {
        -webkit-transform: translate(0);
        transform: translate(0)
      }

      to {
        -webkit-transform: translate(.1rem, .1rem);
        transform: translate(.1rem, .1rem)
      }
    }

    body .sub_title {
      width: 250px !important;
    }

    .p_prize4:before {
      content: 'EXCLUSIVE!';
      background: rgb(0, 175, 77) !important;
      font-size: 12px;
      padding: 8px 20px 7px;
      left: 375px;
      top: 27px;
      border-radius: 30px;
      z-index: 10;
      background: rgb(0, 175, 77) !important;
      position: absolute;
      text-align: center;
      color: #fff;
      font-weight: 700;
    }

    @media only screen and (max-width: 900px) {
      .p_prize4:before {
        content: 'EXCLUSIVE!';
        background: rgb(0, 175, 77) !important;
        font-size: 12px;
        padding: 8px 20px 7px;
        left: 10px;
        top: 20px;
        border-radius: 30px;
        z-index: 10;
        background: rgb(0, 175, 77) !important;
        position: absolute;
        text-align: center;
        color: #fff;
        font-weight: 700;
      }
    }
  </style>
</head>

<body style="background-color: rgb(0, 175, 77) !important;">
  <div class="banner_span" style="display:none">Confirmation <br>Club </div>

  <!-- <div id="page-preloader"></div> -->
  <div class="hd-top hd-top-tx tb_inf"
    style="background-color: rgb(0, 175, 77) !important; padding: 10px; font-weight: bold;">
    <div class="marqueeStyle mr-2">
      <!-- <svg class="mr-2" id="cart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="#ffffff" width="18.293" height="17.14" viewBox="0 0 18.293 17.14">
        <defs>
          <clipPath id="clip-path">
            <rect id="Rectángulo_4606" data-name="Rectángulo 4606" width="18.293" height="17.14" fill="none"></rect>
          </clipPath>
        </defs>
        <g id="Grupo_12850" data-name="Grupo 12850">
          <path id="Trazado_463" data-name="Trazado 463"
            d="M17.591,4.28q-6.518.011-13.037,0H4.33c-.145-.526-.288-1.045-.43-1.564Q3.595,1.6,3.291.489A.555.555,0,0,0,2.666.006C2.017,0,1.368.017.72,0A.677.677,0,0,0,0,.4V.683a.676.676,0,0,0,.72.4c.535-.018,1.07,0,1.621,0L2.731,2.5Q4,7.128,5.261,11.756c.026.093.059.164-.064.233a1.506,1.506,0,0,0-.828,1.518,1.541,1.541,0,0,0,1.075,1.38c.027.01.054.023.089.037A1.575,1.575,0,0,0,6.2,16.878a1.483,1.483,0,0,0,1.745-.045A1.565,1.565,0,0,0,8.563,15H12.97a5.144,5.144,0,0,0,.008.851,1.59,1.59,0,0,0,1.677,1.271,1.6,1.6,0,0,0,.2-3.171,2.466,2.466,0,0,0-.426-.033q-4.171,0-8.341,0a1.068,1.068,0,0,1-.231-.014.535.535,0,0,1-.421-.562.609.609,0,0,1,.537-.512q1.679-.155,3.358-.319,1.723-.167,3.446-.34l3.037-.3c.284-.028.568-.059.853-.086a.548.548,0,0,0,.56-.515q.518-3.1,1.036-6.2a.65.65,0,0,1,.033-.1V4.677a.674.674,0,0,0-.7-.4m-3.05,10.7a.534.534,0,1,1-.535.547.542.542,0,0,1,.535-.547m-7.5,0a.534.534,0,1,1-.542.541.542.542,0,0,1,.542-.541m1.6-5.934a.538.538,0,1,1-1.071,0c0-.338,0-.676,0-1.014s0-.688,0-1.032A.537.537,0,1,1,8.646,7q0,1.023,0,2.046m3.216,0a.538.538,0,1,1-1.071-.007c0-.338,0-.676,0-1.014s0-.688,0-1.032a.537.537,0,1,1,1.071.007q0,1.023,0,2.046m3.216.008a.537.537,0,1,1-1.071,0q0-1.023,0-2.046a.538.538,0,1,1,1.071,0c0,.338,0,.676,0,1.014s0,.688,0,1.032"
            transform="translate(0 0)"></path>
          <path id="Trazado_464" data-name="Trazado 464"
            d="M226.49,3.32h5.359c0-.519,0-1.024,0-1.528a.543.543,0,0,0-.6-.6c-.247,0-.494,0-.774,0,.076-.084.129-.137.175-.2a.53.53,0,0,0-.294-.858.54.54,0,0,0-.533.176c-.216.218-.433.435-.66.663-.132-.136-.243-.252-.356-.366s-.224-.231-.343-.338a.534.534,0,0,0-.755.756c.039.044.082.086.126.132-.018.019-.021.026-.025.026l-.732.005a.542.542,0,0,0-.592.585c0,.339,0,.678,0,1.016V3.32"
            transform="translate(-215.699 -0.118)"></path>
          <path id="Trazado_465" data-name="Trazado 465"
            d="M118.247,46.106V45.069c-.019-.008-.029-.017-.04-.017-1.244,0-2.489-.006-3.733,0a.518.518,0,0,0-.5.507c-.008.177,0,.355,0,.546Z"
            transform="translate(-108.537 -42.904)"></path>
        </g>
      </svg> -->
      <!-- Over $4,000,000 in Offers given out so far! -->
    </div>
    <div class="marqueeStyle mr-2">
      <svg class="mr-2" id="cart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="#ffffff" width="18.293" height="17.14" viewBox="0 0 18.293 17.14">
        <defs>
          <clipPath id="clip-path">
            <rect id="Rectángulo_4606" data-name="Rectángulo 4606" width="18.293" height="17.14" fill="none"></rect>
          </clipPath>
        </defs>
        <g id="Grupo_12850" data-name="Grupo 12850">
          <path id="Trazado_463" data-name="Trazado 463"
            d="M17.591,4.28q-6.518.011-13.037,0H4.33c-.145-.526-.288-1.045-.43-1.564Q3.595,1.6,3.291.489A.555.555,0,0,0,2.666.006C2.017,0,1.368.017.72,0A.677.677,0,0,0,0,.4V.683a.676.676,0,0,0,.72.4c.535-.018,1.07,0,1.621,0L2.731,2.5Q4,7.128,5.261,11.756c.026.093.059.164-.064.233a1.506,1.506,0,0,0-.828,1.518,1.541,1.541,0,0,0,1.075,1.38c.027.01.054.023.089.037A1.575,1.575,0,0,0,6.2,16.878a1.483,1.483,0,0,0,1.745-.045A1.565,1.565,0,0,0,8.563,15H12.97a5.144,5.144,0,0,0,.008.851,1.59,1.59,0,0,0,1.677,1.271,1.6,1.6,0,0,0,.2-3.171,2.466,2.466,0,0,0-.426-.033q-4.171,0-8.341,0a1.068,1.068,0,0,1-.231-.014.535.535,0,0,1-.421-.562.609.609,0,0,1,.537-.512q1.679-.155,3.358-.319,1.723-.167,3.446-.34l3.037-.3c.284-.028.568-.059.853-.086a.548.548,0,0,0,.56-.515q.518-3.1,1.036-6.2a.65.65,0,0,1,.033-.1V4.677a.674.674,0,0,0-.7-.4m-3.05,10.7a.534.534,0,1,1-.535.547.542.542,0,0,1,.535-.547m-7.5,0a.534.534,0,1,1-.542.541.542.542,0,0,1,.542-.541m1.6-5.934a.538.538,0,1,1-1.071,0c0-.338,0-.676,0-1.014s0-.688,0-1.032A.537.537,0,1,1,8.646,7q0,1.023,0,2.046m3.216,0a.538.538,0,1,1-1.071-.007c0-.338,0-.676,0-1.014s0-.688,0-1.032a.537.537,0,1,1,1.071.007q0,1.023,0,2.046m3.216.008a.537.537,0,1,1-1.071,0q0-1.023,0-2.046a.538.538,0,1,1,1.071,0c0,.338,0,.676,0,1.014s0,.688,0,1.032"
            transform="translate(0 0)"></path>
          <path id="Trazado_464" data-name="Trazado 464"
            d="M226.49,3.32h5.359c0-.519,0-1.024,0-1.528a.543.543,0,0,0-.6-.6c-.247,0-.494,0-.774,0,.076-.084.129-.137.175-.2a.53.53,0,0,0-.294-.858.54.54,0,0,0-.533.176c-.216.218-.433.435-.66.663-.132-.136-.243-.252-.356-.366s-.224-.231-.343-.338a.534.534,0,0,0-.755.756c.039.044.082.086.126.132-.018.019-.021.026-.025.026l-.732.005a.542.542,0,0,0-.592.585c0,.339,0,.678,0,1.016V3.32"
            transform="translate(-215.699 -0.118)"></path>
          <path id="Trazado_465" data-name="Trazado 465"
            d="M118.247,46.106V45.069c-.019-.008-.029-.017-.04-.017-1.244,0-2.489-.006-3.733,0a.518.518,0,0,0-.5.507c-.008.177,0,.355,0,.546Z"
            transform="translate(-108.537 -42.904)"></path>
        </g>
      </svg>
      Over $4,000,000 in Offers given out so far!
    </div>
    <div class="marqueeStyle mr-2">
      <svg class="mr-2" id="cart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="#ffffff" width="18.293" height="17.14" viewBox="0 0 18.293 17.14">
        <defs>
          <clipPath id="clip-path">
            <rect id="Rectángulo_4606" data-name="Rectángulo 4606" width="18.293" height="17.14" fill="none"></rect>
          </clipPath>
        </defs>
        <g id="Grupo_12850" data-name="Grupo 12850">
          <path id="Trazado_463" data-name="Trazado 463"
            d="M17.591,4.28q-6.518.011-13.037,0H4.33c-.145-.526-.288-1.045-.43-1.564Q3.595,1.6,3.291.489A.555.555,0,0,0,2.666.006C2.017,0,1.368.017.72,0A.677.677,0,0,0,0,.4V.683a.676.676,0,0,0,.72.4c.535-.018,1.07,0,1.621,0L2.731,2.5Q4,7.128,5.261,11.756c.026.093.059.164-.064.233a1.506,1.506,0,0,0-.828,1.518,1.541,1.541,0,0,0,1.075,1.38c.027.01.054.023.089.037A1.575,1.575,0,0,0,6.2,16.878a1.483,1.483,0,0,0,1.745-.045A1.565,1.565,0,0,0,8.563,15H12.97a5.144,5.144,0,0,0,.008.851,1.59,1.59,0,0,0,1.677,1.271,1.6,1.6,0,0,0,.2-3.171,2.466,2.466,0,0,0-.426-.033q-4.171,0-8.341,0a1.068,1.068,0,0,1-.231-.014.535.535,0,0,1-.421-.562.609.609,0,0,1,.537-.512q1.679-.155,3.358-.319,1.723-.167,3.446-.34l3.037-.3c.284-.028.568-.059.853-.086a.548.548,0,0,0,.56-.515q.518-3.1,1.036-6.2a.65.65,0,0,1,.033-.1V4.677a.674.674,0,0,0-.7-.4m-3.05,10.7a.534.534,0,1,1-.535.547.542.542,0,0,1,.535-.547m-7.5,0a.534.534,0,1,1-.542.541.542.542,0,0,1,.542-.541m1.6-5.934a.538.538,0,1,1-1.071,0c0-.338,0-.676,0-1.014s0-.688,0-1.032A.537.537,0,1,1,8.646,7q0,1.023,0,2.046m3.216,0a.538.538,0,1,1-1.071-.007c0-.338,0-.676,0-1.014s0-.688,0-1.032a.537.537,0,1,1,1.071.007q0,1.023,0,2.046m3.216.008a.537.537,0,1,1-1.071,0q0-1.023,0-2.046a.538.538,0,1,1,1.071,0c0,.338,0,.676,0,1.014s0,.688,0,1.032"
            transform="translate(0 0)"></path>
          <path id="Trazado_464" data-name="Trazado 464"
            d="M226.49,3.32h5.359c0-.519,0-1.024,0-1.528a.543.543,0,0,0-.6-.6c-.247,0-.494,0-.774,0,.076-.084.129-.137.175-.2a.53.53,0,0,0-.294-.858.54.54,0,0,0-.533.176c-.216.218-.433.435-.66.663-.132-.136-.243-.252-.356-.366s-.224-.231-.343-.338a.534.534,0,0,0-.755.756c.039.044.082.086.126.132-.018.019-.021.026-.025.026l-.732.005a.542.542,0,0,0-.592.585c0,.339,0,.678,0,1.016V3.32"
            transform="translate(-215.699 -0.118)"></path>
          <path id="Trazado_465" data-name="Trazado 465"
            d="M118.247,46.106V45.069c-.019-.008-.029-.017-.04-.017-1.244,0-2.489-.006-3.733,0a.518.518,0,0,0-.5.507c-.008.177,0,.355,0,.546Z"
            transform="translate(-108.537 -42.904)"></path>
        </g>
      </svg>
      Over $4,000,000 in Offers given out so far!
    </div>
    <div class="marqueeStyle mr-2">
      <svg class="mr-2" id="cart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="#ffffff" width="18.293" height="17.14" viewBox="0 0 18.293 17.14">
        <defs>
          <clipPath id="clip-path">
            <rect id="Rectángulo_4606" data-name="Rectángulo 4606" width="18.293" height="17.14" fill="none"></rect>
          </clipPath>
        </defs>
        <g id="Grupo_12850" data-name="Grupo 12850">
          <path id="Trazado_463" data-name="Trazado 463"
            d="M17.591,4.28q-6.518.011-13.037,0H4.33c-.145-.526-.288-1.045-.43-1.564Q3.595,1.6,3.291.489A.555.555,0,0,0,2.666.006C2.017,0,1.368.017.72,0A.677.677,0,0,0,0,.4V.683a.676.676,0,0,0,.72.4c.535-.018,1.07,0,1.621,0L2.731,2.5Q4,7.128,5.261,11.756c.026.093.059.164-.064.233a1.506,1.506,0,0,0-.828,1.518,1.541,1.541,0,0,0,1.075,1.38c.027.01.054.023.089.037A1.575,1.575,0,0,0,6.2,16.878a1.483,1.483,0,0,0,1.745-.045A1.565,1.565,0,0,0,8.563,15H12.97a5.144,5.144,0,0,0,.008.851,1.59,1.59,0,0,0,1.677,1.271,1.6,1.6,0,0,0,.2-3.171,2.466,2.466,0,0,0-.426-.033q-4.171,0-8.341,0a1.068,1.068,0,0,1-.231-.014.535.535,0,0,1-.421-.562.609.609,0,0,1,.537-.512q1.679-.155,3.358-.319,1.723-.167,3.446-.34l3.037-.3c.284-.028.568-.059.853-.086a.548.548,0,0,0,.56-.515q.518-3.1,1.036-6.2a.65.65,0,0,1,.033-.1V4.677a.674.674,0,0,0-.7-.4m-3.05,10.7a.534.534,0,1,1-.535.547.542.542,0,0,1,.535-.547m-7.5,0a.534.534,0,1,1-.542.541.542.542,0,0,1,.542-.541m1.6-5.934a.538.538,0,1,1-1.071,0c0-.338,0-.676,0-1.014s0-.688,0-1.032A.537.537,0,1,1,8.646,7q0,1.023,0,2.046m3.216,0a.538.538,0,1,1-1.071-.007c0-.338,0-.676,0-1.014s0-.688,0-1.032a.537.537,0,1,1,1.071.007q0,1.023,0,2.046m3.216.008a.537.537,0,1,1-1.071,0q0-1.023,0-2.046a.538.538,0,1,1,1.071,0c0,.338,0,.676,0,1.014s0,.688,0,1.032"
            transform="translate(0 0)"></path>
          <path id="Trazado_464" data-name="Trazado 464"
            d="M226.49,3.32h5.359c0-.519,0-1.024,0-1.528a.543.543,0,0,0-.6-.6c-.247,0-.494,0-.774,0,.076-.084.129-.137.175-.2a.53.53,0,0,0-.294-.858.54.54,0,0,0-.533.176c-.216.218-.433.435-.66.663-.132-.136-.243-.252-.356-.366s-.224-.231-.343-.338a.534.534,0,0,0-.755.756c.039.044.082.086.126.132-.018.019-.021.026-.025.026l-.732.005a.542.542,0,0,0-.592.585c0,.339,0,.678,0,1.016V3.32"
            transform="translate(-215.699 -0.118)"></path>
          <path id="Trazado_465" data-name="Trazado 465"
            d="M118.247,46.106V45.069c-.019-.008-.029-.017-.04-.017-1.244,0-2.489-.006-3.733,0a.518.518,0,0,0-.5.507c-.008.177,0,.355,0,.546Z"
            transform="translate(-108.537 -42.904)"></path>
        </g>
      </svg>
      Over $4,000,000 in Offers given out so far!
    </div>
    <div class="marqueeStyle mr-2">
      <svg class="mr-2" id="cart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="#ffffff" width="18.293" height="17.14" viewBox="0 0 18.293 17.14">
        <defs>
          <clipPath id="clip-path">
            <rect id="Rectángulo_4606" data-name="Rectángulo 4606" width="18.293" height="17.14" fill="none"></rect>
          </clipPath>
        </defs>
        <g id="Grupo_12850" data-name="Grupo 12850">
          <path id="Trazado_463" data-name="Trazado 463"
            d="M17.591,4.28q-6.518.011-13.037,0H4.33c-.145-.526-.288-1.045-.43-1.564Q3.595,1.6,3.291.489A.555.555,0,0,0,2.666.006C2.017,0,1.368.017.72,0A.677.677,0,0,0,0,.4V.683a.676.676,0,0,0,.72.4c.535-.018,1.07,0,1.621,0L2.731,2.5Q4,7.128,5.261,11.756c.026.093.059.164-.064.233a1.506,1.506,0,0,0-.828,1.518,1.541,1.541,0,0,0,1.075,1.38c.027.01.054.023.089.037A1.575,1.575,0,0,0,6.2,16.878a1.483,1.483,0,0,0,1.745-.045A1.565,1.565,0,0,0,8.563,15H12.97a5.144,5.144,0,0,0,.008.851,1.59,1.59,0,0,0,1.677,1.271,1.6,1.6,0,0,0,.2-3.171,2.466,2.466,0,0,0-.426-.033q-4.171,0-8.341,0a1.068,1.068,0,0,1-.231-.014.535.535,0,0,1-.421-.562.609.609,0,0,1,.537-.512q1.679-.155,3.358-.319,1.723-.167,3.446-.34l3.037-.3c.284-.028.568-.059.853-.086a.548.548,0,0,0,.56-.515q.518-3.1,1.036-6.2a.65.65,0,0,1,.033-.1V4.677a.674.674,0,0,0-.7-.4m-3.05,10.7a.534.534,0,1,1-.535.547.542.542,0,0,1,.535-.547m-7.5,0a.534.534,0,1,1-.542.541.542.542,0,0,1,.542-.541m1.6-5.934a.538.538,0,1,1-1.071,0c0-.338,0-.676,0-1.014s0-.688,0-1.032A.537.537,0,1,1,8.646,7q0,1.023,0,2.046m3.216,0a.538.538,0,1,1-1.071-.007c0-.338,0-.676,0-1.014s0-.688,0-1.032a.537.537,0,1,1,1.071.007q0,1.023,0,2.046m3.216.008a.537.537,0,1,1-1.071,0q0-1.023,0-2.046a.538.538,0,1,1,1.071,0c0,.338,0,.676,0,1.014s0,.688,0,1.032"
            transform="translate(0 0)"></path>
          <path id="Trazado_464" data-name="Trazado 464"
            d="M226.49,3.32h5.359c0-.519,0-1.024,0-1.528a.543.543,0,0,0-.6-.6c-.247,0-.494,0-.774,0,.076-.084.129-.137.175-.2a.53.53,0,0,0-.294-.858.54.54,0,0,0-.533.176c-.216.218-.433.435-.66.663-.132-.136-.243-.252-.356-.366s-.224-.231-.343-.338a.534.534,0,0,0-.755.756c.039.044.082.086.126.132-.018.019-.021.026-.025.026l-.732.005a.542.542,0,0,0-.592.585c0,.339,0,.678,0,1.016V3.32"
            transform="translate(-215.699 -0.118)"></path>
          <path id="Trazado_465" data-name="Trazado 465"
            d="M118.247,46.106V45.069c-.019-.008-.029-.017-.04-.017-1.244,0-2.489-.006-3.733,0a.518.518,0,0,0-.5.507c-.008.177,0,.355,0,.546Z"
            transform="translate(-108.537 -42.904)"></path>
        </g>
      </svg>
      Over $4,000,000 in Offers given out so far!
    </div>
    <div class="marqueeStyle mr-2">
      <svg class="mr-2" id="cart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="#ffffff" width="18.293" height="17.14" viewBox="0 0 18.293 17.14">
        <defs>
          <clipPath id="clip-path">
            <rect id="Rectángulo_4606" data-name="Rectángulo 4606" width="18.293" height="17.14" fill="none"></rect>
          </clipPath>
        </defs>
        <g id="Grupo_12850" data-name="Grupo 12850">
          <path id="Trazado_463" data-name="Trazado 463"
            d="M17.591,4.28q-6.518.011-13.037,0H4.33c-.145-.526-.288-1.045-.43-1.564Q3.595,1.6,3.291.489A.555.555,0,0,0,2.666.006C2.017,0,1.368.017.72,0A.677.677,0,0,0,0,.4V.683a.676.676,0,0,0,.72.4c.535-.018,1.07,0,1.621,0L2.731,2.5Q4,7.128,5.261,11.756c.026.093.059.164-.064.233a1.506,1.506,0,0,0-.828,1.518,1.541,1.541,0,0,0,1.075,1.38c.027.01.054.023.089.037A1.575,1.575,0,0,0,6.2,16.878a1.483,1.483,0,0,0,1.745-.045A1.565,1.565,0,0,0,8.563,15H12.97a5.144,5.144,0,0,0,.008.851,1.59,1.59,0,0,0,1.677,1.271,1.6,1.6,0,0,0,.2-3.171,2.466,2.466,0,0,0-.426-.033q-4.171,0-8.341,0a1.068,1.068,0,0,1-.231-.014.535.535,0,0,1-.421-.562.609.609,0,0,1,.537-.512q1.679-.155,3.358-.319,1.723-.167,3.446-.34l3.037-.3c.284-.028.568-.059.853-.086a.548.548,0,0,0,.56-.515q.518-3.1,1.036-6.2a.65.65,0,0,1,.033-.1V4.677a.674.674,0,0,0-.7-.4m-3.05,10.7a.534.534,0,1,1-.535.547.542.542,0,0,1,.535-.547m-7.5,0a.534.534,0,1,1-.542.541.542.542,0,0,1,.542-.541m1.6-5.934a.538.538,0,1,1-1.071,0c0-.338,0-.676,0-1.014s0-.688,0-1.032A.537.537,0,1,1,8.646,7q0,1.023,0,2.046m3.216,0a.538.538,0,1,1-1.071-.007c0-.338,0-.676,0-1.014s0-.688,0-1.032a.537.537,0,1,1,1.071.007q0,1.023,0,2.046m3.216.008a.537.537,0,1,1-1.071,0q0-1.023,0-2.046a.538.538,0,1,1,1.071,0c0,.338,0,.676,0,1.014s0,.688,0,1.032"
            transform="translate(0 0)"></path>
          <path id="Trazado_464" data-name="Trazado 464"
            d="M226.49,3.32h5.359c0-.519,0-1.024,0-1.528a.543.543,0,0,0-.6-.6c-.247,0-.494,0-.774,0,.076-.084.129-.137.175-.2a.53.53,0,0,0-.294-.858.54.54,0,0,0-.533.176c-.216.218-.433.435-.66.663-.132-.136-.243-.252-.356-.366s-.224-.231-.343-.338a.534.534,0,0,0-.755.756c.039.044.082.086.126.132-.018.019-.021.026-.025.026l-.732.005a.542.542,0,0,0-.592.585c0,.339,0,.678,0,1.016V3.32"
            transform="translate(-215.699 -0.118)"></path>
          <path id="Trazado_465" data-name="Trazado 465"
            d="M118.247,46.106V45.069c-.019-.008-.029-.017-.04-.017-1.244,0-2.489-.006-3.733,0a.518.518,0,0,0-.5.507c-.008.177,0,.355,0,.546Z"
            transform="translate(-108.537 -42.904)"></path>
        </g>
      </svg>
      Over $4,000,000 in Offers given out so far!
    </div>
    <div class="marqueeStyle mr-2">
      <svg class="mr-2" id="cart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        fill="#ffffff" width="18.293" height="17.14" viewBox="0 0 18.293 17.14">
        <defs>
          <clipPath id="clip-path">
            <rect id="Rectángulo_4606" data-name="Rectángulo 4606" width="18.293" height="17.14" fill="none"></rect>
          </clipPath>
        </defs>
        <g id="Grupo_12850" data-name="Grupo 12850">
          <path id="Trazado_463" data-name="Trazado 463"
            d="M17.591,4.28q-6.518.011-13.037,0H4.33c-.145-.526-.288-1.045-.43-1.564Q3.595,1.6,3.291.489A.555.555,0,0,0,2.666.006C2.017,0,1.368.017.72,0A.677.677,0,0,0,0,.4V.683a.676.676,0,0,0,.72.4c.535-.018,1.07,0,1.621,0L2.731,2.5Q4,7.128,5.261,11.756c.026.093.059.164-.064.233a1.506,1.506,0,0,0-.828,1.518,1.541,1.541,0,0,0,1.075,1.38c.027.01.054.023.089.037A1.575,1.575,0,0,0,6.2,16.878a1.483,1.483,0,0,0,1.745-.045A1.565,1.565,0,0,0,8.563,15H12.97a5.144,5.144,0,0,0,.008.851,1.59,1.59,0,0,0,1.677,1.271,1.6,1.6,0,0,0,.2-3.171,2.466,2.466,0,0,0-.426-.033q-4.171,0-8.341,0a1.068,1.068,0,0,1-.231-.014.535.535,0,0,1-.421-.562.609.609,0,0,1,.537-.512q1.679-.155,3.358-.319,1.723-.167,3.446-.34l3.037-.3c.284-.028.568-.059.853-.086a.548.548,0,0,0,.56-.515q.518-3.1,1.036-6.2a.65.65,0,0,1,.033-.1V4.677a.674.674,0,0,0-.7-.4m-3.05,10.7a.534.534,0,1,1-.535.547.542.542,0,0,1,.535-.547m-7.5,0a.534.534,0,1,1-.542.541.542.542,0,0,1,.542-.541m1.6-5.934a.538.538,0,1,1-1.071,0c0-.338,0-.676,0-1.014s0-.688,0-1.032A.537.537,0,1,1,8.646,7q0,1.023,0,2.046m3.216,0a.538.538,0,1,1-1.071-.007c0-.338,0-.676,0-1.014s0-.688,0-1.032a.537.537,0,1,1,1.071.007q0,1.023,0,2.046m3.216.008a.537.537,0,1,1-1.071,0q0-1.023,0-2.046a.538.538,0,1,1,1.071,0c0,.338,0,.676,0,1.014s0,.688,0,1.032"
            transform="translate(0 0)"></path>
          <path id="Trazado_464" data-name="Trazado 464"
            d="M226.49,3.32h5.359c0-.519,0-1.024,0-1.528a.543.543,0,0,0-.6-.6c-.247,0-.494,0-.774,0,.076-.084.129-.137.175-.2a.53.53,0,0,0-.294-.858.54.54,0,0,0-.533.176c-.216.218-.433.435-.66.663-.132-.136-.243-.252-.356-.366s-.224-.231-.343-.338a.534.534,0,0,0-.755.756c.039.044.082.086.126.132-.018.019-.021.026-.025.026l-.732.005a.542.542,0,0,0-.592.585c0,.339,0,.678,0,1.016V3.32"
            transform="translate(-215.699 -0.118)"></path>
          <path id="Trazado_465" data-name="Trazado 465"
            d="M118.247,46.106V45.069c-.019-.008-.029-.017-.04-.017-1.244,0-2.489-.006-3.733,0a.518.518,0,0,0-.5.507c-.008.177,0,.355,0,.546Z"
            transform="translate(-108.537 -42.904)"></path>
        </g>
      </svg>
      Over $4,000,000 in Offers given out so far!
    </div>
  </div>
  <div class="pt-1 pt-lg-2 hd">
    <div class="text-center p-2">
      <div class="sub_title container"><span>Independent survey about</span></div>
      <div class="logo-container">
        <!-- <span class="site-logo">H&R Block</span> -->
        <!-- <div class="rlt_logo"> -->
        <img src="./files/hrlogo.png" style="margin-top:10px; margin-bottom: 10px; width: 128px;" />
        <!-- </div> -->
        <style>
          .logo-container {
            text-indent: 0;
            color: #000;
            font-size: 50px;
            font-weight: 700;
            margin: -15px auto -15px;
            max-width: 100%;
            max-height: 100%;
            text-transform: uppercase;
          }

          .logo-container img {
            width: 250px;
          }

          .logo-container>.site-logo {
            margin: 0 auto -15px;
            font-size: 50px;
            color: #000;
          }

          .logo-container>.rlt_logo {
            margin: 25px auto 20px;
          }

          @media only screen and (max-width: 500px) {
            .logo-container {
              text-indent: 0;
              font-size: 40px;
              font-weight: 700;
              margin: -5px auto -10px;
            }

            .logo-container img {
              width: 180px;
            }

            .logo-container>.site-logo {
              font-size: 40px;
              margin: -15px auto -15px !important;
            }

            .logo-container>.rlt_logo {
              margin: 15px auto 15px;
            }
          }
        </style>
      </div>
      <div class="mt-2 mb-2">
        <span class="date-flag date-border date-bg">
          <img style="width:20px" class="flag" src="./files/flaglogo.png?v=12" alt="Flag">
          <b class="date-full date-tx" style="vertical-align: middle"></b>
        </span>
      </div>
    </div>
  </div>
  <div class="container" style="margin: auto">
    <div id="container-survey" class="message-container">
      <div class="questions-containerS">
        <div id="origahog" class="row">
          <div class="left_side_cs">
            <div class="congrats_block" style="color: rgb(0, 175, 77);">CONGRATULATIONS!</div>
            <div class="main_text_content">
              <span class="frs_ttx">You have been chosen for the opportunity to receive one</span>
              <strong class="nm_prod" style="color: rgb(0, 175, 77);">EXCLUSIVE REWARD!</strong><br />
              For your chance to claim your prize, answer a few questions about your experience with H&R Block.
              <div class="mt-3 mb-3">
                <div class="attent_new"><i class="att_img_time"></i>Attention: This offer <span
                    style="color: red">expires today</span>, <b class="date-full"></b></div>
              </div>
              <div class="message-footer">
                <button class="continue button btn-tx bh-color btxh-color"
                  style="background-color: rgb(0, 175, 77) !important; border: 0; -webkit-box-shadow: 0 2px 0 white!important;">START
                  SURVEY</button>
              </div>
            </div>
          </div>
          <div class="right_side_cs">
            <!-- slider1 -->
            <div class="marquee">
              <div class="marquee-cover"></div>
              <div class="track-vertical">
                <div class="flex-vertical marquee-fix">
                  <!-- <div>
                  <img src="./files/product.png" alt="" id="prod-img">
                </div> -->

                  <?php
                  for ($i = 0; $i <= intval(count($objects) / 2); $i++) {
                    ?>
                    <div class="icon-container">

                      <img decoding="async" src="<?php echo "https://{$nas_tracker_domain}" . $objects[$i]->image ?>"
                        alt="" class="icon" data-recalc-dims="1">
                    </div>
                  <?php }
                  ?>
                  <!-- <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler_lilac.png" alt="" class="icon" data-recalc-dims="1">
                            </div>
                            <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler_mist.png" alt="" class="icon" data-recalc-dims="1">
                            </div>
                            <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler_peony.png" alt="" class="icon" data-recalc-dims="1">
                            </div>
                            <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler_cream.png" alt="" class="icon">
                            </div>
                            <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler_fuchia.png" alt="" class="icon">
                            </div>
                            <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler_black.png" alt="" class="icon">
                            </div>
                            <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler_plum.png" alt="" class="icon">
                            </div> -->
                </div>
              </div>
            </div>
            <!-- endslider1 -->
            <!-- slider2 -->
            <div class="marquee">
              <div class="marquee-cover"></div>
              <div class="track-vertical2">
                <div class="flex-vertical marquee-fix">
                  <?php
                  for ($i = intval(count($objects) / 2); $i < count($objects); $i++) {
                    ?>

                    <div class="icon-container">
                      <img decoding="async" src="<?php echo "https://{$nas_tracker_domain}" . $objects[$i]->image ?>"
                        alt="" class="icon" data-recalc-dims="1">
                    </div>
                  <?php }
                  ?>
                  <!-- <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler__10can_black.png" alt="" class="icon" data-recalc-dims="1">
                            </div>
                            <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler__10can_fuchia.png" alt="" class="icon" data-recalc-dims="1">
                            </div>
                            <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler__10can_peony.png" alt="" class="icon" data-recalc-dims="1">
                            </div>
                            <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler__10can_azure.png" alt="" class="icon">
                            </div>
                            <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler__10can_plum.png" alt="" class="icon">
                            </div>
                            <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler__10can_mist.png" alt="" class="icon">
                            </div>
                            <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler__10can_roze.png" alt="" class="icon">
                            </div>
                            <div class="icon-container">
                                <img decoding="async" src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/stanleycooler__10can_cream.png" alt="" class="icon">
                            </div> -->
                </div>
              </div>
            </div>
            <!-- endslider2 -->
          </div>
        </div>

      </div>



      <div id="question-wrap" class="question-wrap" sid="0" style="display:none;"></div>
      <div id="dv-choices" class="choices_s choices" sid="0" style="display:none;">

        <div id="question_border" class="question_border">
          <div class="question_row active hd_ci" id="q1" data-index="1">
            <div class="form_content_block">
              <div class="form_content clearfix">
                <div class="header_quest">
                  <div class="step_question"><span>Question 1 of 5</div>
                  <div class="question_des">What is your gender?</div>
                </div>
                <form action="" class="form_quest">
                  <ul>
                    <li>
                      <input style="background-color: rgb(0, 175, 77);" name="ch1_1" type="radio" id="gender" value=""
                        hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption q1option gender-form" value="male" for="ch1_1">Male</label>
                    </li>
                    <li>
                      <input name="ch1_2" type="radio" id="gender" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption q1option gender-form"
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        value="female" for="ch1_2">Female</label>
                    </li>
                    <li>
                      <input name="ch1_3" type="radio" id="gender" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption q1option gender-form"
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        value="female" for="ch1_3">Other</label>
                    </li>
                    <li>
                      <input name="ch1_4" type="radio" id="gender" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption q1option gender-form"
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        value="female" for="ch1_4">I prefer not to say
                      </label>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
          <div class="question_row hd_ci" id="q2" data-index="2">
            <div class="form_content_block">
              <div class="form_content clearfix">
                <div class="header_quest">
                  <div class="step_question"><span>Question 2 of 5</span></div>
                  <div class="question_des">What is your age?</div>
                </div>
                <form action="" class="form_quest">
                  <ul>
                    <li>
                      <input name="ch2_1" type="radio" id="age" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption age-form" for="ch2_1" value="Under 18" class="q1option">Under
                        18</label>
                    </li>
                    <li>
                      <input name="ch2_2" type="radio" id="age" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption age-form" for="ch2_2" value="18-29" class="q1option">18-29</label>
                    </li>
                    <li>
                      <input name="ch2_3" type="radio" id="age" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption age-form" for="ch2_3" value="30-39" class="q1option">30-39</label>
                    </li>
                    <li>
                      <input name="ch2_4" type="radio" id="age" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption age-form" for="ch2_4" value="40-49" class="q1option">40-49</label>
                    </li>
                    <li>
                      <input name="ch2_5" type="radio" id="age" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption age-form" for="ch2_5" value="50-59" class="q1option">50-59</label>
                    </li>
                    <li>
                      <input name="ch2_6" type="radio" id="age" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption age-form" for="ch2_6" value="60+" class="q1option">60+</label>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
          <div class="question_row hd_ci" id="q3" data-index="2">
            <div class="form_content_block">
              <div class="form_content clearfix">
                <div class="header_quest">
                  <div class="step_question"><span>Question 3 of 5</span></div>
                  <div class="question_des">How often do you use H&R Block's tax preparation services?</div>
                </div>
                <form action="" class="form_quest">
                  <ul>
                    <li>
                      <input name="ch3_1" type="radio" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption" for="ch3_1" class="q1option">Anually (Tax Season)</label>
                    </li>
                    <li>
                      <input name="ch3_2" type="radio" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption" for="ch3_2" class="q1option">Quarterly</label>
                    </li>
                    <li>
                      <input name="ch3_3" type="radio" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption" for="ch3_3" class="q1option">I use their services
                        occasionally</label>
                    </li>
                    <li>
                      <input name="ch3_4" type="radio" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption" for="ch3_4" class="q1option">I have never used their
                        services</label>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
          <div class="question_row hd_ci" id="q4" data-index="2">
            <div class="form_content_block">
              <div class="form_content clearfix">
                <div class="header_quest">
                  <div class="step_question"><span>Question 4 of 5</span></div>
                  <div class="question_des">How satisfied are you with the accuracy of H&R Block's tax preparation
                    services?</div>
                </div>
                <form action="" class="form_quest">
                  <ul>
                    <li>
                      <input name="ch4_1" type="radio" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption" for="ch4_1" class="q1option">Very satisfied</label>
                    </li>
                    <li>
                      <input name="ch4_2" type="radio" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption" for="ch4_2" class="q1option">Quite satisfied</label>
                    </li>
                    <li>
                      <input name="ch4_3" type="radio" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption" for="ch4_3" class="q1option">Neutral</label>
                    </li>
                    <li>
                      <input name="ch4_4" type="radio" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption" for="ch4_4" class="q1option">Dissatisfied</label>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
          <div class="question_row hd_ci" id="q5" data-index="2">
            <div class="form_content_block">
              <div class="form_content clearfix">
                <div class="header_quest">
                  <div class="step_question"><span>Question 5 of 5</span></div>
                  <div class="question_des">How would you rate your overall experience with H&R Block?</div>
                </div>
                <form action="" class="form_quest">
                  <ul>
                    <li>
                      <input name="ch5_1" type="radio" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption" for="ch5_1" class="q1option">Excellent</label>
                    </li>
                    <li>
                      <input name="ch5_2" type="radio" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption" for="ch5_2" class="q1option">Good</label>
                    </li>
                    <li>
                      <input name="ch5_3" type="radio" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption" for="ch5_3" class="q1option">Average</label>
                    </li>
                    <li>
                      <input name="ch5_4" type="radio" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption" for="ch5_4" class="q1option">Bad</label>
                    </li>
                    <li>
                      <input name="ch5_5" type="radio" value="" hidden>
                      <label
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        class="choices answerOption" for="ch5_5" class="q1option">Terrible</label>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div id="validate_s" class="validate_s hidden load_block">
        <div class="flash_block"></div>
        <div class="loader_block">
          <div class="title_loaderbar">
            <div class="loader_label">Processing</div>
            <div class="loader_text_r">Please wait while we process your answers...</div>
          </div>

          <div class="p-4 row step_loader">
            <div class="loader_item loader_item1">
              <p class="load_text load_text1 mb-1"><span class="fa fa-spinner fa-spin check1 mr-2"
                  aria-hidden="true"></span>Answers submitted</p>
            </div>
            <div class="loader_item loader_item2">
              <p class="load_text load_text2 mb-1"><span class="fa fa-spinner fa-spin check2 mr-2"
                  aria-hidden="true"></span>IP address check</p>
            </div>
            <div class="loader_item loader_item3">
              <p class="load_text load_text3 mb-1"><span class="fa fa-spinner fa-spin check3 mr-2"
                  aria-hidden="true"></span>Products available in stock</p>
            </div>
          </div>

          <div style="padding: 20px; padding-bottom: 0;padding-top: 0;text-align: center;">
            <span id="percent_s">0%</span>
            <span class="percent_tx">Complete</span>
            <div class="progress mt-3" style="height: 10px">
              <div class="progress-bar front-progress" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                aria-valuemax="100"></div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div class="reward-page text-left hidden" id="includedContent" style="display:none; margin-top: 10px;">
      <div id="thankyou-container" class="col-12 col-lg-12 p-4">
        <div class="row mt_hands mt-sm-3 mt-0" style="margin-top: 80px; line-height: 1.2">
          <div class="thankyou-text_new flex">
            <div class="thankyou-text2">
              <div class='ty_txt'>THANK YOU FOR COMPLETING OUR SURVEY!</div>
              <div class="text_reward">
                Please choose <b>(1)</b> exclusive reward. <br>
                Don't leave this page because products are limited.
              </div>
              <div class="promo_code">Successfully redeemed coupon code <span class="code">EXCLUSIVESHOP<b
                    class="year"></b><span></div>
            </div>
            <!-- <div class="mt_hands_img"> -->
            <!-- <div class="thanks_img"></div> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
      <!-- End of Out of stock -->
    </div>

    <?php
    $count = 0;
    foreach ($objects as $object) {
      if ($count >= 10) {
        break;
      }

      $randomNumber = rand(852, 4001);

      $count++;
      ?>

      <div id="product-container" style="margin-bottom: 25px;">
        <div class="product-container col-12 col-lg-12 ">
          <div class="row p-3 content_prod">
            <!--  -->
            <div class="form_quest clearfix" id="products_wrapper" style="width: 100%;">
              <div class="reward p_prize4">
                <div class="reward_cont flex">
                  <div class="image-wrapper" style="display: flex; justify-content: center;">
                    <div class="qun_price">
                      <font class="count_n">Left in stock: <span
                          class="time1"></span><?php echo $object->quantity_left; ?></font>
                    </div>
                    <div class="image"><a class="remove_link" target="_blank"><span
                          class="favor_icon"><span></span></span><img style="max-height: 250px; height: 250px;"
                          src="<?php echo "https://{$nas_tracker_domain}" . $object->image ?>" alt="reward"></a></div>
                  </div>
                  <div class="right-wrapper">
                    <div class="description">
                      <div class="name"><?php echo $object->title; ?></div>
                      <div class="rt_block"><span class="rt_count"></span><span class="star_comment"></span><span
                          class="rating-text"><?php echo $randomNumber; ?></span></div>
                      <div class="des"><?php echo $object->description; ?></div>
                      <div class="price_info">
                        <div class="colon_price"><span class="shipp_price"><span class="ship_text">Your
                              Chance:</span><span class="ship-cost">
                              <?php echo $object->promo_price; ?></span></span><span class="old_price"><span
                              class="text_old_price">Regular
                              price:</span><span><?php echo $object->regular_price; ?></span></span></div>
                      </div>
                    </div>
                    <a class="remove_link" target="_blank">
                      <img src="<?php echo "https://{$nas_impression_domain}" . $object->impression_url ?>"
                        style="display:none;"></img>
                      <button
                        style="background-color: rgb(0, 175, 77) !important; -webkit-box-shadow: 0 2px 0 white!important;"
                        id="buttonLink_<?php echo $object->title; ?>" class="text-center btn-lg click_claim_btn">I'LL TAKE
                        IT!
                        <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>
                      </button>
                      <div class="new_price"><span>Only pay for shipping</span></div>
                      <p class="expires_in_tx"><span>Expires in: <span class="expires_in">5:52</span></span></p>
                    </a>
                  </div>
                </div>
              </div>

            </div>
            <!--  -->
          </div>
        </div>
      </div>
      <script>
        document.getElementById('buttonLink_<?php echo $object->title; ?>').addEventListener("click", function () {
          var urlParams = new URLSearchParams(window.location.search);

          window.location.href = "<?php echo "https://{$nas_voluum_bridge_domain}" . $object->url ?>";
        }, false);
      </script>

    <?php } ?>

    <div id="comment-page" class="comment-page">
      <div class="text-center mt-3 title_comment" style="font-size: 20px;font-weight:600;">Recent Comments:</div>

      <div class="comment_input_container text-center mt-5">
        <div class="text-left textarea_block">
          <input id="comment_input" type="text" placeholder="Write a comment...">
          <span class="text-center" id="comment_put" onclick="comment()">
            <span>Send</span>
          </span>
        </div>
      </div>

      <div class="content_comment new_comm_block">

        <div class="comment pt-3 row ml-0 dub2stripc">
          <div class="aboutuser flex">
            <div class="user_data">
              <div class="img-col avatar_user imgb1">
                <span></span>
                <i class="confirm_icon"></i>
              </div>
              <div class="name_user">
                David Irving
              </div>
              <div class="time_comm">
                <span class="comment-time">8 hours ago</span>
              </div>
            </div>
            <div class="verif_block">
              Verified
            </div>
          </div>
          <div class="description_block">
            Just got this in the mail and gave it a shot. Excited to get my reward, Can I send the survey to my friends
            too?
          </div>
          <div class="likes-container">
            <button class="like-button"></button>
            <div class="likes-count">12</div>
          </div>
        </div>

        <div class="comment pt-3 row ml-0 dub2stripc">
          <div class="aboutuser flex">
            <div class="user_data">
              <div class="img-col avatar_user imgb2">
                <span></span>
                <i class="confirm_icon"></i>
              </div>
              <div class="name_user">
                Kimberly Garnet
              </div>
              <div class="time_comm">
                <span class="comment-time">14 hours ago</span>
              </div>
            </div>
            <div class="verif_block">
              Verified
            </div>
          </div>
          <div class="description_block">
            I got a prize from this survey! Was a bit skeptical at first, but took a chance and I won!!
          </div>
          <div class="likes-container">
            <button class="like-button"></button>
            <div class="likes-count">17</div>
          </div>
        </div>

        <div class="comment pt-3 row ml-0 dub2stripc">
          <div class="aboutuser flex">
            <div class="user_data">
              <div class="img-col avatar_user imgb3">
                <span></span>
                <i class="confirm_icon"></i>
              </div>
              <div class="name_user">
                Lisa York
              </div>
              <div class="time_comm">
                <span class="comment-time">1 day ago</span>
              </div>
            </div>
            <div class="verif_block">
              Verified
            </div>
          </div>
          <div class="description_block">
            <div><img src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/H&R Blockcooler_comm1.png" alt=""
                style="width: 150px;margin-bottom:5px"></div>
            Took the survey but no prize for me this time..
          </div>
          <div class="likes-container">
            <button class="like-button"></button>
            <div class="likes-count">25</div>
          </div>
        </div>

        <div class="comment pt-3 row ml-0 dub2stripc">
          <div class="aboutuser flex">
            <div class="user_data">
              <div class="img-col avatar_user imgb4">
                <span></span>
                <i class="confirm_icon"></i>
              </div>
              <div class="name_user">
                Matt Dailey
              </div>
              <div class="time_comm">
                <span class="comment-time">1 day ago</span>
              </div>
            </div>
            <div class="verif_block unverif">
              Not verified
            </div>
          </div>
          <div class="description_block">
            <div><img src="https://d3e1y4kxkqljcb.cloudfront.net/survey_us_d/withoutbg/H&R Blockcooler_comm2.png" alt=""
                style="width: 150px;margin-bottom:5px"></div>
            Usually not into these online surveys but this one was actually worth it. We're gonna make good use of the
            Ninja air fryer, thank you!
          </div>
          <div class="likes-container">
            <button class="like-button"></button>
            <div class="likes-count">28</div>
          </div>
        </div>

        <div class="comment pt-3 row ml-0 dub2stripc">
          <div class="aboutuser flex">
            <div class="user_data">
              <div class="img-col avatar_user imgb5">
                <span></span>
                <i class="confirm_icon"></i>
              </div>
              <div class="name_user">
                Jen Foley
              </div>
              <div class="time_comm">
                <span class="comment-time">2 days ago</span>
              </div>
            </div>
            <div class="verif_block">
              Verified
            </div>
          </div>
          <div class="description_block">
            Received my reward from this survey today!! pleasant surprise, definitely recommending it to friends
            <!-- <div><img src="./files/com_1.jpg" alt=""
                style="width: 150px;margin-bottom:5px"></div> -->
          </div>
          <div class="likes-container">
            <button class="like-button"></button>
            <div class="likes-count">16</div>
          </div>
        </div>

        <div class="comment pt-3 row ml-0 dub2stripc">
          <div class="aboutuser flex">
            <div class="user_data">
              <div class="img-col avatar_user imgb6">
                <span></span>
                <i class="confirm_icon"></i>
              </div>
              <div class="name_user">
                Steven Jackson
              </div>
              <div class="time_comm">
                <span class="comment-time">2 days ago</span>
              </div>
            </div>
            <div class="verif_block unverif">
              Not verified
            </div>
          </div>
          <div class="description_block">
            Excited to share that I won a Stanley Tool set from this survey! Worth giving it a shot!
          </div>
          <div class="likes-container">
            <button class="like-button"></button>
            <div class="likes-count">29</div>
          </div>
        </div>

      </div>
    </div>
    <div class="footer">
      <p class="copyright">Copyright © <span class="year"></span> <a id="policy-btn">Privacy Policy</a> | <a
          id="terms-btn">Terms & Conditions</a></p>
      THIS IS AN INDEPENDENT SURVEY. This website is not affiliated with or endorsed by, and does not claim to own any
      of the trademarks, trade names or rights related to any of the products which are the property of their respective
      owners, who do not own, endorse or promote this website. * Sample products offered on the last page require
      shipping and handling. Please consult the manufacturer's website for details as terms vary with offers. Please
      review the important terms and conditions relating to this survey, site and advertisement.
    </div>
  </div>
  <div class="bottom-bar expire-bar" style="background-color: rgb(0, 175, 77) !important;">
    <div class="bottom_bg" style="background-color: rgb(0, 175, 77) !important;"></div>
    <div class="container footer_container" style="margin: auto">
      <div class="row">
        <div class="offer_expires expire-tx" style="color: white !important;">Offer expires in <span id="time"
            class="time" style="color: white !important;">6:30</span></div>
      </div>
    </div>
  </div>
  <!-- wrap content-->
  <div id="" class="container">
    <div id="policy-wrap">
      <div id="policy-close"><img src="./files/279132e34471a44f9e9c889082127894.png"></div>
      <div id="policy-content">
        <div class='container'>
          <div class='row'>
            <div class='col-sm-12'>
              <p><b>This site</b></p>
              <p><b>Terms and Conditions of Use and other Disclosures</b></p>
              <p><b>1. Introduction</b></p>
              <p>. Thank you for using this site.</p>as
              <p>By using this site, you agree to be legally bound to this document which consists of our Terms of and
                Conditions of Use and other Disclosures, and constitutes a legally-binding agreement ('Agreement')
                governing the terms of providing you with our service. Throughout this document, the words
                'u','we','our,' and 'Company' refer to this site, as is appropriate in the context of the use of the
                words. Likewise, the words 'you' and 'your' refer to you, the person who is being presented with this
                document for your agreement.</p>
              <p>Accessing the Site, in any manner, whether automated or otherwise, constitutes use of the Site and your
                agreement to be bound by these Terms of Service. We reserve the right to change these Terms of Service
                or to impose new conditions on use of the Site, from time to time, in which case we will post the
                revised Terms of Service on this website. By continuing to use the Site after we post any such changes,
                you accept the Terms of Service, as modified.</p>
              <p><b>2. Description of Service</b></p>
              <p>This site is a survey service which offers surveys, advertisements and/or other services as
                consideration for the provision of information to this site.</p>
              <p>Our surveys are made available to you as a result of your downloading, purchasing or otherwise
                subscribing to or using an application, tool bar or the like on your computer. We are in no way
                associated with or responsible for such application or tool bar.</p>
              <p><b>3. Children's Privacy Statement</b></p>
              <p>This children's privacy statement explains our practices with respect to the online collection and use
                of personal information from children under the age of thirteen, and provides important information
                regarding their rights under federal law with respect to such information.</p>
              <p>This Site is not directed to children under the age of thirteen and we do NOT knowingly collect
                personally identifiable information from children under the age of thirteen as part of the Site. We
                screen users who wish to provide personal information in order to prevent users under the age of
                thirteen from providing such information. If we become aware that we have inadvertently received
                personally identifiable information from a user under the age of thirteen as part of the Site, we will
                delete such information from our records. If we change our practices in the future, we will obtain
                prior, verifiable parental consent before collecting any personally identifiable information from
                children under the age of thirteen as part of the Site.</p>
              <p>Because we do not collect any personally identifiable information from children under the age of
                thirteen as part of the Site, we also do NOT knowingly distribute such information to third parties.</p>
              <p>We do NOT knowingly allow children under the age of thirteen to publicly post or otherwise distribute
                personally identifiable contact information through the Site.</p>
              <p>Because we do not collect any personally identifiable information from children under the age of
                thirteen as part of the Site, we do NOT condition the participation of a child under thirteen in the
                Site's online activities on providing personally identifiable information.</p>
              <p><b>4. Intellectual Property</b></p>
              <p>. This Site and all the materials available on the Site are the property of us and/or our affiliates or
                licensors, and are protected by copyright, trademark, and other intellectual property laws. The Site is
                provided solely for your personal noncommercial use. You may not use the Site or the materials available
                on the Site in a manner that constitutes an infringement of our rights or that has not been authorized
                by us. More specifically, unless explicitly authorized in these Terms of Service or by the owner of the
                materials, you may not modify, copy, reproduce, republish, upload, post, transmit, translate, sell,
                create derivative works, exploit, or distribute in any manner or medium (including by email or other
                electronic means) any material from the Site. You may, however, from time to time, download and/or print
                one copy of individual pages of the Site for your personal, non-commercial use, provided that you keep
                intact all copyright and other proprietary notices.</p>
              <p>The trade names and trademarks of the persons or entities referred to in our advertisements are owned
                by those entities, and we are not affiliated with them in any way. This site holds the intellectual
                property rights that refer to its own name only, including, without limitation, the Company trademark,
                logo, design, text, graphics and forms, including the selection and arrangement of such elements. In
                addition, the entire Site is copyrighted as a collective work. Company holds the copyright in all other
                materials as well as in the collective work itself. The collective work may also include works that are
                the property of Company's licensors, or simply of other third parties who are referred to on the site
                but to whom the Company has no affiliation and who are identified only as a reference. Those third
                parties' trademarks may also be protected by copyright and other intellectual property laws, and the use
                of their trademarks may be restricted as applicable. We may permit Users to submit content or other
                information to our site. Because of this, we must ensure that all content uploaded to us may be used
                legally by us without having to remove it at a later date due to a revocation of license by the
                uploading user, or a copyright complaint by the rightful owner. Therefore, by uploading any content to
                our site, you agree that you grant us a universal, perpetual, sublicensable, commercial and
                non-commercial, irrevocable license to use such content, and that you represent to us that you have the
                right to grant such a license. You agree to indemnify us as well as any third party affected by your
                wrongful representations if you should represent falsely that you have the right to grant this license.
              </p>
              <p><b>5. Privacy.</b></p>
              <p>We may collect and store personal or other information that you voluntarily supply to us online while
                using the our service (e.g., while on the Site, participating in a survey, or in responding via email to
                a feature provided on the Site). This site only contacts individuals who specifically request that we do
                so or in the event that they have signed up to receive our messaging or have purchased one of our
                products or third-party offers. This site may collect personally identifying information from our users
                during online registration and online purchasing. Generally, this information includes name and e-mail
                address for registration to receive our free newsletters and name, postal address, and credit card
                information when purchasing products.</p>
              <p>We may also collect and store information that is generated automatically as you navigate online
                through the Site. For example, we may collect information about your computer's connection to the
                Internet, which allows us, among other things, to improve the delivery of our web pages to you and to
                measure traffic on the Site. We also may use a standard feature found in browser software called a
                'cookie' to enhance your experience with the Site. Cookies are small files that your web browser places
                on your hard drive for record-keeping purposes. By showing how and when visitors use the Site, cookies
                help us deliver advertisements, identify how many unique users visit us, and track user trends and
                patterns. They also prevent you from having to re-enter your preferences on certain areas of the Site
                where you may have entered preference information before. The Site also may use web beacons
                (single-pixel graphic files also known as 'transparent GIFs') to access cookies and to count users who
                visit the Site or open HTML-formatted email messages.</p>
              <p>We may use the information we collect from you while you are using the Site in a variety of ways,
                including using the information to customize features. and advertising that appear on the Site. We also
                may provide your information to third parties, such as service providers and contractors for a variety
                of purposes. Unless you inform us in accordance with the process described below, we reserve the right
                to use, and to disclose to third parties, all of the information collected from and about you while you
                are using the Site in any way and for any purpose, such as to enable us or a third party to provide you
                with information about products and services. If you do not wish your information to be used for these
                purposes, you must send a letter to the Online Privacy Coordinator whose address is listed at the end of
                this Privacy Policy requesting to be taken off any lists of information that may be used for these
                purposes or that may be given or sold to third-parties.</p>
              <p>Please keep in mind that whenever you voluntarily make your personal information available for viewing
                by third parties online - for example on message boards, web logs, through email, or in chat areas -
                that information can be seen, collected and used by others besides us. We cannot be responsible for any
                unauthorized third-party use of such information.</p>
              <p>Some of our third-party advertisers and ad servers that place and present advertising on the Site also
                may collect information from you via cookies, web beacons or similar technologies. These third-party
                advertisers and ad servers may use the information they collect to help present their advertisements, to
                help measure and research the advertisements' effectiveness, or for other purposes. The use and
                collection of your information by these third-party advertisers and ad servers is governed by the
                relevant third-party's privacy policy and is not covered by our Privacy Policy. Indeed, the privacy
                policies of these third-party advertisers and ad servers may be different from ours. If you have any
                concerns about a third party's use of cookies or web beacons or use of your information, you should
                visit that party's website and review its privacy policy.</p>
              <p>The Site also includes links to other websites and provides access to products and services offered by
                third parties, whose privacy policies we do not control. When you access another website or purchase
                third-party products or services through the Site, use of any information you provide is governed by the
                privacy policy of the operator of the site you are visiting or the provider of such products or
                services.</p>
              <p>We may also make some content, products and services available through our Site through cooperative
                relationships with third-party providers, where the brands of our provider partner appear on the Site in
                connection with such content, products and/or services. We may share with our provider partner any
                information you provide, or that is collected, in the course of visiting any pages that are made
                available in cooperation with our provider partner. In some cases, the provider partner may collect
                information from you directly, in which cases the privacy policy of our provider partner may apply to
                the provider partner's use of your information. The privacy policy of our provider partners may differ
                from ours. If you have any questions regarding the privacy policy of one of our provider partners, you
                should contact the provider partner directly for more information.</p>
              <p>Be aware that we may occasionally release information about our visitors when release is appropriate to
                comply with law or to protect the rights, property or safety of users of the Site or the public.</p>
              <p>Please also note that as our business grows, we may buy or sell various assets. In the unlikely event
                that we sell some or all of our assets, or one or more of our websites is acquired by another company,
                information about our users may be among the transferred assets.</p>
              <p><b>6. On-Line Commerce:</b></p>
              <p>Use of our service may allow you to purchase many different types of products and services online that
                are solely provided by third parties. We are not responsible for the quality, accuracy, timeliness,
                reliability or any other aspect of these products and services. If you make a purchase from such a
                merchant or on a site linked to by the Site, the information obtained during your visit to that
                merchant's online store or site, and the information that you give as part of the transaction, such as
                your credit card number and contact information, may be collected by both the merchant and us. A
                merchant may have privacy and data collection practices that are different from ours. We have no
                responsibility or liability for these independent policies. In addition, when you purchase products or
                services on or through the Site, you may be subject to additional terms and conditions that specifically
                apply to your purchase or use of such products or services. For more information regarding a merchant,
                its online store, its privacy policies, and/or any additional terms and conditions that may apply, visit
                that merchant's website and click on its information links or contact the merchant directly. You release
                us and our affiliates from any damages that you incur, and agree not to assert any claims against us or
                them, arising from your purchase or use of any products or services made available by third parties
                through the Site.</p>
              <p>Your participation, correspondence or business dealings with any third party found on or through our
                Site, regarding payment and delivery of specific goods and services, and any other terms, conditions,
                representations or warranties associated with such dealings, are solely between you and such third
                party. You agree that COMPANY shall not be responsible or liable for any loss, damage, or other matters
                of any sort incurred as the result of such dealings</p>
              <p><b>7. Disclaimers.</b></p>
              <p>Throughout the Site, we may provide links and pointers to Internet sites maintained by third parties.
                Our linking to such third-party sites does not imply an endorsement or sponsorship of such sites, or the
                information, products or services offered on or through the sites. In addition, neither we nor
                affiliates operate or control in any respect any information, products or services that third parties
                may provide on or through the Site or on websites linked to by us on the Site.</p>
              <p>If applicable, any opinions, advice, statements, services, offers, or other information or content
                expressed or made available by third parties, including information providers, are those of the
                respective authors or distributors, and not Company. Neither Company nor any third-party provider of
                information guarantees the accuracy, completeness, or usefulness of any content. Furthermore, Company
                neither endorses nor is responsible for the accuracy and reliability of any opinion, advice, or
                statement made on any of the Sites by anyone other than an authorized Company representative while
                acting in his/her official capacity.</p>
              <p>THE INFORMATION, PRODUCTS AND SERVICES OFFERED ON OR THROUGH THE SITE AND BY COMPANY AND ANY
                THIRD-PARTY SITES ARE PROVIDED 'AS IS' AND WITHOUT WARRANTIES OF ANY KIND EITHER EXPRESS OR IMPLIED. TO
                THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR
                IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
                PARTICULAR PURPOSE. WE DO NOT WARRANT THAT THE SITE OR ANY OF ITS FUNCTIONS WILL BE UNINTERRUPTED OR
                ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT ANY PART OF THIS SITE, OR THE SERVERS THAT MAKE IT
                AVAILABLE, ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.</p>
              <p>WE DO NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OR THE RESULTS OF THE USE OF THE SITE
                OR MATERIALS ON THIS SITE OR ON THIRD-PARTY SITES IN TERMS OF THEIR CORRECTNESS, ACCURACY, TIMELINESS,
                RELIABILITY OR OTHERWISE.</p>
              <p>YOU SPECIFICALLY UNDERSTAND THAT OUR SURVEYS, CONTENT AND ADVERTISEMENTS ARE MADE AVAILABLE TO YOU AS A
                RESULT OF YOUR AFFIRMATIVE USE OF A TOOLBAR APPLICATION THAT YOU PROCURED FROM A THIRD-PARTY COMPANY
                THAT IS NOT AFFILIATED IN ANYWAY WITH US. YOU FURTHER AGREE THAT WE ARE NOT RESPONSIBLE IN ANY WAY FOR
                SUCH APPLICATION OR ANY TECHNICAL ISSUES WITH SUCH THIRD-PARTY APPLICATION. ANY QUESTIONS, ISSUES,
                PROBLEMS, CONFLICTS OR COMPLAINTS REGARDING SUCH THIRD-PARTY TOOLBAR APPLICATION IS SUCH THIRD-PARTY
                COMPANY'S RESPONSIBILITY.</p>
              <p>COMPANY SHALL IN NO EVENT BE HELD LIABLE TO ANY PARTY FOR ANY DIRECT, INDIRECT, PUNITIVE, SPECIAL,
                INCIDENTAL OR OTHER CONSEQUENTIAL DAMAGES ARISING DIRECTLY OR INDIRECTLY FOR ANY REASON.</p>
              <p>You agree at all times to defend, indemnify and hold harmless Company and its affiliates from and
                against any and all claims, causes of action, damages, liabilities, costs and expenses, including legal
                fees and expenses, arising out of or related to your breach of any obligation, warranty, representation
                or covenant set forth herein.</p>
              <p><b>8. Limitation of Liability.</b></p>
              <p>WE MAKE NO REPRESENTATIONS OR WARRANTIES AS TO THE MERCHANTABILITY OF OUR OR OUR OR OUR PROVIDERS'
                SERVICE OR FITNESS FOR ANY PARTICULAR PURPOSE. YOU AGREE THAT YOU ARE RELEASING US FROM ANY LIABILITY
                THAT WE MAY OTHERWISE HAVE TO YOU IN RELATION TO OR ARISING FROM THIS AGREEMENT OR OUR PRODUCTS, FOR
                REASONS INCLUDING, BUT NOT LIMITED TO, FAILURE OF OUR SERVICE, NEGLIGENCE, OR ANY OTHER TORT. TO THE
                EXTENT THAT APPLICABLE LAW RESTRICTS THIS RELEASE OF LIABILITY, YOU AGREE THAT WE ARE ONLY LIABLE TO YOU
                FOR THE MINIMUM AMOUNT OF DAMAGES THAT THE LAW RESTRICTS OUR LIABILITY TO, IF SUCH A MINIMUM EXISTS. YOU
                AGREE THAT WE ARE NOT RESPONSIBLE IN ANY WAY FOR ANY LOSSES CAUSED BY THE PURCHASE OF SERVICES THROUGH
                OUR SERVICE. THIS INCLUDES ANY FAILURE OR DAMAGE CAUSED BY A SERVICE, INCLUDING INJURY TO PERSONS OR
                PROPERTY. WE ARE NOT LIABLE FOR ANY FAILURE OF THE GOODS OR SERVICES OF OUR COMPANY OR A THIRD PARTY,
                INCLUDING ANY FAILURES OR DISRUPTIONS, UNTIMELY DELIVERY, SCHEDULED OR UNSCHEDULED, INTENTIONAL OR
                UNINTENTIONAL, ON OUR SITE WHICH PREVENT ACCESS TO OUR SITE TEMPORARILY OR PERMANENTLY. THE PROVISION OF
                OUR SERVICE TO YOU IS CONTINGENT ON YOUR AGREEMENT WITH THIS AND ALL OTHER SECTIONS OF THIS AGREEMENT.
                NOTHING IN THE PROVISIONS OF THIS 'REPRESENTATIONS & WARRANTIES' SECTION SHALL BE CONSTRUED TO LIMIT THE
                GENERALITY OF THE FIRST PARAGRAPH OF THIS SECTION.</p>
              <p>For Jurisdictions that do not allow us to limit our liability: Notwithstanding any provision of these
                Terms, if your jurisdiction has provisions specific to waiver or liability that conflict with the above
                then our liability is limited to the smallest extent possible by law.</p>
              <p><b>9. Remedy for Dissatisfaction.</b></p>
              <p>If you are dissatisfied with the this site or with any terms, conditions, rules, policies, guidelines,
                or practices of this site in operating the this site, your sole and exclusive remedy is to discontinue
                using the this site.</p>
              <p>We may cancel or terminate your right to use the Site or any part of the Site at any time without
                notice. In the event of cancellation or termination, you are no longer authorized to access the part of
                the Site affected by such cancellation or termination. The restrictions imposed on you with respect to
                material downloaded from the Site, and the disclaimers and limitations of liabilities set forth in these
                Terms of Service, shall survive.</p>
              <p><b>10.</b></p>
              <p>The Digital Millennium Copyright Act of 1998 (the 'DMCA') provides recourse for copyright owners who
                believe that material appearing on the Internet infringes their rights under the U.S. copyright law. If
                you believe in good faith that materials hosted by COMPANY infringe your copyright, you, or your agent
                may send to COMPANY a notice requesting that the material be removed or access to it be blocked. Any
                notification by a copyright owner or a person authorized to act on its behalf that fails to comply with
                requirements of the DMCA shall not be considered sufficient notice and shall not be deemed to confer
                upon COMPANY actual knowledge of facts or circumstances from which infringing material or acts are
                evident. If you believe in good faith that a notice of copyright infringement has been wrongly filed
                against you, the DMCA permits you to send to COMPANY a counter-notice. All notices and counter notices
                must meet the then current statutory requirements imposed by the DMCA; see http://www.loc.gov/copyright
                for details. COMPANY's Copyright Agent for notice of claims of copyright infringement or counter notices
                can be reached as follows: <a href="/cdn-cgi/l/email-protection" class="__cf_email__"
                  data-cfemail="3851565e57787c77757d76717b79757d6b6b79167b7775">[email&#160;protected]</a></p>
              <p><b>11. Indemnity.</b></p>
              <p>You agree at all times to defend, indemnify, and hold us harmless for any and all claims, causes of
                action, damages, liabilities, costs and expenses, including legal fees and expenses, arising from or
                related to this Agreement or the provision of our Service to you, any damages caused by your use of our
                Site, any products or services you order from our affiliates, or any breach of this Agreement or the
                terms of use herein.by you or any third party In the event of a claim such as one described in this
                paragraph, we may elect to settle with the party/parties making the claim, and you shall be liable for
                the damages as though we had proceeded with a trial.</p>
              <p><b>12. Choice of Law.</b></p>
              <p>This Agreement shall be governed by the laws in force in the State of Ohio. The offer and acceptance of
                this contract is deemed to have occurred in the State of Ohio.</p>
              <p><b>13. Forum of Dispute.</b></p>
              <p>In order to keep claims involving this site simple, you agree that any claim you may bring against this
                site arising from or relating to this Agreement will be heard solely by a court of competent
                jurisdiction in the State of Ohio. Specifically, you agree that any disputes shall be heard, where
                eligible, solely within the small claims division ('Small Claims Court') of a State of Ohio county or
                municipal court, as established by chapter 1925 of the Ohio Revised Code.</p>
              <p>If the Small Claims Court has no jurisdiction to grant such relief, you will waive your right to obtain
                such relief against us.</p>
              <p>If you bring a dispute in a manner other than in accordance with this section, you agree that we may
                move to have it dismissed, and that you will be responsible for our reasonable attorneys' fees, court
                costs, and disbursements in doing so.</p>
              <p>You agree that the prevailing party in any dispute will be entitled to claim from the unsuccessful
                party the entire amount of the prevailing party's reasonable attorneys' fees, costs, and disbursements
                in relation to the dispute.</p>
              <p><b>14. Finality.</b></p>
              <p>This Agreement, including any and all documents referenced herein, constitute the entire agreement
                between this site and you pertaining to the subject matter hereof.</p>
              <p><b>15. Non-Waiver.</b></p>
              <p>this site's failure to insist upon or enforce strict performance of any provision of this Agreement
                shall not be construed as a waiver of any provisions or right. If any of the provisions contained in
                this Agreement be determined to be void, invalid or otherwise unenforceable by a court of competent
                jurisdiction, such determination shall not affect the remaining provisions contained herein. This
                Agreement shall be governed by and construed in accordance with the laws applicable in the State of
                Ohio, including the federal law of the United States.</p>
              <p><b>16. Prior Agreements.</b></p>
              <p>This Agreement, which includes the this site Privacy Policy, constitutes the entire agreement of the
                parties with respect to the subject matter hereto and supersedes and cancels all prior and
                contemporaneous agreements, claims, representations and understandings of the parties in connection with
                the subject matter addressed herein, oral or written.</p>
              <p>We reserve the right, at our sole discretion, to change, modify or otherwise alter these Terms and
                Conditions at any time. Unless otherwise indicated, amendments will become effective immediately.</p>
              <p>Please review these Terms and Conditions periodically. Your continued use of the Site following the
                posting of changes and/or modifications will constitute your acceptance of the revised Terms and
                Conditions and the reasonableness of these standards for notice of changes. For your information, this
                page was last updated as of the date at the top of these Terms of Service. Each access of information or
                submission of information to or from this site will be a separate, discrete transaction based on the
                then prevailing terms.</p>
              <p><b>17. Severability.</b></p>
              <p>In the event that a provision of this Agreement is found to be unlawful, conflicting with another
                provision of the Agreement, or otherwise unenforceable, the Agreement will remain in force as though it
                had been entered into without that unenforceable provision being included in it.</p>
              <p>If two or more provisions of this Agreement are deemed to conflict with each other's operation, this
                site shall have the sole right to elect which provision remains in force.</p>
              <p><b>18. Survivability.</b></p>
              <p>All provision</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script>
    $(document).ready(function () {
      var currentdate = new Date();
      var months = ['January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];

      $('.logo-container').append('<div class="rlt_logo"></div>')

      $('.date-full').html(months[currentdate.getMonth()] + " " + currentdate.getDate() + ", " + currentdate.getFullYear());
      if ($('#comment-page').length > 0) { $(".footer").addClass('fr'); }
    });
  </script>
  <script>
    const st = 0;
    const rightnow = "Right Now";
    const imageSquare = '<img alt="profileImage" class="comment-img" src="./files/75cc7d44e76045b80eed3904cf199783.png">';
  </script>
  <script src="./files/common.js"></script>
  <script>
    function startTimer(duration, display) {
      var timer = duration, minutes, seconds;
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.innerHTML = "<span>" + minutes + "</span>" + ":" + "<span>" + seconds + "</span>";
        if (--timer < 0) {
          timer = duration;
        }
      }, 1000);
    }
    window.onload = function () {
      var fiveMinutes = 30 * 13,
        display = document.querySelector('#time');
      startTimer(fiveMinutes, display);
    };
    function loadingOffers() {
      var defer = new $.Deferred();
      $('.continue').click(function () {
        $.getJSON("./files/offers_d.json", function (response) {
          defer.resolve(response);
          // $('.reward').last().addClass('out');
          // $('.reward.out .click_claim_btn').html('Out of Stock')
        });
      })
      return defer.promise();
    }
  </script>
</body>

<script>
  document.getElementById('button1').addEventListener("click", function () {
    var urlParams = new URLSearchParams(window.location.search);

    window.location.href = jumpurl;
  }, false);
</script>



<?php
if (($_GET['nopush'] !== "1") && ($_GET['src'] !== "TV")) {
  $aff_id = "2";
  if (!empty($_GET["s"])) {
    $aff_id = $_GET["s"];
  }

  $trk_urls = [
    "https://" . $_GET["trk"] . "/click/20"
  ];

  echo getPushCode("us", $aff_id, $trk_urls);
}
?>

<?php
$backbutton_url = "https://" . $_SERVER['HTTP_HOST'] . "/back-w14.php?c=" . $_GET['c'] . "&k=" . $_GET['k'] . "&id=" . $_GET['id'] . "&source=" . $_GET['source'];

echo getBackButton($backbutton_url);
?>

</html>