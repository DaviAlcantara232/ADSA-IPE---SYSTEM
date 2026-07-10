/* =======================================================
   ADSA IPÊ SYSTEM
   SCRIPT PRINCIPAL
======================================================= */


/* =======================================================
   MENU MOBILE
======================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");


if (menuToggle && navigation) {


    menuToggle.addEventListener("click", () => {


        navigation.classList.toggle("active");


        menuToggle.classList.toggle("open");


    });


}



/* =======================================================
   FECHAR MENU AO CLICAR EM UM LINK
======================================================= */

const navLinks = document.querySelectorAll(".navigation a");


navLinks.forEach(link => {


    link.addEventListener("click", () => {


        if (navigation) {

            navigation.classList.remove("active");

        }


        if (menuToggle) {

            menuToggle.classList.remove("open");

        }


    });


});





/* =======================================================
   ANO AUTOMÁTICO NO FOOTER
======================================================= */

const year = document.querySelector(".copyright");


if (year) {


    const currentYear = new Date().getFullYear();


    year.innerHTML = year.innerHTML.replace(
        "2026",
        currentYear
    );


}





/* =======================================================
   LOGIN - BASE FUTURA
======================================================= */

const loginForm = document.querySelector("#loginForm");


if (loginForm) {


    loginForm.addEventListener("submit", (event) => {


        event.preventDefault();


        console.log("Login enviado");


        /*
            Futuramente:

            - conexão com Node.js
            - autenticação
            - área do membro
            - painel administrativo

        */


    });


}





/* =======================================================
   ANIMAÇÃO DE SCROLL
======================================================= */

const sections = document.querySelectorAll("section");


const observer = new IntersectionObserver(
    
    entries => {


        entries.forEach(entry => {


            if (entry.isIntersecting) {


                entry.target.classList.add("show");


            }


        });


    },

    {

        threshold: 0.15

    }

);



sections.forEach(section => {


    observer.observe(section);


});