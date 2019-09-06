'use strict';

function toggle() {
    const navs = document.querySelectorAll('.menu')

    navs.forEach(nav => nav.classList.toggle('toggleShow'));
}


document.querySelector('.menu-toggle')
    .addEventListener('click', toggle);