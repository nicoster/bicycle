'use strict';
/*global Ext*/

Ext.Loader.setConfig({
    enabled: true,
//    paths: { 'Ext': 'touch/src' }
});

Ext.define('Ext.overrides.Map', {
            override: 'Ext.Map',
            getMapOptions: function() {
                return Ext.merge({}, this.options || this.getInitialConfig('mapOptions'));
            }
        });

Ext.application({
	name: "Bicycle",
	
	views: ["Main", 'Station'],
	stores: ['Bicycles'],
	models: ['Bicycle'],
	controllers: ["BicycleController"],
		
	launch: function () {
        Ext.Viewport.add({
			xtype: 'mainpanel'
		});
	}
});
