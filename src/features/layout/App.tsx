import React from "react";
import TopNav from "./TopNav";
import { RouteComponentProps, Route, Switch } from "react-router-dom";
import { observer } from "mobx-react";

import Dashboard from "../dashboard/Page";
import Sages from "../sages/Page";
import SageDetail from "../sage/detail/Page";
import SageEdit from "../sage/edit/Page";
// import Sayings from "../sayings/Page";
// import SayingDetail from "../saying/detail/Page";
// import SayingEdit from "../saying/edit/Page";
// import About from "../about/Page";

// <Route path="/sage/edit/:id" component={SageEdit} />
// <Route path="/sayings/:selectedSageId?" component={Sayings} />
// <Route path="/saying/detail/:id" component={SayingDetail} />
// <Route path="/saying/edit/:id" component={SayingEdit} />
// <Route path="/about" component={About} />


type Props = RouteComponentProps<{}>;

@observer
export default class App extends React.Component<Props, any> {
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.location !== this.props.location;
  }

  render() {
    return (
      <div>
        <TopNav />

        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/sages" component={Sages} />
          <Route path="/sage/detail/:id" component={SageDetail} />
          <Route path="/sage/edit/:id" component={SageEdit} />
        </Switch>
      </div>
    );
  }
}
