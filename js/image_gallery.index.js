/**
 * on document load do the following operations and map the events
 */
$(document)
        .ready(
        function() {

            /*
             * initiate file uploader
             */

            fileuploading();

            /*
             * 
             * initiate gallery
             */

            Gallery.init();

            /*
             * 
             * initiate upload button
             */

            $("#upload a").fancybox();

            /*
             * Validation upon video upload
             */

            $('#btn_upload_share')
                    .click(
                    function() {

                        var myresult = $("#upload_form")
                                .validate(
                                {
                                    rules: {
                                        image_title: "required",
                                    },
                                    messages: {
                                        image_title: "<font color='red'>Please enter image title</font>",
                                    }
                                }).form();

                        if (myresult) {
                            upload_image_manager();
                        }

                    });

        });

/**
 * Uploading start from here
 */

function upload_image_manager() {

    $('#fileupload').uploadify('upload', '*');

}

/*
 * Remove image as on request
 */

function remove_this(id) {

    //var confirmation = confirm("Remove !");

    $('<div></div>').appendTo('body')
            .html('<div><h6>Are You Sure? </h6></div>')
            .dialog({
        modal: true, title: 'Delete Upload Image  ', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Yes: function() {

                $.ajax({
                    url: $('#base_url').val()
                            + "permissions/remove_video_gallery_id/",
                    type: "GET",
                    data: 'id=' + id,
                    context: document.body,
                    cache: false,
                    success: function(data) {

                        /*
                         * 
                         * Remove the user image instantly after the action done
                         */
                        
                        if (data) {
                            var holder = '#' + id + '_thumbs';
                            
                            $('.alert').remove();
                            $(holder).remove();

                            $('.portlet-body').prepend('<div class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>Success:</strong>Image Removed Successfully!</div>');

                        }

                    }

                });

                $(this).dialog("close");

            },
            No: function() {
                $(this).dialog("close");
            }
        },
        close: function(event, ui) {
            $(this).remove();
        }
    });

    /*
     * 
     * if confirmation for the removing
     */

   

}

/*
 * 
 * after uploading file show the msg and refresh the page
 */

function sucess_file_uploading() {

    $("#helper_notify").fancybox().trigger('click');

    setTimeout(function() {
        $.fancybox.close();
    }, 1300);

    /*
     * Upload and refresh the page views
     */

    $.ajax({
        url: $('#base_url').val() + "permissions/get_new_videos_gallery/",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {

            /*
             * finally reload te content inside the new loader
             */

            $('#ajax_call').html(data);

        }

    });

}

/**
 * Initialize uploading to start
 */

function fileuploading() {

    $("#fileupload").uploadify({
        height: 30,
        'formData': {
            'hash': $('#hash').val(),
            'userid': $('#userid').val(),
            'title': $('#image_title').val(),
            'folder1': '',
            'page': 'about',
        },
        swf: $('#base_url').val() + 'files/uploadify/uploadify.swf',
        uploader: $('#base_url').val() + 'filesharing/fileuploading',
        width: 200,
        maxQueueSize: 10,
        messages: {
            'maxNumberUploadError': 'Exceded number of upload.',
            'nothingInTheQueueError': 'Nothing in the Queue'
        },
        'auto': false,
        'onUploadSuccess': function(file, data, response) {
//            
//             console.log(response);
//             console.log(data);

            if (data == 'bad')
            {
                $('#title').val('');
                $('#des').val('');
                $('#invalidtype').html('<span class="error">Please Select .jpg,.png formats!</span>');
                return false;
            }
        },
        'onQueueComplete': function(file, data, response) {
//    
//            console.log(response);
//            console.log(data);
//            
            sucess_file_uploading();
        },
    });

}
