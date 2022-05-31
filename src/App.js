import { useState, useEffect } from 'react';

import Logo from './images/logo.svg'


function App() {

  const [chartData, setChartData] = useState(null);
  const [day, setDay] = useState('');

  const getDay = () => {
    const d = new Date();
    let day = d.getDay();
    let dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    let currentDay = dayOfWeek[day]

    setDay(currentDay);

  }

  useEffect(() => {

    const getData = async () => {
      let res = await fetch('./data/data.json')
      let data = await res.json();

      setChartData(data);
    }

    getData();
    getDay();

  }, [])


  return (
    <main className="App">

      <div className="red-section">
        <p>My balance <br></br> <span>$921.48</span></p>
        <img src={Logo} alt="logo" />
      </div>

      <div className="main-section">
        <h1>Spending - Last 7 days</h1>
        <div className='charts'>
          {chartData && chartData.map(chart => (<div key={chart.day} className='chart-container'>
            <div className='chart' style={{ height: chart.amount * 2.5 + "px", backgroundColor: day == chart.day ? "#76b5bc" : "#ec775f" }}>
              <div className='chart-amount'>${chart.amount}</div>
            </div>
            <p>{chart.day}</p>
          </div>))}
        </div>
        <hr />
        <p className='total'>Total this month</p>
        <div className='numbers'>
          <p className='big-number'>$478.33</p>
          <p className='last-month'>+2.4% <br /> <span>from last month</span> </p>
        </div>
      </div>

    </main>
  );
}

export default App;
