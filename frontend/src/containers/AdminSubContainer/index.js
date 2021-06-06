import * as React from "react";
import { useState, useEffect } from "react";
import {
  SettingStyled,
  Header,
  SubHeader,
  BalanceContainer,
  InfomationContainer,
  FiatBalanceContainer,
  SpotBalanceContainer,
  CryptoBalance,
  InfoWrapper,
  CardContainer,
  CancleBtn,
  VertifyBtn,
  HistoryContainer,
  HistorySection,
} from "./styled";
import { Container, NavBar } from "components";
import { useQuery, gql } from "@apollo/client";
import BigNumber from "bignumber.js";
import { marketController } from "apiService";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

import {
  MOCK_WALLET,
  CRYPTO_INDEX,
  MOCK_ALL_CUR_PRICE,
  MOCK_USER_INFO,
} from "helpers";

const GET_ALL_SYMBOL = gql`
  query {
    getAllCurrencyWithNoStatic {
      currency
      currencyLongName
    }
    getUserWalletByToken {
      amount
      inOrder
      currency {
        currency
        currencyLongName
      }
    }
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
  }
`;

const AdminSubContainer = ({ match, ...props }) => {
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [userWallet, setUserWallet] = useState(MOCK_WALLET);
  const [userInfo, setUserInfo] = useState(MOCK_USER_INFO);
  const [coinSymbol, setCoinSymbol] = useState([
    {
      __typename: "Currency",
      currencyShortName: "BTC",
      currency: "Bitcoin",
    },
  ]);

  const admin_param = [
    "user",
    "wallet",
    "order",
    "p2p",
    "credit",
    "transcrypto",
    "transfiat",
    "role",
    "currency",
  ];

  const [getCurPrice, setgetCurPrice] = useState(MOCK_ALL_CUR_PRICE);
  const curPrice = [];

  const FORMAT_DECIMAL = {
    prefix: "",
    decimalSeparator: ".",
    groupSeparator: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: " ",
    fractionGroupSize: 0,
    suffix: "",
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { loading, error, data } = useQuery(GET_ALL_SYMBOL);

  const GetPrice = async () => {
    const crypto_price = await marketController().getPrice("");
    crypto_price.map((data, index) => {
      switch (data.symbol) {
        case "BTCUSDT":
        case "ADAUSDT":
        case "ETHUSDT":
        case "BCHUSDT":
        case "DOTUSDT":
        case "ADABTC":
        case "ETHBTC":
        case "BCHBTC":
        case "DOTBTC":
          // console.log(data);
          curPrice.push(data);
          break;

        default:
          break;
      }
    });
    setgetCurPrice(curPrice);
    console.log(getCurPrice);
  };

  const getTotal = (flag) => {
    return (
      Number(userWallet[CRYPTO_INDEX[flag]].amount) +
      Number(userWallet[CRYPTO_INDEX[flag]].inOrder)
    );
  };

  const getBTCTotal = () => {
    return (
      getTotal("ada") * Number(getCurPrice[3].price) +
      getTotal("eth") * Number(getCurPrice[0].price) +
      getTotal("bch") * Number(getCurPrice[5].price) +
      getTotal("dot") * Number(getCurPrice[7].price) +
      getTotal("btc")
    );
  };

  useEffect(() => {
    if (data && data.getAllCurrencyWithNoStatic) {
      setCoinSymbol(data.getAllCurrencyWithNoStatic);
    }
    if (data && data.getUserWalletByToken) {
      setUserWallet(data.getUserWalletByToken);
    }
    if (data && data.getUserByToken) {
      console.log(data.getUserByToken);
      setUserInfo(data.getUserByToken);
    }
  }, [data]);

  useEffect(() => {
    GetPrice();
    var type = match.params.type.toLowerCase();
    if (type === "user") {
      setTitle("User Infomation");
      setSubTitle("UserInfo");
    } else if (type === "wallet") {
      setTitle("Wallet");
      setSubTitle("User Wallet");
    } else if (type === "order") {
      setTitle("Order");
      setSubTitle("User Order");
    } else if (type === "p2p") {
      setTitle("P2P Transaction");
      setSubTitle("P2P Order");
    } else if (type === "credit") {
      setTitle("Credit Card");
      setSubTitle("User Card List");
    } else if (type === "transcrypto") {
      setTitle("Crypto Transaction");
      setSubTitle("Crypto Order");
    } else if (type === "transfiat") {
      setTitle("Fiat Transaction");
      setSubTitle("Fiat Order");
    } else if (type === "role") {
      setTitle("Role");
      setSubTitle("Role List");
    } else if (type === "currency") {
      setTitle("Currency");
      setSubTitle("Currency List");
    }
  }, []);

  const showTable = () => {
    var type = match.params.type.toLowerCase();
    if (type === "user") {
      return (
        <HistorySection>
          <div className="title white mgb-16">{subTitle}</div>
          <div className="content-row space-between mgb-8">
            <div
              className="label gray text-center"
              style={{ minWidth: "96px" }}
            >
              ID
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "126px" }}
            >
              Firstname
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "126px" }}
            >
              Lastname
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "256px" }}
            >
              Email
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "126px" }}
            >
              File
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "190px" }}
            >
              Action
            </div>
          </div>
          <HistoryContainer>
            <div className="content-row space-between align-items-center mgb-8 history-container even">
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                01
              </div>
              <div
                className="label white text-center"
                style={{ minWidth: "126px" }}
              >
                Kittipat
              </div>
              <div
                className="label white text-center"
                style={{ minWidth: "126px" }}
              >
                Dechkul
              </div>
              <div
                className="label white text-center"
                style={{ minWidth: "256px" }}
              >
                Kittipat2544@gmail.com
              </div>
              <div
                className="label white text-center"
                style={{ minWidth: "126px" }}
              >
                <a href="/">ID_CARD.jpg</a>
              </div>
              <div className="content-row justify-content-center">
                <div
                  className="label gray content-row justify-content-center"
                  style={{ minWidth: "126px" }}
                >
                  <VertifyBtn>Vertify</VertifyBtn>
                </div>
                <div className="label gray" style={{ minWidth: "64px" }}>
                  <CancleBtn>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </CancleBtn>
                </div>
              </div>
            </div>
          </HistoryContainer>
        </HistorySection>
      );
    } else if (type === "wallet") {
    } else if (type === "order") {
    } else if (type === "p2p") {
    } else if (type === "credit") {
    } else if (type === "transcrypto") {
    } else if (type === "transfiat") {
    } else if (type === "role") {
    } else if (type === "currency") {
    }
  };

  return (
    <SettingStyled>
      <Header name="header">
        <NavBar />
      </Header>
      <Container>
        <SubHeader>
          <div className="feature-card-title white">
            <a className="feature-card-title white" href="/admin">
              Admin CMS
            </a>{" "}
            / {title}
          </div>
        </SubHeader>
        <HistorySection>
          <div className="title white mgb-16">{subTitle}</div>
          <div className="content-row space-between mgb-8">
            <div
              className="label gray text-center"
              style={{ minWidth: "96px" }}
            >
              ID
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "126px" }}
            >
              Firstname
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "126px" }}
            >
              Lastname
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "256px" }}
            >
              Email
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "126px" }}
            >
              File
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "190px" }}
            >
              Action
            </div>
          </div>
          <HistoryContainer>
            <div className="content-row space-between align-items-center mgb-8 history-container even">
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                01
              </div>
              <div
                className="label white text-center"
                style={{ minWidth: "126px" }}
              >
                Kittipat
              </div>
              <div
                className="label white text-center"
                style={{ minWidth: "126px" }}
              >
                Dechkul
              </div>
              <div
                className="label white text-center"
                style={{ minWidth: "256px" }}
              >
                Kittipat2544@gmail.com
              </div>
              <div
                className="label white text-center"
                style={{ minWidth: "126px" }}
              >
                <a href="/">ID_CARD.jpg</a>
              </div>
              <div className="content-row justify-content-center">
                <div
                  className="label gray content-row justify-content-center"
                  style={{ minWidth: "126px" }}
                >
                  <VertifyBtn>Vertify</VertifyBtn>
                </div>
                <div className="label gray" style={{ minWidth: "64px" }}>
                  <CancleBtn>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </CancleBtn>
                </div>
              </div>
            </div>
          </HistoryContainer>
        </HistorySection>
        {showTable()}
        <div>
          <button onClick={openModal}>Open Modal</button>
        </div>
      </Container>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </SettingStyled>
  );
};

export default AdminSubContainer;
