import React from 'react'
import { MdArrowOutward } from 'react-icons/md'

const Enpowering = () => {
    return (
        <section className="w-full bg-white pb-4 sm:pb-6 md:pb-8 lg:pb-10">
            <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
                <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
                    {/* Bubble Badge */}
                    <div className="inline-block px-4 py-2 bg-gray-100 rounded-full">
                        <span className="text-sm sm:text-base text-gray-900 font-medium">
                            Empowering businesses to grow
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Business Mastery.
                        <br />
                        One Roll At A Time.
                    </h1>

                    {/* Description Paragraph */}
                    <p className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                        Business Quest blends real-world strategy with play. Roll the dice, draw a card, make the call. Built for consultants, founders, teams, and yes, families who love a smart challenge.
                    </p>

                    {/* CTA Button */}
                    <button className="inline-flex items-center gap-4 px-6 py-3 sm:px-8  bg-black text-white rounded-full hover:bg-gray-900 transition-colors font-medium text-base sm:text-lg">
                        <span>Join the Playtest List</span>
                        <div className=" bg-white rounded flex items-center justify-center">
                            <MdArrowOutward size={20} className='text-black' />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Enpowering