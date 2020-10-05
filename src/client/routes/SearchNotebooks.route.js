import { search } from "../config/webUrl";
import SearchedNotebooks from "../pages/SearchedNotebooks/Searched";

const SearchedNotebooksRoute = [
  {
    path: search,
    exact: true,
    isProtected: false,
    component: SearchedNotebooks,
  },
];

export default SearchedNotebooksRoute;
