import { useState } from 'react'
import { HashRouter as Router, Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import './App.css'
import Layout from './Components/Layout'
import Visualizer from './View/Visualizer'

import Gas from './View/Gas';
import Happening from './View/Happening';

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route index path="" element={<Visualizer />} />
          <Route index path="/gas" element={<Gas />} />
          <Route index path="/happening" element={<Happening />} />
        </Routes>
      </Layout>
    </Router>
  )
}
export default App;
