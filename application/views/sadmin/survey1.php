<?php
	
		$total  = $data_query['Student']+$data_query['Teacher']+$data_query['Admin']+$data_query['pos']+$data_query['other'];
		
		$ratio1 = ($data_query['Student']/$total)*100;
		
		$ratio2 = ($data_query['Teacher']/$total)*100;
		
		$ratio3 = ($data_query['Admin']/$total)*100;
		
		$ratio4 = ($data_query['pos']/$total)*100;
		
		$ratio5 = ($data_query['other']/$total)*100;
	
	 ?>

<div style="float:left;width:100%;;margin-bottom:100px;">
  <div style="background-color:#CCC;width:100%;height:30px;float:left">
    <div style="background-color:#393;width:<?php echo $ratio1; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px">
      <center>
        <?php  if($data_query['Student']!=0){  ?>
        <?php  echo $data_query['Student'].'('.round($ratio1,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F00;width:<?php echo $ratio2; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['Teacher']!=0) { ?>
        <?php  echo $data_query['Teacher'].'('.round($ratio2,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#000;width:<?php echo $ratio3; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['Admin']!=0){  ?>
        <?php  echo $data_query['Admin'].'('.round($ratio3,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F33;width:<?php echo $ratio4; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['pos']!=0){  ?>
        <?php  echo $data_query['pos'].'('.round($ratio4,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#30F;width:<?php echo $ratio5; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['other']!=0){  ?>
        <?php  echo $data_query['other'].'('.round($ratio5,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
  </div>
  <div style="background-color:#CCC;width:100%;height:30px;float:left">
    <div style="background-color:#393;width:<?php echo $ratio1; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px">
      <center>
        <?php  if($data_query['Student']!=0){  ?>
        Student
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F00;width:<?php echo $ratio2; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['Teacher']!=0){  ?>
        Teacher
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#000;width:<?php echo $ratio3; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['Admin']!=0){  ?>
        Admin
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F33;width:<?php echo $ratio4; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['pos']!=0){  ?>
        POS
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#30F;width:<?php echo $ratio5; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['other']!=0){  ?>
        other
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
