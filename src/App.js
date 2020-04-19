import React, {useEffect, useState} from 'react';
import './App.scss';
import axios from 'axios'
import CanvasJSReact from './canvasjs.react'

const App = () => {
  const [ stateData, setStateData ] = useState([])
  const [ dateSelected, setDateSelected ] = useState(new Date())

  useEffect(() => {
      axios.get('https://covidtracking.com/api/states/daily').then( response => {
        let localArrayTwo = []
        response.data.forEach( (ele, id) => {
          if (ele.state === "WA") {
            localArrayTwo.push(ele)
          }
        })
        setStateData(localArrayTwo)
      })
  }, [])

  const mapChartPositiveIncrease = () => {
    console.log(stateData)
    let localArray = []
    if (stateData) {
      stateData.forEach( (ele, id) => {
        localArray.push(
          { x: new Date(ele.dateChecked), y: ele.positive }
        )
      })
    }
    return localArray
  }


  const mapChartDeath = () => {
    console.log(stateData)
    let localArray = []
    if (stateData) {
      stateData.forEach( (ele, id) => {
        localArray.push(
          { x: new Date(ele.dateChecked), y: ele.negative }
        )
      })
    }
    return localArray
  }

  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  // 
  const options = {
    title:{
      text: "Washington Positive Versus Negative"
      },
       data: [
      {
        type: "line",
        showInLegend: true, 
        name: "series1",
        legendText: "Positives",
        dataPoints: mapChartPositiveIncrease()
      },
      {
        type: "line",
        showInLegend: true, 
        name: "series2",
        legendText: "negative",
        dataPoints: mapChartDeath()
      },

    ]
 }

 const mapChartDeathsActual = () => {
  console.log(stateData)
  let localArray = []
  if (stateData) {
    stateData.forEach( (ele, id) => {
      localArray.push(
        { x: new Date(ele.dateChecked), y: ele.death }
      )
    })
  }
  return localArray
}


const mapPositiveIncrease = () => {
  console.log(stateData)
  let localArray = []
  if (stateData) {
    stateData.forEach( (ele, id) => {
      localArray.push(
        { x: new Date(ele.dateChecked), y: ele.positiveIncrease }
      )
    })
  }
  return localArray
}

  const optionsTwo = {
    title:{
      text: "Deaths versus Change In Positive Results"
      },
       data: [
      {
        type: "line",
        showInLegend: true, 
        name: "series1",
        legendText: "Deaths",
        dataPoints: mapChartDeathsActual()
      },
      {
        type: "line",
        showInLegend: true, 
        name: "series2",
        legendText: "Positive Increase",
        dataPoints: mapPositiveIncrease()
      },

    ]
 }

  return (
    <div className="App">
      <div className='title'>
        <div className='title_content'>
          Washington Covid-19 Data <br />
          <h3 className='smaller_text'>{dateSelected.toDateString()}</h3>
        </div>
      </div>
      <div className='selected_City'>
        <div className='washington_overall_data_container'>
          <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
          />
        </div>  
        <div className='washington_overall_data_container'>
          <CanvasJSChart options = {optionsTwo}
            /* onRef = {ref => this.chart = ref} */
          />
        </div>
      </div>
    </div>
  );
}

export default App;
