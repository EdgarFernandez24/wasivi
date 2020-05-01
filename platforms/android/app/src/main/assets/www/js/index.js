var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('backbutton',onBackKeyDown , false);  
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');          
    },
    receivedEvent: function(id) {
      //StatusBar.overlaysWebView(false); 
      //StatusBar.backgroundColorByHexString("#3a9cb1"); 
      navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: true, timeout: 10000,maximumAge: 0 });  
      autoCompletar();  
      var socket = new Socket();  
      socket.onData = function(data) {
      // invoked after new batch of data is received (typed array of bytes Uint8Array)
        console.log("socket.onData");
      };
      socket.onError = function(errorMessage) {
        // invoked after error occurs during connection
        console.log("socket.onError");
      };
      socket.onClose = function(hasError) {
        // invoked after connection close
        console.log("socket.onClose");
      };

    }
};
app.initialize();
var ipConex = '192.168.1.109';
var Latitude = undefined;
var Longitude = undefined;
var cambioZona =1;//paracontrolar el cambio de zona
var swipeZona=1;//para controlar el acceso a publicado lista 
var swiperMapa='';//para mostrar swiper en mapa
var entroTabLista=0;//par control de accesos a si entro a tab lista
var posPubliDespues=0;//posicion para publicado en swiper
var swiperMoPuTo=0;//para control de accese a swiper.destroy
var ubicacionPrincipal='';//para esconder menu 
var DesplazamientoActual='';//para esconder menu '
//var swiperMapa='';
var swiperFoPu='';//para mostra swiper en anuncio
var selDiv = "";//div para publicar imagen
var html = "";//para cargar div contenedor fotos publicar

var selDivSe = "";//div para publicar servicios
var htmlSe = "";//para cargar div contenedor servicos

var selDivPu = "";//div para mostrar lo publicado
var htmlPu = "";//para cargar div contenedor publicados

var selDivMostrarPubliTodoSwipe ="";//div para mostra lo publicado en swipe mapas
var htmlMostrarPubliTodoSwipe = " ";//para cargar div contenedor publicados en swipe

var selDivMostrarFotosSwipe="";//div para mostrar fotos publicadas por id publicado
var htmlMostrarFotosSwipe = "";//para cargar div contenedor publicados en swipe

var selDivMostrarPubliTodoLista ="";//div para mostrar lo publicado en listas
var htmlMostrarPubliTodoLista ="";//para cargar div contenedor publicar listas

var selDivMostrarDatosPu="";//para mosrtar lo publicado cuantos ho mu, servicios, no permitido
var htmlMostrarDatosPu="";//para cargar div mostrar publicado cuantos ho mu, servicios, no permitido
var autoCDir=0;
var autoCCiu=0;
var storedFiles = [];//array de img por foto libreria
var storedFilesDb = [];//array de img obtenidas de la base de datos
var contImg=0;//catidad de img para publicar o publicados tb para validar zona fotos
var maxImg=5;//maxima img fotos
var mFotoR="sin foto";//mensaje de retorno insertarfotoregistro.php
var imagenPerfilRegistro = "";
var imagenPerfilEditar = "";
var imagenPublicar="";
var imgPerfilAnt="";// guarda img anterior para comparar con el actua si es lo mismo    
var customLabel = {casa: {label: 'C'}, bar: {label: 'B'},piso:{label: 'W'}};

var placeCiu = '';//almacenar direcion ciudad de google places
var ciudadN1 = '';//almacenar zona obtenidos de placeCiu Direccion
var ciudadN2 = '';//almacenar ciudad obtenidos de placeCiu Direccion
var placeDir = '';// almacenar direcion de google places Direccion
var addressD1 = '';//alamcenar direccion de placedir Direccion
var addressD2 = '';//alamcenar zona de placedir Direccion
var addressPostal = ''//almacenar zona de placed direccion codigo postal 
var addressLat='';//almacenar latitud de la direccion
var addressLon='';//almacenar longitud de la direccion
var continuarDir='';//no hay datos guardada de direcion
var btnAtrasDir=0;//para controlar la consulta de direccion
//var contCiu=0;//contador para saber si no entro a automletar ciudad
//var ContPlaceCiu=0;// contador para saber si entro a automletar ciudad
var tMPu = 0; //titulo para validar de la publicacion en zona fotos
var pMPu = 0; //precio para validar  de la publicacion en zona fotos
var fMPu = 0;//fianza para validar de la publicacion en zona fotos
var cMPu = 0;//comentario para validar de la publicacion en zona fotos 
var continuarFUbi='';//no hay datos de Fotos y caracteristicas guardadas
var btnAtrasFoto = 0;//si se presion btn atras foto ubicacion

var sMPu = 0;//superficie para validar de la publicacion en zona vivienda
var qMPu = 0;//que publicas para validar de la publicacion en zona vivienda
var cHoMPu = 0;//cuantos hombres comparten  para validar de la publicacion en zona vivienda
var cMuMPu = 0;//cuantos mujeres comparten  para validar de la publicacion en zona vivienda
var asMPu = caMPu = esMPu = laMPu = lavMPu = muMPu = pisMPu = poMPu = raMPu = seMPu = tvMPu = wifiMPu = 0;//los ervicios de vivienda
var continuarVi='';//no hay datos de vivienda y servicios guardada
var btnAtrasVi= 0;//si se presion btn atras vivienda
var guardarSe = 0;//no hay servicios guardados se inserta por primera vez
var btnAtrasSe = 0;//variable boton atras servicio

var camaMPu = 0;//como es la cama para validar de la publicacion zona habitacion
var inFMPu = 0;//fecha desde  para validar de la publicacion zona habitacion
var finFMPu = 0;//fecha hasta  para validar de la publicacion zona habitacion
var inMMPu = 1;//tiempo minimo 1 mes para validar de la publicacion zona habitacion
var finMMPu = 0;//tiempo maximo mes para validar de la publicacion zona habitacion
var dimMPu = 0;//dimensiones de la habitacion para validar de la publicacion zona habitacion
var continuarHabi ='';//no hay datos guardados de habitacion y fin de publicar
var btnAtrasHabi = 0;//si se presion btn atras Habitacion
var datosConHabi = -1;//consultamos datos almacenado de habitacion 
var btnPublicarTodo = 0; //para control la publicacion y reseteo de forms

