const puppeteer = require('puppeteer');
const capa = require("./magazines_cover");
const mail = require('./mail');

const MAGAZINEHOUR = process.env.MAGAZINEHOUR;

//https://www.google.com/settings/security/lesssecureapps
//https://accounts.google.com/DisplayUnlockCaptcha

console.log("Iniciando ...");

async function main() {
  const browser = await puppeteer.launch({headless: true,args: ['--no-sandbox','--disable-setuid-sandbox']});

  function process() {
    var clock = new Date().getHours()-3;

    // Captura os jornais e me envia por e-mail
    if(clock==MAGAZINEHOUR) {
      var magazines = ['valor economico','folha de s paulo','o estado de sao paulo','o globo', 'correio do povo', 'correio braziliense','folha de pernambuco'];
      capa.get(browser,magazines);
    }
  };

  //alterar essa linha depois = setIterval
  await setInterval(process, 60*60*1000);
};

main();