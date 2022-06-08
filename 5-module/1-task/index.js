function hideSelf() {
  let buttonHide = document.querySelector('.hide-self-button');
  buttonHide.onclick = function() {
    buttonHide.setAttribute('hidden', 1);
  }
}
