// Use the Google Loader script to load the google.picker script.

jQuery.validator.addMethod("digitsOnly", function(value, element) { 
  			 return this.optional(element) || /^\d+$/i.test(value);
            }, "Please enter only numbers");

jQuery.validator.addMethod("alphabetsOnly", function(value, element) { 
  			 return this.optional(element) || /^[a-z]+$/i.test(value);
            }, "Please enter only letters");
	function send_notification()
	{
			
			var value = $("#field_courses option:selected").val();
                        
			var value_text = $("#field_courses option:selected").text();
			 $('#notification_sended').html('');
			if(value==0 || value_text=='Personal')
			{
				
			 $('#notification_sended').html('<div class="alert alert-error"><button data-dismiss="alert" class="close"></button><strong>Error !</strong>Please select course!</div>');
			 
			 $('#notification_sended').show();
						
			}else{
					
			if($('#notification_text').val()=='')
				{
					
				    $('#notification_sended').html('<div style="color:red" ><strong>Error!</strong> Please provide text!</div>');
					
					$('#notification_sended').show();
					
				}else
				{
					///trigger the thml in popup
					generate_html_notification();
					
				}
				
			}

	}
	
	///send notifcation call start
	function generate_html_notification()
	{
		
		var path = '';
		
		if($('#uiview').val())
		{
			path = $('#base_url').val()+"instructor/generate_send_notification_html_role/";
		}else
		{
			path = $('#base_url').val()+"instructor/generate_send_notification_html/";
		}
		
		////it geneeretes html for the courses
							
							$.ajax({
							url: path,
							type: "GET",
							data:"course_id="+$("#field_courses option:selected").val(),
							context: document.body,
							cache: false,
							success: function(data){
								
									$('#inline1_notification').html(data);
									$("#notification_chooser").fancybox().trigger('click');
									$("#notification_text").val('');
									
								}
							
							});	
	}
	function trigger_notification_by_role()
	{
		
			var return_data = ui_access_trigger();
			
			if(return_data=='all')
			{
								//////////////if its 0 then 1 thing is confirm it should display notification
								
								$('<div></div>').appendTo('body')
									.html('<div><h6>Send message to all Roles?</h6></div>')
									.dialog({
										modal: true, title: 'Sending confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: {
											Yes: function () {
													
												push_call_confirm_roles();
												$('#notification_sended').show();
												$(this).dialog("close");
												$('#inline1_email_confirm').html('<div style="margin-bottom:0px;" class="portlet box green"><div class="portlet-title"><div class="caption">Notification</div></div><div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><strong>Success!</strong> Notifications Sent! </div></div> ');
												$("#email_confirm_chooser").fancybox().trigger('click');
												
											},
											No: function () {
												$(this).dialog("close");
											}
										},
										close: function (event, ui) {
											$(this).remove();
										}
									});
									
								///////////////////aler code end
				
			}else
			{
				
				var res = '';
				var success = 0;
				if(return_data.length==0)
				{
				$('#notifications_send').html('<div style="color:red"> Please select some option!</div>');
				
				return 0;
				}
				for(var k=0;k<return_data.length;k++)
				{
						push_call_by_role(return_data[k]);
	
				}
					
				$('#notification_sended').show();
				
				$('#inline1_email_confirm').html('<div style="margin-bottom:0px;" class="portlet box green"><div class="portlet-title"><div class="caption">Notification</div></div><div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><strong>Success!</strong> Notifications Sent! </div></div> ');
				$("#email_confirm_chooser").fancybox().trigger('click');
				
				
			}

							
	}
	
	function ui_access_trigger()
	{
		
		var master = '';
		var selectors_ids=new Array(); 
		var counter = 0;
		 
			$("input[name='options[]']:checked").each(function ()
				{
					
					if($(this).val()=='all')
					{
						master = 'all';
					}else
					{
						selectors_ids[counter] = $(this).val();
					}
					
					counter++;
					
				});
		
		if(master=='all')
		{
			return 'all';
				
		}else
		{
			return selectors_ids;		
		}
			
	}
	
function createPicker() {

	google.load('picker', '1');

	var view = new google.picker.View(google.picker.ViewId.DOCS);
	var picker = new google.picker.PickerBuilder()

	.enableFeature(google.picker.Feature.MULTISELECT_ENABLED).setAppId(
			"17296771986.apps.googleusercontent.com").setOAuthToken(
			"4/pAuvPJRATytJKaJNm-GzC8ycAk-y.0qn_1X_2ksUbOl05ti8ZT3Z1khhlfQI") // Optional:
	// The
	// auth
	// token
	// used
	// in
	// the
	// current
	// Drive
	// API
	// session.
	.addView(view).addView(new google.picker.DocsUploadView()).setCallback(
			pickerCallback).build();
	picker.setVisible(true);
}

// A simple callback implementation.
function pickerCallback(data) {
	if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
		var doc = data[google.picker.Response.DOCUMENTS][0];
		url = doc[google.picker.Document.URL];
	}

	ajax_call_google_docs(url, $('#get_evid').val());

}
$('#city_sch').click(function() {
	
$('#city_id').html('');
});

$('#ad_univ_zip').click(function() {
	
$('#zip_id').html('');
});

$('#ad_univ_state').click(function() {
	
$('#state_id').html('');
});



			
		//$('#save_univ_info').live('click',function(){
			
			//var myresult =

			$("#form_event").validate({
										rules: {
											add_1: {
												 
												 required: true,
												},
											city_sch: {
												required: true,
												alphabetsOnly: true,
											},
											state_sch: {
												required: true,
												alphabetsOnly: true,
											},
											zip_sch: {
												required: true,
												digitsOnly: true,
											},
											email_sch: {
												required:true,
												email: true,
											},
											phn_sch: {
												required: true,
												digitsOnly: true,
											
											},
											
										},
										messages: {
											
											add_1: "Please enter address ", 
											city_sch:{
												required: "Please enter city",
												alphabetsOnly: "Please enter letters only"
											},
											state_sch: { 
												required:"Please enter state",
												alphabetsOnly: "Please entere letters only"
											},
											zip_sch: { 
												required:"Please enter zip",
												digitsOnly: "Please enter digits only",
											},
											email_sch: {
												required:"Please enter email address",
												email: "Please enter valid email",
											},
											phn_sch: {
												required:"Please enter phone no.",
												digitsOnly: "Please enter digits only",
											
											},
											
										}
										
										,
							            highlight: function (element) { // hightlight error inputs
						                  $(element).closest('.control-group').addClass('error'); // set error class to the control group
	            						},

							            success: function (label) {
	                					  label.closest('.control-group').removeClass('error');
						                label.remove();
	            						},

							            errorPlacement: function (error, element) {
							                error.addClass('help-inline').insertAfter(element.closest('.controls'));
							            },
			});
			//.form();		
			
			//if(myresult){
				//update_univ_info();
			//}
				
		//});		
		
		//$('#save_info').live('click',function(){
			
			//var myresult = 
			
			$("#form_event").validate({
										rules: {
											add_1: {
												 
												 required: true,
												},
											city_sch: {
												required: true,
												
											},
											state_sch: {
												required: true,
												
											},
											zip_sch: {
												required: true,
												digitsOnly: true,
											},
											email_sch: {
												
												email: true,
											},
											phn_sch: {
												//required: true,
												digitsOnly: true,
											
											},
											
										},
										messages: {
											
											add_1: "Please enter address ", 
											city_sch:{
												required: "Please enter city",
												
											},
											state_sch: { 
												required:"Please enter state",
												
											},
											zip_sch: { 
												required:"Please enter zip",
												digitsOnly: "Please enter digits only",
											},
											email_sch: {
												
												email: "Please enter valid email",
											},
											phn_sch: {
												//required:"Please enter phone",
												digitsOnly: "Please enter digits only",
											
											},
											
										}
										
										,
							            highlight: function (element) { // hightlight error inputs
						                  $(element).closest('.control-group').addClass('error'); // set error class to the control group
	            						},

							            success: function (label) {
	                					  label.closest('.control-group').removeClass('error');
						                label.remove();
	            						},

							            errorPlacement: function (error, element) {
							                error.addClass('help-inline').insertAfter(element.closest('.controls'));
							            },
			});
			//.form();		
			
			//if(myresult){
				
				//save_univ_info();
			//}
				
		//});		
		
function update_univ_info()
{
	$.ajax({
											
					url: $('#base_url').val()+"instructor/update_univ_info",
					type: "GET",
					context: document.body,
					data : "add1="+$('#add_1').val()+"&add2="+$('#add_2').val()+"&city="+$('#city_sch').val()+"&zip="+$('#zip_sch').val()+"&state="+$('#state_sch').val()+"&phn="+$('#phn_sch').val()+"&email="+$('#email_sch').val()+"&img="+$('#userfile').val(),
					cache: false,
					success: function(data){												
						$('.msg').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success! Updated Successfully</strong></div>');
							
						}
						
			});	



}
function save_univ_info()
{
	$.ajax({
											
					url: $('#base_url').val()+"instructor/save_info_uni",
					type: "GET",
					context: document.body,
					data : "add1="+$('#add_1').val()+"&add2="+$('#add_2').val()+"&city="+$('#city_sch').val()+"&zip="+$('#zip_sch').val()+"&state="+$('#state_sch').val()+"&phn="+$('#phn_sch').val()+"&email="+$('#email_sch').val()+"&img="+$('#userfile').val(),
					cache: false,
					success: function(data){												
						$('.msg').html('<div  style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success! Added Successfully</strong></div>');
							
						}
						
			});	



}

/*
function validate_info_uni()
{

	// to validate is zip is a number
	String.prototype.isNumber = function(){return /^\d+$/.test(this);}
    flag=0;
	
	if($('#ad_univ_address1').val()=='')
	{
		$('#add_id').html('Please enter address!');
        flag=1;
	
	
	}
	if($('#ad_univ_city').val()=='')
	{
		$('#city_id').html('Please enter city!');
        flag=1;
	
	
	}
	
	if($('#ad_univ_zip').val().isNumber()==false)
	{
     
		$('#zip_id').html('Please enter digits only!');
        flag=1;

	}
	if(/^[a-zA-Z]*$/.test($('#ad_univ_state').val())==false)
	{
	
	$('#state_id').html('Please enter letters only!');
	  flag=1;

	
	}
	
	if($('#ad_univ_phn').val().isNumber()==false)
		
		$('#phn_id').html('Please enter digits only!');
		  flag=1;
		}
	
	
	if (!validate_email($('#ad_univ_email').val())) {
	
	$('#email_id').html('Please enter valid email!');
	  flag=1;
	}
	
  if( flag==1)
	return false;
  else
   return true;

}*/
function g_u_d() {

	var view = new google.picker.View(google.picker.ViewId.DOCS);
	var picker = new google.picker.PickerBuilder()

	.enableFeature(google.picker.Feature.MULTISELECT_ENABLED).setAppId(
			"17296771986.apps.googleusercontent.com").setOAuthToken(
			"4/pAuvPJRATytJKaJNm-GzC8ycAk-y.0qn_1X_2ksUbOl05ti8ZT3Z1khhlfQI") // Optional:
	// The
	// auth
	// token
	// used
	// in
	// the
	// current
	// Drive
	// API
	// session.
	.addView(view).addView(new google.picker.DocsUploadView()).setCallback(
			g_uploadd).build();
	picker.setVisible(true);

}

function g_uploadd(data) {
	if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
		var doc = data[google.picker.Response.DOCUMENTS][0];
		url = doc[google.picker.Document.URL];
		ajax_call_google_u_id(url);
	}

}

var needToConfirm = '';

function ajax_call_google_u_id(my_url) {

	$
			.ajax({
				url : $('#base_url').val()
						+ 'instructor/unique_uploader_google_docs/',
				type : "GET",
				context : document.body,
				cache : false,
				data : "hash=" + $('#my_hash').html() + "&userid="
						+ $('#my_userid').html() + "&event="
						+ $('#select_id_cal :selected').val() + "&docurl="
						+ my_url,
				success : function(data) {

					$('#notif_show')
							.html(
									'<span class="success">File attached successfully!</span>');
					$('#error_type').slideDown('slow', function() {
						$('#error_type').delay(1800).slideUp(2000);
					});

				}
			});

}
function ajax_call_google_docs(id, event_id) {

	$
			.ajax({
				url : $('#base_url').val()
						+ "assignment/save_assignment_from_googledocs/",
				type : "GET",
				context : document.body,
				cache : false,
				data : "file_id=" + id + "&event_id=" + event_id,
				success : function(data) {

					$('#notif_show')
							.html(
									'<span class="success">File attached successfully!</span>');
					$('#error_type').slideDown('slow', function() {
						$('#error_type').delay(1800).slideUp(2000);
					});
				}
			});

}

function add_reminder_event(ev_id) {
	open_reminder_ui(ev_id);
}

function remove_image(id) {
	$.ajax({
		url : $('#base_url').val() + "instructor/remove_event_attachment/",
		type : "GET",
		context : document.body,
		cache : false,
		data : "id=" + id,
		success : function(data) {
		}
	});
}

function set_snooze(id) {

	$.ajax({
		url : $('#base_url').val() + "reminder/snooze_reminder/",
		type : "GET",
		context : document.body,
		cache : false,
		data : "id=" + id,
		success : function(data) {

			if (data) {
				var container = $("#container_mine");
				container.slideUp(2000);
			}

		}
	});
}

