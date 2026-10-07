export interface CityInfo {
  name: string;
  province: string;
  popular?: boolean;
}

export const PAKISTAN_PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Azad Jammu & Kashmir",
  "Gilgit-Baltistan",
] as const;

export const PAKISTAN_CITIES: CityInfo[] = [
  // Major / Most Popular Cities
  { name: "Lahore", province: "Punjab", popular: true },
  { name: "Karachi", province: "Sindh", popular: true },
  { name: "Islamabad", province: "Islamabad Capital Territory", popular: true },
  { name: "Rawalpindi", province: "Punjab", popular: true },
  { name: "Faisalabad", province: "Punjab", popular: true },
  { name: "Multan", province: "Punjab", popular: true },
  { name: "Peshawar", province: "Khyber Pakhtunkhwa", popular: true },
  { name: "Quetta", province: "Balochistan", popular: true },
  { name: "Sialkot", province: "Punjab", popular: true },
  { name: "Gujranwala", province: "Punjab", popular: true },
  { name: "Hyderabad", province: "Sindh", popular: true },
  { name: "Bahawalpur", province: "Punjab", popular: true },
  { name: "Sargodha", province: "Punjab", popular: true },
  { name: "Sukkur", province: "Sindh", popular: true },
  { name: "Gujrat", province: "Punjab", popular: true },
  { name: "Sheikhupura", province: "Punjab", popular: true },
  { name: "Sahiwal", province: "Punjab", popular: true },
  { name: "Jhang", province: "Punjab", popular: true },
  { name: "Rahim Yar Khan", province: "Punjab", popular: true },
  { name: "Kasur", province: "Punjab", popular: true },
  { name: "Mardan", province: "Khyber Pakhtunkhwa", popular: true },
  { name: "Abbottabad", province: "Khyber Pakhtunkhwa", popular: true },

  // Punjab
  { name: "Attock", province: "Punjab" },
  { name: "Bahawalnagar", province: "Punjab" },
  { name: "Bhakkar", province: "Punjab" },
  { name: "Burewala", province: "Punjab" },
  { name: "Chakwal", province: "Punjab" },
  { name: "Chichawatni", province: "Punjab" },
  { name: "Chiniot", province: "Punjab" },
  { name: "Chishtian", province: "Punjab" },
  { name: "Daska", province: "Punjab" },
  { name: "Dera Ghazi Khan", province: "Punjab" },
  { name: "Gojra", province: "Punjab" },
  { name: "Hafizabad", province: "Punjab" },
  { name: "Haroonabad", province: "Punjab" },
  { name: "Hasilpur", province: "Punjab" },
  { name: "Jalalpur Jattan", province: "Punjab" },
  { name: "Jaranwala", province: "Punjab" },
  { name: "Jhelum", province: "Punjab" },
  { name: "Kamalia", province: "Punjab" },
  { name: "Kamoke", province: "Punjab" },
  { name: "Khanewal", province: "Punjab" },
  { name: "Khanpur", province: "Punjab" },
  { name: "Kharian", province: "Punjab" },
  { name: "Khushab", province: "Punjab" },
  { name: "Kot Addu", province: "Punjab" },
  { name: "Layyah", province: "Punjab" },
  { name: "Liaquatpur", province: "Punjab" },
  { name: "Lodhran", province: "Punjab" },
  { name: "Mandi Bahauddin", province: "Punjab" },
  { name: "Mian Channu", province: "Punjab" },
  { name: "Mianwali", province: "Punjab" },
  { name: "Muridke", province: "Punjab" },
  { name: "Murree", province: "Punjab" },
  { name: "Muzaffargarh", province: "Punjab" },
  { name: "Nankana Sahib", province: "Punjab" },
  { name: "Narowal", province: "Punjab" },
  { name: "Okara", province: "Punjab" },
  { name: "Pakpattan", province: "Punjab" },
  { name: "Pasrur", province: "Punjab" },
  { name: "Pattoki", province: "Punjab" },
  { name: "Raiwind", province: "Punjab" },
  { name: "Rajanpur", province: "Punjab" },
  { name: "Rawat", province: "Punjab" },
  { name: "Sadiqabad", province: "Punjab" },
  { name: "Sambrial", province: "Punjab" },
  { name: "Samundri", province: "Punjab" },
  { name: "Shahkot", province: "Punjab" },
  { name: "Shakargarh", province: "Punjab" },
  { name: "Shorkot", province: "Punjab" },
  { name: "Shujabad", province: "Punjab" },
  { name: "Taxila", province: "Punjab" },
  { name: "Toba Tek Singh", province: "Punjab" },
  { name: "Vehari", province: "Punjab" },
  { name: "Wah Cantt", province: "Punjab" },
  { name: "Wazirabad", province: "Punjab" },

  // Sindh
  { name: "Badin", province: "Sindh" },
  { name: "Dadu", province: "Sindh" },
  { name: "Ghotki", province: "Sindh" },
  { name: "Jacobabad", province: "Sindh" },
  { name: "Jamshoro", province: "Sindh" },
  { name: "Kandhkot", province: "Sindh" },
  { name: "Kashmore", province: "Sindh" },
  { name: "Khairpur", province: "Sindh" },
  { name: "Kotri", province: "Sindh" },
  { name: "Larkana", province: "Sindh" },
  { name: "Matli", province: "Sindh" },
  { name: "Mehar", province: "Sindh" },
  { name: "Mirpur Khas", province: "Sindh" },
  { name: "Moro", province: "Sindh" },
  { name: "Nasirabad", province: "Sindh" },
  { name: "Naushahro Feroze", province: "Sindh" },
  { name: "Nawabshah (Shaheed Benazirabad)", province: "Sindh" },
  { name: "Rohri", province: "Sindh" },
  { name: "Sanghar", province: "Sindh" },
  { name: "Sehwan", province: "Sindh" },
  { name: "Shahdadkot", province: "Sindh" },
  { name: "Shikarpur", province: "Sindh" },
  { name: "Tando Adam", province: "Sindh" },
  { name: "Tando Allahyar", province: "Sindh" },
  { name: "Tando Muhammad Khan", province: "Sindh" },
  { name: "Thatta", province: "Sindh" },
  { name: "Umerkot", province: "Sindh" },

  // Khyber Pakhtunkhwa (KPK)
  { name: "Bannu", province: "Khyber Pakhtunkhwa" },
  { name: "Batkhela", province: "Khyber Pakhtunkhwa" },
  { name: "Charsadda", province: "Khyber Pakhtunkhwa" },
  { name: "Chitral", province: "Khyber Pakhtunkhwa" },
  { name: "Dera Ismail Khan", province: "Khyber Pakhtunkhwa" },
  { name: "Dir", province: "Khyber Pakhtunkhwa" },
  { name: "Hangu", province: "Khyber Pakhtunkhwa" },
  { name: "Haripur", province: "Khyber Pakhtunkhwa" },
  { name: "Karak", province: "Khyber Pakhtunkhwa" },
  { name: "Kohat", province: "Khyber Pakhtunkhwa" },
  { name: "Kohistan", province: "Khyber Pakhtunkhwa" },
  { name: "Lakki Marwat", province: "Khyber Pakhtunkhwa" },
  { name: "Malakand", province: "Khyber Pakhtunkhwa" },
  { name: "Mansehra", province: "Khyber Pakhtunkhwa" },
  { name: "Mingora (Swat)", province: "Khyber Pakhtunkhwa" },
  { name: "Nowshera", province: "Khyber Pakhtunkhwa" },
  { name: "Risalpur", province: "Khyber Pakhtunkhwa" },
  { name: "Swabi", province: "Khyber Pakhtunkhwa" },
  { name: "Tank", province: "Khyber Pakhtunkhwa" },
  { name: "Timergara", province: "Khyber Pakhtunkhwa" },

  // Balochistan
  { name: "Chaman", province: "Balochistan" },
  { name: "Dera Allah Yar", province: "Balochistan" },
  { name: "Dera Murad Jamali", province: "Balochistan" },
  { name: "Gwadar", province: "Balochistan" },
  { name: "Hub", province: "Balochistan" },
  { name: "Jafarabad", province: "Balochistan" },
  { name: "Kalat", province: "Balochistan" },
  { name: "Kharan", province: "Balochistan" },
  { name: "Khuzdar", province: "Balochistan" },
  { name: "Loralai", province: "Balochistan" },
  { name: "Mastang", province: "Balochistan" },
  { name: "Nushki", province: "Balochistan" },
  { name: "Ormara", province: "Balochistan" },
  { name: "Pasni", province: "Balochistan" },
  { name: "Pishin", province: "Balochistan" },
  { name: "Sibi", province: "Balochistan" },
  { name: "Turbat", province: "Balochistan" },
  { name: "Usta Mohammad", province: "Balochistan" },
  { name: "Zhob", province: "Balochistan" },
  { name: "Ziarat", province: "Balochistan" },

  // Azad Jammu & Kashmir (AJK)
  { name: "Bagh", province: "Azad Jammu & Kashmir" },
  { name: "Bhimber", province: "Azad Jammu & Kashmir" },
  { name: "Kotli", province: "Azad Jammu & Kashmir" },
  { name: "Mirpur (AJK)", province: "Azad Jammu & Kashmir" },
  { name: "Muzaffarabad", province: "Azad Jammu & Kashmir" },
  { name: "Rawalakot", province: "Azad Jammu & Kashmir" },

  // Gilgit-Baltistan
  { name: "Aliabad", province: "Gilgit-Baltistan" },
  { name: "Astore", province: "Gilgit-Baltistan" },
  { name: "Chilas", province: "Gilgit-Baltistan" },
  { name: "Ghanche", province: "Gilgit-Baltistan" },
  { name: "Gilgit", province: "Gilgit-Baltistan" },
  { name: "Hunza", province: "Gilgit-Baltistan" },
  { name: "Nagar", province: "Gilgit-Baltistan" },
  { name: "Skardu", province: "Gilgit-Baltistan" },
];

export function searchCities(query: string): CityInfo[] {
  const clean = query.trim().toLowerCase();
  if (!clean) {
    return PAKISTAN_CITIES.filter((c) => c.popular);
  }

  // Exact starts-with first, then includes
  const startsWith = PAKISTAN_CITIES.filter((c) =>
    c.name.toLowerCase().startsWith(clean)
  );
  const includes = PAKISTAN_CITIES.filter(
    (c) =>
      !c.name.toLowerCase().startsWith(clean) &&
      (c.name.toLowerCase().includes(clean) ||
        c.province.toLowerCase().includes(clean))
  );

  return [...startsWith, ...includes].slice(0, 15);
}

export function findCity(name: string): CityInfo | undefined {
  if (!name) return undefined;
  const clean = name.trim().toLowerCase();
  return PAKISTAN_CITIES.find(
    (c) =>
      c.name.toLowerCase() === clean ||
      c.name.toLowerCase().startsWith(clean) ||
      clean.startsWith(c.name.toLowerCase())
  );
}
