
//var storedFiles = [];
//var storedFilesDb = [];
var marker;          //variable del marcador
var coords = {};//coordenadas obtenidas con la geolocalización 
var linkBuscarDir=0;
var miresult='';
$datosLocalDir='';
$dirZona='';
$dirCiudad='';
$dirDireccion='';
$dirLat='';
$dirLon='';
//var mapD;   
$(document).ready(function(){
    //$idCliente = 0; //var para envio publicar
    $contH = 0; // var para select perfil usuario
    $contM = 0; //  var para select perfil usuario
    // $imgPerfilAnt="";// guarda img anterior para comparar con el actua si es lo mismo
    //$actualizar=0; //
    $publicarFoto=0;//cambiar estado de publicar foto si no se hizo la publicacion 
    inicioSesion(); //recupera y almacena datos locales 
	 /* mostrar tabs divInicio inicio sesion y registrar*/            
    $("#aRegistrar").click(function(){
        $("#aRegistrar").tab('show');
        $('#formRegistro')[0].reset();
    });    
    $("#aIngresar").click(function(){
        $("#aIngresar").tab('show');
    });
    $("#linkRegistrar").click(function(){
        $("#aRegistrar").tab('show');
    });
    $("#linkBuscarListaMapa").click(function(){
        //event.preventDefault(); 
        $("#paginaPrincipal").css("display", "none");
        $("#paginaListaMapas").css("display", "block");
        $("#divFooter").css("display", "none");
        activarSwipe();
    });

    $('body #swiper-container').on('click', '.swiper-slide', function(){
      alert($(this).attr('id'));
    })

    $("#btnAtras").click(function() {
        $("#paginaPrincipal").css("display", "block");
        $("#paginaListaMapas").css("display", "none");
        $("#divFooter").css("display", "block");            
        })
    $("#aBuscarLista").click(function(){
            $("#aBuscarLista").tab('show');
    });
    $("#aBuscarMapa").click(function(){
       // activarSwipe();
            $("#aBuscarMapa").tab('show');
            
    });

    /*pagina buscar */
    $("#icoBuscar").click(function(){
        //event.preventDefault();

        $(".icoFooter .glyphicon-search").css({"color":"#008080"});
        $(".icoFooter .glyphicon-upload").css({"color":"rgb(128, 128, 128,.8)"});
        $(".icoFooter .glyphicon-comment").css({"color":"rgb(128, 128, 128,.8)"});
        $(".icoFooter .glyphicon-user").css({"color":"rgb(128, 128, 128,.8)"});
        
        $("#paginaPrincipal").css("display", "block");
        $("#paginaListaMapas").css("display", "none");            
        $("#paginaPublicar").css("display", "none");                        
        $("#paginaMensaje").css("display", "none"); 
        $("#paginaUsuarioPerfilEditar").css("display", "none");
        $("#paginaUsuarioPerfilMostrar").css("display", "none");           
        //$("#paginaUsuarioPerfil").css("display", "none");
        
        $("#icoFMBuscar").css({"color":"#008080"});
        $("#icoFMPublicar").css({"color":"rgb(128, 128, 128,.8)"});                       
        $("#icoFMMensaje").css({"color":"rgb(128, 128, 128,.8)"});            
        $("#icoFMPerfil").css({"color":"rgb(128, 128, 128,.8)"});
        
    });
/*publicar principal*/
    $("#btnPublicarPrincipal").click(function(){
        $(".div-custom-principal .divPublicar").css({"padding":"0px","background-color": "#f2f2f2"});
        $("#paginaPrincipal").css("display", "none");
        $("#paginaListaMapas").css("display", "none");
        
        $("#paginaPublicar").css("display", "block");

        $("#publicarDireccion").css("display","block");
        $("#publicarFotoUbicacion").css("display","none");
        $("#publicarCaracteristicas").css("display","none");
        $("#publicarPiso").css("display","none");        
        $("#paginaMensaje").css("display", "none");            
        $("#paginaUsuarioPerfilEditar").css("display", "none");
        $("#paginaUsuarioPerfilMostrar").css("display", "none");

        $("#divFooter").css("display", "none");
        $(".container-custom-principal .progressbar-bar-custom").css("width", "25%");
        
        $.ajax({
            type :'POST',
            url:'http://192.168.1.108/wasiWeb/php/consultarDireccion.php',
            dataType : 'json',                
            data: {idUsuario:$datosLocal['usrId']},                 
            crossDomain: true,
            cache: false,
            success: function(datosConsultaDir){
                //if (datosConsultaDir['publicado']==0) {
                $datosRemotoConsultarDir=JSON.stringify(datosConsultaDir);
                localStorage.setItem('datosDir', $datosRemotoConsultarDir);
                $datosLocalDir=JSON.parse(localStorage.getItem('datosDir'));        
                if ($datosLocalDir['publicado']==0) {
                    $('#ciudadMpu').val($datosLocalDir['ciudad']);
                    $('#direccionMPu').val($datosLocalDir['direccion']);
                    linkBuscarDir=1;
                    autoCDir=1;
                    autoCCiu=1;
                    continuarDir=0;
                    //console.log("datosLocalDir "+ $datosRemotoDir);
                    console.log("datosLocalDir "+$datosLocalDir);
                }
            },
            error : function(jqXHR, textStatus, errorThrown) {
                alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
            }
        });
        
        //if($datosLocalDir!= undefined || $datosLocalDir!= null ){
                        
        //}

     });
    $("#btnAtrasDireccion").click(function() {
       
        $("#paginaPrincipal").css("display", "block");
        $("#paginaPublicar").css("display", "none");
        $("#divFooter").css("display", "block");  //tal vez div mensaje tambien           
    });
    $("#btnAtrasfotoUbicacion").click(function() {
        $(".div-custom-principal .divPublicar").css("padding", "0px");
        //$("#paginaPublicar").css("display", "block");        
        $("#publicarDireccion").css("display","block");
        $("#publicarFotoUbicacion").css("display","none");
        $("#publicarCaracteristicas").css("display", "none"); 
        $("#publicarPiso").css("display","none");
        $(".container-custom-principal .progressbar-bar-custom").css("width", "25%");
        continuarDir=0;        
    });

    $("#btnAtrasCaracteristicas").click(function() {
       
        $("#paginaPublicar").css("display", "block");        
        $("#publicarDireccion").css("display","none");
        $("#publicarFotoUbicacion").css("display","block")
        $("#publicarCaracteristicas").css("display", "none"); 
         $("#publicarPiso").css("display","none");
        $(".container-custom-principal .progressbar-bar-custom").css("width", "50%");        
    });
    
    $("#btnAtrasPiso").click(function() {
        alert("hola atras");
        $("#paginaPublicar").css("display", "block");
        $("#publicarDireccion").css("display","none");
        $("#publicarFotoUbicacion").css("display","none")
        $("#publicarCaracteristicas").css("display", "block");
        $("#publicarPiso").css("display","none");
        $(".container-custom-principal .progressbar-bar-custom").css("width", "75%");         
    });
   
    $("#btnEditarPerfil").click(function(){
            $contH=0;
            $contM=0;
            $("#paginaPrincipal").css("display", "none");
            $("#paginaListaMapas").css("display", "none"); 
            $("#paginaPublicar").css("display", "none");        
            $("#paginaMensaje").css("display", "none");            
            $("#paginaUsuarioPerfilEditar").css("display", "block");
            $("#paginaUsuarioPerfilMostrar").css("display", "none");
            $("#divFooter").css("display", "none");
            $("#clistA").css("visibility", "hidden");
            /*datos recuperados de local storage*/
            
            $("#fotoPerfilE").css({"background": "url(http://192.168.1.108/wasiWeb/"+ $datosLocal['usrImg'] +") no-repeat center center ","background-size": "cover"});
            $("#nombreP").val($datosLocal.usrName);
            $("#apellidosP").val($datosLocal.usrLname);
            $("#emailP").val($datosLocal.usrEmail);
            $("#telefonoP").val($datosLocal.usrPhone);   
            if($datosLocal.usrSexo==1){
                $contH++;
                $("#radioH").prop('checked', true);
                $("#imgSexoRH").css({"background": "url(img/hombreN.png) no-repeat center center ","background-size": "25px 25px"});
                $("#imgSexoH").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                $("#mensjeHS").css({"color":"#000","font-size":"7px"}); 
                $contM=0;   
            }
            if ($datosLocal.usrSexo==2) {
                $contM++;
                $("#radioM").prop('checked', true);
                $("#imgSexoRM").css({"background": "url(img/mujerN.png) no-repeat center center ","background-size": "25px 25px"});
                $("#imgSexoM").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                //$("#imgSexoM").attr("src","img/mujerN.png");
                $("#mensjeMS").css({"color":"#000","font-size":"7px"});//.html($contM);//
                $contH=0;
            }
            

    });
    
    $("#icoUsuario").click(function(){
        //event.preventDefault(); 
        if ($datosLocal['usrAct']==0) {
            //$imgPerfilAnt=$datosLocal['usrImg'];
            $("#paginaPrincipal").css("display", "none");
            $("#paginaListaMapas").css("display", "none"); 
            $("#paginaPublicar").css("display", "none");        
            $("#paginaMensaje").css("display", "none");            
            $("#paginaUsuarioPerfilEditar").css("display", "block");
            $("#paginaUsuarioPerfilMostrar").css("display", "none");
            $("#divFooter").css("display", "none");
            /*datdo recuperados de local storage*/
            // $("#imgPerfil").attr({"src":"http://192.168.0.160/wasiWeb/"+ $datosLocal['usrImg']});
            $("#fotoPerfilE").css({"background": "url(http://192.168.1.108/wasiWeb/"+$datosLocal['usrImg']+") no-repeat center center ","background-size":"cover"});
            $("#nombreP").val($datosLocal.usrName);
            $("#apellidosP").val($datosLocal.usrLname);
            $("#emailP").val($datosLocal.usrEmail);
            $("#telefonoP").val($datosLocal.usrPhone);             
        }
        else{
            //$imgPerfilAnt=$datosLocal['usrImg'];        
            
            $("#paginaPrincipal").css("display", "none");
            $("#paginaListaMapas").css("display", "none"); 
            $("#paginaPublicar").css("display", "none");        
            $("#paginaMensaje").css("display", "none");            
            $("#paginaUsuarioPerfilEditar").css("display", "none");
            $("#paginaUsuarioPerfilMostrar").css("display", "block");

            $(".icoFooter .glyphicon-search").css({"color":"rgb(128, 128, 128,.8)"});
            $(".icoFooter .glyphicon-upload").css({"color":"rgb(128, 128, 128,.8)"});
            $(".icoFooter .glyphicon-comment").css({"color":"rgb(128, 128, 128,.8)"});
            $(".icoFooter .glyphicon-user").css({"color":"#008080"});  

            $("#icoFMBuscar").css({"color":"rgb(128, 128, 128,.8)"});  
            $("#icoFMPublicar").css({"color":"rgb(128, 128, 128,.8)"});                       
            $("#icoFMMensaje").css({"color":"rgb(128, 128, 128,.8)"});            
            $("#icoFMPerfil").css({"color":"#008080"});      
                                    
            /*datdo recuperados de local storage*/
            // $("#imgPerfil").attr({"src":"http://192.168.0.160/wasiWeb/"+ $datosLocal['usrImg']});
            $("#fotoPerfilM").css({"background": "url(http://192.168.1.108/wasiWeb/"+ $datosLocal['usrImg'] +") no-repeat center center ","background-size": "cover"});
            $("#nombrePM").html($datosLocal.usrName);
            $("#apellidosPM").html($datosLocal.usrLname);
            if ($datosLocal.usrSexo==1) {
                $("#divSexo").css({"border-color":"#999999","box-shadow":""});
                $("#imgSexo").css({"background": "url(img/hombreG.png) no-repeat center center ","background-size": "20px 20px"});
            }
            if ($datosLocal.usrSexo==2) {
                $("#divSexo").css({"border-color":"#999999","box-shadow":""}); 
                $("#imgSexo").css({"background": "url(img/mujerG.png) no-repeat center center ","background-size": "20px 20px"});
                    
            }           
            //if ($datosLocal.usr) {}            
            /*borrar mensajes despues de pasar por otra pagina*/
            $("#mensajeErrorNombreP").html("");
            $("#mensajeErrorApellidosP").html("");
            $("#mensajeErrorContrasenyaP").html("");
            $("#mensajeErrorContrasenyaNP").html("");
            $("#mensajeErrorCContrasenyaNP").html("");       
        }
    });
    $("#imgSexoH").click(function(){
        //$contH++;
        if ($contH % 2 == 0) {
            $contH++;
            $("#imgSexoRH").css({"background": "url(img/hombreN.png) no-repeat center center ","background-size": "25px 25px"});
            $("#imgSexoH").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
            /*$("#imgSexoH img").attr("src","img/hombreN.png");*/
            $("#mensjeHS").css({"color":"#000","font-size":"7px"});//html($contH);   : ;  :      
            

            $("#imgSexoM").css({"border-color":"#999999","box-shadow":""});
            
            $("#imgSexoRM").css({"background": "url(img/mujerG.png) no-repeat center center ","background-size": "25px 25px"});
                       
            $contM=0; 
            $("#mensjeMS").css({"color":"#999999","font-size":"6px"});//html($contM);//             
        }
        else{
            $contH++;
            $("#imgSexoH").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgSexoRH").css({"background": "url(img/hombreG.png) no-repeat center center ","background-size": "25px 25px"});
            $("#mensjeHS").css({"color":"#999999","font-size":"6px"});//.html($contH);//   
            //$('#radioH').removeAttr('checked');
            $("#radioH").prop('checked', false); //quitar el check de radio
            //$("#radioM").attr('checked', true); */

        }              
    });
    $("#imgSexoM").click(function(){
        if ($contM % 2 == 0) {
            $contM++;
            $("#imgSexoRM").css({"background": "url(img/mujerN.png) no-repeat center center ","background-size": "25px 25px"});
            $("#imgSexoM").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
            //$("#imgSexoM").attr("src","img/mujerN.png");
            $("#mensjeMS").css({"color":"#000","font-size":"7px"});//.html($contM);//
             
            $("#imgSexoH").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgSexoRH").css({"background": "url(img/hombreG.png) no-repeat center center ","background-size": "25px 25px"});
             $contH=0;
            $("#mensjeHS").css({"color":"#999999","font-size":"6px"});// .html($contH);//
        }
        else{
            $contM++;
            $("#imgSexoM").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgSexoRM").css({"background": "url(img/mujerG.png) no-repeat center center ","background-size": "25px 25px"});
            $("#mensjeMS").css({"color":"#999999","font-size":"6px"});//.html($contM);//   
            $("#radioM").prop('checked', false); //quitar el check de radio
        }
    });
// caso cuando es busca por link direccion
    $("#linkBuscarDireccion").click(function(){          
        $('#latlon').html(Latitude+" "+Longitude);//variables de index.js
        $("#contenedorMapaDireccion").css("display", "block");
        $("#mapDireccionBuscar").css("display", "none"); 
        $("#mapDireccionLink").css("display", "block");
            //Se crea una nueva instancia del objeto mapa
             var mapD = new google.maps.Map(document.getElementById('mapDireccionLink'), {
                center: {lat: Latitude, lng: Longitude},
                zoom: 16,
                scrollwheel: false,
                zoomControl: true,
                rotateControl : false,
                mapTypeControl: true,
                streetViewControl: false,
            });
            alert("latlon "+Latitude+" "+Longitude);           
            // Creamos el marcador
            //Creamos el marcador en el mapa con sus propiedades
            //para nuestro obetivo tenemos que poner el atributo draggable en true
            //position pondremos las mismas coordenas que obtuvimos en la geolocalización
            markerD = new google.maps.Marker({
                map: mapD,
                position: {lat: Latitude, lng: Longitude},
                position: new google.maps.LatLng(Latitude,Longitude),
                draggable: true
            });
                      
            //agregamos un evento al marcador junto con la funcion callback al igual que el evento dragend que indica 
            //cuando el usuario a soltado el marcador
            markerD.addListener('click', toggleBounce);//para animar el marcador      
            markerD.addListener( 'dragend', function (event){
            //escribimos las coordenadas de la posicion actual del marcador dentro del input #coords
            //document.getElementById("latlon").innerHTML = this.getPosition().lat()+","+ this.getPosition().lng();
            });
            markerD.setMap(mapD);
            // creamos el objeto geodecoder
            var geocoderD = new google.maps.Geocoder();
            // muestra las ciudad y la direccion 
            geocoderD.geocode({'latLng': markerD.getPosition()}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $('#direccionMPu').val(results[0].address_components[1].short_name+", "+results[0].address_components[0].short_name);
                    $('#ciudadMpu').val(results[0].address_components[2].short_name+", "+results[0].address_components[3].short_name);
                    //alert("entra linkBuscarDireccion " + results.length);
                    //console.log("latlon "+ JSON.stringify(results));
                    $("#mensajeErrorCiudad").html("");
                    $("#mensajeErrorDireccion").html("");
                    $("#mensajeErrorDireccionT").html("");
                    miresult=results;
                    addressD1 = results[0].address_components[1].short_name+", "+results[0].address_components[0].short_name;//calle
                    addressD2 = results[0].address_components[2].short_name;//zona
                    ciudadN1 = results[0].address_components[2].short_name;//zona
                    ciudadN2 = results[0].address_components[3].short_name;//ciudad
                    
                    addressLat= miresult[0].geometry.location.lat();
                    addressLon= results[0].geometry.location.lng();

                    linkBuscarDir=1;
                    autoCCiu=1;
                    autoCDir=1;
                    continuarDir=1;    
                }
                else {
                    alert("El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + " Intente una vez mas por favor ");
                    linkBuscarDir=0;
                    autoCCiu=0;
                    autoCDir=0;
                    //alert("else "+ linkBuscarDir)
                }
            });                    
            // le asignamos una funcion al eventos dragend del marcado
            google.maps.event.addListener(markerD, 'dragend', function() {
                geocoderD.geocode({'latLng': markerD.getPosition()}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        //var address=results[0]['formatted_address'];
                        $('#direccionMPu').val(results[0].address_components[1].short_name+", "+results[0].address_components[0].short_name);
                        $('#ciudadMpu').val(results[0].address_components[2].short_name+", "+results[0].address_components[3].short_name);
                        miresult=results;
                        addressD1 =results[0].address_components[2].short_name;//calle
                        addressD2 = results[0].address_components[2].short_name;//zona
                        ciudadN1 = results[0].address_components[2].short_name;//zona                        
                        ciudadN2 = results[0].address_components[3].short_name;//ciudad

                        addressLat= miresult[0].geometry.location.lat();
                        addressLon= results[0].geometry.location.lng();
                    
                        linkBuscarDir=1;
                        autoCCiu=1;
                        autoCDir=1;
                        continuarDir=1; 
                        //alert(address);
                        //linkBuscarDir=1;
                    }
                    else {
                        alert("El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + " Intente una vez mas por favor ");
                        linkBuscarDir=0;
                        autoCCiu=0;
                        autoCDir=0;
                        //linkBuscarDir=0;                    
                    }
                });
            });
        }); 
    //caso despues de entrar a link buscar mapa para el cambio de mapa input buscar direccion autocompletado
    $("#direccionMPu").change(function() {
        //alert("entra ");
        $("#contenedorMapaDireccion").css("display", "block");
        $("#mapDireccionBuscar").css("display", "block"); 
        $("#mapDireccionLink").css("display", "none");
    });
    selDiv = $("#imgPublicar");//para las foto publicadas 

