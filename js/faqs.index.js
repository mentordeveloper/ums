// JavaScript Document

$(document).ready(function(){
	
		$("a#add_school_qustion").fancybox();	
		
		
});		

							function update_faq(id,row_id)
							{
	
									$.ajax({
											
													url: $('#base_url').val()+"sadmin/update_faq",
													type: "GET",
													context: document.body,
													data : "id="+id+'&row_id='+row_id,
													cache: false,
													success: function(data){												
														
																$('#faqs').html(data);
																$("#added_faqs").fancybox().trigger('click');
																	
														}
														
											});	
							}
function view_faq(id,row_id)
{

		$.ajax({

				url: $('#base_url').val()+"contactsupport/view_faq",
				type: "GET",
				context: document.body,
				data : "id="+id+'&row_id='+row_id,
				cache: false,
				success: function(data){												

					$('#faqs').html(data);
					$("#added_faqs").fancybox().trigger('click');
						
				}

		});	
}
							
							
								function check_name_duplication_faq(name)
								{															
													var data = true;
													
													$('#faq').html('');
													
													if($('#question').val()=='')
													{
														$('#error').html('<span class="error">Please Enter question</span>').slideDown('slow', function() { $('#error_type').delay(1800).slideUp(2000); });
														return false;	
														data = false;
													}
													
													if($('#answer').val()=='')
													{
														$('#error').html('<span class="error">Please Enter answer</span>').slideDown('slow', function() { $('#error_type').delay(1800).slideUp(2000); });
														return false;	
														data = false;
													}
													
													if(data)
													{
														
															   var question =  $('#question').val();
															   var answer   =  $('#answer').val();
															   var status   =  $('#status_faq').is(':checked');
																var cat   =  $('#category_selection').val();
															   $.ajax({
															
																	url: $('#base_url').val()+"sadmin/save_faq",
																	type: "POST",
																	context: document.body,
																	data : { 
																	       question:question,
																		   answer:answer,
																		   status:status,
																		   cat:cat,
																		   }, 
																	cache: false,
																	success: function(data){												
																		
																			if(data=='false')
																			{
																				$('#course').html('<span class="error" style="padding:20px;">Some problem saving record please try again!</span>');
																				return false;	
																			}
																			else
																			{
																				
																				$('#faqs').html('																			<div class="notification msgsuccess"><p>Record Saved!</p></div>');
																				$("#added_faqs").fancybox().trigger('click');
																				
																				$('#html_ajax').html(data);
																				
																				jQuery('#dyntable').dataTable( {"bDestroy": true,"sPaginationType": "full_numbers"} );
																				setTimeout(function() {
																					$.fancybox.close();
    																			}, 1300);
																				
																		}
																			
																	}
								
															});		
										}
								
}


function update_faqs_call()
{

											
											var data = true;
											$('#faq').html('');
											
													   var question = $('#question').val();
													   var answer   = $('#answer').val();
													   var status   = $('#status_faq').is(':checked');
													   var cat   =  $('#category_selection').val();
													   var id       = $('#id_update').val();
													   var row      = $('#id_row').val();
											
											$.ajax({
											
													url: $('#base_url').val()+"sadmin/update_faq_go",
													type: "POST",
													context: document.body,
													data : { 
															   question:question,
															   answer:answer,
															   status:status,
															   cat:cat,
															   id:id,
															   row:row
															   },
													cache: false,
													success: function(data){												
														
															if(data=='false')
															{
																$('#course').html('<span class="error" style="padding:20px;">Some problem saving record please try again!</span>');
																return false;	
															}
															else
															{
																
																$('#faqs').html('<div class="notification msgsuccess"><p>Record Updated!</p></div>');
																$("#added_faqs").fancybox().trigger('click');
																
																$('#row_'+id).html(data);
																
																setTimeout(function() {
																	$.fancybox.close();
    															}, 1300);
																
															}
															
													}
													
											});			
}


function remove_faq(id)
{		
								
								$('<div></div>').appendTo('body')
									.html('<div><h5>Delete FAQ ?</h5></div>')
									.dialog({
										modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: [{
											text: 'Delete',
											click: function() {
												push_call_confirm_faq(id);	
												$( this ).remove();
											}
										},
										{
											text: "Cancel",
											click: function() {
												$( this ).remove();
											}
										}
										],
										close: function (event, ui) {
											$(this).remove();
										}
									});
								
								
}

function remove_cat(id,name)
{

	$('<div></div>').appendTo('body')
									.html('<div><h5>Delete '+ name+'?</h5></div>')
									.dialog({
										modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: [{
											text: 'Delete',
											click: function() {
												push_call_confirm_cat(id);	
												$( this ).remove();
											}
										},
										{
											text: "Cancel",
											click: function() {
												$( this ).remove();
											}
										}
										],
										close: function (event, ui) {
											$(this).remove();
										}
									});

}


function push_call_confirm_faq(id)
{
	
											$.ajax({
											
													url: $('#base_url').val()+"sadmin/remove_faq",
													type: "GET",
													context: document.body,
													data : "remove_faq="+id,
													cache: false,
													success: function(data){
															
															$('#row_'+id).remove();
															
															$('.content').prepend('<div class="notification msgsuccess"><a class="close"></a><p>Removed Successfully!</p></div><br/>');
															$('.msgsuccess').slideUp(4000);
													}
														
											});	
		
}


function push_call_confirm_cat(id)
{
	
											$.ajax({
											
													url: $('#base_url').val()+"sadmin/remove_cat",
													type: "GET",
													context: document.body,
													data : "remove_cat="+id,
													cache: false,
													success: function(data){
															
															$('#row_'+id).remove();
															
															$('.content_cat').prepend('<div class="notification msgsuccess"><a class="close"></a><p>Removed Successfully!</p></div><br/>');
															$('.msgsuccess').slideUp(4000);
													}
														
											});	
		
}

function add_faq_call()
{
		
	var check = check_name_duplication_faq($('#course_name').val());	
		
}// JavaScript Document