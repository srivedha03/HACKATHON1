import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = {
  code: string;
  name: string;
};

export const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" }, // Hindi
  { code: "kn", name: "ಕನ್ನಡ" }, // Kannada
  { code: "ta", name: "தமிழ்" }, // Tamil
  { code: "te", name: "తెలుగు" }, // Telugu
  { code: "ml", name: "മലയാളം" }, // Malayalam
];

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// const translations: Record<string, Record<string, string>> = {
//   "en": {
//     "home": "Home",
//     "explore": "Explore",
//     "storyshare": "StoryShare",
//     "shoplocal": "MyShop",
//     "travelbuddy": "Travel Buddy",
//     "badges": "Badges",
//     "startexploring": "Start Exploring",
//     "footer.discoverheritage": "Discover Hidden Heritage. Empower Communities. Travel with Purpose.",
//     "footer.explorehead": "Explore",
//     "footer.heritagesites": "Heritage Sites",
//     "footer.culturalstories": "Cultural Stories",
//     "footer.artisanproducts": "Artisan Products",
//     "footer.findcotravelers": "Find Co-Travelers",
//     "footer.sustainabletourism": "Sustainable Tourism",
//     "footer.resourceshead": "Resources",
//     "footer.aboutus": "About Us",
//     "footer.ourmission": "Our Mission",
//     "footer.termsofservice": "Terms of Service",
//     "footer.privacypolicy": "Privacy Policy",
//     "footer.contactus": "Contact Us",
//     "footer.newsletterhead": "Newsletter",
//     "footer.newsletterdesc": "Subscribe to our newsletter for the latest updates on cultural heritage sites and local events.",
//     "footer.youremail": "Your email",
//     "footer.subscribe": "Subscribe",
//     "footer.allrightsreserved": "All rights reserved.",
//     "footer.madewith": "Made with 💖 by Team COSMIC",
//     // New features translations
//     "culturalknowledge": "Cultural Knowledge Graph",
//     "interactivemapping": "Interactive Cultural Mapping",
//     "educationalnetwork": "Educational Institution Network",
//   },
//   "hi": {
//     "home": "होम",
//     "explore": "एक्सप्लोर",
//     "storyshare": "कहानियां",
//     "shoplocal": "लोकल शॉप",
//     "travelbuddy": "यात्रा साथी",
//     "badges": "बैज",
//     "startexploring": "एक्सप्लोर शुरू करें",
//     "footer.discoverheritage": "छुपी विरासत को खोजें। समुदायों को सशक्त बनाएं। उद्देश्य के साथ यात्रा करें।",
//     "footer.explorehead": "एक्सप्लोर",
//     "footer.heritagesites": "विरासत स्थल",
//     "footer.culturalstories": "सांस्कृतिक कहानियां",
//     "footer.artisanproducts": "कारीगर उत्पाद",
//     "footer.findcotravelers": "सह-यात्री खोजें",
//     "footer.sustainabletourism": "सस्टेनेबल पर्यटन",
//     "footer.resourceshead": "संसाधन",
//     "footer.aboutus": "हमारे बारे में",
//     "footer.ourmission": "हमारा मिशन",
//     "footer.termsofservice": "सेवा की शर्तें",
//     "footer.privacypolicy": "गोपनीयता नीति",
//     "footer.contactus": "संपर्क करें",
//     "footer.newsletterhead": "न्यूज़लेटर",
//     "footer.newsletterdesc": "सांस्कृतिक विरासत स्थलों और स्थानीय कार्यक्रमों के बारे में नवीनतम अपडेट के लिए हमारे न्यूज़लेटर की सदस्यता लें।",
//     "footer.youremail": "आपका ईमेल",
//     "footer.subscribe": "सदस्यता लें",
//     "footer.allrightsreserved": "सर्वाधिकार सुरक्षित।",
//     "footer.madewith": "सांस्कृतिक विरासत को संरक्षित करने के लिए 💖 के साथ बनाया गया",
//     // New features translations
//     "culturalknowledge": "सांस्कृतिक ज्ञान ग्राफ",
//     "interactivemapping": "इंटरैक्टिव सांस्कृतिक मैपिंग",
//     "educationalnetwork": "शैक्षिक संस्थान नेटवर्क",
//   },
//   "kn": {
//     "home": "ಮುಖಪುಟ",
//     "explore": "ಅನ್ವೇಷಿಸಿ",
//     "storyshare": "ಕಥೆಗಳು",
//     "shoplocal": "ಸ್ಥಳೀಯ ಅಂಗಡಿ",
//     "travelbuddy": "ಪ್ರಯಾಣ ಸಂಗಾತಿ",
//     "badges": "ಬ್ಯಾಡ್ಜ್‌ಗಳು",
//     "startexploring": "ಅನ್ವೇಷಿಸಲು ಪ್ರಾರಂಭಿಸಿ",
//     "footer.discoverheritage": "ಅಡಗಿರುವ ಪರಂಪರೆಯನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ. ಸಮುದಾಯಗಳನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸಿ. ಉದ್ದೇಶದೊಂದಿಗೆ ಪ್ರಯಾಣಿಸಿ.",
//     "footer.explorehead": "ಅನ್ವೇಷಿಸಿ",
//     "footer.heritagesites": "ಪರಂಪರೆಯ ತಾಣಗಳು",
//     "footer.culturalstories": "ಸಾಂಸ್ಕೃತಿಕ ಕಥೆಗಳು",
//     "footer.artisanproducts": "ಕುಶಲಕರ್ಮಿ ಉತ್ಪನ್ನಗಳು",
//     "footer.findcotravelers": "ಸಹ-ಪ್ರಯಾಣಿಕರನ್ನು ಹುಡುಕಿ",
//     "footer.sustainabletourism": "ಸುಸ್ಥಿರ ಪ್ರವಾಸೋದ್ಯಮ",
//     "footer.resourceshead": "ಸಂಪನ್ಮೂಲಗಳು",
//     "footer.aboutus": "ನಮ್ಮ ಬಗ್ಗೆ",
//     "footer.ourmission": "ನಮ್ಮ ಮಿಷನ್",
//     "footer.termsofservice": "ಸೇವಾ ನಿಯಮಗಳು",
//     "footer.privacypolicy": "ಗೌಪ್ಯತಾ ನೀತಿ",
//     "footer.contactus": "ಸಂಪರ್ಕಿಸಿ",
//     "footer.newsletterhead": "ನ್ಯೂಸ್‌ಲೆಟರ್",
//     "footer.newsletterdesc": "ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯ ತಾಣಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಕಾರ್ಯಕ್ರಮಗಳ ಬಗ್ಗೆ ಇತ್ತೀಚಿನ ಅಪ್‌ಡೇಟ್‌ಗಳಿಗಾಗಿ ನಮ್ಮ ನ್ಯೂಸ್‌ಲೆಟರ್‌ಗೆ ಚಂದಾದಾರರಾಗಿ.",
//     "footer.youremail": "ನಿಮ್ಮ ಇಮೇಲ್",
//     "footer.subscribe": "ಚಂದಾದಾರರಾಗಿ",
//     "footer.allrightsreserved": "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
//     "footer.madewith": "ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯನ್ನು ಸಂರಕ್ಷಿಸಲು 💖 ನೊಂದಿಗೆ ಮಾಡಲಾಗಿದೆ",
//     // New features translations
//     "culturalknowledge": "ಸಾಂಸ್ಕೃತಿಕ ಜ್ಞಾನ ಗ್ರಾಫ್",
//     "interactivemapping": "ಸಂವಾದಾತ್ಮಕ ಸಾಂಸ್ಕೃತಿಕ ಮ್ಯಾಪಿಂಗ್",
//     "educationalnetwork": "ಶೈಕ್ಷಣಿಕ ಸಂಸ್ಥೆ ನೆಟ್ವರ್ಕ್",
//   },
//   // Add more translations for other languages similarly...
// };
// const translations: Record<string, Record<string, string>> = {
//   "en": {
//     "home": "Home",
//     "explore": "Explore",
//     "storyshare": "StoryShare",
//     "shoplocal": "MyShop",
//     "travelbuddy": "Travel Buddy",
//     "badges": "Badges",
//     "startexploring": "Start Exploring",
//     "footer.discoverheritage": "Discover Hidden Heritage. Empower Communities. Travel with Purpose.",
//     "footer.explorehead": "Explore",
//     "footer.heritagesites": "Heritage Sites",
//     "footer.culturalstories": "Cultural Stories",
//     "footer.artisanproducts": "Artisan Products",
//     "footer.findcotravelers": "Find Co-Travelers",
//     "footer.sustainabletourism": "Sustainable Tourism",
//     "footer.resourceshead": "Resources",
//     "footer.aboutus": "About Us",
//     "footer.ourmission": "Our Mission",
//     "footer.termsofservice": "Terms of Service",
//     "footer.privacypolicy": "Privacy Policy",
//     "footer.contactus": "Contact Us",
//     "footer.newsletterhead": "Newsletter",
//     "footer.newsletterdesc": "Subscribe to our newsletter for the latest updates on cultural heritage sites and local events.",
//     "footer.youremail": "Your email",
//     "footer.subscribe": "Subscribe",
//     "footer.allrightsreserved": "All rights reserved.",
//     "footer.madewith": "Made with 💖 by Team COSMIC",
//     "culturalknowledge": "Cultural Knowledge Graph",
//     "interactivemapping": "Interactive Cultural Mapping",
//     "educationalnetwork": "Educational Institution Network"
//   },

