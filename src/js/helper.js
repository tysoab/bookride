import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function(url){
    try{
      const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
      const data = await res.json();
      if(!res.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
    }
    catch(err){
      throw err;
    }
  };

  const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  export const getCountry = async function(){
    try{
      const pos = await getPosition();
      const {latitude: lat, longitude: lng} = pos.coords;
      const country = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
      const countryData = await country.json();
      return countryData;
    }
    catch(err){
      throw err;
    }
  }