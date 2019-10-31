var DIV_WIDTH = 350;
var currentDiv = 0;
var maxDivs = 6;
var speed = 500;
var divs;
var widthDiv;
$(document).ready(function(){
    widthDiv=$(".div-custom-principal").width()
    //alert("div " + widthDiv);
    
    $('#contenedorListaMapa').css({ 'width':widthDiv+'px' });//,height: 50%;
    $(".fotoH").css({ "width":(widthDiv)+"px","height": "90%" });
    $('.fotoD img' ).css({ 'width':(widthDiv/2)+'px','height': "90%" });
    $('.fotoD').css({ 'width':(widthDiv/2)+'px','height': "90%" });
    DIV_WIDTH=widthDiv;

});


var swipeOptions = {triggerOnTouchEnd: true, swipeStatus: swipeStatus,allowPageScroll: "vertical",threshold: 75 };

$(function () {
            //imgs = $(".imgs");
    divs = $(".fotosMapa");
    divs.swipe(swipeOptions);
});
        /**
         * Catch each phase of the swipe.
         * move : we drag the div
         * cancel : we animate back to where we were
         * end : we animate to the next image
         */
function swipeStatus(event, phase, direction, distance) {
//If we are moving before swipe, and we are going L or R in X mode, or U or D in Y mode then drag.
    if (phase == "move" && (direction == "left" || direction == "right")) {
        var duration = 0;
        if (direction == "left") {
            scrollDivs((DIV_WIDTH * currentDiv) + distance, duration);
        } 
        else if (direction == "right") {
            scrollDivs((DIV_WIDTH * currentDiv) - distance, duration);
        }
    } 
    else if (phase == "cancel") {
        scrollDivs(DIV_WIDTH * currentDiv, speed);
    } 
    else if (phase == "end") {
        if (direction == "right") {
            previousImage();
        } 
        else if (direction == "left") {
            nextImage();
        }
    }
}

function previousImage() {
    currentDiv = Math.max(currentDiv - 1, 0);
    scrollDivs(DIV_WIDTH * currentDiv, speed);
}

function nextImage() {
    currentDiv = Math.min(currentDiv + 1, maxDivs - 1);
    scrollDivs(DIV_WIDTH * currentDiv, speed);
}
        /**
         * Manually update the position of the imgs on drag
         */
function scrollDivs(distance, duration) {
    divs.css("transition-duration", (duration / 1000).toFixed(1) + "s");

    //inverse the number we set in the css
    var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
    divs.css("transform", "translate(" + value + "px,0px)");
}