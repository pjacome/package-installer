/*
    @packages - an array of strings containing the packages and their dependencies
                ex: ['KittenService: CamelCaser', 'CamelCaser: ']
    returns String - the string will be the correct order in which the packages
                   - need to be installed
*/
var orderPackages = module.exports.PACKAGE_ORDER = function(packages) {
    var independentPackages = [];
    var dependentPackages = {};
    // packages.forEach(function(val, i) {
    for(var i = 0; i < packages.length; ++i) {
        // The input is split at the occurrance of ": " because the write up
        // showed the input would be structured like that
        var package = packages[i].split(': ')[0];
        var dependency = packages[i].split(': ')[1];
        if(dependency === '') {
            independentPackages.push(package);
        } else {
            try {
                if(package === dependency) {
                    // throw error if package depends on itself
                    throw new Error('FAIL: Contains Cycle');
                }
            } catch(err) {
                return err.message;
            }

            dependentPackages[package] = {
                d: dependency,  // d = dependency
                v: false        // v = visited
            };
        }
    }

    var stack = [];
    for(var package in dependentPackages) {
        if(!dependentPackages[package].v) {
            dependentPackages[package].v = true;
        } else {
            continue;
        }

        var orderedDependentPackages = DeeperAndDeeper(dependentPackages, package, independentPackages);
        stack = stack.concat(orderedDependentPackages);
    }

    var list = independentPackages.concat(stack);
    try {
        if(HasDuplicates(list)) {
            // throw error if packages contain a cycle
            throw new Error('FAIL: Contains Cycle');
        }
    } catch(err) {
        return err.message;
    }

    // below is extra code simply to conform to the output as shown in the write up
    // otherwise "return list.toString()" will suffice
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
    @independentPackages - array of packages that have no dependencies
    returns String - which will be the order of the packages
*/
function DeeperAndDeeper(map, start, independentPackages) {
    if(map[start]) {
        // check if the start has a dependency
        if(map[map[start].d]) {
            // check if start's dependency has been visited already
            if(map[map[start].d].v) {
                return [start];
            }
        }
        // set start's visited property to true
        map[start].v = true;
        // get list from one level deeer
        var recursedList = DeeperAndDeeper(map, map[start].d, independentPackages);
        var completeList = recursedList.concat([start]);
        return completeList;
    } else if(!StartExistsInOtherList(start, independentPackages)) {
        independentPackages.push(start);
    }
    return [];
}

/*
    Checks to see if the list has any duplicates
    @array - the ordered list of packages to be installed
    returns Boolean - if TRUE then a cycle exists
                      if FALSE then no cycle was detected
*/
function HasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

/*
    Checks to see if package exists in the independent packages list
    @package - the package to see if it exists
    @packages - list of packages that will be checked
    returns Boolean - if TRUE then package does exist
                    - if FALSE then packaage does not exist
*/
function StartExistsInOtherList(package, packages) {
    for(var i = 0; i < packages.length; ++i) {
        if(package === packages[i])
            return true;
    }
    return false;
}

/*
    Runs all tests.
*/
module.exports.RUN_TESTS = function() {
    const CycleDetected = 'FAIL: Contains Cycle';
    Print('\n\t***************************\n\t** ... Running Tests ... **\n\t***************************');
    Print(TestPackageInstaller([], ''));
    Print(TestPackageInstaller(['A: '], 'A'));
    Print(TestPackageInstaller(['Y: X'], 'X, Y'));
    Print(TestPackageInstaller(['Z: Z'], CycleDetected));
    Print(TestPackageInstaller(['KittenService: CamelCaser', 'CamelCaser: '], 'CamelCaser, KittenService'));
    Print(TestPackageInstaller(['A: ', 'B: C', 'C: '], 'A, C, B'));
    Print(TestPackageInstaller(['A: ', 'B: ', 'C: ', 'D: ', 'E: ', 'F: '], 'A, B, C, D, E, F')); 
    // 5
    Print(TestPackageInstaller(['A: ', 'B: ', 'C: ', 'D: ', 'E: B', 'F: '], 'A, B, C, D, F, E'));
    Print(TestPackageInstaller(['B: C', 'A: B', 'C: '], 'C, B, A'));
    Print(TestPackageInstaller(['A: B', 'B: C', 'C: D', 'D: E', 'E: F', 'F: '], 'F, E, D, C, B, A'));
    Print(TestPackageInstaller(['B: C', 'C: D', 'A: B', 'D: E', 'E: F', 'F: '], 'F, E, D, C, B, A'));
    Print(TestPackageInstaller(['A: B', 'B: A'], CycleDetected));
    Print(TestPackageInstaller(['A: ', 'B: A'], 'A, B'));
    Print(TestPackageInstaller(['KittenService: ', 'Leetmeme: Cyberportal', 'Cyberportal: Ice', 'CamelCaser: KittenService', 'Fraudstream: Leetmeme', 'Ice: '], 'KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream')); 
    // 10
    Print(TestPackageInstaller(['D: ', 'C: D', 'B: C', 'A: B'], 'D, C, B, A'));
    Print(TestPackageInstaller(['B: C', 'C: D', 'D: ', 'A: B'], 'D, C, B, A'));
    Print(TestPackageInstaller(['B: C', 'C: D', 'D: ', 'A: D'], 'D, C, B, A'));
    var alphabet = ['A: X', 'B: E', 'C: Z', 'D: A', 'E: F', 'F: X', 'X: B'];
    Print(TestPackageInstaller(alphabet, CycleDetected));
    alphabet = [
        'A: B', 'B: C', 'C: D', 'D: E', 'E: F', 'F: G', 'G: H', 'H: '
    ];
    Print(TestPackageInstaller(alphabet, 'H, G, F, E, D, C, B, A'));
    Print(TestPackageInstaller(['a: b', 'b: c', 'c: d', 'd: e', 'e: f', 'f: g', 'g: a'], CycleDetected));
    Print(TestPackageInstaller(['KittenService: ', 'Leetmeme: Cyberportal', 'Cyberportal: Ice', 'CamelCaser: KittenService', 'Fraudstream: ', 'Ice: Leetmeme'], CycleDetected));
    Print(TestPackageInstaller(['C: D', 'A: B', 'D: F', 'G: ', 'E: G', 'F: ', 'B: E'], 'G, F, D, C, E, B, A'));
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
    if(result === expected && result === 'FAIL: Contains Cycle')
        return result;
    if(result === expected)
        return 'PASS';

    return 'FAIL';
}

/*
    Simpler console.log function to save a bit of time.
*/
function Print(result) {
    console.log(result);
}