var selDiv = "";
var storedFiles = [];
var storedFilesDb = [];
$divPublicarAct=0;
$(document).ready(function(){
    $idCliente = 0; //var para envio por div publicar
    $emailCliente = ""; //var para envio de div publicar
    $contH = 0; // var para select perfil usuario
    $contM = 0; //  var para select perfil usuario
    $actualizar=0;
    $publicar=1;
    $datosUsEx=0;
    inicioSesion();
    
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
    /* mostrar tabs divInicio*/
    /* mostrar tabs divPrincipal paginalistamapas*/
    $("#btnAtras").click(function() {
        $("#paginaPrincipal").css("display", "block");
        $("#paginaListaMapas").css("display", "none");            
        })
    $("#aBuscarLista").click(function(){
            $("#aBuscarLista").tab('show');
    });
    $("#aBuscarMapa").click(function(){
            $("#aBuscarMapa").tab('show');
    });
    /* mostrar div buscarlistamapas*/    
    $("#linkBuscarListaMapa").click(function(){
        event.preventDefault(); 
        $("#paginaPrincipal").css("display", "none");
        $("#paginaListaMapas").css("display", "block");            
    });
    /* mostrar tabs div */            
    /*$(".nav-tabs a").click(function(){
        $(this).tab('show');
    });*/
    /* mostrar tabs div buscar*/            
    $("#icoBuscar").click(function(){
        //event.preventDefault();
        $(".icoFooter .glyphicon-search").css({"color":"#00cccc"});
        $(".icoFooter .glyphicon-envelope").css({"color":"#008080"});
        $(".icoFooter .glyphicon-comment").css({"color":"#008080"});
        $(".icoFooter .glyphicon-user").css({"color":"#008080"});
        $(".icoFooter .glyphicon-upload").css({"color":"#008080"});

        $("#icoBuscar").css({"transform":"scale(1.5,1)","width":"25%","color":"#00cccc"});        
        $("#icoSolicitud").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoChat").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoUsuario").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoPublicar").css({"transform":"scale(1,1)","width":"15%"});
        
        $("#paginaPrincipal").css("display", "block");
        $("#paginaListaMapas").css("display", "none");            
        $("#paginaSolicitud").css("display", "none");
        $("#paginaChat").css("display", "none");            
        $("#paginaUsuarioPerfil").css("display", "none");
        $("#paginaPublicar").css("display", "none");                        

        $("#icoFMBuscar").css({"display":"block","font-size":"10px"});
        $("#icoFMSolicitud").css("display", "none");            
        $("#icoFMChat").css("display", "none");            
        $("#icoFMPerfil").css("display", "none");
        $("#icoFMPublicar").css("display", "none");                       
    });
    /* mostrar tabs div solicitudes*/            
    $("#icoSolicitud").click(function(){
        //event.preventDefault();
        $(".icoFooter .glyphicon-search").css({"color":"#008080"});
        $(".icoFooter .glyphicon-envelope").css({"color":"#00cccc"});
        $(".icoFooter .glyphicon-comment").css({"color":"#008080"});
        $(".icoFooter .glyphicon-user").css({"color":"#008080"});
        $(".icoFooter .glyphicon-upload").css({"color":"#008080"});

        $("#icoBuscar").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoSolicitud").css({"transform":"scale(1.5,1)","width":"25%","color":"#00cccc"});
        $("#icoChat").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoUsuario").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoPublicar").css({"transform":"scale(1,1)","width":"15%"});

        $("#paginaPrincipal").css("display", "none");
        $("#paginaListaMapas").css("display", "none");            
        $("#paginaSolicitud").css("display", "block");            
        $("#paginaChat").css("display", "none");            
        $("#paginaUsuarioPerfil").css("display", "none");   
        $("#paginaPublicar").css("display", "none");                        

        $("#icoFMBuscar").css("display","none");
        $("#icoFMSolicitud").css({"display":"block","font-size":"10px"});            
        $("#icoFMChat").css("display", "none");            
        $("#icoFMPerfil").css("display", "none");     
        $("#icoFMPublicar").css("display", "none");                        
    });
    /* mostrar tabs div chat*/            
    $("#icoChat").click(function(){
        //event.preventDefault(); 
        $(".icoFooter .glyphicon-search").css({"color":"#008080"});
        $(".icoFooter .glyphicon-envelope").css({"color":"#008080"});
        $(".icoFooter .glyphicon-comment").css({"color":"#00cccc"});
        $(".icoFooter .glyphicon-user").css({"color":"#008080"});
        $(".icoFooter .glyphicon-upload").css({"color":"#008080"});

        $("#icoBuscar").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoSolicitud").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoChat").css({"transform":"scale(1.5,1)","width":"25%","color":"#00cccc"});
        $("#icoUsuario").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoPublicar").css({"transform":"scale(1,1)","width":"15%"});

        $("#paginaPrincipal").css("display", "none");
        $("#paginaListaMapas").css("display", "none");            
        $("#paginaSolicitud").css("display", "none");            
        $("#paginaChat").css("display", "block");            
        $("#paginaUsuarioPerfil").css("display", "none");        
        $("#paginaPublicar").css("display", "none");                        
        
        $("#icoFMBuscar").css("display","none");
        $("#icoFMSolicitud").css("display", "none");            
        $("#icoFMChat").css({"display":"block","font-size":"10px"});            
        $("#icoFMPerfil").css("display", "none");    
        $("#icoFMPublicar").css("display", "none");                        
    });
    /* mostrar tabs div perfil usuario*/            
    $("#icoUsuario").click(function(){
        //event.preventDefault(); 
        $(".icoFooter .glyphicon-search").css({"color":"#008080"});
        $(".icoFooter .glyphicon-envelope").css({"color":"#008080"});
        $(".icoFooter .glyphicon-comment").css({"color":"#008080"});
        $(".icoFooter .glyphicon-user").css({"color":"#00cccc"});
        $(".icoFooter .glyphicon-upload").css({"color":"#008080"});

        $("#icoBuscar").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoSolicitud").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoChat").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoUsuario").css({"transform":"scale(1.5,1)","width":"25%","color":"#00cccc"});
        $("#icoPublicar").css({"transform":"scale(1,1)","width":"15%"});

        $("#paginaPrincipal").css("display", "none");
        $("#paginaListaMapas").css("display", "none");            
        $("#paginaSolicitud").css("display", "none");            
        $("#paginaChat").css("display", "none");            
        $("#paginaUsuarioPerfil").css("display", "block");
        $("#paginaPublicar").css("display", "none");                        
                
        /*datdo recuperados de local storage*/
        $("#nombreA").val($datosLocal.usrName);
        $("#apellidosA").val($datosLocal.usrLname);
        $("#emailA").val($datosLocal.usrEmail);
        $("#telefonoA").val($datosLocal.usrPhone);

        $("#icoFMBuscar").css("display","none");
        $("#icoFMSolicitud").css("display", "none");            
        $("#icoFMChat").css("display", "none");            
        $("#icoFMPerfil").css({"display":"block","font-size":"10px"});
        $("#icoFMPublicar").css("display", "none");
    });
    $("#imgSexoH").click(function(){
        //$contH++;
        if ($contH % 2 == 0) {
            $contH++;
            $("#imgSexoH img").css({"border-color":"#008080"}); 
            $("#imgSexoH img").attr("src","img/hombreN.png");
            $("#mensjeHS").css({"color":"#000","font-size":"10px"});//html($contH);        
            
            $("#imgSexoM img").css({"border-color":"#999999"}); 
            $("#imgSexoM img").attr("src","img/mujerG.png");
            $contM=0; 
            $("#mensjeMS").css({"color":"#999999","font-size":"9px"});//html($contM);//             
        }
        else{
            $contH++;
            $("#imgSexoH img").css({"border-color":"#999999"}); 
            $("#imgSexoH img").attr("src","img/hombreG.png");
            $("#mensjeHS").css({"color":"#999999","font-size":"9px"});//.html($contH);//                 
        }              
    });
    $("#imgSexoM").click(function(){
        if ($contM % 2 == 0) {
            $contM++;
            $("#imgSexoM img").css({"border-color":"#008080"}); 
            $("#imgSexoM img").attr("src","img/mujerN.png");
            $("#mensjeMS").css({"color":"#000","font-size":"10px"});//.html($contM);//
             
            $("#imgSexoH img").css({"border-color":"#999999"}); 
            $("#imgSexoH img").attr("src","img/hombreG.png");
             $contH=0;
            $("#mensjeHS").css({"color":"#999999","font-size":"9px"});// .html($contH);//
        }
        else{
            $contM++;
            $("#imgSexoM img").css({"border-color":"#999999"}); 
            $("#imgSexoM img").attr("src","img/mujerG.png");
            $("#mensjeMS").css({"color":"#999999","font-size":"9px"});//.html($contM);//   
        }
    });
    /* mostrar tabs div publicar*/ 
             
    $("#icoPublicar").click(function(){
        //event.preventDefault(); 
        //$("#mensajePublicar").html($idCliente + " " + $emailCliente);
        $(".icoFooter .glyphicon-search").css({"color":"#008080"});
        $(".icoFooter .glyphicon-envelope").css({"color":"#008080"});
        $(".icoFooter .glyphicon-comment").css({"color":"#008080"});
        $(".icoFooter .glyphicon-user").css({"color":"#008080"});
        $(".icoFooter .glyphicon-upload").css({"color":"#00cccc"});
        
        $("#icoBuscar").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoSolicitud").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoChat").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoUsuario").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoPublicar").css({"transform":"scale(1.5,1)","width":"25%","color":"#00cccc"});

        $("#paginaPrincipal").css("display", "none");
        $("#paginaListaMapas").css("display", "none");            
        $("#paginaSolicitud").css("display", "none");            
        $("#paginaChat").css("display", "none");            
        $("#paginaPublicar").css("display", "block");                        
        $("#paginaUsuarioPerfil").css("display", "none"); 

        $("#icoFMBuscar").css("display","none");
        $("#icoFMSolicitud").css("display", "none");            
        $("#icoFMChat").css("display", "none");            
        $("#icoFMPerfil").css("display", "none");
        $("#icoFMPublicar").css({"display":"block","font-size":"10px"});
        // consula a la base de datos si existe alguna foto y datos del usuario
        //$parametros = {"idCliente" : $idCliente, "emailCliente" : $emailCliente};
        if ($divPublicarAct==0) {  
        $.ajax({
            type : 'POST',
            url: 'http://127.0.0.1/wasiWeb/php/consulaDatosUsuario.php', //'http://192.168.1.145/wasiWeb/php/registrar.php',
            dataType : 'json',
            data: {idC : $idCliente, emailC:$emailCliente},           
            success: function(datosConsulta)
            {                
                if (datosConsulta.datosE) {
                    alert("exito"+ datosConsulta.datosUsuarioPu.length+" "+datosConsulta.datosE);
                    for ($k = 0; $k < datosConsulta.datosUsuarioPu.length; $k++) {
                        //storedFilesDb[$k]=datosConsulta.datosUsuarioPu[$k];
                        var html = "<div class = 'fotoPublicar' style='background:url(http://192.168.0.160/wasiWeb/"+datosConsulta.datosUsuarioPu[$k]['ruta']+") no-repeat center center; background-size:75px 75px;' ><span class='glyphicon glyphicon-trash removeImgPublicar' data-file="+datosConsulta.datosUsuarioPu[$k]['nombre_foto']+"></span></div>";
                        selDiv.append(html);                        
                    }
                    //storedFilesDb=datosConsulta.datosUsuarioPu;
                    storedFilesDb = datosConsulta.datosUsuarioPu; 
                    //JSON.stringify
                    //slice();
                    $('#divImgPublicarG').css({'display':'none'});
                    $('#divImgPublicarP').css({'display':'flex'});
                    $('#mensajePublicar').html(storedFilesDb.length);
                    $('#mensajePublicar1').html(storedFiles.length);
                   //storedFiles.push(datosConsulta.datosUsuarioPu);
                }
                else{
                    $('#mensajePublicar4').html(datosConsulta.mensaje);
                }
                $datosUsEx=datosConsulta.datosE;
                $publicar=0;
            },
            error : function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status +" "+ textStatus+" "+ errorThrown);
            }
        });
        $divPublicarAct=1;
        }                                
    });
    
    $("#filePublicar").on("change", handleFileSelect);    
    selDiv = $("#imgPublicar"); 
    //$("#myForm").on("submit", handleForm);
    
    $("#imgPublicar").on("click", ".removeImgPublicar", removeFile);
});
//funciones para input  type file fotos add remove publicar 
function handleFileSelect(e) {    
    var files = e.target.files;//$("#filePublicar")[0].files.length
    if ((($("#filePublicar")[0].files.length)+(storedFiles.length)+(storedFilesDb.length)) > 5 ){//
        alert("solo puedes elegir maximo 5 fotos");
        $('#modalPublicar').modal('hide');
        //e.preventDefault();
        return;
    }
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function(f) {        
      if(!f.type.match("image.*")) {
        return;
      }
      storedFiles.push(f);      
      var reader = new FileReader();
      reader.onload = function (e) {
        /*<img src=\"" + e.target.result + "\" data-file='"+f.name+"' class='selFile' title='Click to remove'>" + f.name + "<br clear=\"left\"/>*/
        var html = "<div class = 'fotoPublicar' style='background:url("+e.target.result+") no-repeat center center; background-size:75px 75px;' ><span class='glyphicon glyphicon-trash removeImgPublicar' data-file="+f.name+"></span></div>";
        selDiv.append(html);        
      }
      reader.readAsDataURL(f);
    });
    $('#mensajePublicar1').html(storedFiles.length); 
    $('#modalPublicar').modal('hide');
    $('#divImgPublicarG').css({'display':'none'});
    $('#divImgPublicarP').css({'display':'flex'});
    $actualizar++;
    $publicar=1;
  }    
  function removeFile(e) {
    var file = $(this).data("file");
    for(var i=0;i<storedFiles.length;i++) {
        if(storedFiles[i].name === file) {
            storedFiles.splice(i,1);        
            break;
        }
    }
    for (var j = 0 ; j < storedFilesDb.length; j++) {
        if (storedFilesDb[j].nombre_foto === file) {
            storedFilesDb.splice(j,1);        
            break;
        }
    }    
    $(this).parent().remove();
    $actualizar++;
    $publicar=1;
    $('#mensajePublicar2').html(storedFilesDb.length);
    $('#mensajePublicar3').html(storedFiles.length);    
    if (storedFiles.length + storedFilesDb.length == 0) {
        $('#divImgPublicarG').css({'display':'block'});
        $('#divImgPublicarP').css({'display':'none'});
        $actualizar=0;
    }
  }  
