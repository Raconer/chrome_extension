// get Data List
function getDataList() {
  var dataList = localStorage.getItem('WebDataList');
  return dataList;
}
// get Data
function getData(id) {
  return JSON.parse(getDataList('WebDataList')).filter(function(dataList){
    return dataList.id == id
  })[0];
}
