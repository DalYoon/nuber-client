import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps<any> {}

const OutHomePresenter: React.SFC<IProps> = () => <span>This is OutHome</span>;

export default OutHomePresenter;
