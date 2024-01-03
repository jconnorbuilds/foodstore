import logo from './img/etglogo.png';
import showItemsMenu from './menu-items';

export const contentDiv = document.querySelector('div#content');

export function makeA(text, url) {
  const aTag = document.createElement('a');
  aTag.setAttribute('href', url);
  aTag.textContent = text;
  return aTag;
}

export default function home() {
  contentDiv.classList.remove('menus');
  contentDiv.classList.add('home');

  const logoImg = new Image();
  logoImg.src = logo;
  logoImg.alt = 'Enter the Gungeon logo';

  const homeTabs = document.createElement('div');
  homeTabs.classList.add('home-tabs');

  const menuTab = makeA('MENU', '#');
  menuTab.addEventListener('click', showItemsMenu);
  const staffTab = makeA('OUR STAFF', '#');

  homeTabs.appendChild(menuTab);
  homeTabs.appendChild(staffTab);
  contentDiv.appendChild(logoImg);
  contentDiv.appendChild(homeTabs);
}
