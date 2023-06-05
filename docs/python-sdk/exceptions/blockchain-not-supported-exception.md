---
title: BlockchainNotSupportedException
description: Thrown when an Invalid blockchain id is put during a call to the API.
keywords:
- Python
- Exceptions
- API
---

```python
class BlockchainNotSupportedException(BlockchainAPIsException):
```

Thrown when an Invalid blockchain id is put during a call to the API.

To get the list of valid blockchain ids, call `/blockchains`

## Params

### status_code

- type: `str`
- example: `422`

### detail

- type: `str`
- example: `Blockchain with id "test" is not supported. You can find a list of valid blockchain ids in /blockchains`
