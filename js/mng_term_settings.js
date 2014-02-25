$(function() {

	$(".overall_pickers").datepicker({
		dateFormat : "mm-dd-yy"
	});
	/* $('#myTab a[href="#'+$('#tab_pick').val()+'"]').tab('show'); */
$('.content .msgsuccess').slideUp(5000);
});
function Reset_default_new() {

	$('#date1').val($('#date1_default').val());
	$('#date2').val($('#date2_default').val());
	$('#date3').val($('#date3_default').val());
	$('#date4').val($('#date4_default').val());
	$('#date5').val($('#date5_default').val());
	$('#date6').val($('#date6_default').val());
	$('#date7').val($('#date7_default').val());
	$('#date8').val($('#date8_default').val());

	$('#check_input').closest('tr').find("input,textarea").each(function() {

		if ($(this).attr('type') == 'text') {
			$('#html_overlap').html('').show();
			$(this).css('border', '1px solid #CCCCCC');
		}

	});

	$('#break1').html('');
	$('#break2').html('');
	$('#break3').html('');
	$('#break4').html('');

	Enabled_everything_now();

}

function Reset_default_semester() {

	$('#date11').val($('#date11_default').val());
	$('#date22').val($('#date12_default').val());
	$('#date33').val($('#date13_default').val());
	$('#date44').val($('#date14_default').val());
	$('#date55').val($('#date15_default').val());
	$('#date66').val($('#date16_default').val());

	$('#check_input_1').closest('tr').find("input,textarea").each(function() {

		if ($(this).attr('type') == 'text') {
			$('#html_overlap').html('').show();
			$(this).css('border', '1px solid #CCCCCC');
		}

	});
	$('#break5').html('');
	$('#break6').html('');
	$('#break7').html('');
	Enabled_everything_now();

}

$(document).ready(function() {

	// /if this is by default no selection
	if ($('#type_selector').val() == 'semester') {
		$('#semester_ui').show();
		$('#semester_ui_save').show();
		$("#term_selection option[value='semesters']").prop('selected', true);

	}

	if ($('#type_selector').val() == 'quarters') {
		$('#quarters_ui').show();
		$('#quarters_ui_save').show();
		$("#term_selection option[value='quarters']").prop('selected', true);

	}

});

$(document).ready(
		function() {

			var customdata = new Array();
			var counter = 0;

			// /loop thorugh all the textfields and check for dates
			var selected_choice = $('#term_selection :selected').val();

			if (selected_choice == 'quarters') {
				$('#check_input').closest('tr').find("input,textarea").each(
						function() {

							if ($(this).attr('type') == 'text') {
								if ($(this).attr('id') != 'exculde') {
									customdata[counter] = $(this).val();
									counter++;
								}
							}

						});

				var enoded_data = JSON.stringify(customdata);

				send_ajax_call(enoded_data, 'no', 'skip');

			}

			if (selected_choice == 'semester') {
				$('#check_input_1').closest('tr').find("input,textarea").each(
						function() {

							if ($(this).attr('type') == 'text') {
								if ($(this).attr('id') != 'exculde') {
									customdata[counter] = $(this).val();
									counter++;
								}
							}
						});

				var enoded_data = JSON.stringify(customdata);

				send_ajax_call(enoded_data, 'other', 'skip');

			}

		});

$('.overall_pickers').change(
		function() {

			var customdata = new Array();
			var counter = 0;
			// /loop thorugh all the textfields and check for dates

			var selected_choice = $('#term_selection :selected').val();

			if (selected_choice == 'quarters') {
				$('#check_input').closest('tr').find("input,textarea").each(
						function() {

							if ($(this).attr('type') == 'text') {
								if ($(this).attr('id') != 'exculde') {
									customdata[counter] = $(this).val();
									counter++;
								}
							}
						});

				var enoded_data = JSON.stringify(customdata);

				send_ajax_call(enoded_data, 'no', 'no');

			}

			if (selected_choice == 'semester') {

				$('#check_input_1').closest('tr').find("input,textarea").each(
						function() {

							if ($(this).attr('type') == 'text') {
								if ($(this).attr('id') != 'exculde') {
									customdata[counter] = $(this).val();
									counter++;
								}
							}

						});

				var enoded_data = JSON.stringify(customdata);
				send_ajax_call(enoded_data, 'other', 'no');

			}

		});

function validate_call($obj) {

	if (confirm('Are you sure you want to change settings?')) {
		$obj.submit();
	} else {
		return false;
	}

	return false;

}
function Diabled_everything_now() {

	$('#update_1').prop('disabled', true);
	$('#update_2').prop('disabled', true);
	$('#save_1').prop('disabled', true);
	$('#save_2').prop('disabled', true);

}

