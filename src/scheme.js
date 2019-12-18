export default {
  id: 1,
  name: "handyDB",
  options: {
    keyPath: "id",
    autoIncrement: true
  },
  indexes: [
    {
      name: "name",
      keyPath: "name",
      options: {
        unique: true
      }
    },
    // {
    //   name: "url",
    //   keyPath: "url",
    //   options: {
    //     unique: false
    //   }
    // },
    // {
    //   name: "clickedCurr",
    //   keyPath: "clickedCurr",
    //   options: {
    //     unique: false
    //   }
    // },
    // {
    //   name: "clickedNew",
    //   keyPath: "clickedNew",
    //   options: {
    //     unique: false
    //   }
    // },
    // {
    //   name: "lastClicked",
    //   keyPath: "lastClicked",
    //   options: {
    //     unique: false
    //   }
    // },
    // {
    //   name: "imgUrl",
    //   keyPath: "imgUrl",
    //   options: {
    //     unique: false
    //   }
    // },
    {
      name: "tags",
      keyPath: "tags",
      options: {
        unique: false
        // multiEntry: true
      }
    }
  ]
};
