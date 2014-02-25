
$(document).ready(function() {

           $.validator.addMethod("strongpassword", function(value, element) {

           var regex = /(?=.{7,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i;


           if(regex.test(value))
           return true;
           else 
           return false;

        }, "Should strong password"); 

        $("#reset_pwd_strong").live("click",function(){
			
			
           var myresult = $("#reset_form_strong").validate({

                                                                   rules: {
                                                                           new_password: {
                                                                                   required: true,
                                                                                   strongpassword: $("value").val(),
                                                                           },
                                                                   },
                                                                   messages: {
                                                                           new_password:{
                                                                                   required:"Please provide new password",
                                                                                   strongpassword:"Please Add a Strong Password which should contain at least 7 characters,one uppercase and lowercase letter and one numeric or special character!",
                                                                           },
                                                                           },
                                                                   highlight: function (element) { // hightlight error inputs
                                                                                $(element).closest(".control-group").addClass("error"); // set error class to the control group
                                                                            },

                                                                   success: function (label) {
                                                                                label.closest(".control-group").removeClass("error");
                                                                                label.remove();
                                                                            },

                                                                   errorPlacement: function (error, element) {
                                                                                 error.addClass("help-inline").insertAfter(element.closest(".controls"));
                                                                            }

           }).form();	

           if(myresult){
                 Go_new_password($("#up_pwd").val());
           }

        });	



       $("#reset_pwd").live("click",function(){
            
           var myresult = $("#reset_form_simple").validate({

                                                                   rules: {
                                                                           new_password: {
                                                                                   required: true,
                                                                                   minlength: 5,
                                                                           },
                                                                   },
                                                                   messages: {
                                                                           new_password:{
                                                                                   required: "Please provide new password",
                                                                                   minlength: "Should be more than 4 characters",
                                                                           },
                                                                 },	  
                                                                    highlight: function (element) { // hightlight error inputs
                                                                         $(element).closest(".control-group").addClass("error"); // set error class to the control group
                                                                   },

                                                                   success: function (label) {
                                                                         label.closest(".control-group").removeClass("error");
                                                                   label.remove();
                                                                   },

                                                                   errorPlacement: function (error, element) {
                                                                           error.addClass("help-inline").insertAfter(element.closest(".controls"));
                                                                   },
                                                                           }).form();	

           if(myresult){
                           Go_new_password($("#up_pwd").val());
           }

});	


});