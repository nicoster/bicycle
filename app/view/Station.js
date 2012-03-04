

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
					'<div class="phoneytitle">{name}</div>',
					'<div class="phoneytext">{address}</div>',
					'<div>Capacity:{capacity}</div>',
					'<div>Available:{availBike}</div>',
						
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
