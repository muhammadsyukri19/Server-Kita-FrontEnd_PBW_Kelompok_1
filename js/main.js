document.addEventListener("DOMContentLoaded", function () {
  // --- Testimonial Slider Functionality ---
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  const prevButton = document.querySelector(".testimonial-prev");
  const nextButton = document.querySelector(".testimonial-next");
  let currentSlide = 0;

  function showSlide(index) {
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active");
    });

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
  }

  nextButton.addEventListener("click", function () {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
  });

  prevButton.addEventListener("click", function () {
    currentSlide =
      (currentSlide - 1 + testimonials.length) % testimonials.length;
    showSlide(currentSlide);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  setInterval(function () {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
  }, 5000);

  function loadPage(page) {
    fetch(page)
      .then((response) => {
        if (!response.ok) throw new Error("Halaman tidak ditemukan!");
        return response.text();
      })
      .then((data) => (document.getElementById("content").innerHTML = data))
      .catch((error) => {
        document.getElementById("content").innerHTML =
          "<h2>Halaman tidak ditemukan</h2><p>Silakan buat halaman tersebut atau periksa kembali.</p>";
        console.error("Error:", error);
      });
  }

  // --- Animasi Scroll (Fade In) ---
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeElements.forEach((element) => {
    observer.observe(element);
  });
});
