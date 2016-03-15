<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Honey extends CI_Driver_Library
{

    public $valid_drivers;
    public $CI;
    protected $_adapter;

    function __construct($config)
    {
        $this->CI =& get_instance();
        $this->CI->config->load('honey', TRUE);
        $this->valid_drivers = $this->CI->config->item('modules', 'honey');
        isset($config['adapter']) && $this->_adapter = $config['adapter'];
    }

    function naughty_bee()
    {
        return $this->queenbee->pardon();
    }

    function buy_honey($money = 0)
    {
        if ($this->workerbee->busybee($money)) {
            return TRUE;
        }
    }

    function check_money($money)
    {
        return $this->queenbee->can_we_sell($money);
    }

    /**
     * Get Cache Metadata
     *
     * @param	string	$id	key to get cache metadata on
     * @return	mixed	cache item metadata
     */
    public function get_metadata($id)
    {
        return $this->{$this->_adapter}->get_metadata($id);
    }
}