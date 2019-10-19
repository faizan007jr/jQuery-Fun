let dayNum = '';
let month = '';
let year = '';
let dayName = '';
let toDO = [];

$(document).ready(function () {
	if (sessionStorage.toDO != undefined) {
		toDO = sessionStorage.toDO.split(",");
		display();
	}
	$('#btnAdd').click(onBtnAdd);

	$("#addItem").keyup(function (event) {
		if (event.keyCode == 13) {
			onBtnAdd();
		}
	});

	$(document).on('dblclick', 'li', function () {
		let str = $(this).text();
		for (let i = 0; i < toDO.length - 1; i++) {
			if (toDO[i] === str) {
				toDO.splice(i, 1);
			}
		}
		sessionStorage.toDO = toDO;
		$(this).toggleClass('strike').fadeOut('slow');
	});

	$('input').focus(function () {
		$(this).val('');
	});

	$('ol').sortable();

	getCurrentDay();

	$(".day-number").html(dayNum);
	$(".month").html(month);
	$(".year").html(year);
	$(".today").html(dayName);
	$(".container").css("display", "none");

});

let display = function () {
	let str = "";
	for (let i = 0; i < toDO.length; i++) {
		str += "<li>";
		str += "<label class='checkbox'>";
		str += "<input type='checkbox' />";
		str += "<i class='fa'></i>";
		str += toDO[i];
		str += "</label>";
		str += "</li>";
	}
	$('ol').html(str);
};

let onBtnAdd = function () {
	let toAdd = $('input[name=ListItem]').val();
	toDO.push(toAdd);
	sessionStorage.toDO = toDO;
	display();
	$('input[name=ListItem]').val("");
	$(".container").css("display", "none");
};


let getCurrentDay = function () {
	const today = new Date();
	let dayN = moment(today).format('dddd');

	let [monthDay, y] = moment().format('ll').split(',');
	let [m, day] = monthDay.split(' ');

	m = m.toUpperCase();
	dayN = dayN.toUpperCase();

	dayNum = day;
	month = m;
	year = y;
	dayName = dayN;
};

let addTask = function () {
	$(".container").css("display", "block");
	$('#addItem').focus();
};
