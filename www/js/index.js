var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: false, timeout: 3000,maximumAge: 50000 }); 
        watchMapPosition();
        watchWeatherPosition();
        autoCompletar();

    },
    receivedEvent: function(id) {
       
       //watchWeatherPosition();
       //navigator.geolocation.getCurrentPosition(onWeatherSuccess, onWeatherError, { enableHighAccuracy: true, timeout: 3000});      
    }
};
app.initialize();
var Latitude = undefined;
var Longitude = undefined;
var imagenPerfilRegistro = "";
var imagenPerfilEditar = "";
var imgPerfilAnt="";// guarda img anterior para comparar con el actua si es lo mismo    
var customLabel = {restaurant: {label: 'R'}, bar: {label: 'B'},casa:{label: 'C'}};

// Success callback for get geo coordinates

var onMapSuccess = function (position) {
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    alert( "onMapSuccess "+Latitude+" "+Longitude);
    getMap(Latitude, Longitude);
    getWeather(Latitude, Longitude);
}
// Get map by using coordinates
function getMap(latitude, longitude) {
    alert( "getMap "+latitude+" "+longitude);
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
          downloadUrl('http://192.168.0.21/wasiWeb/php/marcas.php', function(data) {
            var xml = data.responseXML;
            var markers = xml.documentElement.getElementsByTagName('marker');
            Array.prototype.forEach.call(markers, function(markerElem) {
              var id = markerElem.getAttribute('id_p');
              var name = markerElem.getAttribute('nombre');
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
    console.log('code: ' + error.code + '\n' +'message: ' + error.message + '\n');
}
// Watch your changing position
function watchMapPosition() {
    //alert("watchMapPosition");
    return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { enableHighAccuracy: false,timeout: 3000,maximumAge: 50000 });
}
/*var onWeatherSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    alert(" onWeatherSuccess lat"+ Latitude + "lon "+ Longitude);
    getWeather(Latitude, Longitude);
}*/
// Get weather by using coordinates
function getWeather(latitude, longitude) {
   // alert(" getWeather lat"+ latitude + "lon "+ longitude);
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
   // alert("watchWeatherPosition");
    return navigator.geolocation.watchPosition(onWeatherWatchSuccess, onWeatherError, { enableHighAccuracy: false, timeout: 3000,maximumAge: 50000});
}
// Success callback for watching your changing position
var onWeatherWatchSuccess = function (position) {
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
    /*$("#mapDireccionBuscar").css("display", "block"); 
    $("#mapDireccionLink").css("display", "none");*/

       var mapDir = new google.maps.Map(document.getElementById('mapDireccionBuscar'),{
        streetViewControl: false,
        zoomControl: true,
        rotateControl : false,
        mapTypeControl: true,
        streetViewControl: false,
        
       });

        var ciudadPu = document.getElementById('ciudadMpu');
        var direccionPu = document.getElementById('direccionMPu'); 

       //{types: ['(cities)']} {types: ['address']}
       var autocompleteCiu = new google.maps.places.Autocomplete( ciudadPu, {types: ['(cities)']} );
       var autocompleteDir = new google.maps.places.Autocomplete( direccionPu, {types: ['address']} );        

        // Set the data fields to return when the user selects a place.
        autocompleteCiu.setFields(['address_components', 'geometry', 'icon', 'name']);        
        autocompleteDir.setFields(['address_components', 'geometry', 'icon', 'name']);

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
          map: mapDir,
          anchorPoint: new google.maps.Point(0, -29)
        });
        autocompleteCiu.addListener('place_changed', function() {
            var placeCiu = autocompleteCiu.getPlace();
            console.log( JSON.stringify(placeCiu));
            if (!placeCiu.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                alert("No details available for input: '" + placeCiu.name + "'");
                return;
            }        
            var ciudadN1 = '';
            var ciudadN2 = '';
            if (placeCiu.address_components) {
                ciudadN1 = (placeCiu.address_components[0] && placeCiu.address_components[0].short_name);
                ciudadN2 = (placeCiu.address_components[1] && placeCiu.address_components[1].short_name);
                $("#contenedorMapaDireccion").css("display", "none");
                $('#direccionMPu').val("");
                console.log( JSON.stringify(ciudadN1+"/"+ciudadN2));
            }
        });
        
        autocompleteDir.addListener('place_changed', function() {
            //alert("autocompleteDir place_changed");
            infowindow.close();
            marker.setVisible(false);
            var placeDir = autocompleteDir.getPlace();
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
            var addressD1 = '';
            var addressD2 = '';
            if (placeDir.address_components) {
                addressD1 = placeDir.address_components[0].short_name;
                addressD2 = placeDir.address_components[1].short_name;
                $('#ciudadMpu').val(placeDir.address_components[2].short_name+", "+placeDir.address_components[3].short_name);
                console.log( JSON.stringify(addressD1+"/"+addressD2));
            }
            /*infowindowContent.children['place-icon'].src = placeDir.icon;
            infowindowContent.children['place-name'].textContent = placeDir.name;
            infowindowContent.children['place-address'].textContent = placeDir.address;
            infowindow.open(mapDir, marker);*/

        });
    }//fin autoCompletar
//callback al hacer clic en el marcador lo que hace es quitar y poner la animacion BOUNCE

function hacerFoto(){
  var cameraOptionsHF = {
    quality: 25,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    allowEdit: true,
    correctOrientation: true
  }
  //alert("hacerFoto");
  navigator.camera.getPicture(onSuccessHF, onFail, cameraOptionsHF);
}
function onSuccessHF(imageURI) {
 // alert(imageURI);
  $("#modalRegistrarPerfil").modal("hide");
   
  $("#fotoRegistro").css({"backgroundImage": "url('" + imageURI + "')","backgroundSize" : "150px 150px"});
  $("#clist").css("visibility", "visible");
  $("#mensajefoto").css("display", "none");
  imagenPerfilRegistro=imageURI;
  
  //$("#aa").html(imageURI);
}
function cargarFoto(){
  //alert("cargarFoto");
  var cameraOptionsCF = {
    quality: 25,
    encodingType: navigator.camera.EncodingType.JPEG,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
    correctOrientation: true
  }
  //alert("hacerFoto");
  navigator.camera.getPicture(onSuccessCF, onFail, cameraOptionsCF);
}
function onSuccessCF(imageURI) {
  //alert(JSON.stringify(imageURI));
  $("#modalRegistrarPerfil").modal("hide");
  //event.preventDefault();
  //var image = document.getElementById('fotoLocal');
  //image.src = imageURI;
  //subirImagen(imageURI);  
  $("#fotoRegistro").css({"backgroundImage": "url('" + imageURI + "')","backgroundSize" : "150px 150px"});
  $("#clist").css("visibility", "visible");
  $("#mensajefoto").css("display", "none");
  imagenPerfilRegistro=imageURI;
  
  //$("#aa").html(imageURI);
}
$("#clist").click(function(event){ //click en el icono basurero para ocultar la imagen mostrada
        event.stopPropagation();
      $("#fotoRegistro").css({"background": "url(img/usuario.jpg) no-repeat center center","backgroundSize" : "150px 150px"}); 
      $("#clist").css("visibility", "hidden");
      imagenPerfilRegistro="";
     /* $el = $('#fotoPerfil');
      $el.wrap('<form>').closest('form').get(0).reset();
      $el.unwrap();*/
});

function subirImagen(fileURL, vEmail) {
    alert("subirImagen "+fileURL+" "+vEmail );       
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
    ft.upload(fileURL, encodeURI("http://192.168.0.21/wasiWeb/php/insertarFotoRegistro.php"), uploadSuccessR, uploadFailR, optionsR);
}

function uploadSuccessR(r) {
    alert("uploadSuccess Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
    //var image = document.getElementById('fotoServidor');
    //image.src = r.response;
}

function uploadFailR(error) {
    alert("An error has occurred: Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
}

function registrarUsuario(){ //evento activado por onsubmit en validarformulario.js
  event.preventDefault();    
    $.ajax({
        type : 'POST',
        url: 'http://192.168.0.21/wasiWeb/php/registrar.php',
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
                alert(" exito registrarUsuario "+imagenPerfilRegistro+" "+datosR.email);
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
  alert("hacerFotoEditar");
  var cameraOptionsHF = {
    quality: 25,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    allowEdit: true,
    correctOrientation: true
  }
  //alert("hacerFoto");
  navigator.camera.getPicture(onSuccessHFE, onFail, cameraOptionsHF);
}
function onSuccessHFE(imageURI) {
  alert("onSuccessHFE "+imageURI);
  $("#modalEditarPerfil").modal("hide");
   
  $("#fotoPerfilE").css({"backgroundImage": "url('" + imageURI + "')","background-size": "cover"});
  $("#clistA").css("visibility", "visible");
  $("#mensajefotoA").css("display", "none");
  imagenPerfilEditar=imageURI;
  
  //$("#aa").html(imageURI);
}
function cargarFotoEditar(){
  alert("cargarFotoEditar");
  var cameraOptionsCF = {
    quality: 25,
    encodingType: navigator.camera.EncodingType.JPEG,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
    correctOrientation: true
  }
  //alert("hacerFoto");
  navigator.camera.getPicture(onSuccessCFE, onFail, cameraOptionsCF);
}
function onSuccessCFE(imageURI) { 
  alert("onSuccessCFE "+imageURI);
  $("#modalEditarPerfil").modal("hide");   
  $("#fotoPerfilE").css({"backgroundImage": "url('" + imageURI + "')","background-size": "cover"});
  $("#clistA").css("visibility", "visible");
  $("#mensajefotoA").css("display", "none");
  imagenPerfilEditar=imageURI;  
}

function onFail(message) {
  alert('Failed because: ' + message);
}
 $("#clistA").click(function(event){ //click en el icono basurero para ocultar la imagen mostrada
      event.stopPropagation();
      //mensajefotoalert("The p element was clicked.");
      $("#fotoPerfilE").css({"background": "url(img/usuario.jpg) no-repeat center center","background-size": "cover"}); 
      $("#clistA").css("visibility", "hidden");
      imagenPerfilEditar="";
    /*  $el = $('#fotoPerfilA');
      $el.wrap('<form>').closest('form').get(0).reset();
      $el.unwrap();*/
  });

function subirImagenPerfilEditar(fileURL, fileUrlAnt ,emailP) {
     alert("subirImagenPerfilEditar"+" "+fileURL+" "+fileUrlAnt+" "+emailP);       
    var optionsPE = new FileUploadOptions();
    optionsPE.fileKey = "fotoPerfilA";
    optionsPE.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    optionsPE.mimeType="image/jpeg";
    optionsPE.chumkedmode="false";
    optionsPE.headers = { Connection: "close" }
    var miParams = {};
      miParams.imgPerfilAnt=fileUrlAnt;
      miParams.emailP = emailP;
    optionsPE.params = miParams;
      
    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://192.168.0.21/wasiWeb/php/insertarFotoEditar.php"), uploadSuccessPE, uploadFailPE, optionsPE);
}

function uploadSuccessPE(r) {
    alert("Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
    //$("#fotoPerfilM").css({"background": "url(http://192.168.0.21/wasiWeb/"+ $datosLocal['usrImg'] +") no-repeat center center ","background-size": "cover"});
    //var image = document.getElementById('fotoServidor');
    //image.src = r.response;
}
function uploadFailPE(error) {
    alert("An error has occurred: Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
}
function actualizarPerfil(cPassword)
{   event.preventDefault(); 
    $imgPerfilAnt=$datosLocal['usrImg'];
    if (imagenPerfilEditar) {
      subirImagenPerfilEditar(imagenPerfilEditar,$imgPerfilAnt, $datosLocal['usrEmail']);
    }
    
    $myFormD=new FormData($("#formPerfil")[0]);
    $myFormD.append("usrIdP",$datosLocal['usrId']);//id usuario para la consulta
    $myFormD.append("cambioPasswordNP",cPassword);//si cambio el password
    //$myFormD.append("imgPerfilAnt",$imgPerfilAnt);  //imagen perfil antiguo
    $.ajax({
        type : 'POST',
        url:'http://192.168.0.21/wasiWeb/php/actualizarPerfil.php',
        data:$myFormD,
        dataType: 'json',
        crossDomain: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function(datosP)
        {  alert("exito actualizarPerfil");            
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
                $('#mPMS').html(datosP.msg + " " + datosP.uPer+" "+datosP.usrEmail+" "+datosP.img +" "+datosP.imga);
                $("#fotoPerfilM").css({"background": "url(http://192.168.0.21/wasiWeb/"+ $datosLocal['usrImg'] +") no-repeat center center ","background-size": "cover"});
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