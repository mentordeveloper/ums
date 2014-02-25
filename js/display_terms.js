
$(document).ready(
		function() {

			var customdata = new Array();
			var counter = 0;

			// /loop thorugh all the textfields and check for dates
			var selected_choice = $('#id_term_type').val();
			
			if (selected_choice == 'quarters') {
				
                    customdata=$('#id_term_array').val();
					
				var enoded_data = JSON.stringify(customdata);
    
				send_ajax_call(enoded_data, 'no', 'skip');

			}

			if (selected_choice == 'semester') {
				  customdata=$('#id_term_array').val();
				 
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

function send_ajax_call(data, what, skip) {

	var checker1 = '';

	if (what == 'other') {
		checker1 = 'settings_hours_2_new';
	} else {
		checker1 = 'settings_hours_new';
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
					}
				}
			});

	var checker = '';

	if (what == 'other') {
		checker = 'settings_hours_break_2_new';
	} else {
		checker = 'settings_hours_break_new';
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

function confirm_breakes_go(obj) {
	// /display error overlapping
	for ( var k = 0; k < obj.length; k++) {
		$('#' + obj[k]['on']).html(obj[k]['html']).show();
		
		
	}
}
