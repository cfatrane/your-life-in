# Voyage dans le temps — contrôle des données WPP 2024

Relevé éditorial des neuf références, vérifié le 17 octobre 2026.

## Exact source and reproduction

Official XLSX: [WPP2024_GEN_F01_DEMOGRAPHIC_INDICATORS_COMPACT.xlsx](<https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/EXCEL_FILES/1_General/WPP2024_GEN_F01_DEMOGRAPHIC_INDICATORS_COMPACT.xlsx>)

SHA-256 of the downloaded workbook used for verification (the workbook is not committed): `98e34d9b65b53858cd08a57a566e45050b08093ad85ba5714fe6fbd78055ae6d`.

Workbook internal title: File GEN/01/REV1: Demographic indicators by region, subregion and country, annually for 1950-2100. Identifier: POP/DB/WPP/Rev.2024/GEN/F01/Rev.1. Sheet `Estimates` (E11: 1950-2023), not `Medium variant`. Column AI is the sheet's explicitly labelled `Life Expectancy at Birth, both sexes (years)` (AI17). K is year, C country, E location code, F ISO3, D geographic note. The numeric doubles in the XML have binary storage artifacts; decimal source precision is 3 decimals. `time-travel-source-extract.json` preserves raw XML numeric strings and original cells.

| Population     | Year | Value (years) | Source cell       | Display (1 decimal) |
| -------------- | ---: | ------------: | ----------------- | ------------------: |
| France         | 1950 |        66.382 | Estimates!AI14970 |                66,4 |
| France         | 1980 |        74.234 | Estimates!AI15000 |                74,2 |
| France         | 2020 |        82.199 | Estimates!AI15040 |                82,2 |
| United Kingdom | 1950 |        68.631 | Estimates!AI13342 |                68,6 |
| United Kingdom | 1980 |        73.591 | Estimates!AI13372 |                73,6 |
| United Kingdom | 2020 |        80.385 | Estimates!AI13412 |                80,4 |
| Japan          | 1950 |        59.255 | Estimates!AI8162  |                59,3 |
| Japan          | 1980 |        76.141 | Estimates!AI8192  |                76,1 |
| Japan          | 2020 |        84.670 | Estimates!AI8232  |                84,7 |

France's initial displayed comparison is 66,4 → 82,2 ans, a +15,8 ans difference after rounding the values independently to one decimal.

## Geography

These are country/area entries FRA/250, GBR/826, JPN/392, not regional groups or dependency-inclusive aggregates.

France uses geographic note 26 (`NOTES!A41`): excludes French Guiana, French Polynesia, Guadeloupe, Martinique, Mayotte, New Caledonia, Réunion, Saint Pierre and Miquelon, Saint Barthélemy, Saint Martin (French part), Wallis and Futuna Islands. A user-facing short formulation can be `France (hors territoires ultramarins listés par l'ONU)`; preserve exact note in provenance.

UK uses geographic note 21 (`NOTES!A36`): United Kingdom of Great Britain and Northern Ireland, excluding Anguilla, Bermuda, British Virgin Islands, Cayman Islands, Falkland Islands (Malvinas), Gibraltar, Guernsey, Isle of Man, Jersey, Montserrat, Saint Helena, Turks and Caicos Islands. Short formulation: `Royaume-Uni de Grande-Bretagne et d’Irlande du Nord (hors dépendances listées par l’ONU)`.

Japan has no country-specific geographic note in this workbook; it is the `Japan` JPN/392 Country/Area entry. Do not invent an exclusion list.

## Definition and historical status

The [official metadata for indicator 61](https://population.un.org/dataportal/data/indicators/61/locations/566/start/1950/end/2030/metadata/metadataindicators) identifies WPP revision 2024, United Nations Population Division, Mortality. In paraphrase: the indicator is the expected lifespan of a hypothetical cohort exposed throughout life to the age-specific mortality rates of that period. It includes infant mortality because exposure begins at birth, and is neither a personal forecast nor an observed lifespan of the actual cohort born that year. Sexes combined are read directly from the combined-sex indicator, not averaged from male/female values.

Historical estimates run 1950-2023 according to sheet E11 and the [official WPP release note](https://population.un.org/wpp/assets/Files/WPP2024_Release-Note.pdf). All requested years are included. Values represent single calendar years, not 5-year periods. No projection value is used.

## Reuse terms and attribution

This exact data workbook carries its own license notice in `Estimates!E13`, identifying United Nations copyright July 2024 and **CC BY 3.0 IGO**, linking [the license](https://creativecommons.org/licenses/by/3.0/igo/). This is direct file evidence; no inference from the methodology report is necessary. Include attribution and license link, and indicate adaptations (selection, French labels and rounding). Do not imply United Nations endorsement of the app.

Suggested attribution in E14: United Nations, Department of Economic and Social Affairs, Population Division (2024). World Population Prospects 2024, Online Edition.

A concise visible app attribution can identify `ONU, Département des affaires économiques et sociales, Division de la population — World Population Prospects 2024. CC BY 3.0 IGO. Extrait, traduit et arrondi pour cette comparaison.` Link the dataset and license; a separate definition link is useful.

## Cross-check

The official WPP CSV is available at [WPP2024_Demographic_Indicators_Medium.csv.gz](<https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/WPP2024_Demographic_Indicators_Medium.csv.gz>). This CSV repeats historical years within `Variant=Medium`; unlike the XLSX it does not label them `Estimates` in that field. Their historical status is established by the XLSX Estimates sheet and WPP 1950-2023 estimation boundary. A second parsing of the official CSV confirmed the nine values. CSV LEx retains four decimals, while the chosen XLSX retains three; each CSV value rounds to the corresponding XLSX value at three decimals. This is the same release, not an independent demographic source. Use the chosen XLSX values/cells consistently in the catalogue; do not mix precision or provenance silently.

UNdata's legacy download endpoint redirected to its current landing HTML during this check, so it is not used as numeric evidence. The official direct WPP XLSX download succeeded, with its file-level license retained. No browser or real-device UI verification performed during this research.
