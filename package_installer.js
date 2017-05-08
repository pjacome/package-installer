var input = ['KittenService: CamelCaser', 'CamelCaser: '];

/*
    @packages - an array of strings containing the packages and their dependencies
                ex: ['KittenService: CamelCaser', 'CamelCaser: ']
    returns String - the string will be the correct order in which the packages
                   - need to be installed
*/

var t = module.exports.PACKAGE_ORDER = function(packages) {
    // 1. verify 'packages' is of type array
    // 2. check if 'packages' is not equal to length 0
    // 3. check if 'packages' is equal to size 1
    // 4. else continue
    packages.forEach(function(val, i) {
        // console.log(i+') ', val);
        var package = val.split(':')[0];
        var dependency = val.split(':')[1];
        // console.log(package + ' -> ' + dependency);
    });
    // -1 is a placeholder while tests are set up
    return -1;
}

/*
    Runs all tests.
*/

module.exports.RUN_TESTS = function() {
    console.log(testPackageInstaller([], ''));
    console.log(testPackageInstaller(['A: '], 'A'));
    console.log(testPackageInstaller([], 'CamelCaser, KittenService: CamelCaser'));
}

function testPackageInstaller(input, expected) {
    var result = t(input);
    // are they even the same length?
    if(result.length !== expected.length) {
        return 'FAIL';
    }

    for(var i = 0; i < expected.length; ++i) {
        if(!result[i].match(expected[i])) {
            return 'FAIL';
        }
    }

    return 'PASS';
}