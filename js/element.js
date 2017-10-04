export default function getElementFromTemplate(str) {
  let div = document.createElement(`div`);
  div.innerHTML = str;
  return div;
}
