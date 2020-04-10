
//var storedFiles = [];
//var storedFilesDb = [];
var ipConex = '192.168.1.110';
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
    $publicarFoto = 0;//cambiar estado de publicar foto si no se hizo la publicacion
    //$guardarSeAnt = '';//variable guardar valor servicio  
    selDiv = $("#imgPublicar");//para las foto publicadas
    selDivSe = $("#contenedorServicios");   
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

        $(".icoFooter .icoFooterBuscar").css({"background": "url(img/buscarC.png) no-repeat center center","background-size": "30px 30px"});
        $(".icoFooter .glyphicon-upload").css({"color":"rgba(89, 89, 89, 0.8)"});
        $(".icoFooter .glyphicon-comment").css({"color":"rgba(89, 89, 89, 0.8)"});
        $(".icoFooter .icoFooterUsuario").css({"background": "url(img/perfilG.png) no-repeat center center","background-size": "30px 30px"});
        
        $("#paginaPrincipal").css("display", "block");
        $("#paginaListaMapas").css("display", "none");            
        $("#paginaPublicar").css("display", "none");                        
        $("#paginaMensaje").css("display", "none"); 
        $("#paginaUsuarioPerfilEditar").css("display", "none");
        $("#paginaUsuarioPerfilMostrar").css("display", "none");           
        //$("#paginaUsuarioPerfil").css("display", "none");
        
        $("#icoFMBuscar").css({"color":"#008080"});
        $("#icoFMPublicar").css({"color":"rgba(89, 89, 89, 0.8)"});                       
        $("#icoFMMensaje").css({"color":"rgba(89, 89, 89, 0.8)"});            
        $("#icoFMPerfil").css({"color":"rgba(89, 89, 89, 0.8)"});
        
    });
