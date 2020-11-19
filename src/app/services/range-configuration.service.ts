import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export  class RangeConfigurationService {

  private minMaxUrl = environment.baseUrl + "min-max-range";
  private stepsUrl = environment.baseUrl + "steps-range";

  constructor(
    private httpClient: HttpClient
  ) { }

  getMinMaxRange(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.minMaxUrl)
        .subscribe((response: any) => {
          resolve(response);
      }, reject);
    })
  }

  getStepsRange(): Promise<Array<number>> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.stepsUrl)
        .subscribe((response: any) => {
          resolve(response);
      }, reject);
    })
  }

}
