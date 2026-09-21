// Catalogue thématique conform-IT — source unique.
// Utilisé par : /formations/ (cartes), /formations/[slug]/ (pages détaillées),
// la page d'accueil (panneau du hero) et le plan du site.
//
// ⚠️ Contenu de premier jet (refonte 29/08/2026) — à relire et compléter par conform-IT,
// notamment les paragraphes "obligation" qui citent des textes réglementaires.

export interface ThemeLien {
  href: string;
  label: string;
}

export interface ThemeOutil {
  href: string;
  /** Nom de l'outil, ex. "Pré-diagnostic cybersécurité". */
  label: string;
  /** Format court, ex. "10 questions · 3 min". */
  duree: string;
  /**
   * Phrase de présentation de l'encart : l'outil comme prolongement de la
   * formation (« une fois l'équipe formée, utilisez X pour passer à l'action »).
   */
  intro: string;
}

export interface Theme {
  slug: string;
  /** Titre complet — <h1> de la page détaillée et titre de carte du catalogue. */
  titre: string;
  /** Libellé court — panneau du hero de l'accueil. */
  nav: string;
  /** Résumé — texte de carte + description du hero de la page détaillée. */
  resume: string;
  /** Pourquoi se former : le moteur réglementaire ou métier. */
  obligation: string;
  /** Objectifs pédagogiques du parcours. */
  objectifs: string[];
  /** Ce que couvre concrètement le parcours. */
  couvre: string[];
  /** Pour qui, en une phrase. */
  pour: string;
  /** Format et preuve, en une phrase. */
  format: string;
  /** Outil de pré-diagnostic / auto-évaluation correspondant à ce thème. */
  outil?: ThemeOutil;
  /** Autres liens utiles (mission d'accompagnement, audit…). */
  liens?: ThemeLien[];
}

