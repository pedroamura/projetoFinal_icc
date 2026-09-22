const texto = document.getElementById("texto");
const botaoEnviar = document.getElementById("envio");
const tabela = document.getElementById("tabela");
const div_vitoria = document.getElementById("vitoria");
const div_derrota = document.getElementById("derrota");
const txt_vitoria = document.getElementById("texto_vitoria");
const txt_derrota = document.getElementById("texto_derrota");
const div_tutorial = document.getElementById("tutorial");
const  div_teclado = document.getElementById("tabelateclado");
const letras_botoes = 'QWERTYUIOPASDFGHJKLZXCVBNM'
const botoes = document.getElementsByClassName("botaoTeclado")

let linha = 0;
let ehValido = str => /^[a-zA-Z]{4}$/.test(str);

// Lista de palavras e um placeholder na variável palavra pra pegar aleatório dps
let palavras = [
  "ACRE", "ALFA", "ALMA", "ALTO", "ALVO", "AMOR", "ANEL", "ANTA", "ARCO", "ARES",
  "ATOR", "AULA", "AURA", "AZAR", "AZUL", "BALA", "BASE", "BATO", "BENS", "BETA",
  "BICO", "BIFE", "BOCA", "BOLA", "BOLO", "BOTA", "BOTE", "CABO", "CAJU", "CALO",
  "CAMA", "CANO", "CAPA", "CAPO", "CARA", "CARO", "CASA", "CASO", "CEDO", "CENA",
  "CEPO", "CIMA", "COLA", "COMA", "COPA", "COPO", "CORA", "COVA", "COXO", "CRUZ",
  "CUME", "CURA", "DADO", "DAMA", "DICA", "DOCE", "DONA", "DOTE", "DUNA", "EIXO",
  "ERAS", "ERVA", "FADA", "FATO", "FAVA", "FAVO", "FERA", "FIGA", "FIGO", "FILA",
  "FINO", "FIRA", "FOCO", "FOGO", "FOME", "FORA", "FOTO", "FUMA", "FURO", "GALA",
  "GATO", "GELO", "GIRA", "GOLA", "GOLE", "GOTA", "GRAU", "GUIA", "HOJE", "HORA",
  "ILHA", "ISCA", "JOGO", "JOTA", "LAGO", "LAMA", "LATA", "LAVA", "LEMA", "LIMA",
  "LIMO", "LIRA", "LIXO", "LOBO", "LOJA", "LOTE", "LUTA", "MACA", "MALA", "MAPA",
  "MATO", "MEDO", "MEIO", "MESA", "MIMO", "MINA", "MIRO", "MITO", "MOFA", "MOLA",
  "MOTO", "MUDO", "MURO", "NAVE", "NETO", "NEVE", "NINA", "NOTA", "NOVA", "NOVE",
  "NOVO", "OLEO", "OLHO", "ONDA", "OURO", "PAGO", "PAPA", "PATO", "PELE", "PELO",
  "PENA", "PERU", "PESO", "PINO", "PIPA", "PISO", "POTE", "PUMA", "RAIO", "RATO",
  "RAMO", "RATO", "REDE", "RENO", "RICA", "RICO", "RISO", "RODA", "ROLO", "ROMA",
  "ROSA", "ROXO", "SACO", "SALA", "SAPO", "SEDA", "SELO", "SINO", "SOLO", "SUCO",
  "TAXA", "TEIA", "TELA", "TIME", "TOPO", "TORO", "TRIO", "TUBO", "URSO", "VALE",
  "VASO", "VELA", "VIDA", "VILA", "VOTO", "ZERO", "ZONA"
];
let palavra = "AAAA";

//Selecionador de palavras
function pegaPalavra() {
    palavra = palavras[Math.floor(Math.random() * palavras.length)];
    contagem = {};
    for (let char of palavra) {
        contagem[char] = (contagem[char] || 0) + 1;
    }
}

//Conta quantas letras de cada tem na palavra
let contagem = {};
for (let char of palavra) {
    contagem[char] = (contagem[char] || 0) + 1;
}

//Checa se o jogo tá rolando ou não 
let em_jogo = 0;
let loop = 0;

function checaVouC(letra, index) {
	if (letra == palavra[index]) {
		tabela.rows[linha].cells[index].style.backgroundColor = "#5B9A8B";
        botoes[letras_botoes.indexOf(letra)].style.backgroundColor = "green";
        contagem[letra] = contagem[letra] - 1;
	} else if (palavra.includes(letra) == false) {
		tabela.rows[linha].cells[index].style.backgroundColor = "#445069";
        botoes[letras_botoes.indexOf(letra)].style.backgroundColor = "black";
        
	}
}

