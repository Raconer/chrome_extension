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
      return dataList.id == id
    })[0];
  }
  return data;
}


function setDataList(dataList){
  localStorage.setItem('WebDataList', JSON.stringify(dataList));
}
