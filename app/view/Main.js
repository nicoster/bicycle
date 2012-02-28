

Ext.define("Bicycle.view.Main", {
	extend: "Ext.navigation.View",
	xtype: 'mainpanel',
	requires: ['Ext.Map'],
	
	config: {
		autoDestroy: false,
        fullscreen: true,

		items: 
		[
			{
				xtype: 'map',
				title: 'Suzhou Bicycle',
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
