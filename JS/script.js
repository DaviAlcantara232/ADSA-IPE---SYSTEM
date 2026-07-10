const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

console.log("Script carregado");


if(menuToggle && navigation){

    menuToggle.addEventListener("click", function(){

        console.log("Botão clicado");

        navigation.classList.toggle("active");

    });

}else{

    console.log("Elemento não encontrado");

}