$emailExiste=0;
$passwordExiste=0;
$publicarF=0;
//$ipConex='192.168.1.101';

$(document).ready(function(){
    $("#nombre").change(function(){ //validar nombre
        $nombre = $("#nombre").val();       
        if(!(/^[a-zA-Z ]+$/.test($nombre))) {
            $nombreError = "El nombre debe contener solo caracteres del alfabeto y espacio.";        
            $("#mensajeErrorNombre").html($nombreError);
            return false;
            //$error = false;            
        } else{
            //
            $("#mensajeErrorNombre").html("");
        }
    });
    $("#apellidos").change(function(){ //validar apellidos
        $apellidos = $("#apellidos").val();
        if(!(/^[a-zA-Z ]+$/.test($apellidos))) {
            $apellidosError = "Los apellidos debe contener solo caracteres del alfabeto y espacio.";        
            $("#mensajeErrorApellidos").html($apellidosError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorApellidos").html("");
        }
    });
    $("#inEmail").change(function(){
        $inEmail = $("#inEmail").val();         
        if (!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test($inEmail))) {
            $inEmailError = "Ingresa un correo electrónico válido.";
            $("#mensajeErrorEmailI").html($inEmailError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorEmailI").html("");
        }
        /*if ($("#inEmail").val()==" ") {
            $("#mensajeErrorEmailI").html("");
        }*/
    })

    $("#EmailR").change(function(){ //validar email
        $email = $("#EmailR").val();         
        if (!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test($email))) {
            $emailError = "Ingresa un correo electrónico válido.";
            $("#mensajeErrorEmailR").html($emailError);
            return false;
            //$error = false;
        } else{
            //$("#EmailR").blur(function(){ //verificar por doble ejecucion!!!
              // alert($("#EmailR").val());
                $vEmail = $("#EmailR").val();                   
                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    url: 'http://' + ipConex + '/wasiWeb/php/consultaEmail.php',
                    //data: {email : $('#email').val()},
                    data: "email="+$vEmail,
                    crossDomain: true,
                    cache: false,
                    success: function(resp){                                                  
                        if(resp){//si resp = 1 hay un email ya registrado
                            $('#mensajeErrorEmailR').html(resp.emsg);
                            $emailExiste=resp.eReg;
                        }                        
                    },
                    error : function(jqXHR, textStatus, errorThrown) {
                        alert("mi "+jqXHR.status +" "+ textStatus+" "+ errorThrown);
                    }
                });
           // });
            $("#mensajeErrorEmailR").html("");
        }
    });    
    $("#contrasenya").change(function(){ //validar contraseña
        $password = $("#contrasenya").val();       
        if($password == null || $password.length < 6 ) {
            $passwordError = "La contraseña debe tener un mínimo de 6 caracteres.";
            $("#mensajeErrorContrasenya").html($passwordError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorContrasenya").html("");
        }
    });
    $("#cContrasenya").change(function(){ //validar contraseña
        $cPassword = $("#cContrasenya").val();
        $password = $("#contrasenya").val();        
        if($cPassword != $password ) {
            $cPasswordError = "Las contraseñas no coinciden.";
            $("#mensajeErrorCContrasenya").html($cPasswordError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorCContrasenya").html("");
        }
    });
    $("#formIngreso").submit(function(){
        //$error=true;         
        $inEmail = $("#inEmail").val();         
        if (!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test($inEmail))) {
            $inEmailError = "Ingresa un correo electrónico válido.";
            $("#mensajeErrorEmailI").html($inEmailError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorEmailI").html("");
        }
        /*if ($("#inEmail").val()==" ") {
            $("#mensajeErrorEmailI").html("");
        }*/
        $inPassword = $("#inPassword").val();       
        if($inPassword == null || $inPassword.length < 6 ) {
            $inPasswordError = "La contraseña debe tener un mínimo de 6 caracteres.";
            $("#mensajeErrorPasswordI").html($inPasswordError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorPasswordI").html("");
        }
       iniciarSession();     
    });
    $("#formRegistro").submit(function(){
        //$error=true;    
        $nombre = $("#nombre").val();       
        if(!(/^[a-zA-Z ]+$/.test($nombre))) {
            $nombreError = "El nombre debe contener solo caracteres del alfabeto y espacio.";        
            $("#mensajeErrorNombre").html($nombreError);
            return false;            
            //$error = false;
        } else{
            //
            $("#mensajeErrorNombre").html("");
        }
        $apellidos = $("#apellidos").val();
        if(!(/^[a-zA-Z ]+$/.test($apellidos))) {
            $apellidosError = "Los apellidos debe contener solo caracteres del alfabeto y espacio.";        
            $("#mensajeErrorApellidos").html($apellidosError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorApellidos").html("");
        }

        $emailR = $("#EmailR").val(); 
        
        if (!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test($emailR))) {
            $emailError = "Ingresa un correo electrónico válido.";
            $("#mensajeErrorEmailR").html($emailError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorEmail").html("");
        }       
        if($emailExiste==1){
            $emailError="el correo ya existe";
            return false;
        }
        
        $password = $("#contrasenya").val();       
        if($password == null || $password.length < 6 ) {
            $passwordError = "La contraseña debe tener un mínimo de 6 caracteres.";
            $("#mensajeErrorContrasenya").html($passwordError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorContrasenya").html("");
        }
        $cPassword = $("#cContrasenya").val();
        $password = $("#contrasenya").val();        
        if($cPassword != $password ) {
            $cPasswordError = "Las contraseñas no coinciden.";
            $("#mensajeErrorCContrasenya").html($cPasswordError);
            return false;
           // $error = false;
        } else{
            //
            $("#mensajeErrorCContrasenya").html("");
        }
        registrarUsuario();     
    });

/*actualizar Perfil 
si la contraseña es igual al de la base de datos */

    $("#nombreP").change(function(){ //validar nombre
        $nombreP = $("#nombreP").val();       
        if(!(/^[a-zA-Z ]+$/.test($nombreP))) {            
            $nombreErrorP = "El nombre debe contener solo caracteres del alfabeto y espacio.";        
            $("#mensajeErrorNombreP").html($nombreErrorP);
            return false;
            //$error = false;            
        } else{
            //
            $("#mensajeErrorNombreP").html("");
        }
    });
    $("#apellidosP").change(function(){ //validar apellidos
        $apellidosP = $("#apellidosP").val();
        if(!(/^[a-zA-Z ]+$/.test($apellidosP))) {
            $apellidosErrorP = "Los apellidos debe contener solo caracteres del alfabeto y espacio.";        
            $("#mensajeErrorApellidosP").html($apellidosErrorP);          
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorApellidosP").html("");
        }
    });
    $("#telefonoP").change(function(){ 
        $telefonoP = $("#telefonoP").val();
        if (!/^([0-9])*$/.test($telefonoP)){
            $telefonoErrorP = "El telefono debe contener solo numeros.";        
            $("#mensajeErrortelefonoP").html($telefonoErrorP);          
            return false;            
        }
        else{
            $("#mensajeErrortelefonoP").html("");
        }
    });

    $("#passwordP").change(function(){ //validar 
        $passwordP  = $("#passwordP").val();
        $vidUsuario = $datosLocal['usrId'];     
       if($passwordP == null || $passwordP.length < 6 ) {            
            if ($passwordP == "") {
               $("#mensajeErrorContrasenyaPD").html(""); 
               $("#mensajeErrorContrasenyaPS").html("");                                                           
            }
            else{                
                $passwordPError = "La contraseña actual no tiene un mínimo de 6 caracteres.";
                $("#mensajeErrorContrasenyaPD").html($passwordPError);  
                $("#mensajeErrorContrasenyaPS").html("");                
            }
            $("#passwordNP").val("");
            $("#cpasswordNP").val("");
            $("#mensajeErrorContrasenyaNP").html("");
            $("#mensajeErrorCContrasenyaNP").html("");
            $("#passwordNP").attr('disabled',true);
            $("#cpasswordNP").attr('disabled',true);
            $passwordExiste=0; 
            return false;
        } 
        else{
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'http://' + ipConex + '/wasiWeb/php/consultaPassword.php',
                data: {password : $passwordP,idUsuario:$vidUsuario},                 
                crossDomain: true,
                cache: false,
                success: function(resp){                                                  
                    if(resp.pReg==1){
                        $('#mensajeErrorContrasenyaPS').html(resp.pMsg);
                        $("#mensajeErrorContrasenyaPD").html("");        
                        
                        $("#passwordNP").attr({'disabled':false,'required':true});
                        $("#cpasswordNP").attr({'disabled':false,'required':true});                     
                    }
                    else{ /*cuando la contraseña no coindicide*/
                        $('#mensajeErrorContrasenyaPD').html(resp.pMsg);
                        $("#mensajeErrorContrasenyaPS").html("");
                        $("#passwordNP").val("");
                        $("#cpasswordNP").val("");
                        $("#mensajeErrorContrasenyaNP").html("");
                        $("#mensajeErrorCContrasenyaNP").html(""); 
                        
                        $("#passwordNP").attr('disabled',true);
                        $("#cpasswordNP").attr('disabled',true);                                                        
                    }
                    $passwordExiste=resp.pReg;                         
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.status +" "+ textStatus+" "+ errorThrown);
                }
            });                     
        }
    }); 
    $("#passwordNP").change(function(){ 
        $passwordNP = $("#passwordNP").val();       
        if($passwordNP == null || $passwordNP.length < 6 ) {
            $passwordErrorNP = "La contraseña debe tener un mínimo de 6 caracteres.";
            $("#mensajeErrorContrasenyaNP").html($passwordErrorNP);
            return false;
            //$error = false;
        } 
        else{
            //
            $("#mensajeErrorContrasenyaNP").html("");
        }
    });
    $("#cpasswordNP").change(function(){ 
        $cPasswordNP = $("#cpasswordNP").val();
        $passwordNP = $("#passwordNP").val();        
        if($cPasswordNP != $passwordNP ) {
            $cPasswordErrorNP = "Las contraseñas no coinciden.";
            $("#mensajeErrorCContrasenyaNP").html($cPasswordErrorNP);
            return false;
           // $error = false;
        } else{
            //
            $("#mensajeErrorCContrasenyaNP").html("");
        }
    });
    $("#tituloMPu").change(function(){ 
        
        $tituloPu = $("#tituloMPu").val();
        
        if ($tituloPu == '' || $tituloPu == null) {
            //alert("vacio");
            $("#mensajeErrorTituloPu").html("Ingresa algun titulo para tu anuncio");
            tMPu=0;
            $("#btnContinuarFoUb").css({"background-color":"#808080"});//gris
        }
        else{            
            continuarFUbi=1;
            $("#mensajeErrorTituloPu").html(" ");
            tMPu=1;
        }
        if (tMPu==1 && pMPu==1 && cMPu==1 && contImg > 0) {
            //alert("si tituloMPu");
            $("#btnContinuarFoUb").css({"background-color":"#008080"});//color tema
        }
            
    });
    $("#precioMPu").change(function(){ 
        $precioPu = $("#precioMPu").val();
        
        if (!/^([0-9])*$/.test($precioPu || $precioPu=='' || $precioPu==null )){
            $precioErrorPu = "El Precio debe contener solo numeros y mayor a 0.";        
            $("#mensajeErrorPrecioPu").html($precioErrorPu);
            $("#btnContinuarFoUb").css({"background-color":"#808080"});//gris
            pMPu=0;          
            return false;            
        } 
        else{                     
            continuarFUbi=1;
            pMPu=1;
            $("#mensajeErrorPrecioPu").html("");
        }    
        if (tMPu==1 && pMPu==1 && cMPu==1 && contImg > 0) {
            //alert("si precioMPu");
            $("#btnContinuarFoUb").css({"background-color":"#008080"});//color tema
        }
    });  
    $("#cboxIncluyeGastos").change(function(){
        continuarFUbi=1;
    });
      
    $("#fianzaMPu").change(function(){
        $fianzaPu = $("#fianzaMPu").val();        
        if (!/^([0-9])*$/.test($fianzaPu)){
            $fianzaErrorPu = "La fianza debe contener solo numeros.";        
            $("#mensajeErrorFianzaPu").html($fianzaErrorPu);
            $("#btnContinuarFoUb").css({"background-color":"#808080"});//gris
            fMPu=0;          
            return false;            
        } 
        else{            
            continuarFUbi=1;
            fMPu=1;
            $("#mensajeErrorFianzaPu").html("");
            if (tMPu==1 && pMPu==1 && cMPu==1 && contImg > 0) {
                
                $("#btnContinuarFoUb").css({"background-color":"#008080"});//color tema
            }
        } 
    });
    $("#comentarioMPu").change(function(){
        $comentarioPu = $("#comentarioMPu").val();
        if ($comentarioPu =='' || $comentarioPu ==null) {
            $("#mensajeErrorcomentarioPu").html("Escribe algun comentario ");
            cMPu=0;
            $("#btnContinuarFoUb").css({"background-color":"#808080"});//gris    
        }
        else{
            $("#mensajeErrorcomentarioPu").html("");
            cMPu=1;
            continuarFUbi=1;
            
        }
        if (tMPu==1 && pMPu==1 && cMPu==1 && contImg > 0) {
            //alert("si comentarioMPu");
            $("#btnContinuarFoUb").css({"background-color":"#008080"});//color tema
        }           
    });
/**********************************servicios*************************************/
    $("#cboxAscensor").change(function(){        
        if (!$('#cboxAscensor').prop('checked')) {
            asMPu = 0;
            $('#cboxAscensor').val('0');
            $("#imgAscensor").remove();
            if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
                $("#btnContinuarSe").css({"background-color":"#808080"});//color Gris
                $("#btnAtrasServicios").css('visibility', 'hidden');                
                return false;    
            }            
        } 
        else{
            asMPu = 1;
            $('#cboxAscensor').val('1');
            htmlSe = "<div id='imgAscensor' class = 'serviciosPu' style='background:url(img/ascensorNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
            selDivSe.append(htmlSe);
            $("#mensajeErrorServiciosPuLi").html("");
            $("#btnContinuarSe").css({"background-color":"#008080"});//color tema 
            $("#btnAtrasServicios").css('visibility', 'visible'); 
        }
        guardarSe=$guardarSeAnt;
        btnAtrasSe=0;
    });
    $("#cboxCalefaccion").change(function(){        
        if (!$('#cboxCalefaccion').prop('checked')) {
            caMPu = 0;
            $('#cboxCalefaccion').val('0');
            $("#imgCalefaccion").remove();
            if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
                $("#btnContinuarSe").css({"background-color":"#808080"});//color Gris
                $("#btnAtrasServicios").css('visibility', 'hidden');
                return false;    
            }
        }
        else{
            caMPu = 1;
            $('#cboxCalefaccion').val('1');
            htmlSe = "<div id='imgCalefaccion' class = 'serviciosPu' style='background:url(img/calefaccionNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
            selDivSe.append(htmlSe);  
           $("#mensajeErrorServiciosPuLi").html("");
           $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
           $("#btnAtrasServicios").css('visibility', 'visible');  
        }
        guardarSe=$guardarSeAnt;
        btnAtrasSe=0;          
    }); 
    $("#cboxEstacionamiento").change(function(){        
        if (!$("#cboxEstacionamiento").prop('checked')) {
            esMPu =  0; 
            $("#cboxEstacionamiento").val('0');
            $("#imgEstacionamiento").remove();              
            if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
                $("#btnContinuarSe").css({"background-color":"#808080"});//color Gris
                $("#btnAtrasServicios").css('visibility', 'hidden');
                return false;    
            }
        }
        else{
            esMPu = 1;
            $('#cboxEstacionamiento').val('1');
            htmlSe = "<div id='imgEstacionamiento' class = 'serviciosPu' style='background:url(img/estacionamientoNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
            selDivSe.append(htmlSe);    
           $("#mensajeErrorServiciosPuLi").html("");
           $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
           $("#btnAtrasServicios").css('visibility', 'visible');  
        }
        guardarSe=$guardarSeAnt;
        btnAtrasSe=0;          
    });
    $("#cboxLavadora").change(function(){        
        if (!$('#cboxLavadora').prop('checked')) {
            laMPu = 0; 
            $("#cboxLavadora").val('0');
            $("#imgLavadora").remove();                            
            if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
                $("#btnContinuarSe").css({"background-color":"#808080"});//color Gris
                $("#btnAtrasServicios").css('visibility', 'hidden');
                return false;    
            }
        }         
        else{
            laMPu = 1;
            $('#cboxLavadora').val('1');
            htmlSe = "<div id ='imgLavadora' class = 'serviciosPu' style='background:url(img/lavadoraNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
            selDivSe.append(htmlSe);
            $("#mensajeErrorServiciosPuLi").html("");
            $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
            $("#btnAtrasServicios").css('visibility', 'visible');  
        } 
        guardarSe=$guardarSeAnt;
        btnAtrasSe=0;
    });
    $("#cboxLavaVajilla").change(function(){        
        if (!$('#cboxLavaVajilla').prop('checked')) {
            lavMPu = 0; 
            $("#cboxLavaVajilla").val('0');
            $("#imgLavaVajillas").remove();                           
            if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
                $("#btnContinuarSe").css({"background-color":"#808080"});//color Gris
                $("#btnAtrasServicios").css('visibility', 'hidden');
                return false;    
            }
        }          
        else{
            lavMPu = 1;
            $('#cboxLavaVajilla').val('1');
            htmlSe = "<div id='imgLavaVajillas' class = 'serviciosPu' style='background:url(img/lavaVajillasNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
            selDivSe.append(htmlSe);
            $("#mensajeErrorServiciosPuLi").html("");
            $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
            $("#btnAtrasServicios").css('visibility', 'visible');  
        }
        guardarSe=$guardarSeAnt;
        btnAtrasSe=0;
    });
    $("#cboxMuebles").change(function(){        
        if (!$('#cboxMuebles').prop('checked')) {
            muMPu = 0; 
            $("#cboxMuebles").val('0');
            $("#imgMuebles").remove();                           
            if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
                $("#btnContinuarSe").css({"background-color":"#808080"});//color Gris
                $("#btnAtrasServicios").css('visibility', 'hidden');
                return false;    
            }
        }          
        else{
            muMPu = 1;
            $('#cboxMuebles').val('1');
            htmlSe = "<div id='imgMuebles' class = 'serviciosPu' style='background:url(img/mueblesNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
            selDivSe.append(htmlSe);            
           $("#mensajeErrorServiciosPuLi").html("");
           $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
           $("#btnAtrasServicios").css('visibility', 'visible'); 
        }
        guardarSe=$guardarSeAnt;
        btnAtrasSe=0;        
    });    
    $("#cboxPiscina").change(function(){        
        if (!$('#cboxPiscina').prop('checked')) {
            pisMPu = 0; 
            $("#cboxPiscina").val('0');
            $("#imgPiscina").remove();                           
            if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
                $("#btnContinuarSe").css({"background-color":"#808080"});//color Gris
                $("#btnAtrasServicios").css('visibility', 'hidden');
                return false;    
            }
        }          
        else{
            pisMPu = 1;
            $('#cboxPiscina').val('1');
            htmlSe = "<div id='imgPiscina' class = 'serviciosPu' style='background:url(img/piscinaNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
            selDivSe.append(htmlSe);            
           $("#mensajeErrorServiciosPuLi").html("");
           $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
           $("#btnAtrasServicios").css('visibility', 'visible');  
        }
        guardarSe=$guardarSeAnt;
        btnAtrasSe=0;  
    });    
    $("#cboxPortero").change(function(){        
        if (!$('#cboxPortero').prop('checked')) {
            poMPu = 0; 
            $("#cboxPortero").val('0');
            $("#imgPortero").remove();                           
            if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
                $("#btnContinuarSe").css({"background-color":"#808080"});//color Gris
                $("#btnAtrasServicios").css('visibility', 'hidden');
                return false;    
            }
        }          
        else{
            poMPu = 1;
            $('#cboxPortero').val('1');
            htmlSe = "<div id='imgPortero' class = 'serviciosPu' style='background:url(img/porteroNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
            selDivSe.append(htmlSe);                       
            $("#mensajeErrorServiciosPuLi").html("");
            $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
            $("#btnAtrasServicios").css('visibility', 'visible');  
        }
        guardarSe=$guardarSeAnt;
        btnAtrasSe=0;        
    });    
    $("#cboxRadiador").change(function(){        
        if (!$('#cboxRadiador').prop('checked')) {
            raMPu = 0; 
            $("#cboxRadiador").val('0');
            $("#imgRadiador").remove();                           
            if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
                $("#btnContinuarSe").css({"background-color":"#808080"});//color Gris
                $("#btnAtrasServicios").css('visibility', 'hidden');
                return false;    
            }
        }          
        else{
            raMPu = 1;
            $('#cboxRadiador').val('1');
            htmlSe = "<div id='imgRadiador' class = 'serviciosPu' style='background:url(img/radiadorNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
            selDivSe.append(htmlSe);                       
            $("#mensajeErrorServiciosPuLi").html("");
            $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
            $("#btnAtrasServicios").css('visibility', 'visible');  
        }
        guardarSe=$guardarSeAnt;
        btnAtrasSe=0;        
    });   
    $("#cboxSecador").change(function(){        
        if (!$('#cboxSecador').prop('checked')) {
            seMPu = 0; 
            $("#cboxSecador").val('0');
            $("#imgSecador").remove();
            if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
                $("#btnContinuarSe").css({"background-color":"#808080"});//color Gris
                $("#btnAtrasServicios").css('visibility', 'hidden');
                return false;    
            }
        }          
        else{
            seMPu = 1;
            $('#cboxSecador').val('1');
            htmlSe = "<div id='imgSecador' class = 'serviciosPu' style='background:url(img/secadorNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
            selDivSe.append(htmlSe);                       
            $("#mensajeErrorServiciosPuLi").html("");
            $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
            $("#btnAtrasServicios").css('visibility', 'visible');  
        }
        guardarSe=$guardarSeAnt;
        btnAtrasSe=0;        
    });    
    $("#cboxTv").change(function(){        
        if (!$('#cboxTv').prop('checked')) {
            tvMPu = 0; 
            $("#cboxTv").val('0');
            $("#imgTv").remove();
            if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
                $("#btnContinuarSe").css({"background-color":"#808080"});//color Gris
                $("#btnAtrasServicios").css('visibility', 'hidden');
                return false;    
            }
        }          
        else{
            tvMPu = 1;
            $('#cboxTv').val('1');
            htmlSe = "<div id='imgTv' class = 'serviciosPu' style='background:url(img/tvNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
            selDivSe.append(htmlSe);                       
            $("#mensajeErrorServiciosPuLi").html("");
            $("#btnContinuarSe").css({"background-color":"#008080"});//color tema 
            $("#btnAtrasServicios").css('visibility', 'visible'); 
        }
        guardarSe=$guardarSeAnt;
        btnAtrasSe=0;        
    });    
    $("#cboxWifi").change(function(){        
        if (!$('#cboxWifi').prop('checked')) {
            wifiMPu = 0;
            $("#cboxWifi").val('0');
            $("#imgWifi").remove();
            if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
                $("#btnContinuarSe").css({"background-color":"#808080"});//color Gris
                $("#btnAtrasServicios").css('visibility', 'hidden');
                return false;    
            }
        }          
        else{
            wifiMPu = 1;
            $('#cboxWifi').val('1');
            htmlSe = "<div id='imgWifi' class = 'serviciosPu' style='background:url(img/wifiNLe.png) no-repeat center center; background-size:cover;border: 1px solid #000 ' ></div>";
            selDivSe.append(htmlSe);                       
            $("#mensajeErrorServiciosPuLi").html("");
            $("#btnContinuarSe").css({"background-color":"#008080"});//color tema
            $("#btnAtrasServicios").css('visibility', 'visible');  
        }
        guardarSe=$guardarSeAnt;
        btnAtrasSe=0;        
    });  
