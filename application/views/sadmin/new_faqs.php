<script type="text/javascript">
		
		
		$('#add_faq').click(function(){
			
			var myresult = $("#faq_form_add").validate({
										rules: {
											question: "required",
											answer: "required",
											category: "required",
											
										},
										messages: {
											question: '<div class="notification msgerror"><a class="close"></a><p>Please Enter Question</p></div>',
											answer: '<div class="notification msgerror"><a class="close"></a><p>Please Enter Answer</p></div>', 
											category: '<div class="notification msgerror"><a class="close"></a><p>Please Select Category</p></div>', 
											
										}
			}).form();		
			
			if(myresult){
				add_faq_call();			
			}
				
		});		
		
		$('#update_faq').click(function(){
			
			var myresult = $("#faq_form_update").validate({
										rules: {
											question: "required",
											answer: "required",
											
										},
										messages: {
											question: '<div class="notification msgerror"><a class="close"></a><p>Please enter Question</p></div>',
											answer: '<div class="notification msgerror"><a class="close"></a><p>Please enter Answer</p></div>',
											
										}
			}).form();		
			
			if(myresult){
				update_faqs_call();		
			}
				
		});		
		
		
							
</script><head>
<style>
.error {
	width: 400px !important;
}
</style>
</head>

<?php if(isset($faqs['question'])) {?>
          <form id="faq_form_update" class="stdform">
          <?php }else{ ?>
          <form id="faq_form_add" class="stdform">
          <?php } ?>

  <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
    <tr>
      <td colspan="2"><h1>
          <?php if(isset($faqs['question'])) {?>
          Update FAQ
          <?php }else{ ?>
          Add new FAQ
          <?php } ?>
        </h1></td>
    </tr>
    <tr>
      <td valign="top"><strong>Question</strong></td>
    </tr>
    <tr>
      <td><?php if(isset($faqs['question'])){ ?>
        <textarea name="question" cols="10" rows="5" style="width:500px; background-color:white;" id="question" ><?php if(isset($faqs['question'])) echo $faqs['question'];  ?></textarea>
        <?php }else{ ?>
        <textarea  name="question" cols="10" rows="5" style="width:500px; background-color:white; "  id="question" ></textarea>
        <?php } ?></td>
    </tr>
    <tr>
      <td valign="top"><strong>Answer</strong></td>
    </tr>
    <tr>
      <td><?php if(isset($faqs['answer'])){ ?>
        <textarea name="answer" id="answer" cols="10" rows="10" style="width:500px; background-color:white;" ><?php if(isset($faqs['answer'])) echo $faqs['answer'];  ?></textarea>
        <?php }else{ ?>
        <textarea  name="answer" id="answer" cols="10" rows="10" style="width:500px; background-color:white;" ></textarea>
        <?php } ?></td>
    </tr>
    <tr>
      <td><strong>Status</strong> &nbsp; 
        <input type="checkbox" <?php if(isset($faqs['status']) && $faqs['status']=='true'){ ?>  checked="checked"  <?php }  ?> id="status_faq" name="status_faq" />
        </td>
    </tr>
	    <tr>
      <td><strong>Category</strong> &nbsp; 
        <select name="category" id="category_selection" style="background-color:white; color:black;">
       
        <?php
			if(isset($faqs['category'])){ ?> 
			<option value="<?php echo $faqs['category']; ?>"><?php echo $cat; ?></option>
				<!--<option selected="selected" value="<?php //echo $faqs['category']; ?>"><?php //echo $cat; ?></option>-->
		<?		foreach($category as $perrole)
				{ if($faqs['category']!= $perrole['id']) {
				?>
				
				<option value="<?php echo $perrole['id']; ?>"><?php echo $perrole['name']; ?></option>
		<?php }}
		}
		  else{ ?>
		  <option value="">Select Type</option>
			<?  foreach($category as $perrole)
				{
			 ?>
        <option value="<?php echo $perrole['id']; ?>"><?php echo $perrole['name']; ?></option>
        <?php
				}
				}
		?>
      </select>
        </td>
    </tr>
    <tr>
      <td colspan="2" id="error"></td>
    </tr>
    <tr>
      <td><?php if(isset($faqs['answer'])) {?>
      
        <button class="radius2" type="button" name="test" id="update_faq">Update Faq</button>
        <input type="hidden" name="id_update" id="id_update" value="<?php echo $faqs['id']; ?>" />
        <input type="hidden" name="id_row" id="id_row" value="<?php echo $row_id; ?>" />
        
        <?php }else{ ?>
        <button class="radius2" type="button" name="test" id="add_faq">Add Faq</button>
        <?php } ?>
        <button class="radius2" type="reset" name="test" >Reset</button></td>
        </td>
    </tr>
  </table>
</form>
