// JavaScript Document
var myVar;

myFunction();

function myFunction()
{
			setTimeout(function()
			{
				
				myStopFunction();
				
				
			}, 5000);
}

function myStopFunction()
{
	
								$.ajax({
									url: $('#base_url').val()+"/instructor/check_session_timmer/",
									type: "GET",
									context: document.body,
									cache: false,
									success: function(data){												
											
											if(data=='Bad')
											{
												
											}
											
										}
								});	
	
	myFunction();
}