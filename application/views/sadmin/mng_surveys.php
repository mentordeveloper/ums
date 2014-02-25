<?php if(isset($comefrom) && $comefrom!='ajax') { ?>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function(){

 		
		$('#test').click(function(){
			
			var myresult = $(".stdform").validate({
										rules: {
											valuefilter: {
												required:true,
											},
											questions_all_check:
											{
												required:true,
												
											},
										},
										messages: {
											valuefilter:{
												required: "Please enter Filter",
											},
											questions_all_check:
											{
												required: "Please select your question",
											},
										}
			}).form();		
			
			if(myresult){
				add_filter();			
			}
				
		});		
	});	
		</script>

<div class="maincontent noright">
<div class="maincontentinner">
  <ul class="maintabmenu">
    <li class="current"><a href="<?php echo base_url(); ?>sadmin/mng_surveys">Surveys Administration</a></li>
  </ul>
  <div class="content">
    <div class="contenttitle radiusbottom0">
      <h2 class="table"><span>Add Filter</span></h2>
    </div>
    <form  class="stdform" action="#" method="post" >
      <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable123">
        <tr>
          <td><b>Choose your filter </b></td>
          <td><?php echo $form['questions_all_check']; ?></td>
        </tr>
        <tr>
          <td></td>
          <td><input type="text" id="valuefilter" name="valuefilter" value="" width="50px !important" size="100em !important" style="width:435px;" />
            </br>
            </br>
            <button class="stdbtn"  id="test" name="test"  type="button">Add Filter</button>
            <button class="stdbtn"  onclick="clear_filter()" type="button">Remove All Filters</button></td>
        </tr>
      </table>
    </form>
    <div class="contenttitle radiusbottom0">
      <h2 class="table"><span>Managment</span></h2>
    </div>
    <?php
} 
?>
    <form  class="stdform" action="#" method="post" >
      <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable123">
        <?php  if($field_name=='none'){ ?>
        <tr>
          <td><b>Search surveys by questions</b></td>
          <td><?php echo $questions_all;  ?></td>
        </tr>
        <?php } ?>
        <?php  if(isset($action) && $action=='text' || $field_name=='none'){ ?>
      </table>
    </form>
    <ul>
      <?php
   		$master_array = $this->session->userdata('filter');
		if(is_array($master_array))
		{
			foreach($master_array as $counter=>$peritem)
			{
				$keys = array_keys($peritem);
				echo '<a href="" class="anchorbutton button_alert growl"><span>'.$keys[0].'='.$peritem[$keys[0]].'</span></a>';	
			}
		}
   
   ?>
    </ul>
    <?php  } ?>
    <div id="clear_all">
      <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
        <?php if($field_name=='none'){ ?>
        <?php
            $this->load->view('sadmin/survey4');
			?>
      </table>
      <?php  }else{  ?>
      <?php 
  
  if($action=='selective'){
		
		if($field_name=='using_school_website'  || $field_name=='using_school_mobile_app')
		{
			$this->load->view('sadmin/survey8');
			die;
				
		}
		
		if($field_name=='own_smartphone_no_option')
		{
			$this->load->view('sadmin/survey7');
			die;
				
		}
		
		if($field_name=='role_in_school')
		{
			$this->load->view('sadmin/survey1');
			die;
		}
		
		if($field_name=='level_of_school')
		{
			$this->load->view('sadmin/survey6');
			die;
		}
		
			$this->load->view('sadmin/survey2');
				
		}elseif($action=='multiple'){
		
			$this->load->view('sadmin/survey3');
			
		}else{
			
			$this->load->view('sadmin/survey5');
		}
		?>
      </table>
      <?php } ?>
    </div>
  </div>
</div>
<input type="hidden" value="<?php echo base_url(); ?>" id="base_url" />
<?php if(isset($comefrom) && $comefrom!='ajax'){?>
<? $this->load->view('sadmin/footer'); ?>
<?php } ?>
