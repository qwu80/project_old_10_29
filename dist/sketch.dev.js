"use strict";

var start_scene = 1; // sketch.js

var slider; // let canvasWidth = 1800;
// let canvasHeight = 1700;

var canvasWidth = 790;
var canvasHeight = 530;
var maxRadius = 800;
var waveList = [];
var centerPoints = [];
var centerPoints_middle_left = [];
var centerPoints_middle_right = [];
var centerPoints_top = [];
var squareSize = 10;
var slider_height = 150;
var propagationSpeed = 5; // speed at which the circle propagates

var currentRadius = 0; // start with 0 radius

var hollowWidth = 20; // width of the hollow circle

var waves = [];
var waves_left = [];
var waves_right = [];
var waves_left_bool = 0;
var waves_right_bool = 0;
var particles = [];
var waveInterval = 10; // Every 30 frames, a new wave is created

var frameCounter = 0;
var lightOn = true;
var light;
var people_x = 368;
var mouse_x;
var isDragging = false; // A flag to check if dragging is occurring

var waveLength = 50; // let target = createVector(400,400)
// let canvas = document.getElementById('myCanvasID');  // Assuming you have a canvas with an ID

var showImage = true;
var lastTime = 0;
var slitDistance = 260;
var bg;
var interferenceList = [];
var current_scene = 0;
var key_view = 0;
var key_hear = 0;
var wave_mode = 0; // 0 is on, 1 is grey

var particle_mode = 1; // 0 is on, 1 is grey

var handle_on = 0;
var start_on = 0;
var fadeAmount = 0;
var fadingOut = false; // A flag to check if we are currently fading out

var monster_a;
var img_tile;
var interference;
var img_heart;
var img_key;
var img_coin;
var img_diamond;
var img_monster_1;
var img_monster_2;
var img_monster_3;
var img_monster_4;
var img_monster_5;
var img_monster_6;
var img_monster_7;
var img_monster_8;
var img_monster_9;
var img_end_all;
var img_end_arrow;
var img_end_game;
var myFont;
var key_num = 3;
var diamond_num = 0;
var heart_num = 3;
var monster_list = [];
var lastSpawnTime = 0; // To keep track of the time since last spawn

var points = [];
var numOfPoints = 1000; // This number can change

function preload() {
  bg = loadImage('/img/bg.png'); // Correct the path if necessary

  myFont = loadFont('PixelStick-Regular.ttf');
}

