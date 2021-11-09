import {FormService} from "./formService";
import $ from 'jquery';

export class FormControl {
  public $: typeof $;
  public $submit: any;
  public $login: any;
  public $password1: any;
  public $password2: any;

  private service: FormService;

  constructor(jqueryInstance: typeof $) {
    this.$ = jqueryInstance;
    this.$submit = this.$('#submit');
    this.$login = this.$('#login');
    this.$password1 = this.$('#password1');
    this.$password2 = this.$('#password2');

    this.$login.change(() => this.changeLogin());
    this.$password2.change(() => this.changePassword());
    this.$submit.click((event: Event) => this.submitForm(event));

    this.service = new FormService(this.$);
  }

  unlockButton(): void {
    if (this.$password1 && this.$submit) {
      if (this.$password1.valid && this.$login.valid) {
        this.$submit.removeAttr('disabled');
      } else {
        this.$submit.attr('disabled', 'disable');
      }
    }
  }

  async changeLogin(): Promise<void> {
    const response = await this.service.checkLogin(this.$login.val());
    if (response) {
      this.$login.css({'border-color': '#0c0'});
      this.$login.valid = true;
    } else {
      this.$login.css({'border-color': '#c00'});
      this.$login.valid = false;
    }
    this.unlockButton();
  }

  changePassword(): void {
    if (this.$password1.val() === this.$password2.val()) {
      this.$password2.css({'border-color': '#0c0'});
      this.$password1.valid = true;
    } else {
      this.$password2.css({'border-color': '#c00'});
      this.$password1.valid = false;
    }
    this.unlockButton();
  }

  async submitForm(e: Event): Promise<void> {
    e.preventDefault();
    const response = await this.service.createAccount($('#create-account-form').serialize());
      if (response) {
        alert('Account Created Successfully');
      }
  }
}


