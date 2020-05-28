var drumBtns = document.querySelectorAll('.drum');

for(var i=0; i<drumBtns.length; i++){
    drumBtns[i].addEventListener('click', playsound)
}


function playsound() {
    alert('Ahem...You clicked me!')
}