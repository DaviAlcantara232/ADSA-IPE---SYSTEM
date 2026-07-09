/* ============================================================
   ADSA IPÊ SYSTEM
   membros.js
============================================================ */


/* ==========================
   BANCO DE MEMBROS
========================== */


let membros = JSON.parse(
    localStorage.getItem("membros")
) || [];



let membroEditando = null;





/* ==========================
   CARREGAR PÁGINA
========================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    carregarMembros();


    atualizarCards();


});







/* ==========================
   LOGOUT
========================== */


function logout(){


    const confirmar = confirm(
        "Deseja realmente sair?"
    );


    if(confirmar){


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


}

/* ==========================
   SALVAR MEMBRO
========================== */


function salvarMembro(){


    const membro = {


        id: Date.now(),


        nome:
        document.getElementById(
            "nomeMembro"
        ).value,


        nascimento:
        document.getElementById(
            "dataNascimento"
        ).value,


        telefone:
        document.getElementById(
            "telefoneMembro"
        ).value,


        email:
        document.getElementById(
            "emailMembro"
        ).value,


        estadoCivil:
        document.getElementById(
            "estadoCivil"
        ).value,


        entrada:
        document.getElementById(
            "dataEntrada"
        ).value,


        batizado:
        document.getElementById(
            "batizado"
        ).value,


        ministerio:
        document.getElementById(
            "ministerio"
        ).value,


        endereco:
        document.getElementById(
            "enderecoMembro"
        ).value,


        cidade:
        document.getElementById(
            "cidadeMembro"
        ).value,


        congregacao:
        document.getElementById(
            "congregacao"
        ).value,


        celula:
        document.getElementById(
            "celula"
        ).value,


        observacoes:
        document.getElementById(
            "observacoes"
        ).value,


        cadastro:
        new Date()
        .toLocaleDateString("pt-BR")


    };





    if(membroEditando){


        membros =
        membros.map(
            item =>
            item.id === membroEditando
            ? membro
            : item
        );


        membroEditando = null;


    }else{


        membros.push(membro);


    }




    salvarBanco();


    carregarMembros();


    atualizarCards();


    limparFormulario();


    alert(
        "Membro salvo com sucesso!"
    );


}







/* ==========================
   SALVAR NO LOCAL STORAGE
========================== */


function salvarBanco(){


    localStorage.setItem(

        "membros",

        JSON.stringify(membros)

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


function cancelarMembro(){


    membroEditando = null;


    limparFormulario();


}

/* ==========================
   CARREGAR MEMBROS NA TABELA
========================== */


function carregarMembros(){


    const tabela =
    document.getElementById(
        "listaMembros"
    );


    if(!tabela){

        return;

    }



    tabela.innerHTML = "";




    if(membros.length === 0){


        tabela.innerHTML = `

        <tr>

        <td colspan="7">

        Nenhum membro cadastrado.

        </td>

        </tr>

        `;


        return;


    }






    membros.forEach(
    membro => {



        tabela.innerHTML += `


        <tr>


        <td>

        ${membro.nome}

        </td>




        <td>

        ${membro.telefone}

        </td>





        <td>


        ${
            membro.batizado === "Sim"

            ?

            `<span class="badgeSim">

            💧 Sim

            </span>`

            :

            `<span class="badgeNao">

            ❌ Não

            </span>`

        }


        </td>





        <td>

        ${membro.ministerio || "-"}

        </td>





        <td>

        ${membro.congregacao || "-"}

        </td>





        <td>

        ${membro.cadastro}

        </td>





        <td>


        <button

        class="btnEditar"

        onclick="editarMembro(${membro.id})">


        ✏️


        </button>





        <button

        class="btnExcluir"

        onclick="excluirMembro(${membro.id})">


        🗑️


        </button>



        </td>




        </tr>


        `;


    });


}








/* ==========================
   EDITAR MEMBRO
========================== */


function editarMembro(id){


    const membro =
    membros.find(
        item =>
        item.id === id
    );



    if(!membro){

        return;

    }




    membroEditando = id;




    document.getElementById("nomeMembro").value =
    membro.nome;


    document.getElementById("dataNascimento").value =
    membro.nascimento;


    document.getElementById("telefoneMembro").value =
    membro.telefone;


    document.getElementById("emailMembro").value =
    membro.email;


    document.getElementById("estadoCivil").value =
    membro.estadoCivil;


    document.getElementById("dataEntrada").value =
    membro.entrada;


    document.getElementById("batizado").value =
    membro.batizado;


    document.getElementById("ministerio").value =
    membro.ministerio;


    document.getElementById("enderecoMembro").value =
    membro.endereco;


    document.getElementById("cidadeMembro").value =
    membro.cidade;


    document.getElementById("congregacao").value =
    membro.congregacao;


    document.getElementById("celula").value =
    membro.celula;


    document.getElementById("observacoes").value =
    membro.observacoes;




    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


}







/* ==========================
   EXCLUIR MEMBRO
========================== */


function excluirMembro(id){


    const confirmar =
    confirm(
        "Deseja excluir este membro?"
    );



    if(!confirmar){

        return;

    }




    membros =
    membros.filter(

        membro =>
        membro.id !== id

    );



    salvarBanco();


    carregarMembros();


    atualizarCards();


}

/* ==========================
   PESQUISAR MEMBRO
========================== */

function pesquisarMembro(){

    const texto =
    document
    .getElementById("pesquisarMembro")
    .value
    .toLowerCase();


    const resultado =
    membros.filter(membro =>

        membro.nome
        .toLowerCase()
        .includes(texto)

        ||

        membro.telefone
        .includes(texto)

    );


    renderizarTabela(resultado);

}







/* ==========================
   FILTROS
========================== */


document.addEventListener(
"change",
(event)=>{


    if(
    event.target.id === "filtroMinisterio"
    ||
    event.target.id === "filtroBatizado"
    ){

        aplicarFiltros();

    }


});







function aplicarFiltros(){


    const ministerio =
    document.getElementById(
        "filtroMinisterio"
    ).value;



    const batizado =
    document.getElementById(
        "filtroBatizado"
    ).value;




    const resultado =
    membros.filter(membro=>{


        const filtroMinisterio =

        ministerio === "todos"

        ||

        membro.ministerio === ministerio;




        const filtroBatizado =

        batizado === "todos"

        ||

        membro.batizado === batizado;




        return (

            filtroMinisterio

            &&

            filtroBatizado

        );


    });



    renderizarTabela(resultado);


}







/* ==========================
   ATUALIZAR CARDS
========================== */


function atualizarCards(){


    const total =
    document.getElementById(
        "totalMembros"
    );


    const batizados =
    document.getElementById(
        "totalBatizados"
    );


    const ministerios =
    document.getElementById(
        "totalMinisterios"
    );


    const ativos =
    document.getElementById(
        "totalAtivos"
    );




    if(total){

        total.innerText =
        membros.length;

    }





    if(batizados){

        batizados.innerText =

        membros.filter(

        membro =>

        membro.batizado === "Sim"

        ).length;

    }





    if(ministerios){


        ministerios.innerText =

        new Set(

            membros.map(

                membro =>

                membro.ministerio

            )

        ).size;


    }





    if(ativos){

        ativos.innerText =
        membros.length;

    }


}







/* ==========================
   RENDERIZAR TABELA
========================== */


function renderizarTabela(lista){


    const tabela =
    document.getElementById(
        "listaMembros"
    );



    tabela.innerHTML = "";



    if(lista.length === 0){


        tabela.innerHTML = `

        <tr>

        <td colspan="7">

        Nenhum membro encontrado.

        </td>

        </tr>

        `;


        return;

    }





    lista.forEach(membro=>{


        tabela.innerHTML += `


        <tr>


        <td>

        ${membro.nome}

        </td>



        <td>

        ${membro.telefone}

        </td>



        <td>


        ${
        membro.batizado === "Sim"

        ?

        `<span class="badgeSim">
        💧 Sim
        </span>`

        :

        `<span class="badgeNao">
        ❌ Não
        </span>`

        }


        </td>



        <td>

        ${membro.ministerio || "-"}

        </td>



        <td>

        ${membro.congregacao || "-"}

        </td>



        <td>

        ${membro.cadastro}

        </td>



        <td>


        <button

        class="btnEditar"

        onclick="editarMembro(${membro.id})">

        ✏️

        </button>




        <button

        class="btnExcluir"

        onclick="excluirMembro(${membro.id})">

        🗑️

        </button>



        </td>



        </tr>


        `;


    });


}