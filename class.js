class Light {
    constructor(x,y){
        this.x = x
        this.y = y
    }

    display() {
        // fill(254,246,182)
        // ellipse(this.x, this.y, 10);
    }
}


class Wave {
    constructor(x, y, startRadius, speed, width) {
      this.x = x;
      this.y = y;
      this.radius = startRadius;
      this.speed = speed;
      this.width = width;
      this.phase = 0;  // Initial phase is set to 0
      this.color;
    }
  
    update() {
      this.radius += this.speed;
      this.calculatePhase();
    //   console.log(this.phase/3.1415926)
    }
  
    calculatePhase() {
        let distanceTravelled = this.radius;
        this.phase = (2 * PI / this.width) * distanceTravelled;
        this.phase %= (2 * PI);  // Keep the phase in the range [0, 2PI]
        this.color = this.getColor();
    }

    display() {
    //   stroke(0, 0, 255); // Blue color
    //   ellipse(this.x, this.y, 2 * this.radius);
    //   ellipse(this.x, this.y, 2 * (this.radius - this.width));
    }

    getColor() {
        let tolerance = 0.1;  // A small tolerance value to check for approximations
        if (abs(this.phase) < tolerance || abs(this.phase - 2 * PI) < tolerance) {
            // Constructive interference: Maximum brightness
            return color(100, 100, 100, 255);
        } else if (abs(this.phase - PI) < tolerance) {
            // Destructive interference: No light
            return color(100, 100, 100, 50);
        } else {
            // Some light, but not maximum
            return color(100, 100, 100, 150);
        }
    }
  
    isInside(x, y) {
      let d = dist(this.x, this.y, x, y);
      return d > this.radius - this.width && d < this.radius;
    }

    // getColorForPoint(x, y) {
    //     // Use the distance and the current radius to generate unique values
    //     let d = dist(this.x, this.y, x, y);
        
    //     // Manipulate values to get more purple/blue tones
    //     let r = (d * 0.8) % 255;  // Slightly less red to favor more purple/blue
    //     let g = (d * 0.2) % 100;  // Keeping green values low
    //     let b = (d + this.radius) % 255;  // Favoring blue to get more of the blue/purple effect
        
    //     return color(r, g, b, 100);
    //   }


    //   getColorForPoint(x, y) {
    //     // Use the distance and the current radius to generate unique RGB values
    //     let d = dist(this.x, this.y, x, y);
    //     let r = (d * this.radius) % 255;
    //     let g = (d + this.radius) % 255;
    //     let b = (255 - r) % 255;
    //     return color(r, g, b, 100);  // You can adjust the alpha value (100 here) as needed
    //   }

    // getColorForPoint(x, y) {
    //     let d = dist(this.x, this.y, x, y);
        
    //     // Calculate an alpha value based on the current radius
    //     // This will result in values between 50 to 200 for alpha
    //     let alpha = (this.radius % 150) + 50;
        
    //     // if (Math.floor(d) % 2 === 0) {
    //     //   // Return blue with varying alpha
    //     //   return color(0, 92, 175, alpha);
    //     // } else {
    //       // Return purple with varying alpha
    //       return color(152, 109, 178, alpha);
    //     // }
    //   }

