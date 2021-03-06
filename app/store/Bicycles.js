

Ext.define('Bicycle.store.Bicycles', {
    extend: 'Ext.data.Store',
	requires: ['Bicycle.store.reader.Bicycles'],
	
    config: {
        model: 'Bicycle.model.Bicycle',
        autoLoad: true,
        sorters: 'name',
        grouper: {
            groupFn: function(record) {
				'use strict';
                return record.get('name')[0];
            }
        },
		listeners : {
			beforeload: 'onBeforeLoad'
		},
        proxy: {
            type: 'ajax',
//            url: 'http://www.subicycle.com/szmap/ibikestation.asp',
			url: 'bicycles2.json',
			
			reader: Ext.create('Bicycle.store.reader.Bicycles',{
				rootProperty: 'station',
				})
        }
    },
	
	onBeforeLoad: function(){
//		debugger;
	}
});
