import React from 'react';
let rate1 = document.getElementsByClassName('Rate1');
let rate2 = document.getElementsByClassName('Rate2');
let dropdown1 = document.getElementsByClassName('selectCurrency1');
let dropdown2 = document.getElementsByClassName('selectCurrency2');
let result;

class Input extends React.Component {
    state = {
        values: [],
        rates: []
    }
   
    componentDidMount() {
       fetch('https://altexchangerateapi.herokuapp.com/latest?from=USD')
        .then((response) => {return response.json()}) 
        .then((data)=> {
            this.setState({
               values: (['SELECT CURRENCY', data.base, ...Object.keys(data.rates)]),
               rates: (['0', data.amount, ...Object.values(data.rates)])
            })

        }).catch((error) => {
            console.log(error);
        });
    }
    render(){

        const Converter1 = (e) =>{
            let toRate = this.state.rates[this.state.values.indexOf(dropdown2 .value)];
            let fromRate = this.state.rates[this.state.values.indexOf(dropdown1.value)];
            let baseAmount = this.state.rates[1]
                result = (baseAmount/toRate)*e.target.value*fromRate;
                rate2.value = result;
                console.log(result)
        }

        const Converter2 = (e) =>{
            let toRate = this.state.rates[this.state.values.indexOf(dropdown2 .value)];
            let fromRate = this.state.rates[this.state.values.indexOf(dropdown1.value)];
            let baseAmount = this.state.rates[1]
                result = (baseAmount/fromRate)*e.target.value*toRate;
                rate1.value = result;
                console.log(result)
        }

        
        const onChange2 = (e) => {
            dropdown1.value =  e.target.value;
            return Converter1(e);
         }
         
         const onChange1 = (e) => {
             dropdown2.value =  e.target.value;
             return Converter2(e);
          }

        return <div className='container'>
            <div className='row d-flex justify-content-center text-center border'>
                <div className='col-md-12 col-lg-4 order-md-1 order-lg-1'>
                    <select className='selectCurrency1' onChange={onChange1}>{
                        this.state.values.map((object) => {
                            return <option className='Value1' key={object}>{object}</option>
                        })
                    }</select>
                </div>

                <div className='col-md-12 col-lg-4 order-md-2 order-lg-3 spacing '>
                    <input className='Rate1' type='number' placeholder='0.00' onInput={Converter1}></input>
                </div>

                <div className='main'>
                </div>                

                <div className='col-md-12 col-lg-4 order-md-3 order-lg-2 selectCurrency'>
                    <select className='selectCurrency2' onChange={onChange2}>{
                        this.state.values.map((object) => {
                            return <option className='Valu2'  key={object}>{object}</option>
                        })
                    }</select> 
                </div>

                <div className='col-md-12 col-lg-4 order-md-4 order-lg-4'>
                    <input className='Rate2' type='number' placeholder='0.00' onInput={Converter2}></input>
                </div>
            </div>            
        </div>

    }
}
export default Input;
