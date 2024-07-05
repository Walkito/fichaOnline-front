export class CErro{
  error: {
    mensagem: string,
  };

  constructor(mensagem: string){
    this.error = { mensagem };
  }
}
