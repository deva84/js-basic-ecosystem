import * as http from 'http';
import {promise, protractor} from "protractor";

const defer = protractor.promise.defer();

export interface IResponse {
  statusCode?: number;
  responseStatus: boolean;
}

export function httpGet(url: string): promise.Promise<IResponse> {

  http.get(url, (response) => {
    let bodyString: string = '';
    response.setEncoding('utf8');

    response.on("data", (chunk: string) => {
      bodyString += chunk;
    });

    response.on('end', () => {
      let responseStatus = bodyString.indexOf('alright') <= -1;
      defer.fulfill({
        statusCode: response.statusCode,
        responseStatus: responseStatus,
      });
    });

  }).on('error', (err) => {
    defer.reject("Got http.get error: " + err.message);
  });

  return defer.promise as promise.Promise<IResponse>;
}

export const options = {
  url: 'http://localhost:3000/createAccount',
  headers: {'Accept': 'application/json'},
  data: '{ "data": {"login": "user", "password1": "test", "password2": "test"} }'
};

