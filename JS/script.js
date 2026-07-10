console.log("SCRIPT FUNCIONANDO");


const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");


console.log(menuToggle);
console.log(navigation);



if(menuToggle && navigation){

    menuToggle.onclick = function(){

        console.log("CLIQUE FUNCIONOU");

        navigation.classList.toggle("active");

    };

}