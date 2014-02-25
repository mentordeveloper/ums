<?php
	
		$CI =& get_instance();
		
		$CI->load->model('calendar_model');
		$CI->load->model('settings_model');
		
		$array_data['session'] = $this->session->userdata('user_data');
		$cntArr = $CI->calendar_model->notification();
		$resnotiArr = $CI->calendar_model->fetch_notification();
		$notificationcnt = $cntArr[0]['cnt'];
		$notificationdata = array();
		$notificationdata = $resnotiArr;
		$msg = $CI->settings_model->get_welcome_message($array_data['session']['s_id']);
		
				foreach($msg as $gettms)
				$gur =$gettms['welcome_message'];
				$getmessage = '';
				if(!empty($gur))
					{
						$getmessage = $gur;
					}
					else
					{   $mssg= "Event - Managment System";
						$getmessage =$mssg;
					}

					
		$pic = $CI->settings_model->get_profilepic($array_data['session']['lg_id']);
		foreach($pic as $getimage)
				$my_image =$getimage['ad_ins_image'];
				
		$form = $CI->create_form();
	
	?>