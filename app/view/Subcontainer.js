

Ext.define("Bicycle.view.Subcontainer", {
	extend: "Ext.Panel",
	xtype: 'subcontainer',
	requires: ['Ext.Map', 'Ext.SegmentedButton'],
	
	config: {
        layout: 'vbox',

		items: 
		[
			{
				xtype: 'map',
				flex: 1,
                hidden: true,
				mapOptions:{
					center : new google.maps.LatLng(31.320721, 120.619969), //nearby San Fran
					zoom : 14,
					mapTypeId : google.maps.MapTypeId.ROADMAP,
				}
			},
			
			{
				flex: 1,
				xtype:'list',
				store:'Bicycles',
				itemTpl: '<div>{name}</div><div>{address}</div>',
			},
			
			{
				docked: 'bottom',
				xtype: 'toolbar',
				ui: 'dark',
				
				layout : {
					type : 'hbox',
					pack : 'center'
				},
				
				items: [
					{
						xtype: 'button',
						iconCls: 'locate',
						iconMask: true,
						id:'locateme',
						disabled: true,
					},
					
					{
						xtype: 'spacer',
					},
					
					{
						width: '40%',
						padding: '0 5',
						defaults: {
							flex: 1
						},
						xtype: 'segmentedbutton',
						allowDepress: false,
						items :
						[
							{
								text: 'Map'
							},
							{
								text: 'List',
								pressed: true
							},
						]
					},
					{
						xtype: 'spacer',
					},
					
				]
			},
		]
	},
	
	initialize2: function() {
		'use strict';
//		this.config.title = Oreilly.app.title;
//		this.callParent();

		var segmentedButton = this.down('segmentedbutton');

		Ext.Array.each([{
					text: 'Mapx'
				},
				{
					text   : 'List',
					pressed: true
				},], function(day) {
			segmentedButton.add(day);
		});
	}
});
