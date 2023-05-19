async function height() {
    let pageHeight = await
        document.querySelector('.containerbody').offsetHeight;
    document.querySelector('.mesh').style.height = pageHeight + 'px';
}
height()

let openburger = false;
let burger = document.querySelector('.burger')
burger.addEventListener('click', () => {
    if (openburger == false) {
        document.querySelector('.burgericon').classList.add("rotate-transition");
        document.querySelector('#navheader').classList.add("flipinx")
        document.querySelector('.burgericon').style.transform = "rotate(90deg)"
        document.querySelector('#navheader').style.display = 'block'
        openburger=true;
    }else{
        document.querySelector('.burgericon').style.transform = "rotate(0deg)"
        document.querySelector('#navheader').style.display = 'none'
        openburger=false
    }

})