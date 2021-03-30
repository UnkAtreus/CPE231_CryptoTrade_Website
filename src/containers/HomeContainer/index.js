import * as React from "react";
import {
  HomeStyled
} from './styled'


const HomeContainer = ({ match, ...props }) => {
  return (
    <React.Fragment>
      <HomeStyled>
        Test
      </HomeStyled>
    </React.Fragment>
  );
};

export default HomeContainer;
