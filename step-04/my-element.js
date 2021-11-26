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
     
        this._shadow.innerHTML = '<div style="background-color: #a0a0ff;"> My Custom Element </div>';
    }

}

customElements.define('my-custom-element', MyElement );


