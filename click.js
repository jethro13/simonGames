document.addEventListener('DOMContentLoaded', function(){
  let touch = document.getElementsByClassName('touch');

document.getElementById('str').addEventListener('click', function(e){e.target.innerText = "Restart"});

  for (let i = 0; i<touch.length; i++){
    touch[i].addEventListener('mousedown', function(e){
      e.target.classList.add('lit');
    });
    touch[i].addEventListener('mouseup', function(i){
      setTimeout(function(){
      i.target.classList.remove('lit');
    }, 200);
    });
  }
});
