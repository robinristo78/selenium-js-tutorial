const { Builder, By, until } = require('selenium-webdriver');

async function addAndRemoveElements() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://practice.expandtesting.com/add-remove-elements');

        let addButton = await driver.findElement(By.css('button[onclick="addElement()"]'));

        for (let i = 0; i < 5; i++) {
            await addButton.click();
        }

        await driver.wait(until.elementsLocated(By.css('.added-manually')), 5000);

        await driver.sleep(2000);

        let deleteButtons = await driver.findElements(By.css('.added-manually'));

        for (let btn of deleteButtons) {
            await btn.click();
        }

        console.log("Kõik lisatud elemendid kustutatud!");
    } finally {
        await driver.quit();
    }
}

addAndRemoveElements();