function setup() {
  ////////load image
  img_pp1 = loadImage('/img/pp1.png');
  img_start = loadImage('/img/start.png');
  img_start_arrow = loadImage('/img/arrow.png');
  img_start_save = loadImage('/img/save.png');
  img_tile = loadImage('/img/tile.png');
  img_heart = loadImage('/img/heart.png');
  img_key = loadImage('/img/key.png');
  img_coin = loadImage('/img/coin.png');
  img_diamond = loadImage('/img/diamond.png');
  img_end_all = loadImage('/img/over2.png');
  img_end_arrow = loadImage('/img/arrow_end.png');
  img_end_game = loadImage('/img/over3.png');
  img_monster_1 = loadImage('/img/m1.png');
  img_monster_2 = loadImage('/img/m2.png');
  img_monster_3 = loadImage('/img/m3.png');
  img_monster_4 = loadImage('/img/m4.png');
  img_monster_5 = loadImage('/img/m5.png');
  img_monster_6 = loadImage('/img/m6.png');
  img_monster_7 = loadImage('/img/m7.png');
  img_monster_8 = loadImage('/img/m8.png');
  img_monster_9 = loadImage('/img/m9.png'); // // //Populate the points array with instances of Point
  // for (let i = 0; i < numOfPoints; i++) {
  //   points.push(new Point());
  // }

  setInterval(function () {
    if (start_scene == 0) {
      if (monster_list.length === 0) {
        // Create a new monster if the list is empty
        var randomX = random(0, width - 50); // Assuming p5.js random() function for screen width

        var randomY = random(0, height); // Random Y position

        var randomImage = random([img_monster_1, img_monster_2, img_monster_3, img_monster_4, img_monster_5, img_monster_6, img_monster_7, img_monster_8, img_monster_9]); // Randomly select one of the monster images

        var newMonster = new Monster(randomX, randomY, randomImage, 0.5);
        monster_list.push(newMonster);
      }
    }
  }, 1000);
  setInterval(function () {
    if (start_scene == 2) {
      if (monster_list.length < 1) {
        // Create a new monster if the list is empty
        var randomX = random(0, width - 50); // Assuming p5.js random() function for screen width

        var randomY = random(0, height); // Random Y position

        var randomImage = random([img_monster_1, img_monster_2, img_monster_3, img_monster_4, img_monster_5, img_monster_6, img_monster_7, img_monster_8, img_monster_9]); // Randomly select one of the monster images

        var newMonster = new Monster(randomX, randomY, randomImage, 1);
        monster_list.push(newMonster);
      }
    }
  }, 1000); // canvasWidth = windowWidth * 0.6;   
  // canvasHeight = windowHeight * 0.8; 
  // background(bg)

  recordCenterPoints(); // console.log(centerPoints);

  var cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.id('myCanvasID'); // Assign an ID to the canvas

  cnv.parent("page"); // Optional: Adjust style if needed

  cnv.style('display', 'block');
  cnv.style('margin', 'auto');
  cnv.style("margin-top", "250px");
  cnv.style("margin-bottom", "100px"); // cnv.style("margin-right","420px")

  cnv.style("transform", "translateX(-10px) translateY(-10px)"); // Move the canvas to the right by 10px

  light = new Light(400, 500);
  monster_a = createVector(300, 200);

  for (var i = 0; i < centerPoints_top.length; i++) {
    interference = new Interference(centerPoints_top[i].x, centerPoints_top[i].y, light.x, light.y, monster_a.x, monster_a.y, slider_height);
    interference.calculatePath();
    interferenceList.push(interference);
  } // slider = createSlider(50, 250, 100);
  // slider.position(10, 10);
  // slider.style("width", "80px");
  // waves.push(new Wave(400, 680, 0, propagationSpeed, hollowWidth));

}

