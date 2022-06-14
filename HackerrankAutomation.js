// mail: gojotkjjcnqrluiytj@nvhrw.com
// password: automate

const puppet = require("puppeteer");
const code = require("./code");


let browserOpen = puppet.launch({headless: false, args: ['--strt-maximized'], defaultViewport: null});
let page;
const email = "gojotkjjcnqrluiytj@nvhrw.com";
const password = "automate";
browserOpen
    .then(function(browser){
        let pageOpen = browser.pages();
        return pageOpen;
    })
    .then(function(pagesArr){
        page = pagesArr[0];
        let gotoPromise = page.goto("https://www.hackerrank.com/");
        return gotoPromise;
    })
    .then(function(){
        console.log("Opened HackerRank");
        let gotoLoginPage = page.goto("https://www.hackerrank.com/auth/login");
        return gotoLoginPage;
    })
    .then(function(selectEmailTab){
        let input1 = page.type("input[id='input-1']", email, {delay: 10} );
        return input1;
    })
    .then(function(){
        let input2 = page.type("input[id = 'input-2']", password, {visible: true, delay: 10});
        return input2;
    })
    .then(function(){
        let loginPress = page.click("button[data-analytics='LoginPassword']", );
        return loginPress;
    })
    .then(function(){
        console.log("Login Success");
        let selectAlgorithmTopic = waitAndClick(".topic-card a[data-attr1 = 'algorithms']", page);
        return selectAlgorithmTopic;
    })
    .then(function(){
        let selectWarmup = waitAndClick("input[value='warmup']", page);
        return selectWarmup;
    })
    .then(function(){
        console.log("questions loading....");
        let waitFor3sec = page.waitFor(3000);
        return waitFor3sec;
    })
    .then(function(){
        //question list as an array. 
        let qstnArray = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled");
        return qstnArray;
    })
    .then(function(qstnArray){
        console.log("Questions to solve: ", qstnArray.length);
        //Find question and solve!
        let qstnToBeSolved = questionSolver(page, qstnArray[0], code.answers[0]);
        return qstnToBeSolved; 
    })
    .catch(function(err){
        console.log("error!"); 
    })
   

    function waitAndClick(selector, cPage){
        return new Promise(function(resolve, reject){
            let waitForModelPromise = cPage.waitForSelector(selector);
            waitForModelPromise.then(function(){
                let clickModal = cPage.click(selector);
                return clickModal;
            })
            .then(function(){
                resolve();
            })
            .catch(function(err){
                console.log("Error caused here!");
                reject();

            })

        })
    }

    function questionSolver(page, question, answer){
        return new Promise(function(resolve, reject){
            let qstnToBeSolved = question.click();
            qstnToBeSolved.then(function(){
                //targeting the editor!
                let editorPromise = waitAndClick('.monaco-editor.no-user-select.vs', page);
                return editorPromise;
            })
            .then(function(){
                //changing the editor, will be using custom text box
                return waitAndClick('.checkbox-input', page);
            })
            .then(function(){
                return page.waitForSelector('textarea.custominput', page);
            })
            .then(function(){
                return page.type('textarea.custominput', answer, {delay : 10});
            })
            .then(function(){
                let ctrlPressed = page.keyboard.down('Control', {delay: 10} );
                return ctrlPressed;
            })
            .then(function(){
                let selectCode = page.keyboard.press('A', {delay: 10} );
                return selectCode;
            })
            .then(function(){
                let cutCode = page.keyboard.press('X', {delay: 10} );
                return cutCode;
            })
            .then(function(){
                let ctrlUnpressed = page.keyboard.up('Control', {delay: 10} );
                return ctrlUnpressed;
            })
            .then(function(){
                let editorPromise = waitAndClick('.monaco-editor.no-user-select.vs', page);
                return editorPromise;
            })
            .then(function(){
                let ctrlPressed = page.keyboard.down('Control', {delay: 10} );
                return ctrlPressed;
            })
            .then(function(){
                let selectCode = page.keyboard.press('A', {delay: 10} );
                return selectCode;
            })
            .then(function(){
                let ctrlUnpressed = page.keyboard.up('Control', {delay: 10} );
                return ctrlUnpressed;
            })
            .then(function(){
                let del = page.keyboard.press('Backspace', {delay: 10} );
                return del;
            })
            .then(function(){
                let ctrlPressed = page.keyboard.down('Control', {delay: 10} );
                return ctrlPressed;
            })
            .then(function(){
                let pasteCode = page.keyboard.press('V', {delay: 10} );
                return pasteCode;
            })
            .then(function(){
                let ctrlUnpressed = page.keyboard.up('Control', {delay: 10} );
                return ctrlUnpressed;
            })
            .then(function(){
                return page.click('.hr-monaco__run-code', {delay:10});
            })
            .then(function(){
                resolve();
            })
            .catch(function(err){
                console.log("Error here! @solve");
                reject();
            })
        })
    }