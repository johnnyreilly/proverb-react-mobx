import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { inject, observer } from "mobx-react";

import { SelectedSageStore } from "../../../shared/stores/SelectedSageStore";
import Waiting from "../../../shared/components/Waiting";
import FormControls from "../../../shared/components/FormControls";
import { SageVM } from "../../../shared/domain/dtos/sage";
import { inputValue, dateValue } from "../../../shared/utils/componentHelpers";

type Props = RouteComponentProps<{
  id: string;
}> & { selectedSageStore: SelectedSageStore };

interface State {
  sage: SageVM | undefined;
  validations: Map<string, string>;
  hasChanges: boolean;
}

@inject("selectedSageStore")
@observer
export default class SageEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = Object.assign(
      this.getSageAndValidationsFromStore(props.match.params.id, props.selectedSageStore),
      { hasChanges: false, isSavingOrRemoving: undefined });
  }

  componentWillReact() {
    const { selectedSageStore } = this.props;
    if (selectedSageStore.savedId) {
      const { savedId } = selectedSageStore;
      this.props.history.push(`/sage/detail/${savedId}`);
      selectedSageStore.savedId = undefined;
    } else if (selectedSageStore.validations || selectedSageStore.sage) {
      this.setState((prevState, props) => Object.assign(
        prevState,
        this.getSageAndValidationsFromStore(props.match.params.id, selectedSageStore)
      )); // TODO: Do something more sophisticated?
    }
  }

  getSageAndValidationsFromStore(id: string, storeState: SelectedSageStore) {
    const idNum = parseInt(id);
    return storeState.sage && storeState.sage.id === idNum
      ? { sage: storeState.sage, validations: storeState.validations }
      : { sage: undefined, validations: new Map() };
  }

  componentDidMount() {
    const { selectedSageStore } = this.props;
    if (!this.state.sage) {
      selectedSageStore.loadSage(parseInt(this.props.match.params.id));
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.selectedSageStore.loadSage(parseInt(nextProps.match.params.id));
    }
  }

  _onFieldChange = (event: React.FormEvent<any>) => {
    const eventTarget = event.target as HTMLInputElement;
    const fieldName = eventTarget.name;
    const fieldValue = eventTarget.value;
    this.setState((prevState, _props) => Object.assign(
      prevState,
      { hasChanges: true, sage: Object.assign(prevState.sage, { [fieldName]: fieldValue }) }
    ));
  }

  _onClickSave = (event: React.FormEvent<any>) => {
    event.preventDefault();

    if (this.canSave) {
      this.props.selectedSageStore.saveSage(this.state.sage!);
    }
  }

  _onClickRemove = (event: React.FormEvent<any>) => {
    event.preventDefault();

    if (this.canRemove) {
      // this.props.selectedSageStore.removeSage(this.state.sage!.id);
    }
  }

  get canSave(): boolean {
    return this.state.hasChanges && !this.isSavingOrRemoving;
  }

  get canRemove(): boolean {
    return !this.isSavingOrRemoving;
  }

  get isSavingOrRemoving(): boolean {
    return !!this.props.selectedSageStore.isWaiting;
  }

  render() {
    const { sage, hasChanges, validations } = this.state;
    const { selectedSageStore: { isWaiting } } = this.props;

    return (
      <div className="container">
        {sage
          ? <form name="form" role="form">
            <div>
              {isWaiting ? <Waiting caption={isWaiting} /> : null}

              <button className="btn btn-info" disabled={!this.canSave} onClick={this._onClickSave}>
                <i className="fa fa-save fa-lg" /> Save
              </button>

              <button className="btn btn-danger" disabled={!this.canRemove} onClick={this._onClickRemove}>
                <i className="fa fa-trash fa-lg" /> Remove
              </button>

              {hasChanges ? <i className="fa fa-asterisk fa-lg text-warning" /> : null}
            </div>

            <h2>Sage Edit: {sage ? sage.name : null}</h2>

            <div className="form-horizontal">
              <FormControls label="Name" name="name" value={inputValue(sage.name)} onFieldChange={this._onFieldChange} errors={validations} />

              <FormControls label="Username" name="userName" value={inputValue(sage.userName)} onFieldChange={this._onFieldChange} errors={validations} />

              <FormControls label="Email" name="email" value={inputValue(sage.email)} onFieldChange={this._onFieldChange} errors={validations} />

              <FormControls label="Date of Birth" name="dateOfBirth" type="date" value={dateValue(sage.dateOfBirth)} onFieldChange={this._onFieldChange} errors={validations} />

              <FormControls label="Sagacity" name="sagacity" type="number" value={inputValue(sage.sagacity)} onFieldChange={this._onFieldChange} errors={validations} />
            </div>
          </form>

          : <Waiting />}
      </div>
    );
  }
}
