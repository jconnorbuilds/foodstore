import { contentDiv, createAElement, createDOMElement } from './home';
import { imageMap, createMenuItem } from './menu-items';
import menuBase from './menu-base';
import weaponData from './weapon-data.csv';

const weaponImagesContext = require.context(
  './img/weapons_icons/',
  false,
  /\.(webp|png|jpe?g)$/
);

export const weaponImageMap = weaponImagesContext.keys().reduce((acc, path) => {
  const filename = path.split('/').pop().split('.').shift();
  acc[filename] = weaponImagesContext(path);
  return acc;
}, {});

export function createWeaponsMenu() {
  contentDiv.classList.remove('home');
  contentDiv.classList.add('menus');
  while (contentDiv.firstChild) {
    contentDiv.removeChild(contentDiv.lastChild);
  }
  createMenuBase();
  contentDiv.appendChild(sidebar);

  let menuTitle = createDOMElement('h1', [], {}, 'ITEMS');
  menu.appendChild(menuTitle);

  // create all menu items
  let menuItems = new DocumentFragment();
  // More items could be loaded from the CSV, but I haven't downloaded all the images...
  for (const i of weaponData.slice(0, 150)) {
    const newItem = createMenuItem(i);
    menuItems.appendChild(newItem);
  }
  menu.append(menuItems);
  contentDiv.appendChild(menuContainer);
}