//    $("#filePublicar").on("change", handleFileSelect);     
   // $("#imgPublicar").on("click", ".removeImgPublicar", removeFile);
});//fin $(document).ready(function()

function toggleBounce() {
  if (markerD.getAnimation() !== null) {
    markerD.setAnimation(null);
  } else {
    markerD.setAnimation(google.maps.Animation.BOUNCE);
  }
}

//funciones para input  type file fotos add remove publicar 
/*
function handleFileSelect(e) { 
//alert("handleFileSelect "+e.target.files.length);  
//$("#mensajeModalFotoPublicar").html("");  
    var files = e.target.files;//$("#filePublicar")[0].files.length
    if ((($("#filePublicar")[0].files.length)+(storedFiles.length)) > 5 ){//+(storedFilesDb.length)
        alert("solo puedes elegir maximo 5 fotos");
        $('#modalPublicar').modal('hide');
        //e.preventDefault();
        return;
    }
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function(f) {        
      if(!f.type.match("image.*")) {
        alert("no es foto");
        return;
      }
      storedFiles.push(f);      
      var reader = new FileReader();
      reader.onload = function (e) {        
        var html = "<div class = 'fotoPublicar' style='background:#141f1f url("+e.target.result+") no-repeat center center; background-size:contain, cover;' ><span class='glyphicon glyphicon-trash removeImgPublicar' data-file="+ encodeURI(f.name)+"></span></div>";
        selDiv.append(html);         
      }
      reader.readAsDataURL(f);
    });
  /*  $('#mensajePublicar1').html("almacen + "+storedFiles.length); 
    $('#modalPublicar').modal('hide');
    $('.divImgPublicarG').css({'display':'none'});
    $('#divImgPublicarP').css({'display':'flex'});
    //$actualizar++;
    $publicarFoto=1;*/
