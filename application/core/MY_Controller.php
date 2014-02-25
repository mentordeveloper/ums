<?php

class My_controller extends CI_Controller {
    /*
     * for new contact support
     */

    public $school_id = '';
    public $school_name = '';
    public $school_username = '';
    public $school_lg_id = '';
    public $school_lg_fname = '';
    public $school_lg_lname = '';
    public $school_email = '';
    public $lg_type = '';
    public $access = '';
    public $school_subdomain = '';
    public $side = 'userside';
    public $not_char_arr = array("-", "#", "/", " ", "(", ")");
    public $login_dropdown_urls = array(
    );
    public $user_login_dropdown_urls = array(
    );
    public $subdomains_url = array(
    );
    public $login_dropdown_imgs_small_subdomains = array(
    );
    public $login_dropdown_imgs_small = array(
    );
    public $contact_dropdown_urls = array(
    );
    public $support_header = array(
    );
    public $default_file_folders = array(
        'filemanagment' => 'files/filemanagment'
    );
    public $default_folders = array(
    );
    public $custom_calender_dropdown = array(
    );

    public $custom_data_types_blocked_modification = array(
    );
    private $mci_languages;
    private $mci_hide_default;
    private $mci_segment;
    private $mci_default_language;
    public $school_name_parent;
    public $lg;
    public $document_root_defined = '';
    public $blocked_host = array(
    );
    public $host = SUBDOMAIN_NAME_WITH_HTTP;

    /**
     * Constructor
     * constrctor for overall system
     */
    function __construct() {


        global $URI, $CFG;
        parent :: __construct();

        /*
         * loading the zend awesome cache
         */
		
    
        /* Sub domain logical mapper here */
        $this->load->model('sadmin_model');
        /*
         * Set class variabales
         */

    
        $CFG->load('mci_languages');
        $this->mci_languages = $CFG->item('mci_languages');
        $this->mci_hide_default = $CFG->item('mci_hide_default');

    }


    /*
     * generate new unique hash to fetch files later on
     */

    public function generate_hash($date) {
        return md5($date . rand(345345, 34534534));
    }

    /**
     * Get class constant
     * public function
     */
    public function get_login_urls() {
        return $this->login_dropdown_urls;
    }

    /**
     * Get class constant
     * public function
     */
    public function get_user_login_urls() {
        return $this->user_login_dropdown_urls;
    }

    /**
     * Get class constant
     * public function
     */
    public function contact_dropdown_urls() {
        return $this->contact_dropdown_urls;
    }

    public function login_dropdown_imgs_small() {
        return $this->login_dropdown_imgs_small;
    }

    /**
     * Get user cookies
     * private function
     */
    public function get_cookies_user() {
        return json_decode($this->input->cookie('rememberme'));
    }

    /**
     * Default js file that we need on many pages
     * private function
     * returning the js files
     */
    public function add_js_default_files($array_js_page, $jquery_validation = '', $enabledtimmer = true, $datatable = false, $fancy_js = true) {			
        $default_js = array(
            base_url('files/calender/src/_loader.js'),
            base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
            base_url('js/knockout-latest.js'),
            base_url('js/instructor.calendar.subscriptions.ko.js'),
            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            base_url('files/jquery_masking/masking.js'),
            base_url('files/color_picker/farbtastic.js'),
            base_url('files/date_picker_time/date_picker.js'),
            base_url('themes/metrinoc/assets/plugins/gritter/js/jquery.gritter.js')
        );

        /* if someone dont want to add js file */
        if ($fancy_js) {
            $fancy_js_array = array(
                base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
                base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js')
            );

            $default_js = array_merge($default_js, $fancy_js_array);
        }

        if ($enabledtimmer) {

            $timmer_array = array(
                base_url('js/session_validater.js')
            );

            $default_js = array_merge($default_js, $timmer_array);
        }

        /* add jquery_validation file on demand by function */
//if ($jquery_validation == 'jquery_validation') {
        $default_js = array_merge($default_js, $this->jquery_validate());
//}

        /* add data table file on demand by function */
        if ($datatable) {
            $default_js = array_merge($default_js, $this->data_table());
        }

        /* if given array in not empty the merge it */
        if (!empty($array_js_page))
            return array_merge($default_js, $array_js_page);
        return $default_js;
    }