function Enabled_everything_now() {

	$('#update_1').prop('disabled', false);
	$('#update_2').prop('disabled', false);
	$('#save_1').prop('disabled', false);
	$('#save_2').prop('disabled', false);

}

function send_ajax_call(data, what, skip) {

	var checker1 = '';

	if (what == 'other') {
		checker1 = 'settings_hours_2';
	} else {
		checker1 = 'settings_hours';
	}

	$
			.ajax({
				url : $('#base_url').val() + "permissions/" + checker1,
				type : "GET",
				data : 'data=' + data,
				context : document.body,
				cache : false,
				success : function(data) {

					var counter = 1;
					
					var obj = JSON.parse(data);
					var other_counter = 1;

					if (obj.length > 0) {
						// /display error overlapping
						for ( var k = 0; k < obj.length; k++) {

							if (what == 'other') {
								$('#html_overlap_1')
										.html(
												'<div class="alert alert-error">Overlapping Dates</div>')
										.show();
							} else {
								$('#html_overlap')
										.html(
												'<div class="alert alert-error">Overlapping Dates</div>')
										.show();
							}

							$('#' + obj[k]).css('border', '2px solid red');
						}

						Diabled_everything_now();

					} else {
						$('#check_input')
								.closest('tr')
								.find("input,textarea")
								.each(
										function() {

											if ($(this).attr('type') == 'text') {
												$('#html_overlap').html('')
														.show();
												$(this).css('border',
														'1px solid #CCCCCC');
												$('#html_overlap_1').html('')
														.show();
											}

											Enabled_everything_now();

										});
										$('#check_input_1')
								.closest('tr')
								.find("input,textarea")
								.each(
										function() {

											if ($(this).attr('type') == 'text') {
												$('#html_overlap').html('')
														.show();
												$(this).css('border',
														'1px solid #CCCCCC');
												$('#html_overlap_1').html('')
														.show();
											}

											Enabled_everything_now();

										});
					}
				}
			});

	var checker = '';

	if (what == 'other') {
		checker = 'settings_hours_break_2';
	} else {
		checker = 'settings_hours_break';
	}

	$.ajax({
		url : $('#base_url').val() + "permissions/" + checker,
		type : "GET",
		data : 'data=' + data,
		context : document.body,
		cache : false,
		success : function(data) {
	
			var counter = 1;

			var obj = JSON.parse(data);
			var other_counter = 1;

			if (obj.length > 0) {
				if (skip == 'skip') {
					confirm_breakes_go(obj);
				} else {
					confirmation_breakes(obj);
				}
			}
		}
	});

}

function confirm_breakes_go(obj) {
	// /display error overlapping
	for ( var k = 0; k < obj.length; k++) {
		$('#' + obj[k]['on']).html(obj[k]['html']).show();
	}
}

function confirmation_breakes(obj) {

	var checker = 0;

	for ( var k = 0; k < obj.length; k++) {
		if (obj[k]['html'] == '') {
			$('#' + obj[k]['on']).html(obj[k]['html']).show();
			checker++;
		}

	}

	if (obj.length != checker) {
		confirm_breakes_go(obj);
	}
}

function Modfiy_options() {
	var value = $('#term_selection :selected').val();

	// //changing settings needs to ask the user about 1 year lock on going for
	// new settings once set
var customdata = new Array();
			var counter = 0;


	if (value == 'quarters') {
		$('#check_input').closest('tr').find("input,textarea").each(
						function() {

							if ($(this).attr('type') == 'text') {
								if ($(this).attr('id') != 'exculde') {
									customdata[counter] = $(this).val();
									counter++;
								}
							}

						});
            
		var enoded_data = JSON.stringify(customdata);
       
		send_ajax_call(enoded_data, 'no', 'skip');
	
		$('#quarters_ui').slideDown();
		$('#quarters_ui_save').slideDown();
		$('#semester_ui').slideUp();
		$('#semester_ui_save').slideUp();
		$('#manual_save').slideUp();
	
		Enabled_everything_now();

	}

	if (value == 'semester') {
	
		$('#check_input_1').closest('tr').find("input,textarea").each(
						function() {

							if ($(this).attr('type') == 'text') {
								if ($(this).attr('id') != 'exculde') {
									customdata[counter] = $(this).val();
									counter++;
								}
							}
						});
		
		var enoded_data = JSON.stringify(customdata);
	
        send_ajax_call(enoded_data, 'other', 'skip'); 
	   
		$('#quarters_ui').slideUp();
		$('#quarters_ui_save').slideUp();
		$('#manual_save').slideUp();
		
		Enabled_everything_now();

		$('#semester_ui').slideDown();
		$('#semester_ui_save').slideDown();

	}
}
