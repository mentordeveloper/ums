<?php $total  = $data_query['iPod']+$data_query['iPhone']+$data_query['iPad']+$data_query['Android']+$data_query['Androidt']+$data_query['Blackberry']+$data_query['windows']+$data_query['other']+$data_query['noanswers'];
		
		
			$ratio1 = '';
		$ratio2 = '';
		$ratio3 = '';
		$ratio4 = '';
				$ratio5 = '';
						$ratio6 = '';
						$ratio7 = '';
						$ratio8 = '';
						$ratio9 = '';
		
		if($data_query['iPod']!=0)$ratio1 = ($data_query['iPod']/$total)*100;
		if($data_query['iPhone']!=0)$ratio2 = ($data_query['iPhone']/$total)*100;
		if($data_query['Android']!=0)$ratio3 = ($data_query['Android']/$total)*100;
		if($data_query['Androidt']!=0)$ratio4 = ($data_query['Androidt']/$total)*100;
		if($data_query['Blackberry']!=0)$ratio5 = ($data_query['Blackberry']/$total)*100;
		if($data_query['windows']!=0)$ratio6 = ($data_query['windows']/$total)*100;
		if($data_query['other']!=0)$ratio7 = ($data_query['other']/$total)*100;
		if($data_query['iPad']!=0)$ratio8 = ($data_query['iPad']/$total)*100;
		if($data_query['noanswers']!=0)$ratio9 = ($data_query['noanswers']/$total)*100;
		
		

	 ?>

<div style="float:left;width:100%;;margin-bottom:100px;">
  <div style="background-color:#CCC;width:100%;height:30px;float:left">
    <div style="background-color:#393;width:<?php echo $ratio1; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px">
      <center>
        <?php  if($data_query['iPod']!=0){  ?>
        <?php  echo $data_query['iPod'].'('.round($ratio1,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F00;width:<?php echo $ratio2; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['iPhone']!=0) { ?>
        <?php  echo $data_query['iPhone'].'('.round($ratio2,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#039;width:<?php echo $ratio8; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['iPad']!=0) { ?>
        <?php  echo $data_query['iPad'].'('.round($ratio8,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#990;width:<?php echo $ratio3; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['Android']!=0){  ?>
        <?php  echo $data_query['Android'].'('.round($ratio3,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#396;width:<?php echo $ratio4; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['Androidt']!=0){  ?>
        <?php  echo $data_query['Androidt'].'('.round($ratio4,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#C93;width:<?php echo $ratio5; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['Blackberry']!=0){  ?>
        <?php  echo $data_query['Blackberry'].'('.round($ratio5,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#06F;width:<?php echo $ratio6; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['windows']!=0){  ?>
        <?php  echo $data_query['windows'].'('.round($ratio6,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#9C6;width:<?php echo $ratio7; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['other']!=0){  ?>
        <?php  echo $data_query['other'].'('.round($ratio7,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F60;width:<?php echo $ratio9; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['noanswers']!=0){  ?>
        <?php  echo $data_query['noanswers'].'('.round($ratio9,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
  </div>
  <div style="background-color:#CCC;width:100%;height:30px;float:left">
    <div style="background-color:#393;width:<?php echo $ratio1; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px">
      <center>
        <?php  if($data_query['iPod']!=0){  ?>
        iPod
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F00;width:<?php echo $ratio2; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['iPhone']!=0) { ?>
        iPhone
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#039;width:<?php echo $ratio8; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['iPad']!=0) { ?>
        iPad
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#990;width:<?php echo $ratio3; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['Android']!=0){  ?>
        Android
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#396;width:<?php echo $ratio4; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['Androidt']!=0){  ?>
        Androidt
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#C93;width:<?php echo $ratio5; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['Blackberry']!=0){  ?>
        Blackberry
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#06F;width:<?php echo $ratio6; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['windows']!=0){  ?>
        windows
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#9C6;width:<?php echo $ratio7; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['other']!=0){  ?>
        other
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F60;width:<?php echo $ratio9; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['noanswers']!=0){  ?>
        DNA
        <?php }  ?>
      </center>
    </div>
  </div>
</div>
<table style="width:100% !important" class="table-striped border-simple" cellpadding="10">
<?php foreach($data_survey_all as $persuvey){ ?>
<tr id="row_<?php echo $persuvey['id']; ?>">
  <td align="center"><?php echo $persuvey['id']; ?></td>
  <td align="center"><?php echo str_replace('"','',$persuvey[$field_name]); ?></td>
  <td align="center">
  
  <a class="btn btn_trash" href="#" onclick="remove_this_info('<?php echo $persuvey['id']; ?>','<?php echo $field_name; ?>')" style="background-color: rgb(247, 247, 247);">
<span>Remove</span>
</a>
  
  
  
  
  </td>
  <td width="20%"><center>
      <a id="ajax_call_information" href="<?php echo base_url().'sadmin/get_user_detatils/'.$persuvey['id']; ?>">view more</a>
    </center></td>
</tr>
<?php } ?>
