import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { inject, observer } from "mobx-react";

import SageThumbnail from "./SageThumbnail";
import { SageStore } from "../../shared/stores/SageStore";
import Waiting from "../../shared/components/Waiting";

type Props = RouteComponentProps<{}> & { sageStore: SageStore };

@inject("sageStore")
@observer
export default class Sages extends React.Component<Props, undefined> {
  componentDidMount() {
    const { sageStore } = this.props;
    if (!sageStore.sagesIsInitialised) {
      sageStore.loadSages();
    }
  }

  render() {
    const { sagesIsInitialised, sages } = this.props.sageStore;

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
