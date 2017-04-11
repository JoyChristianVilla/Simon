$(document).ready(function() {
  //Declare variables
  var status = 'Off';
  var isStrict = false;
  var level = 0;
  var colors = ['green', 'blue', 'yellow', 'red'];
  var pattern, currentPattern, currentPresses, stringLevel;
  //Click function for on/off
  $('#toggle').click(function() {
    if (status === 'Off') {
      $('#off').removeClass('off');
      $('#toggle').removeClass('toggle-left');
      $('#on').addClass('on');
      $('#toggle').addClass('toggle-right');
      $('#count-display').css('color', 'rgb(252, 9, 5)');
      status = 'On';
    } else {
      $('#on').removeClass('on');
      $('#toggle').removeClass('toggle-right');
      $('#off').addClass('off');
      $('#toggle').addClass('toggle-left');
      $('#count-display').html('- -');
      $('#count-display').css('color', 'rgb(104, 3, 2)');
      status = 'Off';
    }
  });
  //Click function for strict/not strict
  $('#strict-button').click(function() {
    if (status === 'On') {
      if (isStrict === false) {
        $('#light').css('background-color', 'rgb(252, 9, 5)');
        isStrict = true;
      } else {
        $('#light').css('background-color', 'rgb(76, 1, 1)');
        isStrict = false;
      }
    }
  });
  //Define function to create the full array of 20 presses that the user must remember to win the game
  function createPattern() {
    pattern = [];
    for (i = 0; i < 20; i++) {
      random = Math.floor(Math.random() * 4);
      pattern.push(colors[random]);
    }
    console.log(pattern);
  }
  //Define function that displays the set of presses the user must match at each level
  function presentPresses() {
    currentPattern = [];
    currentPresses = [];
    for (var i = 0; i < level; i++) {
      currentPattern.push(pattern[i]);
      switch (pattern[i]) {
        case 'green':
          setTimeout(function() {
            $('#green').css('background-color', 'rgb(117, 219, 54)');
            document.getElementById('green-sound').play();
          }, i * 1000);
          setTimeout(function() {
            $('#green').css('background-color', 'green');
          }, (i + 0.5) * 1000);
          break;
        case 'blue':
          setTimeout(function() {
            $('#blue').css('background-color', 'rgb(52, 104, 237)');
            document.getElementById('blue-sound').play();
          }, i * 1000);
          setTimeout(function() {
            $('#blue').css('background-color', 'blue');
          }, (i + 0.5) * 1000);
          break;
        case 'yellow':
          setTimeout(function() {
            $('#yellow').css('background-color', 'rgb(252, 241, 100)');
            document.getElementById('yellow-sound').play();
          }, i * 1000);
          setTimeout(function() {
            $('#yellow').css('background-color', 'yellow');
          }, (i + 0.5) * 1000);
          break;
        case 'red':
          setTimeout(function() {
            $('#red').css('background-color', 'rgb(252, 100, 100)');
            document.getElementById('red-sound').play();
          }, i * 1000);
          setTimeout(function() {
            $('#red').css('background-color', 'red');
          }, (i + 0.5) * 1000);
      }
    }
    console.log(currentPattern);
  }
  //Define function that compares what the user has pressed with what they were supposed ot press and plays a different sound depending on whether the what they pressed was right or wrong
  function comparePatterns(sound) {
    for (i = 0; i < currentPresses.length; i++) {
      if (currentPresses[i] !== currentPattern[i]) {
        document.getElementById('wrong-sound').play();
        if (isStrict === true) {
          level = 1;
          createPattern();
          setTimeout(presentPresses, 1500);
        } else {
          setTimeout(presentPresses, 1500);
        }
      }
    }
    if (currentPresses[currentPresses.length - 1] === currentPattern[currentPresses.length - 1]) {
      document.getElementById(sound).play();
    }
  }
  //Define function that compares the currentPattern array (the one the user was supposed to match) with the currentPresses array (which is what the user has pressed on this turn)
  function compareArrays() {
    for (i = 0; i < currentPattern.length; i++) {
      if (currentPattern[i] !== currentPresses[i]) {
        return false;
      }
    }
    return true;
  }
  //If the two arrays are exactly the same and the level is 20, the win-sound will play and the game will be reset to level 1. If the two arrays are the same and the level is not 20, the level will go up, the new level will be displayed, and the next series of presses will be presented.
  function checkLevel() {
    if(compareArrays()) {
      if (level === 20) {
        document.getElementById('win-sound').play();
        level = 1;
        createPattern;
        $('#count-display').html('01');
        setTimeout(presentPresses, 2000);
      } else {
        level++;
        if (level < 10) {
          stringLevel = '0' + level.toString();
        } else {
          stringLevel = level.toString();
        }
        console.log(stringLevel);
        $('#count-display').html(stringLevel);
        setTimeout(presentPresses, 1500);
      }
    }
  }
  //Click function for start-button, which sets status to 'On', creates a new pattern, sets level to 1 and displays it, and presents first series of presses (which will only be 1)
  $('#start-button').click(function() {
    if (status === 'On') {
    createPattern();
    level = 1;
    $('#count-display').html('01');
    presentPresses();
    }
  });
  //Click functions for each of the colors, which make color change for one second when it is pressed, make sound play by calling comparePatterns function, push the color pressed into the currentPresses array, and check if the user goes on to a new level
  $('#green').click(function() {
    if (status === 'On') {
      $('#green').css('background-color', 'rgb(117, 219, 54)');
      currentPresses.push('green');
      comparePatterns('green-sound');
      setTimeout(function() {
        $('#green').css('background-color', 'green');
      }, 1000);
      checkLevel();
    }
  });
  $('#blue').click(function() {
    if (status === 'On') {
      $('#blue').css('background-color', 'rgb(52, 104, 237)');
      currentPresses.push('blue');
      comparePatterns('blue-sound');
      setTimeout(function() {
        $('#blue').css('background-color', 'blue');
      }, 1000);
      checkLevel();
    }
  });
  $('#yellow').click(function() {
    if (status === 'On') {
      $('#yellow').css('background-color', 'rgb(252, 241, 100)');
      currentPresses.push('yellow');
      comparePatterns('yellow-sound');
      setTimeout(function() {
        $('#yellow').css('background-color', 'yellow');
      }, 1000);
      checkLevel();
    }
  });
  $('#red').click(function() {
    if (status === 'On') {
      $('#red').css('background-color', 'rgb(252, 100, 100)');
      currentPresses.push('red');
      comparePatterns('red-sound');
      setTimeout(function() {
        $('#red').css('background-color', 'red');
      }, 1000);
      checkLevel();
    }
  });
});
