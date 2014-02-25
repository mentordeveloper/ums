<?php
	
		$total  = $data_query['Daily']+$data_query['toto3']+$data_query['Weekly']+$data_query['totopermonth']+$data_query['monthlu']+$data_query['ltpm']+$data_query['never'];
		
		
		$ratio1 = '';
		$ratio2 = '';
		$ratio3 = '';
		$ratio4 = '';
				$ratio5 = '';
						$ratio6 = '';
								$ratio7 = '';
		
		if($data_query['Daily']!=0)$ratio1 = ($data_query['Daily']/$total)*100;
		
		if($data_query['toto3']!=0)$ratio2 = ($data_query['toto3']/$total)*100;
		
		if($data_query['Weekly']!=0)$ratio3 = ($data_query['Weekly']/$total)*100;
		
		if($data_query['totopermonth']!=0)$ratio4 = ($data_query['totopermonth']/$total)*100;
		
		if($data_query['monthlu']!=0)$ratio5 = ($data_query['monthlu']/$total)*100;
		
		if($data_query['ltpm']!=0)$ratio6 = ($data_query['ltpm']/$total)*100;
		
		if($data_query['never']!=0)$ratio7 = ($data_query['never']/$total)*100;
	
	 ?>

<div style="float:left;width:100%;;margin-bottom:100px;">
  <div style="background-color:#CCC;width:100%;height:30px;float:left">
    <div style="background-color:#393;width:<?php echo $ratio1; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px">
      <center>
        <?php  if($data_query['Daily']!=0){  ?>
        <?php  echo $data_query['Daily'].'('.round($ratio1,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F00;width:<?php echo $ratio2; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['toto3']!=0) { ?>
        <?php  echo $data_query['toto3'].'('.round($ratio2,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#000;width:<?php echo $ratio3; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['Weekly']!=0){  ?>
        <?php  echo $data_query['Weekly'].'('.round($ratio3,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F33;width:<?php echo $ratio4; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['totopermonth']!=0){  ?>
        <?php  echo $data_query['totopermonth'].'('.round($ratio4,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#36C;width:<?php echo $ratio5; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['monthlu']!=0){  ?>
        <?php  echo $data_query['monthlu'].'('.round($ratio5,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#33C;width:<?php echo $ratio6; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['ltpm']!=0){  ?>
        <?php  echo $data_query['ltpm'].'('.round($ratio6,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F66;width:<?php echo $ratio7; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['never']!=0){  ?>
        <?php  echo $data_query['never'].'('.round($ratio7,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
  </div>
  <div style="background-color:#CCC;width:100%;height:30px;float:left">
    <div style="background-color:#393;width:<?php echo $ratio1; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px">
      <center>
        <?php  if($data_query['Daily']!=0){  ?>
        Daily
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F00;width:<?php echo $ratio2; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['toto3']!=0){  ?>
        2 to 3 times per week
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#000;width:<?php echo $ratio3; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['Weekly']!=0){  ?>
        Weekly
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#9C6;width:<?php echo $ratio4; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['totopermonth']!=0){  ?>
        Less than monthly
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#36C;width:<?php echo $ratio5; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['monthlu']!=0){  ?>
        monthly
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#33C;width:<?php echo $ratio6; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['ltpm']!=0){  ?>
        Less than monthly
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F66;width:<?php echo $ratio7; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['never']!=0){  ?>
        never
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