/****************************** fin Servicios********************************************************/
/*******************************vivienda **********************************************************/    
    $("#superficiePu").change(function(){ 
        $superficiePu = $("#superficiePu").val();
        if (!/^([0-9])*$/.test($superficiePu) || $superficiePu=='' || $superficiePu==null ){
            $superficieErrorPu = "La superficie de la vivienda debe contener solo numeros.";        
            $("#mensajeErrorSuperficiePu").html($superficieErrorPu);          
            sMPu=0;
            $("#btnContinuarVi").css({"background-color":"#808080"});//color gris  
            return false;            
        }
        else{
            continuarVi=1;
            sMPu=1
            $("#mensajeErrorSuperficiePu").html("");
            if (sMPu == 1 && qMPu == 1 && (cHoMPu == 1 || cMuMPu == 1)&&((asMPu==1)||(caMPu==1)||(esMPu==1)||(laMPu==1)||(lavMPu==1)||(muMPu==1)||(pisMPu==1)||(poMPu==1)||(raMPu==1)||(seMPu==1)||(tvMPu==1)||(wifiMPu==1))) {
                $("#btnContinuarVi").css({"background-color":"#008080"});//color tema  
            }
        }
    });
/**********************************************fin de vivienda ******************************************/
/***************************************habitacion*************************************************/
$("#tiempoMin").change(function(){
   /* $tiempoMin=$('#tiempoMin').val();
    if ($tiempoMin=="null" || $tiempoMin=="0" || $tiempoMin==" ") {
        inMMPu=0;
        $("#btnContinuarHabitacion").css({"background-color":"#808080"});//color gris 
        return false;     
    }   
    else{
        inMMPu=1;
        if (camaMPu == 1 && inFMPu == 1 && inMMPu == 1 && dimMPu == 1) {
            $("#btnContinuarHabitacion").css({"background-color":"#008080"});//color tema 
        }   
    }
*/
continuarHabi=1;
});
$("#tiempoMax").change(function(){
   
continuarHabi=1;
});

