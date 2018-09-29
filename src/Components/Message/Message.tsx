import React from "react";
import styled from "../../typed-components";

const Container = styled<{ mine: boolean }, any>("div")``;

interface IProps {
  mine: boolean;
  text: string;
}

const Message: React.SFC<IProps> = ({ mine, text }) => <Container mine={mine}>{text}</Container>;

export default Message;