var icoUserpublicadosM = 0;//para mostrar la consulta de publicados one time
var btnEditarPublicadoM = 0;//para controlar btn editar publicado
// Success callback for get geo coordinates
var navi=''; 



 

function onBackKeyDown(evt) {
  evt.preventDefault();
  navi=0;
    if (cordova.platformId !== 'android') {
    console.log("cordova.platformId "+cordova.platformId);
    return;
    }
  //mostrar pagina principal  desde perfil mostrar  
  if($('#paginaUsuarioPerfilMostrar').css('display')=='block'){
    navi='$("#paginaUsuarioPerfilMostrar").trigger("click")';
    $("#icoBuscar").click();//.trigger("click");    
  }
  //mostrar pagina principal  desde lista mapas  
  if($('#paginaListaMapas').css('display')=='block'){
    navi='$("#paginaListaMapas").trigger("click")';
    $("#btnAtras").click();//trigger("click");    
  }
  //mostrar pagina lista mapas   desde mostrar foto y datos publicados   
  if($('#paginaPublicadoMostrar').css('display')=='block'){
    navi='$("#paginaListaMapas").trigger("click")';
    $("#btnAtrasPublicadoMostrar").click();//trigger("click");    
  }  
  //mostrar pagina mostrar perfil  desde pagina editar direccion
  if($('#paginaPublicar').css('display')=='block' && $('#publicarDireccion').css('display')=='block' ){
    navi='desde editar direccion';
    $("#btnAtrasDireccion").click();    
  }
  //mostrar pagina direccion  desde pagina fotos y datos 
  if($('#paginaPublicar').css('display')=='block' && $('#publicarFotoUbicacion').css('display')=='block' ){
    navi='desde fotos y datos';
    $("#btnAtrasfotoUbicacion").click();
  }
  //mostrar pagina fotos y datos  desde pagina vivienda
  if($('#paginaPublicar').css('display')=='block' && $('#publicarVivienda').css('display')=='block' ){
    navi='desde vivienda ';
    $("#btnAtrasVivienda").click();
  }
  //mostrar pagina vivienda desde pagina servicios
  if($('#paginaPublicar').css('display')=='block' && $('#publicarServicios').css('display')=='block' ){
    navi='desde editar servicios';
    $("#btnAtrasVivienda").click();
  }
  //mostrar pagina vivienda desde pagina habitacion
  if($('#paginaPublicar').css('display')=='block' && $('#publicarHabitacion').css('display')=='block' ){
    navi='desde editar habitacion';
    $("#btnAtrasHabitacion").click();
  }
}


var onMapSuccess = function (position) {
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    //alert( "onMapSuccess "+Latitude+" "+Longitude);
    console.log( "onMapSuccess "+Latitude+" "+Longitude);
    getMap(Latitude, Longitude);
    watchMapPosition();
    getWeather(Latitude, Longitude);
}
// Get map by using coordinates
function getMap(latitude, longitude) {
  console.log( "getMap "+latitude+" "+longitude);
  var mapOptions = {
    center: new google.maps.LatLng(latitude, longitude),//0,0),//
    zoom: 15,
    scrollwheel: false,
    zoomControl: true,
    rotateControl : false,
    mapTypeControl: true,

    streetViewControl: false,
    panControl: false,
    fullScreenControl: false,
    enableCloseButton: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControlOptions:{position: google.maps.ControlPosition.BOTTOM_CENTER}
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
/*  var latLong = new google.maps.LatLng(latitude, longitude);
  var marker = new google.maps.Marker({position: latLong});
  marker.setMap(map);
  map.setZoom(15);
  map.setCenter(marker.getPosition());*/

  var infoWindow = new google.maps.InfoWindow;
    // Change this depending on the name of your PHP or XML file
  downloadUrl('http://'+ipConex+'/wasiWeb/php/marcas.php', function(data) {
    //var =0;
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName('marker');
    console.log("markers"+JSON.stringify(markers));
    Array.prototype.forEach.call(markers, function(markerElem) {
      //posPubli++;
      var id = markerElem.getAttribute('id_p');
      var costo = markerElem.getAttribute('costo');
      var name = markerElem.getAttribute('zona');
      var address = markerElem.getAttribute('dir');
      var type = markerElem.getAttribute('tipo');
      var posPubli = markerElem.getAttribute('posPubli');

      var point = new google.maps.LatLng(
          parseFloat(markerElem.getAttribute('lat')),
          parseFloat(markerElem.getAttribute('lng')));

      var infowincontent = document.createElement('div');
      
      var strongC = document.createElement('strong');
      strongC.textContent = costo+" €/m"
      infowincontent.appendChild(strongC);
      infowincontent.appendChild(document.createElement('br'));

      var strongZ = document.createElement('strong');
      strongZ.textContent = name
      infowincontent.appendChild(strongZ);
      infowincontent.appendChild(document.createElement('br'));

      var text = document.createElement('text');
      text.textContent = address
      infowincontent.appendChild(text);

      var icon = customLabel[type] || {};

      var marker = new google.maps.Marker({
        map: map,
        position: point,
        label: icon.label
      });

      marker.addListener('click', function() {
        infoWindow.setContent(infowincontent);
        infoWindow.open(map, marker);
        swiperMapa.slideTo(posPubli, 0); //para mostrar la posicion de la publicacion
        posPubliDespues=posPubli;
        console.log( "markers id: "+id+" name: "+name+" address: "+address+" type: "+type+" posPubli: "+posPubli);
      });
      console.log( "markers id: "+id+" name: "+name+" address: "+address+" type: "+type+" posPubli: "+posPubli);
    });
  });
}
function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
    new ActiveXObject('Microsoft.XMLHTTP') :
    new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };
  request.open('GET', url, true);
  request.send(null);
}
// Success callback for watching your changing position
var onMapWatchSuccess = function (position) {
  //alert('onMapWatchSuccess');
    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;
    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
      console.log("mapa cambio posicion");
        Latitude = updatedLatitude;
        Longitude = updatedLongitude;
        getMap(updatedLatitude, updatedLongitude);
    }
}
// Error callback
function onMapError(error) {
    alert('codeonMapError: ' + error.code + '\n' +'message: ' + error.message + '\n');
    console.log('codeonMapError: ' + error.code + '\n' +'message: ' + error.message + '\n');
}
// Watch your changing position
function watchMapPosition() {
    //alert("watchMapPosition");
    return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { enableHighAccuracy: false,timeout: 5000,maximumAge: 50000 });
}
var onWeatherSuccess = function (position) {
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    //alert(" onWeatherSuccess lat"+ Latitude + "lon "+ Longitude);
    getWeather(Latitude, Longitude);
}
// Get weather by using coordinates
function getWeather(latitude, longitude) {
  //alert(" getWeather lat"+ latitude + "lon "+ longitude);
  console.log(" getWeather lat"+ latitude + "lon "+ longitude);
    // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
    var OpenWeatherAppKey = "ac4af321583aa6f9cb9580218d463657";
    var queryString ='http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=imperial';
    $.getJSON(queryString, function (results) {
        if (results.weather.length) {
          $.getJSON(queryString, function (results) {
            if (results.weather.length) {
              //$('#description').text(results.name);
              $('#temp').text(((results.main.temp-32)/1.8).toFixed(1) +'º');              
              $('#humidity').text(results.main.humidity + '%');           
            }
          });
        }
    }).fail(function () {
        alert("error getting location");
    });
}
// Error callback
function onWeatherError(error) {
    alert('code onWeatherError: ' + error.code + '\n' +'message: ' + error.message + '\n');
}
// Watch your changing position
function watchWeatherPosition() {
    //alert("watchWeatherPosition");
    return navigator.geolocation.watchPosition(onWeatherWatchSuccess, onWeatherError, { enableHighAccuracy: false, timeout: 3000,maximumAge: 50000});
}
// Success callback for watching your changing position
var onWeatherWatchSuccess = function (position) {
  //alert('onWeatherWatchSuccess');
    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;
    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
        Latitude = updatedLatitude;
        Longitude = updatedLongitude;
        // Calls function we defined earlier.
        getWeather(updatedLatitude, updatedLongitude);
    }
}
function doNothing() {}

