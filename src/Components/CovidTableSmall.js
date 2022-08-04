import axios from 'axios';
import React, {useState, useEffect} from 'react';


const CovidTable = () => {

    const [data, setData] = useState([]);

    //Get today's date using the JavaScript Date object.
    let ourDate = new Date();

    //Change it so that it is 7 days in the past.
    let pastDate = ourDate.getDate() - 2;
    ourDate.setDate(pastDate);

    const convertDate = function(date) {
      let dd = String(date.getDate()).padStart(2, '0');
      let mm = String(date.getMonth() + 1).padStart(2, '0'); 
      let yyyy =date.getFullYear();
      return yyyy + '-' + mm + '-' + dd;
    }

    const lastWeek = convertDate(ourDate);

    // console.log("covid table last week", lastWeek)

    const getCases = () => {
      axios.get(`https://api.opencovid.ca/timeseries?after=${lastWeek}`)
      .then((res) => {
        setData(res.data.data.cases);
      }).catch(err => {
        console.log("error message!!!!!!!", err)
      })
    }

    useEffect(() => {
      getCases();
    }, []);




    function formatDate(date){

      var dd = date.getDate();
      var mm = date.getMonth()+1;
      var yyyy = date.getFullYear();
      if(dd<10) {dd='0'+dd}
      if(mm<10) {mm='0'+mm}
      date = yyyy+'-'+mm+'-'+dd;
      return date
   }



    function Last2Days () {
      var result = [];
      for (var i=2; i>0; i--) {
          var d = new Date();
          d.setDate(d.getDate() - i);
          result.push( formatDate(d) )
      }
  
      return(result);
  }

  const last2DaysArray = Last2Days();

  // VARIABLES CONTAINING EACH PROVINCE DATA
  const alberta = data.filter(obj => obj.region === 'AB');
  const bc = data.filter(obj => obj.region === 'BC');
  const nb = data.filter(obj => obj.region === 'NB');
  const nl = data.filter(obj => obj.region === 'NL');
  const nwt = data.filter(obj => obj.region === 'NWT');
  const ns = data.filter(obj => obj.region === 'Nova Scotia');
  const on = data.filter(obj => obj.region === 'ON');
  const pei = data.filter(obj => obj.region === 'PEI');
  const qc = data.filter(obj => obj.region === 'QC');
  const repatriated = data.filter(obj => obj.region === 'Repatriated');
  const saskatchewan = data.filter(obj => obj.region === 'Saskatchewan');
  const yk = data.filter(obj => obj.region === 'YK');

  
  
  //FUNCTION TO CREATE ARRAY FOR TABLE VALUES
  const valuesArrayFunction = function(prov) {
    let table = {};
    let tableArray = [];
    for (let i=0; i<last2DaysArray.length; i++) {
      let thisDate = last2DaysArray[i]
      table[thisDate] = "";
      table[thisDate] = "N/A"
    }
  
    for(const property in table) {
      for(let i=0; i<prov.length; i++) {
        let thisProvDate = prov[i].date;
        let thisProvValue = prov[i].value_daily;
        if(thisProvDate === property) {
          table[thisProvDate] = thisProvValue;
        }
      }
    }

    for(const prop in table) {
      tableArray.push(table[prop]);
    }

    return tableArray;

  }

  
 
  return (
    <div>
      <table className="data" id="small-screens">
        <tbody>

        <tr>
          <th id="province">Province</th>
          {
            Last2Days().map(mappedDates => (
              <th>{mappedDates}</th>
            ))
          }
        </tr>
        <tr>
          <td >Alberta</td>
          {
            valuesArrayFunction(alberta).map(dateData => (
              <td>{dateData}</td>
            ))
          }
        </tr>
        <tr>
        <td>British Columbia</td>
        {
            valuesArrayFunction(bc).map(dateData => (
              <td>{dateData}</td>
            ))
          }
        </tr>
        <tr>
        <td>New Brunswich</td>
          {
            valuesArrayFunction(nb).map(dateData => (
              <td>{dateData}</td>
            ))
          }
        </tr>
        <tr>
        <td>Newfoundland and Labrador</td>
        {
            valuesArrayFunction(nl).map(dateData => (
              <td>{dateData}</td>
            ))
          }
        </tr>
        <tr>
        <td>Nova Scotia</td>
        {
            valuesArrayFunction(ns).map(dateData => (
              <td>{dateData}</td>
            ))
          }
        </tr>
        <tr>
        <td>Northwest Territories</td>
        {
            valuesArrayFunction(nwt).map(dateData => (
              <td>{dateData}</td>
            ))
          }
        </tr>
        <tr>
        <td>Ontario</td>
        {
            valuesArrayFunction(on).map(dateData => (
              <td>{dateData}</td>
            ))
          }
        </tr>
        <tr>
        <td>Prince Edward Island</td>
        {
            valuesArrayFunction(pei).map(dateData => (
              <td>{dateData}</td>
            ))
          }
        </tr>
        <tr>
        <td>Quebec</td>
        {
            valuesArrayFunction(qc).map(dateData => (
              <td>{dateData}</td>
            ))
          }
        </tr>
        <tr>
        <td>Repatriated</td>
        {
            valuesArrayFunction(repatriated).map(dateData => (
              <td>{dateData}</td>
            ))
          }
        </tr>
        <tr>
        <td>Saskatchewan</td>
        {
            valuesArrayFunction(saskatchewan).map(dateData => (
              <td>{dateData}</td>
            ))
          }
        </tr>
        <tr>
        <td>Yukon</td>
        {
            valuesArrayFunction(yk).map(dateData => (
              <td>{dateData}</td>
            ))
          }
        </tr>
        </tbody>
      </table>  
    </div>
  )
}

export default CovidTable