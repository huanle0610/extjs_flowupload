Ext.define('Hc.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: ['Ext.ux.FlowUpload'],


    initComponent: function() {
        var me = this;

        var form = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,

            // The form will submit an AJAX request to this URL when submitted
            url: '/cls/checkForm1',

            // Fields will be arranged vertically, stretched to full width
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },

            // The fields
            defaultType: 'textfield',
            items: [
                {
                    xtype: 'flowfile',
                    name: 'fileabc',
                    emptyText: 'Excel格式',
                    regex: /.*.exe/,
                    regexText: '请上传文本',
                    //allowBlank : false,
                    fieldLabel: 'abc',
                    removeFn: function(r, fn){
                        fn({suc: true});
                    }
                },
                {
                fieldLabel: 'First Name',
                name: 'first',
                    value: 'aladin',
                allowBlank: false
            },{
                fieldLabel: 'Last Name',
                name: 'last',
                    value: 'lee',

                    allowBlank: false
            }],

            // Reset and Submit buttons
            buttons: [{
                text: 'Reset',
                handler: function() {
                    this.up('form').getForm().reset();
                }
            }, {
                text: 'Submit',
                //formBind: true, //only enabled once the form is valid
                //disabled: true,
                handler: function() {
                    var fp = this.up('form');
                    var form = fp.getForm();
                    if (form.isValid()) {
                        fp.getEl().mask('Processing...');
                        var unMask = function(){ fp.getEl().unmask();};
                        form.submit({
                            success: function(form, action) {
                                unMask();
                                Ext.Msg.alert('Success', action.result.msg).setIcon(Ext.Msg.INFO);
                            },
                            failure: function(form, action) {
                                unMask();
                                var win = null;
                                switch (action.failureType) {
                                    case Ext.form.action.Action.CLIENT_INVALID:
                                        win = Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                                        break;
                                    case Ext.form.action.Action.CONNECT_FAILURE:
                                        win = Ext.Msg.alert('Failure', 'Ajax communication failed');
                                        break;
                                    case Ext.form.action.Action.SERVER_INVALID:
                                        win = Ext.Msg.alert('Failure', action.result.msg);
                                        break;
                                }
                                if(win) {
                                    win.setIcon(Ext.Msg.WARNING);
                                }
                            }
                        });
                    }
                }
            }]
        });

        window.form = form;

        Ext.apply(me, {
            items : [
                {
                    xtype: 'tabpanel',
                    region: 'center',
                    items: [
                        {
                            xtype: 'container',
                            title: '文件上传',
                            layout: 'column',
                            items: [
                                form
                            ]
                        },
                        {
                            title: 'tab2',
                            html: '123'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});