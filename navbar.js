navbartoggle.onclick= function(e){ 
    var nav = document.querySelector("nav");
    if (nav.style.display=="flex") return nav.style.display = "none";
    else return nav.style.display="flex";
    navbartoggle.style.display = "block"
  };