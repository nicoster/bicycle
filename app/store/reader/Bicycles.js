Ext.define('Bicycle.store.reader.Bicycles', {
    extend: 'Ext.data.reader.Json',
	
    getResponseData: function(response) {
		debugger;
        return this.callParent([response.responseText.substring(12)]);
    },
    root: 'root'
});