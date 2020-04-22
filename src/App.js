import React, {useEffect, useState} from 'react';
import './App.scss';
import axios from 'axios'
import CanvasJSReact from './canvasjs.react'

const App = () => {
  const [ stateData, setStateData ] = useState([])
  const [ dateSelected, setDateSelected ] = useState(new Date())
  const [ myContent, setMyContent ] = useState(null)
  const [ selectedArray, setSelectedArray ] = useState([])

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
    
    // positive
    const mapPositives = () => {
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
  // positive increase
  const mapPositiveIncrease = () => {
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

  // negative
  const mapNegatives = () => {
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

  // deaths
  const mapDeaths = () => {
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

  const mapHospitalizedCurrently = () => {
    let localArray = []
    if (stateData) {
      stateData.forEach( (ele, id) => {
        localArray.push(
          { x: new Date(ele.dateChecked), y: ele.hospitalizedCurrently }
        )
      })
    }
    return localArray
  }

  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    title:{
      text: "Washington Graph"
      },
      data:  [
        {
          type: "line",
          showInLegend: true, 
          name: "series1",
          legendText: "Positives"
        },
        {
          type: "line",
          showInLegend: true, 
          name: "series2",
          legendText: "negative"
        },
      ]
    }

  const handleClick = (e, valueEntered) => {
    console.log(options)
    let localGate = 0
    let localArray
    let localString = ''
    selectedArray.length > 0 ? localArray = [...selectedArray] : localArray = []
    localArray.push(`${valueEntered} `)
    setSelectedArray(localArray)
    if (localArray.length === 2) {
      if (localArray[0] === 'deaths ') {
        options.data[0].dataPoints = mapDeaths()
        options.data[0].legendText = 'Deaths'
        localString += 'Deaths vs '
      }
      if (localArray[0] === 'hospitalizedCurrently ') {
        options.data[0].dataPoints = mapHospitalizedCurrently()
        options.data[0].legendText = 'Hospitalized Currently'
        localString += 'Hospitalized Currently vs '
      }
      if (localArray[0] === 'positiveTests ') {
        options.data[0].dataPoints = mapPositives()
        options.data[0].legendText = 'positive Tests'
        localString += 'Positive Tests vs '
      }
      if (localArray[0] === 'negativeTests ') {
        options.data[0].dataPoints = mapNegatives()
        options.data[0].legendText = 'negative Tests'
        localString += 'Negative Tests vs '
      }
      if (localArray[0] === 'positiveIncrease ') {
        options.data[0].dataPoints = mapPositiveIncrease()
        options.data[0].legendText = 'Positive Increase Rate'
        localString += 'Positive Increase Rate vs '
      }

      // second section
      if (valueEntered === 'deaths') {
        options.data[1].dataPoints = mapDeaths()
        options.data[1].legendText = 'Deaths'
        localString += 'Deaths'
        options.title = {text: localString}
      }
      if (valueEntered === 'positiveTests') {
        options.data[1].dataPoints = mapPositives()
        options.data[1].legendText = 'Positive Tests'
        localString += 'Positive Tests'
        options.title = {text: localString}
      }
      if (valueEntered === 'hospitalizedCurrently') {
        options.data[1].dataPoints = mapHospitalizedCurrently()
        options.data[1].legendText = 'Hospitalized Currently'
        localString += 'Hospitalized Currently'
        options.title = {text: localString}
      }
      if (valueEntered === 'negativeTests') {
        options.data[1].dataPoints = mapNegatives()
        options.data[1].legendText = 'Negative Tests'
        localString += 'Negative Tests'
        options.title = {text: localString}
      }
      if (valueEntered === 'positiveIncrease') {
        options.data[1].dataPoints = mapPositiveIncrease()
        options.data[1].legendText = 'Positive Increase Rate'
        localString += 'Positive Increase Rate'
        options.title = {text: localString}
      }
      console.log(localString)
      localGate = 2
    }
    if (localGate > 1) {
      setMyContent(
        <CanvasJSChart options = {options}
                
      />
      )
      setSelectedArray([])
    }
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
          <div className='graph_container'>
            {myContent}
          </div>
        <div className='my_buttons'>
        <h2>Select Two</h2>
          <h3>Selected: {selectedArray}</h3>
          <button onClick={(e, valueEntered) => handleClick(e, 'positiveTests')}>
            Positives Tests
          </button>
          <button onClick={(e, valueEntered) => handleClick(e, 'negativeTests')}>
            Negatives Tests
          </button>
          <button onClick={(e, valueEntered) => handleClick(e, 'positiveIncrease')}>
            Positive Increase in Tests
          </button>
          <button onClick={(e, valueEntered) => handleClick(e, 'deaths')}>
            Deaths
          </button>
          <button onClick={(e, valueEntered) => handleClick(e, 'hospitalizedCurrently')}>
            Hospitalized Currently
          </button>
        </div> 
        </div> 
      </div>
    </div>
  );
}

export default App;
