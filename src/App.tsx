import React, { useState } from 'react'; // useState för att hantera tema
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Routing för dynamik
import Home from './components/Home'; // Importerar Home-komponenten
import About from './components/About'; // mporterar About-komponenten
import TodoList from './components/TodoList';
import logo from './assets/logo.svg'; // 
import './styles/App.css'; // 

function App() {
  // State för mörkt/ljust tema
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Funktion för att byta tema
  const toggleTheme = (): void => {
    setIsDarkMode(prev => !prev);
  };

  return (
    // Omsluter hela appen i <Router> för routing
    <Router>
      <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>

        {/* Navigation med länkar till Home och About */}
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/todos">Todo List</Link> 

          </nav>

        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" /> 
          {/* <p>Edit <code>src/App.tsx</code> and save to reload.</p> */}

          {/* Knapp för att byta tema */}
          <button onClick={toggleTheme}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        {/* Routes för att växla mellan sidor */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todos" element={<TodoList />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
