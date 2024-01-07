import logo from './img/etglogo.png';
import { createItemsMenu } from './menu-items';
import { menuContainer, menu, sidebar, nav, menuTitle } from './menu-base';
import createStoreInfoPage from './store-info';

export const contentDiv = document.querySelector('div#content');

function isStandardElement(element) {
  return element instanceof HTMLElement && !(element instanceof HTMLUnknownElement);
}
function initHomeLayout() {
  contentDiv.classList.remove('menus');
  contentDiv.classList.add('home');
  menu.classList.remove('info-page');
}

export function clearDiv(div) {
  if (div.nodeName !== 'DIV') {
    console.warn(div + ' is not a div..');
  }
  while (div.firstChild) {
    div.removeChild(div.lastChild);
  }
}

export function createDOMElement(
  tagName,
  classList = [],
  HTML_attributes = {},
  content = null
) {
  const element = document.createElement(tagName);

  if (!isStandardElement(element))
    console.warn(tagName + ' is not a standard tag name.');

  for (const attribute in HTML_attributes)
    element.setAttribute(attribute, HTML_attributes[attribute]);

  for (const cls of classList) element.classList.add(cls);

  if (content) element.innerHTML = content;

  return element;
}

export function home() {
  initHomeLayout();
  for (const div of [contentDiv, menuContainer, menu, sidebar, nav]) {
    clearDiv(div);
  }
  contentDiv.classList.add('home');

  const logoImg = createDOMElement('img', [], {
    src: logo,
    alt: 'Enter the Gungeon logo',
  });

  const homeTabs = createDOMElement('div', ['home-tabs']);
  const menuTab = createDOMElement('a', [], { href: '#' }, 'MENU');
  menuTab.addEventListener('click', createItemsMenu);
  const storeInfo = createDOMElement('a', [], { href: '#' }, 'STORE INFO');
  storeInfo.addEventListener('click', createStoreInfoPage);

  homeTabs.appendChild(menuTab);
  homeTabs.appendChild(storeInfo);
  contentDiv.appendChild(logoImg);
  contentDiv.appendChild(homeTabs);
}
