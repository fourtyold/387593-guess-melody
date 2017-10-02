(function () {
  const screensTemplate = document.querySelector(`#templates`).content;
  const screens = screensTemplate.querySelectorAll(`.main`);
  const app = document.querySelector(`.app`);
  const mainSection = app.querySelector(`.main`);
  const keyCodes = {
    leftArrow: 37,
    rightArrow: 39
  };

  let screenIndex = 0;

  function showScreen(i) {
    const screen = screens[i].cloneNode(true);
    mainSection.appendChild(screen);
  }

  function changeScreen(evt) {
    if (evt.altKey && Object.values(keyCodes).includes(evt.keyCode)) {
      const newScreenIndex = screenIndex + (evt.keyCode === keyCodes.leftArrow ? -1 : 1);
      if (newScreenIndex >= 0 && newScreenIndex < screens.length) {
        screenIndex = newScreenIndex;
        mainSection.firstChild.remove();
        showScreen(screenIndex);
      }
    }
  }

  function init() {
    showScreen(screenIndex);
    document.addEventListener(`keydown`, changeScreen);
  }

  init();
})();

