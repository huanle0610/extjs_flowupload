<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Flow extends CI_Controller {

    function upload()
    {
        $tempDir =FCPATH . 'temp';
        if (!file_exists($tempDir)) {
            mkdir($tempDir);
        }
        $targetDir = FCPATH . 'target';
        if (!file_exists($targetDir)) {
            mkdir($targetDir);
        }
//Path to autoload.php from current location
        require_once APPPATH . 'third_party/Flow/Autoloader.php';
        Flow\Autoloader::register();

        $config = new \Flow\Config();
        $config->setTempDir($tempDir);
        $request = new \Flow\Request();
        $response = array('success' => true, 'complete' => false);
        if (\Flow\Basic::save($targetDir . DIRECTORY_SEPARATOR . $request->getIdentifier(), $config, $request)) {
            // file saved successfully and can be accessed at './final_file_destination'
            $response['complete'] = true;
            $response['file'] = $targetDir . DIRECTORY_SEPARATOR . $request->getIdentifier();
            $response['file_id'] = 1;

        } else {
            // This is not a final chunk or request is invalid, continue to upload.
        }
        die(json_encode($response));
    }
}
