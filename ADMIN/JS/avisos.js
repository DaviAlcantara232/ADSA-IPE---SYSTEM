/* =====================================================
   ADSA IPÊ SYSTEM
   avisos.js
===================================================== */



let avisos = JSON.parse(

    localStorage.getItem(
        "avisos"
    )

) || [];





let avisoEditando = null;









/* ==========================
   INICIAR
========================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


    carregarAvisos();


    atualizarCards();


    ativarPreview();


});









/* ==========================
   SALVAR AVISO
========================== */


function salvarAviso(){



    const aviso = {



        id:

        Date.now(),





        titulo:

        document.getElementById(
            "tituloAviso"
        ).value,





        categoria:

        document.getElementById(
            "categoriaAviso"
        ).value,





        prioridade:

        document.getElementById(
            "prioridadeAviso"
        ).value,





        responsavel:

        document.getElementById(
            "responsavelAviso"
        ).value,





        data:

        document.getElementById(
            "dataAviso"
        ).value,





        status:

        document.getElementById(
            "statusAviso"
        ).value,





        mensagem:

        document.getElementById(
            "mensagemAviso"
        ).value



    };








    if(

    !aviso.titulo

    ||

    !aviso.mensagem

    ){


        alert(

        "Preencha o título e a mensagem do aviso."

        );


        return;

    }








    if(avisoEditando){



        avisos =

        avisos.map(

            item =>

            item.id === avisoEditando

            ?

            aviso

            :

            item

        );




        avisoEditando = null;



    }

    else{


        avisos.push(

            aviso

        );


    }







    salvarBanco();



    carregarAvisos();



    atualizarCards();



    limparFormulario();





    alert(

        "Aviso salvo com sucesso!"

    );



}









/* ==========================
   BANCO LOCAL
========================== */


function salvarBanco(){



    localStorage.setItem(

        "avisos",

        JSON.stringify(
            avisos
        )

    );


}







/* ==========================
   LIMPAR
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








function cancelarAviso(){



    avisoEditando = null;


    limparFormulario();



}

/* ==========================
   CARREGAR AVISOS
========================== */


function carregarAvisos(){



    const tabela =

    document.getElementById(
        "listaAvisos"
    );



    if(!tabela){

        return;

    }





    tabela.innerHTML = "";







    if(avisos.length === 0){



        tabela.innerHTML = `


        <tr>


        <td colspan="7">


        Nenhum aviso cadastrado.


        </td>


        </tr>


        `;



        return;


    }








    avisos.forEach(aviso=>{



        tabela.innerHTML += `



        <tr>




        <td>

        ${aviso.titulo}

        </td>





        <td>

        ${aviso.categoria}

        </td>





        <td>


        <span class="prioridade ${classePrioridade(aviso.prioridade)}">


        ${aviso.prioridade}


        </span>


        </td>







        <td>

        ${formatarData(aviso.data)}

        </td>








        <td>


        <span class="status ${classeStatus(aviso.status)}">


        ${aviso.status}


        </span>


        </td>







        <td>

        ${aviso.responsavel}

        </td>







        <td>





        <button

        class="btnEditar"

        onclick="editarAviso(${aviso.id})">


        ✏️


        </button>







        <button

        class="btnExcluir"

        onclick="excluirAviso(${aviso.id})">


        🗑️


        </button>





        </td>






        </tr>



        `;



    });



}









/* ==========================
   EDITAR AVISO
========================== */


function editarAviso(id){



    const aviso =

    avisos.find(

        item =>

        item.id === id

    );





    if(!aviso){

        return;

    }







    avisoEditando = id;







    document.getElementById(
        "tituloAviso"
    ).value = aviso.titulo;





    document.getElementById(
        "categoriaAviso"
    ).value = aviso.categoria;





    document.getElementById(
        "prioridadeAviso"
    ).value = aviso.prioridade;





    document.getElementById(
        "responsavelAviso"
    ).value = aviso.responsavel;





    document.getElementById(
        "dataAviso"
    ).value = aviso.data;





    document.getElementById(
        "statusAviso"
    ).value = aviso.status;





    document.getElementById(
        "mensagemAviso"
    ).value = aviso.mensagem;







    atualizarPreview();



    window.scrollTo({

        top:0,

        behavior:"smooth"

    });



}









/* ==========================
   EXCLUIR AVISO
========================== */


function excluirAviso(id){



    const confirmar =

    confirm(

        "Deseja excluir este aviso?"

    );





    if(!confirmar){

        return;

    }






    avisos =

    avisos.filter(

        aviso =>

        aviso.id !== id

    );






    salvarBanco();



    carregarAvisos();



    atualizarCards();



}

/* ==========================
   PESQUISAR AVISO
========================== */


function pesquisarAviso(){



    const texto =

    document.getElementById(
        "pesquisarAviso"
    )
    .value
    .toLowerCase();






    const resultado =

    avisos.filter(aviso =>



        aviso.titulo

        .toLowerCase()

        .includes(texto)



        ||



        aviso.mensagem

        .toLowerCase()

        .includes(texto)



        ||



        aviso.categoria

        .toLowerCase()

        .includes(texto)



    );







    renderizarLista(resultado);



}









