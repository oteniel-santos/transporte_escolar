 const btnLoc = document.querySelector('#btn-localizacao')
 const textLatLong = document.querySelector('#textLatLong')
 const nomeResponsavel = document.querySelector('#nome');
 const enderecoResponsavel = document.querySelector('#endereco');
 const linhaResponsavel = document.querySelector('#linha');
 const btnEnviar = document.querySelector('#btnEnviar'); 
 var localiza = ""

// Capturar variáveis do documento
 let inputNomeAluno = document.querySelector('#InputNomeAluno')
 let inputEscolaAluno = document.querySelector('#InputEscola')
 let inputSerieAluno = document.querySelector('#InputSerie')
 let tableAlunos = document.querySelector('#tableAlunos')
 let btnNovoAluno = document.querySelector('#btnNovoAluno')
 let listaAlunos = []

 

// botão Nova Tarefa
btnNovoAluno.addEventListener('click', (e)=>{
    
    let aluno = {
        nome: inputNomeAluno.value,
        escola: inputEscolaAluno.value,
        serie: inputSerieAluno.value,
        id: gerarID()
    }

    if(!inputNomeAluno.value){
        alert('Informe o nome do aluno')
        return
    }
    
    if(!inputEscolaAluno.value){
        alert('Informe a escola do aluno')
        return
    }
    
    if(!inputSerieAluno.value){
        alert('Informe a série do aluno')
        return
    }

    addAluno(aluno);
    inputNomeAluno.value = "";
    inputEscolaAluno.value = "";
    inputSerieAluno.value = "";
} )



// gerar ID personalizado
function gerarID(){
    return Math.floor(Math.random() * 300);
}


//adicionar aluno
function addAluno(aluno){
    let tr = criarTagTr(aluno);
    tableAlunos.innerHTML += tr
    listaAlunos.push(aluno);
}


function criarTagTr(aluno){
    let registro = ''
    registro = `
    <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.escola}</td>
        <td>${aluno.serie}</td>
    </tr>
    `
    console.log(registro)
    return registro;
    
}


 btnLoc.onclick = () => getLocation()

 btnEnviar.onclick= () => { 

    console.log(listaAlunos);
    
 }



 function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{x.innerHTML="Geolocalização não é suportada nesse browser.";}
  }



function showPosition(position)
  {
  lat=position.coords.latitude;
  lon=position.coords.longitude;
  console.log(position.coords.latitude)
  console.log(position.coords.longitude)
  localiza = `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`
  document.querySelector('#textLatLong').value = localiza;
  
  }



function showError(error)
  {
  switch(error.code)
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="Usuário rejeitou a solicitação de Geolocalização."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Localização indisponível."
      break;
    case error.TIMEOUT:
      x.innerHTML="O tempo da requisição expirou."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="Algum erro desconhecido aconteceu."
      break;
    }
  }
