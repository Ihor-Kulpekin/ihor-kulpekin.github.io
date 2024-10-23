import './App.css';
import Header from "./components/header/header.component";
import { useState } from "react";
import UniformMotionChart from "./components/graphics/rivnozminuiruh/UniformMotionChart.component";


const graphicByIndex = {
  0: () => <UniformMotionChart/>
};

function App() {
  const [indexGraphic, setIndexGraphic] = useState(0);

  const onChangeGraphic = (index) => {
    setIndexGraphic(index);
  };

  return (
    <div className="App">
      <Header onChangeGraphic={onChangeGraphic}/>
      {
        graphicByIndex[indexGraphic]()
      }
    </div>
  );
}

export default App;