//   "hi": {
//     "home": "होम",
//     "explore": "एक्सप्लोर",
//     "storyshare": "कहानियां",
//     "shoplocal": "लोकल शॉप",
//     "travelbuddy": "यात्रा साथी",
//     "badges": "बैज",
//     "startexploring": "एक्सप्लोर शुरू करें",
//     "footer.discoverheritage": "छुपी विरासत को खोजें। समुदायों को सशक्त बनाएं। उद्देश्य के साथ यात्रा करें।",
//     "footer.explorehead": "एक्सप्लोर",
//     "footer.heritagesites": "विरासत स्थल",
//     "footer.culturalstories": "सांस्कृतिक कहानियां",
//     "footer.artisanproducts": "कारीगर उत्पाद",
//     "footer.findcotravelers": "सह-यात्री खोजें",
//     "footer.sustainabletourism": "सस्टेनेबल पर्यटन",
//     "footer.resourceshead": "संसाधन",
//     "footer.aboutus": "हमारे बारे में",
//     "footer.ourmission": "हमारा मिशन",
//     "footer.termsofservice": "सेवा की शर्तें",
//     "footer.privacypolicy": "गोपनीयता नीति",
//     "footer.contactus": "संपर्क करें",
//     "footer.newsletterhead": "न्यूज़लेटर",
//     "footer.newsletterdesc": "सांस्कृतिक विरासत स्थलों और स्थानीय कार्यक्रमों के बारे में नवीनतम अपडेट के लिए हमारे न्यूज़लेटर की सदस्यता लें।",
//     "footer.youremail": "आपका ईमेल",
//     "footer.subscribe": "सदस्यता लें",
//     "footer.allrightsreserved": "सर्वाधिकार सुरक्षित।",
//     "footer.madewith": "सांस्कृतिक विरासत को संरक्षित करने के लिए 💖 के साथ बनाया गया",
//     "culturalknowledge": "सांस्कृतिक ज्ञान ग्राफ",
//     "interactivemapping": "इंटरैक्टिव सांस्कृतिक मैपिंग",
//     "educationalnetwork": "शैक्षिक संस्थान नेटवर्क"
//   },

