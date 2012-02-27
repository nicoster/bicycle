'use strict';
/*global Ext*/

Ext.Loader.setConfig({ enabled: true });

Ext.define('Ext.overrides.Map', {
            override: 'Ext.Map',
            getMapOptions: function() {
                return Ext.merge({}, this.options || this.getInitialConfig('mapOptions'));
            }
        });

Ext.application({
	name: "Bicycle",
	
	views: ["Main"],
	stores: ['Bicycles'],
	models: ['Bicycle'],
	controllers: ["BicycleController"],
		
	launch: function () {
		Ext.getStore('Bicycles');
        Ext.Viewport.add({
//			xtype: 'noteslist'
			xtype: 'mainpanel'
//			xtype: 'noteeditor'
		});
	}
});
