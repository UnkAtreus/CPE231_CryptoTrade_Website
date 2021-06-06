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
  ProfileContainer,
} from "./styled";
import { Container, NavBar, Button, Input } from "components";
import { useQuery, useMutation, gql } from "@apollo/client";
import BigNumber from "bignumber.js";
import { marketController } from "apiService";
import moment from "moment";
import { userController } from "apiService";
import {
  MOCK_WALLET,
  CRYPTO_INDEX,
  MOCK_ALL_CUR_PRICE,
  MOCK_USER_INFO,
} from "helpers";
import axios from "axios";
import ClassNames from "classnames";
import { ToastContainer, toast } from "react-toastify";

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
      id
      firstName
      lastName
      phone
      email
      gender
      birthDate
      nationality
      city
      address
      verify
    }
  }
`;
const POST_VERTIFY = gql`
  mutation ($input: String!) {
    createVertification(imagename: $input) {
      id
      status
      imageUrl
      created_at
      updated_at
      user {
        email
      }
    }
  }
`;
const NEW_PASSWORD = gql`
  mutation ($input: PassInput!) {
    changePassword(passInput: $input)
  }
`;

const SettingContainer = ({ match, ...props }) => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [userWallet, setUserWallet] = useState(MOCK_WALLET);
  const [userInfo, setUserInfo] = useState(MOCK_USER_INFO);
  const [changePassParam, setChangePassParam] = useState({
    oldPass: "",
    newPass: "",
  });
  const [coinSymbol, setCoinSymbol] = useState([
    {
      __typename: "Currency",
      currencyShortName: "BTC",
      currency: "Bitcoin",
    },
  ]);

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

  const notify = (isSuccess) => {
    if (isSuccess) {
      toast.success("Success ✔", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Failed ❌", {
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

  const { loading, error, data, refetch } = useQuery(GET_ALL_SYMBOL);

  const [postVertify] = useMutation(POST_VERTIFY, {
    onCompleted(order) {
      if (order) {
        console.log(order);
        notify(true);
        refetch();
      }
    },
    onError(order) {
      if (order) {
        notify(false);
      }
    },
  });

  const [changePass] = useMutation(NEW_PASSWORD, {
    onCompleted(password) {
      if (password) {
        console.log(password);
        notify(true);
        refetch();
      } else {
        notify(false);
      }
    },
    onError(order) {
      if (order) {
        notify(false);
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

  const PostFile = async (param) => {
    const file = await userController().postFile(param);
    console.log(file);
    postVertify({
      variables: {
        input: file.imagePath,
      },
    });
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

  const onFileUpload = () => {
    const formData = new FormData();
    if (selectedFile.length !== 0) {
      formData.append("file", selectedFile, selectedFile.name);
    }
    PostFile(formData);
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
  }, []);

  return (
    <SettingStyled>
      <Header name="header">
        <NavBar />
      </Header>
      <Container>
        <SubHeader>
          <div className="feature-card-title white">Fiat and Spot</div>
        </SubHeader>
        <BalanceContainer>
          <div className="content-row mgb-32">
            <FiatBalanceContainer>
              <div className="paragraph white mgb-8">Fiat balance</div>
              <div className="content-row space-between">
                <div className="paragraph white">USDT</div>
                <div className="paragraph white">
                  {BigNumber(getTotal("usdt")).toFormat(2)}
                </div>
              </div>
              <div className="content-row space-between">
                <div className="label gray">TetherUS</div>
                <div className="label gray">
                  ≈ ${BigNumber(getTotal("usdt")).toFormat(2)}
                </div>
              </div>
            </FiatBalanceContainer>
            <SpotBalanceContainer>
              <div className="paragraph white mgb-8">All spot balance</div>
              <div className="content-row space-between">
                <div className="paragraph white">BTC</div>
                <div className="content-row align-items-end">
                  <div className="paragraph white">{getBTCTotal()}</div>
                  <div className="label white mgl-8 mgb-2">BTC</div>
                </div>
              </div>
              <div className="content-row space-between">
                <div className="label gray">Bitcoin</div>
                <div className="label gray">
                  ≈ $
                  {BigNumber(
                    getBTCTotal() * Number(getCurPrice[1].price)
                  ).toFormat(2)}
                </div>
              </div>
            </SpotBalanceContainer>
          </div>
          <CryptoBalance>
            <div className="content-row space-between mgb-16">
              <div
                className="label gray text-left"
                style={{ minWidth: "96px" }}
              >
                Coin
              </div>
              <div
                className="label gray text-right"
                style={{ minWidth: "126px" }}
              >
                Total
              </div>
              <div
                className="label gray text-right"
                style={{ minWidth: "126px" }}
              >
                Available
              </div>
              <div
                className="label gray text-right"
                style={{ minWidth: "126px" }}
              >
                In Order
              </div>
              <div
                className="label gray text-right"
                style={{ minWidth: "126px" }}
              >
                USD Value
              </div>
            </div>

            <div className="content-row space-between align-items-center mgb-8">
              <div className="content-row" style={{ minWidth: "96px" }}>
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol bitcoin"></div>
                </div>
                <div className="content-column">
                  <div className="label">BTC</div>
                  <div className="text-9">Bitcoin</div>
                </div>
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(getTotal("btc")).toFormat(8, FORMAT_DECIMAL)}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["btc"]].amount).toFormat(
                  8,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["btc"]].inOrder).toFormat(
                  8,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                ≈ $
                {BigNumber(
                  getTotal("btc") * Number(getCurPrice[1].price)
                ).toFormat(8, FORMAT_DECIMAL)}
              </div>
            </div>

            <div className="content-row space-between align-items-center mgb-8">
              <div className="content-row" style={{ minWidth: "96px" }}>
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol cardano"></div>
                </div>
                <div className="content-column">
                  <div className="label">ADA</div>
                  <div className="text-9">Cardano</div>
                </div>
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(getTotal("ada")).toFormat(8, FORMAT_DECIMAL)}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["ada"]].amount).toFormat(
                  8,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["ada"]].inOrder).toFormat(
                  8,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                ≈ $
                {BigNumber(
                  getTotal("ada") * Number(getCurPrice[4].price)
                ).toFormat(8, FORMAT_DECIMAL)}
              </div>
            </div>

            <div className="content-row space-between align-items-center mgb-8">
              <div className="content-row" style={{ minWidth: "96px" }}>
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol ethereum"></div>
                </div>
                <div className="content-column">
                  <div className="label">ETH</div>
                  <div className="text-9">Ethereum</div>
                </div>
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(getTotal("eth")).toFormat(8, FORMAT_DECIMAL)}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["eth"]].amount).toFormat(
                  8,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["eth"]].inOrder).toFormat(
                  8,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                ≈ $
                {BigNumber(
                  getTotal("eth") * Number(getCurPrice[2].price)
                ).toFormat(8, FORMAT_DECIMAL)}
              </div>
            </div>

            <div className="content-row space-between align-items-center mgb-8">
              <div className="content-row" style={{ minWidth: "96px" }}>
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol bitcoin-cash"></div>
                </div>
                <div className="content-column">
                  <div className="label">BCH</div>
                  <div className="text-9">Bitcoin Cash</div>
                </div>
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(getTotal("bch")).toFormat(8, FORMAT_DECIMAL)}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["bch"]].amount).toFormat(
                  8,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["bch"]].inOrder).toFormat(
                  8,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                ≈ $
                {BigNumber(
                  getTotal("bch") * Number(getCurPrice[6].price)
                ).toFormat(8, FORMAT_DECIMAL)}
              </div>
            </div>

            <div className="content-row space-between align-items-center mgb-8">
              <div className="content-row" style={{ minWidth: "96px" }}>
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol polkadot"></div>
                </div>
                <div className="content-column">
                  <div className="label">DOT</div>
                  <div className="text-9">Polkadot</div>
                </div>
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(getTotal("dot")).toFormat(8, FORMAT_DECIMAL)}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["dot"]].amount).toFormat(
                  8,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["dot"]].inOrder).toFormat(
                  8,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                ≈ $
                {BigNumber(
                  getTotal("dot") * Number(getCurPrice[8].price)
                ).toFormat(8, FORMAT_DECIMAL)}
              </div>
            </div>
          </CryptoBalance>
        </BalanceContainer>

        <SubHeader>
          <div className="feature-card-title white">Infomation</div>
        </SubHeader>
        <ProfileContainer>
          <div className="content-column">
            <div className="content-column mgb-16">
              <div className="title white mgb-16">User Profile</div>
              <div className="content-column mgl-16">
                <div className="content-row mgb-8">
                  <div className="label gray" style={{ minWidth: "164px" }}>
                    User ID:
                  </div>
                  <div className="label white">{userInfo.id}</div>
                </div>
                <div className="content-row mgb-8">
                  <div className="label gray" style={{ minWidth: "164px" }}>
                    Vertify Status:
                  </div>
                  <div className="content-row">
                    <div
                      className={ClassNames(
                        "label",
                        userInfo.vertify ? "green" : "red"
                      )}
                    >
                      {userInfo.vertify ? "vertify" : "not vertify"}
                    </div>
                  </div>
                </div>
                {!userInfo.vertify && (
                  <div>
                    <div className="content-row mgb-8">
                      <div className="label gray" style={{ minWidth: "164px" }}>
                        Uplaod ID Card:
                      </div>
                      <div className="content-row">
                        <input
                          type="file"
                          onChange={(e) => {
                            console.log(e.target.files[0]);
                            setSelectedFile(e.target.files[0]);
                          }}
                        ></input>
                      </div>
                    </div>
                    <div className="content-row mgb-8">
                      <div
                        className="label gray"
                        style={{
                          minWidth: "164px",
                        }}
                      ></div>
                      <div className="content-row">
                        <Button
                          style={{
                            width: "118px",
                            height: "24px",
                            borderRadius: "4px",
                          }}
                          label="Submit"
                          color="green"
                          fontColor="black"
                          onClick={onFileUpload}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    changePass({
                      variables: { input: changePassParam },
                    });
                  }}
                >
                  <div className="content-row mgb-8">
                    <div
                      className="label gray"
                      style={{
                        minWidth: "164px",
                      }}
                    >
                      Current Password
                    </div>
                    <div className="content-row" style={{ height: "32px" }}>
                      <Input
                        type="password"
                        placeholder="*********"
                        onChange={(e) => {
                          setChangePassParam({
                            ...changePassParam,
                            oldPass: e,
                          });
                        }}
                      ></Input>
                    </div>
                  </div>
                  <div className="content-row mgb-8">
                    <div
                      className="label gray"
                      style={{
                        minWidth: "164px",
                      }}
                    >
                      New Password
                    </div>
                    <div className="content-row" style={{ height: "32px" }}>
                      <Input
                        type="password"
                        placeholder="*********"
                        onChange={(e) => {
                          setChangePassParam({
                            ...changePassParam,
                            newPass: e,
                          });
                        }}
                      ></Input>
                    </div>
                  </div>
                  <div className="content-row mgb-8">
                    <div
                      className="label gray"
                      style={{
                        minWidth: "164px",
                      }}
                    ></div>
                    <div className="content-row">
                      <Button
                        style={{
                          width: "210px",
                          height: "24px",
                          borderRadius: "16px",
                        }}
                        label="Change Password"
                        color="green"
                        fontColor="black"
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ProfileContainer>
        <InfomationContainer>
          <InfoWrapper>
            <div className="content-column">
              <div className="content-column mgb-16">
                <div className="title white mgb-16">Basic Info</div>
                <div className="content-column mgl-16">
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Name:
                    </div>
                    <div className="label white">
                      {userInfo.firstName} {userInfo.lastName}
                    </div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Telephone:
                    </div>
                    <div className="label white">{userInfo.phone}</div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Email:
                    </div>
                    <div className="label white">{userInfo.email}</div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Gender:
                    </div>
                    <div className="label white">
                      {userInfo.gender === "0"
                        ? "Male"
                        : userInfo.gender === "1"
                        ? "Female"
                        : "Other"}
                    </div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Birthdate:
                    </div>
                    <div className="label white">
                      {moment(Number(userInfo.birthDate)).format("D MMMM YYYY")}
                    </div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Nationality
                    </div>
                    <div className="label white">
                      {userInfo.nationality || "Thai"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-column mgb-16">
                <div className="title white mgb-16">Address Info</div>
                <div className="content-column mgl-16">
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Country
                    </div>
                    <div className="label white">Thailand</div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Province:
                    </div>
                    <div className="label white">{userInfo.city}</div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Time zone:
                    </div>
                    <div className="label white">Asia/Bangkok</div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Address
                    </div>
                    <div className="label white">{userInfo.address}</div>
                  </div>
                </div>
              </div>
              <div className="content-row">
                <div className="label gray mgr-8">
                  If you want to edit/manage your infomation please contact
                </div>
                <a href="/">
                  <div className="label purple">support@admin.com</div>
                </a>
              </div>
            </div>
            <div className="content-row pic-container">
              <div className="pic-overlay cypto"></div>
            </div>
          </InfoWrapper>
        </InfomationContainer>
      </Container>
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

export default SettingContainer;
