---
title: "How to know the token amount required for a swap?"
sidebar_label: "Get Token Swap Amount In"
description: "Learn how to predict the amount of tokens that you will need in order to get a certain amount of token."
sidebar_position: 4
---

With Automated Market Makers, for a specific pair, for example: WETH-USDC, it is possible
to predict the exact amount of ETH that you will need in order to buy 2000 USDC.

For example in this screenshot:
<img loading="eager" alt="Choose plan page" src="/img/docs/simulations/uniswap-amount-in.png" />

We can see that in order to get 2000 USDC with the current swap rates, we need to pay 1.05802 ETH.

The goal of this tutorial is to teach you how to predict the amount required in order to get a
certain amount of tokens

:::tip
If you are looking for the reverse operation (predicting the sell amount out of a token instead
of the required amount in), you can follow this tutorial: [Get Swap Amount Out](/docs/tutorial/pairs/get-swap-amount-out#print-the-result)
:::

:::caution
The amount in is computed using the exact same math as inside of the blockchain, taking 
liquidity provider fee in account. Which means that for big tokens like USDC and WETH, you
will get the **exact** same output as if you ran the trade on the blockchain.

But be careful on 2 points:
- During high activity, because of slippage, you might get a slightly different amount in
- Some tokens implement a fee mechanism on buy or sell, this mechanism is not
taken in account in the math made by Blockchain APIs.
:::

## Step 1: Install the SDK

Get the SDK for your favorite language:

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

<Tabs groupId="programming-language" queryString>
    <TabItem value="python" label="Python" default>
        <CodeBlock language="shell">
            {`pip install blockchain-apis`}
        </CodeBlock>
    </TabItem>
</Tabs>

## Step 2: Create the Blockchain APIs instance

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()
# do some stuff...
```
:::success
This solution works, but for better performance, you can use [Python-Async](?programming-language=async-python#step-2-create-the-instance)
:::

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

# We need to create an async function, because we can't do async calls in main Python thread.
async def get_amount_in():
    # We instanciate the Blockchain APIs instance using Python
    # async with feature, this way we are sure that the API instance
    # is closed at the end
    async with BlockchainAPIs() as blockchain_apis:
        # do some stuff...
        pass

asyncio.run(get_amount_in())
```

</TabItem>
</Tabs>

## Step 3: Get the amount in

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

# Do an API call in order to get the amount out
# highlight-start
amounts_in = blockchain_apis.amount_in(
    # The blockchain on which you want the exchange to take place
    blockchain="ethereum",
    # The address of the token that you sell, here it is WETH address
    tokenIn="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    # The address of the token that we buy, here it is USDC
    tokenOut="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    # The amount of tokenOut that we are willing to get.
    # Here we want to get 2000 USDC.
    # We need to add 10**6 because the USDC token has 6 decimals
    amountOut=2000 * 10**6,
    # You can optionally specify an exchange id in order to get the rate
    # on a specific exchange, for example if you want to use Uniswap:
    # exchange="uniswapv2_ethereum"
    # By default, if you don't specify an exchange, it will give you the amount
    # out for every exchange available.
)
# highlight-end
```

Here we call the <a href="/docs/python-sdk/blockchain-apis-sync/amount-in" target="_blank">amount_in</a> method of the Blockchain APIs instance.

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_amount_in():
    async with BlockchainAPIs() as blockchain_apis:
        # Call the API to get the amount out
        # highlight-start
        amounts_in = await blockchain_apis.amount_in(
            # The blockchain on which you want the exchange to take place
            blockchain=BLOCKCHAIN,
            # The address of the token that you sell, here it is WETH address
            tokenIn="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            # The address of the token that we buy, here it is USDC
            tokenOut="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            # The amount of tokenOut that we are willing to get.
            # Here we want to get 2000 USDC.
            # We need to add 10**6 because the USDC token has 6 decimals
            amountOut=2000 * 10**6,
            # You can optionally set a specific exchange id in order to get the rate
            # on a specific exchange, for example if you want to use Uniswap:
            # exchange="uniswapv2_ethereum"
            # By default, if you don't specify an exchange, it will give you the amount
            # out for every exchange available.
        )
        # highlight-end

asyncio.run(get_amount_in())
```

Here we call the <a href="/docs/python-sdk/blockchain-apis/amount-in" target="_blank">amount_in</a> method of the Blockchain APIs instance.

</TabItem>
</Tabs>

### Method parameters

#### blockchain

The id of the blockchain.

In our example, we have put the `ethereum` blockchain id.

:::tip
If you are willing to know the list of available blockchain ids for the API,
you follow this tutorial: <a href="/docs/tutorial/blockchains/get-supported-blockchains" target="_blank">Get Supported Blockchains</a>
:::

### tokenIn

The address of the token that we are selling for the trade.

Here we put `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` which is the address of the Wrapped Ethereum token.

### tokenOut

The address of the token that we are buying in the trade.

Here we put `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` which is the address of the USDC token.

:::info
Please note that there must be a pair that exists between `tokenIn` and `tokenOut`, otherwise the client will throw
an exception.

If you are willing to know the list of available pairs you can follow this tutorial: <a href="/docs/tutorial/pairs/get-blockchain-pairs" target="_blank">Get Blockchain Pairs</a>
:::

### amountOut

The amount of tokenOut that we are willing to get at the end of the trade. For example, here we have put: `2000000000` which corresponds
to `2000.00` USDC.

:::tip
The token amount need to be in his `unsigned integer form`. This is because the blockchain uses only integer in his computations for more
precision. To learn more you you can follow this tutorial: <a href="/docs/tutorial/tokens/display-tokens-in-decimal-form#step-5-display-the-token-in-his-unsigned-integer-form" target="_blank">Display the token in unsigned integer form</a>
:::

### exchange (optional)

The id of the exchange on which you want to simulate the swap.

This parameter is optional and, by default, if you don't put it, you will get the amount out for all of the
Decentralized Exchanges available.

Here is the same code as before but this time we simulate the trade on `uniswapv2_ethereum`:

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

# Do an API call in order to get the amount of WETH required in order to get
# 2000.00 USDC on UniswapV2.
amounts_in = blockchain_apis.amount_in(
    blockchain="ethereum",
    tokenIn="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    tokenOut="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    amountOut=2000 * 10**6,
    # highlight-start
    # The id of the exchange on which you are willing to do the swap
    exchange="uniswapv2_ethereum"
    # highlight-end
)
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_amount_in():
    async with BlockchainAPIs() as blockchain_apis:
        # Do an API call in order to get the amount of WETH required in order to get
        # 2000.00 USDC on UniswapV2.
        amounts_in = await blockchain_apis.amount_in(
            blockchain="ethereum",
            tokenIn="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            tokenOut="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            amountOut=2000 * 10**6,
            # highlight-start
            # The id of the exchange on which you want to simulate the swap
            exchange="uniswapv2_ethereum"
            # highlight-end
        )

asyncio.run(get_amount_in())
```

</TabItem>
</Tabs>

:::tip
If you are willing to get the list of all of the exchange IDs available, you can follow this
tutorial: <a href="/docs/tutorial/blockchains/get-supported-exchanges" target="_blank">Get Supported Exchanges</a>.
:::

## Step 4: Retrieve result

### The returned model

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

The <a href="/docs/python-sdk/blockchain-apis-sync/amount-in" target="_blank">amount_in</a> method returns a List of <a href="/docs/python-sdk/models/amount-in" target="_blank">AmountIn</a> model.

Here is the structure of the <a href="/docs/python-sdk/models/amount-in" target="_blank">AmountIn</a> model:
```py
@dataclass(slots=True, frozen=True)
class AmountIn
    blockchain: str
    exchange: str
    tokenIn: str
    tokenOut: str
    amountIn: int
    amountOut: int
```

#### blockchain

The id of the blockchain on which the pair is.

#### exchange

The id of the exchange which gives you this rates.

#### tokenIn

The address of the token that you sell. It is the same as the one that you have put when doing the API call.

#### tokenOut

The address of the token that you buy. It is the same as the one that you have put when doing the API call.

#### amountIn

The amount of tokenIn that you need in order to get amountOut tokenOut.

#### amountOut

The amount of tokenIn that you want. This value is the same as the one you put when doing the API call.

</TabItem>
<TabItem value="async-python" label="Python-Async">

The <a href="/docs/python-sdk/blockchain-apis/amount-in" target="_blank">amount_in</a> method returns a List of <a href="/docs/python-sdk/models/amount-in" target="_blank">AmountIn</a> model.

Here is the structure of the <a href="/docs/python-sdk/models/amount-in" target="_blank">AmountIn</a> model:
```py
@dataclass(slots=True, frozen=True)
class AmountIn
    blockchain: str
    exchange: str
    tokenIn: str
    tokenOut: str
    amountIn: int
    amountOut: int
```

#### blockchain

The id of the blockchain on which the pair is.

#### exchange

The id of the exchange which gives you this rates.

#### tokenIn

The address of the token that you sell. It is the same as the one that you have put when doing the API call.

#### tokenOut

The address of the token that you buy. It is the same as the one that you have put when doing the API call.

#### amountIn

The amount of tokenIn that you need in order to get amountOut tokenOut.

#### amountOut

The amount of tokenIn that you want. This value is the same as the one you put when doing the API call.

</TabItem>
</Tabs>

### Print the result

For each exchange, we will print the rate that the exchange offers.

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

amounts_in = blockchain_apis.amount_in(
    blockchain="ethereum",
    tokenIn="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    tokenOut="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    amountOut=2000 * 10**6,
)

# highlight-start
# We loop to get all of the results
for amount_in in amounts_in:
    # We print with the decimal form.
    # WETH have 18 decimals so we put 18 for the decimal form.
    print(f"In {amount_in.exchange} you will need {blockchain_apis.get_token_decimal_form(amount_in.amountIn, 18)} WETH in order to get 2000.00 USDC")
# highlight-end
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_amount_in():
    async with BlockchainAPIs() as blockchain_apis:
        amounts_in = await blockchain_apis.amount_in(
            blockchain="ethereum",
            tokenIn="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            tokenOut="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            amountOut=2000 * 10**6,
        )

        # highlight-start
        # We loop to get all of the results
        for amount_in in amounts_in:
            # We print with the decimal form.
            # WETH have 18 decimals so we put 18 for the decimal form.
            print(f"In {amount_in.exchange} you will need {blockchain_apis.get_token_decimal_form(amount_in.amountIn, 18)} WETH in order to get 2000.00 USDC")
        # highlight-end

asyncio.run(get_amount_in())
```

</TabItem>
</Tabs>

:::tip
By default, Blockchain APIs return the values in their `unsigned integer form`. If you are willing to do computations on the
result, we advise you to keep the unsigned integer form as it is more precise and more optimized.

But, since we are displaying the result to an end user, in our example, we have converted the token to his `decimal form`. If
you are willing to learn more about `decimal/unsigned integer` form, you can follow this tutorial: [How to display a token amount in his decimal form?](/docs/tutorial/tokens/display-tokens-in-decimal-form)
:::
