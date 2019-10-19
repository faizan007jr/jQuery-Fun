"use strict";

let iframeSrc = ["todolist.html", "pingpong.html", "tictactoe.html"];
let headerHeight;

$(document).ready(function () {
	const tabs = $(".tab");
	const tabsContent = $(".tab-content");
	headerHeight = 600;

	$("iframe").attr("src", iframeSrc[0]);

	$.each(tabs, function (tabIndex, tab) {
		$(tab).on("click", function () {
			$.each(tabs, function (index, tab) {
				if (index === tabIndex) {
					$(tab).addClass("active");
					$("iframe").attr("src", iframeSrc[tabIndex]);
					if ($('header').data('size') == 'big') {
						$("html,body").animate({
							scrollTop: $("#disp").offset().top - 500
						}, 1000);
					} else {
						$("html,body").animate({
							scrollTop: $("#disp").offset().top
						}, 1000);
					}
					if (index == 0) {
						document.title = "jQuery Fun: ToDO List";
					} else if (index == 1) {
						document.title = "jQuery Fun: Ping Pong";
					} else {
						document.title = "jQuery Fun: TicTacToe";
					}
					$("iframe").focus();
				} else {
					$(tab).removeClass("active");
				}
			});
		});
	});
	window.addEventListener("keydown", function (e) {
		if (e.keyCode == 38 || e.keyCode == 40) {
			e.preventDefault();
		}
	}, false);

	$(window).on("scroll", onScroll);

	$("#nav-icon").click(function () {
		$(this).toggleClass('open');
		$("#menu-overlay").toggleClass("menu-show");
		if ($("#menu-overlay").hasClass("menu-show")) {
			$(window).off("scroll");
		} else {
			$(window).on("scroll", onScroll);
		}
	});

	$('header').data('size', 'big');
});

let onScroll = function () {
	let headerHeight = $("header").outerHeight();

	if ($(window).scrollTop() >= headerHeight - 35) {
		$("#nav-icon").addClass("dark");
	} else {
		$("#nav-icon").removeClass("dark");
	}

	if ($(document).scrollTop() > 0) {
		if ($('header').data('size') == 'big') {
			$('header').data('size', 'small');
			$('header').stop().animate({
				height: '100px'
			}, 600);
		}
	} else {
		if ($('header').data('size') == 'small') {
			$('header').data('size', 'big');
			$('header').stop().animate({
				height: '600px'
			}, 600);
		}
	}
};

$(window).resize(function () {
	if ($(window).width() <= 768) {
		// do something here

	} else if ($(window).width() <= 1024) {

	}
});
