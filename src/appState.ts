import {observable, action} from "mobx";

import { SageVM } from "./shared/domain/dtos/sage";
import * as sageService from "./shared/services/sageService";

export default class AppState {
  @observable sages = new Map<number, SageVM>();
  @observable isInitialised = false;

  @action loadSages() {
    sageService.getAll()
      .then(sages => {
        this.isInitialised = true;
        this.sages = new Map([...sages.map(sage => [sage.id, sage] as [number, SageVM])]);
      });
  }
}