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
    if (evt.altKey && evt.keyCode === keyCodes.leftArrow) {
      if (screenIndex > 0) {
        screenIndex--;
        mainSection.firstChild.remove();
        showScreen(screenIndex);
      }
    }
    if (evt.altKey && evt.keyCode === keyCodes.rightArrow) {
      if (screenIndex < screens.length - 1) {
        screenIndex++;
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

