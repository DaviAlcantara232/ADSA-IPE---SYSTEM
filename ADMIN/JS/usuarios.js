/* ============================================================
   ADSA IPÊ SYSTEM
   usuarios.js
   Desenvolvido por Davi Alcantara
============================================================ */

"use strict";

/* ============================================================
   CONFIGURAÇÕES
============================================================ */

const STORAGE_USUARIOS = "usuarios";
const STORAGE_USUARIO_LOGADO = "usuarioLogado";

let usuarios = [];
let usuarioEditando = null;


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

document.addEventListener("DOMContentLoaded", iniciarSistema);

function iniciarSistema(){

    carregarBanco();

    carregarUsuarios();

    atualizarCards();

}


/* ============================================================
   BANCO LOCAL
============================================================ */

function carregarBanco(){

    usuarios =
    JSON.parse(
        localStorage.getItem(STORAGE_USUARIOS)
    ) || [];

}

function salvarBanco(){

    localStorage.setItem(
        STORAGE_USUARIOS,
        JSON.stringify(usuarios)
    );

}


/* ============================================================
   GERAR ID
============================================================ */

function gerarID(){

    return Date.now() +
    Math.floor(Math.random()*99999);

}


/* ============================================================
   FORMULÁRIO
============================================================ */

function limparFormulario(){

    document.getElementById("nome").value="";

    document.getElementById("email").value="";

    document.getElementById("telefone").value="";

    document.getElementById("senha").value="";

    document.getElementById("cargo").selectedIndex=0;

    document.getElementById("status").selectedIndex=0;

    usuarioEditando=null;

}


/* ============================================================
   VALIDAÇÕES
============================================================ */

function validarEmail(email){

    const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}


function emailExiste(email){

    return usuarios.some(

        usuario=>

        usuario.email.toLowerCase()

        ===

        email.toLowerCase()

    );

}


/* ============================================================
   DATA
============================================================ */

function dataAtual(){

    return new Date().toLocaleString("pt-BR");

}

/* ============================================================
   CADASTRO DE USUÁRIOS
============================================================ */

function criarUsuario(){

    const nome = document.getElementById("nome").value.trim();

    const email = document.getElementById("email").value.trim();

    const telefone = document.getElementById("telefone").value.trim();

    const senha = document.getElementById("senha").value.trim();

    const cargo = document.getElementById("cargo").value;

    const status = document.getElementById("status").value;


    if(

        nome==="" ||

        email==="" ||

        telefone==="" ||

        senha==="" ||

        cargo===""

    ){

        alert("Preencha todos os campos.");

        return;

    }


    if(!validarEmail(email)){

        alert("Digite um e-mail válido.");

        return;

    }


    /* ===========================
       EDITANDO
    =========================== */

    if(usuarioEditando!==null){

        atualizarUsuario(

            usuarioEditando,

            nome,

            email,

            telefone,

            senha,

            cargo,

            status

        );

        return;

    }


    /* ===========================
       NOVO USUÁRIO
    =========================== */

    if(emailExiste(email)){

        alert("Já existe um usuário com esse e-mail.");

        return;

    }


    usuarios.push({

        id:gerarID(),

        nome:nome,

        email:email,

        telefone:telefone,

        senha:senha,

        cargo:cargo,

        status:status,

        dataCadastro:dataAtual(),

        ultimoLogin:null

    });


    salvarBanco();

    carregarUsuarios();

    atualizarCards();

    limparFormulario();

    alert("Usuário cadastrado com sucesso!");

}


/* ============================================================
   ATUALIZAR USUÁRIO
============================================================ */

function atualizarUsuario(

id,

nome,

email,

telefone,

senha,

cargo,

status

){

    const usuario = usuarios.find(

        u=>u.id===id

    );


    if(!usuario){

        return;

    }


    const outroUsuario = usuarios.find(

        u=>

        u.email.toLowerCase()===email.toLowerCase()

        &&

        u.id!==id

    );


    if(outroUsuario){

        alert("Este e-mail já pertence a outro usuário.");

        return;

    }


    usuario.nome = nome;

    usuario.email = email;

    usuario.telefone = telefone;

    usuario.senha = senha;

    usuario.cargo = cargo;

    usuario.status = status;


    salvarBanco();

    carregarUsuarios();

    atualizarCards();

    limparFormulario();

    usuarioEditando=null;

    alert("Usuário atualizado.");

}


/* ============================================================
   EDITAR
============================================================ */

