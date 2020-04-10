var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: true, timeout: 3000,maximumAge: 50000 }); 
        //watchMapPosition();
        //navigator.camera.PictureSourceType.PHOTOLIBRARY;
        //watchWeatherPosition(); reinicia varias veces 
        autoCompletar();
    },
    receivedEvent: function(id) {       
       //watchWeatherPosition();
       //navigator.geolocation.getCurrentPosition(onWeatherSuccess, onWeatherError, { enableHighAccuracy: true, timeout: 3000});      
    }
};
app.initialize();
var ipConex = '192.168.1.110';
var Latitude = undefined;
var Longitude = undefined;
var selDiv = "";//div para publicar imagen
var selDivSe = "";//div para publicar servicios
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
var customLabel = {restaurant: {label: 'R'}, bar: {label: 'B'},casa:{label: 'C'}};
var placeCiu = '';//almacenar direcion ciudad de google places

var ciudadN1 = '';//almacenar zona obtenidos de placeCiu
var ciudadN2 = '';//almacenar ciudad obtenidos de placeCiu
var placeDir = '';// almacenar direcion de google places
var addressD1 = '';//alamcenar direccion de placedir
var addressD2 = '';//alamcenar zona de placedir
var addressLat='';//almacenar latitud de la direccion
var addressLon='';//almacenar longitud de la direccion
var continuarDir='';//no hay direcion guardada
var continuarFUbi='';//no hay direcion guardada
var continuarVi='';//no hay datos de vivienda y servicios guardada
var guardarSe = 0;//no hay servicios guardados se inserta por primera vez
var btnAtrasFoto = 0;//si se presion btn atras foto ubicacion
var btnAtrasVi= 0;//si se presion btn atras vivienda
var btnAtrasSe = 0;//variable boton atras servicio
var btnAtrasHabi= 0;//si se presion btn atras Habitacion
var tMPu = 0; //titulo para validar de la publicacion en zona fotos
var pMPu = 0; //precio para validar  de la publicacion en zona fotos
var cMPu = 0;//comentario para validar de la publicacion en zona fotos
var sMPu = 0;//superficie para validar de la publicacion en zona vivienda
var qMPu = 0;//que publicas para validar de la publicacion en zona vivienda
var cHoMPu = 0;//cuantos hombres comparten  para validar de la publicacion en zona vivienda
var cMuMPu = 0;//cuantos mujeres comparten  para validar de la publicacion en zona vivienda
var asMPu = caMPu = esMPu = laMPu = lavMPu = muMPu = pisMPu = poMPu = raMPu = seMPu = tvMPu = wifiMPu = 0;//los ervicios de vivienda
var camaMPu = 0;//como es la cama para validar de la publicacion zona habitacion
var inFMPu = 0;//fecha desde  para validar de la publicacion zona habitacion
var finFMPu = 0;//fecha hasta  para validar de la publicacion zona habitacion
var inMMPu = 1;//tiempo minimo 1 mes para validar de la publicacion zona habitacion
var finMMPu = 0;//tiempo maximo mes para validar de la publicacion zona habitacion
var dimMPu = 0;//dimensiones de la habitacion para validar de la publicacion zona habitacion

