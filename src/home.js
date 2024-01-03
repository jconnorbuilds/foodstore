import logo from './img/etglogo.png';
import showItemsMenu from './menu-items';

export const contentDiv = document.querySelector('div#content');

export function createAElement(text, url) {
  const aTag = document.createElement('a');
  aTag.setAttribute('href', url);
  aTag.textContent = text;
  return aTag;
}

export function isStandardElement(element) {
  return element instanceof HTMLElement && !(element instanceof HTMLUnknownElement);
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

export default function home() {
  contentDiv.classList.remove('menus');
  contentDiv.classList.add('home');

  const logoImg = createDOMElement('img', [], {
    src: logo,
    alt: 'Enter the Gungeon logo',
  });

  const homeTabs = createDOMElement('div', ['home-tabs']);
  const menuTab = createAElement('MENU', '#');
  menuTab.addEventListener('click', showItemsMenu);
  const staffTab = createAElement('OUR STAFF', '#');

  homeTabs.appendChild(menuTab);
  homeTabs.appendChild(staffTab);
  contentDiv.appendChild(logoImg);
  contentDiv.appendChild(homeTabs);
}
