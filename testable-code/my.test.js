const { FormControl } = require('./src/formControl');
const { FormService } = require('./src/formService');
const jsdom = require('jsdom');
const $ = require('jquery')(new jsdom.JSDOM().window);

describe('Testable Code', () => {
  const jQuery = jest.fn($);
  let formControl, formService;
  describe('FormControl Class', () => {
    beforeEach(() => {
      formControl = new FormControl(jQuery);
    });

    it ('#unlockButton should be called', () => {
      const spy = jest.spyOn(formControl, 'unlockButton');
      expect(spy).toHaveBeenCalledTimes(0);
      formControl.unlockButton();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('#unlockButton should enable button', () => {
      formControl.$password1 = jQuery('<input>').attr({id: 'foo', name: 'bar'});
      formControl.$submit = jQuery('<button>').attr('disabled', true);
      formControl.$password1.valid = true;
      formControl.$login.valid = true;

      expect(formControl.$submit[0].disabled).toEqual(true);
      formControl.unlockButton();
      expect(formControl.$submit[0].disabled).toEqual(false);
    });

    it ('#changePassword should be called', () => {
      const spy = jest.spyOn(formControl, 'changePassword');
      expect(spy).toHaveBeenCalledTimes(0);
      formControl.changePassword();
      formControl.changePassword();
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('#changePassword should validate password', () => {
      formControl.$password1.valid = false;
      formControl.$password1.val('1234');
      formControl.$password2.val('1234');

      formControl.changePassword();
      expect(formControl.$password1.valid).toEqual(true);
    });
  });
});
