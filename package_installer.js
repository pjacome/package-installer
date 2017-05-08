/*
    @packages - an array of strings containing the packages and their dependencies
                ex: ['KittenService: CamelCaser', 'CamelCaser: ']
    returns String - the string will be the correct order in which the packages
                   - need to be installed
*/

var orderPackages = module.exports.PACKAGE_ORDER = function(packages) {
    // 1. verify 'packages' is of type array
    // 2. check if 'packages' is not equal to length 0
    // 3. check if 'packages' is equal to size 1
    // 4. else continue

    // section 1.

    // section 2.
    if(packages.length === 0)
        return '';
    
    // section 3.
    if(packages.length === 1)
        return packages[0].split(': ')[0];

    // section 4.
    packages.forEach(function(val, i) {
        // console.log(i+') ', val);
        var package = val.split(': ')[0];
        var dependency = val.split(': ')[1];
        // console.log(package + ' -> ' + dependency);
    });

    // -1 is a placeholder while tests are set up
    return '-1';
}

/*
    Runs all tests.
*/

module.exports.RUN_TESTS = function() {
    Print(TestPackageInstaller([], ''));
    Print(TestPackageInstaller(['A: '], 'A'));
    Print(TestPackageInstaller(['KittenService: CamelCaser', 'CamelCaser: '], 'CamelCaser, KittenService'));
    Print(TestPackageInstaller([], 'A, C, B'));
    Print(TestPackageInstaller([], 'A, B, C, D, E, F')); 
    // 5
    Print(TestPackageInstaller([], 'A, B, C, D, F, E'));
    Print(TestPackageInstaller([], 'F, E, D, C, B, A'));
    Print(TestPackageInstaller(['A: B', 'B: A'], 'A, B, A') + ': Contains a Cycle');
    Print(TestPackageInstaller(['A: ', 'B: A'], 'A, B'));
    Print(TestPackageInstaller(['KittenService: ', 'Leetmeme: Cyberportal', 'Cyberportal: Ice', 'CamelCaser: KittenService', 'Fraudstream: Leetmeme', 'Ice: '], 'KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream')); 
    // 10
}

/*
    Tests the package installer
    @input - an array of packages and their dependencies
    @expected - the expected String after running the package installer
    returns String - 'PASS' if the expected matches the result
                   - 'FAIL' otherwise
*/

function TestPackageInstaller(input, expected) {
    var result = orderPackages(input);

    if(result.match(expected)) {
        return 'PASS';
    }

    return 'FAIL';
}

/*
    Simpler console.log function to save a bit of time.
*/

function Print(result) {
    console.log(result);
}