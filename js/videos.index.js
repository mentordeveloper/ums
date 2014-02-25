// JavaScript Document

$(document).ready(function(){
	
		$("a#add_video").fancybox();	
			
});		

function update_video(id,row_id)
{
	
									$.ajax({
											
													url: $('#base_url').val()+"sadmin/update_video",
													type: "GET",
													context: document.body,
													data : "id="+id+'&row_id='+row_id,
													cache: false,
													success: function(data){												
														
																$('#video_man').html(data);
																$("#added_video").fancybox().trigger('click');
																
																
																	
														}
														
											});	
	
		
}

function add_video_call()
{
	
														
												
															$.ajax({
															
																	url: $('#base_url').val()+"sadmin/save_video",
																	type: "GET",
																	context: document.body,
																	data : "text="+$('#text').val()+"&status="+$('#status_video').is(':checked')+"&video="+$('#video').val(),
																	cache: false,
																	success: function(data){												
																		
																			if(data=='false')
																			{
																				$('#course').html('<span class="error" style="padding:20px;">Some problem saving record please try again!</span>');
																				return false;	
																			}
																			else
																			{
																				
																				$('#video_man').html('<div class="notification msgsuccess"></a><p>Record Saved!</p></div>');
																				$("#added_video").fancybox().trigger('click');
																				
																				$('#html_ajax').html(data);
																				
																				 setTimeout(function() {
																					$.fancybox.close();
																				  }, 1300);
																				  
																				  jQuery('#dyntable').dataTable( {"bDestroy": true,"sPaginationType": "full_numbers"} );
																				
																			}
																			
																	}
															});	
															
														
}


function update_video_call()
{										

											 var text     =  $('#text').val();
										     var status   =  $('#status_video').is(':checked');
											 var video    =  $('#video').val();
											 var id       =  $('#id_update').val();
											 var row      =  $('#id_row').val();
	
											$.ajax({
											
													url: $('#base_url').val()+"sadmin/update_video_go",
													type: "POST",
													context: document.body,
													data : { 
																	       text:text,
																		   status:status,
																		   video:video,
																		   id:id,
																		   row:row,
														   }, 
													cache: false,
													success: function(data){												
														
															if(data=='false')
															{
																$('#video_man').html('<span class="error" style="padding:20px;">Some problem saving record please try again!</span>');
																return false;	
															}
															else
															{
																
																$('#video_man').html('');
																
																$('#video_man').html('<div class="notification msgsuccess"><p>Record Updated!</p></div>');
																$("#added_video").fancybox().trigger('click');
																
																$('#row_'+id).html(data);
																
																 setTimeout(function() {
																			$.fancybox.close();
																		  }, 1300);
																
															}
															
														}
														
											});	
															
											
}


function remove_video(id)
{		

								$('<div></div>').appendTo('body')
									.html('<div><h5>Delete Video ?</h5></div>')
									.dialog({
										modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: [{
											text: 'Delete',
											click: function() {
												push_call_confirm_video(id);
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


function push_call_confirm_video(id)
{
		
											$.ajax({
											
													url: $('#base_url').val()+"sadmin/remove_video",
													type: "GET",
													context: document.body,
													data : "remove_video="+id,
													cache: false,
													success: function(data){												
															
															$('.content').prepend('<div class="notification msgsuccess"><a class="close"></a><p>Removed Successfully!</p></div><br/>');
															$('.msgsuccess').slideUp(4000);
															
															$('#row_'+id).remove();
															
													}
														
											});	
		
}
