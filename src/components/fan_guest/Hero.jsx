import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <div className="hero min-h-screen bg-hero-image">
        <div className="hero hero-overlay bg-gradient-to-r from-slate-900/100 from-35% to-slate-50/5 bg-opacity-50">
          <div className="hero-content flex-col lg:flex-row-reverse text-neutral-content">
            <div className="max-w-sm text-center md:max-w-3xl md:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold">
                Experience the Roar of Egyptian Football with EgyptCheer!
              </h1>
              <p className="py-6">
                Welcome to EgyptCheer, your ultimate destination for securing
                tickets to the heart-pounding action of the Egyptian Premier
                League. Immerse yourself in the electric atmosphere, vibrant
                cheers, and unforgettable moments that only Egyptian football
                can offer.
              </p>
              <Link href="/fan/matches" className="btn btn-primary">
                Browse Matches!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
