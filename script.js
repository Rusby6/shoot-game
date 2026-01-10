const empezar = document.getElementById("start-btn");
const pantalla = document.getElementById("game-area");
const puntuacion = document.getElementById("score");
const tiempo = document.getElementById("time");

let tiempoRestante = 30;
let intervalo;
let score = 0;
let juegoActivo = false;
let esPrimeraVez = true;

function iniciar() {
  if (!juegoActivo) return;

  // Cambiar texto del botón cuando se juega
  empezar.textContent = "Jugando...";
  empezar.disabled = true;

  intervalo = setInterval(() => {
    tiempoRestante--;
    tiempo.textContent = tiempoRestante;

    // Crear nueva bola cada segundo
    const bola = document.createElement("div");
    bola.classList.add("target");

    const pos = posicionAleatoria();
    bola.style.left = pos.x + "px";
    bola.style.top = pos.y + "px";

    pantalla.append(bola);

    bola.addEventListener("click", acertar);

    if (tiempoRestante <= 0) {
      finalizarJuego();
    }
  }, 1000);
}

function finalizarJuego() {
  clearInterval(intervalo);
  juegoActivo = false;

  empezar.textContent = "Reiniciar Juego";
  empezar.disabled = false;

  // Eliminar todas las bolas restantes cuando acabe el juego
  const bolas = document.querySelectorAll(".target");
  bolas.forEach((bola) => bola.remove());

  alert("Game Over! Puntuacion: " + score);
}

function reiniciar() {
  // Limpiar juego anterior
  clearInterval(intervalo);
  const bolas = document.querySelectorAll(".target");
  bolas.forEach((bola) => bola.remove());

  // Reiniciar variables
  tiempoRestante = 30;
  score = 0;
  tiempo.textContent = tiempoRestante;
  puntuacion.textContent = score;

  juegoActivo = true;

  if (esPrimeraVez) {
    empezar.textContent = "Jugar";
    esPrimeraVez = false;
  } else {
    empezar.textContent = "Reiniciar Juego";
  }
}

empezar.addEventListener("click", () => {
  reiniciar();
  iniciar();
});

function acertar(e) {
  if (!juegoActivo) return;

  score++;
  puntuacion.textContent = score;

  e.target.classList.add("explode");

  setTimeout(() => {
    if (e.target.parentNode) {
      e.target.remove();
    }
  }, 200);
}

function posicionAleatoria() {
  const anchoBola = 40;
  const altoBola = 40;

  // Calcular posiciones máximas
  const maxX = pantalla.clientWidth - anchoBola;
  const maxY = pantalla.clientHeight - altoBola;

  // Generar posiciones aleatorias
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  return {
    x,
    y,
  };
}
