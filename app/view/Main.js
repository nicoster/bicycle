

Ext.define("Bicycle.view.Main", {
	extend: "Ext.Panel",
	xtype: 'mainpanel',
	
	config: {
        fullscreen: true,
        layout: 'fit',

		items: 
		[
			{
				xtype: 'map',
				mapOptions:{
					center : new google.maps.LatLng( 31.320721, 120.619969),	//nearby San Fran
					zoom : 18,
					mapTypeId : google.maps.MapTypeId.ROADMAP,
				}
			},
			// {
			// 	xtype:'list',
			// 	store:'Bicycles',
			// 	itemTpl: '<div>{name}</div><div>{address}</div>',
			// }
		]
	}
});
