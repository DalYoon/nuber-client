import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { USER_PROFILE } from "../../sharedQueries";
import {
  getChat,
  getChatVariables,
  myProfile,
  sendMessage,
  sendMessageVariables
} from "../../types/api";
import { GET_CHAT, SEND_MESSAGE } from "./ChatQueries";

import ChatPresenter from "./ChatPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  message: string;
}

class ChatQuery extends Query<getChat, getChatVariables> {}
class ProfileQuery extends Query<myProfile> {}
class SendMessageMutation extends Mutation<sendMessage, sendMessageVariables> {}

class ChatContainer extends React.Component<IProps, IState> {
  public sendMessageFn: MutationFn;

  constructor(props: IProps) {
    super(props);

    if (!props.match.params.chatId) {
      props.history.push("/");
    }

    this.state = {
      message: ""
    };
  }

  public render() {
    const {
      match: {
        params: { chatId }
      }
    } = this.props;
    const { message } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData }) => (
          <ChatQuery query={GET_CHAT} variables={{ chatId }}>
            {({ data: chatData, loading }) => (
              <SendMessageMutation mutation={SEND_MESSAGE}>
                {sendMessageFn => {
                  this.sendMessageFn = sendMessageFn;
                  return (
                    <ChatPresenter
                      userData={userData}
                      chatData={chatData}
                      loading={loading}
                      onInputChange={this.onInputChange}
                      messageText={message}
                      onSubmit={this.onSubmit}
                    />
                  );
                }}
              </SendMessageMutation>
            )}
          </ChatQuery>
        )}
      </ProfileQuery>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value, name }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };

  public onSubmit = () => {
    const { message } = this.state;
    const {
      match: {
        params: { chatId }
      }
    } = this.props;

    if (message !== "") {
      this.sendMessageFn({
        variables: {
          chatId,
          text: message
        }
      });
    }
    return;
  };
}

export default ChatContainer;