/***************************************fin de habitacion ************************************/

    $("#formPerfil").submit(function(){
        //$error=true;    
        $nombreP = $("#nombreP").val();       
        if(!(/^[a-zA-Z ]+$/.test($nombreP))) {
            $nombreErrorP = "El nombre debe contener solo caracteres del alfabeto y espacio.";        
            $("#mensajeErrorNombre").html($nombreErrorP);
            return false;            
            //$error = false;
        } else{
            //
            $("#mensajeErrorNombreP").html("");
        }
        $apellidosP = $("#apellidosP").val();
       
        if(!(/^[a-zA-Z ]+$/.test($apellidosP))) {
            $apellidosErrorP = "Los apellidos debe contener solo caracteres del alfabeto y espacio.";        
            $("#mensajeErrorApellidos").html($apellidosErrorP);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorApellidosP").html("");
        }
        $telefonoP = $("#telefonoP").val();
        if (!/^([0-9])*$/.test($telefonoP)){

        $telefonoErrorP = "El telefono debe contener solo numeros.";        
            $("#mensajeErrortelefonoP").html($telefonoErrorP);          
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrortelefonoP").html("");
        }
        $emailP = $("#emailP").val(); 
         
        if (!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test($emailP))) {
            $emailErrorP = "Ingresa un correo electrónico válido.";
            $("#mensajeErrorEmailP").html($emailErrorP);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorEmailP").html("");
        } 

        $passwordP = $("#passwordP").val();       
        if($passwordP != "" && $passwordP.length < 6 ) {
            
            $passwordErrorP = "La contraseña actual tiene menos de 6 caracteres.";
            $("#mensajeErrorContrasenyaPD").html($passwordErrorP);
            return false;
                //$error = false;
        } else {
                //
            $("#mensajeErrorContrasenyaPD").html("");
         }
     
        if ($passwordExiste==-1) {/*pasword caracteres mayor a 6 e incorrecto */
            return false;
        }
        if($passwordExiste == 1){ // si no entra el ajax no manda estos elementos 
            $passwordNP = $("#passwordNP").val();
            $cpasswordNP = $("#cpasswordNP").val();         
            if($passwordNP == null || $passwordNP.length < 6 ) {
                $passwordErrorNP = "La contraseña debe tener un mínimo de 6 caracteres.";
                $("#mensajeErrorContrasenyaNP").html($passwordErrorNP);
                return false;
                //$error = false;
            } else{
                //
             $("#mensajeErrorContrasenyaNP").html("");
            }       
            if($cpasswordNP != $passwordNP ) {
                $cPasswordErrorP = "Las contraseñas no coinciden.";
                $("#mensajeErrorCContrasenyaNP").html($cPasswordErrorP);
                return false;
                // $error = false;
            } else{
            //
                $("#mensajeErrorCContrasenyaNP").html("");
            }
        }  
        else{/* si disable true no manda elemento por ajax*/
            $("#passwordNP").attr('disabled',false);
            $("#cpasswordNP").attr('disabled',false);  

        }        
       actualizarPerfil($passwordExiste);        
    }); 
    $("#formPublicarDireccion").submit(function(){
        if (!linkBuscarDir) {
            //alert("entra "+ linkBuscarDir );
            $("#mensajeErrorDireccionT").html("Ingrese una direccion correcta ");
            //$formPD=0;
            return false;
        }
        else{
            $("#mensajeErrorDireccion").html(" ");
            //$formPD=1;
        }
        if (!autoCCiu) {
            //alert("entra autoCCiu "+ autoCCiu );
            $("#mensajeErrorCiudad").html("Elige una ciudad de la lista ! ");
            //$formPD=0;
            return false;
        }
        else{
            $("#mensajeErrorCiudad").html(" ");
            //$formPD=1;
        }
        if (!autoCDir) {
            //alert("entra autoCDir "+ autoCDir );
            $("#mensajeErrorDireccion").html("Elige una direccion de la lista ! ");
           // $formPD=0;
            return false;
        }
        else{
            $("#mensajeErrorDireccion").html(" ");
            //$formPD=1;
        }
        //if ($formPD==1) {}
        continuarDireccion();   
               
    });

    $("#formPublicarFotoUbicacion").submit(function(){
        
        //alert("formPublicarFotoUbicacion "+ $("#imgPublicar").data("cont"));
       console.log("contador Imagenes " + $("#imgPublicar").data("cont"));
        //alert("tienes que elegir al menos 1 foto");
        if ($("#imgPublicar").data("cont")<=0){            
            alert("tienes que elegir al menos 1 foto");           
            $("#mensajeModalFotoPublicar").html("tienes que elegir al menos 1 foto");
            return false;
        }
        else{
            //alert("else imgPublicar");

            $("#mensajeModalFotoPublicar").html("");
        }

        $precioPu = $("#precioMPu").val();

        if (!/^([0-9])*$/.test($precioPu)){
            
            $precioErrorPu = "La mensualidad debe contener solo numeros y mayor a 0.";        
            $("#mensajeErrorPrecioPu").html($precioErrorPu);          
            return false;            
        } 
        else{
            //alert("else  " + $precioPu);
            $("#mensajeErrorPrecioPu").html("");
        }
        $fianzaPu = $("#fianzaMPu").val();        
        if (!/^([0-9])*$/.test($fianzaPu)){
            $fianzaErrorPu = "La fianza debe contener solo numeros.";        
            $("#mensajeErrorFianzaPu").html($fianzaErrorPu);       
            return false;            
        } 
        else{           
            $("#mensajeErrorFianzaPu").html("");           
        } 
        continuarFotoUbi();        
    });
    $("#formPublicarSe").submit(function(){
        if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
            $("#mensajeErrorServiciosPuLi").html("Elige por lo menos un servico");
            $("#btnContinuarSe").css({"background-color":"#808080"});//color Gris 
            return false;
        } 
        else{
            $("#mensajeErrorServiciosPuLi").html("");
            $("#mensajeErrorServiciosPu").html(""); 

            //guardarSe = 1;//para insertar servicios en tabla caracterisiticas_vi_servicios
        }        
        guardarServicios();
    });

    $("#formPublicarVi").submit(function(){
        $superficiePu = $("#superficiePu").val();
        if (!/^([0-9])*$/.test($superficiePu)){
            $superficieErrorPu = "La superficie de la vivienda debe contener solo numeros.";        
            $("#mensajeErrorSuperficiePu").html($superficieErrorPu);          
            return false;            
        }
        else{
            $("#mensajeErrorSuperficiePu").html("");
        }
        $nHombre = $("#cantHombres").val();
        $nMujer = $("#cantMujeres").val();
        if (!($nHombre > 0) && !($nMujer > 0)) {
            $personaErrorPu = "Dime cuantos compañeros hay en la vivienda.";        
            $("#mensajeErrorPersonasPu").html($personaErrorPu);          
            return false;
        }
        else{
            $("#mensajeErrorPersonasPu").html("");
        }
        if( !$('#cboxAscensor').prop('checked') && !$('#cboxCalefaccion').prop('checked') && !$('#cboxEstacionamiento').prop('checked') && !$('#cboxLavadora').prop('checked') && !$('#cboxLavaVajilla').prop('checked') && !$('#cboxMuebles').prop('checked') && !$('#cboxPiscina').prop('checked') && !$('#cboxPortero').prop('checked') && !$('#cboxRadiador').prop('checked') && !$('#cboxSecador').prop('checked') && !$('#cboxTv').prop('checked') && !$('#cboxWifi').prop('checked')) {
            $serviciosErrorPu = "Elige uno de los servicios disponibles de vivienda.";        
            $("#mensajeErrorServiciosPu").html($serviciosErrorPu);        
            return false;
        }
        else{
            $("#mensajeErrorServiciosPu").html("");        
        }
       continuarVivienda();        
    });
    $("#formPublicarHabitacion").submit(function(){
        //$fechaIn=$('#fechaDesde').val();        
       if (inFMPu == 0) {
            $fecha = new Date();
            $dia = $fecha.getDate();
            //alert("inFMPu: " + inFMPu +" dia " + $dia);
            if ($dia != 1) {
                $fechaInErrorPu = "Aconsejamos que elija el 1 de cada mes.";        
                $("#mensajeErrorDisponibleD").html($fechaInErrorPu);       
            return false;    
            }            
        }
        else{            
            $("#mensajeErrorDisponibleD").html("");    
        }
        $cboxfechaHasta=$('#cboxfechaHasta').val();
        if ($cboxfechaHasta == 1 ) {            
            if (finFMPu == 0) {
                $fechaFinErrorPu = "ingrese una fecha.";        
                $("#mensajeErrorDisponibleH").html($fechaFinErrorPu);          
                return false;    
            }            
        }
        else{            
            $("#mensajeErrorDisponibleH").html("");
        }
        $fechaDesde=$("#fechaDesde").val();
        //alert("$fechaDesde " +$fechaDesde);

        $fechaHasta=$("#fechaHasta").val();
        //alert("$fechaHasta "+$fechaHasta);
        if ($('#cboxfechaHasta').val()==1) {
            if (Date.parse($fechaDesde) >= Date.parse($fechaHasta)){
            //alert("entra comparar");
            $fechaFinErrorPu = "La fecha incial es mayor o igual a la fecha final.";        
                $("#mensajeErrorDisponibleH").html($fechaFinErrorPu); 
                $("#btnContinuarHabitacion").css({"background-color":"#808080"});//gris tema           
            return false;
            }
            else{
                $("#mensajeErrorDisponibleH").html("");          
            }    
        }
        else{
            $("#fechaHasta").val("");
        }
        
       publicarCaHabitacion();        
    });
});
/*dentro todo lo que se quiere ejecutar*/
   