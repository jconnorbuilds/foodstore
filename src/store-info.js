import { contentDiv, createDOMElement, clearDiv } from './home';
import { createMenuBase } from './menu-base';
import { createItemsMenu } from './menu-items';
import { createWeaponsMenu } from './menu-weapons';
import { menuTitle, menu, menuContainer } from './menu-base';

export default function createStoreInfoPage() {
  createMenuBase();
  contentDiv.classList.add('menus');
  menuTitle.textContent = 'STORE INFO';
  document.querySelector('a.items-tab').addEventListener('click', createItemsMenu);
  document
    .querySelector('a.weapons-tab')
    .addEventListener('click', createWeaponsMenu);

  const taglineText = `Thanks for checking out this page. Just a cheeky layout concept.`;
  const addressText = `Address: Far, far below the surface`;
  const phoneNumText = `Phone: +1-666-THE-GUNGEON`;
  const copyrightText = '©︎2024 jconnorbuilds';
  const tagline = createDOMElement('p', ['tagline'], {}, taglineText);
  const address = createDOMElement('p', [], {}, addressText);
  const phoneNum = createDOMElement('p', [], {}, phoneNumText);

  const infoContainer = createDOMElement('div', ['info-page']);
  menu.classList.add('info-page');
  const footer = createDOMElement('div', ['info-container', 'footer']);
  const copyright = createDOMElement('div', [], {}, copyrightText);

  infoContainer.appendChild(tagline);
  infoContainer.appendChild(address);
  infoContainer.appendChild(phoneNum);
  menu.appendChild(infoContainer);
  footer.appendChild(copyright);
  menuContainer.appendChild(footer);
}
