import {observable} from "mobx";

import { SageVM } from "../../shared/domain/dtos/sage";
import * as sageService from "../../shared/services/sageService";

export interface SagesState {
  sages: Map<number, SageVM>;
  isInitialised: boolean;
}

class SagesStore {
  @observable sages = new Map<number, SageVM>();
  @observable isInitialised = false;

  load() {
    sageService.getAll()
      .then(sages => {
        this.isInitialised = true;
        this.sages = new Map([...sages.map(sage => [sage.id, sage] as [number, SageVM])]);
      });
  }
}

const sagesStoreInstance = new SagesStore();
export default sagesStoreInstance;
