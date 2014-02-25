$(document).ready(function(){
        
	$('#send_notification').click(function(){
		$("#send_notificationstrigger").fancybox().trigger('click');
	});
		
	$('#importexportoption').click(function(){
		$("#importexportoptiontrigger").fancybox().trigger('click');
	});		
	
	$(".email_check_always").fancybox();
		
	$('#myTab a').click(function (e) {
	    $(this).tab('show');	
	});

	$("#zain").click(function () {
        $('#to').val($(this).siblings("input[type=text]").val());	
		$('#email_add').submit();
	});	
		
});


function mails_forward(id)
{
	$.ajax({
											
				url: $('#base_url').val()+"messaging/mail_forwarding",
				type: "GET",
				context: document.body,
				data : "id="+id,
				cache: false,
				success: function(data){												
										
								$('#row_'+id).hide();
																											
				}
												
		 });	
}		

function Send_email(id)
{
 
  								$.ajax({
											
													url: $('#base_url').val()+"messaging/addchat",
													type: "GET",
													context: document.body,
													data : "id="+id,
													cache: false,
													success: function(data){												
														
																$('#row_'+id).hide();
																																
														}
														
											});	
	
	

}  

function remove_ajax(id)
{

									$.ajax({
											
													url: $('#base_url').val()+"messaging/update_mail_status",
													type: "GET",
													context: document.body,
													data : "id="+id,
													cache: false,
													success: function(data){												
														
																$('#row_'+id).hide();
																																
														}
														
											});	
	
	
}	


function remove_inbox_ajax(id)
{

									$.ajax({
											
													url: $('#base_url').val()+"messaging/update_inbox_status",
													type: "GET",
													context: document.body,
													data : "id="+id,
													cache: false,
													success: function(data){												
														
																$('#row1_'+id).hide();
																																
														}
														
											});	
	
		

}	


function remove_trash_ajax(id)
{
						
									$.ajax({
											
													url: $('#base_url').val()+"messaging/trash_delete",
													type: "GET",
													context: document.body,
													data : "id="+id,
													cache: false,
													success: function(data){												
														
																$('#row2_'+id).hide();
																																
														}
														
											});	
	

}	
function remove_mail_trash(id)
{

						$('<div></div>').appendTo('body').html('<div><h6>Are you sure to delete forever?</h6></div>')
									.dialog({
										modal: true, title: 'deleting confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: {
											Yes: function () {
												remove_trash_ajax(id);
												$(this).dialog("close");
											},				
											No: function () {
												$(this).dialog("close");
											}
										},
										close: function (event, ui) {
											$(this).remove();
										}
									});
									
          

}
function remove_inbox_mail(id)
{


						$('<div></div>').appendTo('body').html('<div><h6>Are you sure to move to trash?</h6></div>')
									.dialog({
										modal: true, title: 'deleting confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: {
											Yes: function () {
												remove_inbox_ajax(id);
												$(this).dialog("close");
											},				
											No: function () {
												$(this).dialog("close");
											}
										},
										close: function (event, ui) {
											$(this).remove();
										}
									});


}

function remove_mail_mine(id)
{


						$('<div></div>').appendTo('body').html('<div><h6>Are you sure to move to trash?</h6></div>')
									.dialog({
										modal: true, title: 'deleting confirmation', zIndex: 10000, autoOpen: true,
										width: 'auto', resizable: false,
										buttons: {
											Yes: function () {
												remove_ajax(id);
												$(this).dialog("close");
											},				
											No: function () {
												$(this).dialog("close");
											}
										},
										close: function (event, ui) {
											$(this).remove();
										}
									});
									
          	

}


   function checkFrame() {
	   
       	var iframe = document.getElementById("upload_iframe");

        if(iframe == null) return true;
        else {
            if(iframe.document == null)
                return false;
            else
                return true;
        }
    }
