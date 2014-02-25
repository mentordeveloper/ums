// JavaScript Document

function sync_facebook()
	{
		
							$.ajax({
								url: $('#base_url').val()+"facebook_connect/check_session_sync/",
								type: "GET",
								context: document.body,
								cache: false,
								success: function(data){												
										
										if(data==1)
										{
											window.location = $('#base_url').val()+"facebook_connect/facebook_events_import/";	
										}else
										{
											 $('#inline_pop').html(data);
											 $("#import_facebook_alert").fancybox().trigger('click');	
											 
											 $('#calendar').html(' ');
																					 
											 refresh_calender_on_call();
										}
									}
							});		
		
	}