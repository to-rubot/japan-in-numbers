# japan-in-numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/to-rubot/japan-in-numbers/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/to-rubot/japan-in-numbers/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**Japan in Numbers — a national statistics atlas.** Japan's population, economy, society, land and all 47 prefectures, told in real official figures: interactive charts, a 1920–2024 time-travel slider, the 2020 population pyramid, a searchable / sortable / filterable explorer of every prefecture (2020 Census counts, areas, densities, capitals), and a numbers quiz. Fully offline static files — no build step, no network requests — on desktop and phone.

Sources: Statistics Bureau of Japan (2020 Census & 2024 estimates), Cabinet Office National Accounts, World Bank, MHLW life tables 2023, MLIT / GSI land and area data.

## Run it

```sh
node serve.ts            # http://localhost:8080 — serves app/
# or open app/index.html in a browser
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # hand-in build: writes out/dossier.json
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=brisk-fox-91&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
