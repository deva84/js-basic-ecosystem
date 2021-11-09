import {browser, by, element, ElementFinder, protractor} from "protractor";
import {httpGet, options} from "./serverMock";
// @ts-ignore
import * as tiny from "tiny-json-http";

describe('Legacy Application', () => {

  describe('Running on Server Port 3000', () => {
    beforeEach(() => {
      browser.get('http://localhost:3000');
    });

    it('should show Legacy Application page', () => {
      expect(browser.getTitle()).toEqual('Legacy Application');
    });

    describe('Validation', () => {
      let loginEl: ElementFinder;
      let passwordOneEl: ElementFinder;
      let passwordTwoEl: ElementFinder;
      let submitEl: ElementFinder;

      beforeAll(() => {
        loginEl = element(by.css('#login'));
        passwordOneEl = element(by.css('#password1'));
        passwordTwoEl = element(by.css('#password2'));
        submitEl = element(by.css('#submit'));
      });

      it('should validate submit button is disabled when passwords don\'t match', () => {
        loginEl.sendKeys('user');
        passwordOneEl.sendKeys('1234');
        passwordTwoEl.sendKeys('test');
        passwordTwoEl.sendKeys(protractor.Key.ENTER);

        expect(passwordTwoEl.getAttribute('style')).toBe('border-color: rgb(204, 0, 0);');
        expect(submitEl.getAttribute('disabled')).toBe('true');

        //browser.wait(EC.presenceOf(element(by.css('#search'))), 5000);
        //expect(element.all(by.css('.g')).isPresent()).toBe(true);
      });

      it('should validate submit button is enabled when passwords match', () => {
        loginEl.sendKeys('user');
        passwordOneEl.sendKeys('1234');
        passwordTwoEl.sendKeys('1234');
        element(by.css('.panel-title')).click();

        expect(passwordTwoEl.getAttribute('style')).toBe('border-color: rgb(0, 204, 0);');
        expect(submitEl.getAttribute('disabled')).toBe(null);
      });

      it('should validate login (!="john.doe")', () => {
        loginEl.sendKeys('user');
        loginEl.sendKeys(protractor.Key.ENTER);

        expect(loginEl.getAttribute('style')).toBe('border-color: rgb(0, 204, 0);');

        loginEl.clear().then(() => {
          loginEl.sendKeys('john.doe');
          loginEl.sendKeys(protractor.Key.ENTER);
          expect(loginEl.getAttribute('style')).toBe('border-color: rgb(204, 0, 0);');
        });
      });

      it('should return true when login is invalid', async () => {
        try {
          const response = await httpGet("http://localhost:3000/checkLogin/john.doe");
          expect(response.statusCode).toBe(200);
          expect(response.responseStatus).toEqual(true);
        } catch (err: any) {
          throw new Error(err.message);
        }
      });

      it('should return ok status when account is created', async () => {
        try {
          const response = await tiny.post(options);
          expect(response.body.status).toEqual('ok');
        } catch (err: any) {
          throw new Error(err.message);
        }
      })
    });
  });
});
