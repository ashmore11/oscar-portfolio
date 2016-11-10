import Main from 'app/Main';

import 'styles/main';

document.addEventListener('DOMContentLoaded', () => {
  window.main = new Main(document.querySelector('#main'));
});
