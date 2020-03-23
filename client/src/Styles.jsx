import styled from 'styled-components';

const AppWrapper = styled.div`
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-image-outset: 0px;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-left-style: solid;
  border-left-width: 1px;
  border-right-style: solid;
  border-right-width: 1px;
  border-top-style: solid;
  border-top-width: 1px;
  box-sizing: border-box;
  display: block;
  font-family: Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif;
  font-size: 14px;

  line-height: 20.02px;
  margin: 10;
  padding: 20px;
  text-size-adjust: 100%;
  width: 376px;
`;

const Price = styled.span`
  box-sizing: border-box;
  color: rgb(72, 72, 72);
  display: inline;
  font-size: 22px;
  font-weight: 600;
  height: auto;
  line-height: 1.44444em !important;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  overflow-wrap: break-word;
  text-size-adjust: 100%;
  width: auto;
  -webkit-font-smoothing: antialiased;
`;

const Star = styled.img`
  width: 9px;
`;


const Reserve = styled.button`
  display: inline-block !important;
  position: relative !important;
  text-align: center !important;
  transition-property: background, border-color, color !important;
  transition-duration: 0.2s !important;
  transition-timing-function: ease-out !important;
  cursor: pointer !important;
  width: 100% !important;
  min-width: 71.1935px !important;
  margin: 0px !important;
  text-decoration: none !important;
  border-radius: 4px !important;
  border-width: 2px !important;
  border-style: solid !important;
  background: rgb(255, 90, 95) !important;
  border-color: transparent !important;
  -webkit-appearance: button;
  box-sizing: border-box !important;
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  word-spacing: normal;
  text-indent: 0px;
  text-shadow: none;
  align-items: flex-start;
  font: 400 11px system-ui;
  font-size: 16px !important;
  line-height: 24px !important;
  letter-spacing: normal !important;
  font-weight: 600 !important;

  text-transform: undefined !important;
  padding: 10px 22px !important;
  box-shadow: none !important;
  color: #ffffff !important;
`;

const CircleButton = styled.button`
  background-color: #ffffff;
  border: solid;
  border-color: green;
  padding: 5px;
  display: inline-block;
  margin: 4px 2px;
  border-radius: 50%;
  border-width: .5px;
`;

export default { AppWrapper, Reserve, Price, Star, CircleButton };