/*
}

/*
function removeFile(e) {
    var file = $(this).data("file");
    //decodeURI(file) decodifica los espacion y otros ()    
    for(var i=0;i<storedFiles.length;i++) {
        if(storedFiles[i].name === decodeURI(file)) {
            storedFiles.splice(i,1);     
            break;
        }
    }
    /*for (var j = 0 ; j < storedFilesDb.length; j++) {
        if (storedFilesDb[j].nombre_foto === file) {
            storedFilesDb.splice(j,1);        
            break;
        }
    } */ 
/*      
    $(this).parent().remove();
   // $actualizar++;
    $publicar=1;
    //$('#mensajePublicar2').html("almacen db - "+storedFilesDb.length);
    $('#mensajePublicar3').html("almacen - "+storedFiles.length);    
    if (storedFiles.length + storedFilesDb.length == 0) {
        $('.divImgPublicarG').css({'display':'block'});
        $('#divImgPublicarP').css({'display':'none'});
        //$actualizar=0;
        $pu = $('#filePublicar');
        $pu.wrap('<form>').closest('form').get(0).reset();
        $pu.unwrap();
    }
  }
  */
function inicioSesion(){
    $datosLocal=JSON.parse(localStorage.getItem('datosInicioSesion'));
    if($datosLocal!= undefined || $datosLocal!= null ){
        /*$.each($datosLocal, function(key, value){alert(key + ' = ' + value);});*/
        $("#nombreCompleto").html($datosLocal['usrName']);
        $("#imgPerfilHeader").attr({"src":"http://192.168.1.108/wasiWeb/"+ $datosLocal['usrImg']}); 
        $("body").css("background","#f2f2f2");
        $("#divInicio").css("display", "none");
        $("#divPrincipal").css("display", "block");
        $("#icoFMBuscar").css({"color":"#008080"});
        $(".icoFooter .glyphicon-search").css({"color":"#008080"});
        //$("#imgP").html($datosLocal['usrImg']);
        //$("#divInicio").css("display", "none");
        $idCliente = $datosLocal['usrId'];
        $emailCliente = $datosLocal['usrEmail'];    
        //alert($datosLocal['usrEmail'] + " " + $datosLocal['usrId']);
    }
}
/*function registrarUsuario(){ //evento activado por onsubmit en validarformulario.js
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
                $('#mID').html("");
               	$('#mIS').html(datosR.msg + " " + datosR.umEmail);}
               	if(datosR.uReg==0){
                    $('#mIS').html("");
                   	$('#mID').html(datosR.msg);}
                //alert(datosR.uReg);
       	},
       	error : function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status +" "+ textStatus+" "+ errorThrown);
       	}
    });    
}*/
function iniciarSession(){
    $('#mIS').html(" ");
    $('#mID').html(" ");
    //alert("entra btn inicio");
    event.preventDefault();
    $.ajax({
        type :'POST',
        url:'http://192.168.1.108/wasiWeb/php/ingresar.php',
        dataType : 'json',        
        data: new FormData($("#formIngreso")[0]),        
        //async: false,
        crossDomain: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function(datosI){   
            //alert("entra ajax");
            if(datosI.usr==1){
                $datosRemoto=JSON.stringify(datosI);
                localStorage.setItem('datosInicioSesion', $datosRemoto);
                //alert($datosRemoto);
                $("body").css("background","#f2f2f2");
                $("#divInicio").css("display", "none");
                $("#divPrincipal").css("display", "block");
                //$('#paginaListaMapas').css("display", "none");
                $("#icoFMBuscar").css({"color":"#008080"});
                $(".icoFooter .glyphicon-search").css({"color":"#008080"});
                inicioSesion();
            }
            if (datosI.usr <= 0) {                    
                   $("#mID").html(datosI.mensaje);
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {
            alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
        }
    });    
}
// cPassword =0 no se cambio el password =1 se cambio pasword  


function activarSwipe(){
        //alert("entra");
        //event.preventDefault();
       // $("#aBuscarMapa").tab('show'); 
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 10
      //touchMoveStopPropagation:false
      //preventClicksPropagation:true
      /*pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },*/
    });
  }
