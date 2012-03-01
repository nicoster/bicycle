

Ext.define("Bicycle.view.Main", {
	extend: "Ext.navigation.View",
	xtype: 'mainpanel',
	requires: ['Bicycle.view.Subcontainer'],
	
	config: {
		autoDestroy: false,
        fullscreen: true,

		items: 
		[
			{
				xtype: 'subcontainer',
				title: 'Suzhou Bicycle',
			}
		]
	}
});
