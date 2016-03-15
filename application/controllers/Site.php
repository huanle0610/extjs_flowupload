<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Site extends CI_Controller
{
    private $data = array();

    function __construct()
    {
        parent::__construct();
    }

    function naughty()
    {
        $this->load->driver('honey');
        print $this->honey->naughty_bee();
    }

    function get_honey($money=10)
    {
        $this->load->driver('honey');
        if ($this->honey->buy_honey($money))
        {
            print "eat the honey";
        }
        else
        {
            print "I do not have enough money";
        }
    }

    function meta()
    {
        $this->load->driver('honey', array('adapter' => 'queenbee'));
        print $this->honey->get_metadata(12);
        echo "<br/>";

//        $this->load->driver('honey', array('adapter' => 'workerbee'));
//        print $this->honey->get_metadata(12);
//        echo "<br/>";

        $this->load->driver('honey');
        print $this->honey->queenbee->get_metadata(12);
        echo "<br/>";

        print $this->honey->workerbee->get_metadata(12);
        echo "<br/>";

    }
}