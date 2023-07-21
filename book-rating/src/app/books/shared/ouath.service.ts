import { Injectable } from "@angular/core";

function wait(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  async loadAndLogin() {
    await wait(1000);
    return true;
  }
}
