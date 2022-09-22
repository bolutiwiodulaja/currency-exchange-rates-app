import React from 'react';


let dropdown1 = document.getElementsByClassName('selectCurrency1');
let dropdown2 = document.getElementsByClassName('selectCurrency2');

class Input extends React.Component {
    state = {
        values: [],
        rates: [],
        placeholder1:'',
        placeholder2:'',
        inputs1: '',
        inputs2: ''
        
    }
   
    componentDidMount() {
       fetch('https://altexchangerateapi.herokuapp.com/latest?from=USD')
        .then((response) => {return response.json()}) 
        .then((data)=> {
            this.setState({
               values: (['SELECT CURRENCY', data.base, ...Object.keys(data.rates)]),
               rates: (['0', data.amount, ...Object.values(data.rates)]),
            })
console.log(this)
        }).catch((error) => {
            console.log(error);
        });
    }

  
  
    render(){        
        const onChange1 = (e) => {
            dropdown1.value =  e.target.value;
            this.setState({placeholder1: this.state.rates[this.state.values.indexOf(dropdown1.value)]})
            let toRate = this.state.rates[this.state.values.indexOf(dropdown2.value)];
            let fromRate = this.state.rates[this.state.values.indexOf(dropdown1.value)];
            let baseAmount = this.state.rates[1];
            let result2 = (baseAmount/fromRate)*e.target.value*toRate;
            this.setState({inputs2: (result2)})
         }
         
         const onChange2 = (e) => {
             dropdown2.value =  e.target.value;
             this.setState({placeholder2: this.state.rates[this.state.values.indexOf(dropdown2.value)]})
             let toRate = this.state.rates[this.state.values.indexOf(dropdown1.value)];
             let fromRate = this.state.rates[this.state.values.indexOf(dropdown2.value)];
             let baseAmount = this.state.rates[1]
             let result1 = (baseAmount/fromRate)*e.target.value*toRate;
             this.setState({inputs1: (result1)})
          }

          const Converter1 = (e) =>{
            let toRate = this.state.rates[this.state.values.indexOf(dropdown2.value)];
            let fromRate = this.state.rates[this.state.values.indexOf(dropdown1.value)];
            let baseAmount = this.state.rates[1];
            let result2 = ((baseAmount/fromRate)*e.target.value*toRate).toFixed(2);
            this.setState({inputs2: (result2)})
        }

        const Converter2 = (e) =>{
            let toRate = this.state.rates[this.state.values.indexOf(dropdown1.value)];
            let fromRate = this.state.rates[this.state.values.indexOf(dropdown2.value)];
            let baseAmount = this.state.rates[1]
            let result1 = ((baseAmount/fromRate)*e.target.value*toRate).toFixed(2);
            this.setState({inputs1: (result1)})     
        }


          return( 
          <div className='container'>
            <div className='row d-flex justify-content-center text-center border'>
                <div className='col-md-12 col-lg-4 order-md-1 order-lg-1'>
                    <select className='selectCurrency1' onChange={onChange1}>{
                        this.state.values.map((object) => {
                            return <option className='Value1' key={object}>{object}</option>
                        })
                    }</select>
                </div>

                <div className='col-md-12 col-lg-4 order-md-2 order-lg-3 spacing '>
                    <input className='Rate1' type='number' onChange={Converter1} placeholder={this.state.placeholder1} defaultValue={this.state.inputs1}/>
                </div>

                <div className='main'>
                </div>                

                <div className='col-md-12 col-lg-4 order-md-3 order-lg-2'>
                    <select className='selectCurrency2' onChange={onChange2}>{
                        this.state.values.map((object) => {
                            return <option className='Value2'  key={object}>{object}</option>
                        })
                    }</select> 
                </div>

                <div className='col-md-12 col-lg-4 order-md-2 order-lg-3'>
                    <input className='Rate2' type='number' onChange={Converter2} placeholder={this.state.placeholder2} defaultValue={this.state.inputs2}/>
                </div>

            </div>            
        </div>
          )

    }
}
export default Input;
