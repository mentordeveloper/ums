$(document).ready(function() {

    $(".global_adder").fancybox();
    $("#add_news").fancybox();
    $('.my_news').fancybox();
		
});

function addnews() {
    flag = 0;
    if ($('#n_title').val() == '') {
        $('#check_title').html('Please Enter Title!').show().delay(1800)
                .slideUp(2000);
        flag = 1;
    }
	
    if (CKEDITOR.instances['n_des'].getData() == '') {
        $('#check_des').html(
                '<span style="color:red">Please Enter Description!</span>')
                .show().delay(1800).slideUp(2000);
        flag = 1;
    }
	
    if (flag == 1) {
        return;
    } else

    {
        $
                .post(
                $('#base_url').val() + "permissions/save_news",
                {
                    title: $('#n_title').val(),
                    des: CKEDITOR.instances['n_des'].getData()
                },
        function(data) {
            $('#course')
                    .html(
                    '<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Record Saved!</strong></div>');

            $("#added_course").fancybox().trigger('click');

            setTimeout(function() {
                $.fancybox.close();
            }, 1300);

            $("#html_ajax").html(data);

        });
    }

}
function remove_news(id) {
    $
            .ajax({
        url: $('#base_url').val() + "permissions/removenews",
        type: "GET",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {

            $('#row_' + id).hide();

            $('.page-content .row-fluid  .span12 #test_form .alert').remove();

            $('.page-content .row-fluid  .span12 #test_form')
                    .prepend(
                    '<div style="margin-bottom:5px; !important;" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success :</strong> Removed Successfully! </strong></div>');

        }

    });

}
function remove_confirm_news(id) {

    $('<div></div>').appendTo('body').html(
            '<div><h6>Delete <b>News?</b></h6></div>').dialog({
        modal: true,
        title: 'Remove Confirmation',
        zIndex: 10000,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    remove_news(id);
                    $(this).remove();
                }
            }, {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }],
        close: function(event, ui) {
            $(this).remove();
        }
    });

}
function updatenews(id, count) {
    flag = 0;
    if ($('#n_title').val() == '') {
        $('#check_title').html('Please Enter Title!').show().delay(1800)
                .slideUp(2000);
        flag = 1;
    }
    if (CKEDITOR.instances['n_des'].getData() == '') {
        $('#check_des').html(
                '<span style="color:red">Please Enter Description!</span>')
                .show().delay(1800).slideUp(2000);
        flag = 1;
    }
    if (flag == 1) {
        return;
    } else

    {
        $
                .post(
                $('#base_url').val()
                + "permissions/update_functionality",
                {
                    title: $('#n_title').val(),
                    des:CKEDITOR.instances['n_des'].getData(),
                    id: id,
                    count: count
                },
        function(data) {
            $('#row_' + id).html(data);
            $('#course')
                    .html(
                    '<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Updated Successfully!</strong></div>');

            $("#added_course").fancybox().trigger('click');

            setTimeout(function() {
                $.fancybox.close();
            }, 1300);

        });

    }

}
