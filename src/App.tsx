import './App.css';
import JobSection from './components/JobSection';

function App() {
  return (
    <div className="App">
      <header style={{flexGrow:'0'}} className="App-header">
        <span>Search Jobs</span>
      </header>
      <main style={{ overflowY: "auto",flexGrow:'1' }}>
        <JobSection/>
      </main>
    </div>
  );
}

export default App;
