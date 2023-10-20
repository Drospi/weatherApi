import { useState } from "react";
import "./App.css";
import { Week } from "./components/Week";
import { Sidebar } from "./components/Sidebar";
import { Highlights } from "./components/Highlights";
import { useEffect } from "react";

function App() {
  const [grade, setGrade] = useState('&units=metric')
  const [city, setCity] = useState('lima')
  const [weather, setWeather] = useState(null)
  const [disable, setDisable] = useState('Sidebar disable')
  const [currentLocation, setCurrentLocation] = useState(null)
  useEffect(()=>{
    const getDatos = async ()=>{
      const res = await fetch('https://ipinfo.io/json?token=7a6e3f4479e2e8')
      const data = await res.json();
      setCurrentLocation(data.city);
    }
    getDatos()
  },[])

  useEffect(()=>{
    const getDatos = async ()=>{
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=58587fb136c05c60d9eff16a7ec0dc2d${grade}`
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data)
      
    }
    getDatos()
    

  },[city,grade])

  const obtenerFecha =(partesFecha)=>{
    var fecha = new Date(partesFecha);

    var diasSemana = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    
    var diaSemana = diasSemana[fecha.getUTCDay()];
    var diaMes = fecha.getUTCDate();
    var mes = meses[fecha.getUTCMonth()];
    
    var fechaFormateada = diaSemana + ', ' + diaMes + ' ' + mes;
    return fechaFormateada
  }
  var partesFecha = weather?.list[0].dt_txt.split(" ");
  var fechaFormateada = obtenerFecha(partesFecha)
  var partesFecha2 = weather?.list[15].dt_txt.split(" ");
  var fechaFormateada2 = obtenerFecha(partesFecha2)
  var partesFecha3 = weather?.list[23].dt_txt.split(" ");
  var fechaFormateada3 = obtenerFecha(partesFecha3)
  var partesFecha4 = weather?.list[31].dt_txt.split(" ");
  var fechaFormateada4 = obtenerFecha(partesFecha4)
  var partesFecha5 = weather?.list[39].dt_txt.split(" ");
  var fechaFormateada5 = obtenerFecha(partesFecha5)


var tempMax1 = 0
var tempMin1 = 10000
for(let i=1; i<=7;i++){
  var temp = weather?.list[i].main.temp_max
  var tempM = weather?.list[i].main.temp_min
  if(temp>tempMax1){
    tempMax1 = temp
  }
  if(tempM<tempMin1){
    tempMin1 = tempM
  }
}
var tempMax2 = 0
var tempMin2 = 10000
for(let i=7; i<=15;i++){
  var temp1 = weather?.list[i].main.temp_max
  var tempM1 = weather?.list[i].main.temp_min
  if(temp1>tempMax2){
    tempMax2 = temp1
  }
  if(tempM1<tempMin2){
    tempMin2 = tempM1
  }
}
var tempMax3 = 0
var tempMin3 = 10000
for(let i=15; i<=23;i++){
  var temp2 = weather?.list[i].main.temp_max
  var tempM2 = weather?.list[i].main.temp_min
  if(temp2>tempMax3){
    tempMax3 = temp2
  }
  if(tempM2<tempMin3){
    tempMin3 = tempM2
  }
}
 var tempMax4 = 0
 var tempMin4 = 10000
 for(let i=23; i<=31;i++){
   var temp3 = weather?.list[i].main.temp_max
   var tempM3 = weather?.list[i].main.temp_min
   if(temp3>tempMax4){
     tempMax4 = temp3
   }
   if(tempM3<tempMin4){
     tempMin4 = tempM3
   }
 }
 var tempMax5 = 0
 var tempMin5 = 10000
 for(let i=31; i<=39;i++){
   var temp4 = weather?.list[i].main.temp_max
   var tempM4 = weather?.list[i].main.temp_min
  if(temp4>tempMax5){
    tempMax5 = temp4
  }
  if(tempM4<tempMin5){
    tempMin5 = tempM4
  }
}

document.documentElement.style.setProperty('--percentage',weather?.list[0].main.humidity)
document.documentElement.style.setProperty('--coords',`${weather?.list[0].wind.deg}deg`)
const handleViento = (d)=>{
  var direcciones = ["N","NNE", "NE", "ENE","E","ESE", "SE",'SSE', "S",'SSW', "SW",'WSW', "W",'WNW', "NW",'NNW'];
  var indice = Math.round((d % 360) / 22.5);
  var direccion = direcciones[indice % 16];
  return direccion;
}
var d = weather?.list[0].wind.deg
var dir = handleViento(d)
  return (
    <>
      <div className="main">
        <Sidebar grade={grade} setCity={setCity} disable={disable} setDisable={setDisable}></Sidebar>
        <div className="sidebar_weather">
          <div className="nav_main">
            <button onClick={()=>setDisable('Sidebar')}>Search for places</button>
            <button onClick={()=>setCity(currentLocation)} className="my_location">
              <span className="material-symbols-outlined">my_location</span>
            </button>
          </div>
          <img src={`../img/${weather?.list[0].weather[0].icon}.png`} alt="" />
          <h1>{parseInt(weather?.list[0].main.temp)}°<span className="c">{grade=='&units=imperial'?'F':'C'}</span></h1>
          <h3>{weather?.list[0].weather[0].main}</h3>
          <div className="about">
            <p>Today • {fechaFormateada}</p>
            <p>
              <span className="material-symbols-outlined">location_on</span> {weather?.city.name}
            </p>
          </div>
        </div>
        <div>
          <div className="grades">
            <button onClick={()=>setGrade('&units=metric')} className="grade">°C</button>
            <button onClick={()=>setGrade('&units=imperial')} className="grade">°F</button>
          </div>
          <div className="week"> 
            <Week max={parseInt(tempMax1)} min={parseInt(tempMin1)} grade={grade} fecha='Tomorrow' img={`../public/img/${weather?.list[7].weather[0].icon}.png`}></Week>
            <Week max={parseInt(tempMax2)} min={parseInt(tempMin2)} grade={grade} fecha={fechaFormateada2} img={`../public/img/${weather?.list[15].weather[0].icon}.png`}></Week>
            <Week max={parseInt(tempMax3)} min={parseInt(tempMin3)} grade={grade} fecha={fechaFormateada3}img={`../public/img/${weather?.list[23].weather[0].icon}.png`}></Week>
            <Week max={parseInt(tempMax4)} min={parseInt(tempMin4)} grade={grade} fecha={fechaFormateada4}img={`../public/img/${weather?.list[31].weather[0].icon}.png`}></Week>
            <Week max={parseInt(tempMax5)} min={parseInt(tempMin5)} grade={grade} fecha={fechaFormateada5}img={`../public/img/${weather?.list[39].weather[0].icon}.png`}></Week>
          <h2>Todays Highlights</h2>
          </div>
          <div className="highlights">
            <Highlights title="Wind Status" deg={weather?.list[0].wind.deg} dir={dir} num={weather?.list[0].wind.speed} m='mph'></Highlights>
            <Highlights title="Humidity" clase='progress_bar' num={weather?.list[0].main.humidity} m='%'></Highlights>
            <Highlights title="Visibility" num={parseInt(weather?.list[0].visibility * 0.000621371)} m='miles'></Highlights>
            <Highlights title="Air Pressure" num={weather?.list[0].main.pressure} m='mb'></Highlights>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
