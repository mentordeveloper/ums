/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function event_remove() {
    $("#event_tags").val('');
    $("#event_ids").val('');
}
$(document).ready(function() {
    $(document).on('click', '#TB_overlay', function() {
        //alert("sa");
        $("#TB_window").fadeOut("fast");
        $("#TB_overlay").fadeOut("fast");
    });
//     $("#TB_overlay").click(function (){
//            alert("sa");
//            $("#TB_window").fadeOut("fast");
//            $("#TB_overlay").fadeOut("fast");
//            
//        });
    //alert("sadaas");
    $('#global_attachment_photo_file_input').live('change', function() {
//        $(".activity_feed_form_share_process").css("display", "block"); 
//        $("#js_activity_feed_form").ajaxForm({
//            
//            beforeSubmit: function() {
//                //requiredFields: ["photo_status"];
//                if($("#photo_status").val()==''){
//                   // alert("Enter Photo Status");
//                }
//                
//            },
//            errorMessageTarget : "#image_path_div",
//            success : function ( msg ) {
//                //alert(msg);
//                $("#image_path_div").html('');
//                $("#global_attachment_photo_file_input").val('');
//                $('#js_new_feed_comment').prepend(msg);
//                // alert("Data Saved: " + msg);
//                $(".activity_feed_form_share_process").css("display", "none");
//                $(".activity_feed_form_share_process").css("display", "none");
//                event_remove();
//                
//                
//            }
//        }).submit();

    });

    $('#global_attachment_music_file_input').live('change', function() {
//        $(".activity_feed_form_share_process").css("display", "block"); 
//        $("#music_path_div").html('loading');
//        var values = getForm("js_activity_feed_form");
//       //    alert(values);
//        $("#js_activity_feed_form").ajaxForm({
//            
//            beforeSubmit: function() {
//                //requiredFields: ["photo_status"];
//                if($("#music_status").val()==''){
//                    //alert("Enter Music Status");
//                }
//                
//            },
//            errorMessageTarget : "#music_path_div",
//            success : function ( msg ) {
//               // alert(msg);
//                $("#music_path_div").html('');
//                $("#global_attachment_music_file_input").val('');
//                $('#js_new_feed_comment').prepend(msg);
//                // alert("Data Saved: " + msg);
//                $(".activity_feed_form_share_process").css("display", "none");
//                event_remove();
//            }
//        }).submit();

    });

});

function getForm(form_id)
{
    var form_tag = 'js_activity_feed_form';
    if (form_id != "")
        form_tag = form_id;
    var objForm = $("#" + form_tag).get(0);
    var prefix = "";
    var submitDisabledElements = false;

    if (arguments.length > 1 && arguments[1] == true)
    {
        submitDisabledElements = true;
    }

    if (arguments.length > 2)
    {
        prefix = arguments[2];
    }

    var sXml = '';
    if (objForm && objForm.tagName == 'FORM')
    {
        var formElements = objForm.elements;
        for (var i = 0; i < formElements.length; i++)
        {
            if (!formElements[i].name)
            {
                continue;
            }

            if (formElements[i].name.substring(0, prefix.length) != prefix)
            {
                continue;
            }

            if (formElements[i].type && (formElements[i].type == 'radio' || formElements[i].type == 'checkbox') && formElements[i].checked == false)
            {
                continue;
            }

            if (formElements[i].disabled && formElements[i].disabled == true && submitDisabledElements == false)
            {
                continue;
            }

            var name = formElements[i].name;
            if (name)
            {
                sXml += '&';
                if (formElements[i].type == 'select-multiple')
                {
                    for (var j = 0; j < formElements[i].length; j++)
                    {
                        if (formElements[i].options[j].selected == true)
                        {
                            sXml += name + "=" + encodeURIComponent(formElements[i].options[j].value) + "&";
                        }
                    }
                }
                else
                {
                    sXml += name + "=" + encodeURIComponent(formElements[i].value);
                }
            }
        }
    }

    if (!sXml && objForm)
    {
        sXml += "&" + objForm.name + "=" + encodeURIComponent(objForm.value);
    }

    return sXml;
}
//jQuery.noConflict();
$('#global_attachment_status textarea').focus(function()
{		//alert("asd");	
    if ($(this).val() == $('#global_attachment_status_value').html())
    {
        $(this).val('');
        $(this).css({height: '50px'});
        $('.activity_feed_form_button').show();
        $(this).addClass('focus');
        $('.activity_feed_form_button_status_info textarea').addClass('focus');
    }
});
$('#global_photo_attachment_status textarea').focus(function()
{		//alert("asd");	
    if ($(this).val() == $('#global_photo_attachment_status_value').html())
    {
        $(this).val('');
        $(this).css({height: '50px'});
        $('.activity_feed_form_button').show();
        $(this).addClass('focus');
        $('.activity_feed_form_button_status_info textarea').addClass('focus');
    }
});
$('#global_link_attachment_status textarea').focus(function()
{		//alert("asd");	
    if ($(this).val() == $('#global_link_attachment_status_value').html())
    {
        $(this).val('');
        $(this).css({height: '50px'});
        $('.activity_feed_form_button').show();
        $(this).addClass('focus');
        $('.activity_feed_form_button_status_info textarea').addClass('focus');
    }
});
$('#global_music_attachment_status textarea').focus(function()
{		//alert("asd");	
    if ($(this).val() == $('#global_music_attachment_status_value').html())
    {
        $(this).val('');
        $(this).css({height: '50px'});
        $('.activity_feed_form_button').show();
        $(this).addClass('focus');
        $('.activity_feed_form_button_status_info textarea').addClass('focus');
    }
});

