import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";

import { IHome } from "./Home.types";

const Wrapper = styled.div`
  width: 750px;
  height: fit-content;
  background-color: #fff;
  padding: 8px;
  border-radius: 4px;
`;

const Home: React.FC<IHome> = (props) => {
  return (
    <Wrapper>
      Home
    </Wrapper>
  );
};

export default observer(Home);
