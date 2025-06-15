import isBrowser from './isBrowser';

function isSmallScreen() {
  return isBrowser() && window.innerWidth < 768;
}

export default isSmallScreen;