function set_dismiss(id) {

	$.ajax({
		url : $('#base_url').val() + "reminder/dismiss_notice/",
		type : "GET",
		context : document.body,
		cache : false,
		data : "id=" + id,
		success : function(data) {

			if (data) {
				var container = $("#container_mine");
				container.slideUp(2000);
			}

		}
	});

}

function color_picker() {
	$.ajax({
		url : $('#base_url').val() + "instructor/color_picker/",
		type : "GET",
		context : document.body,
		cache : false,
		success : function(data) {

			$('#list_pop_types').html(data);
			$("#events_type_list").fancybox().trigger('click');
		}
	});

}

function remove_picture_this_user(what) {

	$.ajax({
		url : $('#base_url').val() + "instructor/remove_profile_pic/",
		type : "GET",
		context : document.body,
		data : "what=" + what,
		cache : false,
		success : function(data) {
			if (data) {
				$('#ins_image').hide();
				$('#ins_remove').hide();
			}
		}
	});

}

function check_prevoius_color() {

	$('#update_color_mine').attr('disabled', true);
	$('#btn_save').attr('disabled', true);

	var selected_course = $("#field_courses_color option:selected").val();

	// //send ajax call and end this
	$
			.ajax({
				url : $('#base_url').val()
						+ "instructor/get_color_custom_user/",
				type : "GET",
				context : document.body,
				data : "course_seleted=" + selected_course,
				cache : false,
				success : function(data) {

					if (data != '') {

						$('#update_color_mine').attr('disabled', false);
						$('#btn_save').attr('disabled', false);

						$('.error')
								.html(
										'<div class="alert alert-info"><button data-dismiss="alert" class="close"></button><strong>info:</strong> Prevoius color found!.	</div>');

						$('#btn_save').hide();
						$('#btn_update').show();

					} else {
						$('#btn_save').show();
						$('#btn_update').hide();

						$('#update_color_mine').attr('disabled', false);
						$('#btn_save').attr('disabled', false);
					}
				}
			});

}

function update_color_mine() {

	var selected_course = $("#field_courses_color option:selected").val();

	if (selected_course == 0) {
		$('.error').html('Please select your course!');
		$('#error_type').slideDown('slow', function() {
			$('#error_type').delay(1800).slideUp(2000);
		});
		return;
	}

	var string = $("#picker").val();

	// //send ajax call and end this
	$
			.ajax({
				url : $('#base_url').val()
						+ "instructor/update_color_custom_user/",
				type : "GET",
				context : document.body,
				data : "course_seleted="
						+ $("#field_courses_color option:selected").val()
						+ "&color=" + string.replace('#', ''),
				cache : false,
				success : function(data) {

					if (data) {

						$('.error')
								.html(
										'<span class="success">Color update successfully!</span>');
						$('#error_type').slideDown('slow', function() {
							$('#error_type').delay(1800).slideUp(2000);
						});

						// //send ajax call and end this
						$.ajax({
							url : $('#base_url').val()
									+ "instructor/get_colors_html_jst/",
							type : "GET",
							context : document.body,
							cache : false,
							success : function(data) {

								refresh_calender_on_call();
								$('#show_colors_now').html(data);

							}
						});

					} else {
						$('.error')
								.html(
										'Some problem while updating  please try again');
						$('#error_type').slideDown('slow', function() {
							$('#error_type').delay(1800).slideUp(2000);
						});

					}

				}
			});

}

function save_color_mine() {

	var selected_course = $("#field_courses_color option:selected").val();

	if (selected_course == 0) {
		$('.error')
				.html(
						'<div class="alert alert-error"><button data-dismiss="alert" class="close"></button>									<strong>Error!</strong> Please select your course!</div>');
		$('#error_type').slideDown('slow', function() {
			$('#error_type').delay(1800).slideUp(2000);
		});
		return;
	}

	var string = $("#picker").val();

	// //send ajax call and end this
	$.ajax({
				url : $('#base_url').val()
						+ "instructor/save_color_custom_user/",
				type : "GET",
				context : document.body,
				data : "course_seleted="
						+ $("#field_courses_color option:selected").val()
						+ "&color=" + string.replace('#', ''),
				cache : false,
				success : function(data) {

					if (data) {

						$('.error')
								.html(
										'<div class="alert alert-success"><button data-dismiss="alert" class="close"></button>									<strong>Success!</strong> Color Saved successfully!</div>');
						$('#error_type').slideDown('slow', function() {
							$('#error_type').delay(1800).slideUp(2000);
						});

						// //send ajax call and end this
						$.ajax({
							url : $('#base_url').val()
									+ "instructor/get_colors_html_jst/",
							type : "GET",
							context : document.body,
							cache : false,
							success : function(data) {

								refresh_calender_on_call();
								$('#show_colors_now').html(data);

							}
						});

					} else {
						$('.error')
								.html(
										'<div class="alert alert-info"><button data-dismiss="alert" class="close"></button>									<strong>info:</strong> Some problem while updating  please try again');
						$('#error_type').slideDown('slow', function() {
							$('#error_type').delay(1800).slideUp(2000);
						});

					}

				}
			});

}

function change_view_add() {

	$.ajax({
		url : $('#base_url').val() + "instructor/view_event_structure/",
		type : "GET",
		context : document.body,
		cache : false,
		success : function(data) {

			$('#list_pop_types').html(data);
			$("#events_type_list").fancybox().trigger('click');

		}
	});

}

function selector_event() {

	$('.custom_options_id').remove();
	$('.custom_options_id_not').remove();
	// for generic information

	var selected = $('#select_id_cal :selected').val();

	if (selected == 'Assignment' || selected == 'Reading'
			|| selected == 'School event') {
		$('.title-can-change').html('<b>Assigned date</b>');

	} else {
		$('.title-can-change').html('<b>Date</b>');

	}

	if ($('#select_id_cal :selected').text() == 'Assignment'
			|| $('#select_id_cal :selected').text() == 'Reading'
			|| $('#select_id_cal :selected').text() == 'School event') {
		$('.canremove').hide();

	} else {

		$('.canremove').show();

		$.ajax({
			url : $('#base_url').val()
					+ "instructor/get_custom_html_event_generic/",
			type : "GET",
			data : "get=" + $('#select_id_cal :selected').val(),
			context : document.body,
			cache : false,
			success : function(data) {

				var obj = JSON.parse(data);

				if (obj.length == 1) {
					$('#location_calender').val(obj[0]['location']);
					$('#datepicker4').val(obj[0]['start_time']);
					$('#datepicker6').val(obj[0]['end_time']);
					$('#note_calender').val(obj[0]['notes']);
				}
			}
		});
	}

	// /for custom information
	$.ajax({
		url : $('#base_url').val() + "instructor/get_custom_html_event/",
		type : "GET",
		data : "get=" + $('#select_id_cal :selected').val(),
		context : document.body,
		cache : false,
		success : function(data) {

			$('#viewer').append(data).slideDown(500);

			if ($('#datepicker3').val() == '') {
				$('#datepicker3').val($('#temp_due_date').val());
			}

		}
	});

}

function generate_html_custom(obj, view, id) {

	// $('.custom_options_id').remove();
	// $('.custom_options_id_not').remove();
	//				
	// $.ajax({
	// url: $('#base_url').val()+"instructor/event/",
	// type: "GET",
	// data:
	// "fields="+obj[0]['ev_custom_fields']+"&data="+obj[0]['ev_custom_data']+"&view="+view+"&ev_id="+obj[0]['ev_id'],
	// context: document.body,
	// cache: false,
	// success: function(data){
	//											
	// if(view=='view')
	// {
	// $('#event_display'+id).append(data).slideDown(500);
	// }else
	// {
	// $('#viewer'+id).append(data).slideDown(500);
	// }
	// }
	// });
	//		
}

function update_event_type_ajax(id, form) {

	$('#btn_update_action').attr('disabled', true);
	fileUpload(form, $('#base_url').val() + "instructor/upload_and_session/",
			'upload1');
	// update_event_type_ajax1(id,form);

	checkFrame();

	var test = false;

	setTimeout(function() {
		test = checkFrame();

		if (!test) {

			$('#error_type').html('Saving please wait ....');
			check_status_again_upload(id, form);
		}
		if (test) {
			update_event_type_ajax1(id, form);
		}

	}, 2000);

}

function check_status_again_upload(form, this_ne) {

	var test = false;

	setTimeout(function() {
		test = checkFrame();

		if (!test) {
			check_status_again_upload(form, this_ne);
		}
		if (test) {
			// /if iframe is uploaded and done
			$('#error_type').html('Completed!');

			update_event_type_ajax1(form, this_ne);
		}

	}, 2000);

}

function update_event_type_ajax1(id, form) {

	var error = '';
	var mydata = new Array();
	var customdata = new Array();
	var counter = 0;
	var counter1 = 0;
	var types = new Array();
	var uploads = new Array();
	var upload_counter = 0;
	var founded_files = 0;

	$('#event_typer_add').find(':input').each(
			function() {

				var pass = true;

				var typoo = $("#type_name").val();

				if (typoo != 'Assignment' && typoo != 'Reading') {

					if ($(this).attr('id') == 'type_name') {
						pass = false;
						if ($(this).val() == '') {
							error += 'Please enter event type name! <br/>';
						} else {
							mydata[counter1] = $(this).val();
						}
					}

					if ($(this).attr('id') == 'type_location') {
						pass = false;
						if ($(this).val() == '') {
							error += 'Please enter event location name! <br/>';
						} else {
							mydata[counter1] = $(this).val();
						}
					}

					if ($(this).attr('id') == 'type_name_starttime') {
						pass = false;
						if ($(this).val() == '') {
							error += 'Please select event start time! <br/>';
						} else {
							mydata[counter1] = $(this).val();
						}
					}

					if ($(this).attr('id') == 'type_name_endtime') {
						pass = false;
						if ($(this).val() == '') {
							error += 'Please select event end time! <br/>';
						} else {
							mydata[counter1] = $(this).val();
						}
					}

					if ($(this).attr('id') == 'notes_values') {
						pass = false;
						if ($(this).val() == '') {
							error += 'Please enter notes end time! <br/>';
						} else {
							mydata[counter1] = $(this).val();
						}
					}

				}

				if (pass) {

					if ($(this).attr('type') == 'checkbox') {
						customdata[counter] = $(this).is(':checked');
					} else {
						if ($(this).val() != '') {
							customdata[counter] = $(this).val();
						}
						if ($(this).val() == ''
								&& $(this).attr('type') != 'file') {
							error += 'Please enter custom missing field #'
									+ counter + ' ! <br/>';
						}
						if ($(this).val() == '') {
							customdata[counter] = null;
						}
					}

					counter++;
				}

				if ($(this).attr('type') == 'file') {

					if ($(this).val() == '') {
						uploads[upload_counter] = $(
								'#dataholder' + upload_counter).html();
					} else {
						uploads[upload_counter] = 'upload';
						founded_files++;
					}

					upload_counter++;
				}

				counter1++;
			});

	var typecounter = 0;

	$('#event_typer_add').find(':input').each(function() {

		// /only giving null for textarea now
		if ($(this).attr('type') === undefined) {
			types[typecounter] = 'textarea';
		} else {

			// to get date time picker type just add class on the other hand
			if ($(this).attr('class') == 'date_picker hasDatepicker') {
				types[typecounter] = 'date_picker';
			} // to get time picker type just add class on the other hand
			else if ($(this).attr('class') == 'time_picker hasDatepicker') {
				types[typecounter] = 'time_picker';
			} else {
				types[typecounter] = $(this).attr('type');
			}
		}

		typecounter++;

	});

	if (error != '') {
		$('#error_type').html(error);
		$('#error_type').slideDown('slow', function() {
			$('#error_type').delay(1800).slideUp(2000);
		});
		$('#btn_update_action').attr('disabled', false);
		return false;
	}

	if (error == '') {

		var myJsonString1 = JSON.stringify(mydata);

		var myJsonString2 = JSON.stringify(customdata);

		var myJsonString3 = JSON.stringify(types);

		var myJsonString4 = JSON.stringify(uploads);

		$
				.ajax({
					url : $('#base_url').val()
							+ "instructor/update_custom_event_type/",
					type : "GET",
					data : "defined=" + myJsonString1 + "&custom="
							+ myJsonString2 + "&id=" + id + "&types="
							+ myJsonString3 + "&up=" + myJsonString4,
					context : document.body,
					cache : false,
					success : function(data) {

						if (data == 'updated') {
							$('#error_type').html(
									'Record updated Successfully!');
							$('#error_type').slideDown('slow', function() {
								$('#error_type').delay(1800).slideUp(2000);
							});

							view_all_types();
							$('#btn_update_action').attr('disabled', false);
						}

					}
				});

	}

}

function reload_and_make_select_area() {

	$.ajax({
		url : $('#base_url').val()
				+ "instructor/creat_generat_new_update_form/",
		type : "GET",
		context : document.body,
		cache : false,
		success : function(data) {
			$('#view_1_event').html(data);
		}
	});
}

function myTimer() {

}

