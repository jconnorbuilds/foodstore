import { contentDiv, createDOMElement } from './home';
import {
  menuContainer,
  menuTitle,
  menu,
  sidebar,
  createMenuBase,
} from './menu-base';
import { createWeaponsMenu } from './menu-weapons';
import itemData from './items-data.csv';

const itemImagesContext = require.context(
  './img/items_icons/',
  false,
  /\.(webp|png|jpe?g)$/
);

const itemImageMap = itemImagesContext.keys().reduce((acc, path) => {
  const filename = path.split('/').pop().split('.').shift();
  acc[filename] = itemImagesContext(path);
  return acc;
}, {});

export function clearDiv(div) {
  if (div.nodeName !== 'DIV') {
    console.warn(div + ' is not a div..');
  }
  while (div.firstChild) {
    div.removeChild(div.lastChild);
  }
}

function createItemEntry(data) {
  const [, name, type, , quality, effect] = data;
  const filepath = itemImageMap[name.replaceAll(' ', '_').replaceAll("'", '%27')];

  // create containing divs for each part of the item entry
  const item = createDOMElement('div', ['entry']);
  const itemName = createDOMElement('div', ['entry-name', 'entry-name-item']);
  const itemEffect = createDOMElement('p', ['effect'], {}, effect);
  const itemDetail = createDOMElement('div', ['entry-detail']);

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

export function createItemsMenu() {
  createMenuBase();
  contentDiv.classList.add('menus');

  document
    .querySelector('a.weapons-tab')
    .addEventListener('click', createWeaponsMenu);

  menuTitle.textContent = 'ITEMS';

  // create all menu items
  let menuItems = new DocumentFragment();
  // More items could be loaded from the CSV, but I haven't downloaded all the images...
  for (const i of itemData.slice(0, 150)) {
    const newItem = createItemEntry(i);
    menuItems.appendChild(newItem);
  }
  menu.append(menuItems);
}
