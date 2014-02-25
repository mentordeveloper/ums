<script type="text/javascript">
		
		$('#o_password').focus(function(){
			$('#o_password_error').html('');
		});
		
		$('#update_password').click(function(){
			
			var myresult = $("#password_update_form").validate({
				
				rules: {
					o_password: {
						required: true,
						remote: $('#base_url').val()+"sadmin/check_password_old"
					},
					n_password: {
						required: true,
					},
					confirm_password: {
						required: true,
						equalTo: '#n_password'
					},
				
				},
				messages: {
					
					o_password:{
						required: "Please enter Old Password",
						remote : "Old Password Donot Macthed",
					},
					n_password:{
						required: "Please enter New Password",
					},
					confirm_password: { 
						required:"Please Confirm  Password",
						equalTo: "doesnot match with New Password"
					},
					
				},
			}).form();		
			
			if(myresult){
				update_password_call();		
			}
				
		});		
		
		
							
</script>

<form id="password_update_form" class="stdform" action="#">
  <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
    <tr>
      <td colspan="2"><h1> Manage Account </h1></td>
    </tr>
    <tr>
      <td><strong>Old Password</strong></td>
      <td><input type="password" id="o_password" name="o_password" /><span id="o_password_error"></span></td>
    </tr>
    <tr>
      <td><strong>New Password</strong></td>
      <td><input type="password" id="n_password" name="n_password"  /></td>
    </tr>
    <tr>
      <td><strong>Confirm New Password</strong></td>
      <td><input type="password" id="confirm_password" name="confirm_password"  /></td>
    </tr>
    <tr>
      <td colspan="2" align="right"><button class="radius2" type="button" name="test" id="update_password">Update Password</button>
        <button class="radius2" type="reset" name="test">Reset Password</button></td>
    </tr>
  </table>
</form>
