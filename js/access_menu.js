/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("focus","#user_name_search",function(){
    $("#user_name_search").prop('disabled', false);
    $("#users_id_search").prop('disabled', false);
});
$(document).on("click",".ms-elem-selectable",function(){
    $("#user_name_search").prop('disabled', false);
    $("#users_id_search").prop('disabled', false);
});
$(document).on("click",".ms-elem-selection",function(){
    $("#user_name_search").prop('disabled', false);
    $("#users_id_search").prop('disabled', false);
});
$(document).on("click","#submit_menu",function(){
    //alert($('select#my_multi_select1').val());
    $("#selected_menu").val($('select#my_multi_select1').val());
    
    
    var foo = ''; 
    var cat = ''; 
    $('#my_multi_select1 :selected').each(function(i, selected){ 
      foo += cat + $(selected).text(); 
       cat = ','; 
    });
    $("#selected_menu_text").val(foo);
    if ($("#users_id_search").val() == '') {
               $("#user_name_search").closest('.control-group').addClass('error');
                $("#user_name_error").fadeIn("fast");

        return false;
    }else{
        $("#user_name_search").closest('.control-group').removeClass('error');
        $("#user_name_error").fadeOut("fast");
    }
//    if ($("#selected_menu").val() == '') {
//               $("#my_multi_select1").closest('.control-group').addClass('error');
//               $("#my_multi_select1_error").fadeIn("fast");
//                    return false;
//    }else{
//        $("#my_multi_select1").closest('.control-group').removeClass('error');
//        $("#my_multi_select1_error").fadeOut("fast");
//    }
    var users_id    = $("#users_id_search").val();
    var users_name  = $("#user_name_search").val();
    var menu_ids    = $("#selected_menu").val();
    var menu_text   = foo;
     $.ajax({
        url: $('#base_url').val() + "instructor/g_a_m_v1",
        type: "POST",
        context: document.body,
        data: {us_ids:users_id,us_names:users_name,me_ids:menu_ids,me_txt:menu_text},
        cache: false,
        success: function(data) {
            if(data==1){
                $('.msg').html('<div class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success! Roles Assign Successfully</strong></div>').delay(8000).fadeOut("fast");
                    $("#users_id_search").val('');
                    $("#user_name_search").val('');
                    $("#selected_menu").val('');
                    $("#selected_menu_text").val('');
                    $("#user_name_search").prop('disabled', false);
                    $("#users_id_search").prop('disabled', false);
                    $('.ms-elem-selection').each(function(i, selected){ 
                      $(this).removeClass('ms-selected');
                      $(this).css("display",'none')
                    });
                    $('.ms-elem-selectable').each(function(i, selected){ 
                      $(this).removeClass('ms-selected');
                      $(this).css("display",'block')
                    });
            }else{
                $('.msg').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error! Roles Not Assign...</strong></div>').delay(8000).fadeOut("fast");
            }

        }

    });
    
    

});
// this function create an Array that contains the JS code of every <script> tag in parameter
// then apply the eval() to execute the code in every script collected
$(function() {
    function split(val) {
        return val.split(/,\s*/);
    }
    function extractLast(term) {
        return split(term).pop();
    }
    $("#user_name_search")
// don't navigate away from the field on tab when selecting an item
            .bind("keydown", function(event) {
        if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).data("ui-autocomplete").menu.active) {
            event.preventDefault();
        }
    })
            .autocomplete({
        source: function(request, response) {
            $.getJSON($("#base_url").val() + "instructor/user_search", {
                term: extractLast(request.term),
                user_ids: $("#users_id_search").val(),
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

                var event_id = split($("#users_id_search").val());
                // remove the current input
                event_id.pop();
                // add the selected item
                event_id.push(ui.item.id);
                // add placeholder to get the comma-and-space at the end
                event_id.push("");
                $("#users_id_search").val(event_id.join(", "));
                
                 $.ajax({
                        url: $('#base_url').val() + "instructor/g_a_m_v1_search",
                        type: "POST",
                        context: document.body,
                        data: {us_ids:ui.item.id},
                        cache: false,
                        success: function(data) {
                            if(data!=1){
                               // console.log(data);
                                var select_arr = data.split(",");
                               // console.log(select_arr);
                                    $("#user_name_search").attr("disabled", "disabled");
                                    $("#users_id_search").attr("disabled", "disabled");
                                    for(i=0;i<select_arr.length;i++){
                                        id_se  = parseInt(select_arr[i]);
                                        id  = parseInt(select_arr[i])+"-selectable";
                                        sid  = parseInt(select_arr[i])+"-selection";
                                        
                                        $('#my_multi_select1 option').each(function(i, selected){ 
                                            if($(this).val()==id_se){
                                               $(selected).prop('selected', true); 
                                            }
                                        });
                                        $('#'+id).each(function(i, selected){ 
                                          //$(this).parent().find('.ms-optgroup-label').css("display",'none');  
                                          $(this).addClass('ms-selected');
                                          $(this).css("display",'none');
                                        });
                                        $('#'+sid).each(function(i, selected){ 
                                          $(this).parent().find('.ms-optgroup-label').css("display",'block');    
                                          $(this).addClass('ms-selected');
                                          $(this).css("display",'block')
                                        });
                                    }
                                    
                            }

                        }

                    });

            }
            return false;
        }
    });
});

////end of multi select
$(function() {
    $('#accessor_list').change(function() {
        // ////hide the post sylabuss reponse div
        
        var selected = $("#accessor_list option:selected").val();
        var selected_text = $("#accessor_list option:selected").text();
        $.ajax({
            url: $('#base_url').val() + "instructor/swtich_user_roles/",
            type: "POST",
            data: {selected:selected},
            context: document.body,
            cache: false,
            async:false,
            success: function(data) {
                //alert(data);
                console.log(data);
                window.location.reload(true);
            }
        });
    });
});
$(document).on("click",".access_menu_list",function(){
    
        // ////hide the post sylabuss reponse div
        
        var selected = $(this).find("a").attr("id");
        var selected_text = $(this).find("a").text();
         console.log(selected);
         window.location.href=$("#base_url").val()+"instructor/swtich_user_roles/"+selected;//(true);
//        $.ajax({
//            url: $('#base_url').val() + "instructor/swtich_user_roles/",
//            type: "POST",
//            data: {selected:selected},
//            context: document.body,
//            cache: false,
//            async:false,
//            success: function(data) {
//                //alert(data);
//                console.log(data);
//                var data_arr = data.split('@2nd2@');
//                //window.location.reload(true);
//                if(data_arr[1]!=''){
//                  //  window.location.href=data_arr[1];//(true);
//                    //window.location.href=$("#base_url").val()+data_arr[1];//(true);
//                    //window.location.href=$("#base_url").val()+"roles";//(true);
//                }else{
//                    //window.location.href='/instructor';//(true);
//                    // window.location.href=$("#base_url").val()+"instructor";//(true);
//                }
//            }
//        });

});
