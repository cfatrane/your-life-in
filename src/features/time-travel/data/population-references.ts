export type PopulationReference = {
  id: string;
  country: string;
  year: number;
  value: number;
  locationCode: number;
  sourceCell: string;
};

export const populationSource = {
  revision: "WPP 2024",
  sheet: "Estimates",
  verifiedOn: "2026-10-17",
  sex: "sexes réunis",
  license: "CC BY 3.0 IGO",
  url: "https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/EXCEL_FILES/1_General/WPP2024_GEN_F01_DEMOGRAPHIC_INDICATORS_COMPACT.xlsx",
  definitionUrl:
    "https://population.un.org/dataportal/data/indicators/61/locations/566/start/1950/end/2030/metadata/metadataindicators",
  licenseUrl: "https://creativecommons.org/licenses/by/3.0/igo/",
};

export const populationReferences: readonly PopulationReference[] = [
  {
    id: "france-1950",
    country: "France",
    year: 1950,
    value: 66.382,
    locationCode: 250,
    sourceCell: "AI14970",
  },
  {
    id: "france-1980",
    country: "France",
    year: 1980,
    value: 74.234,
    locationCode: 250,
    sourceCell: "AI15000",
  },
  {
    id: "france-2020",
    country: "France",
    year: 2020,
    value: 82.199,
    locationCode: 250,
    sourceCell: "AI15040",
  },
  {
    id: "royaume-uni-1950",
    country: "Royaume-Uni",
    year: 1950,
    value: 68.631,
    locationCode: 826,
    sourceCell: "AI13342",
  },
  {
    id: "royaume-uni-1980",
    country: "Royaume-Uni",
    year: 1980,
    value: 73.591,
    locationCode: 826,
    sourceCell: "AI13372",
  },
  {
    id: "royaume-uni-2020",
    country: "Royaume-Uni",
    year: 2020,
    value: 80.385,
    locationCode: 826,
    sourceCell: "AI13412",
  },
  {
    id: "japon-1950",
    country: "Japon",
    year: 1950,
    value: 59.255,
    locationCode: 392,
    sourceCell: "AI8162",
  },
  {
    id: "japon-1980",
    country: "Japon",
    year: 1980,
    value: 76.141,
    locationCode: 392,
    sourceCell: "AI8192",
  },
  {
    id: "japon-2020",
    country: "Japon",
    year: 2020,
    value: 84.67,
    locationCode: 392,
    sourceCell: "AI8232",
  },
];
