customElements.define('md-card',
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
		return ['title', 'text', 'image', 'link', 'link-title', 'image-width', 'image-height', 'expand'];
	}
	
	pad(n){
		var retVal = '';
		for(var i = 0 ; i < n ; i ++){
			retVal += '&nbsp;';
		}
		return retVal;
	}
	
	expandText(str){
		console.log(str);
		this.shadowRoot.querySelector('#card-' + 'text').innerHTML = this.shadowRoot.querySelector('#card-' + 'text').innerHTML.replace('...', '').replace('&nbsp;&nbsp;', '') .trim() + str;
	}
	
	attributeChangedCallback(attrName, oldVal, newVal) {
	    if (oldVal !== newVal) {
	      if (newVal === null) {
	      }
	      else {
	      	switch(attrName){
	      		case 'title':
	      		case 'link-title':
	      			this.shadowRoot.querySelector('#card-' + attrName).innerHTML = newVal;
	      			break;
	      		case 'text':
	      			this.textVal = newVal;
	      			var strippedText = newVal.length > 50 ? newVal.substr(0, 50) : newVal + this.pad(50 - newVal.length);
	      			var strippedTextExt = newVal.length > 50 ? newVal.substr(50) : '';
	      			if(strippedTextExt != ''){
	      				strippedText += '&nbsp;&nbsp;' + `<a onclick="this.getRootNode().host.expandText('` + strippedTextExt  + `')">` + "..." + "</a>";
	      				// strippedText += '&nbsp;&nbsp;' + `<a onclick="javascript:alert('hi');">` + "..." + "</a>";
	      			}
	      			this.shadowRoot.querySelector('#card-' + attrName).innerHTML = strippedText;
	      			break;
	      		case 'expand':
	      			if(newVal && this.textVal){
	      				this.shadowRoot.querySelector('#card-' + 'text').innerHTML = this.textVal;
	      			}
	      			break;
				case 'image':
					this.shadowRoot.querySelector('#card-' + attrName).src = newVal;
	      			break;
				case 'link':
					this.shadowRoot.querySelector('#card-' + attrName).href = newVal;
	      			break;
	      		case 'image-width':
					this.shadowRoot.querySelector('#card-' + 'image').style.width = newVal;
	      			break;
	      		case 'image-height':
					this.shadowRoot.querySelector('#card-' + 'image').style.height = newVal;
	      			break;
	      	}
	      }
	    }
	}
	
	template(){
		return `
<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.10.1/css/mdb.min.css";
.card-image{
	width: 13em;
	height: 10em;
	margin-left: calc((100% - 13em)/2);
}
</style>
<!-- Card -->
<div class="card">

  <!-- Card image -->
  <div class="view overlay">
    <img id='card-image' class="card-img-top card-image" src="" alt="Card image cap">
    <a href="#!">
      <div class="mask rgba-white-slight"></div>
    </a>
  </div>

  <!-- Card content -->
  <div class="card-body">

    <!-- Title -->
    <h4 class="card-title"><span id='card-title'></span></h4>
    <!-- Text -->
    <p class="card-text"><span id='card-text'></span></p>
    <!-- Button -->
    <a id='card-link' href="#" class="btn btn-dark"><span id='card-link-title'></span></a>

  </div>

</div>
<!-- Card -->  			`	
	}
  }
);
	