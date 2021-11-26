"use strict";

class SnowFlake {
    x = 0;
    y = 0;
    f = 0.5;

    elm = null;
   
    constructor() {
        this.x = (Math.random() * 400) - 50;
        this.y = (Math.random() * 900) - 300;

        this.f = (Math.random() * 0.6) + 0.3;
    }

    update() {
        this.y += this.f;

        if(this.y > 600) {
            this.y= -100 - (Math.random() * 30);
            this.x = Math.random() * 300;
        }

        this.elm.style.left = (this.x + Math.sin(this.y/30)*8)+"px";
        this.elm.style.top = this.y+"px";
    }
}

class MyElement extends HTMLElement {

    _shadow = null;

    _to = "";
    _from = "Santa";
    _snowFlakes = new Array();

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

        for( var i=0; i<20; i++ ) {
            this._snowFlakes.push(this.createSnowFlake());
        }

        console.log(this._snowFlakes);

        let self = this;

        window.setInterval( () => {

            self._snowFlakes.forEach( flake => {
                flake.update();
            });

        }, 5);
    }
    
    createSnowFlake() {
        
        let elm = document.createElement('img');

        elm.src = 'snow-flake.png';
        elm.style = "position: absolute; user-select: none; opacity: 0.6;";
        this._shadow.appendChild(elm);

        let snowFlake = new SnowFlake();
        snowFlake.elm = elm;
        
        return snowFlake;
    }

    render() {
        if(!this._shadow) return; // not ready yet, don't render
     
        let html = "";

        html+='<style>:host { overflow: clip; position: relative; width: 300px; height: 550px; display: inline-block; text-align: center; background-color: #c0c0ff; margin: 8px; }</style>';
        
        html+= "<h2>"+this._to+"</h2>";
        html+="<h2>Merry Christmas</h2>";

        html+='<svg viewbox="0 0 100 100">';
        html+='  <g>';
        html+='    <polygon points="50,0 70,20 60,20 80,40 70,40 90,60 80,60 100,80 0,80 20,60 10,60 30,40 20,40 40,20 30,20 50,0" fill="green" stroke="dark-green" />';
        html+='    <rect x="40" y="80" width="20" height="20" style="fill: brown;" />';
        html+='</g>';
        html+='</svg>';

        html+="<h1>From</h1>";
        html+="<h2>"+this._from+"</h2>";

        this._shadow.innerHTML = html;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("Attribute: "+name+" has changed from "+oldValue+" to "+newValue);

        switch(name) {
            case 'from':
                this._from = newValue;
                this.render();
                break;
            case 'to':
                this._to = newValue;
                this.render();
                break;
        }

    }

}

customElements.define('my-custom-element', MyElement );