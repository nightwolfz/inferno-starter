/**
 * Return a SEO frieldly version of a string
 * @returns {string}
 */
String.prototype.seoName = function() {
    return this.toLowerCase().replace(/[\s\uFEFF\xA0]+/g, '_');
}

/**
 * Returns a numeric hash of a string
 * Usefull for generating keys on the spot for your React loops
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
    return hash;
}

/**
 * Encode into base64 without breaking utf-8
 * @returns {string}
 */
String.prototype.base64encode = function() {
    return btoa(encodeURIComponent(this).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }))
}
