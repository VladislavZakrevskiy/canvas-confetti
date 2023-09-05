import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Realistic } from "../shared/examples/Realistic"
import { Parad } from "../shared/examples/Parad"
import { Snow } from "../shared/examples/Snow"
import { Fireworks } from "../shared/examples/Fireworks"
import Navbar from "../widgets/Navbar/ui/Navbar"

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/firework" element={<Fireworks/>}/>
        <Route path="/snow" element={<Snow/>}/>
        <Route path="/parad" element={<Parad/>}/>
        <Route path="/realistic" element={<Realistic/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
