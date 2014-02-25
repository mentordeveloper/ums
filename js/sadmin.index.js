// JavaScript Document
$(document).ready(function(){

var chk='';
	$(".all_pickers").datepicker({
		dateFormat : "mm-dd-yy"
	});
$("a#add_cat_qustion").fancybox();	
	
	$("#schoolselection").change(function() {         
		
		window.location = $('#schoolselection option:selected').val();
		
	});
	
	$("#price").change(function() {         
		
		if($("#price :selected").val()=='free')
		{
			$('#price1').val('Free');
		}else
		{
			$('#price1').val('');
		}
		
	});
	
		
		$('#perm_update').live('click',function(){
			var myresult = $("#skool_perm_form").validate({
										rules: {
											mask_name: {
												required:true,
											},
										},
										messages: {
											mask_name:{
												required: "Please enter Mask Name",
											}
										}
			}).form();		
			
			if(myresult){
					
				update_permission();	
			}
				
		});		
	
	
	$("#schoolselection1").change(function() {  
		
		window.location = $('#schoolselection1 option:selected').val();
		
	});
	
	
	$("td").click(function(e) {
		
		chk = $(this).closest("tr td").find("input:checkbox").get(0);
		
			if(e.target != chk)
			{
				chk.checked = !chk.checked;
			}
		
	});
	

	$('.content .msgsuccess').slideUp(5000);
	
	$('#select_all').change(function() {
		
		var checkboxes = $(this).closest('form').find('input:checkbox');
		if($(this).is(':checked')) {
			checkboxes.attr('checked', 'checked');
		} else {
			checkboxes.removeAttr('checked');
		}
	});
	
	
	
	$("#searchingname").keyup(function(){
		$.ajax({
			url: $('#base_url').val()+"sadmin/users_instantsearch/",
			type: "GET",
			data: 'query='+$('#searchingname').val(),
			context: document.body,
			cache: false,
			success: function(data) {
				$('#new_searcher_req').html(data);
				$('#searchcriteria').hide();
				
			}
						
		});		
	});
	
	$("a#update_permission_set").fancybox();

		$("a#add_school_new").fancybox();	
		$('a#open_feilds_lang').fancybox();
		
		// validation functions
			$("#role_form").validate({
			rules: {
				role: {
					required: true,
					minlength: 2,
					maxlength: 30
				},
			},
			messages: {
		
				role: {
					required :"Please enter Role Name",
					minlength : "Should be atleast 2 characters",
				},
			}
	});		
	
		$("#pay_sys_form").validate({
			rules: {
				pname: {
					required: true,
					minlength: 5,
				},
				quan: {
					required: true,
					digits:true,
				},
				
				price1: {
					required: true,
					
				},
				users: {
					required: function() {
					if ($("#package").val()== 'defined') {
						return true;
						
					}
					else {
						return false;
					}

					
				},
			},
			messages: {
		
				pname: {
					required :"Please enter Payment Name",
					minlength :"Should be more than 4 characters "
					
				},
				quan: {
					required :"Please enter Quantity",
					digits :"Please enter only Digits"
					
				},
				price1: {
					required: "Please enter Price",
				},
				users: {
					required :"Please enter Price",
				},
			  }
			}
	});	
	
	$("#schooltype").validate({
			rules: {
				role: {
					required: true,
				},
			},
			messages: {
		
				role: {
					required :"Please enter School Type"
				},
			}
	});	
	
	$("#perm_form").validate({
			rules: {
				permission: {
					required: true,
				},
				permission_mask: {
					required: true,
				},
			},
			messages: {
		
				permission: {
					required: "Please enter Permission Name",
				},
				permission_mask: {
					required: "Please enter Permission Mask Name",
				},
			}
	});	

       // Initialize the jQuery File Upload widget:
      // $('#fileupload').fileupload();
	
	
    // Load existing files:
    $.getJSON($('#fileupload form').prop('action'), function (files) {
        var fu = $('#fileupload').data('fileupload');
        fu._adjustMaxNumberOfFiles(-files.length);
        fu._renderDownload(files)
            .appendTo($('#fileupload .files'))
            .fadeIn(function () {
                // Fix for IE7 and lower:
                $(this).show();
            });
    });
	
    // Open download dialogs via iframes,
    // to prevent aborting current uploads:
    $('#fileupload .files a:not([target^=_blank])').live('click', function (e) {
        e.preventDefault();
        $('<iframe style="display:none;"></iframe>')
            .prop('src', this.href)
            .appendTo('body');
    });
    
    $('#term').change(function(){
        var term_val = eval($('#term').val());
        var placeholder_text = '';
        switch(term_val){
            case 1:
               placeholder_text = 'Please enter the number of Days for this plan';
            break;
            case 7:
                placeholder_text = 'Please enter the number of Weeks for this plan';
            break;
            case 30:
                placeholder_text = 'Please enter the number of Months for this plan';
            break;
            case 365:
                placeholder_text = 'Please enter the number of Years for this plan';
            break;
            default:
                placeholder_text = '';
            
        }
        $('#quan').attr('placeholder', placeholder_text);
    });
		
	
	
});
function payment_refund_status(id,flag)
{
	$.ajax({
		url : $('#base_url').val() + "sadmin/payment_refund_status_update/",
		type : "GET",
		data : "id=" + id+"&flag="+flag,
		context : document.body,
		cache : false,
		success : function(data) {
			
		}
	});
	
}
function my_status_check(id)
{	var	flag=1;
 
								$('<div></div>').appendTo('body')
									.html('<div><h5>Update?<b> </b>!</h5></div>')
									.dialog({
										modal: true, title: 'Change Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: [{
											text: 'Update',
											click: function() {
											    payment_refund_status(id,flag);
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

function my_status_uncheck(id)
{
			var flag =0;
			
 
								$('<div></div>').appendTo('body')
									.html('<div><h5>Update?<b> </b></h5></div>')
									.dialog({
										modal: true, title: 'Change Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: [{
											text: 'Update',
											click: function() {
											    payment_refund_status(id,flag);
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
function term_type_options()
{

var value = $('#term_new :selected').val();

	if (value == 'semester') {
		
		$('#semester_ui').slideDown();
		$('#semester_ui_save').slideDown();

	}
	if (value == 'quarters') {
		$('#quarters_ui').slideDown();
		$('#quarters_ui_save').slideDown();
		$('#semester_ui').slideUp();
		$('#semester_ui_save').slideUp();
		$('#manual_save').slideUp();
		Reset_default();
		Enabled_everything_now();

	}

}
function save_category_new()
{
	$.ajax({
		url : $('#base_url').val() + "sadmin/add_cat_new/",
		type : "GET",
		data : "name=" + $('#cat_name').val(),
		context : document.body,
		cache : false,
		success : function(data) {
			//alert(data);
			//$(#row_+ data).append($('#cat_name').val());
			open_cat();
		}
	});


}

function open_cat()
{
	$.ajax({
		url : $('#base_url').val() + "sadmin/new_category/",
		type : "GET",
		
		context : document.body,
		cache : false,
		success : function(data) {

			$("#add_cat_qustion").fancybox().trigger('click');

		}
		});

}


function update_password_call()
{	

				$.ajax({
											
											
											url: $('#base_url').val()+"/sadmin/check_password_old/",
											type: "GET",
											context: document.body,
											cache: false,
											data : "o_password="+$('#o_password').val()+'&n='+$('#n_password').val()+'&cn='+$('#confirm_password').val(),
											success: function(data){
												
													if(data=='true')
													{
														
													  	$.ajax({
											
																url: $('#base_url').val()+"/sadmin/reset_password_request/",
																type: "GET",
																context: document.body,
																cache: false,
																data : "old="+$('#o_password').val()+'&n='+$('#n_password').val()+'&cn='+$('#confirm_password').val(),
																success: function(data){
																	
																		if(data=='error1')
																		{
																			
																		 $('#o_password_error').html('<label class="error" for="confirm_password" generated="true">Incorrect Old password!</label>');		
																		}
																		
																		if(data)
																		{
																		  
																		  $('#school').html('<div class="notification msgsuccess"><p>Updated Successfully !  </p></div>');
																		  $("#added_school").fancybox().trigger('click');
																		  
																		  setTimeout(function() {
																			$.fancybox.close();
																		  }, 1300);
																				
																		}
																}
																
															});	
														
													}else
													{
														
														$('#o_password_error').html('<label class="error" for="confirm_password" generated="true">Incorrect Old password!</label>');		
															
													}
											
											}
											
										});	
										
										

}

function R_s(id,name){
								
								
								$('<div></div>').appendTo('body')
									.html('<div><h5>Delete <b>'+name+' ?</b>!</h5></div>')
									.dialog({
										modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: [{
											text: 'Remove',
											click: function() {
												R_s_do(id);
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

function R_s_do(id)
{
										$.ajax({
											url: $('#base_url').val()+"/sadmin/remove_payment_sys/",
											type: "GET",
											context: document.body,
											cache: false,
											data : "id="+id,
											success: function(data){
												
												window.location = $('#base_url').val()+'/sadmin/payments?msg=Removed Successfully&go=true';			
												
											}
										});	
										
										
			
}										
function remove_lanoptions(id)
{

alert($('#lang_titlee'+id).val());
									$.ajax({
													url: $('#base_url').val()+"sadmin/remove_languageoptions/",
													type: "GET",
												    data : "id="+id+"&title="+$('#lang_titlee'+id).val(),
													context: document.body,
													cache: false,
													success: function(data){
																
																return data;
															}
									});	
													

}

function remove_language(id,name)
{

	
	$('<div></div>').appendTo('body')
									.html('<div><h5>Delete <b>'+name+' ? </b>!</h5></div>')
									.dialog({
										modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: [{
											text: 'Delete',
											click: function() {
												remove_confirm(id);
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

function remove_confirm(id)
{
	
	$.ajax({
													url: $('#base_url').val()+"sadmin/remove_language_options/",
													type: "GET",
												    data : "id="+id+"&title="+$('#lang_titlee'+id).val(),
													context: document.body,
													cache: false,
													success: function(data){
																
																	$('.content').prepend('<div class="notification msgsuccess"><a class="close"></a><p>Removed Successfully!</p></div><br/>');
															$('.msgsuccess').slideUp(4000);
															$('#row_'+id).remove();
															}
									});	
}


function updatenotifcation()
{
									
												$.ajax({
													url: $('#base_url').val()+"/sadmin/update_notifications/",
													type: "GET",
												
													context: document.body,
													cache: false,
													success: function(data){
																
																return data;
															}
												});	
															
													refresh_calender_on_call();		
}
function update_permission()
{

									$.ajax({
											
													url: $('#base_url').val()+"sadmin/update_cofirm_permission",
													type: "GET",
													context: document.body,
													data : "id="+$('#mask_id_permission').val()+"&permission_mask="+$('#mask_name_permission').val(),
													cache: false,
													success: function(data){					
																// $("#show_error").html(data);				
																$('#row_'+$('#mask_id_permission').val()).html(data);
																$('#success_get').html('<div class="notification msgsuccess"><p>update successfully</p></div>');
																
																
														}
														
											});	
	
}
function open_feildslang(id)
{
    
						$.ajax({
											
													url: $('#base_url').val()+"sadmin/open_feilds_lang",
													type: "GET",
													context: document.body,
													data : "title="+$('#lang_titlee'+id).val(),
													cache: false,
													success: function(data){												
														
																$('#display_list_lang').html(data);
																//$('#display_list_lang').fancybox(data);
															
																	
														}
														
											});	


}
function Update_language()
{
     
	if($('#my_select_field').val()=='')
	{
			$('#updt_notf').html('<div class="notification msgerror"><p>Please enter text</p></div>');
		    return false;	
	}
	
		$.ajax({
											
													url: $('#base_url').val()+"sadmin/update_language_file",
													type: "GET",
													context: document.body,
													data : "title="+$('#my_title').val()+"&field="+$('#sel_lang').val()+"&value="+$('#my_select_field').val(),
													cache: false,
													success: function(data){												
														
															$('#updt_notf').html('<span class="success">Entered successfully</span>').show().delay(1800).slideUp(2000);
															//	$("#added_school").fancybox().trigger('click');
																	
														}
														
											});	

	

}

function create_language_folder()
{
	
											$.ajax({
											
													url: $('#base_url').val()+"sadmin/create_language_folder",
													type: "GET",
													context: document.body,
													data : "title="+$('#add_lang').val(),
													cache: false,
													success: function(data){												
														
														      window.location = $('#base_url').val()+'sadmin/language_settings?msg=Language Added Successfully&go=true';															
															  							  															
														}
											});	

}
function update_school(id)
{
	
									$.ajax({
											
													url: $('#base_url').val()+"sadmin/update_school",
													type: "GET",
													context: document.body,
													data : "id="+id,
													cache: false,
													success: function(data){												
														
																$('#school').html(data);
																$("#added_school").fancybox().trigger('click');
																	
														}
														
											});	
			
}


function check_name_duplication(name,page)
{
		
									$('#school').html('');
									
									$.ajax({
								
										url: $('#base_url').val()+"sadmin/register_check_duplicate/",
										type: "POST",
										context: document.body,
										data : {
												name : $('#school_name').val(),
												username : $('#school_username').val(),
                                                domainname : $('#sub_dname').val(),
												school_email : $('#school_email').val(),
										},
										cache: false,
										success: function(data){	
										
										          
													var obj = JSON.parse(data);
													if(obj['value']==1)
													{
														
														$('.alert-error').remove();
														if(obj['reason']=='Name')
															obj['reason']='School '+obj['reason'];
														
														$('#error').html('<div class="notification msgerror"><p> '+obj['reason']+ ' '+obj['reason_value']+' already exists</p></div>');
														
														return;	
														
													}
													
													if(obj['value']==0)
													{
														$('#school').html('<div class="notification msgsuccess"><p>Please Wait School is Setting up for you.!</p></div>'); 
                                                                                                                $("#added_school").fancybox().trigger('click');	
														var name            = $('#school_name').val();
														var status          = $('#status_school').is(':checked');
														var school_username = $('#school_username').val();
                                                        var school_domain   = $('#sub_dname').val();
														var school_password = $('#school_password').val();
														var s_type          = $('#role_selection :selected').val();
														var email           = $('#school_email').val();	
														
															$.ajax({
															
																	url: $('#base_url').val()+"sadmin/save_schoolname",
																	type: "POST",
																	context: document.body,
																	data : "name="+$('#school_name').val()+"&status="+$('#status_school').is(':checked')+"&school_username="+$('#school_username').val()+"&school_password="+$('#school_password').val()+"&s_type="+$('#role_selection :selected').val()+"&email="+$('#school_email').val()+"&school_domain="+$('#sub_dname').val()+"&page="+page,								
																	data : {
																			name : name,
																			status : status,
																			school_username : school_username,
																			school_password : school_password,
																																		school_subdomain : school_domain,
																			s_type : s_type,
																			email : email,
																			page  : page
																	},
																	cache: false,
																	success: function(data){												
																		
																			if(data=='false')
																			{
																				$('#school').html('<span class="error" style="padding:0 20px;">Some problem saving record please try again!</span>');
																				return false;	
																			}
																			else
																			{
																				
																				
																				
																				$('#school').html('<div class="notification msgsuccess"><p>Record Saved!</p></div>'); 
																				$("#added_school").fancybox().trigger('click');				
																				
																				$('#html_ajax').html(data);
																				
																				setTimeout(function() {
																					$.fancybox.close();
																				}, 1300);
																				
																				jQuery('#dyntable').dataTable( {"bDestroy": true,"sPaginationType": "full_numbers"} );
				
																			}
																			
																		}
																		
															  });	
															  
														}
															
													}
												
											
								});	
	
		
}


function update_school_call(id)
{
											
											
														var name            = $('#school_name').val();
														var status          = $('#status_school').is(':checked');
														var school_username = $('#school_username').val();
														var school_password = $('#school_password').val();
														var s_type          = $('#skool_typee :selected').text();
														var school_email           = $('#school_email').val();	
														var id              = $('#id_update').val();
										
											$.ajax({
											
													url: $('#base_url').val()+"sadmin/update_school_go",
													type: "POST",
													context: document.body,
													data : {
															name : name,
															status : status,
															school_username : school_username,
															school_password : school_password,
															s_type : s_type,
															school_email : school_email,
															id : id
													},
													cache: false,
													success: function(data){												
														
															if(data=='false')
															{
																$('#school').html('<span class="error" style="padding:0 20px;">Some problem saving record please try again!</span>');
																return false;	
															}
															else
															{
																
																$('#school').html('');
																
																$('#school').html('<div class="notification msgsuccess"><p>Record Updated!</p></div>');
																$("#added_school").fancybox().trigger('click');
																
																//$('#html_ajax').html(data);
																
																setTimeout(function() {
																    $.fancybox.close();
																}, 1300);

																
															}
															
														}
														
											});	
															
											
}


							function remove_school(id,schoolname)
							{		
								
		
								$('<div></div>').appendTo('body')
									.html('<div><h5>Delete <b>'+schoolname+' ?</b></h5></div>')
									.dialog({
										modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: [{
											text: 'Delete',
											click: function() {
												push_call_confirm(id);
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


function push_call_confirm(id)
{
	
											$.ajax({
											
													url: $('#base_url').val()+"sadmin/remove_school",
													type: "GET",
													context: document.body,
													data : "remove_school="+id,
													cache: false,
													success: function(data){																										
															
															$('.content').prepend('<div class="notification msgsuccess"><a class="close"></a><p>Removed Successfully!</p></div><br/>');
															
															$('.msgsuccess').slideUp(4000);
															
															
															$('#row_'+id).remove();
															
													}
														
											});	
		
}

	function add_school_call()
	{
		var check = check_name_duplication($('#school_name').val());			
	}

	function save_plan_payment()
	{
	
	
	}



function acpt_rem(id)
{
                                            
                                            
                                                                   $('<div></div>').appendTo('body')
									.html('<div><h5>Delete </h5></div>')
									.dialog({
										modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: [{
											text: 'Delete',
											click: function() {
												remove_this_request_developer(id);
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

function remove_this_request_developer(id)
{
                                                     $.ajax({
								url: $('#base_url').val()+"sadmin/remove_developer_request/",
								type: "GET",
								context: document.body,
								data : "respond_req="+id,
								cache: false,
								success: function(data){												
										$('#row_'+id).remove();
									}
							});
    
   
}

function acpt_req(id)
{
                                                               $('<div></div>').appendTo('body')
								.html('<div><h5>Request Accepted!</h5></div>')
								.dialog({
									modal: true, title: 'Sending confirmation', zIndex: 10000, autoOpen: true,
									width: 'auto', resizable: false,
									buttons: {
											Ok: function () {
												$(this).dialog("close");
												}
											}	
									});
									
							$.ajax({
								url: $('#base_url').val()+"sadmin/respond_to/",
								type: "GET",
								context: document.body,
								data : "respond_req="+id,
								cache: false,
								success: function(data){
																									
										$('#showhtml').html(data);															
										window.location = $('#base_url').val()+'sadmin/req_access?msg=Request Accepted Successfully&go=true';															
										
										
									}
							});
							////end here
}
function deny_req(id)
{	

								
								$('<div></div>').appendTo('body')
									.html('<div><h5>Deny request ?</b></h5></div>')
									.dialog({
										modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: [{
											text: 'Deny',
											click: function() {
												confirm_call(id);
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
function deny_req1(id)
{
	
						
						$('<div></div>').appendTo('body')
									.html('<div><h5>Deny request ? </b>!</h5></div>')
									.dialog({
										modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: [{
											text: 'Remove',
											click: function() {
												push_call_confirm(id);
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

function acpt_req_all()
{

								$('.content').prepend('<div class="notification msginfo"><a class="close"></a><p>Please wait loading!</p></div><br/>');	
									
								$.ajax({
										url: $('#base_url').val()+"sadmin/respond_to/",
										type: "GET",
										context: document.body,
										cache: false,
										success: function(data){
											
											window.location = $('#base_url').val()+'sadmin/req_access?msg=All Request Accepted Successfully!&go=true';															
											
									}
							});
							
}
function remove_role(id,role)
{
	

								$('<div></div>').appendTo('body')
									.html('<div><h5>Delete <b>'+role+' ?</b></h5></div>')
									.dialog({
										modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: [{
											text: 'Delete',
											click: function() {
												confirm_id(id);
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
function confirm_id(id)
{
	$.ajax({
								url: $('#base_url').val()+"sadmin/remove/",
								type: "GET",
								context: document.body,
								data: "id="+id,
								cache: false,
								success: function(data){
									
										$('#row_'+id).remove();
										$('.content').prepend('<div class="notification msgsuccess" style="margin-bottom:10px;"><a class="close"></a><p>Removed Successfully!</p></div>');
										$('.msgsuccess').slideUp(4000);
																				
										
										
									}
							});						
}

function confirm_call(id)
{
	$.ajax({
								url: $('#base_url').val()+"sadmin/revert_access/",
								type: "GET",
								context: document.body,
								data: "id="+id,
								cache: false,
								success: function(data){
									
										window.location = $('#base_url').val()+'sadmin/req_access?msg=Request Denied Successfully&go=true';															
										
										
									}
							});				
}

function remove_perm(id)
{
	
	
								jConfirm('Can you confirm this?', 'Confirmation Dialog', function(r) {
									confirm_remove(id);
								});
								
								
}

function confirm_remove(id)
{
	$.ajax({
								url: $('#base_url').val()+"sadmin/removepermi/",
								type: "GET",
								context: document.body,
								data: "id="+id,
								cache: false,
								success: function(data){
																										
										$('#row_'+id).remove();
										
									}
							});	
}
function add_notifier()
{

	
	$.ajax({
								url: $('#base_url').val()+"sadmin/add_notifier",
								type: "POST",
								context: document.body,
								data: "text="+$('#notif_text').val(),
								cache: false,
								success: function(data){
																										
										$('#school').html('<div class="notification msgsuccess"><p>Notification Sent!</p></div>');
										$("#added_school").fancybox().trigger('click');
										  setTimeout(function() {
											$.fancybox.close();
										  }, 1300);						
									}
							});



}
function remove_schooltype(id,name)
{		
								
								
								$('<div></div>').appendTo('body')
									.html('<div><h5>Delete <b>'+name+' ?</b></h5></div>')
									.dialog({
										modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: [{
											text: 'Delete',
											click: function() {
												confirm_remove_type(id);
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

function confirm_remove_type(id)
{
	$.ajax({
								url: $('#base_url').val()+"sadmin/remove_type/",
								type: "GET",
								context: document.body,
								data: "id="+id,
								cache: false,
								success: function(data){
																										
										$('#row_'+id).remove();
										
										$('.content').prepend('<div class="notification msgsuccess"><a class="close"></a><p>Removed Successfully!</p></div><br/>');
										$('.msgsuccess').slideUp(4000);
										
									}
							});	
}




function clearkeys()
{
	 $.ajax({
				url: $('#base_url').val()+'instructor/clear_keys/',
				type: "GET",
				context: document.body,
				cache: false,
				success: function(data) {
					
								$('#success').html('<br/><div class="notification msgsuccess"><p>Keys Cleared Successfully</div>');					
				}
			});
}

function validate_email(emailAddress)
{
	
var emailRegex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i);
 var valid = emailRegex.test(emailAddress);
  if (!valid) {
    
    return false;
  } else
    return true;
	
}

