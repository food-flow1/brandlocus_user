declare interface ButtonProps {
  onClick?: () => void;
  title: string;
  loadingText?: string;
  bgVariant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "outline"
    | "bgWhite"
    | "bgBlack"
    | "bgGray"
    | "bgGreenLight";
  textVariant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "default"
    | "bgWhite"
    | "bgBlack"
    | "bgGray"
    | "bgGreenLight";
  iconLeft?: any;
  iconRight?: any;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean; // New prop for loading state
}

declare interface LoginResponse {
  token?: string;
  [key: string]: any; // Allows flexibility until you finalize structure
}

declare interface LoginPayload {
  email: string;
  password: string;
}

declare interface RegisterPayload {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  otp?: string;
  phoneNo?: string;
  gender?: string;
  referral?: string;
}

declare interface ForgetPasswordProps {
  email: string;
}

declare interface ResetPasswordProps {
  email: string;
  otp: string;
  password: string;
  confirmPassword?: string;
}

declare interface ChangePasswordProps {
  currentPassword: string;
  newPassword: string;
}

declare interface SidebarProps {
  toggle?: boolean;
  toggleNav: string;
  setToggleNav: React.Dispatch<React.SetStateAction<string>>;
  handleToggle: () => void;
}

declare interface StatusBadgeProps {
  status: string | any; // used for logic
  statusName?: string; // shown as the label
  className?: string;
}

declare interface Bank {
  name: string;
  accNo: string;
  accName: string;
  img: string | undefined;
}

declare interface Card {
  name: string;
  cardNo: string;
  img: string | undefined;
}

declare interface InvestmentOption {
  value: any;
  label: any;
  amount?: any;
}
