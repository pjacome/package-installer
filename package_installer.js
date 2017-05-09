/*
    @packages - an array of strings containing the packages and their dependencies
                ex: ['KittenService: CamelCaser', 'CamelCaser: ']
    returns String - the string will be the correct order in which the packages
                   - need to be installed
*/

var orderPackages = module.exports.PACKAGE_ORDER = function(packages) {
    var independentPackages = [];
    var dependentPackages = {};
    packages.forEach(function(val, i) {
        var package = val.split(': ')[0];
        var dependency = val.split(': ')[1];
        if(dependency === '') {
            independentPackages.push(package);
        } else {
            dependentPackages[package] = {
                d: dependency,  // d = dependents
                v: false        // v = visited
            };
        }
    });

    var stack = [];
    for(var package in dependentPackages) {
        if(!dependentPackages[package].v) {
            dependentPackages[package].v = true;
        } else {
            continue;
        }

        var array = DeeperAndDeeper(dependentPackages, package);
        stack = stack.concat(array);
    }

    var list = independentPackages.concat(stack);
    if(HasDuplicates(list)) {
        throw 'FAIL: Contains Cycle';
    }

    // below is extra code to just conform to the output as shown in the write up
    // otherwise list.toString() will suffice
    var result = '';
    for(var i = 0; i < list.length; ++i) {
        if(i === list.length - 1) {
            result = result + list[i];
        } else {
            result += list[i] + ', ';
        }
    }

    return result;
}

/*
    Orders only the packages that have dependencies
    @map - contains the packages that need to be ordered correctly
    @start - TODO
    returns String - which will be the order of the packages
*/
function DeeperAndDeeper(map, start) {
    if(map[start]) {
        if(map[map[start].d]) {
            if(map[map[start].d].v) {
                return [start];
            }
        }
        var x = DeeperAndDeeper(map, map[start].d);
        map[start].v = true;
        var w = x.concat([start]);
        return w;
    }
    return [];
}

function HasDuplicates(array) {
    return (new Set(array)).size !== array.length;
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
    // Print(TestPackageInstaller(['A: B', 'B: C', 'C: D', 'D: E', 'E: F', 'F: '], 'F, E, D, C, B, A'));
    // Print(TestPackageInstaller(['B: C', 'C: D', 'A: B', 'D: E', 'E: F', 'F: '], 'F, E, D, C, B, A'));
    // // Print(TestPackageInstaller(['A: B', 'B: A'], 'FAIL: Contains Cycle'));
    // Print(TestPackageInstaller(['A: ', 'B: A'], 'A, B'));
    // Print(TestPackageInstaller(['KittenService: ', 'Leetmeme: Cyberportal', 'Cyberportal: Ice', 'CamelCaser: KittenService', 'Fraudstream: Leetmeme', 'Ice: '], 'KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream')); 
    // // 10
    // Print(TestPackageInstaller(['D: ', 'C: D', 'B: C', 'A: B'], 'D, C, B, A'));
    // Print(TestPackageInstaller(['B: C', 'C: D', 'D: ', 'A: B'], 'D, C, B, A'));
    // Print(TestPackageInstaller(['B: C', 'C: D', 'D: ', 'A: D'], 'D, C, B, A'));
    var alphabet = ['A: ', 'B: E', 'C: Z', 'D: A', 'E: F', 'F: X', 'X: B'];
    // Print(TestPackageInstaller(alphabet, 'FAIL: Contains Cycle'));
    alphabet = [
        'A: B', 'B: C', 'C: D', 'D: E', 'E: F', 'F: G', 'G: H', 'H: '
    ];
    Print(TestPackageInstaller(alphabet, 'H, G, F, E, D, C, B, A'));
    Print(TestPackageInstaller(['KittenService: ', 'Leetmeme: Cyberportal', 'Cyberportal: Ice', 'CamelCaser: KittenService', 'Fraudstream: ', 'Ice: Leetmeme'], 'KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream'));
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
    if(result === expected) {
        return 'PASS';
    }

    return '>>> FAIL <<<';
}

/*
    Simpler console.log function to save a bit of time.
*/
function Print(result) {
    console.log(result);
}