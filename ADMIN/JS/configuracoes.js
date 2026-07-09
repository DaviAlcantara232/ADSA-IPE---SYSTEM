/* =====================================================
   ADSA IPÊ SYSTEM
   configuracoes.js
===================================================== */



/* ==========================
   CARREGAR CONFIGURAÇÕES
========================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    carregarConfiguracoes();


});







/* ==========================
   SALVAR CONFIGURAÇÕES
========================== */


function salvarConfiguracoes(){


    const configuracoes = {


        nomeAdmin:
        document.getElementById(
            "nomeAdmin"
        ).value,



        emailAdmin:
        document.getElementById(
            "emailAdmin"
        ).value,



        telefoneAdmin:
        document.getElementById(
            "telefoneAdmin"
        ).value,



        nomeIgreja:
        document.getElementById(
            "nomeIgreja"
        ).value,



        pastorResponsavel:
        document.getElementById(
            "pastorResponsavel"
        ).value,



        telefoneIgreja:
        document.getElementById(
            "telefoneIgreja"
        ).value,



        emailIgreja:
        document.getElementById(
            "emailIgreja"
        ).value,



        enderecoIgreja:
        document.getElementById(
            "enderecoIgreja"
        ).value,



        cidadeIgreja:
        document.getElementById(
            "cidadeIgreja"
        ).value,



        tema:
        document.getElementById(
            "tema"
        ).value



    };






    localStorage.setItem(

        "configuracoes",

        JSON.stringify(configuracoes)

    );



    alert(
        "Configurações salvas com sucesso!"
    );


}








/* ==========================
   CARREGAR DADOS SALVOS
========================== */


function carregarConfiguracoes(){


    const dados =

    JSON.parse(

        localStorage.getItem(
            "configuracoes"
        )

    );



    if(!dados){

        return;

    }





    Object.keys(dados)
    .forEach(chave=>{


        const campo =

        document.getElementById(
            chave
        );



        if(campo){

            campo.value =
            dados[chave];

        }



    });


}

/* ==========================
   ALTERAR SENHA
========================== */


function alterarSenha(){


    const senhaAtual =

    document.getElementById(
        "senhaAtual"
    ).value;




    const novaSenha =

    document.getElementById(
        "novaSenha"
    ).value;




    const confirmarSenha =

    document.getElementById(
        "confirmarSenha"
    ).value;






    if(
    !senhaAtual
    ||
    !novaSenha
    ||
    !confirmarSenha
    ){


        alert(
            "Preencha todos os campos de senha."
        );


        return;

    }






    if(
    novaSenha !== confirmarSenha
    ){


        alert(
            "A nova senha e a confirmação não são iguais."
        );


        return;

    }







    localStorage.setItem(

        "senhaSistema",

        novaSenha

    );





    alert(

        "Senha alterada com sucesso!"

    );





    document.getElementById(
        "senhaAtual"
    ).value = "";



    document.getElementById(
        "novaSenha"
    ).value = "";



    document.getElementById(
        "confirmarSenha"
    ).value = "";



}









/* ==========================
   EXPORTAR BACKUP
========================== */


function exportarBackup(){



    const backup = {


        usuarios:

        JSON.parse(

            localStorage.getItem(
                "usuarios"
            )

        ) || [],



        membros:

        JSON.parse(

            localStorage.getItem(
                "membros"
            )

        ) || [],



        configuracoes:

        JSON.parse(

            localStorage.getItem(
                "configuracoes"
            )

        ) || {}



    };






    const arquivo =

    JSON.stringify(

        backup,

        null,

        2

    );






    const blob =

    new Blob(

        [arquivo],

        {

            type:
            "application/json"

        }

    );






    const link =

    document.createElement(
        "a"
    );



    link.href =

    URL.createObjectURL(
        blob
    );



    link.download =

    "backup_ADSA_IPE.json";



    link.click();



    alert(

        "Backup exportado!"

    );



}









/* ==========================
   RESTAURAR BACKUP
========================== */


