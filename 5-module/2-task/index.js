function toggleText() {
  let btnToHideText = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');

  btnToHideText.addEventListener('click', () => {
    if (text.getAttribute('hidden')) {
      text.removeAttribute('hidden');
    } else {
      text.setAttribute('hidden', 'true');
    }
  })
}
