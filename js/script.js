let seuVotoPara = document.querySelector('.d1left1 span')
let cargo = document.querySelector('.d1left2 span')
let descriçao = document.querySelector('.d1left4')
let aviso = document.querySelector('.d2')
let lateral = document.querySelector('.d1right')
let numeros = document.querySelector('.d1left3')

let etapaAtual = 0
let numero = ``;
let votoBranco = false

function começarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = `` ;
    numero = ``;
    votoBranco = false
     
    for(let i = 0 ; i < etapa.numeros ; i ++){
        if(i ===0){
            numeroHtml += '<div class="numero pisca"> </div>'; 
        }else{ numeroHtml += '<div class="numero"> </div>';     
    }
}

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo; 
    descriçao.innerHTML = ``;
    aviso.style.display = 'none';
    lateral.innerHTML = ``;
    numeros.innerHTML = numeroHtml;
 }
 
function atualizaInterface(){ 
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
         
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    })
    if (candidato.length > 0){ 
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descriçao.innerHTML = `Nome: ${candidato.nome} <br>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div id="small">
            <img src="${candidato.fotos[i].url}"/>${candidato.fotos[i].legenda}</div>`
            console.log(candidato.fotos[i].small)
            }else{
                fotosHtml += `<div class="d1image">
            <img src="${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>` 
        }
        }
        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descriçao.innerHTML = `<div class="nulo pisca">VOTO NULO</div>`
    } 
} 

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
          elNumero.nextElementSibling.classList.add('pisca');  
        }else{
            atualizaInterface();
        }
        

    }
}

function branco(){
        numero = '';
        votoBranco = true
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        lateral.innerHTML = '';
        descriçao.innerHTML = `<div class="nulo pisca">VOTO EM BRANCO</div>`
     
}

function corrige(){
   começarEtapa()
}

function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false
    if(votoBranco === true){
        votoConfirmado = true;
        console.log("Confirmado VOTO EM BRANCO")
    } else if (numero.length === etapa.numeros){
        votoConfirmado = true;
        console.log("Confirmado como"+numero);
    }
    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            começarEtapa();
        }else{
            descriçao.innerHTML = `<div class="nulo pisca">FIM</div>`;
        }
    }
    
    }


começarEtapa();
