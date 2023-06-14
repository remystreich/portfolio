function height() {
    let body = document.querySelector('.containerbody')
    let pageHeight = body.clientHeight;
    let pageWidth = body.clientWidth;
    document.querySelector('.mesh').style.height = pageHeight + 'px';
    document.querySelector('.mesh').style.width = pageWidth + 'px';
    console.log(pageHeight);
}
height()
window.addEventListener('scroll', () => { height() })

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

function displayproject(e) {
    let projects = document.querySelectorAll('.projects')
    for (let i = 0; i < projects.length; i++) {
        projects[i].style = e.style
        projects[i].parentNode.parentNode.style = e.parentNode.parentNode.style
    }
    e.parentNode.parentNode.style.borderTop ="solid 3px  #48463de0"
    e.parentNode.parentNode.style.borderBottom ="solid 3px  #48463de0"
    e.style.backgroundColor = "#48463de0"
    e.style.color = "#cac5af"
    let project = JSON.parse(e.getAttribute('data-project'))._doc
    let git = document.getElementById('projectGit');
    let url = document.getElementById('projectUrl');
    let description = document.getElementById('projectDescription');
    let img = document.getElementById('projectimg');
    img.style.border = "solid 5px #d6d0b8"
    img.style.boxShadow = "2px 2px 2px 2px #a09e89"
    img.src = "/img/uploads/" + project.image;
    git.innerText = "Lien github : " + project.gitUrl;
    git.href = project.gitUrl;
    url.innerText = "Lien : " + project.url;
    url.href = project.url;
    description.innerText = project.description;
    document.getElementById('projectInformation').style.display = 'block';
}

function sortOrder(select) {
    const sortOrder = select.value;
    // Effectuer une redirection de page avec le paramètre de tri
    window.location.href = '/projects/' + sortOrder;
}

