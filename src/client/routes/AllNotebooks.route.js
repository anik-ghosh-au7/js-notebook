import { all } from "../config/webUrl";
import AllNotebooks from "../pages/AllNotebooks/AllNotebooks";

const AllNotebooksRoute = [
  {
    path: all,
    exact: true,
    isProtected: true,
    component: AllNotebooks,
  },
];

export default AllNotebooksRoute;
