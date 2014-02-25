<script type="text/javascript">
			
		jQuery.validator.addMethod("noSpace", function(value, element) { 
  			return value.indexOf(" ") < 0 && value != ""; 
	    }, "No space please and don't leave it empty");
		
		$('#update_school').click(function(){
			
			var myresult = $("#update_form").validate({
										rules: {
											school_username: {
												 noSpace: true,
												 required: true,
												},
											schoo: {
												required: true,
												minlength: 5,
											},
											school_email: {
												required: true,
												email: true,
											},
											
										},
										messages: {
											
											school_username: "Please enter valid School UserName", 
											schoo:{
												required: "Please provide Password",
												minlength: "Should be more than 4 characters",
											},
											school_email: { 
												required:"Please enter Email Address",
												email : "Please enter valid Email Address",
											},
											
										}
			}).form();		
			
			if(myresult){
				update_school_call();		
			}
				
		});		
		
</script>
<head>

<form class="stdform" id="update_form" name="school_form" action="#">
  <?php 
       
 if(!empty($schools_chek)) {?>
  <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
    <tr>
      <td colspan="2"><h1>
          <?php if(isset($schools['name'])) {?>
          Update School
          <?php }else{ ?>
          Add new School
          <?php } ?>
        </h1></td>
        </td>
    </tr>
    <tr>
      <td><strong>School Name</strong></td>
      <td><?php if(isset($schools['name'])){ ?>
        <input type="text" disabled="disabled"  value="<?php if(isset($schools['name'])) echo $schools['name'];  ?>" name="school_name" id="school_name" />
        <span class="icon-asterisk"></span>
        <?php }else{ ?>
        <input type="text"  name="school_name" id="school_name" />
        <span class="icon-asterisk"></span>
        <?php } ?></td>
    </tr>
    <tr>
      <td><strong>School Subdomain Name</strong></td>
      <td><?php if(isset($schools['name'])){ ?>
        <input type="text" disabled="disabled"  value="<?php if(isset($schools['school_subdomain'])) echo $schools['school_subdomain'];  ?>" name="sub_dname" id="sub_dname" />
        <span class="icon-asterisk"></span>
        <?php }else{ ?>
        <input type="text"  name="sub_dname" id="sub_dname" />
        <span class="icon-asterisk"></span>
        <?php } ?></td>
    </tr>
    <tr>
      <td><strong>School Admin Username</strong></td>
      <td><?php if(isset($schools['school_username'])){ ?>
        <input type="text"  value="<?php if(isset($schools['school_username'])) echo $schools['school_username'];  ?>" name="school_username" id="school_username" />
        <span class="icon-asterisk"></span>
        <?php }else{ ?>
        <input type="text"  name="school_username" id="school_username" />
        <span class="icon-asterisk"></span>
        <?php } ?></td>
    </tr>
    <tr>
      <td><strong>School Admin Password</strong></td>
      <td><input type="password"  name="school_password" id="school_password" />
        <span class="icon-asterisk"></span></td>
    </tr>
    <tr>
      <td><strong>School Admin Email</strong></td>
      <td><?php if(isset($schools['school_email'])){ ?>
        <input type="email"  value="<?php if(isset($schools['school_email'])) echo $schools['school_email'];  ?>" name="school_email" id="school_email" />
        <span class="icon-asterisk"></span>
        <?php }else{ ?>
        <input type="email"  name="school_email" id="school_email" />
        <span class="icon-asterisk"></span>
        <?php } ?></td>
    </tr>
    <?php if(!empty($schools_type)) {?>
    <tr>
      <td><strong>School Type</strong></td>
      <td><?php echo $schools_type; ?> <span class="icon-asterisk"></span></td>
    </tr>
    <?php } ?>
    <tr style="display:none">
      <td ><strong>Status</strong></td>
      <td><input type="checkbox" <?php if(isset($schools['status']) && $schools['status']=='true'){ ?>  checked="checked"  <?php }  ?> id="status_school" name="school_active" /></td>
    </tr>
    <tr>
      <td colspan="2"><button class="radius2" id="update_school" type="button">Update School</button>
        <input type="hidden" name="id_update" id="id_update" value="<?php echo $schools['id'] ?>" />
        <button class="radius2" type="reset">Reset</button></td>
    </tr>
    <?php }
	 else { ?>
    <tr>
      <td ><strong>Please Add School Type!</strong></td>
    </tr>
  </table>
  <?php } ?>
</form>
