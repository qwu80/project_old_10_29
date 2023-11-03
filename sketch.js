
let start_scene = 1;
// sketch.js
let slider;
// let canvasWidth = 1800;
// let canvasHeight = 1700;

let canvasWidth = 790;
let canvasHeight = 530;
let maxRadius = 800;
let waveList = [];
let centerPoints = [];
let centerPoints_middle_left = [];
let centerPoints_middle_right = [];
let centerPoints_top = [];
let squareSize = 10;
let slider_height = 150;

let propagationSpeed = 5; // speed at which the circle propagates
let currentRadius = 0; // start with 0 radius
let hollowWidth = 20; // width of the hollow circle


let waves = [];
let waves_left =[]
let waves_right =[]
let waves_left_bool = 0;
let waves_right_bool = 0;

let particles = []


let waveInterval = 10; // Every 30 frames, a new wave is created
let frameCounter = 0;
let lightOn = true;

let light;

let people_x = 368;

let mouse_x;
let isDragging = false;  // A flag to check if dragging is occurring

let waveLength =50;
// let target = createVector(400,400)
// let canvas = document.getElementById('myCanvasID');  // Assuming you have a canvas with an ID


let showImage = true;
let lastTime = 0;

let slitDistance =  260;
  
var bg;
let interferenceList = [];


let current_scene = 0;

let key_view = 0;
let key_hear = 0;
let wave_mode = 0; // 0 is on, 1 is grey
let particle_mode =1;  // 0 is on, 1 is grey
let handle_on = 0;
let start_on = 0;

let fadeAmount = 0;
let fadingOut = false; // A flag to check if we are currently fading out

let monster_a ;
let img_tile;

let interference;

let img_heart
let img_key
let img_coin
let img_diamond

let img_monster_1;
let img_monster_2;
let img_monster_3;
let img_monster_4;
let img_monster_5;
let img_monster_6;
let img_monster_7;
let img_monster_8;
let img_monster_9;

let img_end_all 
let img_end_arrow 
let img_end_game 

let myFont;

let key_num =3
let diamond_num =0
let heart_num =3

let monster_list = [];
let lastSpawnTime = 0; // To keep track of the time since last spawn


let points = [];
const numOfPoints = 1000; // This number can change

function preload(){
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
  img_monster_9 = loadImage('/img/m9.png');


// // //Populate the points array with instances of Point
// for (let i = 0; i < numOfPoints; i++) {
//   points.push(new Point());
// }


  setInterval(() => {

    if (start_scene==0) {
      if (monster_list.length === 0) {
        // Create a new monster if the list is empty
        let randomX = random(0, width-50); // Assuming p5.js random() function for screen width
        let randomY = random(0, height); // Random Y position
        let randomImage = random([
          img_monster_1, img_monster_2, img_monster_3, 
          img_monster_4, img_monster_5, img_monster_6, 
          img_monster_7, img_monster_8, img_monster_9
        ]); // Randomly select one of the monster images
        let newMonster = new Monster(randomX, randomY, randomImage,0.5);
        monster_list.push(newMonster);
      }
      
    }  

   
  }, 1000); 


  setInterval(() => {

   if (start_scene==2) {

      if (monster_list.length < 1) {
        // Create a new monster if the list is empty
        let randomX = random(0, width-50); // Assuming p5.js random() function for screen width
        let randomY = random(0, height); // Random Y position
        let randomImage = random([
          img_monster_1, img_monster_2, img_monster_3, 
          img_monster_4, img_monster_5, img_monster_6, 
          img_monster_7, img_monster_8, img_monster_9
        ]); // Randomly select one of the monster images
        let newMonster = new Monster(randomX, randomY, randomImage,1);
        monster_list.push(newMonster);
      }
      
    }

   
  }, 1000); 


  // canvasWidth = windowWidth * 0.6;   
  // canvasHeight = windowHeight * 0.8; 
  // background(bg)
  recordCenterPoints();
  // console.log(centerPoints);
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.id('myCanvasID');  // Assign an ID to the canvas

  cnv.parent("page");

    // Optional: Adjust style if needed
    cnv.style('display', 'block');
    cnv.style('margin', 'auto');
    cnv.style("margin-top","250px")
    cnv.style("margin-bottom","100px")
    // cnv.style("margin-right","420px")
    cnv.style("transform", "translateX(-10px) translateY(-10px)");  // Move the canvas to the right by 10px


  light = new Light(400,500); 
  
  monster_a = createVector(300,200)

  for(let i = 0; i < centerPoints_top.length; i++) {
  interference = new Interference(
        centerPoints_top[i].x, 
        centerPoints_top[i].y, 
        light.x, 
        light.y, 
        monster_a.x, 
        monster_a.y, 
        slider_height
    );
    interference.calculatePath()
    interferenceList.push(interference);

}
  // slider = createSlider(50, 250, 100);
  // slider.position(10, 10);
  // slider.style("width", "80px");

  // waves.push(new Wave(400, 680, 0, propagationSpeed, hollowWidth));

}

