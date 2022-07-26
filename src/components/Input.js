import React from 'react';
import Chart from 'chart.js';


class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      rates: [],
      currencyBase:'USD',
      currencyTarget:'EUR',
      baseValue: 1,
      input1: 1,
    }

    this.chartRef = React.createRef();
  }

    
   
    componentDidMount() {
       fetch('https://altexchangerateapi.herokuapp.com/latest?from=USD')
        .then((response) => {return response.json()}) 
        .then((data)=> {
            this.setState({
               values: ([data.base, ...Object.keys(data.rates)]),
               rates: data.rates
            })
            console.log(this)
        }).catch((error) => {
            console.log(error);
        });
        
        this.getHistoricalRates(this.state.currencyBase, this.state.currencyTarget)
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
            this.getHistoricalRates(this.state.currencyBase, this.state.currencyTarget);
        })
    }

    onInputChange =(e) => {
    this.setState({
      input1: e.target.value
    })
    }

    getHistoricalRates = (base, quote) => {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date((new Date()).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
  
      fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
        .then((response) => {return response.json()}) 
        .then(data => {
          if (data.error) {
            throw new Error(data.error);
          }
  
          const chartLabels = Object.keys(data.rates);
          const chartData = Object.values(data.rates).map(rate => rate[quote]);
          const chartLabel = `${base}/${quote}`;
          this.buildChart(chartLabels, chartData, chartLabel);
        })
        .catch(error => console.error(error.message));

    }
  
    buildChart = (labels, data, label) => {

      const chartRef = this.chartRef.current.getContext("2d");
  
      if (typeof this.chart !== "undefined") {
        this.chart.destroy();
      }
  
      this.chart = new Chart(this.chartRef.current.getContext("2d"), {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: label,
              data,
              fill: false,
              tension: 0,
            }
          ]
        },
        options: {
          responsive: true,
        }
      })
    }

    
    
    render(){        
          const { baseValue, currencyTarget, rates, input1 } = this.state;

          return( 
           <React.Fragment>
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
                <input className='Rate1' type='number' defaultValue={this.state.baseValue} onInput={this.onInputChange}/>
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
                  <input className='Rate2' type='number' disabled={true} value={rates[currencyTarget]* baseValue  * input1}/>
                </div>
            </div>       
        </div>
        <div className='graph'>
         <canvas ref={this.chartRef} />
        </div>
         </React.Fragment>
          )

    }
     //...

}
export default Input;
