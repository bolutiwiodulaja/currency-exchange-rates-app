import Header from './components/Header'
import Input from './components/Input'
import Footer from './components/Footer'
import Arrows from './components/Arrows'
import CurrencyList from './components/CurrencyList'


function App() {
  return (
    <div className="container">
      <div className='row d-flex'>
        <Header/>
        <div className='col-12 converter'>
          <Input/>
          <Arrows/>
        </div>
        <div className='col-12 baseValues'>
          <CurrencyList/>
        </div> 
        <div className='col-12 baseValues'> 
          <Footer/> 
        </div> 
      </div>
    </div>
  );
}

export default App;
