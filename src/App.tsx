import Dock from "./components/Dock";
import BraveLogo from './assets/brave.svg'
import FinderLogo from './assets/finder.svg'
import ReactLogo from './assets/react.svg'
import ViteLogo from './assets/vite.svg'
import "./App.css";

function App() {
  return (
    <div>
      <Dock 
        gap={12}
        magnification={0.35} 
        span={350} 
        items={[
          (<img onClick={() => {console.log('1')}} key={4} src={ViteLogo} />),
          (<img onClick={() => {console.log('2')}} key={1} src={BraveLogo} />),
          (<img onClick={() => {console.log('3')}} key={2} src={FinderLogo} />),
          (<img onClick={() => {console.log('4')}} key={3} src={ReactLogo} />),
          (<img onClick={() => {console.log('5')}} key={5} src={FinderLogo} />),
          (<img onClick={() => {console.log('6')}} key={6} src={ReactLogo} />),
          (<img onClick={() => {console.log('7')}} key={7} src={ViteLogo} />),
          (<img onClick={() => {console.log('8')}} key={8} src={FinderLogo} />),
          (<img onClick={() => {console.log('9')}} key={9} src={ReactLogo} />),
          (<img onClick={() => {console.log('10')}} key={10} src={ViteLogo} />),
        ]}
      />
    </div>
  );
}

export default App;
