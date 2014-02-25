<?php $languages='';?>
<?php

$visbility = '';
$visbility1 = '';
$visbility2 = '';
$visbility3 = '';
$check = '';

// /if type is already set then go for this
$temp_variable='';
if (isset ( $settings [0] ['type'] )) {
	$visbility = $settings [0] ['type'];
	
	if ($visbility == 'quarters') {
	    $temp_variable='Quarter';
		$visbility1 = '';
	} else {
		$visbility1 = 'style="display:none"';
	}
	if ($visbility == 'semester') {
		 $temp_variable='Semester';
		$visbility2 = '';
	} else {
		$visbility2 = 'style="display:none"';
	}
	if ($visbility == 'manual') {
		 $temp_variable='Manual';
		$visbility3 = '';
	} else {
		$visbility3 = 'style="display:none"';
	}
} else {
	// /if type is not set then nothing will be displayed
	
	$visbility1 = 'style="display:none"';
	$visbility2 = 'style="display:none"';
	$visbility3 = 'style="display:none"';
}

?>

<div class="maincontent noright">
<div class="maincontentinner">
  <ul class="maintabmenu">
    <li class="current"><a href="#">Manage Term Settings</a></li>
  </ul>
  <div class="content">
  <?php
			  $msg = $this->input->get('msg');
		
			  if(!empty($msg))
			  {  
				  echo '<div class="notification msgsuccess">
                        <a class="close"></a><p>'.$msg.'</p></div><br/>';
			  }
  ?>
    <div class="contenttitle radiusbottom0">
      <h2 class="table"><span>Managment</span></h2>
    </div>
