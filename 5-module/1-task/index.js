function hideSelf() {
  let btnToHide = document.querySelector('.hide-self-button');
  btnToHide.addEventListener('click', () => btnToHide.setAttribute('hidden', 'true'));
}
