import React, { useState } from 'react'; // useState för att hantera tema
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Routing för dynamik
import Home from './components/Home'; // Importerar Home-komponenten
import About from './components/About'; // mporterar About-komponenten
import TodoList from './components/TodoList';
import logo from './assets/logo.svg';  
import './styles/App.css';  

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
      <main className={`App ${isDarkMode ? 'dark' : 'light'}`}>

        {/* Navigation med länkar till Home och About */}
        <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/todos">Todo List</Link></li> 
            </ul>
        </nav>

        <header className="App-header">
            <img src={logo} className="App-logo" alt="React logotyp som snurrar"  /> 
          
          {/* Knapp för att byta tema */}
          <button 
            onClick={toggleTheme}
            aria-label={`Byt till ${isDarkMode ? 'ljust' : 'mörkt'} tema`}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        {/* Routes för att växla mellan sidor */}
        <article>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/todos" element={<TodoList />} /> 
          </Routes>
        </article>
      </main>
    </Router>
  );
}

export default App;
