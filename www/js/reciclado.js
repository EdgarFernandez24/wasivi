// json 
/*

<!DOCTYPE html>
<html>
<body>

<h2>Create JSON string from a JavaScript object.</h2>

<p id="demo"></p>
<p id="demo1"></p>
<p id="demo2"></p>
<p id="demo3"></p>
<script>
var obj = [{ name: "John", age: 30, city: "New York" },{ name: "Jo", age: 30, city: "New York" }];
var myJSON = JSON.stringify(obj);
var myJSON1 = myJSON.length;
var obj1 = JSON.parse(myJSON);
var obj2=obj["length"];

document.getElementById("demo").innerHTML = myJSON;
document.getElementById("demo1").innerHTML = myJSON1;
document.getElementById("demo2").innerHTML = obj[0]["name"];// + ", " + obj.age;
document.getElementById("demo3").innerHTML = obj2;
</script>

</body>
</html>*/
/*
  $(document).ready(function() {  
    $("#filePublicar").on("change", function(e) {
      var files = e.target.files,
      filesLength = files.length;
      for (var i = 0; i < filesLength; i++) {
        // solo proceso de archivo foto.
        var f = files[i];
        if (!f.type.match('image.*')) {
          continue;
        }        
        var fileReader = new FileReader();
        fileReader.onload = (function(e) {
          var file = e.target;
          // Render thumbnail.
          var miDiv = document.createElement('div');
              miDiv.setAttribute("class","fotoPublicar");          
              miDiv.setAttribute("style","background:url("  + e.target.result + ") no-repeat center center; background-size: 75px 75px;");
          var miSpan = document.createElement('span');
              miSpan.setAttribute("class","glyphicon glyphicon-trash removeImgPublicar");
              miDiv.appendChild(miSpan);
          document.getElementById('imgPublicar').insertBefore(miDiv, null);          
          $(".removeImgPublicar").click(function(){
            $(this).parent(".fotoPublicar").remove();
          });           
        });
        fileReader.readAsDataURL(f);
      }
      $('#modalPublicar').modal('hide');
    $('#divImgPublicarG').css({'display':'none'});
    $('#divImgPublicarP').css({'display':'flex'})
    });
});*/
             /* function handleFileSelect(evt) {
                var files = evt.target.files; // FileList object
                // Loop through the FileList and render image files as thumbnails.
                for (var i = 0, f; f = files[i]; i++) {
                  // Only process image files.
                  if (!f.type.match('image.*')) {
                    continue;
                  }
                  var reader = new FileReader();
                  // Closure to capture the file information.
                  reader.onload = (function(theFile) {
                    return function(e) {
                      // Render thumbnail.
                      var miDiv = document.createElement('div');
                      miDiv.setAttribute("class","fotoPublicar");
                      miDiv.setAttribute("id","fotoPubli"+[i]);
                      miDiv.setAttribute("style","background:url("  + e.target.result + ") no-repeat center center; background-size: 75px 75px;");
                      var miSpan = document.createElement('span');
                      miSpan.setAttribute("class","glyphicon glyphicon-trash");
                      /*div.innerHTML = ['<span  id=""></span></div>'].join('');*/
               /*       document.getElementById('listPublicar').insertBefore(miDiv, null);
                    };
                  })(f);
                  // Read in the image file as a data URL.
                  reader.readAsDataURL(f);
                }
                $('#modalPublicar').modal('hide');
                $('#divImgPublicarG').css({'display':'none'});

                //document.getElementById('modalPublicar').modal('hide');
              }
              document.getElementById('filePublicar').addEventListener('change', handleFileSelect, false);
*/
   /*function readURL(input) {
     for(var i =0; i< input.files.length; i++){
         if (input.files[i]) {
            var reader = new FileReader();
            reader.onload = function (e) {
               var img = $('<img id="dynamic'+i+'">');
               img.attr('src', e.target.result);
               img.appendTo('#form1');  
            }
            reader.readAsDataURL(input.files[i]);
           }
        }
    }

    $("#imgUpload").change(function(){
        readURL(this);
    });
*/
/*
$("#filePublicar").on("change", function(e) {
        var files = e.target.files;
        //$("#filePublicar")[0].files.length)
        $filesLength = files.length;
        $contFileImg += $filesLength;
        if ($contFileImg <= $limiteFileImg ) {                       
            $resto = $limiteFileImg - $contFileImg; 
            $entraCont = 1;
           // $('#mensajePublicar').html('fotos' + ($("#filePublicar")[0].files.length) );
                
        }
        else {
            alert("se mostrara solo 5 fotos.");
            if($resto == 0 && $entraCont == 0){
                $filesLength = $limiteFileImg;

            }
            if ($resto == 0 && $entraCont == 1) {
                $filesLength = 0;
            }
            if ($resto < 0) {
                $filesLength = 0;
                
            }
            if ($resto > 0) {
                $filesLength = $resto;
                
            }
           // $('#mensajePublicar').html('fotos' + ($("#filePublicar")[0].files.length) );
                
        $resto = $limiteFileImg - $contFileImg;                           
        }
        for (var i = 0 ; i < $filesLength ; i++) {
        // solo proceso de archivo foto.
        var f = files[i];
        if (!f.type.match('image.*') ) {
            continue;
        }           
        var fileReader = new FileReader();
            fileReader.onload = (function(e) {
            var file = e.target;
            // Render thumbnail.
            var miDiv = document.createElement('div');
            miDiv.setAttribute("class","fotoPublicar");          
            miDiv.setAttribute("style","background:url("  + e.target.result + ") no-repeat center center; background-size: 75px 75px;");
            var miSpan = document.createElement('span');
            miSpan.setAttribute("class","glyphicon glyphicon-trash removeImgPublicar");
            miDiv.appendChild(miSpan);
            document.getElementById('imgPublicar').insertBefore(miDiv, null);          
            $(".removeImgPublicar").click(function(){
                /*if($contFileImg <= $limiteFileImg ){
                   $contFileImg --;
                   $resto ++; 
                 // $('#mensajePublicar').html('Se borro una foto');
                }
                if ($contFileImg > $limiteFileImg) {

                    $contFileImg -= $limiteFileImg; 
                }
                if ($contFileImg == 0) {
                    $resto = 0;
                    $contFileImg = 0;
                    $('#divImgPublicarG').css({'display':'block'});
                    $('#divImgPublicarP').css({'display':'none'})                
                }
                
                $(this).parent(".fotoPublicar").remove();
                //$('#mensajePublicar').html('Se borro una foto' + ($("#filePublicar")[0].files.length) );

                
            });

        });  
                               
            fileReader.readAsDataURL(f);
            $('#mensajePublicar').html('fotos' + ($("#filePublicar")[0].files.length) );
    }    
    $('#modalPublicar').modal('hide');
    $('#divImgPublicarG').css({'display':'none'});
    $('#divImgPublicarP').css({'display':'flex'})
    });

*/

