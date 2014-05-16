Ext.onReady(function() {

	Ext.Date.defaultFormat='Y-m-d';

	Ext.create('Ext.form.Panel', {
			renderTo: Ext.getBody(),
			hidden: true,
			name: 'sendForm',
			id: 'uploadForm',
			items: [
			{
				xtype: 'filefield',
				id: 'uploadField',
				item_id: 0,
				name: 'photo',
				hidden: true,
				listeners: {
					'change': {
						scope: this,
						fn: function (field, e) {
							var form = Ext.getCmp('uploadForm').getForm();
							form.submit({
								url: '/fileUpload',
								params: {item_id: field.item_id},
								waitMsg: 'Uploading your photo...',
								success: function(fp, o) {
									store.reload();
								}
							});
						}
					}
				}
			}]
	});
	
	var uploadField = Ext.getCmp('uploadField');
	
	
	Ext.define('Ext.model.Record', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'ID',    type: 'int'},
			{name: 'Name',  type: 'string'},
			{name: 'Message',  type: 'string'},
			{name: 'PhotoName',  type: 'string'},
			{name: 'TheDate',  type: 'date',format: 'Y-m-d',},
			{name: 'SmallPhotoName',  type: 'string'}
		]
	});
	
	var store = Ext.create('Ext.data.Store', {
		model: 'Ext.model.Record',
		autoLoad: true,
		autoSync: true,
        proxy: {
            type: 'rest',
            url: '/test/records/',
            reader: {
                type: 'json',
                root: 'data'
            },
            writer: {
                type: 'json'
            }
        },
		sorters: [{
        	roperty: 'ID',
			direction: 'DESC'
		}]
	});
	
	store.on('write', function(store, operation){ 
		store.sort('ID','DESC');
		if (operation.action == 'create') {
			Ext.getCmp('demoGrid').plugins[0].startEditByPosition({
				row: 0, 
				column: 1
			});
		}
	
	});

    Ext.create('Ext.grid.Panel',{
		requires: [
			'Ext.selection.CellModel',
			'Ext.grid.*',
			'Ext.data.*',
			'Ext.util.*',
			'Ext.form.*'
		],
		xtype: 'cell-editing',
		title: 'Тестовое задание "Александр"',
		frame: false,
		id: 'demoGrid',
		renderTo: Ext.getBody(),
        plugins: [new Ext.grid.plugin.CellEditing({clicksToEdit: 2})],
        store: store,
        columns: [{
			header: 'ID',
            dataIndex: 'ID',
            flex: 1,
            editor: {
                allowBlank: false
            }
        }
		,{
			header: 'Name',
			maxLength: 80,
            dataIndex: 'Name',
            flex: 1,
            editor: {
                allowBlank: false
            }
        }
		, {
            header: 'TheDate',
            dataIndex: 'TheDate',
                width: 95,
                renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    minValue: '01/01/06'
                }
        }
		,{
			header: 'Message',
			maxLength: 255,
            dataIndex: 'Message',
            flex: 1,
            editor: {
                allowBlank: false
            }
        }
		,{
			header: 'PhotoName',
            dataIndex: 'PhotoName',
            flex: 1,
			maxLength: 255,
            editor: {
                allowBlank: true
            }
        }	
		,{
			header: 'SmallPhotoName',
            dataIndex: 'SmallPhotoName',
			maxLength: 255,
            flex: 1,
            editor: {
                allowBlank: true
            }
        },
		{
			header: 'IMG',
            dataIndex: 'PhotoName',
            renderer: function(value){
				return '<a href="/uploads/'+value+'" target="_blank"><img src="/uploads/preview_'+value+'" style="height:20px;border-radius:2px;margin:1px;" /></a>';
			}
        },
		{
			xtype: 'actioncolumn',
            width: 30,
            sortable: false,
            menuDisabled: true,
            items: [{
                icon: '/alex/examples/build/KitchenSink/ext-theme-neptune/resources/images/icons/fam/delete.gif',
                tooltip: 'Delete Plant',
                scope: this,
                handler: function(grid, rowIndex) {
					store.removeAt(rowIndex);
				}
            }]
        },
		{ 
			xtype:'actioncolumn',
			width: 30,
			text: '^',
			align: 'center',
			items: [{
				icon: 'http://dev.sencha.com/deploy/ext-4.0.0/examples/shared/icons/fam/image_add.png',
				tooltip: 'Upload',
				handler: function(grid, rowIndex) {
						uploadField.item_id = store.getAt(rowIndex).data.ID;
						uploadField.fileInputEl.dom.click();
				}
			}]
		}
		]
		,selModel: {
                selType: 'cellmodel'
        },
        tbar: [{
            text: 'Добавить запись',
            scope: this,
            handler: function(e,d,f){
				var rec = new Ext.model.Record({
					Name: 'Message..',
					Name: 'Name..',
					TheDate: Ext.Date.clearTime(new Date())
				});
				store.add(rec);
			}
        }],
		bbar: {
            xtype: 'pagingtoolbar',
                pageSize: 25,
                store: store,
                displayInfo: true
            }
	});
});