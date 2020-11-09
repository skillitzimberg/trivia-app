function setInnerHTML(elementId, newHTML) {
  const elem = document.getElementById(elementId);
  elem.innerHTML = newHTML;
}

exports.setInnerHTML = setInnerHTML;
