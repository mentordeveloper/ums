<?php
	
		$total  = $data_query['PreSchool']+$data_query['es']+$data_query['ms']+$data_query['pos']+$data_query['cu']+$data_query['hs'];
		
			$ratio1 = '';
		$ratio2 = '';
		$ratio3 = '';
		$ratio4 = '';
				$ratio5 = '';
						$ratio6 = '';
		
		
		if($data_query['PreSchool']!=0)$ratio1 = ($data_query['PreSchool']/$total)*100;
		
		if($data_query['es']!=0)$ratio2 = ($data_query['es']/$total)*100;
		
		if($data_query['ms']!=0)$ratio3 = ($data_query['ms']/$total)*100;
		
		if($data_query['pos']!=0)$ratio4 = ($data_query['pos']/$total)*100;
		
		if($data_query['cu']!=0)$ratio5 = ($data_query['cu']/$total)*100;
		
		if($data_query['hs']!=0)$ratio6 = ($data_query['hs']/$total)*100;
	
	 ?>

<div style="float:left;width:100%;;margin-bottom:100px;">
  <div style="background-color:#CCC;width:100%;height:30px;float:left">
    <div style="background-color:#393;width:<?php echo $ratio1; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px">
      <center>
        <?php  if($data_query['PreSchool']!=0){  ?>
        <?php  echo $data_query['PreSchool'].'('.round($ratio1,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F00;width:<?php echo $ratio2; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['es']!=0) { ?>
        <?php  echo $data_query['es'].'('.round($ratio2,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#000;width:<?php echo $ratio3; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['ms']!=0){  ?>
        <?php  echo $data_query['ms'].'('.round($ratio3,2).'%)'; ?>
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
        <?php  if($data_query['cu']!=0){  ?>
        <?php  echo $data_query['cu'].'('.round($ratio5,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#C66;width:<?php echo $ratio6; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['hs']!=0){  ?>
        <?php  echo $data_query['hs'].'('.round($ratio5,2).'%)'; ?>
        <?php }  ?>
      </center>
    </div>
  </div>
  <div style="background-color:#CCC;width:100%;height:30px;float:left">
    <div style="background-color:#393;width:<?php echo $ratio1; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px">
      <center>
        <?php  if($data_query['PreSchool']!=0){  ?>
        PS
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#F00;width:<?php echo $ratio2; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['es']!=0){  ?>
        ES
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#000;width:<?php echo $ratio3; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['ms']!=0){  ?>
        MS
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
        <?php  if($data_query['cu']!=0){  ?>
        C/U
        <?php }  ?>
      </center>
    </div>
    <div style="background-color:#C66;width:<?php echo $ratio6; ?>%;height:30px;float:left;color:#FFF;font-weight:bold;text-transform:uppercase;font-family:Arial, Helvetica, sans-serif;padding-top:10px;">
      <center>
        <?php  if($data_query['hs']!=0){  ?>
        HS
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
<?php echo $this->pagination->create_links(); ?>