function draw() {


  


  background(0);

  

 

  if (start_scene ==1) {

    ///initial scene save planet?


  


    image(img_start, 50, -30, 700, 600);
    // image(img_start_arrow, 338, 373, 30, 30);
    // image(img_start_save, 278, 73, 250, 60);

     // Check if a second (1000 milliseconds) has passed
  if (millis() - lastTime > 800) {
    showImage = !showImage; // Toggle the image visibility
    lastTime = millis(); // Reset the timer
  }

  if (showImage) {
    image(img_start_save, 278, 73, 250, 60);
  }

  if (370<mouseX && mouseX<425 && mouseY<398 && mouseY>374) {
    image(img_start_arrow, 338, 373, 30, 30);
  }

  if (370<mouseX && mouseX<425 && mouseY<427 && mouseY>404) {
    image(img_start_arrow, 338, 405, 30, 30);
  }



  } else if (start_scene ==0){


    ///start game


   
  
  
    if (heart_num ==0) {
      start_scene=3
    }
  
  // fill(100)
  // //target location
  // circle (300,200,10)
  // noFill()

  drawDoubleSlit(slitDistance);



  // let light= new Light(400,680)
  light.display()

  let light2= new Light((canvasWidth - slitDistance) / 2,canvasHeight - slider_height+10)
  light2.display()

  let light3= new Light((canvasWidth + slitDistance) / 2,canvasHeight - slider_height+10)
  light3.display()

  // Draw the hollow circle around the light
  noFill();
  stroke(0, 0, 255); // Blue color
  // ellipse(light.x, light.y, 2 * currentRadius);
  // ellipse(light.x, light.y, 2 * (currentRadius - hollowWidth));
  noStroke()

  ////center points rect for when in cirlce (one)

  // for (let i = 0; i < centerPoints.length; i++) {
  //   let d = dist(light.x, light.y, centerPoints[i].x, centerPoints[i].y);
  //   if (d > currentRadius - hollowWidth && d < currentRadius) {
  //     fill(100, 100, 100, 100);
  //     rect(centerPoints[i].x - squareSize / 2, centerPoints[i].y - squareSize / 2, squareSize, squareSize);
     
  //   }
  // }

  // // light.display();
  // currentRadius += propagationSpeed;


  
  if (lightOn == true && start_on ==1 && (wave_mode ==0 ||particle_mode==0)) {
    for (let wave of waves) {
      // wave.display();
      wave.update();
    }

    // for (let particle of particles) {
    //   particle.calculatePosition();
    //   particle.display();
    // }

    if (waves_left_bool ==1 ){

      for (let wave of waves_left) {
        // wave.display();
        wave.update();
      }
    
    }

    if (waves_right_bool==1) {
      for (let wave of waves_right) {
        // wave.display();
        wave.update();
      }
    } 
  
   

  } else {
    waves = []
    waves_left = []
    waves_right = []
    waves_left_bool=0
    waves_right_bool=0
  }

  



 

 if (particle_mode==0) {
  for (let wave of waves) {
    // Filter centerPoints to find those inside the current wave
    let pointsInsideWave = centerPoints.filter(point => wave.isInside(point.x, point.y));
  
    // Ensure there are points inside the wave to choose from
    if (pointsInsideWave.length > 0) {
      // Select a random point from those inside the wave
      let randomPoint = pointsInsideWave[Math.floor(Math.random() * pointsInsideWave.length)];
  
      fill(wave.getColorForPoint(randomPoint.x, randomPoint.y));
      rect(randomPoint.x - squareSize / 2, randomPoint.y - squareSize / 2, squareSize, squareSize);
    }
  }

  for (let i = 0; i < centerPoints_middle_left.length; i++) {
    for (let wave of waves) {
      if (wave.isInside(centerPoints_middle_left[i].x , centerPoints_middle_left[i].y)){

        waves_left_bool =1;
    } 
    
    if (wave.isInside(centerPoints_middle_right[i].x , centerPoints_middle_right[i].y)){
    
      waves_right_bool =1;
    } 
    

    }
  }


  for (let wave of waves_left) {
    // Filter centerPoints to find those inside the current wave
    let pointsInsideWave = centerPoints_top.filter(point => wave.isInside(point.x, point.y));
  
    // Ensure there are points inside the wave to choose from
    if (pointsInsideWave.length > 0) {
      // Select a random point from those inside the wave
      let randomPoint = pointsInsideWave[Math.floor(Math.random() * pointsInsideWave.length)];
  
      fill(wave.getColorForPoint(randomPoint.x, randomPoint.y));
      rect(randomPoint.x - squareSize / 2, randomPoint.y - squareSize / 2, squareSize, squareSize);
    }
  }
  
  for (let wave of waves_right) {
    // Filter centerPoints to find those inside the current wave
    let pointsInsideWave = centerPoints_top.filter(point => wave.isInside(point.x, point.y));
  
    // Ensure there are points inside the wave to choose from
    if (pointsInsideWave.length > 0) {
      // Select a random point from those inside the wave
      let randomPoint = pointsInsideWave[Math.floor(Math.random() * pointsInsideWave.length)];
  
      fill(wave.getColorForPoint(randomPoint.x, randomPoint.y));
      rect(randomPoint.x - squareSize / 2, randomPoint.y - squareSize / 2, squareSize, squareSize);
    }
  }



  // for (let i = 0; i < centerPoints_top.length; i++) {
  //   for (let wave of waves_right) {
  //     if (wave.isInside(centerPoints_top[i].x, centerPoints_top[i].y)) {
  //       fill(wave.getColorForPoint(centerPoints_top[i].x, centerPoints_top[i].y));
  //       rect(centerPoints_top[i].x - squareSize / 2, centerPoints_top[i].y - squareSize / 2, squareSize, squareSize);
  //       break; // If a point is inside one wave, we don't need to check other waves
  //     }
  //   }
  // }

 }






  if (wave_mode==0) {

  for (let i = 0; i < centerPoints.length; i++) {
    for (let wave of waves) {
      if (wave.isInside(centerPoints[i].x, centerPoints[i].y)) {
        
        // fill(100, 100, 100, 50);
        fill(wave.getColorForPoint(centerPoints_top[i].x, centerPoints_top[i].y));

        rect(centerPoints[i].x - squareSize / 2, centerPoints[i].y - squareSize / 2, squareSize, squareSize);
        break; // If a point is inside one wave, we don't need to check other waves
      }
    }
  }

    for (let i = 0; i < centerPoints_middle_left.length; i++) {
      for (let wave of waves) {
        if (wave.isInside(centerPoints_middle_left[i].x , centerPoints_middle_left[i].y)){
  
          waves_left_bool =1;
      } 
      
      if (wave.isInside(centerPoints_middle_right[i].x , centerPoints_middle_right[i].y)){
      
        waves_right_bool =1;
      } 
      
  
      }
    }
  
   
  
    for (let i = 0; i < centerPoints_top.length; i++) {
      for (let wave of waves_left) {
        if (wave.isInside(centerPoints_top[i].x, centerPoints_top[i].y)) {
          fill(wave.getColorForPoint(centerPoints_top[i].x, centerPoints_top[i].y));
          rect(centerPoints_top[i].x - squareSize / 2, centerPoints_top[i].y - squareSize / 2, squareSize, squareSize);
          break; // If a point is inside one wave, we don't need to check other waves
        }
      }
    }
  
    for (let i = 0; i < centerPoints_top.length; i++) {
      for (let wave of waves_right) {
        if (wave.isInside(centerPoints_top[i].x, centerPoints_top[i].y)) {
          fill(wave.getColorForPoint(centerPoints_top[i].x, centerPoints_top[i].y));
          rect(centerPoints_top[i].x - squareSize / 2, centerPoints_top[i].y - squareSize / 2, squareSize, squareSize);
          break; // If a point is inside one wave, we don't need to check other waves
        }
      }
    }
  }

  // for (let i = 0; i < centerPoints.length; i++) {
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
    waves_left.push(new Wave((canvasWidth - slitDistance) / 2,canvasHeight - slider_height+10, 0, propagationSpeed, hollowWidth));
  }

  if (frameCounter % waveInterval == 0) {
    waves_right.push(new Wave((canvasWidth + slitDistance) / 2,canvasHeight - slider_height+10, 0, propagationSpeed, hollowWidth));
  }


  for (let i =0;  i<waves.length;i++) {
    if (waves[i].radius >1000 ) {
      waves.splice(i, 1);
      break
    }
  }

  for (let i =0;  i<waves_left.length;i++) {
    if (waves_left[i].radius >1000 ) {
      waves_left.splice(i, 1);
      break
    }
  }
  

  for (let i =0;  i<waves_right.length;i++) {
    if (waves_right[i].radius >1000 ) {
      waves_right.splice(i, 1);
      break
    }
  }


  mouse_x = mouseX

  if (isDragging) {
    let ratio = (mouseX+(window.innerWidth/2-400))/window.innerWidth
    // img_.style.left = ratio + "vw";  
    // console.log((mouseX+(window.innerWidth/2-400))/window.innerWidth)



  }




  ///////////interfnece pattern 


  // centerPoints_top

  // interferenceList =[]

  for(let i = 0; i < centerPoints_top.length; i++) {
    interference = new Interference(
        centerPoints_top[i].x, 
        centerPoints_top[i].y, 
        light.x, 
        light.y, 
        monster_a.x, 
        monster_a.y, 
        slider_height
    );
    interference.calculatePath()
    interferenceList[i]=interference;

}



  if (key_view ==1) {
    let radius = 100;
   
    for (let i = 0; i < interferenceList.length; i++) {
      // Calculate the distance from the mouse to the current element
      let dx = mouseX - interferenceList[i].x; // Assuming each element has x and y properties
      let dy = mouseY - interferenceList[i].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      // If the element is within the specified radius, display it
      if (distance < radius) {
        interferenceList[i].display();
      }
    }

    // Draw the circle around the mouse position
    // noFill();
    // stroke(255); // White circle
    // ellipse(mouseX, mouseY, radius * 2, radius * 2);
  }
   




  /////////////////////



  /////




  image(img_pp1, people_x, 480, 50, 50); //368 middle //mouseX-20


  const handleDiv = document.querySelector('.new_handle img'); // Directly targeting the image inside new_handle



  if (isDragging ) {
    // console.log(mouseX)



    if (mouseX>=600 && mouseX<630) {
      people_x+=0.5
      handleDiv.style.transform = 'rotate(15deg)';
    } else if (600>mouseX && mouseX>570){
      people_x-=0.5
      handleDiv.style.transform = 'rotate(-15deg)';
    } else if (mouseX>=630 && people_x<=740 ) {
      people_x+=2
      handleDiv.style.transform = 'rotate(25deg)';
    } else if (mouseX <=570 &&people_x>=0 ) {
      people_x-=2
      handleDiv.style.transform = 'rotate(-25deg)';
    }


    light.x = people_x+20


    window.addEventListener('mouseup', function(event) {
      // Your code here
      console.log('Mouse button released!');
      isDragging = false;
      handleDiv.style.transform = 'rotate(0deg)';
    });
    // console.log(e.clientX)
  

  }



  //////////////////

  // Display all monsters
  for (let i = monster_list.length - 1; i >= 0; i--) {
    let monster = monster_list[i];
    monster.display();

    if (monster.y >= height) {
      heart_num -= 1; // Decrease heart number
      monster_list.splice(i, 1); // Remove this monster from the list
      key_view=0
    }

    if (monster.life<0) {
      monster_list.splice(i, 1); // Remove this monster from the list
      key_view=0
      diamond_num+=1
    }
}




  // Check for spawning new monster every 5 seconds
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
  image(img_key, 10, 0, 45, 55);
  // image(img_coin, 450, 0, 50, 60);
  image(img_diamond, 350, -5, 45, 60);

  
  // Set text properties
  textFont(myFont);
  textSize(24); // Adjust the size as needed
  fill(255); // Set text color (white in this example)
  
  // Add text next to each image
  text("x "+key_num, 10 + 40, 35);  // For key
  text("x "+diamond_num, 350 + 40, 35); // For diamond
  text("x "+heart_num, 700 + 40, 35); // For heart

  // text("x3", 450 + 50, 30); // For coin


  


  } else if (start_scene ==2) {
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

if (points.length<numOfPoints) {
  points.push(new Point());
}


// Update and display each point
for (let point of points) {
  point.update();
  point.display();
}

for (let i =0;i<points.length;i++) {
  if (points[i].opacity<=0){
    points.splice(i,1)
    points.push(new Point());
    break
  }
}





    // Display all monsters
  for (let i = monster_list.length - 1; i >= 0; i--) {
    let monster = monster_list[i];
    monster.display();

    if (monster.y >= height) {
      heart_num -= 1; // Decrease heart number
      monster_list.splice(i, 1); // Remove this monster from the list
    }

    // if (monster.life<0) {
    //   monster_list.splice(i, 1); // Remove this monster from the list

    // }
}










  } else if (start_scene ==3) {

    //game over

  
    image(img_end_all, 250, 220, 300, 200);
    // image(img_start_arrow, 338, 373, 30, 30);
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

  if (325<mouseX && mouseX<388 && mouseY<396 && mouseY>372) {
    image(img_end_arrow, 300, 365, 40, 40);
  }

  if (422<mouseX && mouseX<462 && mouseY<392 && mouseY>372) {
    image(img_end_arrow, 393, 365, 40, 40);
  }


  }


  // console.log(fadeAmount)

  // Draw the fading overlay if fadingOut is true
  if (fadingOut) {
    fill(0, fadeAmount);
    rect(0, 0, 900, 900);
    fadeAmount += 5;  // Adjust this value to make the fade faster or slower
    
    if (fadeAmount >= 255) {
      fadingOut = false; // Stop the fade-out once it's fully opaque
      fadeAmount =0
      start_scene = current_scene

    }
  }





}



