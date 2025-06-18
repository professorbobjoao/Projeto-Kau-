var img01;
var img02;
var img03;

var x;
var y = 0;
var l = 50;

var xP = 50;
var yP = 300;
var r = 50;

var pontos = 0;
var colisao = false;
var velocidade = 1;
var milhoPerdido = 0;

var estadoJogo = "jogando"; // "jogando", "vitoria", "derrota"

var pessoaX = 0; // posição da pessoa andando (animação vitória)

function preload() {
  img01 = loadImage('soja.png');      // fundo
  img02 = loadImage('faixa.png'); // vitória
  img03 = loadImage('x.png'); // derrota (cairam 3 milhos)
}

function setup() {
  createCanvas(400, 450);
  x = random(50, 350);
}

function draw() {
  if (estadoJogo === "vitoria") {
    background(img02);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill("#0E0F0E");
    text("Você venceu!", width / 2, 50);

    // Pessoa andando com cesto de milho
    textSize(40);
    text("🚶‍♂️🧺", pessoaX, height / 2);
    pessoaX += 2;
    if (pessoaX > width + 50) {
      pessoaX = -50; // loop da animação
    }
    return;
  }

  if (estadoJogo === "derrota") {
    background(img03);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill("red");
    text("Você perdeu!", width / 2, height / 2 + 100);
    noLoop();
    return;
  }

  // Estado: jogando
  background(img01);

  // Texto de pontuação e milho perdido
  textSize(20);
  fill("#ED225D");
  text("Pontos: " + pontos, 10, 20);
  text("Milhos perdidos: " + milhoPerdido, 10, 40);

  // Desenha milho (🌽)
  textSize(40);
  textAlign(CENTER, CENTER);
  fill("red");
  text("🌽", x + l / 2, y + l / 2);

  y = y + velocidade;

  // Verifica se milho caiu
  if (y > 400) {
    milhoPerdido++;
    if (milhoPerdido >= 3) {
      estadoJogo = "derrota";
    }
    x = random(50, 350);
    y = 0;
  }

  // Desenha jogador (🧺)
  fill("#FFC107");
  text("🧺", xP, yP);

  // Verifica colisão
  let c = dist(xP, yP, x + l / 2, y + l / 2);
  if (c > 0 && c < r) {
    colisao = true;
    pontos++;
    x = random(50, 350);
    y = 0;
    atualizarVelocidade(pontos);

    if (pontos >= 20) {
      estadoJogo = "vitoria";
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    xP -= 20;
  } else if (keyCode === RIGHT_ARROW) {
    xP += 20;
  } else if (keyCode === UP_ARROW) {
    yP -= 20;
  } else if (keyCode === DOWN_ARROW) {
    yP += 20;
  }
}

function atualizarVelocidade(p) {
  if (p === 5) {
    velocidade += 1;
  } else if (p === 10) {
    velocidade += 1;
  } else if (p === 15) {
    velocidade += 1;
  }
}