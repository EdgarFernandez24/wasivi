
//var storedFiles = [];
//var storedFilesDb = [];
//var ipConex = '192.168.1.101';
var marker;          //variable del marcador
var coords = {};//coordenadas obtenidas con la geolocalización 
var linkBuscarDir=0;
//var miresult='';
$datosLocalDir='';
$datosLocalHabi='';
$dirZona='';
$dirCiudad='';
$dirDireccion='';
$dirLat='';
$dirLon='';

   
$(document).ready(function(){
    //$idCliente = 0; //var para envio publicar
    $contH = 0; // var para select perfil usuario
    $contM = 0; //  var para select perfil usuario
    $contViSolo = 0; // radio de habitacion solo 
    $contViComp = 0; // radio de habitacion compartido
    $contHombres = 0;//cantida de hombres en la vivienda
    $contMujeres = 0;//cantida de mujeres en la vivienda
    $contHaCaSolo = 0;// radio de cama solo 
    $contHaCaDoble = 0;// radio de cama Doble
    $contHaCaSofa =0;//radio cama sofa
    $contHaCaLitera =0;//radio cama litera
    $contHaCaSolos =0;//radio cama solos
    $contHaCaNada =0;//radio cama nada
    $contHaS=0;//radio dimension s
    $contHaM=0;//radio dimension m
    $contHaL=0;//radio dimension l
    $contFinFecha=0;// contador fecha final para controlar finFMPu
    $contInFecha=0;// contador fecha final para controlar inFMPu
    $publicarFoto = 0;//cambiar estado de publicar foto si no se hizo la publicacion
    //$guardarSeAnt = '';//variable guardar valor servicio  
    selDiv = $("#imgPublicar");//para las foto publicadas
    selDivSe = $("#contenedorServicios");//para las servicios publicadas
    selDivPu = $("#contenedorFotoMensajePublicados"); //para lo publicado
    selDivMostrarPubliTodoSwipe = $("#swiper-wrapper"); //mostrar todo lo publicado dentro de swiper contenedor 
    selDivMostrarPubliTodoLista = $("#contenedorFotosLista");// mostrar todo lo publicado en fotos listas
    selDivMostrarFotosSwipe = $("#swiper-wrapperFotosPublicados"); //mostrar fotos publicados por id publicados dentro de swiper contenedor fotos publicados 
    htmlMostrarDatosPu=" ";//inicia vacio 
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
    $('#mostrarPassIn .glyphicon').on('click', function() {
        $(this).toggleClass('glyphicon-eye-close').toggleClass('glyphicon-eye-open'); // toggle our classes for the eye icon
        console.log($("#inPassword").attr('type'));
        $("#inPassword").attr('type', $("#inPassword").attr('type')=='password' ? 'text' : 'password');
        /*if ($("#inPassword").attr('type')=='password') { $('#inPassword').attr('type', 'text'); }
        else{    $('#inPassword').attr('type', 'password'); }
        */        
    });   
    $('#mostrarPassRe .glyphicon').on('click', function() {
        $(this).toggleClass('glyphicon-eye-close').toggleClass('glyphicon-eye-open'); // toggle our classes for the eye icon
        //console.log($("#contrasenya").attr('type'));
        $("#contrasenya").attr('type', $("#contrasenya").attr('type')=='password' ? 'text' : 'password');        
    });   
    $('#cMostrarPassRe .glyphicon').on('click', function() {
        $(this).toggleClass('glyphicon-eye-close').toggleClass('glyphicon-eye-open'); // toggle our classes for the eye icon
        //console.log($("#contrasenya").attr('type'));
        $("#cContrasenya").attr('type', $("#cContrasenya").attr('type')=='password' ? 'text' : 'password');        
    }); 
    $("#linkBuscarListaMapa").click(function(){
               
        $("#paginaPrincipal").css("display", "none");
        $("#paginaPublicadoMostrar").css("display", "none");
        $("#paginaListaMapas").css("display", "block");
        $("#divFooter").css("display", "none");
        if (swiperMoPuTo==1) {
            $("#swiper-container div").remove(".slidePuTo");
            swiperMapa.destroy(false,false);//false,true
            $("#swiper-wrapperFotosPublicados div").remove(".slideFoIdPu"); // quitar los elementos vrados con icousuario para
            swiperFoPu.destroy();
            $("#contenedorcompartirFoPuM div").remove(".imgHabitacion");
            $("#contenedorServiciosFoPuM div").remove(".imgHabitacion");
            $("#contenedorpermitenFoPuM div").remove(".imgHabitacion");
            swiperMoPuTo=0;
        }
        $("#buscarMapa").addClass('active');//fade in 
        $("#aBuscarMapa").tab('show');
        mostrarSwiperMapa(); 
        
    });
    $("#btnAtrasPublicadoMostrar").click(function(){

        $("#paginaPrincipal").css("display", "none");
        $("#paginaPublicadoMostrar").css("display", "none");
        $("#paginaListaMapas").css("display", "block");
        $("#divFooter").css("display", "none");
        if (entroTabLista==0) {
            if (swiperMoPuTo==1) {//no entra al inicio
                $("#swiper-container div").remove(".slidePuTo");
                swiperMapa.destroy(false,false);//false,true
                $("#swiper-wrapperFotosPublicados div").remove(".slideFoIdPu"); // quitar los elementos vrados con icousuario para
                swiperFoPu.destroy();
                $("#contenedorcompartirFoPuM div").remove(".imgHabitacion");
                $("#contenedorServiciosFoPuM div").remove(".imgHabitacion");
                $("#contenedorpermitenFoPuM div").remove(".imgHabitacion");
                swiperMoPuTo=0;
            }
            $("#buscarMapa").addClass('active');//fade in 
            $("#aBuscarMapa").tab('show');
            mostrarSwiperMapa();
        }
        else{
            $("#swiper-wrapperFotosPublicados div").remove(".slideFoIdPu"); // quitar los elementos vrados con icousuario para
            swiperFoPu.destroy();
            $("#contenedorcompartirFoPuM div").remove(".imgHabitacion");
            $("#contenedorServiciosFoPuM div").remove(".imgHabitacion");
            $("#contenedorpermitenFoPuM div").remove(".imgHabitacion");
            $("#buscarLista").addClass('active');//fade in 
            $("#aBuscarLista").tab('show');
        }
    });


    //swiper mapa
    $('body #swiper-container').on('click', '.swiper-slide', function(){
        console.log($(this).attr('id'));
        $idPublicacionFotos=$(this).attr('id');
        posPubliDespues=$(this).data("posswiper"); //var global
        //$("#paginaPrincipal").css("display", "none");
        $("#paginaListaMapas").css("display", "none");
        $("#paginaPublicadoMostrar").css("display", "block");
        $("#divFooter").css("display", "none");
        mostrarAnuncio($idPublicacionFotos);
        
    });    

    $("#btnAtras").click(function() {
        $("#paginaPrincipal").css("display", "block");
        $("#paginaListaMapas").css("display", "none");
        $("#divFooter").css("display", "block");
        $("#swiper-container div").remove(".slidePuTo"); 

        $("#buscarMapa").addClass('active');//fade in
        $("#buscarLista").removeClass('active');

        swiperMapa.destroy();//false,true
        posPubliDespues=0;
        cambioZona=0;//datos para implementar
        swiperMoPuTo=0;  
        entroTabLista=0;         
        })
    $("#aBuscarLista").click(function(){
        console.log("aBuscarLista");
        
        entroTabLista=1;
        
        $("#aBuscarLista").tab('show');
        console.log("buscar listas "+$datosLocalPubliTodo['publicados']);        
        /* aqui implementamos mostrar publicados en listas  */
        
        if (cambioZona==1 || swipeZona==1) {
           
        
        for (var i = 0; i < $datosLocalPubliTodo['publicados']; i++) {
            $contadorServicios=0;
            htmlMostrarPubliTodoLista+="<div class='contenedorLista' id="+$datosLocalPubliTodo['idPubliArray'][i]+">";
            htmlMostrarPubliTodoLista+=" <div class = 'fotoL' style='background:url(http://"+ipConex+"/wasiWeb/"+$datosLocalPubliTodo['rutaFotoArray'][i] +") no-repeat center center; background-size:cover;' >";
            //htmlMostrarPubliTodoLista+="     <img src=http://"+ipConex+"/wasiWeb/"+$datosLocalPubliTodo['rutaFotoArray'][i]+" class='imgD'>";
            htmlMostrarPubliTodoLista+=" </div>";
            htmlMostrarPubliTodoLista+=" <div class='mensajeL'>";
            htmlMostrarPubliTodoLista+="     <div class='mensajeLPrecio'>"+$datosLocalPubliTodo['precioArray'][i]+" €/m </div>";
            htmlMostrarPubliTodoLista+="     <div class='mensajeLZona'>"+$datosLocalPubliTodo['zonaArray'][i]+"</div>";    
            htmlMostrarPubliTodoLista+="     <div class='contenedorMensajeServiciosPe'>";
            htmlMostrarPubliTodoLista+="         <div class='mensajePerPu' style='background:url(http://"+ipConex+"/wasiWeb/"+$datosLocalPubliTodo['fotoPerfilArray'][i] +") no-repeat center center; background-size:cover;'></div>";
            if ($datosLocalPubliTodo['ascensorArray'][i]==1 && $contadorServicios < 7) {
                htmlMostrarPubliTodoLista+="         <div class='mensajeServiciosPu' style='background:url(./img/ascensorN.png) no-repeat center center; background-size:cover;'> </div>";          
                $contadorServicios++;
            }
            if ($datosLocalPubliTodo['calefaccionArray'][i]==1 && $contadorServicios < 7) {
                htmlMostrarPubliTodoLista+="         <div class='mensajeServiciosPu' style='background:url(./img/calefaccionN.png) no-repeat center center; background-size:cover;'> </div>";      
                $contadorServicios++;   
            }
            if ($datosLocalPubliTodo['estacionamientoArray'][i]==1 && $contadorServicios < 7) {
                htmlMostrarPubliTodoLista+="         <div class='mensajeServiciosPu' style='background:url(./img/estacionamientoN.png) no-repeat center center; background-size:cover;'> </div>";      
                $contadorServicios++;
            }
            if ($datosLocalPubliTodo['lavadoraArray'][i]==1 && $contadorServicios < 7) {
                htmlMostrarPubliTodoLista+="         <div class='mensajeServiciosPu' style='background:url(./img/lavadoraN.png) no-repeat center center; background-size:cover;'> </div>";      
                $contadorServicios++;
            }  
            if ($datosLocalPubliTodo['lavaVajillaArray'][i]==1 && $contadorServicios < 7) {
                htmlMostrarPubliTodoLista+="         <div class='mensajeServiciosPu' style='background:url(./img/lavaVajillasN.png) no-repeat center center; background-size:cover;'> </div>";      
                $contadorServicios++;                                
            }
            if ($datosLocalPubliTodo['mueblesArray'][i]==1 && $contadorServicios < 7) {
                htmlMostrarPubliTodoLista+="         <div class='mensajeServiciosPu' style='background:url(./img/mueblesN.png) no-repeat center center; background-size:cover;'> </div>";      
                $contadorServicios++;    
            } 
            if ($datosLocalPubliTodo['piscinaArray'][i]==1 && $contadorServicios < 7) {
                htmlMostrarPubliTodoLista+="         <div class='mensajeServiciosPu' style='background:url(./img/piscinaN.png) no-repeat center center; background-size:cover;'> </div>";      
                $contadorServicios++;
            }
            if ($datosLocalPubliTodo['porteroArray'][i]==1 && $contadorServicios < 7) {
                htmlMostrarPubliTodoLista+="         <div class='mensajeServiciosPu' style='background:url(./img/porteroN.png) no-repeat center center; background-size:cover;'> </div>";      
                $contadorServicios++;    
            }
            if ($datosLocalPubliTodo['radiadorArray'][i]==1 && $contadorServicios < 7) {
                htmlMostrarPubliTodoLista+="         <div class='mensajeServiciosPu' style='background:url(./img/radiadorN.png) no-repeat center center; background-size:cover;'> </div>";      
                $contadorServicios++;    
            }
            if ($datosLocalPubliTodo['secadorArray'][i]==1 && $contadorServicios < 7) {
                htmlMostrarPubliTodoLista+="         <div class='mensajeServiciosPu' style='background:url(./img/secadorN.png) no-repeat center center; background-size:cover;'> </div>";      
                $contadorServicios++;    
            } 
            if ($datosLocalPubliTodo['tvArray'][i]==1 && $contadorServicios < 7) {
                htmlMostrarPubliTodoLista+="         <div class='mensajeServiciosPu' style='background:url(./img/tvN.png) no-repeat center center; background-size:cover;'> </div>";      
                $contadorServicios++;
            }
            if ($datosLocalPubliTodo['wifiArray'][i]==1 && $contadorServicios < 7) {
                htmlMostrarPubliTodoLista+="         <div class='mensajeServiciosPu' style='background:url(./img/wifiN.png) no-repeat center center; background-size:cover;'> </div>";      
                $contadorServicios++;    
            }    
            htmlMostrarPubliTodoLista+="     </div>";
            htmlMostrarPubliTodoLista+=" </div>";                        
            htmlMostrarPubliTodoLista+="</div> ";                         
               
        }
    
        selDivMostrarPubliTodoLista.append(htmlMostrarPubliTodoLista); 
        //cambioZona=0;
        htmlMostrarPubliTodoLista=" ";
        swipeZona=0;
      }      

    });
//tab lista 

    $('body #contenedorFotosLista').on('click', '.contenedorLista', function(){   
        console.log($(this).attr('id'));
        $idPublicacionLista=$(this).attr('id');
        //posPubliDespues=posPubliDespues;//$(this).data("posswiper");
        
        //$("#paginaPrincipal").css("display", "none");
        $("#paginaListaMapas").css("display", "none");
        $("#paginaPublicadoMostrar").css("display", "block");
        $("#divFooter").css("display", "none");
        mostrarAnuncio($idPublicacionLista);

    });

    $("#aBuscarMapa").click(function(){
        console.log("aBuscarMapa"); 
        $("#aBuscarMapa").tab('show'); 
        entroTabLista=0;
        //event.preventDefault();
       /* $("#swiper-container div").remove(".slidePuTo");
        swiperMapa.destroy(false,false);
            
            entroTabLista=0;
           // swiperMapa.init();
            mostrarSwiperMapa();*/
            
    });

    /*pagina buscar */
    $("#icoBuscar").click(function(){
        //event.preventDefault();
        btnEditarPublicadoM =0;
        icoUserpublicadosM =0;

        $("#contenedorFotoMensajePublicados div").remove(".publicadoM"); // quitar los elementos vrados con icousuario para 

        $(".footer .icoFooterBuscar").css({"background": "url(img/buscarC.png) no-repeat center center","background-size": "30px 30px"});
        $(".footer .icoFooterPublicar").css({"background": "url(img/publicarG.png) no-repeat center center","background-size": "30px 30px"});
        $(".footer .icoFooterMensajes").css({"background": "url(img/mensajeG.png) no-repeat center center","background-size": "30px 30px"});
        $(".footer .icoFooterUsuario").css({"background": "url(img/perfilG.png) no-repeat center center","background-size": "30px 30px"});
        
        $("#paginaPrincipal").css("display", "block");
        $("#paginaListaMapas").css("display", "none");            
        $("#paginaPublicar").css("display", "none");

        $("#paginaMensaje").css("display", "none"); 
        $("#paginaUsuarioPerfilEditar").css("display", "none");
        $("#paginaUsuarioPerfilMostrar").css("display", "none");           
        //$("#paginaUsuarioPerfil").css("display", "none");
        
        $("#icoFMBuscar").css({"color":"#3A9CB1"});
        $("#icoFMPublicar").css({"color":"rgba(89, 89, 89, 0.8)"});                       
        $("#icoFMMensaje").css({"color":"rgba(89, 89, 89, 0.8)"});            
        $("#icoFMPerfil").css({"color":"rgba(89, 89, 89, 0.8)"});        
    });
/*publicar principal*/
    $("#btnPublicarPrincipal, #icoPublicar").click(function(){
        btnEditarPublicadoM =0;
        icoUserpublicadosM =0;

        $("#contenedorFotoMensajePublicados div").remove(".publicadoM"); // quitar los elementos vrados con icousuario para 

        $(".div-custom-principal .divPublicar").css({"padding":"0px","background-color": "#f2f2f2"});
        $("#paginaPrincipal").css("display", "none");
        $("#paginaListaMapas").css("display", "none");
        
        $("#paginaPublicar").css("display", "block");

        $("#publicarDireccion").css("display","block");
        $("#publicarFotoUbicacion").css("display","none");
        $("#publicarVivienda").css("display","none");
        $("#publicarServicios").css("display","none");        
        $("#publicarHabitacion").css("display","none");        
        $("#paginaMensaje").css("display", "none");            
        $("#paginaUsuarioPerfilEditar").css("display", "none");
        $("#paginaUsuarioPerfilMostrar").css("display", "none");

        $("#divFooter").css("display", "none");
        $(".container-custom-principal .progressbar-bar-custom").css("width", "25%");
        
        if (btnAtrasDir==0) {

            $.ajax({
                type :'POST',
                url:'http://' + ipConex + '/wasiWeb/php/consultarDireccion.php',
                dataType : 'json',                
                data: {idUsuario:$datosLocal['usrId']},                 
                crossDomain: true,
                cache: false,
                beforeSend: function(){
                     //Agregamos la clase loading al body
                    $('body').addClass('loading');
                     //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                    console.log("entro a la crga del gif");
                },
                success: function(datosConsultaDir){
                    console.log("btnPublicarPrincipal, icoPublicar datosConsultaDir "+JSON.stringify(datosConsultaDir));
                    $datosRemotoConsultarDir=JSON.stringify(datosConsultaDir);
                    localStorage.setItem('datosDir', $datosRemotoConsultarDir);
                    $datosLocalDir=JSON.parse(localStorage.getItem('datosDir')); 
                    if (datosConsultaDir['publicado']==0) {//0 existen datos y no se completo la publicacion, -1 no existen 
                               
                    
                        $('#ciudadMpu').val($datosLocalDir['ciudad']);
                        $('#direccionMPu').val($datosLocalDir['direccion']+", "+$datosLocalDir['zona']);
                        $("#btnContinuarDireccion").css({"background-color":"#008080"});
                        linkBuscarDir=1;
                        autoCDir=1;
                        autoCCiu=1;
                        continuarDir=0;
                        //console.log("datosLocalDir "+ $datosRemotoDir);                    
                    }
                    if (datosConsultaDir['publicado']==-1) {
                        $('#ciudadMpu').val('');
                        $('#direccionMPu').val('');                                 
                    }        
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('body').removeClass('loading'); //Removemos la clase loading
                    alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                },
                complete: function(){
                   //$('body').addClass('loading'); 
                  $('body').removeClass('loading'); //Removemos la clase loading
                }
            });
            btnAtrasDir=1;    
        }
                         
     });
    $("#btnAtrasDireccion").click(function() {
        console.log("btnEditarPublicadoM "+btnEditarPublicadoM+" icoUserpublicadosM "+icoUserpublicadosM);

        if (btnEditarPublicadoM == 0 && icoUserpublicadosM == 0) { // entra cuando 

            $("#paginaPrincipal").css("display", "block");
            $("#paginaPublicar").css("display", "none");
            $("#divFooter").css("display", "block");  
            $(".footer .icoFooterBuscar").css({"background": "url(img/buscarC.png) no-repeat center center","background-size": "30px 30px"});
            $(".footer .icoFooterPublicar").css({"background": "url(img/publicarG.png) no-repeat center center","background-size": "30px 30px"}); 
            $(".footer .icoFooterMensajes").css({"background": "url(img/mensajeG.png) no-repeat center center","background-size": "30px 30px"});
            $(".footer .icoFooterUsuario").css({"background": "url(img/perfilG.png) no-repeat center center","background-size": "30px 30px"});
            
            $("#icoFMBuscar").css({"color":"#3A9CB1"});
            $("#icoFMPublicar").css({"color":"rgba(89, 89, 89, 0.8)"});                       
            $("#icoFMMensaje").css({"color":"rgba(89, 89, 89, 0.8)"});            
            $("#icoFMPerfil").css({"color":"rgba(89, 89, 89, 0.8)"});               
        }
        else{

            $("#paginaPrincipal").css("display", "none");
            $("#paginaListaMapas").css("display", "none"); 
            $("#paginaPublicar").css("display", "none");
            $("#mapDireccionBuscar").css("display", "none"); 
            $("#divFooter").css("display", "block");         
            //$("#paginaMensaje").css("display", "none");            
            $("#paginaUsuarioPerfilEditar").css("display", "none");
            $("#paginaUsuarioPerfilMostrar").css("display", "block");

            $(".icoFooter .icoFooterBuscar").css({"background": "url(img/buscarG.png) no-repeat center center","background-size": "30px 30px"});
            $(".footer .icoFooterPublicar").css({"background": "url(img/publicarG.png) no-repeat center center","background-size": "30px 30px"}); 
            $(".footer .icoFooterMensajes").css({"background": "url(img/mensajeG.png) no-repeat center center","background-size": "30px 30px"});
            $(".icoFooter .icoFooterUsuario").css({"background": "url(img/perfilC.png) no-repeat center center","background-size": "30px 30px"});  

            $("#icoFMBuscar").css({"color":"rgba(89, 89, 89, 0.8)"});  
            $("#icoFMPublicar").css({"color":"rgba(89, 89, 89, 0.8)"});                       
            $("#icoFMMensaje").css({"color":"rgba(89, 89, 89, 0.8)"});            
            $("#icoFMPerfil").css({"color":"#3A9CB1"});      
                                    
            /*datdo recuperados de local storage*/
            // $("#imgPerfil").attr({"src":"http://192.168.0.160/wasiWeb/"+ $datosLocal['usrImg']});
            $("#fotoPerfilM").css({"background": "url(http://" + ipConex + "/wasiWeb/"+ $datosLocal['usrImg'] +") no-repeat center center ","background-size": "cover"});
            $("#nombrePM").html($datosLocal.usrName);
            $("#apellidosPM").html($datosLocal.usrLname);
            if ($datosLocal.usrSexo==1) {
                $("#divSexo").css({"border-color":"#999999","box-shadow":""});
                $("#imgSexo").css({"background": "url(img/hombreG.png) no-repeat center center ","background-size": "25px 30px"});
            }
            if ($datosLocal.usrSexo==2) {
                $("#divSexo").css({"border-color":"#999999","box-shadow":""}); 
                $("#imgSexo").css({"background": "url(img/mujerG.png) no-repeat center center ","background-size": "25px 30px"});
                    
            }                            
            /*borrar mensajes despues de pasar por otra pagina*/
            $("#mensajeErrorNombreP").html("");
            $("#mensajeErrorApellidosP").html("");
            $("#mensajeErrorContrasenyaP").html("");
            $("#mensajeErrorContrasenyaNP").html("");
            $("#mensajeErrorCContrasenyaNP").html(""); 

            if (icoUserpublicadosM==0) {//0 si nunca entro a ico usuario
                console.log("#btnAtrasDireccion datosLocal "+ JSON.stringify($datosLocal));
                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    url: 'http://' + ipConex + '/wasiWeb/php/consultarPublicados.php',
                    data: {idUsuario:$datosLocal['usrId']},                 
                    crossDomain: true,
                    cache: false,
                    beforeSend: function(){
                         //Agregamos la clase loading al body
                        $('body').addClass('loading');
                         //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                        console.log("entro a la crga del gif");
                        },
                    success: function(datosPublicados){
                        if (datosPublicados['publicados']>0) {                    
                            cargarPublicadosBD(datosPublicados);                        
                        }
                        console.log("datosPublicados "+JSON.stringify(datosPublicados)); 
                        console.log("longitudPublicados "+ datosPublicados['publicados']);
                        $('body').removeClass('loading'); //Removemos la clase loading      
                    },
                    error : function(jqXHR, textStatus, errorThrown) {
                        $('body').removeClass('loading'); //Removemos la clase loading
                        alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);                    
                    },
                    complete: function(){
                       //$('body').addClass('loading'); 
                      $('body').removeClass('loading'); //Removemos la clase loading
                      
                    }
                }); 
                icoUserpublicadosM=1; 
                 
            }
            btnAtrasFoto = 0;//para controlar el acceso a editar publicacion consultar fotos datos 
            btnAtrasVi = 0;//para controlar acceso editar publicacion consultar vivienda
            btnAtrasHabi = 0;//para control acceso editar publcaion consultar habitracion
            //continuarHabi= 1;// para contrtol de  acceso publicar actualizar la publicaion

            /* aqui implementar el reinicio del los forms y las fotos,  al finalizar al publicacion */

            $('#formPublicarDireccion')[0].reset();
            $('#formPublicarFotoUbicacion')[0].reset();
            $('#formPublicarVi')[0].reset();
            $('#formPublicarSe')[0].reset();
            $('#formPublicarHabitacion')[0].reset();
            
            $("#imgPublicar div").remove(".fotoPublicar");  
            $("#imgPublicar").data("cont",0); 
            storedFilesDb = [];   //inciar una vez mas 
            storedFiles=[];// no verficado 
            $("#contenedorServicios div").remove(".serviciosPu");

            $("#imgNoPeFumar").css({"background": "url(img/noFumarGLe.png) no-repeat center center ","background-size": "58px 68px"});
            $("#imgNoPeFumar").css({"border-color":"#999999","box-shadow": " "}); 
            $("#imgNoPeMascota").css({"background": "url(img/noMascotaGLe.png) no-repeat center center ","background-size": "58px 68px"});
            $("#imgNoPeMascota").css({"border-color":"#999999","box-shadow": " "}); 
            $("#imgNoPePareja").css({"background": "url(img/noParejaGLe.png) no-repeat center center ","background-size": "58px 68px"});
            $("#imgNoPePareja").css({"border-color":"#999999","box-shadow": " "});   
            /****************Fin de reseteo a los forms de publicar ********/
        }       
    });
    $("#btnAtrasfotoUbicacion").click(function() {
        $(".div-custom-principal .divPublicar").css("padding", "0px");
        //$("#paginaPublicar").css("display", "block");        
        $("#publicarDireccion").css("display","block");
        $("#publicarFotoUbicacion").css("display","none");
        $("#publicarVivienda").css("display", "none"); 
        $("#publicarHabitacion").css("display","none");
        $(".container-custom-principal .progressbar-bar-custom").css("width", "25%");
        btnAtrasFoto=1;
        continuarDir=0;        
    });
    $("#btnAtrasVivienda").click(function(){       
        $("#paginaPublicar").css("display", "block");        
        $("#publicarDireccion").css("display","none");
        $("#publicarFotoUbicacion").css("display","block")
        $("#publicarVivienda").css("display", "none"); 
        $("#publicarHabitacion").css("display","none");
        $(".container-custom-principal .progressbar-bar-custom").css("width", "50%");
        btnAtrasVi=1; 
        continuarFUbi=0;
    });
    $("#btnAtrasServicios").click(function(){       
        $("#paginaPublicar").css("display", "block");        
        $("#publicarDireccion").css("display","none");
        $("#publicarFotoUbicacion").css("display","none")
        $("#publicarVivienda").css("display", "block");
        $("#publicarServicios").css("display","none") 
        $("#publicarHabitacion").css("display","none");
        $(".container-custom-principal .progressbar-bar-custom").css("width", "75%");        
        guardarServicios();        
        if (sMPu==1&&qMPu==1&&(cHoMPu==1||cMuMPu==1)&&((asMPu==1)||(caMPu==1)||(esMPu==1)||(laMPu==1)||(lavMPu==1)||(muMPu==1)||(pisMPu==1)||(poMPu==1)||(raMPu==1)||(seMPu==1)||(tvMPu==1)||(wifiMPu==1))) {
            $("#btnContinuarVi").css({"background-color":"#008080"});//color tema
            $("#mensajeErrorServiciosPu").html(""); 
        }
        else{
            $("#btnContinuarVi").css({"background-color":"#808080"});//gris tema    
        }
    });
    //btnMasServicios
    $("#contenedorServicios").click(function(){
        
        $("#publicarDireccion").css("display","none");
        $("#publicarFotoUbicacion").css("display","none");
        $("#publicarVivienda").css("display","none");
        $("#publicarServicios").css("display","block");
        $("#publicarHabitacion").css("display","none");
        $("#mensajeErrorServiciosPuLi").html("");
        if (guardarSe==0) { 
            $guardarSeAnt = guardarSe;//recupera el valor inicial despues de presionar btnAnteriorServicio    
        }               
    });
    $("#btnAtrasHabitacion").click(function() {
        //alert("hola atras");
        $("#paginaPublicar").css("display", "block");
        $("#publicarDireccion").css("display","none");
        $("#publicarFotoUbicacion").css("display","none")
        $("#publicarVivienda").css("display", "block");
        $("#publicarHabitacion").css("display","none");
        $(".container-custom-principal .progressbar-bar-custom").css("width", "75%");
        btnAtrasHabi=1;
        //continuarVi=0;

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
            
            $("#fotoPerfilE").css({"background": "url(http://" + ipConex + "/wasiWeb/"+ $datosLocal['usrImg'] +") no-repeat center center ","background-size": "cover"});
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
        if ($datosLocal['usrAct']==0) {//si no entro nunca a perfil 
            
            $("#paginaPrincipal").css("display", "none");
            $("#paginaListaMapas").css("display", "none"); 
            $("#paginaPublicar").css("display", "none");
            $("#contenedorMapaDireccion").css("display", "none");        
            $("#paginaMensaje").css("display", "none");            
            $("#paginaUsuarioPerfilEditar").css("display", "block");
            $("#paginaUsuarioPerfilMostrar").css("display", "none");
            $("#divFooter").css("display", "none");
            /*datdo recuperados de local storage*/
            
            $("#fotoPerfilE").css({"background": "url(http://" + ipConex + "/wasiWeb/"+$datosLocal['usrImg']+") no-repeat center center ","background-size":"cover"});
            $("#nombreP").val($datosLocal.usrName);
            $("#apellidosP").val($datosLocal.usrLname);
            $("#emailP").val($datosLocal.usrEmail);
            $("#telefonoP").val($datosLocal.usrPhone);             
        }
        else{ //despues de actualizar o editar perfil 
                      
            $("#paginaPrincipal").css("display", "none");
            $("#paginaListaMapas").css("display", "none"); 
            $("#paginaPublicar").css("display", "none");

            $("#paginaMensaje").css("display", "none");            
            $("#paginaUsuarioPerfilEditar").css("display", "none");
            $("#paginaUsuarioPerfilMostrar").css("display", "block");

            $(".icoFooter .icoFooterBuscar").css({"background": "url(img/buscarG.png) no-repeat center center","background-size": "30px 30px"});
            $(".icoFooter .glyphicon-upload").css({"color":"rgba(89, 89, 89, 0.8)"});
            $(".icoFooter .glyphicon-comment").css({"color":"rgba(89, 89, 89, 0.8)"});
           /* $(".icoFooter #icoBuscar").css({"border-top": "2px solid #f2f2f2"});*/  
            //$(".icoFooter #icoUsuario").css({"border-top": "2px solid #008080"});  
            $(".icoFooter .icoFooterUsuario").css({"background": "url(img/perfilC.png) no-repeat center center","background-size": "30px 30px"});  

            $("#icoFMBuscar").css({"color":"rgba(89, 89, 89, 0.8)"});  
            $("#icoFMPublicar").css({"color":"rgba(89, 89, 89, 0.8)"});                       
            $("#icoFMMensaje").css({"color":"rgba(89, 89, 89, 0.8)"});            
            $("#icoFMPerfil").css({"color":"#3A9CB1"});      
                                    
            /*datdo recuperados de local storage*/
            // $("#imgPerfil").attr({"src":"http://192.168.0.160/wasiWeb/"+ $datosLocal['usrImg']});
            $("#fotoPerfilM").css({"background": "url(http://" + ipConex + "/wasiWeb/"+ $datosLocal['usrImg'] +") no-repeat center center ","background-size": "cover"});
            $("#nombrePM").html($datosLocal.usrName);
            $("#apellidosPM").html($datosLocal.usrLname);
            if ($datosLocal.usrSexo==1) {
                $("#divSexo").css({"border-color":"#999999","box-shadow":""});
                $("#imgSexo").css({"background": "url(img/hombreG.png) no-repeat center center ","background-size": "25px 30px"});
            }
            if ($datosLocal.usrSexo==2) {
                $("#divSexo").css({"border-color":"#999999","box-shadow":""}); 
                $("#imgSexo").css({"background": "url(img/mujerG.png) no-repeat center center ","background-size": "25px 30px"});
                    
            }                            
            /*borrar mensajes despues de pasar por otra pagina*/
            $("#mensajeErrorNombreP").html("");
            $("#mensajeErrorApellidosP").html("");
            $("#mensajeErrorContrasenyaP").html("");
            $("#mensajeErrorContrasenyaNP").html("");
            $("#mensajeErrorCContrasenyaNP").html(""); 
            if (icoUserpublicadosM==0) {//0 si nunca entro a ico usuario
                console.log("datosLocal "+ JSON.stringify($datosLocal));
                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    url: 'http://' + ipConex + '/wasiWeb/php/consultarPublicados.php',
                    data: {idUsuario:$datosLocal['usrId']},                 
                    crossDomain: true,
                    cache: false,
                    beforeSend: function(){
                     //Agregamos la clase loading al body
                    $('body').addClass('loading');
                     //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                    console.log("entro a la crga del gif");
                    },
                    success: function(datosPublicados){
                        if (datosPublicados['publicados']>0) {                    
                            cargarPublicadosBD(datosPublicados);                        
                        }
                        console.log("datosPublicados "+JSON.stringify(datosPublicados)); 
                        console.log("longitudPublicados "+ datosPublicados['publicados']);      
                    },
                    error : function(jqXHR, textStatus, errorThrown) {
                        $('body').removeClass('loading'); //Removemos la clase loading
                        alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);                    
                    },
                    complete: function(){
                       //$('body').addClass('loading'); 
                      $('body').removeClass('loading'); //Removemos la clase loading
                    }
                }); 
                icoUserpublicadosM=1;   
            }         
        }             
    });
    $("#imgSexoH").click(function(){        
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
    $("#incluyeGastos").click(function(){
        if ($('#cboxIncluyeGastos').prop('checked')){
            $('#cboxIncluyeGastos').val('1');
            //$(".incluyeGastos input[type='checkbox'] + label span").css({"background": "url(img/uncheck.png)"});            
        }
        else{
            $('#cboxIncluyeGastos').val('0');
            //$("incluyeGastos input[type='checkbox']:checked + label span").css({"background": "url(img/check.png)"});                        
        }         
    });
    $("#imgViSolo").click(function(){        
        if ($contViSolo % 2 == 0) {
            $contViSolo++;
            $("#imgViSolo").css({"background": "url(img/camaSN.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgViSolo").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
            
            $("#imgViComp").css({"border-color":"#999999","box-shadow":""});            
            $("#imgViComp").css({"background": "url(img/camaLG.png) no-repeat center center ","background-size": "60px 70px"});
            $contViComp=0;
            qMPu=1;
            continuarVi=1;
            if (sMPu == 1 && qMPu == 1 && (cHoMPu == 1 || cMuMPu == 1)&&((asMPu==1)||(caMPu==1)||(esMPu==1)||(laMPu==1)||(lavMPu==1)||(muMPu==1)||(pisMPu==1)||(poMPu==1)||(raMPu==1)||(seMPu==1)||(tvMPu==1)||(wifiMPu==1))) {
                $("#btnContinuarVi").css({"background-color":"#008080"});//color tema 
            }             
        }        
        else{
            $contViSolo++;
            $("#imgViSolo").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgViSolo").css({"background": "url(img/camaSG.png) no-repeat center center ","background-size": "60px 70px"});
            
            $("#radioViSolo").prop('checked', false); //quitar el check de checkbox
            qMPu=0;
            $("#btnContinuarVi").css({"background-color":"#808080"});//gris tema 
        }              
    });
    $("#imgViComp").click(function(){
        if ($contViComp % 2 == 0) {
            $contViComp++;
            $("#imgViComp").css({"background": "url(img/camaLN.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgViComp").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
             
            $("#imgViSolo").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgViSolo").css({"background": "url(img/camaSG.png) no-repeat center center ","background-size": "60px 70px"});
             $contViSolo=0;
             qMPu=1;
             continuarVi=1;
            if (sMPu == 1 && qMPu == 1 && (cHoMPu == 1 || cMuMPu == 1)&&((asMPu==1)||(caMPu==1)||(esMPu==1)||(laMPu==1)||(lavMPu==1)||(muMPu==1)||(pisMPu==1)||(poMPu==1)||(raMPu==1)||(seMPu==1)||(tvMPu==1)||(wifiMPu==1))) {
                $("#btnContinuarVi").css({"background-color":"#008080"});//color tema 
            }            
        }
        else{
            $contViComp++;
            $("#imgViComp").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgViComp").css({"background": "url(img/camaLG.png) no-repeat center center ","background-size": "60px 70px"});
               
            $("#radioViComp").prop('checked', false); //quitar el check de checkbox
            qMPu=0;
            $("#btnContinuarVi").css({"background-color":"#808080"});//gris tema 
        }
    });

    $("#btnHoMas").click(function(){
        //$contHoNe='null';
        if ($contHombres == 9 || $contHombres > 10) {
            $contHombres = 9;
            //$contHoNe = 0;
        }
        else{
            $contHoNe=1;
            $contHombres++;                
        }
        if ($contHoNe) { // para que entre solo una vez despues de pasar de 1
            $("#imgViHo").css({"background": "url(img/hombreNViPu.png) no-repeat center center ","background-size": "65px 70px"});
            $contHoNe=0;
            $("#mensajeErrorPersonasPu").html("");
            cHoMPu=1;
            continuarVi=1;
            if (sMPu == 1 && qMPu == 1 && (cHoMPu == 1 || cMuMPu == 1)&&((asMPu==1)||(caMPu==1)||(esMPu==1)||(laMPu==1)||(lavMPu==1)||(muMPu==1)||(pisMPu==1)||(poMPu==1)||(raMPu==1)||(seMPu==1)||(tvMPu==1)||(wifiMPu==1))) {
                $("#btnContinuarVi").css({"background-color":"#008080"});//color tema 
            } 
        }
        $("#cantHombres").val($contHombres);        
    });

    $("#btnHoMenos").click(function(){
        continuarVi=1;
        if ($contHombres == 0) {
            $contHombres = 0;
            $contHoG=0;            
        }
        else{
            $contHombres--;
            if ($contHombres==0) {
                $contHoG=1;    
            }
            else{
                $contHoG=0;    
            }            
        }
        if ($contHoG) {
            $("#imgViHo").css({"background": "url(img/hombreGViPu.png) no-repeat center center ","background-size": "65px 70px"});
            $contHoG=0;
            cHoMPu=0;
            if (cHoMPu == 0 && cMuMPu == 0) {
                $("#btnContinuarVi").css({"background-color":"#808080"});//gris tema 
            }
        }
        $("#cantHombres").val($contHombres);        
    });

    $("#btnMuMas").click(function(){
        //$contMuNe='null';
        if ($contMujeres == 9 || $contMujeres > 10) {
            $contMujeres = 9;            
        }
        else{
            $contMuNe=1;
            $contMujeres++;    
        }
        if ($contMuNe) {
            $("#imgViMu").css({"background": "url(img/mujerNViPu.png) no-repeat center center ","background-size": "65px 70px"});
            $contMuNe=0;
            $("#mensajeErrorPersonasPu").html("");
            cMuMPu=1;
            continuarVi=1;
            if (sMPu == 1 && qMPu == 1 && (cHoMPu == 1 || cMuMPu == 1)&&((asMPu==1)||(caMPu==1)||(esMPu==1)||(laMPu==1)||(lavMPu==1)||(muMPu==1)||(pisMPu==1)||(poMPu==1)||(raMPu==1)||(seMPu==1)||(tvMPu==1)||(wifiMPu==1))) {
                $("#btnContinuarVi").css({"background-color":"#008080"});//color tema 
            }
        }        
        $("#cantMujeres").val($contMujeres);        
    });
    $("#btnMuMenos").click(function(){
        continuarVi=1;
        if ($contMujeres == 0) {
            $contMujeres = 0;
            $contMuG=0;
        }
        else{
            $contMujeres--;
            if ($contMujeres==0) {
                $contMuG=1;    
            }
            else{
                $contMuG = 0;
            }
        }
        if ($contMuG) {
            $("#imgViMu").css({"background": "url(img/mujerGViPu.png) no-repeat center center ","background-size": "65px 70px"});
            $contMuG=0;
            cMuMPu=0;
            if (cHoMPu == 0 && cMuMPu == 0) {
                $("#btnContinuarVi").css({"background-color":"#808080"});//gris tema 
            }
        }
        $("#cantMujeres").val($contMujeres);        
    });
    $("#imgNoPeFumar").click(function(){
        continuarVi=1;
        if ($('#cboxNoFumar').prop('checked')){
            $('#cboxNoFumar').val('1');
            $("#imgNoPeFumar").css({"background": "url(img/noFumarNLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgNoPeFumar").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
        }
        else{
            $('#cboxNoFumar').val('0');
            $("#imgNoPeFumar").css({"background": "url(img/noFumarGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgNoPeFumar").css({"border-color":"#999999","box-shadow":""});             
        }              
    });
    $("#imgNoPeMascota").click(function(){
        continuarVi=1;
        if ($('#cboxNoMascota').prop('checked')){
            $('#cboxNoMascota').val('1');            
            $("#imgNoPeMascota").css({"background": "url(img/noMascotaNLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgNoPeMascota").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
        }
        else{
            $('#cboxNoMascota').val('0');
            $("#imgNoPeMascota").css({"background": "url(img/noMascotaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgNoPeMascota").css({"border-color":"#999999","box-shadow":""});             
        }              
    });
    $("#imgNoPePareja").click(function(){
        continuarVi=1;
        if ($('#cboxNoPareja').prop('checked')){
            $('#cboxNoPareja').val('1');
            $("#imgNoPePareja").css({"background": "url(img/noParejaNLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgNoPePareja").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
        }
        else{
            $('#cboxNoPareja').val('0');
            $("#imgNoPePareja").css({"background": "url(img/noParejaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgNoPePareja").css({"border-color":"#999999","box-shadow":""});             
        }              
    });
    $("#imgCaSolo").click(function(){
        continuarHabi=1;        
        if ($contHaCaSolo % 2 == 0) {
            $contHaCaSolo++;
            $("#imgCaSolo").css({"background": "url(img/camaSimpleNLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgCaSolo").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
            
            $("#imgCaDoble").css({"border-color":"#999999","box-shadow":""});            
            $("#imgCaDoble").css({"background": "url(img/camaDobleGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaDoble=0;
            $("#imgCaSofa").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaSofa").css({"background": "url(img/camaSofaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSofa=0;
            $("#imgCaLitera").css({"border-color":"#999999","box-shadow":""});            
            $("#imgCaLitera").css({"background": "url(img/camaLiteraGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaLitera=0;
            $("#imgCaSolos").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaSolos").css({"background": "url(img/camaSolosGLe.png) no-repeat center center ","background-size": "60px 70px"});
            contHaCaSolos=0;
            $("#imgCaNada").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaNada").css({"background": "url(img/camaNadaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaNada=0;

            camaMPu=1;            
           /* qMPu=1;
            continuarVi=1;*/
            if ($('#cboxfechaHasta').val() == 0) {//chboxfechaHasta no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxFechaHasta esta chek
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && finFMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }                         
        }        
        else{
            $contHaCaSolo++;
            $("#imgCaSolo").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaSolo").css({"background": "url(img/camaSimpleGLe.png) no-repeat center center ","background-size": "60px 70px"});
            
            $("#radioCaSolo").prop('checked', false); //quitar el check de checkbox
            camaMPu=0;
            $("#btnContinuarHabitacion").css({"background-color":"#808080"});//gris tema 
        }

    });
    $("#imgCaDoble").click(function(){
        continuarHabi=1;        
        if ($contHaCaDoble % 2 == 0) {
            $contHaCaDoble++;
            $("#imgCaDoble").css({"background": "url(img/camaDobleNLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgCaDoble").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
            
            $("#imgCaSolo").css({"border-color":"#999999","box-shadow":""});            
            $("#imgCaSolo").css({"background": "url(img/camaSimpleGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSolo=0;
            $("#imgCaSofa").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaSofa").css({"background": "url(img/camaSofaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSofa=0;
            $("#imgCaLitera").css({"border-color":"#999999","box-shadow":""});            
            $("#imgCaLitera").css({"background": "url(img/camaLiteraGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaLitera=0;
            $("#imgCaSolos").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaSolos").css({"background": "url(img/camaSolosGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSolos=0;
            $("#imgCaNada").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaNada").css({"background": "url(img/camaNadaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaNada=0;

            camaMPu=1;

            if ($('#cboxfechaHasta').val() == 0) {//cboxfechaHasta no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxFechaHasta esta chek
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && finFMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
           
        }        
        else{
            $contHaCaDoble++;
            $("#imgCaDoble").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaDoble").css({"background": "url(img/camaDobleGLe.png) no-repeat center center ","background-size": "60px 70px"});
            
            $("#radioCaDoble").prop('checked', false); //quitar el check de checkbox
            camaMPu=0;
            $("#btnContinuarHabitacion").css({"background-color":"#808080"});//gris tema 
        }              
    });
    $("#imgCaSofa").click(function(){  
        continuarHabi=1;      
        if ($contHaCaSofa % 2 == 0) {
            $contHaCaSofa++;
            $("#imgCaSofa").css({"background": "url(img/camaSofaNLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgCaSofa").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
            
            $("#imgCaSolo").css({"border-color":"#999999","box-shadow":""});            
            $("#imgCaSolo").css({"background": "url(img/camaSimpleGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSolo=0;
            $("#imgCaDoble").css({"border-color":"#999999","box-shadow":""});            
            $("#imgCaDoble").css({"background": "url(img/camaDobleGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaDoble=0;            
            $("#imgCaLitera").css({"border-color":"#999999","box-shadow":""});            
            $("#imgCaLitera").css({"background": "url(img/camaLiteraGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaLitera=0;
            $("#imgCaSolos").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaSolos").css({"background": "url(img/camaSolosGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSolos=0;
            $("#imgCaNada").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaNada").css({"background": "url(img/camaNadaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaNada=0;

            camaMPu=1;

            if ($('#cboxfechaHasta').val() == 0) {//cboxfechaHasta no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxFechaHasta esta chek
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && finFMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }          
        }        
        else{
            $contHaCaSofa++;
            $("#imgCaSofa").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaSofa").css({"background": "url(img/camaSofaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            
            $("#radioCaSofa").prop('checked', false); //quitar el check de checkbox
            camaMPu=0;
            $("#btnContinuarHabitacion").css({"background-color":"#808080"});//gris tema 
        }              
    });
    $("#imgCaLitera").click(function(){
        continuarHabi=1;        
        if ($contHaCaLitera % 2 == 0) {
            $contHaCaLitera++;
            $("#imgCaLitera").css({"background": "url(img/camaLiteraNLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgCaLitera").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
            
            $("#imgCaSolo").css({"border-color":"#999999","box-shadow":""});            
            $("#imgCaSolo").css({"background": "url(img/camaSimpleGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSolo=0;            
            $("#imgCaDoble").css({"border-color":"#999999","box-shadow":""});            
            $("#imgCaDoble").css({"background": "url(img/camaDobleGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaDoble=0;
            $("#imgCaSofa").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaSofa").css({"background": "url(img/camaSofaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSofa=0;
            $("#imgCaSolos").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaSolos").css({"background": "url(img/camaSolosGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSolos=0;
            $("#imgCaNada").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaNada").css({"background": "url(img/camaNadaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaNada=0;

            camaMPu=1;

            if ($('#cboxfechaHasta').val() == 0) {//cboxfechaHasta no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxFechaHasta esta chek
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && finFMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }          
        }        
        else{
            $contHaCaLitera++;
            $("#imgCaLitera").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaLitera").css({"background": "url(img/camaLiteraGLe.png) no-repeat center center ","background-size": "60px 70px"});
            
            $("#radioCaLitera").prop('checked', false); //quitar el check de checkbox
            camaMPu=0;
            $("#btnContinuarHabitacion").css({"background-color":"#808080"});//gris tema 
        }              
    });
    $("#imgCaSolos").click(function(){ 
        continuarHabi=1;       
        if ($contHaCaSolos % 2 == 0) {
            $contHaCaSolos++;
            $("#imgCaSolos").css({"background": "url(img/camaSolosNLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgCaSolos").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
            
            $("#imgCaSolo").css({"border-color":"#999999","box-shadow":""});            
            $("#imgCaSolo").css({"background": "url(img/camaSimpleGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSolo=0;            
            $("#imgCaDoble").css({"border-color":"#999999","box-shadow":""});            
            $("#imgCaDoble").css({"background": "url(img/camaDobleGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaDoble=0;
            $("#imgCaSofa").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaSofa").css({"background": "url(img/camaSofaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSofa=0;
            $("#imgCaLitera").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaLitera").css({"background": "url(img/camaLiteraGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaLitera=0;
            $("#imgCaNada").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaNada").css({"background": "url(img/camaNadaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaNada=0;

            camaMPu=1;

            if ($('#cboxfechaHasta').val() == 0) {//chboxfechafin no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxFechaHastacheboxFechaHasta esta chek
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && finFMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }

        }        
        else{
            $contHaCaSolos++;
            $("#imgCaSolos").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaSolos").css({"background": "url(img/camaSolosGLe.png) no-repeat center center ","background-size": "60px 70px"});
            
            $("#radioCaSolos").prop('checked', false); //quitar el check de checkbox
            camaMPu=0;
            $("#btnContinuarHabitacion").css({"background-color":"#808080"});//gris tema 
        }              
    });
    $("#imgCaNada").click(function(){  
        continuarHabi=1;      
        if ($contHaCaNada % 2 == 0) {
            $contHaCaNada++;
            $("#imgCaNada").css({"background": "url(img/camaNadaNLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgCaNada").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
            
            $("#imgCaSolo").css({"border-color":"#999999","box-shadow":""});            
            $("#imgCaSolo").css({"background": "url(img/camaSimpleGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSolo=0;            
            $("#imgCaDoble").css({"border-color":"#999999","box-shadow":""});            
            $("#imgCaDoble").css({"background": "url(img/camaDobleGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaDoble=0;
            $("#imgCaSofa").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaSofa").css({"background": "url(img/camaSofaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSofa=0;
            $("#imgCaLitera").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaLitera").css({"background": "url(img/camaLiteraGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaLitera=0;
            $("#imgCaSolos").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaSolos").css({"background": "url(img/camaSolosGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaCaSolos=0;

            camaMPu=1;

            if ($('#cboxfechaHasta').val() == 0) {//chboxfechafin no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxFechaHasta esta chek
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && finFMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }         
        }        
        else{
            $contHaCaNada++;
            $("#imgCaNada").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgCaNada").css({"background": "url(img/camaNadaGLe.png) no-repeat center center ","background-size": "60px 70px"});
            
            $("#radioCaSolos").prop('checked', false); //quitar el check de checkbox

            camaMPu=0;
            $("#btnContinuarHabitacion").css({"background-color":"#808080"});//gris tema 
        }              
    });
   
        var today = new Date();
        var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date+' '+time;            
        //$("#fechaDesde").val(date);   

    $('#fechaDesde').datepicker({
        format:'yyyy/m/d',
        startDate: dateTime,
        todayBtn: true,
        autoclose: true,        
    }).on('changeDate', function(ev) {
        
        console.log("changeDate fechaDesde"+$('#fechaDesde').val());
        var selected = new Date(ev.date);       
        $("#fechaHasta").datepicker('setStartDate', new Date(selected.setDate(selected.getDate() + 30)));
        
        if(datosConHabi ==0 ){ 
            continuarHabi=1;
            $("#cboxfechaHasta").prop('disabled', false);           
            inFMPu=1;
            $("#mensajeErrorHasta").html(""); 
        }
        if (datosConHabi==1) {
           // $("#cboxfechaHasta").prop('disabled', true);
           // inFMPu=0;
            datosConHabi=0;
        }
        
        if ($('#cboxfechaHasta').val() == 0) {//chboxfechafin no check
            if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
            }
        }
        else{//cuando cheboxFechaHasta esta chek
            if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && finFMPu == 1 && dimMPu == 1) {
                $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
            }
        } 
    });
    $("#containerHasta").click(function(){

        if (inFMPu == 0) {
            $hastaErrorPu = "Antes elige una fecha de inicio.";        
            $("#mensajeErrorHasta").html($hastaErrorPu);  
        }
        //alert("click check");
    });
    $("#cboxfechaHasta").click(function(){
        event.stopPropagation();
        if ($('#cboxfechaHasta').prop('checked')){
            $contFinFecha=1;
            $('#cboxfechaHasta').val('1');              
            $("#collapseHasta").collapse('show');
            $(".container-custom-principal .contenedorHasta-collapse-custom").css({"margin-bottom": "0px","border-bottom": "none"});                          
            if (camaMPu == 1 && inFMPu == 1 && finFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
            }
            else{
                $("#btnContinuarHabitacion").css({"background-color":"#808080"});//gris tema     
            }
        }
        else{
            continuarHabi=1;            
            $("#collapseHasta").collapse('hide');
            $('#cboxfechaHasta').val('0');
            //$("#fechaHasta").val("");
            $("#mensajeErrorHasta").html("");
            //finFMPu=0;
            //$('#cboxfechaHasta').prop('disabled',true);  
            $(".container-custom-principal .contenedorHasta-collapse-custom").css({"margin-bottom": "10px","border-bottom": "1px solid #008080"});            
            if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
            }
        }                    
    });
    $('#fechaHasta').datepicker({
        format: 'yyyy/m/d',        
        autoclose: true,        
    }).on('changeDate',function(e){
        console.log("changeDate fechaHasta"+$('#fechaHasta').val());
        if ($contFinFecha>0) {        
            finFMPu=1;
            continuarHabi=1;            
        }        
        if (camaMPu == 1 && inFMPu == 1 && finFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
            $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
        } 
        $("#mensajeErrorDisponibleH").html("");   
        $("#mensajeErrorHasta").html("");
    });    
    
    $("#imgHaS").click(function(){
        continuarHabi=1;        
        if ($contHaS % 2 == 0) {
            $contHaS++;
            $("#imgHaS").css({"background": "url(img/dimensionesSNLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgHaS").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
            
            $("#imgHaM").css({"border-color":"#999999","box-shadow":""});            
            $("#imgHaM").css({"background": "url(img/dimensionesMGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaM=0;            
            $("#imgHaL").css({"border-color":"#999999","box-shadow":""});            
            $("#imgHaL").css({"background": "url(img/dimensionesLGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaL=0;
            /* 
            continuarVi=1;
               */ 
            dimMPu=1;

            if ($('#cboxfechaHasta').val() == 0) {//chboxfechafin no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxFechaHasta esta chek
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && finFMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }                    
        }        
        else{
            $contHaS++;
            $("#imgHaS").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgHaS").css({"background": "url(img/dimensionesSGLe.png) no-repeat center center ","background-size": "60px 70px"});
            
            $("#radioHaS").prop('checked', false); //quitar el check de checkbox
            dimMPu=0;
            $("#btnContinuarHabitacion").css({"background-color":"#808080"});//gris tema 
        }              
    });
    $("#imgHaM").click(function(){
        continuarHabi=1;        
        if ($contHaM % 2 == 0) {
            $contHaM++;
            $("#imgHaM").css({"background": "url(img/dimensionesMNLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgHaM").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
            
            $("#imgHaS").css({"border-color":"#999999","box-shadow":""});            
            $("#imgHaS").css({"background": "url(img/dimensionesSGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaS=0;            
            $("#imgHaL").css({"border-color":"#999999","box-shadow":""});            
            $("#imgHaL").css({"background": "url(img/dimensionesLGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaL=0;
            
           dimMPu=1;

            if ($('#cboxfechaHasta').val() == 0) {//cheboxFechaHasta no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxFechaHasta esta chek
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && finFMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }        
        }        
        else{
            $contHaM++;
            $("#imgHaM").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgHaM").css({"background": "url(img/dimensionesMGLe.png) no-repeat center center ","background-size": "60px 70px"});
            
            $("#radioHaM").prop('checked', false); //quitar el check de checkbox
            dimMPu=0;
            $("#btnContinuarHabitacion").css({"background-color":"#808080"});//gris tema 
        }              
    });
    $("#imgHaL").click(function(){
        continuarHabi=1;        
        if ($contHaL % 2 == 0) {
            $contHaL++;
            $("#imgHaL").css({"background": "url(img/dimensionesLNLe.png) no-repeat center center ","background-size": "60px 70px"});
            $("#imgHaL").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
            
            $("#imgHaS").css({"border-color":"#999999","box-shadow":""});            
            $("#imgHaS").css({"background": "url(img/dimensionesSGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaM=0;            
            $("#imgHaM").css({"border-color":"#999999","box-shadow":""});            
            $("#imgHaM").css({"background": "url(img/dimensionesMGLe.png) no-repeat center center ","background-size": "60px 70px"});
            $contHaL=0;
            
           dimMPu=1;

            if ($('#cboxfechaHasta').val() == 0) {//cboxfechaHasta no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxFechaHasta esta chek
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && finFMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }        
        }        
        else{
            $contHaL++;
            $("#imgHaL").css({"border-color":"#999999","box-shadow":""}); 
            $("#imgHaL").css({"background": "url(img/dimensionesLGLe.png) no-repeat center center ","background-size": "60px 70px"});
            
            $("#radioHaL").prop('checked', false); //quitar el check de checkbox
            dimMPu=0;
            $("#btnContinuarHabitacion").css({"background-color":"#808080"});//gris tema 
        }              
    });
// caso cuando se busca por link direccion
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
            //alert("latlon "+Latitude+" "+Longitude);           
            // Creamos el marcador
            //Creamos el marcador en el mapa con sus propiedades
            //para nuestro obetivo tenemos que poner el atributo draggable en true
            //position pondremos las mismas coordenas que obtuvimos en la geolocalización
            markerD = new google.maps.Marker({
                map: mapD,
                position: {lat: Latitude, lng: Longitude},
                position: new google.maps.LatLng(Latitude,Longitude)
                //draggable: true
            });
                      
            //agregamos un evento al marcador junto con la funcion callback al igual que el evento dragend que indica 
            //cuando el usuario a soltado el marcador
           // markerD.addListener('click', toggleBounce);//para animar el marcador      
            //google.maps.event.addListener(mapD, 'dragend', function(res) { alert('map dragged '+ JSON.stringify()); } );

            /*mapD.addListener( 'dragend', function (){
                /*console.log(" dragend "+ JSON.stringify(markerD)); 
                console.log(" dragend "+ JSON.stringify(markerD)); 
            //escribimos las coordenadas de la posicion actual del marcador dentro del input #coords
            //document.getElementById("latlon").innerHTML = this.getPosition().lat()+","+ this.getPosition().lng();
            });*/

            markerD.setMap(mapD);
            // creamos el objeto geodecoder
            
            var geocoderD = new google.maps.Geocoder();
            // muestra las ciudad y la direccion 
            geocoderD.geocode({'latLng': markerD.getPosition()}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $('#ciudadMpu').val(results[0].address_components[2].short_name+", "+results[0].address_components[3].short_name);
                    $('#direccionMPu').val(results[0].formatted_address);//(results[0].address_components[1].short_name+", "+results[0].address_components[0].short_name);
                    //+", "+results[4].address_components[0].short_name zona como maternidad i sant ramon
                    $("#btnContinuarDireccion").css({"background-color":"#008080"});
                    //alert("entra linkBuscarDireccion " + results.length);
                    console.log("lat lon "+ JSON.stringify(results));
                    $("#mensajeErrorCiudad").html("");
                    $("#mensajeErrorDireccion").html("");
                    $("#mensajeErrorDireccionT").html("");
                    //miresult=results;
                    addressD1 = results[0].address_components[1].short_name+", "+results[0].address_components[0].short_name;//calle
                    addressD2 = results[0].address_components[2].short_name;//zona
                    ciudadN1 = results[0].address_components[2].short_name;//zona
                    ciudadN2 = results[0].address_components[3].short_name;//ciudad
                    addressPostal = results[0].address_components[6].short_name;//postal
                    
                    addressLat= results[0].geometry.location.lat();
                    addressLon= results[0].geometry.location.lng();

                    linkBuscarDir=1;
                    autoCCiu=1;
                    autoCDir=1;
                    continuarDir=1; 
                    console.log("linkMapaBuscar "+ JSON.stringify(results));   
                }
                else {
                    alert("El Servicio de Codificación Geográfica ha fallado con el siguiente error: " + status + " Intente una vez mas por favor ");
                    $("#btnContinuarDireccion").css({"background-color":"#808080"});
                    linkBuscarDir=0;
                    autoCCiu=0;
                    autoCDir=0;
                    //alert("else "+ linkBuscarDir)
                }

            });   /*
            mapD.addListener('center_changed', function(){
                markerD.setPosition(mapD.getCenter());
                
                //console.log('center_changed '+ (markerD.position.lat));
            })   */              
            // le asignamos una funcion al eventos dragend del marcado
            google.maps.event.addListener(mapD, 'center_changed', function() {
                markerD.setPosition(mapD.getCenter());
            });
            google.maps.event.addListener(mapD, 'dragend', function() {
                //markerD.setPosition(mapD.getCenter());
                geocoderD.geocode({'latLng': markerD.getPosition()}, function(miresults, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        //var address=results[0]['formatted_address'];
                        $('#direccionMPu').val(miresults[0].formatted_address);
                        $('#ciudadMpu').val(miresults[0].address_components[2].short_name+", "+miresults[0].address_components[3].short_name);
                        //miresult=results;
                        addressD1 =miresults[0].address_components[1].short_name+", "+miresults[0].address_components[0].short_name;//calle
                        addressD2 = miresults[0].address_components[2].short_name;//zona
                        ciudadN1 = miresults[0].address_components[2].short_name;//zona                        
                        ciudadN2 = miresults[0].address_components[3].short_name;//ciudad
                        addressPostal = miresults[0].address_components[6].short_name;//postal

                        addressLat= miresults[0].geometry.location.lat();
                        addressLon= miresults[0].geometry.location.lng();
                    
                        linkBuscarDir=1;
                        autoCCiu=1;
                        autoCDir=1;
                        continuarDir=1; 
                        console.log("dragend "+ JSON.stringify(miresults));
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
/*
$(window).on("scroll", function(e) {
    Desplazamiento_Actual = window.pageYOffset;
    if(ubicacionPrincipal >= Desplazamiento_Actual){
        document.getElementById('navbar').style.top = '0';
    }
    else{
        document.getElementById('navbar').style.top = '-100px';
    }
    ubicacionPrincipal = Desplazamiento_Actual;#mensajeCiudad
  $l=$("#divFooter").offset().top;
    console.log("$l "+$l);  
   
  
   $prevScrollpos = window.pageYOffset;
    $(window).scroll(function(){
        $currentScrollPos = window.pageYOffset;

        //if ($('#navbar').scrollTop()>100) 
        if($prevScrollpos>$currentScrollPos)
        {
            //$('#inputBuscar').collapse('show');
            $('#btnPublicarPrincipal').fadeIn(1000);
            //$("#btnPublicarPrincipal").animate({bottom: "75px"});       
           // $('#btnPublicarPrincipal').slideDown();        
            
        }
        else{
            //$('#inputBuscar').collapse('hide');
            $('#btnPublicarPrincipal').fadeOut(1000);
            //$("#btnPublicarPrincipal").animate({bottom: "0"}); 
            //$('#btnPublicarPrincipal').slideUp();
            
        }  
        $prevScrollpos = $currentScrollPos;  
    });*/  

});//fin $(document).ready(function()


ubicacionPrincipal  = window.pageYOffset;
$(window).on("scroll",function(e){
    DesplazamientoActual = window.pageYOffset;
    if(ubicacionPrincipal >= DesplazamientoActual){
        document.getElementById('inputBuscar').style.top = '0';
        //document.getElementById('btnPublicarPrincipal').style.bottom = '0';
    }
    else{
        document.getElementById('inputBuscar').style.top = '-50px';
        //document.getElementById('btnPublicarPrincipal').style.bottom = '-70';
    }
    ubicacionPrincipal = DesplazamientoActual;
});

ubicacionPrincipalM  = window.pageYOffset;
$(window).on("scroll",function(e){
    DesplazamientoActualM = window.pageYOffset;
    if(ubicacionPrincipalM >= DesplazamientoActualM){
        document.getElementById('headerFotosPublicados').style.background = 'none';
        //document.getElementById('btnPublicarPrincipal').style.bottom = '0';
    }
    else{
        document.getElementById('headerFotosPublicados').style.background = '#fff';
        //document.getElementById('btnPublicarPrincipal').style.bottom = '-70';
    }
    ubicacionPrincipalM = DesplazamientoActualM;
});

/*function toggleBounce() {
  if (markerD.getAnimation() !== null) {
    markerD.setAnimation(null);
  } else {
    markerD.setAnimation(google.maps.Animation.BOUNCE);
  }
}*/

function inicioSesion(){
    $datosLocal=JSON.parse(localStorage.getItem('datosInicioSesion'));
    if($datosLocal!= undefined || $datosLocal!= null ){
        /*$.each($datosLocal, function(key, value){alert(key + ' = ' + value);});*/
        $("#nombreCompleto").html($datosLocal['usrName']);
        $("#imgPerfilHeader").attr({"src":"http://" + ipConex + "/wasiWeb/"+ $datosLocal['usrImg']}); 
        $("body").css("background","#f2f2f2");
        $("#divInicio").css("display", "none");
        $("#divPrincipal").css("display", "block");
        $("#icoFMBuscar").css({"color":"#3A9CB1"});
        //$(".icoFooter .glyphicon-search").css({"color":"#008080"});
        //$("#imgP").html($datosLocal['usrImg']);
        //$("#divInicio").css("display", "none");
        $idCliente = $datosLocal['usrId'];
        $emailCliente = $datosLocal['usrEmail'];    
        //alert($datosLocal['usrEmail'] + " " + $datosLocal['usrId']);
    }
}

function iniciarSession(){
    $('#mIS').html(" ");
    $('#mID').html(" ");
    //alert("entra btn inicio");
    event.preventDefault();
    $.ajax({
        type :'POST',
        url:'http://' + ipConex + '/wasiWeb/php/ingresar.php',
        dataType : 'json',        
        data: new FormData($("#formIngreso")[0]),        
        //async: false,
        crossDomain: true,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function(){
             //Agregamos la clase loading al body
            $('body').addClass('loading');
             //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
            console.log("entro a la crga del gif");
        },
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
            $('body').removeClass('loading'); //Removemos la clase loading
            alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
        },
        complete: function(){
            //$('body').addClass('loading'); 
            $('body').removeClass('loading'); //Removemos la clase loading
        }
    });    
}
// cPassword =0 no se cambio el password =1 se cambio pasword  
function activarSwipe(){
    swiperMapa = new Swiper('#swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true,        
        spaceBetween: 5,
        speed:500
        
    });    
  }
 
function activarSwipeFotosPublicados(){
    swiperFoPu = new Swiper('#swiper-containerFotosPublicados', {
        slidesPerView: 1,//auto
        centeredSlides: true,        
        spaceBetween: 0, 
        pagination: {el: '.swiper-pagination'},  
    });
  }

// al continuar direcion insertamos o actualizamos datos de direccion,mostramos foto y datos consultamos si hay datos y fotos en la bse de datos 
function continuarDireccion(){
    event.preventDefault();
    $dirDireccion=addressD1;//dir
    $dirZona=ciudadN1;//zona
    $dirCiudad=ciudadN2;//ciudad
    $dirPostal=addressPostal;//postal    
    $dirLat=addressLat;
    $dirLon=addressLon;
    $(".div-custom-principal .divPublicar").css({"padding":"10px","background-color": "#fff"});
    $("#publicarDireccion").css("display","none");
    $("#publicarFotoUbicacion").css("display","block");
    $("#publicarVivienda").css("display","none");
    $("#publicarServicios").css("display","none");
    $("#publicarHabitacion").css("display","none");     
    $(".container-custom-principal .progressbar-bar-custom").css("width", "50%");
    
    $("#mensajePublicar4").html(addressPostal);    
    //direccion nueva
    if (continuarDir==1 ){ 
        console.log("continuarDir "+continuarDir);       
        //no existe direccion en la base de datos insertar direccion        
        if ($datosLocalDir['publicado']==-1) { 
            console.log("insertar direccion $datosLocalDir['publicado'] "+$datosLocalDir['publicado']);           
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/insertarDirecion.php',
                data: {idUsuario:$datosLocal['usrId'],zona:$dirZona,ciudad:$dirCiudad,direccion:$dirDireccion,Lat:$dirLat,Lon:$dirLon,cPostal:$dirPostal},                 
                crossDomain: true,
                cache: false,
                beforeSend: function(){
                     //Agregamos la clase loading al body
                    $('body').addClass('loading');
                     //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                    console.log("entro a la crga del gif");
                },
                success: function(datosInsDir){
                    console.log("datosInslDir "+ JSON.stringify(datosInsDir));
                    $datosRemotoInsDir=JSON.stringify(datosInsDir);
                    localStorage.setItem('datosDir', $datosRemotoInsDir);                      
                    $datosLocalDir=JSON.parse(localStorage.getItem('datosDir'));
                    continuarDir=0;         
                    console.log(" continuarDireccion()=-1 datosLocalInsDir "+ JSON.stringify($datosLocalDir));
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('body').removeClass('loading'); //Removemos la clase loading
                    alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                },
                complete: function(){
                    //$('body').addClass('loading'); 
                    $('body').removeClass('loading'); //Removemos la clase loading
                }
            });
        }
        //existe direccion en la base de datos, actualizar direccion 0 no termino la publicacion 1 termino la publicacion
        if ($datosLocalDir['publicado']==0 || $datosLocalDir['publicado']==1) {
            console.log("actualizar direccion $datosLocalDir['publicado'] "+$datosLocalDir['publicado']);
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/actualizarDireccion.php',
                data: {idUsuario:$datosLocal['usrId'],idPublicacion:$datosLocalDir["idPublicar"],zona:$dirZona,ciudad:$dirCiudad,direccion:$dirDireccion,Lat:$dirLat,Lon:$dirLon,cPostal:$dirPostal},                 
                crossDomain: true,
                cache: false,
                beforeSend: function(){
                     //Agregamos la clase loading al body
                    $('body').addClass('loading');
                     //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                    console.log("entro a la crga del gif");
                },
                success: function(datosActDir){
                        console.log("datosLocalActDir "+ JSON.stringify(datosActDir));
                        $datosRemotoActDir=JSON.stringify(datosActDir);
                        localStorage.setItem('datosDir', $datosRemotoActDir);                     
                        $datosLocalDir=JSON.parse(localStorage.getItem('datosDir')); 
                        continuarDir=0;
                        console.log("continuarDireccion()=0 datosLocalActDir "+ JSON.stringify($datosLocalDir));                    
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('body').removeClass('loading'); //Removemos la clase loading
                    alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                },
                complete: function(){
                    //$('body').addClass('loading'); 
                    $('body').removeClass('loading'); //Removemos la clase loading
                }
            });
        }       
    }
    //consultamos si hay datos almacenados en tabla publicaciones y fotopublicaciones
    if (btnAtrasFoto==0) {// 0 si no presiono btnAtrasFoto 1 si se presiono   
        // verificar si hay fotos en la base de datos
        if ($datosLocalDir['publicado']==0 || $datosLocalDir['publicado']==1) {// 0 existe datos no publicado , 1 existe datos si publicado
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/consultarFotoPublicado.php',
                data: {idUsuario:$datosLocalDir['id'],idPublicacion:$datosLocalDir['idPublicar']},                 
                crossDomain: true,
                cache: false,
                beforeSend: function(){
                     //Agregamos la clase loading al body
                    $('body').addClass('loading');
                     //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                    console.log("entro a la crga del gif");
                },
                success: function(datosFoto){
                    if (datosFoto['fotos']>0) {                        
                        $("#tituloMPu").val(datosFoto['tituloArray'][0]);
                        $("#precioMPu").val(datosFoto['precioArray'][0]);
                        if (datosFoto['incluyeArray'][0]==1) {
                            $("#cboxIncluyeGastos").prop('checked', true);
                            $("#cboxIncluyeGastos").val(datosFoto['incluyeArray'][0]);
                        }
                        else{
                            $("#cboxIncluyeGastos").prop('checked', false);
                            $("#cboxIncluyeGastos").val(datosFoto['incluyeArray'][0]);
                        }
                        
                        $("#fianzaMPu").val(datosFoto['fianzaArray'][0]);
                        $("#comentarioMPu").val(datosFoto['comentarioArray'][0]);                    
                        tMPu=1;
                        pMPu=1;
                        cMPu=1;
                        cargarFotoBD(datosFoto);
                        //$("#btnContinuarFoUb").css({"background-color":"#008080"});//color tema
                    }
                    if (datosFoto['fotos']==0) {                        
                        $("#tituloMPu").val(datosFoto['titulo']);
                        $("#precioMPu").val(datosFoto['precio']);
                        if (datosFoto['incluye']==1) {

                            $("#cboxIncluyeGastos").prop('checked', true);
                            $("#cboxIncluyeGastos").val(datosFoto['incluye']);
                        }
                        else{
                            $("#cboxIncluyeGastos").prop('checked', false);
                            $("#cboxIncluyeGastos").val(datosFoto['incluye']);
                        }                        
                        $("#fianzaMPu").val(datosFoto['fianza']);
                        $("#comentarioMPu").val(datosFoto['comentario']);                                        
                        tMPu=1;
                        pMPu=1;
                        cMPu=1;
                    }           
                    console.log("datosFoto "+JSON.stringify(datosFoto)); 
                    console.log("longitud "+ datosFoto['fotos']);

                    btnAtrasFoto=1;                      
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('body').removeClass('loading'); //Removemos la clase loading
                    alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                    tMPu=0;
                    pMPu=0;
                    cMPu=0;
                    btnAtrasFoto=0;
                },
                complete: function(){
                    //$('body').addClass('loading'); 
                    $('body').removeClass('loading'); //Removemos la clase loading
                }
            });
        }
    }
}
// al continuar foto y datos mostramos vivivienda guardamos datos de las fotos y consultamos si hay datos guradados de vivienda  
function continuarFotoUbi(){
    //alert("continuarFotoUbi");
    event.preventDefault();
    
    $(".div-custom-principal .divPublicar").css({"background-color": "#fff"});
    $("#publicarDireccion").css("display","none");
    $("#publicarFotoUbicacion").css("display","none");
    $("#publicarVivienda").css("display","block");
    $("#publicarHabitacion").css("display","none");     
    $(".container-custom-principal .progressbar-bar-custom").css("width", "75%");    
    //solo actualiza por que ya existe instancia en la tabla publicacion
    if(continuarFUbi==1){ // actualizar datos de foto ubicacion        
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: 'http://' + ipConex + '/wasiWeb/php/actualizarDatosFotos.php',
            data: {idUsuario:$datosLocal['usrId'],idPublicacion:$datosLocalDir["idPublicar"],titulo:$('#tituloMPu').val(),precio:$('#precioMPu').val(),incluyeGastos:$('#cboxIncluyeGastos').val(),fianza:$('#fianzaMPu').val(),comentario:$('#comentarioMPu').val()},                 
            crossDomain: true,
            cache: false,
            beforeSend: function(){
                 //Agregamos la clase loading al body
                $('body').addClass('loading');
                 //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                console.log("entro a la crga del gif");
            },
            success: function(datosActFoto){
                //analizar si aqui es necesario un localstoragedir
                console.log("datosLocalActDir "+JSON.stringify(datosActFoto));
                continuarFUbi=0;
            },
            error : function(jqXHR, textStatus, errorThrown) {
                btnAtrasCarac=0;
                $('body').removeClass('loading'); //Removemos la clase loading
                alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
            },
            complete: function(){
                //$('body').addClass('loading'); 
                $('body').removeClass('loading'); //Removemos la clase loading
            }
        });        
    }
    // consultamos si hay datos almacenados en tabala caracteristicas_vi_servicios 
    if (btnAtrasVi==0){// 
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: 'http://' + ipConex + '/wasiWeb/php/consultarVivienda.php',
            data: {idUsuario:$datosLocalDir['id'],idPublicacion:$datosLocalDir['idPublicar']},                 
            crossDomain: true,
            cache: false,
            beforeSend: function(){
                 //Agregamos la clase loading al body
                $('body').addClass('loading');
                 //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                console.log("entro a la crga del gif");
            },
            success: function(datosVivienda){
                if (datosVivienda['publicadoSeVi']==1) {
                    $("#superficiePu").val(datosVivienda['superficie']);
                    sMPu=1;
                    if (datosVivienda['quePublicas']==1) {//marcamos Hab. solo
                        $("#imgViSolo").css({"background": "url(img/camaSN.png) no-repeat center center ","background-size": "60px 70px"});
                        $("#imgViSolo").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                        $("#radioViSolo").prop('checked', true);
                        $contViSolo++;
                        qMPu=1;
                        $("#imgViComp").css({"background": "url(img/camaLG.png) no-repeat center center ","background-size": "60px 70px"});
                        $("#imgViComp").css({"border-color":"#999999","box-shadow": "none "}); 
                        
                    }
                    if (datosVivienda['quePublicas']==2){//marcamos Hab. compartido
                        $("#imgViComp").css({"background": "url(img/camaLN.png) no-repeat center center ","background-size": "60px 70px"});
                        $("#imgViComp").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                        $("#radioViComp").prop('checked', true);
                        $contViComp++;
                        qMPu=1;
                        $("#imgViSolo").css({"background": "url(img/camaSG.png) no-repeat center center ","background-size": "60px 70px"});
                        $("#imgViSolo").css({"border-color":"#999999","box-shadow": "none"}); 
                        
                    }                        
                    if (datosVivienda['cuantosVivenHo']>0) {
                        $("#imgViHo").css({"background": "url(img/hombreNViPu.png) no-repeat center center ","background-size": "65px 70px"});
                        cHoMPu=1;
                        $("#cantHombres").val(datosVivienda['cuantosVivenHo']);
                        $contHombres=datosVivienda['cuantosVivenHo'];

                    }
                    if (datosVivienda['cuantosVivenMu']>0) {
                        $("#imgViMu").css({"background": "url(img/mujerNViPu.png) no-repeat center center ","background-size": "65px 70px"});
                        cMuMPu=1;
                        $("#cantMujeres").val(datosVivienda['cuantosVivenMu']);
                        $contMujeres=datosVivienda['cuantosVivenMu'];
                    }                             
                    if (datosVivienda['ascensor']==1) {
                        asMPu = 1;
                        $('#cboxAscensor').val('1');
                        $("#cboxAscensor").prop('checked', true);
                        htmlSe = "<div id='imgAscensor' class = 'serviciosPu' style='background:url(img/ascensorNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
                        selDivSe.append(htmlSe);
                        $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
                        $("#btnAtrasServicios").css('visibility', 'visible');
                    }
                    if (datosVivienda['calefaccion']==1) {
                        caMPu = 1;
                        $('#cboxCalefaccion').val('1');
                        $("#cboxCalefaccion").prop('checked', true);
                        htmlSe = "<div id='imgCalefaccion' class = 'serviciosPu' style='background:url(img/calefaccionNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
                        selDivSe.append(htmlSe);  
                        $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
                        $("#btnAtrasServicios").css('visibility', 'visible');
                    }
                    if (datosVivienda['estacionamiento']==1) {
                        esMPu = 1;
                        $('#cboxEstacionamiento').val('1');
                        $("#cboxEstacionamiento").prop('checked', true);
                        htmlSe = "<div id='imgEstacionamiento' class = 'serviciosPu' style='background:url(img/estacionamientoNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
                        selDivSe.append(htmlSe);                       
                        $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
                        $("#btnAtrasServicios").css('visibility', 'visible');
                    }
                    if (datosVivienda['lavaVajilla']==1) {
                        lavMPu = 1;
                        $('#cboxLavaVajilla').val('1');
                        $("#cboxLavaVajilla").prop('checked', true);
                        htmlSe = "<div id='imgLavaVajillas' class = 'serviciosPu' style='background:url(img/lavaVajillasNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
                        selDivSe.append(htmlSe);
                        $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
                        $("#btnAtrasServicios").css('visibility', 'visible');  
                    }
                    if (datosVivienda['lavadora']==1) {
                        laMPu = 1;
                        $('#cboxLavadora').val('1');
                        $("#cboxLavadora").prop('checked', true);
                        htmlSe = "<div id ='imgLavadora' class = 'serviciosPu' style='background:url(img/lavadoraNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
                        selDivSe.append(htmlSe);                    
                        $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
                        $("#btnAtrasServicios").css('visibility', 'visible');  
                        
                    }
                    if (datosVivienda['muebles']==1) {
                        muMPu = 1;
                        $('#cboxMuebles').val('1');
                        $("#cboxMuebles").prop('checked', true);
                        htmlSe = "<div id='imgMuebles' class = 'serviciosPu' style='background:url(img/mueblesNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
                        selDivSe.append(htmlSe);                               
                       $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
                       $("#btnAtrasServicios").css('visibility', 'visible');     
                    }
                    if (datosVivienda['piscina']==1) {
                        pisMPu = 1;
                        $('#cboxPiscina').val('1');
                        $("#cboxPiscina").prop('checked', true);
                        htmlSe = "<div id='imgPiscina' class = 'serviciosPu' style='background:url(img/piscinaNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
                        selDivSe.append(htmlSe);            
                        $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
                        $("#btnAtrasServicios").css('visibility', 'visible');   
                    }
                    if (datosVivienda['portero']==1) {
                        poMPu = 1;
                        $('#cboxPortero').val('1');
                        $("#cboxPortero").prop('checked', true);
                        htmlSe = "<div id='imgPortero' class = 'serviciosPu' style='background:url(img/porteroNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
                        selDivSe.append(htmlSe);                   
                        $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
                        $("#btnAtrasServicios").css('visibility', 'visible');      
                    }
                    if (datosVivienda['radiador']==1) {
                        raMPu = 1;
                        $('#cboxRadiador').val('1');
                        $("#cboxRadiador").prop('checked', true);
                        htmlSe = "<div id='imgRadiador' class = 'serviciosPu' style='background:url(img/radiadorNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
                        selDivSe.append(htmlSe);                    
                        $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
                        $("#btnAtrasServicios").css('visibility', 'visible');      
                    }
                    if (datosVivienda['secador']==1) {
                        seMPu = 1;
                        $('#cboxSecador').val('1');
                        $("#cboxSecador").prop('checked', true);
                        htmlSe = "<div id='imgSecador' class = 'serviciosPu' style='background:url(img/secadorNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
                        selDivSe.append(htmlSe);                   
                        $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
                        $("#btnAtrasServicios").css('visibility', 'visible'); 
                    }
                    if (datosVivienda['tv']==1) {
                        tvMPu = 1;
                        $('#cboxTv').val('1');
                        $("#cboxTv").prop('checked', true);
                        htmlSe = "<div id='imgTv' class = 'serviciosPu' style='background:url(img/tvNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
                        selDivSe.append(htmlSe);                   
                        $("#btnContinuarSe").css({"background-color":"#008080"});//color tema 
                        $("#btnAtrasServicios").css('visibility', 'visible');    
                    }
                    if (datosVivienda['wifi']==1) {
                        wifiMPu = 1;
                        $('#cboxWifi').val('1');
                        $("#cboxWifi").prop('checked', true);
                        htmlSe = "<div id='imgWifi' class = 'serviciosPu' style='background:url(img/wifiNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
                        selDivSe.append(htmlSe);                                           
                        $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
                        $("#btnAtrasServicios").css('visibility', 'visible');     
                    }
                    if (datosVivienda['noFumar']==1) {
                        $('#cboxNoFumar').val('1');
                        $("#cboxNoFumar").prop('checked', true);
                        $("#imgNoPeFumar").css({"background": "url(img/noFumarNLe.png) no-repeat center center ","background-size": "58px 68px"});
                        $("#imgNoPeFumar").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"});     
                        
                    }
                    if (datosVivienda['noMascota']==1) {
                        $('#cboxNoMascota').val('1');
                        $("#cboxNoMascota").prop('checked', true);            
                        $("#imgNoPeMascota").css({"background": "url(img/noMascotaNLe.png) no-repeat center center ","background-size": "58px 68px"});
                        $("#imgNoPeMascota").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                  
                    }
                    if (datosVivienda['noPareja']==1) {
                        $('#cboxNoPareja').val('1');
                        $("#cboxNoPareja").prop('checked', true);            
                        $("#imgNoPePareja").css({"background": "url(img/noParejaNLe.png) no-repeat center center ","background-size": "58px 68px"});
                        $("#imgNoPePareja").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                    
                    }
                    $("#btnContinuarVi").css({"background-color":"#008080"});//color tema                
                    continuarVi = 0;
                    btnAtrasVi = 1;
                    guardarSe = 1;
                    $guardarSeAnt=guardarSe; 
                    btnAtrasSe=1; 
                }              
                else{
                    //no se hace nada 
                }
                console.log("datosVivienda "+JSON.stringify(datosVivienda));                       
            },
            error : function(jqXHR, textStatus, errorThrown) {
                $('body').removeClass('loading'); //Removemos la clase loading
                alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                btnAtrasVi=0;
            },
            complete: function(){
                //$('body').addClass('loading'); 
                $('body').removeClass('loading'); //Removemos la clase loading
            }
        });
    }
} 
function guardarServicios(){
    event.preventDefault();    
    $("#paginaPublicar").css("display", "block");        
    $("#publicarDireccion").css("display","none");
    $("#publicarFotoUbicacion").css("display","none")
    $("#publicarVivienda").css("display", "block");
    $("#publicarServicios").css("display","none") 
    $("#publicarHabitacion").css("display","none");
    $(".container-custom-principal .progressbar-bar-custom").css("width", "75%");
    if (sMPu==1&&qMPu==1&&(cHoMPu==1||cMuMPu==1)&&((asMPu==1)||(caMPu==1)||(esMPu==1)||(laMPu==1)||(lavMPu==1)||(muMPu==1)||(pisMPu==1)||(poMPu==1)||(raMPu==1)||(seMPu==1)||(tvMPu==1)||(wifiMPu==1))) {
        $("#btnContinuarVi").css({"background-color":"#008080"});//color tema 
    }
    else{
        $("#btnContinuarVi").css({"background-color":"#808080"});//gris tema    
    }
    if (btnAtrasSe == 0) {//no se presiona boton atras servicios 
        if (guardarSe == 0) {// no hay datos insertados en la base de datos
           // alert("insertar"); 
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/insertarServicios.php',
                data: {idUsuario:$datosLocal['usrId'],idPublicacion:$datosLocalDir["idPublicar"],cbAscensor:$("#cboxAscensor").val(),cbCalefaccion:$("#cboxCalefaccion").val(),cbEstacionamiento:$("#cboxEstacionamiento").val(),cbLavadora:$("#cboxLavadora").val(),cbLavaVajilla:$("#cboxLavaVajilla").val(),cbMuebles:$("#cboxMuebles").val(),cbPiscina:$("#cboxPiscina").val(),cbPortero:$("#cboxPortero").val(),cbRadiador:$("#cboxRadiador").val(),cbSecador:$("#cboxSecador").val(),cbTv:$("#cboxTv").val(),cbWifi:$("#cboxWifi").val()},
                crossDomain: true,
                cache: false,
                beforeSend: function(){
                     //Agregamos la clase loading al body
                    $('body').addClass('loading');
                     //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                    console.log("entro a la crga del gif");
                },
                success: function(datosInsSe){
                    console.log("datosLocalSe "+ JSON.stringify(datosInsSe));
                    guardarSe = 1;
                    $guardarSeAnt=guardarSe;
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('body').removeClass('loading'); //Removemos la clase loading
                    alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                },
                complete: function(){
                    //$('body').addClass('loading'); 
                    $('body').removeClass('loading'); //Removemos la clase loading
                }
            });
        }
        else{
            //alert("actualizar");
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/actualizarServicios.php',
                data: {idUsuario:$datosLocal['usrId'],idPublicacion:$datosLocalDir["idPublicar"],cbAscensor:$("#cboxAscensor").val(),cbCalefaccion:$("#cboxCalefaccion").val(),cbEstacionamiento:$("#cboxEstacionamiento").val(),cbLavadora:$("#cboxLavadora").val(),cbLavaVajilla:$("#cboxLavaVajilla").val(),cbMuebles:$("#cboxMuebles").val(),cbPiscina:$("#cboxPiscina").val(),cbPortero:$("#cboxPortero").val(),cbRadiador:$("#cboxRadiador").val(),cbSecador:$("#cboxSecador").val(),cbTv:$("#cboxTv").val(),cbWifi:$("#cboxWifi").val()},
                crossDomain: true,
                cache: false,
                beforeSend: function(){
                     //Agregamos la clase loading al body
                    $('body').addClass('loading');
                     //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                    console.log("entro a la crga del gif");
                },
                success: function(datosActSe){
                    console.log("datosLocalSe "+ JSON.stringify(datosActSe));                    
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('body').removeClass('loading'); //Removemos la clase loading
                    alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                },
                complete: function(){
                    //$('body').addClass('loading'); 
                    $('body').removeClass('loading'); //Removemos la clase loading
                }
            });
        }
        btnAtrasSe=1;
    }
}

function continuarVivienda(){
    event.preventDefault(); 
    $("#publicarFotoUbicacion").css("display","none");
    $("#publicarVivienda").css("display","none");
    $("#publicarHabitacion").css("display","block");        
       
    $(".container-custom-principal .progressbar-bar-custom").css("width", "100%");
   
    if(continuarVi==1){ // insertamos datos  
         //no existe datos de vivienda  en la base de datos insertar direccion                 
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: 'http://' + ipConex + '/wasiWeb/php/actualizarVivienda.php',
            data: {idUsuario:$datosLocal['usrId'],idPublicacion:$datosLocalDir["idPublicar"],superficie:$("#superficiePu").val(),soloComp:$("input[name='radioVivienda']:checked").val(),cuantosHo:$("#cantHombres").val(),cuantosMu:$("#cantMujeres").val(),noFumar:$("#cboxNoFumar").val(),noMascota:$("#cboxNoMascota").val(),noPareja:$("#cboxNoPareja").val()},                 
            crossDomain: true,
            cache: false,
            beforeSend: function(){
                 //Agregamos la clase loading al body
                $('body').addClass('loading');
                 //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                console.log("entro a la crga del gif");
            },
            success: function(datosInsViSeHa){
               // alert("exitos");
                $datosRemotoInsViSeHa=JSON.stringify(datosInsViSeHa);
                localStorage.setItem('datosViSeHa', $datosRemotoInsViSeHa);
                $datosLocalViSeHa=JSON.parse(localStorage.getItem('datosViSeHa')); 
                continuarVi=0;          
                console.log("datosLocalViSeHa "+ $datosLocalViSeHa);
            },
            error : function(jqXHR, textStatus, errorThrown) {
                $('body').removeClass('loading'); //Removemos la clase loading
                alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
            },
            complete: function(){
                //$('body').addClass('loading'); 
                $('body').removeClass('loading'); //Removemos la clase loading
            }
        });
    }
    if (btnAtrasHabi==0) {// 0 si no presiono btnAtrasHabi, 1 si se presiono   
        // verificar si hay datos en la base de datos
        
        if ($datosLocalDir['publicado']==0 || $datosLocalDir['publicado']==1) {
            
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/consultarHabitacion.php',
                data: {idUsuario:$datosLocalDir['id'],idPublicacion:$datosLocalDir['idPublicar']},                 
                crossDomain: true,
                cache: false,
                beforeSend: function(){
                     //Agregamos la clase loading al body
                    $('body').addClass('loading');
                     //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                    console.log("entro a la crga del gif");
                },
                success: function(datosConHabitacion){
                    $datosRemotoConHabi=JSON.stringify(datosConHabitacion);
                    localStorage.setItem('datosHabi', $datosRemotoConHabi);
                    $datosLocalHabi=JSON.parse(localStorage.getItem('datosHabi')); 
                    //continuarDir=0; 
                    console.log("datosConHabitacion "+JSON.stringify(datosConHabitacion));                                                    
                    
                    if (datosConHabitacion['publicadoHabi']==1) {
                        datosConHabi=1;//para usar en datepicker despes de cargar los datos si existe 
                        if (datosConHabitacion['cama']==1) {//marcamos cama. solo
                            $("#imgCaSolo").css({"background": "url(img/camaSimpleNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolo").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioCaSolo").prop('checked', true);
                            $contHaCaSolo++;
                            camaMPu=1;

                            $("#imgCaDoble").css({"background": "url(img/camaDobleGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaDoble").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaSofa").css({"background": "url(img/camaSofaGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSofa").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaLitera").css({"background": "url(img/camaLiteraGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaLitera").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaSolos").css({"background": "url(img/camaSolosGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolos").css({"border-color":"#999999","box-shadow": ""}); 
                            $("#imgCaNada").css({"background": "url(img/camaNadaGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaNada").css({"border-color":"#999999","box-shadow": " "});  
                        }
                        if (datosConHabitacion['cama']==2){//marcamos cama. doble
                            $("#imgCaDoble").css({"background": "url(img/camaDobleNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaDoble").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioCaDoble").prop('checked', true);
                            $contHaCaDoble++;
                            camaMPu=1;

                            $("#imgCaSolo").css({"background": "url(img/camaSimpleGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolo").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaSofa").css({"background": "url(img/camaSofaGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSofa").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaLitera").css({"background": "url(img/camaLiteraGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaLitera").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaSolos").css({"background": "url(img/camaSolosGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolos").css({"border-color":"#999999","box-shadow": ""}); 
                            $("#imgCaNada").css({"background": "url(img/camaNadaGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaNada").css({"border-color":"#999999","box-shadow": " "});
                        }
                        if (datosConHabitacion['cama']==3){//marcamos cama. camasofa
                            $("#imgCaSofa").css({"background": "url(img/camaSofaNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSofa").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioCaSofa").prop('checked', true);
                            $contHaCaSofa++;
                            camaMPu=1;

                            $("#imgCaSolo").css({"background": "url(img/camaSimpleGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolo").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaDoble").css({"background": "url(img/camaDobleGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaDoble").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaLitera").css({"background": "url(img/camaLiteraGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaLitera").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaSolos").css({"background": "url(img/camaSolosGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolos").css({"border-color":"#999999","box-shadow": ""}); 
                            $("#imgCaNada").css({"background": "url(img/camaNadaGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaNada").css({"border-color":"#999999","box-shadow": " "});
                        }                        
                        if (datosConHabitacion['cama']==4){//marcamos cama. litera
                            $("#imgCaLitera").css({"background": "url(img/camaLiteraNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaLitera").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioCaLitera").prop('checked', true);
                            $contHaCaLitera++;
                            camaMPu=1;

                            $("#imgCaSolo").css({"background": "url(img/camaSimpleGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolo").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaDoble").css({"background": "url(img/camaDobleGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaDoble").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaSofa").css({"background": "url(img/camaSofaGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSofa").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaSolos").css({"background": "url(img/camaSolosGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolos").css({"border-color":"#999999","box-shadow": ""}); 
                            $("#imgCaNada").css({"background": "url(img/camaNadaGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaNada").css({"border-color":"#999999","box-shadow": " "});
                        }
                        if (datosConHabitacion['cama']==5){//marcamos cama. solos 
                            $("#imgCaSolos").css({"background": "url(img/camaSolosNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolos").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioCaSolos").prop('checked', true);
                            $contHaCaSolos++;
                            camaMPu=1;

                            $("#imgCaSolo").css({"background": "url(img/camaSimpleGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolo").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaDoble").css({"background": "url(img/camaDobleGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaDoble").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaSofa").css({"background": "url(img/camaSofaGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSofa").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaLitera").css({"background": "url(img/camaLiteraGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaLitera").css({"border-color":"#999999","box-shadow": ""}); 
                            $("#imgCaNada").css({"background": "url(img/camaNadaGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaNada").css({"border-color":"#999999","box-shadow": " "});
                        }
                        if (datosConHabitacion['cama']==6){//marcamos cama. nada
                            $("#imgCaNada").css({"background": "url(img/camaNadaNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaNada").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioCaNada").prop('checked', true);
                            $contHaCaNada++;
                            camaMPu=1;

                            $("#imgCaSolo").css({"background": "url(img/camaSimpleGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolo").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaDoble").css({"background": "url(img/camaDobleGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaDoble").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaSofa").css({"background": "url(img/camaSofaGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSofa").css({"border-color":"#999999","box-shadow": " "}); 
                            $("#imgCaLitera").css({"background": "url(img/camaLiteraGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaLitera").css({"border-color":"#999999","box-shadow": ""}); 
                            $("#imgCaSolos").css({"background": "url(img/camaSolosGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolos").css({"border-color":"#999999","box-shadow": " "});
                        } 
                        $("#fechaDesde").val(datosConHabitacion['fechaDesde']);                        
                        inFMPu=1;
                        $contInFecha=1;//se cargo la fecha y con update llama a $("#fechaDesde").datepicker()
                        $("#fechaDesde").datepicker('update',datosConHabitacion['fechaDesde']);//('setDate', null);//('setStartDate', datosConHabitacion['fechaDesde']);

                        if (datosConHabitacion['hasta']==1) {
                            $("#cboxfechaHasta").prop('checked', true);
                            $("#cboxfechaHasta").val(datosConHabitacion['hasta']);                            
                            $("#collapseHasta").collapse('show');
                            $(".container-custom-principal .contenedorHasta-collapse-custom").css({"margin-bottom": "0px","border-bottom": "none"});                        
                            $("#fechaHasta").val(datosConHabitacion['fechaHasta']);
                            $("#fechaHasta").datepicker('setStartDate', datosConHabitacion['fechaDesde']);
                            finFMPu=1;
                        }
                        else{
                            $("#cboxfechaHasta").prop('checked', false);
                            $("#cboxfechaHasta").val(datosConHabitacion['hasta']);
                            $("#collapseHasta").collapse('hide');
                            $(".container-custom-principal .contenedorHasta-collapse-custom").css({"margin-bottom": "10px","border-bottom": "1px solid #008080"});            
                            finFMPu=0;                            
                        }                        
                        $("#tiempoMin").val(datosConHabitacion['mesMin']);
                        inMMPu=1;
                        $("#tiempoMax").val(datosConHabitacion['mesMax']);                    
                        //finFMPu=1;
                        if (datosConHabitacion['dimHabitacion']==1){//marcamos Habitacion. pequeño
                            $("#imgHaS").css({"background": "url(img/dimensionesSNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgHaS").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioHaS").prop('checked', true);
                            $contHaS++;
                            dimMPu=1;
                            $("#imgHaM").css({"border-color":"#999999","box-shadow":""});            
                            $("#imgHaM").css({"background": "url(img/dimensionesMGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgHaL").css({"border-color":"#999999","box-shadow":""});            
                            $("#imgHaL").css({"background": "url(img/dimensionesLGLe.png) no-repeat center center ","background-size": "60px 70px"});
                        }
                        if (datosConHabitacion['dimHabitacion']==2){//marcamos Habitacion. mediano
                            $("#imgHaM").css({"background": "url(img/dimensionesMNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgHaM").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioHaM").prop('checked', true);
                            $contHaM++;
                            dimMPu=1;
                            $("#imgHaS").css({"border-color":"#999999","box-shadow":""});            
                            $("#imgHaS").css({"background": "url(img/dimensionesSGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgHaL").css({"border-color":"#999999","box-shadow":""});            
                            $("#imgHaL").css({"background": "url(img/dimensionesLGLe.png) no-repeat center center ","background-size": "60px 70px"});
                        }
                        if (datosConHabitacion['dimHabitacion']==3){//marcamos Habitacion. pequeño
                            $("#imgHaL").css({"background": "url(img/dimensionesLNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgHaL").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioHaL").prop('checked', true);
                            $contHaL++;
                            dimMPu=1;
                            $("#imgHaS").css({"border-color":"#999999","box-shadow":""});            
                            $("#imgHaS").css({"background": "url(img/dimensionesSGLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgHaM").css({"border-color":"#999999","box-shadow":""});            
                            $("#imgHaM").css({"background": "url(img/dimensionesMGLe.png) no-repeat center center ","background-size": "60px 70px"});
                        }                                           
                         btnAtrasHabi=1;
                        $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema
                    }
                    else{
                        datosConHabi=0;//para usar en datepicker despes de cargar los datos si no existe 
                        $("#cboxfechaHasta").prop('disabled', true);                         
                    }                                              
                    //console.log("datosConHabitacion "+JSON.stringify(datosConHabitacion));                                           
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('body').removeClass('loading'); //Removemos la clase loading
                    alert("NProblemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                    camaMPu=0;
                    inFMPu=0;
                    finFMPu=0;
                    inMMPu=0;
                    finMMPu=0;
                    dimMPu=0;
                    btnAtrasHabi=0;
                },
                complete: function(){
                    //$('body').addClass('loading'); 
                    $('body').removeClass('loading'); //Removemos la clase loading
                }
            });
        }
    }
}
function publicarCaHabitacion(){
    event.preventDefault();
    //alert("habitacion publicada");
    $("#paginaPrincipal").css("display", "block");
    $("#paginaPublicar").css("display", "none");
    $("#divFooter").css("display", "block");  //tal vez div mensaje tambien 
    $(".footer .icoFooterBuscar").css({"background": "url(img/buscarC.png) no-repeat center center","background-size": "30px 30px"});
    $(".footer .icoFooterPublicar").css({"background": "url(img/publicarG.png) no-repeat center center","background-size": "30px 30px"});
    $(".footer .icoFooterMensajes").css({"background": "url(img/mensajeG.png) no-repeat center center","background-size": "30px 30px"});
    $(".footer .icoFooterUsuario").css({"background": "url(img/perfilG.png) no-repeat center center","background-size": "30px 30px"});
    
    $("#icoFMBuscar").css({"color":"#008080"});
    $("#icoFMPublicar").css({"color":"rgba(89, 89, 89, 0.8)"});                       
    $("#icoFMMensaje").css({"color":"rgba(89, 89, 89, 0.8)"});            
    $("#icoFMPerfil").css({"color":"rgba(89, 89, 89, 0.8)"});    


    if (continuarHabi==1) {
        //aqui entra si es por primera vez solo insertamos 
        if ($datosLocalDir['publicado']==0) {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/insertarHabitacion.php',
                data: {idUsuario:$datosLocal['usrId'],idPublicacion:$datosLocalDir["idPublicar"],cama:$("input[name='radioCama']:checked").val(),fechaDesde:$("#fechaDesde").val(),hasta:$("#cboxfechaHasta").val(),fechaHasta:$("#fechaHasta").val(),mesMin:$("#tiempoMin").val(),mesMax:$("#tiempoMax").val(),dimHabi:$("input[name='radioHa']:checked").val()},                 
                crossDomain: true,
                cache: false,
                beforeSend: function(){
                     //Agregamos la clase loading al body
                    $('body').addClass('loading');
                     //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                    console.log("entro a la crga del gif");
                },
                success: function(datosInsHabi){
                    $datosRemotoInsHabi=JSON.stringify(datosInsHabi);
                    localStorage.setItem('datosHabi', $datosRemotoInsHabi);
                    $datosLocalHabi=JSON.parse(localStorage.getItem('datosHabi')); 
                    //continuarDir=0;          
                    console.log("datosLocalHabi "+ JSON.stringify($datosLocalHabi));
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('body').removeClass('loading'); //Removemos la clase loading
                    alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                },
                complete: function(){
                    //$('body').addClass('loading'); 
                    $('body').removeClass('loading'); //Removemos la clase loading
                }
            });        
        }    
    //aqui entra si viene desde editar publicacion  solo actualizamos los datos de la base de datos 
        if ($datosLocalDir['publicado']==1) {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/actualizarHabitacion.php',
                data: {idUsuario:$datosLocal['usrId'],idPublicacion:$datosLocalDir["idPublicar"],cama:$("input[name='radioCama']:checked").val(),fechaDesde:$("#fechaDesde").val(),hasta:$("#cboxfechaHasta").val(),fechaHasta:$("#fechaHasta").val(),mesMin:$("#tiempoMin").val(),mesMax:$("#tiempoMax").val(),dimHabi:$("input[name='radioHa']:checked").val()},                 
                crossDomain: true,
                cache: false,
                beforeSend: function(){
                     //Agregamos la clase loading al body
                    $('body').addClass('loading');
                     //setTimeout(function(){ console.log("LOADING"); throbbed = true;}, 3000);
                    console.log("entro a la crga del gif");
                },
                success: function(datosActHabi){
                    $datosRemotoActHabi=JSON.stringify(datosActHabi);
                    localStorage.setItem('datosHabi', $datosRemotoActHabi);
                    $datosLocalHabi=JSON.parse(localStorage.getItem('datosHabi')); 
                    //continuarDir=0;          
                    console.log("datosLocalHabi "+ JSON.stringify($datosLocalHabi));
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('body').removeClass('loading'); //Removemos la clase loading
                    alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                },
                complete: function(){
                    //$('body').addClass('loading'); 
                    $('body').removeClass('loading'); //Removemos la clase loading
                }
            });
        }
        continuarHabi=0;   

    }
    if (btnPublicarTodo == 0 ) {
/********************** aqui deberia ir reset todo publicar *******************/
    
    btnAtrasFoto = 0;//para controlar el acceso a editar publicacion consultar fotos datos 
    btnAtrasVi = 0;//para controlar acceso editar publicacion consultar vivienda
    btnAtrasHabi = 0;//para control acceso editar publcaion consultar habitracion
    //continuarHabi= 1;// para contrtol de  acceso publicar actualizar la publicaion

    /* aqui implementar el reinicio del los forms y las fotos,  al finalizar al publicacion */

    $('#formPublicarDireccion')[0].reset();
    $('#formPublicarFotoUbicacion')[0].reset();
    $('#formPublicarVi')[0].reset();
    $('#formPublicarSe')[0].reset();
    $('#formPublicarHabitacion')[0].reset();
    
    $("#imgPublicar div").remove(".fotoPublicar");  
    $("#imgPublicar").data("cont",0); 
    storedFilesDb = [];   //inciar una vez mas 
    storedFiles=[];// no verficado 
    $("#contenedorServicios div").remove(".serviciosPu");

    $("#imgNoPeFumar").css({"background": "url(img/noFumarGLe.png) no-repeat center center ","background-size": "58px 68px"});
    $("#imgNoPeFumar").css({"border-color":"#999999","box-shadow": " "}); 
    $("#imgNoPeMascota").css({"background": "url(img/noMascotaGLe.png) no-repeat center center ","background-size": "58px 68px"});
    $("#imgNoPeMascota").css({"border-color":"#999999","box-shadow": " "}); 
    $("#imgNoPePareja").css({"background": "url(img/noParejaGLe.png) no-repeat center center ","background-size": "58px 68px"});
    $("#imgNoPePareja").css({"border-color":"#999999","box-shadow": " "});   
/****************Fin de reseteo a los forms de publicar ********/
    }

}
function mostrarSwiperMapa(){
    //aqui si no cambio de posicion no entra mas si cambio de posision entra  tal vez implementar un limite de mostrar publicados ej.max 100 por zonas
    // consultamos todo lo publicado dependiendo de la ciudad o la zona para empezar todo 
    if (true) { // control para que cargue la consulta cada vez que se presione el linkbuscarmapa cambioZona==1
            $.ajax({
                type :'POST',
                url:'http://' + ipConex + '/wasiWeb/php/consultarPublicadosTodos.php',
                dataType : 'json',                
                data: {idUsuario:$datosLocal['usrId']},                 
                crossDomain: true,
                //timeout: 2000,
                cache: false,
                beforeSend: function(){
                     //Agregamos la clase loading al body
                    $('body').addClass('loading');                    
                    console.log("entro a la crga del gif");
                },
                success: function(datosConsPubliTodos){
                    console.log("datosConsPubliTodos "+JSON.stringify(datosConsPubliTodos));
                    if (datosConsPubliTodos['publicados']>0) {//0 existen datos y no se completo la publicacion, -1 no existen 
                        // tal vez no haga falta  datos remoto de publicados todo
                        $datosRemotoConsultarPubliTodos=JSON.stringify(datosConsPubliTodos);
                        localStorage.setItem('datosPubliT', $datosRemotoConsultarPubliTodos);
                        $datosLocalPubliTodo=JSON.parse(localStorage.getItem('datosPubliT'));
                        for (var i = 0; i < datosConsPubliTodos['publicados']; i++) {
                            $contadorServicios=0;
                            htmlMostrarPubliTodoSwipe+="<div class='swiper-slide slidePuTo' id="+datosConsPubliTodos['idPubliArray'][i]+" data-posswiper="+datosConsPubliTodos['posPubliSwiper'][i]+">";
                            htmlMostrarPubliTodoSwipe+=" <div class = 'fotoD' style='background:url(http://"+ipConex+"/wasiWeb/"+datosConsPubliTodos['rutaFotoArray'][i] +") no-repeat center center; background-size:cover;' >";
                            htmlMostrarPubliTodoSwipe+=" </div>";
                            htmlMostrarPubliTodoSwipe+=" <div class='mensajeD'>";
                            htmlMostrarPubliTodoSwipe+="     <div class='mensajeDPrecio'>"+datosConsPubliTodos['precioArray'][i]+" €/m </div>";
                            htmlMostrarPubliTodoSwipe+="     <div class='mensajeDZona'>"+datosConsPubliTodos['zonaArray'][i]+"</div>";    
                            htmlMostrarPubliTodoSwipe+="     <div class='contenedorMensajeServiciosPe'>";
                            htmlMostrarPubliTodoSwipe+="             <div class='mensajePerPu' style='background:url(http://"+ipConex+"/wasiWeb/"+datosConsPubliTodos['fotoPerfilArray'][i] +") no-repeat center center; background-size:cover;'></div>";
                            if (datosConsPubliTodos['ascensorArray'][i]==1 && $contadorServicios < 7) {
                                htmlMostrarPubliTodoSwipe+="         <div class='mensajeServiciosPu' style='background:url(./img/ascensorN.png) no-repeat center center; background-size:cover;'> </div>";          
                                $contadorServicios++;
                            }
                            if (datosConsPubliTodos['calefaccionArray'][i]==1 && $contadorServicios < 7) {
                                htmlMostrarPubliTodoSwipe+="         <div class='mensajeServiciosPu' style='background:url(./img/calefaccionN.png) no-repeat center center; background-size:cover;'> </div>";      
                                $contadorServicios++;   
                            }
                            if (datosConsPubliTodos['estacionamientoArray'][i]==1 && $contadorServicios < 7) {
                                htmlMostrarPubliTodoSwipe+="         <div class='mensajeServiciosPu' style='background:url(./img/estacionamientoN.png) no-repeat center center; background-size:cover;'> </div>";      
                                $contadorServicios++;
                            }
                            if (datosConsPubliTodos['lavadoraArray'][i]==1 && $contadorServicios < 7) {
                                htmlMostrarPubliTodoSwipe+="         <div class='mensajeServiciosPu' style='background:url(./img/lavadoraN.png) no-repeat center center; background-size:cover;'> </div>";      
                                $contadorServicios++;
                            }  
                            if (datosConsPubliTodos['lavaVajillaArray'][i]==1 && $contadorServicios < 7) {
                                htmlMostrarPubliTodoSwipe+="         <div class='mensajeServiciosPu' style='background:url(./img/lavaVajillasN.png) no-repeat center center; background-size:cover;'> </div>";      
                                $contadorServicios++;                                
                            }
                            if (datosConsPubliTodos['mueblesArray'][i]==1 && $contadorServicios < 7) {
                                htmlMostrarPubliTodoSwipe+="         <div class='mensajeServiciosPu' style='background:url(./img/mueblesN.png) no-repeat center center; background-size:cover;'> </div>";      
                                $contadorServicios++;    
                            } 
                            if (datosConsPubliTodos['piscinaArray'][i]==1 && $contadorServicios < 7) {
                                htmlMostrarPubliTodoSwipe+="         <div class='mensajeServiciosPu' style='background:url(./img/piscinaN.png) no-repeat center center; background-size:cover;'> </div>";      
                                $contadorServicios++;
                            }
                            if (datosConsPubliTodos['porteroArray'][i]==1 && $contadorServicios < 7) {
                                htmlMostrarPubliTodoSwipe+="         <div class='mensajeServiciosPu' style='background:url(./img/porteroN.png) no-repeat center center; background-size:cover;'> </div>";      
                                $contadorServicios++;    
                            }
                            if (datosConsPubliTodos['radiadorArray'][i]==1 && $contadorServicios < 7) {
                                htmlMostrarPubliTodoSwipe+="         <div class='mensajeServiciosPu' style='background:url(./img/radiadorN.png) no-repeat center center; background-size:cover;'> </div>";      
                                $contadorServicios++;    
                            }
                            if (datosConsPubliTodos['secadorArray'][i]==1 && $contadorServicios < 7) {
                                htmlMostrarPubliTodoSwipe+="         <div class='mensajeServiciosPu' style='background:url(./img/secadorN.png) no-repeat center center; background-size:cover;'> </div>";      
                                $contadorServicios++;    
                            } 
                            if (datosConsPubliTodos['tvArray'][i]==1 && $contadorServicios < 7) {
                                htmlMostrarPubliTodoSwipe+="         <div class='mensajeServiciosPu' style='background:url(./img/tvN.png) no-repeat center center; background-size:cover;'> </div>";      
                                $contadorServicios++;
                            }
                            if (datosConsPubliTodos['wifiArray'][i]==1 && $contadorServicios < 7) {
                                htmlMostrarPubliTodoSwipe+="         <div class='mensajeServiciosPu' style='background:url(./img/wifiN.png) no-repeat center center; background-size:cover;'> </div>";      
                                $contadorServicios++;    
                            }    
                            htmlMostrarPubliTodoSwipe+="     </div>";
                            htmlMostrarPubliTodoSwipe+=" </div>";                        
                            htmlMostrarPubliTodoSwipe+="</div> ";                         
                        }
                        //htmlMostrarPubliTodoSwipe+="<div class='swiper-pagination'></div>";
                        selDivMostrarPubliTodoSwipe.append(htmlMostrarPubliTodoSwipe); 
                        activarSwipe();  
                        swiperMapa.slideTo(posPubliDespues, 0);
                        htmlMostrarPubliTodoSwipe=" ";
                        swiperMoPuTo=1; 
                        entroTabLista=0;     
                    }
                    if (datosConsPubliTodos['publicados']==0) {
                        
                   }
                   //$('body').addClass('loading'); //Removemos la clase loading        
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('body').removeClass('loading'); //Removemos la clase loading
                    alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                },
                complete: function(){
                   //$('body').addClass('loading'); 
                  $('body').removeClass('loading'); //Removemos la clase loading
                }
            });
        cambioZona=0;
        } 
}
function mostrarAnuncio(idPublicacion){
    $idPubliFotos=idPublicacion;

    if (true) { // control para accceso falta  implentar 
            $.ajax({
                type :'POST',
                url:'http://' + ipConex + '/wasiWeb/php/consultarFotosIdPublicados.php',
                dataType : 'json',                
                data: {idPublicacion:$idPubliFotos},                 
                crossDomain: true,
                //timeout: 2000,
                cache: false,
                beforeSend: function(){                     
                    $('body').addClass('loading');                                        
                },
                success: function(datosConsFotosPubli){
                    console.log("datosConsFotosPubli "+JSON.stringify(datosConsFotosPubli));
                    
                    if (datosConsFotosPubli['fotosPublicados']>0) {// hay fotos  
                        for (var i = 0; i < datosConsFotosPubli['fotosPublicados']; i++) {
                            htmlMostrarFotosSwipe+=" <div class='swiper-slide slideFoIdPu ' >";
                            htmlMostrarFotosSwipe+="    <div class = 'fotoPublicadoMSwipe' style='background:url(http://"+ipConex+"/wasiWeb/"+datosConsFotosPubli['rutaFotoArray'][i] +") no-repeat center center; background-size:cover;' >";
                            htmlMostrarFotosSwipe+="    </div>";
                            htmlMostrarFotosSwipe+=" </div>";                               
                        }
                        //htmlMostrarFotosSwipe+="<div class='swiper-pagination slideFoIdPu'></div>";                    
                        selDivMostrarFotosSwipe.append(htmlMostrarFotosSwipe);
                        activarSwipeFotosPublicados();
                        htmlMostrarFotosSwipe=" ";                              
                    }
                    if (datosConsFotosPubli['fotosPublicados']==0) {                        
                   }                   
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('body').removeClass('loading'); //Removemos la clase loading
                    alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                },
                complete: function(){                   
                  $('body').removeClass('loading'); //Removemos la clase loading
                }
            });
            //activarSwipeFotosPublicados();
            $.ajax({
                type :'POST',
                url:'http://' + ipConex + '/wasiWeb/php/consultarDatosIdPublicados.php',
                dataType : 'json',                
                data: {idPublicacion:$idPubliFotos},                 
                crossDomain: true,
                //timeout: 2000,
                cache: false,
                beforeSend: function(){                     
                    $('body').addClass('loading');                                        
                },
                success: function(datosConsDatosPubli){
                    console.log("datosConsDatosPubli "+JSON.stringify(datosConsDatosPubli));                   
                    if (datosConsDatosPubli['datosPublicado']>0) {//hay datos 

                        $("#precioFoPuM").html(datosConsDatosPubli['precio']+" €/m");
                        if (datosConsDatosPubli['gastos']==1) {
                            $("#incluyeFoPuM").html("Incluye gastos");    
                        }                        
                        $("#tituloFoPuM").html(datosConsDatosPubli['titulo']);
                        $("#comentarioFoPuM").html(datosConsDatosPubli['comentario']);
                        $("#zonaFoPuM").html(datosConsDatosPubli['zona']);
                       
                        $fechaDe= new Date(datosConsDatosPubli['fechaDesde']).toLocaleDateString('es-ES',{ year: 'numeric', month: 'long', day: 'numeric' });                        
                        
                        $("#desdeFoPuM").html("De: "+$fechaDe);
                        if (datosConsDatosPubli['hasta']==1) {
                            $fechaA= new Date(datosConsDatosPubli['fechaHasta']).toLocaleDateString('es-ES',{ year: 'numeric', month: 'long', day: 'numeric' }); 
                            $("#hastaFoPuM").html(" A: "+$fechaA);
                        }
                        else{
                            $("#hastaFoPuM").html("");   
                        }                        
                        if (datosConsDatosPubli['mesMin']>0) {
                            $("#minFoPuM").html(" Min: "+datosConsDatosPubli['mesMin']+" Mes/es ");
                        }
                        else{
                            $("#minFoPuM").html(" ");   
                        }
                        if (datosConsDatosPubli['mesMax']>0) {
                            $("#maxFoPuM").html(" Max: "+datosConsDatosPubli['mesMax']);
                        }             
                        else{
                            $("#maxFoPuM").html(" ");
                        }

                        if (datosConsDatosPubli['quePublicas']==1) {//marcamos Hab. solo
                            $("#paraFoPuM").css({"background": "url(img/camaSN.png) no-repeat center center ","background-size": "58px 58px"});
                        }
                        if (datosConsDatosPubli['quePublicas']==2){//marcamos Hab. compartido
                            $("#paraFoPuM").css({"background": "url(img/camaLN.png) no-repeat center center ","background-size": "58px 58px"})
                        }                        
                        if (datosConsDatosPubli['dimHabitacion']==1){//marcamos Habitacion. pequeño
                            $("#dimensionFoPuM").css({"background": "url(img/dimensionesSNLe.png) no-repeat center center ","background-size": "58px 58px"});
                        }    
                        if (datosConsDatosPubli['dimHabitacion']==2){//marcamos Habitacion. mediano
                            $("#dimensionFoPuM").css({"background": "url(img/dimensionesMNLe.png) no-repeat center center ","background-size": "58px 58px"});                            
                        }
                        if (datosConsDatosPubli['dimHabitacion']==3){//marcamos Habitacion. pequeño
                            $("#dimensionFoPuM").css({"background": "url(img/dimensionesLNLe.png) no-repeat center center ","background-size": "58px 58px"});                            
                        }                        
                        if (datosConsDatosPubli['cama']==1) {//marcamos cama. solo
                            $("#camaFoPuM").css({"background": "url(img/camaSimpleNLe.png) no-repeat center center ","background-size": "58px 58px"});            
                        }
                        if (datosConsDatosPubli['cama']==2){//marcamos cama. doble
                            $("#camaFoPuM").css({"background": "url(img/camaDobleNLe.png) no-repeat center center ","background-size": "58px 58px"});
                        }
                        if (datosConsDatosPubli['cama']==3){//marcamos cama. camasofa
                            $("#camaFoPuM").css({"background": "url(img/camaSofaNLe.png) no-repeat center center ","background-size": "58px 58px"});
                        }                        
                        if (datosConsDatosPubli['cama']==4){//marcamos cama. litera
                            $("#camaFoPuM").css({"background": "url(img/camaLiteraNLe.png) no-repeat center center ","background-size": "58px 58px"});
                        }
                        if (datosConsDatosPubli['cama']==5){//marcamos cama. solos 
                            $("#camaFoPuM").css({"background": "url(img/camaSolosNLe.png) no-repeat center center ","background-size": "58px 58px"});
                        }
                        if (datosConsDatosPubli['cama']==6){//marcamos cama. nada
                            $("#camaFoPuM").css({"background": "url(img/camaNadaNLe.png) no-repeat center center ","background-size": "58px 58px"});                           
                        } 

                        selDivMostrarDatosPu=$("#contenedorcompartirFoPuM");

                        if (datosConsDatosPubli['cuantosVivenH']>0) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/hombreNViPu.png) no-repeat center center; background-size:58px 58px;' ><span class='cuantosHoMuDaPu'>"+datosConsDatosPubli['cuantosVivenH']+"</span></div>";
                        }
                        if (datosConsDatosPubli['cuantosVivenM']>0) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/mujerNViPu.png) no-repeat center center; background-size:58px 58px;' ><span class='cuantosHoMuDaPu'>"+datosConsDatosPubli['cuantosVivenM']+"</span></div>";
                        }

                        selDivMostrarDatosPu.append(htmlMostrarDatosPu);
                        htmlMostrarDatosPu=" ";
                        selDivMostrarDatosPu=$("#contenedorServiciosFoPuM");

                        if (datosConsDatosPubli['ascensor']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/ascensorNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";
                        }
                        if (datosConsDatosPubli['calefaccion']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/calefaccionNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";
                        }
                        if (datosConsDatosPubli['estacionamiento']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/estacionamientoNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";
                        }
                        if (datosConsDatosPubli['lavaVajilla']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/lavaVajillasNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";
                        }
                        if (datosConsDatosPubli['lavadora']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/lavadoraNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";
                        }
                        if (datosConsDatosPubli['muebles']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/mueblesNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";
                        }
                        if (datosConsDatosPubli['piscina']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/piscinaNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";
                        }
                        if (datosConsDatosPubli['portero']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/porteroNLe.png) no-repeat center center; background-size:58px 58x;' ></div>";
                        }
                        if (datosConsDatosPubli['radiador']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/radiadorNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";
                        }
                        if (datosConsDatosPubli['secador']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/secadorNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";
                        }
                        if (datosConsDatosPubli['tv']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/tvNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";
                        }
                        if (datosConsDatosPubli['wifi']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/wifiNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";
                        }

                        selDivMostrarDatosPu.append(htmlMostrarDatosPu);
                        htmlMostrarDatosPu=" ";
                        selDivMostrarDatosPu=$("#contenedorpermitenFoPuM");

                        if (datosConsDatosPubli['noFumar']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/noFumarNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";
                        }
                        if (datosConsDatosPubli['noMascota']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/noMascotaNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";
                        }
                          
                        if (datosConsDatosPubli['noPareja']==1) {
                            htmlMostrarDatosPu+="<div class='imgHabitacion' style='background:url(img/noParejaNLe.png) no-repeat center center; background-size:58px 58px;' ></div>";                   
                        } 

                        selDivMostrarDatosPu.append(htmlMostrarDatosPu);
                        htmlMostrarDatosPu=" ";
                    }
                    if (datosConsDatosPubli['fotosPublicado']==0) {                        
                   }
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('body').removeClass('loading'); //Removemos la clase loading
                    alert("Problemas con la conexion. No se pude hacer la consulta, Intente una vez mas: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                },
                complete: function(){
                  $('body').removeClass('loading'); //Removemos la clase loading
                }
            });         
        } 

}
/*
function toLocaleDateStringSupportsLocales() {
  try {
    new Date().toLocaleDateString('es-ES');
  } catch (e) {
    return e.name === 'RangeError';
    alert(e.name);
  }
  alert("sin error");
  return false;
}
*/

        

