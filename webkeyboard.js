function outputToConsole(text) {
  var para = document.createElement("p");
  var node = document.createTextNode(text);
  para.appendChild(node);
    document.getElementById("console").appendChild(para);
    para.scrollIntoView();
}

class MidiREST {
    constructor(){
	
    }


    note_on(key){
	var midi_msg = [0x91, key, 63];
	var midi_msg_json = JSON.stringify(midi_msg);
	//this.send_data(midi_msg_json);
	outputToConsole("note_on " + midi_msg_json );
    }
    
    note_off(key){
	var midi_msg = [0x81, key, 63];
	var midi_msg_json = JSON.stringify(midi_msg);
	//this.send_data(midi_msg_json);	
        outputToConsole("note_off " + midi_msg_json);
  }
/*
    send_data(midi_msg){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
		alert(this.responseText);
	    }
	};
	xhttp.open("POST", "http://192.168.234.13:5000/midi_endpoint", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(midi_msg);
    }*/
}
var current_index = 0;
var clicked = false;
let midi = new MidiREST();


$(".key").on("mousedown", function() {
    var index = $(this).index('.key');
    midi.note_on(index);
    current_index = index;
    clicked = true;
});

$(".key").on("mouseleave", function() {
    var index = $(this).index('.key');
    if(clicked == true){
      midi.note_off(index);  
    }
});

$(".key").on("mouseover",function() {
    var index = $(this).index('.key');
    if(clicked == true){
        midi.note_on(index);
    }
});

$(".piano").on("mouseleave", function() {
    clicked = false;
});
	     
// Achtung mousklick is ok, aber wenn wir die Moustaste loslassen
// sind wir dann eigentlich noch auf dem selben DOM-Element????
//wir nehmen das erstmal an
$(".key").on("mouseup", function() {
    var index = $(this).index('.key');
    midi.note_off(index);
    clicked = false;
});

$.fn.bindMobileEvents = function () {
  $(this).on('touchstart touchmove touchend touchcancel', function () {
      var touches = (event.changedTouches || event.originalEvent.targetTouches),
          first = touches[0],
          type = '';

      switch (event.type) {
      case 'touchstart':
        type = 'mousedown';
        break;
      case 'touchmove':
        type = 'mousemove';
        event.preventDefault();
        break;
      case 'touchend':
        type = 'mouseup';
        break;
      default:
        return;
      }

      var simulatedEvent = document.createEvent('MouseEvent'); 
      simulatedEvent.initMouseEvent(
        type, true, true, window, 1, 
        first.screenX, first.screenY, first.clientX, first.clientY, 
        false, false, false, false, 0/*left*/, null
      );

      first.target.dispatchEvent(simulatedEvent);
    });
  };


$(".key").bindMobileEvents();
