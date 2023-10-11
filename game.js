const buttonArray = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;


$(document).keypress(() => {
    if(!gameStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
})


$('.btn').on('click', (e) => {
    let userChosenColour = e.target.id
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})
// $(document).on("keydown", startGame);

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonArray[randomNumber]
    gamePattern.push(randomChosenColour)

    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}



function playSound(name){
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass('pressed')
    setTimeout(() => {
        $(`#${currentColor}`).removeClass('pressed')
    }, 100)
}

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        let audio = new Audio("sounds/wrong.mp3")
        audio.play()

        $('body').addClass("game-over")

        setTimeout(() => {
            $('body').removeClass("game-over")
        }, 200)
        $('h1').text('Game Over, Press Any Key to Restart')
        startOver()
    }

}

function startOver(){
    level = 0;
    gameStarted = false;
    gamePattern = [];
}