import React, {useEffect, useState} from 'react';
import './App.scss';
import axios from 'axios'

const App = () => {
  const [ washingtonData, setWashingtonData ] = useState([])
  const [ stateData, setStateData ] = useState([])
  const [ selectedCity, setSelectedCity ] = useState('')
  const [ dateSelected, setDateSelected ] = useState(new Date())

  useEffect(() => {
    let localArray = []
    async function getData(url = '') {
        const response = await fetch(url, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-key': `e5fe8e8d8dmsh23aa82afe4c3a19p1d436cjsn1d09909bc3f0`,
                'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com'
            }
        });

        return response ? response.json() : console.log('no reponse')

    };

    getData('https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats').then( (response) => {
      console.log(response.data)
      response.data.covid19Stats.forEach( (ele, id) => {
        if (ele.province === 'Washington') {
          localArray.push(ele)
        } 
      })
      setWashingtonData(localArray)
      axios.get('https://covidtracking.com/api/states/daily').then( response => {
        let localArrayTwo = []
        response.data.forEach( (ele, id) => {
          if (ele.state === "WA") {
            localArrayTwo.push(ele)
          }
        })
        setStateData(localArrayTwo)
      })
    })
  }, [])

  var stateDataDivs
  // washington function
  const washingtonFunction = () => {
    let localArray = []
    stateData.forEach( (ele, id) => {
      let myDate = new Date(ele.dateChecked)
      localArray.push(
        <div key={id}>
          <h3>Date: {myDate.toDateString()}</h3>
          <h3>Postive Tests: {ele.positive}</h3>
          <h3>Postive Increase: {ele.positiveIncrease}</h3>
          <h3>Negative Tests: {ele.negative}</h3>
          <h3>Negative Increase: {ele.negativeIncrease}</h3>
          <h3>Total Tests: {ele.totalTestResults}</h3>
          <h3>Deaths: {ele.death}</h3>
          <hr />
        </div>
      )
    })
    return localArray
  }

  if (washingtonData) {
    stateDataDivs = washingtonFunction()
  } else {
    stateDataDivs = ''
  }

  // function for all the data
  var cityList
  const mapTheData = () => {
    return(
      <div className='overall_divs'>
        <h1 className='selected_title'>{selectedCity.city} </h1>
          <div className='mini_divs'>
            <h3>Confirmed: {selectedCity.confirmed}</h3>
            <h3>Deaths: {selectedCity.deaths} </h3>
            <h3>Recovered: {selectedCity.recovered} </h3>
          </div>
      </div>
    )
  }

  // funciton for selecting specific city
  const handleClick = (e, city) => {
    console.log(city)
    washingtonData.forEach( (ele, id) => {
      if (ele.city === city) {
        setSelectedCity(ele)
      }
    })
  }

  // function for the names
  const mapTheNames = () => {
    let localArray
    localArray = washingtonData.map( (ele, id) => 
      <div key={id} className='overall_divs' onClick={(e, city) => handleClick(e, ele.city)}>
        <h1>{ele.city}</h1>
      </div>
    )
    return localArray
  }

  // map selected city data
  if (selectedCity) {
    cityList = mapTheData()
  } else {
    cityList = ''
  }

  var cityNames
  // map city names
  if (washingtonData) {
    cityNames = mapTheNames()
  } else {
    cityNames = ''
  }

  return (
    <div className="App">
      <div className='title'>
        <div className='title_content'>
          Washington Covid-19 Data <br />
          <h3 className='smaller_text'>{dateSelected.toDateString()}</h3>
        </div>
      </div>
      <div className='city_list'>
        <div className='city_list_title'>
          Select One
        </div>
        <div className='city_list_inner'>
          {cityNames}
        </div>
      </div>
      <div className='selected_City'>
        <div className='selected_city_single'>
          {cityList}
        </div>
        <div className='washington_overall_data_container'>
          <h2>Washington Overall Data</h2>
          <div className='overall_state_stats'>
            {stateDataDivs}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
