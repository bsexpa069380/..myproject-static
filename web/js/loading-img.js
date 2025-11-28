document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll("img.lazy"); // 選所有懶加載圖

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const realSrc = img.getAttribute("data-src");
        img.src = realSrc;

        img.addEventListener("load", () => {
          img.classList.add("loaded");
          // 對應 loader
          const loaders = img.closest(".image-wrapper")?.querySelectorAll(".loader");
          if (loaders) {
            loaders.forEach(loader => loader.style.display = "none");
          }
        });

        obs.unobserve(img); // 停止觀察這張圖
      }
    });
  }, { threshold: 0.1 }); // 可調整觸發比例

  imgs.forEach(img => observer.observe(img));
});