////////

// function drawDoubleSlit(distance) {
//   fill(255);
//   rect(0, canvasHeight - slider_height, (canvasWidth - slitDistance) / 2-10+5, 20);
//   rect((canvasWidth + slitDistance) / 2+10-5, canvasHeight - slider_height, (canvasWidth - slitDistance) / 2, 20);

//   rect((canvasWidth - slitDistance) / 2+10-5, canvasHeight - slider_height, slitDistance-20+10 , 20);
 
// }

function spawnMonster() {
  let x = random(width);
  let y = random(height);
  let imgs = [img_monster_1, img_monster_2, img_monster_3, img_monster_4, img_monster_5, img_monster_6, img_monster_7, img_monster_8, img_monster_9];
  let img = random(imgs); // Select a random image

  let newMonster = new Monster(x, y, img);
  monster_list.push(newMonster);
}

function drawDoubleSlit(distance) {
  // Variables for the size of the tiling image
  let tileWidth = 20;
  let tileHeight = img_tile.height;

  // Tiling for left barrier
  for (let x = 0; x < (canvasWidth - slitDistance) / 2 - 5; x += tileWidth) {
    image(img_tile, x, canvasHeight - slider_height, tileWidth, 20);
  }

  // Tiling for right barrier
  for (let x = (canvasWidth + slitDistance) / 2 + 5; x < canvasWidth; x += tileWidth) {
    image(img_tile, x, canvasHeight - slider_height, tileWidth, 20);
  }

  // Tiling for middle barrier
  let middleStart = (canvasWidth - slitDistance) / 2 + 5;
  let middleEnd = (canvasWidth + slitDistance) / 2 - 5;

  for (let x = middleStart; x < middleEnd; x += tileWidth) {
    // Check if this is the last tile and adjust width if necessary
    let actualTileWidth = 20;
    if (x + tileWidth > middleEnd) {
      actualTileWidth = middleEnd - x;  // Adjust the width of the last tile
    }
    image(img_tile, x, canvasHeight - slider_height, actualTileWidth,20);
  
  }
}




