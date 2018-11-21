$(document).ready(function() {

  // Page Load Event
  onLoadList();

  // Add BTN Event
  $('input[name=add]').on('click', function(data) {

    event.preventDefault();
    var list = readDataList();
    var id = "temp_" + $('#grid input').length;
    var parent = rowData();
    var pId = parent.attr('id');
    var level = parent.data('level');
    var state = parent.data('state');

    level = level?level : 0;
    pId = pId?pId : 0;

    formDataId().val(id);
    if(state&& state == 'dir'){
      level += 1;
    }
    var tempData = {
      id    : id,
      pId   : pId,
      level : level,
      state : 'url',
      name  : '',
      url   : '',
      describe:''
    };

    var selector = $('tbody');
    if(pId){
      selector = $('input:radio[name=favorit][id='+pId+']').parents('tr');
    }

    // 화면 셋팅
    subController(1);
    var html = dataGrid(tempData);
    selector.after(html);
    rowData(id).attr("checked", true);
    formDataSet(rowData(id));
  });

  // Data Setting Event
  $('input[name=set]').on('click', function(){
    event.preventDefault();

  //  localStorage.clear();
    var thisData = rowData();
    formDataSet(thisData);
    subController(1);
  });

  // Sub Cancel Event
  $('input[name=cancel]').on('click', function(data) {
    subController(0);
  });

  // Data Remove Event
  $('#default_form input[name=delete]').on('click', function() {

    var id = rowData().attr('id');

    rowData(id).parents('tr').remove();
    subController(0);
    remove(id);
  });

  // Data Save Event
  $('#default_form').on('submit', function() {
    event.preventDefault();
    var data = returnFormData($(this));
    if (formCheck(data)) {
      saveData(data);
    }
  });

  // State Change Event
  $('input:radio[name=state]').change(function(){
    // this.value == $(this).val()

    var id = formDataId().val();
    var state = this.value;

    labelData(id, 'state').text('('+state+')');

    if(state == 'url'){
      urlInput().css('display', 'block');
    }else if(state == 'dir'){
      urlInput().css('display', 'none');
    }
  });

  // Name Change Event
  $('input:text').on('input', function(){
    var id = formDataId().val();

    if(this.name == 'name'){
      labelData(id, 'name').text(this.value);
    }else if(this.name == 'url'){
      labelData(id, 'url').data('url', this.value);
    }
  });

  // Row Data Change Event
  $(document).on('change','input:radio[name=favorit]', function(){
    // after시 $('input:radio[name=favorit]').on('change', function(){ 안먹힘
    event.preventDefault();
    formDataSet($(this));
  });

});

// chrome 에서는  local이나 127같이 서버 주소로 시작 되는곳에서 cookie를 지원한다.
// 일반 폴더로 접근 해서는 chrom에서는 cookie를 지원하지 않는다.
// $.cookie("visits", 10);
// add Data Setting

/*var jsonData = {
                  name: "로컬 테스트 데이터 입력_test_1",
                  level: "1"
               };

saveData(jsonData);*/

/*
  localStorage 전부 읽어오기
  for (i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
  }
*/
/*
  $('input[name=save_button]').on('click', function(){
      var data = $('input[name=test_Text]').val();
      if(saveData(data)){
        console.log('saved Data');
      }
  });

  $('input[name=load_button]').on('click', function(){
    var data = readData();
    console.log(data == null ? false : true + '(' + data + ')' );
  });
*/
