import React from "react";
import DataManager from "./DataManager";
import App from "./App";
import ReactDOM from "react-dom";

const Root = () => (
  <DataManager>
    {({ data, onClick, getDataByTag, getAllData, addNewLinks, dbReady }) => (
      <App
        data={data}
        onClick={onClick}
        getDataByTag={getDataByTag}
        getAllData={getAllData}
        addNewLinks={addNewLinks}
        dbReady={dbReady}
      />
    )}
  </DataManager>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<Root />, rootElement);
