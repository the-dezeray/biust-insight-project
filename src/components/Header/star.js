import React from 'react';
import styled from 'styled-components';

const Star = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="blackhole">
          <div className="blackhole-circle" />
          <div className="blackhole-disc" />
        </div>
        <div className="curve">
          <svg viewBox="0 0 500 500">
            <path id="loading" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
            <text width={500}>
              <textPath xlinkHref="#loading">
            
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    display: flex;
    width: 8rem;
    height: 8rem;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;
  }

  .curve {
    width: 180%;
    height: 180%;
    position: absolute;
    animation: rotate 8s linear infinite;
    fill: transparent;
  }

  .curve text {
    letter-spacing: 20px;
    text-transform: uppercase;
    font: 1.5em "Fira Sans", sans-serif;
    fill: white;
    filter: drop-shadow(0 2px 8px black);
  }

  .blackhole {
    z-index: -1;
    display: flex;
    position: absolute;
    width: 8rem;
    height: 8rem;
    align-items: center;
    justify-content: center;
  }

  .blackhole-circle {
    z-index: 0;
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle at center, black 25%, white 35%, white 100%);
    box-shadow: 0px 0px 2rem #c2babb;
    align-items: center;
    justify-content: center;
  }

  .blackhole-circle::after {
    z-index: 0;
    position: absolute;
    content: "";
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid white;
    background: radial-gradient(circle at center, black 35%, white 60%, white 100%);
    box-shadow: 0px 0px 5rem #c2babb;
    align-items: center;
    justify-content: center;
    filter: blur(4px);
    animation: pulseAnimation linear infinite 2s alternate-reverse;
  }

  .blackhole-circle::before {
    z-index: 1;
    content: "";
    display: flex;
    width: 4rem;
    height: 4rem;
    border: 2px solid #ffffff;
    box-shadow: 3px 3px 10px #c2babb, inset 0 0 1rem #ffffff;
    border-radius: 50%;
    top: 5rem;
    filter: blur(0.5px);
    animation: rotate linear infinite 3s;
  }

  .blackhole-disc {
    position: absolute;
    z-index: 0;
    display: flex;
    width: 5rem;
    height: 10rem;
    border-radius: 50%;
    background: radial-gradient(circle at center, #ffffff 80%, #353535 90%, white 100%);
    filter: blur(1rem) brightness(130%);
    border: 1rem solid white;
    box-shadow: 0px 0px 3rem #d7c4be;
    transform: rotate3d(1, 1, 1, 220deg);
    animation: pulseAnimation2 linear infinite 2s alternate-reverse;
    justify-content: center;
    align-items: center;
  }

  .blackhole-disc::before {
    content: "";
    position: absolute;
    z-index: 0;
    display: flex;
    width: 5rem;
    height: 10rem;
    border-radius: 50%;
    background: radial-gradient(circle at center, #ffffff 80%, #353535 90%, white 100%);
    filter: blur(3rem);
    border: 1rem solid white;
    box-shadow: 0px 0px 6rem #d7c4be;
    animation: pulseAnimation linear infinite 2s alternate-reverse;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes pulseAnimation {
    0% {
      box-shadow: 0px 0px 3rem #c2babb;
      transform: scale(1);
    }

    100% {
      box-shadow: 0px 0px 5rem #c2babb;
      transform: scale(1.09);
    }
  }

  @keyframes pulseAnimation2 {
    0% {
      box-shadow: 0px 0px 3rem #c2babb;
      transform: rotate3d(1, 1, 1, 220deg) scale(1);
    }

    100% {
      box-shadow: 0px 0px 5rem #c2babb;
      transform: rotate3d(1, 1, 1, 220deg)  scale(.95);
    }
  }`;

export default Star;
