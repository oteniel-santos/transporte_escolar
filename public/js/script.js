 const btnLoc = document.querySelector('#btn-localizacao')
 let textLatLong = document.querySelector('#textLatLong')
 const nomeResponsavel = document.querySelector('#nome');
 const enderecoResponsavel = document.querySelector('#endereco');
 const linhaResponsavel = document.querySelector('#linha');
 const btnEnviar = document.querySelector('#btnEnviar'); 
 var localiza = ""
 const InputSerie = document.querySelector('#InputSerie');
 const InputEscola = document.querySelector('#InputEscola')
 

// Capturar variáveis do documento
 let inputNomeAluno = document.querySelector('#InputNomeAluno')
 let inputEscolaAluno = document.querySelector('#InputEscola')
 let inputSerieAluno = document.querySelector('#InputSerie')
 let tableAlunos = document.querySelector('#tableAlunos')
 let btnNovoAluno = document.querySelector('#btnNovoAluno')
 let listaAlunos = []
 let DadosAlunos = []


 
 //Chamar a função getLocation automaticamente

 window.onload = function() {
    textLatLong.value =  getLocation()
};

btnEnviar.style.display = "none";


//CONVERTE EM MAIUSCULAS O TEXTO DIGITADO
nomeResponsavel.addEventListener('input', (ev) => {
	const input = ev.target;
	input.value = input.value.toUpperCase();
});

enderecoResponsavel.addEventListener('input', (ev) => {
	const input = ev.target;
	input.value = input.value.toUpperCase();
});

inputNomeAluno.addEventListener('input', (ev) => {
	const input = ev.target;
	input.value = input.value.toUpperCase();
});


//ENTER
nomeResponsavel.addEventListener('keypress', (e) => {
    if(e.keyCode == 13){
        event.preventDefault()
       enderecoResponsavel.focus(); 
    }
})
enderecoResponsavel.addEventListener('keypress', (e) => {
    if(e.keyCode == 13){
        event.preventDefault()
        linhaResponsavel.focus(); 
    }
})