function publicar(){
    event.preventDefault();
    if ((($("#filePublicar")[0].files.length)+(storedFilesDb.length)) <= 0 || storedFiles.length<=0){//??
        alert("tienes que elegir al menos 1 foto");
        return;
    }
    if ($publicar==1) {    
        $formDatos= new FormData($("#formPublicar")[0]);
        $formDatos.append("idCliente", $idCliente);
        $formDatos.append("emailCliente", $emailCliente);
        $formDatos.append("actualizar",$actualizar);
        $formDatos.append("datosUsEx",$datosUsEx);
        for(var j=0, len=storedFiles.length; j<len; j++) {
            $formDatos.append('filePublicar[]', storedFiles[j]);//['+ j +'] 
        }
        //for (var l = 0; l < storedFilesDb.length; l++) {
            $formDatos.append('filePublicarDb',JSON.stringify(storedFilesDb));//JSON.stringify() storedFilesDb[0]["nombre_foto"]
        //}
    $.ajax({
        type : 'POST',
        url: 'http://127.0.0.1/wasiWeb/php/publicar.php', //'http://192.168.1.145/wasiWeb/php/registrar.php',
        dataType : 'json',
        data: $formDatos,//data: $("#formRegistro").serialize(),                
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(datosP)
        {  
            alert("exito");        
            $('#mensajePublicar2').html(datosP.msg);       
            $('#mensajePublicar3').html(datosP.idC);       
            $('#mensajePublicar4').html(datosP.eC);       
        },
        error : function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status +" "+ textStatus+" "+ errorThrown);
        }
    });
    $publicar=0;
    }
    else{
        alert("Ya hiciste una publicaste ");
        return;
    }    

}
function inicioSesion(){
    $datosLocal=JSON.parse(localStorage.getItem('datosInicioSesion'));
    if($datosLocal!= undefined || $datosLocal!= null ){
       /* $.each($datosLocal, function(key, value){alert(key + ' = ' + value);});*/
        $("#nombreCompleto").html($datosLocal['usrName']);//http://192.168.1.145/wasiWeb/
        $("#imgPerfil").attr({"src":"http://127.0.0.1/wasiWeb/"+ $datosLocal['usrImg']});// fotos/eddyfer_77@hotmail.com/paisaje1.jpg}); //mostramos foto por defecto 
          
        //$("#imgP").html($datosLocal['usrImg']);
        $("#divInicio").css("display", "none");
        $("#divPrincipal").css("display", "block");
        $idCliente = $datosLocal['usrId'];
        $emailCliente = $datosLocal['usrEmail'];    
        //alert($datosLocal['usrEmail'] + " " + $datosLocal['usrId']);
    }
}
function registrarUsuario(){ //evento activado por onsubmit en validarformulario.js
event.preventDefault(); 
    $.ajax({
        type : 'POST',
        
        url: 'http://127.0.0.1/wasiWeb/php/registrar.php',/*http://192.168.1.145/wasiWeb/php/registrar.php',*/
        dataType : 'json',
        data: new FormData($("#formRegistro")[0]),/*$("#formRegistro").serialize(),*/
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(datosR)
        {  /* $("#aIngresar").tab('show');
            if(datosR.uReg==1){
                $('#mIS').html(datosR.msg+" "+datosR.umEmail);}
                if(datosR.uReg==0){
                    $('#mID').html(datosR.msg);}*/
                    alert("exito");
        },
        error : function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status +" "+ textStatus+" "+ errorThrown);
        }
    });    
}
function iniciarSession(){
    $('#mIS').html(" ");
    $('#mID').html(" ");
    //alert("entra btn inicio");
    event.preventDefault();
    $.ajax({
        //
        type :'POST',
        url:'http://127.0.0.1/wasiWeb/php/ingresar.php', //'http://192.168.1.145/wasiWeb/php/ingresar.php',
        dataType : 'json',        
        data: new FormData($("#formIngreso")[0]),        
        //async: false,
        //cache: false,
        contentType: false,
        processData: false,
        success: function(datosI){   
            //alert("entra ajax");
            if(datosI.usr==1){
                //$("#nombreCompleto").html("datosI.usrId datosI.usrName datosI.usrLname datosI.usrEmail");
                //$("#imgP").html(datosI.usrImg);
                $datosRemoto=JSON.stringify(datosI);
                localStorage.setItem('datosInicioSesion', $datosRemoto);
                //alert($datosRemoto);
                $("#divInicio").css("display", "none");
                $("#divPrincipal").css("display", "block");
                $('#paginaListaMapas').css("display", "none");
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