// Success callback for get geo coordinates

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
    //alert( "getMap "+latitude+" "+longitude);
    console.log( "getMap "+latitude+" "+longitude);
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        scrollwheel: false,
        zoomControl: true,
        rotateControl : false,
        mapTypeControl: true,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var latLong = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({position: latLong});
    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());

     var infoWindow = new google.maps.InfoWindow;

          // Change this depending on the name of your PHP or XML file
          downloadUrl('http://'+ipConex+'/wasiWeb/php/marcas.php', function(data) {
            var xml = data.responseXML;
            var markers = xml.documentElement.getElementsByTagName('marker');
            Array.prototype.forEach.call(markers, function(markerElem) {
              var id = markerElem.getAttribute('id_p');
              var name = markerElem.getAttribute('zona');
              var address = markerElem.getAttribute('dir');
              var type = markerElem.getAttribute('tipo');
              var point = new google.maps.LatLng(
                  parseFloat(markerElem.getAttribute('lat')),
                  parseFloat(markerElem.getAttribute('lng')));

              var infowincontent = document.createElement('div');
              var strong = document.createElement('strong');
              strong.textContent = name
              infowincontent.appendChild(strong);
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
              });
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
    alert(" onWeatherSuccess lat"+ Latitude + "lon "+ Longitude);
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
              $('#description').text(results.name);
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
    //alert("autoCompletar");
      /*  var ciudadN1 = '';
      var ciudadN2 = '';
      var placeCiu = '';*/
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
            alert("noCompletarCiu");       
                $("#mensajeErrorCiudad").html("Selecciona una ciudad de la lista. !");
                $("#btnContinuarDireccion").css({"background-color":"#808080"});
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
                ciudadN1 = (placeCiu.address_components[0] && placeCiu.address_components[0].short_name);
                ciudadN2 = (placeCiu.address_components[1] && placeCiu.address_components[1].short_name);
                $("#contenedorMapaDireccion").css("display", "none");
                $('#direccionMPu').val("");
                console.log(("1 "+ciudadN1+"/"+ciudadN2));
                
                $("#mensajeErrorCiudad").html("");
                $("#mensajeErrorDireccionT").html("");
                linkBuscarDir=1;
                autoCCiu=1;  
            }
           // console.log( JSON.stringify("2 "+ciudadN1+"/"+ciudadN2));            
        }
        var autocompleteDir = new google.maps.places.Autocomplete( direccionPu, {types: ['address'], componentRestrictions: {country: 'es'}} ); 
        autocompleteDir.setFields(['address_components', 'geometry', 'icon', 'name']);
        direccionPu.addEventListener('change',noCompletarDir);
            function noCompletarDir(){        
                $("#mensajeErrorDireccion").html("Selecciona una direccion de la lista. !");
                $("#btnContinuarDireccion").css({"background-color":"#808080"});
                autoCDir=0;
                autoCCiu=0;                
                addressD1 = '';
                addressD2 = '';               
            }        
        autocompleteDir.addListener('place_changed',completarDir);
         function completarDir() {
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
              if (placeDir.address_components.length<=6) {//caso 1 no se ingresa numero de calle
                addressD1 = placeDir.address_components[0].short_name;//calle
                addressD2 = placeDir.address_components[1].short_name;//zona
                ciudadN1 = placeDir.address_components[1].short_name;//zona 
                ciudadN2 = placeDir.address_components[2].short_name;//ciudad
                
                //ubicacionDir =placeDir.geometry["location"];
                $('#ciudadMpu').val(placeDir.address_components[1].short_name+", "+placeDir.address_components[2].short_name);
                $("#btnContinuarDireccion").css({"background-color":"#008080"});
              }
              else{// caso 2 si se ingresa numero de calle
                addressD1 = placeDir.address_components[1].short_name+", "+placeDir.address_components[0].short_name;//calle
                addressD2 = placeDir.address_components[2].short_name;//zona
                ciudadN1 = placeDir.address_components[2].short_name;//zona
                ciudadN2 = placeDir.address_components[3].short_name;//ciudad
                //ubicacionDir =placeDir.geometry["location"];
                $('#ciudadMpu').val(placeDir.address_components[2].short_name+", "+placeDir.address_components[3].short_name);
                $("#btnContinuarDireccion").css({"background-color":"#008080"});
              }
              addressLat= placeDir.geometry.location.lat();
              addressLon= placeDir.geometry.location.lng();
              console.log((addressD1+"/"+addressD2));
              console.log(addressLat+"/"+addressLon);
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
    allowEdit: true,
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
    //alert("subirImagen "+fileURL+" "+vEmail ); 
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
   // alert("uploadSuccess Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
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
        success: function(datosR)
        {  $("#aIngresar").tab('show');
            if(datosR.uReg==1){
              //aqui file uploader 
                $('#mID').html("");
                $('#mIS').html(datosR.msg + " " + datosR.umEmail);
               // alert(" exito registrarUsuario "+imagenPerfilRegistro+" "+datosR.email);
                if (imagenPerfilRegistro) {                
                subirImagen(imagenPerfilRegistro, datosR.email);
                }                
              }
                if(datosR.uReg==0){
                    $('#mIS').html("");
                    $('#mID').html(datosR.msg);
                  }
                //alert(datosR.uReg);
        },
        error : function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status +" "+ textStatus+" "+ errorThrown);
        }
    });    
}
function hacerFotoEditar(){
  //alert("hacerFotoEditar ");
  var cameraOptionsHFE = {
    quality: 25,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    allowEdit: true,
    correctOrientation: true
  }
  //alert("hacerFoto");
  navigator.camera.getPicture(onSuccessHFE, onFail, cameraOptionsHFE);
}
function onSuccessHFE(imageURI) {
  //alert("onSuccessHFE "+imageURI);
  imagenPerfilEditar=imageURI;
  // $imgPerfilAnt=$datosLocal['usrImg']; 
  subirImagenPerfilEditar(imageURI,$datosLocal['usrImg'], $datosLocal['usrEmail']); 
  
  $("#modalEditarPerfil").modal("hide");
  $("#fotoPerfilE").css({"backgroundImage": "url('" + imageURI + "')","background-size": "cover"});
  $("#clistA").css("visibility", "visible");
  $("#mensajefotoA").css("display", "none");  
  //$("#aa").html(imageURI);
}
function cargarFotoEditar(){
  //alert("cargarFotoEditar");
  var cameraOptionsCFE = {
    quality: 25,
    encodingType: navigator.camera.EncodingType.JPEG,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
    correctOrientation: true
  }
  //alert("hacerFoto");
  navigator.camera.getPicture(onSuccessCFE, onFail, cameraOptionsCFE);
}
function onSuccessCFE(imageURI) { 
  //alert("onSuccessCFE "+imageURI);  
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
     //alert("subirImagenPerfilEditar IMG "+fileURL+" IMGA "+fileUrlAnt+" EMAILP "+emailP);       
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
    ft.onprogress = function(progressEvent) {
      if (progressEvent.lengthComputable) {
          loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
      } 
      else {
        loadingStatus.increment();
      }
    };
    ft.upload(fileURL, encodeURI("http://" + ipConex + "/wasiWeb/php/insertarFotoEditar.php"), uploadSuccessPE, uploadFailPE, optionsPE);
}