// botão Novo Aluno
btnNovoAluno.addEventListener('click', (e)=>{
    
    let aluno = {
        nome: inputNomeAluno.value,
        escola: inputEscolaAluno.value,
        serie: inputSerieAluno.value,
        id: gerarID(),
    }

    if(!inputNomeAluno.value){
        alert('Informe o nome do aluno')
        return
    }
    
    if(!inputEscolaAluno.value){
        alert('Informe a escola do aluno')
        return
    }
    
    if(!inputSerieAluno.selectedIndex){
        alert('Informe a série do aluno')
        return
    }

    addAluno(aluno);
    btnEnviar.style.display = "block";
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
    <tr id=${aluno.id}>
        <td>${aluno.nome}</td>
        <td>${aluno.escola}</td>
        <td>${aluno.serie}</td>
        <td>
            <button type="button" class="btn btn-outline-danger" onclick=deletar(${aluno.id})> 
                <i class="fa fa-trash"> </i> 
            </button>    
        </td>
    </tr>
    `
    return registro;
    
}

//DELETAR ALUNO
function deletar(id){
    let confirmacao = window.confirm(`Tem certeza que deseja excluir o aluno?`)
    if (confirmacao){
        let td = document.getElementById(`${id}`)
         if(td){
             tableAlunos.removeChild(td);
         }
        
    }

    verificaTabela()
    
}


function verificaTabela(){
    let totalAlunos = tableAlunos.childElementCount
    if(totalAlunos == 0){
        btnEnviar.style.display = "none";
    }
}




//  btnLoc.onclick = () => getLocation()

 btnEnviar.onclick= () => {

 
    
    // VALIDAÇÃO

    // Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', async (event) => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            return
          }
  
          form.classList.add('was-validated')
          event.preventDefault();
          
          
          enviaServidor()
          
          
        }, false)
      })
      
     
  })()


//ENVIAR PARA O SERVIDOR
async function enviaServidor(){

          
  let responsavel = {
    nome: nomeResponsavel.value,
    endereco: enderecoResponsavel.value,
    linha: linhaResponsavel.value,
    localizacao: localiza,
    alunos: listaAlunos
}

let registroAluno = [];
//let dadoAluno = [];

responsavel.alunos.forEach(aluno => {
    dadoAluno = {
        idAluno: aluno.id,
        nome: aluno.nome,
        escola: aluno.escola,
        serie: aluno.serie,
        endereco: responsavel.endereco,
        linha: responsavel.linha,
        localizacao: responsavel.localizacao,
        responsavel: responsavel.nome
  }
  registroAluno.push(dadoAluno);
})


try {
  const response = await fetch('/save-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(registroAluno)
  })

  const message = await response.text();
  enviarParaWhatsApp(responsavel)
  
} catch (error) {
  
}


}


  //ENVIAR PARA ZAP  
  function enviarParaWhatsApp(responsavel) {
    var foneDestino = "5566992028229"

    var text=encodeURIComponent(`*CADASTRO TRANSPORTE ESCOLAR-2025*
    
    `)

    responsavel.alunos.forEach(aluno => {

     


    text += encodeURIComponent(`*ID*: ${aluno.id}
     `)
    text += encodeURIComponent(`*Nome*: ${aluno.nome}
     `)
    text += encodeURIComponent(`*Escola*: ${aluno.escola}
     `)
    text += encodeURIComponent(`*Serie*: ${aluno.serie}
     `)
    text += encodeURIComponent(`*Responsável*: ${responsavel.nome}
     `)
     text += encodeURIComponent(`*Endereço*: ${responsavel.endereco}
     `)
     text += encodeURIComponent(`*Linha Ônibus*: ${responsavel.linha}
     `)
     text += encodeURIComponent(`*Coordenadas da Casa*: ${responsavel.localizacao}
     `)
     text += encodeURIComponent(`------------------------
     `)

    });

    

    
    
     const url_redirect = `https://api.whatsapp.com/send?phone=${foneDestino}&text=${text}`

     window.location.href = url_redirect;
  } 
 



    
    
 }



 function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{
    alert("Geolocalização não é suportada nesse browser");
  }
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
    msgerror = "Usuário rejeitou a solicitação de Geolocalização"  
    document.querySelector('#textLatLong').value = msgerror;
    // return("Usuário rejeitou a solicitação de Geolocalização.")
    break;
    case error.POSITION_UNAVAILABLE:
      msgerror = "Localização indisponível"    
      document.querySelector('#textLatLong').value = msgerror;
    // x.innerHTML="Localização indisponível."
    break;
    case error.TIMEOUT:
      msgerror = "O tempo da requisição expirou"    
      document.querySelector('#textLatLong').value = msgerror;
    // x.innerHTML="O tempo da requisição expirou."
     break;
    case error.UNKNOWN_ERROR:
      msgerror = "Algum erro desconhecido aconteceu."  
      document.querySelector('#textLatLong').value = msgerror;
      // x.innerHTML="Algum erro desconhecido aconteceu."
      break;
    }

    
  }

//SELECT ESCOLAS

InputEscola.addEventListener('change', (e) => {
    var listaSeries = selecionaEscola(InputEscola.selectedIndex)
    criarLista(listaSeries)

})



function criarLista(listaSeries){
  InputSerie.innerHTML = ""
  let listItem = `<option>Selecione...</option> `
  listaSeries.forEach(serie => {
     var item =`<option>${serie}</option> `
     listItem += item 
  });
  listItem += `<option>Não sei informar</option> `

  InputSerie.innerHTML = listItem
}



const selecionaEscola = (idEscola) => {
  switch (idEscola) {
    case idEscola = 3:
      const Inovacao = ["4º ano", "5º ano","6º ano" ]
      return Inovacao
      break;
    
      case idEscola = 2:
      const Alcides = ["Pre II","1º ano", "2º ano","3º ano" ]
      return Alcides
      break;
    
      case idEscola = 1:
      const Creche = ["Creche I", "Creche II","Creche III", "Creche IV", "Pre I" ]
      return Creche
      break;

      case idEscola = 5:
      const AndreMaggi = ["7º Ano","8º Ano","9º Ano","1º Ano-Ens. Médio", "2º Ano-Ens. Médio","3º Ano-Ens. Médio"]
      return AndreMaggi
      break;

      case idEscola = 9:
      const Vazio = [""]
      return Vazio
      break;
    
    default:
      return Rural = ["Pre I e II","1º Ano", "2º Ano","3º Ano","4º Ano","5º Ano", "6º Ano","7º Ano","8º Ano","9º Ano"]
      break;
  }

 
}
