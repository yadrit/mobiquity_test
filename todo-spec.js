
browser.waitForAngularEnabled(true);
describe('Employees app tests: ', function() {

let logoutButton = element(by.xpath('/html/body/div/header/div/p[1]'));
let greeting = element(by.id('greetings'));
let invalidLoginAndPassword = element(by.xpath('//*[@id="login-form"]/fieldset/p[1]'))
let createButton = element(by.xpath('//*[@id="bAdd"]'))

    beforeEach(function() {
        browser.manage().window().maximize();
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    }); 

  it('Login into application with correct credentials', async function() {
    await browser.get('http://cafetownsend-angular-rails.herokuapp.com');
    await browser.driver.sleep('2000'); 
	
	//Fill in login form with correct login and password
    await element(by.model('user.name')).sendKeys('Luke');
    await element(by.model('user.password')).sendKeys('Skywalker');
    await element(by.xpath('//*[@id="login-form"]/fieldset/button')).click();
    await browser.driver.sleep('3000'); 

	//Verify user is navigated to the employees list view
	//Verify there is no message about incorrect login and password shown
    await expect(invalidLoginAndPassword.isPresent()).toBe(false);
    await expect(createButton.isPresent()).toBe(true);
  });

  it('Login into application with incorrect credentials (Password)', async function() {
    await browser.get('http://cafetownsend-angular-rails.herokuapp.com');
    await browser.driver.sleep('2000'); 
	
	//Fill in login form with correct login and password
    await element(by.model('user.name')).sendKeys('Luke');
    await element(by.model('user.password')).sendKeys('Solo');
    await element(by.xpath('//*[@id="login-form"]/fieldset/button')).click();
    await browser.driver.sleep('3000'); 

	//Verify user is not navigated to the employees list view
	//Verify there is no message about incorrect login and password shown
    await expect(invalidLoginAndPassword.isDisplayed()).toBe(true);
    await expect(createButton.isPresent()).toBe(false);
  });

  it('Login into application with incorrect credentials (Login)', async function() {
    await browser.get('http://cafetownsend-angular-rails.herokuapp.com');
    await browser.driver.sleep('2000'); 
	
	//Fill in login form with correct login and password
    await element(by.model('user.name')).sendKeys('Han');
    await element(by.model('user.password')).sendKeys('Skywalker');
    await element(by.xpath('//*[@id="login-form"]/fieldset/button')).click();
    await browser.driver.sleep('3000'); 

	//Verify user is not navigated to the employees list view
	//Verify there is no message about incorrect login and password shown
    await expect(invalidLoginAndPassword.isDisplayed()).toBe(true);
    await expect(createButton.isPresent()).toBe(false);   
  });

  it('Login into application with incorrect credentials (Login and Password)', async function() {
    await browser.get('http://cafetownsend-angular-rails.herokuapp.com');
    await browser.driver.sleep('2000'); 
	
	//Fill in login form with correct login and password
    await element(by.model('user.name')).sendKeys('Han');
    await element(by.model('user.password')).sendKeys('Solo');
    await element(by.xpath('//*[@id="login-form"]/fieldset/button')).click();
    await browser.driver.sleep('3000'); 

	//Verify user is not navigated to the employees list view
	//Verify there is no message about incorrect login and password shown
    await expect(invalidLoginAndPassword.isDisplayed()).toBe(true);
    await expect(createButton.isPresent()).toBe(false);
  });
});