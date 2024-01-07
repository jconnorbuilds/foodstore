import { contentDiv, createDOMElement } from './home';
import {
  menuContainer,
  menuTitle,
  menu,
  sidebar,
  createMenuBase,
} from './menu-base';
import { createItemsMenu } from './menu-items';
import weaponData from './weapons-data.csv';

const weaponImagesContext = require.context(
  './img/weapons_icons/',
  false,
  /\.(webp|png|jpe?g)$/i
);

const weaponImageMap = weaponImagesContext.keys().reduce((acc, path) => {
  const filename = path
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '');
  acc[filename] = weaponImagesContext(path);
  return acc;
}, {});

function createWeaponEntry(data) {
  const [
    ,
    name,
    desc,
    ,
    quality,
    type,
    dps,
    magSize,
    ammoCap,
    damage,
    fireRate,
    reloadTime,
    shotSpeed,
    range,
    force,
    spread,
  ] = data;
  const filepath = weaponImageMap[name.replaceAll(' ', '_').replaceAll("'", '27')];

  // create containing divs for each part of the item entry
  const entry = createDOMElement('div', ['entry']);
  const entryName = createDOMElement('div', ['entry-name', 'entry-name-weapon']);
  const entryDescr = createDOMElement('p', ['description'], {}, desc);
  const entryDetailMain = createDOMElement('div', ['entry-detail']);
  const entryDetailSubTitle = createDOMElement('div', [
    'entry-detail-sub',
    'hidden',
  ]);
  const entryDetailSubVal = createDOMElement('div', ['entry-detail-sub', 'hidden']);
  const showHideDetails = createDOMElement(
    'div',
    ['show-hide-details'],
    {},
    'Show more details'
  );

  // add a div for item image and name
  const entryImg = createDOMElement('img', [], {
    src: filepath,
    alt: name + ' icon',
  });
  const entryTitle = createDOMElement('h3', [], {}, name);

  // add entry details
  const entryQualityTitle = createDOMElement('span', ['quality'], {}, 'Quality: ');
  const entryQualityVal = createDOMElement('span', ['val'], {}, quality);
  const entryTypeTitle = createDOMElement('span', ['type'], {}, 'Type: ');
  const entryTypeVal = createDOMElement('span', ['val'], {}, type);
  const entryDPSTitle = createDOMElement('span', ['dps'], {}, 'DPS: ');
  const entryDPSVal = createDOMElement('span', ['val'], {}, dps);
  const entryCapacityTitle = createDOMElement('span', ['dps'], {}, 'Capacity: ');
  const entryCapacityVal = createDOMElement(
    'span',
    ['val'],
    {},
    `Mag size:${magSize}, 
    Total capacity: ${ammoCap}`
  );
  const entryDamageTitle = createDOMElement('span', ['damage'], {}, 'Damage: ');
  const entryDamageVal = createDOMElement('span', ['val'], {}, damage);
  const entryFireRateTitle = createDOMElement(
    'span',
    ['fireRate'],
    {},
    'FireRate: '
  );
  const entryFireRateVal = createDOMElement('span', ['val'], {}, fireRate);
  const entryReloadTimeTitle = createDOMElement(
    'span',
    ['reload-time'],
    {},
    'ReloadTime: '
  );
  const entryReloadTimeVal = createDOMElement('span', ['val'], {}, reloadTime);
  const entryShotSpeedTitle = createDOMElement(
    'span',
    ['shot-speed'],
    {},
    'Shot Speed: '
  );
  const entryShotSpeedVal = createDOMElement('span', ['val'], {}, shotSpeed);
  const entryRangeTitle = createDOMElement('span', ['range'], {}, 'Range: ');
  const entryRangeVal = createDOMElement('span', ['val'], {}, range);
  const entryForceTitle = createDOMElement('span', ['force'], {}, 'Force: ');
  const entryForceVal = createDOMElement('span', ['val'], {}, force);
  const entrySpreadTitle = createDOMElement('span', ['spread'], {}, 'Spread: ');
  const entrySpreadVal = createDOMElement('span', ['val'], {}, spread);

  entryName.appendChild(entryImg);
  entryName.appendChild(entryTitle);
  entry.appendChild(entryName);
  entry.appendChild(entryDescr);

  const mainDetails = [
    entryQualityTitle,
    entryQualityVal,
    entryTypeTitle,
    entryTypeVal,
    entryDPSTitle,
    entryDPSVal,
  ];

  const subDetailsTitle = [
    entryCapacityTitle,
    entryDamageTitle,
    entryFireRateTitle,
    entryReloadTimeTitle,
    entryShotSpeedTitle,
    entryRangeTitle,
    entryForceTitle,
    entrySpreadTitle,
  ];

  const subDetailsVal = [
    entryCapacityVal,
    entryDamageVal,
    entryFireRateVal,
    entryReloadTimeVal,
    entryShotSpeedVal,
    entryRangeVal,
    entryForceVal,
    entrySpreadVal,
  ];

  for (const detail of mainDetails) {
    entryDetailMain.appendChild(detail);
  }
  for (const detail of subDetailsTitle) {
    entryDetailSubTitle.appendChild(detail);
  }
  for (const detail of subDetailsVal) {
    entryDetailSubVal.appendChild(detail);
  }

  entryDetailMain.appendChild(entryDetailSubTitle);
  entryDetailMain.appendChild(entryDetailSubVal);
  entry.appendChild(entryDetailMain);
  entry.appendChild(showHideDetails);

  entry.addEventListener('click', () => {
    entryDetailSubTitle.classList.toggle('hidden');
    entryDetailSubVal.classList.toggle('hidden');

    showHideDetails.textContent == 'Show fewer details'
      ? (showHideDetails.textContent = 'Show more details')
      : (showHideDetails.textContent = 'Show fewer details');
  });

  return entry;
}

export function createWeaponsMenu() {
  createMenuBase();
  contentDiv.classList.add('menus');

  menuTitle.textContent = 'WEAPONS';
  document.querySelector('a.items-tab').addEventListener('click', createItemsMenu);

  // create all menu items
  let menuItems = new DocumentFragment();
  // More items could be loaded from the CSV, but I haven't downloaded all the images...
  for (const i of weaponData) {
    if (i[0] == '') continue;
    const newItem = createWeaponEntry(i);
    menuItems.appendChild(newItem);
  }
  menu.append(menuItems);
  contentDiv.appendChild(menuContainer);
}