function save_event_type_ajax(form, this_ne) {

	$('#btn_save_action').attr('disabled', true);

	fileUpload(form, $('#base_url').val() + "instructor/upload_and_session/",
			'upload1');

	checkFrame();

	var test = false;

	setTimeout(function() {
		test = checkFrame();

		if (!test) {

			$('#error_type').html('Saving please wait ....');
			check_status_again(form, this_ne);
		}
		if (test) {
			save_event_type_ajax1(form, this_ne);
		}

	}, 2000);

}

function check_status_again(form, this_ne) {

	var test = false;

	setTimeout(function() {
		test = checkFrame();

		if (!test) {
			check_status_again(form, this_ne);
		}
		if (test) {
			// /if iframe is uploaded and done
			$('#error_type').html('Completed!');
			save_event_type_ajax1(form, this_ne);
		}

	}, 2000);

}

function save_event_type_ajax1(form, this_ne) {

	// /doing file uploding using ajax iframe

	var error = '';
	var mydata = new Array();
	var customdata = new Array();
	var types = new Array();
	var counter = 0;
	var counter1 = 0;
	var foundedfiles = 0;

	$('#event_typer_add').find(':input').each(
			function() {

				var pass = true;

				if ($(this).attr('id') == 'type_name') {
					pass = false;
					if ($(this).val() == '') {
						error += 'Please enter event type name! <br/>';
					} else {
						mydata[counter1] = $(this).val();
					}
				}

				if ($(this).attr('id') == 'type_location') {
					pass = false;
					if ($(this).val() == '') {
						error += 'Please enter event location name! <br/>';
					} else {
						mydata[counter1] = $(this).val();
					}
				}

				if ($(this).attr('id') == 'type_name_starttime') {
					pass = false;
					if ($(this).val() == '') {
						error += 'Please select event start time! <br/>';
					} else {
						mydata[counter1] = $(this).val();
					}
				}

				if ($(this).attr('id') == 'type_name_endtime') {
					pass = false;
					if ($(this).val() == '') {
						error += 'Please select event end time! <br/>';
					} else {
						mydata[counter1] = $(this).val();
					}
				}

				if ($(this).attr('id') == 'notes_values') {
					pass = false;
					mydata[counter1] = $(this).val();
				}

				if (pass) {
					if ($(this).attr('type') == 'checkbox') {
						var value_checked = '';

						if ($(this).is(':checked') == true) {
							value_checked = 'true';
						} else {
							value_checked = 'false';
						}

						customdata[counter] = value_checked;

					} else {
						if ($(this).val() != '') {
							customdata[counter] = $(this).val();
						}
					}

					if ($(this).val() == '') {
						error += 'Please enter custom missing field #'
								+ counter + ' ! <br/>';
					}
					counter++;
				}

				counter1++;

				if ($(this).attr('type') == 'file') {
					foundedfiles++;
				}

			});

	var typecounter = 0;

	$('#event_typer_add').find(':input').each(function() {

		// /only giving null for textarea now
		if ($(this).attr('type') === undefined) {
			types[typecounter] = 'textarea';

		} else {

			// to get date time picker type just add class on the other hand
			if ($(this).attr('class') == 'date_picker hasDatepicker') {
				types[typecounter] = 'date_picker';
			} // to get time picker type just add class on the other hand
			else if ($(this).attr('class') == 'time_picker hasDatepicker') {
				types[typecounter] = 'time_picker';
			} else {
				types[typecounter] = $(this).attr('type');
			}
		}

		typecounter++;

	});

	if (error != '') {
		$('#error_type')
				.html(
						'<div class="alert alert-error"><button data-dismiss="alert" class="close"></button>									<strong>Error!</strong>'
								+ error + '</div>');
		$('#error_type').slideDown('slow', function() {
			$('#error_type').delay(1800).slideUp(2000);
		});
		$('#btn_save_action').attr('disabled', false);
		return false;
	}

	if (error == '') {
		// //go for upload with files and store them
		// var return_check =
		// fileUpload(form,$('#base_url').val()+"instructor/upload_and_session/",'upload',foundedfiles);

		var myJsonString1 = JSON.stringify(mydata);

		var myJsonString2 = JSON.stringify(customdata);

		var myJsonString3 = JSON.stringify(types);

		$
				.ajax({
					url : $('#base_url').val()
							+ "instructor/get_custom_event_type/",
					type : "GET",
					data : "defined=" + myJsonString1 + "&custom="
							+ myJsonString2 + "&types=" + myJsonString3,
					context : document.body,
					cache : false,
					success : function(data) {

						if (data == 'duplicate') {

							$('#error_type')
									.html(
											'<div class="alert alert-success"><button data-dismiss="alert" class="close"></button>									<strong>Success!</strong>Event type name already exist </div> ');
							$('#error_type').slideDown('slow', function() {
								$('#error_type').delay(1800).slideUp(2000);
							});

							$('#btn_save_action').attr('disabled', false);

						}

						if (data == 'saved') {
							$('#btn_save_action').attr('disabled', false);
							reload_and_make_select_area();
							view_all_types();

						}

					}
				});

	}
}

function checkFrame() {

	var iframe = document.getElementById("upload_iframe");

	if (iframe == null)
		return true;
	else {
		if (iframe.document == null)
			return false;
		else
			return true;
	}
}

function fileUpload(form, action_url, div_id, sended_files) {
	// Create the iframe...

	var iframe = document.createElement("iframe");
	iframe.setAttribute("id", "upload_iframe");
	iframe.setAttribute("name", "upload_iframe");
	iframe.setAttribute("width", "0");
	iframe.setAttribute("height", "0");
	iframe.setAttribute("border", "0");
	iframe.setAttribute("style", "width: 0; height: 0; border: none;");

	// Add to document...
	form.parentNode.appendChild(iframe);

	window.frames['upload_iframe'].name = "upload_iframe";

	iframeId = document.getElementById("upload_iframe");

	// Add event...
	var eventHandler = function() {

		if (iframeId.detachEvent)
			iframeId.detachEvent("onload", eventHandler);
		else
			iframeId.removeEventListener("load", eventHandler, false);

		// Message from server...
		if (iframeId.contentDocument) {
			content = iframeId.contentDocument.body.innerHTML;
		} else if (iframeId.contentWindow) {
			content = iframeId.contentWindow.document.body.innerHTML;
		} else if (iframeId.document) {
			content = iframeId.document.body.innerHTML;
		}

		setTimeout('iframeId.parentNode.removeChild(iframeId)', 250);
	}

	if (iframeId.addEventListener)
		iframeId.addEventListener("load", eventHandler, true);
	if (iframeId.attachEvent)
		iframeId.attachEvent("onload", eventHandler);

	// Set properties of form...
	form.setAttribute("target", "upload_iframe");
	form.setAttribute("action", action_url);
	form.setAttribute("method", "post");
	form.setAttribute("enctype", "multipart/form-data");
	form.setAttribute("encoding", "multipart/form-data");

	// Submit the form...
	form.submit();

	return true;

	// timmer_call(sended_files);
}

function timmer_call(sended_files) {

	alert(sended_files);

	var myVar = setInterval(function() {
		call_check_ajax(sended_files)
	}, 2000);

	if (myVar) {
		clearInterval(myVar);
		return true;
	}

}

function call_check_ajax(sended_files) {

	$.ajax({
		url : $('#base_url').val() + "instructor/check_uploads/",
		type : "GET",
		context : document.body,
		cache : false,
		success : function(data) {

			if (data == 'done') {
				return true;
			}
			if (data == sended_files) {
				return true;
			} else {
				timmer_call(sended_files);
			}

		}

	});

}

function update_type(id) {

	$.ajax({
		url : $('#base_url').val() + "instructor/update_user_type/",
		type : "GET",
		data : "id=" + id,
		context : document.body,
		cache : false,
		success : function(data) {

			$('#list_pop_types').html(data);
			$("#events_type_list").fancybox().trigger('click');

			if ($('#type_name').val() == 'Assignment'
					|| $('#type_name').val() == 'Reading') {
				$('.canremove_1').hide();
			}

		}

	});

}

function remove_type(id) {

	$.ajax({
		url : $('#base_url').val() + "instructor/remove_type_user/",
		type : "GET",
		data : "id=" + id,
		context : document.body,
		cache : false,
		success : function(data) {

			if (data == 'removed') {
				$('#rowtype_' + id).remove();
				$('#error_type').html('Event type Removed!');
				$('#error_type').slideDown('slow', function() {
					$('#error_type').delay(1800).slideUp(2000);
				});
			}

		}

	});

}

function view_all_types() {

	$.ajax({
		url : $('#base_url').val() + "instructor/get_all_type_user/",
		type : "GET",
		context : document.body,
		cache : false,
		success : function(data) {

			$('#list_pop_types').html(data);
			$("#events_type_list").fancybox().trigger('click');
		}

	});

}

function new_field_add() {
	var id = 1;

	$('#my_form_upload').find(':input').each(function() {
		id++;
	});

	if ($('#input_choice :selected').val() == 'textbox') {
		$('#event_typer_add')
				.append(
						'<tr id='
								+ id
								+ '><td><input type="text" value="" /></td><td><input type="text" value="" /><br/><span onClick="removeitem('
								+ id
								+ ')" style="cursor:pointer; color:#900"><b>remove</b></span></td></tr>')
				.slideDown(500);
	}

	if ($('#input_choice :selected').val() == 'date_picker') {
		$('#event_typer_add')
				.append(
						'<tr id='
								+ id
								+ '><td><input type="text" value="" /></td><td><input type="text" class="date_picker" /><br/><span onClick="removeitem('
								+ id
								+ ')" style="cursor:pointer; color:#900"><b>remove</b></span></td></tr>')
				.slideDown(500);

		$('.date_picker').datepicker({
			dateFormat : "mm-dd-yy"
		});

	}

	if ($('#input_choice :selected').val() == 'time_picker') {
		$('#event_typer_add')
				.append(
						'<tr id='
								+ id
								+ '><td><input type="text" value="" /></td><td><input type="text" class="time_picker" /><br/><span onClick="removeitem('
								+ id
								+ ')" style="cursor:pointer; color:#900"><b>remove</b></span></td></tr>')
				.slideDown(500);

		$('.time_picker').timepicker();

	}

	if ($('#input_choice :selected').val() == 'checkbox') {
		$('#event_typer_add')
				.append(
						'<tr id='
								+ id
								+ '><td><input type="text" value="" /></td><td><input type="checkbox" /><br/><span onClick="removeitem('
								+ id
								+ ')" style="cursor:pointer; color:#900"><b>remove</b></span></td></tr>')
				.slideDown(500);

		$('.time_picker').timepicker();

	}

	if ($('#input_choice :selected').val() == 'textarea') {
		$('#event_typer_add')
				.append(
						'<tr id='
								+ id
								+ '><td><input type="text" value="" /></td><td><textarea cols="4" rows="5"></textarea><br/><span onClick="removeitem('
								+ id
								+ ')" style="cursor:pointer; color:#900"><b>remove</b></span></td></tr>')
				.slideDown(500);
	}

	if ($('#input_choice :selected').val() == 'file_selector') {

		var counter = 0;

		$('#my_form_upload').find(':input').each(function() {

			if ($(this).attr('type') == 'file') {
				counter++;
			}

		});

		counter++;

		$('#event_typer_add')
				.append(
						'<tr id='
								+ id
								+ '><td><input type="text" value="" /></td><td><input type="file" name="uploaded_files[]" /><br/><span onClick="removeitem('
								+ id
								+ ')" style="cursor:pointer; color:#900"><b>remove</b></span></td></tr>')
				.slideDown(500);

	}

	$("#input_choice option[value='none']").prop('selected', true);

}

function removeitem(id) {
	$("#" + id).remove();
}

function remove_course_new(id) {

	$.ajax({
		url : $('#base_url').val() + "permissions/remove_course_general/",
		type : "GET",
		data : 'query=' + id,
		context : document.body,
		cache : false,
		success : function(data) {

			$('#ro_' + id).remove();
		}

	});

}

function remove_row(id) {

	$('#rw_' + id).remove();

}

function session_builder() {

	$('#selected_courses li input:checked')
			.each(
					function() {

						var goa = true;

						var title = $(this).attr("title");
						var ins_title = $('#user_selected_id :selected').text();

						$('#final_selected tr td').each(function() {

							if ($(this).html() == title) {
								goa = false;
							}

						});

						if (goa) {

							var html = '';

							html = '<tr id="rw_'
									+ $(this).val()
									+ '"><td>'
									+ $('#user_selected_id :selected').text()
									+ '</td><td>'
									+ $(this).attr("title")
									+ '</td><td><input type="hidden" name="course_id[]" value="'
									+ $(this).val()
									+ '"/><input type="hidden" name="user_id[]" value="'
									+ $('#user_selected_id :selected').val()
									+ '"/></td><td><input type="button" class="btn" onclick="remove_row('
									+ $(this).val()
									+ ')" value="remove" /></td></tr>';

							$('#final_selected').append(html).slideDown(500);

						}

					});

}

function selected_person() {
	if ($('#relation_role').val() == 'Select user') {
		alert('Please select user');
	} else {

		$.ajax({
			url : $('#base_url').val() + "permissions/user_selected/",
			type : "GET",
			data : 'id_my=' + $('#relation_role :selected').val() + '&user_id='
					+ $('#user_selected_id :selected').val(),
			context : document.body,
			cache : false,
			success : function(data) {

				$('#interface_update').html(data);

			}

		});
	}

}

