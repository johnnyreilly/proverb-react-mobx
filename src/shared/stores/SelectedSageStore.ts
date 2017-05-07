import { observable, action } from "mobx";

import { SageVM } from "../domain/dtos/sage";
import * as sageService from "../services/sageService";

export class SelectedSageStore {
  @observable sage: SageVM | undefined = undefined;
  @observable validations: Map<string, string> = new Map();
  @observable savedId: number | undefined = undefined;

  @action loadSage(id: number) {
    sageService.getById(id)
      .then(sage => {
        this.sage = sage;
      });
  }

  @action saveSage(sage: SageVM) {
    sageService.save(sage)
      .then(saveResult => {
        if (saveResult.isSaved) {
          this.savedId = saveResult.savedId;
        } else {
          this.validations = new Map([
            ...Object.keys(saveResult.validations!.errors).map(error => [error, saveResult.validations!.errors[error].join()] as [string, string])
          ]);
        }
      });
  }
}

export default new SelectedSageStore();
