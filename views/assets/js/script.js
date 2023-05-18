async function height() {
    let pageHeight = await
        document.querySelector('.containerbody').offsetHeight;
        document.querySelector('.mesh').style.height = pageHeight + 'px';
}
height()