// copy daniel shiffman #coding challenge #33

var r = 4;
var k = 30;
var grid = [];
var w = r / Math.sqrt(2);
var active = [];
var cols, filas;
var ordered = [];

//let img;

//function preload() {
 // img = loadImage('assets/fondo.jpg');
//}

function setup() {

  createCanvas(displayWidth-50, displayHeight-25);
  background(0);
  strokeWeight(4);
  colorMode(HSB);

  // paso 0
  cols = floor(width / w);
  filas = floor(height / w);
  for (var i = 0; i < cols * filas; i++) {
    grid[i] = undefined;
  }
  // paso 1
  var x = width / 2;
  var y = height / 2;
  var i = floor(x / w);
  var j = floor(y / w);
  var pos = createVector(x, y);

  grid[i + j * cols] = pos;
  active.push(pos);
}


function draw() {
  background(0);

  for (var total = 0; total < 25; total++) {
    if (active.length > 0) {
      var randIndex = floor(random(active.length));
      var pos = active[randIndex];
      var found = false;
      for (var n = 0; n < k; n++) {
        var sample = p5.Vector.random2D();
        var m = random(r, 2 * r);
        sample.setMag(m);
        sample.add(pos);

        var col = floor(sample.x / w);
        var fila = floor(sample.y / w);

        if (col > -1 && fila > -1 && col < cols && fila < filas && !grid[col + fila * cols]) {

          var ok = true;
          for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
              var index = (col + i) + (fila + j) * cols;
              var vecino = grid[index];
              if (vecino) {
                var d = p5.Vector.dist(sample, vecino);
                if (d < r) {
                  ok = false;
                }
              }
            }
          }
          if (ok) {
            found = true;
            grid[col + fila * cols] = sample;
            active.push(sample);
            ordered.push(sample);
            break;
          }
        }
      }
      if (!found) {
        active.splice(randIndex, 1);
      }
    }
  }

  for (var i = 0; i < ordered.length; i++) {
    if (ordered[i]) {
      //let c = color(img.get(x, y));
      //noStroke();
      //fill(c);
      //circle(ordered.get[i].x, ordered.get[i].y);
      stroke (i%360, 100,100);
      strokeWeight(r * 0.5);
      point ( ordered[i].x, ordered[i].y);
    }
  }
}
