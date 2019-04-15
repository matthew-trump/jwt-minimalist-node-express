# Node Express JWT Example

This repository contains a template for a simple node express server with the minimum features to provide JWT security for a web application, such as the [Angular JWT Example project](https://github.com/matthew-trump/angular-jwt-example).

It provides a server app that:

* accepts username/password POST logins and, for valid logins, returning a signed JWT token in the response headers.
* defines an authorization function that can be applied to protected routes by checking for the presence of valid tokens.
* defines an error handling method that sends an
HTTP 401 response status for invalid requests.

The only npm packages required beyond the basic express application are `jsonwebtoken` to sign requests, and `express-jwt` to check the validity of a received token. 

The `cors` package is also included in the project for conveniece, and is enabled by default. 

## RS256 keys

Note that the server requires the presence of a [private/public keypair](https://stackoverflow.com/questions/39239051/rs256-vs-hs256-whats-the-difference) to operate. By default the app looks for these files respectively at `keys/jwtRS256.key` and `keys/jwtRS256.pub.key`. The key files themselves are not provided here but should be generated as key pair for your own use, for example [this method](https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9):

```
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

Even for the same algorithm, key generating methods can result in output of slightly different file formats (line breaks, etc). The app here has been successfully tested with RS256 private keys that look like this:

```
-----BEGIN RSA PRIVATE KEY-----
MIIJKgIBAAKCAgEA4+yremrXv464axui/f9IDxbPtClAM5pS6FqK5AFCT12UuOiW
AQKCAgBFZV/oi/NYnanE4stDrqBQB9ABuLWVgJ1RpY+4UDHSXFnV2utXwqGXqYGI
...
tEEWr7ONK9PE/vM/keKoS88RvfFzRofSES+5dikAzvJ4F54TPkc4qSf7xujqnYR2
xg0JzDDEkEUgHPbSugXu2UROLMGKY08uoXXlUZ0Iz8dR44VhKFyCk95ai7BRxw==
-----END RSA PRIVATE KEY-----
```

and  RS256 public keys that look like this:

```
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA4+yremrXv464axui/f9I
DxbPtClAM5pS6FqK5AFCT12UuOiWtEEWr7ONK9PE/vM/keKoS88RvfFzRofSES+5
...
9lPvpc3C+kztRGNlrbLZsEpKzBVwYmCyBL6R2tjfn/y6x4YbcsmjPtbvuYtr5Jh2
HZKD44G3S2jwOunTAvbC9r5nZxXgZq1r8HPCsfHGBZjGIunUFFK9rHCRddACw3WQ
R0/02Qf28CaCmjBCy6bc0kUCAwEAAQ==
-----END PUBLIC KEY-----
```

You may need to edit your files slightly to be in the correct format.

## Operation

The server can run using `node ./server.js` in the root directory. It starts on port 8080 by default.

The configurations (for token expirty, path to keys) are found in the `api.js` file, along with the login and protected routes.







