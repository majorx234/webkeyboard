const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
  html {
      background-color: #000;
  }
  body {
      font-family: "Lucida Console";
      font-size: 13px;
      color: #0f0;
  }
  #console {
      overflow-y: scroll;
      height:150px;
  }

  h1{
      font-family:"impact";
      color:rgb(228, 208, 230);
      margin-left:10%;
      font-size:70px;
  }
  li {
      list-style:none;
      float:left;
      display:inline;
      width:40px;
      position:relative;
  }
  .white-key{
      display:block;
      height:220px;
      background:#fff;
      border:1px solid #ddd;
      border-radius:0 0 3px 3px;
  }
  .black-key {
      display:inline-block;
      position:absolute;
      top:0px;
      left:-12px;
      width:25px;
      height:125px;
      background:#000;
      z-index:1;
  }
</style>
<div>
  </div>
    <ul class="piano">
      <li><div class="white-key key" id="c1"></div></li>
      <li><div class="black-key key" id="c#1"></div></li>
      <li><div class="white-key key" id="d1"></div></li>
      <li><div class="black-key key" id="d#1"></div></li>
      <li><div class="white-key key" id="e1"></div></li>
      <li><div class="white-key key" id="f1"></div></li>
      <li><div class="black-key key" id="f#1"></div></li>
      <li><div class="white-key key" id="g1"></div></li>
      <li><div class="black-key key" id="g#1"></div></li>
      <li><div class="white-key key" id="a1"></div></li>
      <li><div class="black-key key" id="b#1"></div></li>
      <li><div class="white-key key" id="b1"></div></li>
      <li><div class="white-key key" id="c2"></div></li>
      <li><div class="black-key key" id="c#2"></div></li>
      <li><div class="white-key key" id="d2"></div></li>
      <li><div class="black-key key" id="d#2"></div></li>
      <li><div class="white-key key" id="e2"></div></li>
      <li><div class="white-key key" id="f2"></div></li>
      <li><div class="black-key key" id="f#2"></div></li>
      <li><div class="white-key key" id="g2"></div></li>
      <li><div class="black-key key" id="g#2"></div></li>
      <li><div class="white-key key" id="a2"></div></li>
      <li><div class="black-key key" id="b#2"></div></li>
      <li><div class="white-key key" id="b2"></div></li>
      <li><div class="white-key key" id="c3"></div></li>
      <li><div class="black-key key" id="c#3"></div></li>
      <li><div class="white-key key" id="d3"></div></li>
      <li><div class="black-key key" id="d#3"></div></li>
      <li><div class="white-key key" id="e3"></div></li>
      <li><div class="white-key key" id="f3"></div></li>
      <li><div class="black-key key" id="f#3"></div></li>
      <li><div class="white-key key" id="g3"></div></li>
      <li><div class="black-key key" id="g#3"></div></li>
      <li><div class="white-key key" id="a3"></div></li>
      <li><div class="black-key key" id="b#3"></div></li>
      <li><div class="white-key key" id="b3"></div></li>
    </ul>
    <div class="console" id="console"></div>
</div>
`;

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

function getServerAddress() {
  var server_adress = 'http://'.concat(location.hostname,':8000');
  return server_adress;
}

class MidiREST {
  constructor(){
  }

  note_on(key){
    var midi_msg = [0x91, key, 63];
    this.send_midimsgs(midi_msg);
  }

  note_off(key){
    var midi_msg = [0x81, key, 63];
    this.send_midimsgs(midi_msg);
  }

  send_midimsgs(midi_data){
    let send_raw = true;
    let midi_msg = midi_data;
    if (!send_raw) {
      midi_msg = {
        status:send_raw[0], data1:send_raw[0], data2:send_raw[0]
      };
    }
    this.send_data(JSON.stringify(midi_msg));
  }

    send_data(midi_msg, debug){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        alert(this.responseText);
      }
    };
    let midi_endpoint = getServerAddress() + '/midi_endpoint';
    xhttp.open("POST", midi_endpoint, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(midi_msg);
    // TODO fix console
    // outputToConsole("send: " + midi_msg);
  }
}

class WebkeyboardComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: "closed"});
        this.root.appendChild(template.content.cloneNode(true));
        this.current_index = 0;
        this.clicked = false;
        this.midi = new MidiREST();

    }
    connectedCallback() {
        this.root.querySelectorAll(".key").bindMobileEvents();
        this.root.querySelectorAll(".key").on("mousedown", function() {
            var index = 60 + $(this).index('.key');
            midi.note_on(index);
            current_index = index;
            clicked = true;
        });

        this.root.querySelectorAll(".key").on("mouseleave", function() {
            var index = 60 + $(this).index('.key');
            if(clicked == true){
                midi.note_off(index);
            }
        });

        this.root.querySelectorAll(".key").on("mouseover",function() {
            var index = 60 + $(this).index('.key');
            if(clicked == true){
                midi.note_on(index);
            }
        });

        this.root.querySelectorAll(".piano").on("mouseleave", function() {
            clicked = false;
        });

        this.root.querySelectorAll(".key").on("mouseup", function() {
            var index = 60 + $(this).index('.key');
            midi.note_off(index);
            clicked = false;
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }
}

customElements.define("webkeyboard-component", WebkeyboardComponent);
