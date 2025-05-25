import { useState } from 'react';
import Navbar from './components/Navbar';
import TextSection from './components/TextSection';
import Alert from './components/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    document.body.style.backgroundColor = newMode === 'dark' ? '#042743' : 'white';
    showAlert(`${newMode === 'dark' ? 'Dark' : 'Light'} mode enabled`, "success");
  };

  return (
    <>
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className="container my-3">
        <TextSection mode={mode} showAlert={showAlert} />
      </div>
    </>
  );
}

export default App;