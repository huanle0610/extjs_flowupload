<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Cls extends CI_Controller
{
    private $data = array();

    function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'third_party/Interconnection/Autoloader.php';
        \Interconnection\Autoloader::register();
    }

    function index()
    {
//        $draft = new \Interconnection\SigrityPDCDraft();
        $draft = \Interconnection\DraftFactory::createDraft(6);
        echo $draft->getName();
    }

    function checkForm()
    {
        $errors = array();
        if($this->_checkFormIsValid($errors))
        {
            $msg = '';
            if($this->_doSaveForm($errors, $msg))
            {
                $ret = array(
                    'success' => true,
                    'msg' => 'ok'
                );
            }
           else
           {
               $ret = array(
                   'success' => false,
                   'errors' => $errors,
                   'msg' => $msg
               );
           }
        }
        else
        {
            $ret = array(
                'success' => false,
                'errors' => $errors,
                'msg' => 'Please check the highlighted field(s).'
            );
        }

        die(json_encode($ret));
    }

    function _doSaveForm(&$errors, &$msg)
    {
        $first = $this->input->post('first');
        $last = $this->input->post('last');

        $data = array(
            'first' => $first,
            'last' => $last,
        );

        $this->load->database();
        /**
         * @TODO must check Unique Key before doing the insert
         */
        // save data to database
        $saveRet = $this->db->set($data)
            ->insert('user');

        if(!$saveRet)
        {
            $db_error = $this->db->error();
            $msg = $db_error ? sprintf('DB Error: [%d] %s', $db_error['code'], $db_error['message']) :
                'Unknown error occured when saving data to database';
        }

        return $saveRet;
    }

    function _checkFormIsValid(&$errors)
    {
        $first = $this->input->post('first');
        $last = $this->input->post('last');

        if($first != 'aladin')
        {
            $errors['first'] = 'First name must be aladin';
        }

        if($last != 'Lee')
        {
            $errors['last'] =  'Last name must be Lee, and it\'s case sensitive.';
        }

        return (count($errors) === 0);
    }


}