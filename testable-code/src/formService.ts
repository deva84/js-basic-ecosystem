export class FormService {
  public $: typeof $;

  constructor(jqueryInstance: typeof $) {
    this.$ = jqueryInstance;
  }

  async checkLogin(value: string): Promise<boolean> {
   const response = await this.$.get('/checkLogin/' + value, (response) => response);
    return response.status.indexOf('alright') >= 0;
  }

  async createAccount(data: string): Promise<boolean> {
    const response = await this.$.post('/createAccount', data,  (response) => response);
    return response.status === 'ok';
  }
}
