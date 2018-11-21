// load Data Setting
function onLoadList() {
  var dataList = readDataList();
  var html = "";


  for (var i = 0; i < dataList.length; i++) {
    html += dataGrid(dataList[i]);
  }
  $('tbody').after(html);
  if (dataList.length > 0) {
    $('input:radio[id=' + dataList[0].id + ']').attr("checked", true);
  }
}

// data convert html
function dataGrid(data) {
  var tableStringPre = '<tr><td><input type=\'radio\' id=\'' + data.id + '\' name="favorit" data-level=\'' + data.level + '\' data-pid=\'' + data.pId + '\'  data-state= \'' + data.state + '\' class="none" ><label for=\'' + data.id + '\' title=\'' + data.describe + '\'>';
  var favorit = '<ul><li id=\'level\'>' + levelConvert(data.level) + '</li><li id=\'state\'>(' + data.state + ')</li><li id=\'name\' data-url=\'' + data.url + '\'>' + data.name + '</li>';
  var tableStringPost = '</label></td></tr>';
  return tableStringPre + favorit + tableStringPost;
}

// level division
function levelConvert(level) {
  var dataLevel = "-";
  for (var i = 0; i < level; i++) {
    //data += '&nbsp;'
    dataLevel += '-';
  }
  return dataLevel;
}

// Form Data convert Json
function returnFormData(form) {
  // serializeArray form요소를 name과 value로 인코딩
  var formData = form.serializeArray();
  var returnJsonData = {};
  for (var i = 0; i < formData.length; i++) {
    returnJsonData[formData[i].name] = formData[i].value;
  }

  if (returnJsonData.state == 'dir') {
    delete returnJsonData.url;
  }

  return returnJsonData;
}

// Invalid check
function formCheck(jsonFormData) {

  var data = "";
  var result = true;
  var key = Object.keys(jsonFormData);

  for (var i = 0; i < key.length; i++) {
    if (jQuery.isEmptyObject(jsonFormData[key[i]])) {
      data += key[i] + ",";
      result = false;
    }
  }
  if (!result) {
    alert('Please Check Data(' + data.slice(0, -1) + ')');
  }

  return result;
}

// Setting Sub
function formDataSet(thisData) {

  var curThis = thisData.siblings('label');
  var url = curThis.find('li[id=name]').data('url');
  var title = curThis.attr('title');

  $('#default_form input[name=id]').val(thisData.attr('id'));
  $('#default_form input[name=name]').val(curThis.find('li[id=name]').text());
  $('#default_form input[name=url]').val(url);
  $('#default_form input[name=describe]').val(title);
}

// Sub State
function subController(state) {
  var sub = $('.sub');
  var interface = $('.interface');
  if (state == 1) {
    sub.css('display', 'inline-table');
    interface.css('display', 'none');
  } else if (state == 0) {
    sub.css('display', 'none');
    interface.css('display', 'table-cell');
  }
}
