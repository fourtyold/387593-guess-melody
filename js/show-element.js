const app = document.querySelector(`.app`);
const mainSection = app.querySelector(`.main`);

export default function showScreen(screen) {
  while (mainSection.firstChild) {
    mainSection.firstChild.remove();
  }
  mainSection.appendChild(screen);
}