$('a[rel=global_attachment_status]').click(function()
{		//alert("asd");	
    $("#global_attachment_photo").css("display", "none");
    $("#global_attachment_status").css("display", "block");
    $("#global_attachment_link").css("display", "none");
    $("#global_attachment_music").css("display", "none");
    $("#action").val("user_status");
    $("#active").val("global_attachment_status");
});
$('a[rel=global_attachment_photo]').click(function()
{		//alert("asd");	
    $("#global_attachment_photo").css("display", "block");
    $("#global_attachment_status").css("display", "none");
    $("#global_attachment_link").css("display", "none");
    $("#global_attachment_music").css("display", "none");
    $("#action").val("photo");
    $("#active").val("global_attachment_photo");

});


$('a[rel=global_attachment_link]').click(function()
{		//alert("asd");	
    $("#global_attachment_photo").css("display", "none");
    $("#global_attachment_status").css("display", "none");
    $("#global_attachment_link").css("display", "block");
    $("#global_attachment_music").css("display", "none");
    $("#action").val("link");
    $("#active").val("global_attachment_link");
    $("#activity_feed_form_button_status_info").css("display", "block");
    $("#activity_feed_form_button_status_info textarea").html("Say Something about this Link?");
    $('#activity_feed_form_button_status_info textarea').focus(function()
    {		//alert("asd");	
        if ($(this).val() == "Say Something about this Link?")
        {
            $(this).val('');
            $(this).css({height: '50px'});
            $('.activity_feed_form_button').show();
            $(this).addClass('focus');
            $('.activity_feed_form_button_status_info textarea').addClass('focus');
        }
    });
});

$('a[rel=global_attachment_music]').click(function()
{		//alert("asd");	
    $("#global_attachment_photo").css("display", "none");
    $("#global_attachment_status").css("display", "none");
    $("#global_attachment_link").css("display", "none");
    $("#global_attachment_music").css("display", "block");
    $("#action").val("music");
    $("#active").val("global_attachment_music");
});


