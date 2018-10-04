import React from "react";
import styled from "../../typed-components";

import Button from "../Button";

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopUp = styled.div`
  width: 80%;
  min-height: 350px;
  background-color: white;
  font-size: 14px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BullShit = styled.div``;

const SkipPopUp = () => (
  <Container>
    <PopUp>
      <BullShit>
        You know..
        <br />
        <br />
        Actually I made phone verification
        <br />
        <br />
        However, to verify your phone, I need to pay
        <br />
        <br />
        So...Let's move on, just skip it
        <br />
        <br />
        Click the 'verify' button
        <br />
        <br />
        Who cares, you are verified
      </BullShit>
      <Button value={"verify"} onClick={null} />
    </PopUp>
  </Container>
);

export default SkipPopUp;
