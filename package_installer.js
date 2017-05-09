/*
    @packages - an array of strings containing the packages and their dependencies
                ex: ['KittenService: CamelCaser', 'CamelCaser: ']
    returns String - the string will be the correct order in which the packages
                   - need to be installed
*/

var orderPackages = module.exports.PACKAGE_ORDER = function(packages) {
    // 1. verify 'packages' is of type array
    // section 1.

    // section 2.
    if(packages.length === 0)
        return '';
    
    // section 3.
    if(packages.length === 1)
        return packages[0].split(': ')[0];

    // section 4.
    var dependentList = '';
    var nonDependentList = '';
    var hash = {};

    packages.forEach(function(val, i) {
        var package = val.split(': ')[0];
        var dependency = val.split(': ')[1];
        if(dependency === '') {
            nonDependentList += package + ', ';
        } else {
            hash[package] = {dep: dependency, marked: false};
            // dependentList += package + ', ';
        }
    });
    
    dependentList = OrderDependentPackages(hash, null);
    
    var list = nonDependentList + dependentList;
    // remove the last occurring ", "
    // list = list.substring(0, list.length - 2);

    return list;
}

/*
    Runs all tests.
*/

module.exports.RUN_TESTS = function() {
    // Print(TestPackageInstaller([], ''));
    // Print(TestPackageInstaller(['A: '], 'A'));
    // Print(TestPackageInstaller(['KittenService: CamelCaser', 'CamelCaser: '], 'CamelCaser, KittenService'));
    // Print(TestPackageInstaller(['A: ', 'B: C', 'C: '], 'A, C, B'));
    // Print(TestPackageInstaller(['A: ', 'B: ', 'C: ', 'D: ', 'E: ', 'F: '], 'A, B, C, D, E, F')); 
    // // 5
    // Print(TestPackageInstaller(['A: ', 'B: ', 'C: ', 'D: ', 'E: B', 'F: '], 'A, B, C, D, F, E'));
    // Print(TestPackageInstaller(['B: C', 'A: B', 'C: '], 'C, B, A'));
    Print(TestPackageInstaller(['A: B', 'B: C', 'C: D', 'D: E', 'E: F', 'F: '], 'F, E, D, C, B, A'));
    // Print(TestPackageInstaller(['A: B', 'B: A'], 'A, B, A') + ': Contains a Cycle');
    // Print(TestPackageInstaller(['A: ', 'B: A'], 'A, B'));
    // Print(TestPackageInstaller(['KittenService: ', 'Leetmeme: Cyberportal', 'Cyberportal: Ice', 'CamelCaser: KittenService', 'Fraudstream: Leetmeme', 'Ice: '], 'KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream')); 
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
    console.log(result + ' === ' + expected);
    if(result === expected) {
        return 'PASS';
    }

    return 'FAIL';
}

/*
    Orders only the packages that have dependencies
    @map - contains the packages that need to be ordered correctly
    @start - TODO
    returns String - which will be the order of the packages
*/

function OrderDependentPackages(map, start) {
    var result = '';
    if(start === null) {
        for(var package in map) {
            if(!map[package].marked) {
                start = package;
                break;
            }
        }
    }

    var ref = map[start];
    console.log(start,'->', ref);
    // console.log();
    // check if start's dependent is in map
    if(map[map[start].dep]) {
        console.log('inside', start);
        var str = OrderDependentPackages(map, map[start].dep);
        result += str + ', ' + start;
        console.log('result:',result);
        return result;
    } else {//if(!map[start.dep]) {
        console.log('outside', start);
        return start;
    }

    return result;
}

/*
    Simpler console.log function to save a bit of time.
*/

function Print(result) {
    console.log(result);
}