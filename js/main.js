// 0 is by county, 1 is by state
var state = 0;

var inputData = [];
inputData["c06071"] = 10;

var yellow_states={};

$(document).ready(function() {



	$('.results').hide();

	// TO DO
	// color counties with Hertz yellow to start
	coloryellow();

	$('.counties path').mouseover(function() {
		if (state == 0) {
			$(this).css("fill", "#9A009E");
		}
		else {
			var state_code = $(this).attr("id").split(",")[1].trim();
			$('.counties').children().each(function () {
				if ($(this).attr("id").indexOf(state_code) > -1) {
					$(this).css("fill", "#9A009E");
				}

			});
		}

		// TO DO
		// dummy conditional - should be IF THERE IS HERTZ STATION IN COUNTY
		if ($(this).attr("id").indexOf('AK') > -1 || 
			$(this).attr("id").indexOf('TX') > -1 || 
			$(this).attr("id").indexOf('CA') > -1 || 
			$(this).attr("id").indexOf('PA') > -1) {
			populateResults($(this));
		$('.results').show();
	}
});

	$('.counties path').mouseleave(function() {
		if (state == 0) {
			$(this).css("fill", "white");
		}
		else {
			var state_code = $(this).attr("id").split(",")[1].trim();
			$('.counties').children().each(function () {
				if ($(this).attr("id").indexOf(state_code) > -1) {
					$(this).css("fill", "#FFF");
				}
			});
		}
		if($(this).data("isYellow") == 1) {
			$(this).css("fill", "#FFF600");
		}
		$('.results').hide();
	});

	$('#toggle').click(function(){
		$('#state').empty();
		if ($('#toggle img').attr("src") == "img/toggle_left.svg") {
			$('#toggle img').attr("src", "img/toggle_right.svg");
			$('#state').html("BY STATE");
			state = 1;
		}
		else {
			$('#toggle img').attr("src", "img/toggle_left.svg");
			$('#state').html("BY COUNTY");
			state = 0;
		}
	});

});

// svg set up - color counties with Hertz yellow
function coloryellow() {
	$('.counties').children().each(function () {
		var fipsCode = $(this).attr("class");
		if(typeof inputData[fipsCode] != 'undefined') {
			var state_code = $(this).attr("id").split(",")[1].trim();
			if (state_code in yellow_states) {
				var fips_list = yellow_states[state_code];
				fips_list.push(fipsCode);
				yellow_states[state_code] = fips_list;
			}
			else {
				yellow_states[state_code] = [fipsCode];
			}
			$(this).data("isYellow", 1);
			$(this).css("fill", "#FFF600");
		}
	});
	console.log(yellow_states);
}


function populateResults(county) {
	leaving(county);
	arriving(county);
}

// TO DO
// 1. calculate top 3 drain/feeder counties
// 2. color relevant counties red/green
// 3. generate result circles (append)
function leaving(county) {
	$('#leaving').empty();

	var county_name = county.attr("id");
	console.log(county_name);

	$('#leaving')
	.append(
		$('<div>').attr("class", "info")
		.append(
			$('<div>').attr("class", "hd").html("Leaving")
			)
		.append(
			$('<div>').attr("class", "data").html(county_name)
			)
		);
}

function arriving(county) {
	$('#arriving').empty();

	var county_name = county.attr("id");
	console.log(county_name);

	$('#arriving')
	.append(
		$('<div>').attr("class", "info")
		.append(
			$('<div>').attr("class", "hd").html("Arriving")
			)
		.append(
			$('<div>').attr("class", "data").html(county_name)
			)
		);
}


// TO DO SUGGESTIONS
