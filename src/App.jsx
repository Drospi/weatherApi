import { useState } from "react";
import "./App.css";
import { Week } from "./components/Week";
import { Sidebar } from "./components/Sidebar";
import { Highlights } from "./components/Highlights";
import Shower from "../public/img/Shower.png";
import Clear from "../public/img/Clear.png";
import Hail from "../public/img/Hail.png";
import Clouds from "../public/img/HeavyCloud.png";
import HeavyRain from "../public/img/HeavyRain.png";
import LightCloud from "../public/img/LightCloud.png";
import LightRain from "../public/img/LightRain.png";
import Sleet from "../public/img/Sleet.png";
import Snow from "../public/img/Snow.png";
import Thunderstorm from "../public/img/Thunderstorm.png";
import { useEffect } from "react";

function App() {
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)
  const [grade, setGrade] = useState('')
  const [city, setCity] = useState('lima')
  const [weather, setWeather] = useState(null)
  useEffect(()=>{
    const getDatos = async ()=>{
      if (lat===null && long ===null) return
      const url = `https://api.openweathermap.org/data/2.5/weather?lat${lat}&lon=${long}&appid=58587fb136c05c60d9eff16a7ec0dc2d&units=metric`
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
  
    }
    getDatos()
  },[lat, long,grade])

  useEffect(()=>{
    const getDatos = async ()=>{
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=58587fb136c05c60d9eff16a7ec0dc2d${grade}`
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setWeather(data)
    }
    getDatos()
  },[city,grade])
  const handleSuccess=(data)=>{
    const {latitude, longitude} = data.coords;
    setLat(latitude)
    setLong(longitude)
  }
  const handleLocation = ()=>{
    navigator.geolocation.getCurrentPosition(handleSuccess)
  }
  return (
    <>
      <div className="main">
        <Sidebar></Sidebar>
        <div className="sidebar_weather">
          <div className="nav_main">
            <button>Search for places</button>
            <button onClick={handleLocation} className="my_location">
              <span className="material-symbols-outlined">my_location</span>
            </button>
          </div>
          <img src={Clouds} alt="" />
          <h1>{weather?.list[0].main.temp} {grade==''?'F':'C'}</h1>
          <h3>{weather?.list[0].weather[0].main}</h3>
          <div className="about">
            <p>Today • {weather?.list[0].dt_txt}</p>
            <p>
              <span className="material-symbols-outlined">location_on</span> {weather?.city.name}
            </p>
          </div>
        </div>
        <div>
          <div className="grades">
            <button onClick={()=>setGrade('&units=metric')} className="grade">°C</button>
            <button onClick={()=>setGrade('')} className="grade">°F</button>
          </div>
          <div className="week">
            <Week img={Shower}></Week>
            <Week></Week>
            <Week></Week>
            <Week></Week>
            <Week></Week>
          </div>
          <h2>Todays Highlights</h2>
          <div className="highlights">
            <Highlights title="Wind Status" num={weather?.list[0].wind.speed} m='mph'></Highlights>
            <Highlights title="Humidity" num={weather?.list[0].main.humidity} m='%'></Highlights>
            <Highlights title="Visibility" num={weather?.list[0].visibility} m='miles'></Highlights>
            <Highlights title="Air Pressure" num={weather?.list[0].pressure} m='mb'></Highlights>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
