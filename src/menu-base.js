import logo from './img/etglogo.png';
import { contentDiv, createDOMElement, home, clearDiv } from './home';
import { createWeaponsMenu } from './menu-weapons';
import { createItemsMenu } from './menu-items';
import createStoreInfoPage from './store-info';

// creates the high level divs for the menu
export const menuContainer = createDOMElement('div', ['menu-container']);
export const menu = createDOMElement('div', ['menu']);
export const sidebar = createDOMElement('div', ['sidebar']);
export const nav = createDOMElement('div', ['nav'], { id: 'nav' });
export const menuTitle = createDOMElement('h1', [], {}, '');

// sets the classes for the appropriate grid layout
function initMenuLayout() {
  contentDiv.classList.remove('home');
  contentDiv.classList.remove('menus');
  menu.classList.remove('info-page');
}

export function createMenuBase() {
  const logoImg = createDOMElement('img', [], {
    src: logo,
    alt: 'Enter the Gungeon logo',
  });
  for (const div of [contentDiv, menuContainer, menu, sidebar, nav]) {
    clearDiv(div);
  }
  initMenuLayout();
  logoImg.addEventListener('click', home);
  window.addEventListener('scroll', function () {
    var scrolledHeight = window.scrollY;
    document.body.style.backgroundPositionY = -(scrolledHeight * 0.08) + 'px';
  });

  sidebar.appendChild(logoImg);
  contentDiv.appendChild(sidebar);
  menuContainer.appendChild(nav);
  menuContainer.appendChild(menuTitle);

  // create the nav items
  const tabs = createDOMElement('div', ['tabs']);
  nav.appendChild(tabs);

  const categoryTabs = createDOMElement('div', ['category-tabs']);
  const itemsTab = createDOMElement('a', ['items-tab'], { href: '#' }, 'ITEMS');
  const weaponsTab = createDOMElement(
    'a',
    ['weapons-tab'],
    { href: '#' },
    'WEAPONS'
  );
  categoryTabs.appendChild(itemsTab);
  categoryTabs.appendChild(weaponsTab);

  const homeTabs = createDOMElement('div', ['home-tabs']);
  const storeInfoTab = createDOMElement('a', [], { href: '#' }, 'STORE INFO');
  storeInfoTab.addEventListener('click', createStoreInfoPage);
  homeTabs.appendChild(storeInfoTab);

  tabs.appendChild(categoryTabs);
  tabs.appendChild(homeTabs);

  contentDiv.appendChild(menuContainer);
  menuContainer.appendChild(menu);
}
