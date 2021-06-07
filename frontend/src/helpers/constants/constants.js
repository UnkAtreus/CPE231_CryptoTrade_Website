import { gql } from "@apollo/client";

export const GET_ALL_DATA = gql`
  query {
    getUserByToken {
      role {
        id
        role
      }
      firstName
      lastName
      phone
      email
      gender
      birthDate
      nationality
      city
      address
    }
    getAllUser {
      id
      firstName
      lastName
      email
      phone
      nationality
      citizenID
      passportNumber
      birthDate
      gender
      address
      city
      postcode
      pincode
      verify
      created_at
      updated_at
      role {
        id
        role
      }
    }

    getAllWallet {
      id
      user {
        id
      }
      currency {
        currency
        currencyLongName
      }
      amount
      inOrder
    }

    AllOrders {
      id
      method
      type
      cancel
      filled
      created_at
      updated_at
      user {
        id
      }
      walletFrom {
        currency {
          currency
        }
      }
      walletTo {
        currency {
          currency
        }
      }
      price
      amount
      totalBalance
      fee
    }

    getAllP2P {
      id
      walletFrom {
        user {
          id
        }
        currency {
          currency
        }
      }
      walletTo {
        user {
          id
        }
        currency {
          currency
        }
      }
      created_at
      updated_at
      amount
      walletFromBalance
      walletToBalance
    }

    getAllCrypto {
      id
      method
      status
      created_at
      updated_at
      targetWallet
      user {
        id
      }
      wallet {
        currency {
          currency
        }
      }
      amount
      totalBalanceLeft
      fee
    }

    getAllFiat {
      id
      status
      method
      created_at
      updated_at
      user {
        id
      }
      bank {
        banktype {
          bank
        }
        bankNumber
      }
      creditCard {
        cardNumber
      }
      amount
      totalBalanceLeft
      fee
    }

    getAllCard {
      id
      cardNumber
      expiredMonth
      expiredYear
      cvv
      user {
        id
      }
    }

    getAllRole {
      id
      role
    }

    getAllCurrency {
      id
      currency
      currencyLongName
    }

    getAllBank {
      id
      bank
      banknum {
        banktype {
          bank
        }
      }
    }

    getAllBankNum {
      id
      banktype {
        bank
      }
      bankNumber
      user {
        id
      }
    }
  }
`;
