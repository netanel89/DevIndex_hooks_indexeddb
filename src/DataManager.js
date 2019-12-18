import { useState, useEffect } from "react";
import { openDB } from "idb";
import scheme from "./scheme";

const DB_NAME = "handyDB";

const DataManager = ({ children }) => {
  const [db, updateDbInstance] = useState(null);
  const [data, updateData] = useState([]);
  const [isLoading, updateIsLoading] = useState(false);

  useEffect(() => {
    var init = async function() {
      await initDB();
    };
    init();
  }, []);

  const initDB = async () => {
    const dbVersion = dbVersion || 3;

    const onupgradeneeded = function(db) {
      createObjectStore(db);
    };

    // Create/open database
    const createObjectStore = async function(db) {
      const objectStore = db.createObjectStore(scheme.name, scheme.options);
      // define what data items the objectStore will contain
      // scheme.indexes.forEach(index =>
      //   objectStore.createIndex(index.name, index.keyPath, index.options)
      // );
    };

    const dbInst = await openDB(DB_NAME, dbVersion, {
      upgrade(db) {
        onupgradeneeded(db);
      }
    });

    await populateDb(dbInst);
    updateDbInstance(dbInst);
  };

  const populateDb = async db => {
    const currList = await db.getAll(DB_NAME);
    window.dataJson.forEach(d => {
      const curr = currList.find(n => n.code === d.code);
      if (curr) {
        d.id = curr.id;
        d.clickedNew = curr.clickedNew;
        d.clickedCurr = curr.clickedCurr;
      }
      d.lastUpdated = (curr && curr.lastUpdated) || new Date().getTime();
    });

    const tx = db.transaction("handyDB", "readwrite");
    for (var i = 0; i < window.dataJson.length; i++) {
      await tx.store.put(window.dataJson[i]);
    }
    await tx.done;
  };

  const getAllData = async () => {
    updateIsLoading(true);
    const result = await db.getAll(DB_NAME);
    onDataSuccess(result);
  };

  const getDataByTag = async tag => {
    // const result = await db.getAllFromIndex(DB_NAME, "tags", tag);
    let result = await db.getAll(DB_NAME);
    const fixedTag = tag.trim().replace(" ", ",");
    result = result.filter(
      r =>
        r.name.toLowerCase().includes(fixedTag) ||
        r.tags.toLowerCase().includes(fixedTag)
    );
    onDataSuccess(result);
  };

  const onDataSuccess = result => {
    // if (result && result.length > 0) {
    updateData(result);
    // }
    updateIsLoading(false);
  };

  const updateStore = async (row, dbInst = null) => {
    await db.put(DB_NAME, row);
    const result = await db.getAll(DB_NAME);
    onDataSuccess(result);
  };

  const onClick = async clickConfig => {
    // const store = getHandyStore();
    updateIsLoading(true);
    const result = await db.get(DB_NAME, clickConfig.id);
    if (!result.clickedNew) result.clickedNew = 0;
    if (!result.clickedCurr) result.clickedCurr = 0;

    if (clickConfig.isNewWin) {
      result.clickedNew = ++result.clickedNew;
    } else {
      result.clickedCurr = ++result.clickedCurr;
    }
    result.lastUpdated = new Date().getTime();
    updateStore(result);
  };

  const addNewLinks = async list => {
    const tx = db.transaction("handyDB", "readwrite");
    for (var i = 0; i < list.length; i++) {
      await tx.store.put({
        name: list[i].name,
        code: list[i].name.replace(" ", ""),
        url: list[i].url,
        tags: list[i].tags,
        lastUpdated: new Date().getTime()
      });
    }
    await tx.done;
    const result = await db.getAll(DB_NAME);
    onDataSuccess(result);
  };

  //initDB();
  return children({
    data,
    onClick,
    getDataByTag,
    getAllData,
    addNewLinks,
    dbReady: db ? true : false
  });
};

export default DataManager;
