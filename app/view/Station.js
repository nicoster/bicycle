Ext.define('Bicycle.view.Station', {
	extend: 'Ext.form.FormPanel',
	xtype: 'bicyclestation',

	config: {
		
		title: '{name}',
		layout: 'vbox',

		items: [
		{
			xtype: 'img',
			src: 'resource/3.jpg',
			height: 100
		},
			{
				xtype: 'fieldset',
				defaults: {
					labelWidth: '25%'
				},
				title: 'Information',
				items: [

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
	}
});