//   "te": {
//     "home": "హోమ్",
//     "explore": "అన్వేషించండి",
//     "storyshare": "కథలు",
//     "shoplocal": "స్థానిక షాప్",
//     "travelbuddy": "ప్రయాణ మిత్రుడు",
//     "badges": "బ్యాడ్జ్లు",
//     "startexploring": "అన్వేషణ ప్రారంభించండి",
//     "footer.discoverheritage": "దాగి ఉన్న వారసత్వాన్ని కనుగొనండి. సముదాయాలను శక్తివంతం చేయండి. లక్ష్యంతో ప్రయాణించండి.",
//     "footer.explorehead": "అన్వేషించండి",
//     "footer.heritagesites": "పారంపర్య స్థలాలు",
//     "footer.culturalstories": "సాంస్కృతిక కథలు",
//     "footer.artisanproducts": "కార్మిక ఉత్పత్తులు",
//     "footer.findcotravelers": "ప్రయాణ భాగస్వాములను కనుగొనండి",
//     "footer.sustainabletourism": "సస్టెయినబుల్ టూరిజం",
//     "footer.resourceshead": "వనరులు",
//     "footer.aboutus": "మన గురించి",
//     "footer.ourmission": "మన లక్ష్యం",
//     "footer.termsofservice": "సేవా నిబంధనలు",
//     "footer.privacypolicy": "గోప్యతా విధానం",
//     "footer.contactus": "సంప్రదించండి",
//     "footer.newsletterhead": "న్యూస్‌లెటర్",
//     "footer.newsletterdesc": "పారంపర్య స్థలాలు మరియు స్థానిక కార్యక్రమాల తాజా సమాచారం కోసం మా న్యూస్‌లెటర్‌కు సభ్యత్వం పొందండి.",
//     "footer.youremail": "మీ ఇమెయిల్",
//     "footer.subscribe": "చందా పొందండి",
//     "footer.allrightsreserved": "అన్ని హక్కులు ఉంచబడ్డాయి.",
//     "footer.madewith": "పారంపర్యాన్ని సంరక్షించడానికి 💖తో తయారైంది",
//     "culturalknowledge": "సాంస్కృతిక జ్ఞాన గ్రాఫ్",
//     "interactivemapping": "ఇంటరాక్టివ్ సాంస్కృతిక మ్యాపింగ్",
//     "educationalnetwork": "విద్యా సంస్థల నెట్‌వర్క్"
//   },

//   "mr": {
//     "home": "मुख्यपृष्ठ",
//     "explore": "अन्वेषण करा",
//     "storyshare": "कथा",
//     "shoplocal": "स्थानिक दुकान",
//     "travelbuddy": "प्रवास साथी",
//     "badges": "बॅजेस",
//     "startexploring": "अन्वेषण सुरू करा",
//     "footer.discoverheritage": "लपलेली परंपरा शोधा. समुदायांना सक्षम करा. उद्देशाने प्रवास करा.",
//     "footer.explorehead": "अन्वेषण",
//     "footer.heritagesites": "वारसा स्थळे",
//     "footer.culturalstories": "सांस्कृतिक कथा",
//     "footer.artisanproducts": "कारागीर उत्पादने",
//     "footer.findcotravelers": "सहप्रवासी शोधा",
//     "footer.sustainabletourism": "शाश्वत पर्यटन",
//     "footer.resourceshead": "स्रोत",
//     "footer.aboutus": "आमच्याबद्दल",
//     "footer.ourmission": "आमचे ध्येय",
//     "footer.termsofservice": "सेवेच्या अटी",
//     "footer.privacypolicy": "गोपनीयता धोरण",
//     "footer.contactus": "संपर्क करा",
//     "footer.newsletterhead": "न्यूजलेटर",
//     "footer.newsletterdesc": "वारसा स्थळे आणि स्थानिक कार्यक्रमांबाबत ताज्या बातम्यांसाठी आमच्या न्यूजलेटरसाठी सदस्यता घ्या.",
//     "footer.youremail": "तुमचा ईमेल",
//     "footer.subscribe": "सदस्यता घ्या",
//     "footer.allrightsreserved": "सर्व हक्क राखीव.",
//     "footer.madewith": "वारसा जपण्यासाठी 💖 सह बनवलेले",
//     "culturalknowledge": "सांस्कृतिक ज्ञान ग्राफ",
//     "interactivemapping": "इंटरॲक्टिव सांस्कृतिक मॅपिंग",
//     "educationalnetwork": "शैक्षणिक संस्थांचे नेटवर्क"
//   },

