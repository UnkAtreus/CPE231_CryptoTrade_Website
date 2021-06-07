import React from "react";
import { NavBarStyle } from "./styled";
import { useQuery, gql } from "@apollo/client";
import { handleItem } from "helpers/functions";

export const NavBar = () => {
  const POST_LOGOUT = gql`
    query {
      getUserByToken {
        role {
          id
          role
        }
      }
    }
  `;
  const { client, loading, error, data } = useQuery(POST_LOGOUT, {
    fetchPolicy: "network-only",
  });

  const role_user = () => {
    if (data) {
      var role = data.getUserByToken.role.role;
    }

    if (role === "customer") {
      return (
        <NavBarStyle>
          <div className="nav-container">
            <div className="content-row">
              <a href="/trades/btcusdt" className="mgr-16">
                <span className="title" aria-label="fog" role="img">
                  นักศึกษาชื่อเทา BY 🐸
                </span>
              </a>
              <a href="/deposit/crypto" className="mgr-16">
                <div className="title mgl-32">Buy Crypto</div>
              </a>
              <a href="/trades/btcusdt" className="mgr-16">
                <div className="title mgl-32">Trade</div>
              </a>
              <a href="/p2p/crypto" className="mgr-16">
                <div className="title mgl-32">P2P</div>
              </a>
            </div>
            <div className="content-row align-tiems-center">
              <a href="/withdraw/crypto" className="mgr-16">
                <div className="title mgl-32">Withdraw</div>
              </a>
              {!data && !loading ? (
                <div className="content-row">
                  <a href="/login" className="mgr-16">
                    <div
                      className="title mgl-32 content-row justify-content-center align-items-center"
                      style={{
                        background: "#7F49E8",
                        width: "100px",
                        height: "30px",
                        borderRadius: "8px",
                      }}
                    >
                      Login
                    </div>
                  </a>
                </div>
              ) : (
                <div className="content-row">
                  <a href="/setting" className="mgr-16">
                    <div className="title mgl-32">Profile</div>
                  </a>
                  <a
                    href="/"
                    className="mgr-16"
                    onClick={() => {
                      handleItem("access-token").then(() =>
                        client.resetStore()
                      );
                    }}
                  >
                    <div className="title mgl-32">Logout</div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </NavBarStyle>
      );
    } else if (role === "staff") {
      return (
        <NavBarStyle>
          <div className="nav-container">
            <div className="content-row">
              <a href="/staff" className="mgr-16">
                <span className="title" aria-label="fog" role="img">
                  นักศึกษาชื่อเทา BY 🐸
                </span>
              </a>
              <a href="/staff" className="mgr-16">
                <div className="title mgl-32">Home</div>
              </a>
            </div>
            <div className="content-row align-tiems-center">
              {!data && !loading ? (
                <div className="content-row">
                  <a href="/login" className="mgr-16">
                    <div
                      className="title mgl-32 content-row justify-content-center align-items-center"
                      style={{
                        background: "#7F49E8",
                        width: "100px",
                        height: "30px",
                        borderRadius: "8px",
                      }}
                    >
                      Login
                    </div>
                  </a>
                </div>
              ) : (
                <div className="content-row">
                  <a
                    href="/"
                    className="mgr-16"
                    onClick={() => {
                      handleItem("access-token").then(() =>
                        client.resetStore()
                      );
                    }}
                  >
                    <div className="title mgl-32">Logout</div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </NavBarStyle>
      );
    } else if (role === "owner") {
      return (
        <NavBarStyle>
          <div className="nav-container">
            <div className="content-row">
              <a href="/owner" className="mgr-16">
                <span className="title" aria-label="fog" role="img">
                  นักศึกษาชื่อเทา BY 🐸
                </span>
              </a>
              <a href="/owner" className="mgr-16">
                <div className="title mgl-32">Home</div>
              </a>
            </div>
            <div className="content-row align-tiems-center">
              {!data && !loading ? (
                <div className="content-row">
                  <a href="/login" className="mgr-16">
                    <div
                      className="title mgl-32 content-row justify-content-center align-items-center"
                      style={{
                        background: "#7F49E8",
                        width: "100px",
                        height: "30px",
                        borderRadius: "8px",
                      }}
                    >
                      Login
                    </div>
                  </a>
                </div>
              ) : (
                <div className="content-row">
                  <a
                    href="/"
                    className="mgr-16"
                    onClick={() => {
                      handleItem("access-token").then(() =>
                        client.resetStore()
                      );
                    }}
                  >
                    <div className="title mgl-32">Logout</div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </NavBarStyle>
      );
    } else if (role === "admin") {
      return (
        <NavBarStyle>
          <div className="nav-container">
            <div className="content-row">
              <a href="/admin" className="mgr-16">
                <span className="title" aria-label="fog" role="img">
                  นักศึกษาชื่อเทา BY 🐸
                </span>
              </a>
              <a href="/admin" className="mgr-16">
                <div className="title mgl-32">Home</div>
              </a>
            </div>
            <div className="content-row align-tiems-center">
              {!data && !loading ? (
                <div className="content-row">
                  <a href="/login" className="mgr-16">
                    <div
                      className="title mgl-32 content-row justify-content-center align-items-center"
                      style={{
                        background: "#7F49E8",
                        width: "100px",
                        height: "30px",
                        borderRadius: "8px",
                      }}
                    >
                      Login
                    </div>
                  </a>
                </div>
              ) : (
                <div className="content-row">
                  <a
                    href="/"
                    className="mgr-16"
                    onClick={() => {
                      handleItem("access-token").then(() =>
                        client.resetStore()
                      );
                    }}
                  >
                    <div className="title mgl-32">Logout</div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </NavBarStyle>
      );
    } else {
      return (
        <NavBarStyle>
          <div className="nav-container">
            <div className="content-row">
              <a href="/trades/btcusdt" className="mgr-16">
                <span className="title" aria-label="fog" role="img">
                  นักศึกษาชื่อเทา BY 🐸
                </span>
              </a>
              <a href="/deposit/crypto" className="mgr-16">
                <div className="title mgl-32">Buy Crypto</div>
              </a>
              <a href="/trades/btcusdt" className="mgr-16">
                <div className="title mgl-32">Trade</div>
              </a>
              <a href="/p2p/crypto" className="mgr-16">
                <div className="title mgl-32">P2P</div>
              </a>
            </div>
            <div className="content-row align-tiems-center">
              <a href="/withdraw/crypto" className="mgr-16">
                <div className="title mgl-32">Withdraw</div>
              </a>
              {!data && !loading ? (
                <div className="content-row">
                  <a href="/login" className="mgr-16">
                    <div
                      className="title mgl-32 content-row justify-content-center align-items-center"
                      style={{
                        background: "#7F49E8",
                        width: "100px",
                        height: "30px",
                        borderRadius: "8px",
                      }}
                    >
                      Login
                    </div>
                  </a>
                </div>
              ) : (
                <div className="content-row">
                  <a href="/setting" className="mgr-16">
                    <div className="title mgl-32">Profile</div>
                  </a>
                  <a
                    href="/"
                    className="mgr-16"
                    onClick={() => {
                      handleItem("access-token").then(() =>
                        client.resetStore()
                      );
                    }}
                  >
                    <div className="title mgl-32">Logout</div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </NavBarStyle>
      );
    }
  };
  return role_user();
};
