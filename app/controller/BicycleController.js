/*global google*/

Ext.define("Bicycle.controller.BicycleController", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			main: 'map',
		},
		control: {
			main: {
				maprender: 'onMapRender',
			},
		}
	},
	onMapRender : function(comp, map) {
		'use strict';

		console.log('onMapRender');
		
		setTimeout(function(){
			var bicycles = Ext.getStore('Bicycles');
			bicycles.each(function(rec){
				var icon, cap = rec.get('capacity'), avail = rec.get('availBike');
				if (avail){
					icon = (cap - avail) ? 'normal.png' : 'full.png';
				}
				else {
					icon = 'none.png';
				}
				
				var pos = new google.maps.LatLng(rec.get('lat'), rec.get('lng'));
				var marker = new google.maps.Marker({
									map:map,
									position: pos,
									icon: 'resource/' + icon
				});
			});
		}, 100);
		
		
		// google.maps.event.addListener(marker, 'click', function() {
		// 	console.log('clicked on marker');
		// 	map.setZoom(8);
		// });
		// var darwin = new google.maps.LatLng(-12.461334, 130.841904);
		// map.setCenter(pos);
	},
});