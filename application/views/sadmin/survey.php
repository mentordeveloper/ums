<?php  if($field_name=='none'){ ?>

<table style="width:100% !important" class="table-striped border-simple" cellpadding="10">
  <tr> <b>Search Surveys by questions <?php echo $questions_all;  ?> </b> </tr>
</table>
<?php } ?>
<?php  if(isset($action) && $action=='text' || $field_name=='none'){ ?>
Choose your filter <?php echo $form['questions_all_check']; ?>
<input type="text" id="valuefilter" value=""  />
<input class="btn" value="Add Filter" type="button" onclick="add_filter()" />
<input class="btn" value="Reset Filter" type="button" onclick="clear_filter()" />
<br/>
<ul>
  <?php
   
   		$master_array = $this->session->userdata('filter');
		
		if(is_array($master_array))
		{
			foreach($master_array as $counter=>$peritem)
			{
				$keys = array_keys($peritem);
				echo '<li><b>'.$keys[0].'='.$peritem[$keys[0]].'</li></b><br/>';	
			}
		}
   
   ?>
</ul>
<?php  } ?>
<div id="clear_all">
  <table style="width:100% !important" class="table-striped border-simple" cellpadding="10">
    <?php if($field_name=='none'){ ?>
    <?php
            $this->load->view('permissions/survey4');
			?>
  </table>
  <?php  }else{  ?>
  <?php 
  
  if($action=='selective'){
		
		if($field_name=='using_school_website'  || $field_name=='using_school_mobile_app')
		{
			$this->load->view('permissions/survey8');
			die;
				
		}
		
		if($field_name=='own_smartphone_no_option')
		{
			$this->load->view('permissions/survey7');
			die;
				
		}
		
		if($field_name=='role_in_school')
		{
			$this->load->view('permissions/survey1');
			die;
		}
		
		if($field_name=='level_of_school')
		{
			$this->load->view('permissions/survey6');
			die;
		}
		
			$this->load->view('permissions/survey2');
				
		}elseif($action=='multiple'){
		
			$this->load->view('permissions/survey3');
			
		}else{
			
			$this->load->view('permissions/survey5');
		}
		?>
  </table>
  <?php } ?>
</div>
<input type="hidden" value="<?php echo base_url(); ?>" id="base_url" />
