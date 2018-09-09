```typescript
import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import styled from "../../typed-components";

import Header from "../../Components/Header";
import Place from "../../Components/Place";

const Container = styled.div`
  padding: 0px 40px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const LogOut = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const SettingsPresenter = () => (
  <React.Fragment>
    <Helmet>
      <title>Settings | Nuber</title>
    </Helmet>
    <Header title={"Account Settings"} backTo={"/"} />
    <Container>
      <GridLink to="/edit-account">
        <Image src="https://res.cloudinary.com/dbfkfuxui/image/upload/v1536499357/ghpva8zkzwqbdizbsdcp.jpg" />
        <Keys>
          <Key>DalYoon</Key>
          <Key>DalYoon@go</Key>
        </Keys>
      </GridLink>
      <Place fav={false} name={"Home"} address={"12345"} />
      <Place fav={false} name={"Home"} address={"12345"} />
      <Place fav={false} name={"Home"} address={"12345"} />
      <LogOut>Log Out</LogOut>
    </Container>
  </React.Fragment>
);

export default SettingsPresenter;
```
