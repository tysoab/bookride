import View from "./view.js";
import L from 'leaflet';

class BookRideView extends View{
// _parentElement = document.querySelector('.form-book-ride');
// _bookListContainer = document.querySelector('.booklist-item');
_parentElement = document.querySelector('.operation-content-3');
_parentElementMap = document.querySelector('#map-section');
_bookDesc = document.querySelector('.book-desc');

addHandlerRender(handler){
  window.addEventListener('load', handler)
}

bookHandler(){
  if(!this._data) return;
  this._clear();
  this._parentElement.insertAdjacentHTML('afterbegin', this._generateMarkupList());
  this._generateFormMarkup();
  this._showform();
}

_generateMarkupList(){
  return `
    <h2 class="book-desc">Booked ride...</h2>
    <div>
    <p>From: ${this._data.locationName}</p>
    <p>To: ${this._data.destinationName}</p>
    </div>
    <div class="bookList-link">
    <a class="btn-bookList" href="#map-section">View Map</a>
    <button class="btn-newRide">New Ride</button>
    </div>
  `;
}

_showform(){
const btn = this._parentElement.querySelector('.btn-newRide');
btn.addEventListener('click', ()=>{
  this._clear();
  this._parentElement.insertAdjacentHTML('afterbegin', this._generateFormMarkup());
  console.log(this._parentElement)
})
}

_clear(){
  this._parentElement.innerHTML = '';
}

_generateFormMarkup(){
  return `
    <h2 class="book-desc">Request a ride now</h2>
      <form action="" class="form-book-ride">
      <div class="form-container">
        <li>
          <input type="text" class="pickup-location" name="fromLocation" placeholder="pickup location: bustop city">
        </li>
        <li>
          <input type="text" class="destination" name="toDestination" placeholder="destination: bustop city">
        </li>
      </div>
      <button class="btn submit-form">Request now</button>
      <a href="#" class="schedule-btn">Schedule for later</a>
    </form>
  `;
};

_generateMapMarkup(){
  this._parentElementMap.innerHTML = '';
  this._parentElementMap.insertAdjacentHTML('afterbegin', '<div id="map"></div>');
  this.handlerLeaflet();
}


addHandlerBookRide(handler){
  
  this._parentElement.addEventListener('submit', (e)=>{
   const btn = e.target.closest('.form-book-ride');
    if(!btn) return;
    e.preventDefault();
    const data = Object.fromEntries([...new FormData(btn)]);
    console.log(btn);
    document.querySelectorAll('input').forEach(input => input.value = '');
    handler(data);
  })
}

handlerLeaflet(){
  // Creating map options
  let mapOptions = {
  center: this._data.fromLocation,
  zoom: 10
  }
  let map = new L.map('map', mapOptions); // Creating a map object
  // Creating a Layer object
  let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  map.addLayer(layer);      // Adding layer to the map
  // Creating markers
  let fromLocation = new L.Marker(this._data.fromLocation).bindPopup(L.popup({
  maxWidth: 250,
  minWidth: 100,
  autoClose: false,
  closeOnClick: false
  }))
.setPopupContent('From: Igando')
.openPopup();
  let toDestination = new L.Marker(this._data.toDestination).bindPopup(L.popup({
  maxWidth: 250,
  minWidth: 100,
  autoClose: false,
  closeOnClick: false
  }))
.setPopupContent('To: Ikoyi')
.openPopup();
  // Creating latlng object
  let latlngs = [this._data.fromLocation, this._data.toDestination];
  // Creating a polygon
  let polygon = L.polygon(latlngs, {color: 'blue'});
  // Creating layer group
  let layerGroup = L.layerGroup([fromLocation, toDestination, polygon]);
  layerGroup.addTo(map)   // Adding layer group to map
}

};

export default new BookRideView();