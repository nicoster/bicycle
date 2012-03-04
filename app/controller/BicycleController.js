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
			stations: 'list',
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
			},
			stations: {
				select: 'onStationSelect',
				disclose: 'onItemDisclosure'
			},			
		}
	},
	
	onItemDisclosure: function(list, rec){
		'use strict';

		var seg = this.getSegmentedButton();
		seg.setPressedButtons([seg.getAt(0)]);
		seg.fireEvent('toggle', seg, seg.getAt(0));
		
		var marker = this.markers[rec.get('id')];
		this.map.panTo(marker.position);
		this.map.setZoom(14);
		google.maps.event.trigger(marker, 'click');
	},
	
	showStation: function(rec){
		'use strict';
		if (!this.station) 
		{
			this.station = Ext.create('Bicycle.view.Station');
		}

		// Bind the record onto the show contact view
		this.station.setRecord(rec);
		this.station.config.title = rec.get('name');

		// Push the show contact view into the navigation view
		this.getMain().push(this.station);		
	},
	
	onStationSelect: function(list, rec) {
		'use strict';
		this.showStation(rec);
	},
	
	onSearchClearIconTap: function(){
		'use strict';
		
		Ext.getStore('Bicycles').clearFilter();
	},
	
	onSearchKeyUp: function(field) {
		'use strict';
		
		clearTimeout(this.timeid);
		
		this.timeid = setTimeout(function(){
			//get the store and the value of the field
			var value = field.getValue(),
				store = Ext.getStore('Bicycles');

			console.log(value);


			if (! value) {
				store.clearFilter();
			}
			else {
				if (value.indexOf(this.prevCriteria) === -1) {
					store.clearFilter();
				}

				var reg = new RegExp(value, 'i');
				store.filter(function(rec) {
					return rec.get('name').match(reg) || rec.get('address').match(reg);
				});			
			} 

			this.prevCriteria = value;			
		}, 600);
	
	},
	
	onLocateMe: function(){
		'use strict';
		this.map.panTo(new google.maps.LatLng(31.318283,120.627158));
	},
	
	onSegmentedButtonToggle : function(seg, btn) {
		'use strict';
		this.switchView(btn.config.text === 'Map');
	},

	switchView: function(map){
		'use strict';
		
		var m = this.getMap();
		var s = this.getStationListView();
		var l = this.getLocateMe();
		if (map)
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
		
		setTimeout(function(){self.addMarkers(map);}, 800);
	},
	
	addMarkers: function(map){
		'use strict';
		var self = this;
		self.markers = {};
		
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
/*									icon: new google.maps.Marker({
									url: 'resource/' + icon,
									scaledSize: new google.maps.Size(32, 32),
									anchor: new google.maps.Point(16, 32)
								})
*/				});
				
			self.markers[rec.get('id')] = marker;
			
			google.maps.event.addListener(marker, 'click', function() {
				console.log('click on a marker');
				self.infowindow.setContent('<div id="infowindow" class="phoneytitle">' + rec.get('name')
					+ '&nbsp;[' + rec.get('availBike') 
					+ '/' + rec.get('capacity') + ']<div class="phoneytext">' + rec.get('address') + '</div></div>'
				);
				if (self.infowndHandler) {
					google.maps.event.removeListener(self.infowndHandler);
				}

				self.infowindow.open(map, this);
				
				//FIXME: as InfoBubble seems not to have a domready event(nor any event actually), I have to bind the callback the dirty way.
				setTimeout(function(){
					self.infowndHandler = google.maps.event.addDomListener(
						document.getElementById('infowindow'), 'click', function(){
							self.showStation(rec);
						}
					);
				}, 500);
			});
		});
	}
});