function selected_role() {

	if ($('#relation_role').val() == 'Select role') {
		alert('Please select role');
	} else {

		$.ajax({
			url : $('#base_url').val() + "permissions/role_selected/",
			type : "GET",
			data : 'id_my=' + $('#relation_role :selected').val(),
			context : document.body,
			cache : false,
			success : function(data) {

				$('#interface_update').html(data);

			}
		});
	}

}

function addcoursenew() {

	if ($('#text_course_name').val() == '') {
		alert('Enter course name');
	} else {

		$.ajax({
			url : $('#base_url').val() + "permissions/add_course_new/",
			type : "GET",
			data : 'query=' + $('#role_selection :selected').val()
					+ '&value_text=' + $('#role_selection :selected').text()
					+ '&course_name=' + $('#text_course_name').val(),
			context : document.body,
			cache : false,
			success : function(data) {

				$('#interface_update').html(data);

			}

		});
	}

}

function push_call_by_user(id) {

	$.ajax({
		url : $('#base_url').val() + "instructor/send_notification_by_id/",
		type : "GET",
		data : "id=" + id + "&text=" + $('#notification_text').val(),
		context : document.body,
		cache : false,
		success : function(data) {

			return data;
		}
	});

}

function redirect_course(selected) {

	window.location = $("#base_url").val()
			+ '/instructor/additional_course_info/' + selected;

}
function redirect_import(selected) {

	window.location = $("#base_url").val() + '/instructor/importevent/'
			+ selected;

}

window.onbeforeunload = function() {

	if ($('#login_type').val() != 'admin school') {
		if (needToConfirm) {
			return "Your changes will be lost unless you post to the syllabus before leaving this page.";
		}
	}
}

function send_notification1() {

	$('#updating_event_html_overall').show();

	$('#updating_event_html_overall').html(' Saving please wait! <br/>');

	$.ajax({
		url : $('#base_url').val() + "instructor/save_all_events_database/",
		type : "GET",
		context : document.body,
		cache : false,
		success : function(data) {

			$('#updating_event_html_overall').html(data);
			refresh_calender_on_call();
		}

	});
	needToConfirm = false;
}


function generate_html_notification_roles() {

	// //it geneeretes html for the courses

	$.ajax({
		url : $('#base_url').val()
				+ "instructor/generate_send_notification_html/",
		type : "GET",
		data : "course_id=" + $("#field_courses option:selected").val(),
		context : document.body,
		cache : false,
		success : function(data) {

			$('#inline1_notification').html(data);
			$("#notification_chooser").fancybox().trigger('click');

		}

	});
}

function trigger_notification() {

	var return_data = ui_access_trigger();

	if (return_data == 'all') {
		// ////////////if its 0 then 1 thing is confirm it should display
		// notification

		$('<div></div>').appendTo('body').html(
				'<div><h6>Send message to students in all courses?</h6></div>')
				.dialog(
						{
							modal : true,
							title : 'Sending confirmation',
							zIndex : 10000,
							autoOpen : true,
							width : 'auto',
							resizable : false,
							buttons : {
								Yes : function() {

									push_call_confirm('all');

									$(this).dialog("close");

									$('#inline1_email_confirm').html(
											'Notifications Sended!');

									$("#email_confirm_chooser").fancybox()
											.trigger('click');

									$('#notification_text').val('');

								},
								No : function() {
									$(this).dialog("close");
								}
							},
							close : function(event, ui) {
								$(this).remove();
							}
						});

		// /////////////////aler code end

	} else {
	
		
		if(return_data.length==0)
			{
			
			$('#notification_sended').html('please select any role');
			return false;
			
			}
		var res = '';
		var success = 0;

		for ( var k = 0; k < return_data.length; k++) {
			res = push_call_by_user(return_data[k]);

			if (res) {
				success++;
			}
		}

		$('#notifications_send').html(
				'Notfication sent to ' + success + ' students');
		$('#notification_sended').slideDown('slow', function() {
			$('#notification_sended').delay(1800).slideUp(2000);
		});

		$('#inline1_email_confirm')
				.html(
						'<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button data-dismiss="alert" class="close"></button>									<strong>Success!</strong> Notifications Sended! </div>');
		$("#email_confirm_chooser").fancybox().trigger('click');

		$('#notification_text').val('');
	}

}

function push_call_confirm(course) {

	$.ajax({
		url : $('#base_url').val() + "instructor/send_notification/",
		type : "GET",
		data : 'text=' + $('#notification_text').val() + '&course=' + course,
		context : document.body,
		cache : false,
		success : function(data) {

			if (data <= 1) {
				$('#notifications_send').html(
						'Notfication sent to ' + data + ' student');
				$('#notification_sended').slideDown('slow', function() {
					$('#notification_sended').delay(1800).slideUp(2000);
				});

			} else {
				$('#notifications_send').html(
						'Notfication sent to ' + data + ' students');
				$('#notification_sended').slideDown('slow', function() {
					$('#notification_sended').delay(1800).slideUp(2000);
				});

			}
		}

	});
}

function Delete_event(id) {

	new_loading();

	$.ajax({
		url : $('#base_url').val() + "instructor/delete_event_this/",
		type : "GET",
		data : 'id=' + id,
		context : document.body,
		cache : false,
		success : function(data) {

			$('#calendar').html('');
			$('#message_show h2').html('<h2>Event Removed!</h2>');
			clear_records('removed');

			var id_new = 'ev_' + id;

			$('#' + id_new).hide();

			if (data == 'removed') {
				calender_render();
			}
		}

	});
}

// /////////////////////////save event code

var initDrag = function(el) {
	// create an Event Object
	// (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
	// it doesn't need to have a start or end
	var eventObject = {
		title : $.trim(el.text())
	// use the element's text as the event title
	};
	// store the Event Object in the DOM element so we can get to it later
	el.data('eventObject', eventObject);
	// make the event draggable using jQuery UI
	el.draggable({
		zIndex : 999,
		revert : true, // will cause the event to go back to its
		revertDuration : 0
	// original position after the drag
	});
}

var addEvent = function(title) {
	title = title.length == 0 ? "Untitled Event" : title;
	var html = $('<div class="external-event label">' + title + '</div>');
	jQuery('#event_box').append(html);
	initDrag(html);
}

$('#external-events div.external-event').each(function() {
	initDrag($(this))
});

$('#event_add').unbind('click').click(function() {
	var title = $('#event_title').val();
	addEvent(title);
});

// predefined events

function sinkupevents() {

	$.ajax({
		url : $('#base_url').val() + 'instructor/get_all_type_user_json/',
		type : "GET",
		context : document.body,
		cache : false,
		contentType : "json",
		success : function(data) {

			var obj = JSON.parse(data);
			var length = obj.length, element = null;

			for ( var i = 0; i < length; i++) {
				addEvent(obj[i]['event_type_name']);
			}

		}
	});

}

function calender_render() {

	$('#event_box').html("");

	sinkupevents();

	$('#calendar').html('');

	$('#calendar')
			.fullCalendar(
					{

						events : $('#base_url').val()
								+ "instructor/save_event_session/",
						header : {
							right : 'title, prev, next',
							center : '',
							right : 'prev,next,today,month,agendaWeek,agendaDay'
						},
						eventClick : function(event) {
							// opens events in a popup window
							Qtipshow($(this), event['id']);

						},
						drop : function(date, allDay) { // this function is
							// called when something
							// is dropped

							var obj = $(this).data('eventObject');

							alert(date);

							// retrieve the dropped element's stored Event
							// Object
							var originalEventObject = $(this).data(
									'eventObject');
							// we need to copy it, so that multiple events don't
							// have a reference to the same object
							var copiedEventObject = $.extend({},
									originalEventObject);

							// assign it the date that was reported
							copiedEventObject.start = date;
							copiedEventObject.allDay = allDay;
							copiedEventObject.className = $(this).attr(
									"data-class");

							$('#calendar').fullCalendar('renderEvent',
									copiedEventObject, true);

							// is the "remove after drop" checkbox checked?

						},
						ignoreTimezone : false,
						selectable : true,
						droppable : true,
						selectHelper : true,

						select : function(start, end, allDay) {

							$('#updating_event_html_overall').hide();
							var date_target = new Date(start);

							var year = parseInt(date_target.getUTCFullYear());
							var month = parseInt(date_target.getUTCMonth() + 1);
							var day = parseInt(date_target.getUTCDate());

							if (month < 10) {
								month = '0' + month;
							}
							if (day < 10) {
								day = '0' + day;
							}

							var course = $("#field_courses option:selected")
									.val();

							$
									.ajax({
										url : $('#base_url').val()
												+ "instructor/load_event_selected_date/",
										type : "GET",
										data : 'year=' + year + '&month='
												+ month + '&day=' + day
												+ '&start=' + start + "&end="
												+ end + "&selected=" + course,
										context : document.body,
										cache : false,
										success : function(data) {

											var obj = JSON.parse(data);
											// //////create new temp event
											var tmp_json = '{"id":"none","title":"New Years Day","allday":"true","allDay":"true","start":'
													+ start
													+ ',"end":'
													+ end
													+ ',"ev_assigned_date":"1-1-2013","className":"holidays","editable":false}';

											calender_render();

										}
									});

						},
						editable : true,
					});

}

function new_loading() {

	$('#functions').hide();
	$('#loading').show();

}

function Save_event() {

	new_loading();

	$('#functions').hide();
	$('#loading').show();

	if ($("#Filedata-queue > div").size() == 0) {
		Save_event_go();
	} else {
		$('#Filedata').uploadify('upload', '*');
	}

	needToConfirm = 'true';

}

function toDate(dStr, format) {

	var now = new Date();
	if (format == "M-D-Y") {
		now.setHours(dStr.substr(0, dStr.indexOf(":")));
		now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
		now.setSeconds(0);
		return now;
	} else
		return "Invalid Format";

}

// ///////////////////////save event code including file upload done

function Save_event_go() {
	// //////////validations

	// /////make sure that for new event allday is set to disabled
	$("#datepicker4").attr("disabled", false);
	$("#datepicker6").attr("disabled", false);

	var html = '';

	if ($('#datepicker2').val() == '') {
		html += '*Please select your " Event Date " ! <br/>';

	} else {
		$('#datepicker2').removeAttr('style');
	}

	var typoo = $("#select_id_cal option:selected").text()

	if (typoo != 'Assignment' && typoo != 'Reading' && typoo != 'School event') {

		if ($('#location_calender').val() == '') {
			$('#errors_form')
					.html(
							'<span class="error">Please enter your Event Location </span>')
					.slideDown('slow', function() {
						$('#errors_form').delay(1800).slideUp(2000);

						return;

					});
		} else {
			$('#location_calender').removeAttr('style');
		}

	}
	if (typoo == 'Assignment' || typoo == 'Reading') {

		var check_1 = $('#datepicker2').val().split("-");
		var check_2 = $('#datepicker3').val().split("-");

		// /check here for date checks

		var start = new Date(check_1[2], check_1[0] - 1, check_1[1]).getTime() / 1000;
		var end = new Date(check_2[2], check_2[0] - 1, check_2[1]).getTime() / 1000;

		if (end >= start) {
			$('#datepicker2').removeAttr('style');
			$('#datepicker3').removeAttr('style');

		} else {

			// //////date issue here if due date is less then the assigned date

			$('#errors_form')
					.html(
							'<span class="error">Due date must be greater than Assigned date</span>')
					.slideDown('slow', function() {
						$('#errors_form').delay(1800).slideUp(2000);
					});

			// $("#import_facebook_alert").fancybox().trigger('click');

			return;

			$('#datepicker2').css('border', '1px solid #900');
			$('#datepicker3').css('border', '1px solid #900');

		}
		// /check here for date checks

		$('#all_day').prop('checked', true);

	}

	// /if all day is selected

	value = $('#all_day').is(':checked');

	if (value == true) {
		$('#datepicker4').removeAttr('style');
		$('#datepicker6').removeAttr('style');
	}

	if (typoo == 'School event') {
		value = true;
	}

	if (value == false) {

		if ($('#datepicker4').val() == '') {
			$('#datepicker4').css('border', '1px solid #900');
		} else {
			$('#datepicker4').removeAttr('style');
		}
		if ($('#datepicker6').val() == '') {

			$('#datepicker6').css('border', '1px solid #900');
		} else {
			$('#datepicker6').removeAttr('style');
		}

	}

	var str = "";

	$("#select_id_cal option:selected").each(function() {
		if ($(this).val() == 'none') {

			$('#select_id_cal').css('border', '1px solid #900');

		} else {
			$('#select_id_cal').removeAttr('style');
		}
	});

	$("#select_id_cal option:selected").each(function() {
		if ($(this).val() == 'other') {
			if ($('#note_other_cal').val() == '') {

				$('#note_other_cal').css('border', '1px solid #900');
			} else {
				$('#note_other_cal').removeAttr('style');
			}
		}
	});

	if (html != '') {

		$('#errors_show').html(html);
		$('#errors_show').slideDown('slow', function() {
			$('#errors_show').delay(3000).slideUp(1300);
		});

		return false;
	} else {
		$('#errors_show').slideUp('slow', function() {
			$('#error_slider_card').delay(1800).slideUp(1300);
		});

		// ///////////////////custom fields code here

		var customdata = new Array();
		var types = new Array();
		var counter = 0;
		var foundedfiles = 0;
		var pass = true;
		var typecounter = 0;

		$('.custom_options_id')
				.closest('tr')
				.find("input,textarea")
				.each(
						function() {

							// /i dont want to save the assignement logic in db
							// with this
							if ($(this).attr('class') != 'custom_options_id_not'
									&& $(this).attr('type') != 'button') {

								if ($(this).attr('type') == 'checkbox') {
									var value_checked = '';

									if ($(this).is(':checked') == true) {
										value_checked = 'true';
									} else {
										value_checked = 'false';
									}

									customdata[counter] = value_checked;
								} else {
									if ($(this).val() != '') {
										customdata[counter] = $(this).val();
									}
								}

								// /if its a file and nothing has been selected
								// it means sending the prevoius upload

								if ($(this).attr('type') == "file") {
									customdata[counter] = $(this).attr('title');
								}

								// /only giving null for textarea now

								var check = $(this).attr('type');

								if (check == '' || check == undefined) {
									types[typecounter] = 'textarea';

								} else {

									// to get date time picker type just add
									// class on the other hand
									if ($(this).attr('class') == 'date_picker hasDatepicker') {
										types[typecounter] = 'date_picker';
									} // to get time picker type just add
									// class on the other hand
									else if ($(this).attr('class') == 'time_picker hasDatepicker') {
										types[typecounter] = 'time_picker';
									} else {
										types[typecounter] = $(this).attr(
												'type');
									}
								}

								typecounter++;
								counter++;
							}

						});

		// //////////custom fields code here

		var enoded_data = JSON.stringify(customdata);

		var datastring = 'date=' + $('#datepicker2').val() + '&location='
				+ $('#location_calender').val() + '&starttime='
				+ $('#datepicker4').val() + '&end_date='
				+ $('#datepicker6').val() + "&type="
				+ $("#select_id_cal option:selected").val() + '&notes='
				+ $('#note_calender').val() + '&course='
				+ $("#field_courses option:selected").val() + '&other_text='
				+ $('#note_other_cal').val() + '&custom_type=' + types
				+ '&custom_data=' + enoded_data;

		$.ajax({
			url : $('#base_url').val() + "instructor/save_event_session/",
			type : "GET",
			data : datastring,
			context : document.body,
			cache : false,
			success : function(data) {

				refresh_calender_on_call();

			}

		});

	}

	// ////////////////validations end
}

