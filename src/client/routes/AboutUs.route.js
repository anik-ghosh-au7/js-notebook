import { aboutUs } from "../config/webUrl";
import AboutUs from "../pages/AboutUs/About";

const AboutUsRoute = [
  {
    path: aboutUs,
    exact: true,
    isProtected: false,
    component: AboutUs,
  },
];

export default AboutUsRoute;