function recordCenterPoints() {

  let halfSquare = squareSize / 2;

  for (let x = 0; x < canvasWidth; x += squareSize) {
    for (let y = 0; y < canvasHeight; y += squareSize) {
      let centerX = x + halfSquare;
      let centerY = y + halfSquare;

      if (y>(canvasHeight-slider_height+15)){
        centerPoints.push({ x: centerX, y: centerY });
      } else if (y<(canvasHeight-slider_height-3)){
        centerPoints_top.push({ x: centerX, y: centerY });
      } else if (
        ((x > ((canvasWidth - slitDistance) / 2 - 10) && x < ((canvasWidth - slitDistance) / 2 + 10-5)) || 
        (x > ((canvasWidth + slitDistance) / 2 - 10) && x < ((canvasWidth + slitDistance) / 2 + 10-5))) &&
        (y < (canvasHeight - slider_height+15) && y > (canvasHeight - slider_height - 3))
      ) {
          // The point (x, y) is within one of the gaps (slits).
          centerPoints.push({ x: centerX, y: centerY });
          if (  (x > ((canvasWidth + slitDistance) / 2 - 10) && x < ((canvasWidth + slitDistance) / 2 + 10-5))) {
            centerPoints_middle_right.push({ x: centerX, y: centerY });
          }
          
          if ((x > ((canvasWidth - slitDistance) / 2 - 10) && x < ((canvasWidth - slitDistance) / 2 + 10-5)) ) {
            centerPoints_middle_left.push({ x: centerX, y: centerY });
          }
      }

    
    }
  }
}









