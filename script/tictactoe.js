"use strict";

let player1;
let player2;
let currentPlayer;
let count = 0;

$(document).ready(function () {

	$("#player1").focus();
	$("#btnStart").on("click", (e) => {
		e.preventDefault();

		player1 = $("#player1").val();
		player2 = $("#player2").val();

		if (player1 == "" || player2 == "") {
			alert("Invalid input!!");
		} else {
			$(".formContainer").css("display", "none");
			currentPlayer = player1;
			displayPlayer();
		}
	});

	$(".gameSq").on("click", (e) => {
		let id = e.target.id;
		let xoro;

		if (currentPlayer == player1) {
			xoro = "x";
		} else {
			xoro = "o";
		}

		$("#" + id).html("<div class='" + xoro + "'></div>");

		$("#" + id + ":hover").css("cursor", "default");
		$("#" + id).off("click");
		
		count++;
		changeCurrentPlayer();
		checkWinner();
	});
});

let changeCurrentPlayer = () => {
	if (currentPlayer == player1) {
		currentPlayer = player2;
	} else {
		currentPlayer = player1;
	}

	displayPlayer();
};

let displayPlayer = () => {
	$("#currentPlayer h4").html(currentPlayer + "'s turn!!");
};

let checkWinner = () => {
	let grid = [];

	$.each($(".gameSq"), function (i, v) {
		grid[i] = v.id;
	});

	if (check([grid[0], grid[1], grid[2]])) {
		displayWinner(grid[0]);
		drawLine($("#sq1"),$("#sq3"),$(".line"));
	} else if (check([grid[3], grid[4], grid[5]])) {
		displayWinner(grid[3]);
		drawLine($("#sq4"),$("#sq6"),$(".line"));
	} else if (check([grid[6], grid[7], grid[8]])) {
		displayWinner(grid[6]);
		drawLine($("#sq7"),$("#sq9"),$(".line"));
	} else if (check([grid[0], grid[3], grid[6]])) {
		displayWinner(grid[0]);
		drawLine($("#sq1"),$("#sq7"),$(".line"));
	} else if (check([grid[1], grid[4], grid[7]])) {
		displayWinner(grid[1]);
		drawLine($("#sq2"),$("#sq8"),$(".line"));
	} else if (check([grid[2], grid[5], grid[8]])) {
		displayWinner(grid[2]);
		drawLine($("#sq3"),$("#sq9"),$(".line"));
	} else if (check([grid[0], grid[4], grid[8]])) {
		displayWinner(grid[0]);
		drawLine($("#sq1"),$("#sq9"),$(".line"));
	} else if (check([grid[2], grid[4], grid[6]])) {
		displayWinner(grid[2]);
		drawLine($("#sq3"),$("#sq7"),$(".line"));
	} else if(count == 9) {
		$("#currentPlayer h4").html("it's a draw!!");
		$("#currentPlayer h4").css("color", "#f03a17");
	}
};

let check = (ar) => {
	if ($("#" + ar[0] + " div").attr("class") == $("#" + ar[1] + " div").attr("class") && $("#" + ar[0] + " div").attr("class") == $("#" + ar[2] + " div").attr("class")) {
		if ($("#" + ar[0] + " div").attr("class") == "x" || $("#" + ar[0] + " div").attr("class") == "o") {
			return true;
		}
	}
};

let displayWinner = (gr) => {
	if ($("#" + gr + " div").attr("class") == "x") {
		$("#currentPlayer h4").html(player1 + " won!!");
	} else {
		$("#currentPlayer h4").html(player2 + " won!!");
	}
	$("#currentPlayer h4").css("color", "#f03a17");
	$(".gameSq").off("click");
};



let lineDistance = (x, y, x0, y0) => {
	return Math.sqrt((x -= x0) * x + (y -= y0) * y);
};

let drawLine = (a, b, line) => {
	$(".line").css("display", "block");
	let pointA = $(a).offset();
	let pointB = $(b).offset();
	let pointAcenterX = $(a).width() / 2;
	let pointAcenterY = $(a).height() / 2;
	let pointBcenterX = $(b).width() / 2;
	let pointBcenterY = $(b).height() / 2;
	let angle =
		Math.atan2(pointB.top - pointA.top, pointB.left - pointA.left) *
		180 /
		Math.PI;
	let distance = lineDistance(pointA.left, pointA.top, pointB.left, pointB.top);

	let i = 1;
	let x = setInterval(() => {
		if (i <= distance) {
			// Set Angle
			$(line).css("transform", "rotate(" + angle + "deg)");
			// Set Width
			$(line).css("width", i + "px");
			// Set Position
			$(line).css("position", "absolute");
			if (pointB.left < pointA.left) {
				$(line).offset({
					top: pointA.top + pointAcenterY,
					left: pointB.left + pointBcenterX
				});
			} else {
				$(line).offset({
					top: pointA.top + pointAcenterY,
					left: pointA.left + pointAcenterX
				});
			}
		} else {
			clearInterval(x);
		}
		i++;
	}, 1);
};
