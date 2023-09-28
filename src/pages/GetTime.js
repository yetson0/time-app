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
    .then(data => {
      setTimezones(data);
      console.log(data);
    })
    .catch(error => console.error('Fetch error:', error))
  }, []);

  // fetch time using interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedTimezone) {
        fetch(`${fetchUrl}/${selectedTimezone}`)
        .then(resp => resp.json())
        .then(data => {
          // const date = new Date(data.datetime);
          // setCurrentTime(date.toLocaleString());
          setCurrentTime(data.datetime.toLocaleString());
        })
        .catch(error => console.error('Fetch error:', error))
      }
    }, 1000); // 5000 for 5s
    return () => clearInterval(interval);
  }, [selectedTimezone]);

  const changeHandler = (e) => {setSelectedTimezone(e.target.value);}
  
  // build webpage
  return (
    <form>
      <h2>GetTime container</h2>
      {/* <p>Properties: {props.vars}</p> */}

      <select value={timezonesArray} onChange={changeHandler}>
      <option value=''>Select timezone</option>
      {timezonesArray.map(timezone => {
        return (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
          )
        })
      }
      </select>
      {currentTime && (
        <div>
          <p>Current time at:<br />
          <strong>{selectedTimezone}</strong><br />
          {currentTime}</p>
        </div>
      )}
    </form>
  );
}

export default GetTime;