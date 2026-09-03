const texto = document.getElementById("texto");
const botaoEnviar = document.getElementById("envio");
const tabela = document.getElementById("tabela");
const div_vitoria = document.getElementById("vitoria");
const div_derrota = document.getElementById("derrota");
const txt_vitoria = document.getElementById("texto_vitoria");
const txt_derrota = document.getElementById("texto_derrota");
const div_tutorial = document.getElementById("tutorial");

let linha = 0;
let ehValido = str => /^[a-zA-Z]{4}$/.test(str);

// Lista de palavras e um placeholder na variável palavra pra pegar aleatório dps
let palavras = ["AMOR", "BOLA", "PATO", "CASA", "RISO", "CAMA", "DADO", "FOGO", "GATO", "JOGO", "MESA", "RATO", "SAPO", "VIDA", "ONDA",
"CASO", "CARO", "LAGO", "MALA", "MACA", "ANTA", "SACO", "GATO"];
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
        contagem[letra] = contagem[letra] - 1;
	} else if (palavra.includes(letra) == false) {
		tabela.rows[linha].cells[index].style.backgroundColor = "#445069";
	}
}

function checaAmarelo(letra, index) {
    if (palavra.includes(letra) == true && letra != palavra[index]) {
        if (contagem[letra] > 0) {
            tabela.rows[linha].cells[index].style.backgroundColor = "#F7E987";
            contagem[letra] = contagem[letra] - 1;
            console.log("FOI");
        } else {
            tabela.rows[linha].cells[index].style.backgroundColor = "#445069";
        }
    }
}

//Isso roda quando o botão de enviar é apertado
function envio() {
    if (em_jogo == 1) {
        let textoTemp = texto.value;
        if (loop != -1 && loop < 5) {
            if (!ehValido(textoTemp)) {
                alert('Erro: Só podem ter 4 letras >:(');
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
            console.log(palavra);
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
}

// Quando você perde a div aparece  e mostra a palavra que era
function derrota() {
    txt_derrota.innerHTML = "VOCÊ ERROU... A PALAVRA ERA: " + palavra;
    div_derrota.style.display = "flex";
}

// Essa função é o jogo em si
function jogo() {
    pegaPalavra();
    limpaTabela();

    div_vitoria.style.display = "none";
    div_derrota.style.display = "none";
    div_tutorial.style.display = "none";
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