customElements.define('file-banner',
  class extends HTMLElement {
    constructor() {
      super();
      var container = document.createElement('div');
	  container.innerHTML = this.template();  
	  this.options = {}
      const shadowRoot = this
    	.attachShadow({mode: 'open'})
        .appendChild(container);
    }

	static get observedAttributes() {
		return ['image', 'text', 'class'];
	}
	
	functionLoop(t, c, i){
		setTimeout(function(){
			t.innerHTML += c;
		}, i * 100);
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
	    if (oldVal !== newVal) {
	      if (newVal === null) {
	      }
	      else {
	      	switch(attrName){
	      		case 'image':
	      			this.shadowRoot.querySelector('#image').src = newVal;
	      			break;
				case 'text':
					this.shadowRoot.querySelector('#text').innerHTML = '';
					var t = this.shadowRoot.querySelector('#text');
					var n = newVal;
					for(var i = 0; i < n.length ; i++){
						var c = n[i];
						this.functionLoop(t,c,i);
					}
					//this.shadowRoot.querySelector('#text').innerHTML = newVal;
	      			break;
	      		case 'class':
	      			this.shadowRoot.querySelector('#image').classList.add(newVal);
	      			break;
	      	}
	      }
	    }
	}
	
	template(){
		return `
<style>

.container {
  position: relative;
  text-align: center;
  color: white;
}

/* Bottom left text */
.bottom-left {
  position: absolute;
  bottom: 8px;
  left: 16px;
}

/* Top left text */
.top-left {
  position: absolute;
  top: 8px;
  left: 16px;
}

/* Top right text */
.top-right {
  position: absolute;
  top: 8px;
  right: 16px;
}

/* Bottom right text */
.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 16px;
}

/* Centered text */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.banner-image{
	width: 100%;
	height: 50%;
}


.decorated{
	font-size: xxx-large;
	font-family: monospace;
	text-shadow: 1px 1px #ffffff;
}

</style>
<div class="container">
  <img id='image' src='' alt="" class="banner-image">
  <div class="bottom-left"></div>
  <div class="top-left"></div>
  <div class="top-right"></div>
  <div class="bottom-right"></div>
  <div class="centered decorated" id='text'></div>
</div>
		`	
	}
  }
);
	