      getColorForPoint(x, y) {
        let d = dist(this.x, this.y, x, y);
        
        // Calculate an oscillating alpha value based on the current radius
        // This will create a fade in and fade out effect for the alpha
        let alpha = map(sin(this.radius * 0.01), -1, 1, 50, 200);
        
        return color(152, 109, 178, alpha);
      }
      
      
  }
  

  class Interference {
    constructor(x, y, initial_x, initial_y, target_x, target_y, slider_height) {
        this.x =x
        this.y = y
        this.initial_x = initial_x
        this.initial_y = initial_y
        this.target_x = target_x //monster 
        this.target_y = target_y
        this.slider_height = slider_height
        this.waveLength = waveLength //arbitrary
        this.phase 

        this.hole_1_x = (canvasWidth - slitDistance) / 2
        this.hole_1_y = canvasHeight - slider_height+10
        this.hole_2_x = (canvasWidth + slitDistance) / 2
        this.hole_2_y = canvasHeight - slider_height+10
        this.color = 0;

    }


    update(newX1, newY1, newX2, newY2, newX3, newY3, newHeight) {
        // Update the internal state
        this.x = newX1;
        this.y = newY1;
        this.initial_x = newX2
        this.initial_y = newY2
        this.target_x = newX3
        this.target_y = newY3
        this.slider_height = newHeight
        this.p = 0;
        
        // ... similarly update x2, y2, x3, y3, and height

        // Recalculate path or other dependent properties
        this.calculatePath();
    }

    distance(x1, y1, x2, y2) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

  
    calculatePath() {

    // diference in phase, when wavelength , max
        
    //lower part
        let path_1 = this.distance(this.initial_x, this.initial_y,this.hole_1_x, this.hole_1_y )
        let path_2 = this.distance(this.initial_x, this.initial_y,this.hole_2_x, this.hole_2_y )
        // let phase = abs(path_1-path_2)

        //upper part
        let path_1_2 = this.distance(this.x, this.y,this.hole_1_x, this.hole_1_y )
        let path_2_2 = this.distance(this.x, this.y,this.hole_2_x, this.hole_2_y )

        let phase = abs(path_1+path_1_2-path_2-path_2_2)
        let ratio = phase/this.waveLength 

        const fractionalPart = ratio % 1; // Get the fraction part of the ratio

        if (phase <10) {
            this.color = color(199,62,58); //red
            this.p = 1
        } else if (Math.abs(fractionalPart) < 0.1) {
            //second max
            this.color = color(192,109,178) //pink
            this.p = 2
        } else if (Math.abs(fractionalPart - 0.5) < 0.1) {
             // Ratio is close to a half number
        //     //destructive
            this.color = color(8,8,8)
            this.p = 3
        } else {
            this.color = color(80,70,150) //blue
            this.p = 4
        }

         // Check if the fractional part is close to 0 or 0.5
        // if (Math.abs(fractionalPart) < 0.1) { 
        //     //0.001
        //     // Ratio is close to a whole number
        //     this.color = 155;

        // } else if (Math.abs(fractionalPart - 0.5) < 0.1) {
        //     // Ratio is close to a half number
        //     //destructive
        //     this.color = 128;
        // } else {
        //     // Default case (if needed)
        //     // this.color = someDefaultValue;
        // }




    }


    display() {
        fill(this.color)
        rect(this.x - squareSize / 2, this.y - squareSize / 2, squareSize, squareSize);
    }
    // showColor() {

    // }

    // kill(monster) {
    //     //50 x monyter 70 y monster

    //     if (monster.x+25) 

    // }

   

  }

  
  class Particle {
    constructor(wave) {
      this.wave = wave;
      this.size = 10;
      this.angleSpeed = random(0.01, 0.05); // Random speed of angle change
      this.reset();
    }
  
    reset() {
      this.angle = random(TWO_PI); // Start from a random angle
      this.calculatePosition();
    }
  
    update() {
      // Update the angle to move the particle along the circle
      this.angle += this.angleSpeed;
      if (this.angle > TWO_PI) {
        this.angle -= TWO_PI;
      }
      this.calculatePosition();
    }
  
    calculatePosition() {
      // Calculate the new position based on the updated angle
      this.x = this.wave.x + this.wave.radius * cos(this.angle);
      this.y = this.wave.y + this.wave.radius * sin(this.angle);
    }
  
    display() {
      fill(255, 0, 0); // Red color
      noStroke();
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size);
    }
  }
  

  class Monster {

    constructor(x,y,img,speed){
        this.x = x
        this.y = -100
        this.img = img
        this.speed = speed
        this.life = 10
    }


    display() {
 

     image(this.img, this.x, this.y, 70, 70);

     this.y+=this.speed

     this.getAttacked()

    }

    getAttacked() {
        let closestDistance = 999;
        let closestInterference = null;
    
        for (let interference of interferenceList) {
          let d = dist(this.x+25, this.y+35, interference.x, interference.y);
          if (d < closestDistance) {
            closestDistance = d;
            closestInterference = interference;
          }
        }
    
        if (closestInterference != null) {
          // Do something with closestInterference
        //   console.log("Closest interference at:", closestInterference.x, closestInterference.y);

          if (   start_on==1) {
            if (closestInterference.p==1) {
                this.life -=0.5
                fill("red")
                rect(this.x+28,this.y+35,10,10)
              }
              if (closestInterference.p==2) {
                this.life -=0.1
                fill("blue")
                rect(this.x+25,this.y+35,10,10)
              }

          }

        
          // You can perform further actions here
        }
      }

  }

  class Point {
    constructor() {
      this.x = random(790);
      this.y = random(700);
      this.color = color(152, 109, 178);
      this.opacity = random(255);
    }
  
    update() {
      // Move the point down
      this.y += 2; // Change the value here to adjust the speed
  
      // Reduce the opacity to create a fading trail effect
      this.opacity -= 5; // Adjust fading speed here
      this.opacity = max(this.opacity, 0); // Ensure opacity doesn't go below 0
  
      // If the point moves off the bottom of the screen, reset it
      if (this.y > height) {
        this.y = -10;
        this.opacity = 255;
      }
    }
  
    display() {
      noStroke();
      fill(red(this.color), green(this.color), blue(this.color), this.opacity);
      rect(this.x, this.y, 10, 10);
    }
  }