    /**
     * Default js file that we need on many pages
     * private function
     * returning the js files
     */
    public function add_js_default_files_event($array_js_page, $jquery_validation = '', $enabledtimmer = true, $datatable = false, $fancy_js = true) {
        $default_js = array(
//base_url('files/calender/src/_loader.js'),
//base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
            base_url('js/knockout-latest.js'),
            base_url('js/instructor.calendar.subscriptions.ko.js'),
            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            //base_url ( 'files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js' ),
//base_url ( 'files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js' ),
//base_url('files/jquery_masking/masking.js'),
// base_url('files/color_picker/farbtastic.js'),
            base_url('files/date_picker_time/date_picker.js'),
            base_url('themes/metrinoc/assets/plugins/gritter/js/jquery.gritter.js')
        );

        /* if someone dont want to add js file */
        if ($fancy_js) {
            $fancy_js_array = array(
                base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
                base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js')
            );

            $default_js = array_merge($default_js, $fancy_js_array);
        }

        if ($enabledtimmer) {
            $timmer_array = array(
//base_url('js/session_validater.js')
            );

            $default_js = array_merge($default_js, $timmer_array);
        }

        /* add jquery_validation file on demand by function */
//if ($jquery_validation == 'jquery_validation') {
        $default_js = array_merge($default_js, $this->jquery_validate());
//}

        /* add data table file on demand by function */
        if ($datatable) {
            $default_js = array_merge($default_js, $this->data_table());
        }

        /* if given array in not empty the merge it */
        if (!empty($array_js_page))
            return array_merge($default_js, $array_js_page);
        return $default_js;
    }

    /**
     * Advance Data Table Jquery
     */
    private function data_table() {
        return array(
                )
        ;
    }

    /**
     * Jquery validation file
     */
    private function jquery_validate() {
        return array(
        );
    }

    /**
     * Login form array data - CI input librrary
     * private function
     */
    public function login_form($array_data = '') {
        $rememberme = $this->get_cookies_user();

        $array_data ['admin_name'] = array(
            'name' => 'username',
            'id' => 'admin_name',
            'class' => 'text_field',
            'class' => "m-wrap placeholder-no-fix",
            'placeholder' => "Username"
        );

        if (isset($rememberme->school_username))
            $array_data ['admin_name'] ['value'] = $rememberme->school_username;

        $array_data ['admin_password'] = array(
            'name' => 'password',
            'id' => 'admin_password',
            'class' => 'text_field',
            'class' => "m-wrap placeholder-no-fix",
            'placeholder' => "Password"
        );

        if (isset($rememberme->school_password))
            $array_data ['admin_password'] ['value'] = $rememberme->school_password;

        return $array_data;
    }

    /**
     * Sub domain logical - getting server domain name
     * private function
     */
    private function get_subdomain() {
        $subdomain_arr = explode('.', $_SERVER ['HTTP_HOST'], 2);
        return $subdomain_arr [0]; // assigns the first part
    }


    function get_file_download($file_path) {
        if (!file_exists("$file_path")) {
            print "File <strong>$file_path</strong> doesn't exist.";
            exit();
        } else {
            header('Content-Type: application/force-download');
            header('Content-Length: ' . filesize("$file_path"));
            header('Content-Disposition: attachment; filename=' . $file_path);
            readfile("$file_path");
            exit();
        }
    }


    /*
     * USED TO SEND NOTIFICATION TO USERS
     */


    function getLocalTimezone() {

        $iTime = time();
        $arr = localtime($iTime);
        $arr [5] += 1900;
        $arr [4]++;
        $iTztime = gmmktime($arr [2], $arr [1], $arr [0], $arr [4], $arr [3], $arr [5]);
        $offset = doubleval(($iTztime - $iTime) / (60 * 60));
        $zonelist = array(
            'Kwajalein' => - 12.00,
            'Pacific/Midway' => - 11.00,
            'Pacific/Honolulu' => - 10.00,
            'America/Anchorage' => - 9.00,
            'America/Los_Angeles' => - 8.00,
            'America/Denver' => - 7.00,
            'America/Tegucigalpa' => - 6.00,
            'America/New_York' => - 5.00,
            'America/Caracas' => - 4.30,
            'America/Halifax' => - 4.00,
            'America/St_Johns' => - 3.30,
            'America/Argentina/Buenos_Aires' => - 3.00,
            'America/Sao_Paulo' => - 3.00,
            'Atlantic/South_Georgia' => - 2.00,
            'Atlantic/Azores' => - 1.00,
            'Europe/Dublin' => 0,
            'Europe/Belgrade' => 1.00,
            'Europe/Minsk' => 2.00,
            'Asia/Kuwait' => 3.00,
            'Asia/Tehran' => 3.30,
            'Asia/Muscat' => 4.00,
            'Asia/Yekaterinburg' => 5.00,
            'Asia/Kolkata' => 5.30,
            'Asia/Katmandu' => 5.45,
            'Asia/Dhaka' => 6.00,
            'Asia/Rangoon' => 6.30,
            'Asia/Krasnoyarsk' => 7.00,
            'Asia/Brunei' => 8.00,
            'Asia/Seoul' => 9.00,
            'Australia/Darwin' => 9.30,
            'Australia/Canberra' => 10.00,
            'Asia/Magadan' => 11.00,
            'Pacific/Fiji' => 12.00,
            'Pacific/Tongatapu' => 13.00
        );

        $index = array_keys($zonelist, $offset);
        if (sizeof($index) != 1)
            return false;
        return $index [0];
    }



