import * as model from './model.js';
import PageNavigation from "./View/pageNavigation.js";
import BookRideView from "./View/bookRideView.js";
//import { sample } from './View/sample.js';

const controlBooked = function(){
  BookRideView.renderSpinner();
  setTimeout(()=>{
    BookRideView.render(model.state.bookRide);
  }, 5000);
 
}
const controlBookRide = async function(data){
  try{
    BookRideView.renderSpinner();
    await model.LoadLocation(data);
    BookRideView.updateData(model.state.bookRide);
  }catch(err){
    <p>err.message</p>
  }
}

const init = function(){
  PageNavigation.addHandlerToggle();
  BookRideView.addHandlerRender(controlBooked);
  BookRideView.addHandlerBookRide(controlBookRide);
};
init();