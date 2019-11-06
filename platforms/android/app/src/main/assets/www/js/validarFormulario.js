$emailExiste=0;
$passwordExiste=0;
$publicarF=0;
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
                    url: 'http://192.168.1.106/wasiWeb/php/consultaEmail.php',
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
            //$error = false;
        } else{
            //
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
                //alert("cambio1");
                //if ($passwordExiste==1) { }
                $passwordPError = "La contraseña actual no tiene un mínimo de 6 caracteres.";
                $("#mensajeErrorContrasenyaPD").html($passwordPError);  
                $("#mensajeErrorContrasenyaPS").html("");  

                //$error = false;
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
                    url: 'http://192.168.1.106/wasiWeb/php/consultaPassword.php',
                    data: {password : $passwordP,idUsuario:$vidUsuario},                 
                    crossDomain: true,
                    cache: false,
                    success: function(resp){                                                  
                        if(resp.pReg==1){
                            $('#mensajeErrorContrasenyaPS').html(resp.pMsg);
                            $("#mensajeErrorContrasenyaPD").html(""); 
               
                            
                            $("#passwordNP").attr({'disabled':false,'required':true});
                            $("#cpasswordNP").attr({'disabled':false,'required':true});                            
                            //alert("success");
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
           // });           
        }
    }); 
$("#passwordNP").change(function(){ 
    $passwordNP = $("#passwordNP").val();       
        if($passwordNP == null || $passwordNP.length < 6 ) {
            $passwordErrorNP = "La contraseña debe tener un mínimo de 6 caracteres.";
            $("#mensajeErrorContrasenyaNP").html($passwordErrorNP);
            return false;
            //$error = false;
        } else{
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
        //btnAtrasCarac=0;
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
    
    if (!/^([0-9])*$/.test($precioPu || $precioPu=='' || $precioPu==null)){
        $precioErrorPu = "El Precio debe contener solo numeros.";        
        $("#mensajeErrorPrecioPu").html($precioErrorPu);
        $("#btnContinuarFoUb").css({"background-color":"#808080"});//gris
        pMPu=0;          
        return false;            
    } 
    else{
        //btnAtrasCarac=0;
        continuarFUbi=1;
        pMPu=1;
        $("#mensajeErrorPrecioPu").html("");
    }    
    if (tMPu==1 && pMPu==1 && cMPu==1 && contImg > 0) {
        //alert("si precioMPu");
        $("#btnContinuarFoUb").css({"background-color":"#008080"});//color tema
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
        //btnAtrasCarac=0;
    }
    if (tMPu==1 && pMPu==1 && cMPu==1 && contImg > 0) {
        //alert("si comentarioMPu");
        $("#btnContinuarFoUb").css({"background-color":"#008080"});//color tema
    }    
       
});
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
  /*  $("#ciudadMpu").click(function(){
        autoCCiu=0;
        
    });*/
    $("#formPublicarDireccion").submit(function(){
       // $formPD='';
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
       console.log("hola " + $("#imgPublicar").data("cont"));
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
            //alert("precio " +$precioPu);
            $precioErrorPu = "El Precio debe contener solo numeros.";        
            $("#mensajeErrorPrecioPu").html($precioErrorPu);          
            return false;            
            } 
        else{
            //alert("else  " + $precioPu);
            $("#mensajeErrorPrecioPu").html("");
        }        
      continuarFotoUbi();        
    });
    
    $("#formPublicarCarac").submit(function(){
        //$error=true;    
              
       continuarCarac();        
    });
});
/*dentro todo lo que se quiere ejecutar*/
   