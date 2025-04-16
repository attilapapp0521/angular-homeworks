export interface InfectionData {
  date: string; // ISO formátum (pl. 2024-04-10)
  tests: number; // aznapi mintavételek száma
  newCases: number; // új fertőzöttek száma
  hospitalized: number; // kórházban lévők száma
}

export const INFECTION_DATA: InfectionData[] = [
  {
    date: '2024-04-10',
    tests: 1200,
    newCases: 45,
    hospitalized: 90,
  },
  {
    date: '2024-04-11',
    tests: 1500,
    newCases: 38,
    hospitalized: 87,
  },
  {
    date: '2024-04-12',
    tests: 1800,
    newCases: 50,
    hospitalized: 100,
  },
  {
    date: '2024-04-13',
    tests: 2000,
    newCases: 30,
    hospitalized: 95,
  },
  {
    date: '2024-04-14',
    tests: 1700,
    newCases: 41,
    hospitalized: 85,
  },
  {
    date: '2024-04-15',
    tests: 1600,
    newCases: 60,
    hospitalized: 110,
  },
  {
    date: '2024-04-16',
    tests: 1400,
    newCases: 32,
    hospitalized: 80,
  },
];
