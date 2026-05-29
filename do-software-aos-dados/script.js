/* =========================================================
   Do Software aos Dados — controle da apresentação
   Navegação por teclado, progresso, tela cheia, deep-link.
   JavaScript puro, sem dependências.
   ========================================================= */
(function () {
  "use strict";

  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  const total = slides.length;

  const els = {
    cur: document.getElementById("cur"),
    totalLabel: document.getElementById("total"),
    bar: document.getElementById("progressBar"),
    prev: document.getElementById("prevBtn"),
    next: document.getElementById("nextBtn"),
    fs: document.getElementById("fsBtn"),
    hint: document.getElementById("hint"),
  };

  let current = 0;

  const pad = (n) => String(n).padStart(2, "0");

  function render() {
    slides.forEach((slide, i) => {
      const isActive = i === current;
      slide.classList.toggle("active", isActive);
      // Reinicia a animação de entrada ao virar o slide
      if (isActive) {
        slide.classList.remove("animate-in");
        // força reflow para reiniciar a animação CSS
        void slide.offsetWidth;
        slide.classList.add("animate-in");
      }
    });

    els.cur.textContent = pad(current + 1);
    const pct = total > 1 ? (current / (total - 1)) * 100 : 100;
    els.bar.style.width = pct + "%";

    if (history.replaceState) {
      history.replaceState(null, "", "#" + (current + 1));
    }
  }

  function go(index) {
    const next = Math.max(0, Math.min(total - 1, index));
    if (next === current) return;
    current = next;
    render();
  }

  const nextSlide = () => go(current + 1);
  const prevSlide = () => go(current - 1);

  /* ---------- Teclado ---------- */
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
      case " ":
      case "PageDown":
        e.preventDefault();
        nextSlide();
        break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        prevSlide();
        break;
      case "Home":
        e.preventDefault();
        go(0);
        break;
      case "End":
        e.preventDefault();
        go(total - 1);
        break;
      case "f":
      case "F":
        toggleFullscreen();
        break;
      default:
        // Atalhos numéricos 1-9 não fazem sentido com 26 slides; ignorado.
        break;
    }
    hideHint();
  });

  /* ---------- Botões ---------- */
  els.next.addEventListener("click", () => { nextSlide(); hideHint(); });
  els.prev.addEventListener("click", () => { prevSlide(); hideHint(); });
  els.fs.addEventListener("click", () => { toggleFullscreen(); hideHint(); });

  /* ---------- Clique / toque para avançar (área central) ---------- */
  document.getElementById("deck").addEventListener("click", (e) => {
    // Não interferir em links
    if (e.target.closest("a, button")) return;
    nextSlide();
    hideHint();
  });

  /* ---------- Gestos de toque (swipe) ---------- */
  let touchX = null;
  document.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) (dx < 0 ? nextSlide() : prevSlide());
    touchX = null;
    hideHint();
  }, { passive: true });

  /* ---------- Tela cheia ---------- */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }
  document.addEventListener("fullscreenchange", () => {
    const icon = document.fullscreenElement ? "minimize" : "maximize";
    els.fs.querySelector("i")?.setAttribute("data-lucide", icon);
    if (window.lucide) window.lucide.createIcons();
  });

  /* ---------- Dica some após interação ---------- */
  let hintTimer = setTimeout(hideHint, 6000);
  function hideHint() {
    els.hint.classList.add("hidden");
    clearTimeout(hintTimer);
  }

  /* ---------- Inicialização ---------- */
  els.totalLabel.textContent = pad(total);

  // Suporte a deep-link (#3 abre o slide 3)
  const fromHash = parseInt((location.hash || "").replace("#", ""), 10);
  if (!Number.isNaN(fromHash) && fromHash >= 1 && fromHash <= total) {
    current = fromHash - 1;
  }

  render();

  // Renderiza os ícones Lucide
  if (window.lucide) window.lucide.createIcons();
})();