export const themes: Theme[] = [
  {
    slug: "intelligence-artificielle",
    titre: "Intelligence artificielle",
    nav: "Intelligence artificielle",
    resume:
      "Littératie IA et obligation de l'article 4 de l'AI Act : ce qu'on peut confier à l'IA, comment vérifier, ce qu'il ne faut jamais y mettre. Usages en entreprise, IA générative, systèmes à haut risque.",
    obligation:
      "L'article 4 du règlement européen sur l'IA (AI Act) demande, depuis février 2025, aux organisations qui utilisent des systèmes d'IA de veiller à un niveau suffisant de « littératie » de leurs équipes, proportionné à leurs usages et au rôle de chacun. Aucun format, aucun volume d'heures et aucune charte ne sont imposés — mais l'organisation doit pouvoir démontrer que des mesures adaptées ont été prises.",
    objectifs: [
      "Comprendre ce qu'est un système d'IA et les catégories de risque de l'AI Act",
      "Savoir ce qu'on peut confier à l'IA générative, et ce qu'il ne faut jamais y saisir",
      "Vérifier, sourcer et tracer un contenu produit avec l'aide de l'IA",
      "Repérer un usage à risque et savoir à qui le remonter",
    ],
    couvre: [
      "Panorama de l'IA et de l'AI Act : calendrier, obligations, sanctions",
      "IA générative : bons usages par métier, données interdites, secret et RGPD",
      "Systèmes à haut risque (Annexe III) : recrutement, crédit, RH — ce que ça change",
      "Transparence : signaler un contenu ou une interaction générés par IA (article 50)",
      "Le rôle de chacun : dirigeant, manager, usager, créateur d'assistants",
    ],
    pour: "Tous les collaborateurs, avec un parcours adapté à chacun des 4 publics.",
    format: "Modules courts par rôle, fiches pratiques (ex. « ce qu'on ne donne jamais à un assistant ») et quiz de validation.",
    outil: {
      href: "/service-en-ligne/outil-qualif-ia-pour-dirigeants/",
      label: "PréQualIA — maturité IA",
      duree: "9 questions · 3 min",
      intro:
        "Une fois vos équipes formées à l'IA, PréQualIA situe la maturité de l'organisation au regard de l'AI Act et pointe les chantiers à ouvrir en premier.",
    },
    liens: [
      { href: "/cadre-dusage-responsable-de-lintelligence-artificielle/", label: "Aller plus loin : rédiger votre charte d'usage de l'IA" },
    ],
  },
  {
    slug: "rgpd",
    titre: "RGPD & protection des données",
    nav: "RGPD & protection des données",
    resume:
      "Les réflexes du quotidien : données personnelles, bases légales, droits des personnes, sous-traitance, violations. Adapté au rôle de chacun.",
    obligation:
      "Le RGPD (règlement UE 2016/679) impose au responsable de traitement de garantir que son personnel qui traite des données personnelles est sensibilisé et formé. La CNIL considère la formation des équipes comme une mesure de conformité et de sécurité attendue, et en tient compte en cas de contrôle ou de sanction.",
    objectifs: [
      "Reconnaître une donnée personnelle et une donnée sensible",
      "Appliquer les principes clés : finalité, minimisation, durée de conservation",
      "Réagir correctement à une demande d'exercice de droits",
      "Détecter et signaler une violation de données dans les délais",
    ],
    couvre: [
      "Notions de base : données, traitements, acteurs (responsable, sous-traitant, DPO)",
      "Bases légales et information des personnes",
      "Droits des personnes (accès, rectification, effacement, opposition…) et comment y répondre",
      "Sécurité au quotidien : postes, mots de passe, partages, e-mail",
      "Sous-traitance et transferts hors UE : les points de vigilance",
      "Violation de données : détecter, qualifier, notifier",
    ],
    pour: "Tous les métiers qui manipulent des données — avec des variantes RH, commercial, marketing, support.",
    format: "Tronc commun + variantes métier, fiches réflexe et quiz.",
    outil: {
      href: "/service-en-ligne/outil-qualif-rgpd-pour-dirigeants/",
      label: "Pré-diagnostic RGPD",
      duree: "12 questions · 4 min",
      intro:
        "Une fois vos équipes sensibilisées au RGPD, le pré-diagnostic mesure où en est réellement l'organisation — gouvernance, traitements, sécurité — et ce qui reste à mettre en place.",
    },
  },
  {
    slug: "cybersecurite",
    titre: "Cybersécurité & hygiène informatique",
    nav: "Cybersécurité",
    resume:
      "Mots de passe, hameçonnage, postes et mobiles, télétravail, signalement d'incident. Les gestes qui évitent l'essentiel des incidents.",
    obligation:
      "La sécurité des systèmes d'information engage la responsabilité de l'employeur (protection des données, secret des affaires, continuité d'activité). L'ANSSI et la CNIL recommandent une sensibilisation régulière de l'ensemble des collaborateurs ; c'est aussi une exigence fréquente des clients, des assureurs et des donneurs d'ordre.",
    objectifs: [
      "Repérer un e-mail ou un message d'hameçonnage",
      "Construire et gérer des mots de passe robustes, activer la double authentification",
      "Sécuriser son poste, son mobile et son télétravail",
      "Savoir quoi faire — et ne pas faire — en cas de doute ou d'incident",
    ],
    couvre: [
      "Menaces courantes : hameçonnage, rançongiciel, arnaque au président, faux support",
      "Mots de passe, gestionnaire de mots de passe, double authentification",
      "Poste de travail : mises à jour, sauvegardes, clés USB",
      "Mobilité et télétravail : Wi-Fi, VPN, écrans, documents sensibles",
      "Réagir à un incident : signaler vite, isoler, ne pas payer, qui contacter",
    ],
    pour: "Tous les collaborateurs, avec un module renforcé pour les fonctions sensibles.",
    format: "Modules courts, campagnes d'hameçonnage simulé possibles via l'accompagnement, fiches et quiz.",
    outil: {
      href: "/service-en-ligne/hygiene-informatique/",
      label: "Pré-diagnostic cybersécurité",
      duree: "10 questions · 3 min",
      intro:
        "Après la formation aux bons réflexes, le pré-diagnostic cybersécurité fait le point sur l'hygiène informatique de l'organisation et les mesures à renforcer.",
    },
  },
  {
    slug: "nis2",
    titre: "NIS2",
    nav: "NIS2",
    resume:
      "Gouvernance cyber et obligations de la directive NIS2 : périmètre, mesures attendues, rôle des dirigeants et des équipes.",
    obligation:
      "La directive européenne NIS2 étend les obligations de cybersécurité à un large ensemble d'entités « essentielles » et « importantes ». Elle impose notamment la responsabilisation des organes de direction et la formation des équipes aux risques cyber ; la responsabilité des dirigeants peut être engagée.",
    objectifs: [
      "Savoir si l'organisation entre dans le périmètre NIS2, et à quel titre",
      "Comprendre les grandes obligations : gestion des risques, notification d'incidents, gouvernance",
      "Situer le rôle de la direction, des équipes IT et des métiers",
      "Contribuer aux mesures attendues à son niveau",
    ],
    couvre: [
      "Périmètre : entités essentielles / importantes, secteurs concernés",
      "Obligations : analyse de risque, mesures techniques et organisationnelles, chaîne d'approvisionnement",
      "Notification d'incident : délais et circuit",
      "Gouvernance et responsabilité des dirigeants",
      "Articulation avec le RGPD et la politique de sécurité existante",
    ],
    pour: "Dirigeants, managers et référents — avec une version courte de sensibilisation pour les autres équipes.",
    format: "Module dirigeants approfondi + sensibilisation générale, fiche « suis-je concerné ? » et quiz.",
    outil: {
      href: "/service-en-ligne/outil-qualif-nis2-pour-dirigeants/",
      label: "Pré-qualification NIS2",
      duree: "12 questions · 4 min",
      intro:
        "Vos dirigeants et référents formés à NIS2, la pré-qualification vérifie si l'organisation entre dans le périmètre et évalue son niveau de préparation.",
    },
  },
  {
    slug: "non-discrimination",
    titre: "Non-discrimination",
    nav: "Non-discrimination",
    resume:
      "Reconnaître et prévenir les discriminations dans le recrutement, le management et la relation client. Cadre légal et cas concrets.",
    obligation:
      "Le code du travail impose une formation à la non-discrimination à l'embauche, au moins tous les cinq ans, pour les personnes en charge du recrutement dans les entreprises d'au moins 300 salariés et dans celles spécialisées dans le recrutement. Au-delà de ce cas, la prévention des discriminations relève de l'obligation de sécurité et de l'égalité de traitement.",
    objectifs: [
      "Connaître les critères de discrimination prohibés par la loi",
      "Sécuriser un processus de recrutement, de l'annonce à la décision",
      "Identifier les biais dans les décisions managériales et la relation client",
      "Réagir à une situation ou à un signalement",
    ],
    couvre: [
      "Cadre légal : critères prohibés, charge de la preuve, sanctions",
      "Recrutement : rédiger, sourcer, évaluer sans discriminer ; traçabilité des décisions",
      "Management : évaluation, promotion, rémunération, aménagements",
      "Discrimination et IA : vigilance sur les outils d'aide à la décision",
      "Que faire face à une situation ou à une alerte",
    ],
    pour: "Dirigeants, managers et fonctions RH / recrutement — sensibilisation pour l'ensemble des équipes.",
    format: "Module dédié recruteurs (couvrant l'obligation quinquennale) + sensibilisation, fiches et quiz.",
    outil: {
      href: "/service-en-ligne/non-discrimination/",
      label: "Pré-diagnostic non-discrimination",
      duree: "10 questions · 3 min",
      intro:
        "Une fois vos équipes RH et vos managers formés, le pré-diagnostic passe en revue vos processus de recrutement et de management pour repérer les points de risque.",
    },
  },
  {
    slug: "harcelement",
    titre: "Harcèlement",
    nav: "Harcèlement",
    resume:
      "Harcèlement moral et sexuel au travail : définitions, obligations de l'employeur, rôle du référent, conduite à tenir face à un signalement.",
    obligation:
      "L'employeur a une obligation de prévention du harcèlement moral, du harcèlement sexuel et des agissements sexistes. Les entreprises d'au moins 250 salariés doivent désigner un référent harcèlement sexuel ; le CSE désigne également un référent. La formation des managers et des référents est une mesure de prévention attendue.",
    objectifs: [
      "Distinguer harcèlement moral, harcèlement sexuel, agissements sexistes — et ce qui n'en relève pas",
      "Connaître les obligations de l'employeur et le rôle des référents",
      "Réagir à un signalement : écoute, mesures conservatoires, enquête",
      "Prévenir par les postures managériales et le cadre d'équipe",
    ],
    couvre: [
      "Définitions légales et exemples ; distinction avec le pouvoir de direction et les conflits",
      "Obligations de l'employeur, référents, CSE, règlement intérieur",
      "Recevoir un signalement : que dire, que faire, que ne pas faire",
      "Enquête interne : principes, impartialité, protection des personnes",
      "Sanctions et responsabilités",
    ],
    pour: "Managers, référents et RH — sensibilisation « repérer et signaler » pour tous les collaborateurs.",
    format: "Module managers / référents + sensibilisation tous publics, fiche « je reçois un signalement » et quiz.",
    outil: {
      href: "/service-en-ligne/harcelement/",
      label: "Pré-diagnostic harcèlement",
      duree: "10 questions · 3 min",
      intro:
        "Après la formation des managers et des référents, le pré-diagnostic évalue votre dispositif de prévention et de traitement des signalements.",
    },
  },
  {
    slug: "anti-corruption",
    titre: "Anti-corruption",
    nav: "Anti-corruption",
    resume:
      "Loi Sapin II : cadeaux et invitations, conflits d'intérêts, paiements de facilitation, alerte interne. Repères pour les fonctions exposées.",
    obligation:
      "La loi Sapin II impose aux entreprises concernées (au-delà de certains seuils d'effectif et de chiffre d'affaires) un dispositif anticorruption : code de conduite, cartographie des risques, formation des cadres et personnels les plus exposés, dispositif d'alerte. L'Agence française anticorruption (AFA) contrôle ces dispositifs.",
    objectifs: [
      "Reconnaître une situation de corruption, de trafic d'influence ou de conflit d'intérêts",
      "Appliquer les règles cadeaux et invitations, mécénat, relations avec les agents publics",
      "Utiliser le dispositif d'alerte interne",
      "Documenter les décisions sensibles",
    ],
    couvre: [
      "Notions : corruption active / passive, trafic d'influence, favoritisme, conflits d'intérêts",
      "Code de conduite : cadeaux et invitations, sponsoring, intermédiaires, paiements de facilitation",
      "Relations avec les tiers : évaluation, clauses, agents commerciaux",
      "Dispositif d'alerte : comment et quand l'utiliser, protection du lanceur d'alerte",
      "Contrôles AFA et sanctions",
    ],
    pour: "Fonctions exposées (achats, commercial, finance, direction) — sensibilisation générale pour les autres.",
    format: "Module « personnels exposés » couvrant l'attendu Sapin II + sensibilisation, fiches et quiz.",
    outil: {
      href: "/service-en-ligne/anti-corruption/",
      label: "Pré-diagnostic anti-corruption",
      duree: "10 questions · 3 min",
      intro:
        "Vos fonctions exposées formées à la loi Sapin II, le pré-diagnostic mesure la solidité de votre dispositif anticorruption — code de conduite, cartographie des risques, alerte.",
    },
  },
  {
    slug: "sobriete-numerique",
    titre: "Sobriété numérique",
    nav: "Sobriété numérique",
    resume:
      "Réduire l'empreinte environnementale des usages et des services numériques : éco-conception, cycle de vie, arbitrages du quotidien.",
    obligation:
      "La loi REEN (réduction de l'empreinte environnementale du numérique) et le référentiel général d'écoconception des services numériques (RGESN) fixent des attentes croissantes, en particulier pour le secteur public et les grandes entreprises. C'est aussi un levier de coûts et un critère RSE de plus en plus demandé par les clients et les financeurs.",
    objectifs: [
      "Comprendre où se situe l'impact du numérique : fabrication, usage, fin de vie",
      "Adopter des gestes sobres au quotidien : matériel, stockage, visio, e-mail",
      "Intégrer l'écoconception dans les projets numériques",
      "Situer les obligations (REEN, RGESN) et le reporting",
    ],
    couvre: [
      "Ordres de grandeur : équipements, centres de données, réseaux",
      "Gestes individuels : durée de vie du matériel, stockage, streaming, e-mails",
      "Achats et fin de vie : réemploi, reconditionné, filière DEEE",
      "Écoconception de services : RGESN, sobriété fonctionnelle, mesure (EcoIndex)",
      "Cadre réglementaire et pilotage de la démarche",
    ],
    pour: "Tous — gestes pour les usagers ; écoconception pour les équipes projet, DSI et acheteurs ; pilotage pour la direction.",
    format: "Sensibilisation tous publics + module écoconception pour les équipes projet, fiches et quiz.",
    outil: {
      href: "/service-en-ligne/sobriete-numerique/",
      label: "Pré-diagnostic sobriété numérique",
      duree: "10 questions · 3 min",
      intro:
        "Une fois vos équipes sensibilisées, le pré-diagnostic sobriété numérique situe vos pratiques et identifie les gestes et arbitrages à prioriser.",
    },
  },
  {
    slug: "conformite-web",
    titre: "Conformité web",
    nav: "Conformité web",
    resume:
      "Accessibilité (RGAA), mentions obligatoires, bonnes pratiques : rendre un site conforme et accessible, et le garder conforme.",
    obligation:
      "L'accessibilité numérique est obligatoire pour le secteur public et, depuis le 28 juin 2025, pour de nombreux services et produits du secteur privé (transposition de l'European Accessibility Act). Le RGAA 4.1 est le référentiel de référence en France. S'y ajoutent les mentions légales obligatoires et les règles applicables aux cookies et aux données.",
    objectifs: [
      "Comprendre les obligations d'accessibilité et savoir qui est concerné",
      "Produire des contenus accessibles : textes, images, documents, vidéos",
      "Connaître les mentions obligatoires et les règles cookies / données d'un site",
      "Situer le rôle de chacun : contributeurs, intégrateurs, pilotage",
    ],
    couvre: [
      "Accessibilité : obligations, RGAA 4.1, déclaration d'accessibilité, schéma pluriannuel",
      "Contribuer accessible : structure, alternatives, contrastes, liens, documents bureautiques",
      "Mentions obligatoires, CGU / CGV, politique de confidentialité et de cookies",
      "Écoconception et performance (lien avec la sobriété numérique)",
      "Piloter la conformité d'un site dans la durée",
    ],
    pour: "Contributeurs et éditeurs web, chefs de projet, communication et direction.",
    format: "Module contributeurs + module pilotage, fiches et quiz.",
    outil: {
      href: "/service-en-ligne/formulaire-rgaa/",
      label: "Test d'accessibilité RGAA",
      duree: "analyse automatique",
      intro:
        "Vos contributeurs formés à l'accessibilité, le test RGAA analyse automatiquement votre site et livre un premier état des lieux des corrections à mener.",
    },
    liens: [
      { href: "/audit-rgaa/", label: "Découvrir l'audit RGAA complet" },
    ],
  },
];

export function getTheme(slug: string): Theme | undefined {
  return themes.find((t) => t.slug === slug);
}
