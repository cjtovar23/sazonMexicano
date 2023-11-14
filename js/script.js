window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
  });
  
  function toggleMenu() {
    const menuToggle = document.querySelector('.menuToggle');
    const navigation = document.querySelector('.navigation');
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
  }


document.addEventListener("DOMContentLoaded", function() {
    var urlBox = document.getElementById("urlBox");
    
    // Al cargar la página, asignar la URL al cuadro de texto
    urlBox.value = window.location.href;
});



// Función para mostrar el contenido desde la URL introducida por el usuario
function mostrarContenido() {
  // Obtener la URL ingresada por el usuario
  const url = document.getElementById('urlBox2').value;

  // Realizar la solicitud AJAX
  $.ajax({
      url: url,
      method: 'GET',
      success: function(response) {
          // Actualizar la zona de contenidos con la respuesta del servidor
          document.getElementById('zonaContenidos').innerHTML = response;
      },
      error: function() {
          // Mostrar un mensaje de error si la solicitud falla
          document.getElementById('zonaContenidos').innerHTML = 'Error al cargar el contenido.';
      }
  });
}


function realizarSolicitud() {
  // Crear un objeto XMLHttpRequest para hacer la solicitud
  const xhr = new XMLHttpRequest();
  const url = document.getElementById('urlBox2').value;
  const zonaCabeceras = document.getElementById('zonaCabeceras'); 
  const zonaEstados = document.getElementById('zonaEstados');
  const zonaCodigoEstado = document.getElementById('zonaCodigoEstado');



  // Definir la función que maneja el cambio de estado de la solicitud
  xhr.onreadystatechange = function () {
      // Obtener la zona donde se mostrará el estado de la solicitud

      // Verificar los diferentes estados de la solicitud
      if (xhr.readyState === XMLHttpRequest.UNSENT) {
          zonaEstados.innerText = 'Solicitud no iniciada';
      } else if (xhr.readyState === XMLHttpRequest.OPENED) {
          zonaEstados.innerText = 'Conexión establecida';
      } else if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
          zonaEstados.innerText = 'Cabeceras recibidas';
      } else if (xhr.readyState === XMLHttpRequest.LOADING) {
          zonaEstados.innerText = 'Cargando...';
      } else if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            // la respuesta recibida del servidor si es exitosa
              zonaEstados.innerText = 'Solicitud completada';
              console.log(url);

              // Muestra el contenido de las cabeceras
              const cabeceras = xhr.getAllResponseHeaders();
              zonaCabeceras.innerText = cabeceras;
              zonaCodigoEstado.innerText = `Código de estado: ${xhr.status} - ${xhr.statusText}`;

              
          } else {
              zonaEstados.innerText = 'Error en la solicitud';
          }
      }
  };

  // Hacer la solicitud al servidor
  xhr.open('GET', url, true); 
  xhr.send();
}
