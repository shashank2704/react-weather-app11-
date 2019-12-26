import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

function Header(){
  return (
    <div>
      <div className="hrd1"><h2 className="hrd-content1">Weather App</h2></div>
      
    </div>
    
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      city: '',
      loading: true,
      src:false,
      weather: null,
      loc: '',
      day: '',
      date: '',
      iconURL: '',
      weatherInfo: '',
      wind: '',
      humidity: '',
      pressure: '',
      maxTemp: '',
      minTemp: '',
      sunrise: '',
      sunset: '',
      comment: '',
      listOfComments: [],
    };
  }

  bar = () =>{
    return (
      <div className="bar">
        <input type="text" placeholder="Enter City Name..." onChange={()=>this.setCity(event)} value={this.state.city} />
        <button onClick={this.find}>Search</button>
        </div>
    )
  }

  handleChangeOfComment=event =>{
    this.setState({
      comment:event.target.value,
    });
  };

  addComment = event =>{
    this.setState({
      listOfComments: [...this.state.listOfComments,this.state.comment],
      comment:""
    });
  };

  commentBox = () =>{
    return(
      <div className="cmntContainer27">
        <input onChange={event => this.handleChangeOfComment(event)}
      value={this.state.comment} placeholder="Enter your comment here..." /><br />
        <button onClick={this.addComment}>Comment</button>
        <div>
          Comments({this.state.listOfComments.length})<br/>
          
          {
            this.state.listOfComments.map(eachElm =>(
              <div className="listCmnt27"><img src="https://png.pngtree.com/png-vector/20190423/ourmid/pngtree-user-icon-vector-illustration-in-glyph-style-for-any-purpose-png-image_975597.jpg" /> <p>{eachElm}</p></div>
            ))
          }


        </div>
      </div>
    )
  }

  render() {
    if(this.state.loading){
      return (<div>
        <Header />
        {this.bar()}
      </div>)
    }
    else if(this.state.src){
      return (<div>
        <Header />
        {this.bar()}
        <center><div className="searching27"><p>Searching City name...</p></div></center>
      </div>)
    }
    else if(this.state.weather.cod==404){
      return (<div>
        <Header />
        {this.bar()}
        <center><div className="notfound27"><p>City Name not found</p></div></center>
      </div>)
    }
    else{
    return (
      <div>
        <Header/>

        {this.bar()}
        <center>
        <div className="container27">
          <div className="time27"><div>{this.state.loc}, </div> <div>{this.load()}</div></div>

          <div className="content27">
            <div className="temprature27">
            <div>{Math.floor(this.state.weather.main.temp - 273)}°C</div>
            <div><img src={this.state.iconURL}  /></div>
            </div>
            <div>{this.otherContent()}</div>
          </div>

        </div>
        </center>
        {this.commentBox()}
      </div>
    );}
  }

  otherContent = () =>{
    return(
      <div className="otherContent27">
        <div>
          Weather: <b>{this.state.weatherInfo}</b><br />
          Wind: <b>{this.state.wind}</b>
        </div>
        <div>
          Humidity: <b>{this.state.humidity}</b><br />
          Pressure: <b>{this.state.pressure}</b>
        </div>
        <div>
          Max Temp: <b>{this.state.maxTemp}</b><br />
          Min Temp: <b>{this.state.minTemp}</b>
        </div>
        <div>
          Sunrise: <b>{this.state.sunrise}</b><br />
          Sunset: <b>{this.state.sunset}</b>
        </div>
      </div>
    )
  }

  setCity = (event) =>{
    //console.log(this.state.name)
    this.setState({
      city: event.target.value,
        loading:false,
        src:true
    })
  };

  find = async() =>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=222e7a66e12940066adc0c9db925f076`;
    const response = await fetch(url);
    const myJson = await response.json();
    console.log(myJson);
    this.setState({loading:false, weather:myJson, src:false})
    this.setState({loc: myJson.name+", "+myJson.sys.country})
    this.setState({
      iconURL: "https://openweathermap.org/img/w/" + myJson.weather[0].icon + ".png",
      weatherInfo: myJson.weather[0].main,
      wind: myJson.wind.speed,
      humidity: myJson.main.humidity,
      pressure: myJson.main.pressure,
      maxTemp: Math.floor(myJson.main.temp_max - 273)+"°C",
      minTemp: Math.floor(myJson.main.temp_min - 273)+"°C",
    })
    var sr=myJson.sys.sunrise;
    sr=sunIndex(sr);
    var ss=myJson.sys.sunset;
    ss=sunIndex(ss);
    this.setState({
      sunset: ss,
      sunrise: sr
    })
  };

  

  load = () =>{
    var today=new Date()
    var d=today.getDate()
    var day=''
    var mon=''
    var date=today.getDate()
    var year=today.getUTCFullYear();
    if(today.getDay()==1)
      day='Mon'
    else if(today.getDay()==2)
      day='Tues'
    else if(today.getDay()==3)
      day='Wed'
    else if(today.getDay()==4)
      day='Thu'
    else if(today.getDay()==5)
      day='Fri'
    else if(today.getDay()==6)
      day='Sat'
    else if(today.getDay()==7)
      day='Sun'
    
    if(today.getMonth()==1)
      mon='Jan'
    else if(today.getMonth()==2)
      mon='Feb'
    else if(today.getMonth()==3)
      mon='Mar'
    else if(today.getMonth()==4)
      mon='Apr'
    else if(today.getMonth()==5)
      mon='May'
    else if(today.getMonth()==6)
      mon='Jun'
    else if(today.getMonth()==7)
      mon='Jul'
    else if(today.getMonth()==8)
      mon='Aug'
    else if(today.getMonth()==9)
      mon='Sept'
    else if(today.getMonth()==10)
      mon='Oct'
    else if(today.getMonth()==11)
      mon='Nov'
    else if(today.getMonth()==12)
      mon='Dec'


    return (<div>{day} {mon} {date} {year}</div>)

  }

}
function sunIndex(sr){
    var obj=new Date(sr*1000);
    var d=obj.toUTCString();
    return d.slice(-12,-4);
}

render(<App />, document.getElementById('root'));
