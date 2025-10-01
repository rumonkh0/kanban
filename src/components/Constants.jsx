import React from "react";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

// Register the English language data for country names
countries.registerLocale(en);

// Utility to generate the structured options for the Dropdown component
export const generateCountryOptions = () => {
  // Get all supported ISO codes from libphonenumber-js
  return getCountries()
    .map((isoCode) => {
      const countryName = countries.getName(isoCode, "en");

      if (!countryName) return null; // Skip countries without a name

      // 🎯 The label is a React component displaying the flag and name
      const FlagLabel = (
        <div className="flex items-center gap-2 w-full">
          {/* Flag Icon (Using flag-icons with square format) */}
          <span
            className={`fi fi-${isoCode.toLowerCase()} fi-sq`}
            style={{ width: "18px", height: "18px", borderRadius: "3px" }}
          ></span>
          {/* Country Name */}
          <span className="truncate">{countryName}</span>
        </div>
      );

      return {
        // The value you want stored in state (the ISO code is the best identifier)
        value: countryName,
        // The React component to display in the dropdown and button
        label: FlagLabel,
        // Optional: Include name/iso for sorting if needed
        name: countryName,
      };
    })
    .filter((opt) => opt !== null) // Remove entries that couldn't be named
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort by country name
};

export const COUNTRY_DROPDOWN_DATA = getCountries()
  .map((iso) => {
    try {
      return {
        // Use an external map or simple logic for the name
        name: iso, // Placeholder: Use a proper map for full names
        iso: iso.toUpperCase(),
        code: `+${getCountryCallingCode(iso)}`,
      };
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      // Catch countries without a defined calling code (rare)
      return null;
    }
  })
  .filter((c) => c !== null);
