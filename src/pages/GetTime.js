import React, { useState, useEffect } from 'react';

const GetTime = (props) => {
  const fetchUrl = 'http://worldtimeapi.org/api/timezone'
  const [timezonesArray, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // fetch timezonesArray - data about time zones
  useEffect(() => {
    fetch(`${fetchUrl}`)
    .then(resp => resp.json())
    .then(data => setTimezones(data))
    .catch(error => console.error('Fetch error:', error));
  }, []); // exec only on mount

  // fetch time using interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedTimezone) {
        fetch(`${fetchUrl}/${selectedTimezone}`)
        .then(resp => resp.json())
        .then(data => {
          // const date = new Date(data.datetime);
          // setCurrentTime(date.toLocaleString('pl')); // pl datetime format, FIXME: datetime doesn't update on timezone
          setCurrentTime(data.datetime);
        })
        .catch(error => console.error('Fetch error:', error))
      }
    }, 5000); // 5000 for 5s
    return () => clearInterval(interval);
  }, [selectedTimezone]); // exec only when this var changes
  
  // build html
  const changeHandler = (e) => {setSelectedTimezone(e.target.value)};
  return (
    <section>
      <h2>GetTime container</h2>
      <select onChange={changeHandler} defaultValue={'select'}>
        <option>Select timezone</option>
        {
          timezonesArray.map((timezone) => <option key={timezone} value={timezone}>{timezone}</option>)
        }
      </select>
      
      {/* print out time */}
      {currentTime && (
        <div>
          <p>Current time at:<br />
          <strong>{selectedTimezone}</strong><br />
          {currentTime}</p>
        </div>
      )}
    </section>
  );
}

export default GetTime;