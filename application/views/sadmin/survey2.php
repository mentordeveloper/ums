<?php


        $total  = $data_query['yes']+$data_query['no']+$data_query['other'];
		
		
			$ratio1 = '';
		$ratio2 = '';
		$ratio3 = '';
		
		if($data_query['yes']!=0)$ratio1 = ($data_query['yes']/$total)*100;
		
		if($data_query['no']!=0)$ratio2 = ($data_query['no']/$total)*100;
		
		if($data_query['other']!=0)$ratio3 = ($data_query['other']/$total)*100;
	
	 ?>

<div style="float:left;width:100%;;margin-bottom:100px;">
  <div style="background-color:#CCC;width:100%;height:30px;float:left">
    <div style="background-color:#393;width:<?php echo $ratio1; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px">
      <center>
        <?php  if($data_query['yes']!=0){  ?>
        <?php  echo $data_query['yes'].'('.round($ratio1,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F00;width:<?php echo $ratio2; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['no']!=0) { ?>
        <?php  echo $data_query['no'].'('.round($ratio2,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#000;width:<?php echo $ratio3; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['other']!=0){  ?>
        <?php  echo $data_query['other'].'('.round($ratio3,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
  </div>
  <div style="background-color:#CCC;width:100%;height:30px;float:left">
    <div style="background-color:#393;width:<?php echo $ratio1; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px">
      <center>
        <?php  if($data_query['yes']!=0){  ?>
        Yes
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F00;width:<?php echo $ratio2; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['no']!=0){  ?>
        No
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#000;width:<?php echo $ratio3; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['other']!=0){  ?>
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
