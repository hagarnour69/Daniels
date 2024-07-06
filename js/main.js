"use strict";
//^First day variable
let dayElement = document.querySelector("#day");
let dayNumElement = document.querySelector("#date");
let monthElement=document.querySelector("#month");
let cityElement = document.querySelector("#city");
let tempElement = document.querySelector("#temperture");
let imageElement = document.querySelector("#weatherImage");
let statusElement = document.querySelector("#status");
let humdityElement = document.querySelector("#humdity");
let windElement = document.querySelector("#wind");
let directionElement = document.querySelector("#direction");
//^next days varibles
let nextDayElement=document.getElementsByClassName("nextDay");
let nextDayImageElement=document.getElementsByClassName("tomorrow-img");
let nextDayTempElement=document.getElementsByClassName("nextDayTemperture");
let nextMinTempElement=document.getElementsByClassName("nextmin_c");
let nextDaystatus=document.getElementsByClassName("nextDaystaus");
//^realTimeSearch
let searchInputElement=document.querySelector("#searchInput");
let searchButtonElement=document.querySelector("#search");
//get data from api
async function getData(cityName) {
  let WeatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=d1842c83b6de4e20a32200339242106&q=${cityName}&days=3`
  );
  let weatherData = await WeatherResponse.json();
  return weatherData;
  //   console.log(weatherData);
}

//^display today data
function displayTodayData(data) {
  let { name,localtime } = data.location;
  let { temp_c, wind_dir, humidity, wind_kph } = data.current;
  let { text, icon } = data.current.condition;
  cityElement.innerHTML = name;
  tempElement.innerHTML = temp_c;
  humdityElement.innerHTML = humidity + "%";
  windElement.innerHTML = wind_kph;
  directionElement.innerHTML = wind_dir;
  statusElement.innerHTML = text;
  imageElement.setAttribute("src", `https://${icon}`);
  let date=new Date(localtime);
dayElement.innerHTML=date.toLocaleDateString('en-US',{weekday:"long"});
dayNumElement.innerHTML=date.toLocaleDateString('en-US',{day:"2-digit"});
monthElement.innerHTML=date.toLocaleDateString('en-US',{month:"long"});
}
//^display otherdays data
function displayotherData(data,i) 
{
let{date}=data.forecast.forecastday[i];
let{maxtemp_c,mintemp_c,condition}=data.forecast.forecastday[i].day;
let{text,icon}=condition;
let nextDay=new Date(date);
nextDayElement[i].innerHTML=nextDay.toLocaleDateString("en-Us",{weekday:"long"})
nextDayImageElement[i].setAttribute("src", `https://${icon}`);
nextDayTempElement[i].innerHTML=maxtemp_c;
nextMinTempElement[i].innerHTML=mintemp_c;
nextDaystatus[i].innerHTML=text;
}

//!run allfunctions
async function fire(city='cairo') {
  let weatherData = await getData(city);
  displayTodayData(weatherData);
  displayotherData(weatherData,0);
  displayotherData(weatherData,1);
}
fire();
searchButtonElement.addEventListener('click',function()
{
  console.log(searchInputElement.value)
  fire(searchInputElement.value)
}
)