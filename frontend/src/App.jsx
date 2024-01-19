import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [searchVolume, setVolume] = useState(0);
  const [competition, setCompetition] = useState(0);
  const [keywordNotFound, setKeywordNotFound] = useState(false);

  const handleSearch = () => {
    addData({ setVolume, setCompetition, setKeywordNotFound, keyword });
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
      {!keywordNotFound ? (
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
      ) : (
        <div className="not-found-message">Keyword not found</div>
      )}
    </div>
  );
}

async function addData({ setCompetition, setVolume, setKeywordNotFound, keyword }) {
  try {
    const response = await axios.get(`https://vercel-deploy-backend-flax.vercel.app/?&keyword=${keyword}`);
    if (response.data.searchVolume !== undefined) {
      setVolume(response.data.searchVolume);
      setCompetition(response.data.competition);
      setKeywordNotFound(false);
    } else {
      setKeywordNotFound(true);
    }
  } catch (error) {
    console.log("Error:", error);
    setKeywordNotFound(true);
  }
}

export default App;
