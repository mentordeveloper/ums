
	$("body").on({
			ajaxStart: function() { 
				$(this).addClass("loading"); 
			},
			ajaxStop: function() { 
				$(this).removeClass("loading"); 
			}    
	});
	
	function color_picker()
	{
		
							$.ajax({	
									url: $('#base_url').val()+"/instructor/color_picker/",
									type: "GET",
									context: document.body,
									cache: false,
									success: function(data){												
											
											$('#list_pop_types').html(data);
											$("#events_type_list").fancybox().trigger('click');
										}
								});	
			
	}
	
	function remove_picture_this_user(what)
	{
		
							$.ajax({	
									url: $('#base_url').val()+"/instructor/remove_profile_pic/",
									type: "GET",
									context: document.body,
									data : "what="+what,
									cache: false,
									success: function(data){												
											
											if(data)
											{					
												$('#ins_image').hide();
												$('#ins_remove').hide();
											}
										}
								});	
			
	}
	
	function check_prevoius_color()
	{
							
							$('#update_color_mine').attr('disabled',true);
							$('#btn_save').attr('disabled',true);
							
							
							var selected_course = $("#field_courses_color option:selected").val();
		
							////send ajax call and end this
							$.ajax({	
									url: $('#base_url').val()+"/instructor/get_color_custom_user/",
									type: "GET",
									context: document.body,
									data : "course_seleted="+selected_course,
									cache: false,
									success: function(data){												
											
											if(data!='')
											{					
												
												$('#update_color_mine').attr('disabled',false);
												$('#btn_save').attr('disabled',false);
												
												$('.error').html('<span class="success">Prevoius color fouded!</span>');		
												$('#btn_save').hide();
												$('#btn_update').show();
												
											}else
											{												
												$('#btn_save').show();
												$('#btn_update').hide();		
												
												$('#update_color_mine').attr('disabled',false);
												$('#btn_save').attr('disabled',false);
											}
										}
								});	
		
	}
	
	
	function update_color_mine()
	{
		
		var selected_course = $("#field_courses_color option:selected").val();
		
		if(selected_course==0)
		{
			$('.error').html('Please select your course!');$('#error_type').slideDown('slow', function() { $('#error_type').delay(1800).slideUp(2000); });
			return;
		}
		
		var string = $("#color").val();
		
							////send ajax call and end this
							$.ajax({	
									url: $('#base_url').val()+"/instructor/update_color_custom_user/",
									type: "GET",
									context: document.body,
									data : "course_seleted="+$("#field_courses_color option:selected").val()+"&color="+string.replace('#',''),
									cache: false,
									success: function(data){												
											
											if(data)
											{
												
											$('.error').html('<span class="success">Color update successfully!</span>');$('#error_type').slideDown('slow', function() { $('#error_type').delay(1800).slideUp(2000); });
											
											
												////send ajax call and end this
													$.ajax({	
															url: $('#base_url').val()+"/instructor/get_colors_html_jst/",
															type: "GET",
															context: document.body,
															cache: false,
															success: function(data){												
															
																	refresh_calender_on_call();
																	$('#show_colors_now').html(data);
																	
																}
														});	
											
											}else
											{
													$('.error').html('Some problem while updating  please try again');$('#error_type').slideDown('slow', function() { $('#error_type').delay(1800).slideUp(2000); });
											
												
											}
											
							
										}
								});	
			
	}
	
	function save_color_mine()
	{
		
		var selected_course = $("#field_courses_color option:selected").val();
		
		if(selected_course==0)
		{
			$('.error').html('Please select your course!');$('#error_type').slideDown('slow', function() { $('#error_type').delay(1800).slideUp(2000); });
			return;
		}
		
		var string = $("#color").val();
		
							////send ajax call and end this
							$.ajax({	
									url: $('#base_url').val()+"/instructor/save_color_custom_user/",
									type: "GET",
									context: document.body,
									data : "course_seleted="+$("#field_courses_color option:selected").val()+"&color="+string.replace('#',''),
									cache: false,
									success: function(data){												
											
											
											if(data)
											{
												
											$('.error').html('<span class="success">Color Saved successfully!</span>');$('#error_type').slideDown('slow', function() { $('#error_type').delay(1800).slideUp(2000); });
											
												////send ajax call and end this
													$.ajax({	
															url: $('#base_url').val()+"/instructor/get_colors_html_jst/",
															type: "GET",
															context: document.body,
															cache: false,
															success: function(data){												
															
																	refresh_calender_on_call();
																	$('#show_colors_now').html(data);
																	
																}
														});	
			
												
											
											
											}else
											{
													$('.error').html('Some problem while updating  please try again');$('#error_type').slideDown('slow', function() { $('#error_type').delay(1800).slideUp(2000); });
											
												
												
												
											}
							
										}
								});	
			
			
			
	}
	
	function change_view_add()
	{
		
		
							$.ajax({
									url: $('#base_url').val()+"/instructor/view_event_structure/",
									type: "GET",
									context: document.body,
									cache: false,
									success: function(data){												
											
											$('#list_pop_types').html(data);
											$("#events_type_list").fancybox().trigger('click');
											
							
										}
								});		
		
		
			
	}
	
	
	
	
	
	function selector_event(){
			
			$('.custom_options_id').remove();
			$('.custom_options_id_not').remove();
							//for generic information
							
							if($('#select_id_cal :selected').text()=='Assignment')
							{
								$('.canremove').hide();	
							}else{
									
								$.ajax({
										url: $('#base_url').val()+"/instructor/get_custom_html_event_generic/",
										type: "GET",
										data:"get="+$('#select_id_cal :selected').val(),
										context: document.body,
										cache: false,
										success: function(data){												
												
												var obj = JSON.parse(data);
												
												if(obj.length==1)
												{
													$('#location_calender').val(obj[0]['location']);
													$('#datepicker4').val(obj[0]['start_time']);
													$('#datepicker6').val(obj[0]['end_time']);
													$('#note_calender').val(obj[0]['notes']);		
												}
											}
									});	
							}
							
							///for custom information
							$.ajax({
									url: $('#base_url').val()+"/instructor/get_custom_html_event/",
									type: "GET",
									data:"get="+$('#select_id_cal :selected').val(),
									context: document.body,
									cache: false,
									success: function(data){												
											
											$('#viewer').append(data);
																		
										}
								});		
					
	}
	
	
	function generate_html_custom(obj,view)
	{
		
				$('.custom_options_id').remove();
				$('.custom_options_id_not').remove();
				
								$.ajax({
									url: $('#base_url').val()+"/instructor/get_custom_html_event_data/",
									type: "GET",
									data: "fields="+obj[0]['ev_custom_fields']+"&data="+obj[0]['ev_custom_data']+"&view="+view+"&ev_id="+obj[0]['ev_id'],
									context: document.body,
									cache: false,
									success: function(data){												
											if(view=='view')
											{
												$('#event_display').append(data);
											}else
											{
												$('#viewer').append(data);
											}
							
										}
								});		
		
	}
	
	function update_event_type_ajax(id,form)
	{
			$('#btn_update_action').attr('disabled',true);		
			fileUpload(form,$('#base_url').val()+"/instructor/upload_and_session/",'upload1');
			//update_event_type_ajax1(id,form);
			
			checkFrame();
			
			var test = false;
			
			setTimeout(function()
			{
				test = checkFrame();
				
				if(!test)
				{	
				
					$('#error_type').html('Saving please wait ....');
					check_status_again_upload(id,form);
				}
				if(test)
				{
					update_event_type_ajax1(id,form);	
				}
				
				
			}, 2000);
			
			
	}
	
	function check_status_again_upload(form,this_ne)
	{
		
		var test=false;
		
		setTimeout(function()
			{
				test = checkFrame();
				
				if(!test)
				{
					check_status_again_upload(form,this_ne);	
				}
				if(test)
				{
					///if iframe is uploaded and done
					$('#error_type').html('Completed!');
					
					update_event_type_ajax1(form,this_ne);	
				}
				
			}, 2000);	
		
	}
	
	function update_event_type_ajax1(id,form)
	{
				
		var error = '';
		var mydata = new Array();
		var customdata = new Array();
		var counter = 0;
		var counter1 = 0;
		var types = new Array();
		var uploads = new Array();
		var upload_counter = 0;
		var founded_files = 0;
		
		
		
		$('#event_typer_add').find(':input').each(function(){
			
			var pass = true;
			
			if($(this).attr('id')=='type_name')
			{ pass=false;	if($(this).val()==''){	error += 'Please enter event type name! <br/>'; }else{  mydata[counter1]=$(this).val(); }	}
			
			if($(this).attr('id')=='type_location')
			{ pass=false;	if($(this).val()==''){	error += 'Please enter event location name! <br/>'; }else{ mydata[counter1]=$(this).val(); }}
			
			if($(this).attr('id')=='type_name_starttime')
			{ pass=false;	if($(this).val()==''){	error += 'Please select event start time! <br/>'; }else{ mydata[counter1]=$(this).val(); }	}
			
			if($(this).attr('id')=='type_name_endtime')
			{ pass=false;	if($(this).val()==''){	error += 'Please select event end time! <br/>'; }else{ mydata[counter1]=$(this).val(); }	}
			
			if($(this).attr('id')=='notes_values')
			{ pass=false;	if($(this).val()==''){	error += 'Please enter notes end time! <br/>'; }else{ mydata[counter1]=$(this).val(); }	}
			
			if(pass)
			{	
				if($(this).val()!='')
				{
					customdata[counter] = $(this).val();		
				}
				
				if($(this).val()=='' && $(this).attr('type')!='file')
				{
					error += 'Please enter custom missing field #'+counter+' ! <br/>';
				}
				
				if($(this).val()=='')
				{
					customdata[counter] = null;		
				}
				
				counter++;
			}
			

			
			if($(this).attr('type')=='file')
			{
				
				if($(this).val()=='')
				{
					
					uploads[upload_counter] = $('#dataholder'+upload_counter).html();
					
				}else
				{

					uploads[upload_counter] = 'upload';
					founded_files++;
				}
				
				upload_counter++;		
					
			}
			
			counter1++;
		});
		
		var typecounter = 0;
		
		$('#event_typer_add').find(':input').each(function(){
				
			///only giving null for textarea now
			if($(this).attr('type')===undefined)
			{  
				types[typecounter]= 'textarea'; 
			}else{
				
				//to get date time picker type just add class on the other hand
				if($(this).attr('class')=='date_picker hasDatepicker')
				{
					types[typecounter]='date_picker'; 			
				}  //to get time picker type just add class on the other hand
				else if($(this).attr('class')=='time_picker hasDatepicker')
				{
					types[typecounter]='time_picker'; 
				}else
				{
					types[typecounter]=$(this).attr('type'); 
				}
			}
			
			typecounter++;
			
		});
		
		
		if(error!='')
		{
			$('#error_type').html(error);$('#error_type').slideDown('slow', function() { $('#error_type').delay(1800).slideUp(2000); });
			$('#btn_update_action').attr('disabled',false);		
			return false;
		}
		
		if(error=='')
		{
			
			var myJsonString1 = JSON.stringify(mydata);
			
			var myJsonString2 = JSON.stringify(customdata);
			
			var myJsonString3 = JSON.stringify(types);
			
			var myJsonString4 = JSON.stringify(uploads);
			
			
			
				
				$.ajax({
									url: $('#base_url').val()+"/instructor/update_custom_event_type/",
									type: "GET",
									data:"defined="+myJsonString1+"&custom="+myJsonString2+"&id="+id+"&types="+myJsonString3+"&up="+myJsonString4,
									context: document.body,
									cache: false,
									success: function(data){												
											
											if(data=='updated')
											{
												$('#error_type').html('Record updated Successfully!');$('#error_type').slideDown('slow', function() { $('#error_type').delay(1800).slideUp(2000); });
												
												view_all_types();	
												$('#btn_update_action').attr('disabled',false);					
											}
							
										}
								});	
				
		
			
								
			
		}
		
			
	}

	
	function reload_and_make_select_area()
	{
		
		$.ajax({
									url: $('#base_url').val()+"/instructor/creat_generat_new_update_form/",
									type: "GET",
									context: document.body,
									cache: false,
									success: function(data){												
											$('#view_1_event').html(data);
										}
								});	
	}
	
	function myTimer()
	{
		
			
	}
	
	
	function save_event_type_ajax(form,this_ne)
	{
			
			$('#btn_save_action').attr('disabled',true);
			
			fileUpload(form,$('#base_url').val()+"/instructor/upload_and_session/",'upload1');
			
			checkFrame();
			
			var test = false;
			
			setTimeout(function()
			{
				test = checkFrame();
				
				if(!test)
				{	
				
					$('#error_type').html('Saving please wait ....');
					check_status_again(form,this_ne);
				}
				if(test)
				{
					save_event_type_ajax1(form,this_ne);	
				}
				
				
			}, 2000);
			
	}
	
	function check_status_again(form,this_ne)
	{
		
		var test=false;
		
		setTimeout(function()
			{
				test = checkFrame();
				
				if(!test)
				{
					check_status_again(form,this_ne);	
				}
				if(test)
				{
					///if iframe is uploaded and done
					$('#error_type').html('Completed!');
					save_event_type_ajax1(form,this_ne);	
				}
				
			}, 2000);	
		
	}
	
	function save_event_type_ajax1(form,this_ne)
	{
		
		///doing file uploding using ajax iframe 
		
		var error = '';
		var mydata = new Array();
		var customdata = new Array();
		var types = new Array();
		var counter = 0;
		var counter1 = 0;
		var foundedfiles = 0;
		
		$('#event_typer_add').find(':input').each(function(){
			
			
			
			var pass = true;
			
			if($(this).attr('id')=='type_name')
			{ pass=false;	if($(this).val()==''){	error += 'Please enter event type name! <br/>'; }else{  mydata[counter1]=$(this).val(); }	}
			
			if($(this).attr('id')=='type_location')
			{ pass=false;	if($(this).val()==''){	error += 'Please enter event location name! <br/>'; }else{ mydata[counter1]=$(this).val(); }}
			
			if($(this).attr('id')=='type_name_starttime')
			{ pass=false;	if($(this).val()==''){	error += 'Please select event start time! <br/>'; }else{ mydata[counter1]=$(this).val(); }	}
			
			if($(this).attr('id')=='type_name_endtime')
			{ pass=false;	if($(this).val()==''){	error += 'Please select event end time! <br/>'; }else{ mydata[counter1]=$(this).val(); }	}
			
			if($(this).attr('id')=='notes_values')
			{ pass=false;	if($(this).val()==''){	error += 'Please enter notes end time! <br/>'; }else{ mydata[counter1]=$(this).val(); }	}
			
			if(pass)
			{	
				if($(this).val()!='')
				{
					customdata[counter] = $(this).val();		
				}
				
				if($(this).val()=='')
				{
					error += 'Please enter custom missing field #'+counter+' ! <br/>';
				}
				counter++;
			}
			
			counter1++;
			
			if($(this).attr('type')=='file')
			{
				
				foundedfiles++;		
					
			}
			
		});
		
		var typecounter = 0;
		
		$('#event_typer_add').find(':input').each(function(){
				
			///only giving null for textarea now
			if($(this).attr('type')===undefined)
			{  
				types[typecounter]= 'textarea';
				 
			}else{
				
				//to get date time picker type just add class on the other hand
				if($(this).attr('class')=='date_picker hasDatepicker')
				{
					types[typecounter]='date_picker'; 			
				}  //to get time picker type just add class on the other hand
				else if($(this).attr('class')=='time_picker hasDatepicker')
				{
					types[typecounter]='time_picker'; 
				}else
				{
					types[typecounter]=$(this).attr('type'); 
				}
			}
			
			typecounter++;
			
		});
		
		
		if(error!='')
		{
			$('#error_type').html(error);$('#error_type').slideDown('slow', function() { $('#error_type').delay(1800).slideUp(2000); });
			$('#btn_save_action').attr('disabled',false);
			return false;
		}
		
		if(error=='')
		{
			////go for upload with files and store them
			//var return_check = fileUpload(form,$('#base_url').val()+"/instructor/upload_and_session/",'upload',foundedfiles);
			
			var myJsonString1 = JSON.stringify(mydata);
			
			var myJsonString2 = JSON.stringify(customdata);
			
			var myJsonString3 = JSON.stringify(types);
			
		
			
				$.ajax({
									url: $('#base_url').val()+"/instructor/get_custom_event_type/",
									type: "GET",
									data:"defined="+myJsonString1+"&custom="+myJsonString2+"&types="+myJsonString3,
									context: document.body,
									cache: false,
									success: function(data){												
											
											if(data=='duplicate')
											{
												
												$('#error_type').html('Event type name already exist');$('#error_type').slideDown('slow', function() { $('#error_type').delay(1800).slideUp(2000); });
													
												$('#btn_save_action').attr('disabled',false);
												
											}
											
											if(data=='saved')
											{
												$('#btn_save_action').attr('disabled',false);
												reload_and_make_select_area();
												view_all_types();								
												
											}
							
										}
								});	
					
				}
		}
	
   function checkFrame() {
	   
       	var iframe = document.getElementById("upload_iframe");

        if(iframe == null) return true;
        else {
            if(iframe.document == null)
                return false;
            else
                return true;
        }
    }


	function fileUpload(form, action_url, div_id,sended_files) {
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
			var eventHandler = function () {
		 
					if (iframeId.detachEvent) iframeId.detachEvent("onload", eventHandler);
					else iframeId.removeEventListener("load", eventHandler, false);
		 
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
		 
			if (iframeId.addEventListener) iframeId.addEventListener("load", eventHandler, true);
			if (iframeId.attachEvent) iframeId.attachEvent("onload", eventHandler);
		 
			// Set properties of form...
			form.setAttribute("target", "upload_iframe");
			form.setAttribute("action", action_url);
			form.setAttribute("method", "post");
			form.setAttribute("enctype", "multipart/form-data");
			form.setAttribute("encoding", "multipart/form-data");
		 
			// Submit the form...
			form.submit();

			return true;
			
			//timmer_call(sended_files);
					
			
			
	}
	
	function timmer_call(sended_files)
	{
		
			alert(sended_files);
			
			var myVar=setInterval(function(){call_check_ajax(sended_files)},2000);
			 
			if(myVar)
			{
				clearInterval(myVar);
				return true;	
			}
		
	}
	
	function call_check_ajax(sended_files)
	{
		
		$.ajax({
							url: $('#base_url').val()+"/instructor/check_uploads/",
							type: "GET",
							context: document.body,
							cache: false,
							success: function(data){												
										
									if(data=='done')
									{
										return true;	
									}
									if(data==sended_files)
									{
										return true;
									}else
									{
										timmer_call(sended_files);
									}
									
								}
							
						});		
		
	}
	
	function update_type(id)
	{
		
		$.ajax({
							url: $('#base_url').val()+"/instructor/update_user_type/",
							type: "GET",
							data: "id="+id,
							context: document.body,
							cache: false,
							success: function(data){												
										
									$('#list_pop_types').html(data);
									$("#events_type_list").fancybox().trigger('click');
									
								}
							
							});	
			
	}
	
	function remove_type(id)
	{
		
			$.ajax({
							url: $('#base_url').val()+"/instructor/remove_type_user/",
							type: "GET",
							data: "id="+id,
							context: document.body,
							cache: false,
							success: function(data){												
										
									if(data=='removed')
									{
										 $('#rowtype_'+id).remove();											 
										 $('#error_type').html('Event type Removed!');$('#error_type').slideDown('slow', function() { $('#error_type').delay(1800).slideUp(2000); });										 
									}	
									
								}
							
							});	
			
	}
	
	function view_all_types()
	{
		
					$.ajax({
							url: $('#base_url').val()+"/instructor/get_all_type_user/",
							type: "GET",
							context: document.body,
							cache: false,
							success: function(data){												

									$('#list_pop_types').html(data);
									$("#events_type_list").fancybox().trigger('click');	
								}
							
					});	
			
	}
	
	function new_field_add()
	{
		var id=1;
				
		$('#my_form_upload').find(':input').each(function(){
			id++;
		});
		
		if($('#input_choice :selected').val()=='textbox')
		{
			$('#event_typer_add').append('<tr id='+id+'><td><input type="text" value="" /></td><td><input type="text" value="" /><br/><span onClick="removeitem('+id+')" style="cursor:pointer; color:#900"><b>remove</b></span></td></tr>');			
		}
		
		if($('#input_choice :selected').val()=='date_picker')
		{
			$('#event_typer_add').append('<tr id='+id+'><td><input type="text" value="" /></td><td><input type="text" class="date_picker" /><br/><span onClick="removeitem('+id+')" style="cursor:pointer; color:#900"><b>remove</b></span></td></tr>');			
			
			$('.date_picker').datepicker({dateFormat: "mm-dd-yy"});	
			
		}
		
		if($('#input_choice :selected').val()=='time_picker')
		{
			$('#event_typer_add').append('<tr id='+id+'><td><input type="text" value="" /></td><td><input type="text" class="time_picker" /><br/><span onClick="removeitem('+id+')" style="cursor:pointer; color:#900"><b>remove</b></span></td></tr>');	
			
			$('.time_picker').timepicker();		
					
		}
		
		if($('#input_choice :selected').val()=='textarea')
		{
			$('#event_typer_add').append('<tr id='+id+'><td><input type="text" value="" /></td><td><textarea cols="4" rows="5"></textarea><br/><span onClick="removeitem('+id+')" style="cursor:pointer; color:#900"><b>remove</b></span></td></tr>');			
		}
		
		if($('#input_choice :selected').val()=='file_selector')
		{
			
			var counter = 0;
			
			$('#my_form_upload').find(':input').each(function(){
					
				if($(this).attr('type')=='file')
				{
					counter++;
				}	
					
			});
			
			counter++;
			
			$('#event_typer_add').append('<tr id='+id+'><td><input type="text" value="" /></td><td><input type="file" name="uploaded_files[]" /><br/><span onClick="removeitem('+id+')" style="cursor:pointer; color:#900"><b>remove</b></span></td></tr>');			
			
		}
		
		$("#input_choice option[value='none']").prop('selected',true);
		
		
		
	}
	

	
	function removeitem(id)
	{
		$("#"+id).remove();
	}
	
	function sync_facebook()
	{
		
		$.ajax({
							url: $('#base_url').val()+"/instructor/check_session_sync/",
							type: "GET",
							context: document.body,
							cache: false,
							success: function(data){												
									
									if(data=='bad')
									{
										window.location = $('#base_url').val()+"/instructor/facebook_events_import/";	
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
	
	function remove_course_new(id)
	{
		
			$.ajax({
							url: $('#base_url').val()+"/permissions/remove_course_general/",
							type: "GET",
							data: 'query='+id,
							context: document.body,
							cache: false,
							success: function(data){												
									
									$('#ro_'+id).remove();
								}
							
							});		
		
		
			
	}
	
	function remove_row(id)
	{
		
		$('#rw_'+id).remove();
			
	}
	
	function session_builder()
	{
		
		$('#selected_courses li input:checked').each(function(){
		
			var goa = true;
			
			var title = $(this).attr("title");
			var ins_title = $('#user_selected_id :selected').text();
			
			$('#final_selected tr td').each(function(){
						
				if($(this).html()==title)
				{			
					goa = false;
				}
					
			});			
			
			if(goa)
			{
			
				var html ='';
				
				html ='<tr id="rw_'+$(this).val()+'"><td>'+$('#user_selected_id :selected').text()+'</td><td>'+$(this).attr("title")+'</td><td><input type="hidden" name="course_id[]" value="'+$(this).val()+'"/><input type="hidden" name="user_id[]" value="'+$('#user_selected_id :selected').val()+'"/></td><td><input type="button" class="btn" onclick="remove_row('+$(this).val()+')" value="remove" /></td></tr>';
				
				$('#final_selected').append(html);
				
			}
			
			
		});
			
			
	}
	
	function selected_person()
	{
		if($('#relation_role').val()=='Select user')
			{
						alert('Please select user');			
			}else
			{
				
				$.ajax({
							url: $('#base_url').val()+"/permissions/user_selected/",
							type: "GET",
							data: 'id_my='+$('#relation_role :selected').val()+'&user_id='+$('#user_selected_id :selected').val(),
							context: document.body,
							cache: false,
							success: function(data){												
									
									$('#interface_update').html(data);
									
								}
							
							});		
			}
		
			
	}

	function selected_role()
	{
		
		if($('#relation_role').val()=='Select role')
			{
						alert('Please select role');			
			}else
			{
				
							$.ajax({
								url: $('#base_url').val()+"/permissions/role_selected/",
								type: "GET",
								data: 'id_my='+$('#relation_role :selected').val(),
								context: document.body,
								cache: false,
								success: function(data){												
										
										$('#interface_update').html(data);
										
									}
							});		
			}
			
	}
	
	
	
	
	
	
	function addcoursenew()
	{
	
			if($('#text_course_name').val()=='')
			{
						alert('Enter course name');			
			}else
			{
				
				$.ajax({
							url: $('#base_url').val()+"/permissions/add_course_new/",
							type: "GET",
							data: 'query='+$('#role_selection :selected').val()+'&value_text='+$('#role_selection :selected').text()+'&course_name='+$('#text_course_name').val(),
							context: document.body,
							cache: false,
							success: function(data){												
									
									$('#interface_update').html(data);
									
								}
							
							});		
			}
			
	}

	function push_call_by_user(id)
	{
			
							$.ajax({
							url: $('#base_url').val()+"/instructor/send_notification_by_id/",
							type: "GET",
							data:"id="+id+"&text="+$('#notification_text').val(),
							context: document.body,
							cache: false,
							success: function(data){
										
										return data;
									}
							});		
							
	}
	
	function push_call_by_role(id)
	{
		
		$.ajax({
							url: $('#base_url').val()+"/instructor/send_notification_by_role/",
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
	
	function redirect_course(selected)
	{
		
		window.location  = $("#base_url").val()+'/instructor/additional_course_info/'+selected;
			
	}
	function redirect_import(selected)
	{
		
		window.location  = $("#base_url").val()+'/instructor/importevent/'+selected;
			
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
	
	function generate_html_notification()
	{
		
		var path = '';
		
		if($('#uiview').val())
		{
			path = $('#base_url').val()+"/instructor/generate_send_notification_html_role/";
		}else
		{
			path = $('#base_url').val()+"/instructor/generate_send_notification_html/";
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
								
								}
							
							});	
	}
	
	
	function generate_html_notification_roles()
	{
		
		////it geneeretes html for the courses
							
							$.ajax({
							url: $('#base_url').val()+"/instructor/generate_send_notification_html/",
							type: "GET",
							data:"course_id="+$("#field_courses option:selected").val(),
							context: document.body,
							cache: false,
							success: function(data){
									
									$('#inline1_notification').html(data);
									$("#notification_chooser").fancybox().trigger('click');
								
								}
							
							});	
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
	
	function trigger_notification()
	{
		
			var return_data = ui_access_trigger();
			
			if(return_data=='all')
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
												
												$('#inline1_email_confirm').html('Notifications Sended!');
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
				
				for(var k=0;k<return_data.length;k++)
				{
					res = push_call_by_user(return_data[k]);			
					
					if(res)
					{
						success++;
					}
				}
				
				$('#notifications_send').html('Notfication sent to '+success+' students');$('#notification_sended').slideDown('slow', function() { $('#notification_sended').delay(1800).slideUp(2000); });
				
				$('#inline1_email_confirm').html('Notifications Sended!');
				$("#email_confirm_chooser").fancybox().trigger('click');
				
				
			}
		
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
												$('#inline1_email_confirm').html('Notifications Sended!');
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
				
				for(var k=0;k<return_data.length;k++)
				{
						push_call_by_role(return_data[k]);
	
				}
					
				$('#notification_sended').show();
				
				$('#inline1_email_confirm').html('Notifications Sended!');
				$("#email_confirm_chooser").fancybox().trigger('click');
				
				
			}

							
	}
	
	
	function send_notification()
	{
			
			var value = $("#field_courses option:selected").val();
			var value_text = $("#field_courses option:selected").text();
			
			if(value==0 || value_text=='Personal')
			{
				
			 $('#notification_sended').html('Please select course!');$('#notification_sended').slideDown('slow', function() { $('#notification_sended').delay(1800).slideUp(2000); });
						
			}else{
					
			if($('#notification_text').val()=='')
				{
					
				    $('#notification_sended').html('Please provide text!');$('#notification_sended').slideDown('slow', function() { $('#notification_sended').delay(1800).slideUp(2000); });
					
				}else
				{
					///trigger the thml in popup
					
					
					
					generate_html_notification();
					
					//generate_html_notification_roles
					
					
					
				}
				
			}

	}
	
	///send notifcation call start
	
	function push_call_confirm_roles()
	{
		
		 $.ajax({
									url: $('#base_url').val()+"/instructor/send_notification_all_roles/",
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
												$('#notifications_send').html('Notfication sent to '+data+' student');$('#notification_sended').slideDown('slow', function() { $('#notification_sended').delay(1800).slideUp(2000); });
												
											}else
											{
												$('#notifications_send').html('Notfication sent to '+data+' students');$('#notification_sended').slideDown('slow', function() { $('#notification_sended').delay(1800).slideUp(2000); });
												
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
			
			////if value selected is email we need to trigger an popup to send export type
			if(value=='email')
			{
				
				$("#email_chooser").fancybox().trigger('click');	
												
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
										$('#message_show h2').html('<h2>Event Removed!</h2>');
										clear_records('removed');
										
										var id_new = 'ev_'+id;
										
										$('#'+id_new).hide();
										
										var $target = $('html,body'); 
										$target.animate({scrollTop: $target.height()}, 1000);
										
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
											var string = month+'-'+day+'-'+year;
											clear_records(string);	
												
										}else
										{
										
										
											for(var k=0;k<obj.length;k++)
											{
											
											if(k==0)
													{
														show_event(obj[k]['ev_id'],'auto');														
													}
													
							if(obj[k]['ev_event_type']=='other'){
														
					inn_html += "<input id='ev_"+obj[k]['ev_id']+"' class='btn' type='button' value='"+obj[k]['ev_event_other']+"' Onclick='show_event("+obj[k]['ev_id']+")' />";							}else								
													{
													
					inn_html += "<input id='ev_"+obj[k]['ev_id']+"' class='btn' type='button' value='"+obj[k]['ev_event_type']+"' Onclick='show_event("+obj[k]['ev_id']+")' />";
													}
				
											}		
											
											inn_html +='<br/>';
											
											
											
											
											if(course==0 || $('#core_permission').val()=='view')
												{	
														$('#message_show_pop').html(inn_html);
														$('#message_show').slideDown('slow', function() { });
														$('#delete_event_html_overall').show();
														$('#updating_event_html').show();				
															
												}else
												{	
														$('#message_show').html(inn_html);
														$('#message_show').slideDown('slow', function() { });
														$('#delete_event_html_overall').show();
														$('#updating_event_html').show();
																
												}
											
											
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
		
		///////////////////////////save event code
		
		
		function Save_event_go(form,this_ne)
		{
			
			
			$('#btn_save_action').attr('disabled',true);
			
			fileUpload(form,$('#base_url').val()+"instructor/upload_and_session/",'form_event');
			
			checkFrame();
			
			var test = false;
			
			setTimeout(function()
			{
				test = checkFrame();
				
				if(!test)
				{	
				
					$('#error_type').html('Saving please wait ....');
					check_status_again_save(form,this_ne);
				}
				if(test)
				{
					Save_event_go_final(form,this_ne);	
				}
				
				
			}, 1000);
			
	}
	
	function check_status_again_save(form,this_ne)
	{
		
		var test=false;
		
		setTimeout(function()
			{
				test = checkFrame();
				
				if(!test)
				{
					check_status_again_save(form,this_ne);	
				}
				if(test)
				{
					///if iframe is uploaded and done
					$('#error_type').html('Completed!');
					Save_event_go_final(form,this_ne);	
				}
				
			}, 1000);	
		
	}	
		
		
		
		/////////////////////////save event code including file upload done
		
		function Save_event_go_final(objform,this_ne){
			////////////validations
			
			///////make sure that for new event allday is set to disabled
			$("#datepicker4").attr("disabled",false);
			$("#datepicker6").attr("disabled",false);			
			
			var html = '';
			
			 	if($('#datepicker2').val()=='')
				{
					html += '*Please select your " Event Date " ! <br/>';
					$('#datepicker2').css('border','1px solid #900');
				}else
				{
					$('#datepicker2').removeAttr('style');
				}
				
				var typoo = $("#select_id_cal option:selected").text()
				
				if(typoo!='Assignment'){
				
					if($('#location_calender').val()=='')
					{
						html += '*Please enter your " Event Location " ! <br/>';
						$('#location_calender').css('border','1px solid #900');
					}else
					{
						$('#location_calender').removeAttr('style');
					}
					
				}
				if(typoo=='Assignment')
				{
					$('#all_day').prop('checked',true);
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
						
						
						/////////////////////custom fields code here
						
						
										var customdata = new Array();
										var types = new Array();
										var counter = 0;
										var foundedfiles = 0;	
										var pass = true;
										var typecounter = 0;
				
									$('.custom_options_id').closest('tr').find("input,textarea").each(function() {
										
										///i dont want to save the assignement logic in db with this
										if($(this).attr('class')!='custom_options_id_not'){
										
											if($(this).val()!='')
											{
												customdata[counter] = $(this).val();		
											}
											
											///if its a file and nothing has been selected it means sending the prevoius upload
											
											if($(this).attr('type')=="file")
											{
												var value = $(this).val();
												if(value == '')
													{
														customdata[counter] = $('#dataholder'+foundedfiles).html();	
													}else
													{
														customdata[counter] = 'uploaded';	
														
													}
													
												}
												
											if($(this).attr('type')=='file')
											{
												foundedfiles++;				
											}
											
											///only giving null for textarea now
											
											var check = $(this).attr('type');
											
											if(check == '' || check == undefined)
											{  
												types[typecounter]= 'textarea'; 
											}else{
												
												//to get date time picker type just add class on the other hand
													if($(this).attr('class')=='date_picker hasDatepicker')
													{
														types[typecounter]='date_picker'; 			
													}  //to get time picker type just add class on the other hand
													else if($(this).attr('class')=='time_picker hasDatepicker')
													{
														types[typecounter]='time_picker'; 
													}else
													{
														types[typecounter]=$(this).attr('type'); 
													}
											}
											
											typecounter++;
											counter++;
										}
							
							});
			
						////////////custom fields code here
						
						var enoded_data = JSON.stringify(customdata);
						
						var datastring = 'date='+$('#datepicker2').val()+'&location='+$('#location_calender').val()+'&starttime='+$('#datepicker4').val()+'&end_date='+$('#datepicker6').val()+"&type="+$("#select_id_cal option:selected").val()+'&notes='+$('#note_calender').val()+'&course='+$("#field_courses option:selected").val()+'&other_text='+$('#note_other_cal').val()+'&custom_type='+types+'&custom_data='+enoded_data;
						
						$.ajax({
							url: $('#base_url').val()+"/instructor/save_event_session/",
							type: "GET",
							data: datastring,
							context: document.body,
							cache: false,
							success: function(data){
								
								
								refresh_calender_on_call();
								
							}
							
							});				
					
				}
			
			//////////////////validations end	
		}
	
	///////////Add another event functionality ends 
	
	
	////this is the work flow of the permissions
	function get_detail_work_flow()
	{
		var final_view = true;
		
		if($("#field_courses option:selected").val()==0)
			{
				final_view = true;
				return final_view;
			}
		
		if($('#core_permission').val()=='view' && $("#field_courses option:selected").text()=='Personal')
			{
				final_view = false;
				return final_view;
			}
		
		if($('#core_permission').val()=='view' && $("#field_courses option:selected").text()=='School Calender')
			{
				final_view = true;
				return final_view;
			}
		
		if($('#core_permission').val()=='modify' && $("#field_courses option:selected").text()=='School Calender' && $('#canmanage_school_calender').val()!='admin school')
			{
				final_view = true;
				return final_view;
			}
			
			if($('#core_permission').val()=='modify' && $("#field_courses option:selected").text()=='School Calender' && $('#canmanage_school_calender').val()=='admin school')
			{
				final_view = false;
				return final_view;
			}
			
			if($('#core_permission').val()=='view')
			{
				final_view = true;
				return final_view;
			}
			
			if($('#core_permission').val()=='modify')
				{
					final_view = false;
					return final_view;
				}
		
	}
	
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
									$("#viewer").show();
									
									if(obj[0]['invite_status'].type!='undefined')
									{
										if(obj[0]['invite_status']!='')	
											{
												
													$('#date_event_pop').html(obj[0]['ev_date']);
													$('#locaton_event_pop').html(obj[0]['ev_location']);
													$('#s_time_event_pop').html(obj[0]['ev_start_time']);
													$('#e_time_event_pop').html(obj[0]['ev_end_time']);
													$('#event_type_pop').html(obj[0]['ev_event_type']);
													$('#event_notes_pop').html(obj[0]['ev_notes']);
													var shareid= obj[0]['share_id'];
													if(obj[0]['invite_status']!='Accepted')
													{
														
														$('#event_notes_accept_share').html('<input type="button" value="Accept" class="btn"  onclick="accept_share_event('+id+','+shareid+')" >');
														$('#event_notes_deny_share').html('<input type="button" value="Deny" class="btn"  onclick="deny_share_event('+id+','+shareid+')" >');
														
													}
													if(obj[0]['ev_event_type']=='other')
													{
														///replace by the added name
														$('#event_type_pop').html(obj[0]['ev_event_other']);	
													}
													
													///hide the prevois displayer we dont need it anymore
			
													$('.custom_options_id').remove();
													generate_html_custom(obj,'view');
													
													///hide the prevois displayer we dont need it anymore
													$("#viewer").hide();
													$("#viewer_btns").hide();
			
													$("#city_chooser").fancybox().trigger('click');
													return false;
											}
													
									}
							
									//detail work about the work
										
									var view_checker = get_detail_work_flow();
									
									if(view_checker)
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
										
										$('.custom_options_id').remove();
										
										generate_html_custom(obj,'view');
										
										///hide the prevois displayer we dont need it anymore
										$("#viewer").hide();
										
										if(obj[0]['ev_event_type']=='Assignment')
										{
											$('.canremove').hide();											
										}else
										{
											$('.custom_options_id').hide();		
										}

										$("#city_chooser").fancybox().trigger('click');
																
										return false;
											
									}else
									{		

											//if some course is selected then show in the form below to update
											$('#updating_event_html_overall').hide();
											$('#datepicker2').val(obj[0]['ev_date']);
											$('#location_calender').val(obj[0]['ev_location']);
											
											//for all day check then make checkbox also check
											
											if(obj[0]['ev_start_time']=='' && obj[0]['ev_end_time']=='')
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
											
											$('#sharing_event_html').html('<input type="button" class="btn" value="Share this event" Onclick="share_event('+obj[0]['ev_id']+');" />');
											$('#sharing_event_accepted').html('<input type="button" class="btn" value="Status of shared event" Onclick="status_share_event('+obj[0]['ev_id']+');" />');
											
											$('#delete_event_html_overall').show();
											$('#updating_event_html').show();
											$('#sharing_event_html').show();
											$('#sharing_event_accepted').show();
											if(event_done=='click')
											{
												$('#message_show').hide();	
											}
									
									$('.custom_options_id').remove();
									$('.custom_options_id_not').remove();
									
									if(obj[0]['ev_event_type']=='Assignment')
										{
											$('.canremove').hide();											
										}else
										{
											$('.custom_options_id').hide();		
										}
									
									
									generate_html_custom(obj,'modify');
								
								}
								
							});		
				///just call this an we are done to display custom events
	}
	
	
	function clear_records(date)
	{
				
				
				$('.canremove').show();	
				$('.custom_options_id').show();
				
				
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
				$('#sharing_event_html').hide();
				$('#sharing_event_accepted').hide();
				$('#all_day').prop('checked', false);
				
				$("#datepicker4").attr("disabled",false);
				$("#datepicker6").attr("disabled",false);
				
				if(date!='removed')
				{
					$('#message_show').hide();
				}
				
				$('.custom_options_id').remove();
				$('.custom_options_id_not').remove();
				
				
				$('#updating_event_html_overall').hide();
						
									
	}
	
	
	////////////End display event
	
	function Update_event(id,form)
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
						
						/////////////////////custom fields code here
						
						
										var customdata = new Array();
										var types = new Array();
										var counter = 0;
										var foundedfiles = 0;	
										var pass = true;
										var typecounter = 0;
				
									$('.custom_options_id').closest('tr').find("input,textarea").each(function() {
										
										if($(this).attr('class')!='custom_options_id_not'){
										
											if($(this).val()!='')
											{
												customdata[counter] = $(this).val();		
											}
											
											///if its a file and nothing has been selected it means sending the prevoius upload
											
											if($(this).attr('type')=="file")
											{
												var value = $(this).val();
												if(value == '')
													{
														customdata[counter] = $('#dataholder'+foundedfiles).html();	
													}else
													{
														customdata[counter] = 'uploaded';	
														var objt_form = $('#form_event').get();
														
														fileUpload(objt_form,$('#base_url').val()+"/instructor/upload_and_session/",'upload1');
													}
													
											}
												
											if($(this).attr('type')=='file')
											{
												foundedfiles++;				
											}
											
											///only giving null for textarea now
											if($(this).attr('type')===undefined)
											{  
												types[typecounter]= 'textarea'; 
											}else{
												
												//to get date time picker type just add class on the other hand
													if($(this).attr('class')=='date_picker hasDatepicker')
													{
														types[typecounter]='date_picker'; 			
													}  //to get time picker type just add class on the other hand
													else if($(this).attr('class')=='time_picker hasDatepicker')
													{
														types[typecounter]='time_picker'; 
													}else
													{
														types[typecounter]=$(this).attr('type'); 
													}
												
											}
											
											typecounter++;
											counter++;
										}
							});
							
						var enoded_data = JSON.stringify(customdata);
						
						
						datastring += '&custom_type='+types+'&custom_data='+enoded_data
							
						/////custom types update code
						
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
																			var string = month+'-'+day+'-'+year;
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

				if(obj[k]['ev_event_type']=='other'){
														
					inn_html += "<input  class='btn' type='button' value='"+obj[k]['ev_event_other']+"' id='ev_"+obj[k]['ev_id']+"'   Onclick='show_event("+obj[k]['ev_id']+")' />";							}else								
													{
													
					inn_html += "<input  class='btn' type='button' value='"+obj[k]['ev_event_type']+"' id='ev_"+obj[k]['ev_id']+"'  Onclick='show_event("+obj[k]['ev_id']+")' />";
													}		
				
																			}		
																			
																			inn_html +='<br/>';
															
															
															
																	
															var selected_text = $("#field_courses option:selected").text();
															if(selected_text=='School Calender' && $('[name="field_instructor_id"]').val()!=14)
															{
																
																$('#message_show_pop').html(inn_html);
																$('#message_show').slideDown('slow', function() { });
																$('#delete_event_html_overall').show();
																$('#updating_event_html').show();	
																	
																	
															}else{
															
																			if(course==0 || $('#core_permission').val()=='view' && selected_text!='Personal')
																				{	
																						$('#message_show_pop').html(inn_html);
																						$('#message_show').slideDown('slow', function() { });
																						$('#delete_event_html_overall').show();
																						$('#updating_event_html').show();				
																							
																				}else
																				{	
																						$('#message_show').html(inn_html);
																						$('#message_show').slideDown('slow', function() { });
																						$('#delete_event_html_overall').show();
																						$('#updating_event_html').show();
																								
																				}
																		
																		}
																	
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
	
	function core_permission()
	{
		
		var selected_text = $("#field_courses option:selected").text();
		
		if(selected_text=='Personal')
		{
			$('#access_maker').show();	
				
		}else
		{
			if($('#core_permission').val()=='view')
			{
				$('#access_maker').hide();		
			}
			
			if($('#core_permission').val()=='modify' && $("#canmanage_school_calender").val()!='admin school')
			{
				$('#access_maker').hide();		
			}
			
			if($('#core_permission').val()=='modify' && $("#canmanage_school_calender").val()=='admin school')
			{
				$('#access_maker').show();		
			}
			
			if($('#core_permission').val()=='modify' && selected_text!='School Calender')
			{
				$('#access_maker').show();	
			}
		}
			
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
				
				core_permission();
				
				//////hide the post sylabuss reponse div
				
				var selected = $("#field_courses option:selected").val();
				var selected_text = $("#field_courses option:selected").text();
				
				if(selected=='0')
				{
					$('#select_optional_case').val('');
					$('#field_courses_additional').html('');
					$('#master_method').val('no');	
					$('#importeventspan').html('');
					$("#viewer").hide();
					$("#viewer_btns").hide();
					  
				}else
				{
					$("#viewer").show();
					$("#viewer_btns").show();
					
					enable_all_fields();
					
					$('#view_1_event').show();
					$('#view_2_event').hide();
					
					var selected_name = $("#field_courses option:selected").text();
					
					var makelink = '<input class="btn" type="button" value="'+selected_name+' ADDITIONAL INFO" onclick="redirect_course('+selected+');" />';
					var importexcel = '<input class="btn" type="button" value="Import Event For Course '+selected_name+'" onclick="redirect_import('+selected+');" />';
					
					///stop creating link for these things
					if(selected_name!='Personal' && selected_name!='School Calender'){
					
						$('#field_courses_additional').html(makelink);
				
					}
					
					$('#importeventspan').html(importexcel);
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
														var string = month+'-'+day+'-'+year;
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
													
					if(obj[k]['ev_event_type']=='other'){
														
					inn_html += "<input id='ev_"+obj[k]['ev_id']+"'  class='btn' type='button' value='"+obj[k]['ev_event_other']+"' Onclick='show_event("+obj[k]['ev_id']+")' />";							}else								
													{
													
					inn_html += "<input id='ev_"+obj[k]['ev_id']+"' class='btn' type='button' value='"+obj[k]['ev_event_type']+"' Onclick='show_event("+obj[k]['ev_id']+")' />";
													}
												
															
												}		
												
												inn_html +='<br/>';
												
																								
												var selected_text = $("#field_courses option:selected").text();
												if(selected_text=='School Calender' && $('[name="field_instructor_id"]').val()!=14)
															{
																
																$('#message_show_pop').html(inn_html);
																$('#message_show').slideDown('slow', function() { });
																$('#delete_event_html_overall').show();
																$('#updating_event_html').show();	
																	
																	
															}else{
												
												if(course==0 || $('#core_permission').val()=='view' && selected_text!='Personal')
														{	
																$('#message_show_pop').html(inn_html);
																$('#message_show').slideDown('slow', function() { });
																$('#delete_event_html_overall').show();
																$('#updating_event_html').show();				
																							
														}else
															{	
																$('#message_show').html(inn_html);
																$('#message_show').slideDown('slow', function() { });
																$('#delete_event_html_overall').show();
																$('#updating_event_html').show();
																								
															}
													}
												
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
		
		var selected_text = $("#field_courses option:selected").text();
		
		$('#updating_event_html_overall').hide();
		
		///permission work
		core_permission();
		
		//////if all is selected than get all events
	
		///if some course is selected then show that course events
			
			if(selected==0)
			{
				
				$("#select_id_cal  option").attr("disabled","disabled");  
				disable_all_fields();
				
				$("#viewer").hide();
				$("#viewer_btns").hide();
				
			}else
			{
				
				$("#viewer").show();
				$("#viewer_btns").show();
				
				
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
											var string = month+'-'+day+'-'+year;
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
													
													///////if its other then replace the text of the event with the type name
													
													if(obj[k]['ev_event_type']=='other'){
														
					inn_html += "<input id='ev_"+obj[k]['ev_id']+"'  class='btn' type='button' value='"+obj[k]['ev_event_other']+"' Onclick='show_event("+obj[k]['ev_id']+")' />";							}else								
													{
													
					inn_html += "<input id='ev_"+obj[k]['ev_id']+"' class='btn' type='button' value='"+obj[k]['ev_event_type']+"' Onclick='show_event("+obj[k]['ev_id']+")' />";
													}
															
												}		
												
												inn_html +='<br/>';
												
															var selected_text = $("#field_courses option:selected").text();
															
															if(selected_text=='School Calender' && $('[name="field_instructor_id"]').val()!=14)
															{
																
																$('#message_show_pop').html(inn_html);
																$('#message_show').slideDown('slow', function() { });
																$('#delete_event_html_overall').show();
																$('#updating_event_html').show();	
																	
																	
															}else{
												
																			if(course==0 || $('#core_permission').val()=='view' && selected_text!='Personal')
																				{	
																						$('#message_show_pop').html(inn_html);
																						$('#message_show').slideDown('slow', function() { });
																						$('#delete_event_html_overall').show();
																						$('#updating_event_html').show();				
																							
																				}else
																				{	
																						$('#message_show').html(inn_html);
																						$('#message_show').slideDown('slow', function() { });
																						$('#delete_event_html_overall').show();
																						$('#updating_event_html').show();
																								
																				}
												
															}
												
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
		$('#type_name_starttime').timepicker();		
		$('#type_name_endtime').timepicker();		
		
		
		
	});
	////////form load events
	
	function refresh_calender_on_call()
	{
		
		///////////////here caleder load for this first time
		///////frist of all we need to check that are we have selected some subject or its going with all
		
		$('#calendar').html(' ');
		
		var selected = $("#field_courses option:selected").val();
		
		var selected_text = $("#field_courses option:selected").text();
		
		$('#updating_event_html_overall').hide();
		
		///permission work
		core_permission();
		
		//////if all is selected than get all events
	
		///if some course is selected then show that course events
			
			if(selected==0)
			{
				
				$("#select_id_cal  option").attr("disabled","disabled");  
				disable_all_fields();
				
				$("#viewer").hide();
				$("#viewer_btns").hide();
				
			}else
			{
				
				$("#viewer").show();
				$("#viewer_btns").show();
				
				var selected_name = $("#field_courses option:selected").text();
				var makelink = '<input class="btn" type="button" value="'+selected_name+' ADDITIONAL INFO" onclick="redirect_course('+selected+');" />';
				
			$('#field_courses_additional').html(makelink);
			var importexcel = '<input class="btn" type="button" value="Import Event For Course '+selected_name+'" onclick="redirect_import('+selected+');" />';					
				
					$('#importeventspan').html(importexcel);
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
											var string = month+'-'+day+'-'+year;
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
													
													///////if its other then replace the text of the event with the type name
													
													if(obj[k]['ev_event_type']=='other'){
														
					inn_html += "<input id='ev_"+obj[k]['ev_id']+"'  class='btn' type='button' value='"+obj[k]['ev_event_other']+"' Onclick='show_event("+obj[k]['ev_id']+")' />";							}else								
													{
													
					inn_html += "<input id='ev_"+obj[k]['ev_id']+"' class='btn' type='button' value='"+obj[k]['ev_event_type']+"' Onclick='show_event("+obj[k]['ev_id']+")' />";
													}
															
												}		
												
												inn_html +='<br/>';
												
															var selected_text = $("#field_courses option:selected").text();
															
															if(selected_text=='School Calender' && $('[name="field_instructor_id"]').val()!=14)
															{
																
																$('#message_show_pop').html(inn_html);
																$('#message_show').slideDown('slow', function() { });
																$('#delete_event_html_overall').show();
																$('#updating_event_html').show();	
																		
																	
															}else{
												
																			if(course==0 || $('#core_permission').val()=='view' && selected_text!='Personal')
																				{	
																						$('#message_show_pop').html(inn_html);
																						$('#message_show').slideDown('slow', function() { });
																						$('#delete_event_html_overall').show();
																						$('#updating_event_html').show();				
																							
																				}else
																				{	
																						$('#message_show').html(inn_html);
																						$('#message_show').slideDown('slow', function() { });
																						$('#delete_event_html_overall').show();
																						$('#updating_event_html').show();
																								
																				}
												
															}
												
										}
								
								}
							
					   });		
				 
			},
			editable: true,
			
		});
										
		}
			
	});
	
	}
	
	
	
	$(function() {
			
			//////checkbox for all day
			
			////if all day is click then this function will trigger
			
				$('#all_day').click(function(){
					
					value = $('#all_day').is(':checked');
					
					var value_selected1 = '';
					var value_selected2 = '';
					
					if($("#datepicker4").val()!='' && $("#datepicker6").val()!='')
					{
					
					value_selected1 = $("#datepicker4").val();
					value_selected2 = $("#datepicker6").val();
					
					}
					
					if(value==true)
					{
						$("#datepicker4").attr("disabled",true);
						$("#datepicker6").attr("disabled",true);
						
						$("#val_temp1").val($("#datepicker4").val());
						$("#val_temp2").val($("#datepicker6").val());
						
						$("#datepicker4").val('');
						$("#datepicker6").val('');
							
					}else
					{
						$("#datepicker4").attr("disabled",false);
						$("#datepicker6").attr("disabled",false);
						
						$("#datepicker4").val($("#val_temp1").val());
						$("#datepicker6").val($("#val_temp2").val());
						
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
			
			$("#datepicker1").datepicker({dateFormat: "mm-dd-yy"});
			$("#datepicker2").datepicker({dateFormat: "mm-dd-yy"});
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
		
		
		
		//////////////for other to show for calender
//		$("#select_id_cal").change(function () {
//          	var str = "";
//			
//			
//			
//			
//			
//            $("#select_id_cal option:selected").each(function () {
//                if($(this).val()=='other')
//				{
//					$('.other_show_text_cal').show();
//					$('#note_other_cal').val('');
//					
//				}else
//				{					
//					$('.other_show_text_cal').hide();
//					$('#note_other_cal').val('');
//				}
//         	});
       // })
	
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
		   $("#ins_fax").mask("(999) 999-9999");
		   $("#phone").mask("(999) 999-9999");
		
	});
	
	
	///for removing events
	
		$(function() {
							$('#remove_horus').click(function(){		
								
									$("input:checkbox[name=removed]:checked").each(function()
									{
										
										Remove_hours_this($(this).val());
										
									});
								
							
							});		
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
				
			var randomnumber=Math.floor(Math.random()*110078)
			
			var id1 = randomnumber+'start_time_ins';
			var id2 = randomnumber+'day_picket_ins';
			var id3 = randomnumber+'end_time_ins';
			
			$('#origional').append('<tr id="row_'+randomnumber+'"><td valign="top" width="60"><select name="date[]"><option value="sunday">Sunday</option><option value="monday">Monday</option><option value="tuesday">Tuesday</option><option value="wednesday">Wednesday</option><option value="thursday">Thursday</option><option value="friday">Friday</option><option value="saturday">Saturday</option></select></td><td valign="top" width="60"><input name="start_time[]" style="width:100px;" id="'+id2+'" type="text" /></td><td valign="top" width="60"><input name="end_time[]" style="width:100px;" id="'+id3+'"  type="text"  /></td><td valign="top" width="150"><input type="button" class="btn" onclick="remove_this_ui('+randomnumber+')" value="Remove" /></td><input name="action[]" style="width:100px;" type="hidden" value="new"  /><input name="ids[]" style="width:100px;" type="hidden" value="none"  /> </tr>');
				
				  $("#"+id1).datepicker({dateFormat: "DD"});
					
				  $("#"+id2).AnyTime_picker(
				    { format: "%H:%i", labelTitle: "Start time",
			      	labelHour: "Start time", labelMinute: "Minutes",placement: "popup" } );
					
				  $("#"+id3).AnyTime_picker(
				    { format: "%H:%i", labelTitle: "Start time",
			      	labelHour: "Start time", labelMinute: "Minutes",placement: "popup" } );
			
			});
				  
					
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

function remove_this_ui(id)
{
	
	$('#row_'+id).remove();
	
}

function remove_this(id)
{
	
		$.ajax({
							url: $('#base_url').val()+"/instructor/remove_event_time_id/",
							type: "GET",
							data: 'id='+id ,
							context: document.body,
							cache: false,
							success: function(data){
																						
									
									if(data)
									{
										
										$('#row_'+id).remove();
											
									}
									
									
								}
							
							});		
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
							
							////////removing events work
}
	
//////////email conditions and work

function validate_email(emailAddress)
{

var emailRegex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i);
 var valid = emailRegex.test(emailAddress);
  if (!valid) {
    
    return false;
  } else
    return true;
}

$(function(){
	
	
	$('#send_email').click(function(){
		
		var error = '';
		
		var array = $('#to_email').val().split(",");
		
		if(array.length==0)
		{
			error += '<b class="error">missing To field: email Address * </b><br/>';	
		}
		
		for(data in array)
		{
			var str = array[data].replace(/\s/g, '');
			if(!validate_email(str))
				{
					error += '<b class="error">Invalid : email Address * : '+array[data]+' </b><br/>';
				}	
			
		}
	
		if($("#doc_type option:selected").val()==0)
		{
			error += '<b class="error">Invalid selection: Please select export type * </b><br/>';
		}
		
		if(error=='')
		{
			
			$("#errors_space").html('<div class="success">Sending please wait .....</div>');
			
			$.ajax({
							url: $('#base_url').val()+"/instructor/send_email/",
							type: "GET",
							data: 'to='+$('#to_email').val()+"&type="+$("#doc_type option:selected").val()+"&course_id="+$("#field_courses option:selected").val()+'&text='+$('#text_send').val(),
							context: document.body,
							cache: false,
							success: function(data){
																								
									$("#email_confirm_chooser").fancybox().trigger('click');
									
								}
							
							});		
			
			
		}else
		{
			$('#errors_space').html(error);$('#errors_space').slideDown('slow').delay(1800).slideUp(2000);
		}
		
	});
	
});



	
////course info date pickers

$(function(){	
				
		$("#add_co_start_date").datepicker({dateFormat: "mm-dd-yy"});
		$("#add_co_end_date").datepicker({dateFormat: "mm-dd-yy"});
		$("#event_structure").fancybox(
				{
					'scrolling' : 'auto',
					'centerOnScroll' : true
				}
		);
		
		
		$("#color_picker").fancybox();
		
		///////////////////color picker used for just courses color
		
		$("#field_courses_color option[value='0']").prop('selected',true);
		
		///////////////////
		
		
	
});
	
	
$(function(){	
		
		///new event type working 
		
		$("#searching").keyup(function(){
			
			$.ajax({
							url: $('#base_url').val()+"/permissions/users_html_search/",
							type: "GET",
							data: 'query='+$('#searching').val(),
							context: document.body,
							cache: false,
							success: function(data){												
									
									$('#new_searcher').html(data);
									
								}
							
							});		
		});
		
		
		$("#role_selection").change(function(){
			
			$.ajax({
							url: $('#base_url').val()+"/permissions/realtions_html_search/",
							type: "GET",
							data: 'query='+$('#role_selection :selected').val()+'&value_text='+$('#role_selection :selected').text(),
							context: document.body,
							cache: false,
							success: function(data){												
									
									$('#interface_update').html(data);
									
								}
							
							});		
			});
			
			
		
		
		

});
var share_events_id;
function share_event(id)
	{
	
			share_events_id =id;
			var value = $("#field_courses option:selected").val();
			var value_text = $("#field_courses option:selected").text();
			
			
					///trigger the thml in popup
					
					
					
					generate_html_share_event();
					
					//generate_html_share events
					
				

	}
	
	function generate_html_share_event()
	{
		
		var path = '';
		
			path = $('#base_url').val()+"/instructor/generate_share_event_html/";
		
		
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
								
								}
							
							});	
	}
	
	function trigger_share_events()
	{
		
			var return_data = ui_access_trigger();
			
			if(return_data=='all')
			{
								//////////////if its 0 then 1 thing is confirm it should display notification
								
								$('<div></div>').appendTo('body')
									.html('<div><h6>Send message to students in all courses?</h6></div>')
									.dialog({
										modal: true, title: 'Sending confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: {
											Yes: function () {
													
												share_events_by_all_user('all');
												
												$(this).dialog("close");
												
												$('#inline1_email_confirm').html('Event Shared!');
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
				
				for(var k=0;k<return_data.length;k++)
				{
					res = share_events_by_user(return_data[k]);			
					
					if(res)
					{
						success++;
					}
				}
				
				$('#notifications_send').html('event shared with '+success+' students');$('#notification_sended').slideDown('slow', function() { $('#notification_sended').delay(1800).slideUp(2000); });
				
				$('#inline1_email_confirm').html('Event Shared!');
				$("#email_confirm_chooser").fancybox().trigger('click');
				
				
			}
		
	}
	
	function share_events_by_user(id)
	{
			
		$.ajax({
		url: $('#base_url').val()+"/instructor/share_events_by_id/",
		type: "GET",
		data:"reciever_id="+id+"&event_id="+share_events_id,
		context: document.body,
		cache: false,
		success: function(data){
					
					return data;
				}
		});		
							
	}
	
	function share_events_by_all_user(course)
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
												$('#notifications_send').html('Notfication sent to '+data+' student');$('#notification_sended').slideDown('slow', function() { $('#notification_sended').delay(1800).slideUp(2000); });
												
											}else
											{
												$('#notifications_send').html('Notfication sent to '+data+' students');$('#notification_sended').slideDown('slow', function() { $('#notification_sended').delay(1800).slideUp(2000); });
												
											}
										}
									
							   });	
	}
	///send notifcation call end
	function accept_share_event(event_id,share_id)
	{
			
		$.ajax({
		url: $('#base_url').val()+"/instructor/accept_share_events/",
		type: "GET",
		data:"share_id="+share_id+"&event_id="+event_id,
		context: document.body,
		cache: false,
		success: function(data){
					
					return data;
				}
		});	
		$('#inline1_email_confirm').html('Event accepted!');
		$("#email_confirm_chooser").fancybox().trigger('click');		
		refresh_calender_on_call();					
	}
	function deny_share_event(event_id,share_id)
	{
			
		$.ajax({
		url: $('#base_url').val()+"/instructor/deny_share_events/",
		type: "GET",
		data:"share_id="+share_id+"&event_id="+event_id,
		context: document.body,
		cache: false,
		success: function(data){
					
					return data;
				}
		});	
		$('#inline1_email_confirm').html('Event denied!');
		$("#email_confirm_chooser").fancybox().trigger('click');		
		refresh_calender_on_call();					
	}
	
	function status_share_event(id)
	{
	
					///trigger the thml in popup
					generate_html_status_share_event(id);
					//generate_html_share events

	}
	
	function generate_html_status_share_event(id)
	{
		
		var path = '';
		
			path = $('#base_url').val()+"/instructor/generate_status_share_event_html/";
		
		
		////it geneeretes html for the courses
							
							$.ajax({
							url: path,
							type: "GET",
							data:"event_id="+id,
							context: document.body,
							cache: false,
							success: function(data){
									
									$('#inline1_notification').html(data);
									$("#notification_chooser").fancybox().trigger('click');
								
								}
							
							});	
	}
	function search_calendar_event()
	{
	
	
				$.ajax({
							url: $('#base_url').val()+"/instructor/calendar_search/",
							type: "GET",
							data: 'query='+$('#search_calendar').val(),
							context: document.body,
							cache: false,
							success: function(data){												
									
									$('#search_result').html(data);
									
								}
							
							});		
					
			

	}
	function add_calendar(id)
	{
									
							
							$.ajax({
							url: $('#base_url').val()+"/instructor/calendar_duplicate/",
							type: "GET",
							data:"event_id="+id,
							context: document.body,
							cache: false,
							success: function(data){
										
										return data;
									}
							});	
							$('#inline1_email_confirm').html('Calendar added!');
							$("#email_confirm_chooser").fancybox().trigger('click');		
							refresh_calender_on_call();		
	}
	
	

	