/* ==========================
   FILTRO PRIORIDADE
========================== */


document.addEventListener(

"change",

(event)=>{



    if(

    event.target.id ===

    "filtroPrioridade"

    ){


        filtrarPrioridade();


    }



});









function filtrarPrioridade(){



    const prioridade =

    document.getElementById(

        "filtroPrioridade"

    )

    .value;







    if(

    prioridade === "todos"

    ){


        renderizarLista(avisos);


        return;


    }








    const resultado =

    avisos.filter(

        aviso =>

        aviso.prioridade === prioridade

    );






    renderizarLista(resultado);



}









/* ==========================
   RENDERIZAR LISTA
========================== */


function renderizarLista(lista){



    const tabela =

    document.getElementById(

        "listaAvisos"

    );





    tabela.innerHTML = "";







    if(lista.length === 0){



        tabela.innerHTML = `


        <tr>

        <td colspan="7">

        Nenhum aviso encontrado.

        </td>


        </tr>


        `;


        return;


    }







    lista.forEach(aviso=>{



        tabela.innerHTML += `



        <tr>



        <td>

        ${aviso.titulo}

        </td>





        <td>

        ${aviso.categoria}

        </td>





        <td>


        <span class="prioridade ${classePrioridade(aviso.prioridade)}">

        ${aviso.prioridade}

        </span>



        </td>






        <td>

        ${formatarData(aviso.data)}

        </td>





        <td>


        <span class="status ${classeStatus(aviso.status)}">

        ${aviso.status}

        </span>



        </td>







        <td>

        ${aviso.responsavel}

        </td>







        <td>



        <button

        class="btnEditar"

        onclick="editarAviso(${aviso.id})">


        ✏️


        </button>





        <button

        class="btnExcluir"

        onclick="excluirAviso(${aviso.id})">


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





    document.getElementById(

        "totalAvisos"

    ).innerText = avisos.length;







    document.getElementById(

        "avisosPublicados"

    ).innerText =


    avisos.filter(

        aviso =>

        aviso.status === "Publicado"

    ).length;







    document.getElementById(

        "avisosUrgentes"

    ).innerText =


    avisos.filter(

        aviso =>

        aviso.prioridade === "Urgente"

    ).length;







    document.getElementById(

        "avisosRascunho"

    ).innerText =


    avisos.filter(

        aviso =>

        aviso.status === "Rascunho"

    ).length;



}









/* ==========================
   PREVIEW
========================== */


function ativarPreview(){



    document

    .querySelectorAll(

    ".formulario input, .formulario select, .formulario textarea"

    )

    .forEach(campo=>{



        campo.addEventListener(

        "input",

        atualizarPreview

        );



    });



}









function atualizarPreview(){



    const titulo =

    document.getElementById(

        "tituloAviso"

    ).value;






    const mensagem =

    document.getElementById(

        "mensagemAviso"

    ).value;







    const prioridade =

    document.getElementById(

        "prioridadeAviso"

    ).value;







    const categoria =

    document.getElementById(

        "categoriaAviso"

    ).value;







    const data =

    document.getElementById(

        "dataAviso"

    ).value;







    document.getElementById(

        "previewTitulo"

    ).innerText =

    titulo || "Título do aviso";







    document.getElementById(

        "previewMensagem"

    ).innerText =

    mensagem || "A mensagem aparecerá aqui...";







    document.getElementById(

        "previewPrioridade"

    ).innerText =

    prioridade || "Normal";







    document.getElementById(

        "previewCategoria"

    ).innerText =

    categoria || "Categoria";







    document.getElementById(

        "previewData"

    ).innerText =

    formatarData(data);



}

/* ==========================
   PUBLICAR RAPIDAMENTE
========================== */


function publicarAvisoRapido(){



    document.getElementById(

        "statusAviso"

    ).value = "Publicado";





    salvarAviso();



}









/* ==========================
   LIMPAR TODOS OS AVISOS
========================== */


function limparTodosAvisos(){



    const confirmar =

    confirm(

        "Tem certeza que deseja apagar todos os avisos?"

    );





    if(!confirmar){

        return;

    }






    avisos = [];





    salvarBanco();



    carregarAvisos();



    atualizarCards();





    alert(

        "Todos os avisos foram removidos."

    );



}









/* ==========================
   CLASSE PRIORIDADE
========================== */


function classePrioridade(prioridade){



    const classes = {


        "Normal":

        "normal",



        "Importante":

        "importante",



        "Urgente":

        "urgente"



    };





    return classes[prioridade] || "normal";



}









/* ==========================
   CLASSE STATUS
========================== */


function classeStatus(status){



    const classes = {


        "Publicado":

        "publicado",




        "Rascunho":

        "rascunho"



    };





    return classes[status] || "rascunho";



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