function draw() {
  background(0);

  if (start_scene == 1) {
    ///initial scene save planet?
    image(img_start, 50, -30, 700, 600); // image(img_start_arrow, 338, 373, 30, 30);
    // image(img_start_save, 278, 73, 250, 60);
    // Check if a second (1000 milliseconds) has passed

    if (millis() - lastTime > 800) {
      showImage = !showImage; // Toggle the image visibility

      lastTime = millis(); // Reset the timer
    }

    if (showImage) {
      image(img_start_save, 278, 73, 250, 60);
    }

    if (370 < mouseX && mouseX < 425 && mouseY < 398 && mouseY > 374) {
      image(img_start_arrow, 338, 373, 30, 30);
    }

    if (370 < mouseX && mouseX < 425 && mouseY < 427 && mouseY > 404) {
      image(img_start_arrow, 338, 405, 30, 30);
    }
  } else if (start_scene == 0) {
    ///start game
    if (heart_num == 0) {
      start_scene = 3;
    } // fill(100)
    // //target location
    // circle (300,200,10)
    // noFill()


    drawDoubleSlit(slitDistance); // let light= new Light(400,680)

    light.display();
    var light2 = new Light((canvasWidth - slitDistance) / 2, canvasHeight - slider_height + 10);
    light2.display();
    var light3 = new Light((canvasWidth + slitDistance) / 2, canvasHeight - slider_height + 10);
    light3.display(); // Draw the hollow circle around the light

    noFill();
    stroke(0, 0, 255); // Blue color
    // ellipse(light.x, light.y, 2 * currentRadius);
    // ellipse(light.x, light.y, 2 * (currentRadius - hollowWidth));

    noStroke(); ////center points rect for when in cirlce (one)
    // for (let i = 0; i < centerPoints.length; i++) {
    //   let d = dist(light.x, light.y, centerPoints[i].x, centerPoints[i].y);
    //   if (d > currentRadius - hollowWidth && d < currentRadius) {
    //     fill(100, 100, 100, 100);
    //     rect(centerPoints[i].x - squareSize / 2, centerPoints[i].y - squareSize / 2, squareSize, squareSize);
    //   }
    // }
    // // light.display();
    // currentRadius += propagationSpeed;

    if (lightOn == true && start_on == 1 && (wave_mode == 0 || particle_mode == 0)) {
      for (var _i = 0, _waves = waves; _i < _waves.length; _i++) {
        var _wave2 = _waves[_i];

        // wave.display();
        _wave2.update();
      } // for (let particle of particles) {
      //   particle.calculatePosition();
      //   particle.display();
      // }


      if (waves_left_bool == 1) {
        for (var _i2 = 0, _waves_left = waves_left; _i2 < _waves_left.length; _i2++) {
          var wave = _waves_left[_i2];
          // wave.display();
          wave.update();
        }
      }

      if (waves_right_bool == 1) {
        for (var _i3 = 0, _waves_right = waves_right; _i3 < _waves_right.length; _i3++) {
          var _wave = _waves_right[_i3];

          // wave.display();
          _wave.update();
        }
      }
    } else {
      waves = [];
      waves_left = [];
      waves_right = [];
      waves_left_bool = 0;
      waves_right_bool = 0;
    }

    if (particle_mode == 0) {
      var _loop = function _loop() {
        var wave = _waves2[_i4];
        // Filter centerPoints to find those inside the current wave
        var pointsInsideWave = centerPoints.filter(function (point) {
          return wave.isInside(point.x, point.y);
        }); // Ensure there are points inside the wave to choose from

        if (pointsInsideWave.length > 0) {
          // Select a random point from those inside the wave
          var randomPoint = pointsInsideWave[Math.floor(Math.random() * pointsInsideWave.length)];
          fill(wave.getColorForPoint(randomPoint.x, randomPoint.y));
          rect(randomPoint.x - squareSize / 2, randomPoint.y - squareSize / 2, squareSize, squareSize);
        }
      };

      for (var _i4 = 0, _waves2 = waves; _i4 < _waves2.length; _i4++) {
        _loop();
      }

      for (var i = 0; i < centerPoints_middle_left.length; i++) {
        for (var _i5 = 0, _waves3 = waves; _i5 < _waves3.length; _i5++) {
          var _wave3 = _waves3[_i5];

          if (_wave3.isInside(centerPoints_middle_left[i].x, centerPoints_middle_left[i].y)) {
            waves_left_bool = 1;
          }

          if (_wave3.isInside(centerPoints_middle_right[i].x, centerPoints_middle_right[i].y)) {
            waves_right_bool = 1;
          }
        }
      }

      var _loop2 = function _loop2() {
        var wave = _waves_left2[_i6];
        // Filter centerPoints to find those inside the current wave
        var pointsInsideWave = centerPoints_top.filter(function (point) {
          return wave.isInside(point.x, point.y);
        }); // Ensure there are points inside the wave to choose from

        if (pointsInsideWave.length > 0) {
          // Select a random point from those inside the wave
          var randomPoint = pointsInsideWave[Math.floor(Math.random() * pointsInsideWave.length)];
          fill(wave.getColorForPoint(randomPoint.x, randomPoint.y));
          rect(randomPoint.x - squareSize / 2, randomPoint.y - squareSize / 2, squareSize, squareSize);
        }
      };

      for (var _i6 = 0, _waves_left2 = waves_left; _i6 < _waves_left2.length; _i6++) {
        _loop2();
      }

      var _loop3 = function _loop3() {
        var wave = _waves_right2[_i7];
        // Filter centerPoints to find those inside the current wave
        var pointsInsideWave = centerPoints_top.filter(function (point) {
          return wave.isInside(point.x, point.y);
        }); // Ensure there are points inside the wave to choose from

        if (pointsInsideWave.length > 0) {
          // Select a random point from those inside the wave
          var randomPoint = pointsInsideWave[Math.floor(Math.random() * pointsInsideWave.length)];
          fill(wave.getColorForPoint(randomPoint.x, randomPoint.y));
          rect(randomPoint.x - squareSize / 2, randomPoint.y - squareSize / 2, squareSize, squareSize);
        }
      };

      for (var _i7 = 0, _waves_right2 = waves_right; _i7 < _waves_right2.length; _i7++) {
        _loop3();
      } // for (let i = 0; i < centerPoints_top.length; i++) {
      //   for (let wave of waves_right) {
      //     if (wave.isInside(centerPoints_top[i].x, centerPoints_top[i].y)) {
      //       fill(wave.getColorForPoint(centerPoints_top[i].x, centerPoints_top[i].y));
      //       rect(centerPoints_top[i].x - squareSize / 2, centerPoints_top[i].y - squareSize / 2, squareSize, squareSize);
      //       break; // If a point is inside one wave, we don't need to check other waves
      //     }
      //   }
      // }

    }

    if (wave_mode == 0) {
      for (var _i8 = 0; _i8 < centerPoints.length; _i8++) {
        for (var _i9 = 0, _waves4 = waves; _i9 < _waves4.length; _i9++) {
          var _wave4 = _waves4[_i9];

          if (_wave4.isInside(centerPoints[_i8].x, centerPoints[_i8].y)) {
            // fill(100, 100, 100, 50);
            fill(_wave4.getColorForPoint(centerPoints_top[_i8].x, centerPoints_top[_i8].y));
            rect(centerPoints[_i8].x - squareSize / 2, centerPoints[_i8].y - squareSize / 2, squareSize, squareSize);
            break; // If a point is inside one wave, we don't need to check other waves
          }
        }
      }

      for (var _i10 = 0; _i10 < centerPoints_middle_left.length; _i10++) {
        for (var _i11 = 0, _waves5 = waves; _i11 < _waves5.length; _i11++) {
          var _wave5 = _waves5[_i11];

          if (_wave5.isInside(centerPoints_middle_left[_i10].x, centerPoints_middle_left[_i10].y)) {
            waves_left_bool = 1;
          }

          if (_wave5.isInside(centerPoints_middle_right[_i10].x, centerPoints_middle_right[_i10].y)) {
            waves_right_bool = 1;
          }
        }
      }

      for (var _i12 = 0; _i12 < centerPoints_top.length; _i12++) {
        for (var _i13 = 0, _waves_left3 = waves_left; _i13 < _waves_left3.length; _i13++) {
          var _wave6 = _waves_left3[_i13];

          if (_wave6.isInside(centerPoints_top[_i12].x, centerPoints_top[_i12].y)) {
            fill(_wave6.getColorForPoint(centerPoints_top[_i12].x, centerPoints_top[_i12].y));
            rect(centerPoints_top[_i12].x - squareSize / 2, centerPoints_top[_i12].y - squareSize / 2, squareSize, squareSize);
            break; // If a point is inside one wave, we don't need to check other waves
          }
        }
      }

      for (var _i14 = 0; _i14 < centerPoints_top.length; _i14++) {
        for (var _i15 = 0, _waves_right3 = waves_right; _i15 < _waves_right3.length; _i15++) {
          var _wave7 = _waves_right3[_i15];

          if (_wave7.isInside(centerPoints_top[_i14].x, centerPoints_top[_i14].y)) {
            fill(_wave7.getColorForPoint(centerPoints_top[_i14].x, centerPoints_top[_i14].y));
            rect(centerPoints_top[_i14].x - squareSize / 2, centerPoints_top[_i14].y - squareSize / 2, squareSize, squareSize);
            break; // If a point is inside one wave, we don't need to check other waves
          }
        }
      }
    } // for (let i = 0; i < centerPoints.length; i++) {
    //   for (let wave of waves) {
    //     if (wave.isInside(centerPoints[i].x, centerPoints[i].y)) {
    //       fill(wave.getColorForPoint(centerPoints[i].x, centerPoints[i].y));
    //       rect(centerPoints[i].x - squareSize / 2, centerPoints[i].y - squareSize / 2, squareSize, squareSize);
    //       break; // If a point is inside one wave, we don't need to check other waves
    //     }
    //   }
    // }


    frameCounter++;

    if (frameCounter % waveInterval == 0) {
      waves.push(new Wave(light.x, light.y, 0, propagationSpeed, hollowWidth));
      particles.push(new Particle(waves[waves.length - 1]));
    }

    if (frameCounter % waveInterval == 0) {
      waves_left.push(new Wave((canvasWidth - slitDistance) / 2, canvasHeight - slider_height + 10, 0, propagationSpeed, hollowWidth));
    }

    if (frameCounter % waveInterval == 0) {
      waves_right.push(new Wave((canvasWidth + slitDistance) / 2, canvasHeight - slider_height + 10, 0, propagationSpeed, hollowWidth));
    }

    for (var _i16 = 0; _i16 < waves.length; _i16++) {
      if (waves[_i16].radius > 1000) {
        waves.splice(_i16, 1);
        break;
      }
    }

    for (var _i17 = 0; _i17 < waves_left.length; _i17++) {
      if (waves_left[_i17].radius > 1000) {
        waves_left.splice(_i17, 1);
        break;
      }
    }

    for (var _i18 = 0; _i18 < waves_right.length; _i18++) {
      if (waves_right[_i18].radius > 1000) {
        waves_right.splice(_i18, 1);
        break;
      }
    }

    mouse_x = mouseX;

    if (isDragging) {
      var ratio = (mouseX + (window.innerWidth / 2 - 400)) / window.innerWidth; // img_.style.left = ratio + "vw";  
      // console.log((mouseX+(window.innerWidth/2-400))/window.innerWidth)
    } ///////////interfnece pattern 
    // centerPoints_top
    // interferenceList =[]


    for (var _i19 = 0; _i19 < centerPoints_top.length; _i19++) {
      interference = new Interference(centerPoints_top[_i19].x, centerPoints_top[_i19].y, light.x, light.y, monster_a.x, monster_a.y, slider_height);
      interference.calculatePath();
      interferenceList[_i19] = interference;
    }

    if (key_view == 1) {
      var radius = 100;

      for (var _i20 = 0; _i20 < interferenceList.length; _i20++) {
        // Calculate the distance from the mouse to the current element
        var dx = mouseX - interferenceList[_i20].x; // Assuming each element has x and y properties

        var dy = mouseY - interferenceList[_i20].y;
        var distance = Math.sqrt(dx * dx + dy * dy); // If the element is within the specified radius, display it

        if (distance < radius) {
          interferenceList[_i20].display();
        }
      } // Draw the circle around the mouse position
      // noFill();
      // stroke(255); // White circle
      // ellipse(mouseX, mouseY, radius * 2, radius * 2);

    } /////////////////////
    /////


    image(img_pp1, people_x, 480, 50, 50); //368 middle //mouseX-20

    var handleDiv = document.querySelector('.new_handle img'); // Directly targeting the image inside new_handle

    if (isDragging) {
      // console.log(mouseX)
      if (mouseX >= 600 && mouseX < 630) {
        people_x += 0.5;
        handleDiv.style.transform = 'rotate(15deg)';
      } else if (600 > mouseX && mouseX > 570) {
        people_x -= 0.5;
        handleDiv.style.transform = 'rotate(-15deg)';
      } else if (mouseX >= 630 && people_x <= 740) {
        people_x += 2;
        handleDiv.style.transform = 'rotate(25deg)';
      } else if (mouseX <= 570 && people_x >= 0) {
        people_x -= 2;
        handleDiv.style.transform = 'rotate(-25deg)';
      }

      light.x = people_x + 20;
      window.addEventListener('mouseup', function (event) {
        // Your code here
        console.log('Mouse button released!');
        isDragging = false;
        handleDiv.style.transform = 'rotate(0deg)';
      }); // console.log(e.clientX)
    } //////////////////
    // Display all monsters


    for (var _i21 = monster_list.length - 1; _i21 >= 0; _i21--) {
      var monster = monster_list[_i21];
      monster.display();

      if (monster.y >= height) {
        heart_num -= 1; // Decrease heart number

        monster_list.splice(_i21, 1); // Remove this monster from the list

        key_view = 0;
      }

      if (monster.life < 0) {
        monster_list.splice(_i21, 1); // Remove this monster from the list

        key_view = 0;
        diamond_num += 1;
      }
    } // Check for spawning new monster every 5 seconds
    // if (millis() - lastSpawnTime > 1000) { // 5000 milliseconds = 5 seconds
    // if (monster_list.length === 0) { // Check if there are no monsters
    //   let newMonster = new Monster(random(width), random(height), img_monster_1);
    //   monster_list.push(newMonster);
    //   // spawnMonster();
    //   // lastSpawnTime = millis(); // Reset the spawn timer
    // }
    // }
    ///////////////////


    image(img_heart, 700, -1, 50, 60);
    image(img_key, 10, 0, 45, 55); // image(img_coin, 450, 0, 50, 60);

    image(img_diamond, 350, -5, 45, 60); // Set text properties

    textFont(myFont);
    textSize(24); // Adjust the size as needed

    fill(255); // Set text color (white in this example)
    // Add text next to each image

    text("x " + key_num, 10 + 40, 35); // For key

    text("x " + diamond_num, 350 + 40, 35); // For diamond

    text("x " + heart_num, 700 + 40, 35); // For heart
    // text("x3", 450 + 50, 30); // For coin
  } else if (start_scene == 2) {
    /////not start game
    // // Populate the points array
    // for (let i = 0; i < numOfPoints; i++) {
    //   let point = {
    //     x: random(width),
    //     y: random(height),
    //     color: color (152, 109, 178, random(255))
    //   };
    //   points.push(point);
    // }
    //  // Draw each point
    //  for (let point of points) {
    //   fill(point.color);
    //   noStroke();
    //   rect(point.x, point.y, 10, 10);
    // }
    if (points.length < numOfPoints) {
      points.push(new Point());
    } // Update and display each point


    for (var _i22 = 0, _points = points; _i22 < _points.length; _i22++) {
      var point = _points[_i22];
      point.update();
      point.display();
    }

    for (var _i23 = 0; _i23 < points.length; _i23++) {
      if (points[_i23].opacity <= 0) {
        points.splice(_i23, 1);
        points.push(new Point());
        break;
      }
    } // Display all monsters


    for (var _i24 = monster_list.length - 1; _i24 >= 0; _i24--) {
      var _monster = monster_list[_i24];

      _monster.display();

      if (_monster.y >= height) {
        heart_num -= 1; // Decrease heart number

        monster_list.splice(_i24, 1); // Remove this monster from the list
      } // if (monster.life<0) {
      //   monster_list.splice(i, 1); // Remove this monster from the list
      // }

    }
  } else if (start_scene == 3) {
    //game over
    image(img_end_all, 250, 220, 300, 200); // image(img_start_arrow, 338, 373, 30, 30);
    // image(img_start_save, 278, 73, 250, 60);
    // console.log(mouseY)
    // Check if a second (1000 milliseconds) has passed

    if (millis() - lastTime > 800) {
      showImage = !showImage; // Toggle the image visibility

      lastTime = millis(); // Reset the timer
    }

    if (showImage) {
      image(img_end_game, 250, 110, 300, 260);
    }

    if (325 < mouseX && mouseX < 388 && mouseY < 396 && mouseY > 372) {
      image(img_end_arrow, 300, 365, 40, 40);
    }

    if (422 < mouseX && mouseX < 462 && mouseY < 392 && mouseY > 372) {
      image(img_end_arrow, 393, 365, 40, 40);
    }
  } // console.log(fadeAmount)
  // Draw the fading overlay if fadingOut is true


  if (fadingOut) {
    fill(0, fadeAmount);
    rect(0, 0, 900, 900);
    fadeAmount += 5; // Adjust this value to make the fade faster or slower

    if (fadeAmount >= 255) {
      fadingOut = false; // Stop the fade-out once it's fully opaque

      fadeAmount = 0;
      start_scene = current_scene;
    }
  }
} ////////
// function drawDoubleSlit(distance) {
//   fill(255);
//   rect(0, canvasHeight - slider_height, (canvasWidth - slitDistance) / 2-10+5, 20);
//   rect((canvasWidth + slitDistance) / 2+10-5, canvasHeight - slider_height, (canvasWidth - slitDistance) / 2, 20);
//   rect((canvasWidth - slitDistance) / 2+10-5, canvasHeight - slider_height, slitDistance-20+10 , 20);
// }


