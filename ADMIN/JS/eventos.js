/* =====================================================
   ADSA IPÊ SYSTEM
   eventos.js
===================================================== */



let eventos = JSON.parse(

    localStorage.getItem(
        "eventos"
    )

) || [];




let eventoEditando = null;







/* ==========================
   INICIAR
========================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


    carregarEventos();


    atualizarCards();


});









/* ==========================
   SALVAR EVENTO
========================== */


function salvarEvento(){



    const evento = {



        id:

        Date.now(),




        nome:

        document.getElementById(
            "nomeEvento"
        ).value,




        categoria:

        document.getElementById(
            "categoriaEvento"
        ).value,




        data:

        document.getElementById(
            "dataEvento"
        ).value,




        horario:

        document.getElementById(
            "horarioEvento"
        ).value,




        local:

        document.getElementById(
            "localEvento"
        ).value,




        responsavel:

        document.getElementById(
            "responsavelEvento"
        ).value,




        descricao:

        document.getElementById(
            "descricaoEvento"
        ).value,



    };








    if(
    !evento.nome
    ||
    !evento.data
    ){


        alert(

            "Preencha o nome e a data do evento."

        );


        return;


    }








    if(eventoEditando){



        eventos =

        eventos.map(

            item =>

            item.id === eventoEditando

            ?

            evento

            :

            item

        );



        eventoEditando = null;




    }else{


        eventos.push(

            evento

        );


    }






    salvarBanco();



    carregarEventos();



    atualizarCards();



    limparFormulario();





    alert(

        "Evento salvo com sucesso!"

    );



}








/* ==========================
   BANCO LOCAL
========================== */


function salvarBanco(){



    localStorage.setItem(

        "eventos",

        JSON.stringify(
            eventos
        )

    );


}








/* ==========================
   LIMPAR FORMULÁRIO
========================== */


function limparFormulario(){



    document

    .querySelectorAll(

    ".formulario input, .formulario select, .formulario textarea"

    )

    .forEach(

        campo =>

        campo.value = ""

    );


}







/* ==========================
   CANCELAR
========================== */


function cancelarEvento(){



    eventoEditando = null;


    limparFormulario();


}

/* ==========================
   CARREGAR EVENTOS
========================== */


function carregarEventos(){


    const tabela =

    document.getElementById(
        "listaEventos"
    );



    if(!tabela){

        return;

    }



    tabela.innerHTML = "";





    if(eventos.length === 0){



        tabela.innerHTML = `


        <tr>


        <td colspan="7">


        Nenhum evento cadastrado.


        </td>


        </tr>


        `;



        return;


    }







    eventos.forEach(evento=>{


        tabela.innerHTML += `



        <tr>




        <td>

        ${evento.nome}

        </td>




        <td>

        ${formatarData(evento.data)}

        </td>




        <td>

        ${evento.horario}

        </td>




        <td>


        <span class="categoria ${classeCategoria(evento.categoria)}">

        ${evento.categoria}

        </span>


        </td>





        <td>

        ${evento.local}

        </td>





        <td>

        ${evento.responsavel}

        </td>





        <td>



        <button

        class="btnEditar"

        onclick="editarEvento(${evento.id})">


        ✏️


        </button>






        <button

        class="btnExcluir"

        onclick="excluirEvento(${evento.id})">


        🗑️


        </button>



        </td>




        </tr>


        `;



    });



}









/* ==========================
   EDITAR EVENTO
========================== */


function editarEvento(id){



    const evento =

    eventos.find(

        item =>

        item.id === id

    );





    if(!evento){

        return;

    }







    eventoEditando = id;






    document.getElementById(
        "nomeEvento"
    ).value = evento.nome;





    document.getElementById(
        "categoriaEvento"
    ).value = evento.categoria;





    document.getElementById(
        "dataEvento"
    ).value = evento.data;





    document.getElementById(
        "horarioEvento"
    ).value = evento.horario;





    document.getElementById(
        "localEvento"
    ).value = evento.local;





    document.getElementById(
        "responsavelEvento"
    ).value = evento.responsavel;





    document.getElementById(
        "descricaoEvento"
    ).value = evento.descricao;








    window.scrollTo({

        top:0,

        behavior:"smooth"

    });



}








