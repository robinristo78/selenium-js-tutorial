const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

async function parabankRegisterAndScreenshot() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://parabank.parasoft.com/parabank/index.htm');

        await driver.findElement(By.linkText('Register')).click();

        
        await driver.wait(until.elementLocated(By.id('customerForm')), 5000);

        await driver.findElement(By.id('customer.firstName')).sendKeys('Selenium');
        await driver.findElement(By.id('customer.lastName')).sendKeys('User');
        await driver.findElement(By.id('customer.address.street')).sendKeys('123 Test Street');
        await driver.findElement(By.id('customer.address.city')).sendKeys('Testville');
        await driver.findElement(By.id('customer.address.state')).sendKeys('TestState');
        await driver.findElement(By.id('customer.address.zipCode')).sendKeys('12345');
        await driver.findElement(By.id('customer.phoneNumber')).sendKeys('123-456-7890');
        await driver.findElement(By.id('customer.ssn')).sendKeys('123-45-6789');
        await driver.findElement(By.id('customer.username')).sendKeys('seleniumuser');
        await driver.findElement(By.id('customer.password')).sendKeys('TestPassword123');
        await driver.findElement(By.id('repeatedPassword')).sendKeys('TestPassword123');

        await driver.findElement(By.css('input[value="Register"]')).click();

        await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(),'Your account was created successfully')]")),
            10000
        );

        console.log("Registreerimine õnnestus!");

        await driver.findElement(By.linkText('Accounts Overview')).click();

        await driver.wait(until.titleContains('ParaBank'), 5000);

        let screenshot = await driver.takeScreenshot();
        fs.writeFileSync('account_overview.png', screenshot, 'base64');
        console.log("Ekraanipilt salvestatud: account_overview.png");

    } finally {
        await driver.quit();
    }
}

parabankRegisterAndScreenshot();
