Ext.define('Bicycle.model.Bicycle', {
	extend: 'Ext.data.Model',
	
	config: {
		fields: [
			{ name: 'id', type: 'int' },
			{ name: 'name', type: 'string'},
			{ name: 'lat', type: 'float' },
			{ name: 'lng', type: 'float' },
			{ name: 'capacity', type: 'int' },
			{ name: 'availBike', type: 'int' },
			{ name: 'address', type: 'string'},
		],
		validations: [
			{ type: 'presence', field: 'id' },
		]		
	}
});
