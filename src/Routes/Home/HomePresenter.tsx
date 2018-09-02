import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "../../typed-components";

const Container = styled.div``;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Home: React.SFC<IProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <Container>
      <Helmet>
        <title>Home | Nuber</title>
      </Helmet>
      <Sidebar
        sidebar={<b>Sidebar content</b>}
        open={isMenuOpen}
        onSetOpen={toggleMenu}
        styles={{
          sidebar: {
            background: "white",
            width: "80%",
            zIndex: "10"
          }
        }}
      >
        <button onClick={() => toggleMenu()}>Open sidebar</button>
      </Sidebar>
    </Container>
  );
};

export default Home;
