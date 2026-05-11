/* ===========================
   RACIK RASA — script.js
   Slider otomatis dengan dot indicator
   =========================== */

/**
 * Membuat slider otomatis.
 *
 * @param {string} sliderId   - ID elemen pembungkus slide (div.hero-slider / div.why-slider)
 * @param {string} dotsId     - ID elemen pembungkus dots
 * @param {string} slideClass - Class setiap slide ('slide' atau 'wslide')
 * @param {number} interval   - Jeda antar slide dalam milidetik (default 3000)
 */
function createSlider(sliderId, dotsId, slideClass, interval = 1000) {
  const sliderEl = document.getElementById(sliderId);
  const dotsEl   = document.getElementById(dotsId);

  if (!sliderEl || !dotsEl) return; // Keluar jika elemen tidak ditemukan

  const slides = sliderEl.querySelectorAll('.' + slideClass);
  const dots   = dotsEl.querySelectorAll('.dot');

  let current = 0;
  let timer   = null;

  /**
   * Pindah ke slide tertentu berdasarkan index.
   * @param {number} index
   */
  function goTo(index) {
    // Hapus class 'active' dari slide & dot yang sedang aktif
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    // Update index
    current = (index + slides.length) % slides.length;

    // Tambah class 'active' ke slide & dot yang baru
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  /** Jalankan auto-play */
  function startAutoPlay() {
    timer = setInterval(function () {
      goTo(current + 1);
    }, interval);
  }

  /** Hentikan auto-play (saat user klik dot secara manual) */
  function stopAutoPlay() {
    clearInterval(timer);
  }

  /** Reset auto-play setelah interaksi manual */
  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Pasang event listener pada setiap dot
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var targetIndex = parseInt(this.getAttribute('data-index'), 10);
      goTo(targetIndex);
      resetAutoPlay(); // Reset timer agar tidak loncat terlalu cepat setelah klik manual
    });
  });

  // Pause auto-play saat mouse hover di atas slider (UX lebih nyaman)
  sliderEl.addEventListener('mouseenter', stopAutoPlay);
  sliderEl.addEventListener('mouseleave', startAutoPlay);

  // Mulai auto-play saat halaman dimuat
  startAutoPlay();
}

// -------- Inisialisasi --------

// Hero Slider
createSlider('heroSlider', 'sliderDots', 'slide', 3000);

// Why / Kenapa Kami Slider
createSlider('whySlider', 'whyDots', 'wslide', 1500); // Beda interval agar tidak bersamaan

(function () {
  var slider = document.getElementById('testiSlider');
  var dotsEl = document.getElementById('testiDots');
  if (!slider || !dotsEl) return;
 
  var items = slider.querySelectorAll('.testi-item');
  var dots  = dotsEl.querySelectorAll('.dot');
  var current = 0;
  var timer   = null;
 
  function goTo(index) {
    // Lepas active dari yang lama
    items[current].classList.remove('active');
    dots[current].classList.remove('active');
 
    current = (index + items.length) % items.length;
 
    // Pasang active ke yang baru
    items[current].classList.add('active');
    dots[current].classList.add('active');
  }
 
  function startAutoPlay() {
    timer = setInterval(function () {
      goTo(current + 1);
    }, 3000);
  }
 
  function stopAutoPlay()  { clearInterval(timer); }
  function resetAutoPlay() { stopAutoPlay(); startAutoPlay(); }
 
  // Klik dot manual
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(this.getAttribute('data-index'), 10));
      resetAutoPlay();
    });
  });
 
  // Pause saat hover di atas section testimoni
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);
 
  startAutoPlay();
})();