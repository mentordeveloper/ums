$(document).ready(function() {

            /*
             * Validation for login form
             */
            $("#password").keydown(function(e) {
                if (e.keyCode == 13) {
                    loginAction($("#is_parent_form").val());
                }
            })

            $('#log_me_in')
                    .click(
                    function() {
                        
                        loginAction($("#is_parent_form").val());
                    });

});
function loginAction(a_p) {

    var log_me_in_result = $("#form_login")
            .validate(
            {
                rules: {
                    email: "required",
                    password: "required",
                },
                messages: {
                    email: "Please Enter Username!",
                    password: "Please Enter Password!",
                },
                highlight: function(
                        element) { // hightlight
                    // error
                    // inputs
                    $(element)
                            .closest(
                            '.control-group')
                            .addClass(
                            'error'); // set
                    // error
                    // class
                    // to
                    // the
                    // control group
                },
                success: function(
                        label) {
                    label
                            .closest(
                            '.control-group')
                            .removeClass(
                            'error');
                    label.remove();
                },
                errorPlacement: function(error, element) {
                    error.addClass('help-inline').insertAfter(element.closest('.controls'));
                },
            }).form();

    /*
     * if successfully validate form
     */

    if (log_me_in_result) {

        var username = $('#email').val();
        if(username=='')
            username = document.getElementById('email').value;
        var password = $('#password').val();
        var rememberme = $('#rememberme').is(':checked');
        var l_url = $('#base_url').val() + "login/validate"; 
        if(a_p=='2')
            l_url = $('#base_url').val() + "login/validate_parent"; 
        $.ajax({
//            url: $('#base_url').val() + "login/validate",
            url: l_url,
            type: "POST",
            data: {email: username, password: password, get: "ajax", remember: rememberme},
            context: document.body,
            cache: false,
            success: function(data) {

                //$('#error_login').hide();
                
                //console.log(data);
                
                if (data == 1) {

                    /*
                     * for session out logical work
                     */
                    
                    
                    
                    if ($('#url').val() != '')
                    {
                        window.parent.location = $('#url').val();
                    }

                    window.location = $('#base_url').val() + 'login/loggedin';

                } else {

                    $('#error_login').html('<button class="close" data-dismiss="alert"></button><strong></strong>' + data).fadeIn("fast");
                }

            }
        });

    }

}

