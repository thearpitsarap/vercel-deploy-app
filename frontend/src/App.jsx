import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  const [keyword, setKeyword] = useState('');
  const [searchVolume, setVolume] = useState(0);
  const [competition, setCompetition] = useState(0);

  const handleSearch = () => {
     addData({setVolume,setCompetition,keyword});
  };

  return (
    <div className="keyword-research">
      <h2>Keyword Research</h2>
      <div className="search-bar">
        <input
          type="text"
          value={keyword}
          onInput={(e) => setKeyword(e.target.value)}
          placeholder="Search keyword"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="overview">
        <div className="overview-item">
          <span className="label">Search Volume</span>
          <span className="value">{searchVolume}</span>
        </div>
        <div className="overview-item">
          <span className="label">Competition</span>
          <span className="value">{competition}</span>
        </div>
      </div>
    </div>
  );
}

async function addData({setCompetition,setVolume,keyword}){
  const response = await axios.get(`http://localhost:3000/data?&keyword=${keyword}`);
    console.log(response.data);
    setVolume(response.data.searchVolume);
    setCompetition(response.data.competition);
}

export default App;
