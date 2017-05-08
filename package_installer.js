var input = ['KittenService: CamelCaser', 'CamelCaser: '];

/*
    @packages - an array of strings containing the packages and their dependencies
                ex: ['KittenService: CamelCaser', 'CamelCaser: ']
*/

module.exports.PACKAGE_ORDER = function(packages) {
    // 1. verify 'packages' is of type array
    // 2. check if 'packages' is not equal to length 0
    // 3. check if 'packages' is equal to size 1
    // 4. else continue
    packages.forEach(function(val, i) {
        console.log(i+') ', val);
    });
}