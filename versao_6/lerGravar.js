const texto = document.getElementById("texto");

function gravar(){
	 fetch("/gravar", { method: "POST", headers: {"Content-Type": "text/plain"},body: texto.value})

	.then(res => res.text())
    .then(mensagem => { console.log(mensagem); });
}

function ler(){

    fetch("/ler")
    
    .then(res => res.text())
    .then(texto => { console.log(texto)});

}