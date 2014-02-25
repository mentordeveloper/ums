// JavaScript Document
	
	$(document).ready(function(){

		$('#date_picker_inline').datepicker({
			dateFormat: "mm-dd-yy", 
		});	
		
		field_attendence();		
		
	});
	
	$(document).ready(function(){
						
			$('#field_courses').change(function() {
				field_attendence();				
			});
						
		field_attendence();
	
	});

	
	function field_attendence_todays()
	{
		
		$('#date_picker_inline').val('');
		field_attendence();
			
	}
	
	function Add_notes_attendence(user_id,course_id)
	{
		
							$.ajax({	
									url: $('#base_url').val()+"attendence/get_notes_add/",
									type: "GET",
									context: document.body,
									data : "user_id="+user_id+"&course_id="+course_id+"&date="+$('#date_selected').val(),
									cache: false,
									success: function(data){												
											
											$('#notes_add').html(data);
											$("#notes_add_click").fancybox().trigger('click');				
											
										}
								});	
		
	}
	
	function add_notes_final_attendence(user_id,course_id)
	{
						
							var notes = $('#'+user_id+"_"+course_id+"_notes").val();
							var notespublic = $('#'+user_id+"_"+course_id+"_notespublic").val();
							
						
							$.ajax({	
									url: $('#base_url').val()+"attendence/save_notes_add/",
									type: "GET",
									context: document.body,
									data : "user_id="+user_id+"&course_id="+course_id+"&date="+$('#date_used').val()+"&notes="+notes+"&notespublic="+notespublic,
									cache: false,
									success: function(data){												
											
											$('#msg_user')
													.html(
													'<div class="alert alert-success" style="margin-bottom:0px;width:200px;"><button data-dismiss="alert" class="close"></button><strong>Successfully Saved!</strong> </div>');
											$("#global_use_msg").fancybox().trigger('click');
								
											setTimeout(function() {
												$.fancybox.close();
											}, 2000);
											
										}
								});	
			
	}
	
	function field_attendence()
	{
							
								var selected_course = $('#field_courses :selected').val();
								var date_selected = $('#date_picker_inline').val();
								
								if(selected_course==0)
								{
									return false;		
								}
								
								$.ajax({	
									url: $('#base_url').val()+"attendence/get_course_attendence/",
									type: "GET",
									context: document.body,
									data : "course_id="+selected_course+"&date_selected="+date_selected,
									cache: false,
									success: function(data){												
										
											if(data=='bad')
											{	
												$('#attendence_html').html('<span class="error">Grading for this Assignment has been finished<span>');		
											}else if (data=='')
											{
												$('#attendence_html').html('<div class="alert alert-info">No Attendance Found</div>');
											}else
											{
												$('#attendence_html').html(data);
											}
										}
								});	
		
	}
	