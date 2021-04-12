const dotenv = require('dotenv');

const gql = require('graphql-tag')
const { GraphQLWrapper } = require('@aragon/connect-thegraph')

dotenv.config();

/* saving LP queries for later
const USER_POOLS = gql`
  mints(orderBy: timestamp, orderDirection: desc, where: { to: "${process.env.ADDRESS}" }) {
    id
    transaction {
      id
        timestamp
    }
    pair {
      id
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
    }
    to
    liquidity
    amount0
    amount1
    amountUSD
  }
  burns(orderBy: timestamp, orderDirection: desc, where: { sender: "${process.env.ADDRESS}" }) {
    id
    transaction {
      id
      timestamp
    }
    pair {
      id
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
    sender
    to
    liquidity
    amount0
    amount1
    amountUSD
  }`*/

const USER_TRANSACTIONS = gql`
    {
      swaps(orderBy: timestamp, orderDirection: desc, where: { to: "${process.env.ADDRESS}" }) {
      id
      transaction {
        id
        timestamp
      }
      pair {
        token0 {
          symbol
        }
        token1 {
          symbol
        }
      }
      amount0In
      amount0Out
      amount1In
      amount1Out
      amountUSD
      to
    }
  }
`

async function getTransactions(message) {
  const graphqlClient = new GraphQLWrapper(process.env.SUBGRAPH_URI)
  const result = await graphqlClient.performQuery(USER_TRANSACTIONS)

  if (!result.data) {
    console.log('shit');
    return
  }

  console.log(result.data);

}

getTransactions();
