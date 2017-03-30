# Jackal Contract Guide

__NOTE:__ Jackal is currently in alpha and so the API is not yet considered fully stable. Currently we anticipate at least one major API change prior to reaching a 1.0.0 release, and this document will be updated to reflect any API changes we make.

Consumers should define an array of contracts in JSON, where each contract within the array is an object with the following format:

```
{
  name:         STRING                    // REQUIRED
  consumer:     STRING                    // REQUIRED
  before: [
    {
      url:      STRING                    // REQUIRED
      method:   STRING                    // OPTIONAL, DEFAULT: GET
      body:     OBJECT / STRING / ARRAY   // OPTIONAL, DEFAULT: undefined
      timeout:  INTEGER                   // OPTIONAL, DEFAULT: OS Dependent
    }
  ]
  after: [
    {
      url:      STRING                    // REQUIRED
      method:   STRING                    // OPTIONAL, DEFAULT: GET
      body:     OBJECT / STRING / ARRAY   // OPTIONAL, DEFAULT: undefined
      timeout:  INTEGER                   // OPTIONAL, DEFAULT: OS Dependent
    }
  ]
  request: {
    url:        STRING                    // REQUIRED
    method:     STRING                    // OPTIONAL, DEFAULT: GET
    headers:    OBJECT                    // OPTIONAL, DEFAULT: undefined
    body:       OBJECT / STRING / ARRAY   // OPTIONAL, DEFAULT: undefined
    timeout:    INTEGER                   // OPTIONAL, DEFAULT: OS Dependent
  }
  response: {
    statusCode: INTEGER                   // REQUIRED
    headers:    OBJECT                    // OPTIONAL, DEFAULT: undefined
    body:       OBJECT                    // OPTIONAL, DEFAULT: undefined
  }
}
```

The following restrictions apply:

- In the name field `provider` and `api` may contain only `a-z`, `0-9` and `_`
- In the name field `consumer` and `api` may contain only `a-z`, `0-9` and `_`

- The `before` and `after` arrays are optional
  - If specified, objects in the `before` and `after` arrays must have the fields as indicated in the example above

- `request/url` must be a valid url
- `request/method` must be one of:
  - `CONNECT`, `DELETE`, `GET`, `HEAD`, `OPTIONS`, `PATCH`, `POST`, `PUT`, `TRACE`

- `request/timeout` as well as the `timeout` property of objects in the `before` and `after` arrays is in milliseconds
- `request/body` as well as the `body` property of objects in the `before` and `after` arrays must be in string form

- `response/statusCode` must be one of:
  - 100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
- `response/body` must be an object, string or array
  - if a string, it should be the string representation of a valid [Joi](https://github.com/hapijs/joi) schema
  - if an object, the value of each field should be the string representation of a valid Joi schema
  - if an array, the values should be either a string or an object, as described previously