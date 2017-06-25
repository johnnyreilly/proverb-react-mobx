import { observable, action } from "mobx";

import { SageVM } from "../domain/dtos/sage";
import * as sageService from "../services/sageService";

export class SelectedSageStore {
  @observable sage: SageVM | undefined = undefined;
  @observable validations: Map<string, string> = new Map();
  @observable savedId: number | undefined = undefined;
  @observable isWaiting: "Loading" | "Saving" | "Removing" | undefined;


  @action loadSage(id: number) {
    this.isWaiting = "Loading";
    sageService.getById(id)
      .then(sage => {
        this.sage = sage;
        this.isWaiting = undefined;
      });
  }

  @action saveSage(sage: SageVM) {
    this.isWaiting = "Saving";
    sageService.save(sage)
      .then(saveResult => {
        if (saveResult.isSaved) {
          this.savedId = saveResult.savedId;
        } else {
          this.validations = new Map([
            ...Object.keys(saveResult.validations!.errors).map(error => [error, saveResult.validations!.errors[error].join()] as [string, string])
          ]);
        }
        this.isWaiting = undefined;
      });
  }
}

export default new SelectedSageStore();
