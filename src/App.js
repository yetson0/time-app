// import logo from './logo.svg';
import React from 'react';
import './App.css';
// import GetTimezones from './pages/GetTimezones';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <h1>Timezone-app</h1>
      <Home vars='dummyValue'/>
      {/* <GetTimezones /> */}
    </div>
  );
}

export default App;