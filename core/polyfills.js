// For IE 11

global.size = function size(obj) {
    return obj && ((typeof obj === 'string') ? obj.length : Object.keys(obj).length)
}

global.isArray = function isArray(obj) {
    return obj instanceof Array
}

global.isEmpty = function isEmpty(obj) {
    return !size(obj)
}
/**
 * Encode spaces and other characters into +
 * @returns {string}
 */
String.prototype.safeParam = function() {
    return this.replace(/[\s\uFEFF\xA0]+/g, '+')
}

/**
 * Return a SEO frieldly version of a string
 * @returns {string}
 */
String.prototype.seoName = function() {
    return this.toLowerCase().replace(/[\s\uFEFF\xA0]+/g, '_')
}

/**
 * Remove weird characters and trim spaces
 * @returns {string}
 */
String.prototype.cleanString = function() {
    return this.toLowerCase()
               .replace(/\W+|–/g, ' ')
               .replace(/\s+/g, ' ')
               .trim()
}

/**
 * Returns a numeric hash of a string
 * @returns {number}
 */
String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash
}

/**
 * Encode into base64 without breaking utf-8
 * @returns {string}
 */
String.prototype.base64encode = function() {
    return btoa(encodeURIComponent(this).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1)
    }))
}

/**
 * Here we add a few ES6 polyfills since we dont want to include whole of babel-polyfill
 */
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

if (!String.prototype.includes) {
    String.prototype.includes = function includes(str) {
        return this.indexOf(str) !== -1;
    };
}
if (!String.prototype.trimLeft) {
    String.prototype.trimLeft = function trimLeft(str) {
        return remove(this, str ? new RegExp(`/^${str}+/`) : /^\s+/);
    };
}
if (!String.prototype.trimRight) {
    String.prototype.trimRight = function trimRight(str) {
        return remove(this, str ? new RegExp(`/${str}+$/`) : /\s+$/);
    };
}

function remove(str, rx) {
    return str.replace(rx, '');
}
