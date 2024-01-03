import logo from './img/etglogo.png';
import { contentDiv, createAElement, createDOMElement } from './home';
import itemData from './items-data.csv';

const imagesContext = require.context(
  './img/items_icons/',
  false,
  /\.(webp|png|jpe?g)$/
);

export const imageMap = imagesContext.keys().reduce((acc, path) => {
  const filename = path.split('/').pop().split('.').shift();
  acc[filename] = imagesContext(path);
  return acc;
}, {});

function createMenuItem(data) {
  const [, name, type, , quality, effect] = data;
  const filepath = imageMap[name.replaceAll(' ', '_').replaceAll("'", '%27')];

  // create containing divs for each part of the item entry
  const item = createDOMElement('div', ['item']);
  const itemName = createDOMElement('div', ['item-name']);
  const itemEffect = createDOMElement('p', ['effect'], {}, effect);
  const itemDetail = createDOMElement('div', ['item-detail']);

  // add a div for item image and name
  const itemImg = createDOMElement('img', [], {
    src: filepath,
    alt: name + ' icon',
  });
  const itemTitle = createDOMElement('h3', [], {}, name);

  // add item details
  const itemQualityTitle = createDOMElement('span', ['quality'], {}, 'Quality:');
  const itemQualityValue = createDOMElement('span', ['val'], {}, quality);
  const itemTypeTitle = createDOMElement('span', ['type'], {}, 'Type:');
  const itemTypeValue = createDOMElement('span', ['val'], {}, type);

  for (const el of [
    itemQualityTitle,
    itemQualityValue,
    itemTypeTitle,
    itemTypeValue,
  ])
    itemDetail.appendChild(el);

  itemName.appendChild(itemImg);
  itemName.appendChild(itemTitle);
  item.appendChild(itemName);
  item.appendChild(itemEffect);
  item.appendChild(itemDetail);

  return item;
}

export default function showItemsMenu() {
  contentDiv.classList.remove('home');
  contentDiv.classList.add('menus');

  while (contentDiv.firstChild) {
    contentDiv.removeChild(contentDiv.lastChild);
  }

  // create sidebar with logo
  const sidebar = createDOMElement('div', ['sidebar']);
  const logoImg = createDOMElement('img', [], {
    src: logo,
    alt: 'Enter the Gungeon logo',
  });

  sidebar.appendChild(logoImg);
  contentDiv.appendChild(sidebar);

  // create container for the nav and menu + items
  const menuContainer = createDOMElement('div', ['menu-container']);

  // create the nav
  const nav = createDOMElement('div', ['nav'], { id: 'nav' });
  menuContainer.appendChild(nav);

  // create the nav items
  const tabs = createDOMElement('div', ['tabs']);
  nav.appendChild(tabs);

  const categoryTabs = createDOMElement('div', ['category-tabs']);
  const itemsTab = createAElement('ITEMS', '#');
  const weaponsTab = createAElement('WEAPONS', '#');
  categoryTabs.appendChild(itemsTab);
  categoryTabs.appendChild(weaponsTab);

  const homeTabs = createDOMElement('div', ['home-tabs']);
  const ourStaffTab = createAElement('OUR STAFF', '#');
  const storeInfoTab = createAElement('STORE INFO', '#');
  homeTabs.appendChild(ourStaffTab);
  homeTabs.appendChild(storeInfoTab);

  tabs.appendChild(categoryTabs);
  tabs.appendChild(homeTabs);

  // create the menu
  const menu = createDOMElement('div', ['menu']);
  const menuTitle = createDOMElement('h1', [], {}, 'ITEMS');
  menu.appendChild(menuTitle);
  menuContainer.appendChild(menu);

  // create all menu items
  const menuItems = new DocumentFragment();
  // More items could be loaded from the CSV, but I haven't downloaded all the images...
  for (const i of itemData.slice(0, 150)) {
    const newItem = createMenuItem(i);
    menuItems.appendChild(newItem);
  }
  menu.append(menuItems);
  contentDiv.appendChild(menuContainer);
}