document.addEventListener('DOMContentLoaded', (event) => {
  let keyButton = document.querySelector('.key');


  if(keyButton) {


    keyButton.addEventListener('click', function() {
    // Your code to run when the button is clicked

    if (key_view ==0 && key_num>0) {
      key_view=1
      key_num-=1
    }
    console.log('Button clicked!');
});



  }
});


document.addEventListener('DOMContentLoaded', (event) => {
  let handle = document.querySelector('.handle');

  // Add an event listener for the 'mousedown' event
  if(handle ) {
  
    handle.addEventListener('mousedown', function(e) {
      isDragging = true;
      // people_x = e.clientX
      // console.log(e.clientX)

    });

    handle.addEventListener('mouseup', function(e) {
      isDragging = false;
      // people_x = e.clientX
      // console.log(e.clientX)

    });


    // handle.addEventListener('mousemove', function(e) {

    
     
     
      

    // });

  }
});

// This function creates or moves the light based on the given x position
function createOrMoveLight(x) {
    if (lightOn == false) {
        lightOn = true;
        console.log('Light is On');
    } else {
        lightOn = false;
        console.log('Light is OFF');
    }

    // light = new Light(x, 680);  // Set the light's X position to the provided x value
}








// Get the element by its class name


document.addEventListener('DOMContentLoaded', (event) => {
  let startButton = document.querySelector('.start');

  // Add an event listener for the 'mousedown' event
  if(startButton) {
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

  startButton.addEventListener('click', function() {
    // Your code to run when the button is clicked

    if (start_on ==0) {
      start_on=1
    }else {
      start_on=0
    }
    console.log('Button clicked!');
});



  }
});






