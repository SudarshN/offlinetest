/*
 * http://stackoverflow.com/questions/18260815/use-gapi-client-javascript-to-execute-my-custom-google-api
 * https://developers.google.com/appengine/docs/java/endpoints/consume_js
 * https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientload
 *
 */

/**
 * After the client library has loaded, this init() function is called.
 * The init() function loads the helloworldendpoints API.
 */
var valueinthetextbox;
var arrayofvaluestobepushed= [ ];
function init() {
	
	// You need to pass the root path when you load your API
	// otherwise calls to execute the API run into a problem
	
	// rootpath will evaulate to either of these, depending on where the app is running:
	// //localhost:8080/_ah/api
	// //your-app-id/_ah/api

	
	 var ROOT = "https://mynewproject-1234.appspot.com/_ah/api";
	 gapi.client.load('helloworldendpoints', 'v1', loadCallback, ROOT);
	
	
}

/*
 * When helloworldendpoints API has loaded, this callback is called.
 * 
 * We need to wait until the helloworldendpoints API has loaded to
 * enable the actions for the buttons in index.html,
 * because the buttons call functions in the helloworldendpoints API
 */
function loadCallback () {	
	// Enable the button actions
	
	if(app.internetconnection == 'WiFi connection')
	{
		
		var user = JSON.parse(localStorage.getItem('HelloClass'));
		for(var i=0; i<arrayofvaluestobepushed.length;i++){
	    	
	    	var request = gapi.client.helloworldendpoints.sayHelloByName({'name': arrayofvaluestobepushed[i]});
	    	request.execute(sayHelloCallback);
		}
	} 
	enableButtons ();
}

function enableButtons () {
	// Set the onclick action for the first button
	btn = document.getElementById("input_greet_generically");
	btn.onclick= function(){greetGenerically();};
	
	// Update the button label now that the button is active
	btn.value="Click me for a generic greeting";
	
	
	btn = document.getElementById("saveoffline");
	btn.onclick= function(){saveOffline();};
	// Set the onclick action for the second button
	
}

function saveOffline()
{
	var x = document.getElementById("mytextarea");
	valueinthetextbox = x.value;
	 db.transaction(populateDB, errorCB, successCB);
}

function populateDB(tx) {   
	var sql = 'INSERT INTO SoccerPlayer(Name,Club) VALUES(?,?)';
	tx.executeSql(sql,[valueinthetextbox,"chest press"]);
   // tx.executeSql('INSERT INTO SoccerPlayer(Name,Club) VALUES ("Sudarsh", "valueinthetextbox")');
    
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

//function will be called when process succeed
function successCB() {
    alert("success!");
    db.transaction(queryDB,errorCB);
}

function queryDB(tx){
    tx.executeSql('SELECT * FROM SoccerPlayer',[],querySuccess,errorCB);
}

function querySuccess(tx,result){
	 console.log('render list'); 
	    var len = result.rows.length;
	    console.log('len: '+len);
	    for(var i=0; i<len;i++){
	    	arrayofvaluestobepushed.push(result.rows.item(i).Name);
	       
	    }
	    console.log(arrayofvaluestobepushed);
}
/*
 * Execute a request to the sayHello() endpoints function
 */
function greetGenerically () {
	// Construct the request for the sayHello() function
	var request = gapi.client.helloworldendpoints.sayHello();
	
	// Execute the request.
	// On success, pass the response to sayHelloCallback()
	request.execute(sayHelloCallback);
}

/*
 * Execute a request to the sayHelloByName() endpoints function.
 * Illustrates calling an endpoints function that takes an argument.
 */
function greetByName () {
	// Get the name from the name_field element
	var name = document.getElementById("name_field").value;
	 
	// Call the sayHelloByName() function.
	// It takes one argument "name"
	// On success, pass the response to sayHelloCallback()
	var request = gapi.client.helloworldendpoints.sayHelloByName({'name': name});
	request.execute(sayHelloCallback);
}

// Process the JSON response
// In this case, just show an alert dialog box
// displaying the value of the message field in the response
function sayHelloCallback (response) {
	
	/*localStorage.setItem("HelloClass", JSON.stringify({
	     Id : response.id,
	    message: response.message 
	}));  */ 
	/*if(app.internetconnection == 'No network connection')
		{
			alert("No Internet Connection try ot strore");
			var user = JSON.parse(localStorage.getItem('HelloClass'));
			var x = document.getElementById("mytextarea");
			x.value = user.message;
		} 
	else				  
	{*/
	alert(response.message);	
	//}
	
	//console.log( app.internetconnection);
	
}



