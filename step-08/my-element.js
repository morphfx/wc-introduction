"use strict";

class MyElement extends HTMLElement {

    _shadow = null;

    _to = "";
    _from = "Santa";

    constructor() {
        super();
        console.log("MyElement constructed!");
    }

    static get observedAttributes() {
        return [ 'from', 'to' ];
    }

    connectedCallback() {
        console.log("Connected");

        this._shadow = this.attachShadow({mode: 'open'});

        // get the attribute values
        this._to = this.getAttribute('to') || "";
        this._from = this.getAttribute('from') || "Santa";

        this.render();
    }
    
    render() {
        if(!this._shadow) return; // not ready yet, don't render
     
        let html = "";

        html+='<style>:host { width: 300px; display: inline-block; text-align: center; background-color: #c0c0ff; margin: 8px; }</style>';
        
        html+='<h2 id="to">'+this._to+'</h2>';

        html+='<h2>Merry Christmas</h2>';

        html+='<svg viewbox="0 0 100 100">';
        html+='  <g>';
        html+='    <polygon points="50,0 70,20 60,20 80,40 70,40 90,60 80,60 100,80 0,80 20,60 10,60 30,40 20,40 40,20 30,20 50,0" fill="green" stroke="dark-green" />';
        html+='    <rect x="40" y="80" width="20" height="20" style="fill: brown;" />';
        html+='</g>';
        html+='</svg>';

        html+='<h1>From</h1>';

        html+='<h2 id="from">'+this._from+'</h2>';

        this._shadow.innerHTML = html;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("Attribute: "+name+" has changed from "+oldValue+" to "+newValue);
        if(!this._shadow) return; // shadow dom doesn't exist yet!

        switch(name) {
            case 'from':
                this._from = newValue;
                this._shadow.getElementById("from").innerHTML = this._from;
                break;
            case 'to':
                this._to = newValue;
                this._shadow.getElementById("to").innerHTML = this._to;
                break;
        }

    }

}

customElements.define('my-custom-element', MyElement );