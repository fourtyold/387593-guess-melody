import showScreen from './show-element.js';
import welcomeElement from './welcome.js';

export default function mainReplayHandler() {
  showScreen(welcomeElement);
  // evt.target.removeEventListener(`click`, mainReplayHandler);
}
