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
import ClassNames from "classnames";
import { Container, NavBar } from "components";
import { useQuery, useMutation, gql } from "@apollo/client";
import BigNumber from "bignumber.js";
import { marketController } from "apiService";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ModalImage, { Lightbox } from "react-modal-image";
import { ToastContainer, toast } from "react-toastify";

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
    allVeri {
      id
      status
      imageUrl
      created_at
      updated_at
      user {
        id
        firstName
        lastName
        email
      }
    }
    getAllFiat {
      id
      user {
        id
      }
      method
      bank {
        banktype {
          bank
        }
        bankNumber
      }
      status
      amount
      totalBalanceLeft
      fee
    }
  }
`;

const POST_VERTIFY = gql`
  mutation ($input: Float!, $id: Float!, $userID: Float!) {
    updateVeri(status: $input, id: $id, idInput: $userID)
  }
`;

const POST_WITHDRAW = gql`
  mutation ($id: ID!, $input: Float!) {
    updateFiatStatus(id: $id, status: $input) {
      user {
        id
      }
      status
      method
    }
  }
`;

const StaffSubContainer = ({ match, ...props }) => {
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [userWallet, setUserWallet] = useState(MOCK_WALLET);
  const [userInfo, setUserInfo] = useState(MOCK_USER_INFO);
  const [allVeri, setAllVeri] = useState([]);
  const [getAllFiat, setGetAllFiat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  const [coinSymbol, setCoinSymbol] = useState([
    {
      __typename: "Currency",
      currencyShortName: "BTC",
      currency: "Bitcoin",
    },
  ]);

  const notify = (isSuccess, errormsg = "Failed ???") => {
    if (isSuccess) {
      toast.success("Success ???", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(errormsg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

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

  const closeLightbox = () => {
    setIsOpen(!isOpen);
  };

  const { loading, error, data, refetch } = useQuery(GET_ALL_SYMBOL);

  const [postVertify] = useMutation(POST_VERTIFY, {
    onCompleted(order) {
      if (order) {
        console.log(order);
        notify(true);
        refetch();
      }
    },
    onError(error) {
      if (error) {
        notify(false, String(error));
      }
    },
  });
  const [postWithdraw] = useMutation(POST_WITHDRAW, {
    onCompleted(order) {
      if (order) {
        console.log(order);
        notify(true);
        refetch();
      }
    },
    onError(error) {
      if (error) {
        notify(false, String(error));
      }
    },
  });

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
    if (data && data.allVeri) {
      // console.log(data.allVeri);
      setAllVeri(data.allVeri);
    }
    if (data && data.getAllFiat) {
      var temp = [];
      data.getAllFiat.map((data) => {
        if (data.method === "1") {
          temp.push(data);
        }
      });
      setGetAllFiat(temp);
    }
  }, [data]);

  useEffect(() => {
    GetPrice();
    if (match.params.type === "vertify") {
      setTitle("Vertify User Infomation");
      setSubTitle("Vertify");
    } else if (match.params.type === "deposit") {
      setTitle("Deposit Transaction");
      setSubTitle("Deposit Order");
    } else if (match.params.type === "withdraw") {
      setTitle("Withdraw Transaction");
      setSubTitle("Withdraw Order");
    }
  }, []);

  const getTable = () => {
    if (subTitle === "Withdraw Order") {
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
              style={{ minWidth: "96px" }}
            >
              UserID
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
              Bank Number
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "126px" }}
            >
              Amount
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "126px" }}
            >
              Total Balance
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "126px" }}
            >
              Fee
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "96px" }}
            >
              Action
            </div>
          </div>

          <HistoryContainer>
            {getAllFiat.map((data, index) => {
              console.log(data);
              if (data.status !== "1") {
                return (
                  <div
                    className={ClassNames(
                      "content-row space-between align-items-center mgb-8 history-container "
                    )}
                    key={index}
                  >
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "96px" }}
                    >
                      {data.id}
                    </div>
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "96px" }}
                    >
                      {data.user.id}
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "96px" }}
                    >
                      {data.bank.banktype.bank || "0"}
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "126px" }}
                    >
                      {data.bank.bankNumber || "0"}
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "126px" }}
                    >
                      {BigNumber(data.amount).toFormat(4)}
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "126px" }}
                    >
                      {BigNumber(data.totalBalanceLeft).toFormat(4)}
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "126px" }}
                    >
                      {BigNumber(data.fee).toFormat(4)}
                    </div>
                    <div
                      className="label gray content-row justify-content-center"
                      style={{ minWidth: "96px" }}
                    >
                      <VertifyBtn
                        onClick={() => {
                          console.log(data.id);
                          postWithdraw({
                            variables: {
                              id: data.id,
                              input: 1,
                            },
                          });
                        }}
                      >
                        Success
                      </VertifyBtn>
                    </div>
                  </div>
                );
              }
            })}
          </HistoryContainer>
        </HistorySection>
      );
    }
    if (subTitle === "Vertify") {
      return (
        <HistorySection>
          <div className="title white mgb-16">{subTitle}</div>
          <div className="content-row space-between mgb-8">
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
            {allVeri.map((data, index) => {
              console.log(data.status);
              if (data.status !== 1)
                return (
                  <div
                    className={ClassNames(
                      "content-row space-between align-items-center mgb-8 history-container "
                    )}
                    key={index}
                  >
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "96px" }}
                    >
                      {data.user.id}
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "126px" }}
                    >
                      {data.user.firstName}
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "126px" }}
                    >
                      {data.user.lastName}
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "256px" }}
                    >
                      {data.user.email}
                    </div>
                    <div
                      className="label white text-center"
                      style={{
                        minWidth: "126px",
                        overflow: "auto",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        closeLightbox();
                        setImage(data.imageUrl);
                      }}
                    >
                      {/* <ModalImage small={""} large={""} alt="Hello World!" /> */}
                      {data.imageUrl}
                    </div>
                    <div className="content-row justify-content-center">
                      <div
                        className="label gray content-row justify-content-center"
                        style={{ minWidth: "126px" }}
                      >
                        <VertifyBtn
                          onClick={() => {
                            console.log(data.user.id);
                            postVertify({
                              variables: {
                                input: 1,
                                id: data.id,
                                userID: data.user.id,
                              },
                            });
                          }}
                        >
                          Vertify
                        </VertifyBtn>
                      </div>
                      <div className="label gray" style={{ minWidth: "64px" }}>
                        <CancleBtn>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </CancleBtn>
                      </div>
                    </div>
                  </div>
                );
            })}
          </HistoryContainer>
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
            <a className="feature-card-title white" href="/staff">
              Staff CMS
            </a>{" "}
            / {title}
          </div>
        </SubHeader>

        {getTable()}
      </Container>
      {isOpen && (
        <Lightbox
          medium={"http://localhost:5000/" + image}
          large={"http://localhost:5000/" + image}
          alt="Hello World!"
          onClose={closeLightbox}
        />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </SettingStyled>
  );
};

export default StaffSubContainer;
