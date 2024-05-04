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

class WebkeyboardComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: "closed"});
        this.root.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }
}

customElements.define("webkeyboard-component", WebkeyboardComponent);
