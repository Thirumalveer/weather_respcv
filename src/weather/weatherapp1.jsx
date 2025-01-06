import { useState } from "react"

import cloudy from "../weather/cloudy.png"





const WeatherApp=()=>{

        const[city,setcity] =useState("")
        const[temp,settemp] =useState("")
        const[humidity,sethumidity]=useState("")
        const[wind,setwind] =useState("")
        const[error,seterror]=useState("")
        const changehandler=(e)=>{
           setcity(e.target.value)

          
            
        }

        const submithandler=(e)=>{
            e.preventDefault()
            // console.log(city)

          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`)
            
      .then((response)=>response.json())
                .then(response=>{
                    if(response.cod==404){
                        seterror("city not found")
                        setcity("")
                        settemp("")
                        sethumidity("")
                        setwind("")
                                
                    }
                    else{
                       
                     console.log(response.cod)
                      let kelvin=response.main.temp;
                      let celcius=kelvin-273.5;
                     let wind_speed=response.wind.speed
                     let humidity=response.main.humidity
                      
                      settemp(city+" "+"Temparature at "+"\n"+Math.floor(celcius)+"°C");
                      sethumidity("humidity" +":"+humidity +"%")
                      setwind("wind_speed"+":"+wind_speed +"km/hr")
                      setcity("")
                        seterror("")
         }
        })
        }

    return(
        <div>
            <center>

         
        <div className="card">
        <h1>weather condition </h1>

<form onSubmit={submithandler}>

    <input type="text" value={city} onChange={changehandler} />
    <input type="submit" value={"Get Temparature"} />
</form>
<div className="card2">
<img src={cloudy}  height="50" width="50" alt="" />
<h1>{temp}</h1>
<h3>{wind}</h3>
<h3>{humidity}</h3>
<h3>{error}</h3>

</div>

        </div>
    
            </center>
        </div>
    )
}
export default WeatherApp