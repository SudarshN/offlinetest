var db;
var app = {
    // Application Constructor
	internetconnection :null,
	
    initialize: function() {
        this.bindEvents();
       
    }, 
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
    	 //document.addEventListener("online", onOnline, false);
    	//document.addEventListener("offline", onOffline, false);
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    }, 
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        if (window.openDatabase) {
        db = window.openDatabase("Dummy_DB", "1.0", "Just a Dummy DB", 2*1024*1024);
        
        db.transaction(createDB, errorCB, successCB);
        }
        else {
            alert("WebSQL is not supported by your browser!");
        }
    },
   
    
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event d: ' + id);
        checkConnection();
    } 
};
 
//create table and insert some record
function createDB(tx) {
	
    tx.executeSql('CREATE TABLE IF NOT EXISTS SoccerPlayer (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Club TEXT NOT NULL)');
    //tx.executeSql('INSERT INTO SoccerPlayer(Name,Club) VALUES ("Nicholas", "AC Milan")');
    //tx.executeSql('INSERT INTO SoccerPlayer(Name,Club) VALUES ("Van Persie", "Arsenal")');
}

//function will be called when an error occurred
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

//function will be called when process succeed
function successCB() {
    alert("success!");
    db.transaction(queryDB,errorCB);
}

//select all from SoccerPlayer
function queryDB(tx){
    tx.executeSql('SELECT * FROM SoccerPlayer',[],querySuccess,errorCB);
}

function querySuccess(tx,result){
	 console.log('render list'); 
	    var len = result.rows.length;
	    console.log('len: '+len);
	    for(var i=0; i<len;i++){
	        alert(result.rows.item(i).Name);
	    }
}

function checkConnection() { 
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
   
    
    app.internetconnection = states[networkState];
    alert('Connection type: ' + app.internetconnection);
}

app.initialize();
