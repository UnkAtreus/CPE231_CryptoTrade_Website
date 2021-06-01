import * as React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import {
  RegisterStyled,
  Header,
  RegisterForm,
  RegisterFormContainer,
  BirthdayInput,
  GenderInput,
} from "./styled";
import {
  Container,
  Dropdown,
  DropdownChild,
  Radio,
  RadioChild,
  Button,
  Input,
  NavBar,
} from "components";

import { useMutation, gql } from "@apollo/client";

const RegisterContainer = ({ match, ...props }) => {
  const [params, setParams] = useState({
    email: "",
    password: "",
    profileInput: {},
  });
  const [profileParams, setProfileParams] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    nationality: "",
    citizenID: "",
    passportNumber: "",
    birthDate: "",
    gender: 0,
    address: "",
    city: "",
    postcode: "",
  });
  const [checkPass, setCheckPass] = useState();
  const [birthDate, setBirthDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  });
  const DATA_MOCK = {
    email: "nom@gmail.com",
    password: "123456789",
    profileInput: {
      address: "1231213",
      birthDate: "2020-02-02T12:00:00Z",
      citizenID: "15021256",
      city: "dfgdsf",
      firstName: "kitti",
      gender: 0,
      lastName: "dechkul",
      nationality: "",
      passportNumber: "",
      phone: "0811663890",
      postcode: "10140",
    },
  };

  useEffect(() => {
    console.log(profileParams);
  }, [profileParams]);
  useEffect(() => {
    console.log(params);
  }, [params]);

  const CREATE_USER = gql`
    mutation RegisterUser($input: RegisterInput!) {
      registerUser(registerInput: $input)
    }
  `;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const now = new Date().getUTCFullYear();
  const years = Array(now - (now - 60))
    .fill("")
    .map((_v, idx) => now - idx);

  const [createPost, { loading, error }] = useMutation(CREATE_USER);
  // const [createLink] = useMutation(CREATE_USER, {
  //   variables: {
  //     registerInput: DATA_MOCK,
  //   },
  //   update: (cache, { data: { post } }) => {
  //     const take = LINKS_PER_PAGE;
  //     const skip = 0;
  //     const orderBy = { createdAt: 'desc' };

  //     const data = cache.readQuery({
  //       query: FEED_QUERY,
  //       variables: {
  //         take,
  //         skip,
  //         orderBy
  //       }
  //     });

  const handleCreatePost = (event) => {
    event.preventDefault();
    setParams({
      ...params,
      profileInput: profileParams,
    });
    createPost({ variables: { input: DATA_MOCK } });
  };

  useEffect(() => {
    console.log(birthDate);
    var string = birthDate.year + "-" + birthDate.month + "-" + birthDate.day;
    console.log(string);
    var date = moment(string).format("YYYY-MM-DDThh:mm:ss[Z]");
    setProfileParams({
      ...profileParams,
      birthDate: date,
    });
  }, [birthDate]);

  const DateFormatter = (data) => {
    if (typeof data === "string") {
      const month = months.indexOf(data);
      setBirthDate({ ...birthDate, month: month + 1 });
    }
    if (typeof data === "number" && data > 31) {
      setBirthDate({ ...birthDate, year: data });
    } else if (typeof data === "number" && data > 0) {
      setBirthDate({ ...birthDate, day: data });
    }
  };

  const genderType = (data) => {
    switch (data) {
      case "Male":
        setProfileParams({
          ...profileParams,
          gender: 0,
        });
        break;
      case "Female":
        setProfileParams({
          ...profileParams,
          gender: 1,
        });
        break;
      case "Other":
        setProfileParams({
          ...profileParams,
          gender: 2,
        });
        break;

      default:
        setProfileParams({
          ...profileParams,
          gender: 2,
        });
        break;
    }
  };

  return (
    <RegisterStyled>
      <Header name="header">
        <NavBar></NavBar>
      </Header>
      <Container>
        <RegisterForm>
          <div className="content-column">
            <div className="content-row justify-content-center mgb-16">
              <RegisterFormContainer onSubmit={handleCreatePost}>
                <div className="content-column ">
                  <div className="content-row justify-content-center mgb-8">
                    <div className="feature-card-title white">Sign Up</div>
                  </div>
                  <Input
                    type="text"
                    title="FirstName"
                    placeholder="Kittipat"
                    onChange={(e) =>
                      setProfileParams({
                        ...profileParams,
                        firstName: e,
                      })
                    }
                  />
                  <Input
                    type="text"
                    title="LastName"
                    placeholder="Dechkul"
                    onChange={(e) =>
                      setProfileParams({
                        ...profileParams,
                        lastName: e,
                      })
                    }
                  />
                  <Input
                    type="text"
                    title="Email"
                    placeholder="test@gmail.com"
                    onChange={(e) =>
                      setParams({
                        ...params,
                        email: e,
                      })
                    }
                  />
                  <Input
                    type="text"
                    title="CitizenID"
                    placeholder="CitizenID"
                    onChange={(e) =>
                      setProfileParams({
                        ...profileParams,
                        citizenID: e,
                      })
                    }
                  />
                  <Input
                    type="text"
                    title="PassportNumber"
                    placeholder="PassportNumber"
                    onChange={(e) =>
                      setProfileParams({
                        ...profileParams,
                        passportNumber: e,
                      })
                    }
                  />
                  <Input
                    type="text"
                    title="Telephone"
                    placeholder="080 000 0000"
                    onChange={(e) =>
                      setProfileParams({
                        ...profileParams,
                        phone: e,
                      })
                    }
                  />
                  <BirthdayInput>
                    <div className="content-row">
                      <div
                        className="label white"
                        style={{ marginBottom: "-12px" }}
                      >
                        BirthDate
                      </div>
                    </div>
                    <div className="inline-flex">
                      <Dropdown
                        onChange={(e) => {
                          DateFormatter(e);
                        }}
                      >
                        {Array.from(Array(31).keys()).map((data, index) => {
                          return (
                            <DropdownChild name={index} key={index}>
                              {data + 1}
                            </DropdownChild>
                          );
                        })}
                      </Dropdown>
                      <Dropdown
                        onChange={(e) => {
                          DateFormatter(e);
                        }}
                      >
                        {months.map((data, index) => {
                          return (
                            <DropdownChild name={index} key={index}>
                              {data}
                            </DropdownChild>
                          );
                        })}
                      </Dropdown>
                      <Dropdown
                        onChange={(e) => {
                          DateFormatter(e);
                        }}
                      >
                        {years.map((data, index) => {
                          return (
                            <DropdownChild name={index} key={index}>
                              {data}
                            </DropdownChild>
                          );
                        })}
                      </Dropdown>
                    </div>
                  </BirthdayInput>
                  <GenderInput>
                    <div className="content-row">
                      <div className="label white">Gender</div>
                    </div>
                    <Radio
                      position="row"
                      gap={16}
                      onChange={(e) => {
                        genderType(e);
                      }}
                      active={"Male"}
                    >
                      <RadioChild name="Male"></RadioChild>
                      <RadioChild name="Female"></RadioChild>
                      <RadioChild name="Other"></RadioChild>
                    </Radio>
                  </GenderInput>
                  <Input
                    type="text"
                    title="Address"
                    placeholder="Address"
                    onChange={(e) =>
                      setProfileParams({
                        ...profileParams,
                        address: e,
                      })
                    }
                  />
                  <div className="content-row">
                    <Input
                      type="text"
                      title="City"
                      placeholder="Bangkok"
                      style={{ marginRight: "32px" }}
                      onChange={(e) =>
                        setProfileParams({
                          ...profileParams,
                          city: e,
                        })
                      }
                    />
                    <Input
                      type="text"
                      title="PostCode"
                      placeholder="10140"
                      onChange={(e) =>
                        setProfileParams({
                          ...profileParams,
                          postcode: e,
                        })
                      }
                    />
                  </div>
                  <Input
                    type="password"
                    title="Password"
                    placeholder="**********"
                    onChange={setCheckPass}
                  />
                  <Input
                    type="password"
                    title="ConfirmPassword"
                    placeholder="**********"
                    onChange={(e) =>
                      checkPass === e
                        ? setParams({
                            ...params,
                            password: e,
                          })
                        : 0
                    }
                  />
                  <div className="content-row justify-content-center mgt-24">
                    <Button
                      label="Sign Up"
                      color="purple"
                      style={{ width: "232px" }}
                    />
                  </div>
                </div>
              </RegisterFormContainer>
            </div>
            <div className="content-row justify-content-center">
              <div className="label gray mgr-8">Already gave an account? </div>
              <a href="/" className="label purple">
                Sign In
              </a>
            </div>
          </div>
        </RegisterForm>
      </Container>
    </RegisterStyled>
  );
};

export default RegisterContainer;
