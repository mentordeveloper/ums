$(document).ready(function() {
    var form1 = $("#developerform");
    var error1 = $('.alert-error', form1);
    var success1 = $('.alert-success', form1);
    form1.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-inline', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",
        rules: {
            fname: "required",
            lname: "required",
            uname: "required",
            pwd: {
                required: true,
                minlength: 5,
            },
            emailid: {
                required: true,
                email: true,
            },
        },
        messages: {
            fname: "Please enter your Firstname",
            lname: "Please enter your Lastname",
            uname: "Please enter your School Username",
            pwd: {
                required: "Please provide School Password",
                minlength: "Should be more than 4 characters"
            },
            emailid: {
                required: "Please enter your Email Address",
                email: "please enter Valid Email Address"
            },
        },
        invalidHandler: function(event, validator) { //display error alert on form submit              
            success1.hide();
            //error1.show();
            App.scrollTo(error1, -200);
        },
        highlight: function(element) { // hightlight error inputs
            $(element)
                    .closest('.help-inline').removeClass('ok'); // display OK icon
            $(element)
                    .closest('.control-group').removeClass('success').addClass('error'); // set error class to the control group
        },
        unhighlight: function(element) { // revert the change dony by hightlight
            $(element)
                    .closest('.control-group').removeClass('error'); // set error class to the control group
        },
        success: function(label) {
            label
                    .addClass('valid').addClass('help-inline ok') // mark the current input as valid and display OK icon
                    .closest('.control-group').removeClass('error').addClass('success'); // set success class to the control group
        },
        submitHandler: function(form) {
            success1.show();
            error1.hide();
            form.submit();
        }
    });

});	