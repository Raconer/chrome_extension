function getRadioID() {
  return $('input:radio[name=list]:checked').attr('id');
}

function getInput(id) {
  return $("input:radio[name=list][id='"+id+"']");
}

function getList(){
  return $('input:radio[name=list]');
}

function getUl(id) {
  return getInput(id).closest('ul');
}

function subId() {
  return $('input:hidden[name=sub_id]').val();
}

function subTitle() {
  return $('input:text[name=sub_title]').val();
}

function subState() {
  return $('input:radio[name=sub_state]:checked').val();
}

function outPutLength() {
  return $('.main input:radio[name=list]').length;
}

function getSibling(curLabel) {
  return curLabel.siblings('input:radio[name=list]');
}

function getChild(id){
  var child = jQuery.makeArray(getUl(id).find('input'))
  var childId = []
  for(var i in child){
    childId.push(child[i].id)
  }
  return childId
}
