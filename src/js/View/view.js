export default class View{
  //Elements
_operationHeader = document.querySelector('.operation-header');
_operations = document.querySelectorAll('.operation');
_operationContents = document.querySelectorAll('.operation-content');
_dropdownCm = document.querySelector('.cm-dropdown');
_dropdownpd = document.querySelector('.pd-dropdown');
_allSections = document.querySelectorAll('.section');
_toggleMenu = document.querySelector('.toggle-menu-container');
_data;

render(data){
  if(!data) return;
  this._data = data;
  this.clear();
  this.bookHandler();
  this.handlerLeaflet();
}

clear(){
  this._parentElement.innerHTML = '';
}

updateData(data){
  if(!data) return;
  this._data = data;
  this.clear();
  this.bookHandler();
  handlerLeaflet();
}

renderSpinner(){
  const markup = `<div class="spinner-el"><i class="fa-solid fa-spinner fa-spin"></i></div>`;
  this.clear();
  this._parentElement.insertAdjacentHTML('afterbegin', markup);
}

}