var answers = document.querySelectorAll(".inn-q-select");
var lastQnum = document.querySelectorAll("#inn-last-q-item .inn-q-select").length;

function toNext(ele) {
	if (ele.value == "1") {
		document.getElementsByClassName("con-body-ln1")[0].classList.add("animate__animated");
		document.getElementsByClassName("con-body-ln1")[0].classList.add("animate__fadeOut");
		setTimeout(function () {
			document.getElementsByClassName("con-body-ln1")[0].style.display = "none";
		}, 500);
	}
	var ancestor = ele.parentElement.parentElement;
	var next = ancestor.nextElementSibling;
	ancestor.classList.add("animate__animated");
	ancestor.classList.add("animate__fadeOut");
	setTimeout(function () {
		ancestor.style.display = "none";
	}, 490);
	setTimeout(function () {
		next.classList.add("animate__animated");
		next.classList.add("animate__fadeIn");
		next.style.display = "block";
	}, 490);
}

var states = [
	document.getElementById("inn-q-progress-state1"),
	document.getElementById("inn-q-progress-state2"),
	document.getElementById("inn-q-progress-state3"),
	document.getElementById("inn-q-progress-state4"),
];

var dones = [document.getElementById("inn-q-progress-dones2"), document.getElementById("inn-q-progress-dones3"), document.getElementById("inn-q-progress-dones4")];

var loadImg = document.getElementById("inn-q-progress-loading");
var loadBgCol = document.getElementById("content-changeCol");

function drawloader() {
	setTimeout(function () {
		dones[0].style.display = "block";
		dones[0].classList.add("animate__animated");
		dones[0].classList.add("animate__fadeInUp");
	}, 1500);

	setTimeout(function () {
		states[0].style.display = "block";
		states[0].classList.add("animate__animated");
		states[0].classList.add("animate__fadeOut");
		dones[0].style.color = "#34ae21";
		loadImg.classList.add("animate__animated");
		loadImg.classList.add("animate__bounceIn");
		loadBgCol.style.backgroundImage = "linear-gradient(to right, #e3ffdf,#fff,#fff,#fff,#e3ffdf)";
	}, 2300);

	setTimeout(function () {
		states[0].style.display = "none";
		states[1].style.display = "block";
		states[1].classList.add("animate__animated");
		states[1].classList.add("animate__fadeIn");
		dones[0].classList.add("animate__animated");
		dones[0].classList.add("animate__fadeOut");
		loadImg.classList.remove("animate__animated");
		loadImg.classList.remove("animate__bounceIn");
		loadBgCol.style.backgroundImage = "linear-gradient(to right, #fff,#fff,#fff,#fff,#fff)";
	}, 3500);

	setTimeout(function () {
		dones[0].style.display = "none";
		dones[1].style.display = "block";
		dones[1].classList.add("animate__animated");
		dones[1].classList.add("animate__fadeInUp");
	}, 5500);

	setTimeout(function () {
		states[1].style.display = "block";
		states[1].classList.add("animate__animated");
		states[1].classList.add("animate__fadeOut");
		dones[1].style.color = "#34ae21";
		loadImg.classList.add("animate__animated");
		loadImg.classList.add("animate__bounceIn");
		loadBgCol.style.backgroundImage = "linear-gradient(to right, #e3ffdf,#fff,#fff,#fff,#e3ffdf)";
	}, 6300);

	setTimeout(function () {
		states[1].style.display = "none";
		states[2].style.display = "block";
		states[2].classList.add("animate__animated");
		states[2].classList.add("animate__fadeIn");
		dones[1].classList.add("animate__animated");
		dones[1].classList.add("animate__fadeOut");
		loadImg.classList.remove("animate__animated");
		loadImg.classList.remove("animate__bounceIn");
		loadBgCol.style.backgroundImage = "linear-gradient(to right, #fff,#fff,#fff,#fff,#fff)";
	}, 7500);

	setTimeout(function () {
		dones[1].style.display = "none";
		dones[2].style.display = "block";
		dones[2].classList.add("animate__animated");
		dones[2].classList.add("animate__fadeInUp");
	}, 9500);

	setTimeout(function () {
		states[2].style.display = "block";
		states[2].classList.add("animate__animated");
		states[2].classList.add("animate__fadeOut");
		dones[2].style.color = "#34ae21";
		loadImg.classList.add("animate__animated");
		loadImg.classList.add("animate__bounceIn");
		loadBgCol.style.backgroundImage = "linear-gradient(to right, #e3ffdf,#fff,#fff,#fff,#e3ffdf)";
	}, 10300);

	setTimeout(function () {
		states[2].style.display = "none";
		states[3].style.display = "block";
		states[3].classList.add("animate__animated");
		states[3].classList.add("animate__fadeIn");
		dones[2].classList.add("animate__animated");
		dones[2].classList.add("animate__fadeOut");
		loadImg.classList.remove("animate__animated");
		loadImg.classList.remove("animate__bounceIn");
		loadBgCol.style.backgroundImage = "linear-gradient(to right, #fff,#fff,#fff,#fff,#fff)";
	}, 11500);

	setTimeout(function () {
		document.getElementById("verif-content").classList.add("animate__animated");
		document.getElementById("verif-content").classList.add("animate__fadeOut");
	}, 13500);

	setTimeout(function () {
		document.getElementById("verif-content").style.display = "none";
		document.getElementById("prize-content-1").style.display = "block";
		document.getElementById("prize-content-1").classList.add("animate__animated");
		document.getElementById("prize-content-1").classList.add("animate__fadeIn");
		/* document.getElementById("content-changeCol").style.backgroundImage = "url('../images/banner.jpg')"; */
	}, 14000);

	setTimeout(function () {
		document.getElementById("prize-content-2").style.display = "block";
		document.getElementById("prize-content-2").classList.add("animate__animated");
		document.getElementById("prize-content-2").classList.add("animate__fadeIn");
		document.getElementById("nothing-id").style.display = "none";
		document.getElementById("comments").style.display = "block";
		document.getElementById("comments").classList.remove("animate__fadeOut");
		document.getElementById("comments").classList.add("animate__fadeIn");
		document.getElementById("con-footer").style.display = "block";
		document.getElementById("con-footer").classList.remove("animate__fadeOut");
		document.getElementById("con-footer").classList.add("animate__fadeIn");
	}, 15000);
}

for (var i = 0; i < answers.length; i++) {
	if (i < answers.length - lastQnum) {
		answers[i].onclick = function () {
			toNext(this);
		};
	} else {
		answers[i].onclick = function () {
			toNext(this);
			document.getElementById("comments").classList.add("animate__animated");
			document.getElementById("comments").classList.add("animate__fadeOut");
			document.getElementById("con-footer").classList.add("animate__animated");
			document.getElementById("con-footer").classList.add("animate__fadeOut");
			setTimeout(function () {
				document.getElementById("comments").style.display = "none";
				document.getElementById("con-footer").style.display = "none";
				document.getElementById("content-changeCol").style.backgroundImage = "none";
				drawloader();
			}, 600);
		};
	}
}

document.getElementById("btn-claim").onclick = function () {
	var modsclaim = document.getElementById("modal-prize");
	modsclaim.classList.add("mod-con-bg");
	modsclaim.children[0].classList.add("mod-con-inn");
	modsclaim.classList.remove("hidden");
	var modsprize = document.getElementById("prize-ln2-desc").innerText;
	document.getElementById("modal-head-prod").innerText = modsprize;
	document.getElementById("modal-head-prod2").innerText = modsprize;
};