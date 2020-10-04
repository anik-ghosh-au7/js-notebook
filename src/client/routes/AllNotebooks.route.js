import { all } from "../config/webUrl";
import AllNotebooks from "../pages/AllNotebooks/AllNotebooks";

const AllNotebooksRoute = [
  {
    path: all,
    exact: true,
    isProtected: false,
    component: AllNotebooks,
  },
];

export default AllNotebooksRoute;
