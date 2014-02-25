$(document).ready(function(){
	
	CKEDITOR.replace( 'page_editor',
                {
                    filebrowserBrowseUrl :$('#base_url').val()+'files/filemanager_in_ckeditor/js/ckeditor/filemanager/browser/default/browser.html?Connector=http://kodemaster.co.cc/filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/connector.php',
                    filebrowserImageBrowseUrl : $('#base_url').val()+'files/filemanager_in_ckeditor/js/ckeditor/filemanager/browser/default/browser.html?Type=Image&Connector=http://kodemaster.co.cc/filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/connector.php',
                    filebrowserFlashBrowseUrl :$('#base_url').val()+'files/filemanager_in_ckeditor/js/ckeditor/filemanager/browser/default/browser.html?Type=Flash&Connector=http://kodemaster.co.cc/filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/connector.php',
					filebrowserUploadUrl  :$('#base_url').val()+'files/filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/upload.php?Type=File',
					filebrowserImageUploadUrl :$('#base_url').val()+'files/filemanager_in_ckeditor/js/ckeditor/filemanager/connectors/php/upload.php?Type=Image',
					filebrowserFlashUploadUrl : $('#base_url').val()+'files/filemanager_in_ckeditor/js	/ckeditor/filemanager/connectors/php/upload.php?Type=Flash',
					height : 700
				});
	
});
