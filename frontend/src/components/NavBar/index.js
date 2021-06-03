import React from "react";
import { Container } from "semantic-ui-react";
import { NavBarStyle } from "./styled";

export const NavBar = () => {
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
        <div className="content-row">
          <a href="/withdraw/crypto" className="mgr-16">
            <div className="title mgl-32">Withdraw</div>
          </a>
          <a href="/setting" className="mgr-16">
            <div className="title mgl-32">Profile</div>
          </a>
        </div>
      </div>
    </NavBarStyle>
  );
};
