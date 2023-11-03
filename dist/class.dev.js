"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Light =
/*#__PURE__*/
function () {
  function Light(x, y) {
    _classCallCheck(this, Light);

    this.x = x;
    this.y = y;
  }

  _createClass(Light, [{
    key: "display",
    value: function display() {// fill(254,246,182)
      // ellipse(this.x, this.y, 10);
    }
  }]);

  return Light;
}();

var Wave =
/*#__PURE__*/
function () {
  function Wave(x, y, startRadius, speed, width) {
    _classCallCheck(this, Wave);

    this.x = x;
    this.y = y;
    this.radius = startRadius;
    this.speed = speed;
    this.width = width;
    this.phase = 0; // Initial phase is set to 0

    this.color;
  }

  _createClass(Wave, [{
    key: "update",
    value: function update() {
      this.radius += this.speed;
      this.calculatePhase(); //   console.log(this.phase/3.1415926)
    }
  }, {
    key: "calculatePhase",
    value: function calculatePhase() {
      var distanceTravelled = this.radius;
      this.phase = 2 * PI / this.width * distanceTravelled;
      this.phase %= 2 * PI; // Keep the phase in the range [0, 2PI]

      this.color = this.getColor();
    }
  }, {
    key: "display",
    value: function display() {//   stroke(0, 0, 255); // Blue color
      //   ellipse(this.x, this.y, 2 * this.radius);
      //   ellipse(this.x, this.y, 2 * (this.radius - this.width));
    }
  }, {
    key: "getColor",
    value: function getColor() {
      var tolerance = 0.1; // A small tolerance value to check for approximations

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
  }, {
    key: "isInside",
    value: function isInside(x, y) {
      var d = dist(this.x, this.y, x, y);
      return d > this.radius - this.width && d < this.radius;
    } // getColorForPoint(x, y) {
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

  }, {
    key: "getColorForPoint",
    value: function getColorForPoint(x, y) {
      var d = dist(this.x, this.y, x, y); // Calculate an oscillating alpha value based on the current radius
      // This will create a fade in and fade out effect for the alpha

      var alpha = map(sin(this.radius * 0.01), -1, 1, 50, 200);
      return color(152, 109, 178, alpha);
    }
  }]);

  return Wave;
}();

var Interference =
/*#__PURE__*/
function () {
  function Interference(x, y, initial_x, initial_y, target_x, target_y, slider_height) {
    _classCallCheck(this, Interference);

    this.x = x;
    this.y = y;
    this.initial_x = initial_x;
    this.initial_y = initial_y;
    this.target_x = target_x; //monster 

    this.target_y = target_y;
    this.slider_height = slider_height;
    this.waveLength = waveLength; //arbitrary

    this.phase;
    this.hole_1_x = (canvasWidth - slitDistance) / 2;
    this.hole_1_y = canvasHeight - slider_height + 10;
    this.hole_2_x = (canvasWidth + slitDistance) / 2;
    this.hole_2_y = canvasHeight - slider_height + 10;
    this.color = 0;
  }

  _createClass(Interference, [{
    key: "update",
    value: function update(newX1, newY1, newX2, newY2, newX3, newY3, newHeight) {
      // Update the internal state
      this.x = newX1;
      this.y = newY1;
      this.initial_x = newX2;
      this.initial_y = newY2;
      this.target_x = newX3;
      this.target_y = newY3;
      this.slider_height = newHeight;
      this.p = 0; // ... similarly update x2, y2, x3, y3, and height
      // Recalculate path or other dependent properties

      this.calculatePath();
    }
  }, {
    key: "distance",
    value: function distance(x1, y1, x2, y2) {
      var dx = x2 - x1;
      var dy = y2 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }, {
    key: "calculatePath",
    value: function calculatePath() {
      // diference in phase, when wavelength , max
      //lower part
      var path_1 = this.distance(this.initial_x, this.initial_y, this.hole_1_x, this.hole_1_y);
      var path_2 = this.distance(this.initial_x, this.initial_y, this.hole_2_x, this.hole_2_y); // let phase = abs(path_1-path_2)
      //upper part

      var path_1_2 = this.distance(this.x, this.y, this.hole_1_x, this.hole_1_y);
      var path_2_2 = this.distance(this.x, this.y, this.hole_2_x, this.hole_2_y);
      var phase = abs(path_1 + path_1_2 - path_2 - path_2_2);
      var ratio = phase / this.waveLength;
      var fractionalPart = ratio % 1; // Get the fraction part of the ratio

      if (phase < 10) {
        this.color = color(199, 62, 58); //red

        this.p = 1;
      } else if (Math.abs(fractionalPart) < 0.1) {
        //second max
        this.color = color(192, 109, 178); //pink

        this.p = 2;
      } else if (Math.abs(fractionalPart - 0.5) < 0.1) {
        // Ratio is close to a half number
        //     //destructive
        this.color = color(8, 8, 8);
        this.p = 3;
      } else {
        this.color = color(80, 70, 150); //blue

        this.p = 4;
      } // Check if the fractional part is close to 0 or 0.5
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
  }, {
    key: "display",
    value: function display() {
      fill(this.color);
      rect(this.x - squareSize / 2, this.y - squareSize / 2, squareSize, squareSize);
    } // showColor() {
    // }
    // kill(monster) {
    //     //50 x monyter 70 y monster
    //     if (monster.x+25) 
    // }

  }]);

  return Interference;
}();

var Particle =
/*#__PURE__*/
function () {
  function Particle(wave) {
    _classCallCheck(this, Particle);

    this.wave = wave;
    this.size = 10;
    this.angleSpeed = random(0.01, 0.05); // Random speed of angle change

    this.reset();
  }

  _createClass(Particle, [{
    key: "reset",
    value: function reset() {
      this.angle = random(TWO_PI); // Start from a random angle

      this.calculatePosition();
    }
  }, {
    key: "update",
    value: function update() {
      // Update the angle to move the particle along the circle
      this.angle += this.angleSpeed;

      if (this.angle > TWO_PI) {
        this.angle -= TWO_PI;
      }

      this.calculatePosition();
    }
  }, {
    key: "calculatePosition",
    value: function calculatePosition() {
      // Calculate the new position based on the updated angle
      this.x = this.wave.x + this.wave.radius * cos(this.angle);
      this.y = this.wave.y + this.wave.radius * sin(this.angle);
    }
  }, {
    key: "display",
    value: function display() {
      fill(255, 0, 0); // Red color

      noStroke();
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size);
    }
  }]);

  return Particle;
}();

var Monster =
/*#__PURE__*/
function () {
  function Monster(x, y, img, speed) {
    _classCallCheck(this, Monster);

    this.x = x;
    this.y = -100;
    this.img = img;
    this.speed = speed;
    this.life = 10;
  }

  _createClass(Monster, [{
    key: "display",
    value: function display() {
      image(this.img, this.x, this.y, 70, 70);
      this.y += this.speed;
      this.getAttacked();
    }
  }, {
    key: "getAttacked",
    value: function getAttacked() {
      var closestDistance = 999;
      var closestInterference = null;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = interferenceList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var interference = _step.value;
          var d = dist(this.x + 25, this.y + 35, interference.x, interference.y);

          if (d < closestDistance) {
            closestDistance = d;
            closestInterference = interference;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (closestInterference != null) {
        // Do something with closestInterference
        //   console.log("Closest interference at:", closestInterference.x, closestInterference.y);
        if (start_on == 1) {
          if (closestInterference.p == 1) {
            this.life -= 0.5;
            fill("red");
            rect(this.x + 28, this.y + 35, 10, 10);
          }

          if (closestInterference.p == 2) {
            this.life -= 0.1;
            fill("blue");
            rect(this.x + 25, this.y + 35, 10, 10);
          }
        } // You can perform further actions here

      }
    }
  }]);

  return Monster;
}();

var Point =
/*#__PURE__*/
function () {
  function Point() {
    _classCallCheck(this, Point);

    this.x = random(790);
    this.y = random(700);
    this.color = color(152, 109, 178);
    this.opacity = random(255);
  }

  _createClass(Point, [{
    key: "update",
    value: function update() {
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
  }, {
    key: "display",
    value: function display() {
      noStroke();
      fill(red(this.color), green(this.color), blue(this.color), this.opacity);
      rect(this.x, this.y, 10, 10);
    }
  }]);

  return Point;
}();