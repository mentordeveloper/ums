$(document).ready(function(){
	jQuery.validator.addMethod("strong_password", function(value1, element) {
   //alert('aaaaa'); return false;
	var regex = /(?=.{7,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i;
	//alert(regex.test(value1));
	if(regex.test(value1))
	return true;
	else 
	return false;

}, "Should strong password"); 

$("#strong_Reset_Form").validate({
			rules: {
				uname: "required",
				
				n_pwd: {
					required: true,
					strong_password :  $('value1').val(),
					
				},
				c_pwd: {
					required: true,
					equalTo: '#n_pwd'
				},
				
			},
			messages: {
				uname: "Please enter your User Name",
			
				n_pwd:{
					required: "Please enter New Password",
					strong_password : "Please Add a Strong Password which should contain atleast 7 characters atleast one uppercase and lowercase letter and one numeric or special character!",
				},
				c_pwd: { 
					required:"Please Confirm  Password",
					equalTo: "doesnot match with New Password"
				},
		
			}
	});	
	
});

function send_req()
{
		$.ajax({
								url: $('#base_url').val()+"permissions/send_reset_req/",
								type: "GET",
								data: 'emailid='+$('#email_id').val()+'&school_name='+$('#s_name').val(),
								context: document.body,
								cache: false,
								success: function(data){
												
												$(".alert").hide();
												$(".forget-form").prepend(data);
												
									}
							});
}

function send_req_user()
{
		$.ajax({
								url: $('#base_url').val()+"forgot_pwd/send_reset_req/",
								type: "GET",
								data: 'school_name='+$('#s_name').val()+'&user_name='+$('#uname').val()+'&test='+$('#test').val(),
								context: document.body,
								cache: false,
								success: function(data){
												$('#list_pop_types').html('<div style="margin-bottom:0px;" >'+data+'</div>');
												$("#events_type_list").fancybox().trigger('click');
												setTimeout(function() {
												$.fancybox.close();
												}, 1300);
									}
							});
}

function send_req_to_admin()
{
	$.ajax({
								url: $('#base_url').val()+"forgot_pwd/send_reset_req/",
								type: "GET",
								data: 'emailid='+$('#email_id').val()+'&school_name='+$('#s_name').val()+'&user_name='+$('#uname').val()+'&test='+$('#test').val(),
								context: document.body,
								cache: false,
								success: function(data){
												$('#list_pop_types').html('<div style="margin-bottom:0px;" >'+data+'</div>');
												$("#events_type_list").fancybox().trigger('click');
												setTimeout(function() {
												$.fancybox.close();
											}, 1300);
									}
							});
	
}