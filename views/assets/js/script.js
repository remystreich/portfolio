function height() {
    let body = document.querySelector('.containerbody')
    let pageHeight = body.clientHeight;
    let pageWidth = body.clientWidth;
    document.querySelector('.mesh').style.height = pageHeight + 'px';
    document.querySelector('.mesh').style.width = pageWidth + 'px';
    console.log(pageHeight);
}
height()
window.addEventListener('scroll', ()=> { height()})

let openburger = false;
let burger = document.querySelector('.burger')
burger.addEventListener('click', () => {
    if (openburger == false) {
        document.querySelector('.burgericon').classList.add("rotate-transition");
        document.querySelector('#navheader').classList.add("flipinx")
        document.querySelector('.burgericon').style.transform = "rotate(90deg)"
        document.querySelector('#navheader').style.display = 'block'
        openburger = true;
    } else {
        document.querySelector('.burgericon').style.transform = "rotate(0deg)"
        document.querySelector('#navheader').style.display = 'none'
        openburger = false
    }
})

function displayproject(e){
    let git = document.getElementById('projectGit')
    let url = document.getElementById('projectUrl')
    let description = document.getElementById('projectDescription')
    let project = e._doc
    let img = document.getElementById('projectimg')
    img.src = "/img/uploads/"+ project.image
    git.innerText= "URL github : "+project.gitUrlurl
    url.innerText= "URL : "+project.url
    description.innerText= project.description
    document.getElementById('projectInformation').style.display = 'block'
}