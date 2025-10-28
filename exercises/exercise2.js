const { Builder, By, Key, until } = require('selenium-webdriver');

async function openWiki() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Open Wikipedia
        await driver.get('https://www.wikipedia.org/');

        // Otsi otsingukasti ja sisesta "Selenium (software)" ning vajuta Enter
        let searchBox = await driver.findElement(By.name('search'));
        await searchBox.sendKeys('Selenium (software)', Key.ENTER);

        // Oota, kuni leht laeb ja pealkiri muutub
        await driver.wait(until.titleContains('Selenium'), 10000);

        // Võta lehe pealkiri
        let title = await driver.getTitle();

        // Prindi pealkiri terminali
        console.log("Lehe pealkiri:", title);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

openWiki();
