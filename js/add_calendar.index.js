//// JavaScript Document
//
//$(document).ready(	function() {
//	
//	$('#btn_add_calendar').click(function(){
//		
//		var success = $('#add_cal_form').validate(
//									{
//										rules : {
//											name : {
//														required : true,
//											},
//											keywords : {
//														required : true,
//											},
//											descriptions : {
//														required : true,
//											},
//										},
//										messages : {
//											name : {
//													required : "Please enter name",
//											},
//											keywords : {
//													required : "Please enter keyword",
//											},
//											descriptions : {
//													required : "Please enter description",
//											},
//										},
//										highlight : function(element) { 
//										
//											$(element)
//													.closest('.control-group')
//													.addClass('error');
//										},
//										success : function(label) {
//											label.closest('.control-group')
//											.removeClass('error');
//											label.remove();
//										},
//										errorPlacement : function(error,
//												element) {
//											error
//													.addClass('help-inline')
//													.insertAfter(
//															element
//																	.closest('.controls'));
//										},
//									});
//		
//		
//		if(success)
//		{
//			
//			
//				
//		}
//		
//	});
//	
//});


$(document).ready(function(){
    
        TableAdvanced.init();
        
});



