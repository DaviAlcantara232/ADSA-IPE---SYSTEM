/* ==========================================
   ADSA IPÊ
   SCRIPT PRINCIPAL
========================================== */


/* ==========================================
   MENU MOBILE
========================================== */


const menuToggle = document.querySelector(".menu-toggle");

const navigation = document.querySelector(".navigation");



if(menuToggle && navigation){


    menuToggle.addEventListener("click", () => {


        navigation.classList.toggle("active");


        menuToggle.classList.toggle("open");


    });



    const menuLinks = navigation.querySelectorAll("a");



    menuLinks.forEach(link => {


        link.addEventListener("click", () => {


            navigation.classList.remove("active");


            menuToggle.classList.remove("open");


        });


    });


}






/* ==========================================
   FECHAR MENU AO CLICAR FORA
========================================== */


document.addEventListener("click", (event) => {


    if(!event.target.closest(".header")){


        if(navigation){


            navigation.classList.remove("active");


        }


        if(menuToggle){


            menuToggle.classList.remove("open");


        }


    }


});