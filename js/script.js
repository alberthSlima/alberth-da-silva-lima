/* =========================================================
   Funcionalidades:
   1. Alternar tema claro/escuro (com memória no navegador)
   2. Menu responsivo (abre/fecha no celular)
   3. Validação e envio simulado do formulário de contato
   ========================================================= */

/* Espera o HTML carregar antes de mexer nos elementos */
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. TEMA CLARO / ESCURO
       ===================================================== */
    const btnTema = document.getElementById("btnTema");
    const corpo = document.body;

    // Ao abrir a página, verifica se o usuário já tinha escolhido um tema antes
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "escuro") {
        corpo.setAttribute("data-tema", "escuro");
        if (btnTema) btnTema.textContent = "☀️";
    }

    // Clique no botão troca o tema e guarda a escolha
    if (btnTema) {
        btnTema.addEventListener("click", function () {
            const estaEscuro = corpo.getAttribute("data-tema") === "escuro";

            if (estaEscuro) {
                corpo.removeAttribute("data-tema");
                btnTema.textContent = "🌙";
                localStorage.setItem("tema", "claro");
            } else {
                corpo.setAttribute("data-tema", "escuro");
                btnTema.textContent = "☀️";
                localStorage.setItem("tema", "escuro");
            }
        });
    }

    /* =====================================================
       2. MENU RESPONSIVO
       ===================================================== */
    const btnMenu = document.getElementById("btnMenu");
    const menu = document.getElementById("menu");

    if (btnMenu && menu) {
        btnMenu.addEventListener("click", function () {
            // Adiciona/remove a classe que mostra o menu
            menu.classList.toggle("aberto");
        });
    }

    /* =====================================================
       3. FORMULÁRIO DE CONTATO
       ===================================================== */
    const form = document.getElementById("formContato");

    // Esse trecho só roda na página de contato (onde o form existe)
    if (form) {
        const modal = document.getElementById("modal");
        const fecharModal = document.getElementById("fecharModal");

        form.addEventListener("submit", function (evento) {
            // Impede o recarregamento padrão da página ao enviar
            evento.preventDefault();

            // Pega os campos
            const nome = document.getElementById("nome");
            const email = document.getElementById("email");
            const mensagem = document.getElementById("mensagem");

            // Começa assumindo que está tudo certo
            let valido = true;

            // Limpa erros anteriores antes de validar de novo
            limparErros();

            // --- Valida o nome (não pode estar vazio) ---
            if (nome.value.trim() === "") {
                mostrarErro(nome, "erroNome", "Por favor, informe seu nome.");
                valido = false;
            }

            // --- Valida o e-mail (vazio e formato) ---
            // Expressão regular simples: algo@algo.algo
            const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === "") {
                mostrarErro(email, "erroEmail", "Por favor, informe seu e-mail.");
                valido = false;
            } else if (!formatoEmail.test(email.value.trim())) {
                mostrarErro(email, "erroEmail", "Digite um e-mail válido (ex: nome@dominio.com).");
                valido = false;
            }

            // --- Valida a mensagem (não pode estar vazia) ---
            if (mensagem.value.trim() === "") {
                mostrarErro(mensagem, "erroMensagem", "Escreva uma mensagem antes de enviar.");
                valido = false;
            }

            // Se algum campo falhou, para por aqui
            if (!valido) {
                return;
            }

            // --- Tudo certo: simula o envio ---
            // (Não envia de verdade, apenas mostra a confirmação e limpa o form)
            form.reset();
            if (modal) {
                modal.classList.add("aberto");
            } else {
                alert("Mensagem enviada com sucesso!");
            }
        });

        // Botão "Fechar" do modal
        if (fecharModal && modal) {
            fecharModal.addEventListener("click", function () {
                modal.classList.remove("aberto");
            });
        }

        // Fecha o modal clicando fora da caixa branca
        if (modal) {
            modal.addEventListener("click", function (evento) {
                if (evento.target === modal) {
                    modal.classList.remove("aberto");
                }
            });
        }
    }

    /* ----- Funções auxiliares do formulário ----- */

    // Mostra a mensagem de erro e deixa a borda do campo vermelha
    function mostrarErro(campo, idErro, texto) {
        campo.classList.add("invalido");
        const span = document.getElementById(idErro);
        if (span) span.textContent = texto;
    }

    // Apaga todas as mensagens de erro e bordas vermelhas
    function limparErros() {
        const erros = document.querySelectorAll(".erro");
        erros.forEach(function (e) {
            e.textContent = "";
        });
        const campos = document.querySelectorAll(".invalido");
        campos.forEach(function (c) {
            c.classList.remove("invalido");
        });
    }

});
