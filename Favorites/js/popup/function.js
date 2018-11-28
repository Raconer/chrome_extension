// JSON Model
function defaultJson(id) {
  var defaultModel =   {
      id        :id?id:'',  // Primary Key (int)
      state     :0,         // 0:url, 1:dir
      level     :0,         // int
      name      :"",        // String
      url       :"",        // String
      describe  :""         // String
    };
  return defaultModel;
}

// Early List Setting
function onLoadList(){
  var localdataList = localStorage.getItem('WebDataList');
  var dataList = JSON.parse(localdataList);

  var listHtml = '';
  if (dataList) {
    listHtml = mkHtmlList(dataList);
  }
  $('.main').append(listHtml);
  interfaceSetting(true);
}

// convert dataList to html
function mkHtmlList(dataList){// dataList = json type

  var dataListHtml = '';
  var sul = '</ul>';
  var cnt = 0;
  for(var i = 0; i < dataList.length; i++){

    dataListHtml += mkHtmlData(dataList[i], '');

    if(i < dataList.length -1 ){
      if(dataList[i].level == dataList[i+1].level){
            dataListHtml += sul;
      }else if(dataList[i].level > dataList[i+1].level){
            for(var j = 0; j <= cnt ; j++){
              dataListHtml += sul;
            }
            cnt = 0;
      }else if(dataList[i].level < dataList[i+1].level){
        cnt++;
      }
    }else{
      dataListHtml += sul;
    }
  }
  return dataListHtml;
}

// convert data to html
function mkHtmlData(data, end) { // data id, data name, last add string
  var ul ='<ul>';
  var li ='<li>', sli = '</li>';
  var input = "<input type='radio' id='"+ data.id +"' name='list' data-state='"+data.state+"' data-level='"+data.level+"'>";
  var label = "<label for='"+data.id+"' data-url='"+data.url+"'>"+ (data.state == 1?'(dir)':'(url)') + data.name +"</label>";
  var dataHtml = ul + li + input + label + sli + end;

  return dataHtml;
}

// sub data Setting
function subDataSetting(id, isNew) { // id, isNew(newData : true, existing data : false)

  var data = getData(id);

  if(isNew){
    data = defaultJson();
    data.id = id;
  }

  $('.sub').load('./sub.html', data, function() {
    $('#sub_id').val(data.id);
    $('#sub_title').val(data.name);
    $('#sub_url').val(data.url);
    $('#sub_des').val(data.describe);
    if(isNew){
      $('#cancel').remove();
    }
  });
}

// sub detch
function subDetach() {
  $('.sub_center').detach();
}
// interface show
function interfaceSetting(screen) {
  if(screen){
      $('.interface').load('./interface.html');
  }else{
    $('.interface_div').detach();
  }
}

// Id reset
function resetId() {
  var newId;
  $('input:radio[name=list]').each(function(index){
    var id = index + 1;
    if(!$(this).attr('id')){
      newId = id;
    }
    $(this).attr('id', id);
    $(this).siblings('label').attr('for', id);
  });

  return newId;
}

// radio check with id
function radioCheck(id) {
  $("input:radio[id='"+id+"']").attr('checked', true);
}

// Insert Data
function saveData(data) {
  var dataList = getDataList();
  var outLength = outPutLength();

  var i = 0;
  if(dataList){
    var isSaveInsert = dataList.length - outLength;
    dataList.splice(data.id - 1 , (isSaveInsert + 1), data);
    dataList.forEach(function(data){
      data.id = ++i;
    });
  }else{
    dataList = [];
    dataList.push(data);
  }
  setDataList(dataList);
}

// for data convert json
function formDataSet(formData){
  var data = formData.serializeArray();
  var tempData = {};
  for(var i = 0; i <  data.length; i++){
    tempData[data[i].name] = data[i].value;
  }
  return tempData;
}

// sub-off, interface-on
function interfaceMode() {
  subDetach();
  interfaceSetting(true);
}

// radio list disable
function listDisabled(isDisabled) {
    getList().prop("disabled", isDisabled);
}
