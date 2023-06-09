---
title: BlockchainNotSupportedException
description: Thrown when an Invalid blockchain id is put during a call to the API.
---

```py
class BlockchainNotSupportedException(BlockchainAPIsException):
```

Thrown when an Invalid blockchain id is put during a call to the API.

To get the list of valid blockchain ids, call `/blockchains`

## Params

### status_code

The error code returned by the call to the API
- type: `str`
- example: ` 422
    `

### detail

Some details about the error that occured
- type: `str`
- example: `
    Blockchain with id "test" is not supported. You can find a list of valid blockchain ids in /blockchains
    `

