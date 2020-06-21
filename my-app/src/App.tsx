import React from 'react';
import './App.css';
import { Dialog  } from "./components";


function App() {
  const [inProp, setInProp] = React.useState(false);
  return (
    <div>
      <Dialog visible={inProp}>
        <div>123</div>
      </Dialog>
      <button type="button" onClick={() => setInProp(!inProp)}>
        Click to Enter
      </button>
    </div>
  );
}
export default App;
