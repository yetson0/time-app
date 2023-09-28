import React, { useState, useEffect } from 'react';
import GetTime from './GetTime';

const Home = (props) => {
  return (
    <>
    {/* <p>Properties: {props.vars}</p> */}
    <GetTime />
    </>

  );
};

export default Home;