import React from "react";
import Navbar from "@src/components/fan_guest/Navbar";
import Hero from "@src/components/fan_guest/Hero";
import MatchList from "@src/components/fan_guest/MatchList";
import Footer from "../components/fan_guest/Footer";

const styles = {
  headers:
    "lg:text-4xl text-2xl font-bold text-center text-slate-200 p-10 max-md:flex-col",
  center: "flex justify-center align-middle",
  sections: "px-10 bg-base-300",
};

const Fan = () => {
  const numOfUpcomming = 3;

  return (
    <>
      {/* Navbar Lama a3melo */}
      <Navbar />

      {/* Hero Section */}
      <Hero />
      {/* May add Club's logos in a caroussel */}
      {/* Upcoming Matches: if exists */}
      <h1 className="text-4xl font-bold text-center text-slate-200 p-10 max-md:flex-col">
        Upcoming Matches
      </h1>
      <MatchList numMatches={numOfUpcomming} />

      {/* How It Works Section */}
      <section className={styles.sections}>
        <div className="font-bold text-center text-slate-200 max-md:flex-col">
          <h2 className={styles.headers}>How It Works</h2>
          <ul className="lg:mt-7 steps steps-vertical lg:steps-horizontal lg:flex lg:items-start">
            <li className="step step-primary">
              <div className="lg:p-3 max-lg:text-left">
                <h3 className="text-2xl">Choose Your Match</h3>
                <p className="py-2 text-md">
                  Select from the upcoming matches listed on our website.
                </p>
              </div>
            </li>
            <li className="step step-primary">
              <div className="lg:p-3 max-lg:text-left">
                <h3 className="text-2xl">Pick Your Seats</h3>
                <p className="py-2 text-md">
                  Explore the stadium map and choose your preferred seating.
                </p>
              </div>
            </li>
            <li className="step step-primary">
              <div className="lg:p-3 max-lg:text-left">
                <h3 className="text-2xl">Secure Your Tickets</h3>
                <p className="py-2 text-md">
                  Complete the easy checkout process to secure your EgyptCheer
                  tickets.
                </p>
              </div>
            </li>
            <li className="step step-primary">
              <div className="lg:p-3 max-lg:text-left">
                <h3 className="text-2xl">Enjoy the Match</h3>
                <p className="py-2 text-md">
                  Get ready for an unforgettable experience as you cheer for
                  your favorite team.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Why Choose EgyptCheer Section */}
      <section className={styles.sections}>
        <div className="font-bold text-center text-slate-200 p-10 max-md:flex-col">
          <h2 className={styles.headers}>Why Choose EgyptCheer</h2>
          <div className="flex justify-center">
            <ol className=" text-left space-y-5 list-decimal list-inside">
              <li>
                User-Friendly Experience: Our platform is designed for seamless
                navigation, ensuring a hassle-free ticketing process.
              </li>
              <li>
                Secure Transactions: Rest easy knowing that your transactions
                are secure, providing you with peace of mind.
              </li>
              <li>
                24/7 Customer Support: Our dedicated support team is ready to
                assist you around the clock.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Fan;

// export async function getServerSideProps() {
//   const res = await getMatches({});
//   console.log("res", res);
//   const matches = await res.json();

//   return { props: { matches } };
// }
