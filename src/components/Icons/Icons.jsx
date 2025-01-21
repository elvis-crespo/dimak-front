/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
export const ToggleIcon = ({ isOpen, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className="open"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path_selector"
        d={
          isOpen
            ? "M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
            : "M448 160H320V128H448v32zM48 64C21.5 64 0 85.5 0 112v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zM448 352v32H192V352H448zM48 288c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V336c0-26.5-21.5-48-48-48H48z"
        }
      ></path>
    </svg>
  );
}

import styled from "styled-components";

const BinButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: rgb(255, 95, 95);
  cursor: pointer;
  border: 1px solid rgb(255, 201, 201);
  transition-duration: 0.3s;

  &:hover .bin-top {
    transform: rotate(45deg);
  }

  &:hover {
    background-color: rgb(255, 0, 0);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const BinTop = styled.svg`
  width: 17px;
  transform-origin: right;
  transition-duration: 0.3s;
`;

const BinBottom = styled.svg`
  width: 15px;
`;

const IconPath = styled.path`
  stroke: white;
  stroke-width: 4;
`;

export const ButtonDelete = ({ onClick }) => (
  <BinButton>
    <BinTop
      onClick={onClick}
      className="bin-top"
      viewBox="0 0 39 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4" />
      <line
        x1="12"
        y1="1.5"
        x2="26.0357"
        y2="1.5"
        stroke="white"
        strokeWidth="3"
      />
    </BinTop>

    <BinBottom
      onClick={onClick}
      className="bin-bottom"
      viewBox="0 0 33 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_8_19" fill="white">
        <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
      </mask>
      <path
        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
        fill="white"
        mask="url(#path-1-inside-1_8_19)"
      />
      <IconPath d="M12 6L12 29" />
      <IconPath d="M21 6V29" />
    </BinBottom>
  </BinButton>
);