function continuarDireccion(){
    event.preventDefault();
    $dirDireccion=addressD1;//dir
    $dirZona=ciudadN1;//zona
    $dirCiudad=ciudadN2;//ciudad    
    $dirLat=addressLat;
    $dirLon=addressLon;
    $(".div-custom-principal .divPublicar").css({"padding":"10px","background-color": "#fff"});
    $("#publicarDireccion").css("display","none");
    $("#publicarFotoUbicacion").css("display","block");
    $("#publicarCaracteristicas").css("display","none");
    $("#publicarPiso").css("display","none");     
    $(".container-custom-principal .progressbar-bar-custom").css("width", "50%");

    
    $("#mensajePublicar").html($datosLocal['usrEmail']);
    $("#mensajePublicar1").html($("#ciudadMpu").val());
    $("#mensajePublicar2").html($("#direccionMPu").val());
    $("#mensajePublicar3").html(addressLat);
    $("#mensajePublicar4").html(addressLon);
    
    if (btnAtrasFoto==0) {// 0 si se no presiono btnAtrasFoto 1 si se press  
        // verificar si hay fotos en la base de datos
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: 'http://192.168.1.108/wasiWeb/php/consultarFotoPublicado.php',
            data: {idUsuario:$datosLocalDir['id'],idPublicacion:$datosLocalDir['idPublicar']},                 
            crossDomain: true,
            cache: false,
            success: function(datosFoto){
                if (datosFoto['fotos']>0) {
                    cargarFotoBD(datosFoto);
                    console.log("datosFoto "+JSON.stringify(datosFoto));
                }            
                console.log("longitud "+ datosFoto['fotos']);
                btnAtrasFoto=1;                      
            },
            error : function(jqXHR, textStatus, errorThrown) {
                alert("error consultarFotoPublicado: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                btnAtrasFoto=0;
            }
        });
    }
    //direccion nueva
    if (continuarDir==1 ) {
        //no existe direccion en la base de datos insertar direccion
        if ($datosLocalDir['publicado']==-1) {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://192.168.1.108/wasiWeb/php/insertarDirecion.php',
                data: {idUsuario:$datosLocal['usrId'],zona:$dirZona,ciudad:$dirCiudad,direccion:$dirDireccion,Lat:$dirLat,Lon:$dirLon},                 
                crossDomain: true,
                cache: false,
                success: function(datosInsDir){
                    $datosRemotoInsDir=JSON.stringify(datosInsDir);
                    localStorage.setItem('datosDir', $datosRemotoInsDir);
                    $datosLocalDir=JSON.parse(localStorage.getItem('datosDir')); 
                    continuarDir=0;          
                    console.log("datosLocalDir "+ $datosLocalDir);
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                }
            });
        }
        //existe direccion en la base de datos actualizar direccion
        if ($datosLocalDir['publicado']==0) {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://192.168.1.108/wasiWeb/php/actualizarDireccion.php',
                data: {idUsuario:$datosLocal['usrId'],idPublicacion:$datosLocalDir["idPublicar"],zona:$dirZona,ciudad:$dirCiudad,direccion:$dirDireccion,Lat:$dirLat,Lon:$dirLon},                 
                crossDomain: true,
                cache: false,
                success: function(datosActDir){
                    
                        $datosRemotoActDir=JSON.stringify(datosActDir);
                        localStorage.setItem('datosDir', $datosRemotoActDir);
                        $datosLocalDir=JSON.parse(localStorage.getItem('datosDir')); 
                        continuarDir=0;
                        console.log("datosLocalActDir "+ $datosLocalDir);
                    
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                }
            });
        }
    }
}
function continuarFotoUbi(){
    event.preventDefault();
    /*$("#paginaPrincipal").css("display", "none");
    $("#paginaListaMapas").css("display", "none"); 
    $("#paginaPublicar").css("display", "block");*/            
    /*$("#paginaMensaje").css("display", "none");            
    $("#paginaUsuarioPerfilEditar").css("display", "none");
    $("#paginaUsuarioPerfilMostrar").css("display", "none");
    $("#divFooter").css("display", "none");
    */    
   /*
    if($publicarFoto==1){// cambiar 1 de insertar 2 de actualizar que lo manda el btn atras 
       
        $formDatos= new FormData($("#formPublicarFotoUbicaion")[0]);
        $formDatos.append("idCliente", $idCliente);
        $formDatos.append("emailCliente", $emailCliente);
        /*$formDatos.append("actualizar",$actualizar);
        $formDatos.append("datosUsEx",$datosUsEx);*/
   /*
        for(var j=0, len=storedFiles.length; j<len; j++) {
            $formDatos.append('filePublicar[]', storedFiles[j]);//['+ j +'] 
        }
    }
    $.ajax({
        type : 'POST',
        url: 'http://192.168.1.102/wasiWeb/php/publicarFotos.php',
        data: $formDatos,           
        dataType : 'json',
        crossDomain: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function(datosPF)
        {   //alert("exito");
            $("#publicarFotoUbicacion").css("display","none");
            $("#publicarCaracteristicas").css("display","block");
            $("#publicarPiso").css("display","none");
            $(".container-custom-principal .progressbar-bar-custom").css("width", "75%");        
            $('#mensajePF').html(datosPF.msg);                   
        },
        error : function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status +" "+ textStatus+" "+ errorThrown);
        }
    });
}
    /*if($publicar==1) {    
        
        //for (var l = 0; l < storedFilesDb.length; l++) {
            $formDatos.append('filePublicarDb',JSON.stringify(storedFilesDb));//JSON.stringify() storedFilesDb[0]["nombre_foto"]
        //}
    
    $publicar=0;
    }
    else{
        alert("Ya hiciste una publicaste ");
        return;
    */
    } 




function continuarCarac(){
    event.preventDefault(); 
    /*$("#paginaPrincipal").css("display", "none");
    $("#paginaListaMapas").css("display", "none"); 
    $("#paginaPublicar").css("display", "block");*/
    $("#publicarFotoUbicacion").css("display","none");
    $("#publicarCaracteristicas").css("display","none");
    $("#publicarPiso").css("display","block");        
    /*$("#paginaMensaje").css("display", "none");            
    $("#paginaUsuarioPerfilEditar").css("display", "none");
    $("#paginaUsuarioPerfilMostrar").css("display", "none");
    $("#divFooter").css("display", "none");
   */   
    $(".container-custom-principal .progressbar-bar-custom").css("width", "100%");
}