function autoCompletar() {
    
      var mapDir = new google.maps.Map(document.getElementById('mapDireccionBuscar'),{
        streetViewControl: false,
        zoomControl: true,
        rotateControl : false,
        mapTypeControl: true,
        streetViewControl: false,        
       });
//alert("1 placeCiu "+placeCiu +" ciudadN1 "+ ciudadN1 + " ciudadN2 "+ciudadN2);
        var ciudadPu = document.getElementById('ciudadMpu');
        var direccionPu = document.getElementById('direccionMPu'); 

       //{types: ['(cities)']} {types: ['address']}
       var autocompleteCiu = new google.maps.places.Autocomplete( ciudadPu, {types: ['(cities)'],componentRestrictions: {country: 'es'}} );
              
//alert("1 autocompleteCiu "+ autocompleteCiu + " autocompleteDir " +autocompleteDir);
        // Set the data fields to return when the user selects a place.
        autocompleteCiu.setFields(['address_components', 'geometry', 'icon', 'name']);        
        
//alert("2 autocompleteCiu "+ autocompleteCiu + " autocompleteDir " +autocompleteDir);
        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
//alert("infowindow " + infowindow);
        var marker = new google.maps.Marker({
          map: mapDir,
          anchorPoint: new google.maps.Point(0, -29)
        });
         ciudadPu.addEventListener('change',noCompletarCiu);
        function noCompletarCiu(){
        //if (contCiu==ContPlaceCiu) { }
           // alert("noCompletarCiu");       
                $("#mensajeErrorCiudad").html("Selecciona una ciudad de la lista. !");
                $("#btnContinuarDireccion").css({"background-color":"#808080"});
                $("#contenedorMapaDireccion").css("display", "none");
                $("#direccionMPu").val("");
                autoCCiu=0;
                ciudadN1 = '';
                ciudadN2 = '';            
        }
        autocompleteCiu.addListener('place_changed',completarCiu);        
        function completarCiu() {  
         //alert("completarCiu");          
            placeCiu = autocompleteCiu.getPlace(); 
            console.log("placeCiu "+  JSON.stringify(placeCiu));
            if (!placeCiu.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                alert("No details available for input: '" + placeCiu.name + "'");
                return;
            }            
            if (placeCiu.address_components) {
               //alert("placeCiu.address_components true");
                ciudadN1 = (placeCiu.address_components[0] && placeCiu.address_components[0].short_name);
                ciudadN2 = (placeCiu.address_components[1] && placeCiu.address_components[1].short_name);
                $("#contenedorMapaDireccion").css("display", "none");
                $('#direccionMPu').val("");
                console.log(("1 placeCiu.address_components "+ciudadN1+"/"+ciudadN2));
                
                $("#mensajeErrorCiudad").html("");
                $("#mensajeErrorDireccionT").html("");
                
                //return ciudadN1;

                linkBuscarDir=1;
                autoCCiu=1;  
            }
            else{
              alert("placeCiu.address_components false");
            }
           // console.log( JSON.stringify("2 "+ciudadN1+"/"+ciudadN2));            
        }//types: ['address'] ['geocode']
        var autocompleteDir = new google.maps.places.Autocomplete( direccionPu, {types: ['address'], componentRestrictions: {country: 'es'}} ); 
        autocompleteDir.setFields(['address_components', 'geometry', 'icon', 'name']);

        direccionPu.addEventListener('change',noCompletarDir);
            function noCompletarDir(){        
                $("#mensajeErrorDireccion").html("Selecciona una direccion de la lista. !");
                $("#btnContinuarDireccion").css({"background-color":"#808080"});
                $("#contenedorMapaDireccion").css("display", "none");
                autoCDir=0;
                //autoCCiu=0;                
                addressD1 = '';
                addressD2 = '';               
            }        
        autocompleteDir.addListener('place_changed',completarDir);
         function completarDir() {
          //alert("entra completar dir");
            $("#contenedorMapaDireccion").css("display", "block");
            infowindow.close();
            marker.setVisible(false);
            placeDir = autocompleteDir.getPlace();
            console.log( JSON.stringify(placeDir));
            if (!placeDir.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                alert("No details available for input: '" + placeDir.name + "'");
                return;
            }  
            // If the place has a geometry, then present it on a map.
            if (placeDir.geometry.viewport) {
                mapDir.fitBounds(placeDir.geometry.viewport);
            } 
            else {
                mapDir.setCenter(placeDir.geometry.location);
                mapDir.setZoom(14);  // Why 17? Because it looks good.
            }
            marker.setPosition(placeDir.geometry.location);
            marker.setVisible(true);
            //var addressD1 = '';
            //var addressD2 = '';
            if (placeDir.address_components) {
              console.log(placeDir.address_components.length);
              addressLat= placeDir.geometry.location.lat();
              addressLon= placeDir.geometry.location.lng();
              
              console.log(addressLat+"/"+addressLon);
              if (placeDir.address_components.length<=6) {//caso 1 no se ingresa numero de calle
                addressD1 = placeDir.address_components[0].short_name;//calle
                addressD2 = placeDir.address_components[1].short_name;//zona
                ciudadN1 = placeDir.address_components[1].short_name;//zona 
                ciudadN2 = placeDir.address_components[2].short_name;//ciudad
/************************Aqui implementar obtener codigo postal con lat y lng ************************************************/
                //ubicacionDir =placeDir.geometry["location"];
                $('#ciudadMpu').val(placeDir.address_components[1].short_name+", "+placeDir.address_components[2].short_name);
                $("#btnContinuarDireccion").css({"background-color":"#008080"});
              }
              else{// caso 2 si se ingresa numero de calle
                addressD1 = placeDir.address_components[1].short_name+", "+placeDir.address_components[0].short_name;//calle
                addressD2 = placeDir.address_components[2].short_name;//zona
                ciudadN1 = placeDir.address_components[2].short_name;//zona
                ciudadN2 = placeDir.address_components[3].short_name;//ciudad
                addressPostal = placeDir.address_components[6].short_name;//postal
                //ubicacionDir =placeDir.geometry["location"];
                $('#ciudadMpu').val(placeDir.address_components[2].short_name+", "+placeDir.address_components[3].short_name);
                $("#btnContinuarDireccion").css({"background-color":"#008080"});
              }              
              console.log(addressD1+"/"+addressD2);//+"/"placeDir[4].address_components[0].short_name
              //console.log( JSON.stringify(placeDir));

              $("#mensajeErrorCiudad").html("");
              $("#mensajeErrorDireccion").html("");
              $("#mensajeErrorDireccionT").html("");
              
              linkBuscarDir=1;
              autoCDir=1;
              autoCCiu=1;
              continuarDir=1;
               //alert("autoCDir "+ autoCDir); 
            }
            /*infowindowContent.children['place-icon'].src = placeDir.icon;
            infowindowContent.children['place-name'].textContent = placeDir.name;
            infowindowContent.children['place-address'].textContent = placeDir.address;
            infowindow.open(mapDir, marker);*/
        }
    }//fin autoCompletar
