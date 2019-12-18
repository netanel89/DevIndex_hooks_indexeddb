import React from "react";
import styled from "styled-components";

export const PlusOne = ({ onClick }) => (
  <PlusOneStyled onClick={onClick}>
    <span />
  </PlusOneStyled>
);

const PlusOneStyled = styled.div`
  display: flex;
  span {
    width: 15px;
    padding: 1px 3px;
    margin-right: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    text-align: center;
    background-color: #ffeeee;
    cursor: pointer;
    transition: all 0.2s ease-in;
    &:hover {
      background-color: #ffe4e4;
    }
    &:after{
      content: "+"
    }
`;
