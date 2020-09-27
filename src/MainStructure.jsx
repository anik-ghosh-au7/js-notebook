import React, { Fragment } from "react";

// components
import SignUp from "./client/components/AppStructure/SignUp/SignUp";
import SignIn from "./client/components/AppStructure/SignIn/SignIn";
import SignOut from "./client/components/AppStructure/SignOut/SignOut";
import Profile from "./client/components/AppStructure/Profile/Profile";
import Notification from "./client/components/Notification/Notification";
import ForgetPassword from "./client/components/AppStructure/ForgetPassword/ForgetPassword";
import SidePanel from "./client/components/AppStructure/SidePanel/SidePanel";

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
