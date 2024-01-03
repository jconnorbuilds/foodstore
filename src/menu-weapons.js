import logo from './img/etglogo.png';
import { contentDiv, createAElement, createDOMElement } from './home';
import weaponData from './weapon-data.csv';

const imagesContext = require.context(
  './img/weapons_icons/',
  false,
  /\.(webp|png|jpe?g)$/
);

export default function showWeaponsMenu() {
  contentDiv.classList.remove('home');
  contentDiv.classList.add('menus');

  while (contentDiv.firstChild) {
    contentDiv.removeChild(contentDiv.lastChild);
  }
}
