import React from "react";
import styled from "../../typed-components";

const Container = styled<{ mine: boolean }, any>("div")`
  background-color: ${props => (props.mine ? props.theme.blueColor : props.theme.greyColor)};
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  align-self: ${props => (props.mine ? "flex-end" : "flex-start")};
  border-bottom-right-radius: ${props => (props.mine ? "0px" : "20px")};
  border-bottom-left-radius: ${props => (!props.mine ? "0px" : "20px")};
`;

interface IProps {
  mine: boolean;
  text: string;
}

const Message: React.SFC<IProps> = ({ mine, text }) => <Container mine={mine}>{text}</Container>;

export default Message;
