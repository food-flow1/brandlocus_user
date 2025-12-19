import { icons, images } from "@/constants";
import { ROUTES } from "./routes";

export const allServices = [
    { name: "Business Development", icon: icons.businessDevelopmentIcon, href: ROUTES.SERVICES_BUSINESS_DEVELOPMENT },
    { name: "Brand Management", icon: icons.brandManagementIcon, href: ROUTES.SERVICES_BRAND_MANAGEMENT },
    { name: "Capacity Building", icon: icons.capacityBuildingIcon, href: ROUTES.SERVICES_CAPACITY_BUILDING },
    { name: "Marketing Consulting", icon: images.brandManagement, href: ROUTES.SERVICES_MARKETING_CONSULTING },
    { name: "Trade & Investment Facilitation", icon: icons.tradeInvestmentIcon, href: ROUTES.SERVICES_TRADE_INVESTMENT },
]

export const blogPosts = [
    {
        image: images.blog1,
        category: "Technology",
        title: "Harnessing Solar Energy Amid Nigeria's Power Grid Challenges",
    },
    {
        image: images.blog1,
        category: "Technology",
        title: "Harnessing Solar Energy Amid Nigeria's Power Grid Challenges",
    },
    {
        image: images.blog1,
        category: "Technology",
        title: "Harnessing Solar Energy Amid Nigeria's Power Grid Challenges",
    },
    {
        image: images.blog1,
        category: "Technology",
        title: "Harnessing Solar Energy Amid Nigeria's Power Grid Challenges",
    },
    {
        image: images.blog1,
        category: "Technology",
        title: "Harnessing Solar Energy Amid Nigeria's Power Grid Challenges",
    },
    {
        image: images.blog1,
        category: "Technology",
        title: "Harnessing Solar Energy Amid Nigeria's Power Grid Challenges",
    },
];

export const serviceNeededEnum = {
    BRAND_DEVELOPMENT: "BRAND_DEVELOPMENT",
    BUSINESS_QUEST: "BUSINESS_QUEST",
    BUSINESS_DEVELOPMENT: "BUSINESS_DEVELOPMENT",
    CAPACITY_BUILDING: "CAPACITY_BUILDING",
    MARKETING_CONSULTING: "MARKETING_CONSULTING",
    TRADE_AND_INVESTMENT_FACILITATION: "TRADE_AND_INVESTMENT_FACILITATION",
    CONTACT: "CONTACT",
    PLAY_TEST: "PLAY_TEST",
    OTHERS: "OTHERS",
} as const;

// Service options for the select dropdown
export const serviceOptions = [
  { id: serviceNeededEnum.BRAND_DEVELOPMENT, label: "Brand Development" },
  { id: serviceNeededEnum.BUSINESS_QUEST, label: "Business Quest" },
  { id: serviceNeededEnum.BUSINESS_DEVELOPMENT, label: "Business Development" },
  { id: serviceNeededEnum.CAPACITY_BUILDING, label: "Capacity Building" },
  { id: serviceNeededEnum.MARKETING_CONSULTING, label: "Marketing Consulting" },
  { id: serviceNeededEnum.TRADE_AND_INVESTMENT_FACILITATION, label: "Trade & Investment" },
  { id: serviceNeededEnum.OTHERS, label: "Others" },
];

import { ServiceNeededType } from "@/lib/api/types";

export const getServiceFromPath = (pathname: string): ServiceNeededType => {
  if (pathname.includes('/services/business-development')) return serviceNeededEnum.BUSINESS_DEVELOPMENT;
  if (pathname.includes('/services/brand-management')) return serviceNeededEnum.BRAND_DEVELOPMENT;
  if (pathname.includes('/services/capacity-building')) return serviceNeededEnum.CAPACITY_BUILDING;
  if (pathname.includes('/services/marketing-consulting')) return serviceNeededEnum.MARKETING_CONSULTING;
  if (pathname.includes('/services/trade-investment')) return serviceNeededEnum.TRADE_AND_INVESTMENT_FACILITATION;
  return serviceNeededEnum.OTHERS;
};

  export  const industryOptions = [
        { id: "technology", label: "Technology" },
        { id: "trade-energy-climate", label: "Trade Energy & Climate" },
        { id: "agriculture", label: "Agriculture" },
        { id: "manufacturing", label: "Manufacturing" },
        { id: "finance", label: "Finance" },
        { id: "healthcare", label: "Healthcare" },
        { id: "retail", label: "Retail" },
        { id: "education", label: "Education" },
        { id: "real-estate", label: "Real Estate" },
        { id: "hospitality", label: "Hospitality" },
        { id: "transport-logistics", label: "Transport & Logistics" },
        { id: "creative-media-culture", label: "Creative Media & Culture" },
        { id: "public-policy", label: "Public Policy" },
        { id: "others", label: "Others" },
    ];