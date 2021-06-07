import * as React from "react";
import { useState, useEffect } from "react";
import ClassNames from "classnames";
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
  ActionBtn,
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
import {
  faEdit,
  faPen,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import groupArray from "group-array";

import {
  MOCK_WALLET,
  CRYPTO_INDEX,
  MOCK_ALL_CUR_PRICE,
  MOCK_USER_INFO,
  GET_ALL_DATA,
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
  const [getAllUser, setGetAllUser] = useState([]);
  const [getAllWallet, setgetAllWallet] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [getAllP2P, setGetAllP2P] = useState([]);
  const [getAllCrypto, setGetAllCrypto] = useState([]);
  const [getAllFiat, setGetAllFiat] = useState([]);
  const [getAllCard, setGetAllCard] = useState([]);
  const [getAllRole, setGetAllRole] = useState([]);
  const [getAllCurrency, setGetAllCurrency] = useState([]);
  const [getAllBank, setGetAllBank] = useState([]);
  const [getAllBankNum, setGetAllBankNum] = useState([]);

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
    "bank",
    "banknum",
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

  const { loading, error, data } = useQuery(GET_ALL_DATA);

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
    // console.log(getCurPrice);
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
    if (data && data.getUserByToken) {
      setUserInfo(data.getUserByToken);
    }
    if (data && data.getAllUser) {
      setGetAllUser(data.getAllUser);
    }
    if (data && data.getAllWallet) {
      console.log(data.getAllWallet);
      var x = [];
      x = groupArray(data.getAllWallet, "user.id");
      console.log(x);
      Object.keys(x).map((key, index) => {
        console.log(x[key]);
      });
      setgetAllWallet(groupArray(data.getAllWallet, "user.id"));
    }
    if (data && data.AllOrders) {
      setAllOrders(data.AllOrders);
    }
    if (data && data.getAllP2P) {
      setGetAllP2P(data.getAllP2P);
    }
    if (data && data.getAllCrypto) {
      setGetAllCrypto(data.getAllCrypto);
    }
    if (data && data.getAllFiat) {
      setGetAllFiat(data.getAllFiat);
    }
    if (data && data.getAllCard) {
      setGetAllCard(data.getAllCard);
    }
    if (data && data.getAllRole) {
      setGetAllRole(data.getAllRole);
    }
    if (data && data.getAllCurrency) {
      setGetAllCurrency(data.getAllCurrency);
    }
    if (data && data.getAllBank) {
      setGetAllBank(data.getAllBank);
    }
    if (data && data.getAllBankNum) {
      setGetAllBankNum(data.getAllBankNum);
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
    if (type === "user" && getAllUser.length !== 0) {
      return (
        <HistorySection>
          <div className="content-row space-between">
            <div className="title white mgb-16">{subTitle}</div>
            <div
              className="label gray mgb-16"
              style={{ alignSelf: "flex-end", cursor: "pointer" }}
              onClick={() => {}}
            >
              +Add Data
            </div>
          </div>
          <div style={{ width: "944px", maxHeight: "440px", overflow: "auto" }}>
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
                style={{ minWidth: "196px" }}
              >
                Email
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Phone
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "72px" }}
              >
                Nationality
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "190px" }}
              >
                CitizanID/PassportID
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                BirthDate
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Gender
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "190px" }}
              >
                Address
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                City
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Postcode
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Vertify
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Role
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Action
              </div>
            </div>
            <HistoryContainer>
              {getAllUser.map((data, index) => (
                <div
                  className="content-row space-between align-items-center mgb-8 history-container "
                  key={index}
                >
                  <div
                    className="label gray text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.id}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {data.firstName}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {data.lastName}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "196px" }}
                  >
                    {data.email}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {data.phone}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "72px" }}
                  >
                    Thai
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "190px" }}
                  >
                    {data.citizenID ? data.citizenID : data.passportNumber}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {moment(Number(data.birthDate)).format("D MMMM YYYY")}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.gender === "0"
                      ? "Male"
                      : data.gender === "1"
                      ? "Female"
                      : "Other"}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "190px" }}
                  >
                    {data.address}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.city}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.postcode}
                  </div>

                  <div
                    className={ClassNames(
                      "label white text-center",
                      data.verify ? "green" : "red"
                    )}
                    style={{ minWidth: "96px" }}
                  >
                    {console.log(data.verify)}
                    {data.verify ? "verify" : "not verify"}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {data.role.role}
                  </div>
                  <div
                    className="label gray text-center content-row justify-content-center"
                    style={{ minWidth: "126px" }}
                  >
                    <ActionBtn
                      className="edit"
                      style={{ margin: "0 8px" }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </ActionBtn>
                    <ActionBtn className="delete" onClick={() => {}}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </ActionBtn>
                  </div>
                </div>
              ))}
            </HistoryContainer>
          </div>
        </HistorySection>
      );
    } else if (type === "wallet" && getAllWallet.length !== 0) {
      return (
        <HistorySection>
          <div className="content-row space-between">
            <div className="title white mgb-16">{subTitle}</div>
            <div
              className="label gray mgb-16"
              style={{ alignSelf: "flex-end", cursor: "pointer" }}
              onClick={() => {}}
            >
              +Add Data
            </div>
          </div>
          <div style={{ width: "944px", maxHeight: "440px", overflow: "auto" }}>
            <div className="content-row space-between mgb-8 align-items-center">
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                UserId
              </div>

              {getAllCurrency.map((data, index) => (
                <div
                  className="label gray text-center"
                  style={{ minWidth: "192px" }}
                >
                  {data.currency}
                  <div className="content-row">
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "96px" }}
                    >
                      Amount
                    </div>
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "96px" }}
                    >
                      InOrder
                    </div>
                  </div>
                </div>
              ))}

              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Action
              </div>
            </div>
            <HistoryContainer>
              {Object.keys(getAllWallet).map((key, index) => (
                <div
                  className="content-row space-between align-items-center mgb-8 history-container "
                  key={index}
                >
                  <div
                    className="label gray text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {key}
                  </div>
                  {getAllWallet[key].map((data) => (
                    <div className="content-row">
                      <div
                        className="label white text-center"
                        style={{ minWidth: "96px" }}
                      >
                        {data.amount}
                      </div>
                      <div
                        className="label white text-center"
                        style={{ minWidth: "96px" }}
                      >
                        {data.inOrder}
                      </div>
                    </div>
                  ))}

                  <div
                    className="label gray text-center content-row justify-content-center"
                    style={{ minWidth: "126px" }}
                  >
                    <ActionBtn
                      className="edit"
                      style={{ margin: "0 8px" }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </ActionBtn>
                    <ActionBtn className="delete" onClick={() => {}}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </ActionBtn>
                  </div>
                </div>
              ))}
            </HistoryContainer>
          </div>
        </HistorySection>
      );
    } else if (type === "order" && allOrders.length !== 0) {
      return (
        <HistorySection>
          <div className="content-row space-between">
            <div className="title white mgb-16">{subTitle}</div>
            <div
              className="label gray mgb-16"
              style={{ alignSelf: "flex-end", cursor: "pointer" }}
              onClick={() => {}}
            >
              +Add Data
            </div>
          </div>
          <div style={{ width: "944px", maxHeight: "440px", overflow: "auto" }}>
            <div className="content-row space-between mgb-8">
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                ID
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                UserID
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Type
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "64px" }}
              >
                Side
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                CurrencyPair
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Price
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Amount
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                TotalBalance
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Fee
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Order Create Date
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Order Update Date
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Status
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Action
              </div>
            </div>
            <HistoryContainer>
              {allOrders.map((data, index) => (
                <div
                  className="content-row space-between align-items-center mgb-8 history-container "
                  key={index}
                >
                  <div
                    className="label gray text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.id}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.user.id}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.type === "0" ? "Limit" : "Market"}
                  </div>
                  <div
                    className={ClassNames(
                      "label text-center",
                      data.method === "0" ? "green" : "red"
                    )}
                    style={{ minWidth: "64px" }}
                  >
                    {data.method === "0" ? "Buy" : "Sell"}
                  </div>

                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.walletFrom.currency.currency +
                      " " +
                      data.walletTo.currency.currency}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {BigNumber(data.price).toFormat(2)}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {BigNumber(data.amount).toFormat(2)}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {BigNumber(data.totalBalance).toFormat(2)}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {BigNumber(data.fee).toFormat(2)}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {moment(data.created_at).format("D MMMM YYYY")}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {moment(data.updated_at).format("D MMMM YYYY")}
                  </div>
                  <div
                    className={ClassNames(
                      "label white text-center",
                      data.cancle ? "gray" : "white"
                    )}
                    style={{ minWidth: "96px" }}
                  >
                    {data.cancle
                      ? "Cancle"
                      : data.filled
                      ? "Filled"
                      : "In order"}
                  </div>

                  <div
                    className="label gray text-center content-row justify-content-center"
                    style={{ minWidth: "126px" }}
                  >
                    <ActionBtn
                      className="edit"
                      style={{ margin: "0 8px" }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </ActionBtn>
                    <ActionBtn className="delete" onClick={() => {}}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </ActionBtn>
                  </div>
                </div>
              ))}
            </HistoryContainer>
          </div>
        </HistorySection>
      );
    } else if (type === "p2p" && getAllP2P.length !== 0) {
      return (
        <HistorySection>
          <div className="content-row space-between">
            <div className="title white mgb-16">{subTitle}</div>
            <div
              className="label gray mgb-16"
              style={{ alignSelf: "flex-end", cursor: "pointer" }}
              onClick={() => {}}
            >
              +Add Data
            </div>
          </div>
          <div style={{ width: "944px", maxHeight: "440px", overflow: "auto" }}>
            <div className="content-row space-between mgb-8">
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                ID
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                UserID Form
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                UserID To
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                CurrencyPair
              </div>

              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Amount
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                walletFromBalance
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                walletToBalance
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Order Create Date
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Order Update Date
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Action
              </div>
            </div>
            <HistoryContainer>
              {getAllP2P.map((data, index) => (
                <div
                  className="content-row space-between align-items-center mgb-8 history-container "
                  key={index}
                >
                  <div
                    className="label gray text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.id}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.walletFrom.user.id}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.walletTo.user.id}
                  </div>
                  <div
                    className={ClassNames("label text-center")}
                    style={{ minWidth: "96px" }}
                  >
                    {data.walletFrom.currency.currency}
                  </div>

                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {BigNumber(data.amount).toFormat(2)}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {BigNumber(data.walletFromBalance).toFormat(2)}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {BigNumber(data.walletToBalance).toFormat(2)}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {moment(data.created_at).format("D MMMM YYYY")}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {moment(data.updated_at).format("D MMMM YYYY")}
                  </div>

                  <div
                    className="label gray text-center content-row justify-content-center"
                    style={{ minWidth: "126px" }}
                  >
                    <ActionBtn
                      className="edit"
                      style={{ margin: "0 8px" }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </ActionBtn>
                    <ActionBtn className="delete" onClick={() => {}}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </ActionBtn>
                  </div>
                </div>
              ))}
            </HistoryContainer>
          </div>
        </HistorySection>
      );
    } else if (type === "transcrypto" && getAllCrypto.length !== 0) {
      return (
        <HistorySection>
          <div className="content-row space-between">
            <div className="title white mgb-16">{subTitle}</div>
            <div
              className="label gray mgb-16"
              style={{ alignSelf: "flex-end", cursor: "pointer" }}
              onClick={() => {}}
            >
              +Add Data
            </div>
          </div>
          <div style={{ width: "944px", maxHeight: "440px", overflow: "auto" }}>
            <div className="content-row space-between mgb-8">
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                ID
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                UserID
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "64px" }}
              >
                Side
              </div>

              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                WalletAddress
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Currency
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Amount
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                TotalBalance
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Fee
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Order Create Date
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Order Update Date
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Action
              </div>
            </div>
            <HistoryContainer>
              {getAllCrypto.map((data, index) => (
                <div
                  className="content-row space-between align-items-center mgb-8 history-container "
                  key={index}
                >
                  <div
                    className="label gray text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.id}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.user.id}
                  </div>
                  <div
                    className={ClassNames(
                      "label text-center",
                      data.method === "0" ? "green" : "red"
                    )}
                    style={{ minWidth: "64px" }}
                  >
                    {data.method === "0" ? "Deposit" : "Withdraw"}
                  </div>

                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {data.targetWallet}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.wallet.currency.currency}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {BigNumber(data.amount).toFormat(2)}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {BigNumber(data.totalBalanceLeft).toFormat(2)}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {BigNumber(data.fee).toFormat(2)}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {moment(data.created_at).format("D MMMM YYYY")}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {moment(data.updated_at).format("D MMMM YYYY")}
                  </div>

                  <div
                    className="label gray text-center content-row justify-content-center"
                    style={{ minWidth: "126px" }}
                  >
                    <ActionBtn
                      className="edit"
                      style={{ margin: "0 8px" }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </ActionBtn>
                    <ActionBtn className="delete" onClick={() => {}}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </ActionBtn>
                  </div>
                </div>
              ))}
            </HistoryContainer>
          </div>
        </HistorySection>
      );
    } else if (type === "transfiat" && getAllFiat.length !== 0) {
      return (
        <HistorySection>
          <div className="content-row space-between">
            <div className="title white mgb-16">{subTitle}</div>
            <div
              className="label gray mgb-16"
              style={{ alignSelf: "flex-end", cursor: "pointer" }}
              onClick={() => {}}
            >
              +Add Data
            </div>
          </div>
          <div style={{ width: "944px", maxHeight: "440px", overflow: "auto" }}>
            <div className="content-row space-between mgb-8">
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                ID
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                UserID
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "64px" }}
              >
                Side
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Bank Type
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Bank Address
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                CreditCard Number
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Amount
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                TotalBalance
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Fee
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Order Create Date
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Order Update Date
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Action
              </div>
            </div>
            <HistoryContainer>
              {getAllFiat.map((data, index) => (
                <div
                  className="content-row space-between align-items-center mgb-8 history-container "
                  key={index}
                >
                  <div
                    className="label gray text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.id}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.user.id}
                  </div>
                  <div
                    className={ClassNames(
                      "label text-center",
                      data.method === "0" ? "green" : "red"
                    )}
                    style={{ minWidth: "64px" }}
                  >
                    {data.method === "0" ? "Deposit" : "Withdraw"}
                  </div>

                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.bank && data.bank.banktype.bank}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {data.bank && data.bank.bankNumber}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {data.creditCard && data.creditCard.cardNumber}
                  </div>

                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {BigNumber(data.amount).toFormat(2)}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {BigNumber(data.totalBalanceLeft).toFormat(2)}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {BigNumber(data.fee).toFormat(2)}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {moment(data.created_at).format("D MMMM YYYY")}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {moment(data.updated_at).format("D MMMM YYYY")}
                  </div>

                  <div
                    className="label gray text-center content-row justify-content-center"
                    style={{ minWidth: "126px" }}
                  >
                    <ActionBtn
                      className="edit"
                      style={{ margin: "0 8px" }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </ActionBtn>
                    <ActionBtn className="delete" onClick={() => {}}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </ActionBtn>
                  </div>
                </div>
              ))}
            </HistoryContainer>
          </div>
        </HistorySection>
      );
    } else if (type === "credit" && getAllCard.length !== 0) {
      return (
        <HistorySection>
          <div className="content-row space-between">
            <div className="title white mgb-16">{subTitle}</div>
            <div
              className="label gray mgb-16"
              style={{ alignSelf: "flex-end", cursor: "pointer" }}
              onClick={() => {}}
            >
              +Add Data
            </div>
          </div>
          <div style={{ width: "944px", maxHeight: "440px", overflow: "auto" }}>
            <div className="content-row space-between mgb-8">
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                ID
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                UserID
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Card Number
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Expired Month
              </div>

              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Expired Year
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "64px" }}
              >
                cvv
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Action
              </div>
            </div>
            <HistoryContainer>
              {getAllCard.map((data, index) => (
                <div
                  className="content-row space-between align-items-center mgb-8 history-container "
                  key={index}
                >
                  <div
                    className="label gray text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.id}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.user.id}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {"**** **** **** " +
                      data.cardNumber.substr(data.cardNumber.length - 4)}
                  </div>
                  <div
                    className={ClassNames("label text-center")}
                    style={{ minWidth: "96px" }}
                  >
                    {data.expiredMonth}
                  </div>

                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.expiredYear}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "64px" }}
                  >
                    {"***"}
                  </div>

                  <div
                    className="label gray text-center content-row justify-content-center"
                    style={{ minWidth: "126px" }}
                  >
                    <ActionBtn
                      className="edit"
                      style={{ margin: "0 8px" }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </ActionBtn>
                    <ActionBtn className="delete" onClick={() => {}}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </ActionBtn>
                  </div>
                </div>
              ))}
            </HistoryContainer>
          </div>
        </HistorySection>
      );
    } else if (type === "role" && getAllRole.length !== 0) {
      return (
        <HistorySection>
          <div className="content-row space-between">
            <div className="title white mgb-16">{subTitle}</div>
            <div
              className="label gray mgb-16"
              style={{ alignSelf: "flex-end", cursor: "pointer" }}
              onClick={() => {}}
            >
              +Add Data
            </div>
          </div>
          <div style={{ width: "944px", maxHeight: "440px", overflow: "auto" }}>
            <div className="content-row space-between mgb-8">
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                ID
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Role Name
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Action
              </div>
            </div>
            <HistoryContainer>
              {getAllRole.map((data, index) => (
                <div
                  className="content-row space-between align-items-center mgb-8 history-container "
                  key={index}
                >
                  <div
                    className="label gray text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.id}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.role}
                  </div>

                  <div
                    className="label gray text-center content-row justify-content-center"
                    style={{ minWidth: "126px" }}
                  >
                    <ActionBtn
                      className="edit"
                      style={{ margin: "0 8px" }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </ActionBtn>
                    <ActionBtn className="delete" onClick={() => {}}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </ActionBtn>
                  </div>
                </div>
              ))}
            </HistoryContainer>
          </div>
        </HistorySection>
      );
    } else if (type === "currency" && getAllCurrency.length !== 0) {
      return (
        <HistorySection>
          <div className="content-row space-between">
            <div className="title white mgb-16">{subTitle}</div>
            <div
              className="label gray mgb-16"
              style={{ alignSelf: "flex-end", cursor: "pointer" }}
              onClick={() => {}}
            >
              +Add Data
            </div>
          </div>
          <div style={{ width: "944px", maxHeight: "440px", overflow: "auto" }}>
            <div className="content-row space-between mgb-8">
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                ID
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "96px" }}
              >
                Currency
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Currency Name
              </div>
              <div
                className="label gray text-center"
                style={{ minWidth: "126px" }}
              >
                Action
              </div>
            </div>
            <HistoryContainer>
              {getAllCurrency.map((data, index) => (
                <div
                  className="content-row space-between align-items-center mgb-8 history-container "
                  key={index}
                >
                  <div
                    className="label gray text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.id}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "96px" }}
                  >
                    {data.currency}
                  </div>
                  <div
                    className="label white text-center"
                    style={{ minWidth: "126px" }}
                  >
                    {data.currencyLongName}
                  </div>

                  <div
                    className="label gray text-center content-row justify-content-center"
                    style={{ minWidth: "126px" }}
                  >
                    <ActionBtn
                      className="edit"
                      style={{ margin: "0 8px" }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </ActionBtn>
                    <ActionBtn className="delete" onClick={() => {}}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </ActionBtn>
                  </div>
                </div>
              ))}
            </HistoryContainer>
          </div>
        </HistorySection>
      );
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
        {/* <HistorySection>
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
                  <ActionBtn>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </ActionBtn>
                </div>
              </div>
            </div>
          </HistoryContainer>
        </HistorySection> */}
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
