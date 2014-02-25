	
	function redirect_course(selected)
	{
		
		window.location  = $("#base_url").val()+'/instructor/additional_course_info/'+selected;
			
	}

	
	function send_notification1()
	{
			
			$('#updating_event_html_overall').show();	
					
			$('#updating_event_html_overall').html(' Saving please wait! <br/>');	
			
						$.ajax({
							url: $('#base_url').val()+"/instructor/save_all_events_database/",
							type: "GET",
							context: document.body,
							cache: false,
							success: function(data){
										
									$('#updating_event_html_overall').html(data);
								
								}
							
							});		
					
	}
	
	function send_notification()
	{
			
			var course = $("#field_courses option:selected").val();
			
			if($('#notification_text').val()=='')
				{
					
				    $('#notification_sended').html('Please provide text!');$('#notification_sended').slideDown('slow', function() { $('#notification_sended').delay(1800).slideUp(2000); });
					
					
				}else{
			
							if(course==0)
							{
								
								//////////////if its 0 then 1 thing is confirm it should display notification
								
								$('<div></div>').appendTo('body')
									.html('<div><h6>Send message to students in all courses?</h6></div>')
									.dialog({
										modal: true, title: 'Sending confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: {
											Yes: function () {
													
												push_call_confirm('all');
				
												$(this).dialog("close");
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
				
									push_call_confirm(course);
				
							}
							
				}
								
		
	}
	
	///send notifcation call start
	
	function push_call_confirm(course)
	{
		
							 $.ajax({
									url: $('#base_url').val()+"/instructor/send_notification/",
									type: "GET",
									data: 'text='+$('#notification_text').val()+'&course='+course,
									context: document.body,
									cache: false,
									success: function(data){
											
											if(data<=1)
											{
												$('#notification_sended').html('Notfication sended to '+data+' student');$('#notification_sended').slideDown('slow', function() { $('#notification_sended').delay(1800).slideUp(2000); });
												
											}else
											{
												$('#notification_sended').html('Notfication sended to '+data+' students');$('#notification_sended').slideDown('slow', function() { $('#notification_sended').delay(1800).slideUp(2000); });
												
											}
										}
									
							   });	
	}
	///send notifcation call end
	
	
	////////working with export things like page export/pdf/doc
	function export_option()
	{
		
		var go_redirect = false;
		
		var value = $("#field_export option:selected").val();
		var course = $("#field_courses option:selected").val();
		
		//if export type is not selected make notice
		if(value=='none')
		{
			
			$('#notification_export').html('Please select export!');$('#notification_export').slideDown('slow', function() { $('#notification_export').delay(1800).slideUp(2000); });
			
			go_redirect = true;
			
		}
		
		//if All is selected show error
		if(course==0)
		{
			
			$('#notification_export').html('Please select course!');$('#notification_export').slideDown('slow', function() { $('#notification_export').delay(1800).slideUp(2000); });
			
			go_redirect = true;
			
		}else
		{
			$('#notification_export').hide();	
		}
		
		if(go_redirect==false)
		{	
			
			if(value=='page')
			{		
				//var url = $('#base_url').val()+"/instructor/view_course_events/"+course;
				//window.open(url,'_blank');
				
			window.open($('#base_url').val()+'/instructor/view_course_events/'+course,'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no, width=800,height=500,left=430,top=23');
			
			
			

			}
			
			if(value=='doc')
			{
				
				 //window.open($('#base_url').val()+"/instructor/view_course_events_in_doc/"+course,'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no, width=500,height=500,left=430,top=23');
				 
				 $("#secretIFrame").attr("src",$('#base_url').val()+'/instructor/view_course_events_in_doc/'+course);
				
				//var url = $('#base_url').val()+"/instructor/view_course_events_in_doc/"+course;
				//window.open(url,'_blank');		
			}
			
			if(value=='pdf')
			{
		 //window.open($('#base_url').val()+"/instructor/view_course_events_in_pdf/"+course,'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no, width=500,height=500,left=430,top=23');
				 
				 $("#secretIFrame").attr("src",$('#base_url').val()+'/instructor/view_course_events_in_pdf/'+course);
				 
				//var url = $('#base_url').val()+"/instructor/view_course_events_in_pdf/"+course;
				//window.open(url,'_blank');		
			}
		}
		
		
	}
	
	function Delete_event(id)
	{
			
			 $.ajax({
								url: $('#base_url').val()+"/instructor/delete_event_this/",
								type: "GET",
								data: 'id='+id,
								context: document.body,
								cache: false,
								success: function(data){
										
										$('#calendar').html('');
										$('#message_show').html('<h2>Event Removed!</h2>');
										clear_records('removed');
										
										
										if(data=='removed')
										{
											
											$('#calendar').fullCalendar({
											events: $('#base_url').val()+"/instructor/save_event_session/",
											theme: true,
											header: {
												left: 'prev,next',
												center: 'title',
												right: 'month,agendaWeek,agendaDay'
											},
											eventClick: function(event) {
											// opens events in a popup window
											$('#updating_event_html_overall').hide();
											show_event(event['id'],'click');	
												
											},
											ignoreTimezone: true,
											selectable: true,
											selectHelper: true,
											
											select: function(start, end, allDay) {
													
												
												///custom code for calendor working
				 $('#updating_event_html_overall').hide();
				 var date_target = new Date(start);

				 var year = parseInt(date_target.getUTCFullYear());
				 var month  = parseInt(date_target.getUTCMonth()+1);
				 var day = parseInt(date_target.getUTCDate());
				
				 if(month<10)
				 {
					month = '0'+month;	 
				 }
				 if(day<10)
				 {
					day = '0'+day;	 
				 }
				 
				 
					 $.ajax({
								url: $('#base_url').val()+"/instructor/load_event_selected_date/",
								type: "GET",
								data: 'year='+year+'&month='+month+'&day='+day,
								context: document.body,
								cache: false,
								success: function(data){
								
										var obj = JSON.parse(data);
										var inn_html = '';
										
										////if all is selected then jus change the title to view then update										
										var course = $("#field_courses option:selected").val();
										
										if(course==0)
										{	///if all is selected
											inn_html = '<h2>Please select event below to view</h2>';
											$("#select_id_cal  option").attr("disabled","disabled");  
											disable_all_fields();
													
										}else
										{	///if other course is selected
											inn_html = '<h2>Please select event below to update</h2>';	
											$("#select_id_cal  option").removeAttr("disabled");  
											enable_all_fields();
										}
										
										
										
										if(obj.length==0)
										{
											
											$('#message_show').html('<h2></h2>');
											$('#message_show').slideUp('slow', function() { });
											var string = year+'-'+month+'-'+day;
											clear_records(string);	
												
										}else
										{
										
										
											for(var k=0;k<obj.length;k++)
											{
											
											if(k==0)
													{
														show_event(obj[k]['ev_id'],'auto');														
													}
													
				inn_html += "<input style='width:100px;' type='button' value='"+obj[k]['ev_event_type']+"' Onclick='show_event("+obj[k]['ev_id']+")' />";			
				
											}		
											
											inn_html +='<br/>';
											
											
											$('#message_show').html(inn_html);
											$('#message_show').slideDown('slow', function() { });
											$('#delete_event_html_overall').show();
											$('#updating_event_html').show();
											
											
											
										}
									
									}
								
						   });		
				 												
										},
										editable: true,
										
									});	
										
											
											
										}else
										{
											
											alert('nothing');
											
										}
									
									}
								
						   });	
		
	}
		
	$(function() {

		
		
		$('#add_another_event').click(function() {
			////////////validations
			
			var html = '';
			
			 	if($('#datepicker2').val()=='')
				{
					html += '*Please select your " Event Date " ! <br/>';
					$('#datepicker2').css('border','1px solid #900');
				}else
				{
					$('#datepicker2').removeAttr('style');
				}
				if($('#location_calender').val()=='')
				{
					html += '*Please enter your " Event Location " ! <br/>';
					$('#location_calender').css('border','1px solid #900');
				}else
				{
					$('#location_calender').removeAttr('style');
				}
				
				///if all day is selected
				
				value = $('#all_day').is(':checked');
				
				if(value==true)
				{
					
						$('#datepicker4').removeAttr('style');
						$('#datepicker6').removeAttr('style');
					
				}
				
				if(value==false){
				
					if($('#datepicker4').val()=='')
					{
						html += '*Please enter your " Event Start date " ! <br/>';
						$('#datepicker4').css('border','1px solid #900');
					}else
					{
						$('#datepicker4').removeAttr('style');
					}
					if($('#datepicker6').val()=='')
					{
						html += '*Please enter your "Event End date " ! <br/>';
						$('#datepicker6').css('border','1px solid #900');
					}else
					{
						$('#datepicker6').removeAttr('style');
					}
					
				}
				
				var str = "";
				
				$("#select_id_cal option:selected").each(function () {
					if($(this).val()=='none')
					{
						html += '*Please Choose your "This Event Type" ! <br/>';
						$('#select_id_cal').css('border','1px solid #900');
						
					}else
					{
						$('#select_id_cal').removeAttr('style');
					}
				});
				
				$("#select_id_cal option:selected").each(function () {
					if($(this).val()=='other')
					{
						if($('#note_other_cal').val()=='')
						{
								html += '*Please Enter Text "This Event Type" ! <br/>';
								$('#note_other_cal').css('border','1px solid #900');
						}else
						{
							$('#note_other_cal').removeAttr('style');
						}					
					}
				});
				
				
				if(html!='') 				{
					
					$('#errors_show').html(html);
					$('#errors_show').slideDown('slow', function() { $('#error_slider_card').delay(1800).slideUp(1300); });
					
					return false;					
				}else
				{
												
						
						var datastring = 'date='+$('#datepicker2').val()+'&location='+$('#location_calender').val()+'&starttime='+$('#datepicker4').val()+'&end_date='+$('#datepicker6').val()+"&type="+$("#select_id_cal option:selected").val()+'&notes='+$('#note_calender').val()+'&course='+$("#field_courses option:selected").val()+'&other_text='+$('#note_other_cal').val();
						
						$.ajax({
							url: $('#base_url').val()+"/instructor/save_event_session/",
							type: "GET",
							data: datastring,
							context: document.body,
							cache: false,
							success: function(data){
							
									$('#calendar').html('');
									$('#message_show').html('<h2> Event added to calender! </h2>');
									$('#message_show').slideDown('slow', function() { });
									
									
									$('#calendar').fullCalendar({
										events: $('#base_url').val()+"/instructor/save_event_session/",
										theme: true,
										header: {
											left: 'prev,next',
											center: 'title',
											right: 'month,agendaWeek,agendaDay'
										},
										eventClick: function(event) {
										// opens events in a popup window
										$('#updating_event_html_overall').hide();
										show_event(event['id'],'click');		
										
										},
										ignoreTimezone: true,
										selectable: true,
										selectHelper: true,
										
										select: function(start, end, allDay) {
												
												
												///custom code for calendor working
				 var date_target = new Date(start);

				 var year = parseInt(date_target.getUTCFullYear());
				 var month  = parseInt(date_target.getUTCMonth()+1);
				 var day = parseInt(date_target.getUTCDate());
				
				 if(month<10)
				 {
					month = '0'+month;	 
				 }
				 if(day<10)
				 {
					day = '0'+day;	 
				 }
				 
				 	$('#updating_event_html_overall').hide();
					 $.ajax({
								url: $('#base_url').val()+"/instructor/load_event_selected_date/",
								type: "GET",
								data: 'year='+year+'&month='+month+'&day='+day,
								context: document.body,
								cache: false,
								success: function(data){
								
										var obj = JSON.parse(data);
										
										var course = $("#field_courses option:selected").val();
										
										var inn_html = '';
										
										if(course==0)
										{	///if all is selected
											inn_html = '<h2>Please select event below to view</h2>';	
											$("#select_id_cal  option").attr("disabled","disabled");  
											disable_all_fields();	
										}else
										{	///if other course is selected
											inn_html = '<h2>Please select event below to update</h2>';	
											$("#select_id_cal  option").removeAttr("disabled");  
											enable_all_fields();
										}
										
										if(obj.length==0)
										{
											
											$('#message_show').html('<h2></h2>');
											$('#message_show').slideUp('slow', function() { });
											var string = year+'-'+month+'-'+day;
											clear_records(string);										
											
												
										}else
										{
										
										
											for(var k=0;k<obj.length;k++)
											{
												
												if(k==0)
													{
														show_event(obj[k]['ev_id'],'auto');														
													}

													
				inn_html += "<input style='width:100px;' type='button' value='"+obj[k]['ev_event_type']+"' Onclick='show_event("+obj[k]['ev_id']+")' />";			
											}		
											
											inn_html +='<br/>';
											
											
											$('#message_show').html(inn_html);
											$('#message_show').slideDown('slow', function() { });
											
											$('#delete_event_html_overall').show();
											$('#updating_event_html').show();
									
										}
									
									}
								
						   });		
				 												
										},
										editable: true,
										
									});	
										
								
							}
							
							});				
					
				}
			
			
			
			//////////////////validations end
			
		});
	
	});
	///////////Add another event functionality ends 
	
	
	
	
	
	function show_event(id,event_done)
	{
		
						$.ajax({
							url: $('#base_url').val()+"/instructor/get_event_by_id/",
							type: "GET",
							data: 'id='+id,
							context: document.body,
							cache: false,
							success: function(data){
							
							var obj = JSON.parse(data);
									
									//////if all is selected show all events in popup 
									if($("#field_courses option:selected").val()==0)
									{
										
										$('#date_event_pop').html(obj[0]['ev_date']);
										$('#locaton_event_pop').html(obj[0]['ev_location']);
										$('#s_time_event_pop').html(obj[0]['ev_start_time']);
										$('#e_time_event_pop').html(obj[0]['ev_end_time']);
										$('#event_type_pop').html(obj[0]['ev_event_type']);
										$('#event_notes_pop').html(obj[0]['ev_notes']);
										
										if(obj[0]['ev_event_type']=='other')
										{
											///replace by the added name
											$('#event_type_pop').html(obj[0]['ev_event_other']);
											
										}
										
										///hide the prevois displayer we dont need it anymore
										$("#viewer").hide();

										$("#city_chooser").fancybox().trigger('click');
												
											
									}else
									{		
									
											//if some course is selected then show in the form below to update
											$('#updating_event_html_overall').hide();
											$('#datepicker2').val(obj[0]['ev_date']);
											$('#location_calender').val(obj[0]['ev_location']);
											
											//for all day check then make checkbox also check
											if(obj[0]['ev_start_time'] =='All day' && obj[0]['ev_end_time']=='All day')
											{
												$('#datepicker4').val(' ');
												$('#datepicker6').val(' ');
												$("#datepicker4").attr("disabled",true);
												$("#datepicker6").attr("disabled",true);		
												$('#all_day').prop('checked', true);
												
											}else
											{
												$('#datepicker4').val(obj[0]['ev_start_time']);
												$('#datepicker6').val(obj[0]['ev_end_time']);	
												$("#datepicker4").attr("disabled",false);
												$("#datepicker6").attr("disabled",false);		
												$('#all_day').prop('checked', false);
											}
											
											$("#select_id_cal option[value='"+obj[0]['ev_event_type']+"']").prop('selected',true);
											
											$('#note_calender').val(obj[0]['ev_notes']);
											
											
											$("#viewer").show();
											
												if(obj[0]['ev_event_type']=='other')
												{										
													$('#note_other_cal').val(obj[0]['ev_event_other']);
													$('.other_show_text_cal').show();		
													
												}else
												{
													$('.other_show_text_cal').hide();			
												}
												
											}
											
											$('#add_another_event').val('Add As New Event');
											
											$('#delete_event_html_overall').html('<input type="button" class="btn" value="Delete this event" Onclick="Delete_event('+obj[0]['ev_id']+');" />');
															
											
											$('#updating_event_html').html('<input type="button" class="btn" value="Update this event" Onclick="Update_event('+obj[0]['ev_id']+');" />');
													
											$('#delete_event_html_overall').show();
											$('#updating_event_html').show();
											
											if(event_done=='click')
											{
												$('#message_show').hide();	
											}
									
								
								}
							
							});		
				
		
	}
	
	function clear_records(date)
	{
				if(date!='removed')
				{
					$('#datepicker2').val(date);
				}else
				{
					$('#datepicker2').val('');
				}
				
				$('#location_calender').val('');
				$('#datepicker4').val('');
				$('#datepicker6').val('');
				$("#select_id_cal option[value='none']").prop('selected',true);
				$('#note_calender').val('');
				$('.other_show_text_cal').hide();
				$('#other_show_text_cal').val('');	
				
				$('#delete_event_html_overall').hide();
				$('#updating_event_html').hide();
				
				if(date!='removed')
				{
					$('#message_show').hide();
				}
				
				$('#updating_event_html_overall').hide();
						
									
	}
	
	
	////////////End display event
	
	function Update_event(id)
	{

		var html = '';
				
			 	if($('#datepicker2').val()=='')
				{
					html += '*Please select your " Event Date " ! <br/>';
					$('#datepicker2').css('border','1px solid #900');
				}else
				{
					$('#datepicker2').removeAttr('style');
				}
				if($('#location_calender').val()=='')
				{
					html += '*Please enter your " Event Location " ! <br/>';
					$('#location_calender').css('border','1px solid #900');
				}else
				{
					$('#location_calender').removeAttr('style');
				}
				
				value = $('#all_day').is(':checked');
				
				if(value==true)
				{
					
						$('#datepicker4').removeAttr('style');
						$('#datepicker6').removeAttr('style');
						
				}
				
				
				if(value==false){
				
					if($('#datepicker4').val()=='')
					{
						html += '*Please enter your " Event Start date " ! <br/>';
						$('#datepicker4').css('border','1px solid #900');
					}else
					{
						$('#datepicker4').removeAttr('style');
					}
					if($('#datepicker6').val()=='')
					{
						html += '*Please enter your "Event End date " ! <br/>';
						$('#datepicker6').css('border','1px solid #900');
					}else
					{
						$('#datepicker6').removeAttr('style');
					}
				
				}
				
				var str = "";
				
				$("#select_id_cal option:selected").each(function () {
					if($(this).val()=='none')
					{
						html += '*Please Choose your "This Event Type" ! <br/>';
						$('#select_id_cal').css('border','1px solid #900');
						
					}else
					{
						$('#select_id_cal').removeAttr('style');
					}
				});
				
				$("#select_id_cal option:selected").each(function () {
					if($(this).val()=='other')
					{
						if($('#note_other_cal').val()=='')
						{
								html += '*Please Enter Text "This Event Type" ! <br/>';
								$('#note_other_cal').css('border','1px solid #900');
						}else
						{
							$('#note_other_cal').removeAttr('style');
						}					
					}
				});
				
				
				if(html!='')
				{
					
					$('#errors_show').html(html);
					$('#errors_show').slideDown('slow', function() { $('#error_slider_card').delay(1800).slideUp(1300); });
					
					return false;					
				}else
				{
						
						var datastring = 'date='+$('#datepicker2').val()+'&location='+$('#location_calender').val()+'&starttime='+$('#datepicker4').val()+'&end_date='+$('#datepicker6').val()+"&type="+$("#select_id_cal option:selected").val()+'&notes='+$('#note_calender').val()+'&id='+id+'&course='+$("#field_courses option:selected").val();
						
						if($('#note_other_cal').val()!='')
						{
						
						datastring +='&other_text='+$('#note_other_cal').val()
							
						}
						
						
						$.ajax({
							url: $('#base_url').val()+"/instructor/update_session_saved/",
							type: "GET",
							data: datastring,
							context: document.body,
							cache: false,
							success: function(data){
							
									$('#calendar').html('');
									$('#message_show').html('<h2> Calender updated! </h2>');
									$('#message_show').slideDown('<h2> Calender updated! </h2>');
									
									
									$('#calendar').fullCalendar({
										events: $('#base_url').val()+"/instructor/save_event_session/",
										theme: true,
										header: {
											left: 'prev,next',
											center: 'title',
											right: 'month,agendaWeek,agendaDay'
										},
										ignoreTimezone: true,
										eventClick: function(event) {
										// opens events in a popup window
										
											$('#updating_event_html_overall').hide();
											show_event(event['id'],'click');
										
										},
										selectable: true,
										selectHelper: true,
										
										select: function(start, end, allDay) {
												
												$('#updating_event_html_overall').hide();
												///custom code for calendor working
												 var date_target = new Date(start);
								
												 var year = parseInt(date_target.getUTCFullYear());
												 var month  = parseInt(date_target.getUTCMonth()+1);
												 var day = parseInt(date_target.getUTCDate());
												
												 if(month<10)
												 {
													month = '0'+month;	 
												 }
												 if(day<10)
												 {
													day = '0'+day;	 
												 }
												 
												 
													 $.ajax({
																url: $('#base_url').val()+"/instructor/load_event_selected_date/",
																type: "GET",
																data: 'year='+year+'&month='+month+'&day='+day,
																context: document.body,
																cache: false,
																success: function(data){
																
																		var obj = JSON.parse(data);
																		
																		var course = $("#field_courses option:selected").val();
																		
																		var inn_html = '';
										
																		if(course==0)
																		{	///if all is selected
																			inn_html = '<h2>Please select event below to view</h2>';
																			$("#select_id_cal  option").attr("disabled","disabled"); 
																			disable_all_fields(); 		
																		}else
																		{	///if other course is selected
																			inn_html = '<h2>Please select event below to update</h2>';	
																			$("#select_id_cal  option").removeAttr("disabled");  
																			enable_all_fields();
																		}
																		
																		if(obj.length==0)
																		{			
																			var string = year+'-'+month+'-'+day;
																			clear_records(string);	
																			
																				$('#message_show').slideUp('slow', function() { });
																				
																		}else
																		{
																		
																			for(var k=0;k<obj.length;k++)
																			{
																					
																					if(k==0)
																						{
																						show_event(obj[k]['ev_id'],'auto');														
																						}

				inn_html += "<input style='width:100px;' class='btn' type='button' value='"+obj[k]['ev_event_type']+"' Onclick='show_event("+obj[k]['ev_id']+")' />";			
				
																			}		
																			
																			inn_html +='<br/>';
																			
																			
																			$('#message_show').html(inn_html);
																			$('#message_show').slideDown('slow', function() { });
																			$('#delete_event_html_overall').show();
																			$('#updating_event_html').show();
																	
																		}
																	
																	}
																
														   });		
																								
																		},
																		editable: true,
																		
																	});	
																		
																
															}
															
															});				
					
				}
			
			
			
			//////////////////validations end
		
			
		
	}
	
	
	//////////end update event code
	
	function disable_all_fields()
	{
		
		$("#select_id_cal  option").attr("disabled",true).addClass('remove_text_box_css');
		$("#datepicker2").attr("disabled",true).addClass('remove_text_box_css');
		$("#location_calender").attr("disabled",true).addClass('remove_text_box_css');
		$("#datepicker4").attr("disabled",true).addClass('remove_text_box_css');
		$("#datepicker6").attr("disabled",true).addClass('remove_text_box_css');
		$("#note_calender").attr("disabled",true).addClass('remove_text_box_css');
		$("#note_other_cal").attr("disabled",true).addClass('remove_text_box_css');
		$("#select_id_cal").hide();
		
		$('#updating_event_html_overall').hide();
				
		
		///extended functonality for event type
		
		
				
		
	}
	
	function enable_all_fields()
	{
		$("#select_id_cal  option").attr("disabled",false).removeClass('remove_text_box_css');
		$("#datepicker2").attr("disabled",false).removeClass('remove_text_box_css');
		$("#location_calender").attr("disabled",false).removeClass('remove_text_box_css');
		$("#datepicker4").attr("disabled",false).removeClass('remove_text_box_css');
		$("#datepicker6").attr("disabled",false).removeClass('remove_text_box_css');
		$("#select_id_cal").attr("disabled",false).removeClass('remove_text_box_css');
		$("#note_calender").attr("disabled",false).removeClass('remove_text_box_css');
		$("#note_other_cal").attr("disabled",false).removeClass('remove_text_box_css');
		$("#select_id_cal").show();
		
		
	}
	
	function Get_event_session()
	{
		
		
						$.ajax({
							url: $('#base_url').val()+"/instructor/save_event_session/",
							type: "GET",
							data: datastring,
							context: document.body,
							cache: false,
							success: function(data){
							
									return data;
								
								}
							
							});		
				
		
	}
	
	$(function() {
			$("#button").click(function(){
				if($(this).val() == "Hide"){
				   $(this).val("Show");
				   $("#center").animate({width: '30%'});
				   $("#right").animate({width: '0px'});
				}
				else{
					$(this).val("Hide");
					$("#center").animate({width: '10%'});
					$("#right").animate({width: '20%'});
				}
			 });	
		});
	
	///////right float div end
	$(function() {
		
		$('#field_courses').change(function() {
				
				clear_records();
				
				//////hide the post sylabuss reponse div
				
				var selected = $("#field_courses option:selected").val();
				
				if(selected=='0')
				{
					$('#select_optional_case').val('');
					$('#field_courses_additional').html('');
					$('#master_method').val('no');	
					
					$("#viewer").hide();
					
					  
				}else
				{
					$("#viewer").show();
					
					enable_all_fields();
					
					$('#view_1_event').show();
					$('#view_2_event').hide();
					
					var selected_name = $("#field_courses option:selected").text();
					
					var makelink = '<input class="btn" type="button" value="'+selected_name+' ADDITIONAL INFO" onclick="redirect_course('+selected+');" />';
					
					$('#field_courses_additional').html(makelink);
				
					$('#master_method').val('yes');	
					$('#write_acccess').css('visibility','visible');	
					$('#write_acccess').show();
					$("#select_id_cal  option").removeAttr("disabled");  
					
				}
				
				if($('#master_method').val()=='no')
				{
					$('#write_acccess').hide();						
				}
				
				 $.ajax({
							url: $('#base_url').val()+"/instructor/load_event_selected_date/",
							type: "GET",
							data: 'selected='+selected,
							context: document.body,
							cache: false,
							success: function(data){
							
									$('#calendar').html(' ');
									$('#calendar').fullCalendar({
										events: $('#base_url').val()+"/instructor/save_event_session/",
										theme: true,
										header: {
											left: 'prev,next',
											center: 'title',
											right: 'month,agendaWeek,agendaDay'
										},
										ignoreTimezone: true,
										selectable: true,
										eventClick: function(event) {
											// opens events in a popup window
											show_event(event['id'],'click');
											
										},
										selectHelper: true,
										
										select: function(start, end, allDay) {
											
											///custom code for calendor working
											 var date_target = new Date(start);
							
											 var year = parseInt(date_target.getUTCFullYear());
											 var month  = parseInt(date_target.getUTCMonth()+1);
											 var day = parseInt(date_target.getUTCDate());
											
											 if(month<10)
											 {
												month = '0'+month;	 
											 }
											 if(day<10)
											 {
												day = '0'+day;	 
											 }
				 
				 
							 $.ajax({
										url: $('#base_url').val()+"/instructor/load_event_selected_date/",
										type: "GET",
										data: 'year='+year+'&month='+month+'&day='+day,
										context: document.body,
										cache: false,
										success: function(data){
										
												var obj = JSON.parse(data);
												
												if(obj.length==0)
													{
														var string = year+'-'+month+'-'+day;
														clear_records(string);
														
														$('#message_show').slideUp('slow', function() { });
														
													
											}else
											{
									
												var inn_html = '';
												
												var course = $("#field_courses option:selected").val();
												
												if(course==0)
												{	///if all is selected
													inn_html = '<h2>Please select event below to view</h2>';	
													$("#select_id_cal  option").attr("disabled","disabled");  	
													disable_all_fields();
												}else
												{	///if other course is selected
													inn_html = '<h2>Please select event below to update</h2>';	
													$("#select_id_cal  option").removeAttr("disabled");  
													enable_all_fields();
												}
																				
												for(var k=0;k<obj.length;k++)
												{
												
													if(k==0)
													{
														show_event(obj[k]['ev_id'],'auto');														
													}
													
					inn_html += "<input style='width:100px;' class='btn' type='button' value='"+obj[k]['ev_event_type']+"' Onclick='show_event("+obj[k]['ev_id']+")' />";
												
															
												}		
												
												inn_html +='<br/>';
												
												$('#message_show').html(inn_html);
												$('#message_show').slideDown('slow', function() { });
												$('#delete_event_html_overall').show();
												$('#updating_event_html').show();
												
										}
								
								}
							
					   });		
				 
				 
				
//				 $('#datepicker2').val(diff_year+'-'+diff_month+'-'+diff_day)
//				 
//				 $('#message_show').slideDown('slow', function() { });
//				 
//				 $('#datepicker2').val();
//				
//					if (title) {
//						calendar.fullCalendar('renderEvent',
//							{
//								title: title,
//								start: start,
//								end: end,
//								allDay: allDay
//							},
//							true // make the event "stick"
//						);
//						
//				}
									},
									editable: true,
									
								});
									
								}
							
					   });	
				
				
		 			  
			});
		
		///////////////here caleder load for this first time
		///////frist of all we need to check that are we have selected some subject or its going with all
		
		var selected = $("#field_courses option:selected").val();
		
		$('#updating_event_html_overall').hide();
		
		//////if all is selected than get all events
	
		///if some course is selected then show that course events
			
			if(selected==0)
			{
				
				$("#select_id_cal  option").attr("disabled","disabled");  
				disable_all_fields();
				
				$("#viewer").hide();
				
			}else
			{
				
				$("#viewer").show();
				
				var selected_name = $("#field_courses option:selected").text();
				var makelink = '<input class="btn" type="button" value="'+selected_name+' ADDITIONAL INFO" onclick="redirect_course('+selected+');" />';
				
				
			$('#field_courses_additional').html(makelink);
			
				$("#select_id_cal  option").removeAttr("disabled");  
				enable_all_fields();
			}
			
			 $.ajax({
							url: $('#base_url').val()+"/instructor/load_event_selected_date/",
							type: "GET",
							data: 'selected='+selected,
							context: document.body,
							cache: false,
							success: function(data){
										
										$('#calendar').fullCalendar({
			
			events: $('#base_url').val()+"/instructor/save_event_session/",
			theme: true,
			header: {
				left: 'prev,next',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
		    ignoreTimezone: true,
			selectable: true,
			eventClick: function(event) {
				// opens events in a popup window
				show_event(event['id'],'click');
				
			},
			selectHelper: true,
			
			select: function(start, end, allDay) {
				
				///custom code for calendor working
				 var date_target = new Date(start);

				 var year = parseInt(date_target.getUTCFullYear());
				 var month  = parseInt(date_target.getUTCMonth()+1);
				 var day = parseInt(date_target.getUTCDate());
				
				 if(month<10)
				 {
					month = '0'+month;	 
				 }
				 if(day<10)
				 {
					day = '0'+day;	 
				 }
				 
				 
				 $.ajax({
							url: $('#base_url').val()+"/instructor/load_event_selected_date/",
							type: "GET",
							data: 'year='+year+'&month='+month+'&day='+day,
							context: document.body,
							cache: false,
							success: function(data){
							
									var obj = JSON.parse(data);
									
									if(obj.length==0)
										{
											var string = year+'-'+month+'-'+day;
											clear_records(string);
											
											$('#message_show').slideUp('slow', function() { });
											
													
										}else
										{
									
												var inn_html = '';
												
												var course = $("#field_courses option:selected").val();
												
												if(course==0)
												{	///if all is selected
													inn_html = '<h2>Please select event below to view</h2>';
													$("#select_id_cal  option").attr("disabled","disabled");  
													disable_all_fields();		
												}else
												{	///if other course is selected
													inn_html = '<h2>Please select event below to update</h2>';	
													$("#select_id_cal  option").removeAttr("disabled");  
													enable_all_fields();
												}
																				
												for(var k=0;k<obj.length;k++)
												{
												
													if(k==0)
													{
														show_event(obj[k]['ev_id'],'auto');														
													}
													
					inn_html += "<input style='width:100px;' class='btn' type='button' value='"+obj[k]['ev_event_type']+"' Onclick='show_event("+obj[k]['ev_id']+")' />";
												
															
												}		
												
												inn_html +='<br/>';
												
												$('#message_show').html(inn_html);
												$('#message_show').slideDown('slow', function() { });
												$('#delete_event_html_overall').show();
												$('#updating_event_html').show();
												
										}
								
								}
							
					   });		
				 
				 
				
//				 $('#datepicker2').val(diff_year+'-'+diff_month+'-'+diff_day)
//				 
//				 $('#message_show').slideDown('slow', function() { });
//				 
//				 $('#datepicker2').val();
//				
//					if (title) {
//						calendar.fullCalendar('renderEvent',
//							{
//								title: title,
//								start: start,
//								end: end,
//								allDay: allDay
//							},
//							true // make the event "stick"
//						);
//						
//				}
			},
			editable: true,
			
		});
										
							}
				 });		
				 
		
			

		
		//url = $('#base_url').val()+"/instructor/save_event_session/";		
		
		

	});
	
	//////////////////end event calender
	$(function() {
		
		$('#datepicker3').timepicker();		
		$('#datepicker5').timepicker();		
		$('#datepicker4').timepicker();		
		$('#datepicker6').timepicker();		
		
	});
	////////form load events
	
	$(function() {
			
			//////checkbox for all day
			
			////if all day is click then this function will trigger
			
				$('#all_day').click(function(){
					
					value = $('#all_day').is(':checked');
					
					if(value==true)
					{
						$("#datepicker4").attr("disabled",true);
						$("#datepicker6").attr("disabled",true);
						
						$("#datepicker4").val(' ');
						$("#datepicker6").val(' ');
							
					}else
					{
						$("#datepicker4").attr("disabled",false);
						$("#datepicker6").attr("disabled",false);
					}
					
				});
			
			/////
			
			$('#form_event').submit(function() {
			
				var html = '';
			
			 	if($('#datepicker1').val()=='')
				{
					html += '*Please select your " Event Date " ! <br/>';
					$('#datepicker1').css('border','1px solid #900');
				}else
				{
					$('#datepicker1').removeAttr('style');
				}
				if($('#location').val()=='')
				{
					html += '*Please enter your " Location " ! <br/>';
					$('#location').css('border','1px solid #900');
				}else
				{
					$('#location').removeAttr('style');
				}
				if($('#datepicker3').val()=='')
				{
					html += '*Please enter your " Start date " ! <br/>';
					$('#datepicker3').css('border','1px solid #900');
				}else
				{
					$('#datepicker3').removeAttr('style');
				}
				if($('#datepicker5').val()=='')
				{
					html += '*Please enter your " End date " ! <br/>';
					$('#datepicker5').css('border','1px solid #900');
				}else
				{
					$('#datepicker5').removeAttr('style');
				}
				var str = "";
				$("#select_id option:selected").each(function () {
					if($(this).val()=='none')
					{
						html += '*Please Choose your " Event Type" ! <br/>';
						$('#select_id').css('border','1px solid #900');
						
					}else
					{
						$('#select_id').removeAttr('style');
					}
				});
				
				$("#select_id option:selected").each(function () {
					if($(this).val()=='other')
					{
						if($('#notes_event_type').val()=='')
						{
								html += '*Please Enter Text "Event Type" ! <br/>';
								$('#notes_event_type').css('border','1px solid #900');
						}else
						{
							$('#notes_event_type').removeAttr('style');
						}					
					}
				});
				
				
				if(html!='')
				{
					$('#errors_show').html(html);
					$('#errors_show').slideDown('slow', function() { $('#error_slider_card').delay(1800).slideUp(1300); });
					return false;					
				}else
				{
					
				return true;
					
				}
				
				
			});
			
	});
	
	
	
		$(function() {
			
			$("#datepicker1").datepicker({dateFormat: "yy-mm-dd"});
			$("#datepicker2").datepicker({dateFormat: "yy-mm-dd"});
		});
	
	function OnCloseWindows(win)
	{
		alert("Any message" );
		return false;
	}
	
	$(function() {
		
		$('#other_show').hide();
		$('#other_show_text').hide();
		$('#other_show_cal').hide();
		$('.other_show_text_cal').hide();
		
		/////window closing alert
		
			
		/////hide the error msg 
		$('#notification_text').click(function(){
			
			$('#notification_sended').hide();
			
		});
		
		$('#other_show_text_cal1').hide();
		////////////for other to show
		$("#select_id").change(function () {
          	var str = "";
            $("#select_id option:selected").each(function () {
                if($(this).val()=='other')
				{
					$('#other_show').show();
					$('#other_show_text').show();
					
				}else
				{					
					$('#other_show').hide();
					$('#other_show_text').hide();
				}
         	});
        })
		
		////////////for other to show for calender
		$("#select_id_cal").change(function () {
          	var str = "";
            $("#select_id_cal option:selected").each(function () {
                if($(this).val()=='other')
				{
					$('.other_show_text_cal').show();
					
				}else
				{					
					$('.other_show_text_cal').hide();
				}
         	});
        })
	
	});
	
	////adding additional hours instructor
	
	//function onload_page_ins()
//	{
//		
//		$('#view_html').html('<span class="success">please wait loading......</span>');
//		
//		$.ajax({
//							url: $('#base_url').val()+"/instructor/save_time_day_ins/",
//							type: "GET",
//							context: document.body,
//							cache: false,
//							success: function(data){
//																						
//									var obj = JSON.parse(data);	
//									var view_html = '<table width="461px" cellpadding=5 class="table-striped border-simple" style="margin-bottom:10px;width:461px !important;">';	
//									
//									view_html += '<tr><th align=left>Weekday</th><th align=left>Start time</th><th align=left>End time</th><th align=left></th></tr>';
//									
//									var marker =  false;
//																
//										for(data in obj)
//										{
//											marker = true;
//											view_html += '<tr id="'+obj[data]['id']+'">';
//											view_html += '<td id="'+obj[data]['id']+'_date" align="left" style="padding-left:6px !important;">'+obj[data]['time']+'</td>';
//											view_html += '<td id="'+obj[data]['id']+'_start" align="left" style="padding-left:6px !important;">'+obj[data]['starttime']+'</td>';
//											view_html += '<td id="'+obj[data]['id']+'_end" align="left" style="padding-left:6px !important;">'+obj[data]['endtime']+'</td>';
//											view_html += '<td id='+obj[data]['id']+' width=170 style="padding-left:6px !important;font-size:10px"><input type=button onclick="update_time('+obj[data]['id']+','+obj[data]['from']+')" / value="Edit" class="btn">  <input type="button" onclick="remove_time('+obj[data]['id']+','+obj[data]['from']+')" class="btn" value="Remove" /> </td>';
//											view_html += '</tr>';
//										}
//									
//									
//									if(marker==false)
//									{									
//										view_html += '<tr><td colspam=3 align="left" style="padding-left:6px !important;">No data found !</td></tr>';	
//									}
//									
//									view_html += '</table>';	
//									
//									$('#view_html').html(view_html);
//									
//								}
//							
//							});		
//		
//			
//	}
	
	///for masking
	$(function() {
	
		   $("#ins_phone").mask("(999) 999-9999");
		
	});
	
	
	
	$(function() {
			
			
			
			var counter = 0;
			
			$('#origional tr').each(function() {
				
				var id1 = counter+'day_picket_ins';
				var id2 = counter+'start_time_ins';
				var id3 = counter+'end_time_ins';
				
				 $("#"+id1).datepicker({dateFormat: "DD"});
					
				 $("#"+id2).AnyTime_picker(
				    { format: "%H:%i", labelTitle: "Start time",
			      	labelHour: "Start time", labelMinute: "Minutes",placement: "popup" } );
					
				  $("#"+id3).AnyTime_picker(
				    { format: "%H:%i", labelTitle: "Start time",
			      	labelHour: "Start time", labelMinute: "Minutes",placement: "popup" } );
			
			counter++;
			
 			});
			
			$('#add_time_now').click(function(){
			
			var id1 = $('#origional tr').length+'start_time_ins';
			var id2 = $('#origional tr').length+'day_picket_ins';
			var id3 = $('#origional tr').length+'end_time_ins';
			
			$('#origional').append('<tr><td valign="top" width="60"><input name="date[]" style="width:150px;" id="'+id1+'" type="text" /></td><td valign="top" width="60"><input name="start_time[]" style="width:100px;" id="'+id2+'" type="text" /></td><td valign="top" width="60"><input name="end_time[]" style="width:100px;" id="'+id3+'"  type="text"  /></td><td valign="top" width="150"><br/></td><input name="action[]" style="width:100px;" type="hidden" value="new"  /><input name="ids[]" style="width:100px;" type="hidden" value="none"  /></tr>');
				
				  $("#"+id1).datepicker({dateFormat: "DD"});
					
				  $("#"+id2).AnyTime_picker(
				    { format: "%H:%i", labelTitle: "Start time",
			      	labelHour: "Start time", labelMinute: "Minutes",placement: "popup" } );
					
				  $("#"+id3).AnyTime_picker(
				    { format: "%H:%i", labelTitle: "Start time",
			      	labelHour: "Start time", labelMinute: "Minutes",placement: "popup" } );
			
			});
				  
				   $("day_picket_ins").datepicker({dateFormat: "DD"});
				 
					
				  $(".start_time_ins").AnyTime_picker(
				    { format: "%H:%i", labelTitle: "Start time",
			      	labelHour: "Start time", labelMinute: "Minutes",placement: "popup" } );
				  
				  $(".end_time_ins").AnyTime_picker(
				    { format: "%H:%i", labelTitle: "End time",
			      	labelHour: "End time", labelMinute: "Minutes" } );
			
					
	});
				
				  
					

function success_add()
{
	$('#error_adding').html('<span class="success">Hours added successfully!</span>');
	$('#error_adding').slideDown('slow', function() { $('#error_adding').delay(1800).slideUp(1300); });
}

function removed_hours()
{
	$('#error_adding').html('<span class="error">Time Removed successfully!</span>');
	$('#error_adding').slideDown('slow', function() { $('#error_adding').delay(1800).slideUp(1300); });
}

function update_add()
{
	$('#error_adding').html('<span class="success">Hours updated successfully!</span>');
	$('#error_adding').slideDown('slow', function() { $('#error_adding').delay(1800).slideUp(1300); });
	
}

function update_final(id,from)
{
	
	var error = false;
				
				if($('#day_picket_ins').val()=='')
				{
					
					$('#error_adding').html('<span class="error">Please choose weekday</span>');
					$('#error_adding').slideDown('slow', function() { $('#error_adding').delay(1800).slideUp(1300); });
					error = true;
					
				}
				
				if($('#start_time_ins').val()=='')
				{
					
					$('#error_adding').html('<span class="error">Please choose start time</span>');
					$('#error_adding').slideDown('slow', function() { $('#error_adding').delay(1800).slideUp(1300); });
					error = true;
				
				}
				
				if($('#end_time_ins').val()=='')
				{
					$('#error_adding').html('<span class="error">Please choose end time</span>');
					$('#error_adding').slideDown('slow', function() { $('#error_adding').delay(1800).slideUp(1300); });
					error = true;
					
				}
				
				///if there is no error then we are good with this
				if(error==false)
				{
					
					$('#view_html').html('<span class="success">please wait loading......</span>');
					
					$.ajax({
							url: $('#base_url').val()+"/instructor/update_this_time/",
							type: "GET",
							data: 'time='+$('#day_picket_ins').val()+'&starttime='+$('#start_time_ins').val()+'&endtime='+$('#end_time_ins').val()+'&id='+id+"&from="+from ,
							context: document.body,
							cache: false,
							success: function(data){
																						
									var obj = JSON.parse(data);	
									var view_html = '<table width="461" cellpadding=5 class="table-striped border-simple" style="margin-bottom:10px;width:461px !important;">';	
									
									view_html += '<tr><th align=left>Weekday</th><th align=left>Start time</th><th align=left>End time</th><th align=left></th></tr>';
																		
										for(data in obj)
										{
											view_html += '<tr id="'+obj[data]['id']+'">';
											view_html += '<td id="'+obj[data]['id']+'_date" align="left" style="padding-left:6px !important;">'+obj[data]['time']+'</td>';
											view_html += '<td id="'+obj[data]['id']+'_start" align="left" style="padding-left:6px !important;">'+obj[data]['starttime']+'</td>';
											view_html += '<td id="'+obj[data]['id']+'_end" align="left" style="padding-left:6px !important;">'+obj[data]['endtime']+'</td>';
											view_html += '<td id='+obj[data]['id']+' width=170 style="padding-left:6px !important;font-size:10px"><input type=button onclick="update_time('+obj[data]['id']+','+obj[data]['from']+')" / value="Edit" class="btn">  <input type="button" onclick="remove_time('+obj[data]['id']+','+obj[data]['from']+')" class="btn" value="Remove" /> </td>';
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

function update_time(id,from)
{

	
	$('#day_picket_ins').val($("#"+id+'_date').html());
	$('#start_time_ins').val($("#"+id+'_start').html());
	$('#end_time_ins').val($("#"+id+'_end').html());
	
	$('#update_func').html('<input type="button" value="Update" onclick="update_final('+id+','+from+')" class="btn" />');
	
}

function clear_fields()
{
	
	$('#day_picket_ins').val('');
	$('#start_time_ins').val('');
	$('#end_time_ins').val('');
		
	
}

function remove_time(id,from)
{
	
	$.ajax({
							url: $('#base_url').val()+"/instructor/remove_event_time_id/",
							type: "GET",
							data: 'id='+id+"&from="+from,
							context: document.body,
							cache: false,
							success: function(data){
																						
									var obj = JSON.parse(data);	
									var view_html = '<table width="461" cellpadding=5 class="table-striped border-simple" style="margin-bottom:10px;width:461px !important;">';	
									
									view_html += '<tr><th align=left>Weekday</th><th align=left>Start time</th><th align=left>End time</th><th align=left></th></tr>';
		
										for(data in obj)
										{
											view_html += '<tr id="'+obj[data]['id']+'">';
											view_html += '<td id="'+obj[data]['id']+'_date" align="left" style="padding-left:6px !important;">'+obj[data]['time']+'</td>';
											view_html += '<td id="'+obj[data]['id']+'_start" align="left" style="padding-left:6px !important;">'+obj[data]['starttime']+'</td>';
											view_html += '<td id="'+obj[data]['id']+'_end" align="left" style="padding-left:6px !important;">'+obj[data]['endtime']+'</td>';
											view_html += '<td id='+obj[data]['id']+' width=170 style="padding-left:6px !important;font-size:10px"><input type=button onclick="update_time('+obj[data]['id']+','+obj[data]['from']+')" value="Edit" class="btn" />  <input type="button" onclick="remove_time('+obj[data]['id']+','+obj[data]['from']+')" class="btn" value="Remove" /> </td>';
											view_html += '</tr>';
										}
									view_html += '</table>';	

									$('#view_html').html(view_html);
									
									removed_hours();
									
								}
							
							});		
	
}
	