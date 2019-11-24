
browser.waitForAngularEnabled(true);
describe('Employees app tests: ', function() {

let logoutButton = element(by.xpath('/html/body/div/header/div/p[1]'));
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
let updateCreate = element(by.xpath('/html/body/div/div/div/form/fieldset/div/button[1]'));
let hanSolo = element(by.cssContainingText('.ng-scope .ng-binding', 'Han Solo'));
let elonMusk = element(by.cssContainingText('.ng-scope .ng-binding', 'Elon Musk'));
let deleteButton = element(by.id('bDelete'));
let editButton = element(by.id('bEdit'));

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
    await expect(employeeList.getText()).toContain('Han Solo');
  });

  it('Delete existing employee', async function() {
    await browser.get('http://cafetownsend-angular-rails.herokuapp.com');
    await browser.driver.sleep('2000'); 
	
	//Fill in login form with correct login and password
    await element(by.model('user.name')).sendKeys('Luke');
    await element(by.model('user.password')).sendKeys('Skywalker');
    await loginButton.click();
    await browser.driver.sleep('2000'); 

	//Select existing employee from list
    await hanSolo.click();

	//Delete selected employee
    await deleteButton.click();
    await browser.driver.sleep('5000');
    await browser.driver.get('http://cafetownsend-angular-rails.herokuapp.com/employees');
    await element(by.name("alert")).click();
    let ale = browser.switchTo().alert();
    await ale.accept();
    await browser.driver.sleep('5000');

	//Verify employee is deleted and not shown in list anymore
    await expect(hanSolo.isPresent()).toBe(false);
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

	//Verify that new item called Leia Organa doesn't appear in the employees list
    await expect(employeeList.getText()).not.toContain('Leia Organa');
  });

  it('Edit employee', async function() {
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
    await firstNameCreate.sendKeys('Elon');
    await lastNameCreate.sendKeys('Musk');
    await startDateCreate.sendKeys('2020-01-15');
    await emailCreate.sendKeys('elonmusk@gmail.com');

	//Submit the form
    await addCreate.click();
    await browser.driver.sleep('2000');

	//Select newly created employee
    await elonMusk.click();
    await editButton.click();
    await browser.driver.sleep('2000');

	//Edit name of the employee and update its data
    await firstNameCreate.clear();
    await firstNameCreate.sendKeys('Darth');
    await lastNameCreate.clear();
    await lastNameCreate.sendKeys('Vader');
    await updateCreate.click();
    await browser.driver.sleep('2000');

	//Verify that new item called Elon Musk doesn't appear in the employees list
    await expect(employeeList.getText()).not.toContain('Elon Musk');
	
	//Verify that new item called Darth Vader appears in the employees list
    await expect(employeeList.getText()).toContain('Darth Vader');
  });
});