/*global google, InfoBubble, alert, document*/

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
			search: 'searchfield',
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
			search: {
				clearicontap: 'onSearchClearIconTap',
				keyup: 'onSearchKeyUp'
			}
		}
	},
	
	onSearchClearIconTap: function(){
		'use strict';
		
		Ext.getStore('Bicycles').clearFilter();
	},
	
	onSearchKeyUp: function(field) {
		'use strict';
		
		//get the store and the value of the field
		var value = field.getValue(),
			store = Ext.getStore('Bicycles');

		console.log(value);
		
		if (! value) {
			store.clearFilter();
		}
		else if (value.indexOf(this.prevCriteria) === -1) {
			//first clear any current filters on thes tore
			store.clearFilter();
			var loop = 0;
			var reg = new RegExp(value, 'i');
			store.filter(function(rec) {
				loop ++;
				return rec.get('name').match(reg);
			});			
			console.log('loop:' + loop);
		} 
		
		this.prevCriteria = store.data.length ? null : value;
		console.log('prev:' + this.prevCriteria);
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
		self.map = map;
		
		console.log('onMapRender');
//		var infowindow = new google.maps.InfoWindow();
		
		self.infowindow = new InfoBubble({
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
			
		// Listen for user click on map to close any open info bubbles
		google.maps.event.addListener(map, "click", function () { 
			self.infowindow.close();
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
					self.infowindow.setContent('<div id="infowindow" class="phoneytitle">' + rec.get('name')
						+ '&nbsp;[' + rec.get('availBike') 
						+ '/' + rec.get('capacity') + ']<div class="phoneytext">' + rec.get('address') + '</div></div>'
					);
					if (self.infoWindowHandler) {
						google.maps.event.removeListener(self.infoWindowHandler);
					}

					self.infowindow.open(map, this);
					
					//FIXME: as InfoBubble seems not to have a domready event(nor any event), I have to bind the callback by the ugly way.
					setTimeout(function(){
						self.infoWindowHandler = google.maps.event.addDomListener(
							document.getElementById('infowindow'), 'click', function(){
								if (!self.station) 
								{
									self.station = Ext.create('Bicycle.view.Station');
								}

								// Bind the record onto the show contact view
								self.station.setRecord(rec);
								self.station.config.title = rec.get('name');

								// Push the show contact view into the navigation view
								self.getMain().push(self.station);
							}
						);
					}, 500);					
					return;
					
				});
			});
		}, 800);
	},
});