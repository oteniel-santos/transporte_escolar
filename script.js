

 
 const btnLoc = document.querySelector('#btn-localizacao')
 const textLatLong = document.querySelector('#textLatLong')
 
 
 
 btnLoc.onclick = () => getLocation()




// // const name = document.querySelector(".name");
// // const btn = document.querySelector("button");

// //       btn.addEventListener("click", function () {
// //         name.style.color = "blue";
// //  });


// // function addAluno(){

// // }











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
  textLatLong.value = `Lat: ${position.coords.latitude}, ${position.coords.longitude}`
  
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
