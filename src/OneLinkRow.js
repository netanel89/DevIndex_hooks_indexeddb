import React from "react";
import styled from "styled-components";

export const OneLinkRow = ({ id, name, url, tags, onChange, onRemove }) => {
  const onChangeInner = e => {
    let newValue = {
      id,
      name,
      url,
      tags
    };
    const allClassed = e.target.className;
    if (allClassed.includes("name-input")) {
      newValue.name = e.target.value;
    }
    if (allClassed.includes("url-input")) {
      newValue.url = e.target.value;
    }
    if (allClassed.includes("tags-input")) {
      newValue.tags = e.target.value;
    }

    onChange(newValue);
  };

  const onRemoveInner = () => {
    onRemove(id);
  };
  return (
    <OneLinkRowWrapper>
      <NameInput
        className="name-input"
        onChange={onChangeInner}
        value={name}
        minLength={3}
        required
        placeholder="Name"
      />
      <UrlInput
        className="url-input"
        onChange={onChangeInner}
        value={url}
        type="url"
        required
        placeholder="https://example.com"
      />
      <TagsInput
        className="tags-input"
        onChange={onChangeInner}
        value={tags}
        placeholder="Tags comma seperated"
      />
      <Remover onClick={onRemoveInner}>
        <span />
      </Remover>
    </OneLinkRowWrapper>
  );
};

const Remover = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 15px;
    padding: 3px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #ffeeee;
    cursor: pointer;
    transition: all 0.2s ease-in;
    &:hover {
      background-color: #ffe4e4;
    }
    &:after {
      content: "✕";
    }
  }
`;

const NameInput = styled.input`
  flex: 1;
  padding: 5px;
  border-radius: 5px 0 0 5px;
  border: 1px solid #ccc;
`;
const UrlInput = styled.input`
  flex: 3;
  padding: 5px;
  border: 1px solid #ccc;
`;
const TagsInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 0 5px 5px 0;
`;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 5px;
  border: 1px solid #ccc;
`;
const OneLinkRowWrapper = styled.div`
  display: flex;
  padding: 5px 0px;
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
