import { icons, images } from "@/constants";
import { ROUTES } from "./routes";

export const allServices = [
    { name: "Business Development", icon: icons.businessDevelopmentIcon, href: ROUTES.SERVICES_BUSINESS_DEVELOPMENT },
    { name: "Brand Management", icon: icons.brandManagementIcon, href: ROUTES.SERVICES_BRAND_MANAGEMENT },
    { name: "Capacity Building", icon: icons.capacityBuildingIcon, href: ROUTES.SERVICES_CAPACITY_BUILDING },
    { name: "Marketing Consulting", icon: images.brandManagement, href: ROUTES.SERVICES_MARKETING_CONSULTING },
    { name: "Trade & Investment Facilitation", icon: icons.tradeInvestmentIcon, href: ROUTES.SERVICES_TRADE_INVESTMENT },
]