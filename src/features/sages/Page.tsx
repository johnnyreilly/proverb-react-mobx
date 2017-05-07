import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { inject, observer } from "mobx-react";

import SageThumbnail from "./SageThumbnail";
import { SagesStore } from "../../shared/stores/SagesStore";
import Waiting from "../../shared/components/Waiting";

type Props = RouteComponentProps<{}> & { sagesStore: SagesStore };

@inject("sagesStore")
@observer
export default class Sages extends React.Component<Props, undefined> {
  componentDidMount() {
    const { sagesStore } = this.props;
    if (!sagesStore.sagesIsInitialised) {
      sagesStore.loadSages();
    }
  }

  render() {
    const { sagesIsInitialised, sages } = this.props.sagesStore;

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
