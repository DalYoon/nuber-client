import React from "react";
import styled from "../../typed-components";

import { getChat, myProfile } from "../../types/api";

import Header from "../../Components/Header";
import Message from "../../Components/Message";

const Container = styled.div``;

interface IProps {
  chatData?: getChat;
  userData?: myProfile;
  loading: boolean;
}

const ChatPresenter: React.SFC<IProps> = ({
  chatData: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  loading
}) => (
  <Container>
    <Header title={"Chat"} />
    {!loading &&
      chat &&
      user && (
        <React.Fragment>
          {chat.messages &&
            chat.messages.map(message => {
              if (message) {
                return (
                  <Message key={message.id} text={message.text} mine={user.id === message.userId} />
                );
              } else {
                return null;
              }
            })}
        </React.Fragment>
      )}
  </Container>
);

export default ChatPresenter;
