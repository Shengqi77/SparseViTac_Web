const viewer = document.querySelector("dialog");
for (const link of document.querySelectorAll("[data-zoom]")) {
  link.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || !viewer.showModal) return;
    event.preventDefault();
    const image = viewer.querySelector("img");
    image.src = link.href;
    image.alt = link.querySelector("img").alt;
    viewer.showModal();
    viewer.scrollTop = 0;
  });
}
viewer.querySelector("button").onclick = () => viewer.close();
