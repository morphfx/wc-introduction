"use strict";

class MyElement extends HTMLElement {

    _shadow = null;

    constructor() {
        super();
        console.log("MyElement constructed!");
    }

    connectedCallback() {
        console.log("Connected");

        this._shadow = this.attachShadow({mode: 'open'});
        this.render();
    }
    
    render() {
        if(!this._shadow) return; // not ready yet, don't render
     
        let html = "";

        html+='<style>:host { width: 300px; display: inline-block; text-align: center; background-color: #c0c0ff; margin: 8px; }</style>';

        html+='<svg viewbox="0 0 100 100">';
        html+='  <g>';
        html+='    <polygon points="50,0 70,20 60,20 80,40 70,40 90,60 80,60 100,80 0,80 20,60 10,60 30,40 20,40 40,20 30,20 50,0" fill="green" stroke="dark-green" />';

        html+='    <rect x="40" y="80" width="20" height="20" style="fill: brown;" />';

        html+='</g>';
        html+='</svg>';

        this._shadow.innerHTML = html;
    }

}

customElements.define('my-custom-element', MyElement );