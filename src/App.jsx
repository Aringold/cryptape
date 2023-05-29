import { useState } from 'react'
import { HashRouter as Router, Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import './App.css'
import Layout from './Components/Layout'
import Home from './View/Home'

import Visualization from './View/Visualization';
import Gas from './View/Gas';
import Happening from './View/Happening';
function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route index path="" element={<Home />} />
          <Route index path="/gas" element={<Gas />} />
          <Route index path="/happening" element={<Happening />} />
          <Route index path="/visualization" element={<Visualization />} />
        </Routes>
      </Layout>
    </Router>
  )
}
export default App;
