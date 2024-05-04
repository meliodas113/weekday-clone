import './App.css';
import JobSection from './components/JobSection';

function App() {
  return (
    <div className="App">
      <main style={{ overflowY: "auto",flexGrow:'1' }}>
        <JobSection/>
      </main>
    </div>
  );
}

export default App;
