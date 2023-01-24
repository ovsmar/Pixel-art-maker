function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
  }


window.setTimeout(function(){ 
  if (window.localStorage) {
    var nextPopup = localStorage.getItem( 'nextNewsletter' );
    console.log(nextPopup)
    if (nextPopup > new Date()) {
      return;
    }
    var expires = new Date();
    expires = expires.setHours(expires.getHours() + 24);
    localStorage.setItem( 'nextNewsletter', expires );
  }
  document.getElementById("popup-1").classList.toggle("active");
}, 1000);
