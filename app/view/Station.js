

Ext.define('Bicycle.view.Station', {
	extend: 'Ext.Container',
	xtype: 'bicyclestation',

	config: {
		
		layout: 'vbox',

		items: [
			{

				id: 'content',
				tpl: [
					'<div>&nbsp;</div>',
					'<img class="stationimage" src="http://www.subicycle.com/szmap/img/{id}.jpg"/>',
					'<div class="stationaddress">{address}</div>',
					'<div class="stationaddress">Capacity:{capacity}</div>',
					'<div class="stationaddress">Available:{availBike}</div>',
						
				].join('')
			}
		],
		record: null
	},
	
	updateRecord: function(newRecord) {
		'use strict';
		if (newRecord) {
			this.down('#content').setData(newRecord.data);
		}
	}
});
