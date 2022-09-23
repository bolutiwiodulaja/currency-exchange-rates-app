import React from 'react';

class Input extends React.Component {
    state = {
        values: [],
        rates: [],
        currencyBase:'USD',
        currencyTarget:'EUR',
        baseValue: 1
    }
   
    componentDidMount() {
        fetch('https://altexchangerateapi.herokuapp.com/latest?from=USD')
        .then((response) => {return response.json()}) 
        .then((data)=> {
            this.setState({
               values: (['SELECT CURRENCY', data.base, ...Object.keys(data.rates)]),
               rates: data.rates,
            })
            console.log(this)
        }).catch((error) => {
            console.log(error);
        });
    }

    updateRates = () => {
        fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${this.state.currencyBase}&to=${this.state.currencyTarget}`)
        .then((response) => {return response.json()}) 
        .then((data)=> {
            this.setState({
               rates: data.rates,
            })
            console.log(this)
        }).catch((error) => {
            console.log(error);
        });
    }

    onCurrencyChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        }, () => {
            this.updateRates();
        })
    }

  
  
    render(){       
        const { baseValue, currencyTarget, rates } = this.state;
        return( 
        <div className='container'>
            <div className='row d-flex justify-content-center text-center border'>
                <div className='col-md-12 col-lg-4 order-md-1 order-lg-1'>
                    <select className='selectCurrency1' name="currencyBase" onChange={this.onCurrencyChange} value={this.state.currencyBase}>{
                        this.state.values.map((object) => {
                            return <option className='Value1' key={object}>{object}</option>
                        })
                    }</select>
                </div>

                <div className='col-md-12 col-lg-4 order-md-2 order-lg-3 spacing '>
                    <input className='Rate1' type='number' defaultValue={this.state.baseValue}/>
                </div>

                <div className='main'>
                </div>                

                <div className='col-md-12 col-lg-4 order-md-3 order-lg-2'>
                    <select className='selectCurrency2' name="currencyTarget" onChange={this.onCurrencyChange}  value={this.state.currencyTarget}>{
                        this.state.values.map((object) => {
                            return <option className='Value2'  key={object}>{object}</option>
                        })
                    }</select> 
                </div>

                <div className='col-md-12 col-lg-4 order-md-2 order-lg-3'>
                    <p>{rates[currencyTarget] && rates[currencyTarget] * baseValue}</p>
                </div>

            </div>            
        </div>
        )
    }
}
export default Input;
