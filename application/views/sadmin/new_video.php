<script type="text/javascript">
		
		$('#new_video').click(function(){
			var myresult = $("#video_form").validate({
										rules: {
											text: "required",
											video: 
											{
												required: true,
											},
										},
										messages: {
											text: '<div class="notification msgerror"><a class="close"></a><p>Please enter Text</p></div>',
											video: {
												required: '<div class="notification msgerror"><a class="close"></a><p>Please enter Video code</p></div>', 
											},
										}
			}).form();		
			
			if(myresult){
				add_video_call();		
			}
				
		});		
			
		$('#update_video').click(function(){
			
			var myresult = $("#video_form").validate({
										rules: {
											text: "required",
											video: 
											{
												required: true,
											},
										},
										messages: {
											text: '<div class="notification msgerror"><a class="close"></a><p>Please enter Text</p></div>',
											video: {
												required: '<div class="notification msgerror"><a class="close"></a><p>Please enter Video code</p></div>', 
											},
										}
			}).form();		
			
			if(myresult){
				update_video_call();		
			}
				
		});		
		
							
</script>


<form id="video_form" class="stdform">
  <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
    <tr>
      <td colspan="2"><h1>
          <?php if(isset($faqs['video'])) {?>
          Update Video
          <?php }else{ ?>
          Add new Video
          <?php } ?>
        </h1></td>
    </tr>
    <tr>
      <td valign="top"><strong>Text</strong></td>
      <td><?php if(isset($faqs['text'])){ ?>
        <textarea name="text" cols="10" rows="5" style="width:500px; background-color:white;" id="text" > <?php if(isset($faqs['text'])) echo $faqs['text'];  ?> 
</textarea>
        <?php }else{ ?>
        <textarea  name="text" cols="10" rows="5" style="width:500px; background-color:white;" id="text" ></textarea>
        <?php } ?></td>
    </tr>
    <tr>
      <td valign="top"><strong>Video code</strong></td>
      <td><?php if(isset($faqs['video'])){ ?>
        <textarea name="video" id="video" cols="10" rows="10" style="width:500px; background-color:white;" > <?php if(isset($faqs['video'])) echo $faqs['video'];  ?> 
</textarea>
        <?php }else{ ?>
        <textarea  name="video" id="video" cols="10" rows="10" style="width:500px; background-color:white;" ></textarea>
        <?php } ?></td>
    </tr>
    <tr>
      <td><strong>Status</strong></td>
      <td><input type="checkbox" <?php if(isset($faqs['status']) && $faqs['status']=='true'){ ?>  checked="checked"  <?php }  ?> id="status_video" name="status_video" /></td>
    </tr>
    <tr>
      <td colspan="2"><?php if(isset($faqs['video'])) {?>
        <button class="radius2" type="button" name="test" id="update_video">Update Video</button>
        <input type="hidden" name="id_update" id="id_update" value="<?php echo $faqs['id']; ?>" />
        <input type="hidden" name="id_row" id="id_row" value="<?php echo $row_id; ?>" />
        <?php }else{ ?>
        <button class="radius2" type="button" name="test" id="new_video">Add Video</button>
        <?php } ?>
        <button class="radius2" type="reset" name="test" id="add_faq">Reset</button></td>
        </td>
    </tr>
  </table>
</form>