/* ==========================
   EXCLUIR EVENTO
========================== */


function excluirEvento(id){



    const confirmar =

    confirm(

        "Deseja excluir este evento?"

    );





    if(!confirmar){

        return;

    }






    eventos =

    eventos.filter(

        evento =>

        evento.id !== id

    );





    salvarBanco();



    carregarEventos();



    atualizarCards();



}

/* ==========================
   PESQUISAR EVENTO
========================== */


function pesquisarEvento(){


    const texto =

    document.getElementById(
        "pesquisarEvento"
    )
    .value
    .toLowerCase();




    const resultado =

    eventos.filter(evento =>



        evento.nome
        .toLowerCase()
        .includes(texto)



        ||

        evento.local
        .toLowerCase()
        .includes(texto)



        ||

        evento.responsavel
        .toLowerCase()
        .includes(texto)



    );





    renderizarLista(resultado);



}








/* ==========================
   FILTRO CATEGORIA
========================== */


document.addEventListener(

"change",

(event)=>{


    if(
    event.target.id === "filtroCategoria"
    ){


        filtrarCategoria();


    }


});








function filtrarCategoria(){



    const categoria =

    document.getElementById(
        "filtroCategoria"
    )
    .value;





    if(
    categoria === "todos"
    ){


        renderizarLista(eventos);


        return;


    }






    const resultado =

    eventos.filter(

        evento =>

        evento.categoria === categoria

    );





    renderizarLista(resultado);



}









/* ==========================
   RENDERIZAR LISTA FILTRADA
========================== */


function renderizarLista(lista){



    const tabela =

    document.getElementById(
        "listaEventos"
    );



    tabela.innerHTML = "";






    if(lista.length === 0){



        tabela.innerHTML = `


        <tr>

        <td colspan="7">

        Nenhum evento encontrado.

        </td>

        </tr>


        `;


        return;


    }







    lista.forEach(evento=>{


        tabela.innerHTML += `


        <tr>


        <td>

        ${evento.nome}

        </td>



        <td>

        ${formatarData(evento.data)}

        </td>



        <td>

        ${evento.horario}

        </td>




        <td>


        <span class="categoria ${classeCategoria(evento.categoria)}">

        ${evento.categoria}

        </span>


        </td>




        <td>

        ${evento.local}

        </td>




        <td>

        ${evento.responsavel}

        </td>




        <td>


        <button

        class="btnEditar"

        onclick="editarEvento(${evento.id})">

        ✏️

        </button>





        <button

        class="btnExcluir"

        onclick="excluirEvento(${evento.id})">

        🗑️

        </button>


        </td>



        </tr>


        `;


    });



}









/* ==========================
   ATUALIZAR CARDS
========================== */


function atualizarCards(){



    const hoje =

    new Date();





    const proximos =

    eventos.filter(evento=>{


        const data =

        new Date(
            evento.data
        );



        return data >= hoje;



    });







    document.getElementById(
        "totalEventos"
    ).innerText = eventos.length;





    document.getElementById(
        "proximosEventos"
    ).innerText = proximos.length;





    document.getElementById(
        "totalCultos"
    ).innerText =

    eventos.filter(

        evento =>

        evento.categoria === "Culto"

    ).length;







    document.getElementById(
        "totalOutros"
    ).innerText =

    eventos.filter(

        evento =>

        evento.categoria === "Outro"

    ).length;



}









/* ==========================
   FORMATAR DATA
========================== */


function formatarData(data){



    if(!data){

        return "-";

    }



    const partes =

    data.split("-");



    return (

        partes[2]

        +

        "/"

        +

        partes[1]

        +

        "/"

        +

        partes[0]

    );


}









/* ==========================
   CLASSE DA CATEGORIA
========================== */


function classeCategoria(categoria){



    const classes = {


        "Culto":

        "culto",



        "Reunião":

        "reuniao",



        "Ensaio":

        "ensaio",



        "Conferência":

        "conferencia",



        "Outro":

        "outro"



    };




    return classes[categoria] || "outro";


}








/* ==========================
   LOGOUT
========================== */


function logout(){



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

