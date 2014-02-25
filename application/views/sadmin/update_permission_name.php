

<script type="text/javascript">
/*$(document).ready(function(){
	
	});	*/
		</script>
<form id="skool_perm_form" class="stdform" action="#" method="post" >
  <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
    <tr>
      <td colspan="2"><h2>Update Permission</h2></td>
    </tr>
    <tr>
      <td>Permission Name</td>
      <td><input type="text" id="name" name="name" disabled value=" <?php echo $permission['permission_name'];  ?>" /></td>
    </tr>
    <tr>
      <td>Permission Mask Name</td>
      <td><input type="text" name="mask_name" id="mask_name_permission" value="<?php echo $permission['permission_mask_name'];  ?>" /></td>
    </tr>
    <tr>
      <td colspan="2" id="success_get"></td></tr>
      <tr>
      <td colspan="2"class="error"></td>
    </tr>
    
    <tr>
      <td colspan="2" align="right"><div class="par">
          <div class="field">
            <button class="radius2" id="perm_update" name="test"  type="button">Update</button>
          </div>
        </div></td>
    </tr>
   <input type="hidden" id="mask_id_permission" name="test" value="<?php echo $permission['id'];  ?>" />
  </table>
</form>