// /////////Add another event functionality ends

// //this is the work flow of the permissions
function get_detail_work_flow() {

	var final_view = true;

	var text_selected = $("#field_courses option:selected").text();

	if ($("#field_courses option:selected").val() == 0) {
		final_view = true;
		return final_view;
	}

	if ($('#core_permission').val() == 'view' && text_selected == 'Personal') {
		final_view = false;
		return final_view;
	}

	if ($('#core_permission').val() == 'view'
			&& text_selected == 'School Calender') {
		final_view = true;
		return final_view;
	}

	if ($('#core_permission').val() == 'modify'
			&& text_selected == 'School Calender'
			&& $('#canmanage_school_calender').val() != 'admin school') {
		final_view = true;
		return final_view;
	}

	if ($('#core_permission').val() == 'modify'
			&& text_selected == 'School Calender'
			&& $('#canmanage_school_calender').val() == 'admin school') {
		final_view = false;
		return final_view;
	}

	if ($('#core_permission').val() == 'view') {
		final_view = true;
		return final_view;
	}

	if ($('#core_permission').val() == 'modify') {
		final_view = false;
		return final_view;
	}
}

function show_event(id, event_done) {
	// return 'zain';
	// /////////// this is for assignement end notification
	$('#notification_ended').remove();

	// /if event is clicked then dont display the button
	if (event_done == 'click') {
		$('#message_show_pop').hide();
		// /display the button as its clicked on the day
	} else {
		$('#message_show_pop').show();
	}

	$
			.ajax({
				url : $('#base_url').val() + "instructor/get_event_by_id/",
				type : "GET",
				data : 'id=' + id + "&format=json",
				context : document.body,
				cache : false,
				success : function(data) {

					var obj = JSON.parse(data);

					$('#sharing_feature').remove();
					// ////if all is selected show all events in popup
					$("#viewer").show();

					if (obj[0]['invite_status'] != 'no'
							&& obj[0]['invite_status'] != '') {

						$('#swapper').hide();
						$('#date_event_pop').html(obj[0]['ev_date']);
						$('#locaton_event_pop').html(obj[0]['ev_location']);
						$('#s_time_event_pop').html(obj[0]['ev_start_time']);
						$('#e_time_event_pop').html(obj[0]['ev_end_time']);
						$('#event_type_pop').html(obj[0]['ev_event_type']);
						$('#event_notes_pop').html(obj[0]['ev_notes']);
						var shareid = obj[0]['share_id'];
						
						if (obj[0]['invite_status'] != 'Accepted') {
							
							$('#event_display')
									.append(
											'<tr id="sharing_feature"><td><input type="button" value="Accept" class="btn"  onclick="accept_share_event('
													+ id
													+ ','
													+ shareid
													+ ')" ></td><td><input type="button" value="Deny" class="btn"  onclick="deny_share_event('
													+ id
													+ ','
													+ shareid
													+ ')" ></td></tr>')
									.slideDown(500);
									
							
						}

						if (obj[0]['ev_event_type'] == 'other') {
							// /replace by the added name
							$('#event_type_pop').html(obj[0]['ev_event_other']);
						}

						// /hide the prevois displayer we dont need it anymore
							
						$('.custom_options_id').remove();
						generate_html_custom(obj, 'view', obj[0]['ev_id']);
					
						// /hide the prevois displayer we dont need it anymore
						$("#viewer").hide();
							
						$("#viewer_btns").hide();
						
						$('#message_show').html('');

						return false;
					}

					// detail work about the work

					// /set the default for sharing div to be removed everytime
					// here
											
					var view_checker = get_detail_work_flow();
					

					if (view_checker) {

					} else {

						$('#swapper').show();
						// for all day check then make checkbox also check

						if (obj[0]['ev_start_time'] == ''
								&& obj[0]['ev_end_time'] == '') {
							$('#datepicker4').val(' ');
							$('#datepicker6').val(' ');
							$("#datepicker4").attr("disabled", true);
							$("#datepicker6").attr("disabled", true);
							$('#all_day').prop('checked', true);

						} else {
							$('#datepicker4').val(obj[0]['ev_start_time']);
							$('#datepicker6').val(obj[0]['ev_end_time']);
							$("#datepicker4").attr("disabled", false);
							$("#datepicker6").attr("disabled", false);
							$('#all_day').prop('checked', false);
						}

						$(
								"#select_id_cal option[value='"
										+ obj[0]['ev_event_type'] + "']").prop(
								'selected', true);

						$('#note_calender').val(obj[0]['ev_notes']);

						if (obj[0]['ev_event_type'] == 'other') {

							$('#note_other_cal').val(obj[0]['ev_event_other']);
							$('.other_show_text_cal').show();

						} else {

							$('.other_show_text_cal').hide();

						}
					}

					if (obj[0]['reminder'] == 1) {
						$('#sharing_event_html')
								.append(
										'<img style="cursor:pointer;height:30px" src="'
												+ $('#base_url').val()
												+ 'files/icons/1361733025_Alarm.png" Onclick="add_reminder_event('
												+ obj[0]['ev_id'] + ');" />');

					} else {
						$('#sharing_event_html')
								.append(
										'&nbsp;<img style="cursor:pointer;height:30px" src="'
												+ $('#base_url').val()
												+ 'files/icons/1361733025_Alarm.png" Onclick="add_reminder_event('
												+ obj[0]['ev_id'] + ');" />');

					}

				}

			});

}

function clear_records(date) {

	// $(".custom_options_id").first().after($("#swapper"));
	$('.canremove').show();
	$('.custom_options_id').show();
	$('#swapper').show();

	var selected_value = $("#select_id_cal :selected").val();

	if (selected_value == 'Assignment' || selected_value == 'Reading') {
		var currentdate = new Date();

		var month = new Array();

		month[0] = "01";
		month[1] = "02";
		month[2] = "03";
		month[3] = "04";
		month[4] = "05";
		month[5] = "06";
		month[6] = "07";
		month[7] = "08";
		month[8] = "09";
		month[9] = "10";
		month[10] = "11";
		month[11] = "12";

		var my_month = month[currentdate.getMonth()];

		var datetime = my_month + "-" + currentdate.getDate() + "-"
				+ currentdate.getFullYear();

		$('#datepicker2').val(datetime);
		$('#temp_due_date').val(date);

	} else {
		$('#datepicker2').val(date);
	}

	$('#location_calender').val('');
	$('#datepicker4').val('');
	$('#datepicker6').val('');

	// $("#select_id_cal option[value='none']").prop('selected',true);

	$('#note_calender').val('');
	$('.other_show_text_cal').hide();
	$('#other_show_text_cal').val('');

	$('#delete_event_html_overall').hide();
	$('#updating_event_html').hide();
	$('#sharing_event_html').hide();
	$('#sharing_event_accepted').hide();
	$('#all_day').prop('checked', false);

	$("#datepicker4").attr("disabled", false);
	$("#datepicker6").attr("disabled", false);

	if (date != 'removed') {
		$('#message_show').hide();
	}

	$('.custom_options_id').remove();
	$('.custom_options_id_not').remove();

	$('#updating_event_html_overall').hide();

	selector_event();

}

// //////////End display event

function Update_event_go() {
	new_loading();
	if ($("#Filedata-queue > div").size() == 0) {
		Update_event();
	} else {
		$('#Filedata').uploadify('upload', '*');
	}
}

function Update_event(id) {

	$('#Filedata').uploadify('upload', '*');

	var html = '';

	if ($('#datepicker2').val() == '') {
		$('#datepicker2').css('border', '1px solid #900');
	} else {
		$('#datepicker2').removeAttr('style');
	}

	var typoo = $("#select_id_cal option:selected").text()

	if (typoo != 'Assignment' && typoo != 'Reading' && typoo != 'School event') {

		if ($('#location_calender').val() == '') {
			$('#location_calender').css('border', '1px solid #900');
		} else {
			$('#location_calender').removeAttr('style');
		}
	}

	value = $('#all_day').is(':checked');

	if (value == true) {
		$('#datepicker4').removeAttr('style');
		$('#datepicker6').removeAttr('style');
	}

	if (typoo == 'School event') {
		value = true;
	}

	if (value == false) {

		if ($('#datepicker4').val() == '') {
			$('#datepicker4').css('border', '1px solid #900');
		} else {
			$('#datepicker4').removeAttr('style');
		}
		if ($('#datepicker6').val() == '') {
			$('#datepicker6').css('border', '1px solid #900');
		} else {
			$('#datepicker6').removeAttr('style');
		}

	}

	var str = "";

	$("#select_id_cal option:selected").each(function() {
		if ($(this).val() == 'none') {
			$('#select_id_cal').css('border', '1px solid #900');

		} else {
			$('#select_id_cal').removeAttr('style');
		}
	});

	$("#select_id_cal option:selected").each(function() {
		if ($(this).val() == 'other') {
			if ($('#note_other_cal').val() == '') {
				$('#note_other_cal').css('border', '1px solid #900');
			} else {
				$('#note_other_cal').removeAttr('style');
			}
		}
	});

	if (html != '') {

		$('#errors_show').html(html);
		$('#errors_show').slideDown('slow', function() {
			$('#error_slider_card').delay(1800).slideUp(1300);
		});

		return false;
	} else {
		$('#errors_show').slideUp('slow', function() {
			$('#error_slider_card').delay(1800).slideUp(1300);
		});
		var datastring = '';

		if (typoo == 'Assignment' || typoo == 'Reading') {

			datastring = 'date=' + $('#datepicker2').val() + "&type="
					+ $("#select_id_cal option:selected").val() + '&id=' + id
					+ '&course=' + $("#field_courses option:selected").val();

		} else {

			datastring = 'date=' + $('#datepicker2').val() + '&location='
					+ $('#location_calender').val() + '&starttime='
					+ $('#datepicker4').val() + '&end_date='
					+ $('#datepicker6').val() + "&type="
					+ $("#select_id_cal option:selected").val() + '&notes='
					+ $('#note_calender').val() + '&id=' + id + '&course='
					+ $("#field_courses option:selected").val();

		}

		if ($('#note_other_cal').val() != '') {
			datastring += '&other_text=' + $('#note_other_cal').val()
		}

		// ///////////////////custom fields code here

		var customdata = new Array();
		var types = new Array();
		var counter = 0;
		var foundedfiles = 0;
		var pass = true;
		var typecounter = 0;

		$('.custom_options_id')
				.closest('tr')
				.find("input,textarea")
				.each(
						function() {

							if ($(this).attr('class') != 'custom_options_id_not'
									&& $(this).attr('type') != 'button') {

								if ($(this).attr('type') == 'checkbox') {
									var value_checked = '';

									if ($(this).is(':checked') == true) {
										value_checked = 'true';
									} else {
										value_checked = 'false';
									}

									customdata[counter] = value_checked;
								} else {
									if ($(this).val() != '') {
										customdata[counter] = $(this).val();
									}
								}

								// /if its a file and nothing has been selected
								// it means sending the prevoius upload

								if ($(this).attr('type') == "file") {
									var value = $(this).attr('title');
								}

								if ($(this).attr('type') == 'file') {
									foundedfiles++;
								}

								// /only giving null for textarea now
								if ($(this).attr('type') === undefined) {
									types[typecounter] = 'textarea';

								} else {

									// to get date time picker type just add
									// class on the other hand
									if ($(this).attr('class') == 'date_picker hasDatepicker') {
										types[typecounter] = 'date_picker';
									} // to get time picker type just add
									// class on the other hand
									else if ($(this).attr('class') == 'time_picker hasDatepicker') {
										types[typecounter] = 'time_picker';
									} else {
										types[typecounter] = $(this).attr(
												'type');
									}

								}

								typecounter++;
								counter++;
							}
						});

		var enoded_data = JSON.stringify(customdata);

		datastring += '&custom_type=' + types + '&custom_data=' + enoded_data

		// ///custom types update code

		$.ajax({
			url : $('#base_url').val() + "instructor/update_session_saved/",
			type : "GET",
			data : datastring,
			context : document.body,
			cache : false,
			success : function(data) {

				$('#calendar').html('');
				$('#message_show').html('<h2> Calender updated! </h2>');
				$('#message_show').slideDown('<h2> Calender updated! </h2>');
				calender_render();
			}
		});

	}

}

