import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { toast } from "react-toastify";

import { USER_PROFILE } from "../../sharedQueries";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import { myProfile, toggleDriving } from "../../types/api";
import { TOGGLE_DRIVING } from "./MunuQueries";

import MenuPresenter from "./MenuPresenter";

class ProfileQuery extends Query<myProfile> {}
class ToggleDrivingMutation extends Mutation<toggleDriving> {}

interface IProps extends RouteComponentProps<any> {}

class MenuContainer extends React.Component<IProps> {
  public logOutFn: MutationFn;

  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logOutFn => {
          this.logOutFn = logOutFn;
          return (
            <ToggleDrivingMutation
              mutation={TOGGLE_DRIVING}
              update={this.handleDrivingUpdate}
              // refetchQueries={[{ query: USER_PROFILE }]}
            >
              {toggleDrivingFn => (
                <ProfileQuery query={USER_PROFILE}>
                  {({ data, loading }) => (
                    <MenuPresenter
                      data={data}
                      loading={loading}
                      toggleDrivingFn={toggleDrivingFn}
                      handleUserLogOut={this.handleUserLogOut}
                    />
                  )}
                </ProfileQuery>
              )}
            </ToggleDrivingMutation>
          );
        }}
      </Mutation>
    );
  }

  public handleDrivingUpdate = (cache, { data }) => {
    if (data) {
      const { ToggleDrivingMode } = data;

      if (!ToggleDrivingMode.ok) {
        toast.error(ToggleDrivingMode.error);
        return;
      }

      const query: myProfile | null = cache.readQuery({
        query: USER_PROFILE
      });

      if (query) {
        const {
          GetMyProfile: { user }
        } = query;

        if (user) {
          user.isDriving = !user.isDriving;
        }
      }

      cache.writeQuery({ query: USER_PROFILE, data: query });
    }
  };

  public handleUserLogOut = () => {
    const { history } = this.props;

    this.logOutFn();

    toast.success("Bye bye~");

    history.push("/nuber-client");
  };
}

export default withRouter(MenuContainer);