const LANGUAGE_OPTIONS = [
  {
    value: "af",
    label: "Afrikaans",
    native: "Afrikaans",
  },
  {
    value: "sq",
    label: "Albanian",
    native: "Shqip",
  },
  {
    value: "am",
    label: "Amharic",
    native: "አማርኛ",
  },
  {
    value: "ar",
    label: "Arabic",
    native: "العربية",
  },
  {
    value: "as",
    label: "Assamese",
    native: "অসমীয়া",
  },
  {
    value: "az",
    label: "Azerbaijani",
    native: "Azərbaycanca",
  },
  {
    value: "eu",
    label: "Basque",
    native: "Euskara",
  },
  {
    value: "bn",
    label: "Bengali",
    native: "বাংলা",
  },
  {
    value: "bs",
    label: "Bosnian",
    native: "Bosanski",
  },
  {
    value: "bg",
    label: "Bulgarian",
    native: "Български",
  },
  {
    value: "my",
    label: "Burmese",
    native: "မြန်မာစာ",
  },
  {
    value: "ca",
    label: "Catalan",
    native: "Català",
  },
  {
    value: "ny",
    label: "Chichewa",
    native: "Chichewa",
  },
  {
    value: "zh-HK",
    label: "Chinese (Cantonese)",
    native: "中文 (廣東話)",
  },
  {
    value: "zh",
    label: "Chinese (Mandarin)",
    native: "中文 (普通话)",
  },
  {
    value: "zh-Hant",
    label: "Chinese (Traditional)",
    native: "中文 (繁體)",
  },
  {
    value: "hr",
    label: "Croatian",
    native: "Hrvatski",
  },
  {
    value: "cs",
    label: "Czech",
    native: "Čeština",
  },
  {
    value: "da",
    label: "Danish",
    native: "Dansk",
  },
  {
    value: "nl",
    label: "Dutch",
    native: "Nederlands",
  },
  {
    value: "en",
    label: "English",
    native: "English",
  },
  {
    value: "eo",
    label: "Esperanto",
    native: "Esperanto",
  },
  {
    value: "et",
    label: "Estonian",
    native: "Eesti",
  },
  {
    value: "fil",
    label: "Filipino",
    native: "Filipino",
  },
  {
    value: "fi",
    label: "Finnish",
    native: "Suomi",
  },
  {
    value: "fr",
    label: "French",
    native: "Français",
  },
  {
    value: "gl",
    label: "Galician",
    native: "Galego",
  },
  {
    value: "de",
    label: "German",
    native: "Deutsch",
  },
  {
    value: "el",
    label: "Greek",
    native: "Ελληνικά",
  },
  {
    value: "gu",
    label: "Gujarati",
    native: "ગુજરાતી",
  },
  {
    value: "ha",
    label: "Hausa",
    native: "Hausa",
  },
  {
    value: "he",
    label: "Hebrew",
    native: "עברית",
  },
  {
    value: "hi",
    label: "Hindi",
    native: "हिन्दी",
  },
  {
    value: "hu",
    label: "Hungarian",
    native: "Magyar",
  },
  {
    value: "is",
    label: "Icelandic",
    native: "Íslenska",
  },
  {
    value: "ig",
    label: "Igbo",
    native: "Igbo",
  },
  {
    value: "id",
    label: "Indonesian",
    native: "Bahasa Indonesia",
  },
  {
    value: "ga",
    label: "Irish",
    native: "Gaeilge",
  },
  {
    value: "it",
    label: "Italian",
    native: "Italiano",
  },
  {
    value: "ja",
    label: "Japanese",
    native: "日本語",
  },
  {
    value: "kn",
    label: "Kannada",
    native: "ಕನ್ನಡ",
  },
  {
    value: "kk",
    label: "Kazakh",
    native: "Қазақ тілі",
  },
  {
    value: "km",
    label: "Khmer",
    native: "ភាសាខ្មែរ",
  },
  {
    value: "rw",
    label: "Kinyarwanda",
    native: "Ikinyarwanda",
  },
  {
    value: "ko",
    label: "Korean",
    native: "한국어",
  },
  {
    value: "ku",
    label: "Kurdish",
    native: "Kurdî",
  },
  {
    value: "ky",
    label: "Kyrgyz",
    native: "Кыргызча",
  },
  {
    value: "lo",
    label: "Lao",
    native: "ພາສາລາວ",
  },
  {
    value: "lv",
    label: "Latvian",
    native: "Latviešu",
  },
  {
    value: "lt",
    label: "Lithuanian",
    native: "Lietuvių",
  },
  {
    value: "mk",
    label: "Macedonian",
    native: "Македонски",
  },
  {
    value: "mg",
    label: "Malagasy",
    native: "Malagasy",
  },
  {
    value: "ms",
    label: "Malay",
    native: "Bahasa Melayu",
  },
  {
    value: "ml",
    label: "Malayalam",
    native: "മലയാളം",
  },
  {
    value: "mt",
    label: "Maltese",
    native: "Malti",
  },
  {
    value: "mr",
    label: "Marathi",
    native: "मराठी",
  },
  {
    value: "mn",
    label: "Mongolian",
    native: "Монгол хэл",
  },
  {
    value: "ne",
    label: "Nepali",
    native: "नेपाली",
  },
  {
    value: "no",
    label: "Norwegian",
    native: "Norsk",
  },
  {
    value: "or",
    label: "Odia",
    native: "ଓଡ଼ିଆ",
  },
  {
    value: "ps",
    label: "Pashto",
    native: "پښتو",
  },
  {
    value: "fa",
    label: "Persian (Farsi)",
    native: "فارسی",
  },
  {
    value: "pl",
    label: "Polish",
    native: "Polski",
  },
  {
    value: "pt",
    label: "Portuguese",
    native: "Português",
  },
  {
    value: "pa",
    label: "Punjabi",
    native: "ਪੰਜਾਬੀ",
  },
  {
    value: "ro",
    label: "Romanian",
    native: "Română",
  },
  {
    value: "ru",
    label: "Russian",
    native: "Русский",
  },
  {
    value: "sr",
    label: "Serbian",
    native: "Српски",
  },
  {
    value: "si",
    label: "Sinhalese",
    native: "සිංහල",
  },
  {
    value: "sk",
    label: "Slovak",
    native: "Slovenčina",
  },
  {
    value: "sl",
    label: "Slovenian",
    native: "Slovenščina",
  },
  {
    value: "so",
    label: "Somali",
    native: "Soomaali",
  },
  {
    value: "es",
    label: "Spanish",
    native: "Español",
  },
  {
    value: "sw",
    label: "Swahili",
    native: "Kiswahili",
  },
  {
    value: "sv",
    label: "Swedish",
    native: "Svenska",
  },
  {
    value: "tl",
    label: "Tagalog",
    native: "Tagalog",
  },
  {
    value: "tg",
    label: "Tajik",
    native: "Тоҷикӣ",
  },
  {
    value: "ta",
    label: "Tamil",
    native: "தமிழ்",
  },
  {
    value: "te",
    label: "Telugu",
    native: "తెలుగు",
  },
  {
    value: "th",
    label: "Thai",
    native: "ไทย",
  },
  {
    value: "bo",
    label: "Tibetan",
    native: "བོད་སྐད་",
  },
  {
    value: "tr",
    label: "Turkish",
    native: "Türkçe",
  },
  {
    value: "tk",
    label: "Turkmen",
    native: "Türkmençe",
  },
  {
    value: "uk",
    label: "Ukrainian",
    native: "Українська",
  },
  {
    value: "ur",
    label: "Urdu",
    native: "اردو",
  },
  {
    value: "uz",
    label: "Uzbek",
    native: "Oʻzbekcha",
  },
  {
    value: "vi",
    label: "Vietnamese",
    native: "Tiếng Việt",
  },
  {
    value: "cy",
    label: "Welsh",
    native: "Cymraeg",
  },
  {
    value: "xh",
    label: "Xhosa",
    native: "isiXhosa",
  },
  {
    value: "yo",
    label: "Yoruba",
    native: "Yorùbá",
  },
  {
    value: "zu",
    label: "Zulu",
    native: "isiZulu",
  },
];

export const generateLanguageOptions = () => {
  return LANGUAGE_OPTIONS.map((lang) => ({
    // The value that goes into your state
    value: lang.label,
    // The label (React element) to display in the dropdown and button
    label: (
      <div className="flex items-center gap-2 w-full">
        <span className="truncate">{lang.label}</span>
        {/* Optional: Show the native name in lighter text */}
        <span className="text-text2 typo-caption ml-auto">({lang.native})</span>
      </div>
    ),
    // Optional: Keep the label string for easier searching/sorting if you implement it
    name: lang.label,
  }));
};
