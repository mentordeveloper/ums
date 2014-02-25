<script type="text/javascript">
	
	$(function(){	
				
		$("a#ajax_call_information").fancybox(
				{
					'scrolling' : 'auto',
					'centerOnScroll' : true
				}
		);
	
	});
	
</script>
<?php foreach($data_survey_all as $persuvey){ ?>

<tr id="row_<?php echo $persuvey['id']; ?>">
  <td align="center"><?php echo $persuvey['id']; ?></td>
  <td align="center"><?php echo str_replace('"','',$persuvey[$field_name]); ?></td>
  <td align="center"><a class="btn btn_trash" href="#" onclick="remove_this_info('<?php echo $persuvey['id']; ?>','<?php echo $field_name; ?>')" style="background-color: rgb(247, 247, 247);"> <span>Remove</span> </a></td>
  <td width="20%"><center>
      <a id="ajax_call_information" href="<?php echo base_url().'sadmin/get_user_detatils/'.$persuvey['id']; ?>" class="btn btn_info"><span>Info</span></a>
    </center></td>
</tr>
<?php } ?>
