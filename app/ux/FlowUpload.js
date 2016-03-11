Ext.define('Ext.ux.FlowUpload', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.flowfile',

    allowBlank: true,
    combineErrors: true,
    cls: 'flowfile',
    autoUpload: true,
    removeFn: Ext.emptyFn, //删除后台文件接口

    initComponent: function()
    {
        var me = this;
        me.fileNameField = {
            xtype: 'textfield',
            hidden: true,
            itemId: 'file_name'
        };

        if(me.regex) {
            me.fileNameField.regex = me.regex;
            me.fileNameField.regexText = me.regexText || '';
        }


        Ext.apply(me, {
            items: [
                {
                    xtype: 'box',
                    padding: 4,
                    cls: 'flow_box_btn x-btn x-unselectable x-btn-default-small x-noicon x-btn-noicon x-btn-default-small-noicon',
                    itemId: 'browse_file_box',
                    html: '上传文件'
                },
                {
                    xtype: 'label',
                    margin: '0 0 0 2',
                    itemId: 'file_show_name'
                },
                me.fileNameField,
                {
                    xtype: 'textfield',
                    hidden: true,
                    itemId: 'file_id',
                    allowBlank: me.allowBlank,
                    name: me.name
                },
                {
                    xtype: 'textfield',
                    hidden: true,
                    itemId: 'file_org_name',
                    allowBlank: me.allowBlank,
                    name: me.name + '_org_name'
                },
                {
                    xtype: 'button',
                    margin: '0 0 0 2',
                    hidden: true,
                    tooltip: '删除文件',
                    itemId: 'remove_file',
                    text: 'X'
                }
            ]
        });

        me.callParent();
    },

    // private
    afterRender: function() {
        var me = this,
            id = me.id,
            inputEl;

        me.callParent(arguments);

        me.browserBox = me.down('#browse_file_box');
        var flow = me.flow = new Flow({
            singleFile: true,
            flowChunkSize: 100 * 1024 * 1024 * 1024,
            target: 'flow/upload'
        });

        me.fileNameLabel = me.down('#file_show_name');
        me.fileNameField = me.down('#file_name');
        me.fileIDField = me.down('#file_id');
        me.removeFileBtn = me.down('#remove_file');
        me.fileOrgName = me.down('#file_org_name');

        if(me.emptyText) {
            me.fileNameLabel.setText(me.emptyText);
        }

        me.removeFileBtn.on({
            click: function(){
                var file_id = me.fileIDField.getValue();
                //已经有文件ID了，要删除后台与前台页面上的文件
                if(file_id) {
                    me.removeFn(file_id, function(r){
                        if(r.suc) {
                            me.clearFrontFile();
                        }
                    });
                } else {
                    me.clearFrontFile();
                }
                console.log(file_id);
            }
        });

        me.fileIDField.on({
            errorchange: function(cmp, error) {
                if(error){
                    me.addCls('x-form-invalid');
                } else {
                    me.removeCls('x-form-invalid');
                }
            }
        });

        me.fileNameField.on({
            change: function(cmp, val) {
                if(val){
                    me.removeFileBtn.show();
                    me.fileNameLabel.setText(me.getShowName(val));
                    me.fileOrgName.setValue(val);
                } else {
                    me.removeFileBtn.hide();
                    me.fileNameLabel.setText('');
                    me.fileOrgName.setValue('');

                    if(me.emptyText) {
                        me.fileNameLabel.setText(me.emptyText);
                    }
                }
            }
        });

        window.dfdf = flow;

        flow.assignBrowse(me.browserBox.el.dom);
        //flow.assignDrop(document.getElementById('dropTarget'));

        flow.on('fileAdded', function (file, event) {
            var errors = me.fileNameField.getErrors(file.name);
            if(errors.length) {
                Ext.Msg.alert('提示', errors.join('<br />'));
                return false;
            }

            me.fileNameField.setValue(file.name);
        });

        flow.on('filesSubmitted', function (file, event) {
            console.log(file, event);
            if(me.autoUpload) {
                flow.upload();
            }
        });

        flow.on('fileSuccess', function (file, message) {
            console.log(file, message);
            var msg = Ext.decode(message);
            if(msg.file_id) {
                console.log(me.fileIDField, msg.file_id);
                me.fileIDField.setValue(msg.file_id);
            }
            console.log(flow.files);
        });

        flow.on('fileError', function (file, message) {
            console.log(file, message);
            console.log(flow.files);
        });

        flow.on('fileProgress', function (file, chunk) {
            console.log(file.progress());
        });

        flow.on('catchAll', function () {
            console.log(arguments);
        });
    },

    getShowName: function(v){
        return v;
    },

    isUploading: function(){
        var me = this;
        return me.flow.isUploading();
    },

    timeRemaining: function(){
        var me = this;
        return me.flow.timeRemaining();
    },

    clearFrontFile: function(){
        var me = this;
        me.flow.cancel();
        me.fileNameLabel.setText('');
        me.fileNameField.setValue('');
        me.fileIDField.setValue('');
        me.fileOrgName.setValue('');
    },

    setValue: function(file){
        var me = this;

        me.fileNameField.setValue(file.name);
        me.fileIDField.setValue(file.file_id);
    },

    onDestroy: function(){
        var me = this;
        me.flow = null;
        me.callParent();
    },

    btnCallback: function(btn)
    {
        var me = this, value, field;

        field = me.checkbox;
        value = field.getValue();
        field.reset();

        btn.blur();
        me.hide();
        me.userCallback(btn.itemId, value, me.cfg);
    }
});