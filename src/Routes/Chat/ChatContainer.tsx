import { SubscribeToMoreOptions } from "apollo-boost";
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
import { GET_CHAT, MESSAGE_SUBSCRIPTION, SEND_MESSAGE } from "./ChatQueries";

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
      location: {
        state: { rideUrl }
      },
      match: {
        params: { chatId }
      }
    } = this.props;
    const { message } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData }) => (
          <ChatQuery query={GET_CHAT} variables={{ chatId }}>
            {({ data: chatData, loading, subscribeToMore }) => {
              const subscibeOptions: SubscribeToMoreOptions = {
                document: MESSAGE_SUBSCRIPTION,
                updateQuery: this.handleMessageUpdate
              };
              subscribeToMore(subscibeOptions);
              return (
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
                        rideUrl={rideUrl}
                      />
                    );
                  }}
                </SendMessageMutation>
              );
            }}
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
      this.setState({
        message: ""
      });
      this.sendMessageFn({
        variables: {
          chatId,
          text: message
        }
      });
    }
    return;
  };

  public handleMessageUpdate = (prev, { subscriptionData }) => {
    if (!subscriptionData.data) {
      return prev;
    }

    const {
      data: { MessageSubscription }
    } = subscriptionData;
    const {
      GetChat: {
        chat: { messages }
      }
    } = prev;

    const newMessageId = MessageSubscription.id;
    const lastMessageId = messages[messages.length - 1].id;

    if (newMessageId === lastMessageId) {
      return;
    }

    const newObject = Object.assign({}, prev, {
      GetChat: {
        ...prev,
        chat: {
          ...prev.GetChat.chat,
          messages: [...prev.GetChat.chat.messages, MessageSubscription]
        }
      }
    });

    return newObject;
  };
}

export default ChatContainer;
