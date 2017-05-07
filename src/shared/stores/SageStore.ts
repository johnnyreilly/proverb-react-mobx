import {observable, action} from "mobx";

import { SageVM } from "../domain/dtos/sage";
import * as sageService from "../services/sageService";

class SageStore {
  @observable sages = new Map<number, SageVM>();
  @observable sagesIsInitialised = false;

  @action loadSages() {
    sageService.getAll()
      .then(sages => {
        this.sagesIsInitialised = true;
        this.sages = new Map([...sages.map(sage => [sage.id, sage] as [number, SageVM])]);
      });
  }
}

export default new SageStore();