function checaAmarelo(letra, index) {
    if (palavra.includes(letra) == true && letra != palavra[index]) {
        if (contagem[letra] > 0) {
            tabela.rows[linha].cells[index].style.backgroundColor = "#F7E987";
            botoes[letras_botoes.indexOf(letra)].style.backgroundColor = "yellow";
            contagem[letra] = contagem[letra] - 1;
            console.log("FOI");
        } else if(letra != palavra[index]) {
            tabela.rows[linha].cells[index].style.backgroundColor = "#445069";
            botoes[letras_botoes.indexOf(letra)].style.backgroundColor = "black";
        }else {
            botoes[letras_botoes.indexOf(letra)].style.backgroundColor = "green";
        }
    }
}


/*checar botoes do teclado
//function checaTeclado(letra, indice){
//    if(!palavra.includes(letra)) {
//        botoes[letras_botoes.indexOf(letra)].style.backgroundColor = "black";
//    }
//    else if(letra == palavra[indice]){
//        botoes[letras_botoes.indexOf(letra)].style.backgroundColor = "green";
//    }else if(letra != palavra[indice]){
//        if (contagem[letra] > 0) {
//            botoes[letras_botoes.indexOf(letra)].style.backgroundColor = "yellow";
//            contagem[letra] = contagem[letra] - 1;
    
    }
}
}
*/

    

//Isso roda quando o botão de enviar é apertado
function envio() {

    
    if (em_jogo == 1) {
        let textoTemp = texto.value;
        if (loop != -1 && loop < 5) {
            if (!ehValido(textoTemp)) {
                alert('Erro: Só podem ter 4 letras >:(');
                return
            } else if (!palavras.includes(textoTemp)) {
                alert('Não existe no banco de palavras')
                return
            }

            // Checa os verdes ou cinzas
            for(let i=0; i < textoTemp.length; i++) {
                checaVouC(textoTemp[i].toUpperCase(), i);
                tabela.rows[linha].cells[i].innerHTML = textoTemp[i].toUpperCase();
            }

            //Checa os amarelos
            for(let i=0; i < textoTemp.length; i++) {
                checaAmarelo(textoTemp[i].toUpperCase(), i);
                tabela.rows[linha].cells[i].innerHTML = textoTemp[i].toUpperCase();
            }
            /*for(let i=0; i<textoTemp.length; i ++) {
                checaTeclado(textoTemp[i].toUpperCase(),i);
            }
            */
            



            //Reseta a contagem depois de mudar
            contagem = {};
            for (let char of palavra) {
                contagem[char] = (contagem[char] || 0) + 1;
            }

            if (textoTemp.toUpperCase() == palavra){
                loop = -1;
                vitoria();
            } else {
                loop++;
                if(loop == 5) {
                    derrota();
                }
                linha++;
            }
            texto.value = "";
        } else if (loop == -1) {
            alert("Você já ganhou :)");
        } else {
            alert("Você perdeu :(")
        }
    }
}

//Quando você vence a div aparece
function vitoria() {
    txt_vitoria.innerHTML = "VOCÊ ACERTOU A PALAVRA: " + palavra;
    div_vitoria.style.display = "flex";
    div_teclado.style.display = "none";
}

// Quando você perde a div aparece  e mostra a palavra que era
function derrota() {
    txt_derrota.innerHTML = "VOCÊ ERROU... A PALAVRA ERA: " + palavra;
    div_derrota.style.display = "flex";
    div_teclado.style.display = "none";
}

// Essa função é o jogo em si
function jogo() {
    pegaPalavra();
    limpaTabela();

    div_vitoria.style.display = "none";
    div_derrota.style.display = "none";
    div_tutorial.style.display = "none";
    div_teclado.style.display = "flex";
    for(let i=0;i<letras_botoes.length;i++){
        botoes[i].style.backgroundColor = "#455086";
    }

    em_jogo = 1;
    loop = 0;
    linha = 0;
}

// Essa função limpa a tabela pq ela reseta a cor e o texto de cada casa
function limpaTabela() {
    for (let i=0; i < 5; i++) {
        for (let j=0; j < 4; j++) {
            tabela.rows[i].cells[j].innerHTML = "";
            tabela.rows[i].cells[j].style.backgroundColor = "#455086";
        }
    }
}

//funções do teclado
function moverValor (botao) {
	let valorBotao = botao.value;
	document.getElementById("texto").value += valorBotao;
}

function apagar() {
	document.getElementById("texto").value = document.getElementById("texto").value.slice(0,-1);
}
