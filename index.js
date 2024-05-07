import "./webkeyboard_component.js";
import "./console_component.js";

function outputToConsole(text) {
    let json_data = { msg : text };
    document.getElementById("console").print = JSON.stringify(json_data);
}

function create_webkeyboard() {
    let content_tag = document.getElementById("content");
    let webkeyboard_component_tag = document.createElement("webkeyboard-component");
    webkeyboard_component_tag.addEventListener("log-event",(event) => {
        outputToConsole(event.detail);
    });
    content_tag.append(webkeyboard_component_tag);
}

function create_console() {
    let footer_tag = document.getElementById("footer");
    let consol_component_tag = document.createElement("console-component");
    consol_component_tag.setAttribute("id","console");
    footer_tag.append(consol_component_tag);
}

create_webkeyboard();
create_console();
outputToConsole("init successful");

