/*global $*/

$(document).ready(function() {

    // let , var declarations, initial conditions on startup

    // predefined array with 18 pairs of cards = 36 cards max. Array will be cut to meet smaller fieldsizes.
    let masterCardArray = ['card1', 'card1', 'card2', 'card2', 'card3', 'card3', 'card4', 'card4', 'card5', 'card5', 'card6', 'card6', 'card7', 'card7', 'card8', 'card8', 'card9', 'card9', 'card10', 'card10', 'card11', 'card11', 'card12', 'card12', 'card13', 'card13', 'card14', 'card14', 'card15', 'card15', 'card16', 'card16', 'card17', 'card17', 'card18', 'card18'];
    let currentCardArray = [];
    var lastPlayer = "Player1";
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    $('#saveBtn').attr("data-dismiss", ""); // removing data-dismiss attribute for registration modal on field validation

    // implementations of functions

    function checkForMatch() {
        if ($('.taken .back').length == 2) {
            $(document).off('touchstart click', '.cardshell'); // to make playfield not react to clicks / touches while stopped
            var takenCard1, takenCard2;
            takenCard1 = $('.taken .back').eq(0); //extracting element with index '0' from $('.taken .back')
            takenCard2 = $('.taken .back').eq(1); //extracting element with index '1' from $('.taken .back')
            var classesCard1 = takenCard1.attr("class");
            var classesCard2 = takenCard2.attr("class");

            // chk for match
            if (classesCard1 == classesCard2) {
                setTimeout(function() {
                    // popup 'match'
                    popupMatch();
                    setTimeout(function() {
                        // assign player's color to indicate win
                        if (lastPlayer == "Player1") {
                            $('.taken .back').append("<span class='checkmarkPlayer1Big glyphicon glyphicon-ok-sign'></span>");
                            scorePlayer1 = scorePlayer1 + 1;
                            $('.scorePlayer1').text(scorePlayer1);
                        }
                        else if (lastPlayer == "Player2") {
                            $('.taken .back').append("<span class='checkmarkPlayer2Big glyphicon glyphicon-ok-sign'></span>");
                            scorePlayer2 = scorePlayer2 + 1;
                            $('.scorePlayer2').text(scorePlayer2);
                        }
                        $('.taken').addClass('dummycardshell').removeClass('cardshell');
                        // $(document).off('touchstart click', '.taken~.dummycardshell');
                        // remove taken class
                        $('.dummycardshell').removeClass('taken');
                        $('.cardshell').removeClass('taken');
                        if ($('.showMe').length == $('.card').length) {
                            gameCompleted();
                        }
                        else {
                            whoIsNext();
                        }
                    }, 2000);
                }, 500);
            }
            else if (classesCard1 != classesCard2) {
                setTimeout(function() {
                    //popup no match
                    popupNoMatch();
                    setTimeout(function() { // delay of 1500ms to be able to see shown cards
                        $(".taken").removeClass('showMe taken');
                        if (lastPlayer == "Player1") {
                            lastPlayer = "Player2";
                        }
                        else if (lastPlayer == "Player2") {
                            lastPlayer = "Player1";
                        }
                        setTimeout(function() {
                            whoIsNext();
                        }, 750); // makes whoIsNext checkup little more delayed 
                    }, 1500);
                }, 500); // wait until cards have fully turned 
            }
            setTimeout(function() {
                $(document).on('touchstart click', '.cardshell', function() { //re-enable clicks on cards
                    $(this).addClass("showMe taken");
                    checkForMatch();
                });
            }, 1000);
        }
    }


    function gameCompleted() {

        $('.popupGameCompleted').css("transform", "translateZ(10px)").css("opacity", "1.0");
        if (scorePlayer1 > scorePlayer2) {
            $('.popupGameCompleted').text("Game Completed!" + $('#nameFieldPlayer1').val() + " has won!");
        }

        else if (scorePlayer2 > scorePlayer1) {
            $('.popupGameCompleted').text("Game Completed!" + $('#nameFieldPlayer2').val() + " has won!");
        }

        makeBtnActive();
        $("#startBtn").removeClass("btnlocked");
        $(document).off('touchstart click', '.cardshell'); // to make playfield not react to clicks / touches while stopped


    }

    function whoIsNext() {
        if (lastPlayer == "Player1") {
            $('.playerStats1').css('background-color', 'red'); // set to red when active
            $('.playerStats2').css('background-color', 'grey'); // set other player to grey
            $('.popupNext').text($('#nameFieldPlayer1').val());
        }
        else if (lastPlayer == "Player2") {
            $('.playerStats2').css('background-color', 'red');
            $('.playerStats1').css('background-color', 'grey');
            $('.popupNext').text($('#nameFieldPlayer2').val());
        }
        $('.popupNext').css("opacity", "1.0");
        // $('.popupNext').css("transform", "translateZ(10px)");
        // setTimeout(function() {

        //    }, 1000);

        setTimeout(function() {
            $('.popupNext').css("opacity", "0.0");
        }, 1000);
    }

    function popupMatch() {

        $('.popupMatch').css("transform", "translateZ(10px)");
        $('.popupMatch').css("opacity", "1.0");

        setTimeout(function() {
            $('.popupMatch').css("opacity", "0.0");
        }, 1200);
        setTimeout(function() {
            $('.popupMatch').css("transform", "translateZ(-10px)");
        }, 3000);
    }

    function popupNoMatch() {
        $('.popupNoMatch').css("transform", "translateZ(10px)");
        $('.popupNoMatch').css("opacity", "1.0");

        setTimeout(function() {
            $('.popupNoMatch').css("opacity", "0.0");
        }, 1200);
        setTimeout(function() {
            $('.popupNoMatch').css("transform", "translateZ(-10px)");
        }, 3000);
    }

    function make_field8BtnVisActive() {
        $("#field8Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
    }

    function make_field16BtnVisActive() {
        $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field16Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
        $("#field36Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
    }

    function make_field36BtnVisActive() {
        $("#field8Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field16Btn").removeClass("selectedSize").addClass("bg-fieldSizeBtn"); // removing selected size indicator class
        $("#field36Btn").addClass("selectedSize").removeClass("bg-fieldSizeBtn"); // indicator for selected size
    }

    function makeBtnInactive() {

        // apply btnlocked class to all buttons but how to button and stopbutton
        // also remove the click event to make inactive.
        $("#enterPlayersBtn").addClass("btnlocked").attr("data-toggle", "");
        $("#field8Btn").addClass("btnlocked").off('touchstart click');
        $("#field16Btn").addClass("btnlocked").off('touchstart click');
        $("#field36Btn").addClass("btnlocked").off('touchstart click');
        $("#startBtn").addClass("btnlocked").off('touchstart click');
        // stopBtn becomes active (unlocked) and needs to have on click definition
        $("#stopBtn").removeClass("btnlocked").on('touchstart click', function() {
            makeBtnActive();
            $("#startBtn").removeClass("btnlocked");
            $(document).off('touchstart click', '.cardshell'); // to make playfield not react to clicks / touches while stopped
        });
    }

    // function for removing dimmed button state and redefinition of on-click events for ...
    function makeBtnActive() {

        // ... registration modal button
        $("#enterPlayersBtn").removeClass("btnlocked").attr("data-toggle", "modal"); // make register button work again by adding back data-toggle=modal

        // ... for 8-card playfield button
        $("#field8Btn").removeClass("btnlocked").on('touchstart click', function() {
            make_field8BtnVisActive();
            fieldInit(9); // initalizing fieldsize 3x3 cards / 4 pairs with one free card in the middle
            resetCounters();
        });

        // ... for 16-card playfield button
        $("#field16Btn").removeClass("btnlocked").on('touchstart click', function() {
            make_field16BtnVisActive();
            fieldInit(16); // initalizing fieldsize 4x4 cards / 8 pairs
            resetCounters();
        });

        // ... for 36-card playfield button
        $("#field36Btn").removeClass("btnlocked").on('touchstart click', function() {
            make_field36BtnVisActive();
            fieldInit(36); // initalizing fieldsize 6x6 cards / 18 pairs
            resetCounters();
        });

        // start button
        $("#startBtn").on('touchstart click', function() {
            makeBtnInactive(); // calling function to make buttons visually and haptically inactive
            $(document).on('touchstart click', '.cardshell', function() {
                $(this).addClass("showMe taken");
                checkForMatch();
            });
            whoIsNext(lastPlayer);
        });

        // stop button
        $("#stopBtn").addClass("btnlocked").off('touchstart click'); // stop button functionality removed and dimmed state when game stopped.
    }

    // function for preparation and delivery of playfield array 
    function prepAndDeliverCardArray(num) {
        var playFieldSize2 = num;
        currentCardArray = masterCardArray.concat(); // copying master array to working array
        let playFieldCardArray = $(".back").toArray();

        if (playFieldSize2 == 9) {
            playFieldSize2 = 8;
            currentCardArray.splice(playFieldSize2, 28); // reduce working array to first 8 cards
        }

        else if (playFieldSize2 == 16) {
            currentCardArray.splice(playFieldSize2, 20); // reduce working array to first 16 cards
        }

        currentCardArray.sort(function(a, b) { return 0.5 - Math.random() }); // shuffle of card array

        for (let i = 0; i < playFieldCardArray.length; i++) { // assigning 
            $(playFieldCardArray[i]).addClass(currentCardArray[i]);
        }
    }

    // function for counter reset on game startup
    function resetCounters() {
        lastPlayer = "Player1";
        $('.playerStats1').css('background-color', 'red'); // set to red when active
        $('.playerStats2').css('background-color', 'grey'); // set other player to grey
        scorePlayer1 = 0; //set playerscores to zero
        scorePlayer2 = 0; //set playerscores to zero
        $(".scorePlayer1").text(scorePlayer1); // assign reset value to fields
        $(".scorePlayer2").text(scorePlayer2); // assign reset value to fields
    }

    // function for generating playfield
    function fieldInit(num) {
        var playFieldSize = num;
        $('#playfield').css('opacity', '0.0'); // playfield is first put to invisibility and after waittime of 1s, the playfield is generated in background
        setTimeout(function() {
            $("#playfield").empty(); // deleting all elements from playfield container
            for (var i = 0; i < playFieldSize; i++) {
                if (playFieldSize == 9 && i == 4) {
                    $("#playfield").append("<div class='dummycardshell'></div>");
                }
                else {
                    $("#playfield").append("<div class='cardshell'></div>");
                }
            }
            $(".cardshell").append("<div class='card front front-font'>?</div>");
            $(".cardshell").append("<div class='card back'></div>");
            if (playFieldSize == 9) {
                make_field8BtnVisActive();
                prepAndDeliverCardArray(playFieldSize);
            } // setting indicator for selected size
            if (playFieldSize == 16) {
                $(".cardshell").css("width", "23.7%").css("height", "23.7%");
                $(".dummycardshell").css("width", "23.7%").css("height", "23.7%");
                prepAndDeliverCardArray(playFieldSize);
            }
            if (playFieldSize == 36) {
                $(".cardshell").css("width", "15.4%").css("height", "15.4%");
                $(".dummycardshell").css("width", "15.4%").css("height", "15.4%");
                prepAndDeliverCardArray(playFieldSize);
            }
        }, 800);
        setTimeout(function() { // playfield is made visible again
            $('#playfield').css('opacity', '1.0');
        }, 800);
    }

    // code executed on startup:
    fieldInit(9); // generating playfield of 3x3 per default on startup
    make_field8BtnVisActive(); // make 8card button visually active
    $('#enterPlayersModal').modal('show'); // registration modal on startup

    // click actions for ...

    // ... for 8-card playfield button
    $("#field8Btn").on('touchstart click', function() {
        make_field8BtnVisActive();
        fieldInit(9); // initalizing fieldsize 3x3 cards / 4 pairs with one free card in the middle
        resetCounters();
    });

    // ... for 16-card playfield button
    $("#field16Btn").on('touchstart click', function() {
        make_field16BtnVisActive();
        fieldInit(16); // initalizing fieldsize 4x4 cards / 8 pairs
        resetCounters();
    });

    // ... for 36-card playfield button
    $("#field36Btn").on('touchstart click', function() {
        make_field36BtnVisActive();
        fieldInit(36); // initalizing fieldsize 6x6 cards / 18 pairs
        resetCounters();
    });

    // ... for start button
    $("#startBtn").on('touchstart click', function() {
        makeBtnInactive(); // calling function to make buttons visually and haptically inactive
        $(document).on('touchstart click', '.cardshell', function() { //enabling playfield by defining click rule to make them react.
            $(this).addClass("showMe taken");
            checkForMatch();
        });
        whoIsNext();
    });

    // ... for save button button on registration modal
    $('#saveBtn').on('touchstart click', function() {

        //should either field have string length of 0 then user will be informed with alert popup
        if ($('#nameFieldPlayer1').val().length == 0 || $('#nameFieldPlayer2').val().length == 0) {
            alert('Please fill in names in both fields.');
        }
        //should one of the fields have string length of >8 then user will be informed with alert popup
        else if ($('#nameFieldPlayer1').val().length > 8 || $('#nameFieldPlayer2').val().length > 8) {
            alert('Please fill in names with no more than 8 characters.');
        }
        // in any other case, save button functionality is assigned back and string values of textinput fields written to HTML elements
        else {
            $('#saveBtn').attr("data-dismiss", "modal"); // assigning back .attr('data-dismiss','modal') to make modal closure possible. 
            $('.namePlayer1').text($('#nameFieldPlayer1').val() + ': ');
            $('.namePlayer2').text($('#nameFieldPlayer2').val() + ': ');
        }
    });
});


/*

-----------

fade out procedure:

 $("#playfield").css("opacity", "0.0");
 
setTimeout(function () {
    // rest of commands executed after timer is up.
  }, 2000);
  
fade in procedure


setTimeout(function () {
    $("#playfield").css("opacity", "1.0");
  }, 2000);


----------

$("#playfield").fadeIn("slow", function(){
    
    // code here to be executed after fadeIn is done?
});


  $("#playfield").fadeOut("slow");
  $("#playfield").animate({opacity: '0.0'},"fast");
$("#playfield").fadeIn("slow");
      
*/
