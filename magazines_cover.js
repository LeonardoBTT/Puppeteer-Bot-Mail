const mail = require('./mail');

// Substitue os espaços do array magazine e arruma ele para que tudo funcione
function replaceAndFix(str, find, replace) {
    var str_fix = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase()
  return str_fix.replace(new RegExp(find, 'g'), replace);
}

// Captura as capas dos jornais selecionados (verifica se a data é atual) e retorna um array (com <img src= ...)
async function get(browser,magazine) {
  const SELECTOR_IMG = "#img1";
  const SELECTOR_DATE = "nav > div > div.ncenter.bold";
  var TODAY_MAGAZINES = [];
  // Nova pág
  const page = await browser.newPage();
  
  // Ganha performance ignorando estilos e etc
  await page.setRequestInterception(true);
  await page.on('request', (req) => {
    if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {req.abort()} else {req.continue()}
  });
  
  // Para cada magazine[] faz um push para TODAY_MAGAZINES[] com os jornais do dia
  for (let index = 0; index < magazine.length; index++) {

    var LINK = replaceAndFix(magazine[index], ' ','-');
    const LINK_PAG = "https://www.vercapas.com.br/capa/"+LINK;

    await page.goto(LINK_PAG, { waitUntil: 'networkidle2' });

    // Data da capa
    await page.waitForSelector(SELECTOR_DATE);
    const DATE = await page.evaluate(SELECTOR => {
      return document.querySelector(SELECTOR).innerText;
    }, SELECTOR_DATE);

    // Se a tada for atual = push no array
    var today = new Date();
    var today = ("0" + today.getDate()).slice(-2)+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    if (DATE==today) {
      const capa_link = await page.evaluate(SELECTOR => {
        return document.querySelector(SELECTOR).src
      }, SELECTOR_IMG);
      TODAY_MAGAZINES.push('<img src="'+capa_link+'"/>');
    };
  }
  await page.close();

  // Me envia os resultados por e-mail
  mail.me(TODAY_MAGAZINES.toString().replace(',',''));
}

module.exports = {get};