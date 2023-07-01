---
title: "How to display a token amount in his decimal form"
description: "Learn how to convert a token from his unsigned integer form to his decimal form. And also from his unsigned integer form to decimal form"
sidebar_position: 3
sidebar_label: "Display Tokens in Decimal Form"
---

Inside of any blockchain (whenever it is Ethereum, Arbitrum, Polygon...), the numbers are stored as integers.
Applications like [Uniswap](https://app.uniswap.org/#/swap) or [Metamask](https://metamask.io/) are displaying
the number as float.

For example in the screenshot of Uniswap below:

<img loading="eager" alt="Choose plan page" src="/img/docs/decimals/uniswap.png" />

As you can see, I am trying to exchange 2.45 ETH for 4,255.19 USDC

This is what Uniswap displays, but actually inside of the blockchain, these numbers are stored as unsigned integers this way:

- ETH: `2450000000000000000`
- USDC: `4255190000`

As you can see, it is less user-friendly to see numbers like above instead of their decimal representation, so you may ask
yourself: _Why does the blockchain store the numbers as integers and not floating numbers?_

The blockchain store these numbers as integers because there is no way to store a floating number inside of the blockchain.
Floating numbers in IT are usually not precise, indeed, it is better to avoid these numbers when we deal with financial data
like the blockchain does.

To make it user-friendly, the [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token standard have
added a `decimal` variable inside of each tokens. This `decimal` variable is used for application that need to display some
numbers to users (like Uniswap and MetaMask). In our example above, ETH have 18 decimals point and USDC have 6, that is where all
of these `0` come from.

At the end of this tutorial you will learn:
- How to get the decimals of a token
- Transform a floating number like 2.45 ETH to his integer representation: `2450000000000000000`
- Transform an unsigned representation of a number: `2450000000000000000` to his decimal representation: `2.45`

:::tip
Blockchain APIs is only returning values as unsigned integers because that is how the Blockchain is storing data. We advise you to keep
all of the numbers as unsigned integers because it is more precise. Use only the decimal form when you want to display the number to a user.
:::

## STEP 1: Install the SDK

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

## STEP 2: Convert the 