// ////////end update event code

function disable_all_fields() {

	$("#select_id_cal  option").attr("disabled", true).addClass(
			'remove_text_box_css');
	$("#datepicker2").attr("disabled", true).addClass('remove_text_box_css');
	$("#location_calender").attr("disabled", true).addClass(
			'remove_text_box_css');
	$("#datepicker4").attr("disabled", true).addClass('remove_text_box_css');
	$("#datepicker6").attr("disabled", true).addClass('remove_text_box_css');
	$("#note_calender").attr("disabled", true).addClass('remove_text_box_css');
	$("#note_other_cal").attr("disabled", true).addClass('remove_text_box_css');
	$("#select_id_cal").hide();

	$('#updating_event_html_overall').hide();

	// /extended functonality for event type

}

function enable_all_fields() {
	$("#select_id_cal  option").attr("disabled", false).removeClass(
			'remove_text_box_css');
	$("#datepicker2").attr("disabled", false)
			.removeClass('remove_text_box_css');
	$("#location_calender").attr("disabled", false).removeClass(
			'remove_text_box_css');
	$("#datepicker4").attr("disabled", false)
			.removeClass('remove_text_box_css');
	$("#datepicker6").attr("disabled", false)
			.removeClass('remove_text_box_css');
	$("#select_id_cal").attr("disabled", false).removeClass(
			'remove_text_box_css');
	$("#note_calender").attr("disabled", false).removeClass(
			'remove_text_box_css');
	$("#note_other_cal").attr("disabled", false).removeClass(
			'remove_text_box_css');
	$("#select_id_cal").show();

}

function Get_event_session() {

	$.ajax({
		url : $('#base_url').val() + "instructor/save_event_session/",
		type : "GET",
		data : datastring,
		context : document.body,
		cache : false,
		success : function(data) {

			return data;

		}

	});

}

function core_permission() {

	var selected_text = $("#field_courses option:selected").text();

	selected_text = jQuery.trim(selected_text);

	if (selected_text == 'Personal') {
		$('#access_maker').show();

	} else {
		if ($('#core_permission').val() == 'view') {
			$('#access_maker').hide();
		}

		if ($('#core_permission').val() == 'modify'
				&& $("#canmanage_school_calender").val() != 'admin school') {
			$('#access_maker').hide();
		}

		if ($('#core_permission').val() == 'modify'
				&& $("#canmanage_school_calender").val() == 'admin school') {
			$('#access_maker').show();
		}

		if ($('#core_permission').val() == 'modify'
				&& selected_text != 'School Calender') {
			$('#access_maker').show();
		}
	}
}

$(function() {

	$("#button").click(function() {
		if ($(this).val() == "Hide") {
			$(this).val("Show");
			$("#center").animate({
				width : '30%'
			});
			$("#right").animate({
				width : '0px'
			});
		} else {
			$(this).val("Hide");
			$("#center").animate({
				width : '10%'
			});
			$("#right").animate({
				width : '20%'
			});
		}

	});
});

// /////right float div end
$(function() {

	$('#field_courses')
			.change(
					function() {

						clear_records();

						core_permission();

						$('#swapper').show();

						// ////hide the post sylabuss reponse div

						var selected = $("#field_courses option:selected")
								.val();
						var selected_text = $("#field_courses option:selected")
								.text();

						if (selected == '0') {
							$('#select_optional_case').val('');
							$('#field_courses_additional').html('');
							$('#master_method').val('no');
							$('#importeventspan').html('');
							$("#viewer").hide();
							$("#viewer_btns").hide();

						} else {
							$("#viewer").show();
							$("#viewer_btns").show();

							enable_all_fields();

							$('#view_1_event').show();
							$('#view_2_event').hide();

							var selected_name = $(
									"#field_courses option:selected").text();

							var makelink = '<br/><form action="#" method="post" class="stdform"><button class="radius2" type="button" onclick="redirect_course('
									+ selected
									+ ');">'
									+ selected_name
									+ ' Additional Info</button></form>';

							var importexcel = '<button class="radius2" type="button" onclick="redirect_import('
									+ selected
									+ ');">"Import Event For Course '
									+ selected_name + '"</button>';

							// /stop creating link for these things
							if (selected_name != 'Personal'
									&& selected_name != 'School Calender') {

								$('#field_courses_additional').html(makelink);

							}

							$('#importeventspan').html(importexcel);
							$('#master_method').val('yes');
							$('#write_acccess').css('visibility', 'visible');
							$('#write_acccess').show();
							$("#select_id_cal  option").removeAttr("disabled");

						}

						if ($('#master_method').val() == 'no') {
							$('#write_acccess').hide();
						}

						$.ajax({
							url : $('#base_url').val()
									+ "instructor/load_event_selected_date/",
							type : "GET",
							data : 'selected=' + selected,
							context : document.body,
							cache : false,
							success : function(data) {

								calender_render();

							}

						});

					});

	// /////////////here caleder load for this first time
	// /////frist of all we need to check that are we have selected some subject
	// or its going with all

	var selected = $("#field_courses option:selected").val();

	var selected_text = $("#field_courses option:selected").text();

	$('#updating_event_html_overall').hide();

	// /permission work
	core_permission();

	// ////if all is selected than get all events

	// /if some course is selected then show that course events

	if (selected == 0) {

		$("#select_id_cal  option").attr("disabled", "disabled");
		disable_all_fields();

		$("#viewer").hide();
		$("#viewer_btns").hide();

	} else {

		$("#viewer").show();
		$("#viewer_btns").show();

		var selected_name = $("#field_courses option:selected").text();

		var makelink = '<br/><form action="#" method="post" class="stdform"><button class="radius2" type="button" onclick="redirect_course('
				+ selected
				+ ');">'
				+ selected_name
				+ ' Additional Info</button></form>';

		$('#field_courses_additional').html(makelink);

		$("#select_id_cal  option").removeAttr("disabled");
		enable_all_fields();
	}

	$.ajax({
		url : $('#base_url').val() + "instructor/load_event_selected_date/",
		type : "GET",
		data : 'selected=' + selected,
		context : document.body,
		cache : false,
		success : function(data) {

			calender_render();

		}
	});

});

// ////////////////end event calender
$(function() {

	$('#datepicker3').timepicker();
	$('#datepicker5').timepicker();
	$('#datepicker4').timepicker();
	$('#datepicker6').timepicker();
	$('#type_name_starttime').timepicker();
	$('#type_name_endtime').timepicker();

});
// //////form load events

function Qtipshow(obj, id) {

	obj
			.qtip({
				content : {
					// Set the text to an image HTML string with the correct src
					// URL to the loading image you want to use
					text : 'Loading.... ',
					ajax : {
						url : $('#base_url').val()
								+ "instructor/get_event_by_id/?id=" + id
					},
					title : {
						text : 'Event Managment', // Give the tooltip a title
					// using each elements text
					}
				},
				method : "get",
				position : {
					target : 'rightMiddle',
					at : 'rightBottom', // Position the tooltip above the link
					viewport : $(window), // Keep the tooltip on-screen at all
					// times
					effect : true
				// Disable positioning animation
				},
				hide : {
					event : 'unfocus'
				},
				show : {
					when : {
						event : 'click'
					}
				},
				events : {
					hide : function(event, api) {
						var oEvent = event.originalEvent;

						// If we clicked something inside the date selector...
						// don't hide!
						if (oEvent
								&& $(oEvent.target).closest('.ui-datepicker').length) {
							qtip.preventDefault();
						} else {
							api.destroy();
						}
					}
				}
			});

	obj.qtip("show");

}

function refresh_calender_on_call() {

	// /////////////here caleder load for this first time
	// /////frist of all we need to check that are we have selected some subject
	// or its going with all

	$('#calendar').html(' ');

	var selected = $("#field_courses option:selected").val();

	var selected_text = $("#field_courses option:selected").text();

	$('#updating_event_html_overall').hide();

	// /permission work
	core_permission();

	// ////if all is selected than get all events

	// /if some course is selected then show that course events

	if (selected == 0) {

		$("#select_id_cal  option").attr("disabled", "disabled");
		disable_all_fields();

		$("#viewer").hide();
		$("#viewer_btns").hide();

	} else {

		$("#viewer").show();
		$("#viewer_btns").show();

		var selected_name = $("#field_courses option:selected").text();

		var makelink = '<br/><form action="#" method="post" class="stdform"><button class="radius2" type="button" onclick="redirect_course('
				+ selected
				+ ');">'
				+ selected_name
				+ ' Additional Info</button></form>';

		$('#field_courses_additional').html(makelink);
		var importexcel = '<input class="btn" type="button" value="Import Event For Course '
				+ selected_name
				+ '" onclick="redirect_import('
				+ selected
				+ ');" />';

		$('#importeventspan').html(importexcel);
		$("#select_id_cal  option").removeAttr("disabled");
		enable_all_fields();
	}

	$.ajax({
		url : $('#base_url').val() + "instructor/load_event_selected_date/",
		type : "GET",
		data : 'selected=' + selected,
		context : document.body,
		cache : false,
		success : function(data) {

			calender_render();

		}

	});

}

function chekclick() {

	value = $('#all_day').is(':checked');

	var value_selected1 = '';
	var value_selected2 = '';

	if ($("#datepicker4").val() != '' && $("#datepicker6").val() != '') {

		value_selected1 = $("#datepicker4").val();
		value_selected2 = $("#datepicker6").val();

	}

	if (value == true) {
		$("#datepicker4").attr("disabled", true);
		$("#datepicker6").attr("disabled", true);

		$("#val_temp1").val($("#datepicker4").val());
		$("#val_temp2").val($("#datepicker6").val());

		$("#datepicker4").val('');
		$("#datepicker6").val('');

	} else {

		$("#datepicker4").attr("disabled", false);
		$("#datepicker6").attr("disabled", false);
		$("#datepicker4").timepicker();
		$("#datepicker6").timepicker();
		$("#datepicker4").val($("#val_temp1").val());
		$("#datepicker6").val($("#val_temp2").val());

	}

}
$(function() {

	// ////checkbox for all day

	// //if all day is click then this function will trigger

	$('#all_day').click(function() {

		value = $('#all_day').is(':checked');

		var value_selected1 = '';
		var value_selected2 = '';

		if ($("#datepicker4").val() != '' && $("#datepicker6").val() != '') {

			value_selected1 = $("#datepicker4").val();
			value_selected2 = $("#datepicker6").val();

		}

		if (value == true) {
			$("#datepicker4").attr("disabled", true);
			$("#datepicker6").attr("disabled", true);

			$("#val_temp1").val($("#datepicker4").val());
			$("#val_temp2").val($("#datepicker6").val());

			$("#datepicker4").val('');
			$("#datepicker6").val('');

		} else {

			$("#datepicker4").attr("disabled", false);
			$("#datepicker6").attr("disabled", false);
			$("#datepicker4").timepicker();
			$("#datepicker6").timepicker();

			$("#datepicker4").val($("#val_temp1").val());
			$("#datepicker6").val($("#val_temp2").val());

		}

	});

	// ///

	$('#form_event').submit(function() {

		var html = '';

		if ($('#datepicker1').val() == '') {
			html += '*Please select your " Event Date " ! <br/>';
			$('#datepicker1').css('border', '1px solid #900');
		} else {
			$('#datepicker1').removeAttr('style');
		}
		if ($('#location').val() == '') {
			html += '*Please enter your " Location " ! <br/>';
			$('#location').css('border', '1px solid #900');
		} else {
			$('#location').removeAttr('style');
		}
		if ($('#datepicker3').val() == '') {
			html += '*Please enter your " Start date " ! <br/>';
			$('#datepicker3').css('border', '1px solid #900');
		} else {
			$('#datepicker3').removeAttr('style');
		}
		if ($('#datepicker5').val() == '') {
			html += '*Please enter your " End date " ! <br/>';
			$('#datepicker5').css('border', '1px solid #900');
		} else {
			$('#datepicker5').removeAttr('style');
		}
		var str = "";
		$("#select_id option:selected").each(function() {
			if ($(this).val() == 'none') {
				html += '*Please Choose your " Event Type" ! <br/>';
				$('#select_id').css('border', '1px solid #900');

			} else {
				$('#select_id').removeAttr('style');
			}
		});

		$("#select_id option:selected").each(function() {
			if ($(this).val() == 'other') {
				if ($('#notes_event_type').val() == '') {
					html += '*Please Enter Text "Event Type" ! <br/>';
					$('#notes_event_type').css('border', '1px solid #900');
				} else {
					$('#notes_event_type').removeAttr('style');
				}
			}
		});

		if (html != '') {
			$('#errors_show').html(html);
			$('#errors_show').slideDown('slow', function() {
				$('#error_slider_card').delay(1800).slideUp(1300);
			});
			return false;
		} else {

			return true;

		}

	});

});

