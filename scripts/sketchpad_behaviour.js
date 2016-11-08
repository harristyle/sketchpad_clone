// var waitForFinalEvent = (function () {
//   var timers = {};
//   return function (callback, ms, uniqueId) {
//     if (!uniqueId) {
//       uniqueId = "Don't call this twice without a uniqueId";
//     }
//     if (timers[uniqueId]) {
//       clearTimeout (timers[uniqueId]);
//     }
//     timers[uniqueId] = setTimeout(callback, ms);
//   };
// })();

function divide_Page(row, column){ // generates divs to divide page into grid of num blocks of sqrt(num)*sqrt(num)
	row = parseInt(row);
	column = parseInt(column);
	if (isNaN(row) || isNaN(column)){ // add a check to see if sqrt of num is and integer.
		// console.log(1);
		return;
	}
	$("div.grid").remove();

	var $container = $("#grid_container")
	var wwidth = $container.width();
	var wheight = $container.height();
	console.log("width is:" +wwidth+ " height is:" +wheight);
	for (var j=0;j<column;j++){
		for (var i=0;i<row;i++){
			$new_div = $("<div>");
			$new_div.addClass("grid");
			$new_div.data("hovered", 0);
			$new_div.width((wwidth / row));
			$new_div.height((wheight / column));
			$container.append($new_div);
		}
	}
}
function mapper(start, end, index){ //rgb => start=0;end=255;0<=index<=1;
	return Math.floor((start + end) * index);
}

function return_rgb_values(rgb_string){ // string looks like: rgb(num, num, num)
	return rgb_string.match(/\d+/g);
}

function change_Color(){
	hovered = +$(this).data("hovered");
	// console.log(hovered);
	if (hovered===0){
		r = Math.floor(mapper(0,255,Math.random()));
		g = Math.floor(mapper(0,255,Math.random()));
		b = Math.floor(mapper(0,255,Math.random()));
		$(this).data("initial_rgb", r +","+ g +","+ b);
	}
	else{
		rgb = return_rgb_values($(this).data("initial_rgb"));
		// console.log(rgb);
		r = Math.floor(rgb[0] * (1 - hovered/10)); //make it 1/10 darker everytime.
		g = Math.floor(rgb[1] * (1 - hovered/10)); //make it 1/10 darker everytime.
		b = Math.floor(rgb[2] * (1 - hovered/10)); //make it 1/10 darker everytime.
	}
	// console.log(r,g,b);
	$(this).css({"background-color":"rgb(" +r+ "," +g+ "," +b+ ")"});
	$(this).data("hovered", hovered+1);
	if (hovered === 10)
		$(this).data("hovered", 1);
};

function change_Grid(event){
	event.preventDefault();
	var $inputs = $("#rc_form :input");
	var values = {};
   	$inputs.each(function() {
        values[this.name] = $(this);
    });
    $row = values.row;
    $column = values.column;
    divide_Page($row.val(), $column.val())
    $row.val("");
    $column.val("");
}

$(document).ready(function(){
	var $window = $(window);
	divide_Page(7,7);
	$("#grid_container").on("mouseenter","div.grid",change_Color);
	$("#rc_form").on("submit", function(event){change_Grid(event)});
});