import { useState } from 'react';
import './App.css';

function App() {
  const [website, setWebsite] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(website);
  }

  return (
    <div className="App">
      <h2>Insert website to parse:</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-website-field'>
          <input
            type="text" 
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className='submit-website-name'>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default App;
