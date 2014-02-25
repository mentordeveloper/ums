/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * view attachments by hash id
 */

function e_at_v1(hash)
{

    $.ajax({
        url: $('#base_url').val()
                + "filesharing/p_b_at_v1/",
        type: "GET",
        context: document.body,
        data: 'hash=' + hash,
        cache: false,
        success: function(data) {

            $("#msg_user").html(data);
            $("#global_use_msg").fancybox().trigger('click');

        }
    });

}

/*
 * function to remove shared files
 */

function r_f_at_v1(id, name)
{

    $('<div></div>').appendTo('body').html(
            '<div><h6>Remove <b>' + name + '</b></h6></div>').dialog({
        modal: true,
        title: 'Remove Confirmation',
        zIndex: 10000,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        buttons: [{
                text: 'Remove',
                click: function() {
                    r_r_f_at_v1(id);
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

function r_r_f_at_v1(id)
{

    $.ajax({
        url: $('#base_url').val()
                + "filesharing/r_f_at_v1/",
        type: "GET",
        context: document.body,
        data: 'hash=' + id,
        cache: false,
        success: function(data) {

            $('#' + id).remove();

        }
    });




}