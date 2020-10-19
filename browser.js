const { Console } = require('console');
const puppeteer = require('puppeteer');
const capa = require("./magazines_cover");

(async () => {
  const browser = await puppeteer.launch({headless: false});
    function process() {
      var clock = new Date().getHours()+':'+ new Date().getMinutes();
      
      // Captura os jornais e me envia por e-mail
      if(clock=='22:40') {
        var magazines = ['valor economico','folha de s paulo','o estado de sao paulo','o globo', 'correio do povo', 'correio braziliense','folha de pernambuco'];
        capa.get(browser,magazines);
      }

    }
    await setInterval(process, 60000);
})();
