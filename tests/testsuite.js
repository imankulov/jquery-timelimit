test('basic test', function() {
    var testVariable = 0;
    // data is empty
    equals($(document).data('timelimit'), undefined, 'data is empty');
    // append function
    $(document).timelimit(function(){
        testVariable ++;
    });
    // data isn't empty
    equals(typeof $(document).data('timelimit'), 'function', 'data is not empty');
    // in 2 seconds data is empty again
    stop();
    setTimeout(function(){
        // variable was changed
        equals(testVariable, 1, 'function has been executed');
        equals($(document).data('timelimit'), undefined, 'data is empty again');
        start();
    }, 2000);
});


test('two functions test. replace policy', function() {
    var testVariable = 0;
    $(document).timelimit(function(){
        testVariable ++;
    });
    $(document).timelimit(function(){
        testVariable --;
    });
    // in 2 seconds testVariable equals -1
    stop();
    setTimeout(function(){
        // variable was changed
        equals(testVariable, -1, 'only second function has been executed');
        start();
    }, 2000);
});

test('two functions test. reject policy', function() {
    var testVariable = 0;
    var options = {policy: 'reject'};
    $(document).timelimit(function(){
        testVariable ++;
    }, options);
    $(document).timelimit(function(){
        testVariable --;
    }, options);
    stop();
    setTimeout(function(){
        // variable was changed
        equals(testVariable, +1, 'only first function has been executed');
        start();
    }, 2000);
});


test('increment test', function() {
    var testVariable = 0;
    var options = {policy: 'replace', args: [10]};
    $(document).timelimit(function(inc){
        testVariable += inc;
    }, options);
    stop();
    setTimeout(function(){
        equals(testVariable, 10, 'argument is treated correct');
        start();
    }, 2000);
});