//callback al hacer clic en el marcador lo que hace es quitar y poner la animacion BOUNCE

function hacerFoto(){ 
  var cameraOptionsHFR = {
    quality: 25,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    //allowEdit: true,
    correctOrientation: true
  }
  //alert("hacerFoto");
  navigator.camera.getPicture(onSuccessHFR, onFail, cameraOptionsHFR);
}
function onSuccessHFR(imageURI) { 
  $("#modalRegistrarPerfil").modal("hide");   
  $("#fotoRegistro").css({"backgroundImage": "url('" + imageURI + "')","backgroundSize" : "cover"});
  $("#clist").css("visibility", "visible");
  $("#mensajefoto").css("display", "none");
  imagenPerfilRegistro=imageURI;  
}

function cargarFoto(){
  //alert("cargarFoto");
  var cameraOptionsCFR = {
    quality: 25,
    encodingType: navigator.camera.EncodingType.JPEG,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
    correctOrientation: true
  }  
  navigator.camera.getPicture(onSuccessCFR, onFail, cameraOptionsCFR);

}
function onSuccessCFR(imageURI) { 
  $("#modalRegistrarPerfil").modal("hide");    
  $("#fotoRegistro").css({"backgroundImage": "url('" + imageURI + "')","backgroundSize" : "cover"});
  $("#clist").css("visibility", "visible");
  $("#mensajefoto").css("display", "none");
  imagenPerfilRegistro=imageURI; 
}
$("#clist").click(function(event){ //click en el icono basurero para ocultar la imagen mostrada
        event.stopPropagation();
      $("#fotoRegistro").css({"background": "url(img/usuario.jpg) no-repeat center center","backgroundSize" : "cover"}); 
      $("#clist").css("visibility", "hidden");
      imagenPerfilRegistro="";
     /* $el = $('#fotoPerfil');
      $el.wrap('<form>').closest('form').get(0).reset();
      $el.unwrap();*/
});

function subirImagen(fileURL, vEmail) {
    
    console.log("subirImagen "+fileURL+" "+vEmail );       
    var optionsR = new FileUploadOptions();
    optionsR.fileKey = "fotoPerfil";
    optionsR.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    optionsR.mimeType="image/jpeg";
    optionsR.chumkedmode="false";
    optionsR.headers = { Connection: "close" }
    var miParams = {};
      miParams.EmailR = vEmail;
    optionsR.params = miParams;
      
    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://" + ipConex + "/wasiWeb/php/insertarFotoRegistro.php"), uploadSuccessR, uploadFailR, optionsR);
}