function editarUsuario(id){

    const usuario = usuarios.find(

        u=>u.id===id

    );

    if(!usuario) return;


    document.getElementById("nome").value = usuario.nome;

    document.getElementById("email").value = usuario.email;

    document.getElementById("telefone").value = usuario.telefone;

    document.getElementById("senha").value = usuario.senha;

    document.getElementById("cargo").value = usuario.cargo;

    document.getElementById("status").value = usuario.status;


    usuarioEditando=id;


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


/* ============================================================
   CANCELAR EDIÇÃO
============================================================ */

function cancelarEdicao(){

    usuarioEditando=null;

    limparFormulario();

}

/* ============================================================
   CARREGAR USUÁRIOS NA TABELA
============================================================ */

function carregarUsuarios(){

    const tabela = document.getElementById("listaUsuarios");

    if(!tabela) return;

    tabela.innerHTML="";


    if(usuarios.length===0){

        tabela.innerHTML=`

        <tr>

            <td colspan="8">

                Nenhum usuário cadastrado.

            </td>

        </tr>

        `;

        return;

    }


    usuarios.forEach(usuario=>{

        tabela.innerHTML += `

        <tr>

            <td>${usuario.nome}</td>

            <td>${usuario.email}</td>

            <td>${usuario.telefone}</td>

            <td>${usuario.cargo}</td>

            <td>

                <span class="${
                usuario.status==="Ativo"
                ?
                "statusAtivo"
                :
                "statusInativo"
                }">

                ${usuario.status}

                </span>

            </td>

            <td>${usuario.dataCadastro}</td>

            <td>

                ${usuario.ultimoLogin ?? "-"}

            </td>

            <td>

                <button

                class="btnEditar"

                onclick="editarUsuario(${usuario.id})">

                ✏️

                </button>

                <button

                class="btnStatus"

                onclick="alterarStatus(${usuario.id})">

                🔄

                </button>

                <button

                class="btnExcluir"

                onclick="excluirUsuario(${usuario.id})">

                🗑️

                </button>

            </td>

        </tr>

        `;

    });

}


/* ============================================================
   ATUALIZAR CARDS
============================================================ */

function atualizarCards(){

    document.getElementById("totalUsuarios").textContent = usuarios.length;

    document.getElementById("totalAdmins").textContent =

    usuarios.filter(

        u=>u.cargo==="👑 Administrador"

    ).length;


    document.getElementById("totalPastores").textContent =

    usuarios.filter(

        u=>u.cargo==="⛪ Pastor"

    ).length;


    document.getElementById("totalMembros").textContent =

    usuarios.filter(

        u=>u.cargo==="👤 Membro"

    ).length;

}

/* ============================================================
   PESQUISA
============================================================ */

function pesquisarUsuario(){

    const pesquisa =

    document

    .getElementById("pesquisar")

    .value

    .toLowerCase();


    const linhas =

    document.querySelectorAll(

        "#listaUsuarios tr"

    );


    linhas.forEach(linha=>{

        if(linha.cells.length>1){

            const texto =

            linha.innerText.toLowerCase();

            linha.style.display =

            texto.includes(pesquisa)

            ?

            ""

            :

            "none";

        }

    });

}


/* ============================================================
   EXCLUIR
============================================================ */

function excluirUsuario(id){

    if(

        !confirm("Deseja excluir este usuário?")

    ){

        return;

    }


    usuarios = usuarios.filter(

        usuario=>usuario.id!==id

    );


    salvarBanco();

    carregarUsuarios();

    atualizarCards();

}


/* ============================================================
   ALTERAR STATUS
============================================================ */

function alterarStatus(id){

    const usuario = usuarios.find(

        u=>u.id===id

    );


    if(!usuario) return;


    usuario.status =

    usuario.status==="Ativo"

    ?

    "Inativo"

    :

    "Ativo";


    salvarBanco();

    carregarUsuarios();

}

/* ============================================================
   LOGOUT - SAIR DO PAINEL ADMINISTRATIVO
============================================================ */

function logout(){

    const confirmar = confirm(
        "Deseja realmente sair do painel administrativo?"
    );


    if(!confirmar){

        return;

    }


    // Remove dados da sessão

    localStorage.removeItem("usuarioLogado");

    localStorage.removeItem("sessaoAtiva");



    // Retorna para o login do AUTH

    window.location.replace(
        "../../AUTH/login.html"
    );

}