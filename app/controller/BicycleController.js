/*global google, InfoBubble*/

Ext.define("Bicycle.controller.BicycleController", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			main: 'mainpanel',
			map: 'map',
			stationImage: '#stationimage',
			segmentedButton: 'segmentedbutton',
			stationListView : 'subcontainer list',
			locateMe: '#locateme',
		},
		control: {
			map: {
				maprender: 'onMapRender',
			},
			segmentedButton: {
				toggle: 'onSegmentedButtonToggle'
			},
			locateMe: {
				tap: 'onLocateMe'
			},
		}
	},
	
	onLocateMe: function(){
		'use strict';
		this.map.panTo(new google.maps.LatLng(31.318283,120.627158));
	},
	
	onSegmentedButtonToggle : function(seg, btn) {
		'use strict';
		
		var m = this.getMap();
		var s = this.getStationListView();
		var l = this.getLocateMe();
		if (btn.config.text === 'Map')
		{
			s.hide();
			m.show();
			l.enable();
		} else {
			s.show();
			m.hide();
			l.disable();
		}
	},
		
	onMapRender : function(comp, map) {
		'use strict';
		var self = this;
		this.map = map;
		
		console.log('onMapRender');
//		var infowindow = new google.maps.InfoWindow();
		
		var infowindow = new InfoBubble({
				map: map,
				content: '<div class="phoneytext">Some label</div>',
				position: new google.maps.LatLng(-35, 151),
				shadowStyle: 1,
				padding: 0,
				backgroundColor: 'rgb(57,57,57)',
				borderRadius: 4,
				arrowSize: 10,
				borderWidth: 1,
				borderColor: '#2c2c2c',
				disableAutoPan: true,
				hideCloseButton: true,
				arrowPosition: 30,
				backgroundClassName: 'phoney',
				maxWidth: 200,
				arrowStyle: 0
			});
		
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
				
				icon = 'marker.png';
				var pos = new google.maps.LatLng(rec.get('lat'), rec.get('lng'));
				var marker = new google.maps.Marker({
									map:map,
									position: pos,
									title: rec.get('name'),
									icon: new google.maps.Marker({
										url: 'resource/' + icon,
										scaledSize: new google.maps.Size(32, 32),
										anchor: new google.maps.Point(16, 32)
									})
				});
				
				google.maps.event.addListener(marker, 'click', function() {
					// infowindow.setContent('<div class="phoneytitle">' + rec.get('name')
					// 	+ '[' + rec.get('availBike') 
					// 	+ '/' + rec.get('capacity') + ']<div class="phoneytext">' + rec.get('address') + '</div></div>'
					// );
					// infowindow.open(map, this);
					// return;
					
					if (!self.station) 
					{
						self.station = Ext.create('Bicycle.view.Station');
					}

					// Bind the record onto the show contact view
					self.station.setRecord(rec);
					self.station.config.title = rec.get('name');
//					self.getStationImage().src = 'http://www.subicycle.com/szmap/img/' + rec.get('id') + '.jpg';
					// Push the show contact view into the navigation view
					self.getMain().push(self.station);
				});
			});
		}, 800);
	},
});