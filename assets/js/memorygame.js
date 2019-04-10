/*global $*/

$(document).ready(function() {

    function fieldInit(num) {
        var playFieldSize = num;
        $("#playfield").css("opacity", "0.0");
        $("#playfield").delay(1000).empty(); // deleting all elements from playfield container
        for (var i = 0; i < playFieldSize; i++) {
            if (playFieldSize == 9 && i == 4) {
                $("#playfield").append("<div id='dummycardshell'></div>");
            }
            else {
                $("#playfield").append("<div class='cardshell'></div>");
            }
        }
        $(".cardshell").append("<div class='card front vhalign'>?</div>");
        $(".cardshell").append("<div class='card back vhalign'>Hi</div>");
        if (playFieldSize == 9) { $("#field3x3Btn").addClass("selectedSize");
        $("#field4x4Btn").addClass("bg-fieldSizeBtn");
        $("#field6x6Btn").addClass("bg-fieldSizeBtn");
        } // indicator for selected size
        if (playFieldSize == 16) {
            $(".cardshell").css("width", "23.7%").css("height", "23.7%");
        }
        if (playFieldSize == 36) {
            $(".cardshell").css("width", "15.5%").css("height", "15.5%");
        }
         $("#playfield").css("opacity", "1.0");
    }

    fieldInit(9); // generating playfield of 3x3 per default 

    /*setTimeout(function () {
        joe.style.opacity = 1
      }, 100)
      */

    // click actions for playfield size buttons

    $("#field3x3Btn").click(function() {
        $("#field3x3Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $("#field4x4Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field6x6Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        fieldInit(9); // initalizing fieldsize 3x3 cards
    });


    $("#field4x4Btn").click(function() {
        $("#field3x3Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field4x4Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $("#field6x6Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        fieldInit(16); // initalizing fieldsize 4x4 cards
        
    });

    $("#field6x6Btn").click(function() {
        $("#field3x3Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field4x4Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field6x6Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        fieldInit(36); // initalizing fieldsize 8x8 cards
    });

    // when clicking any .cardshell class, class showMe is added to clicked card,which makes it turn / show. 

    $(document).on('click touchstart', '.cardshell', function() {
        $(this).addClass("showMe");
    });




    $("#startBtn").click(function() {
        $("#playfield").css("opacity", "1.0");
        $("#scorePlayer1").text("0 points"); //for restarting game set playerscores to zero
        $("#scorePlayer2").text("0 points"); //for restarting game set playerscores to zero
    });

    $("#stopBtn").click(function() {
        $("#playfield").css("opacity", "0.0");

    });

});
