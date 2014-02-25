$(function() {

	$(".datepick").datepicker({
		dateFormat : "yy-mm-dd",
	});
	

});


	$('#btn_notif').click(function(){
			
			var myresult = $("#notif_formz").validate({
				
				rules: {
				notif_text: {
					required: true,
					
				},
				start_date: {
					required: true,
					
				},
				
				end_date: {
					required: true,
					
				},
			
			},
			messages: {
		
				notif_text: {
					required :"Please enter announcement",
				
					
				},
				start_date: {
					required :"Please enter start date",
					
					
				},
				end_date: {
					required: "Please enter end date",
				},
				
			  }
			}).form();		
			
			if(myresult){
				add_notifier();		
			}
				
		});

	$('#btn_update').click(function(){

			
			var myresult1 = $("#notif_formz").validate({
				
				rules: {
				notif_text: {
					required: true,
					
				},
				start_date: {
					required: true,
					
				},
				
				end_date: {
					required: true,
					
				},
			
			},
			messages: {
		
				notif_text: {
					required :"Please enter announcement",
				
					
				},
				start_date: {
					required :"Please enter start date",
					
					
				},
				end_date: {
					required: "Please enter end date",
				},
				
			  }
			}).form();		
			
			if(myresult1){
		update_notifier();		
			}
				
		});


function add_notifier()
{

	if($('#start_date').val()<= $('#end_date').val())
	{
			$.ajax({
										url: $('#base_url').val()+"sadmin/add_notifier",
										type: "POST",
										context: document.body,
										data: "text="+$('#notif_text').val()+"&status="+$('input[name="active"]:checked').val()+"&start_date="+$('#start_date').val()+"&end_date="+$('#end_date').val(),
										cache: false,
										success: function(data){
																												
												$('#school').html('<div class="notification msgsuccess"><p>Announcement Saved!</p></div>');
												$("#added_school").fancybox().trigger('click');
												  setTimeout(function() {
													$.fancybox.close();
												  }, 1300);						
											}
									});

	$('#start_date').val('');
	$('#end_date').val('');
	$('#notif_text').val('');
	$('#active').val('');
	}else
	{
			$('#school').html('<div class="notification msgerror"><p>Start-date is greater than End-date!</p></div>');
			$("#added_school").fancybox().trigger('click');
			  setTimeout(function() {
				$.fancybox.close();
			  }, 1300);	
	}
}	

function update_notifier()
{
	if($('#start_date').val()<= $('#end_date').val())
	{

							$.ajax({
										url: $('#base_url').val()+"sadmin/update_notifier",
										type: "POST",
										context: document.body,
										data: "id="+$('#ann_id').val()+"&text="+$('#notif_text').val()+"&status="+$('input[name="active"]:checked').val()+"&start_date="+$('#start_date').val()+"&end_date="+$('#end_date').val(),
										cache: false,
										success: function(data){
																												
												$('#school').html('<div class="notification msgsuccess"><p>Updated Successfully!</p></div>');
												$("#added_school").fancybox().trigger('click');
												  setTimeout(function() {
													$.fancybox.close();
												  }, 1300);						
											}
									});
									
	
	}else
	{
			$('#school').html('<div class="notification msgerror"><p>Start-date is greater than End-date!</p></div>');
			$("#added_school").fancybox().trigger('click');
			  setTimeout(function() {
				$.fancybox.close();
			  }, 1300);	
	}								
}


function delete_announcement(id)
{
		$('<div></div>').appendTo('body')
			.html('<div><h5>Delete announcement ?</h5></div>')
				.dialog({
				modal: true, title: 'Delete Confirmation', zIndex: 10000, autoOpen: true,
				width: 'auto', resizable: false,
				buttons: [{
					text: 'Delete',
					click: function() {
						delete_announcement_confirm(id);
						$( this ).remove();
					}
				},
				{
					text: "Cancel",
					click: function() {
						$( this ).remove();
					}
				}
				],
				close: function (event, ui) {
					$(this).remove();
				}
			});
}
function delete_announcement_confirm(id)
{

							$.ajax({
										url: $('#base_url').val()+"sadmin/delete_announcement_by_id",
										type: "POST",
										context: document.body,
										data: "id="+id,
										cache: false,
										success: function(data){
																												
												$('#school').html('<div class="notification msgsuccess"><p>Deleted Successfully!</p></div>');
												$("#added_school").fancybox().trigger('click');
												  setTimeout(function() {
													$.fancybox.close();
												  }, 1300);	
												  
												  $('#row_'+id).hide();

												
											}
									});



}