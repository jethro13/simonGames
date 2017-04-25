document.addEventListener('DOMContentLoaded', function(){
  let top = document.getElementById('red'),
      bot = document.getElementById('green'),
      left = document.getElementById('yellow'),
      right = document.getElementById('blue'),
      tab = [top, bot, left, right],
      seq = [],
      input = [];



      let animate = function(pro){
        let color = pro.style.backgroundColor;
        pro.style.backgroundColor = "white";
        setTimeout(function(){
          pro.style.backgroundColor = color;
        }, 300);
      };

      let init = function(elm){
        let i = 0;
        let interval = setInterval(function(){
        animate(elm[i]);
        i++;
        if (i >= elm.length){
          clearInterval(interval);
        }
}, 600);
      };
let rand = function(){
  let index = Math.floor(Math.random() * (4 - 0)) + 0;
  seq.push(tab[index]);
  return seq;

};
let checkloose = function(a1, a2){
  return JSON.stringify(a1)==JSON.stringify(a2);
};

document.getElementById('start').addEventListener('click', function(){


      this.innerText = "RESTART";
      init(rand());
      document.addEventListener('keydown', function(e){

        if(e.key === "ArrowUp"){
          animate(top);
          input.push(top);
          console.log(checkloose(input, seq));
        }
        else if (e.key === "ArrowDown") {
          animate(bot);
          input.push(bot);
          console.log(checkloose(input, seq));
        }
        else if (e.key === "ArrowLeft") {
          animate(left);
          input.push(left);
          console.log(checkloose(input, seq));
        }
        else if (e.key === "ArrowRight") {
          setTimeout(function(){
          animate(right);
        }, 100);

          input.push(right);
          console.log(checkloose(input, seq));

        }
      });
      });


  });