function spawnMonster() {
  var x = random(width);
  var y = random(height);
  var imgs = [img_monster_1, img_monster_2, img_monster_3, img_monster_4, img_monster_5, img_monster_6, img_monster_7, img_monster_8, img_monster_9];
  var img = random(imgs); // Select a random image

  var newMonster = new Monster(x, y, img);
  monster_list.push(newMonster);
}

function drawDoubleSlit(distance) {
  // Variables for the size of the tiling image
  var tileWidth = 20;
  var tileHeight = img_tile.height; // Tiling for left barrier

  for (var x = 0; x < (canvasWidth - slitDistance) / 2 - 5; x += tileWidth) {
    image(img_tile, x, canvasHeight - slider_height, tileWidth, 20);
  } // Tiling for right barrier


  for (var _x = (canvasWidth + slitDistance) / 2 + 5; _x < canvasWidth; _x += tileWidth) {
    image(img_tile, _x, canvasHeight - slider_height, tileWidth, 20);
  } // Tiling for middle barrier


  var middleStart = (canvasWidth - slitDistance) / 2 + 5;
  var middleEnd = (canvasWidth + slitDistance) / 2 - 5;

  for (var _x2 = middleStart; _x2 < middleEnd; _x2 += tileWidth) {
    // Check if this is the last tile and adjust width if necessary
    var actualTileWidth = 20;

    if (_x2 + tileWidth > middleEnd) {
      actualTileWidth = middleEnd - _x2; // Adjust the width of the last tile
    }

    image(img_tile, _x2, canvasHeight - slider_height, actualTileWidth, 20);
  }
}

