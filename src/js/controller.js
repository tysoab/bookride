import * as model from './model.js';
import PageNavigation from "./View/pageNavigation.js";
import BookRideView from "./View/bookRideView.js";
//import { sample } from './View/sample.js';

const controlBooked = function(){
  BookRideView.renderSpinner();
  setTimeout(()=>{
    if(!model.state.bookRide){
     return;
    }
    BookRideView.render(model.state.bookRide);
  }, 5000);
 
}
const controlBookRide = async function(data){
  try{
    BookRideView.renderSpinner();
    await model.LoadLocation(data);
    BookRideView.updateData(model.state.bookRide);
    console.log(model.state)
  }catch(err){
    console.error(err);
  }
}

const init = function(){
  PageNavigation.addHandlerToggle();
  BookRideView.addHandlerRender(controlBooked);
  BookRideView.addHandlerBookRide(controlBookRide);
};
init();