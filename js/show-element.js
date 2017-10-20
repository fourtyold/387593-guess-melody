const app = document.querySelector(`.app`);
const mainSection = app.querySelector(`.main`);

const showHeader = (header) => {
  if (mainSection.firstChild) {
    mainSection.firstChild.remove();
  }
  mainSection.insertBefore(header, mainSection.firstChild);
};

const showScreen = (screen, header) => {
  while (mainSection.firstChild) {
    mainSection.firstChild.remove();
  }
  if (header) {
    showHeader(header);
  }
  mainSection.appendChild(screen);
};

export {showScreen};
