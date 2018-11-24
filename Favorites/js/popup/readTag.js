function getRadioID() {
  return $('input:radio[name=list]:checked').attr('id');
}

function getUl(id) {
  return $("input:radio[name=list][id='"+id+"']").closest('ul');
}
