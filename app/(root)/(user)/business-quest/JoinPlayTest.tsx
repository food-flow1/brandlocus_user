"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import CustomSelect, { CustomSelectOption } from "@/components/forms/CustomSelect";
import CustomInput from "@/components/forms/CustomInput";
import { countryData } from "@/constants/countryData";

const JoinPlayTest = () => {
    const getFlagEmoji = (countryCode: string) =>
        countryCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

    const countryOptions = useMemo<CustomSelectOption[]>(
        () =>
            countryData.map((country) => ({
                id: country.code.toLowerCase(),
                label: country.name,
                description: country.dialCode,
                icon: <span className="text-lg">{getFlagEmoji(country.code)}</span>,
            })),
        []
    );

    const roleOptions: CustomSelectOption[] = [
        { id: "founder", label: "Founder" },
        { id: "team-lead", label: "Team lead" },
        { id: "operator", label: "Operator" },
        { id: "consultant", label: "Consultant" },
    ];

    const [selectedCountry, setSelectedCountry] = useState<CustomSelectOption | null>(
        countryOptions[0]
    );
    const [selectedRole, setSelectedRole] = useState<CustomSelectOption | null>(roleOptions[0]);

    return (
        <section className="w-full bg-[#050505] text-white py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute -left-32 -top-20 w-80 h-80 rounded-full bg-white/15 blur-[120px] mix-blend-screen"
                    animate={{ y: ["0%", "25%", "-15%"], x: [0, 20, -10], scale: [1, 1.15, 0.95] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute right-0 top-1/3 w-96 h-96 rounded-full bg-white/10 blur-[140px] mix-blend-screen"
                    animate={{ y: ["0%", "-20%", "15%"], x: [0, -30, 20], scale: [1, 0.9, 1.1], rotate: [0, 25, -15, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                    className="absolute -bottom-24 left-1/4 w-72 h-72 rounded-full border border-white/30 blur-[80px] opacity-70"
                    animate={{ y: ["0%", "30%", "-10%"], rotate: [0, -20, 20, 0], scale: [1, 1.2, 0.9] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 space-y-8">
                {/* Badge */}
                <div className="flex justify-center">
                    <button className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-sm sm:text-base font-medium">
                        <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-white text-black text-xs">
                            ✦
                        </span>
                        Be the first to play
                    </button>
                </div>

                {/* Heading */}
                <div className="text-center space-y-3">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                        Join Playtest List
                    </h2>
                </div>

                {/* Form */}
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
                    <p className="text-sm sm:text-base text-white/70 text-center pb-6">
                        We’ll only use your info for Business Quest updates. No resale.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <CustomInput
                            label="First Name"
                            type="text"
                            placeholder="Michael"
                            variant="dark"
                        />
                        <CustomInput
                            label="Last Name"
                            type="text"
                            placeholder="Odubanjo"
                            variant="dark"
                        />
                        <CustomSelect
                            label="Country"
                            options={countryOptions}
                            selected={selectedCountry}
                            onChange={setSelectedCountry}
                            variant="dark"
                            searchable={true}
                        />
                        <CustomInput
                            label="Business Name"
                            type="text"
                            placeholder="Type your business name"
                            variant="dark"
                        />
                        <CustomInput
                            label="Email"
                            type="email"
                            placeholder="Michael22@gmail.com"
                            variant="dark"
                        />
                        <div className="space-y-2">
                            <label className="text-sm text-white/70">Phone Number</label>
                            <div className="flex rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
                                <span className="flex items-center gap-2 px-4 py-3 text-white/70 border-r border-white/10">
                                    <span className="text-lg">{selectedCountry?.icon}</span>
                                    {selectedCountry?.description}
                                </span>
                                <input
                                    type="tel"
                                    placeholder="8031234567"
                                    className="flex-1 bg-transparent px-4 py-3 text-sm sm:text-base placeholder-white/40 focus:outline-none"
                                />
                            </div>
                        </div>

                        <CustomInput
                            label="Sector"
                            type="text"
                            placeholder="Type your business sector"
                            variant="dark"
                        />
                        <CustomSelect
                            label="I'm a ..."
                            options={roleOptions}
                            selected={selectedRole}
                            onChange={setSelectedRole}
                            variant="dark"
                        />
                    </div>

                    <div className="py-4 "></div>

                    {/* Checkbox */}
                    <label className="flex items-center justify-center gap-3 text-xs sm:text-sm text-white/60">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-white/30 bg-black/40 focus:ring-white/30"
                        />
                        I’m open to a 60–90 minute session
                    </label>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button className="inline-flex items-center gap-3 bg-white text-black font-medium rounded-full px-8 sm:px-12 py-2 cursor-pointer sm:py-3 text-base sm:text-lg shadow-lg hover:bg-gray-100 transition-colors">
                            Join the Playtest List
                            <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-black text-white text-xs">
                                ↗
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinPlayTest;