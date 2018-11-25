function getRadioID() {
  return $('input:radio[name=list]:checked').attr('id');
}

function getInput(id) {
  return $("input:radio[name=list][id='"+id+"']");
}

function getUl(id) {
  return getInput(id).closest('ul');
}
