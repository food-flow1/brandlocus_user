"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import { images, icons } from "@/constants";
import TryAiAdvisorButton from "@/components/common/TryAiAdvisorButton";
import { FiArrowUpRight } from "react-icons/fi";

const HeroPage = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <section className="min-h-fit pt-12 pb-4 sm:pt-18 md:pt-20 lg:pt-28">
            <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
                <div className="grid lg:grid-cols-[55%_45%] gap-4 items-center">
                    {/* Left Side - Text Content (55%) */}
                    <div className="order-2 lg:order-0">
                        {/* Headline with highlighted "Business" */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-tight sm:leading-tight"
                        >
                            Shaping The Future {" "}
                            <span className="relative inline-block"> of {" "}
                                <span className="relative z-10 px-1.5 sm:px-2 bg-black text-white border-2 border-white rounded-lg">
                                    Business
                                </span>
                            </span>{" "}
                            Growth
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl pt-4 sm:pt-5 md:pt-6"
                        >
                            We help businesses grow and thrive by combining consulting, strategy, and digital innovation with impactful brand development, effective marketing, and transformative corporate retreats.
                        </motion.p>

                        {/* NEW! Indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex items-center gap-2 text-sm text-gray-600 w-auto sm:w-[180px] md:w-[200px] justify-center mt-4 sm:mt-5 md:mt-6"
                        >
                            <svg className="w-8 h-8 md:w-8 md:h-8" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_4539_1360)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.38289 17.1391C9.30034 17.0096 9.21701 16.8799 9.13272 16.7508C8.27294 15.4368 7.42203 14.1236 6.65623 12.7505C6.47065 12.418 6.12619 11.7764 5.71992 11.3933C5.42934 11.1193 5.10061 10.9568 4.77323 10.924C4.56467 10.9029 4.24502 10.9366 4.00663 11.2906C3.9665 11.3501 3.91084 11.4555 3.86602 11.5959C3.79373 11.8231 3.71609 12.2428 3.70867 12.3016C3.59716 13.1584 3.49415 13.9783 3.45317 14.8419C3.41534 15.6366 3.33234 16.427 3.30534 17.2229C3.26494 18.4138 3.29854 19.5768 3.46625 20.7585C3.52841 21.1972 3.93533 21.5026 4.37407 21.4405C4.81241 21.3782 5.11812 20.9718 5.05596 20.533C4.9017 19.4447 4.87268 18.3742 4.91029 17.2775C4.93683 16.4888 5.01945 15.7053 5.05683 14.918C5.08129 14.4057 5.12921 13.9097 5.18751 13.4114L5.25385 13.5326C6.03835 14.9388 6.90863 16.2842 7.78913 17.6298C8.11848 18.1335 8.43064 18.6457 8.76817 19.1444C8.79123 19.2033 8.89808 19.4736 8.95865 19.5716C9.05932 19.735 9.18413 19.8421 9.29922 19.9074C9.59159 20.0739 9.9184 20.1127 10.2782 19.8251C10.5476 19.6097 10.7621 19.2287 10.866 18.7385C11.0089 18.065 10.9587 17.1218 10.9989 16.7018C11.2531 14.0442 11.2937 11.3479 11.7479 8.71306C11.8232 8.27645 11.5299 7.86091 11.0933 7.78554C10.6566 7.71056 10.2407 8.00376 10.1657 8.44046C9.7045 11.1149 9.65836 13.8511 9.40021 16.549C9.3868 16.6926 9.38556 16.9012 9.38289 17.1391Z" fill="black" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.6877 8.03009C17.7463 8.06012 16.8103 8.05966 15.9569 8.5043C15.064 8.9699 14.4708 9.80885 14.0973 10.8102C13.6207 12.0877 13.506 13.6355 13.403 14.7335C13.3498 15.3022 13.2039 16.0781 13.2072 16.7961C13.2104 17.4136 13.325 17.9926 13.5995 18.4429C14.0309 19.1504 14.8842 19.409 15.8563 19.2546C16.9795 19.0763 18.224 18.3533 18.6314 17.8583C18.9131 17.5163 18.8641 17.0098 18.5217 16.7283C18.1798 16.4466 17.6736 16.4956 17.3919 16.8376C17.1335 17.1516 16.317 17.5557 15.6044 17.6691C15.4453 17.6941 15.2913 17.7047 15.1527 17.6842C15.0805 17.6737 15.0074 17.6675 14.9706 17.6075C14.7905 17.3116 14.7983 16.9002 14.8214 16.4882C14.8532 15.9138 14.9599 15.3307 15.002 14.8831C15.0939 13.9011 15.1756 12.5138 15.6016 11.3713C15.8301 10.7588 16.1527 10.2133 16.6994 9.92843C17.3336 9.59793 18.0384 9.65741 18.7386 9.63509C19.1814 9.62126 19.5296 9.25018 19.5154 8.80728C19.5016 8.36447 19.1305 8.01625 18.6877 8.03009Z" fill="black" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.6752 12.138C16.9015 12.3535 16.0781 12.5685 15.2805 12.6627C14.8404 12.7146 14.5252 13.114 14.5768 13.554C14.6287 13.994 15.028 14.3092 15.4681 14.2573C16.3465 14.1538 17.2541 13.9223 18.1057 13.6853C18.5325 13.5664 18.7828 13.1232 18.6639 12.6965C18.5451 12.2694 18.1022 12.0196 17.6752 12.138Z" fill="black" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M27.0265 14.7368C26.6151 13.9141 26.1687 13.0949 25.6748 12.3264C25.6344 12.264 25.1139 11.5858 24.7775 11.2995C24.5506 11.1066 24.3278 11.0296 24.191 11.0115C23.7932 10.9591 23.507 11.1151 23.3263 11.4532C23.1533 11.7774 23.0364 12.1298 22.9514 12.4975C22.6237 11.2792 22.3523 10.0415 22.3023 8.79265C22.2981 8.68951 22.2871 8.63916 22.2855 8.63014C22.2325 8.36574 22.0976 8.24884 22.0502 8.20411C21.8177 7.98391 21.569 7.95447 21.3432 7.99911C21.3157 8.00427 20.7076 8.12163 20.6949 8.77749C20.6938 8.83038 20.7006 9.2106 20.6944 9.35707C20.6893 9.48443 20.7139 9.6059 20.7624 9.71516C20.9435 11.3878 21.43 13.0407 21.8912 14.6515C21.9908 14.9996 22.0506 15.3484 22.0597 15.7102C22.0625 15.8159 22.0209 16.044 22.018 16.1599C22.0134 16.3562 22.061 16.4995 22.0951 16.5749C22.2721 16.9677 22.5775 17.0742 22.8863 17.0553C23.0183 17.0475 23.2852 17.0214 23.5186 16.6976C24.0436 15.9702 24.2109 15.0715 24.32 14.1524C24.3523 13.8805 24.3776 13.6071 24.4163 13.3399C24.9522 14.1923 25.4272 15.1054 25.8631 16.0092C25.911 16.1084 26.4162 17.0278 26.5711 17.1831C26.9582 17.5725 27.3592 17.4398 27.5393 17.3471C27.8139 17.2054 28.0719 16.9128 28.2438 16.5039C28.4659 15.9747 28.5664 15.199 28.6295 14.8922C29.0545 12.8274 29.4763 10.6638 29.4785 8.55243C29.4792 8.10926 29.1199 7.74933 28.6768 7.74866C28.2336 7.74799 27.8736 8.1077 27.873 8.55048C27.8706 10.5556 27.4599 12.6084 27.0567 14.5687C27.0475 14.6139 27.0376 14.671 27.0265 14.7368Z" fill="black" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M31.7538 8.53035C31.7205 9.96674 31.6905 11.3907 31.55 12.8431C31.5074 13.2844 31.8306 13.6772 32.2719 13.7199C32.7128 13.7624 33.1056 13.4392 33.1483 12.9979C33.3465 10.9495 33.3307 8.95746 33.4054 6.90892C33.4347 6.11722 32.6898 6.05671 32.6438 6.05431C32.5424 6.04901 31.9855 6.03937 31.8243 6.65677C31.8143 6.69444 31.7777 6.9686 31.758 7.07363C31.7123 7.31399 31.6538 7.54562 31.5866 7.7814C31.5089 8.05309 31.5808 8.33216 31.7538 8.53035Z" fill="black" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M31.9101 17.0819C32.0454 16.8585 32.0689 16.5731 31.9479 16.3197C31.7564 15.9199 31.2767 15.7509 30.8769 15.9424C30.5077 16.1191 30.3794 16.4088 30.3355 16.7892C30.2848 17.2295 30.6014 17.6281 31.0418 17.6784C31.4443 17.7249 31.812 17.4638 31.9101 17.0819Z" fill="black" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.6556 28.7581C13.6149 28.5707 13.5816 28.4225 13.5729 28.3905C13.1604 26.8634 12.6819 25.34 12.1193 23.8615C11.9616 23.4472 11.4976 23.239 11.0834 23.3967C10.6692 23.5543 10.461 24.0183 10.6186 24.4326C11.1623 25.861 11.6241 27.3335 12.023 28.8093C12.0534 28.9218 12.2048 29.8941 12.374 30.3242C12.5275 30.7136 12.79 30.9007 12.9505 30.9638C13.2055 31.0639 13.6404 31.0647 14.079 30.6948C14.6516 30.212 15.5797 28.783 15.733 28.5457C16.0144 28.109 16.2751 27.6426 16.522 27.1876C16.9902 26.3243 17.3538 25.4195 17.7034 24.5041C17.8617 24.09 17.6539 23.6258 17.2397 23.4674C16.8259 23.3096 16.3613 23.5174 16.2034 23.9312C15.879 24.7804 15.545 25.6211 15.1107 26.4218C14.8826 26.8416 14.6429 27.2728 14.3833 27.6759C14.3051 27.7967 13.9939 28.2982 13.6556 28.7581Z" fill="black" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_4539_1360">
                                        <rect width="28.9025" height="28.9025" fill="white" transform="translate(6.50893) rotate(13.0148)" />
                                    </clipPath>
                                </defs>
                            </svg>


                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-7 md:mt-8"
                        >
                            {/* Try Our AI Advisor Button */}
                            <TryAiAdvisorButton className="group w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-black text-white rounded-full text-sm sm:text-base font-medium hover:bg-gray-900 min-w-0 sm:min-w-[220px] md:min-w-[250px]" />

                            {/* Book a Free Consultation Button */}
                            <button className="flex items-center cursor-pointer justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white border border-gray-500 text-black rounded-full text-sm sm:text-base font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px]">
                                <span>Book a Free Consultation</span>
                                <FiArrowUpRight size={26} />
                            </button>
                        </motion.div>

                        {/* Trusted By Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="space-y-3 sm:space-y-4 mt-8 sm:mt-10 md:mt-12 lg:mt-12 w-full sm:w-[90%] md:w-[85%] lg:w-[80%]"
                        >
                            <p className="text-sm sm:text-base md:text-lg text-center text-gray-500 uppercase tracking-wider">
                                Trusted By 10+ Companies
                            </p>
                            {/* Company Logos - Marquee */}
                            <div className="relative overflow-hidden py-2">
                                <Marquee gradient={false} speed={40} pauseOnHover className="flex items-center gap-6 sm:gap-8 md:gap-10">
                                    {[icons.spot, icons.sureid, icons.dbn, icons.smedan, icons.wecan, icons.butterfly, icons.hvc].map((logoSrc, index) => (
                                        <div key={index} className="flex items-center justify-center mx-2 sm:mx-3 md:mx-4 opacity-80 hover:opacity-100 transition-opacity">
                                            <Image
                                                src={logoSrc}
                                                alt="company logo"
                                                width={140}
                                                height={80}
                                                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                                            />
                                        </div>
                                    ))}
                                </Marquee>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side - Image with Overlays (45%) */}
                    <div className="relative flex items-center justify-center lg:justify-end mt-0 w-full h-full sm:h-auto order-1 lg:order-0">  
                        {/* Loading Skeleton */}
                        <AnimatePresence>
                            {!imageLoaded && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 w-full h-full sm:h-auto sm:max-w-full md:max-w-[420px] md:aspect-21/26 lg:max-w-full lg:w-full xl:max-w-[1100px] 2xl:max-w-[1300px] lg:aspect-21/26 z-0 bg-gray-100 rounded-lg animate-pulse"
                                >
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-lg">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-400 rounded-full animate-spin"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Main Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.95 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative w-full h-full sm:h-auto sm:max-w-full md:max-w-[420px] md:aspect-21/26 lg:max-w-full lg:w-full xl:max-w-[1100px] 2xl:max-w-[1300px] lg:aspect-21/26 z-10"
                        >
                            <Image
                                src={images.homeHero}
                                alt="Business professional"
                                width={1300}
                                height={1609}
                                className="w-full h-full object-contain rounded-lg"
                                priority
                                sizes="(max-width: 640px) 300px, (max-width: 768px) 380px, (max-width: 1024px) 420px, (max-width: 1280px) 1100px, 1300px"
                                onLoad={() => setImageLoaded(true)}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroPage;