customElements.define('header-nav',
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
		return ['logo', 'theme', 'background', 'title', 'tagline', 'title-css', 'tagline-css'];
	}
	
	attributeChangedCallback(attrName, oldVal, newVal) {
	    if (oldVal !== newVal) {
	      if (newVal === null) {
	      }
	      else {
	      	switch(attrName){
	      		case 'logo':
	      			this.shadowRoot.querySelector('#logo').src = newVal;
	      			break;
				case 'title':
				case 'tagline':
					this.shadowRoot.querySelector('#' + 'logo-text-'  + attrName).innerHTML = newVal;
					break;
				case 'title-css':
				case 'tagline-css':
					this.shadowRoot.querySelector('#' + 'logo-text-'  + attrName.substr(0, attrName.length - 4)).classList.add(newVal);
					break;
	      		case 'background':
	      			this.shadowRoot.querySelector('#navContainer').classList.add( newVal);
	      			break;
	      		case 'theme':
	      			switch(newVal){
	      				case 'dark':
	      					this.shadowRoot.querySelector('#navContainer').classList.remove('navbar-' + 'light');
	      					this.shadowRoot.querySelector('#navContainer').classList.add('navbar-' + newVal);
	      					break;
	      				case 'light':
	      					this.shadowRoot.querySelector('#navContainer').classList.remove('navbar-' + 'dark');
	      					this.shadowRoot.querySelector('#navContainer').classList.add('navbar-' + newVal);
	      					break;
	      			}
	      			break;
	      	}
	      }
	    }
	}
	
	equals(arr1, arr2){
		for(var i = 0 ; i < arr1.length; i++){
			if(arr1[i] != arr2[i]){
				return false;
			}
		}
		return true;
	}
	
	
	contains(arr, el){
		var len = arr.length;
		for(var i = 0 ; i < len ; i++){
			if(arr[i] == el){
				return true;
			}
		}
		return false;
	}
	
	toggleMenu(){
		
		if(this.contains(this.shadowRoot.querySelector('#basicExampleNav').classList, 'collapse')){
			this.shadowRoot.querySelector('#basicExampleNav').classList.remove('collapse');
		} else {
			this.shadowRoot.querySelector('#basicExampleNav').classList.add('collapse');
		}
	}
	
	launchAbout(){
		var about = document.getElementById('aboutLauncher')
		console.log(about);
		about.click();
	}
    
    template(){
    	return `
<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.10.1/css/mdb.min.css";
.logo{
	height: 2.5em; 
}
.logo-text{
	float:right; 
	padding-left: 0.5em;
	vertical-align: middle;
}
.logo-text-title{
	font-size: normal;
}
.logo-text-tagline{
	font-size: small;
	font-weight: bold;
	font-family: fantasy;
}
</style>
<script>
@import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js";
</script>
<!--Navbar-->
<nav class="navbar navbar-expand-lg" id='navContainer'>

  <!-- Navbar brand -->
  <a class="navbar-brand" href="#">
	<img id='logo' class='logo' src="${this.getAttribute('logo')}">
	<span class='logo-text'>
		<div class='logo-text-title' id='logo-text-title'></div>
		<div class='logo-text-tagline' id='logo-text-tagline'></div>
	</span>
  </a>

  <!-- Collapse button -->
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
    aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" onclick="this.getRootNode().host.toggleMenu();"></span>
  </button>

  <!-- Collapsible content -->
  <!-- <div class="collapse navbar-collapse" id="basicExampleNav"> -->
  <div class="collapse navbar-collapse" id="basicExampleNav">

    <!-- Links -->
    <ul class="navbar-nav ml-auto">
      <!--
      <li class="nav-item active">
        <a class="nav-link" href="#">Home
          <span class="sr-only">(current)</span>
        </a>
      </li>
      -->
      <li class="nav-item">
        <a class="nav-link" target='_blank' href="http://blog.geekypedia.net">Blog</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" target='_blank' href="https://www.youtube.com/channel/UC9uDbg1y7SMmBFBpQaV0JGA">Vlog</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" target='_blank' href="https://omycode.in">O My Code!</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" target='_blank' href="https://prestigeframework.com">pRESTige</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" onclick="this.getRootNode().host.launchAbout();">About Me</a>
      </li>
      <!-- Dropdown -->
      <!--	
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">Dropdown</a>
        <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      -->

    </ul>
    <!-- Links -->

    <form class="form-inline">
      <div class="md-form my-0">
    	<!--
         <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
        -->
      </div>
    </form>
  </div>
  <!-- Collapsible content -->

</nav>
<!--/.Navbar-->
`;
    }
  }
);