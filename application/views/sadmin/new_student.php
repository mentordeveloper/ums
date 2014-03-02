<script type="text/javascript">
		
		jQuery.validator.addMethod("noSpace", function(value, element) { 
  			return value.indexOf(" ") < 0 && value != ""; 
	    }, "No space please and don't leave it empty");
            
            jQuery.validator.addMethod("lettersonly", function(value, element) { 
                        return this.optional(element) || /^[a-z0-9]+$/i.test(value);
            }, "Please enter only letters or numbers");
		
		function validate_form(){
			
			var myresult = $("#school_form").validate({
										rules: {
											school_name: { 
												 required: true,
                                                                                                 
											},
                                                                                        sub_dname: {
                                                                                                 required: true,
                                                                                                 noSpace: true,
                                                                                                 lettersonly: true,
                                                                                        },
                                                                                                
											school_username: {
												 noSpace: true,
												 required: true,
												},
											school_password: {
												noSpace: true,
												required: true,
												minlength: 5,
											},
											school_email: {
												required: true,
												email: true,
											},
											role: {
												 required: true,
											},
										},
										messages: {
											school_name:{required: "Please enter School Name",
                                                                                        
                                                                                        },
                                                                                         sub_dname: {
                                                                                                 required: "Please enter Subdomain Name",
                                                                                                 noSpace: "There should be no space",
                                                                                                 lettersonly: "Please enter only letters or numbers",
                                                                                        },
											school_username: "Please enter valid School User Name", 
											school_password:{
												required: "Please provide valid Password",
												minlength: "Should be more than 4 characters",
											},
											school_email: { 
												required:"Please enter Email Address",
												email : "Please enter valid Email Address",
											},
											role:{
												required:"Please select School type",
											},
											
										}
			}).form();		
			
			if(myresult){
				add_school_call();			
			}
				
		}					
							
</script><head>



<form class="stdform" id="school_form" name="school_form" action="#">
  <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
    <tr>
      <td colspan="2"><h1> Add new School </h1></td>
        </td>
    </tr>
    <tr>
      <td><strong>School Name</strong></td>
      <td><input type="text"  name="school_name" id="school_name" />
        <span class="icon-asterisk"></span></td>
    </tr>
     <tr>
      <td><strong>School Subdomain Name</strong></td>
      <td><input type="text"  name="sub_dname" id="sub_dname" />
        <span class="icon-asterisk"></span></td>
    </tr>
    <tr>
      <td><strong>School Admin Username</strong></td>
      <td><input type="text"  name="school_username" id="school_username" />
        <span class="icon-asterisk"></span></td>
    </tr>
    <tr>
      <td><strong>School Admin Password</strong></td>
      <td><input type="password"  name="school_password" id="school_password" />
        <span class="icon-asterisk"></span></td>
    </tr>
    <tr>
      <td><strong>School Admin Email</strong></td>
      <td><input type="email"  name="school_email" id="school_email" />
        <span class="icon-asterisk"></span></td>
    </tr>
    <tr>
      <td><strong>School Type</strong></td>
      <td><?php //echo $schools_type; ?> <select name="role" id="role_selection" style="background-color:white; color:black;">
       <option value="">Select Type</option>
        <?php
			  foreach($schools_type as $perrole)
				{
			 ?>
        <option value="<?php echo $perrole['role_name']; ?>"><?php echo $perrole['role_name']; ?></option>
        <?php
				}
		?>
      </select><span class="icon-asterisk"></span></td>
    </tr>
    <tr style="display:none">
      <td ><strong>Status</strong></td>
      <td><input type="checkbox" id="status_school" name="school_active" /></td>
    </tr>
    <tr>
      <td colspan="2" id="error"></td>
    </tr>
    <tr>
      <td colspan="2"><button class="radius2" onclick="validate_form()" type="button">Add School</button>
        <button type="reset" class="radius2">Reset</button>
        </td>
    </tr>
  </table>
</form>
