Ext.define('Bicycle.view.Station', {
	extend: 'Ext.form.Panel',
	xtype: 'bicyclestation',
	requires: ['Ext.form.FieldSet', 'Ext.Img'],

	config: {
		
		title: '{name}',
		layout: 'vbox',

		items: [
			{
				xtype: 'fieldset',
				defaults: {
					labelWidth: '25%'
				},
				title: 'Information',
				items: [
					{
						xtype: 'img',
//						src: 'http://www.subicycle.com/szmap/img/{id}.jpg',
						id: 'stationimage'
					},

					{
						xtype: 'textfield',
						label: 'Title',
						name: 'name',
					},
					{
						xtype: 'textfield',
						label: 'Address',
						name: 'address',
					},
					{
						xtype: 'textfield',
						label: 'Capacity',
						name: 'capacity',
					},
					{
						xtype: 'textfield',
						label: 'Available',
						name: 'availBike',
					},
					
				]
			}
		]
	},
/*	
	initialize: function() {
		this.config.title = this.getRecord().get('name');
		this.callParent();
	}	
*/
});