$("#activity_feed_submit").click(function() {
    $(".activity_feed_form_share_process").css("display", "block");

    var action = $("#action").val();
    if (action == 'photo') {
        $(".activity_feed_form_share_process").css("display", "block");
        if ($("#global_attachment_photo_file_input").val() == '') {
            alert("Select Photo...");
            $(".activity_feed_form_share_process").css("display", "none");
            return false;
        }
        $("#js_activity_feed_form").ajaxForm({
            beforeSubmit: function() {
                //requiredFields: ["photo_status"];
                if ($("#photo_status").val() == '') {
                    alert("Enter Photo Status");
                }

            },
            errorMessageTarget: "#image_path_div",
            success: function(msg) {
                //alert(msg);
                $("#image_path_div").html('');
                $("#global_attachment_photo_file_input").val('');
                $('#js_new_feed_comment').prepend(msg);
                // alert("Data Saved: " + msg);
                $(".activity_feed_form_share_process").css("display", "none");
            }
        }).submit();
    }
    else if (action == 'music') {
        if ($("#js_form_music_title").val() == '') {
            alert("Enter Video Status");
            $(".activity_feed_form_share_process").css("display", "none");
            return false;
        }
        if ($("#global_attachment_music_file_input").val() == '') {
            alert("Select Video File");
            $(".activity_feed_form_share_process").css("display", "none");
            return false;
        }
        $(".activity_feed_form_share_process").css("display", "block");
        $("#music_path_div").html('');
        var values = getForm("js_activity_feed_form");
        //    alert(values);
        var width = 2;
         var refreshIntervalId ='';
        $("#js_activity_feed_form").ajaxSubmit({
            beforeSubmit: function() {
                //requiredFields: ["photo_status"];
                if ($("#js_form_music_title").val() == '') {
                    alert("Enter Video Status");
                }
//               $("#progress_container").fadeIn("Fast");
//               $("#progress_bar").css("width",width+"%");
//               function set() {
//                    width +=4;
//                    
//                }
//              refreshIntervalId = setInterval(function(){width +=4;$("#progress_bar").css("width",width+"%");$('#progress_completed').html(parseInt(width) +"%");}, 1000);


            },
            errorMessageTarget: "#music_path_div",
            success: function(msg) {
                clearInterval(refreshIntervalId);
                
                
               //$("#progress_bar").css("width",width+"%");
                //alert(msg);
              //  $('#upload_frame').hide();
              //  $('#upload_frame').attr('src', "");
                if (msg == 'The file you are attempting to upload is larger than the permitted size.') {
                   // $("#progress_container").fadeOut("Fast");
                    $("#music_path_div").html(msg);
                    $(".activity_feed_form_share_process").css("display", "none");
                }
                else if(msg=='The filetype you are attempting to upload is not allowed.'){
                   // $("#progress_container").fadeOut("Fast");
                    $("#music_path_div").html(msg);
                    $(".activity_feed_form_share_process").css("display", "none");
                }
                else {
                    //$("#progress_bar").css("width","100%");
                   // $('#progress_completed').html("100%");
                    $("#music_path_div").html('');


                    $("#global_attachment_music_file_input").val('');
                    $("#js_form_music_title").val('');
                    $("#music_status").val('');
                    $("#global_attachment_music_file_input").val('');
                    $("#music_status").html('Say Something about this Video?');
                    $('#js_new_feed_comment').prepend(msg);
                    // alert("Data Saved: " + msg);
                    $(".activity_feed_form_share_process").css("display", "none");
                   // $("#progress_container").fadeOut("Fast");
                }
            }
        }).submit(function() {
        });
    }
    else {
        var form_name = $(this).parents('form').attr("id");
        var action = $("#action").val();
        var values = getForm(form_name);
        //   alert($("#base_url").val()+"feeds?ajax=true" + values);
        var status = $("textarea[name=user_status]").val();
//            alert(status);
        if (action == 'user_status' && (status == "What's on your mind?" || status == "")) {//alert(action);
            $("#require_status").html('Enter Status Massage...').fadeIn("fast");
            $(".activity_feed_form_share_process").css("display", "none");
            return false;
        } else {
            if (action == 'link') {//alert(action);
                var link = $("#js_global_attach_value").val();
                if (link == '' || link == 'http://') {
                    $(".activity_feed_form_share_process").css("display", "none");
                    $("#require_status").html('Enter Video Link...').fadeIn("fast");
                    $("#js_global_attach_value").focus();
                    return false;
                }
            }
            if (action == 'link') {
                 if($("#provider_link").length){
                    
                 }else{ 
                     $("#require_status").html('Attach Video Url...').fadeIn("fast");
                     $(".activity_feed_form_share_process").css("display", "none");
                     return false;
                 }
             }
            $("#require_status").fadeOut("fast")
            var request = $.ajax({
                url: $("#base_url").val() + "feeds?ajax=true" + values,
                type: "GET",
                data: {id: values},
                dataType: "html"
            });

            request.done(function(msg) {
                $('#js_new_feed_comment').prepend(msg);
                $("textarea[name=user_status]").val("What's on your mind?");
                if (action == 'link') {
                    $("#js_preview_link_attachment").html('');
                    $("#js_global_attachment_link_cancel").css("display", "none");
                    $("#global_attachment_link_holder").css("display", "block");
                    $("#js_global_attach_value").val('');
                    $("textarea[name=status_info]").val("Say Something about this Link?");

                }
                // alert("Data Saved: " + msg);
                $(".activity_feed_form_share_process").css("display", "none");
                event_remove();
            });

            request.fail(function(jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
        }
    }

});


function ajaxFileUpload()
{

    var file_element = '';
    var action = $("#action").val();
    if (action == 'music_song') {
        file_element = 'mp3';
    } else {
        file_element = 'image';
    }
    var form_name = $("#activity_feed_submit").parents('form').attr("id");
    var action = $("#action").val();
    var values = getForm(form_name);
    $(".activity_feed_form_share_process")
            .ajaxStart(function() {
        //alert("s");
        $(this).show();
    })
            .ajaxComplete(function() {
        $(this).hide();
    });

    var ajax_req = $.ajaxFileUpload({
        url: $("#base_url").val() + "feeds/photo_file",
        secureuri: false,
        fileElementId: 'image',
        dataType: 'json',
        success: function(msg) {
            alert("as");
        }
        // data        : {'id': 'values'},
    });
//s    return false;

}

function show_comment_box(div_id) {
//    $(".js_feed_comment_process_form").css("display", "none");
//    $("#comment_mini_content_holder_" + div_id).css('display', 'block');
//    if (!$("#js_feed_comment_form_" + div_id).is(':visible')) {
//        $("#js_feed_comment_form_" + div_id).slideDown("fast").fadeIn("fast");
//    } else {
//        $("#js_feed_comment_form_" + div_id).slideUp("fast").fadeOut("fast");
//    }
//
//    $('#js_feed_comment_form_textarea_' + div_id + '').focus(function()
//    {		//alert("asd");	
//        if ($(this).val() == $('#js_feed_comment_form_textarea_' + div_id + '').html())
//        {
//            $(this).val('');
//            $(this).css({height: '50px'});
//            $('.feed_comment_buttons_wrap').show();
//            $(this).addClass('focus');
//            //('.activity_feed_form_button_status_info textarea').addClass('focus');
//        }
//    });

}

$(document).on('click', '.js_comment_feed_textarea', function() {
    var id_name = $(this).attr("id");
//        if ($(this).val() == "Write a comment...")
//        {
    $(this).val('');
    $(this).css({height: '50px'});
    $('.feed_comment_buttons_wrap').show();
    $(this).addClass('focus');
    //('.activity_feed_form_button_status_info textarea').addClass('focus');
    //}
});
$(document).on('click', '.js_feed_entry_add_comment', function() {
    var div_id = $(this).attr("id");
    //console.log(div_id);
    $(".js_feed_comment_process_form").css("display", "none");
    $j_this = $(this).parents('.js_feed_comment_border');
    $j_this.find("#comment_mini_content_holder_" + div_id).css('display', 'block');
    if (!$j_this.find("#js_feed_comment_form_" + div_id).is(':visible')) {
        $j_this.find("#js_feed_comment_form_" + div_id).slideDown("fast").fadeIn("fast");
    } else {
        $j_this.find("#js_feed_comment_form_" + div_id).slideUp("fast").fadeOut("fast");
    }

    $j_this.find('#js_feed_comment_form_textarea_' + div_id + '').focus(function()
    {		//alert("asd");	
        if ($(this).val() == $j_this.find('#js_feed_comment_form_textarea_' + div_id + '').html())
        {
            $(this).val('');
            $(this).css({height: '50px'});
            $('.feed_comment_buttons_wrap').show();
            $(this).addClass('focus');
            //('.activity_feed_form_button_status_info textarea').addClass('focus');
        }
    });
});



$(document).on('click', '.comment_mini_button', function() {
    $(this).parents('form').find(".js_feed_comment_process_form").css("display", "block");
    var area_val = $(this).parents('form').find('.js_comment_feed_textarea').val();
    area_val =area_val.trim();
    
    if(area_val==''){
        alert("Enter Comment...");
        $(this).parents('form').find(".js_feed_comment_process_form").css("display", "none");
        return false;
    }else{
        var form_name = $(this).parents('form').attr("id");
        var action = $("#action").val();
        var values = getForm(form_name);
        var request = $.ajax({
            url: $("#base_url").val() + "feeds/feedcomment?ajax=true" + values,
            type: "GET",
            data: {id: values},
            dataType: "html"
        });

        request.done(function(msg) {
            $data = msg.split('#@2nd@#');
            $('#js_feed_comment_view_more_' + $data[0]).append($data[1]);
            $('#js_feed_comment_form_textarea_' + $data[0]).val('');
            if($data[2]!='')
                $('.js_comment_status_holder_info_' + $data[0]).html($data[2]);
//            $('#js_feed_comment_form_textarea_' + $data[0]).focus(function()
//            {		//alert("asd");	
//                if ($(this).val() == $('#js_feed_comment_form_textarea_' + div_id + '').html())
//                {
//                    $(this).val('Write a comment...');
//                    $(this).css({height: '50px'});
//                    $('.feed_comment_buttons_wrap').show();
//                    $(this).addClass('focus');
//                    //('.activity_feed_form_button_status_info textarea').addClass('focus');
//                }
//            });

            // alert("Data Saved: " + msg);
            $('#js_feed_comment_form_' + $data[0]).css("display", "none");
            $(".js_feed_comment_process_form").css("display", "none");
            $(this).parents('form').find(".js_feed_comment_process_form").css("display", "none");
        });

        request.fail(function(jqXHR, textStatus) {
        //alert("Request failed: " + textStatus);
    });
    }

});

function temp_comment_action(id) {
    //$("#comment_mini_"+id).click(function() {

    $(this).parents('form').find(".js_feed_comment_process_form").css("display", "block");
    var form_name = $("#comment_mini_" + id).parents('form').attr("id");
    var action = $("#action").val();
    var values = getForm(form_name);
    var request = $.ajax({
        url: $("#base_url").val() + "feeds/feedcomment?ajax=true" + values,
        type: "GET",
        data: {id: values},
        dataType: "html"
    });

    request.done(function(msg) {
        $data = msg.split('#@2nd@#');
        $('#js_feed_comment_view_more_' + $data[0]).append($data[1]);
        $('#js_feed_comment_form_textarea_' + $data[0]).val('');
        $('#js_feed_comment_form_textarea_' + $data[0]).focus(function()
        {		//alert("asd");	
            if ($(this).val() == $('#js_feed_comment_form_textarea_' + div_id + '').html())
            {
                $(this).val('Write a comment...');
                $(this).css({height: '50px'});
                $('.feed_comment_buttons_wrap').show();
                $(this).addClass('focus');
                //('.activity_feed_form_button_status_info textarea').addClass('focus');
            }
        });

        // alert("Data Saved: " + msg);
        $(this).parents('form').find(".js_feed_comment_process_form").css("display", "none");
    });

    request.fail(function(jqXHR, textStatus) {
        //alert("Request failed: " + textStatus);
    });


    //});
}
function ajax_like(type_id, item_id, feed_id) {
    //$("#comment_mini_"+id).click(function() {

    var request = $.ajax({
        url: $("#base_url").val() + "feeds/like_feed",
        type: "POST",
        data: {type: type_id, item: item_id, feeds: feed_id},
        dataType: "html"
    });

    request.done(function(msg) {
        if (type_id == "feed_mini") {
            $("#js_like_status_holder_info_" + item_id).html(msg);
        } else {
            $("#js_like_status_holder_info_" + feed_id).html(msg);
        }
    });

    request.fail(function(jqXHR, textStatus) {
        //alert("Request failed: " + textStatus);
    });


    // });
}
function ajax_Dislike(type_id, item_id, feed_id) {
    //$("#comment_mini_"+id).click(function() {

    var request = $.ajax({
        url: $("#base_url").val() + "feeds/dislike_feed",
        type: "POST",
        data: {type: type_id, item: item_id, feeds: feed_id},
        dataType: "html"
    });

    request.done(function(msg) {
        if (type_id == "feed_mini") {
            $("#js_like_status_holder_info_" + item_id).html(msg);
        } else {
            $("#js_like_status_holder_info_" + feed_id).html(msg);
        }
    });

    request.fail(function(jqXHR, textStatus) {
        //alert("Request failed: " + textStatus);
    });


    // });
}



$("#link_button_submit").click(function() {

    var link = $("#js_global_attach_value").val();
    if (link == '' || link == 'http://') {
        alert("Enter Video Link");
        $("#js_global_attach_value").focus();
        return false;
    }
    $("#require_status").html('').fadeOut("fast");
//        alert(link);
    $(".activity_feed_form_share_process").css("display", "block");
    var request = $.ajax({
        url: $("#base_url").val() + "feeds/link?ajax=true",
        type: "POST",
        data: {id: link},
        dataType: "html"
    });

    request.done(function(msg) {
        //$('#js_new_feed_comment').prepend(msg);
        //alert("Data Saved: " + msg);
        $("#js_preview_link_attachment").html(msg);
        $("#global_attachment_link_holder").css("display", "none");
        $("#js_global_attachment_link_cancel").css("display", "block");

        $(".activity_feed_form_share_process").css("display", "none");
    });

    request.fail(function(jqXHR, textStatus) {
        $(".activity_feed_form_share_process").css("display", "none");
        alert("Request failed: " + textStatus);
    });
});


/*
 *  Media helper. Group items, disable animations, hide arrows, enable media and button helpers.
 */
$('.fancybox-media')
        .attr('rel', 'media-gallery')
        .fancybox({
    openEffect: 'none',
    closeEffect: 'none',
    prevEffect: 'none',
    nextEffect: 'none',
    arrows: false,
    helpers: {
        media: {},
        buttons: {}
    }
});
$(document).ready(function() {
    // default options
    $(".mp3").jmp3();
    // custom options
    $("#mysong").jmp3({
        backcolor: "000000",
        forecolor: "00ff00",
        width: 200,
        showdownload: "true"
    });
});

function view_more_feeds(a, b, c) {
//            var new_start = a;
//            var end   = b;
//            var old_start = c;
    var f_str = $("#all_feeds_time").val();
    var request = $.ajax({
        url: $("#base_url").val() + "permissions/display_feeds",
        type: "POST",
        data: {a_s: a, e_n: b, o_s: c, is_ajax: "y", feeds_string: f_str},
        dataType: "html"
    });

    request.done(function(msg) {
        $("#feed_view_more_loader").hide();
        $(".content").append(msg);
        parseScript(msg);
        //$Core.loadInit();
    });

    request.fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

function show_div(a, b) {
    
    show_overlay = b;
   // $("." + a).fancybox().trigger('click');
    var img_path = $("." + a).find(".photo_holder").attr('src');
    var title    = $("." + a).find(".photo_holder").attr('alt');

   
		$.fancybox({
			href		: img_path
			
		});
//   
    //$("." + b).css("display", "block");
    //alert(a);
    //$("." + a).css("display", "block");

}
function show_div_video(a, b) {
    show_overlay = b;
    $("." + b).css("display", "block");
    $("." + a).css("display", "block");

}
function hidde_div() {

    // alert("");
    //$("#"+a).fadeOut("fast");
    $("#TB_overlay").each(function() {
        $("#TB_overlay").css("display", "none");
    });
    $("#TB_window").each(function() {
        $("#TB_window").css("display", "none");
    });

}
function hide_div(a, b) {
    // alert("");
    $("." + a).css("display", "none");
    $("." + b).css("display", "none");
    $("#TB_overlay").each(function() {
        $("#TB_overlay").css("display", "none");
    });
    $("#TB_window").each(function() {
        $("#TB_window").css("display", "none");
    });
}
$(document).on('click', '#TB_overlay', function() {
    //$("#TB_overlay").click(function (){
    //alert("sa");
    $("#TB_overlay").each(function() {
        $("#TB_overlay").css("display", "none");
    });
    $("#TB_window").each(function() {
        $("#TB_window").css("display", "none");
    });


});
document.onkeyup = function(e) {
    if (e == null) { // ie
        keycode = event.keyCode;
    } else { // mozilla
        keycode = e.which;
    }
    if (keycode == 27) { // close
        hide_div();
        $("#TB_overlay").each(function() {
            $("#TB_overlay").css("display", "none");
        });
        $("#TB_window").each(function() {
            $("#TB_window").css("display", "none");
        });
    }
};


// this function create an Array that contains the JS code of every <script> tag in parameter
// then apply the eval() to execute the code in every script collected
$(function() {
    function split(val) {
        return val.split(/,\s*/);
    }
    function extractLast(term) {
        return split(term).pop();
    }
    $("#event_tags")
// don't navigate away from the field on tab when selecting an item
            .bind("keydown", function(event) {
        if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).data("ui-autocomplete").menu.active) {
            event.preventDefault();
        }
    })
            .autocomplete({
        source: function(request, response) {
            $.getJSON($("#base_url").val() + "feeds/event_search", {
                term: extractLast(request.term)
            }, response);
        },
        search: function() {
// custom minLength
            var term = extractLast(this.value);
            if (term.length < 2) {
                return false;
            }
        },
        focus: function() {
// prevent value inserted on focus
            return false;
        },
        select: function(event, ui) {
            var terms = split(this.value);
// remove the current input
            terms.pop();
// add the selected item
            if (ui.item.value != "No Record Found") {
                terms.push(ui.item.value);
                // add placeholder to get the comma-and-space at the end
                terms.push("");
                this.value = terms.join(", ");

                var event_id = split($("#event_ids").val());
                // remove the current input
                event_id.pop();
                // add the selected item
                event_id.push(ui.item.id);
                // add placeholder to get the comma-and-space at the end
                event_id.push("");
                $("#event_ids").val(event_id.join(", "));

            }
            return false;
        }
    });
});
function parseScript(strcode) {

    var time = $("#all_feeds_time").val();
    var time_arra = time.split(",");

    for (i = 0; i < time_arra.length; i++) {
        var tim = $("#feed_time_" + time_arra[i]).val();
        var about = nicetime_file(tim);
        $("#show_feed_time_" + time_arra[i]).html(about);

    }
    $("#all_feeds_time").remove();
    /* www.webdeveloper.com */
    var scripts = new Array();         // Array which will store the script's code

    // Strip out tags
    while (strcode.indexOf("<script") > -1 || strcode.indexOf("</script") > -1) {
        var s = strcode.indexOf("<script");
        var s_e = strcode.indexOf(">", s);
        var e = strcode.indexOf("</script", s);
        var e_e = strcode.indexOf(">", e);

        // Add to scripts array
        scripts.push(strcode.substring(s_e + 1, e));
        // Strip from strcode
        strcode = strcode.substring(0, s) + strcode.substring(e_e + 1);
    }

    // Loop through every script collected and eval it
    for (var i = 0; i < scripts.length; i++) {
        try {
            eval(scripts[i]);
        }
        catch (ex) {
            // do what you want here when a script fails
        }
    }
}



function nicetime_file(time) {
    var str = '';
    if (date == '') {
        return "No date provided";
    }
    var periods = new Array("second", "minute", "hour", "day", "week", "month", "year", "decade");
    var lengths = new Array("60", "60", "24", "7", "4.35", "12", "10");
    var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
    difference = (((new Date()).getTime() - date.getTime()) / 1000);
    var tense = "ago";
    for (var j = 0; difference >= lengths[j] && j < lengths.length - 1; j++) {
//var umair= "<br />"+difference+"/"+lengths[j];
        difference /= lengths[j];
//alert(umair+' # '+difference);
    }
    difference = Math.round(difference);
    if (difference != 1) {
        periods[j] += "s";
    }
    str = difference + ' ' + periods[j] + ' ' + tense + '';
//alert(str);
    return str;
}
$(document).ready(function() {
    
    //if($("#all_feeds_time").lenght){
    if(document.getElementById("all_feeds_time")){
    //if($("#all_feeds_time").lenght=== 0){console.log('asd');
       // alert($("#all_feeds_time").val());
        if($("#all_feeds_time").val()!= ''){
        var time = $("#all_feeds_time").val();

        var time_arra = time.split(",");

        for (i = 0; i < time_arra.length; i++) {
            //alert(time_arra[i]);
            var tim = $("#feed_time_" + time_arra[i]).val();
            var about = nicetime_file(tim);
            $("#show_feed_time_" + time_arra[i]).html(about);

        }
        $("#all_feeds_time").remove();
        }
    }

}); 