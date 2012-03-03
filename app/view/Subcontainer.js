

Ext.define("Bicycle.view.Subcontainer", {
	extend: "Ext.Panel",
	xtype: 'subcontainer',
	requires: [
		'Ext.Map', 
		'Ext.SegmentedButton', 
		'Ext.dataview.List', 
		'Ext.field.Search',
		'Ext.Toolbar'
	],
	
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
				itemTpl: '<div>{name}</div><span>{address}</span>',
				
				items: [
					{
						xtype: 'toolbar',
						docked: 'top',

						items: [
							{
								width: '92%',
								xtype: 'searchfield',
								placeHolder: 'filtering..',
							},
						]
					}
				]
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
						width: '15%',
						xtype: 'button',
						iconCls: 'locate',
						iconMask: true,
						id:'locateme',
						disabled: true,
					},
					
					{
						width: '15%',
						
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
						width: '30%',
						
						xtype: 'spacer',
					},
					
				]
			},
		]
	},

});
