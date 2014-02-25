<?php
if(!defined('BASEPATH')) exit('No direct script access allowed');

function form_ckeditor1($data)
{
    return  '<script type="text/javascript" src="'.base_url().'files/filemanager_in_ckeditor/js/ckeditor/ckeditor.js"></script>' .
     '<script type="text/javascript">CKEDITOR.replace("'.$data.'","{
        toolbar :
        [
            [Source],
            [Bold,Italic,Underline,Strike],
        ],
        height: 300,
        width: 400
    }");</script>';
}
