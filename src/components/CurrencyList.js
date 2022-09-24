import React from 'react';

class CurrencyList extends React.Component {
    

    state = {
        countries: [],
        values: [],
        rates: [],
    }
   
    componentDidMount() {
       let country = {USD: 'United States dollar', AUD:'Australian dollar', BGN: 'Bulgarian lev', BRL: 'Brazilian real',CAD: 'Canadian dollar', CHF: 'Swiss franc', CNY: 'Chinese yuan', CZK: 'Czech koruna', DKK: 'Danish krone', EUR: 'Euro', GBP: 'British pound', HKD: 'Hong Kong dollar', HRK: 'Croatian kuna', HUF: 'Hungarian forint', IDR: 'Indonesian rupiah', ILS: 'Israeli new shekel', INR: 'Indian rupee', ISK: 'Icelandic króna', JPY: 'Japanese yen', KRW: 'South Korean won', MXN: 'Mexican peso', MYR: 'Malaysian ringgit', KOK: 'Norwegian krone', NZD: 'New Zealand dollar', PHP: 'Philippine peso', PLN: 'Polish złoty', RON: 'Romanian leu', SEK: 'wedish krona', SGD: 'Singapore dollar', THB: 'Thai baht', TRY: 'Turkish lira', ZAR: 'South African rand'}
   
       fetch('https://altexchangerateapi.herokuapp.com/latest?from=USD')
        .then((response) => {return response.json()}) 
        .then((data)=> {
            this.setState({
                countries: ([...Object.values(country)]),
                values: ([data.base, ...Object.keys(data.rates)]),
                rates: ([data.amount, ...Object.values(data.rates)]),
               
            })
console.log(this)
        }).catch((error) => {
            console.log(error);
        });
    }

  
  
    render(){

        const OnChange = (e) =>{
            let currency = this.state.countries.indexOf(e.target.value);
            let baseRate = this.state.rates[currency];

            function newRates (rate) {
                return ((rate / baseRate));
            }

            if (e.target.value){
                let newRatesArr = this.state.rates.map(newRates);
                this.setState({rates: (newRatesArr)})
            }
        }
           
          return( 
          <div className='container'>
            <div className='row justify-content-center text-center'>
                <select className='selectCurrency' onChange = {OnChange}>{
                    this.state.countries.map((object) => {
                        return <option className='currency text-center' key={object}>{object}</option>
                    })
                }</select>
            </div>

            <div className='row d-flex justify-content-center text-center currencyList'>
                <div className='col-4'>
                  {this.state.countries.map((object) => {
                            return <p className='countries' key={object}>{object}</p>
                        })
                  }
                </div>

                <div className='col-4'>
                  {this.state.values.map((object) => {
                            return <p className='value' key={object}>{object}</p>
                        })
                  }
                </div>

                <div className='col-4'>
                  {this.state.rates.map((object) => {
                            return <p className='rate' key={object}>{object.toFixed(3)}</p>
                        })
                  }
                </div>
            </div>            
          </div>
          )

    }
}
export default CurrencyList;