function uploadSuccessR(r) {
   console.log("uploadSuccess Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
    mfotoR=JSON.parse(r.response);
    $('mISF').html=mfotoR['msg'];
}
function uploadFailR(error) {
    alert("An error has occurred: Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
}
function registrarUsuario(){ //evento activado por onsubmit en validarformulario.js
  event.preventDefault();    
    $.ajax({
        type : 'POST',
        url: 'http://' + ipConex + '/wasiWeb/php/registrar.php',
        data:new FormData($('#formRegistro')[0]),
        dataType: 'json',
        crossDomain: true,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function(){
           //Agregamos la clase loading al body
          $('body').addClass('loading');                    
          console.log("entro a la crga del gif");
        },
        success: function(datosR){
          $("#aIngresar").tab('show');
          if(datosR.uReg==1){
            $('#mID').html("");
            $('#mIS').html(datosR.msg + " " + datosR.umEmail);
            console.log(" exito registrarUsuario "+imagenPerfilRegistro+" "+datosR.email);
            if (imagenPerfilRegistro) {                
              subirImagen(imagenPerfilRegistro, datosR.email);
            }                
          }
          if(datosR.uReg==0){
            $('#mIS').html("");
            $('#mID').html(datosR.msg);
          }
          console.log(" datosR "+datosR.uReg);
        },
        error : function(jqXHR, textStatus, errorThrown) {
            $('body').removeClass('loading'); //Removemos la clase loading
            alert("Problemas con la conexion. No se pudo registrar al usuario: " + jqXHR.status + " " + textStatus + " " + errorThrown);
        },
        complete: function(){
           //$('body').addClass('loading'); 
          $('body').removeClass('loading'); //Removemos la clase loading
        }
    });    
}
function hacerFotoEditar(){  
  var cameraOptionsHFE = {
    quality: 25,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    //allowEdit: true,
    correctOrientation: true
  }  
  navigator.camera.getPicture(onSuccessHFE, onFail, cameraOptionsHFE);
}
function onSuccessHFE(imageURI) {
  console.log("onSuccessHFE "+imageURI);
  imagenPerfilEditar=imageURI;
   
  subirImagenPerfilEditar(imageURI,$datosLocal['usrImg'], $datosLocal['usrEmail']); 
  
  $("#modalEditarPerfil").modal("hide");
  $("#fotoPerfilE").css({"backgroundImage": "url('" + imageURI + "')","background-size": "cover"});
  $("#clistA").css("visibility", "visible");
  $("#mensajefotoA").css("display", "none");  
  
}
function cargarFotoEditar(){
  
  var cameraOptionsCFE = {
    quality: 25,
    encodingType: navigator.camera.EncodingType.JPEG,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
    correctOrientation: true
  }
  
  navigator.camera.getPicture(onSuccessCFE, onFail, cameraOptionsCFE);
}
function onSuccessCFE(imageURI) { 
  console.log("onSuccessCFE "+imageURI);  
  imagenPerfilEditar=imageURI; 
  subirImagenPerfilEditar(imageURI,$datosLocal['usrImg'],$datosLocal['usrEmail']); 

  $("#modalEditarPerfil").modal("hide");   
  $("#fotoPerfilE").css({"backgroundImage": "url('" + imageURI + "')","background-size": "cover"});
  $("#clistA").css("visibility", "visible");
  $("#mensajefotoA").css("display", "none");  
}
function onFail(message) {
  alert('Failed because: ' + message);
}
 $("#clistA").click(function(event){ //click en el icono basurero para ocultar la imagen mostrada
      event.stopPropagation();
       subirImagenPerfilEditar(imagenPerfilEditar,'',$datosLocal['usrEmail']);
      $("#fotoPerfilE").css({"background": "url(./img/usuario.jpg) ","background-size": "cover"}); 
      $("#clistA").css("visibility", "hidden");
      //en este caso mandamos la img capturado por camara o galeria y enviamos vacio imagen perfi anterior      
      imagenPerfilEditar="";      
  });

function subirImagenPerfilEditar(fileURL, fileUrlAnt ,emailP) {
    console.log("subirImagenPerfilEditar IMG "+fileURL+" IMGA "+fileUrlAnt+" EMAILP "+emailP);       
    var optionsPE = new FileUploadOptions();
    optionsPE.fileKey = "fotoPerfilA";
    optionsPE.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    optionsPE.mimeType="image/jpeg";
    //optionsPE.chumkedmode="false";
    //optionsPE.headers = { Connection: "close" }
    var miParams = {};
      miParams.imgPerfilAnt=fileUrlAnt;
      miParams.emailP = emailP;
    optionsPE.params = miParams;
      
    var ft = new FileTransfer();  
    
    ft.upload(fileURL, encodeURI("http://" + ipConex + "/wasiWeb/php/insertarFotoEditar.php"), uploadSuccessPE, uploadFailPE, optionsPE);
}
function uploadSuccessPE(r) {
   console.log("uploadSuccessPE(r) Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
    $fotoA=JSON.parse(r.response);
    console.log('foto actual '+ $fotoA['fotoActual']);

    $datosLocal['usrImg']=$fotoA['fotoActual'];
    
}
function uploadFailPE(error) {
    alert("error al subir foto intente otra vez uploadFailPE : Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
    $("#fotoPerfilE").css({"background": "url(./img/usuario.jpg) ","background-size": "cover"}); 
    $("#clistA").css("visibility", "hidden");
    imagenPerfilEditar="";

}
function actualizarPerfil(cPassword)
{   event.preventDefault(); 
        
    $myFormD=new FormData($("#formPerfil")[0]);
    $myFormD.append("usrIdP",$datosLocal['usrId']);//id usuario para la 
    $myFormD.append("cambioPasswordNP",cPassword);//si cambio el password
    $myFormD.append("imgPerfilAnt",$datosLocal['usrImg']);  //imagen perfil antiguo
    $myFormD.append("imagenPerfilEditar",imagenPerfilEditar);
    $.ajax({
        type : 'POST',
        url:'http://' + ipConex + '/wasiWeb/php/actualizarPerfil.php',
        data:$myFormD,
        dataType: 'json',
        crossDomain: true,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function(){
           //Agregamos la clase loading al body
          $('body').addClass('loading');                    
          console.log("entro a la crga del gif");
        },
        success: function(datosP)
        {   //alert("exito actualizarPerfil");            
            console.log(JSON.stringify(datosP));
            $datosRemotoP=JSON.stringify(datosP);
            localStorage.setItem('datosInicioSesion', $datosRemotoP);
            $datosLocal=JSON.parse(localStorage.getItem('datosInicioSesion'));
            $("#paginaPrincipal").css("display", "none");
            $("#paginaListaMapas").css("display", "none"); 
            $("#paginaPublicar").css("display", "none");        
            $("#paginaMensaje").css("display", "none");            
            $("#paginaUsuarioPerfilEditar").css("display", "none");
            $("#paginaUsuarioPerfilMostrar").css("display","block");
            $("#divFooter").css("display", "block");

            $(".icoFooter .glyphicon-search").css({"color":"rgb(128, 128, 128,.8)"});
            $(".icoFooter .glyphicon-upload").css({"color":"rgb(128, 128, 128,.8)"});
            $(".icoFooter .glyphicon-comment").css({"color":"rgb(128, 128, 128,.8)"});
            $(".icoFooter .glyphicon-user").css({"color":"#008080"});

            $("#icoFMBuscar").css({"color":"rgb(128, 128, 128,.8)"});  
            $("#icoFMPublicar").css({"color":"rgb(128, 128, 128,.8)"});                       
            $("#icoFMMensaje").css({"color":"rgb(128, 128, 128,.8)"});            
            $("#icoFMPerfil").css({"color":"#008080"}); 
            if(datosP.uReg==1){
                $('#mPMD').html("");
                //$('#mPMS').html(datosP.msg + " id " + datosP.uPer+" em "+datosP.usrEmail+" imga "+datosP.img +" img "+datosP.usrImg);
                $("#fotoPerfilM").css({"background": "url(http://" + ipConex + "/wasiWeb/"+ $datosLocal['usrImg'] +") no-repeat center center","background-size": "cover"});
                $('#nombrePM').html($datosLocal.usrName);
                $('#apellidosPM').html($datosLocal.usrLname);
                if ($datosLocal.usrSexo==1) {
                    $("#divSexo").css({"border-color":"#999999","box-shadow":""});
                    $("#imgSexo").css({"background": "url(img/hombreG.png) no-repeat center center ","background-size": "25px 30px"});
                }
                if ($datosLocal.usrSexo==2) {
                    $("#divSexo").css({"border-color":"#999999","box-shadow":""}); 
                    $("#imgSexo").css({"background": "url(img/mujerG.png) no-repeat center center ","background-size": "25px 30px"});
                }
            }
            if(datosP.uReg==0){
                $('#mPmS').html("");
                $('#mPMD').html(datosP.msg);
            }
            //DatosLocalUpDate(datosP.uPer);    
        },
        error : function(jqXHR, textStatus, errorThrown) {
            $('body').removeClass('loading'); //Removemos la clase loading
            alert("Problemas con la conexion. No se pudo actualizar al usuario: " + jqXHR.status + " " + textStatus + " " + errorThrown);
        },
        complete: function(){
           //$('body').addClass('loading'); 
          $('body').removeClass('loading'); //Removemos la clase loading
        }
    });   
}
function hacerFotoPublicarCamara(){
  //alert("hacerFotoEditar ");
  var cameraOptionsFPC = {
    quality: 25,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    allowEdit: true,
    correctOrientation: true
  }
  //alert("hacerFoto");
  navigator.camera.getPicture(onSuccessFPC, onFailCPC, cameraOptionsFPC);
}
function onSuccessFPC(imageURI) {
  console.log('Image URI: ' + imageURI);
  console.log('img.name'+ imageURI.substr(imageURI.lastIndexOf('/') + 1));
  imagenPublicar=imageURI;
  $("#mensajeModalFotoPublicar").html("");
  //encodeURI() para codificar reemplazar espasios o caracteres especiales por code utf8
  //decodeURI() para decodificar 
  //html = "<div class = 'fotoPublicar' style='background:#141f1f url("+imagenPublicar+") no-repeat center center; background-size:cover;' ><span class='glyphicon glyphicon-trash removeImgPublicar' data-file="+imageURI.substr(imageURI.lastIndexOf('/') + 1) +"></span></div>";
  html = "<div class = 'fotoPublicar' style='background:#141f1f url("+imagenPublicar+") no-repeat center center; background-size:cover;' >";
  html +="  <span class='glyphicon glyphicon-trash removeImgPublicar' data-file="+imageURI.substr(imageURI.lastIndexOf('/') + 1) +"></span>";
  html +="</div>";
  selDiv.append(html); 
  storedFiles.push(imageURI);  
  $('#modalPublicar').modal('hide');
  $('.divImgPublicarG').css({'display':'none'});
  $('#divImgPublicarP').css({'display':'flex'});

  contImg++;
  $("#imgPublicar").data("cont",contImg);
  /*
  $('#mensajePublicar').html("contImgFPC: "+contImg); 
  $('#mensajePublicar1').html("almacenFPC: "+storedFiles.length); 
  */
  maxImg--;
  //alert('onSuccessFPC maxImg '+ maxImg +' contImg '+contImg);
  console.log('onSuccessFPC maxImg '+ maxImg +' contImg '+contImg);
  //$emailPu=$datosLocal['usrEmail']; 
  subirImagenPublicar(imageURI,$datosLocalDir["idPublicar"],$datosLocalDir["id"], $datosLocal['usrEmail']);
  //alert("tMPu "+tMPu+" pMPu "+pMPu+" cMPu "+cMPu+" contImg "+contImg );
  if (tMPu==1 && pMPu==1 && cMPu==1 && contImg > 0) {
    //alert("entra todo verdadFPC");
    $("#btnContinuarFoUb").css({"background-color":"#008080"});//color tema
  }
}
function onFailCPC(message) {
  $("#mensajeModalFotoPublicar").html("");
  $('#modalPublicar').modal('hide');
  console.log('Failed because: ' + message);
}
function cargarFotoPublicarGaleria(){
  var cameraOptionsFPG = {
    quality:50,
    maximumImagesCount: maxImg,
    width: 800
  }
  console.log("max "+JSON.stringify(cameraOptionsFPG)); 
  plugins.imagePicker.getPictures(onSuccessFPG, onFailFPG, cameraOptionsFPG);
}  
function onSuccessFPG(results) {   
  $("#mensajeModalFotoPublicar").html("");
  $('#modalPublicar').modal('hide');
  
  console.log('onSuccessFPG maxImg '+ maxImg + ' contImg ' + contImg + ' results '+ results.length);

  if (results.length > 0) {
    $('.divImgPublicarG').css({'display':'none'});
    $('#divImgPublicarP').css({'display':'flex'});
    for (var i = 0; i < results.length && i < maxImg; i++) {
      //alert("Code = " + results[i].responseCode+" Response = " + results[i].response+" Sent = " + results[i].bytesSent);
      //alert('Image URI: ' + JSON.stringify(results[i]));
      console.log('Image URI: ' + results[i]);
      //html = "<div class = 'fotoPublicar' style='background:#141f1f url("+results[i]+") no-repeat center center; background-size:cover;' ><span class='glyphicon glyphicon-trash removeImgPublicar' data-file="+encodeURI(results[i].substr(results[i].lastIndexOf('/') + 1))+"></span></div>";
      html ="<div class = 'fotoPublicar' style='background:#141f1f url("+results[i]+") no-repeat center center; background-size:cover;'>";
      html +="  <span class='glyphicon glyphicon-trash removeImgPublicar' data-file="+encodeURI(results[i].substr(results[i].lastIndexOf('/') + 1))+"></span>";
      html +="</div>";
      selDiv.append(html);
      storedFiles.push(results[i]);
      contImg++;
      subirImagenPublicar(results[i],$datosLocalDir["idPublicar"],$datosLocalDir["id"], $datosLocal['usrEmail']);        
    }
    //alert("tMPu "+tMPu+" pMPu "+pMPu+" cMPu "+cMPu+" contImg "+contImg );
  if (tMPu==1 && pMPu==1 && cMPu==1 && contImg > 0) {
    $("#btnContinuarFoUb").css({"background-color":"#008080"});//color tema
  }
    $("#imgPublicar").data("cont",contImg);
    if ((maxImg=maxImg-results.length)<0) {
      maxImg=0;

      console.log('if maxImg '+ maxImg + ' contImg ' + contImg + ' results '+ results.length);
    }    
    else
    {
      console.log(' else2 maxImg '+ maxImg + ' contImg ' + contImg + ' results '+ results.length);
    }  
  }
}
function onFailFPG(error) {
  alert('No se pudo cargar foto intente una vez mas : ' + error);
  console.log('Error: ' + error);
}
function cargarFotoBD(arrayImgUri){
console.log("cargarFotoBD "+ JSON.stringify(arrayImgUri));
  //if (results.length > 0) {
  $('.divImgPublicarG').css({'display':'none'});
  $('#divImgPublicarP').css({'display':'flex'});
  for (var i = 0; i < arrayImgUri['rutaFotoArray'].length; i++) {
    //html = "<div class = 'fotoPublicar' style='background:#141f1f url(http://" + ipConex + "/wasiWeb/"+arrayImgUri['rutaFotoArray'][i]+") no-repeat center center; background-size:cover;' ><span class='glyphicon glyphicon-trash removeImgPublicar' data-file="+arrayImgUri['rutaFotoArray'][i]+"></span></div>";
    html = "<div class = 'fotoPublicar' style='background:#141f1f url(http://" + ipConex + "/wasiWeb/"+arrayImgUri['rutaFotoArray'][i]+") no-repeat center center; background-size:cover;' >";
    html +="  <span class='glyphicon glyphicon-trash removeImgPublicar' data-file="+arrayImgUri['rutaFotoArray'][i]+"></span>";
    html +="</div>";
    selDiv.append(html);
    storedFilesDb.push(arrayImgUri['rutaFotoArray'][i]);
    
    contImg++;
    maxImg--;    
  }
  $("#imgPublicar").data("cont",contImg);
  if (tMPu==1 && pMPu==1 && cMPu==1 && contImg > 0) {
    $("#btnContinuarFoUb").css({"background-color":"#008080"});//color tema
  }
/*
  $('#mensajePublicar1').html("contImgcFBD : "+contImg);
  $('#mensajePublicar2').html("almacencFBD db : "+storedFilesDb.length);  
  $('#mensajePublicar3').html("almacencFBD : "+storedFiles.length);
  */
  console.log('storedFilesDb '+ maxImg + ' contImg ' + contImg + ' results '+ arrayImgUri['rutaFotoArray'].length);
}

$("#imgPublicar").on("click", ".removeImgPublicar", removeFile);

function removeFile(e) {
  //alert("entraremoveFile");
  var file = $(this).data("file");
  console.log("file :"+ file);
  console.log("decodeURI(file) :"+decodeURI(file));  
      
  for(var i=0;i<storedFiles.length;i++) { 
    if(storedFiles[i].substr(storedFiles[i].lastIndexOf('/')+1) === decodeURI(file)) {
      console.log("for storedFiles :"+ storedFiles.length +" i: "+i+" file: "+ decodeURI(file));   
      console.log("storedFiles :");
      storedFiles.splice(i,1);
      $.ajax({
        type: "POST",
        dataType: 'json',
        url: 'http://' + ipConex + '/wasiWeb/php/eliminarFotoPublicado.php',
        data: {idUsuario:$datosLocalDir['id'],idPublicacion:$datosLocalDir['idPublicar'],imgUri:'fotos/'+$datosLocal['usrEmail']+'/'+decodeURI(file)},                 
        crossDomain: true,
        cache: false,
        beforeSend: function(){
           //Agregamos la clase loading al body
          $('body').addClass('loading');                    
          console.log("entro a la crga del gif");
        },
        success: function(datosEFoto){                        
            console.log("datosEFoto "+datosEFoto['fotoEliminado']);                      
        },
        error : function(jqXHR, textStatus, errorThrown) {
            $('body').removeClass('loading'); //Removemos la clase loading
            alert("Problemas con la conexion. No se pude hacer la consulta: " + jqXHR.status + " " + textStatus + " " + errorThrown);
        },
        complete: function(){
           //$('body').addClass('loading'); 
          $('body').removeClass('loading'); //Removemos la clase loading
        }
      });
      break;
    }
  }
  for (var j = 0 ; j < storedFilesDb.length; j++) {    
    console.log("for storedFilesDb :"+ storedFilesDb.length +" j: "+j+" file: "+ file);
    if (storedFilesDb[j] === file) {      
      console.log("storedFilesDb :");
      storedFilesDb.splice(j,1);
      $.ajax({
        type: "POST",
        dataType: 'json',
        url: 'http://' + ipConex + '/wasiWeb/php/eliminarFotoPublicado.php',
        data: {idUsuario:$datosLocalDir['id'],idPublicacion:$datosLocalDir['idPublicar'],imgUri:file},                 
        crossDomain: true,
        cache: false,
        beforeSend: function(){
           //Agregamos la clase loading al body
          $('body').addClass('loading');                    
          console.log("entro a la crga del gif");
        },
        success: function(datosEFotoDb){                        
            console.log("datosEFoto "+datosEFotoDb['fotoEliminado']);                      
        },
        error : function(jqXHR, textStatus, errorThrown) {
            $('body').removeClass('loading'); //Removemos la clase loading
            alert("Problemas con la conexion. No se pude hacer la consulta: " + jqXHR.status + " " + textStatus + " " + errorThrown);
        },
        complete: function(){
           //$('body').addClass('loading'); 
          $('body').removeClass('loading'); //Removemos la clase loading
        }
      });  
      break;
    }
  }    
    $(this).parent().remove();
    console.log('removeFile1 contImg '+contImg+' maxImg '+maxImg);    
    contImg--;
    maxImg++;
    $("#imgPublicar").data("cont",contImg);
     
    if (storedFiles.length + storedFilesDb.length == 0) {
      $('.divImgPublicarG').css({'display':'block'});
      $('#divImgPublicarP').css({'display':'none'});
      $("#imgPublicar").data("cont",0); // no hay fotos
      $("#btnContinuarFoUb").css({"background-color":"#808080"});//gris  
    }
    console.log('removeFile2 contImg '+contImg+' maxImg '+maxImg);
    //alert('removeFile2 contImg '+contImg+' maxImg '+maxImg);
}
function subirImagenPublicar(fileURL,idPu,idUsr,emailPu) {
     //alert("subirImagenPerfilEditar IMG "+fileURL+" IMGA "+fileUrlAnt+" EMAILP "+emailP); 
     console.log("subirImagenPublicar IMG "+fileURL+" EMAILP "+emailPu);       
    var optionsP = new FileUploadOptions();
    optionsP.fileKey = "fotoPublicar";
    optionsP.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    optionsP.mimeType="image/jpeg";
    //optionsPE.chumkedmode="false";
    //optionsPE.headers = { Connection: "close" }
    var miParams = {};
      miParams.idPublicacion = idPu;
      miParams.idUsuario = idUsr;
      miParams.emailPu = emailPu;
    optionsP.params = miParams;      
    var ft = new FileTransfer();   
    ft.upload(fileURL, encodeURI("http://" + ipConex + "/wasiWeb/php/insertarFotoPublicar.php"), uploadSuccessP, uploadFailP, optionsP);
}
function uploadSuccessP(r) {
    console.log("Exito subirImagenPublicar Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);    
}
function uploadFailP(error) {
    alert("An error has occurred uploadFailPE : Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
}
function cargarPublicadosBD(arrayPubliImgUri){
  console.log("cargarPublicadosBD "+ JSON.stringify(arrayPubliImgUri));
  for (var i = 0; i < arrayPubliImgUri['publicados']; i++) {
    
    htmlPu="<div class='publicadoM' id="+arrayPubliImgUri['idPubliArray'][i] +">";
    htmlPu+="<div class='fotoPublicadoM'>";
    htmlPu+=" <img src=http://"+ipConex+"/wasiWeb/"+arrayPubliImgUri['rutaFotoArray'][i]+" class='imgPubli'>";
    htmlPu+=" <span class='glyphicon glyphicon-pencil editarPublicadoM' data-file="+arrayPubliImgUri['idPubliArray'][i] +"></span>";
    htmlPu+=" <span class='glyphicon glyphicon-trash removePublicadoM' data-file="+arrayPubliImgUri['idPubliArray'][i] +"></span>";
    htmlPu+="</div>";
    htmlPu+="<div class='mensajePublicadoM'>";
    htmlPu+=" <div class='strPreTiPublicado'>"+arrayPubliImgUri['precioArray'][i]+"€/m</div>";                        
    htmlPu+=" <div class='strPreTiPublicado'>"+arrayPubliImgUri['tituloArray'][i]+"</div>";                        
    htmlPu+=" <div class='zonaPublicado'>"+arrayPubliImgUri['zonaArray'][i]+"</div>";                        
    htmlPu+="</div>";                      
    selDivPu.append(htmlPu);     
  }  
}
$("#contenedorFotoMensajePublicados").on("click", ".removePublicadoM", removePublicado);  
function removePublicado(e) {
  //Ingresamos un mensaje a mostrar
  var mensaje = confirm("¿Quieres eliminar esta publicacion?");
  //Detectamos si el usuario acepto el mensaje
  if (mensaje) {
  var file = $(this).data("file");
  console.log("confirm remove:"+ file);
  $(this).parent().parent().remove();    
  }
  //Detectamos si el usuario denegó el mensaje
  else {
  console.log("calncel remove:"+ file);
  }
  
  
}
$("#contenedorFotoMensajePublicados").on("click", ".editarPublicadoM", editarPublicado);

function editarPublicado(e) {  
  var idPublicacion = $(this).data("file");
  console.log("idPublicacion :"+ idPublicacion);
  $.ajax({
        type: "POST",
        dataType: 'json',
        url: 'http://' + ipConex + '/wasiWeb/php/editarPublicado.php',
        data: {idUsuario:$datosLocal['usrId'],idPublicacion:idPublicacion},                 
        crossDomain: true,
        cache: false,
        beforeSend: function(){
           //Agregamos la clase loading al body
          $('body').addClass('loading');                    
          console.log("entro a la crga del gif");
        },
        success: function(datosEPubli){ 
            $datosRemotoConsultarDir=JSON.stringify(datosEPubli);
            localStorage.setItem('datosDir', $datosRemotoConsultarDir);
            $datosLocalDir=JSON.parse(localStorage.getItem('datosDir'));                       
            console.log("datosEPubli "+JSON.stringify(datosEPubli));
            if ($datosLocalDir['publicado']==1) {//en esta caso ya esta publicado, se pide una solicitud para editar
              $(".div-custom-principal .divPublicar").css({"padding":"0px","background-color": "#f2f2f2"});
              $("#paginaPrincipal").css("display", "none");
              $("#paginaListaMapas").css("display", "none");
              
              $("#paginaPublicar").css("display", "block");

              $("#publicarDireccion").css("display","block");
              $("#contenedorMapaDireccion").css("display", "none");
              $("#publicarFotoUbicacion").css("display","none");
              $("#publicarVivienda").css("display","none");
              $("#publicarServicios").css("display","none");        
              $("#publicarHabitacion").css("display","none");        
              //$("#paginaMensaje").css("display", "none");            
              $("#paginaUsuarioPerfilEditar").css("display", "none");
              $("#paginaUsuarioPerfilMostrar").css("display", "none");

              $("#divFooter").css("display", "none");
              $(".container-custom-principal .progressbar-bar-custom").css("width", "25%");
              
              $('#ciudadMpu').val($datosLocalDir['ciudad']);
              $('#direccionMPu').val($datosLocalDir['direccion']+", "+$datosLocalDir['zona']);
              $("#btnContinuarDireccion").css({"background-color":"#008080"});
              linkBuscarDir=1;
              autoCDir=1;
              autoCCiu=1;
              btnEditarPublicadoM=1;
              btnAtrasDir = 0;                        
              continuarDir = 0;              
            }          
        },
        error : function(jqXHR, textStatus, errorThrown) {
            $('body').removeClass('loading'); //Removemos la clase loading
            alert("Problemas con la conexion. No se pude hacer la consulta: " + jqXHR.status + " " + textStatus + " " + errorThrown);
        },
        complete: function(){
           //$('body').addClass('loading'); 
          $('body').removeClass('loading'); //Removemos la clase loading
        }
      });
  
}