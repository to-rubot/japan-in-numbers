// Japan in Numbers — all figures embedded, no network. Sources noted on the Sources page section:
// Statistics Bureau of Japan (MIC) Population Census 2020 & monthly estimates 2024; Cabinet Office
// National Accounts; World Bank World Development Indicators; MHLW life tables 2023; MAFF / MLIT land data.
export const KEY = [
  { label: "Population (2024 est.)", value: 123802000, format: "pop", sub: "126,146,099 at the 2020 Census" },
  { label: "Land area", value: 377975, format: "km2", sub: "6,852 islands, 4 main islands" },
  { label: "GDP, nominal (2024)", value: 4.03, format: "usdtn", sub: "4th largest economy in the world" },
  { label: "Life expectancy (2023)", value: 84.0, format: "years", sub: "Women 87.1 · Men 81.1" },
  { label: "Median age", value: 49.9, format: "years1", sub: "Oldest large country on Earth" },
  { label: "Share aged 65+", value: 29.3, format: "pct", sub: "36.2 million people" },
];
export const POP_TREND = [
  [1920,55.96],[1930,64.45],[1940,73.11],[1950,83.20],[1960,94.30],[1970,104.67],
  [1980,117.06],[1990,123.61],[2000,126.93],[2005,127.77],[2010,128.06],[2015,127.09],
  [2020,126.15],[2024,123.80]
];
export const AGEING = [[1970,7.1],[1980,9.1],[1990,12.0],[2000,17.4],[2010,23.0],[2020,28.6],[2024,29.3]];
export const PYRAMID = [ // 2020 Census, millions, [age, male, female]
  ["0–4",2.57,2.44],["5–9",2.72,2.59],["10–14",2.82,2.68],["15–19",2.99,2.84],["20–24",3.13,2.94],
  ["25–29",3.16,2.99],["30–34",3.33,3.18],["35–39",3.67,3.52],["40–44",3.97,3.84],["45–49",4.50,4.38],
  ["50–54",4.07,4.01],["55–59",3.83,3.83],["60–64",3.80,3.90],["65–69",4.07,4.34],["70–74",4.31,4.81],
  ["75–79",3.18,3.85],["80–84",2.28,3.17],["85–89",1.28,2.27],["90+",0.62,1.71]
];
export const GDP_TREND = [[2000,4.97],[2005,4.83],[2010,5.76],[2013,5.21],[2015,4.44],[2019,5.12],[2020,5.05],[2021,5.03],[2022,4.26],[2023,4.21],[2024,4.03]];
export const SECTORS = [
  { name: "Services & other", share: 71.9, color: "#1b4f72" },
  { name: "Manufacturing", share: 19.8, color: "#c0392b" },
  { name: "Construction", share: 5.4, color: "#b7950b" },
  { name: "Agriculture, forestry & fishing", share: 1.1, color: "#1e8449" },
  { name: "Mining & utilities adj.", share: 1.8, color: "#6c3483" },
];
export const TRADE = [ // 2023, ¥ trillion, customs basis approx.
  { name: "Exports — total", v: 100.9 }, { name: "Motor vehicles", v: 17.3 }, { name: "Semiconductors & parts", v: 11.2 },
  { name: "Imports — total", v: 105.9 }, { name: "Mineral fuels", v: 26.4 }, { name: "Electrical machinery (imp.)", v: 13.1 },
];
export const SOCIETY = [
  { label: "Literacy / school enrolment (upper secondary)", v: 98.9, unit: "%" },
  { label: "University advancement rate (2023)", v: 57.7, unit: "%" },
  { label: "Employment rate, ages 15–64 (2023)", v: 79.5, unit: "%" },
  { label: "Women in employment, ages 25–54", v: 81.5, unit: "%" },
  { label: "Households that are single-person (2020)", v: 38.1, unit: "%" },
  { label: "Internet users (2023)", v: 84.0, unit: "%" },
];
export const LANDUSE = [
  { name: "Forest", share: 66.4, color: "#1e8449" }, { name: "Farmland", share: 11.4, color: "#b7950b" },
  { name: "Built-up / residential", share: 5.3, color: "#c0392b" }, { name: "Roads & water & other", share: 16.9, color: "#1b4f72" },
];
// 2020 Census population, area km2 (GSI), capital. Density computed in the app.
export const PREFS = [
 ["Hokkaido","Hokkaido","Sapporo",5224614,83424],["Aomori","Tohoku","Aomori",1237984,9646],["Iwate","Tohoku","Morioka",1210534,15275],
 ["Miyagi","Tohoku","Sendai",2301996,7282],["Akita","Tohoku","Akita",959502,11638],["Yamagata","Tohoku","Yamagata",1068027,9323],
 ["Fukushima","Tohoku","Fukushima",1833152,13784],["Ibaraki","Kanto","Mito",2867009,6097],["Tochigi","Kanto","Utsunomiya",1933146,6408],
 ["Gunma","Kanto","Maebashi",1939110,6362],["Saitama","Kanto","Saitama",7344765,3798],["Chiba","Kanto","Chiba",6284480,5158],
 ["Tokyo","Kanto","Shinjuku, Tokyo",14047594,2194],["Kanagawa","Kanto","Yokohama",9237337,2416],["Niigata","Chubu","Niigata",2201272,12584],
 ["Toyama","Chubu","Toyama",1034814,4248],["Ishikawa","Chubu","Kanazawa",1132526,4186],["Fukui","Chubu","Fukui",766863,4191],
 ["Yamanashi","Chubu","Kofu",810510,4465],["Nagano","Chubu","Nagano",2048011,13562],["Gifu","Chubu","Gifu",1978742,10621],
 ["Shizuoka","Chubu","Shizuoka",3633202,7777],["Aichi","Chubu","Nagoya",7542415,5173],["Mie","Kansai","Tsu",1770254,5774],
 ["Shiga","Kansai","Otsu",1413610,4017],["Kyoto","Kansai","Kyoto",2578087,4612],["Osaka","Kansai","Osaka",8837685,1905],
 ["Hyogo","Kansai","Kobe",5465002,8401],["Nara","Kansai","Nara",1324473,3691],["Wakayama","Kansai","Wakayama",922584,4725],
 ["Tottori","Chugoku","Tottori",553407,3507],["Shimane","Chugoku","Matsue",671126,6708],["Okayama","Chugoku","Okayama",1888432,7115],
 ["Hiroshima","Chugoku","Hiroshima",2799702,8479],["Yamaguchi","Chugoku","Yamaguchi",1342059,6113],["Tokushima","Shikoku","Tokushima",719559,4147],
 ["Kagawa","Shikoku","Takamatsu",950244,1877],["Ehime","Shikoku","Matsuyama",1334841,5676],["Kochi","Shikoku","Kochi",691527,7104],
 ["Fukuoka","Kyushu","Fukuoka",5135214,4987],["Saga","Kyushu","Saga",811442,2441],["Nagasaki","Kyushu","Nagasaki",1312317,4131],
 ["Kumamoto","Kyushu","Kumamoto",1738301,7409],["Oita","Kyushu","Oita",1123852,6341],["Miyazaki","Kyushu","Miyazaki",1069576,7735],
 ["Kagoshima","Kyushu","Kagoshima",1588256,9187],["Okinawa","Kyushu","Naha",1467480,2281],
];
export const QUIZ = [
  { q: "Which prefecture is the most populous?", a: "Tokyo", opts: ["Osaka","Tokyo","Kanagawa","Aichi"] },
  { q: "Roughly what share of Japan's land is forest?", a: "About two thirds", opts: ["About one third","About half","About two thirds","About 90%"] },
  { q: "In what year did Japan's population peak?", a: "2010", opts: ["1990","2000","2010","2020"] },
  { q: "Which prefecture has the lowest population?", a: "Tottori", opts: ["Shimane","Kochi","Tottori","Akita"] },
  { q: "About how many people in Japan are aged 100 or older (2024)?", a: "About 95,000", opts: ["About 9,500","About 95,000","About 950,000","About 9,000"] },
];
export const FACTS = [
  "Japan counted 95,119 centenarians in September 2024 — up from just 153 in 1963.",
  "Greater Tokyo, at about 37 million people, is the largest metropolitan area on Earth.",
  "Forest covers 66% of Japan — one of the highest shares of any industrialised country.",
  "The 2020 Census counted 126,146,099 people in 55.7 million households.",
  "Shinkansen trains have carried over 10 billion passengers since 1964 with zero fatal derailments.",
  "Okinawa's life expectancy and share of centenarians are among the highest ever recorded.",
];
