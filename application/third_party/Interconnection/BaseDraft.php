<?php
/**
 * Created by PhpStorm.
 * User: huanle0610
 * Date: 2016/3/18
 * Time: 22:40
 */

namespace Interconnection;


abstract class BaseDraft extends Oneness
{
    //是否在数据库中
    protected $isInDB = false;

    //是否已保存到数据库中
    protected $isSaved = false;

    //是否可以提交
    protected $canSubmit = false;

    // 草稿ID
    protected $draft_id = null;

    /**
     * 保存草稿
     */
    public function save() {}

    /**
     * 检查草稿是否可以提交
     */
    public function check() {}

    /**
     * 生成excel文件用于自动化软件生成脚本
     */
    public function exportExcel() {}

    /**
     * 加载一个草稿
     * @param $draft_id
     */
    public function load($draft_row) {}

    /**
     * 提交草稿到计算
     */
    public function submit() {}

    /**
     * 重置所有选项
     */
    protected function _reset_options()
    {

    }

    /**
     * 获得当前实例的类名
     * @return string
     */
    public function getName()
    {
        return get_class($this);
    }
}