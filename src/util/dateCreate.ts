export class dateCreate {
  public sysdate;
  constructor() {
    let fecha = new Date();
    this.sysdate =
      fecha.getFullYear() +
      '-' +
      fecha.getMonth() +
      '-' +
      fecha.getDate() +
      ' ' +
      fecha.getHours() +
      ':' +
      fecha.getMinutes() +
      ':' +
      fecha.getSeconds();
  }
  public getSysdate() {
    return this.sysdate;
  }
}
