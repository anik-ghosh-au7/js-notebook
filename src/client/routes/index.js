import AboutUsRoute from "./AboutUs.route";
import CreateRoute from "./Create.route";
import SharedRoute from "./Shared.route";
import AllNotebooksRoute from "./AllNotebooks.route";
import SearchedNotebooksRoute from "./SearchNotebooks.route";

export default [
  ...AboutUsRoute,
  ...CreateRoute,
  ...SharedRoute,
  ...AllNotebooksRoute,
  ...SearchedNotebooksRoute,
];
