import React, { useEffect } from "react";
import { observer } from "mobx-react";

import Home from "./Home";

const ConnectedItem: React.FC<any> = (props) => {
  
  useEffect(() => {
    console.log("> Mount ");
  }, []);

  return <Home />;
};

export default observer(ConnectedItem);
