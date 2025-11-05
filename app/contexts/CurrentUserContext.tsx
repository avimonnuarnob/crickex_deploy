import Cookies from "js-cookie";
import { getws, initws } from "@/notification";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
interface CurrentUserContextType {
  isLoggedIn: Boolean;
  userInfo?: UserProfile;
  userWalletData?: UserWallet;
  setUserInfo: Dispatch<SetStateAction<UserProfile | undefined>>;
  setUserWalletData: Dispatch<SetStateAction<UserWallet | undefined>>;
  loginUser: (token: string) => void;
  logoutUser: () => void;
}

interface UserProfile {
  username: string;
  support_contact: string;
  telegram_chat_id: any;
  is_active: boolean;
  first_name: string;
  last_name: string;
  email: string;
  contact: any;
  gender: any;
  dob: any;
  currency: string;
  date_joined: string;
  user_type: string;
  country_id: any;
  address: any;
  photo: any;
  category_id: string;
  referral_code: string;
  agent_referral_code: string;
  social_contact_id: SocialContactId;
  agent_social_contact_id: any[];
  user_base_origin: string;
  reg_link: string;
  url_id: number;
  domain_bot: string;
  currency_icon: string;
}

interface SocialContactId {
  id: number;
  name: string;
  prefix: string;
  general_user_show: boolean;
  admin_show: boolean;
  agent_show: boolean;
  social_register: boolean;
  sort_id: number;
  logo: string;
}

export interface UserWallet {
  provider_balance: number;
  credit_balance: number;
  reserve_balance: number;
  coin_balance: number;
  total_cashin: number;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

const CurrentUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<string | undefined>(
    Cookies.get("userToken")
  );

  const [userInfo, setUserInfo] = useState<UserProfile | undefined>();
  const [userWalletData, setUserWalletData] = useState<
    UserWallet | undefined
  >();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/auth/user/profile/",
        {
          headers: {
            Authorization: `Token ${user}`,
          },
        }
      );

      const responseData = await response.json();
      setUserInfo(responseData.data);
    };

    if (user) {
      getUserInfo();
    }
  }, [user]);

  useEffect(() => {
    async function getWalletData() {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/auth/user-balance/",
        {
          headers: {
            Authorization: `token ${user}`,
          },
        }
      );

      const responseData = await response.json();

      if (responseData.status === "ok") {
        setUserWalletData(responseData.data);
      }
    }

    if (user) {
      getWalletData();
    }
  }, [user]);

  useEffect(() => {
    if (userInfo) {
      initws(userInfo.username);
    }

    return () => {
      if (userInfo) {
        const socket = getws();
        socket.close();
      }
    };
  }, [userInfo]);

  const loginUser = (token: string) => {
    Cookies.set("userToken", token, { sameSite: "Strict" });
    setUser(token);
  };

  const logoutUser = () => {
    Cookies.remove("userToken");
    setUser(undefined);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        isLoggedIn: Boolean(user),
        userInfo,
        userWalletData,
        setUserInfo,
        setUserWalletData,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const currentUserContext = useContext(CurrentUserContext);

  if (!currentUserContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }

  return currentUserContext;
};

export default CurrentUserProvider;
