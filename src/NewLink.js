import React, { useState } from "react";
import { PlusOne } from "./common";
import { OneLinkRow } from "./OneLinkRow";
import styled from "styled-components";

export const NewLinks = ({ onSend, hideList }) => {
  const [list, setList] = React.useState([
    { id: 1, name: "", url: "", tags: "" }
  ]);
  const onSendClick = e => {
    e.preventDefault();
    onSend(list);
  };
  const onChange = newValue => {
    let newList = [];
    newList = list.map(i => {
      if (i.id === newValue.id) {
        return newValue;
      }
      return i;
    });
    setList(newList);
  };
  const onRemove = id => {
    let newList = [];
    newList = list.filter(i => i.id !== id);
    setList(newList);
    if (newList.length === 0) {
      hideList();
    }
  };
  const onAdd = () => {
    let newList = [];
    const lastItemId = list[list.length - 1].id;
    newList = [...list, { id: lastItemId + 1, name: "", url: "", tags: "" }];
    setList(newList);
  };
  return (
    <Wrapper onSubmit={onSendClick}>
      {list.map((ns, i) => (
        <OneLinkRow
          id={i + 1}
          key={i + 1}
          {...ns}
          onChange={onChange}
          onRemove={onRemove}
        />
      ))}
      <BtnsWrapper>
        <PlusOne onClick={onAdd} />
        <SendBtn type="submit">
          <span>Send</span>
        </SendBtn>
      </BtnsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 5px;
  border: 1px solid #ccc;
`;

const SendBtn = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  span {
    padding: 2px 5px;
    background-color: #90d8fa;
    border-radius: 5px;
    border: 1px solid #ccc;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in;
    &:hover {
      background-color: #71a6f2;
    }
  }
`;

const BtnsWrapper = styled.div`
  display: flex;
  padding: 5px 0;
`;
