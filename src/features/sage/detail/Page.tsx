import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import moment from "moment";

import DetailControls from "../../../shared/components/DetailControls";
import { SelectedSageStore } from "../../../shared/stores/SelectedSageStore";
import Waiting from "../../../shared/components/Waiting";

type Props = RouteComponentProps<{
  id: string;
}> & { selectedSageStore: SelectedSageStore };

@inject("selectedSageStore")
@observer
export default class SageDetail extends React.Component<Props, undefined> {
  componentDidMount() {
    const { selectedSageStore } = this.props;
    if (!selectedSageStore.sage) {
      selectedSageStore.loadSage(parseInt(this.props.match.params.id));
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.selectedSageStore.loadSage(parseInt(nextProps.match.params.id));
    }
  }

  render() {
    const { sage } = this.props.selectedSageStore;

    return (
      <div className="container">
        {sage
          ? <div>
            <div>
              <Link to={`/sage/edit/${this.props.match.params.id}`}><i className="fa fa-pencil fa-lg" /> Edit</Link>
            </div>

            <h2>Sage Details: {sage ? sage.name : null}</h2>

            <div className="form-horizontal">
              <DetailControls label="Name" value={sage.name} />

              <DetailControls label="Username" value={sage.userName} />

              <DetailControls label="Email" value={sage.email} />

              <DetailControls label="Date of Birth" value={moment(sage.dateOfBirth).format("ll")} />

              <DetailControls label="Sagacity" value={sage.sagacity} />
            </div>
          </div>

          : <Waiting />}
      </div>
    );
  }
}
