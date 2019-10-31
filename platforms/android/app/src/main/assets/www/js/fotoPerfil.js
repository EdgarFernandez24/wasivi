  $(document).ready(function(){
    $("#CamaraRegistroPerfil").click(function(){      
      hacerFoto();
    });
    $("#CargarRegistroPerfil").click(function(){      
      cargarFoto();      
    });
    $("#CamaraEditarPerfil").click(function(){      
      hacerFotoEditar();
    });
    $("#CargarEditarPerfil").click(function(){      
      cargarFotoEditar();
    });
    $("#fotoPublicarCamara").click(function(){ 
      if ($("#imgPublicar").data("cont") < 5) {
        alert("entra fotoPublicarCamara");
        fotoPublicarCamara();  
      }
      else{
      alert("No. Puedes subir mas de 5 fotos");
       $('#modalPublicar').modal('hide');  
      }
      
    });
    $("#fotoPublicarGaleria").click(function(){  
      if ($("#imgPublicar").data("cont") < 5) {
        fotoPublicarGaleria();
      }
      else{
      alert("No. Puedes subir mas de 5 fotos"); 
       $('#modalPublicar').modal('hide'); 
      }      
    });
    


 /*  function archivo(evt){
      var files = evt.target.files; // FileList object
      // Obtenemos la imagen del campo "file".
      for (var i = 0, f; f = files[i]; i++) {
        //Solo admitimos imágenes.
        if (!f.type.match('image.*')) { //si el archivo selecionado no es imagen.*
          $("#list").css({"background": "url(img/usuario.jpg) no-repeat center center","backgroundSize" : "150px 150px"}); //mostramos foto por defecto 
          $("#mensajefoto").css("display", "inline");// mostramos el mensaje no es una foto
          $("#clist").css("visibility", "hidden");//ocultamos icono basurero 
          //Ajustar un nuevo elemento <form> alrededor del elemento <input type="file"> utilizando el método wrap ()
          //Restablezca el elemento <form> recién agregado con nuestro control de carga de archivos utilizando el método reset ()
          //Elimine el elemento <form> recién agregado del DOM utilizando el método unwrap ()
          $el = $('#fotoPerfil');
          $el.wrap('<form>').closest('form').get(0).reset(); 
          $el.unwrap();                                       
        }
        else{ //si el archivo es una imagen.*
          var reader = new FileReader();      
          reader.onload = (function(theFile) {
            return function(e) {
              $("#list").css({"backgroundImage": "url('" + e.target.result + "')","backgroundSize" : "150px 150px"});
              $("#clist").css("visibility", "visible");
              $("#mensajefoto").css("display", "none");
            };
          })(f);
          reader.readAsDataURL(f);
        }//fin el archivo es una foto                    
      }// fin de for 
    }//fin funcion archivo
    document.getElementById('fotoPerfil').addEventListener('change', archivo, true); 
 */   
 /*    $("#clist").click(function(event){ //click en el icono basurero para ocultar la imagen mostrada
        event.stopPropagation();
      $("#fotoRegistro").css({"background": "url(img/usuario.jpg) no-repeat center center","backgroundSize" : "150px 150px"}); 
      $("#clist").css("visibility", "hidden");
     /* $el = $('#fotoPerfil');
      $el.wrap('<form>').closest('form').get(0).reset();
      $el.unwrap();*/
    //  });
/*
function archivoA(evt){
      var filesA = evt.target.files; // FileList object
      // Obtenemos la imagen del campo "file".
      for (var i = 0, f; f = filesA[i]; i++) {
        //Solo admitimos imágenes.
        if (!f.type.match('image.*')) { //si el archivo selecionado no es imagen.*http://192.168.0.161/wasiWeb/
          $("#listA").css({"background": "url(http://192.168.0.21/wasiWeb/"+ $datosLocal['usrImg'] +") no-repeat center center ","backgroundSize" : "200px 150px"}); //mostramos foto por defecto 
          $("#mensajefotoA").css("display", "inline");// mostramos el mensaje no es una foto
          $("#clistA").css("visibility", "hidden");//ocultamos icono basurero 
          //Ajustar un nuevo elemento <form> alrededor del elemento <input type="file"> utilizando el método wrap ()
          //Restablezca el elemento <form> recién agregado con nuestro control de carga de archivos utilizando el método reset ()
          //Elimine el elemento <form> recién agregado del DOM utilizando el método unwrap ()
          $el = $('#fotoPerfilA');
          $el.wrap('<form>').closest('form').get(0).reset(); 
          $el.unwrap();                                       
        }
        else{ //si el archivo es una imagen.*
          var reader = new FileReader();      
          reader.onload = (function(theFileA) {
            return function(e) {
              $("#listA").css({"backgroundImage": "url('" + e.target.result + "')","backgroundSize" : "200px 150px"});
              $("#clistA").css("visibility", "visible");
              $("#mensajefotoA").css("display", "none");
            };
          })(f);
          reader.readAsDataURL(f);
        }//fin el archivo es una foto                    
      }// fin de for 
    }//fin funcion archivo
    document.getElementById('fotoPerfilA').addEventListener('change', archivoA, true); 
*/    
/*     $("#clistA").click(function(event){ //click en el icono basurero para ocultar la imagen mostrada
      event.stopPropagation();
      //mensajefotoalert("The p element was clicked.");
      $("#fotoPerfilE").css({"background": "url(img/usuario.jpg) no-repeat center center","background-size": "contain, cover"}); 
      $("#clistA").css("visibility", "hidden");
    /*  $el = $('#fotoPerfilA');
      $el.wrap('<form>').closest('form').get(0).reset();
      $el.unwrap();*/
  //     });


});    
  $('#TernimosCondiciones').on('shown.bs.modal', function () {
   //$('#myInput').focus()
  })