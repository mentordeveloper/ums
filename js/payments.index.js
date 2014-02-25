// JavaScript Document
function Activate_package(package_id,payer_id)
{
	
	$.ajax({
				url : $('#base_url').val()
						+ 'payments/vp/',
				type : "POST",
				context : document.body,
				cache : false,
				data : "p_id="+package_id+"&payer_id="+payer_id,
				success : function(data) {
					
					var obj_return = JSON.parse(data);
					//alert the error on package change
					if(obj_return['status']=='fail')
					{
						alert(obj_return['msg']);	
					}else
					{
						//submit the package on refund policy
						
						var click_id = '#package_id_'+package_id;
						
						$('#package_id_'+package_id).val(obj_return['msg']);						
						
						information_notice(package_id);
						
					}
					
					
					
				}
			});
}

function cancel_payment()
{
	$.fancybox.close();	
}

function payment_proceed(package_id)
{
	var click_id = '#package_id_'+package_id;
	
	$('#paypal_form_'+package_id).attr('action',$('#base_url').val()+'payments/change_package');
	$('#paypal_form_'+package_id).submit();
						
}

function information_notice(id)
{
	
	payment_proceed(id);
	
	//var price = $('#price_'+id).val();
//	
//	$.ajax({
//
//		url : $('#base_url').val() + "payments/notification_view/",
//		type : "POST",
//		context : document.body,
//		data : "id=" + id+"&price="+price,
//		cache : false,
//		success : function(data) {
//			
//			$("#msg_user").html(data);			
//			$("#global_use_msg").fancybox().trigger('click');
//			
//		}
//
//	});

		
}