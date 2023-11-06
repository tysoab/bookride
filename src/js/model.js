import { API_URL } from "./config.js";
import { getCountry, getJSON, getPosition } from "./helper.js";

export const state = {
  bookRide: {}
};

const storageBookRide = function(){
  localStorage.setItem('bookRide', JSON.stringify(state.bookRide));
}

export const LoadLocation = async function(data = {}){
  try{
    const countryData = await getCountry(); 
    const resFrom = await getJSON(`${API_URL}${data.fromLocation} ${countryData.countryName}`);
    if(!resFrom) return;
    const fromLocation = [resFrom[0].lat, resFrom[0].lon];

    const resTo = await getJSON(`${API_URL}${data.toDestination} ${countryData.countryName}`);
    if(!resTo) return;
    const toDestination = [resTo[0].lat, resTo[0].lon];

    state.bookRide.id = '1234567890';
    state.bookRide.fromLocation = fromLocation;
    state.bookRide.toDestination = toDestination;
    state.bookRide.locationName = data.fromLocation;
    state.bookRide.destinationName = data.toDestination;
    storageBookRide();
    console.log(resFrom, resTo, countryData.countryName, data)

  }catch(err){
    console.error(err.message);
  }
}

const getLocalStorage = function(){
  const storage = JSON.parse(localStorage.getItem('bookRide'));
  if(!storage){
    state.bookRide = {
      destinationName: '',
      locationName: ''
     }
     return;
  }
  state.bookRide = storage;
}
getLocalStorage();