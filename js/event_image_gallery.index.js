/**
 * on document load do the following operations and map the events
 */

    $('#fileupload').live('change', function() {
        $("#fancybox-loading").css('display','block');
        $("#upload_form").ajaxForm({
            
            errorMessageTarget : "#imgDiv",
            success : function ( msg ) {
            $("#fancybox-loading").css('display','none');
                
                //console.log(msg);
                var result = msg.split("#2nd#");
                
                $("#res_img").attr("src",result[0]);
                $("#imgDiv").html(result[1]);
            },
            error: function (msg){
                console.log(msg);
            
            }        
        }).submit();

    });
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

					$(document).on('click', '#btn_upload_share', function () {

										var myresult = $("#upload_form")
												.validate(
														{
															rules : {
																image_title : "required",
															},
															messages : {
																image_title : "<font color='red'>Please enter image title</font>",

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

	var confirmation = confirm("Remove !");

	/*
	 * 
	 * if confirmation for the removing
	 */

	if (confirmation) {

		$
				.ajax({
					url : $('#base_url').val()
							+ "permissions/remove_video_gallery_id/",
					type : "GET",
					data : 'id=' + id,
					context : document.body,
					cache : false,
					success : function(data) {

						/*
						 * 
						 * Remove the user image instantly after the action done
						 */

						if (data) {
							var holder = '#' + id + '_thumbs';
							$(holder).remove();

							$('.portlet-body')
									.prepend(
											'<div class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>Success:</strong>Image Removed Successfully!</div>');

						}

					}

				});
	}

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
		url : $('#base_url').val() + "permissions/get_new_videos_gallery/",
		type : "GET",
		context : document.body,
		cache : false,
		success : function(data) {

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
//alert($('#base_url').val() + 'files/uploadify/uploadify.swf');
	$("#fileupload").uploadify({
		height : 30,
		'formData' : {
			'hash' : $('#hash').val(),
			'userid' : $('#userid').val(),
			'folder1' : 'event',
			'page' : 'event',
		},
		
		width : 968,
		//maxQueueSize : 10,
		messages : {
			'maxNumberUploadError' : 'Exceded number of upload.',
			'nothingInTheQueueError' : 'Nothing in the Queue'
		},
		'auto' : false ,
                'onUploadError' : function(file, errorCode, errorMsg, errorString) {
                        alert('The file ' + file.name + ' could not be uploaded: ' + errorString);
                    },
        'onUploadSuccess' : function(file, data, response) {
		
                        if(data=='bad')
                        {
                        		$('#title').val('');
                        		$('#des').val('');
                        		$('#invalidtype').html('<span class="error">Please Select .jpg,.png formats!</span>');
                        		return false;
                        	}
                        },
//		'onQueueComplete' : function(file, data, response) {
//			sucess_file_uploading();
//		},
		
	});

}