//   "kn": {
//     "home": "ಮುಖಪುಟ",
//     "explore": "ಅನ್ವೇಷಿಸಿ",
//     "storyshare": "ಕಥೆಗಳು",
//     "shoplocal": "ಸ್ಥಳೀಯ ಅಂಗಡಿ",
//     "travelbuddy": "ಪ್ರಯಾಣ ಸಂಗಾತಿ",
//     "badges": "ಬ್ಯಾಡ್ಜ್‌ಗಳು",
//     "startexploring": "ಅನ್ವೇಷಿಸಲು ಪ್ರಾರಂಭಿಸಿ",
//     "footer.discoverheritage": "ಅಡಗಿರುವ ಪರಂಪರೆಯನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ. ಸಮುದಾಯಗಳನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸಿ. ಉದ್ದೇಶದೊಂದಿಗೆ ಪ್ರಯಾಣಿಸಿ.",
//     "footer.explorehead": "ಅನ್ವೇಷಿಸಿ",
//     "footer.heritagesites": "ಪರಂಪರೆಯ ತಾಣಗಳು",
//     "footer.culturalstories": "ಸಾಂಸ್ಕೃತಿಕ ಕಥೆಗಳು",
//     "footer.artisanproducts": "ಕುಶಲಕರ್ಮಿ ಉತ್ಪನ್ನಗಳು",
//     "footer.findcotravelers": "ಸಹ-ಪ್ರಯಾಣಿಕರನ್ನು ಹುಡುಕಿ",
//     "footer.sustainabletourism": "ಸುಸ್ಥಿರ ಪ್ರವಾಸೋದ್ಯಮ",
//     "footer.resourceshead": "ಸಂಪನ್ಮೂಲಗಳು",
//     "footer.aboutus": "ನಮ್ಮ ಬಗ್ಗೆ",
//     "footer.ourmission": "ನಮ್ಮ ಮಿಷನ್",
//     "footer.termsofservice": "ಸೇವಾ ನಿಯಮಗಳು",
//     "footer.privacypolicy": "ಗೌಪ್ಯತಾ ನೀತಿ",
//     "footer.contactus": "ಸಂಪರ್ಕಿಸಿ",
//     "footer.newsletterhead": "ನ್ಯೂಸ್‌ಲೆಟರ್",
//     "footer.newsletterdesc": "ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯ ತಾಣಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಕಾರ್ಯಕ್ರಮಗಳ ಬಗ್ಗೆ ಇತ್ತೀಚಿನ ಅಪ್‌ಡೇಟ್‌ಗಳಿಗಾಗಿ ನಮ್ಮ ನ್ಯೂಸ್‌ಲೆಟರ್‌ಗೆ ಚಂದಾದಾರರಾಗಿ.",
//     "footer.youremail": "ನಿಮ್ಮ ಇಮೇಲ್",
//     "footer.subscribe": "ಚಂದಾದಾರರಾಗಿ",
//     "footer.allrightsreserved": "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
//     "footer.madewith": "ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯನ್ನು ಸಂರಕ್ಷಿಸಲು 💖 ನೊಂದಿಗೆ ಮಾಡಲಾಗಿದೆ",
//     "culturalknowledge": "ಸಾಂಸ್ಕೃತಿಕ ಜ್ಞಾನ ಗ್ರಾಫ್",
//     "interactivemapping": "ಸಂವಾದಾತ್ಮಕ ಸಾಂಸ್ಕೃತಿಕ ಮ್ಯಾಪಿಂಗ್",
//     "educationalnetwork": "ಶೈಕ್ಷಣಿಕ ಸಂಸ್ಥೆ ನೆಟ್ವರ್ಕ್"
//   }

// };

