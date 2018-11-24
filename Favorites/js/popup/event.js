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
                        {"state":1,"id":1,"name":"1111111","url":"1111111","describe":"1111111","level":0},
                        {"state":0,"id":2,"name":"2222222","url":"2222222","describe":"2222222","level":1},
                        {"state":0,"id":3,"name":"3333333","url":"3333333","describe":"3333333","level":1},
                        {"state":0,"id":4,"name":"4444444","url":"4444444","describe":"4444444","level":1},
                        {"state":1,"id":5,"name":"5555555","url":"5555555","describe":"5555555","level":0},
                        {"state":1,"id":6,"name":"6666666","url":"6666666","describe":"6666666","level":1},
                        {"state":1,"id":7,"name":"7777777","url":"7777777","describe":"7777777","level":2},
                        {"state":0,"id":8,"name":"8888888","url":"8888888","describe":"8888888","level":3},
                        {"state":0,"id":9,"name":"9999999","url":"9999999","describe":"9999999","level":0},
                      ]
    localStorage.setItem('WebDataList', JSON.stringify(dataList));
  });

  $('#vertualDatadelete').on('click', function(){
    localStorage.removeItem('WebDataList');
  });

  $('label').on('click', function(){
    // var id = $(this).attr('for');
    // getData(id);
  });

  // Data Setting Event
  $(document).on('click','input:button[name=set]', function(){
    var checkDataId = getRadioID();
    if(checkDataId){
      subDataSetting(checkDataId, false);
    }else{
      alert("check data");
    }
  });

  // Data Add Event
  $(document).on('click', 'input:button[name=add]', function(){
    var checkDataId = getRadioID();
    /* 하위 일경우 append*/
    /* 같은 레벨일경우 after*/
    if(checkDataId){
      getUl(checkDataId).after(mkHtmlData(defaultJson(),'</ul>'));
      var newDataId = resetId();
      getUl(newDataId).css('zoom', 1.2);
      radioCheck(newDataId);
      subDataSetting(newDataId, true);
      wrapWindowByMask();
    }else{
      alert("check data");
    }

  });
});
