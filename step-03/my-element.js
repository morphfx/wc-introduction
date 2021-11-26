"use strict";

class MyElement extends HTMLElement {

    constructor() {
        super();
        console.log("MyElement constructed!");
    }
}

customElements.define('my-custom-element', MyElement );