Ext.define('Hc.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: ['Ext.ux.FlowUpload'],


    initComponent: function() {
        var me = this;

        var form = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,

            // The form will submit an AJAX request to this URL when submitted
            url: 'save-form.php',

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
                    allowBlank : false,
                    fieldLabel: 'abc',
                    removeFn: function(r, fn){
                        fn({suc: true});
                    }
                },
                {
                fieldLabel: 'First Name',
                name: 'first',
                allowBlank: false
            },{
                fieldLabel: 'Last Name',
                name: 'last',
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
                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        form.submit({
                            success: function(form, action) {
                                Ext.Msg.alert('Success', action.result.msg);
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result.msg);
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