function uploadSuccessPE(r) {
   // alert("Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
    $fotoA=JSON.parse(r.response);
    //alert('fotoA '+ $fotoA['fotoActual']);

    $datosLocal['usrImg']=$fotoA['fotoActual'];
    
}
function uploadFailPE(error) {
    alert("An error has occurred uploadFailPE : Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
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
                $('#mPMS').html(datosP.msg + " id " + datosP.uPer+" em "+datosP.usrEmail+" imga "+datosP.img +" img "+datosP.usrImg);
                $("#fotoPerfilM").css({"background": "url(http://" + ipConex + "/wasiWeb/"+ $datosLocal['usrImg'] +") no-repeat center center","background-size": "cover"});
                $('#nombrePM').html($datosLocal.usrName);
                $('#apellidosPM').html($datosLocal.usrLname);
                if ($datosLocal.usrSexo==1) {
                    $("#divSexo").css({"border-color":"#999999","box-shadow":""});
                    $("#imgSexo").css({"background": "url(img/hombreG.png) no-repeat center center ","background-size": "20px 20px"});
                }
                if ($datosLocal.usrSexo==2) {
                    $("#divSexo").css({"border-color":"#999999","box-shadow":""}); 
                    $("#imgSexo").css({"background": "url(img/mujerG.png) no-repeat center center ","background-size": "20px 20px"});
                }
            }
            if(datosP.uReg==0){
                $('#mPmS').html("");
                $('#mPMD').html(datosP.msg);
            }
            //DatosLocalUpDate(datosP.uPer);    
        },
        error : function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status +" "+ textStatus+" "+ errorThrown);
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
  var html = "<div class = 'fotoPublicar' style='background:#141f1f url("+imagenPublicar+") no-repeat center center; background-size:cover;' ><span class='glyphicon glyphicon-trash removeImgPublicar' data-file="+imageURI.substr(imageURI.lastIndexOf('/') + 1) +"></span></div>";
  selDiv.append(html); 
  storedFiles.push(imageURI);  
  $('#modalPublicar').modal('hide');
  $('.divImgPublicarG').css({'display':'none'});
  $('#divImgPublicarP').css({'display':'flex'});

  contImg++;
  $("#imgPublicar").data("cont",contImg);
  $('#mensajePublicar').html("contImgFPC: "+contImg); 
  $('#mensajePublicar1').html("almacenFPC: "+storedFiles.length); 
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
  alert('onSuccessFPG maxImg '+ maxImg + ' contImg ' + contImg + ' results '+ results.length);

  if (results.length > 0) {
    $('.divImgPublicarG').css({'display':'none'});
    $('#divImgPublicarP').css({'display':'flex'});
    for (var i = 0; i < results.length && i < maxImg; i++) {
      //alert("Code = " + results[i].responseCode+" Response = " + results[i].response+" Sent = " + results[i].bytesSent);
      //alert('Image URI: ' + JSON.stringify(results[i]));
      console.log('Image URI: ' + results[i]);
      var html = "<div class = 'fotoPublicar' style='background:#141f1f url("+results[i]+") no-repeat center center; background-size:cover;' ><span class='glyphicon glyphicon-trash removeImgPublicar' data-file="+encodeURI(results[i].substr(results[i].lastIndexOf('/') + 1))+"></span></div>";
      selDiv.append(html);
      storedFiles.push(results[i]);
      contImg++;
      subirImagenPublicar(results[i],$datosLocalDir["idPublicar"],$datosLocalDir["id"], $datosLocal['usrEmail']);        
    }
    //alert("tMPu "+tMPu+" pMPu "+pMPu+" cMPu "+cMPu+" contImg "+contImg );
  if (tMPu==1 && pMPu==1 && cMPu==1 && contImg > 0) {
    alert("entra todo verdadFPG");
    $("#btnContinuarFoUb").css({"background-color":"#008080"});//color tema
  }
    $("#imgPublicar").data("cont",contImg);
    $('#mensajePublicar').html("contImgFPG: "+contImg);
    $('#mensajePublicar1').html("almacenFPG: "+storedFiles.length);
    if ((maxImg=maxImg-results.length)<0) {
      maxImg=0;
      alert('if maxImg '+ maxImg + ' contImg ' + contImg + ' results '+ results.length);
    }    
    else
    {
      alert(' else2 maxImg '+ maxImg + ' contImg ' + contImg + ' results '+ results.length);
    }  
  }
}
function onFailFPG(error) {
  alert('Error: ' + error);
  console.log('Error: ' + error);
}
function cargarFotoBD(arrayImgUri){
console.log("cargarFotoBD "+ JSON.stringify(arrayImgUri));
  //if (results.length > 0) {
  $('.divImgPublicarG').css({'display':'none'});
  $('#divImgPublicarP').css({'display':'flex'});
  for (var i = 0; i < arrayImgUri['rutaFotoArray'].length; i++) {
    var html = "<div class = 'fotoPublicar' style='background:#141f1f url(http://" + ipConex + "/wasiWeb/"+arrayImgUri['rutaFotoArray'][i]+") no-repeat center center; background-size:cover;' ><span class='glyphicon glyphicon-trash removeImgPublicar' data-file="+arrayImgUri['rutaFotoArray'][i]+"></span></div>";
    selDiv.append(html);
    storedFilesDb.push(arrayImgUri['rutaFotoArray'][i]);
    //storedFiles.push(arrayImgUri['rutaFoto'][i]);
    contImg++;
    maxImg--;    
  }
  $("#imgPublicar").data("cont",contImg);
  if (tMPu==1 && pMPu==1 && cMPu==1 && contImg > 0) {
    $("#btnContinuarFoUb").css({"background-color":"#008080"});//color tema
  }
  $('#mensajePublicar1').html("contImgcFBD : "+contImg);
  $('#mensajePublicar2').html("almacencFBD db : "+storedFilesDb.length);  
  $('#mensajePublicar3').html("almacencFBD : "+storedFiles.length);
  console.log('storedFilesDb '+ maxImg + ' contImg ' + contImg + ' results '+ arrayImgUri['rutaFotoArray'].length);
}

