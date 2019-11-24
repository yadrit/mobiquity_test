
browser.waitForAngularEnabled(true);
describe('Employees app tests: ', function() {

let logoutButton = element(by.xpath('/html/body/div/header/div/p[1]'));
let greeting = element(by.id('greetings'));
let invalidLoginAndPassword = element(by.xpath('//*[@id="login-form"]/fieldset/p[1]'));
let createButton = element(by.xpath('//*[@id="bAdd"]'));
let loginButton = element(by.xpath('//*[@id="login-form"]/fieldset/button'));
let firstNameCreate = element(by.model('selectedEmployee.firstName'));
let lastNameCreate = element(by.model('selectedEmployee.lastName'));
let startDateCreate = element(by.model('selectedEmployee.startDate'));
let emailCreate = element(by.model('selectedEmployee.email'));
let addCreate = element(by.xpath('/html/body/div/div/div/form/fieldset/div/button[2]'));
let employeeList = element(by.id('employee-list'));
let cancelCreate = element(by.className('subButton bCancel'));

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
    await loginButton.click();
    await browser.driver.sleep('2000'); 

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
    await loginButton.click();
    await browser.driver.sleep('2000'); 

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
    await loginButton.click();
    await browser.driver.sleep('2000'); 

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
    await loginButton.click();
    await browser.driver.sleep('2000'); 

	//Verify user is not navigated to the employees list view
	//Verify there is no message about incorrect login and password shown
    await expect(invalidLoginAndPassword.isDisplayed()).toBe(true);
    await expect(createButton.isPresent()).toBe(false);
  });

  it('Successful logout', async function() {
    await browser.get('http://cafetownsend-angular-rails.herokuapp.com');
    await browser.driver.sleep('2000'); 
	
	//Fill in login form with correct login and password
    await element(by.model('user.name')).sendKeys('Luke');
    await element(by.model('user.password')).sendKeys('Skywalker');
    await loginButton.click();
    await browser.driver.sleep('2000'); 

	//Press logout
    await logoutButton.click();
    await browser.driver.sleep('1500'); 

	//Verify login form is shown
	//Verify employees list is not shown
    await expect(createButton.isPresent()).toBe(false);
    await expect(loginButton.isPresent()).toBe(true);
  });

  it('Create new employee', async function() {
    await browser.get('http://cafetownsend-angular-rails.herokuapp.com');
    await browser.driver.sleep('2000'); 
	
	//Fill in login form with correct login and password
    await element(by.model('user.name')).sendKeys('Luke');
    await element(by.model('user.password')).sendKeys('Skywalker');
    await loginButton.click();
    await browser.driver.sleep('2000'); 

	//Click on Create button
    await createButton.click();
   
	//Fill in the form with correct data
    await firstNameCreate.sendKeys('Han');
    await lastNameCreate.sendKeys('Solo');
    await startDateCreate.sendKeys('2020-01-15');
    await emailCreate.sendKeys('hansolo@gmail.com');

	//Submit the form
    await addCreate.click();
    await browser.driver.sleep('2000');

	//Verify that new item called Han Solo appears in the employees list
    await expect(element(by.id('employee-list')).getText()).toContain('Han Solo');
  });

  it('Click on Cancel when creating new employee', async function() {
    await browser.get('http://cafetownsend-angular-rails.herokuapp.com');
    await browser.driver.sleep('2000'); 
	
	//Fill in login form with correct login and password
    await element(by.model('user.name')).sendKeys('Luke');
    await element(by.model('user.password')).sendKeys('Skywalker');
    await loginButton.click();
    await browser.driver.sleep('2000'); 

	//Click on Create button
    await createButton.click();
   
	//Fill in the form with correct data
    await firstNameCreate.sendKeys('Leia');
    await lastNameCreate.sendKeys('Organa');
    await startDateCreate.sendKeys('2020-01-15');
    await emailCreate.sendKeys('leiaorgana@gmail.com');

	//Click on Cancel
    await cancelCreate.click()
    await browser.driver.sleep('1500');

	//Verify that new item called Han Solo appears in the employees list
    await expect(employeeList.getText()).not.toContain('Leia Organa');
  });
});