function OnCloseWindows(win) {
	alert("Any message");
	return false;
}

$(function() {

	$('#other_show').hide();
	$('#other_show_text').hide();
	$('#other_show_cal').hide();
	$('.other_show_text_cal').hide();

	// ///window closing alert

	// ///hide the error msg
	$('#notification_text').click(function() {

		$('#notification_sended').hide();

	});

	$('#other_show_text_cal1').hide();
	// //////////for other to show
	$("#select_id").change(function() {
		var str = "";
		$("#select_id option:selected").each(function() {
			if ($(this).val() == 'other') {
				$('#other_show').show();
				$('#other_show_text').show();

			} else {
				$('#other_show').hide();
				$('#other_show_text').hide();
			}
		});
	})

});

// /for masking
$(function() {

	$("#ins_phone").mask("(999) 999-9999");
	$("#ins_fax").mask("(999) 999-9999");
	$("#phone").mask("(999) 999-9999");

});

// /for removing events

$(function() {
	$('#remove_horus').click(function() {

		$("input:checkbox[name=removed]:checked").each(function() {

			Remove_hours_this($(this).val());

		});

	});
});

$(function() {

	var counter = 0;

	$('#origional tr').each(function() {

		var id1 = counter + 'day_picket_ins';
		var id2 = counter + 'start_time_ins';
		var id3 = counter + 'end_time_ins';

		$("#" + id1).datepicker({
			dateFormat : "DD"
		});

		$("#" + id2).AnyTime_picker({
			format : "%H:%i",
			labelTitle : "Start time",
			labelHour : "Start time",
			labelMinute : "Minutes",
			placement : "popup"
		});

		$("#" + id3).AnyTime_picker({
			format : "%H:%i",
			labelTitle : "Start time",
			labelHour : "Start time",
			labelMinute : "Minutes",
			placement : "popup"
		});

		counter++;

	});

	$('#add_time_now')
			.click(
					function() {

						var randomnumber = Math.floor(Math.random() * 110078)

						var id1 = randomnumber + 'start_time_ins';
						var id2 = randomnumber + 'day_picket_ins';
						var id3 = randomnumber + 'end_time_ins';

						$('#origional')
								.append(
										'<tr id="row_'
												+ randomnumber
												+ '"><td valign="top" width="60"><select name="date[]"><option value="sunday">Sunday</option><option value="monday">Monday</option><option value="tuesday">Tuesday</option><option value="wednesday">Wednesday</option><option value="thursday">Thursday</option><option value="friday">Friday</option><option value="saturday">Saturday</option></select></td><td valign="top" width="60"><input name="start_time[]" style="width:100px;" id="'
												+ id2
												+ '" type="text" /></td><td valign="top" width="60"><input name="end_time[]" style="width:100px;" id="'
												+ id3
												+ '"  type="text"  /></td><td valign="top" width="150"><button type="button" class="" onclick="remove_this_ui('
												+ randomnumber
												+ ')" class="stdform">Remove</button></td><input name="action[]" style="width:100px;" type="hidden" value="new"  /><input name="ids[]" style="width:100px;" type="hidden" value="none"  /> </tr>')
								.slideDown(500);

						$("#" + id1).datepicker({
							dateFormat : "DD"
						});

						$("#" + id2).timepicker();

						$("#" + id3).timepicker();

					});

});

function success_add() {
	$('#error_adding').html(
			'<span class="success">Hours added successfully!</span>');
	$('#error_adding').slideDown('slow', function() {
		$('#error_adding').delay(1800).slideUp(1300);
	});
}

function removed_hours() {
	$('#error_adding').html(
			'<span class="error">Time Removed successfully!</span>');
	$('#error_adding').slideDown('slow', function() {
		$('#error_adding').delay(1800).slideUp(1300);
	});
}

function update_add() {
	$('#error_adding').html(
			'<span class="success">Hours updated successfully!</span>');
	$('#error_adding').slideDown('slow', function() {
		$('#error_adding').delay(1800).slideUp(1300);
	});

}

function remove_this_ui(id) {

	$('#row_' + id).remove();

}

function remove_this(id) {

	$.ajax({
		url : $('#base_url').val() + "instructor/remove_event_time_id/",
		type : "GET",
		data : 'id=' + id,
		context : document.body,
		cache : false,
		success : function(data) {

			if (data) {

				$('#row_' + id).remove();

			}

		}

	});
}

function update_final(id, from) {

	var error = false;

	if ($('#day_picket_ins').val() == '') {

		$('#error_adding').html(
				'<span class="error">Please choose weekday</span>');
		$('#error_adding').slideDown('slow', function() {
			$('#error_adding').delay(1800).slideUp(1300);
		});
		error = true;

	}

	if ($('#start_time_ins').val() == '') {

		$('#error_adding').html(
				'<span class="error">Please choose start time</span>');
		$('#error_adding').slideDown('slow', function() {
			$('#error_adding').delay(1800).slideUp(1300);
		});
		error = true;

	}

	if ($('#end_time_ins').val() == '') {
		$('#error_adding').html(
				'<span class="error">Please choose end time</span>');
		$('#error_adding').slideDown('slow', function() {
			$('#error_adding').delay(1800).slideUp(1300);
		});
		error = true;

	}

	// /if there is no error then we are good with this
	if (error == false) {

		$('#view_html').html(
				'<span class="success">please wait loading......</span>');

		$
				.ajax({
					url : $('#base_url').val() + "instructor/update_this_time/",
					type : "GET",
					data : 'time=' + $('#day_picket_ins').val() + '&starttime='
							+ $('#start_time_ins').val() + '&endtime='
							+ $('#end_time_ins').val() + '&id=' + id + "&from="
							+ from,
					context : document.body,
					cache : false,
					success : function(data) {

						var obj = JSON.parse(data);
						var view_html = '<table width="461" cellpadding=5 class="table-striped border-simple" style="margin-bottom:10px;width:461px !important;">';

						view_html += '<tr><th align=left>Weekday</th><th align=left>Start time</th><th align=left>End time</th><th align=left></th></tr>';

						for (data in obj) {
							view_html += '<tr id="' + obj[data]['id'] + '">';
							view_html += '<td id="'
									+ obj[data]['id']
									+ '_date" align="left" style="padding-left:6px !important;">'
									+ obj[data]['time'] + '</td>';
							view_html += '<td id="'
									+ obj[data]['id']
									+ '_start" align="left" style="padding-left:6px !important;">'
									+ obj[data]['starttime'] + '</td>';
							view_html += '<td id="'
									+ obj[data]['id']
									+ '_end" align="left" style="padding-left:6px !important;">'
									+ obj[data]['endtime'] + '</td>';
							view_html += '<td id='
									+ obj[data]['id']
									+ ' width=170 style="padding-left:6px !important;font-size:10px"><input type=button onclick="update_time('
									+ obj[data]['id']
									+ ','
									+ obj[data]['from']
									+ ')" / value="Edit" class="btn">  <input type="button" onclick="remove_time('
									+ obj[data]['id'] + ',' + obj[data]['from']
									+ ')" class="btn" value="Remove" /> </td>';
							view_html += '</tr>';
						}
						view_html += '</table>';

						$('#view_html').html(view_html);

						clear_fields();

						update_add();

						$('#update_func').html('');

					}

				});

	}

}

function update_time(id, from) {

	$('#day_picket_ins').val($("#" + id + '_date').html());
	$('#start_time_ins').val($("#" + id + '_start').html());
	$('#end_time_ins').val($("#" + id + '_end').html());

	$('#update_func').html(
			'<input type="button" value="Update" onclick="update_final(' + id
					+ ',' + from + ')" class="btn" />');

}

function clear_fields() {

	$('#day_picket_ins').val('');
	$('#start_time_ins').val('');
	$('#end_time_ins').val('');

}

function remove_time(id, from) {

	$
			.ajax({
				url : $('#base_url').val() + "instructor/remove_event_time_id/",
				type : "GET",
				data : 'id=' + id + "&from=" + from,
				context : document.body,
				cache : false,
				success : function(data) {

					var obj = JSON.parse(data);
					var view_html = '<table width="461" cellpadding=5 class="table-striped border-simple" style="margin-bottom:10px;width:461px !important;">';

					view_html += '<tr><th align=left>Weekday</th><th align=left>Start time</th><th align=left>End time</th><th align=left></th></tr>';

					for (data in obj) {
						view_html += '<tr id="' + obj[data]['id'] + '">';
						view_html += '<td id="'
								+ obj[data]['id']
								+ '_date" align="left" style="padding-left:6px !important;">'
								+ obj[data]['time'] + '</td>';
						view_html += '<td id="'
								+ obj[data]['id']
								+ '_start" align="left" style="padding-left:6px !important;">'
								+ obj[data]['starttime'] + '</td>';
						view_html += '<td id="'
								+ obj[data]['id']
								+ '_end" align="left" style="padding-left:6px !important;">'
								+ obj[data]['endtime'] + '</td>';
						view_html += '<td id='
								+ obj[data]['id']
								+ ' width=170 style="padding-left:6px !important;font-size:10px"><input type=button onclick="update_time('
								+ obj[data]['id']
								+ ','
								+ obj[data]['from']
								+ ')" value="Edit" class="btn" />  <input type="button" onclick="remove_time('
								+ obj[data]['id'] + ',' + obj[data]['from']
								+ ')" class="btn" value="Remove" /> </td>';
						view_html += '</tr>';
					}
					view_html += '</table>';

					$('#view_html').html(view_html);

					removed_hours();

				}

			});

	// //////removing events work
}

// ////////email conditions and work

function validate_email(emailAddress) {

	var emailRegex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i);
	var valid = emailRegex.test(emailAddress);
	if (!valid) {

		return false;
	} else
		return true;
}

$('#send_email')
		.click(
				function() {

					var error = '1';

					var array = $('#to_email').val().split(",");

					if (array == '') {

						$("#email_export")
								.html(
										'<div class="alert alert-error">Please enter email address*</div>')
								.slideDown('slow').delay(1800).slideUp(2000);
						error = '2';
					} else {
						for (data in array) {
							var str = array[data].replace(/\s/g, '');
							if (!validate_email(str)) {
								error = 'val';
							}

						}

						if (error == "val") {
							$("#email_export")
									.html(
											'<div class="alert alert-error">Invalid email address*</div>')
									.slideDown('slow').delay(1800)
									.slideUp(2000);
						}
					}

					if ($("#doc_type option:selected").val() == 0) {

						$("#export_view")
								.html(
										'<div class="alert alert-error">Please select export type *</div>')
								.slideDown('slow').delay(1800).slideUp(2000);
						error = '2';
					}

					if (error == '1') {

						$("#errors_space")
								.html(
										'<div class="alert alert-success">Sending please wait .....</div>');

						$.ajax({
							url : $('#base_url').val()
									+ "instructor/send_email/",
							type : "GET",
							data : 'to=' + $('#to_email').val() + "&type="
									+ $("#doc_type option:selected").val()
									+ "&course_id="
									+ $("#field_courses option:selected").val()
									+ '&text=' + $('#text_send').val(),
							context : document.body,
							cache : false,
							success : function(data) {

								$("#email_confirm_chooser").fancybox().trigger(
										'click');

							}

						});

					} else {

					}

				});

// //course info date pickers

$(function() {

	$('.content .msgsuccess').css('margin-bottom', '10px').slideUp(4000);
	$("#add_co_start_date").datepicker({
		dateFormat : "mm-dd-yy"
	});
	$("#add_co_end_date").datepicker({
		dateFormat : "mm-dd-yy"
	});
	$("#event_structure").fancybox({
		'scrolling' : 'auto',
		'centerOnScroll' : true
	});

	$("#color_picker").fancybox();

	// /////////////////color picker used for just courses color

	$("#field_courses_color option[value='0']").prop('selected', true);

	// /////////////////

});

function filterEventInvitees(ob) {
	$.ajax({
		url : $('#base_url').val() + "instructor/generate_share_event_html/",
		type : "GET",
		data : {
			query : $('#event-share-searching').val(),
			course_id : $("#field_courses option:selected").val()
		},
		context : document.body,
		cache : false,
		success : function(data) {
			$('#event-share-students').html(data);
		}

	});
}

var share_events_id;

function share_event(id) {

	share_events_id = id;
	var value = $("#field_courses option:selected").val();
	var value_text = $("#field_courses option:selected").text();
	// trigger the html in popup
	generate_html_share_event(share_events_id);
	// generate_html_share events
}

function generate_html_share_event(share_events_id) {
	var path = '';
	path = $('#base_url').val() + "instructor/generate_share_event_html/";
	// it generates html for the courses
	$.ajax({
		url : path,
		type : "GET",
		data : "course_id=" + $("#field_courses option:selected").val()
				+ "&event_id=" + share_events_id,
		context : document.body,
		cache : false,
		success : function(data) {
			$('#inline1_notification').html(data);
			$("#notification_chooser").fancybox().trigger('click');
		}
	});
}