$("#imgPublicar").on("click", ".removeImgPublicar", removeFile);

function removeFile(e) {
  //alert("entraremoveFile");
  var file = $(this).data("file");
  console.log("file :"+ file);
  console.log("decodeURI(file) :"+decodeURI(file));
  
  //decodeURI(file) decodifica los espacion y otros ()    
  for(var i=0;i<storedFiles.length;i++) { 
  //alert("for storedFiles :"+ storedFiles.length +" i: "+i+" file: "+ decodeURI(file));   
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
        success: function(datosEFoto){                        
            console.log("datosEFoto "+datosEFoto['fotoEliminado']);                      
        },
        error : function(jqXHR, textStatus, errorThrown) {
            alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
        }
      });
      break;
    }
  }
  for (var j = 0 ; j < storedFilesDb.length; j++) {
    //alert("for storedFilesDb :"+ storedFilesDb.length +" j: "+j+" file: "+ file);
    console.log("for storedFilesDb :"+ storedFilesDb.length +" j: "+j+" file: "+ file);
    if (storedFilesDb[j] === file) {
      //alert("entra storedFilesDb");
      console.log("storedFilesDb :");
      storedFilesDb.splice(j,1);
      $.ajax({
        type: "POST",
        dataType: 'json',
        url: 'http://' + ipConex + '/wasiWeb/php/eliminarFotoPublicado.php',
        data: {idUsuario:$datosLocalDir['id'],idPublicacion:$datosLocalDir['idPublicar'],imgUri:file},                 
        crossDomain: true,
        cache: false,
        success: function(datosEFotoDb){                        
            console.log("datosEFoto "+datosEFotoDb['fotoEliminado']);                      
        },
        error : function(jqXHR, textStatus, errorThrown) {
            alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
        }
      });  
      break;
    }
  }    
    $(this).parent().remove();
    console.log('removeFile1 contImg '+contImg+' maxImg '+maxImg);
    //alert('removeFile1 contImg '+contImg+' maxImg '+maxImg);
    contImg--;
    maxImg++;
    $("#imgPublicar").data("cont",contImg);
    
    $('#mensajePublicar1').html("contImgremoveFil : "+contImg);
    $('#mensajePublicar2').html("almacenremoveFil db: "+storedFilesDb.length);
    $('#mensajePublicar3').html("almacenremoveFil: "+storedFiles.length);    
    
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
   //alert("Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
    console.log("Exito subirImagenPublicar Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
    //$fotoA=JSON.parse(r.response);
    //alert('fotoA '+ $fotoA['fotoActual']);

    //$datosLocal['usrImg']=$fotoA['fotoActual'];
    
}
function uploadFailP(error) {
    alert("An error has occurred uploadFailPE : Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
    

}