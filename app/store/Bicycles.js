Ext.define('Bicycle.store.Bicycles', {
    extend: 'Ext.data.Store',

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
        proxy: {
            type: 'ajax',
            url: 'bicycles.json',
        }
    }
});
