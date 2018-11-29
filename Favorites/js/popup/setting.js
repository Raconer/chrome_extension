// get Data List
function getDataList() {
  var dataList = localStorage.getItem('WebDataList');
  return JSON.parse(dataList);
}
// get Data
function getData(id) {

  var dataList = getDataList();
  var data = defaultJson();
  if(dataList){
    data = dataList.filter(function(dataList){
      return dataList.id == id;
    })[0];
  }
  return data;
}

// save Data List
function setDataList(dataList){
  localStorage.setItem('WebDataList', JSON.stringify(dataList));
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

// Data Remove
function remove(removeId){
    var dataList = getDataList();
    var i = 0;
    var index = dataList.findIndex(function(data){
      return data.id == removeId;
    });

    if(index >= 0){
      dataList.splice(index, 1);
      dataList.forEach(function(data){
        data.id = ++i;
      });
      setDataList(dataList);
    }
}
