module.exports = class Api {

  async onApplicationBootstrap(){
    
    return ;
  }

  hello() {
    return `Hello World from JavaScript ${Date.now()}`;
  }
}
