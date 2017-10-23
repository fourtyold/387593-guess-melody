const app = document.querySelector(`.app`);
const mainSection = app.querySelector(`.main`);

const showHeader = (header) => {
  mainSection.insertBefore(header, mainSection.firstChild);
};

const showScreen = (screen) => {
  while (mainSection.firstChild) {
    mainSection.firstChild.remove();
  }
  mainSection.appendChild(screen);
};

export {showScreen, showHeader};
