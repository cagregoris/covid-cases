// COMPONENTS
import CovidTable from "./Components/CovidTable";
import CovidTableSmall from "./Components/CovidTableSmall";


// STYLES
import './styles/app.css'

function App() {

  return (
    <div className="App">
      <h1>Active Covid Cases in Canada</h1>
      <div className="description">The following table displays daily active covid cases per province. The date is formatted as dd-mm-yyyy. Note: mobile devices can view the past 2 days, larger screens can view the past week.</div>
      <CovidTable/>
      <CovidTableSmall />
    </div>
  );
}

export default App;
