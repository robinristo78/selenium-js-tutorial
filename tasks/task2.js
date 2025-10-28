const { Builder, By, until } = require('selenium-webdriver');

async function loginAndListProducts() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.saucedemo.com/');

        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');

        await driver.findElement(By.id('login-button')).click();

        await driver.wait(until.elementsLocated(By.css('.inventory_item_name')), 10000);

        let productElements = await driver.findElements(By.css('.inventory_item_name'));

        console.log("Toodete nimed:");
        for (let product of productElements) {
            let name = await product.getText();
            console.log("-", name);
        }

    } finally {
        await driver.quit();
    }
}

loginAndListProducts();
