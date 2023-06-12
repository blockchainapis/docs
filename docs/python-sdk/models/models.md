---
title: models
description: Contains the models that are returned by the Blockchain APIs instance class.
sidebar-position: 3
sidebar_class_name: sidebar-models
---

Contains the models that are returned by the Blockchain APIs instance
class.

These models are all dataclasses that have the slots and frozen set to True.

- `slots=True` Allow you to have more optimized access to the data
- `frozen=True` This way you can't modify the returned values from the API.
              Because what the API return is final it should not be modified.

To access some data use the Python dot "." notation.

For example:
```python
blockchain_instance = Blockchain(
    blockchain="ethereum",
    name="Ethereum",
    chain_id=1,
    explorer="https://etherscan.io/"
)

# Get the id of the blockchain
print(blockchain_instance.blockchain)
```

Please note that you can't access the data with the dictionary notation:
```python
blockchain_instance = Blockchain(
    blockchain="ethereum",
    name="Ethereum",
    chain_id=1,
    explorer="https://etherscan.io/"
)

# This will throw an exception, use the notation in the example
# above please.
print(blockchain_instance["blockchain"])