// List Row Data
function rowData(id) {
  if (id)
    return $('input:radio[id=' + id + ']');
  else {
    return $('tr td input:radio[name=favorit]:checked');
  }
}

// Sub Form Data Id
function formDataId() {
  return $('input:hidden[id=sub_id]');
}

// List row Label
function labelData(index, id) {
  return $('label[for=' + index + '] li[id=\'' + id + '\']');
}

// Sub Url Text
function urlInput() {
  return $('input[type=text][name=url]');
}
