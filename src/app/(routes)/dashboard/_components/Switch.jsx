"use client";
import React from 'react';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';

const Switch = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <StyledWrapper>
      <label className="switch">
        <input 
          type="checkbox" 
          className="input" 
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <span className="slider">
          <div className="sun">
            <svg viewBox="0 0 24 24" fill="#FDB813">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41"/>
            </svg>
          </div>
          <div className="moon">
            <svg viewBox="0 0 24 24" fill="#73C0FC">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </div>
        </span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 20px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #73C0FC;
    transition: .4s;
    border-radius: 15px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 2px;
    bottom: 2px;
    z-index: 2;
    background-color: #e8e8e8;
    transition: .4s;
  }
  
  .sun svg {
    position: absolute;
    top: 3px;
    left: 20px;
    z-index: 1;
    width: 14px;
    height: 14px;
    animation: rotate 15s linear infinite;
  }
  
  .moon svg {
    position: absolute;
    top: 3px;
    left: 3px;
    z-index: 1;
    width: 14px;
    height: 14px;
    animation: tilt 5s linear infinite;
  }
  
  @keyframes rotate {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes tilt {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
    100% { transform: rotate(0deg); }
  }
  
  .input:checked + .slider {
    background-color: #183153;
  }
  
  .input:focus + .slider {
    box-shadow: 0 0 1px #183153;
  }
  
  .input:checked + .slider:before {
    transform: translateX(16px);
  }
`;

export default Switch;