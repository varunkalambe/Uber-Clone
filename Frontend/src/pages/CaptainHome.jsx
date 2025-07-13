import React, { useEffect, useContext, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainHome = () => {
  return (
    <div>
      <h1>Welcome to Captain Home</h1>
    </div>
  )
}

export default CaptainHome
