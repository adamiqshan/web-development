var drumBtns = document.querySelectorAll('.drum');

for(var i=0; i<drumBtns.length; i++){
    drumBtns[i].addEventListener('click', playsound)
}


function playsound() {
    var audio = new Audio('sounds/tom-1.mp3');
    audio.play();
}

for(var i=0; i<drumBtns.length; i++)
{
    drumBtns[i].addEventListener('click', function(){
    this.style.color = 'white';});
};