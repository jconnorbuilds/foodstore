import logo from './img/etglogo.png';
import { contentDiv, createAElement, createDOMElement } from './home';
import { createWeaponsMenu } from './menu-weapons';
import { createItemsMenu } from './menu-items';

// create the menu
// create container for the nav and menu + items
export const menuContainer = createDOMElement('div', ['menu-container']);
export const menu = createDOMElement('div', ['menu']);
export const sidebar = createDOMElement('div', ['sidebar']);
export const nav = createDOMElement('div', ['nav'], { id: 'nav' });

export function createMenuBase() {
  contentDiv.classList.remove('home');
  contentDiv.classList.add('menus');

  while (contentDiv.firstChild) {
    contentDiv.removeChild(contentDiv.lastChild);
  }

  const logoImg = createDOMElement('img', [], {
    src: logo,
    alt: 'Enter the Gungeon logo',
  });

  sidebar.appendChild(logoImg);
  contentDiv.appendChild(sidebar);
  menuContainer.appendChild(nav);

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
  const ourStaffTab = createAElement('OUR STAFF', '#');
  const storeInfoTab = createAElement('STORE INFO', '#');
  homeTabs.appendChild(ourStaffTab);
  homeTabs.appendChild(storeInfoTab);

  tabs.appendChild(categoryTabs);
  tabs.appendChild(homeTabs);

  contentDiv.appendChild(menuContainer);
  menuContainer.appendChild(menu);
}