function recordCenterPoints() {
  var halfSquare = squareSize / 2;

  for (var x = 0; x < canvasWidth; x += squareSize) {
    for (var y = 0; y < canvasHeight; y += squareSize) {
      var centerX = x + halfSquare;
      var centerY = y + halfSquare;

      if (y > canvasHeight - slider_height + 15) {
        centerPoints.push({
          x: centerX,
          y: centerY
        });
      } else if (y < canvasHeight - slider_height - 3) {
        centerPoints_top.push({
          x: centerX,
          y: centerY
        });
      } else if ((x > (canvasWidth - slitDistance) / 2 - 10 && x < (canvasWidth - slitDistance) / 2 + 10 - 5 || x > (canvasWidth + slitDistance) / 2 - 10 && x < (canvasWidth + slitDistance) / 2 + 10 - 5) && y < canvasHeight - slider_height + 15 && y > canvasHeight - slider_height - 3) {
        // The point (x, y) is within one of the gaps (slits).
        centerPoints.push({
          x: centerX,
          y: centerY
        });

        if (x > (canvasWidth + slitDistance) / 2 - 10 && x < (canvasWidth + slitDistance) / 2 + 10 - 5) {
          centerPoints_middle_right.push({
            x: centerX,
            y: centerY
          });
        }

        if (x > (canvasWidth - slitDistance) / 2 - 10 && x < (canvasWidth - slitDistance) / 2 + 10 - 5) {
          centerPoints_middle_left.push({
            x: centerX,
            y: centerY
          });
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  var keyButton = document.querySelector('.key');

  if (keyButton) {
    keyButton.addEventListener('click', function () {
      // Your code to run when the button is clicked
      if (key_view == 0 && key_num > 0) {
        key_view = 1;
        key_num -= 1;
      }

      console.log('Button clicked!');
    });
  }
});
document.addEventListener('DOMContentLoaded', function (event) {
  var handle = document.querySelector('.handle'); // Add an event listener for the 'mousedown' event

  if (handle) {
    handle.addEventListener('mousedown', function (e) {
      isDragging = true; // people_x = e.clientX
      // console.log(e.clientX)
    });
    handle.addEventListener('mouseup', function (e) {
      isDragging = false; // people_x = e.clientX
      // console.log(e.clientX)
    }); // handle.addEventListener('mousemove', function(e) {
    // });
  }
}); // This function creates or moves the light based on the given x position

function createOrMoveLight(x) {
  if (lightOn == false) {
    lightOn = true;
    console.log('Light is On');
  } else {
    lightOn = false;
    console.log('Light is OFF');
  } // light = new Light(x, 680);  // Set the light's X position to the provided x value

} // Get the element by its class name


document.addEventListener('DOMContentLoaded', function (event) {
  var startButton = document.querySelector('.start'); // Add an event listener for the 'mousedown' event

  if (startButton) {
    //   startButton.addEventListener('mousedown', function() {
    //     start_on = 1;
    //     console.log('start_on:', start_on);
    //     createOrMoveLight();
    // });
    // // Add an event listener for the 'mouseup' event
    // startButton.addEventListener('mouseup', function() {
    //     start_on = 0;
    //     console.log('start_on:', start_on);
    // });
    startButton.addEventListener('click', function () {
      // Your code to run when the button is clicked
      if (start_on == 0) {
        start_on = 1;
      } else {
        start_on = 0;
      }

      console.log('Button clicked!');
    });
  }
});
document.addEventListener('DOMContentLoaded', function (event) {
  var waveButton = document.querySelector('.wave');
  var particleButton = document.querySelector('.particle'); // Add an event listener for the 'mousedown' event

  if (waveButton) {
    waveButton.addEventListener('click', function () {
      // Your code to run when the button is clicked
      if (wave_mode == 0) {
        wave_mode = 1;
        waveButton.style.backgroundColor = "rgba(0,0,0,0.4)";
        particleButton.style.backgroundColor = "rgba(0,0,0,0)";
        particle_mode = 0;
      } else {
        wave_mode = 0;
        waveButton.style.backgroundColor = "rgba(0,0,0,0)";
        particleButton.style.backgroundColor = "rgba(0,0,0,0.4)";
        particle_mode = 1;
      }

      console.log('Button clicked!');
    });
  }

  if (particleButton) {
    particleButton.addEventListener('click', function () {
      // Your code to run when the button is clicked
      if (particle_mode == 0) {
        particle_mode = 1;
        particleButton.style.backgroundColor = "rgba(0,0,0,0.4)";
        waveButton.style.backgroundColor = "rgba(0,0,0,0)";
        wave_mode = 0;
      } else {
        particle_mode = 0;
        particleButton.style.backgroundColor = "rgba(0,0,0,0)";
        waveButton.style.backgroundColor = "rgba(0,0,0,0.4)";
        wave_mode = 1;
      }

      console.log('Button clicked!');
    });
  }
});

function mousePressed() {
  if (start_scene == 0) {// key_view = 0
  }

  if (start_scene == 1) {
    if (370 < mouseX && mouseX < 425 && mouseY < 398 && mouseY > 374) {
      // Code to execute when the first area is clicked
      console.log('First area clicked!'); // start_scene = 0 //game

      current_scene = 0; //game

      fadingOut = true; // Start the fade-out
    }

    if (370 < mouseX && mouseX < 425 && mouseY < 427 && mouseY > 404) {
      // Code to execute when the second area is clicked
      console.log('Second area clicked!');
      current_scene = 2; ////no game 

      fadingOut = true; // Start the fade-out
    }
  }

  if (start_scene == 3) {
    if (325 < mouseX && mouseX < 388 && mouseY < 396 && mouseY > 372) {
      key_num = 3;
      diamond_num = 0;
      heart_num = 3;
      current_scene = 0; //game

      fadingOut = true; // Start the fade-out
    }

    if (422 < mouseX && mouseX < 462 && mouseY < 392 && mouseY > 372) {
      current_scene = 2; //game

      fadingOut = true; // Start the fade-out
    }
  }
}

document.addEventListener('keydown', function (event) {
  if (event.key === "ArrowLeft") {
    // Left arrow key pressed
    console.log("Left key pressed!");

    if (people_x >= 0) {
      people_x -= 10;
    } // Add your logic here

  } else if (event.key === "ArrowRight") {
    // Right arrow key pressed
    console.log("Right key pressed!");

    if (people_x <= 740) {
      people_x += 10;
    } // Add your logic here

  }

  if (event.key === " ") {
    // Checking for the space key
    console.log("Space key pressed!"); // Add your logic for the space key here

    if (start_on == 0) {
      start_on = 1;
    } else {
      start_on = 0;
    }
  }

  if (event.key === "k" || event.key === "K") {
    // Check for 'K' or 'k'
    console.log("k key pressed!"); // Add your logic for the space key here

    if (key_view == 0 && key_num > 0) {
      key_view = 1;
      key_num -= 1;
    }
  }

  if (event.key === "m" || event.key === "M") {
    // Check for 'K' or 'k'
    console.log("m key pressed!"); // Add your logic for the space key here

    var waveButton = document.querySelector('.wave');
    var particleButton = document.querySelector('.particle');

    if (wave_mode == 0) {
      wave_mode = 1;
      waveButton.style.backgroundColor = "rgba(0,0,0,0.4)";
      particleButton.style.backgroundColor = "rgba(0,0,0,0)";
      particle_mode = 0;
    } else {
      wave_mode = 0;
      waveButton.style.backgroundColor = "rgba(0,0,0,0)";
      particleButton.style.backgroundColor = "rgba(0,0,0,0.4)";
      particle_mode = 1;
    }
  }

  light.x = people_x + 20;
});