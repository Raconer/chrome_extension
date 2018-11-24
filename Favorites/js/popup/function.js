function defaultJson() {
  var defaultModel =   {
      id        :'',         // Primary Key (int)
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
    listHtml = mkHtmlList(dataList)
  }
  $('.main').append(listHtml);
  $('.interface').load('./interface.html');
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
  var input = "<input type='radio' id='"+ data.id +"' name='list' data-state='"+data.state+"'>"
  var label = "<label for='"+data.id+"'>"+ (data.state?'(dir)':'(url)') + data.name +"</label>"
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
  });
}

// Id reset
function resetId() {
  var newId;
  $('input:radio[name=list]').each(function(index){
    var id = index + 1;
    console.log($(this).attr('id'));
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

// div block
function wrapWindowByMask(){
        //화면의 높이와 너비를 구한다.
        var maskHeight = $('.main').height();
        var maskWidth = $(window).width();

        //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
        $('#mask').css({'width':maskWidth,'height':maskHeight});

        //애니메이션 효과
        $('#mask').fadeIn(1000);
        $('#mask').fadeTo("slow",0.8);
}