function restaurarBackup(){


    const input =

    document.createElement(
        "input"
    );



    input.type = "file";

    input.accept =
    ".json";






    input.onchange =

    evento => {



        const arquivo =

        evento.target.files[0];





        const leitor =

        new FileReader();





        leitor.onload =

        e => {



            const dados =

            JSON.parse(
                e.target.result
            );





            if(dados.usuarios){


                localStorage.setItem(

                    "usuarios",

                    JSON.stringify(
                        dados.usuarios
                    )

                );


            }






            if(dados.membros){


                localStorage.setItem(

                    "membros",

                    JSON.stringify(
                        dados.membros
                    )

                );


            }






            if(dados.configuracoes){


                localStorage.setItem(

                    "configuracoes",

                    JSON.stringify(
                        dados.configuracoes
                    )

                );


            }





            alert(

                "Backup restaurado com sucesso!"

            );



            location.reload();



        };





        leitor.readAsText(
            arquivo
        );



    };




    input.click();


}

/* ==========================
   TEMA DO PAINEL
========================== */


document.addEventListener(
"change",
(event)=>{


    if(
    event.target.id === "tema"
    ){


        aplicarTema(
            event.target.value
        );


    }


});







function aplicarTema(tema){



    if(
    tema === "escuro"
    ){


        document.body.classList.add(
            "dark"
        );


    }else{


        document.body.classList.remove(
            "dark"
        );


    }



    localStorage.setItem(

        "tema",

        tema

    );


}









/* ==========================
   RESTAURAR PADRÕES
========================== */


function resetarConfiguracoes(){



    const confirmar =

    confirm(

        "Deseja restaurar as configurações padrão?"

    );





    if(!confirmar){

        return;

    }






    localStorage.removeItem(

        "configuracoes"

    );



    localStorage.removeItem(

        "tema"

    );





    alert(

        "Configurações restauradas!"

    );





    location.reload();



}









/* ==========================
   CARREGAR TEMA SALVO
========================== */


function carregarTema(){



    const tema =

    localStorage.getItem(
        "tema"
    );





    if(tema){


        aplicarTema(
            tema
        );


        const seletor =

        document.getElementById(
            "tema"
        );



        if(seletor){

            seletor.value =
            tema;

        }


    }


}







/* Executa ao iniciar */

document.addEventListener(

"DOMContentLoaded",

()=>{


    carregarTema();


});









/* ==========================
   LOGOUT
========================== */


function logout(){



    const confirmar =

    confirm(

        "Deseja realmente sair?"

    );





    if(!confirmar){

        return;

    }






    localStorage.removeItem(
        "usuarioLogado"
    );



    localStorage.removeItem(
        "sessaoAtiva"
    );





    window.location.replace(

        "../../AUTH/login.html"

    );



}/* ==========================
   TEMA DO PAINEL
========================== */


document.addEventListener(
"change",
(event)=>{


    if(
    event.target.id === "tema"
    ){


        aplicarTema(
            event.target.value
        );


    }


});







function aplicarTema(tema){



    if(
    tema === "escuro"
    ){


        document.body.classList.add(
            "dark"
        );


    }else{


        document.body.classList.remove(
            "dark"
        );


    }



    localStorage.setItem(

        "tema",

        tema

    );


}









/* ==========================
   RESTAURAR PADRÕES
========================== */


function resetarConfiguracoes(){



    const confirmar =

    confirm(

        "Deseja restaurar as configurações padrão?"

    );





    if(!confirmar){

        return;

    }






    localStorage.removeItem(

        "configuracoes"

    );



    localStorage.removeItem(

        "tema"

    );





    alert(

        "Configurações restauradas!"

    );





    location.reload();



}









/* ==========================
   CARREGAR TEMA SALVO
========================== */


function carregarTema(){



    const tema =

    localStorage.getItem(
        "tema"
    );





    if(tema){


        aplicarTema(
            tema
        );


        const seletor =

        document.getElementById(
            "tema"
        );



        if(seletor){

            seletor.value =
            tema;

        }


    }


}







/* Executa ao iniciar */

document.addEventListener(

"DOMContentLoaded",

()=>{


    carregarTema();


});









/* ==========================
   LOGOUT
========================== */


function logout(){



    const confirmar =

    confirm(

        "Deseja realmente sair?"

    );





    if(!confirmar){

        return;

    }






    localStorage.removeItem(
        "usuarioLogado"
    );



    localStorage.removeItem(
        "sessaoAtiva"
    );





    window.location.replace(

        "../../AUTH/login.html"

    );



}