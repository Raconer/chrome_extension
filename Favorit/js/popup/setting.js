// Save Data
function saveData(data) {
  /*var jsonData = {
                    name: "로컬 테스트 데이터 입력_test_1",
                    level: "1"
                 };*/
  var curData = $('input:radio[id='+data.id+']');
  var fakeId = data.id;
  var dataList = readDataList();
  var length = dataList.length;
  var id = 0;
  if(length > 0){
    id = (dataList[dataList.length - 1].id + 1 );
  }
  data.id = id;
  data.level = curData.data('level');
  data.pId = curData.data('pid');

  dataList.push(data);
  saveDataList(dataList);

  curData.attr('id', id);
  curData.siblings('label').attr('for', id);
  subController(1, data);

  alert('save sucess');
}

// Save Data List
function saveDataList(dataList){
  localStorage.setItem('WebDataList', JSON.stringify(dataList));
}


// Read Data List
function readDataList() {
  var data = JSON.parse(localStorage.getItem('WebDataList'));
  var dataList = [];
  if (data != null) {
    dataList = dataList.concat(data);
  }
  return dataList;
}

// Read Data
function readData(filterId){
  var dataList = readDataList();
  var data = dataList.filter(function (el) {
      return (el.id == filterId);
  });
  return data[0];
}

// Data Remove
function remove(removeId){
    var dataList = readDataList();
    var index = dataList.findIndex(function(data){

      return data.id == removeId;
    });
    if(index >= 0){
      dataList.splice(index, 1);
      saveDataList(dataList);
    }
}
