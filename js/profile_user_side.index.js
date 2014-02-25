
//http://osamah.elevater.demo/instructor/profile?msg=information%20update

//file for manage mode only

// JavaScript Document
	
	
	function submit_ajax(id)
	{
		
				$.ajax({
					url     : $('#base_url').val() + "instructor/save_info_additional_course/"+id,
					type    : "POST",
					context : document.body,
					data    : $("#form_course_info").serialize(),
					cache   : false,
					success : function(data) {
						
						$('#msg_user')
								.html(
										'<div style="margin-bottom:0px;" class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>Success!</strong> Information updated!</div>');

						$("#global_use_msg").fancybox().trigger('click');

						setTimeout(function() {
							$.fancybox.close();
						}, 1300);
						
					}
				});
			
	}
	
	$('#courses_listing').change(function(){
				
				if($('#courses_listing option:selected').val()!=''){
				
					$.ajax({
						url : $('#base_url').val() + "instructor/additional_course_info/",
						type : "GET",
						context : document.body,
						data : "data=" + $('#courses_listing option:selected').val(),
						cache : false,
						success : function(data) {
							
							$('#updater_form').html(data);
							
						}
					});
				
				}
		
	});
	
	jQuery.validator.addMethod("digitsOnly", function(value, element) { 
  			 return this.optional(element) || /^\d+$/i.test(value);
            }, "Please enter only numbers");

	jQuery.validator.addMethod("alphabetsOnly", function(value, element) { 
  			 return this.optional(element) || /^[a-z]+$/i.test(value);
            }, "Please enter only letters");
	
	// /for masking
	$(function() {

		$("#ins_phone").mask("(999) 999-9999");
		$("#ins_fax").mask("(999) 999-9999");
		$("#phone").mask("(999) 999-9999");

	});
	
	$('#save_info').click(function(){
		
		var myresult = $("#form_event").validate({
										rules: {
											 ins_timezone: {
											  required: true
											 },
											ad_ins_address1: {												 
												 required: true,
												},
											ad_ins_city: {
												required: true,
												alphabetsOnly: true,
											},
											ad_ins_state: {
												required: true,
												alphabetsOnly: true,
											},
											ad_ins_zip: {
												required: true,
												digitsOnly: true,
											},
											ins_email: {
												required:true,
												email: true,
											},
											ins_phone: {
												required: true,
												//digitsOnly: true,
											
											},
											
										},
										messages: {
											ins_timezone: {
     											 required: 'Please select a timezone'
										     },
											ad_ins_address1: "Please enter address ", 
											ad_ins_city:{
												required: "Please enter city",
												alphabetsOnly: "Please enter letters only"
											},
											ad_ins_state: { 
												required:"Please enter state",
												alphabetsOnly: "Please entere letters only"
											},
											ad_ins_zip: { 
												required:"Please enter zip",
												digitsOnly: "Please enter digits only",
											},
											ins_email: {
												required:"Please enter email address",
												email: "Please enter valid email",
											},
											ins_phone: {
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
			
			}).form();	
			
			if(myresult){
				
					$('#Filedatanew1').uploadify('upload','*');
				
					var value_validate = $('#master_method').val();
					if(value_validate=='no'){
						$('#form_event').submit();	
					}
				
			}
		
	});
	
	
	$(document).ready(function(){ 
					
					$("#Filedatanew1").uploadify({
						
								'formData'    : {
									 'userid' : $('#userid').val(),
									 'hash'   : $('#hash').val(),
									 'title'  : "Profile Picture",
									 'page'   : "profile"
								},
								height        : 30,
								swf           : $('#base_url').val()+'files/uploadify/uploadify.swf',
								uploader      : $('#base_url').val()+'filesharing/fileuploading/',
								width         : 200,
							    'queueSizeLimit' : 1,
								messages      : {
									'maxNumberUploadError':'Exceded number of upload.',
									'nothingInTheQueueError':'Nothing in the Queue'		
								},
								'auto'        : false,
								'onQueueComplete' : function(queueData) {
									$('#form_event').submit();
								},
								'onSelect' : function(file) {
									$('#master_method').val('yes');
								}
								
								
					});
	});
	
	
	$('#add_time_now').click(
	
					function() {

						var randomnumber = Math.floor(Math.random() * 110078)

						var id1 = randomnumber + 'start_time_ins';
						var id2 = randomnumber + 'day_picket_ins';
						var id3 = randomnumber + 'end_time_ins';

						$('#origional')
								.append(
										'<tr id="row_'
												+ randomnumber
												+ '"><td valign="top" width="60"><select name="date[]"><option value="sunday">Sunday</option><option value="monday">Monday</option><option value="tuesday">Tuesday</option><option value="wednesday">Wednesday</option><option value="thursday">Thursday</option><option value="friday">Friday</option><option value="saturday">Saturday</option></select></td><td valign="top" width="60"><input name="start_time[]" id="'
												+ id2
												+ '" type="text" /></td><td valign="top" width="60"><input name="end_time[]" id="'
												+ id3
												+ '"  type="text"  /></td><td valign="top" width="150"><a href="javascript:" onclick="remove_this_ui('+ randomnumber+ ')" class="btn red icn-only"><i class="icon-remove icon-white"></i></a></td><input name="action[]" type="hidden" value="new"  /><input name="ids[]" style="width:100px;" type="hidden" value="none"  /> </tr>')
								.slideDown(500);

						$("#" + id1).datepicker({
							dateFormat : "DD"
						});

						$("#" + id2).timepicker();

						$("#" + id3).timepicker();

			});


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
