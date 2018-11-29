$(document).ready(function() {
/*
  {
    "state"     :0,         // 0:url, 1:dir
    "id"        :9,         // Primary Key (int)
    "name"      :"9999999", // String
    "url"       :"9999999", // String
    "describe"  :"9999999", // String
    "level"     :0          // int
  }
*/
  // 화면 데이터 출력
  onLoadList();

  $('#vertualDataList').on('click', function(){
    var dataList = [
                        {"id":1, "state":1, "name":"1111111", "url":"1111111", "describe":"1111111", "level":0, "open": 1},
                        {"id":2, "state":0, "name":"2222222", "url":"2222222", "describe":"2222222", "level":1, "open": 0},
                        {"id":3, "state":0, "name":"3333333", "url":"3333333", "describe":"3333333", "level":1, "open": 0},
                        {"id":4, "state":0, "name":"4444444", "url":"4444444", "describe":"4444444", "level":1, "open": 0},
                        {"id":5, "state":1, "name":"5555555", "url":"5555555", "describe":"5555555", "level":0, "open": 1},
                        {"id":6, "state":1, "name":"6666666", "url":"6666666", "describe":"6666666", "level":1, "open": 1},
                        {"id":7, "state":1, "name":"7777777", "url":"7777777", "describe":"7777777", "level":2, "open": 0},
                        {"id":8, "state":0, "name":"8888888", "url":"8888888", "describe":"8888888", "level":3, "open": 0},
                        {"id":9, "state":0, "name":"9999999", "url":"9999999", "describe":"9999999", "level":0, "open": 0},
                      ];
    localStorage.setItem('WebDataList', JSON.stringify(dataList));
  });

  $('#vertualDatadelete').on('click', function(){
    localStorage.removeItem('WebDataList');
  });

  $("ul li input:radio[name=list] + label").dblclick(function(){
    if(!getSibling($(this)).data('state')){
      window.open($(this).data('url'),'_blank');
    }else{
      var id = getSibling($(this)).attr('id');
      var open = 'none';
      var data = getData(id);
      if(data.open == 1){
        data.open = 0;
      }else{
        data.open = 1;
        open = 'block';
      }
      getUl(id).children('ul').css('display', open);
      saveData(data);
    }
  });

  $(document).on('change', 'input:radio[name=list]', function(){
    var data = getData(this.id);
    if(!data.state){
      $('#sub_id').val(data.id);
      $('#sub_title').val(data.name);
      $('#sub_url').val(data.url);
      $('#sub_des').val(data.describe);
    }
  });

  // Data Setting Event
  $(document).on('click', 'input:button[name=set]', function(){
    var data = defaultJson();
    var checkDataId = getRadioID();
    if(checkDataId){
      data.id = checkDataId;
      subDataSetting(data, false);
      interfaceSetting(false);
    }else{
      alert("check data");
    }
  });

  // Data Add Event
  $(document).on('click', 'input:button[name=add]', function(){
    var checkDataId = getRadioID();
    var newDataId = '';
    var state =  getInput(checkDataId).data('state');
    var level = getInput(checkDataId).data('level');
    var data = defaultJson();

    chrome.tabs.getSelected(null, function(tab){
      data.url = tab.url;
      data.name = tab.title;
    });

    if(checkDataId){
      if(state){/* 하위 일경우 append */
        data.level = level + 1;
        getUl(checkDataId).append(mkHtmlData(data,'</ul>'));
      }else{ /* 같은 레벨일경우 after */
        data.level = level;
        getUl(checkDataId).after(mkHtmlData(data,'</ul>'));
      }
    }else{
      $('.main').append(mkHtmlData(data,'</ul>'));
    }

    newDataId = resetId();
    data.id = newDataId;
    radioCheck(newDataId);
    listDisabled(true);
    subDataSetting(data, true);
    interfaceSetting(false);
  });

  // save event
  $(document).on('submit', '#sub_form', function(){
    var data = formDataSet($(this));
    var saveDataJSON = defaultJson(data.sub_id);

    saveDataJSON.describe = data.sub_describe;
    saveDataJSON.name = data.sub_title;
    saveDataJSON.url = data.sub_url;
    saveDataJSON.state = data.sub_state;
    saveDataJSON.level = getInput(saveDataJSON.id).data('level');

    saveData(saveDataJSON);

  });

  // sub_cancel
  $(document).on('click', 'input:button[id=cancel]', function(){
    interfaceMode();
  });

  // sub_delete event
  $(document).on('click', 'input:button[id=sub_del]', function(){
    var id = subId();
    var parent = getInput(id).parents('ul').eq(0);
    parent.remove();
    remove(id);
    resetId();
    listDisabled(false);
    interfaceMode();
  });

  $(document).on('input', 'input:text', function(){
    var inputName = this.name;
    var id = $(this).siblings('input#sub_id').val();
    if(inputName == 'sub_title'){
      $("label[for="+id+"]").html(getDataTitle());
    }else if(inputName == 'sub_url'){
      $("label[for="+id+"]").data('url', this.value);
    }
  });

  $(document).on('change', 'input:radio[name=sub_state]', function(){
    var state = getDataState(this.value);
    var id = subId();
    $("label[for="+id+"]").html(getDataTitle());
  });
});
