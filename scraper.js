const puppeteer = require('puppeteer');
const $ = require('cheerio');
const lol = "LOL";



const getResults = (async () => {
    let url = "https://slickdeals.net"
    let browser = await puppeteer.launch();

    try { 
        let page = await browser.newPage();

        

        await page.goto(url, { waitUntil: 'networkidle2' });
        let titleLen = 0;
        let count = 0;
        let data = await page.evaluate(() => {
            
            let titleList = document.querySelectorAll('div[class="itemInfoLine track-fpDealLink"] > div[class="priceLine"]'); // list
            let itemList = document.querySelectorAll('a.itemTitle'); 
            titleLen = titleList.length;
            let arr = [];

            console.log("test");


            for (let i = 0; i < titleLen; i++){

                block = itemList[i].parentNode; //parent element Not used
                titleTxt = titleList[i].innerText;
                itemTxt = itemList[i].innerText;
                dollarSub = titleTxt.substring(titleTxt.indexOf('$'), titleTxt.length -1);
                
                // Deal with quotes in title (inches)
                itemTxtAdj = itemTxt;
                while(itemTxtAdj.indexOf('"')>=0){
                    if(itemTxtAdj.indexOf('"')>0 && itemTxtAdj.indexOf('"') < itemTxtAdj.length/2){
                        itemTxtAdj = itemTxtAdj.substring(itemTxtAdj.indexOf('"')+1, itemTxtAdj.length-1);
                    } else if(itemTxtAdj.indexOf('"')>0 && itemTxtAdj.indexOf('"') > itemTxtAdj.length/2){
                        itemTxtAdj = itemTxtAdj.substring(0, itemTxtAdj.indexOf('"')-1);
                    } 
                }
                storeXpth = document.evaluate(`//a[contains(., "${itemTxtAdj}")]`, document, null, XPathResult.ANY_TYPE, null);  // ???
                blockEl = storeXpth.iterateNext()
                atStore = blockEl.previousElementSibling.innerText;

                itemImageLinkDiv = blockEl.parentElement;
                itemImageAndNameDiv = itemImageLinkDiv.parentElement;
                itemInfoDiv = itemImageAndNameDiv.nextElementSibling;
                priceLn = itemInfoDiv.lastElementChild;

                var newPrice = "";
                for (var x = 0; x < priceLn.childNodes.length; x++){
                    if(priceLn.childNodes[x].className === "itemPrice   " || priceLn.childNodes[x].className === "itemPrice  wide "){
                        newPrice = priceLn.childNodes[x].innerText;
                        itemPriceEl = priceLn.childNodes[x];
                    }
                }

                arr.push({
                    id: i, 
                    item: itemTxt,
                    store: atStore,
                    price: newPrice,
                    //old_price: oldPrice,
                    //priceblurb: dollarSub.substring(0, dollarSub.indexOf(' ')),
                    link: blockEl.href
                })
            }
            return arr;
        });

    //console.log(data);
        return data;

        await browser.close();
    } catch(error) {
        console.log(error);
        await browser.close();
    } finally {
        await browser.close();
    }

})();

exports.getResults = getResults;
//getResults();

//console.log(getResults);