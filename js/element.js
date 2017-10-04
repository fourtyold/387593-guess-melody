export default function getElementFromTemplate(str) {
  let div = document.createElement(`div`);
  div.appendChild(document.createRange().createContextualFragment(str));
  return div;
}
