---
title: InvalidPageException
description: Thrown when you given an invalid page index during calls to responses thatgives paginated results.
sidebar_position: 1
---

```py
class InvalidPageException(BlockchainAPIsException):
```

Thrown when you given an invalid page index during calls to responses that
gives paginated results.

An invalid page is:
* A number lower or equal to 0
* A page way too high

You should start with 1 as page, and then the response object will give you
the amount of pages available.

## Params

### status_code

The error code returned by the call to the API
- type: `int`
- example: ` 400
    `

### detail

Some details about the error that occured
- type: `str`
- example: `
    -2 is not a valid page number.
    `

