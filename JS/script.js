/* ==========================================================
   ADSA IPÊ
   SCRIPT PRINCIPAL
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       MENU MOBILE
    ====================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", (e) => {

            e.stopPropagation();

            menuToggle.classList.toggle("active");
            navigation.classList.toggle("active");
            document.body.classList.toggle("menu-open");

        });

        /* Fecha ao clicar em um link */

        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                navigation.classList.remove("active");
                document.body.classList.remove("menu-open");

            });

        });

        /* Fecha clicando fora */

        document.addEventListener("click", (e) => {

            if (
                navigation.classList.contains("active") &&
                !navigation.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {

                menuToggle.classList.remove("active");
                navigation.classList.remove("active");
                document.body.classList.remove("menu-open");

            }

        });

        /* Ao voltar para desktop */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {

                menuToggle.classList.remove("active");
                navigation.classList.remove("active");
                document.body.classList.remove("menu-open");

            }

        });

    }

    /* ======================================================
       HEADER TRANSPARENTE
    ====================================================== */

    const header = document.querySelector(".header");

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 30) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        });

    }

    /* ======================================================
       SCROLL SUAVE
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const destino = document.querySelector(this.getAttribute("href"));

            if (destino) {

                e.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});