document.addEventListener('DOMContentLoaded', (event) => {
  let waveButton = document.querySelector('.wave');
  let particleButton = document.querySelector('.particle');

  // Add an event listener for the 'mousedown' event
  if(waveButton) {
  

  waveButton.addEventListener('click', function() {
    // Your code to run when the button is clicked

    if ( wave_mode ==0) {
      wave_mode=1
      waveButton.style.backgroundColor = "rgba(0,0,0,0.4)";
      particleButton.style.backgroundColor = "rgba(0,0,0,0)";
      particle_mode=0

    }else {
      wave_mode=0
      waveButton.style.backgroundColor = "rgba(0,0,0,0)";
      particleButton.style.backgroundColor = "rgba(0,0,0,0.4)";
      particle_mode=1
    }
    console.log('Button clicked!');
});



  }


  if(particleButton) {
  

    particleButton.addEventListener('click', function() {
      // Your code to run when the button is clicked
  
      if ( particle_mode ==0 ) {
        particle_mode=1
        particleButton.style.backgroundColor = "rgba(0,0,0,0.4)";
        waveButton.style.backgroundColor = "rgba(0,0,0,0)";
        wave_mode=0
      }else {
        particle_mode=0
        particleButton.style.backgroundColor = "rgba(0,0,0,0)";
        waveButton.style.backgroundColor = "rgba(0,0,0,0.4)";
        wave_mode=1
      }
      console.log('Button clicked!');
  });
  
  
  
    }


});


