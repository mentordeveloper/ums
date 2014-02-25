// JavaScript Document

$(document).ready(function(){
	 $("#file_holder").uploadify({
        'formData': {
            'user_id' : $('#user_id').val(),
        },
        height: 30,
        swf: $('#base_url').val() + 'files/uploadify/uploadify.swf',
        uploader: $('#base_url').val() + 'permissions/upload_csv/',
        width: 100,
        maxQueueSize: 0,
        messages: {
            'maxNumberUploadError': 'Exceded number of upload.',
            'nothingInTheQueueError': 'Nothing in the Queue'
        },
        'auto': false,
        'onUploadSuccess': function(file, data, response) {
            
			if(data=='format')
			{
				alert('.csv format is allowed only!');
			}else
			{
			
				$('#email_holder').val(data);
				$('#self_reg').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Added in email address</strong></div>');
                $("#added_reg").fancybox().trigger('click');
				setTimeout(function() {
                    $.fancybox.close();
                }, 1800);                
				return false;
			}
           
            
        }
    });
					$('#save_email').click(function(){
			
										var myresult = $("#self_reg_form").validate({
											
										rules: {
											role: "required",
											option_package: "required",
											email_holder: {
												required: true,
												//email: true,
											},
											
											
										},
										messages: {
											role:"Please select Role",
											option_package: "Please select Package Plan",
											email_holder:{
												required:"Please enter Email Address",
												email : "Please enter valid Email Address",
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
							save_email_add();		
						}
						
				});		
});	

function send_email_add()
{
	//alert('aaaaa');
	$('#email_holder_csv').uploadify('upload','*');
}

/*$("#Filedatanew").uploadify({
							
							height        : 30,
							swf           : $('#base_url').val()+'files/uploadify/uploadify.swf',
							uploader      : $('#base_url').val()+'permissions/fileuploading/',
							width         : 100,
							maxQueueSize  : 0,
							messages      :{
								'maxNumberUploadError':'Exceded number of upload.',
								'nothingInTheQueueError':'Nothing in the Queue'		
							},
  							 'auto'      : false,
							 'onUploadSuccess' : function(file, data, response) {
							 
							    if(data=='bad')
								{
								
								
								}else{
				
										$('.error').html('');								
										////starts from here
										$.ajax({
											url: $('#base_url').val()+"permissions/save_self_registration/",
											type: "GET",
											data: 'emailid='+$('#email_holder').val()+"&type="+$('#option_role').val()+'&custom_msg='+$('#custom_msg').val()+'&package='+$('#option_package').val()+'csv_email='+data,
											context: document.body,
											cache: false,
											success: function(data){
																												
													$('#pending').html(data); 
													
													
												/*	$.ajax({
																url: $('#base_url').val()+"permissions/tab_sent/",
																type: "GET",
																context: document.body,
																cache: false,
																success: function(data){
																															
																		$('#pending').html(data);
																
															}
													});
												}
										});
									}
								
							},
							
				});*/
function upload_me_now()
{
$('#file_holder').uploadify('upload','*');


}
function save_email_add()
{
							var all_email = [];
							var n_array=$('#email_holder').val().split(";"); 
							
							for (var i=0;i<n_array.length;i++)
							{
								filter = /^(\s?[a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4}\s?)+$/;
								if (filter.test(n_array[i])) {
								  // Yay! valid
								 
								}
								else
								  {
								  all_email.push(n_array[i])
								 
								  
								  }
							}
							if(all_email.length>0)
							{
								 $('#self_reg_error').html('');
								 $('#self_reg_error').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong> Invalid Emails: '+all_email+'</div>');
								 $('.go-top').click();					
							     return;
							}
							
							//$('.alert').remove();
							$('#self_reg_error').html('');
							
							if($('#option_package').val()=='-1')
							{
								$('#self_reg_error').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error! </strong>Please purchase package!</div>');
								return false;
						
							}else if($('#email_holder').val()=='' || $('#option_role').val()=='' || $('#custom_msg').val()=='' )
							{
								$('#self_reg_error').html('');
								return false;
							}
							////starts from here
							$.ajax({
								url: $('#base_url').val()+"permissions/save_self_registration/",
								type: "GET",
								data: 'emailid='+$('#email_holder').val()+"&type="+$('#option_role').val()+'&custom_msg='+$('#custom_msg').val()+'&package='+$('#option_package').val(),
								context: document.body,
								cache: false,
								success: function(data){
													 if(data=='limit')
													{
													    $('#self_reg_error').html('');
														$('#self_reg_error').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong> No.of users exeeds package limit!</div>');
														$('.go-top').click();
													
													}
													else if(data=='false')
													{														
														$('#self_reg_error').html('');
														
														$('#self_reg_error').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error:</strong>  A user with this email address already exists.</div>');
														
														$('.go-top').click();
													}
													else{
										
														$.ajax({
																	url: $('#base_url').val()+"permissions/tab_sent/",
																	type: "GET",
																	context: document.body,
																	cache: false,
																	success: function(data){
																            //location.reload(); 
																			$('#self_reg_error').html('');
																			$('.go-top').click();
																			$('#self_reg_error').html('<div class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Email Sent successfully!</div>').show().delay(1800).slideUp(2000);
														
																			$('#self_reg_form').find('input[type=text], textarea , select').val('');
																													
																			$('#pending').html(data);
																			
																			$('.go-top').click();
																				
																				
																			
														
													
														}
										});
									}
																//to refresh deop down of package for latest credentials
																	$.ajax({
												
																				url: $('#base_url').val()+"permissions/refresh_main_dropdown/",
																				type: "GET",
																				context: document.body,
																				
																				cache: false,
																				success: function(data)
																				{	
																						$('#refresh_html').html(data);
																				}
															
																			});	
								}
							});
							
							////end here
							
		
		
}
function remove_email_id(id)
{		
   
									 $('<div></div>').appendTo('body')
									.html('<div><h6>Delete <b>'+$('#mail_sent_id'+id).val()+'?</b></h6></div>')
									.dialog({
										modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: {
											Delete: function () {
													
												push_call_confirm(id);
												
												$(this).dialog("close");
												
											},
											Cancel: function () {
												$(this).dialog("close");
											}
										},
										close: function (event, ui) {
											$(this).remove();
										}
									});
									
}

function push_call_confirm(id)
{
	
											$.ajax({
											
													url: $('#base_url').val()+"permissions/remove_email/",
													type: "GET",
													context: document.body,
													data : "remove_email="+id,
													cache: false,
													success: function(data){												
															
															
															 $('#html_ajax').html(data);
															
															//$('#row_'+id).html('<span class="error">Record Removed!</error>');															
															 $('#course').html('<div style="margin-bottom:0px; !important;width:250px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Removed Successfully!</strong></div>');																		
															 $("#added_course").fancybox().trigger('click');
															  setTimeout(function() {
																$.fancybox.close();
															}, 1800);
																	$.ajax({
											
																			url: $('#base_url').val()+"permissions/refresh_main_dropdown/",
																			type: "GET",
																			context: document.body,
																			
																			cache: false,
																			success: function(data)
																			{	
																					$('#refresh_html').html(data);
																			}
														
																		});	
													
													  			
													   $('#self_red_errros').html('');													  
													   $('#self_reg_error').html('');
											}
														
											});	
		
}


function send_email_toall()
{
							$('<div></div>').appendTo('body')
								.html('<div><h6>All Mails Sent!</h6></div>')
								.dialog({
									modal: true, title: 'Sending confirmation', zIndex: 10000, autoOpen: true,
									width: 'auto', resizable: false,
					
									});
									
						
												$.ajax({
													url: $('#base_url').val()+"permissions/tab_sent/",
													type: "GET",
													context: document.body,
													cache: false,
													success: function(data){
																												
															$('#pending').html(data);
													
												}
										});
	
}

function send_email(id)
{
									
							$.ajax({
								url: $('#base_url').val()+"permissions/mail_to/",
								type: "GET",
								context: document.body,
								data : "send_email="+id,
								cache: false,
								success: function(data){
																									
										$('#showhtml').html(data);
										$('#row_'+id).html('<span class="error">Record Removed!</error>');															
										$('#row_'+id).remove();
										
										$.ajax({
											url: $('#base_url').val()+"permissions/tab_sent/",
											type: "GET",
											context: document.body,
											cache: false,
											success: function(data){									
													$('#sent').html(data);
												}
										});
									}
							});
							////end here
		
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


function ajaxFileUpload()
{
	 $.ajax({
         url         : $('#base_url').val()+'permissions/upload_file/', 
         secureuri      :false,
         fileElementId  :'upload_file',
         success  : function (data)
        	 {
               $('#files').html(data);
            
           	 }
           // alert(data.msg);
         
      });
      //return false;
 
}


function load_template(){
	
	
		
	
}