<form class="stdform" >
        <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
       
        <tr>
			<td>
				Please Choose Term System 
			
				<select class="chosen-with-diselect" id="term_selection" onChange="Modfiy_options()">
				<option value="none">Please select</option>				
				<option value="quarters">Quarters</option>
				<option value="semester">Semesters</option>
				</select>
			</td>
		</tr>
		</form>
    <tr id="quarters_ui" <?php echo $visbility1; ?>>
		<td><?php if($quar_term_existed ==1){  ?>
        <form
				action="<?php echo base_url().'sadmin/update_term_settings' ?>"
				onsubmit="return validate_call(this);" id="check_input"
				method="post" class="form-horizontal">
      <?php }else{ ?>
      <form
					action="<?php echo base_url().'sadmin/save_term_settings' ?>"
					id="check_input" method="post" class="form-horizontal">
        <?php } ?>
        <input type="hidden" value="quarters" name="settings_type" />
					<br>
							   <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
							   
								<tr>
									<td><strong>Spring</strong></td>
									<td><strong>From</strong>
                  <?php if(isset($json_settings['quart']['Spring'][0])){ ?>
                  <input type="text" id="date1" name="Spring[]"  value="<?php echo $json_settings['quart']['Spring'][0]; ?>" class="overall_pickers" >
                  <?php }else{ ?>
                  <input type="text" id="date1" name="Spring[]"
										value="<?php echo $array_default_times[1]; ?>"
										class="overall_pickers" />
                  <?php } ?></td>
									<td><strong>To</strong>
                  <?php if(isset($json_settings['quart']['Spring'][1])){ ?>
                  <input type="text" id="date2" name="Spring[]"
										value="<?php echo $json_settings['quart']['Spring'][1]; ?>"
										class="overall_pickers" />
                  <?php }else{ ?>
                  <input type="text" id="date2" name="Spring[]"
										value="<?php echo $array_default_times[2]; ?>"
										class="overall_pickers" />
                  <?php  } ?>
                  <div></div></td>
								</tr>
								<tr id="break1">
								<tr>
									<td><strong>Summer</strong></td>
									<td><strong>From</strong>
                  <?php if(isset($json_settings['quart']['Summer'][0])){ ?>
                  <input type="text" id="date3" name="Summer1[]"
										value="<?php echo $json_settings['quart']['Summer'][0]; ?>"
										class="overall_pickers" />
                  <?php }else{ ?>
                  <input type="text" id="date3" name="Summer1[]"
										value="<?php echo $array_default_times[3]; ?>"
										class="overall_pickers" />
                  <?php } ?></td>
									<td><strong>To</strong>
                  <?php if(isset($json_settings['quart']['Summer'][1])){ ?>
                  <input type="text" id="date4" name="Summer1[]"
										value="<?php echo $json_settings['quart']['Summer'][1]; ?>"
										class="overall_pickers" />
                  <?php }else{ ?>
                  <input type="text" id="date4" name="Summer1[]"
										value="<?php echo $array_default_times[4]; ?>"
										class="overall_pickers" />
                  <?php } ?>
                  </td>
								</tr>
								<tr id="break2">
								<tr>
									<td><strong>Fall</strong></td>
									<td><strong>From</strong>
                  <?php if(isset($json_settings['quart']['Fall'][0])){ ?>
                  <input type="text" id="date5" name="Fall[]"
										value="<?php echo $json_settings['quart']['Fall'][0]; ?>"
										class="overall_pickers" />
                  <?php }else{ ?>
                  <input type="text" id="date5" name="Fall[]"
										value="<?php echo $array_default_times[5]; ?>"
										class="overall_pickers" />
                  <?php } ?></td>
									<td><strong>To</strong>
                  <?php if(isset($json_settings['quart']['Fall'][1])){ ?>
                  <input type="text" id="date6" name="Fall[]"
										value="<?php echo $json_settings['quart']['Fall'][1]; ?>"
										class="overall_pickers" />
                  <?php }else{ ?>
                  <input type="text" id="date6" name="Fall[]"
										value="<?php echo $array_default_times[6]; ?>"
										class="overall_pickers" />
                  <?php } ?>
                  </td>
								</tr>
								<tr id="break3">
								<tr>
									<td><strong>Winter</strong></td>
									<td><strong>From</strong>
                  
                  <?php if(isset($json_settings['quart']['Winter'][0])){ ?>
                  <input type="text" id="date7" name="Winter[]"
										value="<?php echo $json_settings['quart']['Winter'][0]; ?>"
										class="overall_pickers" />
                  <?php }else{ ?>
                  <input type="text" id="date7" name="Winter[]"
										value="<?php echo $array_default_times[7]; ?>"
										class="overall_pickers" />
                  <?php } ?>
                  </td>
									<td><strong>To</strong>
                  <?php if(isset($json_settings['quart']['Winter'][1])){ ?>
                  <input type="text" id="date8" name="Winter[]"
										value="<?php echo $json_settings['quart']['Winter'][1]; ?>"
										class="overall_pickers" />
                  <?php }else{ ?>
                  <input type="text" id="date8" name="Winter[]"
										value="<?php echo $array_default_times[8]; ?>"
										class="overall_pickers" />
                  <?php } ?>
                 </td>
								</tr>
								<tr id="break4">
              <?php if(isset($block_access) && $block_access==true){  }else{  ?>
              <tr id="quarters_ui_save" <?php echo $visbility1; ?>>
									<td colspan="3" align="right"><?php if($quar_term_existed==1){  ?>
                  <button class="radius2" id="update_1" type="submit">Update
											Settings</button>
                  <?php }else{ ?>
                  <button class="radius2" id="save_1" type="submit">Save
											Settings</button>
                  <?php } ?>
                  <button class="radius2" type="button"
											onClick="Reset_default_new()">Reset to Default</button></td>
								</tr>
              <?php } ?>
              <tr>
									<td colspan="3"><div id="html_overlap"></div></td>
								</tr>
							</table>
						</div>
					</div>
				</form></td>
	
	
	<tr id="semester_ui" <?php echo $visbility2; ?>>

		<td>
		
  <?php

  if($sem_term_existed==1){  ?>
    <form
				action="<?php echo base_url().'sadmin/update_term_settings' ?>"
				onsubmit="return validate_call(this);" id="check_input_1"
				method="post" class="form-horizontal">
  
  <?php }else{ ?>
  <form action="<?php echo base_url().'sadmin/save_term_settings' ?>"
					method="post" class="form-horizontal">
    <?php } ?>
    <input type="hidden" value="semester" name="settings_type" />
					
							   <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
								<tr>
									<td><strong>Spring</strong></td>
									<td><strong>From</strong>
              <?php if(isset($json_settings['sem']['Spring'][0])){   ?>
              <input type="text" id="date11" name="Spring[]"
										value="<?php echo $json_settings['sem']['Spring'][0]; ?>"
										class="overall_pickers m-wrap large" />
              <?php }else{ ?>
              <input type="text" id="date11" name="Spring[]"
										value="<?php echo $array_default_times[9]; ?>"
										class="overall_pickers m-wrap large" />
              <?php } ?></td>
									<td><strong>To</strong>
              <?php if(isset($json_settings['sem']['Spring'][1])){
    
 
    			  ?>
              <input type="text" id="date22" name="Spring[]"
										value="<?php echo $json_settings['sem']['Spring'][1]; ?>"
										class="overall_pickers m-wrap large" />
              <?php }else{ ?>
              <input type="text" id="date22" name="Spring[]"
										value="<?php echo $array_default_times[10]; ?>"
										class="overall_pickers m-wrap large" />
              <?php  } ?>
              </td>
								</tr>
								<tr id="break5">
									</div>
									<tr>
									<td><strong>Summer</strong></td>
									<td><strong>From</strong>
                  <?php if(isset($json_settings['sem']['Summer'][0])){ ?>
                  <input type="text" id="date33" name="Summer1[]"
										value="<?php echo $json_settings['sem']['Summer'][0]; ?>"
										class="overall_pickers" />
                  <?php }else{ ?>
                  <input type="text" id="date33" name="Summer1[]"
										value="<?php echo $array_default_times[11]; ?>"
										class="overall_pickers" />
                  <?php } ?></td>
									<td><strong>To</strong>
                  <?php if(isset($json_settings['sem']['Summer'][1])){ ?>
                  <input type="text" id="date44" name="Summer1[]"
										value="<?php echo $json_settings['sem']['Summer'][1]; ?>"
										class="overall_pickers" />
                  <?php }else{ ?>
                  <input type="text" id="date44" name="Summer1[]"
										value="<?php echo $array_default_times[12]; ?>"
										class="overall_pickers" />
                  <?php } ?>
                  </td>
								</tr>
								<tr id="break6">
								
								<tr>
									<td><strong>Fall</strong></td>
									<td><strong>From</strong>
              <?php if(isset($json_settings['sem']['Fall'][0])){   ?>
              <input type="text" id="date55" name="Fall[]"
										value="<?php echo $json_settings['sem']['Fall'][0]; ?>"
										class="overall_pickers m-wrap large" />
              <?php }else{ ?>
              <input type="text" id="date55" name="Fall[]"
										value="<?php echo $array_default_times[13]; ?>"
										class="overall_pickers m-wrap large" />
              <?php } ?></td>
									<td><strong>To</strong>
              <?php if(isset($json_settings['sem']['Fall'][1])){ ?>
              <input type="text" id="date66" name="Fall[]"
										value="<?php echo $json_settings['sem']['Fall'][1]; ?>"
										class="overall_pickers m-wrap large" />
              <?php }else{ ?>
              <input type="text" id="date66" name="Fall[]"
										value="<?php echo $array_default_times[14]; ?>"
										class="overall_pickers m-wrap large" />
              <?php } ?>
            </td>
								</tr>
								<tr id="break7">
									</div>
          <?php if(isset($block_access) && $block_access==true){  }else{  ?>
          
								
								
								<tr id="semester_ui_save" <?php echo $visbility2; ?>>
									<td colspan="3" align="right"><?php if($sem_term_existed==1){  ?>
              <button class="radius2" value="Update Settings"
											<?php if(isset($block_access) && $block_access==true){ echo 'disabled="disabled"'; }  ?>
											id="update_2" type="submit">Update Settings</button>
              <?php }else{ ?>
              <button class="radius2" id="save_2" type="submit">Save
											Settings</button>
              <?php } ?>
              <button class="radius2" type="button"
											onClick="Reset_default_semester()">Reset to Default</button></td>
								</tr>
          <?php } ?>
          <tr>
									<td colspan="3"><div id="html_overlap_1"></div></td>
								</tr>
							</table>
						</div>
					</div>
				</form>
		</td>
	</tr>
