import { create } from "../config/webUrl";
import Create from "../pages/Create/Create";

const CreateRoute = [
  {
    path: create,
    exact: true,
    isProtected: false,
    component: Create,
  },
];

export default CreateRoute;