    function trigger_email($data) {

        $this->load->library('email');

        $this->email->from(EMAIL_FROM_SERVICE, EMAIL_FROM_SERVICE_SUBJECT);

        $this->email->to($data ['to']);

        $this->email->subject(EMAIL_FROM_SERVICE_EXPORT);

        $this->email->message($data ['text']);

        $this->email->attach($data ['complete_path']);

        $this->email->send();

        $this->email->clear(TRUE);
    }


// /generic function to work with json
    function get_value_from_json($array_data, $check) {
        if (is_array($array_data) && isset($array_data)) {

            foreach ($array_data as $counter => $peritem) {

                if ($array_data [$counter] == $check) {
                    $counter_1 = ++$counter;
                    if (array_key_exists($counter_1, $array_data))
                        return $array_data [$counter_1];
                    else
                        return '';
                }
            }
        } else {
            return '';
        }
    }

    function send_email_global($data) {

        $this->load->library('email');

        $config ['charset'] = 'utf-8';

        $config ['wordwrap'] = TRUE;

        $config ['mailtype'] = 'html';

        $this->email->initialize($config);

        $this->email->from(SUPPORTEMAIL);

        $this->email->to($data ['to']);

        $this->email->subject($data ['subject']);

        $this->email->message($data ['text']);

        $res = $this->email->send();

        $this->email->clear(TRUE);

        return $res;
    }

    /*
     *
     */

    function get_sum_users_reg($school_id) {

////registered uses count

        $this->load->model('users_model');

        $count_schools_user = $this->users_model->get_all_users('', '', $school_id, true);
        $count_reg_user = $this->users_model->get_all_reg_users($school_id);

        $total = $count_schools_user + $count_reg_user;

        return $total;
    }

    /**
     * TO SET COOKIE FOR USER - REMEMBER LOGIN CHECKBOX FUNCTIONALITY
     * Major function
     * private function
     */
    public function set_cookie($rememberme, $data_information, $domain) {



        $data_information ['school_password'] = $this->input->post('password');
        $cookie = array(
            'name' => 'rememberme',
            'value' => json_encode($data_information),
            'expire' => '86500',
            'domain' => $domain
        );
        $this->input->set_cookie($cookie);
    }

    /**
     * TO SET COOKIE FOR USER - REMEMBER LOGIN CHECKBOX FUNCTIONALITY
     * Major function
     * private function
     */
    public function set_cookie_user($rememberme, $data_information, $domain) {



        $data_information ['school_password'] = $this->input->post('password');
        $cookie = array(
            'name' => 'rememberme_user',
            'value' => json_encode($data_information),
            'expire' => '86500',
            'domain' => $domain
        );
        $this->input->set_cookie($cookie);
    }

    /*
     * Get unique hash for fileuploades
     */

    function get_hash() {
        return md5(date('Y-m-d H:i:s') + rand(14545423, 45454545451231230));
    }

    /*
     * image resize function to use
     */

    function resizeprocessimage($source_image, $xsize, $ysize, $new_path, $name) {

        /*
         * Get image size and then do the resizing if needed
         */
        $size_data = getimagesize($source_image);

        if ($size_data [0] < $xsize && $size_data [1] < $ysize) {
            return $new_path;
        } else {

            $config ['image_library'] = 'gd2';
            $config ['source_image'] = $source_image;
            $config ['create_thumb'] = TRUE;
            $config ['maintain_ratio'] = TRUE;
            $config ['width'] = $xsize;
            $config ['height'] = $ysize;
            $config ['new_image'] = $source_image;

            $this->load->library('image_lib', $config);

            /*
             * if uploading is successfully done
             */

            if ($this->image_lib->resize()) {

// get file extension //
                preg_match('/(?<extension>\.\w+)$/im', $name, $matches);
                $extension = $matches ['extension'];
// thumbnail //
                $thumbnail = preg_replace('/(\.\w+)$/im', '', $name) . '_thumb' . $extension;
                return $new_path . $thumbnail;
            } else {
                return 'error';
                die();
            }
        }
    }

}

?>