import axios from 'axios';
import React, {useState, useEffect} from 'react';

const CovidTableSmall = () => {
  const [data, setData] = useState([]);

  //Get today's date using the JavaScript Date object.
  let ourDate = new Date();

  //Change it so that it is 7 days in the past.
  let pastDate = ourDate.getDate() - 2;
  ourDate.setDate(pastDate);

  const convertDate = function(date) {
    let dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); 
    var yyyy =date.getFullYear();
    return dd + '-' + mm + '-' + yyyy;
  }

  const lastWeek = convertDate(ourDate);

  console.log(lastWeek)

  const getCases = () => {
    axios.get(`https://api.opencovid.ca/timeseries?after=${lastWeek}`)
    .then((res) => {
      setData(res.data.active);
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getCases();
  }, []);

 

  console.log(data);

return (
  <div>
    <table className="data" id="small-screens">
      <tr>
        <th id="province">Province</th>
        {data.filter(obj => obj.province === 'Alberta').map(filteredData => (
          <th scope="col">{filteredData.date_active}</th>
        ))}
      </tr>
      <tr>
        <td >Alberta</td>
        {data.filter(obj => obj.province === 'Alberta').map(filteredData => (
          <td>{filteredData.active_cases}</td>
        ))}
      </tr>
      <tr>
      <td className="province">Manitoba</td>
        {data.filter(obj => obj.province === 'Manitoba').map(filteredData => (
          <td>{filteredData.active_cases}</td>
        ))}
      </tr>
      <tr>
      <td>British Columbia</td>
        {data.filter(obj => obj.province === 'BC').map(filteredData => (
          <td>{filteredData.active_cases}</td>
        ))}
      </tr>
      <tr>
      <td>New Brunswich</td>
        {data.filter(obj => obj.province === 'New Brunswick').map(filteredData => (
          <td>{filteredData.active_cases}</td>
        ))}
      </tr>
      <tr>
      <td>Newfoundland and Labrador</td>
        {data.filter(obj => obj.province === 'NL').map(filteredData => (
          <td>{filteredData.active_cases}</td>
        ))}
      </tr>
      <tr>
      <td>Nova Scotia</td>
        {data.filter(obj => obj.province === 'Nova Scotia').map(filteredData => (
          <td>{filteredData.active_cases}</td>
        ))}
      </tr>
      <tr>
      <td>Northwest Territories</td>
        {data.filter(obj => obj.province === 'NWT').map(filteredData => (
          <td>{filteredData.active_cases}</td>
        ))}
      </tr>
      <tr>
      <td>Ontario</td>
        {data.filter(obj => obj.province === 'Ontario').map(filteredData => (
          <td>{filteredData.active_cases}</td>
        ))}
      </tr>
      <tr>
      <td>Prince Edward Island</td>
        {data.filter(obj => obj.province === 'PEI').map(filteredData => (
          <td>{filteredData.active_cases}</td>
        ))}
      </tr>
      <tr>
      <td>Quebec</td>
        {data.filter(obj => obj.province === 'Quebec').map(filteredData => (
          <td>{filteredData.active_cases}</td>
        ))}
      </tr>
      <tr>
      <td>Repatriated</td>
        {data.filter(obj => obj.province === 'Repatriated').map(filteredData => (
          <td>{filteredData.active_cases}</td>
        ))}
      </tr>
      <tr>
      <td>Saskatchewan</td>
        {data.filter(obj => obj.province === 'Saskatchewan').map(filteredData => (
          <td>{filteredData.active_cases}</td>
        ))}
      </tr>
      <tr>
      <td>Yukon</td>
        {data.filter(obj => obj.province === 'Yukon').map(filteredData => (
          <td>{filteredData.active_cases}</td>
        ))}
      </tr>
    </table>  
  </div>
)
}

export default CovidTableSmall