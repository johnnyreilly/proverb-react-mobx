import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { inject, observer } from "mobx-react";

import AppState from "../../appState";
import Waiting from "../../shared/components/Waiting";
import SageThumbnail from "./SageThumbnail";

type Props = RouteComponentProps<{}> & { appState: AppState };

@inject("appState")
@observer
export default class Sages extends React.Component<Props, undefined> {
  componentDidMount() {
    const { appState } = this.props;
    if (!appState.sagesIsInitialised) {
      appState.loadSages();
    }
  }

  render() {
    const { sagesIsInitialised, sages } = this.props.appState;

    return (
      <div className="container">
        <h2>Sages</h2>

        {sagesIsInitialised
          ? [...sages.values()].map((sage, index) => <SageThumbnail key={index} sage={sage} />)
          : <Waiting />}
      </div>
    );
  }
}
