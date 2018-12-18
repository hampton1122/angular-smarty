import { Component } from '@angular/core';
import * as SmartyStreetsSDK from 'smartystreets-javascript-sdk';
import { Suggestion } from './suggestion';

const SmartyStreetsCore = SmartyStreetsSDK.core;
const LookupAuto = SmartyStreetsSDK.usAutocomplete.Lookup;
const LookupStreet = SmartyStreetsSDK.usStreet.Lookup;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  public address: string;
  public suggestedAddresses = new Array<Suggestion>();

  lookupAddress() {
    console.log(this.address);
    const credentials = new SmartyStreetsCore.SharedCredentials(
      '8608633705592383'
    );
    const clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials);
    const client = clientBuilder.buildUsAutocompleteClient();
    const lookup = new LookupAuto(this.address);
    client
      .send(lookup)
      .then(response => this.handleLookupSuccess(response))
      .catch(response => this.handleLookupError(response));
  }

  handleLookupSuccess(response) {
    this.suggestedAddresses = new Array<Suggestion>();
    for (const item of response.result) {
      this.suggestedAddresses.push({
        state: item.state,
        city: item.city,
        streetLine: item.streetLine,
        text: item.text
      });
    }
  }

  handleLookupError(response) {
    console.log(response);
  }
}
