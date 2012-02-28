/*global google*/

Ext.define("Bicycle.controller.BicycleController", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			main: 'mainpanel',
			map: 'map',
		},
		control: {
			map: {
				maprender: 'onMapRender',
			},
		}
	},
	onMapRender : function(comp, map) {
		'use strict';
		var self = this;

		console.log('onMapRender');
		var infowindow = new google.maps.InfoWindow();
		
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
									title: rec.get('name'),
									icon: 'resource/' + icon
				});
				
				google.maps.event.addListener(marker, 'click', function() {
					// infowindow.setContent(rec.get('name'));
					// infowindow.open(map, this);
					if (!self.station) 
					{
						self.station = Ext.create('Bicycle.view.Station');
					}

					// Bind the record onto the show contact view
					self.station.setRecord(rec);

					// Push the show contact view into the navigation view
					self.getMain().push(self.station);
				});
			});
		}, 300);
	},
});