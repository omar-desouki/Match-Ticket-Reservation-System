// Validation conditions
export const validationConditions = {
  required: (value) => value.trim() !== "",
  minLength: (value, length) => value.length >= length,
  maxLength: (value, length) => value.length <= length,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  // Add more validation conditions as needed
};

// Valid values
export const validValues = {
  genders: ["male", "female"],
  roles: ["manager", "fan"],
  stadiumShape: {
    minNumOfRows: 1,
    maxNumOfRows: 5,
    minNumOfSeatsPerRow: 1,
    maxNumOfSeatsPerRow: 30,
  },
  teams: [
    "Al Ahly",
    "Zamalek",
    "Al-Ittihad",
    "Al Masry",
    "Al Mokawloon",
    "Ceramica Cleopatra",
    "El Gouna",
    "El-Sharkeyah",
    "ENPPI",
    "Future FC",
    "Ghazl El Mahalla",
    "Ismaily",
    "Misr El Makkasa",
    "National Bank",
    "Pharco FC",
    "Pyramids FC",
    "Smouha",
    "El Geish",
  ],
  // Egypt cities
  cities: [
    "Cairo",
    "Alexandria",
    "Giza",
    "Sharm El Sheikh",
    "Luxor",
    "Aswan",
    "Hurghada",
    "Mansoura",
    "Port Said",
    "Suez",
    "Tanta",
    "Asyut",
    "Ismailia",
    "Fayoum",
    "Zagazig",
    "Beni Suef",
    "Sohag",
    "Minya",
    "Qena",
    "Damietta",
    "Banha",
    "Kafr El Sheikh",
    "Damanhur",
    "El Mahalla El Kubra",
    "El Arish",
    "Aswan",
    "El Mansoura",
    "El Minya",
    "El Quseir",
    "El Tor",
    "El Wadi El Gedid",
    "Girga",
    "Halaib",
    "Marsa Alam",
    "Marsa Matruh",
    "Nag Hammadi",
    "New Valley",
    "Rafah",
    "Ras Gharib",
    "Ras Sedr",
    "Safaga",
    "Saint Catherine",
    "Siwa Oasis",
    "Sohag",
    "Suez",
    "Tanta",
    "Zagazig",
  ],
};

// Validation messages
export const validationMessages = {
  required: "This field is required.",
  minLength: (length) => `Minimum length should be ${length}.`,
  maxLength: (length) => `Maximum length should be ${length}.`,
  email: "Invalid email address.",
  // Add more validation messages as needed
};

// // Export the validation conditions, valid values, and messages
// export { validationConditions, validValues, validationMessages };
