const app = document.querySelector(`.app`);
const mainSection = app.querySelector(`.main`);

const showScreen = (screen) => {
  while (mainSection.firstChild) {
    mainSection.firstChild.remove();
  }
  mainSection.appendChild(screen.element);
};

export {showScreen};
