var transmit = false;

var socket = new io.connect('http://10.0.1.220:1234');
var ID;

socket.on('connect', function(){
  socket.emit('init', 1);
  
  socket.on('ID', function(data){
    ID = data;
    $("#status").html(ID+" Listo");
    $("#fade_status").hide();

  });

  socket.on('message', function(message){
    //
  });
  socket.on('pregunta', function(data,op1,op2,op3,op4){
     $("#txt_preg").html("Pregunta del profe: "+data);
     $("#op1").html(op1);
     $("#op2").html(op2);
     if(op3!=""){
     	$("#op3").html(op3);
     	$("#op3").show();
     }else{
     	$("#op3").hide();
     }
     if(op4!=""){
     	$("#op4").html(op4);
     	$("#op4").show();
     }else{
     	$("#op4").hide();
     }
     
     $("#fade_pregunta").show();
     navigator.notification.vibrate(500);
  });
  socket.on('disconnect', function(){
    //
  });

});


function send_test(){
    	socket.emit('test', ID);
}

function resp(op){
  //navigator.notification.vibrate(500);
  socket.emit('resp', ID,op);
	$("#fade_pregunta").hide();
	
}

    document.addEventListener("deviceready",onDeviceReady,false);

    // PhoneGap esta listo para usarse!
    //
    function onDeviceReady() {
        navigator.notification.beep(3);
        navigator.notification.vibrate(300);
        alert("pg listo");
    }
    function vibrar(){
        navigator.notification.vibrate(300);
    }
function gps(){
     navigator.geolocation.getCurrentPosition(onSuccessgps, onErrorgps);
 }

   function onSuccessgps(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          +                                   position.timestamp          + '<br />';
    }

    // onError Callback receives a PositionError object
    //
    function onErrorgps(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }
    function checkconect(){
        var states = {};
        states[Connection.UNKNOWN]  = 'Conexión desconocida';
        states[Connection.ETHERNET] = 'Conexión ethernet';
        states[Connection.WIFI]     = 'Conexión WiFi';
        states[Connection.CELL_2G]  = 'Conexión movil 2G';
        states[Connection.CELL_3G]  = 'Conexión movil 3G';
        states[Connection.CELL_4G]  = 'Conexión movil 4G';
        states[Connection.NONE]     = 'Sin conexión';
        networkState = navigator.network.connection.type
        alert(states[networkState]);
    }