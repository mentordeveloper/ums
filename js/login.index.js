
$(document).ready(function() {

    $("a#contact_us_new").fancybox();
    $("#loginform").validate({
        rules: {
            email: "required",
            password: {
                required: true,
            },
        },
        messages: {
            email: "Please provide username",
            password: {
                required: "Please provide password",
            },
        }
    });

    $.fancybox.init();

    $("a#contact_us").fancybox();

    $("#reset_login").click(function() {
        reset_login_form();
    });

});

function validate_email(emailAddress)
{
    var emailRegex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i);
    var valid = emailRegex.test(emailAddress);

    if (!valid) {
        return false;
    } else
        return true;
}

function reset_login_form()
{
    $('#admin_name').val('');
    $('#admin_password').val('');
}

function email_me()
{

    if ($('#user_name').val() == '')
    {
        $('#errors_space').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong>Pleas enter your name!</div></div>');

        return;
    }

    if ($('#email_user').val() == '')
    {
        $('#errors_space').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong>Pleas enter your email!</div></div>');
        return;
    }

    if ($('#message_user').val() == '')
    {
        $('#errors_space').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong>Pleas enter your message!</div></div>');
        return;
    }

    if (!validate_email($('#email_user').val()))
    {

        $('#errors_space').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong>Please provide valid email address!</div></div>');
        return;
    }


    $.ajax({
        url: $('#base_url').val() + "contactus/email_thanks",
        type: "GET",
        context: document.body,
        data: "username=" + $('#user_name').val() + "&email=" + $('#email_user').val() + "&message=" + $('#message_user').val(),
        cache: false,
        success: function(data) {

            $('#data_get').html(data);
            $("#email_thanks").fancybox().trigger('click');

            setTimeout(function() {
                $.fancybox.close();
            }, 1300);

        }

    });



}


