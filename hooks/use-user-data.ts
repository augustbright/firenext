import { useContext } from "react";
import UserContext from "../contexts/user-context";

const useUserData = () => {
    return useContext(UserContext);
};

export default useUserData;
