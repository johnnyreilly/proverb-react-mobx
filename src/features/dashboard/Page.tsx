import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

import { SageStore } from "../../shared/stores/SageStore";
import Waiting from "../../shared/components/Waiting";

type Props = RouteComponentProps<{}> & { sageStore: SageStore };

@inject("sageStore")
@observer
export default class Dashboard extends React.Component<Props, undefined> {
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
        <div className="row">

          <div className="col-md-6">
            <div className="jumbotron">
              <div className="center-block text-center" style={{ maxWidth: "250px" }}>
                <h2>The Wisdom of Socrates Aruldas</h2>
                <img src="images/socrates-statue.jpg" className="img-rounded" />
                <h3>(and a few others...)</h3>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h2>Sages</h2>
            <table className="table table-condensed table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {sagesIsInitialised
                  ? [...sages.values()].map(sage => (
                    <tr key={sage.id}>
                      <td><Link to={`/sayings/${sage.id}`}>{ sage.name }</Link></td>
                      <td>{ sage.userName }</td>
                    </tr>
                  ))
                  : (
                    <tr>
                      <td colSpan={2}><Waiting /></td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    );
  }
}
