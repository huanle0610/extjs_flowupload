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
}