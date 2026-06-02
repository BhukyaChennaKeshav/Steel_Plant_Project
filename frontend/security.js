document.addEventListener("contextmenu", function(e){

  e.preventDefault();

});
document.onkeydown = function(e){

  if(e.key === "F12"){

    return false;

  }

  if(e.ctrlKey && e.shiftKey && e.key === "I"){

    return false;

  }

  if(e.ctrlKey && e.key === "U"){

    return false;

  }

};