/*publicar principal*/
    $("#btnPublicarPrincipal").click(function(){
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
        
        $.ajax({
            type :'POST',
            url:'http://' + ipConex + '/wasiWeb/php/consultarDireccion.php',
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
                    $("#btnContinuarDireccion").css({"background-color":"#008080"});
                    linkBuscarDir=1;
                    autoCDir=1;
                    autoCCiu=1;
                    continuarDir=0;
                    //console.log("datosLocalDir "+ $datosRemotoDir);
                    console.log("btnPublicarPrincipal datosLocalDir "+JSON.stringify($datosLocalDir));
                }
            },
            error : function(jqXHR, textStatus, errorThrown) {
                alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
            }
        });
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
            $("#fotoPerfilE").css({"background": "url(http://" + ipConex + "/wasiWeb/"+$datosLocal['usrImg']+") no-repeat center center ","background-size":"cover"});
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

            $(".icoFooter .icoFooterBuscar").css({"background": "url(img/buscarG.png) no-repeat center center","background-size": "30px 30px"});
            $(".icoFooter .glyphicon-upload").css({"color":"rgba(89, 89, 89, 0.8)"});
            $(".icoFooter .glyphicon-comment").css({"color":"rgba(89, 89, 89, 0.8)"});
            $(".icoFooter .icoFooterUsuario").css({"background": "url(img/perfilC.png) no-repeat center center","background-size": "30px 30px"});  

            $("#icoFMBuscar").css({"color":"rgba(89, 89, 89, 0.8)"});  
            $("#icoFMPublicar").css({"color":"rgba(89, 89, 89, 0.8)"});                       
            $("#icoFMMensaje").css({"color":"rgba(89, 89, 89, 0.8)"});            
            $("#icoFMPerfil").css({"color":"#008080"});      
                                    
            /*datdo recuperados de local storage*/
            // $("#imgPerfil").attr({"src":"http://192.168.0.160/wasiWeb/"+ $datosLocal['usrImg']});
            $("#fotoPerfilM").css({"background": "url(http://" + ipConex + "/wasiWeb/"+ $datosLocal['usrImg'] +") no-repeat center center ","background-size": "cover"});
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
            $("#imgViHo").css({"background": "url(img/hombreNViPu.png) no-repeat center center ","background-size": "85px 85px"});
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
        //$contHoG='null';
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
            $("#imgViHo").css({"background": "url(img/hombreGViPu.png) no-repeat center center ","background-size": "85px 85px"});
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
            $("#imgViMu").css({"background": "url(img/mujerNViPu.png) no-repeat center center ","background-size": "85px 85px"});
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
        //$contMuG='null';
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
            $("#imgViMu").css({"background": "url(img/mujerGViPu.png) no-repeat center center ","background-size": "85px 85px"});
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
            if ($('#cboxfechaFin').val() == 0) {//chboxfechafin no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxfinfecha esta chek
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

            if ($('#cboxfechaFin').val() == 0) {//chboxfechafin no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxfinfecha esta chek
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

            if ($('#cboxfechaFin').val() == 0) {//chboxfechafin no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxfinfecha esta chek
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

            if ($('#cboxfechaFin').val() == 0) {//chboxfechafin no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxfinfecha esta chek
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

            if ($('#cboxfechaFin').val() == 0) {//chboxfechafin no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxfinfecha esta chek
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

            if ($('#cboxfechaFin').val() == 0) {//chboxfechafin no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxfinfecha esta chek
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
    
    $("#fechaDesde").val(date);

    $('#fechaDesde').datepicker({
        format: 'dd/mm/yyyy',
        startDate: dateTime,
        todayBtn: true,
        autoclose: true,        
    }).on('changeDate', function(ev) {
        alert("fechaDesde");
        $("#cboxfechaFin").prop('disabled', false);
        $("#mensajeErrorHasta").html(" ");
        var selected = new Date(ev.date); 
        if (selected.getDate()!=1) {
            $fechaInErrorPu = "Aconsejamos que elija el 1 de cada mes.";        
            $("#mensajeErrorDisponibleD").html($fechaInErrorPu);    
        }
        else{
            $("#mensajeErrorDisponibleD").html("");    
        }
        $("#fechaHasta").datepicker('setStartDate', new Date(selected.setDate(selected.getDate() + 30)));
            
        inFMPu=1;
        if ($('#cboxfechaFin').val() == 0) {//chboxfechafin no check
            if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
            }
        }
        else{//cuando cheboxfinfecha esta chek
            if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && finFMPu == 1 && dimMPu == 1) {
                $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
            }
        }               
    });

    $('#fechaHasta').datepicker({
        format: 'dd/mm/yyyy',        
        autoclose: true,        
    }).on('changeDate',function(e){
        alert("fechaHasta");
        if ($contFinFecha>0) {        
            finFMPu=1;            
        }        
        if (camaMPu == 1 && inFMPu == 1 && finFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
            $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
        } 
        $("#mensajeErrorDisponibleH").html("");   
    });    

    $("#hasta").click(function(){
        //continuarVi=1;
        if (inFMPu==1) {
            //$("#cboxfechaFin").prop('disabled', false);
            if ($('#cboxfechaFin').prop('checked')){
            
                $('#cboxfechaFin').val('0');
                $("#cboxfechaFin").prop('checked', false);
                $("#collapseHasta").collapse('hide');
               // $("#fechaHasta").attr({'required':false});            
                $(".container-custom-principal .contenedorHasta-collapse-custom").css({"margin-bottom": "10px","border-bottom": "1px solid #008080"});            
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                } 
            } 
            else{
                $('#cboxfechaFin').val('1');            
                $("#cboxfechaFin").prop('checked', true);
                $("#collapseHasta").collapse('show');
                $(".container-custom-principal .contenedorHasta-collapse-custom").css({"margin-bottom": "0px","border-bottom": "none"});            
                if (inFMPu==1) {
                    $contFinFecha=1;    
                }            
                if (camaMPu == 1 && inFMPu == 1 && finFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
                else{
                    $("#btnContinuarHabitacion").css({"background-color":"#808080"});//gris tema     
                }            
            }
        }
        else{
            $hastaErrorPu = "Antes elige una fecha de inicio.";        
            $("#mensajeErrorHasta").html($hastaErrorPu);
        }
                      
    });
    $("#imgHaS").click(function(){        
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

            if ($('#cboxfechaFin').val() == 0) {//chboxfechafin no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxfinfecha esta chek
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

            if ($('#cboxfechaFin').val() == 0) {//chboxfechafin no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxfinfecha esta chek
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

            if ($('#cboxfechaFin').val() == 0) {//chboxfechafin no check
                if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
                    $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
                }
            }
            else{//cuando cheboxfinfecha esta chek
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
                    $("#btnContinuarDireccion").css({"background-color":"#008080"});
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
                    $("#btnContinuarDireccion").css({"background-color":"#808080"});
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
    
//    $("#filePublicar").on("change", handleFileSelect);     
   // $("#imgPublicar").on("click", ".removeImgPublicar", removeFile);
   
   $prevScrollpos = window.pageYOffset;
    $(window).scroll(function(){
        $currentScrollPos = window.pageYOffset;

        //if ($('#navbar').scrollTop()>100) 
        if($prevScrollpos>$currentScrollPos)
        {
            $('#inputBuscar').collapse('show');
            $('#btnPublicarPrincipal').fadeIn(1000);
            //$("#btnPublicarPrincipal").animate({bottom: "75px"});       
           // $('#btnPublicarPrincipal').slideDown();        
            
        }
        else{
            $('#inputBuscar').collapse('hide');
            $('#btnPublicarPrincipal').fadeOut(1000);
            //$("#btnPublicarPrincipal").animate({bottom: "0"}); 
            //$('#btnPublicarPrincipal').slideUp();
            
        }  
        $prevScrollpos = $currentScrollPos;  
    });  
});//fin $(document).ready(function()

function toggleBounce() {
  if (markerD.getAnimation() !== null) {
    markerD.setAnimation(null);
  } else {
    markerD.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function inicioSesion(){
    $datosLocal=JSON.parse(localStorage.getItem('datosInicioSesion'));
    if($datosLocal!= undefined || $datosLocal!= null ){
        /*$.each($datosLocal, function(key, value){alert(key + ' = ' + value);});*/
        $("#nombreCompleto").html($datosLocal['usrName']);
        $("#imgPerfilHeader").attr({"src":"http://" + ipConex + "/wasiWeb/"+ $datosLocal['usrImg']}); 
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
// al continuar direcion insertamos o actualizamos datos de direccion,mostramos foto y datos consultamos si hay datos y fotos en la bse de datos 
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
    $("#publicarVivienda").css("display","none");
    $("#publicarServicios").css("display","none");
    $("#publicarHabitacion").css("display","none");     
    $(".container-custom-principal .progressbar-bar-custom").css("width", "50%");
    
    $("#mensajePublicar").html($datosLocal['usrEmail']);
    $("#mensajePublicar1").html($("#ciudadMpu").val());
    $("#mensajePublicar2").html($("#direccionMPu").val());
    $("#mensajePublicar3").html(addressLat);
    $("#mensajePublicar4").html(addressLon);    
    //direccion nueva
    if (continuarDir==1 ){        
        //no existe direccion en la base de datos insertar direccion        
        if ($datosLocalDir['publicado']==-1) {            
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/insertarDirecion.php',
                data: {idUsuario:$datosLocal['usrId'],zona:$dirZona,ciudad:$dirCiudad,direccion:$dirDireccion,Lat:$dirLat,Lon:$dirLon},                 
                crossDomain: true,
                cache: false,
                success: function(datosInsDir){
                    console.log("datosInslDir "+ JSON.stringify(datosInsDir));
                    $datosRemotoInsDir=JSON.stringify(datosInsDir);
                    localStorage.setItem('datosDir', $datosRemotoInsDir);                    
                    continuarDir=0; 
                    $datosLocalDir=JSON.parse(localStorage.getItem('datosDir'));         
                    console.log(" continuarDireccion()=-1 datosLocalInsDir "+ JSON.stringify($datosLocalDir));
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                }
            });
        }
        //existe direccion en la base de datos, actualizar direccion
        if ($datosLocalDir['publicado']==0) {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/actualizarDireccion.php',
                data: {idUsuario:$datosLocal['usrId'],idPublicacion:$datosLocalDir["idPublicar"],zona:$dirZona,ciudad:$dirCiudad,direccion:$dirDireccion,Lat:$dirLat,Lon:$dirLon},                 
                crossDomain: true,
                cache: false,
                success: function(datosActDir){
                        console.log("datosLocalActDir "+ JSON.stringify(datosActDir));
                        $datosRemotoActDir=JSON.stringify(datosActDir);
                        localStorage.setItem('datosDir', $datosRemotoActDir);                     
                        $datosLocalDir=JSON.parse(localStorage.getItem('datosDir')); 
                        continuarDir=0;
                        console.log("continuarDireccion()=0 datosLocalActDir "+ JSON.stringify($datosLocalDir));                    
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                }
            });
        }       
    }
    //consultamos si hay datos almacenados en tabla publicaciones y fotopublicaciones
    if (btnAtrasFoto==0) {// 0 si no presiono btnAtrasFoto 1 si se presiono   
        // verificar si hay fotos en la base de datos
        if ($datosLocalDir['publicado']==0) {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/consultarFotoPublicado.php',
                data: {idUsuario:$datosLocalDir['id'],idPublicacion:$datosLocalDir['idPublicar']},                 
                crossDomain: true,
                cache: false,
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
                    alert("error consultarFotoPublicado: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                    tMPu=0;
                    pMPu=0;
                    cMPu=0;
                    btnAtrasFoto=0;
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
            success: function(datosActFoto){
                //analizar si aqui es necesario un localstoragedir
                console.log("datosLocalActDir "+JSON.stringify(datosActFoto));
                continuarFUbi=0;
            },
            error : function(jqXHR, textStatus, errorThrown) {
                btnAtrasCarac=0;
                alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
            }
        });        
    }
    // consultamos si hay datos almacenados en tabala caracteristicas_vi_servicios 

    if (btnAtrasVi==0) {// 
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: 'http://' + ipConex + '/wasiWeb/php/consultarVivienda.php',
            data: {idUsuario:$datosLocalDir['id'],idPublicacion:$datosLocalDir['idPublicar']},                 
            crossDomain: true,
            cache: false,
            success: function(datosVivienda){
                if (datosVivienda['publicadoSeVi']==1) {
                    $("#superficiePu").val(datosVivienda['superficie']);
                    sMPu=1;
                    if (datosVivienda['quePublicas']==1) {//marcamos Hab. solo
                        $("#imgViSolo").css({"background": "url(img/camaSN.png) no-repeat center center ","background-size": "60px 70px"});
                        $("#imgViSolo").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                        $("#radioViSolo").prop('checked', true);
                        qMPu=1;
                    }
                    if (datosVivienda['quePublicas']==2){//marcamos Hab. compartido
                        $("#imgViComp").css({"background": "url(img/camaLN.png) no-repeat center center ","background-size": "60px 70px"});
                        $("#imgViComp").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                        $("#radioViComp").prop('checked', true);
                        qMPu=1;
                    }                        
                    if (datosVivienda['cuantosVivenHo']>0) {
                        $("#imgViHo").css({"background": "url(img/hombreNViPu.png) no-repeat center center ","background-size": "85px 85px"});
                        cHoMPu=1;
                        $("#cantHombres").val(datosVivienda['cuantosVivenHo']);
                        $contHombres=datosVivienda['cuantosVivenHo'];

                    }
                    if (datosVivienda['cuantosVivenMu']>0) {
                        $("#imgViMu").css({"background": "url(img/mujerNViPu.png) no-repeat center center ","background-size": "85px 85px"});
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
                alert("error consultarVivienda: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                //continuarVi=1;
                btnAtrasVi=0;
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
            alert("insertar"); 
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/insertarServicios.php',
                data: {idUsuario:$datosLocal['usrId'],idPublicacion:$datosLocalDir["idPublicar"],cbAscensor:$("#cboxAscensor").val(),cbCalefaccion:$("#cboxCalefaccion").val(),cbEstacionamiento:$("#cboxEstacionamiento").val(),cbLavadora:$("#cboxLavadora").val(),cbLavaVajilla:$("#cboxLavaVajilla").val(),cbMuebles:$("#cboxMuebles").val(),cbPiscina:$("#cboxPiscina").val(),cbPortero:$("#cboxPortero").val(),cbRadiador:$("#cboxRadiador").val(),cbSecador:$("#cboxSecador").val(),cbTv:$("#cboxTv").val(),cbWifi:$("#cboxWifi").val()},
                crossDomain: true,
                cache: false,
                success: function(datosInsSe){
                    console.log("datosLocalSe "+ JSON.stringify(datosInsSe));
                    guardarSe = 1;
                    $guardarSeAnt=guardarSe;
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                }
            });
        }
        else{
            alert("actualizar");
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/actualizarServicios.php',
                data: {idUsuario:$datosLocal['usrId'],idPublicacion:$datosLocalDir["idPublicar"],cbAscensor:$("#cboxAscensor").val(),cbCalefaccion:$("#cboxCalefaccion").val(),cbEstacionamiento:$("#cboxEstacionamiento").val(),cbLavadora:$("#cboxLavadora").val(),cbLavaVajilla:$("#cboxLavaVajilla").val(),cbMuebles:$("#cboxMuebles").val(),cbPiscina:$("#cboxPiscina").val(),cbPortero:$("#cboxPortero").val(),cbRadiador:$("#cboxRadiador").val(),cbSecador:$("#cboxSecador").val(),cbTv:$("#cboxTv").val(),cbWifi:$("#cboxWifi").val()},
                crossDomain: true,
                cache: false,
                success: function(datosActSe){
                    console.log("datosLocalSe "+ JSON.stringify(datosActSe));                    
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                }
            });
        }
        btnAtrasSe=1;
    }

}
 
/*    else{//si se presiono btnAtrasServicio guardarSe = -1
        alert($guardarSeAnt);
        guardarSe=$guardarSeAnt;        
    }   
}*/
function continuarVivienda(){
    event.preventDefault(); 
    /*$("#paginaPrincipal").css("display", "none");
    $("#paginaListaMapas").css("display", "none"); 
    $("#paginaPublicar").css("display", "block");*/
    $("#publicarFotoUbicacion").css("display","none");
    $("#publicarVivienda").css("display","none");
    $("#publicarHabitacion").css("display","block");        
    /*$("#paginaMensaje").css("display", "none");            
    $("#paginaUsuarioPerfilEditar").css("display", "none");
    $("#paginaUsuarioPerfilMostrar").css("display", "none");
    $("#divFooter").css("display", "none");
   */   
    $(".container-custom-principal .progressbar-bar-custom").css("width", "100%");
   //
    if(continuarVi==1){ // insertamos datos  
         //no existe datos de vivienda  en la base de datos insertar direccion        
         //if ($datosLocalDir['publicado_vi']==-1) {
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: 'http://' + ipConex + '/wasiWeb/php/actualizarVivienda.php',
            data: {idUsuario:$datosLocal['usrId'],idPublicacion:$datosLocalDir["idPublicar"],superficie:$("#superficiePu").val(),soloComp:$("input[name='radioVivienda']:checked").val(),cuantosHo:$("#cantHombres").val(),cuantosMu:$("#cantMujeres").val(),noFumar:$("#cboxNoFumar").val(),noMascota:$("#cboxNoMascota").val(),noPareja:$("#cboxNoPareja").val()},                 
            crossDomain: true,
            cache: false,
            success: function(datosInsViSeHa){
                alert("exitos");
                $datosRemotoInsViSeHa=JSON.stringify(datosInsViSeHa);
                localStorage.setItem('datosViSeHa', $datosRemotoInsViSeHa);
                $datosLocalViSeHa=JSON.parse(localStorage.getItem('datosViSeHa')); 
                continuarVi=0;          
                console.log("datosLocalViSeHa "+ $datosLocalViSeHa);
            },
            error : function(jqXHR, textStatus, errorThrown) {
                alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
            }
        });
    }
    if (btnAtrasHabi==0) {// 0 si no presiono btnAtrasHabi, 1 si se presiono   
        // verificar si hay datos en la base de datos
        
        if ($datosLocalDir['publicado']==0) {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/consultarHabitacion.php',
                data: {idUsuario:$datosLocalDir['id'],idPublicacion:$datosLocalDir['idPublicar']},                 
                crossDomain: true,
                cache: false,
                success: function(datosConHabitacion){
                    if (datosConHabitacion['publicadoHabi']==1) {
                        if (datosConHabitacion['cama']==1) {//marcamos cama. solo
                            $("#imgCaSolo").css({"background": "url(img/camaSimpleNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolo").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioCaSolo").prop('checked', true);
                            camaMPu=1;
                        }
                        if (datosConHabitacion['cama']==2){//marcamos cama. doble
                            $("#imgCaDoble").css({"background": "url(img/camaDobleNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaDoble").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioCaDoble").prop('checked', true);
                            camaMPu=1;
                        }
                        if (datosConHabitacion['cama']==3){//marcamos cama. camasofa
                            $("#imgCaSofa").css({"background": "url(img/camaSofaNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSofa").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioCaSofa").prop('checked', true);
                            camaMPu=1;
                        }                        
                        if (datosConHabitacion['cama']==4){//marcamos cama. litera
                            $("#imgCaLitera").css({"background": "url(img/camaLiteraNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaLitera").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioCaLitera").prop('checked', true);
                            camaMPu=1;
                        }
                        if (datosConHabitacion['cama']==5){//marcamos cama. solos 
                            $("#imgCaSolos").css({"background": "url(img/camaSolosNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaSolos").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioCaSolos").prop('checked', true);
                            camaMPu=1;
                        }
                        if (datosConHabitacion['cama']==6){//marcamos cama. nada
                            $("#imgCaNada").css({"background": "url(img/camaNadaNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgCaNada").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioCaNada").prop('checked', true);
                            camaMPu=1;
                        } 
                        $("#fechaDesde").val(datosConHabitacion['fechaDesde']);                        
                        inFMPu=1;

                        if (datosConHabitacion['hasta']==1) {
                            alert("datosConHabitacion['hasta'] " + datosConHabitacion['hasta'] + " fechaHasta " + datosConHabitacion['fechaHasta']);
                            $("#cboxfechaFin").prop('checked', true);
                            $("#cboxfechaFin").val(datosConHabitacion['hasta']);
                            // aqui fecha hasta colapse true
                            $("#collapseHasta").collapse('show');
                            $(".container-custom-principal .contenedorHasta-collapse-custom").css({"margin-bottom": "0px","border-bottom": "none"});            
            
                            $("#fechaHasta").val(datosConHabitacion['fechaHasta']);
                            finFMPu=1;
                        }
                        else{
                            alert("datosConHabitacion['hasta'] " + datosConHabitacion['hasta'] + " fechaHasta " + datosConHabitacion['fechaHasta']);
                            $("#cboxfechaFin").prop('disabled', true);
                            $("#cboxfechaFin").prop('checked', false);
                            $("#cboxfechaFin").val(datosConHabitacion['hasta']);
                            $("#collapseHasta").collapse('hide');
                            $(".container-custom-principal .contenedorHasta-collapse-custom").css({"margin-bottom": "10px","border-bottom": "1px solid #008080"});            
                            //finFMPu=0;
                            $("#fechaHasta").val(" ");
                        }                        
                        $("#tiempoMin").val(datosConHabitacion['mesMin']);
                        inMMPu=1;
                        $("#tiempoMax").val(datosConHabitacion['mesMax']);                    
                        //finFMPu=1;
                        if (datosConHabitacion['dimHabitacion']==1){//marcamos Habitacion. pequeño
                            $("#imgHaS").css({"background": "url(img/dimensionesSNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgHaS").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioHaS").prop('checked', true);
                            dimMPu=1;
                        }
                        if (datosConHabitacion['dimHabitacion']==2){//marcamos Habitacion. mediano
                            $("#imgHaM").css({"background": "url(img/dimensionesMNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgHaM").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioHaM").prop('checked', true);
                            dimMPu=1;
                        }
                        if (datosConHabitacion['dimHabitacion']==3){//marcamos Habitacion. pequeño
                            $("#imgHaL").css({"background": "url(img/dimensionesLNLe.png) no-repeat center center ","background-size": "60px 70px"});
                            $("#imgHaL").css({"border-color":"#008080","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}); 
                            $("#radioHaL").prop('checked', true);
                            dimMPu=1;
                        }                                           
                         btnAtrasHabi=1;
                        $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema
                    }                           
                    console.log("datosConHabitacion "+JSON.stringify(datosConHabitacion));                                           
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    alert("error consultarFotoPublicado: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                    camaMPu=0;
                    inFMPu=0;
                    finFMPu=0;
                    inMMPu=0;
                    finMMPu=0;
                    dimMPu=0;
                    btnAtrasHabi=0;
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
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: 'http://' + ipConex + '/wasiWeb/php/insertarHabitacion.php',
        data: {idUsuario:$datosLocal['usrId'],idPublicacion:$datosLocalDir["idPublicar"],cama:$("input[name='radioCama']:checked").val(),fechaDesde:$("#fechaDesde").val(),hasta:$("#cboxfechaFin").val(),fechaHasta:$("#fechaHasta").val(),mesMin:$("#tiempoMin").val(),mesMax:$("#tiempoMax").val(),dimHabi:$("input[name='radioHa']:checked").val()},                 
        crossDomain: true,
        cache: false,
        success: function(datosInsHabi){
            $datosRemotoInsHabi=JSON.stringify(datosInsHabi);
            localStorage.setItem('datosHabi', $datosRemotoInsHabi);
            $datosLocalHabi=JSON.parse(localStorage.getItem('datosHabi')); 
            //continuarDir=0;          
            console.log("datosLocalHabi "+ JSON.stringify($datosLocalHabi));
        },
        error : function(jqXHR, textStatus, errorThrown) {
            alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
        }
    });

}
/*
//direccion nueva
    if (continuarDir==1 ) {
       
        if ($datosLocalDir['publicado']==-1) {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/insertarDirecion.php',
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
        //existe direccion en la base de datos, actualizar direccion
        if ($datosLocalDir['publicado']==0) {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/actualizarDireccion.php',
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
    //consultamos si hay datos almacenados en tabla publicaciones y fotopublicaciones
    if (btnAtrasFoto==0) {// 0 si no presiono btnAtrasFoto 1 si se presiono   
        // verificar si hay fotos en la base de datos
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: 'http://' + ipConex + '/wasiWeb/php/consultarFotoPublicado.php',
            data: {idUsuario:$datosLocalDir['id'],idPublicacion:$datosLocalDir['idPublicar']},                 
            crossDomain: true,
            cache: false,
            success: function(datosFoto){
                if (datosFoto['fotos']>0) {
                    $("#tituloMPu").val(datosFoto['tituloArray'][0]);
                    $("#precioMPu").val(datosFoto['precioArray'][0]);
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
                alert("error consultarFotoPublicado: " + jqXHR.status + " " + textStatus + " " + errorThrown);
                tMPu=0;
                pMPu=0;
                cMPu=0;
                btnAtrasFoto=0;
            }
        });
    }

*/

        

