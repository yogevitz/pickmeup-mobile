import React from 'react';
import Report from './pages/report';
import Container from "@material-ui/core/Container";
import './App.css';

function App() {
  return (
    <div className="App">
      <Container fixed>
        <Report />
      </Container>
    </div>
  );
}

export default App;
