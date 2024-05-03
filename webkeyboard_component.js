const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
</style>
<div>
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
