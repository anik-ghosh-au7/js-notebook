import React, { Fragment } from "react";

// components
import SignUp from "./client/components/SignUp/SignUp";
import SignIn from "./client/components/SignIn/SignIn";
import SignOut from "./client/components/SignOut/SignOut";
import Profile from "./client/components/Profile/Profile";
import Notification from "./client/components/Notification/Notification";
import ForgetPassword from "./client/components/ForgetPassword/ForgetPassword";
import SidePanel from "./client/components/SidePanel/SidePanel";

const MainStructure = ({ children }) => {
  return (
    <Fragment>
      <Notification />
      <SignUp />
      <SignIn />
      <SignOut />
      <Profile />
      <ForgetPassword />
      <SidePanel children={children} />
    </Fragment>
  );
};

export default MainStructure;
