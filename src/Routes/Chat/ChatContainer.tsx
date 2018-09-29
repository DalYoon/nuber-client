import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { USER_PROFILE } from "../../sharedQueries";
import { getChat, getChatVariables, myProfile } from "../../types/api";
import { GET_CHAT } from "./ChatQueries";

import ChatPresenter from "./ChatPresenter";

interface IProps extends RouteComponentProps<any> {}
class ChatQuery extends Query<getChat, getChatVariables> {}
class ProfileQuery extends Query<myProfile> {}

class ChatContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    if (!props.match.params.chatId) {
      props.history.push("/");
    }
  }

  public render() {
    const {
      match: {
        params: { chatId }
      }
    } = this.props;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData }) => (
          <ChatQuery query={GET_CHAT} variables={{ chatId }}>
            {({ data: chatData, loading }) => (
              <ChatPresenter userData={userData} chatData={chatData} loading={loading} />
            )}
          </ChatQuery>
        )}
      </ProfileQuery>
    );
  }
}

export default ChatContainer;
