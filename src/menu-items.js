import logo from './img/etglogo.png';
import { contentDiv, makeA } from './home';
import itemData from './items-data.csv';

const imagesContext = require.context(
  './img/menu_items/',
  false,
  /\.(webp|png|jpe?g)$/
);

const imageMap = imagesContext.keys().reduce((acc, path) => {
  const filename = path.split('/').pop().split('.').shift();
  acc[filename] = imagesContext(path);
  return acc;
}, {});

function createMenuItem(data) {
  const [, name, type, , quality, effect] = data;
  const filepath =
    imageMap[name.replaceAll(' ', '_').replaceAll("'", '%27')];

  const item = document.createElement('div');
  const itemName = document.createElement('div');
  const itemEffect = document.createElement('p');
  const itemDetail = document.createElement('div');

  // create containing divs for each part of the item entry
  item.classList.add('item');
  itemName.classList.add('item-name');
  itemEffect.classList.add('effect');
  itemDetail.classList.add('item-detail');

  // create div for item name + img
  const itemImg = new Image();
  itemImg.src = filepath;
  itemImg.alt = name + ' icon';
  const itemTitle = document.createElement('h3');
  itemTitle.textContent = name;
  itemName.appendChild(itemImg);
  itemName.appendChild(itemTitle);

  // add description of item effect
  itemEffect.textContent = effect;

  // add item details
  const itemQualityTitle = document.createElement('span');
  itemQualityTitle.classList.add('quality');
  itemQualityTitle.textContent = 'Quality:';
  const itemQualityValue = document.createElement('span');
  itemQualityValue.classList.add('val');
  itemQualityValue.textContent = quality;
  const itemTypeTitle = document.createElement('span');
  itemTypeTitle.classList.add('type');
  itemTypeTitle.textContent = 'Type:';
  const itemTypeValue = document.createElement('span');
  itemTypeValue.classList.add('val');
  itemTypeValue.textContent = type;

  for (const el of [
    itemQualityTitle,
    itemQualityValue,
    itemTypeTitle,
    itemTypeValue,
  ]) {
    itemDetail.appendChild(el);
  }

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
  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar');
  const logoImg = new Image();
  logoImg.src = logo;
  logoImg.alt = 'Enter the Gungeon logo';
  sidebar.appendChild(logoImg);
  contentDiv.appendChild(sidebar);

  // create container for the nav and menu + items
  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menu-container');
  contentDiv.appendChild(menuContainer);

  // create the nav
  const nav = document.createElement('div');
  nav.setAttribute('id', 'nav');
  nav.classList.add('nav');
  menuContainer.appendChild(nav);

  // create the nav items
  const tabs = document.createElement('div');
  tabs.classList.add('tabs');
  nav.appendChild(tabs);

  const categoryTabs = document.createElement('div');
  tabs.classList.add('category-tabs');
  const itemsTab = makeA('ITEMS', '#');
  const weaponsTab = makeA('WEAPONS', '#');
  categoryTabs.appendChild(itemsTab);
  categoryTabs.appendChild(weaponsTab);

  const homeTabs = document.createElement('div');
  tabs.classList.add('home-tabs');
  const ourStaffTab = makeA('OUR STAFF', '#');
  const storeInfoTab = makeA('STORE INFO', '#');
  homeTabs.appendChild(ourStaffTab);
  homeTabs.appendChild(storeInfoTab);

  tabs.appendChild(categoryTabs);
  tabs.appendChild(homeTabs);

  // create the menu
  const menu = document.createElement('div');
  menu.classList.add('menu');
  const menuTitle = document.createElement('h1');
  menuTitle.textContent = 'ITEMS';
  menu.appendChild(menuTitle);
  menuContainer.appendChild(menu);

  console.log(createMenuItem(itemData[0]));

  const menuItems = new DocumentFragment();
  for (const i of itemData.slice(0, 150)) {
    const newItem = createMenuItem(i);
    menuItems.appendChild(newItem);
  }
  menu.append(menuItems);
}