// Default fallback for languages that don't have full translations yet
// const fallbackLanguages: Record<string, string> = {
//   "ta": "en",
//   "te": "en",
//   "ml": "en"
// };
const translations: Record<string, Record<string, string>> = {
  en: {
    home: "Home",
    explore: "Explore",
    storyshare: "StoryShare",
    shoplocal: "MyShop",
    travelbuddy: "Travel Buddy",
    badges: "Badges",
    startexploring: "Start Exploring",
    "footer.discoverheritage":
      "Discover Hidden Heritage. Empower Communities. Travel with Purpose.",
    "footer.explorehead": "Explore",
    "footer.heritagesites": "Heritage Sites",
    "footer.culturalstories": "Cultural Stories",
    "footer.artisanproducts": "Artisan Products",
    "footer.findcotravelers": "Find Co-Travelers",
    "footer.sustainabletourism": "Sustainable Tourism",
    "footer.resourceshead": "Resources",
    "footer.aboutus": "About Us",
    "footer.ourmission": "Our Mission",
    "footer.termsofservice": "Terms of Service",
    "footer.privacypolicy": "Privacy Policy",
    "footer.contactus": "Contact Us",
    "footer.newsletterhead": "Newsletter",
    "footer.newsletterdesc":
      "Subscribe to our newsletter for the latest updates on cultural heritage sites and local events.",
    "footer.youremail": "Your email",
    "footer.subscribe": "Subscribe",
    "footer.allrightsreserved": "All rights reserved.",
    "footer.madewith": "Made with 💖 by Team COSMIC",
    culturalknowledge: "Cultural Knowledge Graph",
    interactivemapping: "Interactive Cultural Mapping",
    educationalnetwork: "Educational Institution Network",
  },

  hi: {
    home: "होम",
    explore: "एक्सप्लोर",
    storyshare: "कहानियां",
    shoplocal: "लोकल शॉप",
    travelbuddy: "यात्रा साथी",
    badges: "बैज",
    startexploring: "एक्सप्लोर शुरू करें",
    "footer.discoverheritage":
      "छुपी विरासत को खोजें। समुदायों को सशक्त बनाएं। उद्देश्य के साथ यात्रा करें।",
    "footer.explorehead": "एक्सप्लोर",
    "footer.heritagesites": "विरासत स्थल",
    "footer.culturalstories": "सांस्कृतिक कहानियां",
    "footer.artisanproducts": "कारीगर उत्पाद",
    "footer.findcotravelers": "सह-यात्री खोजें",
    "footer.sustainabletourism": "सस्टेनेबल पर्यटन",
    "footer.resourceshead": "संसाधन",
    "footer.aboutus": "हमारे बारे में",
    "footer.ourmission": "हमारा मिशन",
    "footer.termsofservice": "सेवा की शर्तें",
    "footer.privacypolicy": "गोपनीयता नीति",
    "footer.contactus": "संपर्क करें",
    "footer.newsletterhead": "न्यूज़लेटर",
    "footer.newsletterdesc":
      "सांस्कृतिक विरासत स्थलों और स्थानीय कार्यक्रमों के बारे में नवीनतम अपडेट के लिए हमारे न्यूज़लेटर की सदस्यता लें।",
    "footer.youremail": "आपका ईमेल",
    "footer.subscribe": "सदस्यता लें",
    "footer.allrightsreserved": "सर्वाधिकार सुरक्षित।",
    "footer.madewith":
      "सांस्कृतिक विरासत को संरक्षित करने के लिए 💖 के साथ बनाया गया",
    culturalknowledge: "सांस्कृतिक ज्ञान ग्राफ",
    interactivemapping: "इंटरैक्टिव सांस्कृतिक मैपिंग",
    educationalnetwork: "शैक्षिक संस्थान नेटवर्क",
  },

  te: {
    home: "హోమ్",
    explore: "అన్వేషించండి",
    storyshare: "కథలు",
    shoplocal: "స్థానిక షాప్",
    travelbuddy: "ప్రయాణ మిత్రుడు",
    badges: "బ్యాడ్జ్లు",
    startexploring: "అన్వేషణ ప్రారంభించండి",
    "footer.discoverheritage":
      "దాగి ఉన్న వారసత్వాన్ని కనుగొనండి. సముదాయాలను శక్తివంతం చేయండి. లక్ష్యంతో ప్రయాణించండి.",
    "footer.explorehead": "అన్వేషించండి",
    "footer.heritagesites": "పారంపర్య స్థలాలు",
    "footer.culturalstories": "సాంస్కృతిక కథలు",
    "footer.artisanproducts": "కార్మిక ఉత్పత్తులు",
    "footer.findcotravelers": "ప్రయాణ భాగస్వాములను కనుగొనండి",
    "footer.sustainabletourism": "సస్టెయినబుల్ టూరిజం",
    "footer.resourceshead": "వనరులు",
    "footer.aboutus": "మన గురించి",
    "footer.ourmission": "మన లక్ష్యం",
    "footer.termsofservice": "సేవా నిబంధనలు",
    "footer.privacypolicy": "గోప్యతా విధానం",
    "footer.contactus": "సంప్రదించండి",
    "footer.newsletterhead": "న్యూస్‌లెటర్",
    "footer.newsletterdesc":
      "పారంపర్య స్థలాలు మరియు స్థానిక కార్యక్రమాల తాజా సమాచారం కోసం మా న్యూస్‌లెటర్‌కు సభ్యత్వం పొందండి.",
    "footer.youremail": "మీ ఇమెయిల్",
    "footer.subscribe": "చందా పొందండి",
    "footer.allrightsreserved": "అన్ని హక్కులు ఉంచబడ్డాయి.",
    "footer.madewith": "పారంపర్యాన్ని సంరక్షించడానికి 💖తో తయారైంది",
    culturalknowledge: "సాంస్కృతిక జ్ఞాన గ్రాఫ్",
    interactivemapping: "ఇంటరాక్టివ్ సాంస్కృతిక మ్యాపింగ్",
    educationalnetwork: "విద్యా సంస్థల నెట్‌వర్క్",
  },

  kn: {
    home: "ಮುಖಪುಟ",
    explore: "ಅನ್ವೇಷಿಸಿ",
    storyshare: "ಕಥೆಗಳು",
    shoplocal: "ಸ್ಥಳೀಯ ಅಂಗಡಿ",
    travelbuddy: "ಪ್ರಯಾಣ ಸಂಗಾತಿ",
    badges: "ಬ್ಯಾಡ್ಜ್‌ಗಳು",
    startexploring: "ಅನ್ವೇಷಿಸಲು ಪ್ರಾರಂಭಿಸಿ",
    "footer.discoverheritage":
      "ಅಡಗಿರುವ ಪರಂಪರೆಯನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ. ಸಮುದಾಯಗಳನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸಿ. ಉದ್ದೇಶದೊಂದಿಗೆ ಪ್ರಯಾಣಿಸಿ.",
    "footer.explorehead": "ಅನ್ವೇಷಿಸಿ",
    "footer.heritagesites": "ಪರಂಪರೆಯ ತಾಣಗಳು",
    "footer.culturalstories": "ಸಾಂಸ್ಕೃತಿಕ ಕಥೆಗಳು",
    "footer.artisanproducts": "ಕುಶಲಕರ್ಮಿ ಉತ್ಪನ್ನಗಳು",
    "footer.findcotravelers": "ಸಹ-ಪ್ರಯಾಣಿಕರನ್ನು ಹುಡುಕಿ",
    "footer.sustainabletourism": "ಸುಸ್ಥಿರ ಪ್ರವಾಸೋದ್ಯಮ",
    "footer.resourceshead": "ಸಂಪನ್ಮೂಲಗಳು",
    "footer.aboutus": "ನಮ್ಮ ಬಗ್ಗೆ",
    "footer.ourmission": "ನಮ್ಮ ಮಿಷನ್",
    "footer.termsofservice": "ಸೇವಾ ನಿಯಮಗಳು",
    "footer.privacypolicy": "ಗೌಪ್ಯತಾ ನೀತಿ",
    "footer.contactus": "ಸಂಪರ್ಕಿಸಿ",
    "footer.newsletterhead": "ನ್ಯೂಸ್‌ಲೆಟರ್",
    "footer.newsletterdesc":
      "ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯ ತಾಣಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಕಾರ್ಯಕ್ರಮಗಳ ಬಗ್ಗೆ ಇತ್ತೀಚಿನ ಅಪ್‌ಡೇಟ್‌ಗಳಿಗಾಗಿ ನಮ್ಮ ನ್ಯೂಸ್‌ಲೆಟರ್‌ಗೆ ಚಂದಾದಾರರಾಗಿ.",
    "footer.youremail": "ನಿಮ್ಮ ಇಮೇಲ್",
    "footer.subscribe": "ಚಂದಾದಾರರಾಗಿ",
    "footer.allrightsreserved": "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    "footer.madewith": "ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯನ್ನು ಸಂರಕ್ಷಿಸಲು 💖 ನೊಂದಿಗೆ ಮಾಡಲಾಗಿದೆ",
    culturalknowledge: "ಸಾಂಸ್ಕೃತಿಕ ಜ್ಞಾನ ಗ್ರಾಫ್",
    interactivemapping: "ಸಂವಾದಾತ್ಮಕ ಸಾಂಸ್ಕೃತಿಕ ಮ್ಯಾಪಿಂಗ್",
    educationalnetwork: "ಶೈಕ್ಷಣಿಕ ಸಂಸ್ಥೆ ನೆಟ್ವರ್ಕ್",
  },

  mr: {
    home: "मुख्यपृष्ठ",
    explore: "अन्वेषण करा",
    storyshare: "कथा",
    shoplocal: "स्थानिक दुकान",
    travelbuddy: "प्रवास साथी",
    badges: "बॅजेस",
    startexploring: "अन्वेषण सुरू करा",
    "footer.discoverheritage":
      "लपलेली परंपरा शोधा. समुदायांना सक्षम करा. उद्देशाने प्रवास करा.",
    "footer.explorehead": "अन्वेषण",
    "footer.heritagesites": "वारसा स्थळे",
    "footer.culturalstories": "सांस्कृतिक कथा",
    "footer.artisanproducts": "कारागीर उत्पादने",
    "footer.findcotravelers": "सहप्रवासी शोधा",
    "footer.sustainabletourism": "शाश्वत पर्यटन",
    "footer.resourceshead": "स्रोत",
    "footer.aboutus": "आमच्याबद्दल",
    "footer.ourmission": "आमचे ध्येय",
    "footer.termsofservice": "सेवेच्या अटी",
    "footer.privacypolicy": "गोपनीयता धोरण",
    "footer.contactus": "संपर्क करा",
    "footer.newsletterhead": "न्यूजलेटर",
    "footer.newsletterdesc":
      "वारसा स्थळे आणि स्थानिक कार्यक्रमांबाबत ताज्या बातम्यांसाठी आमच्या न्यूजलेटरसाठी सदस्यता घ्या.",
    "footer.youremail": "तुमचा ईमेल",
    "footer.subscribe": "सदस्यता घ्या",
    "footer.allrightsreserved": "सर्व हक्क राखीव.",
    "footer.madewith": "वारसा जपण्यासाठी 💖 सह बनवलेले",
    culturalknowledge: "सांस्कृतिक ज्ञान ग्राफ",
    interactivemapping: "इंटरॲक्टिव सांस्कृतिक मॅपिंग",
    educationalnetwork: "शैक्षणिक संस्थांचे नेटवर्क",
  },

  ml: {
    home: "Home",
    explore: "Explore",
    storyshare: "StoryShare",
    shoplocal: "MyShop",
    travelbuddy: "Travel Buddy",
    badges: "Badges",
    startexploring: "Start Exploring",
    "footer.discoverheritage":
      "Discover Hidden Heritage. Empower Communities. Travel with Purpose.",
    "footer.explorehead": "Explore",
    "footer.heritagesites": "Heritage Sites",
    "footer.culturalstories": "Cultural Stories",
    "footer.artisanproducts": "Artisan Products",
    "footer.findcotravelers": "Find Co-Travelers",
    "footer.sustainabletourism": "Sustainable Tourism",
    "footer.resourceshead": "Resources",
    "footer.aboutus": "About Us",
    "footer.ourmission": "Our Mission",
    "footer.termsofservice": "Terms of Service",
    "footer.privacypolicy": "Privacy Policy",
    "footer.contactus": "Contact Us",
    "footer.newsletterhead": "Newsletter",
    "footer.newsletterdesc":
      "Subscribe to our newsletter for the latest updates on cultural heritage sites and local events.",
    "footer.youremail": "Your email",
    "footer.subscribe": "Subscribe",
    "footer.allrightsreserved": "All rights reserved.",
    "footer.madewith": "Made with 💖 by Team COSMIC",
    culturalknowledge: "Cultural Knowledge Graph",
    interactivemapping: "Interactive Cultural Mapping",
    educationalnetwork: "Educational Institution Network",
  },
  ta: {
    home: "முகப்பு",
    explore: "ஆராயுங்கள்",
    storyshare: "கதைகள்",
    shoplocal: "உள்ளூர் கடை",
    travelbuddy: "பயண தோழர்",
    badges: "பதக்கங்கள்",
    startexploring: "ஆராய துவங்கு",
    "footer.discoverheritage":
      "மறைந்துள்ள பாரம்பரியத்தை கண்டறிக. சமூகங்களை எம்ம் செய்யுங்கள். நோக்கத்துடன் பயணியுங்கள்.",
    "footer.explorehead": "ஆராயுங்கள்",
    "footer.heritagesites": "பாரம்பரிய தளங்கள்",
    "footer.culturalstories": "கலாச்சாரக் கதைகள்",
    "footer.artisanproducts": "கைவினை பொருட்கள்",
    "footer.findcotravelers": "சுய பயணிகளைக் கண்டறியுங்கள்",
    "footer.sustainabletourism": "திடமான சுற்றுலா",
    "footer.resourceshead": "வளங்கள்",
    "footer.aboutus": "எங்களைப் பற்றி",
    "footer.ourmission": "எங்கள் பணிக்கோள்",
    "footer.termsofservice": "சேவை விதிமுறைகள்",
    "footer.privacypolicy": "தனியுரிமை கொள்கை",
    "footer.contactus": "எங்களை தொடர்பு கொள்ளுங்கள்",
    "footer.newsletterhead": "செய்திமடல்",
    "footer.newsletterdesc":
      "பாரம்பரிய தளங்கள் மற்றும் உள்ளூர் நிகழ்வுகள் பற்றிய சமீபத்திய புதுப்பிப்புகளுக்காக எங்கள் செய்திமடலுக்கு பதிவுசெய்யவும்.",
    "footer.youremail": "உங்கள் மின்னஞ்சல்",
    "footer.subscribe": "பதிவு செய்யவும்",
    "footer.allrightsreserved": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    "footer.madewith": "பாரம்பரியத்தை காக்க 💖-உடன் உருவாக்கப்பட்டது",
    culturalknowledge: "கலாச்சார அறிவுத் தரவுத்தொகுப்பு",
    interactivemapping: "ஊடாடும் கலாச்சார வரைபடம்",
    educationalnetwork: "கல்வி நிறுவன இணைப்பு",
  },
  ml: {
    home: "ഹോം",
    explore: "ഓർമ്മപ്പെടുത്തുക",
    storyshare: "കഥകൾ",
    shoplocal: "പ്രാദേശിക ഷോപ്പ്",
    travelbuddy: "യാത്രാ കൂട്ടുകാരൻ",
    badges: "ബാഡ്ജുകൾ",
    startexploring: "പടവെടുക്കുന്നത് ആരംഭിക്കുക",
    "footer.discoverheritage":
      "ലക്ഷ്യത്തോടെ യാത്ര ചെയ്യുക. ഒളിച്ചിരുന്ന പാരമ്പര്യത്തെ കണ്ടെത്തുക. സമൂഹങ്ങളെ ശക്തിപ്പെടുത്തുക.",
    "footer.explorehead": "പരിശോധിക്കുക",
    "footer.heritagesites": "പാരമ്പര്യ സ്ഥലങ്ങൾ",
    "footer.culturalstories": "സാംസ്കാരിക കഥകൾ",
    "footer.artisanproducts": "കാർമിക ഉൽപ്പന്നങ്ങൾ",
    "footer.findcotravelers": "പണിയാളികളെ കണ്ടെത്തുക",
    "footer.sustainabletourism": "പാലിശാ സഞ്ചാരം",
    "footer.resourceshead": "സ്രോതസ്സുകൾ",
    "footer.aboutus": "ഞങ്ങൾക്കുറിച്ചു",
    "footer.ourmission": "നമ്മുടെ ദൗത്യം",
    "footer.termsofservice": "സേവന നിബന്ധനകൾ",
    "footer.privacypolicy": "സ്വകാര്യതാ നയം",
    "footer.contactus": "ബന്ധപ്പെടുക",
    "footer.newsletterhead": "ന്യൂസ്‌ലെറ്റർ",
    "footer.newsletterdesc":
      "സാംസ്കാരിക പാരമ്പര്യസ്ഥലങ്ങൾക്കും പ്രാദേശിക പരിപാടികൾക്കുമുള്ള ഏറ്റവും പുതിയ വിവരങ്ങൾക്കായി ഞങ്ങളുടെ ന്യൂസ്‌ലെറ്റർസിന്റെ ചേർച്ച",
    "footer.youremail": "നിങ്ങളുടെ ഇമെയിൽ",
    "footer.subscribe": "പങ്കുവയ്ക്കുക",
    "footer.allrightsreserved": "എല്ലാ അവകാശങ്ങളും സംരക്ഷിതമാണ്.",
    "footer.madewith": "പാരമ്പര്യത്തെ സംരക്ഷിക്കാൻ 💖 എകാംഗമായത്",
    culturalknowledge: "സാംസ്കാരിക വിജ്ഞാനം",
    interactivemapping: "ഇന്ററാക്ടീവ് സാംസ്കാരിക മാപ്പിംഗ്",
    educationalnetwork: "വിദ്യാഭ്യാസ സ്ഥാപനം നെറ്റ്വർക്ക്",
    language: "ഭാഷ",
    search: "തിരയുക",
    login: "പ്രവേശിക്കുക",
    signup: "സൈൻ അപ്പ്",
    logout: "പുറത്തേക്ക്",
    welcome: "സ്വാഗതം",
    profile: "പ്രൊഫൈൽ",
    editprofile: "പ്രൊഫൈൽ തിരുത്തുക",
    settings: "സജ്ജീകരണങ്ങൾ",
    help: "സഹായം",
    contactsupport: "സഹായത്തിനായി ബന്ധപ്പെടുക",
    termsconditions: "നിബന്ധനകൾ",
    privacystatement: "സ്വകാര്യതാ പ്രസ്താവനം",
    allrightsreservedfooter: "എല്ലാ അവകാശങ്ങളും സംരക്ഷിതമാണ്.",
    subscription: "സബ്സ്ക്രിപ്ഷൻ",
    subscribeform: "സബ്സ്ക്രൈബ് ഫോം",
    latestnews: "ഇന്ത്യയിലെ ഏറ്റവും പുതിയ വാർത്തകൾ",
    newsletter: "സമൂഹ വാര്‍ത്താവിനിമയം",
  },
};

const fallbackLanguages: Record<string, string> = {
  ta: "en",
  te: "en",
  ml: "en",
  mr: "en",
  bn: "en",
  gu: "en",
  pa: "en",
  ur: "en",
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages[0]
  );

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguageCode = localStorage.getItem("vistara-language");
    if (savedLanguageCode) {
      const savedLanguage = languages.find(
        (lang) => lang.code === savedLanguageCode
      );
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (language: Language) => {
    localStorage.setItem("vistara-language", language.code);
    setCurrentLanguage(language);
  };

  const translate = (key: string): string => {
    // First try the current language
    if (translations[currentLanguage.code]?.[key]) {
      return translations[currentLanguage.code][key];
    }

    // If not found and there's a fallback language defined, try that
    const fallback = fallbackLanguages[currentLanguage.code];
    if (fallback && translations[fallback]?.[key]) {
      return translations[fallback][key];
    }

    // Default to English if all else fails
    if (translations["en"]?.[key]) {
      return translations["en"][key];
    }

    // Return the key itself if no translation is found
    return key;
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, setLanguage, translate }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
