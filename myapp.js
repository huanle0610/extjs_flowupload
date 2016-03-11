    Ext.Loader.setPath('Ext.ux', 'app/ux');

    Ext.application({
        //指定 模型、存储、视图、控制器等加载的根目录
        appFolder: 'app',

        //指定命名空间， 所有model, stores, views，控制器等都需要使用这个命名空间
        name: 'Hc',

        launch: function() {
            Ext.create('Hc.view.Viewport');
        }
    });
