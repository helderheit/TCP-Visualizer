net = require('net');

var running = true;

function pushMessage(text){
  $("#output").html(text);
    $("#output").fadeIn(50,function(){
        $("#output").fadeOut( 2000, function() {
        });
  });
}

var server = net.createServer(function (socket) {
  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    socket.write("ok");
    var textData = String.fromCharCode.apply(null,data)
    pushMessage(textData)
  });

});
server.listen(5000);

$( document ).ready(function() {
  pushMessage("running on port 5000");


$("#startstop").on("click", function(){
  if(running){
    $("#startstop").html("Start Server");
    pushMessage("stopped server");
    server.close();
    running = false;
  }else{
    $("#startstop").html("Stop Server");
    server.listen(parseInt($("#port").val()));
    pushMessage("running on port "+$("#port").val());
    running = true;
  }

});
});
