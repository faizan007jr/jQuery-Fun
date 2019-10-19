"use strict";

$(document).ready(function () {
	let game; //timerID
	let over = false;

	let r = document.getElementById('right');
	let l = document.getElementById('left');
	let b = document.getElementById('ball');

	let rscore = document.getElementById('scoreleft');
	let lscore = document.getElementById('scoreright');
	let ogoal = document.getElementById('goal');

	let w = window.innerWidth;
	let h = window.innerHeight;

	let playerSpeed = 15;
	let speedx = 3;
	let speedy = 1;
	let balltime = 1;

	b.style.left = w / 2 + "px";

	$("#btnStart").on("click", (e) => {
		e.preventDefault();

		$(".formContainer").css("display", "none");
		setInterval(keydown, 10);
		moveball();
	});

	function nfp(urpx) {
		return Number(urpx.replace("px", ""))
	}

	let map = []; // keymap
	onkeydown = onkeyup = function (e) {
		if (e.keyCode == 38 || e.keyCode == 40) {
			e.preventDefault();
		}
		map[e.keyCode] = e.type == "keydown" ? true : false;
	}

	function keydown() {
		//if key was down arrow
		if (map[40]) {
			if (nfp(r.style.top) + playerSpeed > h - 200)
				r.style.top = h - 200 + "px";
			else
				r.style.top = nfp(r.style.top) + playerSpeed + "px";
		}

		//if key was up arrow
		else if (map[38]) {
			if (nfp(r.style.top) - playerSpeed < 0)
				r.style.top = 0 + "px";
			else
				r.style.top = nfp(r.style.top) - playerSpeed + "px";
		}

		//if key was s
		if (map[83]) {
			if (nfp(l.style.top) + playerSpeed > h - 200)
				l.style.top = h - 200 + "px";
			else
				l.style.top = nfp(l.style.top) + playerSpeed + "px";
		}

		//if key was w
		else if (map[87]) {
			if (nfp(l.style.top) - playerSpeed < 0)
				l.style.top = 0 + "px";
			else
				l.style.top = nfp(l.style.top) - playerSpeed + "px";
		}
	}

	function ball() {
		b.style.left = nfp(b.style.left) + speedx + "px";
		b.style.top = nfp(b.style.top) + speedy + "px";
	}

	function moveball() {
		ball();

		//remove overflow y
		if (h < nfp(b.style.top) + 20 || nfp(b.style.top) < 0) {
			speedy *= -1;
		}

		//overflow-x right
		if (nfp(b.style.left) >= w - 50) {
			if (nfp(r.style.top) <= nfp(b.style.top) + 20 && nfp(r.style.top) + 200 >= nfp(b.style.top)) {
				speedx *= -1;
			} else if (nfp(b.style.left) >= w - 20)
				goal('left');
		}

		//remove overflow x in left to get the goal in left
		if (nfp(b.style.left) <= 30) {
			if (nfp(l.style.top) <= nfp(b.style.top) + 20 && nfp(l.style.top) + 200 >= nfp(b.style.top)) {
				speedx *= -1;
			} else if (nfp(b.style.left) <= 0)
				goal('right');
		}

		game = setTimeout(moveball, balltime);
		if (over) {
			clearTimeout(game);
		}

	}

	function goal(pos) {
		ogoal.style.display = "block";
		setTimeout(function () {
			ogoal.style.display = "none";
		}, 1000);
		if (pos == "left") {
			let rs = parseInt(rscore.innerHTML) + 1;
			rscore.innerHTML = rs;
			if (rs == 7) {
				over = true;
				alert("Left Player is the Winner!!!");
			}
		} else {
			let ls = parseInt(lscore.innerHTML) + 1;
			lscore.innerHTML = ls;
			if (ls == 7) {
				over = true;
				alert("Right Player is the Winner!!!");
			}
		}
		speedx *= -1;
		b.style.left = w / 2 + "px";
	}
});