function mousePressed() {

  if (start_scene==0) {
    // key_view = 0
  }
  if (start_scene ==1) {



    if (370 < mouseX && mouseX < 425 && mouseY < 398 && mouseY > 374) {
      // Code to execute when the first area is clicked
      
      console.log('First area clicked!');
      // start_scene = 0 //game
      current_scene = 0 //game
      fadingOut = true; // Start the fade-out
    }
  
    if (370 < mouseX && mouseX < 425 && mouseY < 427 && mouseY > 404) {
      // Code to execute when the second area is clicked
      console.log('Second area clicked!');
      current_scene = 2 ////no game 
      fadingOut = true; // Start the fade-out

    }

  }

  if (start_scene ==3) {

    if (325<mouseX && mouseX<388 && mouseY<396 && mouseY>372) {
      key_num =3
      diamond_num =0
      heart_num =3

      current_scene = 0 //game
      fadingOut = true; // Start the fade-out
    }
  
    if (422<mouseX && mouseX<462 && mouseY<392 && mouseY>372) {
      current_scene = 2 //game
      fadingOut = true; // Start the fade-out
    }

  }
 
}


document.addEventListener('keydown', function(event) {
  if (event.key === "ArrowLeft") {
    // Left arrow key pressed
    console.log("Left key pressed!");
    if (people_x>=0) {
      people_x-=10
    }
   

    // Add your logic here
  } else if (event.key === "ArrowRight") {
    // Right arrow key pressed
    console.log("Right key pressed!");

    if (people_x<=740) {
      people_x+=10
    } 
    // Add your logic here
  }

  if (event.key === " ") { // Checking for the space key
    console.log("Space key pressed!");
    // Add your logic for the space key here

    if (start_on ==0) {
      start_on=1
    }else {
      start_on=0
    }


  }

  if (event.key === "k" || event.key === "K") { // Check for 'K' or 'k'
    console.log("k key pressed!");
    // Add your logic for the space key here

    if (key_view ==0 && key_num>0) {
      key_view=1
      key_num-=1
    }


  }

  if (event.key === "m" || event.key === "M") { // Check for 'K' or 'k'
  console.log("m key pressed!");
  // Add your logic for the space key here

  let waveButton = document.querySelector('.wave');
  let particleButton = document.querySelector('.particle');

  if ( wave_mode ==0) {
    wave_mode=1
    waveButton.style.backgroundColor = "rgba(0,0,0,0.4)";
    particleButton.style.backgroundColor = "rgba(0,0,0,0)";
    particle_mode=0

  }else {
    wave_mode=0
    waveButton.style.backgroundColor = "rgba(0,0,0,0)";
    particleButton.style.backgroundColor = "rgba(0,0,0,0.4)";
    particle_mode=1
  }


}





  light.x = people_x+20
});
