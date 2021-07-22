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
	this.send_data(midi_msg_json);
	outputToConsole("note_on " + midi_msg_json );
    }
    
    note_off(key){
	var midi_msg = [0x81, key, 63];
	var midi_msg_json = JSON.stringify(midi_msg);
	this.send_data(midi_msg_json);	
        outputToConsole("note_off " + midi_msg_json);
  }

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
    }
}

let midi = new MidiREST();
midi.note_on("10");

$(".key").on("mouseover", function() {
    var index = $(this).index('.key');
    midi.note_on(index);
});
$(".key").on("mouseout", function() {
  var index = $(this).index('.key');
  midi.note_off(index);
});
