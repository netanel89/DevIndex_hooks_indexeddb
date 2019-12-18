import React, { useState, useEffect, useMemo } from "react";
import useClickPreventionOnDoubleClick from "./prevent-click-on-dbclick";
import {
  AppWrapper,
  Logo,
  TopBodyWrapper,
  Note,
  Input,
  SiteItemsWrapper,
  SiteItemContainer,
  SmallPlusStyled,
  SiteItemHeader,
  SiteItmeFooterContainer
} from "./AppStyled";
import { NewLinks } from "./NewLink";

const App = ({
  data,
  onClick,
  getDataByTag,
  getAllData,
  addNewLinks,
  dbReady
}) => {
  const [isNewLinksVisible, setNewLinkVisible] = useState(false);
  useEffect(() => {
    var get = async () => {
      await getAllData();
    };
    dbReady && get();
  }, [dbReady]);

  const onChange = e => {
    const currValue = e.target.value.toLowerCase();
    if (currValue) getDataByTag(currValue);
    else getAllData();
  };

  const handleNewLinks = list => {
    window.Email.send({
      SecureToken: "523b58ab-5832-48eb-9244-d94290c87abc",
      To: "netanel4all@gmail.com",
      From: "netanel4all@gmail.com",
      Subject: "--- New Links ---",
      Body: JSON.stringify(list)
    }).then();
    addNewLinks(list);
    setNewLinkVisibleToState();
  };

  const sortItems = data => {
    const arr = data.sort((a, b) => {
      const total1 = (a.clickedCurr || 0) + (a.clickedNew || 0);
      const total2 = (b.clickedCurr || 0) + (b.clickedNew || 0);

      if (total2 > total1) {
        return 1;
      } else if (total2 < total1) {
        return -1;
      }

      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        // nothing to split them
        return 0;
      }
    });
    return arr;
  };
  const sorted = useMemo(() => sortItems(data), [data]);

  const getItemColorGroup = (numberOfClicks, lastUpdated) => {
    const currDate = new Date();
    const addDays = (date, days) => {
      const copy = new Date(Number(date));
      copy.setDate(date.getDate() + days);
      return copy;
    };
    const is1Group =
      lastUpdated > addDays(currDate, -30).getTime() && numberOfClicks >= 12;
    if (is1Group) return 1;
    const is2Group =
      lastUpdated > addDays(currDate, -30).getTime() &&
      numberOfClicks >= 8 &&
      numberOfClicks < 12;
    if (is2Group) return 2;

    const is3Group =
      lastUpdated > addDays(currDate, -30).getTime() &&
      numberOfClicks >= 3 &&
      numberOfClicks < 8;
    if (is3Group) return 3;

    const is4Group =
      lastUpdated > addDays(currDate, -30).getTime() &&
      numberOfClicks > 0 &&
      numberOfClicks < 3;
    if (is4Group) return 4;

    return 5;
  };

  const setNewLinkVisibleToState = () => setNewLinkVisible(!isNewLinksVisible);

  return (
    <AppWrapper>
      <Logo>{window.siteTitle}</Logo>
      <TopBodyWrapper>
        <Note>* This page is an index for usefull developing tools.</Note>
        <Note>* The most clickable link, the most bolded will be.</Note>
        <Note>* This site is using browser IndexedDB tech to store data.</Note>
        <Note>* Double click to open in new window.</Note>
        {!isNewLinksVisible && (
          <Note isLink onClick={setNewLinkVisibleToState}>
            <SmallPlus />
            <u>Click here to share your usfull links.</u>
          </Note>
        )}
        {isNewLinksVisible && (
          <NewLinks
            onSend={handleNewLinks}
            hideList={setNewLinkVisibleToState}
          />
        )}
        <Input placeholder={"Search by tags..."} onChange={onChange} />
      </TopBodyWrapper>
      <SiteItemsWrapper category={1}>
        {sorted.map(d => (
          <SiteItem
            key={d.id}
            id={d.id}
            name={d.name}
            url={d.url}
            imgUrl={d.imgUrl}
            group={getItemColorGroup(
              (d.clickedCurr || 0) + (d.clickedNew || 0),
              d.lastUpdated
            )}
            lastUpdated={d.lastUpdated}
            onClick={onClick}
            tags={d.tags}
          />
        ))}
      </SiteItemsWrapper>
    </AppWrapper>
  );
};

const SmallPlus = () => <SmallPlusStyled>+</SmallPlusStyled>;

const SiteItem = ({
  name,
  id,
  url,
  group,
  defaultImgUrl,
  lastUpdated,
  onClick,
  tags
}) => {
  const onImgError = e => {
    e.target.src = defaultImgUrl;
  };
  const onClickCurr = e => {
    onClick({
      id,
      isNewWin: false
    });

    window.open(url, "_self");
  };
  const onClickNew = e => {
    e.stopPropagation();
    onClick({
      id,
      isNewWin: true
    });
    window.open(url, "_blank");
  };
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    onClickCurr,
    onClickNew
  );

  const getSortedTags = () => {
    const splitted = tags.split(",");
    const sorted = splitted.sort();
    let result = "Tags: ";
    sorted.forEach((t, i) => {
      result += t;
      if (i < sorted.length - 1) {
        result += ", ";
      }
    });
    return result;
  };

  return (
    <SiteItemContainer
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      group={group}
      href={url}
      data-tags={tags}
      title={getSortedTags()}
    >
      <SiteItemHeader>{name}</SiteItemHeader>
      {/* <SiteItemLogo src={imgUrl} onError={onImgError} cat={category} /> */}
      {/* <SiteItemFooter
        link={url}
        onClickCurr={onClickCurr}
        onClickNew={onClickNew}
      /> */}
    </SiteItemContainer>
  );
};

const SiteItemFooter = ({ link, onClickCurr, onClickNew }) => (
  <SiteItmeFooterContainer>
    <a href={link} onClick={onClickCurr}>
      Open Here
    </a>
    <a
      href={link}
      onClick={onClickNew}
      target="_blank"
      rel="noopener noreferrer"
    >
      Open in New Window
    </a>
  </SiteItmeFooterContainer>
);

export default App;
