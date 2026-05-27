/* ============================================================
   i18n — Lightweight EN/ES dictionary + toggle
   Usage: add data-i18n="key" to any element. The element's textContent
   is replaced when the language changes. Choice persists in localStorage.
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'sl-portfolio-lang';
  const DEFAULT_LANG = 'en';

  const DICT = {
    en: {
      /* ---------- A11y ---------- */
      'a11y.skip': 'Skip to main content',

      /* ---------- Nav ---------- */
      'nav.role': 'Data Analyst',
      'nav.projects': 'Projects',
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.contact': 'Contact',

      /* ---------- Hero ---------- */
      'hero.eyebrow': 'Data Analyst · Business Intelligence',
      'hero.titleA': 'Turning raw data',
      'hero.titleB': 'into business decisions.',
      'hero.subtitle': 'International Business student building a career in data analytics and business intelligence — combining a statistical foundation with AI-assisted workflows to deliver insights faster and at a higher quality bar.',
      'hero.ctaPrimary': 'View case studies',
      'hero.ctaSecondary': 'Get in touch',
      'hero.metaLocation': 'Based in',
      'hero.metaStatus': 'Status',
      'hero.metaStatusVal': 'Open to remote roles',
      'hero.metaLang': 'Languages',

      /* ---------- Featured projects ---------- */
      'projects.eyebrow': 'Featured Case Studies',
      'projects.title': 'Three problems, solved with data.',
      'projects.meta': 'Selected works — 2025',
      'projects.cta': 'Read case study',
      'projects.p1.title': 'Showz — Marketing Performance Analysis',
      'projects.p1.desc': 'Cohort analysis, LTV and ROMI evaluation across acquisition channels for a ticket-sales platform.',
      'projects.p2.title': 'Ice — Video Game Sales Analysis',
      'projects.p2.desc': 'EDA and statistical testing across 16,715 titles to plan a 2017 campaign for a global retailer.',
      'projects.p3.title': 'Megaline — Customer Revenue Analysis',
      'projects.p3.desc': 'Two-sample hypothesis testing to identify which prepaid plan generates higher revenue.',

      /* ---------- About ---------- */
      'about.eyebrow': 'About',
      'about.title': 'Analyst by training, builder by instinct.',
      'about.p1': 'International Business student and Data Analyst with hands-on experience analysing operational data, building Power BI dashboards and automating business workflows. I combine a strong statistical foundation — hypothesis testing, probability, descriptive analysis — with modern AI-assisted development to deliver insights faster and at a higher quality bar.',
      'about.p2': 'I\'m currently focused on landing a full-time Data Analyst role while continuing to strengthen my fundamentals through structured study and real-world projects. Comfortable working remotely across time zones, and equally at home in a stakeholder meeting or a Jupyter notebook.',
      'about.stat1': 'end-to-end case studies covering cohort analysis, hypothesis testing and revenue modelling.',
      'about.stat2': 'internships in remote, cross-cultural teams (Canada & LATAM startups).',

      /* ---------- Experience ---------- */
      'exp.eyebrow': 'Experience',
      'exp.title': 'Where I\'ve put data to work.',
      'exp.present': 'Present',
      'exp.remote': 'Remote',
      'exp.canada': 'Remote (Ontario, Canada)',
      'exp.micro1': 'Review and validate AI-generated outputs against quality guidelines, applying analytical criteria to identify errors and improve model performance.',
      'exp.varac': 'Built AI agents and automation workflows for business clients using Python, n8n, FastAPI and React. Led client meetings, requirements gathering and end-to-end project delivery in a fast-paced startup environment.',
      'exp.vosyn': 'Cleaned and analysed productivity datasets across departments. Designed interactive Power BI dashboards to track KPIs and surface trends for senior management.',

      /* ---------- Education ---------- */
      'edu.eyebrow': 'Education',
      'edu.title': 'Always learning, structured.',
      'edu.inProgress': 'In progress',
      'edu.completed': 'Completed',
      'edu.codecademy': 'Strengthening BI fundamentals — dimensional modelling, advanced SQL, dashboarding patterns.',
      'edu.tripleten': '11-sprint program covering Python, SQL, statistics, EDA, A/B testing and dashboarding — graduated with three end-to-end portfolio projects.',
      'edu.uvm': 'Grounding in business strategy, international trade, finance and operations — the lens I bring to every dataset.',

      /* ---------- Stack ---------- */
      'stack.eyebrow': 'Tech Stack',
      'stack.title': 'The toolkit, organised.',
      'stack.meta': 'No badge soup — actual fluency.',
      'stack.cat1': 'Data & Analysis',
      'stack.cat2': 'Visualization & BI',
      'stack.cat3': 'Statistics',
      'stack.cat4': 'AI & Automation',
      'stack.cat5': 'Tools',
      'stack.learning': '(learning)',
      'stack.hyp': 'Hypothesis Testing',
      'stack.prob': 'Probability',
      'stack.desc': 'Descriptive Analysis',

      /* ---------- Contact ---------- */
      'contact.eyebrow': 'Get in touch',
      'contact.title': 'Let\'s talk data.',
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
      'cs1.title': 'How we found the channels worth spending on.',
      'cs1.intro': 'An end-to-end audit of the user funnel and marketing spend for Showz, an online events ticketing platform. Goal: pinpoint which acquisition channels actually pay back, and which are quietly draining the budget.',
      'cs1.contextTitle': 'A ticketing platform with a marketing problem.',
      'cs1.contextP1': 'Showz operates an online events ticketing marketplace. Like most early-growth platforms, they had a clear top of funnel but blurry attribution downstream: marketing was spending across multiple acquisition channels, but no one could confidently answer which channels were generating profitable customers — and which were just buying traffic.',
      'cs1.contextP2': 'The brief was deliberately open: build the lens through which Showz can evaluate marketing performance, end to end. That meant going from raw event logs all the way to a defensible recommendation on where the next marketing dollar should go.',
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
      'cs1.i1Label': 'Daily active users · 2017–18 avg',
      'cs1.i1Body': 'Average daily traffic of 908 users, scaling to 23,228 monthly active users — a healthy baseline against which channel performance can be measured.',
      'cs1.i2Label': 'Top channels by ROI',
      'cs1.i2Body': 'Channels 2 and 1 generated the highest revenue despite receiving the lowest marketing spend — the inverse of what the team assumed.',
      'cs1.i3Label': 'Channel 3 ROMI',
      'cs1.i3Body': 'Channel 3 received the largest investment but returned under $500K in revenue. LTV did not recoup CAC inside any observable cohort window.',
      'cs1.chart1Title': 'Traffic engagement, 2017 vs 2018',
      'cs1.chart1Caption': 'Comparison of average daily, weekly and monthly active users across two fiscal years — establishes the demand baseline.',
      'cs1.chart2Title': 'Revenue by marketing channel',
      'cs1.chart2Caption': 'Total revenue attributed to each acquisition source over the analysis window.',
      'cs1.chart3Title': 'LTV vs CAC by acquisition source',
      'cs1.chart3Caption': 'A channel is healthy when LTV comfortably exceeds CAC. Channels 1 and 2 clear this bar; channel 3 inverts it.',
      'cs1.codeTitle': 'The pieces of code I\'m most proud of.',
      'cs1.code1Caption': 'Cohort assignment — collapsing every user into the month they first visited, which anchors all downstream retention analysis.',
      'cs1.code2Caption': 'LTV per acquisition source — a join across orders and acquisition metadata, aggregated to a per-source view of customer value.',
      'cs1.code3Caption': 'Engagement scaffolding — single-call DAU, WAU and MAU that fed almost every downstream chart.',
      'cs1.takeawayBody': 'If I were sitting on Showz\'s marketing team, I\'d reallocate roughly 30% of the channel-3 budget toward channels 1 and 2 — and revisit channel 3\'s targeting before any further investment. The cohort data suggests the audience quality, not the volume, is the issue.',

      /* ---------- Case study 02 — Video Game Sales ---------- */
      'cs2.tag': 'EDA · Hypothesis Testing · 16,715 records',
      'cs2.title': 'What actually predicts a hit video game.',
      'cs2.intro': 'For Ice, a global video game retailer, I worked through 16,715 titles to understand what drives commercial success. The answer turned out to be less about reviews and more about platform timing and regional fit.',
      'cs2.contextTitle': 'Planning a 2017 campaign with data through 2016.',
      'cs2.contextP1': 'Ice is a fictional online retailer with global reach across North America, Europe and Japan. Marketing wanted to plan a 2017 ad campaign and asked a deceptively simple question: which games, on which platforms, in which regions, are worth promoting?',
      'cs2.contextP2': 'The dataset spanned decades of releases, so the work started with a hard editorial decision — which years matter for a forward-looking campaign? After charting release volume over time, I anchored the analysis on the most recent five-year window where platform mixes still resembled the current landscape.',
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
      'cs2.i1Label': 'Top revenue platforms',
      'cs2.i1Body': 'PlayStation 2, PlayStation 3 and Xbox 360 dominate aggregate sales — but regional preferences diverge sharply, particularly in Japan where Nintendo platforms lead.',
      'cs2.i2Label': 'Top revenue genres',
      'cs2.i2Body': 'Action, Sports and Shooter generate the highest revenue in NA and EU. Japan flips the order with Role-Playing taking the top.',
      'cs2.i3Label': 'User-rating ↔ sales correlation',
      'cs2.i3Body': 'Pearson correlation of roughly 0.03 between user ratings and sales — statistically indistinguishable from zero. Reviews do not drive volume.',
      'cs2.chart1Title': 'Games released per year',
      'cs2.chart1Caption': 'Annual release volume across the dataset, used to argue for a focused recent-era analysis window.',
      'cs2.chart2Title': 'Top platforms by global revenue',
      'cs2.chart2Caption': 'Aggregate revenue per platform — the foundation of the platform-prioritisation argument.',
      'cs2.chart3Title': 'User rating vs sales',
      'cs2.chart3Caption': 'Scatter of user score against units sold. The near-flat trend line is the punchline.',
      'cs2.codeTitle': 'Statistical work, made tangible.',
      'cs2.code1Caption': 'Filtered the dataset to the modern era and converted the messy user-score column into numerics before testing.',
      'cs2.code2Caption': 'Two-sample t-test for platform user scores. The test answered: are Xbox One and PC scores drawn from the same population?',
      'cs2.code3Caption': 'A reusable groupby-and-plot pattern I leaned on across the EDA. Small, but it saved hours.',
      'cs2.takeawayBody': 'For 2017, the campaign should overweight PS4 / Xbox One in NA and EU while running a separate Nintendo-focused track for Japan. Marketing should not anchor creative on user reviews — they don\'t predict sales, and the budget should chase platform reach and critical reception instead.',

      /* ---------- Case study 03 — Megaline ---------- */
      'cs3.tag': 'Statistical Testing · Telecom · α = 0.01',
      'cs3.title': 'Two prepaid plans, one statistically louder.',
      'cs3.intro': 'Megaline, a prepaid telecom operator, needed to decide which of two plans — Surf or Ultimate — generates more revenue per user. A clean two-sample hypothesis test, plus a regional twist that nobody asked for.',
      'cs3.contextTitle': 'A pricing decision dressed as a statistics question.',
      'cs3.contextP1': 'Megaline\'s commercial team had a question that sounded simple: where should we steer customers? Surf or Ultimate? The plans differ in pricing, included minutes, messages and data allowances — but customer behaviour rarely matches plan design, so revenue per user is the only honest comparison.',
      'cs3.contextP2': 'I worked with 2018 data on 500 subscribers across five tables — users, plans, calls, messages and internet sessions. The analysis had to land in a decision the commercial team could defend to marketing finance.',
      'cs3.methodTitle': 'Five tables, one decision.',
      'cs3.m1Title': 'Data integration',
      'cs3.m1Body': 'Joined and harmonised five datasets. Resolved date types and a handful of edge-case anomalies before aggregating.',
      'cs3.m2Title': 'Revenue modelling',
      'cs3.m2Body': 'Computed monthly revenue per user from raw consumption + tariff + overage logic. This was the metric everything else hinged on.',
      'cs3.m3Title': 'Behavioural EDA',
      'cs3.m3Body': 'Compared distributions of minutes, messages and MB across the two plans using box plots and summary statistics.',
      'cs3.m4Title': 'Hypothesis tests',
      'cs3.m4Body': 'Two-sample t-tests at α = 0.01 — one for plan-level revenue, one for regional revenue (NY-NJ vs everywhere else).',
      'cs3.m5Title': 'Recommendation',
      'cs3.m5Body': 'Translated the test outcomes into a budget-allocation and pricing-positioning recommendation.',
      'cs3.insightsTitle': 'Behaviour looked the same. Revenue did not.',
      'cs3.i1Label': 'Surf vs Ultimate · monthly minutes',
      'cs3.i1Body': 'Behavioural metrics are almost indistinguishable: Surf users average 428.7 minutes per month, Ultimate users 430.5. Same with messages and data.',
      'cs3.i2Label': 'p-value, plan revenue test',
      'cs3.i2Body': 'Despite near-identical usage, monthly revenue differs significantly between plans (p < 0.01). Pricing structure, not behaviour, is doing the work.',
      'cs3.i3Label': 'Regional revenue gap',
      'cs3.i3Body': 'NY-NJ subscribers show a revenue distribution distinct enough to reject equality with the rest of the country — a clear case for geo-targeted pricing.',
      'cs3.chart1Title': 'Call minutes — Surf vs Ultimate',
      'cs3.chart1Caption': 'Distribution of monthly call minutes for both plans. Centres are nearly identical; the tails tell the difference.',
      'cs3.chart2Title': 'Monthly revenue by plan',
      'cs3.chart2Caption': 'Average revenue per user, month over month. Ultimate consistently leads — and the gap is statistically real.',
      'cs3.chart3Title': 'Revenue by region',
      'cs3.chart3Caption': 'Comparison of average revenue between NY-NJ subscribers and the rest of the customer base.',
      'cs3.codeTitle': 'The pieces of code that earned the conclusion.',
      'cs3.code1Caption': 'Per-user monthly aggregation — the building block. Minutes, messages and data sessions rolled up before the revenue function was applied.',
      'cs3.code2Caption': 'Two-sample t-test at α = 0.01 between Surf and Ultimate monthly revenue. Equal variances were not assumed — Welch\'s correction was used.',
      'cs3.code3Caption': 'Region filter for the secondary test. Splitting NY-NJ subscribers from the rest let us evaluate whether geography moves revenue independently of plan.',
      'cs3.takeawayBody': 'Marketing dollars should chase Ultimate acquisitions — the plan generates significantly higher revenue per user, even though behaviour barely differs. Layer a NY-NJ-specific positioning on top, since that market behaves like its own segment.',
    },

    es: {
      /* ---------- A11y ---------- */
      'a11y.skip': 'Saltar al contenido principal',

      /* ---------- Nav ---------- */
      'nav.role': 'Analista de Datos',
      'nav.projects': 'Proyectos',
      'nav.about': 'Sobre mí',
      'nav.experience': 'Experiencia',
      'nav.contact': 'Contacto',

      /* ---------- Hero ---------- */
      'hero.eyebrow': 'Analista de Datos · Business Intelligence',
      'hero.titleA': 'Convertir datos crudos',
      'hero.titleB': 'en decisiones de negocio.',
      'hero.subtitle': 'Estudiante de Negocios Internacionales construyendo una carrera en análisis de datos y business intelligence — combino una base estadística sólida con flujos asistidos por IA para entregar insights más rápido y con mayor calidad.',
      'hero.ctaPrimary': 'Ver case studies',
      'hero.ctaSecondary': 'Contáctame',
      'hero.metaLocation': 'Ubicación',
      'hero.metaStatus': 'Estatus',
      'hero.metaStatusVal': 'Abierto a roles remotos',
      'hero.metaLang': 'Idiomas',

      /* ---------- Featured projects ---------- */
      'projects.eyebrow': 'Case Studies Destacados',
      'projects.title': 'Tres problemas, resueltos con datos.',
      'projects.meta': 'Trabajos seleccionados — 2025',
      'projects.cta': 'Leer case study',
      'projects.p1.title': 'Showz — Análisis de Marketing Performance',
      'projects.p1.desc': 'Análisis de cohortes, LTV y ROMI por canal de adquisición para una plataforma de venta de boletos.',
      'projects.p2.title': 'Ice — Análisis de Ventas de Videojuegos',
      'projects.p2.desc': 'EDA y pruebas estadísticas sobre 16,715 títulos para planear una campaña 2017 de un retailer global.',
      'projects.p3.title': 'Megaline — Análisis de Ingresos por Cliente',
      'projects.p3.desc': 'Prueba de hipótesis de dos muestras para identificar qué plan prepago genera mayor ingreso.',

      /* ---------- About ---------- */
      'about.eyebrow': 'Sobre mí',
      'about.title': 'Analista por formación, builder por instinto.',
      'about.p1': 'Estudiante de Negocios Internacionales y Analista de Datos con experiencia práctica analizando datos operativos, construyendo dashboards en Power BI y automatizando flujos de trabajo. Combino una base estadística sólida — pruebas de hipótesis, probabilidad, análisis descriptivo — con desarrollo asistido por IA para entregar insights más rápido y con mayor calidad.',
      'about.p2': 'Actualmente enfocado en conseguir un rol full-time como Analista de Datos mientras refuerzo mis fundamentos con estudio estructurado y proyectos reales. Cómodo trabajando remoto entre zonas horarias, y tan en casa en una reunión con stakeholders como en un Jupyter notebook.',
      'about.stat1': 'case studies end-to-end con análisis de cohortes, pruebas de hipótesis y modelado de ingresos.',
      'about.stat2': 'internships en equipos remotos multiculturales (startups de Canadá y LATAM).',

      /* ---------- Experience ---------- */
      'exp.eyebrow': 'Experiencia',
      'exp.title': 'Dónde he puesto los datos a trabajar.',
      'exp.present': 'Presente',
      'exp.remote': 'Remoto',
      'exp.canada': 'Remoto (Ontario, Canadá)',
      'exp.micro1': 'Reviso y valido outputs generados por IA contra guidelines de calidad, aplicando criterio analítico para detectar errores y mejorar el desempeño del modelo.',
      'exp.varac': 'Construí agentes de IA y flujos de automatización para clientes usando Python, n8n, FastAPI y React. Lideré reuniones con clientes, levantamiento de requisitos y entrega de proyectos end-to-end en una startup.',
      'exp.vosyn': 'Limpié y analicé datasets de productividad entre departamentos. Diseñé dashboards interactivos en Power BI para monitorear KPIs y descubrir tendencias para el equipo directivo.',

      /* ---------- Education ---------- */
      'edu.eyebrow': 'Educación',
      'edu.title': 'Siempre aprendiendo, de forma estructurada.',
      'edu.inProgress': 'En curso',
      'edu.completed': 'Completado',
      'edu.codecademy': 'Reforzando fundamentos de BI — modelado dimensional, SQL avanzado, patrones de dashboarding.',
      'edu.tripleten': 'Programa de 11 sprints cubriendo Python, SQL, estadística, EDA, pruebas A/B y dashboarding — me gradué con tres proyectos de portafolio end-to-end.',
      'edu.uvm': 'Base en estrategia de negocio, comercio internacional, finanzas y operaciones — la lente con la que abordo cada dataset.',

      /* ---------- Stack ---------- */
      'stack.eyebrow': 'Stack Técnico',
      'stack.title': 'El toolkit, organizado.',
      'stack.meta': 'Sin sopa de badges — fluidez real.',
      'stack.cat1': 'Datos y Análisis',
      'stack.cat2': 'Visualización y BI',
      'stack.cat3': 'Estadística',
      'stack.cat4': 'IA y Automatización',
      'stack.cat5': 'Herramientas',
      'stack.learning': '(aprendiendo)',
      'stack.hyp': 'Pruebas de Hipótesis',
      'stack.prob': 'Probabilidad',
      'stack.desc': 'Análisis Descriptivo',

      /* ---------- Contact ---------- */
      'contact.eyebrow': 'Contacto',
      'contact.title': 'Hablemos de datos.',
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
      'cs1.title': 'Cómo encontramos los canales en los que vale gastar.',
      'cs1.intro': 'Auditoría end-to-end del funnel de usuarios y el gasto de marketing de Showz, una plataforma online de venta de boletos. Objetivo: identificar qué canales de adquisición realmente recuperan inversión y cuáles están drenando el presupuesto en silencio.',
      'cs1.contextTitle': 'Una plataforma de boletos con un problema de marketing.',
      'cs1.contextP1': 'Showz opera un marketplace de boletos para eventos. Como muchas plataformas en etapa temprana, tenían un top of funnel claro pero atribución borrosa más abajo: marketing gastaba en múltiples canales pero nadie podía responder con confianza cuáles generaban clientes rentables — y cuáles solo compraban tráfico.',
      'cs1.contextP2': 'El brief era deliberadamente abierto: construir la lente con la que Showz pudiera evaluar performance de marketing end-to-end. Eso implicaba ir desde los logs de eventos hasta una recomendación defendible sobre dónde debería ir el siguiente dólar de marketing.',
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
      'cs1.i1Label': 'Usuarios activos diarios · prom. 2017–18',
      'cs1.i1Body': 'Tráfico diario promedio de 908 usuarios, escalando a 23,228 MAU — una línea base saludable contra la cual medir performance por canal.',
      'cs1.i2Label': 'Canales top por ROI',
      'cs1.i2Body': 'Los canales 2 y 1 generaron mayor ingreso con la menor inversión de marketing — exactamente lo contrario de lo que el equipo asumía.',
      'cs1.i3Label': 'ROMI del canal 3',
      'cs1.i3Body': 'El canal 3 recibió la mayor inversión pero devolvió menos de $500K en ingresos. El LTV no recuperó el CAC dentro de ninguna ventana de cohorte observable.',
      'cs1.chart1Title': 'Engagement de tráfico, 2017 vs 2018',
      'cs1.chart1Caption': 'Comparación de usuarios activos diarios, semanales y mensuales entre dos años fiscales — establece la línea base de demanda.',
      'cs1.chart2Title': 'Ingresos por canal de marketing',
      'cs1.chart2Caption': 'Ingresos totales atribuidos a cada fuente de adquisición en la ventana de análisis.',
      'cs1.chart3Title': 'LTV vs CAC por fuente de adquisición',
      'cs1.chart3Caption': 'Un canal es sano cuando el LTV excede cómodamente al CAC. Los canales 1 y 2 superan ese umbral; el canal 3 lo invierte.',
      'cs1.codeTitle': 'Los fragmentos de código de los que más me enorgullezco.',
      'cs1.code1Caption': 'Asignación de cohorte — agrupar a cada usuario por el mes en que visitó por primera vez, lo que ancla todo el análisis de retención posterior.',
      'cs1.code2Caption': 'LTV por fuente de adquisición — un join entre órdenes y metadata de adquisición, agregado a vista por canal del valor del cliente.',
      'cs1.code3Caption': 'Andamio de engagement — DAU, WAU y MAU en una sola pasada que alimentó casi todos los gráficos posteriores.',
      'cs1.takeawayBody': 'Si estuviera en el equipo de marketing de Showz, reasignaría aproximadamente el 30% del presupuesto del canal 3 hacia los canales 1 y 2 — y revisaría el targeting del canal 3 antes de cualquier nueva inversión. Los datos de cohorte sugieren que el problema es la calidad de la audiencia, no el volumen.',

      /* ---------- Case study 02 — Video Game Sales ---------- */
      'cs2.tag': 'EDA · Pruebas de Hipótesis · 16,715 registros',
      'cs2.title': 'Lo que realmente predice un videojuego exitoso.',
      'cs2.intro': 'Para Ice, un retailer global de videojuegos, trabajé sobre 16,715 títulos para entender qué motiva el éxito comercial. La respuesta resultó tener menos que ver con reseñas y más con timing de plataforma y ajuste regional.',
      'cs2.contextTitle': 'Planear una campaña 2017 con datos hasta 2016.',
      'cs2.contextP1': 'Ice es un retailer online ficticio con alcance global en Norteamérica, Europa y Japón. Marketing quería planear una campaña 2017 y planteó una pregunta engañosamente simple: ¿qué juegos, en qué plataformas, en qué regiones, vale la pena promover?',
      'cs2.contextP2': 'El dataset abarcaba décadas de lanzamientos, así que el trabajo arrancó con una decisión editorial fuerte — ¿qué años importan para una campaña a futuro? Después de graficar el volumen de lanzamientos en el tiempo, anclé el análisis en la ventana más reciente de cinco años donde la mezcla de plataformas aún se parecía al panorama actual.',
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
      'cs2.i1Label': 'Plataformas top por ingreso',
      'cs2.i1Body': 'PlayStation 2, PlayStation 3 y Xbox 360 dominan ventas agregadas — pero las preferencias regionales divergen marcadamente, particularmente en Japón donde dominan las plataformas Nintendo.',
      'cs2.i2Label': 'Géneros top por ingreso',
      'cs2.i2Body': 'Action, Sports y Shooter generan los ingresos más altos en NA y EU. Japón invierte el orden con Role-Playing en primer lugar.',
      'cs2.i3Label': 'Correlación user-rating ↔ ventas',
      'cs2.i3Body': 'Correlación de Pearson de aproximadamente 0.03 entre user ratings y ventas — estadísticamente indistinguible de cero. Las reseñas no mueven volumen.',
      'cs2.chart1Title': 'Juegos lanzados por año',
      'cs2.chart1Caption': 'Volumen anual de lanzamientos en el dataset, usado para argumentar a favor de una ventana de análisis enfocada en la era reciente.',
      'cs2.chart2Title': 'Plataformas top por ingreso global',
      'cs2.chart2Caption': 'Ingreso agregado por plataforma — la base del argumento de priorización de plataformas.',
      'cs2.chart3Title': 'User rating vs ventas',
      'cs2.chart3Caption': 'Scatter de user score contra unidades vendidas. La línea de tendencia casi plana es el punchline.',
      'cs2.codeTitle': 'Trabajo estadístico, hecho tangible.',
      'cs2.code1Caption': 'Filtré el dataset a la era moderna y convertí la columna desordenada de user_score a numéricos antes de testear.',
      'cs2.code2Caption': 'T-test de dos muestras para user scores entre plataformas. La prueba respondía: ¿son las distribuciones de Xbox One y PC de la misma población?',
      'cs2.code3Caption': 'Un patrón reutilizable de groupby + plot que apliqué transversalmente en el EDA. Pequeño, pero me ahorró horas.',
      'cs2.takeawayBody': 'Para 2017, la campaña debería sobreponderar PS4 / Xbox One en NA y EU mientras se corre un track separado enfocado a Nintendo en Japón. Marketing no debe anclar el creativo en user reviews — no predicen ventas, y el presupuesto debería ir tras alcance de plataforma y recepción crítica.',

      /* ---------- Case study 03 — Megaline ---------- */
      'cs3.tag': 'Pruebas Estadísticas · Telecom · α = 0.01',
      'cs3.title': 'Dos planes prepago, uno estadísticamente más fuerte.',
      'cs3.intro': 'Megaline, operador de telecomunicaciones prepago, necesitaba decidir cuál de dos planes — Surf o Ultimate — genera más ingreso por usuario. Una prueba de hipótesis de dos muestras limpia, más un giro regional que nadie pidió.',
      'cs3.contextTitle': 'Una decisión de pricing disfrazada de pregunta estadística.',
      'cs3.contextP1': 'El equipo comercial de Megaline tenía una pregunta que sonaba simple: ¿a dónde dirigimos a los clientes? ¿Surf o Ultimate? Los planes difieren en precio, minutos incluidos, mensajes y data — pero el comportamiento del cliente rara vez calza con el diseño del plan, así que el ingreso por usuario es la única comparación honesta.',
      'cs3.contextP2': 'Trabajé con datos de 2018 sobre 500 suscriptores en cinco tablas — usuarios, planes, llamadas, mensajes y sesiones de internet. El análisis tenía que aterrizar en una decisión que el equipo comercial pudiera defender ante finanzas de marketing.',
      'cs3.methodTitle': 'Cinco tablas, una decisión.',
      'cs3.m1Title': 'Integración de datos',
      'cs3.m1Body': 'Uní y armonicé cinco datasets. Resolví tipos de fecha y anomalías de borde antes de agregar.',
      'cs3.m2Title': 'Modelo de ingreso',
      'cs3.m2Body': 'Calculé el ingreso mensual por usuario desde el consumo bruto + tarifa + lógica de overage. Esta métrica era el pilar de todo lo demás.',
      'cs3.m3Title': 'EDA conductual',
      'cs3.m3Body': 'Comparé distribuciones de minutos, mensajes y MB entre los dos planes usando box plots y estadística descriptiva.',
      'cs3.m4Title': 'Pruebas de hipótesis',
      'cs3.m4Body': 'T-tests de dos muestras a α = 0.01 — uno para ingreso por plan, otro para ingreso regional (NY-NJ vs el resto).',
      'cs3.m5Title': 'Recomendación',
      'cs3.m5Body': 'Traduje los resultados de las pruebas en una recomendación de asignación de presupuesto y posicionamiento de pricing.',
      'cs3.insightsTitle': 'El comportamiento era casi igual. El ingreso, no.',
      'cs3.i1Label': 'Surf vs Ultimate · minutos mensuales',
      'cs3.i1Body': 'Las métricas conductuales son casi indistinguibles: usuarios Surf promedian 428.7 minutos al mes, Ultimate 430.5. Lo mismo con mensajes y datos.',
      'cs3.i2Label': 'p-value, prueba de ingresos por plan',
      'cs3.i2Body': 'A pesar del uso casi idéntico, el ingreso mensual difiere significativamente entre planes (p < 0.01). La estructura de precios, no el comportamiento, hace el trabajo.',
      'cs3.i3Label': 'Brecha regional de ingreso',
      'cs3.i3Body': 'Los suscriptores NY-NJ muestran una distribución de ingreso lo suficientemente distinta como para rechazar igualdad con el resto del país — caso claro para pricing geo-targeted.',
      'cs3.chart1Title': 'Minutos de llamada — Surf vs Ultimate',
      'cs3.chart1Caption': 'Distribución de minutos mensuales para ambos planes. Los centros son casi idénticos; las colas marcan la diferencia.',
      'cs3.chart2Title': 'Ingreso mensual por plan',
      'cs3.chart2Caption': 'Ingreso promedio por usuario, mes a mes. Ultimate lidera consistentemente — y la brecha es estadísticamente real.',
      'cs3.chart3Title': 'Ingreso por región',
      'cs3.chart3Caption': 'Comparación de ingreso promedio entre suscriptores NY-NJ y el resto de la base de clientes.',
      'cs3.codeTitle': 'Los fragmentos de código que ganaron la conclusión.',
      'cs3.code1Caption': 'Agregación mensual por usuario — el bloque base. Minutos, mensajes y sesiones de internet roll-up antes de aplicar la función de ingreso.',
      'cs3.code2Caption': 'T-test de dos muestras a α = 0.01 entre ingreso mensual de Surf y Ultimate. No se asumió igualdad de varianzas — se usó la corrección de Welch.',
      'cs3.code3Caption': 'Filtro regional para la prueba secundaria. Separar a los suscriptores NY-NJ del resto permitió evaluar si la geografía mueve el ingreso independientemente del plan.',
      'cs3.takeawayBody': 'Los dólares de marketing deben perseguir adquisiciones de Ultimate — el plan genera ingreso por usuario significativamente más alto, aunque el comportamiento difiera apenas. Encima de eso, sumar un posicionamiento específico para NY-NJ, ya que ese mercado se comporta como un segmento propio.',
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
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      // Format: data-i18n-attr="aria-label:key,placeholder:other.key"
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
      });
    });
  }

  function syncButtons(lang) {
    document.querySelectorAll('.lang-toggle [data-lang]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
    });
  }

  function init() {
    const lang = getLang();
    setLang(lang);
    document.querySelectorAll('.lang-toggle [data-lang]').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Expose for case study pages that need to refresh after DOM changes */
  window.SLI18N = { setLang, apply, getLang };
})();
