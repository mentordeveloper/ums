<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Sadmin extends CI_Controller {
    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     * http://example.com/index.php/welcome
     * - or -
     * http://example.com/index.php/welcome/index
     * - or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     *
     * @see http://codeigniter.com/user_guide/general/urls.html
     */

    /**
     * Constructor for permissions
     * Loading only language In constructor
     */
    // for signup page redirect url
    public $host1 = SUBDOMAIN_NAME;
    public $data = array();
    public $school_pass = '';

    function __construct() {
        parent::__construct();
        $this->load->model('sadmin_model');
    }

    public function index($msg = '') {
        $array_data ['session'] = $this->login_credentials_get();

        $array_data ['admin_name'] = array(
            'name' => 'email',
            'id' => 'admin_name',
            'class' => 'login-inp',
            'value' => '',
            'placeholder' => "Username"
        );

        $array_data ['admin_password'] = array(
            'name' => 'password',
            'id' => 'admin_password',
            'class' => 'login-inp',
            'value' => '',
            'placeholder' => "Password"
        );

        $login = $this->session->userdata('sloggedin');

        if ($login) {
            $array_data ['page'] = 'dashboard';
            $this->load->view('sadmin/base', $array_data);
        } else {
            $array_data ['error_msg'] = $msg;

            $array_data ['js_files'] = array(
                base_url('files/calender/src/_loader.js'),
                base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
                base_url('js/knockout-latest.js'),
                base_url('js/instructor.calendar.subscriptions.ko.js'),
                base_url('js/instructor.calendar.export.ko.js'),
                base_url('js/jax.js'),
                base_url('js/extended.modal.jquery.js'),
                base_url('js/extended.alert.js'),
                base_url('js/jaxhandler.js'),
                base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
                base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js'),
                base_url('files/jquery_masking/masking.js'),
                base_url('js/permission.index.js'),
                base_url('js/login.index.js'),
                base_url('files/js/jquery_validation.js')
            );

            $this->load->view('sadmin/login', $array_data);
        }
    }

    function email() {

        $headers = "From: bob@example.com\n";


        if (mail('zabbas44@gmail.com', 'test', 'this is final testing from zain', $headers)) {
            echo 'woking';
        }
    }

    function logout() {
        $this->reset_filter();
        $this->session->unset_userdata('sloggedin');
        $this->session->sess_destroy();
        redirect(base_url() . 'sadmin/');
    }

    function validate($s1 = "", $s2 = "", $s3 = "", $s4 = "") {
        $adminuser = $this->session->userdata('email');

        $st = "";
        if ($s1 != "")
            $st .= $s1 . "/";
        if ($s2 != "")
            $st .= $s2 . "/";
        if ($s3 != "")
            $t .= $s3 . "/";
        if ($s4 != "")
            $st .= $s4 . "/";
        if (isset($adminuser) && $adminuser != "") {
            $string = "";
            if ($s1 != "")
                $string .= $s1 . "/";
            if ($s2 != "")
                $string .= $s2 . "/";
            if ($s3 != "")
                $string .= $s3 . "/";
            if ($s4 != "")
                $string .= $s4 . "/";
            $this->loggedin();
        } else {
            $data ['admin_name'] = array(
                'name' => 'email',
                'id' => 'admin_name',
                'class' => 'text_field',
                'value' => ''
            );

            $data ['admin_password'] = array(
                'name' => 'password',
                'id' => 'admin_password',
                'class' => 'text_field',
                'value' => ''
            );

            $this->form_validation->set_rules('email', "Name", 'trim|required');
            $this->form_validation->set_rules('password', "Password", 'trim|required');

            if ($this->form_validation->run() == FALSE) {
                // this->load->view('comp/adminhead');
                $this->index('Invalid login details!');
                // this->load->view('comp/adminfoot');
            } else {
                $string = "";
                if ($s1 != "")
                    $string .= "/" . $s1;
                if ($s2 != "")
                    $string .= "/" . $s2;
                if ($s3 != "")
                    $string .= "/" . $s3;
                if ($s4 != "")
                    $string .= "/" . $s4;

                $data12 = array();

                $data12 ['lg_email'] = $this->input->post('email');
                $data12 ['lg_password'] = md5($this->input->post('password'));
                $data12 ['lg_type'] = 0;

                // ////set type to session

                $this->load->model('event_model');

                $response = $this->event_model->validate_user_sadmin($data12, '');

                $this->session->unset_userdata('sloggedin');
                if ($response) {

                    $this->session->set_userdata('sloggedin', 'true');

                    redirect("sadmin/loggedin");
                } else {
                    $this->index('Invalid Login. Please try again.');
                }
            }
        }
    }

    function loggedin() {

        redirect('sadmin/home');
    }

    function reset_filter() {
        $this->session->unset_userdata('filter');
    }

    function fileuploading() {


        $title = $this->input->post('title');

        $des = $this->input->post('des');

        $path = 'files/filemanagment/khanapi';

        $db_path = 'files/filemanagment/khanapi';

        $targetFolder = $path;

        if (!empty($_FILES)) {

            $tempFile = $_FILES ['Filedata'] ['tmp_name'];

            $targetPath = SITE_ROOT . $targetFolder;

            $fileParts = pathinfo($_FILES ['Filedata'] ['name']);

            $db_mypath = rtrim($db_path, '/') . '/' . $_FILES ['Filedata'] ['name'];

            $targetFile = rtrim($targetPath, '/') . '/' . $_FILES ['Filedata'] ['name'];

            move_uploaded_file($tempFile, $targetFile);

            $fileTypes = array(
                'mp4',
                'flv'
            ); // File extensions

            $fileParts = pathinfo($_FILES ['Filedata'] ['name']);

            if (in_array($fileParts ['extension'], $fileTypes)) {
                move_uploaded_file($tempFile, $targetFile);

                $data_send = array(
                    'v_path' => base_url() . $db_path . '/' . $_FILES ['Filedata'] ['name'],
                    'v_title' => $title,
                    'v_description' => $des,
                    'file_name' => $_FILES ['Filedata'] ['name'],
                    'date_time' => date_time_helper_current_date()
                );

                $this->sadmin_model->save_video_file($data_send);
            } else {
                echo 'bad';
            }
        }
    }


    function check() {
        $bool = $this->session->userdata('sloggedin');

        if ($bool == 'true') {
            
        } else {
            redirect("admin/");
        }
    }

    function login_credentials_get() {
        $session_admin = array();

        $session_admin ['data'] [0] = array(
            'id' => '0',
            'name' => 'admin',
            'password' => '05665723952545e6cba0158ab8f45a7d',
            'status' => true,
            'date_time' => date('Y-m-d H:i:s'),
            'res' => 1
        );

        $this->session->set_userdata('session_user_data', $session_admin);

        $array_data = array();

        $array_data ['lg_fname'] = 'admin';
        $array_data ['lg_lname'] = 'admin';

        return $array_data;
    }

  
    function home() {
        $this->reset_filter();

        $this->check();

        $array_data ['session'] = $this->login_credentials_get();

        $array_data ['page'] = 'dashboard';

        $array_data ['js_files'] = array(
            base_url('files/calender/src/_loader.js'),
            base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
            base_url('js/knockout-latest.js'),
            base_url('js/instructor.calendar.subscriptions.ko.js'),
            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js'),
            base_url('files/jquery_masking/masking.js'),
            base_url('js/sadmin.index.js'),
            base_url('files/js/jquery_validation.js')
        );

        $this->load->view('sadmin/base', $array_data);
    }

    function my_trigger_email_sadmin($data) {
        $this->load->library('email');

        $config ['mailtype'] = 'html';

        $this->email->initialize($config);

        if (!empty($data)) {

            $this->email->from(SUPPORTEMAIL, 'Admin');

            $this->email->to($data ['email_to']);

            $this->email->subject($data ['email_subject']);

            $this->email->message($data ['email_body']);

            $this->email->send();

            $this->email->clear(TRUE);
        }
    }

    function revert_access() {
        $id = $this->input->get('id');



        $this->sadmin_model->deny_req($id);
    }

    function mng_roles($text = '') {
        $this->reset_filter();

        $this->check();

        $array_data = array();

        $array_data ['js_files'] = array(
            base_url('files/calender/src/_loader.js'),
            base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
            base_url('js/knockout-latest.js'),
            base_url('js/instructor.calendar.subscriptions.ko.js'),
            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js'),
            base_url('files/jquery_masking/masking.js'),
            base_url('files/uploadify/jquery.uploadify.min.js'),
            base_url('files/js/jquery_validation.js'),
            base_url('js/sadmin.index.js'),
            base_url('themes/starlight/js/plugins/jquery.dataTables.min.js'),
            base_url('themes/starlight/js/custom/tables.js')
        );

        $this->load->model('users_model');

        $results = $this->users_model->get_all_roles('', '');

        $array_data ['session'] = $this->login_credentials_get();

        $array_data ['msg'] = $text;

        $array_data ['roles'] = $results;

        $array_data ['page'] = 'mng_roles';

        $this->load->view('sadmin/base', $array_data);
    }

    function mng_skoolType($text = '') {

        $this->reset_filter();

        $this->check();

        $array_data = array();

        $this->data ['js_files'] = array(
            base_url('files/calender/src/_loader.js'),
            base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
            base_url('js/knockout-latest.js'),
            base_url('js/instructor.calendar.subscriptions.ko.js'),
            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js'),
            base_url('files/jquery_masking/masking.js'),
            base_url('js/sadmin.index.js'),
            base_url('js/login.index.js'),
            base_url('files/js/jquery_validation.js'),
            base_url('themes/starlight/js/plugins/jquery.dataTables.min.js'),
            base_url('themes/starlight/js/custom/tables.js')
        );

        $this->load->model('users_model');

        /*
         * zend cache test
         * school type cache v1
         */

        $cacheID = 's_t_c_v1';

        if (!$this->data['roles'] = $this->zf_cache->load($cacheID)) {

            $this->data['roles'] = $this->users_model->get_skool_type('', '');
            $this->zf_cache->save($this->data['roles'], $cacheID, array('all_roles'));
        }

        $this->data ['session'] = $this->login_credentials_get();

        $this->data ['msg'] = $text;

        $this->data ['page'] = 'mng_type';

        $this->load->view('sadmin/base', $this->data);
    }

    function mng_videos() {
        $this->reset_filter();

        $this->check();



        $array_data ['js_files'] = array(
            base_url('files/calender/src/_loader.js'),
            base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
            base_url('files/date_picker_time/date_picker.js'),
            base_url('files/calender/date_picker.js'),
            base_url('js/knockout-latest.js'),
            base_url('js/instructor.calendar.subscriptions.ko.js'),
            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js'),
            base_url('files/jquery_masking/masking.js'),
            base_url('js/videos.index.js'),
            base_url('js/sadmin.index.js'),
            base_url('files/js/jquery_validation.js'),
            base_url('themes/starlight/js/plugins/jquery.dataTables.min.js'),
            base_url('themes/starlight/js/custom/tables.js')
        );

        $array_data ['session'] = $this->login_credentials_get();

        $array_data ['videos'] = $this->sadmin_model->get_all_videos('', '');

        $array_data ['comefrom'] = 'page';

        $array_data ['page'] = 'mng_videos';

        $this->load->view('sadmin/base', $array_data);
    }

    function settings() {
        $this->reset_filter();

        $this->check();



        $array_data ['js_files'] = array(
            base_url('files/calender/src/_loader.js'),
            base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
            base_url('files/date_picker_time/date_picker.js'),
            base_url('files/calender/date_picker.js'),
            base_url('js/knockout-latest.js'),
            base_url('js/instructor.calendar.subscriptions.ko.js'),
            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js'),
            base_url('files/jquery_masking/masking.js'),
            base_url('js/videos.index.js'),
            base_url('files/js/jquery_validation.js'),
            base_url('js/sadmin.index.js')
        );

        $array_data ['session'] = $this->login_credentials_get();

        $array_data ['videos'] = $this->sadmin_model->get_all_videos();

        $array_data ['comefrom'] = 'page';



        $array_data ['permissions'] = $this->sadmin_model->fecth_master_permissions();

        $array_data ['page'] = 'mng_settings';

        $this->load->view('sadmin/base', $array_data);
    }

    function save_master_permissions() {
        $data = array();

        $data_collected = $this->input->post('clear_keys');

        $keys ['clear_keys'] = $data_collected;



        $this->sadmin_model->save_and_update_super_permission($keys);

        redirect('sadmin/settings');
    }

    // //managing all Students here
    function mng_students() {

        $this->check();

        $array_data ['js_files'] = array(
            base_url('files/calender/src/_loader.js'),
            base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
            base_url('js/knockout-latest.js'),
            base_url('js/instructor.calendar.subscriptions.ko.js'),
            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js'),
            base_url('files/jquery_masking/masking.js'),
            base_url('files/uploadify/jquery.uploadify.min.js'),
            base_url('files/js/jquery_validation.js'),
            base_url('js/sadmin.index.js'),
            base_url('themes/starlight/js/plugins/jquery.dataTables.min.js'),
            base_url('themes/starlight/js/custom/tables.js')
        );

        $array_data ['session'] = $this->login_credentials_get();

        $array_data ['students'] = array();//$this->sadmin_model->get_all_schools();

        $array_data ['comefrom'] = 'page';

        $array_data ['page'] = 'mng_students';
         $array_data ['title'] = 'Manage Students';
        $this->load->view('sadmin/base', $array_data);
    }

    function new_student() {
        $this->load->model('users_model');
//        $array_data['schools_type'] = $this->users_model->get_skool_type('', '');
        $this->check();

        $array_data ['js_files'] = array(
//            base_url('files/calender/src/_loader.js'),
            base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
//            base_url('js/knockout-latest.js'),
//            base_url('js/instructor.calendar.subscriptions.ko.js'),
//            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js'),
            base_url('files/jquery_masking/masking.js'),
            base_url('files/uploadify/jquery.uploadify.min.js'),
            base_url('files/js/jquery_validation.js'),
            base_url('js/sadmin.index.js'),
//            base_url('themes/starlight/js/plugins/jquery.dataTables.min.js'),
//            base_url('themes/starlight/js/custom/tables.js')
        );

        $array_data ['session'] = $this->login_credentials_get();

        $array_data ['addmission_id'] = $this->sadmin_model->get_max_addmission_id();
        $array_data ['students'] = array();//$this->sadmin_model->get_all_schools();
        $array_data ['countries'] = $this->sadmin_model->get_all_countries();

        $array_data ['comefrom'] = 'page';

        $array_data ['page'] = 'mng_students';
        $array_data ['title'] = 'New Student';

//printr($array_data);
        $this->load->view('sadmin/base', $array_data);
    }
    
    function save_student() {
        $this->load->model('users_model');
    
        $data_send = array();
//printr($this->input->post());
        $data_student_arr = array();

        '[addmission_id] => 1
        [add_date] => 03-10-2014
        [lg_fname] => ندفالسج
        [lg_lname] => sadjla
        [lg_username] => admin
        [lg_password] => allah1@
        [dob] => 03-10-2014
        [gender] => male
        [fin_cate] => libyan
        [blood_group] => A+
        [birth_place] => asda
        [nationality] => Libyan_Arab_Jamahiriya
        [mother_lang] => urdu
        [add_cate] => 1
        [religion] => Islam
        [national_id] => 3520251426271
        [transportation] => no
        [accommodation] => no
        [eng_name] => umair majeed
        [faculty] => BIT
        [year] => 2014
        [batch] => Fall
        [bar_num] => BIT_Fall_2014_1
        [address1] => lahore
        [address2] => lahore
        [city] => lahore
        [state] => punjab
        [pin_code] => 54000
        [country] => Libyan_Arab_Jamahiriya
        [phone] => 54545454
        [m_phone] => 455256625205
        [lg_email] => mum@gmail.com
        [par_fname] => abdul
        [par_lname] => majeed
        [par_relation] => Islam
        [par_dob] => 343434
        [par_education] => MA
        [par_occupation] => Teaching
        [par_email] => majeed@gamil.com
        [par_address1] => lahore
        [par_address2] => lhaore
        [par_city] => lahore
        [par_state] => punjab
        [par_country] => Libyan_Arab_Jamahiriya
        [par_phone1] => 349034043043
        [par_phone2] => 9430304349309
        [par_mobile] => 304349030949304
        [ins_name] => PUCIT
        [ed_course] => BSIT
        [ed_year] => 2014
        [ed_total_marks] => 4
        [ed_total_grade] => 3.35';
        
        $data_login = array();
        $data_login ['lg_fname'] = $this->input->post('lg_fname');
        $data_login ['lg_lname'] = $this->input->post('lg_lname');
        $data_login ['lg_email'] = $this->input->post('lg_email');
        $data_login ['lg_email_id'] = $this->input->post('lg_lname');
        $data_login ['lg_password'] = md5('user');
        $data_login ['lg_type'] = $this->sadmin_model->get_role_id_by_name('university');
        $data_login ['s_id'] = 1;
        $data_login ['is_super_admin'] = 2;
        
        $user_id = $this->users_model->save_user_login($data_login);
        $data_login ['lg_id'] = $user_id;
        /*
         * Student Info Personal, Contact, Academic and Admission.
         */
        $data_student = array();
        $data_student['st_lg_id'] = $user_id;
        $data_student['st_addmission_id'] = $this->input->post('addmission_id');
        $data_student['st_add_date'] = $this->input->post('add_date');
        $data_student['st_fname'] = $this->input->post('lg_fname');
//        $data_student['st_mname'] = $this->input->post('lg_fname');
        $data_student['st_lname'] = $this->input->post('lg_lname');
        $data_student['st_faculty'] = $this->input->post('faculty');
        $data_student['st_year'] = $this->input->post('year');
        $data_student['st_batch'] = $this->input->post('batch');
        $data_student['st_roll_number'] = $this->input->post('bar_num');
        
        
//        ucwords(ci_urldecode(

        $data_student['st_dob'] = $this->input->post('dob');
        $data_student['st_gender'] = $this->input->post('gender');
        $data_student['st_fin_cate'] = $this->input->post('fin_cate');
        $data_student['st_blood_group'] = $this->input->post('blood_group');
        $data_student['st_birth_place'] = $this->input->post('birth_place');
        $data_student['st_nationality'] = $this->input->post('nationality');
        $data_student['st_mother_tongue'] = $this->input->post('mother_lang');
        '[add_cate] => 1
        [religion] => Islam
        [national_id] => 3520251426271
        [transportation] => no
        [accommodation] => no
        [eng_name] => umair majeed
        
        [address1] => lahore
        [address2] => lahore
        [city] => lahore
        [state] => punjab
        [pin_code] => 54000
        [country] => Libyan_Arab_Jamahiriya
        [phone] => 54545454
        [m_phone] => 455256625205
        [lg_email] => mum@gmail.com
        ';
        $data_student['st_cate'] = $this->input->post('add_cate');
        $data_student['st_religion'] = $this->input->post('religion');
        $data_student['st_nationalId'] = $this->input->post('national_id');
        $data_student['st_address_1'] = $this->input->post('address1');
        $data_student['st_addres_2'] = $this->input->post('address2');
        $data_student['st_city'] = $this->input->post('city');
        $data_student['st_state'] = $this->input->post('state');
        $data_student['st_pin_code'] = $this->input->post('pin_code');
        $data_student['st_country'] = $this->input->post('country');
        $data_student['st_phone'] = $this->input->post('phone');
        $data_student['st_mphone'] = $this->input->post('m_phone');
        $data_student['st_email'] = $this->input->post('lg_email');
        $data_student['st_image'] = $this->input->post('lg_fname');
        $data_student['st_transportation'] = $this->input->post('lg_fname');
        $data_student['st_accommodation'] = $this->input->post('lg_fname');
        $data_student['st_eng_name'] = $this->input->post('lg_fname');
        $data_student['st_last_ins_name'] = $this->input->post('lg_fname');
        $data_student['st_last_ins_course'] = $this->input->post('lg_fname');
        $data_student['st_last_ins_year'] = $this->input->post('lg_fname');
        $data_student['st_last_ins_t_mark'] = $this->input->post('lg_fname');
        $data_student['st_last_ins_y_mark'] = $this->input->post('lg_fname');
        $data_student['st_data'] = $this->input->post('lg_fname');
        

        // ////////////////////////// end of linking up with unversity calender
        // and new role
        // //adding school admin school course
        // /////////////
        $this->load->library('pagination');

        $config ['base_url'] = base_url() . index_page() . '/sadmin/mng_schools';

        $config ['total_rows'] = $this->sadmin_model->static_count_schools();

        $config ['per_page'] = 10;

        $config ["uri_segment"] = 3;

        $this->pagination->initialize($config);

        $page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 0;

        $data_send ['schools'] = $this->sadmin_model->get_all_schools($config ["per_page"], $page);

        // $array_data['comefrom'] = 'page';
        $data_send ['comefrom'] = 'ajax';

        $data_send ['page'] = 'mng_schools';

        if ($page == 'First') {
            $data_send ['i'] = 1;
        } else {
            $data_send ['i'] = (10 * $page / 10) + 1;
        }

        $data_send ['schools'] = $this->sadmin_model->get_all_schools();

        if ($this->input->post('page') == 'page') {
            echo 'saved';
        } else {

            $this->load->view('sadmin/mng_schools', $data_send);
        }
    }


    function remove_student() {

        $id = $this->input->get('remove_school');

        $data = $this->sadmin_model->get_school_byid($id);

        $this->zf_cache->remove($data['school_subdomain']);

        $this->sadmin_model->additional_general($id);

        $this->sadmin_model->adittional_info($id);

        $this->sadmin_model->assignments_uploads($id);

        $this->sadmin_model->remove_attendences($id);

        $this->sadmin_model->attendence_notes($id);

        $this->sadmin_model->courses_relationship($id);

        $this->sadmin_model->remove_custom_event_types($id);

        $this->sadmin_model->remove_event_general($id);

        $this->sadmin_model->remove_file_sharing($id);

        $this->sadmin_model->remove_forum($id);

        $this->sadmin_model->remove_groupchat($id);

        $this->sadmin_model->remove_groupchatdata($id);

        $this->sadmin_model->remove_instructor_hours($id);

        $this->sadmin_model->remove_messages($id);

        $this->sadmin_model->remove_notification($id);

        $this->sadmin_model->remove_permissions($id);

        $this->sadmin_model->remove_user_colors($id);

        $school_role = $this->sadmin_model->get_role_id_by_name('admin school');

        $this->sadmin_model->remove_school_record($id, $school_role);

        $this->sadmin_model->remove_school_users_all($id);

        $this->sadmin_model->remove_school_users_custom_calender($id);

        $this->sadmin_model->remove_threadposts($id);

        $this->sadmin_model->remove_settings_school($id);

        $this->sadmin_model->remove_roles($id);

        $this->sadmin_model->deny_req1($id);
    }

    function update_student() {
        $id = $this->input->get('id');

        $up_scool = $this->sadmin_model->get_school_byid($id);

        $data_send ['schools'] = $up_scool;

        $data_send ['comefrom'] = 'ajax';

        $get_skool = $this->users_model->dropdown_skooltype();

        $type_s = '';

        $data_send ['selected'] = '';

        if (!empty($get_skool)) {
            foreach ($get_skool as $i => $get_s_type) {
                if ($get_s_type ['role_name'] == $up_scool ['type']) {
                    $data_send ['selected'] = $i;
                }

                $type_s [] = $get_s_type ['role_name'];
            }

            $data_send ['schools_type'] = form_dropdown('role_name', $type_s, $data_send ['selected'], 'id="skool_typee"');

            $data_send ['schools_chek'] = $type_s;
        }

        $this->load->view('sadmin/update_school', $data_send);
    }


    /*
     * Add default payments
     */

    // /////update school information
    function update_student_go() {


        $this->load->model('users_model');

        $data_send = array();

        $data ['school_username'] = $this->input->post('school_username');

        if ($this->input->post('school_password') != '') {
            $data ['school_password'] = md5($this->input->post('school_password'));
        }
        $data ['status'] = $this->input->post('status');
        $data ['date_time'] = date_time_helper_current_date();
        $data ['school_email'] = $this->input->post('school_email');
        $data ['type'] = $this->input->post('s_type');

        $id = $this->input->post('id');

        $resultant = $this->users_model->get_school_record($id);
        $rec_id = '';
        $per_id = '';
        $USer_id = '';
        $USer_role = '';

        foreach ($resultant as $manag_arr) {
            $USer_id = $manag_arr ['id'];
            $USer_role = $manag_arr ['role_name'];
        }

        if ($this->input->post('s_type') != $USer_role) {

            $this->users_model->update_existing_record($data ['type'], $USer_id);
            // get role id of main super admin role type to get its permission
            $resultat = $this->users_model->get_record_main($data ['type']);

            foreach ($resultat as $manag_arry) {
                $rec_id = $manag_arry ['id'];
            }

            $result = $this->users_model->get_permission_ofskool($rec_id);
            $core = '';
            foreach ($result as $manag) {
                $per_id = $manag ['permission_array'];
                $core = $manag ['permission_core'];
            }

            $data_array ['permission_array'] = $per_id;
            $data_array ['admin_permissions'] = '';
            $data_array ['permission_core'] = $core;
            if ($data_array ['permission_array'] != 'false')
                $this->users_model->update_school_permisions($data_array, $USer_id);

            $rest = array();
            $temp = array();
            // retrieve all roles existig in this school
            $rest = $this->sadmin_model->retrieve_school_roles($id);
            if (!empty($rest)) {

                foreach ($rest as $get_rest) {
                    $temp [] = $get_rest ['id'];
                }

                $i = 0;
                $dataarray = array();
                for ($i; $i < count($temp); $i++) {

                    $dataarray ['permission_array'] = $per_id;
                    $dataarray ['admin_permissions'] = $per_id;
                    $res = $this->sadmin_model->update_school_roles($dataarray, $temp [$i]);
                }
            }
        }
        // also update all roles existing in this school

        $res = $this->sadmin_model->update_school_record($data, $id);

        $data_send ['schools'] = $this->sadmin_model->get_all_schools('', '');

        $data_send ['comefrom'] = 'page';

        $data_send ['page'] = 'mng_schools';

        $data_send ['comefrom'] = 'ajax';

        $this->load->view('sadmin/mng_schools', $data_send);
    }
    
    function check_student_name() {
        $this->check();

        $data = array();


        $data ['name'] = $this->input->post('name');
        $data ['username'] = $this->input->post('username');
        $data ['domainname'] = $this->input->post('domainname');

        $res = $this->sadmin_model->check_school_record($data);

        // checking for school username

        if ($res) {
            echo 'false';
            die();
        }

        $username = $this->sadmin_model->check_school_username($data);

        if ($username) {
            echo 'false';
            die();
        }

        $domainname = $this->sadmin_model->check_school_domainname($data);

        if ($domainname) {
            echo 'false';
            die();
        }
    }


    function new_category() {
        $data = array();

        $data ['js_files'] = array(
            base_url('themes/starlight/js/plugins/jquery.dataTables.min.js'),
            base_url('themes/starlight/js/custom/tables.js')
        );



        $data['categories'] = $this->sadmin_model->get_all_category();

        $this->load->view('sadmin/new_category', $data);
    }

    function add_cat_new() {
        $name = $this->input->get('name');



        echo $id = $this->sadmin_model->add_category_new($name);
        $schools_data = $this->sadmin_model->get_all_schools();
        foreach ($schools_data as $key => $school_data) {
            $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
            $sql_db = "USE " . $db_name;
            if ($this->db->simple_query($sql_db)) {
                $this->sadmin_model->add_category_new($name);
            }
        }
        $sql_db = "USE " . DATABASE_STRUCTURE;
        if ($this->db->simple_query($sql_db)) {
            
        }
    }


    function remove_cat() {
        $id = $this->input->get('remove_cat');



        echo $this->sadmin_model->remove_cat_record($id);
        $schools_data = $this->sadmin_model->get_all_schools();
        foreach ($schools_data as $key => $school_data) {
            $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
            $sql_db = "USE " . $db_name;
            if ($this->db->simple_query($sql_db)) {
                $this->sadmin_model->remove_cat_record($id);
            }
        }
        $sql_db = "USE " . DATABASE_STRUCTURE;
        if ($this->db->simple_query($sql_db)) {
            
        }
    }

    function language_settings() {
        $this->reset_filter();

        $this->load->model('courses_model');

        $this->load->model('settings_model');

        $this->load->model('users_model');

        $this->load->model('cross_athentication_model');

        $array_data ['session'] = $this->login_credentials_get();

        $array_data ['js_files'] = array(
            base_url('bootstrap/js/bootstrap.js'),
            base_url('js/sadmin.index.js'),
            base_url('files/calender/src/_loader.js'),
            base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
            base_url('js/knockout-latest.js'),
            base_url('js/instructor.calendar.subscriptions.ko.js'),
            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js'),
            base_url('files/jquery_masking/masking.js'),
            base_url('files/uploadify/jquery.uploadify.min.js'),
            base_url('files/js/jquery_validation.js'),
            base_url('js/sadmin.index.js')
        );

        $array_data ['languages'] = $this->settings_model->get_language_list();

        $array_data ['page'] = 'mng_language';

        $this->load->view('sadmin/base', $array_data);
    }

    function remove_language_options() {
        $this->load->model('settings_model');

        $id = $this->input->get('id');

        $title = $this->input->get('title');

        $dirPath = './application/language/' . $title;
        // //////removing directory and its files
        if (!is_dir($dirPath)) {
            throw new InvalidArgumentException("$dirPath must be a directory");
        }
        if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
            $dirPath .= '/';
        }
        $files = glob($dirPath . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) {
                self::deleteDir($file);
            } else {
                unlink($file);
            }
        }
        rmdir($dirPath);

        $this->settings_model->get_language_removed($title);
    }

    function open_feilds_lang() {
        $title = $this->input->get('title');

        $html = '';

        $html .= '<form action="#" class="stdform"> <div class="contenttitle radiusbottom0"><h2 class="table"><span>' . $title . ' Language Settings</span> </h2></div>';

        $html .= '<table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">';

        $i = 0;

        $lang = array();

        $lang [] = "Welcome";
        $lang [] = "notifications";
        $lang [] = "Messages";
        $lang [] = "Compose";
        $lang [] = "Inbox";
        $lang [] = "Sent";
        $lang [] = "Trash";
        $lang [] = "Enter Group chat";
        $lang [] = "From";
        $lang [] = "To";
        $lang [] = "Subject";
        $lang [] = "Send Message";
        $lang [] = "Attachment";
        $lang [] = "Action";
        $lang [] = "Email";
        $lang [] = "Update";
        $lang [] = "No mails found";
        $lang [] = "Remove";
        $lang [] = 'Reset';
        $lang [] = "Add Friend";
        $lang [] = "Add to chat";
        $lang [] = "No More Users";
        $lang [] = "Add More";
        $lang [] = "Send";
        $lang [] = "New Chat title";
        $lang [] = "Select users";
        $lang [] = "For new chat";
        $lang [] = "My chats";
        $lang [] = "View chat";
        $lang [] = "Start chat";
        $lang [] = "Forward";
        $lang [] = "Reply";
        $lang [] = "Message Body";
        $lang [] = "Grade book";
        $lang [] = "Notes";
        $lang [] = "Add notes";
        $lang [] = "Public";
        $lang [] = "Private";
        $lang [] = "Save";
        $lang [] = "Showing Assignments for";
        $lang [] = "Students";
        $lang [] = "Total Marks";
        $lang [] = "Refresh Marks";
        $lang [] = "Assignments";
        $lang [] = "Grading";
        $lang [] = "All Videos";
        $lang [] = "Title";
        $lang [] = "Video";
        $lang [] = "Search Video";
        $lang [] = "Search";
        $lang [] = "No videos found";
        $lang [] = "Video Title";
        $lang [] = "Loading the player";
        $lang [] = "Video Description";
        $lang [] = "Video Rating";
        $lang [] = "Rank";
        $lang [] = "Post Comment";
        $lang [] = "Comments";
        $lang [] = "Post";
        $lang [] = "Attendance";
        $lang [] = "Attendance book";
        $lang [] = "Please select date";
        $lang [] = "Today Attendance";
        $lang [] = "Current date will be displayed if not selected";
        $lang [] = "Showing Attendance for";
        $lang [] = "Date";
        $lang [] = "No Attendance For today is founded";
        $lang [] = "Present";
        $lang [] = "Late";
        $lang [] = "Total Class Events";
        $lang [] = "Total Attendance Marked";
        $lang [] = "Excused Absence";
        $lang [] = "Unexcused Absence";
        $lang [] = "Total Attendance";
        $lang [] = "Attendance for course";
        $lang [] = "Total Classes Taken";
        $lang [] = "Classes Status";
        $lang [] = "Total Classes Missed";
        $lang [] = "Average";
        $lang [] = "File sharing Management";
        $lang [] = "Select Course to see files";
        $lang [] = "Shared Files";
        $lang [] = "Shared by";
        $lang [] = "Create New Folder";
        $lang [] = "Select Folder To upload files";
        $lang [] = "Please Select Folder";
        $lang [] = "Select Files to Upload";
        $lang [] = "Upload";
        $lang [] = "Add";
        $lang [] = "Reports";
        $lang [] = "Export syllabus";
        $lang [] = "Export Grade book";
        $lang [] = "Export Attendance";
        $lang [] = "Name";
        $lang [] = "Status";
        $lang [] = "Created Date";
        $lang [] = "Courses Settings";
        $lang [] = "Account Settings";
        $lang [] = "Forums";
        $lang [] = "Create New Forum";
        $lang [] = "No Forums";
        $lang [] = "Forum title";
        $lang [] = "Create Forum";
        $lang [] = "Threads";
        $lang [] = "Posting a New Topic in";
        $lang [] = "Topic Title";
        $lang [] = "Back";
        $lang [] = "Post New topic";
        $lang [] = "Reply to this topic";
        $lang [] = "Post Reply";
        $lang [] = "user";
        $lang [] = "No posts";
        $lang [] = "Post Reply";
        $lang [] = "Posted on";
        $lang [] = "Create New Topic";
        $lang [] = "No threads";
        $lang [] = "Forum";
        $lang [] = "Created by";
        $lang [] = "Posts";

        $lang [] = 'Course Additional Information';
        $lang [] = 'Instructor Additional Information';
        $lang [] = 'Instructor image';
        $lang [] = 'Time Zone';
        $lang [] = 'Instructor office hours';
        $lang [] = 'Weekday';
        $lang [] = 'Start time';
        $lang [] = 'End time';
        $lang [] = 'Remove';
        $lang [] = 'Address';
        $lang [] = 'city';
        $lang [] = 'state';
        $lang [] = 'zip';
        $lang [] = 'email';
        $lang [] = 'phone';
        $lang [] = 'fax';
        $lang [] = 'website';
        $lang [] = 'notes';

        $lang [] = 'Manage users';
        $lang [] = 'Manage roles';
        $lang [] = 'Manage courses';
        $lang [] = 'Manage calendars';
        $lang [] = 'Calendar';
        $lang [] = 'Information';
        $lang [] = 'Settings';
        $lang [] = 'About Page';
        $lang [] = 'Packages';
        $lang [] = 'Purchases';

        $html .= '<tr><td>Add Translation According to Labels :</td>';

        $html .= '<td><select id="sel_lang" >';

        for ($i; $i < count($lang); $i++) {
            $html .= '<option value="' . $lang [$i] . '">' . $lang [$i] . '</option>';
        }

        $html .= '</select></td></tr>';

        $html .= '<input type="hidden" id="my_title" value="' . $title . '" />';

        $html .= '<tr><td></td><td ><input type="text" id="my_select_field" ></td></tr>';

        $html .= '<tr><td></td><td id="updt_notf"></td></tr>';

        $html .= '<tr><td colspan="2" align="right">
			<button class="stdbtn" onclick="Update_language()" type="button">Add</button>
			</td>';

        $html .= '</tr></table><form/>';

        echo $html;
    }

    function update_language_file() {
        $title = $this->input->get('title');

        $field = $this->input->get('field');

        $value = $this->input->get('value');

        $search = '';

        $replace_with = '';

        $file = './application/language/' . $title . '/mci_lang.php';

        // $cont =
        // "\n$"."config['mci_languages']"."['".$title."']="."'".$title."';";
        // $search = "$"."lang['".$field."']='".$field."';";
        $replace_with = "\n$" . "lang['" . $field . "']='" . $value . "';\n";

        $search3 = "$" . "lang['" . $field . "']=";

        $lines = file('./application/language/' . $title . '/mci_lang.php');
        foreach ($lines as $line) {
            // Check if the line contains the string we're looking for, and
            // print if it does
            if (stristr($line, $search3)) {

                $content = str_replace($line, $replace_with, file_get_contents('./application/language/' . $title . '/mci_lang.php'));

                file_put_contents('./application/language/' . $title . '/mci_lang.php', $content);
                break;
            }
        }
    }

    function create_language_folder() {
        $this->load->model('settings_model');

        $title = $this->input->get('title');

        $html = '';

        $rest = '';

        $rest = $this->settings_model->check_if_exists($title);

        if (!empty($rest)) {
            $html .= '<span class="error">Language Already Exists</span>';
        } else {

            $base_path = './application/language/';

            // creat base_dir as user_id to hold attachments
            if (!is_dir($base_path)) {
                mkdir($base_path);
                mkdir($base_path . '/' . $title);
            } else {
                mkdir($base_path . '/' . $title);
            }

            $cont = '';

            copy('./application/language/mci_lang.php', './application/language/' . $title . '/mci_lang.php');

            // $config['mci_languages']['Portuguese'] = 'Portuguese';
            // $contentt= "$config['mci_languages']['".$title."']='".$title."'";
            $cont = "\n$" . "config['mci_languages']" . "['" . $title . "']=" . "'" . $title . "';";

            file_put_contents('./application/config/mci_languages.php', $cont, FILE_APPEND | LOCK_EX);

            $html .= '<li onclick="open_feildslang()" style="cursor: pointer;" >' . $title . '</li>';

            $this->settings_model->save_new_language($title);
        }

        echo $html;
    }



    function mng_account() {
        $array_data ['js_files'] = array(
            base_url('bootstrap/js/bootstrap.js'),
            base_url('js/sadmin.index.js'),
            base_url('files/js/jquery_validation.js')
        );

        $this->load->view('sadmin/mng_account', $array_data);
    }

    


    public function saveperuser() {

        $this->load->model('users_model');

        $array_data = $this->input->post('permis');

        $core_data = $this->input->post('core_permissions');

        $p_id = $this->input->post('p_id');

        $ope = $this->users_model->save_permissions($array_data, $core_data, $p_id);
        $schools_data = $this->sadmin_model->get_all_schools();
        foreach ($schools_data as $key => $school_data) {
            $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
            $sql_db = "USE " . $db_name;
            if ($this->db->simple_query($sql_db)) {
                $ope = $this->users_model->save_permissions($array_data, $core_data, $p_id);
            }
        }
        $sql_db = "USE " . DATABASE_STRUCTURE;
        if ($this->db->simple_query($sql_db)) {
            
        }
        redirect('sadmin/feature_permissions?msg=' . $ope . '&id=' . $p_id);
    }

    public function saveperuser_type() {
        $this->load->model('users_model');

        $array_data = $this->input->post('permis');

        $core_data = $this->input->post('core_permissions');

        $p_id = $this->input->post('p_id');

        $ope = $this->users_model->save_permissions($array_data, $core_data, $p_id);
        $schools_data = $this->sadmin_model->get_all_schools();
        foreach ($schools_data as $key => $school_data) {
            $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
            $sql_db = "USE " . $db_name;
            if ($this->db->simple_query($sql_db)) {
                $ope = $this->users_model->save_permissions($array_data, $core_data, $p_id);
            }
        }
        $sql_db = "USE " . DATABASE_STRUCTURE;
        if ($this->db->simple_query($sql_db)) {
            
        }
        redirect('sadmin/feature_permissions_skool?msg=' . $ope . '&id=' . $p_id);
    }

    public function savepermyschool_type() {
        $this->load->model('users_model');

        $array_data = $this->input->post('permis');
        $school_name = $this->input->post('user_school');
        $user_getid = $this->input->post('nameuser');
        $core_data = '';

        // to get all records of particular schools to update permissions


        $ope = $this->users_model->retrieve_usersofschool($school_name);

        foreach ($ope as $update) {

            $this->users_model->update_permissions_of_oneschool($update ['id'], $array_data, $core_data);
        }

        $ope = $this->users_model->update_permissions_of_oneschool($user_getid, $array_data, $core_data);
        $school_data = $this->sadmin_model->get_school_byid($school_name);
        $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];

        $sql_db = "USE " . $db_name;
        if ($this->db->simple_query($sql_db)) {
            $ope = $this->users_model->retrieve_usersofschool($school_name);
            foreach ($ope as $update) {
                $this->users_model->update_permissions_of_oneschool($update ['id'], $array_data, $core_data);
            }

            $ope = $this->users_model->update_permissions_of_oneschool($user_getid, $array_data, $core_data);
            $sql_db = "USE " . DATABASE_STRUCTURE;
            if ($this->db->simple_query($sql_db)) {
                
            }
        }
        redirect('sadmin/permissions_skoollevel?id=' . $school_name . '&msg=' . $ope);
    }

    function mng_permission($text = '') {
        $array_data = array();

        $this->load->model('users_model');

        $results = $this->users_model->get_all_roles();

        $array_data ['msg'] = $text;
        $array_data ['roles'] = $results;

        $array_data ['session'] = $this->login_credentials_get();

        $this->load->view('sadmin/base', $array_data);
    }

    public function addpermission() {
        $this->load->model('users_model');

        $value = $this->input->post('permission');
        $permission_mask = $this->input->post('permission_mask');
        $p_id = $this->input->post('p_id');

        $count = $this->users_model->get_permission_by_name($value);

        if ($count > 0) {
            redirect('sadmin/feature_permissions?id=' . $p_id . '&go=false&msg=Permission name already exists!');
        }

        if (empty($value)) {
            redirect('sadmin/feature_permissions?id=' . $p_id . '&go=false&msg=Please enter permission name');
        }

        if (empty($permission_mask)) {
            redirect('sadmin/feature_permissions?id=' . $p_id . '&go=false&msg=Please enter permission mask name');
        }

        if (!empty($value)) {
            $added = $this->users_model->add_permission($this->input->post('permission'), $permission_mask);
            $schools_data = $this->sadmin_model->get_all_schools();
            foreach ($schools_data as $key => $school_data) {
                $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
                $sql_db = "USE " . $db_name;
                if ($this->db->simple_query($sql_db)) {
                    $added1 = $this->users_model->add_permission($this->input->post('permission'), $permission_mask);
                }
            }
            $sql_db = "USE " . DATABASE_STRUCTURE;
            if ($this->db->simple_query($sql_db)) {
                
            }
            if ($added) {
                redirect('sadmin/feature_permissions?id=' . $p_id . '&go=true&msg=permission added successfully');
            }
        }
    }

    function updatepermissionsname() {
        $this->load->model('users_model');

        $permission_id = $this->input->get('id');

        $data_permission ['permission'] = $this->users_model->get_permission_by_id($permission_id);

        $this->load->view('sadmin/update_permission_name', $data_permission);
    }

    public function update_cofirm_permission() {
        $this->load->model('users_model');

        $permission_id = $this->input->get('id');

        $permission_mask = $this->input->get('permission_mask');

        $this->users_model->update_permission($permission_id, $permission_mask);
        $schools_data = $this->sadmin_model->get_all_schools();
        foreach ($schools_data as $key => $school_data) {
            $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
            $sql_db = "USE " . $db_name;
            if ($this->db->simple_query($sql_db)) {
                $this->users_model->update_permission($permission_id, $permission_mask);
            }
        }
        $sql_db = "USE " . DATABASE_STRUCTURE;
        if ($this->db->simple_query($sql_db)) {
            
        }
        $data = $this->users_model->get_permission_by_id($permission_id);

        echo '		
					<td align="left"><strong>' . $data ['id'] . '</strong></td>
					<td align="left">' . $data ['permission_mask_name'] . '</td>
					<td align="left"><input type="checkbox" name="permis[]" value="' . $data ['id'] . '" /></td>
					<td align="right">
					
					<!--<a class="btn btn_trash" href="' . base_url() . index_page() . 'sadmin/removepermi?id=' . $data ['id'] . '"  style="background-color: rgb(247, 247, 247);"> <span>Trash</span> </a> 
          -->
          			<a id="update_permission_set" class="btn btn_info" href="' . base_url() . index_page() . 'sadmin/updatepermissionsname?id=' . $data ['id'] . '" style="background-color: rgb(247, 247, 247);"> <span>Update</span> </a>
					
					
				';
        echo '       
					<script src="' . base_url() . 'js/sadmin.index.js" type="text/javascript"></script>';
    }

    public function removepermi() {
        $id = $this->input->get('id');
        if (!empty($id)) {

            $this->load->model('users_model');

            $results = $this->users_model->remove_permission_by_id($this->input->get('id'));
            $schools_data = $this->sadmin_model->get_all_schools();
            foreach ($schools_data as $key => $school_data) {
                $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
                $sql_db = "USE " . $db_name;
                if ($this->db->simple_query($sql_db)) {
                    $results = $this->users_model->remove_permission_by_id($this->input->get('id'));
                }
            }
            $sql_db = "USE " . DATABASE_STRUCTURE;
            if ($this->db->simple_query($sql_db)) {
                
            }
            redirect('sadmin/feature_permissions?go=true&msg=Permission Removed successfully');
        }
        if (empty($id)) {
            redirect('sadmin/feature_permissions?go=false&msg=Invalid Permission id to remove');
        }
    }

    public function removepermimish() {
        $id = $this->input->get('id');

        $sk_id = $this->input->get('skool_id');
        if (!empty($id)) {

            $this->load->model('users_model');

            $get_this_user_permissions = $this->users_model->get_role_by_skooll($sk_id);
            // $results =
            // $this->users_model->remove_permission_by_id($this->input->get('id'));

            foreach ($get_this_user_permissions as $get_per) {
                $id_user = $get_per ['id'];
            }
            $re = $this->users_model->retrive_record($id_user);

            foreach ($re as $rest)
                $vari = json_decode($rest ['permission_array']);

            $arr = array_diff($vari, array(
                $id
            ));
            $my_json = json_encode(array_values($arr));
            $gg = $this->users_model->update_retrive_record($id_user, $my_json);
            $schools_data = $this->sadmin_model->get_all_schools();
            foreach ($schools_data as $key => $school_data) {
                $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
                $sql_db = "USE " . $db_name;
                if ($this->db->simple_query($sql_db)) {
                    $gg = $this->users_model->update_retrive_record($id_user, $my_json);
                }
            }
            $sql_db = "USE " . DATABASE_STRUCTURE;
            if ($this->db->simple_query($sql_db)) {
                
            }
            redirect('sadmin/permissions_skoollevel?go=true&msg=Permission Removed successfully');
        }
        if (empty($id)) {
            redirect('sadmin/permissions_skoollevel?go=false&msg=Invalid Permission id to remove');
        }
    }


    public function permissions_skoollevel() {
        $my_role_s = '';

        $my_main_id = '';

        $array_data = array();

        $this->load->model('users_model');

        $id = $this->input->get('id');

        $array_data ['skool_id'] = $id;
        // to get record against skool id and type for getting permisions of
        // particular school
        $akh = $this->users_model->get_role_by_skooll($id);

        $my_bar = '';

        foreach ($akh as $get_ded) {
            $my_bar = $get_ded ['id'];
            $my_role_s = $get_ded ['role_name'];
        }

        $get_main_perm = $this->users_model->get_this_main_permission($my_role_s);

        foreach ($get_main_perm as $get_main) {
            $my_main_id = $get_main ['id'];
        }

        $get_adminn = $this->users_model->get_this_user_permission($my_main_id);

        if (isset($get_adminn ['permission_array'])) {
            $data_main = json_decode($get_adminn ['permission_array']);
            $array_data ['admin_ps_main'] = $this->users_model->get_selected_permission($data_main);
        }

        $array_data ['session'] = $this->login_credentials_get();

        $get_this_user_permissions = $this->users_model->get_this_user_permission($my_bar);

        if (isset($get_this_user_permissions ['permission_array'])) {
            $array_data ['saved_data'] = json_decode($get_this_user_permissions ['permission_array']);

            $array_data ['core_permissions'] = $get_this_user_permissions ['permission_core'];
            $array_data ['admin_perms_list'] = $this->users_model->get_selected_permission($array_data ['saved_data']);
        } else {
            $array_data ['saved_data'] = array();
            $array_data ['core_permissions'] = '';
        }

        $array_data ['user_idd'] = $my_bar;
        $array_data ['user_school'] = $id;

        // $array_data['permissions'] = $results;

        $array_data ['js_files'] = array(
            base_url('files/calender/src/_loader.js'),
            base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
            base_url('js/knockout-latest.js'),
            base_url('js/instructor.calendar.subscriptions.ko.js'),
            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js'),
            base_url('files/jquery_masking/masking.js'),
            base_url('files/js/jquery_validation.js'),
            base_url('js/sadmin.index.js')
        );

        $array_data ['page'] = 'mng_schools';

        $array_data ['schools'] = $this->sadmin_model->get_all_schools();

        $array_data ['schools_data'] = $this->sadmin_model->get_school_byid($array_data ['skool_id']);

        $this->load->view('sadmin/base', $array_data);
    }

    public function add_skool_type() {
        $this->load->model('users_model');

        $value = $this->input->post('role');

        if (empty($value)) {
            // redirect('sadmin/mng_skoolType?go=false&msg=Please enter Type
            // name');
        }

        if (!empty($value)) {

            $data = $this->session->userdata('session_user_data');
            $id = $this->users_model->add_schooltype($this->input->post('role'), $data ['data'] [0] ['id']);
            $schools_data = $this->sadmin_model->get_all_schools();
            foreach ($schools_data as $key => $school_data) {
                $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
                $sql_db = "USE " . $db_name;
                if ($this->db->simple_query($sql_db)) {
                    $ids = $this->users_model->add_schooltype($this->input->post('role'), $data ['data'] [0] ['id']);
                }
            }
            $sql_db = "USE " . DATABASE_STRUCTURE;
            if ($this->db->simple_query($sql_db)) {
                
            }
            $cacheID = 's_t_c_v1';

            $this->zf_cache->remove($cacheID);

            if (!empty($id)) {
                redirect('sadmin/mng_skoolType?go=true&msg=School Type added successfully');
            }
        }
    }

    public function add() {
        $this->load->model('users_model');

        $value = $this->input->post('role');

        if (empty($value)) {
            // redirect('sadmin/mng_roles?go=false&msg=Please enter role name');
        }

        if (!empty($value)) {
            $data = $this->session->userdata('session_user_data');

            $added = $this->users_model->add_role($this->input->post('role'), $data ['data'] [0] ['id']);
            $schools_data = $this->sadmin_model->get_all_schools();
            foreach ($schools_data as $key => $school_data) {
                $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
                $sql_db = "USE " . $db_name;
                if ($this->db->simple_query($sql_db)) {
                    $addedd = $this->users_model->add_role($this->input->post('role'), $school_data['id']);
                }
            }
            $sql_db = "USE " . DATABASE_STRUCTURE;
            if ($this->db->simple_query($sql_db)) {
                
            }
            if ($added) {
                redirect('sadmin/mng_roles?go=true&msg=Role added successfully');
            }
        }
    }

    public function remove() {
        $id = $this->input->get('id');
        if (!empty($id)) {

            $this->load->model('users_model');

            $results = $this->users_model->remove_role_by_id($this->input->get('id'));
            $schools_data = $this->sadmin_model->get_all_schools();
            foreach ($schools_data as $key => $school_data) {
                $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
                $sql_db = "USE " . $db_name;
                if ($this->db->simple_query($sql_db)) {
                    $results = $this->users_model->remove_role_by_id($this->input->get('id'));
                }
            }
            $sql_db = "USE " . DATABASE_STRUCTURE;
            if ($this->db->simple_query($sql_db)) {
                
            }
            redirect('sadmin/mng_roles?go=true&msg=Role Removed successfully');
        }
        if (empty($id)) {
            redirect('sadmin/mng_roles?go=false&msg=Invalid role id to remove');
        }
    }

    public function remove_type() {
        $id = $this->input->get('id');
        if (!empty($id)) {

            $this->load->model('users_model');

            $results = $this->users_model->remove_role_by_id($this->input->get('id'));
            $schools_data = $this->sadmin_model->get_all_schools();
            foreach ($schools_data as $key => $school_data) {
                $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
                $sql_db = "USE " . $db_name;
                if ($this->db->simple_query($sql_db)) {
                    $results = $this->users_model->remove_role_by_id($this->input->get('id'));
                }
            }
            $sql_db = "USE " . DATABASE_STRUCTURE;
            if ($this->db->simple_query($sql_db)) {
                
            }
            $cacheID = 's_t_c_v1';

            $this->zf_cache->remove($cacheID);

            redirect('sadmin/mng_skoolType#?go=true&msg=School Type Removed successfully');
        }
        if (empty($id)) {
            redirect('sadmin/mng_skoolType#?go=false&msg=Invalid Type id to remove');
        }
    }

    function register_check_duplicate() {

        $data = array();
        $data ['lg_email'] = $this->input->post('student_email');

        $res = $this->sadmin_model->check_student_duplicate($data);

        echo json_encode($res);
    }


  
    function reset_password_request() {
        $data = array();

        $data ['old'] = $this->input->get('old');
        $data ['n'] = $this->input->get('n');
        $data ['cn'] = $this->input->get('cn');

        $this->load->model('users_model');

        $sadmin_condition = array(
            's_id' => 0,
            'lg_type' => 0,
            'lg_email' => 'admin',
            'lg_password' => md5($data ['cn'])
        );

        $return_result = $this->users_model->update_sadmin_login($sadmin_condition);

        if ($return_result) {
            echo true;
        }
    }

    /*
     * Search school on request
     */

    public function search_student_on_request() {



        $school_search_email = $this->input->post('school_search_email');

        $data1 = array(
            'name' => $school_search_email
        );

        $result = $this->sadmin_model->search_school_by_email($data1);

        //if record found

        if (!$result == false) {
            $data['result'] = $result;

            $data['hosting'] = '.' . $this->host1;
            echo $this->load->view('comp/success_search_school', $data, true);
        } else {
            echo msg_error('School Name Not Found!');
        }
    }

    public function complete_display_student_info() {
        $sub_dname = $this->input->post('sub_dname');

        $data1 = array(
            'school_subdomain' => $sub_dname
        );
        $school_password = $this->session->userdata("school_password");
        $result = $this->sadmin_model->search_school_by_email($data1);

        //if record found

        if (!$result == false) {
            $data['school_password'] = $school_password;
            //$result[0]['school_password'] = $school_password;
            $data['result'] = $result;
            $data['hosting'] = '.' . $this->host1;

            $this->load->model('tbl_email_templating');

            $condition = array(
                'e_name' => 'new school registration'
            );

            $data['email_text'] = $this->tbl_email_templating->get($condition);

            $this->session->unset_userdata("school_password");

            /*
             *  Send email code for registration
             */

            //$data['content'] = $this->load->view('comp/success_school_register', $data, true);

            $data['text'] = $this->load->view('email/school_registration', $data, true);

            $data['subject'] = 'New School Registration';

            $data['to'] = $result[0]['school_email'];

            //$data['to'] = 'zabbas44@gmail.com';

            $this->send_email_global($data);

            echo $this->load->view('comp/success_school_register', $data, true);
        } else {
            echo msg_error('Email Not Found!');
        }
    }

    function e_templating() {

        $email_id = $this->input->get('query');

        $this->load->model('tbl_email_templating');

        $condition = array(
            'e_id' => $email_id
        );

        $response = $this->tbl_email_templating->get($condition);

        echo json_encode($response);
    }

    function save_email_templates() {

        $this->load->model('tbl_email_templating');

        $id = $this->input->get_post('template');
        $subject = $this->input->get_post('email_subject');
        $text = $this->input->get_post('text_about');

        $data = array(
            'e_subject' => $subject,
            'e_text' => $text
        );

        $condition = array(
            'e_id' => $id
        );

        $response = $this->tbl_email_templating->update($data, $condition);

        $schools_data = $this->sadmin_model->get_all_schools();

        foreach ($schools_data as $key => $school_data) {
            $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
            $sql_db = "USE " . $db_name;

            if ($this->db->simple_query($sql_db)) {

                $response = $this->tbl_email_templating->update($data, $condition);
            }
        }

        $sql_db = "USE " . DATABASE_STRUCTURE;
        if ($this->db->simple_query($sql_db)) {
            
        }

        if ($response) {
            redirect(base_url() . 'sadmin/email_templates?update=1&selected=' . $id);
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

    // * Function Manage term settings
    // * Function has no parameter
    function mng_term_settings() {

        $array_data ['session'] = $this->login_credentials_get();
        $this->load->model('settings_model');
        $array_data ['js_files'] = array(
            base_url('files/calender/src/_loader.js'),
            base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
            base_url('js/knockout-latest.js'),
            base_url('js/instructor.calendar.subscriptions.ko.js'),
            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('bootstrap/js/bootstrap.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js'),
            base_url('files/jquery_masking/masking.js'),
            base_url('js/mng_term_settings.js'),
            base_url('files/js/jquery_validation.js'),
            base_url('themes/starlight/js/plugins/jquery.dataTables.min.js'),
            base_url('themes/starlight/js/custom/tables.js')
        );


        $array_data ['array_default_times'] = array(
            '1' => '03-20-' . date_time_helper_current_date(true, 'Y'),
            '2' => '06-06-' . date_time_helper_current_date(true, 'Y'),
            '3' => '06-07-' . date_time_helper_current_date(true, 'Y'),
            '4' => '09-22-' . date_time_helper_current_date(true, 'Y'),
            '5' => '09-23-' . date_time_helper_current_date(true, 'Y'),
            '6' => '12-21-' . date_time_helper_current_date(true, 'Y'),
            '7' => '12-22-' . date_time_helper_current_date(true, 'Y'),
            '8' => '03-19-' . (date_time_helper_current_date(true, 'Y') + 1),
            '9' => '03-20-' . date_time_helper_current_date(true, 'Y'),
            '10' => '06-06-' . date_time_helper_current_date(true, 'Y'),
            '11' => '06-07-' . date_time_helper_current_date(true, 'Y'),
            '12' => '09-20-' . date_time_helper_current_date(true, 'Y'),
            '13' => '09-21-' . date_time_helper_current_date(true, 'Y'),
            '14' => '03-19-' . (date_time_helper_current_date(true, 'Y') + 1)
        );



        // language settings tab

        $current_date = strtotime(str_replace('-', '/', date_time_helper_current_date(true, 'm-d-Y')));

        $enabled_prev = array();

        foreach ($array_data ['array_default_times'] as $counter => $perhour) {

            $check_prevoius = strtotime(str_replace('-', '/', $perhour));

            if ($current_date >= $check_prevoius) {
                $enabled_prev [] = 'readonly="readonly"';
            } else {
                $enabled_prev [] = 'enabled';
            }
        }

        $array_data ['status_diabled'] = $enabled_prev;

        $array_data['sem_term_existed'] = 0;
        $array_data['quar_term_existed'] = 0;
        $array_data ['settings'] = $this->settings_model->get_terms_settings();

        foreach ($array_data ['settings'] as $get_term) {
            if ($get_term['term_type'] == 'semester') {
                $array_data['sem_term_existed'] = 1;
            }
            if ($get_term['term_type'] == 'quarters') {

                $array_data['quar_term_existed'] = 1;
            }
        }


        foreach ($array_data ['settings'] as $get_param) {
            if ($get_param ['term_type'] == 'semester' && !empty($get_param ['dates_defined'])) {
                $array_data ['json_settings']['sem'] = (array) json_decode($get_param ['dates_defined']);
            }
            if ($get_param['term_type'] == 'quarters' && !empty($get_param ['dates_defined'])) {
                $array_data ['json_settings']['quart'] = (array) json_decode($get_param ['dates_defined']);
            }
        }

        $array_data ['page'] = 'mng_term_settings';


        $this->load->view('sadmin/base', $array_data);
    }

    // * Function update term settings
    // * Function has no parameter
    function update_term_settings() {
        $array_data ['session'] = $this->login_credentials_get();
        $this->load->model('settings_model');
        $save_data = array();

        $type = $this->input->post('settings_type');

        $data ['Spring'] = $this->input->post('Spring');
        $data ['Summer'] = $this->input->post('Summer1');
        $data ['Fall'] = $this->input->post('Fall');
        $data ['Winter'] = $this->input->post('Winter');
        $data ['session'] = $this->input->post('session');
        $data ['breakes'] = $this->input->post('breakes');

        $seasonal_dates = array();

        $data_encoded = json_encode($data);

        $save_data ['term_type'] = $this->input->post('settings_type');
        $save_data ['dates_defined'] = $data_encoded;
        $save_data ['date_time'] = date_time_helper_current_date();


        $check = $this->settings_model->update_settings_term($save_data);
        $schools_data = $this->sadmin_model->get_all_schools();
        foreach ($schools_data as $key => $school_data) {
            $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
            $sql_db = "USE " . $db_name;
            if ($this->db->simple_query($sql_db)) {
                $checks = $this->settings_model->update_settings_term($save_data);
            }
        }
        $sql_db = "USE " . DATABASE_STRUCTURE;
        if ($this->db->simple_query($sql_db)) {
            
        }
        if ($check) {

            redirect(base_url() . 'sadmin/mng_term_settings?msg=Settings Updated&tab=settings');
        }
    }

    // * Function save term settings
    // * Function has no parameter
    function save_term_settings() {
        $array_data ['session'] = $this->login_credentials_get();
        $save_data = array();

        $type = $this->input->post('settings_type');

        $data ['Spring'] = $this->input->post('Spring');

        $data ['Summer'] = $this->input->post('Summer');

        $data ['Fall'] = $this->input->post('Fall');

        $data ['Winter'] = $this->input->post('Winter');

        $data ['session'] = $this->input->post('session');

        $data ['breakes'] = $this->input->post('breakes');

        $seasonal_dates = array();

        $data_encoded = json_encode($data);



        $save_data ['term_type'] = $type;
        $save_data ['dates_defined'] = $data_encoded;
        $save_data ['date_time'] = date_time_helper_current_date();


        $check = $this->settings_model->save_settings_terms($save_data);
        $schools_data = $this->sadmin_model->get_all_schools();
        foreach ($schools_data as $key => $school_data) {
            $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
            $sql_db = "USE " . $db_name;
            if ($this->db->simple_query($sql_db)) {
                $checks = $this->settings_model->save_settings_terms($save_data);
            }
        }
        $sql_db = "USE " . DATABASE_STRUCTURE;
        if ($this->db->simple_query($sql_db)) {
            
        }
        if ($check) {
            redirect(base_url() . 'sadmin/mng_term_settings?msg=Settings Saved');
        }
    }

    function check_password_old() {
        $data = array();

        $data ['old'] = $this->input->get('o_password');

        $this->load->model('users_model');

        $sadmin_condition = array(
            'lg_type' => 0,
            'lg_password' => md5($data ['old']),
            'lg_email' => 'admin'
        );

        $return_result = $this->users_model->check_sadmin_login($sadmin_condition);

        if ($return_result > 0) {
            echo 'true';
        } else {
            echo 'error';
        }
    }

  
    //for course types management
    function mng_courses_cate() {

        $this->load->model('courses_model');
        $this->load->model('settings_model');
        $this->load->helper('common_helper');

        $array_data ['js_files'] = array(
            base_url('files/calender/src/_loader.js'),
            base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
            base_url('js/knockout-latest.js'),
            base_url('js/instructor.calendar.subscriptions.ko.js'),
            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js'),
            base_url('files/jquery_masking/masking.js'),
            base_url('files/uploadify/jquery.uploadify.min.js'),
            base_url('files/js/jquery_validation.js'),
            base_url('js/sadmin.index.js'),
            base_url('themes/starlight/js/plugins/jquery.dataTables.min.js'),
            base_url('themes/starlight/js/custom/tables.js'),
            base_url('bootstrap/js/bootstrap.js'),
            base_url('js/sadmin.index.js'),
            base_url('files/js/jquery_validation.js'),
            base_url('js/course_type.sadmin.js'),
                //base_url('js/permission.index.js')
        );

        $array_data ['css_files'] = array(
            base_url('files/date_picker/css/ui-lightness/jquery-ui-1.8.24.custom.css'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.css'),
        );
        //$array_data ['js_files'] = $this->add_js_default_files($page_script, 'jquery_validation', true, true);
        //$array_data ['session'] = $this->login_data();


        $array_data ['session'] = $this->login_credentials_get();

        $array_data ['schools'] = $this->sadmin_model->get_all_schools();


        $id = $this->uri->segment(3);
        $array_data['ct_name'] = '';
        $array_data['ct_id'] = '';
        $array_data['ct_code'] = '';
        $array_data['is_parent'] = $id;
        if (!empty($id) && $id != '0') {
            $data = array();
            $data ['ct_id'] = $id;
            $type_data = $this->courses_model->get_course_cate_by_data($data);
            $data = array();
            $data ['is_parent'] = $id;
            $data ['is_course'] = 0;
            $array_data['courses'] = $this->courses_model->get_course_cate_all_data($data);
            $array_data['ct_name'] = $type_data['ct_name'];
            $array_data['ct_id'] = $type_data['ct_id'];
        } else {
            $array_data ['courses'] = $this->courses_model->get_all_course_cate();
            $array_data['ct_name'] = 'Courses';
            $array_data['ct_id'] = '';
        }

        $array_data ['comefrom'] = 'page';
        $array_data ['page'] = 'mng_courses_cate';
        $array_data ['title'] = 'Manage Courses Category';
        $this->load->view('sadmin/base', $array_data);
    }

    function save_course_type() {
        $this->load->model('courses_model');
        $this->load->model('settings_model');
        $this->load->helper('common_helper');

        $data_send = array();

        $data_send ['ct_name'] = $this->input->get_post('name');
        $data_send ['ct_code'] = $this->input->get_post('course_id');
        $data_send ['ct_status'] = $this->input->get_post('status');
        $data_send ['ct_date'] = date_time_helper_current_date();
        $session_user = $this->session->userdata('user_data');
        $data_send ['ct_user'] = $session_user[0]['lg_id'];
        $data_send ['is_parent'] = 0;
        $is_course_id = $this->input->get_post('is_course');
        $id = $this->input->get_post('c_id_parent');
        if (!empty($id) && $id != '0') {
            $data_send ['is_parent'] = $id;
        }
        $is_course = $this->input->get_post('is_parent');
        if ($is_course_id != 0) {
            $data_send ['is_course'] = $is_course_id;
        }



        $res = $this->courses_model->save_course_cate($data_send);
        //$data_send ['ct_id'] = $res;
        $schools_data = $this->sadmin_model->get_all_schools();
        $condition_arr = array();
        $condition_arr['ct_name'] = $data_send ['ct_name'];
        foreach ($schools_data as $key => $school_data) {
            $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
            $sql_db = "USE " . $db_name;
            if ($this->db->simple_query($sql_db)) {
                $res = $this->courses_model->save_course_cate_school($data_send, $condition_arr);
            }
        }
        $sql_db = "USE " . DATABASE_STRUCTURE;
        if ($this->db->simple_query($sql_db)) {
            
        }



// //if course dates are manual then we cannot add dates for manual
// courses


        $data_send ['page'] = 'mng_courses_cate';

        $data_send ['title'] = 'Manage Courses Category';

        $data_send ['comefrom'] = 'ajax';

        $this->load->library('pagination');


        $id = $this->uri->segment(3);
        $data_send['ct_name'] = '';
        $data_send['ct_id'] = $res;
        $data_send['ct_code'] = '';
        $data_send['is_parent'] = $data_send ['is_parent'];
        $data_course = array();
        $data_course['is_parent'] = $data_send ['is_parent'];
        if (!empty($is_course) && $is_course != '0' && $is_course_id != 0) {
            $data_send ['courses'] = $this->courses_model->get_course_type_courses($data_course);
            $this->load->view('sadmin/mng_cate_courses_list', $data_send);
        } else {
//            $data_send ['courses'] = $this->courses_model->get_all_course_cate();
            $data_send ['courses'] = $this->courses_model->get_course_cate_all_data($data_course);
            $this->load->view('sadmin/mng_courses_cate', $data_send);
        }
    }

    function update_course_type_go() {
        $data_send = array();

        $this->load->model('courses_model');
        $this->load->model('settings_model');
        $this->load->helper('common_helper');

//        $data = $this->session->userdata('session_user_data');
        $id = $this->input->get_post('id');
        $data = array();
        $data ['ct_id'] = $id;
        $type_data = $this->courses_model->get_course_cate_by_data($data);

        $data_send ['ct_code'] = $this->input->get_post('course_id');
        $data_send ['ct_status'] = $this->input->get_post('status');


        $condition = array(
            'ct_id' => $id
        );
        $this->courses_model->update_course_cate($data_send, $condition);
// print_r($res);
        $cid = $this->input->get_post('c_id_parent');
        $is_course = $this->input->get_post('is_parent');
        ///$data_send ['courses'] = $this->courses_model->get_all_course_cate();



        $session_user = $this->session->userdata('user_data');

        $condition_arr = array();
        $condition_arr['ct_name'] = $type_data ['ct_name'];
        $condition_arr ['ct_user'] = $session_user[0]['lg_id'];
        $schools_data = $this->sadmin_model->get_all_schools();
        foreach ($schools_data as $key => $school_data) {
            $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
            $sql_db = "USE " . $db_name;
            if ($this->db->simple_query($sql_db)) {
                $res = $this->courses_model->update_course_cate($data_send, $condition_arr);
            }
        }
        $sql_db = "USE " . DATABASE_STRUCTURE;
        if ($this->db->simple_query($sql_db)) {
            
        }

        $cid = $this->input->get_post('c_id_parent');

        $is_course = $this->input->get_post('is_parent');


        $data_send ['courses'] = $this->courses_model->get_all_course_cate();

        $data_send ['comefrom'] = 'ajax';

        $is_course = $this->input->get_post('is_parent');
        $data_course = array();
        $data_course['is_parent'] = $type_data ['is_parent'];

        $data_send['ct_name'] = '';
        $data_send['ct_id'] = '';
        $data_send['ct_code'] = '';
        $data_send['is_parent'] = $type_data ['is_parent'];
        $data_course = array();
        $data_course['is_parent'] = $type_data ['is_parent'];
        $is_course_id = $this->input->get_post('is_course');
        if (!empty($is_course) && $is_course != '0' && $is_course_id != 0) {
            $data_send ['courses'] = 1;
            $data_send ['courses'] = $this->courses_model->get_course_type_courses($data_course);
            $this->load->view('sadmin/mng_cate_courses_list', $data_send);
        } else {
            //$data_send ['courses'] = $this->courses_model->get_all_course_cate();
            $data_send ['courses'] = $this->courses_model->get_cate_all_data($data_course);
            $this->load->view('sadmin/mng_courses_cate', $data_send);
        }
    }

    function check_course_type_name() {


        $this->load->model('courses_model');
        $data = array();
        $data ['ct_name'] = $this->input->get_post('name');
        $id = $this->input->get_post('c_id_parent');
        if (!empty($id) && $id != '0') {
            $data ['is_parent'] = $id;
        }
        $res = $this->courses_model->get_course_cate_by_data($data);

        if ($res) {
            echo '0';
        } else {
            echo '1';
        }
    }

    function update_course_type() {
        $id = $this->input->get_post('id');

        $this->load->model('courses_model');


// print_r($data_send['courses']);
// die;
        $data = array();
        $data ['ct_id'] = $id;
        $type_data = $this->courses_model->get_course_cate_by_data($data);
        $data_send = array();
        $data_send['is_course_form'] = 0;
        $data_send['is_parent'] = $type_data['is_parent'];
        if (!empty($id) && $id != '0' && $id != '') {
            $p_id = $this->input->get_post('is_parent');


            $data_send['ct_name'] = $type_data['ct_name'] . ' Category';
            $data_send['ct_id'] = $type_data['ct_id'];
            $parent_data = array();
            $parent_data['ct_id'] = $type_data['is_parent'];
            $parent_code_data = $this->courses_model->get_course_cate_by_data($parent_data);
            $data_send['ct_code'] = '';
            if (sizeof($parent_code_data) > 0)
                $data_send['ct_code'] = $parent_code_data['ct_code'];
            if ($p_id == 1) {
                $data_send['is_course_form'] = 1;
                $data_send['ct_name'] = $data_send['ct_name'] . ' Courses';
                // $data_send['is_parent'] = $type_data['ct_id'];
            }
        } else {

            $data_send['ct_name'] = 'Courses';
            $data_send['ct_code'] = '';
            $data_send['ct_id'] = '';
        }
        $data_send ['comefrom'] = 'ajax';
        $data_send ['courses'] = $type_data;
        $this->load->view('sadmin/new_course_type', $data_send);
    }

    function remove_course_type() {
        $this->load->model('courses_model');
        $this->load->model('settings_model');
        $this->load->helper('common_helper');

        $id = $this->input->get_post('remove_course');

        $this->load->model('courses_model');


        $data = array();
        $data ['ct_id'] = $id;
        $type_data = $this->courses_model->get_course_cate_by_data($data);

        $data_course = array();
        $data_course['is_parent'] = $type_data ['is_parent'];
        $result = $this->courses_model->remove_course_cate($id);
        if ($result) {
            $session_user = $this->session->userdata('user_data');
            $data_send = array();
            $condition_arr = array();
            $data_send['ct_name'] = $type_data ['ct_name'];
            $data_send['ct_user'] = $session_user[0]['lg_id'];
            $condition_arr['ct_id'] = $type_data ['ct_id'];
            ;
            $schools_data = $this->sadmin_model->get_all_schools();
            foreach ($schools_data as $key => $school_data) {
                $db_name = DATABASE_NAME_PREFIX . $school_data['school_subdomain'];
                $sql_db = "USE " . $db_name;
                if ($this->db->simple_query($sql_db)) {
                    $res = $this->courses_model->remove_course_cate_school($data_send, $condition_arr);
                }
            }
            $sql_db = "USE " . DATABASE_STRUCTURE;
            if ($this->db->simple_query($sql_db)) {
                
            }




            $is_course = $this->input->get_post('is_parent');
            $is_course_id = $this->input->get_post('is_course');
            $array_data ['is_parent'] = $type_data ['is_parent'];
            if (!empty($is_course) && $is_course != '0' && $is_course_id != 0) {
                $data_send ['courses'] = 1;
                $array_data ['courses'] = $this->courses_model->get_course_type_courses($data_course);
            } else {
                //$array_data ['courses'] = $this->courses_model->get_all_course_cate();
                $array_data ['courses'] = $this->courses_model->get_course_cate_all_data($data_course);
                $array_data ['is_parent'] = 0;
            }
            $html = '';
            $html.=' <input type="hidden" id="added_course1" />
                            <div style="display: none;">
                                <div id="course1"></div>
                            </div>
                                      <table  class="stdtable" id="dyntable">
 <colgroup>
      <col class="con0" />
      <col class="con1" />
      <col class="con0" />
      <col class="con1" />
      <col class="con0" />
      <col class="con1" />
      <col class="con0" />
      </colgroup>                                                                    
<thead>
        <tr>
           <th class="head0">No.</th>
          <th class="head1">Name</th>
          <th class="head0">Status</th>';
            if ($array_data ['is_parent'] == 0) {
                $html.='<th class="head1">Sub-Category</th>
                       <th class="head0">Courses</th>';
            }
            $html.='
          
          <th class="head1">Date</th>
          <th class="head0">Actions</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
           <th class="head0">No.</th>
          <th class="head1">Name</th>
          <th class="head0">Status</th>';
            if ($array_data ['is_parent'] == 0) {
                $html.='<th class="head1">Sub-Category</th>
                       <th class="head0">Courses</th>';
            }
            $html.='
          <th class="head1">Date</th>
          <th class="head0">Actions</th>
        </tr>
      </tfoot><tbody>';
            $i = 1;
            foreach ($array_data ['courses'] as $counter => $percourse) {

                $html.='<tr class="gradeA" id="row_' . $percourse['ct_id'] . '">
                                                                            <td align="center">' . $i . '</td>
                                                                            <td><strong>' . ci_urldecode($percourse['ct_name']) . '</strong></td>
                                                                            <td align="center">';
                if ($percourse['ct_status'] == 'true') {

                    $html.='<img width="20"
                                                                                    src="' . base_url() . 'files/icons/1355052051_onebit_34.png" />';
                } else {
                    $html.='<img width="20"
                                                                                    src="' . base_url() . 'files/icons/1355052074_mail-delete.png" />';
                }
                $html.='  </td>
                            <td align="center">' . $percourse['ct_date'] . '</td>';

                if ($array_data ['is_parent'] == 0) {
                    $html.='<td align="center"><a href="' . base_url() . 'sadmin/mng_courses_cate/' . $percourse['ct_id'] . '">Sub-Category</a></td>
                       <td align="center"><a href="' . base_url() . 'sadmin/mng_cate_courses_list/' . $percourse['ct_id'] . '">Courses</a></td>';
                }
                $html.='<td align="right">
                                                                                <form class="stdform" action="#">
                                                                                        <input type="hidden" id="course_id_new' . $percourse['ct_id'] . '" value="' . $percourse['ct_name'] . '">
                                                                                        <button class="radius2" onClick="update_course_type(' . $percourse['ct_id'] . ')">Update</button>
                                                                                        <button class="radius2" onClick="remove_course(' . $percourse['ct_id'] . ')">Remove</button>  
                                                                                </form>
                                                                            </td>
                                                                    </tr>';
                $i++;
            }
            $html.=' </tbody></table>
                   <input type="hidden" id="added_course" href="#course" />
                    <div style="display: none;">
                            <div id="course"></div>
                    </div>';
            echo $html;
        } else {
            echo '1';
        }
    }

    function new_course_type() {
        $id = $this->uri->segment(3);
        $array_data = array();
        $array_data['is_course_form'] = 0;
        $array_data['is_parent'] = 0;
        if (!empty($id) && $id != '0' && $id != '') {
            $p_id = $this->uri->segment(4);
            $this->load->model('courses_model');
            $data = array();
            $data ['ct_id'] = $id;

            $type_data = $this->courses_model->get_course_cate_by_data($data);
            $array_data['ct_name'] = $type_data['ct_name'] . ' Category';
            $array_data['ct_id'] = $type_data['ct_id'];
            $array_data['ct_code'] = $type_data['ct_code'];
            if ($p_id == 1) {
                $array_data['is_course_form'] = 1;
                $array_data['ct_name'] = $array_data['ct_name'] . ' Courses';
                $array_data['is_parent'] = $type_data['ct_id'];
            }
        } else {
            $array_data['ct_name'] = 'Courses';
            $array_data['ct_code'] = '';
            $array_data['ct_id'] = '';
        }
        $this->load->view('sadmin/new_course_type', $array_data);
    }

    function mng_cate_courses_list() {

        $this->load->model('courses_model');
        $this->load->model('settings_model');
        $this->load->helper('common_helper');

        $array_data ['js_files'] = array(
            base_url('files/calender/src/_loader.js'),
            base_url('files/date_picker/js/jquery-ui-1.8.24.custom.min.js'),
            base_url('js/knockout-latest.js'),
            base_url('js/instructor.calendar.subscriptions.ko.js'),
            base_url('js/instructor.calendar.export.ko.js'),
            base_url('js/jax.js'),
            base_url('js/extended.modal.jquery.js'),
            base_url('js/extended.alert.js'),
            base_url('js/jaxhandler.js'),
            base_url('files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js'),
            base_url('files/jquery_masking/masking.js'),
            base_url('files/uploadify/jquery.uploadify.min.js'),
            base_url('files/js/jquery_validation.js'),
            base_url('js/sadmin.index.js'),
            base_url('themes/starlight/js/plugins/jquery.dataTables.min.js'),
            base_url('themes/starlight/js/custom/tables.js'),
            base_url('bootstrap/js/bootstrap.js'),
            base_url('js/sadmin.index.js'),
            base_url('files/js/jquery_validation.js'),
            base_url('js/course_type.sadmin.js'),
                //base_url('js/permission.index.js')
        );

        $array_data ['css_files'] = array(
            base_url('files/date_picker/css/ui-lightness/jquery-ui-1.8.24.custom.css'),
            base_url('files/fancybox/fancybox/jquery.fancybox-1.3.4.css'),
        );
        //$array_data ['js_files'] = $this->add_js_default_files($page_script, 'jquery_validation', true, true);
        //$array_data ['session'] = $this->login_data();


        $array_data ['session'] = $this->login_credentials_get();

        $array_data ['schools'] = $this->sadmin_model->get_all_schools();

        $id = $this->uri->segment(3);
        $data_course = array();
        $data_course['is_parent'] = $id;
        if (!empty($id) && $id != '0') {
            $this->load->model('courses_model');
            $data = array();
            $data ['ct_id'] = $id;
            $type_data = $this->courses_model->get_course_cate_by_data($data);
            $array_data['ct_name'] = $type_data['ct_name'];
            $array_data['ct_id'] = $type_data['ct_id'];
            $array_data['ct_code'] = $type_data['ct_code'];
            $array_data['is_parent'] = 1;
        } else {
            $array_data['ct_name'] = '';
            $array_data['ct_id'] = '';
            $array_data['ct_code'] = '';
            $array_data['is_parent'] = '0';
        }
        $array_data['is_course_form'] = 0;
        $array_data ['courses'] = $this->courses_model->get_course_type_courses($data_course);

        $array_data ['comefrom'] = 'page';

        $array_data ['page'] = 'mng_courses_cate';

        $array_data ['title'] = 'Manage Courses Lists';

        $this->load->view('sadmin/base', $array_data);
    }

    function new_course() {
        $id = $this->uri->segment(3);
        $array_data = array();
        if (!empty($id) && $id != '0') {
            $this->load->model('courses_model');
            $data = array();
            $data ['ct_id'] = $id;
            $type_data = $this->courses_model->get_course_cate_by_data($data);
            $array_data['ct_name'] = $type_data['ct_name'];
            $array_data['ct_id'] = $type_data['ct_id'];
        } else {
            $array_data['ct_name'] = 'Courses';
            $array_data['ct_id'] = '';
        }
        $this->load->view('sadmin/new_course', $array_data);
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
            //base_url ( 'files/fancybox/fancybox/jquery.mousewheel-3.0.4.pack.js' ),
//base_url ( 'files/fancybox/fancybox/jquery.fancybox-1.3.4.pack.js' ),
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
        //$default_js = array_merge($default_js, $this->jquery_validate());
//}

        /* add data table file on demand by function */
        /* if ($datatable) {
          $default_js = array_merge($default_js, $this->data_table());
          }
         */
        /* if given array in not empty the merge it */
        if (!empty($array_js_page))
            return array_merge($default_js, $array_js_page);
        return $default_js;
    }

}
?>