</table> 
 </form>
</div>       
</div>      

<? $this->load->view('sadmin/footer'); ?>

<input type="hidden" id="date1_default"
	value="03-20-<?php echo date('Y'); ?>" class="overall_pickers" />
<input type="hidden" id="date2_default"
	value="06-06-<?php echo date('Y'); ?>" class="overall_pickers" />
<input type="hidden" id="date3_default"
	value="06-07-<?php echo date('Y'); ?>" class="overall_pickers" />
<input type="hidden" id="date4_default"
	value="09-22-<?php echo date('Y'); ?>" class="overall_pickers" />
<input type="hidden" id="date5_default"
	value="09-23-<?php echo date('Y'); ?>" class="overall_pickers" />
<input type="hidden" id="date6_default"
	value="12-21-<?php echo date('Y'); ?>" class="overall_pickers" />
<input type="hidden" id="date7_default"
	value="12-22-<?php echo date('Y'); ?>" class="overall_pickers" />
<input type="hidden" id="date8_default"
	value="03-19-<?php echo date('Y')+1; ?>" class="overall_pickers" />
	
<input type="hidden" id="date11_default"
	value="03-20-<?php echo date('Y'); ?>" class="overall_pickers" />
<input type="hidden" id="date12_default"
	value="06-06-<?php echo date('Y'); ?>" class="overall_pickers" />
<input type="hidden" id="date13_default"
	value="06-07-<?php echo date('Y'); ?>" class="overall_pickers" />

<input type="hidden" id="date14_default"
	value="09-20-<?php echo date('Y'); ?>" class="overall_pickers" />
<input type="hidden" id="date15_default"
	value="09-21-<?php echo date('Y'); ?>" class="overall_pickers" />
<input type="hidden" id="date16_default"
	value="03-19-<?php echo date('Y')+1; ?>" class="overall_pickers" />