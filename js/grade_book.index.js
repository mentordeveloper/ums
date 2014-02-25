
$(document).ready(function(){
						
		$('#field_courses').change(function() {
			
				field_grade_book();			
		});
						
		field_grade_book(); 
	
});

function field_grade_book()
{
						
						var course = $("#field_courses option:selected").val();
						
						if(course=='0'){
							$('#graded_html').html('<div class="alert alert-info">No Grades Found</div>');
							return false;	
						}
						
						$.ajax({
							url: $('#base_url').val()+"grade_book/render_selection_course/",
							type: "GET",
							data:"course_id="+course,
							context: document.body,
							cache: false,
							success: function(data){
									
									if(data==''){
										$('#graded_html').html('<div class="alert alert-info">No Grades Found</div>');
									}else{
										$('#graded_html').html(data);
									}
									
								}
							
							});	
							
						return false;
}


function Function_modify(user_id,event_id)
{
	
	var value = $('#'+user_id+'_'+event_id+'_val').val();
	var value2 = $('#'+user_id+'_'+event_id+'_marks_per_assign').val();
	
	var html_mine = '<input type="hidden"  id="'+user_id+'_'+event_id+'_marks_per_assign" value="'+value2+'"><input style="width:20px" onkeyup=save_ajax_grade_new('+user_id+','+event_id+') type="text" id="'+user_id+'_'+event_id+'_newgrade" value="'+value+'"><img onclick="open_notes_user_popup('+user_id+','+event_id+')" style="height:25px;width:25px;cursor:pointer;" src="'+$('#base_url').val()+'/files/icons/1356592423_gtk-edit.png" />';
	
	$('#'+user_id+'_'+event_id).html(html_mine);
		
}

function add_notes_final(user_id,event_id)
{
	
	var notes_added = $('#'+user_id+'_'+event_id+"_notes").val();
	var private_notes = $('#'+user_id+'_'+event_id+"_privatenotes").val();
	
					$.ajax({
							url: $('#base_url').val()+"grade_book/save_comments_add/",
							type: "GET",
							data:"user_id="+user_id+"&event_id="+event_id+"&notes="+notes_added+"&priv_notes="+private_notes,
							context: document.body,
							cache: false,
							success: function(data){
									if(data==0){
											
											$('#msg_user')
													.html(
													'<div class="alert alert-info" style="margin-bottom:0px;width:200px;"><button data-dismiss="alert" class="close"></button><strong>Please Assign grades first!</strong> </div>');
											$("#global_use_msg").fancybox().trigger('click');
								
											setTimeout(function() {
												$.fancybox.close();
											}, 2000);
											
									}
									
									if(data ==1){
											
											$('#msg_user')
													.html(
													'<div class="alert alert-success" style="margin-bottom:0px;width:200px;"><button data-dismiss="alert" class="close"></button><strong>Saved Successfully!</strong> </div>');
											$("#global_use_msg").fancybox().trigger('click');
								
											setTimeout(function() {
												$.fancybox.close();
											}, 2000);
											
									}
								
								}
					});	
	
		
}

function open_notes_user_popup(user_id,event_id)
{
	
							$.ajax({
							url: $('#base_url').val()+"grade_book/get_comments_add/",
							type: "GET",
							data:"user_id="+user_id+"&event_id="+event_id,
							context: document.body,
							cache: false,
							success: function(data){
									
									$('#notes_add').html(data);
									$("#notes_add_click").fancybox().trigger('click');	
								
								}
							
							});	
}

function open_notes_student_popup(user_id,event_id)
{
	
							$.ajax({
							url: $('#base_url').val()+"grade_book/get_student_notes/",
							type: "GET",
							data:"user_id="+user_id+"&event_id="+event_id,
							context: document.body,
							cache: false,
							success: function(data){
									
									$('#notes_add').html(data);
									$("#notes_add_click").fancybox().trigger('click');	
								
								}
							
							});	
}

function save_ajax_grade_new(user_id,event_id)
{
	
							var value = $('#'+user_id+'_'+event_id+'_newgrade').val();
							var value2 = $('#'+user_id+'_'+event_id+'_marks_per_assign').val();
							
							if(value=='')
							{
								alert('Please Assign Grade');
								return false;
							}
							
							if (parseInt(value) > parseInt(value2))
							{
								alert('Obtained marks cant be greater than total marks!');
												
								field_grade_book();
								return false;
							}
							
							$.ajax({	
									url: $('#base_url').val()+"assignment/assign_grade/",
									type: "GET",
									context: document.body,
									data : "id="+event_id+"&graded_marks="+value+"&user_id="+user_id,
									cache: false,
									success: function(data){												
											
											if(data=='bad')
											{					
												alert('Some error while update try again!');
											}else
											{
												
											}
											
										}
								});	
	
	
}