function trigger_share_events(ev_id) {

	var return_data = ui_access_trigger();
	if (return_data == 'all') {
		// ////////////if its 0 then 1 thing is confirm it should display
		// notification

		$('<div></div>').appendTo('body').html(
				'<div><h6>Send message to students in all courses?</h6></div>')
				.dialog(
						{
							modal : true,
							title : 'Sending confirmation',
							zIndex : 10000,
							autoOpen : true,
							width : 'auto',
							resizable : false,
							buttons : {
								Yes : function() {

									share_events_by_all_user('all');

									$(this).dialog("close");

									$('#inline1_email_confirm').html(
											'Event Shared!');
									$("#email_confirm_chooser").fancybox()
											.trigger('click');

								},
								No : function() {
									$(this).dialog("close");
								}
							},
							close : function(event, ui) {
								$(this).remove();
							}
						});
		// /////////////////aler code end
	} else {
		var res = '';
		var success = 0;

		for ( var k = 0; k < return_data.length; k++) {

			res = share_events_by_user(return_data[k], ev_id);
			if (res) {
				success++;
			}
		}

		$('#notifications_send').html(
				'event shared with ' + success + ' students');
		$('#notification_sended').slideDown('slow', function() {
			$('#notification_sended').delay(1800).slideUp(2000);
		});

		$('#inline1_email_confirm').html('Event Shared!');
		$("#email_confirm_chooser").fancybox().trigger('click');
	}
}

function share_events_by_user(id, share_events_id) {

	

	$.ajax({
		url : $('#base_url').val() + "instructor/share_events_by_id/",
		type : "GET",
		data : "reciever_id=" + id + "&event_id=" + share_events_id,
		context : document.body,
		cache : false,
		success : function(data) {

			return data;
		}
	});

}

function share_events_by_all_user(course) {

	$.ajax({
		url : $('#base_url').val() + "instructor/send_notification/",
		type : "GET",
		data : 'text=' + $('#notification_text').val() + '&course=' + course,
		context : document.body,
		cache : false,
		success : function(data) {

			if (data <= 1) {
				$('#notifications_send').html(
						'Notfication sent to ' + data + ' student');
				$('#notification_sended').slideDown('slow', function() {
					$('#notification_sended').delay(1800).slideUp(2000);
				});

			} else {
				$('#notifications_send').html(
						'Notfication sent to ' + data + ' students');
				$('#notification_sended').slideDown('slow', function() {
					$('#notification_sended').delay(1800).slideUp(2000);
				});

			}
		}

	});
}
// /send notifcation call end
function accept_share_event(event_id, share_id) {
	$('#sharing_feature').hide();
	$.ajax({
		url : $('#base_url').val() + "instructor/accept_share_events/",
		type : "GET",
		data : "share_id=" + share_id + "&event_id=" + event_id,
		context : document.body,
		cache : false,
		success : function(data) {

			return data;
		}
	});
	$('#inline1_email_confirm').html('Event accepted!');
	$("#email_confirm_chooser").fancybox().trigger('click');
	refresh_calender_on_call();
}
function deny_share_event(event_id, share_id) {
	$('#sharing_feature').hide();
	$.ajax({
		url : $('#base_url').val() + "instructor/deny_share_events/",
		type : "GET",
		data : "share_id=" + share_id + "&event_id=" + event_id,
		context : document.body,
		cache : false,
		success : function(data) {

			return data;
		}
	});
	$('#inline1_email_confirm').html('Event denied!');
	$("#email_confirm_chooser").fancybox().trigger('click');
	refresh_calender_on_call();
}

function status_share_event(id) {

	// /trigger the thml in popup
	generate_html_status_share_event(id);
	// generate_html_share events

}

function generate_html_status_share_event(id) {

	var path = '';

	path = $('#base_url').val()
			+ "instructor/generate_status_share_event_html/";

	// //it geneeretes html for the courses

	$.ajax({
		url : path,
		type : "GET",
		data : "event_id=" + id,
		context : document.body,
		cache : false,
		success : function(data) {

			$('#inline1_notification').html(data);
			$("#notification_chooser").fancybox().trigger('click');

		}

	});
}

function search_calendar_event() {

	$.ajax({
		url : $('#base_url').val() + "instructor/calendar_search/",
		type : "GET",
		data : 'query=' + $('#search_calendar').val(),
		context : document.body,
		cache : false,
		success : function(data) {

			$('#viewer').show();
			$('#search_result_calendar').html(data);

		}

	});

}
function add_calendar(id) {

	$.ajax({
		url : $('#base_url').val() + "instructor/calendar_duplicate/",
		type : "GET",
		data : "event_id=" + id,
		context : document.body,
		cache : false,
		success : function(data) {

			return data;
		}
	});

	$('#' + id + '_search').hide();

	$('#inline1_email_confirm').html(
			'<span class="success">calendar added successfully</span>');
	$("#email_confirm_chooser").fancybox().trigger('click');

	refresh_calender_on_call();

}

function updatenotifcation() {

	$.ajax({
		url : $('#base_url').val() + "instructor/update_notifications/",
		type : "GET",
		context : document.body,
		cache : false,
		success : function(data) {

			return data;
		}
	});
}

function mng_locations_now() {
	$.ajax({
		url : $('#base_url').val() + "permissions/mng_locations/",
		type : "GET",
		context : document.body,
		cache : false,
		success : function(data) {

			$('#list_pop_types').html(data);
			$("#events_type_list").fancybox().trigger('click');

		}
	});

}

function save_location_new() {

	if ($('#location_name').val() == '') {
		$('#error_addition').html('Please provide Name!');
		return;
	}

	if ($('#location_address1').val() == '') {
		$('#error_addition').html('Please provide address1!');
		return;
	}

	$.ajax({
		url : $('#base_url').val() + "permissions/add_location_new/",
		type : "GET",
		data : "name=" + $('#location_name').val() + "&address1="
				+ $('#location_address1').val() + "&address2="
				+ $('#location_address2').val() + "&",
		context : document.body,
		cache : false,
		success : function(data) {

			mng_locations_now();

		}
	});

}

function remove_location_this(id, name) {

	$('<div></div>').appendTo('body').html(
			'<div><h6>Delete <b>' + name + '</b></h6></div>').dialog({
		modal : true,
		title : 'Removing confirmation',
		zIndex : 10000,
		autoOpen : true,
		width : 'auto',
		resizable : false,
		buttons : {
			Delete : function() {

				remove_selected_address(id);

				$(this).dialog("close");

			},
			Cancel : function() {
				$(this).dialog("close");
			}
		},
		close : function(event, ui) {
			$(this).remove();
		}
	});

}

function remove_selected_address(id) {
	$.ajax({
		url : $('#base_url').val() + "permissions/remove_new_location/",
		type : "GET",
		data : "remove_id=" + id,
		context : document.body,
		cache : false,
		success : function(data) {

			if (data) {
				mng_locations_now();
			}

		}
	});
}

function update_location_this(id) {

	$.ajax({
		url : $('#base_url').val() + "permissions/update_new_location/",
		type : "GET",
		data : "update_id=" + id,
		context : document.body,
		cache : false,
		success : function(data) {

			$('#list_pop_types').html(data);
			$("#events_type_list").fancybox().trigger('click');

		}
	});

}

function update_location_this_confirm(id) {

	if ($('#location_name').val() == '') {
		$('#error_addition').html('Please provide Name!');
		return;
	}

	if ($('#location_address1').val() == '') {
		$('#error_addition').html('Please provide address1!');
		return;
	}

	$.ajax({
		url : $('#base_url').val() + "permissions/update_location_new/",
		type : "GET",
		data : "name=" + $('#location_name').val() + "&address1="
				+ $('#location_address1').val() + "&address2="
				+ $('#location_address2').val() + "&id=" + id,
		context : document.body,
		cache : false,
		success : function(data) {

			mng_locations_now('added');

		}
	});

}
function gurnotifcation(id) {

	$.ajax({
		url : $('#base_url').val() + "instructor/update_notifications/",
		type : "GET",
		data : "id=" + id,
		context : document.body,
		cache : false,
		success : function(data) {

			$('#notif').hide();
		}
	});
};

function get_all_notif() {

	$.ajax({
		url : $('#base_url').val() + "instructor/get_all_notif/",
		type : "GET",
		context : document.body,
		cache : false,
		success : function(data) {

			$('#viewall').hide();
			$('#firstoptions').hide();
			$('#showall').html(data);
		}
	});

}
function delet_notifcation(id) {

	$.ajax({
		url : $('#base_url').val() + "instructor/removee_notifications/",
		type : "GET",
		data : "id=" + id,
		context : document.body,
		cache : false,
		success : function(data) {

			$('#notif_').hide();
		}
	});

}
// //////working with export things like page export/pdf/doc
function export_option() {

	var go_redirect = false;

	var value = $("#field_export option:selected").val();
	var course = $("#field_courses option:selected").val();

	// if export type is not selected make notice
	if (value == 'none') {

		$('#gur_exports').html(
				'<span class="alert alert-error">Please select export!</span>')
				.show().delay(1800).slideUp(2000);

		go_redirect = true;

	}

	// if All is selected show error
	if (course == 0) {

		$('#gur_exports').html(
				'<span class="alert alert-error">Please select course!</span>')
				.show().delay(1800).slideUp(2000);

		go_redirect = true;

	} else {
		$('#notification_exports').hide();
	}

	if (go_redirect == false) {

		if (value == 'page') {
			// var url =
			// $('#base_url').val()+"/instructor/view_course_events/"+course;
			// window.open(url,'_blank');

			window
					.open(
							$('#base_url').val()
									+ 'instructor/view_course_events/' + course,
							'Popup',
							'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no, width=800,height=500,left=430,top=23');

		}

		if (value == 'doc') {

			// window.open($('#base_url').val()+"/instructor/view_course_events_in_doc/"+course,'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,
			// width=500,height=500,left=430,top=23');

			$("#secretIFrame").attr(
					"src",
					$('#base_url').val()
							+ 'instructor/view_course_events_in_doc/' + course);

			// var url =
			// $('#base_url').val()+"/instructor/view_course_events_in_doc/"+course;
			// window.open(url,'_blank');
		}

		if (value == 'pdf') {
			// window.open($('#base_url').val()+"/instructor/view_course_events_in_pdf/"+course,'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,
			// width=500,height=500,left=430,top=23');

			$("#secretIFrame").attr(
					"src",
					$('#base_url').val()
							+ 'instructor/view_course_events_in_pdf/' + course);

			// var url =
			// $('#base_url').val()+"/instructor/view_course_events_in_pdf/"+course;
			// window.open(url,'_blank');
		}

		// //if value selected is email we need to trigger an popup to send
		// export type
		if (value == 'email') {

			$("#email_chooser").fancybox().trigger('click');

		}
		if (value == 'archive') {

			$("#secretIFrame").attr(
					"src",
					$('#base_url').val()
							+ 'instructor/view_course_summary_in_archive/'
							+ course);

		}

	}

}

function upadte_count_user(id) {

	$.ajax({

		url : $('#base_url').val() + "instructor/update_notif_status",
		type : "GET",
		context : document.body,
		data : "id=" + id,
		cache : false,
		success : function(data) {

		}

	});

}

function delet_notifcation_user(id) {
	$.ajax({
		url : $('#base_url').val() + "permissions/remove_selected_notif/",
		type : "GET",
		data : "id=" + id,
		context : document.body,
		cache : false,
		success : function(data) {

			$('#notif_' + id).hide();
		}
	});

}

function clearkeys() {
	$
			.ajax({
				url : $('#base_url').val() + 'instructor/clear_keys/',
				type : "GET",
				context : document.body,
				cache : false,
				success : function(data) {

					$('#success')
							.html(
									'<br/><div class="notification msgsuccess"><p>Keys Cleared Successfully</div>');
				}
			});
}

	function push_call_confirm_roles()
	{
		
		 $.ajax({
									url: $('#base_url').val()+"instructor/send_notification_all_roles/",
									type: "GET",
									data: 'text='+$('#notification_text').val(),
									context: document.body,
									cache: false,
									success: function(data){
											
											var obj = JSON.parse(data);
											
											if(obj['Sended']!='')
											{
												var html = 'Sended to '+obj['Sended']+' users </br>';
												$('#notifications_send').append(html);	
												
											}if(obj['Failed']!='')
											{
												var html = 'Sending Failed '+obj['Failed']+' users </br>';
												$('#notifications_send').append(html);		
											}
											
										}
									
							   });	
			
		
	}
	
	
	function push_call_by_role(id)
	{
		
							$.ajax({
								
							url: $('#base_url').val()+"instructor/send_notification_by_role/",
							type: "GET",
							data:"id="+id+"&text="+$('#notification_text').val(),
							context: document.body,
							cache: false,
							success: function(data){
					
											var obj = JSON.parse(data);
											
											if(obj['Sended']!='')
											{
												var html = 'Sended to '+obj['Sended']+' users </br>';
												$('#notifications_send').append(html);	
												
											}if(obj['Failed']!='')
											{
												var html = 'Sending Failed '+obj['Failed']+' users </br>';
												$('#notifications_send').append(html);	
												
											}
											
									}
							});		
			
	}
	