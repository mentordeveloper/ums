<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

function msg_error($msg = '') {
    return '<div class="alert alert-error">
<button class="close" data-dismiss="alert"></button>
<strong>Error:</strong>
' . $msg . '
</div>';
}

function msg_success($msg = '', $padding = false) {

    if ($padding) {
        return '<div class="alert alert-success" style="margin:0px;">
<button class="close" data-dismiss="alert"></button>
<strong>Success!</strong>
' . $msg . '
</div>';
    } else {

        return '<div class="alert alert-success" >
<button class="close" data-dismiss="alert"></button>
<strong>Success!</strong>
' . $msg . '
</div>';
    }
}

function msg_announcement($msg = '', $id) {

    return '<div class="alert alert-info" style="margin:0px;">
	<button class="close" data-dismiss="alert" onclick="announcement_close_handle(' . $id . ')"></button>
	<strong>Announcement!</strong>
	' . $msg . '

	</div>';
}

function msg_info($msg = '', $label = false, $css = false) {

    if ($css) {
        $css = 'style="margin-bottom:0px;"';
    } else {
        $css = '';
    }

    if ($label) {
        return '<div ' . $css . ' class="alert alert-info">' . $msg . '</div>';
    }

    return '<div ' . $css . ' class="alert alert-info"><button class="close" data-dismiss="alert"></button><strong>Info:</strong>' . $msg . '</div>';
}

function msg_alert($msg = '') {
    return '<div class="alert">
<button class="close" data-dismiss="alert"></button>
<strong>Alert!</strong>
' . $msg . '
</div>';
}

////msg auto used for dynamic error and success msgs

function msg_auto($go = '', $msg = '') {
    if ($go == 'true') {
        if (!empty($msg)) {
            echo msg_success($msg);
        }
    }

    if ($go == 'false') {
        if (!empty($msg)) {
            echo msg_error($msg);
        }
    }
}

function printr($data) {
    echo '<pre>';
    print_r($data);
    die;
}

function sessionEncrypt($str){
    $str = base64_encode($str);
    return $str;
}
function sessionDecrypt($str){
    $str = base64_decode($str);
    return $str;
}