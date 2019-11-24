# General info

I’ve chosen JS + Protractor because it uses Selenium Webdriver API, it is easier and faster to setup and I can concentrate on tests rather than on solving problems with environment. Moreover the install documentation will be shorter

Right now there is a problem with test #7, caused by bug in Chromium (hard to close browser alert, need to use hacks) - working on solving it right now. The rest of tests work good.


# Please read the description below in order to set-up invironment:

1. Download and install Git from official site (https://git-scm.com/downloads)
2. Download and install node-js from official site (https://nodejs.org/en/)
3. Download two js files from this repository - conf.js and todo-spec.js
4. Go to Protractor website (https://www.protractortest.org/#/) and follow the instructions in "Setup" section: perform the following commands in terminal

> npm install -g protractor

> webdriver-manager update

> webdriver-manager start

5. Open the new window of terminal
6. Run the test using command

>protractor conf.js

  Voila! Test should run and pass.

# important info

if for some reason you see that tests can't be run, ask me. I also include the screencast of how I run them on my machine (please check mobiquity_test.swf file)
