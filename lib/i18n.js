/* ============================================================
   i18n — EN/ES dictionary + DOM toggle
   - data-i18n="key"        → replaces textContent
   - data-i18n-html="key"   → replaces innerHTML (for mixed-weight headlines)
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'sl-portfolio-lang';
  const DEFAULT_LANG = 'en';

  const DICT = {
    en: {
      /* ---------- A11y / Nav ---------- */
      'a11y.skip': 'Skip to main content',
      'nav.role': 'Data Analyst',
      'nav.projects': 'Projects',
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.contact': 'Contact',

      /* ---------- Hero ---------- */
      'hero.eyebrow': 'Data Analyst · Open to roles',
      'hero.title': '<span class="light">Turning raw data into</span> <span class="bold">business decisions.</span>',
      'hero.subtitle': 'International Business student building a career in data analytics and business intelligence — combining a statistical foundation with AI-assisted workflows to deliver insights faster.',
      'hero.ctaPrimary': 'View case studies',
      'hero.ctaSecondary': 'Get in touch',
      'hero.metaLocation': 'Based in',
      'hero.metaStatus': 'Status',
      'hero.metaStatusVal': 'Open to remote roles',
      'hero.metaLang': 'Languages',
      'hero.floatTag': 'Notebook-backed',

      /* ---------- Stat strip ---------- */
      'stat.cases': 'end-to-end case studies, notebook-backed.',
      'stat.rows': 'records analysed across cohort, EDA and A/B testing projects.',
      'stat.internships': 'data internships in remote, cross-cultural teams.',

      /* ---------- Projects ---------- */
      'projects.eyebrow': 'Featured Case Studies',
      'projects.title': '<span class="light">Three problems,</span> <span class="bold">solved with data.</span>',
      'projects.meta': 'Selected works — 2025',
      'projects.cta': 'Read case study',
      'projects.p1.title': '<span class="light">Showz —</span> <span class="bold">Marketing Performance Analysis</span>',
      'projects.p1.desc': 'Cohort analysis, LTV and ROMI evaluation across acquisition channels for a ticket-sales platform. Recommended a 30% spend reallocation.',
      'projects.p2.title': '<span class="light">Ice —</span> <span class="bold">Video Game Sales Analysis</span>',
      'projects.p2.desc': 'EDA and t-tests across 16,715 titles to plan a 2017 retailer campaign.',
      'projects.p3.title': '<span class="light">Megaline —</span> <span class="bold">Customer Revenue Analysis</span>',
      'projects.p3.desc': 'Two-sample hypothesis testing on prepaid plans — and a volume paradox.',

      /* ---------- About ---------- */
      'about.eyebrow': 'About',
      'about.title': '<span class="light">Analyst by training,</span> <span class="bold">builder by instinct.</span>',
      'about.p1': 'International Business student and <span class="bold">Data Analyst</span> with hands-on experience analysing operational data, building Power BI dashboards and automating business workflows. I combine a strong statistical foundation — hypothesis testing, probability, descriptive analysis — with modern AI-assisted development to deliver insights faster.',
      'about.p2': 'Currently focused on landing a full-time Data Analyst role while continuing to strengthen my fundamentals through structured study and real-world projects.',
      'about.stat1': 'end-to-end case studies covering cohort analysis, hypothesis testing and revenue modelling.',
      'about.stat2': 'internships in remote, cross-cultural teams (Canada & LATAM startups).',

      /* ---------- Trajectory ---------- */
      'traj.eyebrow': 'Trajectory',
      'traj.title': '<span class="light">Skills, stacked.</span> <span class="bold">A career in motion.</span>',
      'traj.meta': 'Each bar = depth of skill at that stage.',
      'traj.b1Period': 'Foundation',
      'traj.b1Title': 'Pre-bootcamp',
      'traj.b1Skill': 'Business strategy, finance, trade — the lens behind the numbers.',
      'traj.b2Period': 'Bootcamp',
      'traj.b2Title': 'TripleTen',
      'traj.b2Skill': 'Python, SQL, statistics, EDA, A/B testing, three real case studies.',
      'traj.b3Period': 'Internship + Startup',
      'traj.b3Title': 'Vosyn + VARAC',
      'traj.b3Skill': 'Power BI dashboards, AI agent workflows, client requirements.',
      'traj.b4Period': 'Now',
      'traj.b4Title': 'micro1 + Codecademy',
      'traj.b4Skill': 'AI output evaluation, BI fundamentals, actively seeking Data Analyst roles.',

      /* ---------- Experience ---------- */
      'exp.eyebrow': 'Experience',
      'exp.title': '<span class="light">Where I\'ve put</span> <span class="bold">data to work.</span>',
      'exp.present': 'Present',
      'exp.remote': 'Remote',
      'exp.canada': 'Remote (Ontario, Canada)',
      'exp.micro1': 'Review and validate AI-generated outputs against quality guidelines, applying analytical criteria to identify errors and improve model performance.',
      'exp.varac': 'Built AI agents and automation workflows for business clients using Python, n8n, FastAPI and React. Led client meetings, requirements gathering and end-to-end project delivery in a fast-paced startup environment.',
      'exp.vosyn': 'Cleaned and analysed productivity datasets across departments. Designed interactive Power BI dashboards to track KPIs and surface trends for senior management.',

      /* ---------- Education ---------- */
      'edu.eyebrow': 'Education',
      'edu.title': '<span class="light">Always learning,</span> <span class="bold">structured.</span>',
      'edu.inProgress': 'In progress',
      'edu.completed': 'Completed',
      'edu.codecademy': 'Strengthening BI fundamentals — dimensional modelling, advanced SQL, dashboarding patterns.',
      'edu.tripleten': '11-sprint program covering Python, SQL, statistics, EDA, A/B testing and dashboarding.',
      'edu.uvm': 'Grounding in business strategy, international trade, finance and operations.',

      /* ---------- Stack ---------- */
      'stack.eyebrow': 'Tech Stack',
      'stack.title': '<span class="light">The toolkit,</span> <span class="bold">organised.</span>',
      'stack.meta': 'No badge soup — actual fluency.',
      'stack.cat1': 'Data & Analysis',
      'stack.cat2': 'Visualization & BI',
      'stack.cat3': 'Statistics',
      'stack.cat4': 'AI & Automation',
      'stack.cat5': 'Tools',
      'stack.hyp': 'Hypothesis Testing',
      'stack.prob': 'Probability',
      'stack.desc': 'Descriptive Analysis',

      /* ---------- Contact ---------- */
      'contact.eyebrow': 'Get in touch',
      'contact.title': '<span class="light">Let\'s</span> <span class="bold">talk data.</span>',
      'contact.body': 'I\'m open to remote Data Analyst, BI and analytics-engineering roles. Reach out — happy to share my CV, walk through a case study or just trade notes.',
      'contact.phone': 'Phone',
      'contact.ctaPrimary': 'Email me',
      'contact.ctaSecondary': 'Connect on LinkedIn',

      /* ---------- Footer ---------- */
      'footer.built': 'Built with HTML · CSS · JS',
      'footer.source': 'View source',

      /* ---------- Case study shared ---------- */
      'cs.backHome': 'Home',
      'cs.backProjects': 'Projects',
      'cs.viewRepo': 'View on GitHub',
      'cs.prev': 'Previous case study',
      'cs.next': 'Next case study',
      'cs.expandFull': 'See full analysis',
      'cs.expandCode': 'See more code',
      'cs.factDataset': 'Dataset',
      'cs.factTools': 'Tools',
      'cs.factYear': 'Year',
      'cs.factDomain': 'Domain',
      'cs.contextLabel': 'Business context',
      'cs.methodLabel': 'Methodology',
      'cs.insightsLabel': 'Key insights',
      'cs.codeLabel': 'Code highlights',
      'cs.takeawayLabel': 'Final takeaway',

      /* ---------- Case study 01 — Showz ---------- */
      'cs1.tag': 'Marketing Analytics · Cohort Analysis',
      'cs1.title': '<span class="light">How we found the channels</span> <span class="bold">worth spending on.</span>',
      'cs1.intro': 'An end-to-end audit of the user funnel and marketing spend for Showz, an online events ticketing platform. Goal: pinpoint which acquisition channels actually pay back, and which are quietly draining the budget.',
      'cs1.contextTitle': 'A ticketing platform with a marketing problem.',
      'cs1.contextP1': 'Showz operates an online events ticketing marketplace. Like most early-growth platforms, they had a clear top of funnel but blurry attribution downstream: marketing was spending across multiple acquisition channels, but no one could confidently answer which channels were generating profitable customers — and which were just buying traffic.',
      'cs1.contextP2': 'The brief was deliberately open: build the lens through which Showz can evaluate marketing performance, end to end. That meant going from raw event logs all the way to a defensible recommendation on where the next marketing dollar should go.',
      'cs1.pullquote': 'Sources 1 and 2 generate 70% of revenue on under 30% of the spend. Source 3 is doing the opposite.',
      'cs1.methodTitle': 'A funnel-to-finance pipeline.',
      'cs1.m1Title': 'Data cleaning',
      'cs1.m1Body': 'Standardised three datasets — visits, orders and ad costs. Normalised datetime fields and added month/week derived features.',
      'cs1.m2Title': 'Engagement metrics',
      'cs1.m2Body': 'Built DAU, WAU and MAU. Layered session length and conversion windows on top.',
      'cs1.m3Title': 'Cohort analysis',
      'cs1.m3Body': 'Cohorted users by acquisition month. Tracked time-to-first-purchase and retention curves per cohort.',
      'cs1.m4Title': 'Unit economics',
      'cs1.m4Body': 'Computed LTV, CAC and ROMI per acquisition source. Cross-referenced with channel cost data.',
      'cs1.m5Title': 'Recommendation',
      'cs1.m5Body': 'Ranked channels by LTV : CAC ratio and translated findings into a budget reallocation proposal.',
      'cs1.insightsTitle': 'Three numbers that change the budget.',
      'cs1.i1Label': 'Platform engagement baseline',
      'cs1.i1Body': 'Average of 23,228 monthly active users — a healthy demand baseline against which channel-level performance can be measured. Daily active users grew from 845 in 2017 to 997 in 2018.',
      'cs1.i2Label': 'Source 1 — best return on spend',
      'cs1.i2Body': 'Source 1 returns $110 for every $1 of marketing spend — driven by an LTV of $322 against a CAC of just $2.92. Source 2 is the close second (ROMI 62×).',
      'cs1.i3Label': 'Source 3 — where the budget went',
      'cs1.i3Body': 'Source 3 received the largest marketing investment but returned only $2.10 per dollar spent — fifty times less efficient than Source 1. CAC ($10.21) is higher than LTV ($21.43) for most of the cohort window.',
      'cs1.chart1Title': 'Daily active users — 2017 vs 2018',
      'cs1.chart1Caption': 'Average daily active users grew from 845 (2017) to 997 (2018) — an 18% increase. Weekly and monthly averages: 5,716 WAU and 23,228 MAU.',
      'cs1.chart2Title': 'Revenue by acquisition source',
      'cs1.chart2Caption': 'Total revenue attributed to each source_id over the analysis window. Source 7 (one customer, zero ad spend) is excluded.',
      'cs1.chart3Title': 'LTV vs CAC by acquisition source',
      'cs1.chart3Caption': 'Sources 1 and 2 deliver LTVs above $320 against CACs under $6. Source 3 is the only channel where CAC ($10.21) exceeds LTV ($21.43) at any observable cohort window.',
      'cs1.codeTitle': 'The pieces of code I\'m most proud of.',
      'cs1.code1Caption': 'Cohort assignment — collapsing every user into the month they first visited, which anchors all downstream retention analysis.',
      'cs1.code2Caption': 'LTV per acquisition source — a join across orders and acquisition metadata, aggregated to a per-source view of customer value.',
      'cs1.code3Caption': 'Engagement scaffolding — single-call DAU, WAU and MAU that fed almost every downstream chart.',
      'cs1.takeawayBody': 'If I were sitting on Showz\'s marketing team, I\'d pull spend off Source 3 and shift it toward Sources 1, 2 and 5 — the three channels where LTV outruns CAC by 20× or more. Source 3\'s problem isn\'t volume; it\'s audience quality, and no extra budget will rescue a $10.21 CAC on a $21.43 LTV.',

      /* ---------- Case study 02 — Video Game Sales ---------- */
      'cs2.tag': 'EDA · Hypothesis Testing · 16,715 records',
      'cs2.title': '<span class="light">What actually predicts</span> <span class="bold">a hit video game.</span>',
      'cs2.intro': 'For Ice, a global video game retailer, I worked through 16,715 titles to understand what drives commercial success. The answer turned out to be less about reviews and more about platform timing and regional fit.',
      'cs2.contextTitle': 'Planning a 2017 campaign with data through 2016.',
      'cs2.contextP1': 'Ice is a fictional online retailer with global reach across North America, Europe and Japan. Marketing wanted to plan a 2017 ad campaign and asked a deceptively simple question: which games, on which platforms, in which regions, are worth promoting?',
      'cs2.contextP2': 'The dataset spanned decades of releases, so the work started with a hard editorial decision — which years matter for a forward-looking campaign? After charting release volume over time, I anchored the analysis on the most recent five-year window where platform mixes still resembled the current landscape.',
      'cs2.pullquote': 'Reviews predict critic articles. Sales follow platforms and timing — not stars.',
      'cs2.methodTitle': 'From sixteen-thousand rows to a campaign brief.',
      'cs2.m1Title': 'Cleaning',
      'cs2.m1Body': 'Resolved duplicates, type casts and a tricky "TBD" sentinel in user-score before aggregating anything.',
      'cs2.m2Title': 'Era selection',
      'cs2.m2Body': 'Used release-volume distributions to defend a reduced time window — the same data, asked a smarter question.',
      'cs2.m3Title': 'Platform & genre EDA',
      'cs2.m3Body': 'Compared revenue and unit sales across platforms and genres, both globally and by region.',
      'cs2.m4Title': 'Hypothesis testing',
      'cs2.m4Body': 'Two-sample t-tests on user scores across platforms (Xbox One vs PC) and across genres (Action vs Sports).',
      'cs2.m5Title': 'Regional profiling',
      'cs2.m5Body': 'Built per-region preference profiles for top platforms and genres — Japan looked nothing like NA or EU.',
      'cs2.insightsTitle': 'Three findings worth a campaign.',
      'cs2.i1Label': 'Modern-era platform leader',
      'cs2.i1Body': 'Inside the analyst-defined 2013–2016 window, PS4 leads with $314.14M in total sales — almost double the next contender (PS3 at $181.43M), with XOne ($159.32M) and 3DS ($143.25M) rounding out the campaign-relevant set.',
      'cs2.i2Label': 'Action vs Sports — user scores differ',
      'cs2.i2Body': 'Two-sample t-test (α = 0.01) on Action vs Sports user scores returns p ≈ 1.4 × 10⁻²⁰ — reject H₀. Genres are perceived differently by users. The Xbox One vs PC test (p = 0.148) instead fails to reject — platform alone doesn\'t move user scores.',
      'cs2.i3Label': 'User-rating ↔ sales correlation',
      'cs2.i3Body': 'Pearson correlation of −0.032 between user score and total sales — statistically indistinguishable from zero. Critic score, by contrast, shows a moderate +0.41. Reviews matter to critics; volume follows the press, not the players.',
      'cs2.chart1Title': 'Games released per year',
      'cs2.chart1Caption': 'Annual release volume from 1980 to 2016. The 2013+ window (highlighted) is the focused analysis era used to plan the 2017 campaign — platforms released in 2013 will be at or near their commercial peak.',
      'cs2.chart2Title': 'Top platforms by revenue — 2013–2016',
      'cs2.chart2Caption': 'Aggregate sales per platform within the modern-era window. PS4 leads with $314M; PS3, XOne and 3DS form the rest of the campaign-relevant set.',
      'cs2.chart3Title': 'User score vs sales',
      'cs2.chart3Caption': 'Scatter of user score against total sales. The trend line is essentially flat (r = −0.032) — the punchline of the entire analysis.',
      'cs2.codeTitle': 'Statistical work, made tangible.',
      'cs2.code1Caption': 'Filtered the dataset to the modern era and converted the messy user-score column into numerics before testing.',
      'cs2.code2Caption': 'Two-sample t-test for platform user scores. The test answered: are Xbox One and PC scores drawn from the same population?',
      'cs2.code3Caption': 'A reusable groupby-and-plot pattern I leaned on across the EDA. Small, but it saved hours.',
      'cs2.takeawayBody': 'For 2017, the campaign should overweight PS4 / Xbox One in NA and EU while running a separate Nintendo-focused track for Japan. Marketing should not anchor creative on user reviews — they don\'t predict sales, and the budget should chase platform reach and critical reception instead.',

      /* ---------- Case study 03 — Megaline ---------- */
      'cs3.tag': 'Statistical Testing · Telecom · α = 0.01',
      'cs3.title': '<span class="light">Two prepaid plans,</span> <span class="bold">one statistically louder.</span>',
      'cs3.intro': 'Megaline, a prepaid telecom operator, needed to decide which of two plans — Surf or Ultimate — generates more revenue per user. A clean two-sample hypothesis test, plus a volume paradox nobody expected.',
      'cs3.contextTitle': 'A pricing decision dressed as a statistics question.',
      'cs3.contextP1': 'Megaline\'s commercial team had a question that sounded simple: where should we steer customers? Surf or Ultimate? The plans differ in pricing, included minutes, messages and data allowances — but customer behaviour rarely matches plan design, so revenue per user is the only honest comparison.',
      'cs3.contextP2': 'I worked with 2018 data on 500 subscribers across five tables — users, plans, calls, messages and internet sessions. The analysis had to land in a decision the commercial team could defend to marketing finance.',
      'cs3.pullquote': 'Per user, Ultimate wins by 92%. But Surf still earns more total revenue. The plan with the lower ARPU is the bigger business.',
      'cs3.methodTitle': 'Five tables, one decision.',
      'cs3.m1Title': 'Data integration',
      'cs3.m1Body': 'Joined and harmonised five datasets. Resolved date types and a handful of edge-case anomalies before aggregating.',
      'cs3.m2Title': 'Revenue modelling',
      'cs3.m2Body': 'Computed monthly revenue per user from raw consumption + tariff + overage logic. This was the metric everything else hinged on.',
      'cs3.m3Title': 'Behavioural EDA',
      'cs3.m3Body': 'Compared distributions of minutes, messages and MB across the two plans using box plots and summary statistics.',
      'cs3.m4Title': 'Hypothesis tests',
      'cs3.m4Body': 'Two Welch t-tests at α = 0.01: plan-level revenue (Surf vs Ultimate) and regional revenue (NY-NJ vs other regions).',
      'cs3.m5Title': 'Recommendation',
      'cs3.m5Body': 'Translated the test outcomes into a budget-allocation and pricing-positioning recommendation.',
      'cs3.insightsTitle': 'Behaviour looked the same. Revenue told two different stories.',
      'cs3.i1Label': 'Behaviour gap, Surf vs Ultimate',
      'cs3.i1Body': 'Behavioural metrics are almost indistinguishable: Surf users average 428.75 minutes per month, Ultimate 430.45. Messages and data follow the same near-overlap.',
      'cs3.i2Label': 'Ultimate generates 92% more per user',
      'cs3.i2Body': 'Per-user monthly revenue: Surf $37.64 vs Ultimate $72.31. Two-sample Welch t-test at α = 0.01 returns p ≈ 7.55×10⁻²⁰⁶ — H₀ is rejected with overwhelming evidence.',
      'cs3.i3Label': 'The volume paradox',
      'cs3.i3Body': 'Total revenue tells the opposite story: Surf earned $59,200.50 against Ultimate\'s $52,066.00 — a $7,134 advantage. More users + a constant stream of overage charges flip the per-user picture upside down.',
      'cs3.chart1Title': 'Monthly call minutes — Surf vs Ultimate',
      'cs3.chart1Caption': 'Distribution of monthly minutes per user. Means: Surf 428.75 · Ultimate 430.45. Standard deviations are similar (Surf 234.38 · Ultimate 240.34) — the two cohorts essentially overlap.',
      'cs3.chart2Title': 'Average revenue per user — by plan',
      'cs3.chart2Caption': 'Mean monthly revenue per subscriber. Surf clusters around $37.64 with a long right tail driven by overages; Ultimate clusters around $72.31 close to its base rate.',
      'cs3.chart3Title': 'Total aggregate revenue — the volume paradox',
      'cs3.chart3Caption': 'When every user-month is summed up across 2018, Surf actually outearns Ultimate: $59,200.50 vs $52,066.00. The plan with the lower per-user ARPU wins on total revenue thanks to a larger subscriber base and persistent overage charges.',
      'cs3.codeTitle': 'The pieces of code that earned the conclusion.',
      'cs3.code1Caption': 'Per-user monthly aggregation — the building block. Minutes, messages and data sessions rolled up before the revenue function was applied.',
      'cs3.code2Caption': 'Two-sample t-test at α = 0.01 between Surf and Ultimate monthly revenue. Equal variances were not assumed — Welch\'s correction was used.',
      'cs3.code3Caption': 'Region filter for the secondary test. Splitting NY-NJ subscribers from the rest let us evaluate whether geography moves revenue independently of plan.',
      'cs3.takeawayBody': 'The answer depends on the question. Per user, Ultimate is the clear winner — 92% higher revenue at near-identical usage. But Surf still outearns Ultimate on total revenue ($59,200.50 vs $52,066.00) thanks to a larger subscriber base and a steady stream of overage charges. Push Ultimate for high-value new acquisitions; quietly resist downgrading existing Surf users — many are paying premium prices without realising it. The regional pricing case (NY-NJ vs rest) is not yet supported by the data — p = 0.0104 lands just above α = 0.01.',
    },

    es: {
      /* ---------- A11y / Nav ---------- */
      'a11y.skip': 'Saltar al contenido principal',
      'nav.role': 'Analista de Datos',
      'nav.projects': 'Proyectos',
      'nav.about': 'Sobre mí',
      'nav.experience': 'Experiencia',
      'nav.contact': 'Contacto',

      /* ---------- Hero ---------- */
      'hero.eyebrow': 'Analista de Datos · Disponible',
      'hero.title': '<span class="light">Convierte datos crudos en</span> <span class="bold">decisiones de negocio.</span>',
      'hero.subtitle': 'Estudiante de Negocios Internacionales construyendo carrera en análisis de datos y BI — combino una base estadística sólida con flujos asistidos por IA para entregar insights más rápido.',
      'hero.ctaPrimary': 'Ver case studies',
      'hero.ctaSecondary': 'Contáctame',
      'hero.metaLocation': 'Ubicación',
      'hero.metaStatus': 'Estatus',
      'hero.metaStatusVal': 'Abierto a roles remotos',
      'hero.metaLang': 'Idiomas',
      'hero.floatTag': 'Datos del notebook',

      /* ---------- Stat strip ---------- */
      'stat.cases': 'case studies end-to-end, respaldados por notebooks.',
      'stat.rows': 'registros analizados entre cohort, EDA y A/B testing.',
      'stat.internships': 'internships de datos en equipos remotos multiculturales.',

      /* ---------- Projects ---------- */
      'projects.eyebrow': 'Case Studies Destacados',
      'projects.title': '<span class="light">Tres problemas,</span> <span class="bold">resueltos con datos.</span>',
      'projects.meta': 'Trabajos seleccionados — 2025',
      'projects.cta': 'Leer case study',
      'projects.p1.title': '<span class="light">Showz —</span> <span class="bold">Análisis de Marketing Performance</span>',
      'projects.p1.desc': 'Análisis de cohortes, LTV y ROMI por canal de adquisición para una plataforma de boletos. Recomendación: reasignar el 30% del gasto.',
      'projects.p2.title': '<span class="light">Ice —</span> <span class="bold">Análisis de Ventas de Videojuegos</span>',
      'projects.p2.desc': 'EDA y t-tests sobre 16,715 títulos para planear la campaña 2017 de un retailer global.',
      'projects.p3.title': '<span class="light">Megaline —</span> <span class="bold">Análisis de Ingresos por Cliente</span>',
      'projects.p3.desc': 'Pruebas de hipótesis sobre planes prepago — y una paradoja de volumen.',

      /* ---------- About ---------- */
      'about.eyebrow': 'Sobre mí',
      'about.title': '<span class="light">Analista por formación,</span> <span class="bold">builder por instinto.</span>',
      'about.p1': 'Estudiante de Negocios Internacionales y <span class="bold">Analista de Datos</span> con experiencia analizando datos operativos, construyendo dashboards en Power BI y automatizando flujos de trabajo. Combino una base estadística sólida — pruebas de hipótesis, probabilidad, análisis descriptivo — con desarrollo asistido por IA para entregar insights más rápido.',
      'about.p2': 'Enfocado en conseguir un rol full-time como Analista de Datos mientras refuerzo mis fundamentos con estudio estructurado y proyectos reales.',
      'about.stat1': 'case studies end-to-end con análisis de cohortes, pruebas de hipótesis y modelado de ingresos.',
      'about.stat2': 'internships en equipos remotos multiculturales (startups de Canadá y LATAM).',

      /* ---------- Trajectory ---------- */
      'traj.eyebrow': 'Trayectoria',
      'traj.title': '<span class="light">Skills, apiladas.</span> <span class="bold">Carrera en movimiento.</span>',
      'traj.meta': 'Cada barra = profundidad de skill en esa etapa.',
      'traj.b1Period': 'Fundación',
      'traj.b1Title': 'Pre-bootcamp',
      'traj.b1Skill': 'Estrategia de negocio, finanzas, comercio — la lente detrás de los números.',
      'traj.b2Period': 'Bootcamp',
      'traj.b2Title': 'TripleTen',
      'traj.b2Skill': 'Python, SQL, estadística, EDA, A/B testing y tres case studies reales.',
      'traj.b3Period': 'Internship + Startup',
      'traj.b3Title': 'Vosyn + VARAC',
      'traj.b3Skill': 'Dashboards en Power BI, flujos de IA, levantamiento de requisitos.',
      'traj.b4Period': 'Hoy',
      'traj.b4Title': 'micro1 + Codecademy',
      'traj.b4Skill': 'Evaluación de outputs de IA, BI fundamentals, en búsqueda activa de rol como Data Analyst.',

      /* ---------- Experience ---------- */
      'exp.eyebrow': 'Experiencia',
      'exp.title': '<span class="light">Dónde he puesto</span> <span class="bold">los datos a trabajar.</span>',
      'exp.present': 'Presente',
      'exp.remote': 'Remoto',
      'exp.canada': 'Remoto (Ontario, Canadá)',
      'exp.micro1': 'Reviso y valido outputs generados por IA contra guidelines de calidad, aplicando criterio analítico para detectar errores y mejorar el desempeño del modelo.',
      'exp.varac': 'Construí agentes de IA y flujos de automatización para clientes usando Python, n8n, FastAPI y React. Lideré reuniones con clientes, levantamiento de requisitos y entrega de proyectos end-to-end en una startup.',
      'exp.vosyn': 'Limpié y analicé datasets de productividad entre departamentos. Diseñé dashboards interactivos en Power BI para monitorear KPIs y descubrir tendencias para el equipo directivo.',

      /* ---------- Education ---------- */
      'edu.eyebrow': 'Educación',
      'edu.title': '<span class="light">Siempre aprendiendo,</span> <span class="bold">de forma estructurada.</span>',
      'edu.inProgress': 'En curso',
      'edu.completed': 'Completado',
      'edu.codecademy': 'Reforzando fundamentos de BI — modelado dimensional, SQL avanzado, patrones de dashboarding.',
      'edu.tripleten': 'Programa de 11 sprints cubriendo Python, SQL, estadística, EDA, pruebas A/B y dashboarding.',
      'edu.uvm': 'Base en estrategia de negocio, comercio internacional, finanzas y operaciones.',

      /* ---------- Stack ---------- */
      'stack.eyebrow': 'Stack Técnico',
      'stack.title': '<span class="light">El toolkit,</span> <span class="bold">organizado.</span>',
      'stack.meta': 'Sin sopa de badges — fluidez real.',
      'stack.cat1': 'Datos y Análisis',
      'stack.cat2': 'Visualización y BI',
      'stack.cat3': 'Estadística',
      'stack.cat4': 'IA y Automatización',
      'stack.cat5': 'Herramientas',
      'stack.hyp': 'Pruebas de Hipótesis',
      'stack.prob': 'Probabilidad',
      'stack.desc': 'Análisis Descriptivo',

      /* ---------- Contact ---------- */
      'contact.eyebrow': 'Contacto',
      'contact.title': '<span class="light">Hablemos</span> <span class="bold">de datos.</span>',
      'contact.body': 'Estoy abierto a roles remotos como Data Analyst, BI y analytics-engineering. Escríbeme — feliz de compartir mi CV, recorrer un case study o intercambiar notas.',
      'contact.phone': 'Teléfono',
      'contact.ctaPrimary': 'Mándame un correo',
      'contact.ctaSecondary': 'Conecta en LinkedIn',

      /* ---------- Footer ---------- */
      'footer.built': 'Hecho con HTML · CSS · JS',
      'footer.source': 'Ver código fuente',

      /* ---------- Case study shared ---------- */
      'cs.backHome': 'Inicio',
      'cs.backProjects': 'Proyectos',
      'cs.viewRepo': 'Ver en GitHub',
      'cs.prev': 'Case study anterior',
      'cs.next': 'Siguiente case study',
      'cs.expandFull': 'Ver análisis completo',
      'cs.expandCode': 'Ver más código',
      'cs.factDataset': 'Dataset',
      'cs.factTools': 'Herramientas',
      'cs.factYear': 'Año',
      'cs.factDomain': 'Sector',
      'cs.contextLabel': 'Contexto de negocio',
      'cs.methodLabel': 'Metodología',
      'cs.insightsLabel': 'Insights clave',
      'cs.codeLabel': 'Código destacado',
      'cs.takeawayLabel': 'Conclusión final',

      /* ---------- Case study 01 — Showz ---------- */
      'cs1.tag': 'Marketing Analytics · Análisis de Cohortes',
      'cs1.title': '<span class="light">Cómo encontramos los canales</span> <span class="bold">que sí valen la inversión.</span>',
      'cs1.intro': 'Auditoría end-to-end del funnel de usuarios y el gasto de marketing de Showz, una plataforma online de venta de boletos. Objetivo: identificar qué canales de adquisición realmente recuperan inversión y cuáles están drenando el presupuesto en silencio.',
      'cs1.contextTitle': 'Una plataforma de boletos con un problema de marketing.',
      'cs1.contextP1': 'Showz opera un marketplace de boletos para eventos. Como muchas plataformas en etapa temprana, tenían un top of funnel claro pero atribución borrosa más abajo: marketing gastaba en múltiples canales pero nadie podía responder con confianza cuáles generaban clientes rentables — y cuáles solo compraban tráfico.',
      'cs1.contextP2': 'El brief era deliberadamente abierto: construir la lente con la que Showz pudiera evaluar performance de marketing end-to-end. Eso implicaba ir desde los logs de eventos hasta una recomendación defendible sobre dónde debería ir el siguiente dólar de marketing.',
      'cs1.pullquote': 'Sources 1 y 2 generan el 70% del revenue con menos del 30% del gasto. Source 3 hace lo contrario.',
      'cs1.methodTitle': 'Pipeline de funnel a finanzas.',
      'cs1.m1Title': 'Limpieza de datos',
      'cs1.m1Body': 'Estandaricé tres datasets — visitas, órdenes y costos de anuncios. Normalicé campos datetime y agregué features derivados de mes/semana.',
      'cs1.m2Title': 'Métricas de engagement',
      'cs1.m2Body': 'Calculé DAU, WAU y MAU. Superpuse duración de sesión y ventanas de conversión.',
      'cs1.m3Title': 'Análisis de cohortes',
      'cs1.m3Body': 'Cohorticé usuarios por mes de adquisición. Tracé tiempo a primera compra y curvas de retención por cohorte.',
      'cs1.m4Title': 'Unit economics',
      'cs1.m4Body': 'Calculé LTV, CAC y ROMI por fuente de adquisición. Crucé con datos de costo por canal.',
      'cs1.m5Title': 'Recomendación',
      'cs1.m5Body': 'Ranking de canales por ratio LTV : CAC traducido a una propuesta de reasignación de presupuesto.',
      'cs1.insightsTitle': 'Tres números que cambian el presupuesto.',
      'cs1.i1Label': 'Línea base de engagement',
      'cs1.i1Body': 'Promedio de 23,228 usuarios activos mensuales — base saludable de demanda contra la cual medir performance por canal. Los usuarios activos diarios crecieron de 845 (2017) a 997 (2018).',
      'cs1.i2Label': 'Source 1 — mejor retorno por dólar',
      'cs1.i2Body': 'Source 1 devuelve $110 por cada $1 de inversión en marketing — un LTV de $322 contra un CAC de apenas $2.92. Source 2 es el cercano segundo lugar (ROMI 62×).',
      'cs1.i3Label': 'Source 3 — a dónde fue el presupuesto',
      'cs1.i3Body': 'Source 3 recibió la mayor inversión pero devolvió solo $2.10 por cada dólar gastado — cincuenta veces menos eficiente que Source 1. El CAC ($10.21) supera al LTV ($21.43) en la mayor parte de la ventana de cohorte.',
      'cs1.chart1Title': 'Usuarios activos diarios — 2017 vs 2018',
      'cs1.chart1Caption': 'El promedio diario creció de 845 (2017) a 997 (2018) — un aumento del 18%. Promedios semanal y mensual: 5,716 WAU y 23,228 MAU.',
      'cs1.chart2Title': 'Ingresos por fuente de adquisición',
      'cs1.chart2Caption': 'Ingreso total atribuido a cada source_id en la ventana de análisis. Source 7 (un solo cliente, cero inversión) queda fuera del gráfico.',
      'cs1.chart3Title': 'LTV vs CAC por fuente de adquisición',
      'cs1.chart3Caption': 'Sources 1 y 2 entregan LTVs por encima de $320 contra CACs por debajo de $6. Source 3 es el único canal donde el CAC ($10.21) supera al LTV ($21.43) en cualquier ventana de cohorte observable.',
      'cs1.codeTitle': 'Los fragmentos de código de los que más me enorgullezco.',
      'cs1.code1Caption': 'Asignación de cohorte — agrupar a cada usuario por el mes en que visitó por primera vez, lo que ancla todo el análisis de retención posterior.',
      'cs1.code2Caption': 'LTV por fuente de adquisición — un join entre órdenes y metadata de adquisición, agregado a vista por canal del valor del cliente.',
      'cs1.code3Caption': 'Andamio de engagement — DAU, WAU y MAU en una sola pasada que alimentó casi todos los gráficos posteriores.',
      'cs1.takeawayBody': 'Si estuviera en el equipo de marketing de Showz, sacaría presupuesto de Source 3 y lo redirigiría a Sources 1, 2 y 5 — los tres canales donde el LTV supera al CAC por 20× o más. El problema de Source 3 no es volumen; es calidad de audiencia, y ningún presupuesto adicional rescata un CAC de $10.21 contra un LTV de $21.43.',

      /* ---------- Case study 02 — Video Game Sales ---------- */
      'cs2.tag': 'EDA · Pruebas de Hipótesis · 16,715 registros',
      'cs2.title': '<span class="light">Lo que realmente predice</span> <span class="bold">un videojuego exitoso.</span>',
      'cs2.intro': 'Para Ice, un retailer global de videojuegos, trabajé sobre 16,715 títulos para entender qué motiva el éxito comercial. La respuesta resultó tener menos que ver con reseñas y más con timing de plataforma y ajuste regional.',
      'cs2.contextTitle': 'Planear una campaña 2017 con datos hasta 2016.',
      'cs2.contextP1': 'Ice es un retailer online ficticio con alcance global en Norteamérica, Europa y Japón. Marketing quería planear una campaña 2017 y planteó una pregunta engañosamente simple: ¿qué juegos, en qué plataformas, en qué regiones, vale la pena promover?',
      'cs2.contextP2': 'El dataset abarcaba décadas de lanzamientos, así que el trabajo arrancó con una decisión editorial fuerte — ¿qué años importan para una campaña a futuro? Después de graficar el volumen de lanzamientos en el tiempo, anclé el análisis en la ventana más reciente de cinco años donde la mezcla de plataformas aún se parecía al panorama actual.',
      'cs2.pullquote': 'Las reseñas predicen artículos de prensa. Las ventas siguen plataformas y timing — no estrellas.',
      'cs2.methodTitle': 'De dieciséis mil filas a un brief de campaña.',
      'cs2.m1Title': 'Limpieza',
      'cs2.m1Body': 'Resolví duplicados, casts de tipo y un "TBD" complicado en user_score antes de agregar cualquier cosa.',
      'cs2.m2Title': 'Selección de era',
      'cs2.m2Body': 'Usé distribuciones de volumen de lanzamientos para defender una ventana temporal reducida — los mismos datos, con una pregunta más inteligente.',
      'cs2.m3Title': 'EDA por plataforma y género',
      'cs2.m3Body': 'Comparé ingresos y unidades vendidas entre plataformas y géneros, tanto global como por región.',
      'cs2.m4Title': 'Pruebas de hipótesis',
      'cs2.m4Body': 'T-tests de dos muestras sobre user scores entre plataformas (Xbox One vs PC) y entre géneros (Action vs Sports).',
      'cs2.m5Title': 'Perfilado regional',
      'cs2.m5Body': 'Construí perfiles regionales de preferencia para plataformas y géneros top — Japón no se parecía en nada a NA o EU.',
      'cs2.insightsTitle': 'Tres hallazgos que merecen una campaña.',
      'cs2.i1Label': 'Líder del modern era',
      'cs2.i1Body': 'En la ventana 2013–2016 que define el análisis, PS4 lidera con $314.14M en ventas totales — casi el doble del siguiente (PS3 con $181.43M), seguidos por XOne ($159.32M) y 3DS ($143.25M).',
      'cs2.i2Label': 'Action vs Sports — los user scores difieren',
      'cs2.i2Body': 'T-test de dos muestras (α = 0.01) sobre user scores Action vs Sports devuelve p ≈ 1.4 × 10⁻²⁰ — rechazamos H₀. Los géneros se perciben distinto. La prueba Xbox One vs PC (p = 0.148) por su parte falla en rechazar — la plataforma por sí sola no mueve el user score.',
      'cs2.i3Label': 'Correlación user-rating ↔ ventas',
      'cs2.i3Body': 'Correlación de Pearson de −0.032 entre user score y ventas totales — estadísticamente indistinguible de cero. El critic score, en cambio, muestra un moderado +0.41. Las reseñas importan a los críticos; el volumen sigue a la prensa, no a los jugadores.',
      'cs2.chart1Title': 'Juegos lanzados por año',
      'cs2.chart1Caption': 'Volumen anual de lanzamientos de 1980 a 2016. La ventana 2013+ (resaltada) es la era de análisis para planear la campaña 2017 — las plataformas lanzadas en 2013 estarán cerca de su pico comercial.',
      'cs2.chart2Title': 'Plataformas top por ingreso — 2013–2016',
      'cs2.chart2Caption': 'Ventas agregadas por plataforma dentro de la ventana del modern era. PS4 lidera con $314M; PS3, XOne y 3DS conforman el resto del set relevante para la campaña.',
      'cs2.chart3Title': 'User score vs ventas',
      'cs2.chart3Caption': 'Scatter de user score contra ventas totales. La línea de tendencia es casi plana (r = −0.032) — el punchline de todo el análisis.',
      'cs2.codeTitle': 'Trabajo estadístico, hecho tangible.',
      'cs2.code1Caption': 'Filtré el dataset a la era moderna y convertí la columna desordenada de user_score a numéricos antes de testear.',
      'cs2.code2Caption': 'T-test de dos muestras para user scores entre plataformas. La prueba respondía: ¿son las distribuciones de Xbox One y PC de la misma población?',
      'cs2.code3Caption': 'Un patrón reutilizable de groupby + plot que apliqué transversalmente en el EDA. Pequeño, pero me ahorró horas.',
      'cs2.takeawayBody': 'Para 2017, la campaña debería sobreponderar PS4 / Xbox One en NA y EU mientras se corre un track separado enfocado a Nintendo en Japón. Marketing no debe anclar el creativo en user reviews — no predicen ventas, y el presupuesto debería ir tras alcance de plataforma y recepción crítica.',

      /* ---------- Case study 03 — Megaline ---------- */
      'cs3.tag': 'Pruebas Estadísticas · Telecom · α = 0.01',
      'cs3.title': '<span class="light">Dos planes prepago,</span> <span class="bold">uno estadísticamente más fuerte.</span>',
      'cs3.intro': 'Megaline, operador de telecomunicaciones prepago, necesitaba decidir cuál de dos planes — Surf o Ultimate — genera más ingreso por usuario. Una prueba de hipótesis de dos muestras limpia, más una paradoja de volumen que nadie esperaba.',
      'cs3.contextTitle': 'Una decisión de pricing disfrazada de pregunta estadística.',
      'cs3.contextP1': 'El equipo comercial de Megaline tenía una pregunta que sonaba simple: ¿a dónde dirigimos a los clientes? ¿Surf o Ultimate? Los planes difieren en precio, minutos incluidos, mensajes y data — pero el comportamiento del cliente rara vez calza con el diseño del plan, así que el ingreso por usuario es la única comparación honesta.',
      'cs3.contextP2': 'Trabajé con datos de 2018 sobre 500 suscriptores en cinco tablas — usuarios, planes, llamadas, mensajes y sesiones de internet. El análisis tenía que aterrizar en una decisión que el equipo comercial pudiera defender ante finanzas de marketing.',
      'cs3.pullquote': 'Por usuario, Ultimate gana 92%. Pero Surf factura más en total. El plan con menor ARPU es el negocio más grande.',
      'cs3.methodTitle': 'Cinco tablas, una decisión.',
      'cs3.m1Title': 'Integración de datos',
      'cs3.m1Body': 'Uní y armonicé cinco datasets. Resolví tipos de fecha y anomalías de borde antes de agregar.',
      'cs3.m2Title': 'Modelo de ingreso',
      'cs3.m2Body': 'Calculé el ingreso mensual por usuario desde el consumo bruto + tarifa + lógica de overage. Esta métrica era el pilar de todo lo demás.',
      'cs3.m3Title': 'EDA conductual',
      'cs3.m3Body': 'Comparé distribuciones de minutos, mensajes y MB entre los dos planes usando box plots y estadística descriptiva.',
      'cs3.m4Title': 'Pruebas de hipótesis',
      'cs3.m4Body': 'Dos t-tests de Welch a α = 0.01: ingreso por plan (Surf vs Ultimate) y por región (NY-NJ vs el resto).',
      'cs3.m5Title': 'Recomendación',
      'cs3.m5Body': 'Traduje los resultados de las pruebas en una recomendación de asignación de presupuesto y posicionamiento de pricing.',
      'cs3.insightsTitle': 'El comportamiento era casi igual. El ingreso contó dos historias distintas.',
      'cs3.i1Label': 'Diferencia conductual, Surf vs Ultimate',
      'cs3.i1Body': 'Las métricas conductuales son casi indistinguibles: usuarios Surf promedian 428.75 minutos al mes, Ultimate 430.45. Lo mismo con mensajes y datos.',
      'cs3.i2Label': 'Ultimate genera 92% más por usuario',
      'cs3.i2Body': 'Ingreso mensual por usuario: Surf $37.64 vs Ultimate $72.31. El t-test de Welch a α = 0.01 devuelve p ≈ 7.55×10⁻²⁰⁶ — H₀ se rechaza con evidencia abrumadora.',
      'cs3.i3Label': 'La paradoja del volumen',
      'cs3.i3Body': 'El ingreso total cuenta la historia opuesta: Surf generó $59,200.50 contra los $52,066.00 de Ultimate — ventaja de $7,134. Más usuarios + un flujo constante de cargos por overage invierten la fotografía por usuario.',
      'cs3.chart1Title': 'Minutos mensuales — Surf vs Ultimate',
      'cs3.chart1Caption': 'Distribución de minutos mensuales por usuario. Medias: Surf 428.75 · Ultimate 430.45. Las desviaciones estándar son similares (Surf 234.38 · Ultimate 240.34) — las dos cohortes esencialmente se sobreponen.',
      'cs3.chart2Title': 'Ingreso promedio por usuario — por plan',
      'cs3.chart2Caption': 'Ingreso promedio mensual por suscriptor. Surf se concentra alrededor de $37.64 con una cola derecha larga por overage; Ultimate se concentra alrededor de $72.31 cerca de su tarifa base.',
      'cs3.chart3Title': 'Ingreso total agregado — la paradoja del volumen',
      'cs3.chart3Caption': 'Cuando se suman todos los usuario-meses de 2018, Surf de hecho gana más que Ultimate: $59,200.50 vs $52,066.00. El plan con menor ARPU gana en ingreso total gracias a una base de suscriptores más grande y cargos persistentes por overage.',
      'cs3.codeTitle': 'Los fragmentos de código que ganaron la conclusión.',
      'cs3.code1Caption': 'Agregación mensual por usuario — el bloque base. Minutos, mensajes y sesiones de internet roll-up antes de aplicar la función de ingreso.',
      'cs3.code2Caption': 'T-test de dos muestras a α = 0.01 entre ingreso mensual de Surf y Ultimate. No se asumió igualdad de varianzas — se usó la corrección de Welch.',
      'cs3.code3Caption': 'Filtro regional para la prueba secundaria. Separar a los suscriptores NY-NJ del resto permitió evaluar si la geografía mueve el ingreso independientemente del plan.',
      'cs3.takeawayBody': 'La respuesta depende de la pregunta. Por usuario, Ultimate es el claro ganador — 92% más ingreso con uso casi idéntico. Pero Surf supera a Ultimate en ingreso total ($59,200.50 vs $52,066.00) gracias a una base de suscriptores más grande y un flujo constante de cargos por overage. Empujar Ultimate para nuevas adquisiciones de alto valor; resistir discretamente los downgrades de usuarios Surf existentes — muchos están pagando precios premium sin saberlo. El caso de pricing regional (NY-NJ vs resto) aún no se sustenta con los datos — p = 0.0104 queda apenas por encima de α = 0.01.',
    },
  };

  /* ---------- Engine ---------- */

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }
  function setLang(lang) {
    if (!DICT[lang]) lang = DEFAULT_LANG;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    apply(lang);
    syncButtons(lang);
  }
  function apply(lang) {
    const dict = DICT[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = dict[key];
      if (value !== undefined) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const value = dict[key];
      if (value !== undefined) el.innerHTML = value;
    });
  }
  function syncButtons(lang) {
    document.querySelectorAll('.lang-toggle [data-lang]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
    });
  }
  function init() {
    setLang(getLang());
    document.querySelectorAll('.lang-toggle [data-lang]').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.SLI18N = { setLang, apply, getLang };
})();
