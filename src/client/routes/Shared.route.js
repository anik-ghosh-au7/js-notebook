import { shared } from "../config/webUrl";
import Shared from "../pages/Shared/Shared";

const CreateRoute = [
  {
    path: shared,
    exact: true,
    isProtected: true,
    component: Shared,
  },
];

export default CreateRoute;
