// Pré-diagnostics conform-IT — auto-évaluations 100 % côté navigateur (aucun back-end).
// Moteur : src/components/SelfAssessment.astro · Route : src/pages/service-en-ligne/[slug].astro
//
// ⚠️ Contenu de premier jet (29/08/2026) — questions, paragraphes réglementaires et messages de
// résultat à relire et compléter par conform-IT.
//
// Barème : chaque option porte un score (0 = maîtrisé … 2 ou 3 = à traiter). Le score total est
// ramené à un ratio du maximum possible, qui détermine le niveau (ok / info / warn / alert).
// Un "constat" s'affiche quand la réponse choisie atteint le score le plus défavorable de la question.

export type Ton = "ok" | "info" | "warn" | "alert";

export interface PrediagOption {
  score: number;
  label: string;
}

export interface PrediagQuestion {
  id: string;
  legend: string;
  options: PrediagOption[];
  constat?: string;
  /** Score à partir duquel le constat s'affiche (défaut : score max de la question). */
  constatSeuil?: number;
}

export interface PrediagGroupe {
  titre: string;
  questions: PrediagQuestion[];
}

export interface PrediagResultat {
  titre: string;
  message: string;
  reco: string[];
}

export interface Prediag {
  slug: string;
  /** slug de la thématique du catalogue, pour le lien « former vos équipes ». */
  theme: string;
  titre: string;
  eyebrow: string;
  intro: string;
  cardDescription: string;
  contexte: string;
  /** valeur ?type= pré-remplie dans /contact/ depuis le résultat. */
  contactType: string;
  groupes: PrediagGroupe[];
  resultats: Record<Ton, PrediagResultat>;
}

const OPN = [
  { score: 0, label: "Oui" },
  { score: 2, label: "Non" },
];
const OPPN = [
  { score: 0, label: "Oui" },
  { score: 1, label: "Partiellement" },
  { score: 2, label: "Non" },
];

export const prediagnostics: Prediag[] = [
  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "hygiene-informatique",
    theme: "cybersecurite",
    titre: "Pré-diagnostic cybersécurité",
    eyebrow: "Auto-évaluation · 10 questions · 3 minutes",
    intro: "Situez les pratiques de base de votre organisation en matière d'hygiène informatique : gouvernance, comptes et accès, postes et données, réaction en cas d'incident.",
    cardDescription: "10 questions pour situer votre hygiène informatique : sensibilisation, mots de passe et MFA, mises à jour, sauvegardes, réaction en cas d'incident.",
    contexte: "Assurer la sécurité des systèmes d'information relève de l'obligation de sécurité de l'employeur (protection des données, secret des affaires, continuité d'activité). L'ANSSI et la CNIL recommandent une sensibilisation régulière de l'ensemble des collaborateurs. Ce pré-diagnostic ne remplace pas un audit de sécurité.",
    contactType: "prediag_cyber",
    groupes: [
      {
        titre: "Gouvernance & sensibilisation",
        questions: [
          { id: "referent", legend: "Q1. Une personne ou un prestataire est-il clairement identifié comme responsable de la sécurité informatique ?", options: OPN, constat: "Aucun responsable sécurité identifié : les décisions et la réaction en cas d'incident risquent d'être dispersées." },
          { id: "politique", legend: "Q2. Une charte informatique ou des règles d'usage sont-elles communiquées aux collaborateurs ?", options: OPPN, constat: "Sans règles d'usage écrites, chaque collaborateur applique ses propres pratiques." },
          { id: "sensibilisation", legend: "Q3. Les équipes sont-elles sensibilisées aux risques cyber (hameçonnage, mots de passe) au moins une fois par an ?", options: [
            { score: 0, label: "Oui" },
            { score: 1, label: "Occasionnellement" },
            { score: 2, label: "Non" },
          ], constat: "La sensibilisation régulière est le premier rempart contre l'hameçonnage et l'ingénierie sociale." },
        ],
      },
      {
        titre: "Comptes & accès",
        questions: [
          { id: "mdp", legend: "Q4. Une politique de mots de passe est-elle en place (longueur, unicité, gestionnaire de mots de passe) ?", options: OPPN, constat: "Des mots de passe faibles ou réutilisés sont la cause la plus fréquente de compromission de comptes." },
          { id: "mfa", legend: "Q5. La double authentification (MFA) est-elle activée sur la messagerie et les outils sensibles ?", options: OPPN, constat: "Sans double authentification, un seul mot de passe volé suffit à accéder à la messagerie." },
          { id: "acces", legend: "Q6. Les droits d'accès sont-ils retirés au départ d'un collaborateur et revus périodiquement ?", options: OPPN, constat: "Des accès non révoqués (anciens salariés, prestataires) élargissent inutilement la surface d'attaque." },
        ],
      },
      {
        titre: "Postes & données",
        questions: [
          { id: "maj", legend: "Q7. Les postes, serveurs et logiciels sont-ils mis à jour régulièrement ?", options: OPPN, constat: "Les failles connues non corrigées sont exploitées quelques jours après leur publication." },
          { id: "antivirus", legend: "Q8. Les postes sont-ils protégés par un antivirus / EDR à jour et supervisé ?", options: OPPN },
          { id: "sauvegarde", legend: "Q9. Des sauvegardes sont-elles réalisées, isolées du réseau et testées (restauration) ?", options: [
            { score: 0, label: "Oui, testées" },
            { score: 1, label: "Oui, jamais testées" },
            { score: 2, label: "Non" },
          ], constat: "Une sauvegarde jamais testée, ou accessible depuis le réseau, ne protège pas d'un rançongiciel." },
        ],
      },
      {
        titre: "Réaction",
        questions: [
          { id: "incident", legend: "Q10. Sauriez-vous quoi faire et qui contacter en cas d'incident (rançongiciel, compte piraté) ?", options: [
            { score: 0, label: "Oui, procédure écrite" },
            { score: 1, label: "Vaguement" },
            { score: 2, label: "Non" },
          ], constat: "Les premières heures après un incident déterminent son coût : une procédure et des contacts pré-identifiés font gagner un temps décisif." },
        ],
      },
    ],
    resultats: {
      ok: { titre: "Vos bases sont solides", message: "Les fondamentaux d'hygiène informatique sont en place. L'enjeu est de les maintenir dans la durée et d'entretenir la vigilance des équipes.", reco: [
        "Maintenir une sensibilisation annuelle et tester une campagne d'hameçonnage",
        "Vérifier une fois par an la restauration effective des sauvegardes",
      ] },
      info: { titre: "Des fondamentaux à consolider", message: "Une partie des mesures de base est en place, d'autres manquent ou sont partielles. Un plan de mise à niveau court suffirait à réduire nettement l'exposition.", reco: [
        "Généraliser la double authentification sur la messagerie et les accès sensibles",
        "Formaliser les règles d'usage et la procédure de départ d'un collaborateur",
        "Documenter une procédure de réaction à incident avec les contacts utiles",
      ] },
      warn: { titre: "Plusieurs mesures de base font défaut", message: "Votre organisation est exposée à des incidents courants (hameçonnage, compromission de compte, rançongiciel) qui pourraient être évités par des mesures simples.", reco: [
        "Activer la double authentification partout où c'est possible, sans attendre",
        "Mettre en place des sauvegardes isolées du réseau et les tester",
        "Désigner un responsable sécurité et écrire une procédure d'incident",
      ] },
      alert: { titre: "Exposition élevée — à traiter en priorité", message: "Les mesures de protection les plus élémentaires sont absentes ou non maîtrisées. Un incident aurait aujourd'hui un impact fort et une capacité de réaction faible.", reco: [
        "Traiter en urgence : double authentification, sauvegardes hors ligne, mises à jour",
        "Désigner un responsable sécurité (interne ou prestataire) cette semaine",
        "Établir une procédure de réaction à incident et une liste de contacts",
      ] },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "non-discrimination",
    theme: "non-discrimination",
    titre: "Pré-diagnostic non-discrimination",
    eyebrow: "Auto-évaluation · 10 questions · 3 minutes",
    intro: "Situez vos pratiques de prévention des discriminations dans le recrutement et la vie du contrat de travail.",
    cardDescription: "10 questions sur la prévention des discriminations : obligation de formation des recruteurs, sécurisation du recrutement, décisions RH, suivi des écarts, signalement.",
    contexte: "Le code du travail impose une formation à la non-discrimination à l'embauche, au moins tous les cinq ans, pour les personnes en charge du recrutement dans les entreprises d'au moins 300 salariés et dans les cabinets de recrutement. Au-delà de ce cas, la prévention des discriminations relève de l'obligation de sécurité et de l'égalité de traitement.",
    contactType: "prediag_non_discrimination",
    groupes: [
      {
        titre: "Cadre & obligations",
        questions: [
          { id: "obligation300", legend: "Q1. Votre entreprise compte-t-elle 300 salariés ou plus, ou est-elle spécialisée dans le recrutement ?", options: [
            { score: 2, label: "Oui" },
            { score: 0, label: "Non" },
            { score: 1, label: "Je ne sais pas" },
          ], constat: "Vous êtes soumis à l'obligation de formation, au moins quinquennale, des personnes chargées du recrutement." },
          { id: "formationRecruteurs", legend: "Q2. Les personnes qui recrutent ont-elles été formées à la non-discrimination au cours des cinq dernières années ?", options: OPPN, constat: "Sans formation récente des recruteurs, l'obligation légale n'est pas satisfaite et le risque contentieux augmente." },
          { id: "politique", legend: "Q3. Un engagement écrit en faveur de l'égalité et de la non-discrimination existe-t-il ?", options: [
            { score: 0, label: "Oui" },
            { score: 1, label: "Non" },
          ] },
        ],
      },
      {
        titre: "Recrutement",
        questions: [
          { id: "annonces", legend: "Q4. Les offres d'emploi sont-elles relues pour éviter les mentions ou critères discriminatoires ?", options: [
            { score: 0, label: "Oui, systématiquement" },
            { score: 1, label: "Parfois" },
            { score: 2, label: "Non" },
          ], constat: "Des critères d'âge, de sexe ou de situation familiale, même implicites, dans les annonces sont directement sanctionnables." },
          { id: "criteres", legend: "Q5. Les critères d'évaluation des candidats sont-ils définis à l'avance et fondés sur les compétences ?", options: OPPN },
          { id: "tracabilite", legend: "Q6. Les décisions de recrutement sont-elles documentées (motifs de refus, comparatif des candidatures) ?", options: OPPN, constat: "En cas de litige, la charge de la preuve pèse sur l'employeur : sans traçabilité, la décision est difficile à justifier." },
        ],
      },
      {
        titre: "Vie du contrat",
        questions: [
          { id: "evolution", legend: "Q7. Les décisions de promotion, d'augmentation et d'accès à la formation reposent-elles sur des critères objectifs ?", options: OPPN },
          { id: "ecartsFH", legend: "Q8. Les écarts de rémunération et d'évolution entre femmes et hommes sont-ils suivis ?", options: OPPN, constat: "Le suivi des écarts femmes-hommes est attendu (index égalité pour les entreprises d'au moins 50 salariés) et révèle des discriminations indirectes." },
          { id: "outilsIA", legend: "Q9. Utilisez-vous des outils automatisés d'aide au tri de candidatures ou à l'évaluation ?", options: [
            { score: 0, label: "Non" },
            { score: 1, label: "Oui, avec contrôle humain documenté" },
            { score: 2, label: "Oui, sans contrôle documenté" },
          ], constat: "Un outil de tri automatisé peut reproduire des biais : un contrôle humain et une documentation sont nécessaires (RGPD et AI Act)." },
        ],
      },
      {
        titre: "Signalement",
        questions: [
          { id: "signalement", legend: "Q10. Un canal existe-t-il pour signaler une situation de discrimination, et est-il connu des équipes ?", options: [
            { score: 0, label: "Oui, connu" },
            { score: 1, label: "Oui, peu connu" },
            { score: 2, label: "Non" },
          ] },
        ],
      },
    ],
    resultats: {
      ok: { titre: "Démarche structurée", message: "Vos pratiques de prévention des discriminations sont largement en place. L'enjeu est de les maintenir et de tracer les décisions.", reco: [
        "Planifier le renouvellement quinquennal de la formation des recruteurs",
        "Conserver la traçabilité des décisions de recrutement et d'évolution",
      ] },
      info: { titre: "Des pratiques à formaliser", message: "Les bons réflexes existent mais reposent souvent sur les personnes plutôt que sur des procédures écrites et tracées.", reco: [
        "Former les personnes qui recrutent et outiller la relecture des annonces",
        "Définir des critères d'évaluation à l'avance et documenter les décisions",
        "Faire connaître le canal de signalement",
      ] },
      warn: { titre: "Prévention insuffisante", message: "Plusieurs points sensibles ne sont pas couverts : le risque juridique et réputationnel est réel, en particulier sur le recrutement.", reco: [
        "Former sans délai les personnes chargées du recrutement",
        "Mettre en place une relecture systématique des offres et une trace des décisions",
        "Suivre les écarts femmes-hommes et mettre en place un canal de signalement",
      ] },
      alert: { titre: "À traiter en priorité", message: "Les mesures de prévention essentielles sont absentes. En cas de plainte ou de contrôle, l'employeur serait en difficulté pour justifier ses décisions.", reco: [
        "Former immédiatement les recruteurs et cadrer le processus de recrutement",
        "Documenter toutes les décisions RH et publier un engagement d'égalité",
        "Créer un canal de signalement et une procédure de traitement",
      ] },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "harcelement",
    theme: "harcelement",
    titre: "Pré-diagnostic harcèlement",
    eyebrow: "Auto-évaluation · 10 questions · 3 minutes",
    intro: "Situez votre dispositif de prévention et de traitement du harcèlement moral, du harcèlement sexuel et des agissements sexistes.",
    cardDescription: "10 questions sur la prévention du harcèlement : information des salariés, référents, formation des managers, procédure de signalement, enquête interne, DUERP.",
    contexte: "L'employeur a une obligation de prévention du harcèlement moral, du harcèlement sexuel et des agissements sexistes. Les entreprises d'au moins 250 salariés doivent désigner un référent harcèlement sexuel ; le CSE désigne également un référent. La formation des managers et des référents est une mesure de prévention attendue.",
    contactType: "prediag_harcelement",
    groupes: [
      {
        titre: "Information & référents",
        questions: [
          { id: "affichage", legend: "Q1. L'information sur le harcèlement moral et sexuel est-elle accessible aux salariés (règlement intérieur, affichage, coordonnées utiles) ?", options: OPPN },
          { id: "referent250", legend: "Q2. Votre entreprise compte-t-elle 250 salariés ou plus ?", options: [
            { score: 2, label: "Oui" },
            { score: 0, label: "Non" },
          ], constat: "Vous devez désigner un référent harcèlement sexuel : vérifiez sa nomination et sa formation." },
          { id: "referentNomme", legend: "Q3. Un ou des référents harcèlement sont-ils désignés (côté employeur et côté CSE) ?", options: [
            { score: 0, label: "Oui" },
            { score: 1, label: "Un seul" },
            { score: 2, label: "Non" },
          ], constat: "L'absence de référent désigné est un manquement à l'obligation de prévention." },
          { id: "referentForme", legend: "Q4. Le ou les référents ont-ils été formés à leur rôle ?", options: OPN },
        ],
      },
      {
        titre: "Prévention",
        questions: [
          { id: "managersFormes", legend: "Q5. Les managers ont-ils été sensibilisés au repérage des situations et à la conduite à tenir ?", options: OPPN, constat: "Les managers sont en première ligne pour repérer et faire remonter les situations : leur formation est une mesure de prévention centrale." },
          { id: "dueg", legend: "Q6. Le risque de harcèlement et d'agissements sexistes figure-t-il dans le document unique (DUERP) ?", options: OPN, constat: "Le harcèlement est un risque professionnel : son absence du DUERP signale une sous-évaluation de la prévention." },
        ],
      },
      {
        titre: "Traitement des signalements",
        questions: [
          { id: "procedure", legend: "Q7. Existe-t-il une procédure écrite de traitement d'un signalement (qui reçoit, délais, étapes) ?", options: OPPN, constat: "Sans procédure, chaque signalement est traité au cas par cas, avec un risque pour les personnes comme pour l'employeur." },
          { id: "canal", legend: "Q8. Les salariés savent-ils précisément à qui s'adresser pour signaler une situation ?", options: [
            { score: 0, label: "Oui" },
            { score: 1, label: "Peu clair" },
            { score: 2, label: "Non" },
          ] },
          { id: "enquete", legend: "Q9. En cas de signalement, une enquête interne impartiale est-elle systématiquement menée ?", options: [
            { score: 0, label: "Oui, systématiquement" },
            { score: 1, label: "Selon les cas" },
            { score: 2, label: "Non" },
          ], constat: "L'absence d'enquête, ou une enquête partiale, expose l'employeur et fragilise la protection des personnes." },
          { id: "mesures", legend: "Q10. Des mesures conservatoires (éloignement, aménagement) sont-elles prévues pendant l'enquête ?", options: OPN },
        ],
      },
    ],
    resultats: {
      ok: { titre: "Dispositif en place", message: "Votre dispositif de prévention et de traitement est structuré. L'enjeu est de le faire vivre : formations à jour, procédure connue, DUERP actualisé.", reco: [
        "Maintenir à jour la formation des référents et des managers",
        "Vérifier régulièrement que la procédure de signalement est connue de tous",
      ] },
      info: { titre: "Dispositif à compléter", message: "Les briques essentielles existent mais certaines sont incomplètes (formation, procédure écrite, information des salariés).", reco: [
        "Former les référents et sensibiliser l'ensemble des managers",
        "Formaliser par écrit la procédure de signalement et d'enquête",
        "Rendre l'information accessible et inscrire le risque au DUERP",
      ] },
      warn: { titre: "Prévention insuffisante", message: "Des éléments obligatoires manquent. En cas de signalement, l'organisation risque d'être prise au dépourvu et l'employeur exposé.", reco: [
        "Désigner et former les référents sans délai",
        "Écrire la procédure de traitement des signalements et d'enquête",
        "Former les managers et informer clairement les salariés",
      ] },
      alert: { titre: "À traiter en priorité", message: "Le dispositif obligatoire est largement absent. La responsabilité de l'employeur serait fortement engagée en cas de situation avérée.", reco: [
        "Mettre en place l'information des salariés et désigner les référents cette semaine",
        "Établir une procédure de signalement, d'enquête et de mesures conservatoires",
        "Programmer la formation des référents et des managers",
      ] },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "anti-corruption",
    theme: "anti-corruption",
    titre: "Pré-diagnostic anti-corruption",
    eyebrow: "Auto-évaluation · 10 questions · 3 minutes",
    intro: "Situez votre dispositif anticorruption au regard de la loi Sapin II : code de conduite, cartographie des risques, formation, tiers, alerte interne, contrôles.",
    cardDescription: "10 questions sur le dispositif anticorruption : assujettissement Sapin II, code de conduite, cartographie des risques, formation des personnels exposés, évaluation des tiers, alerte interne.",
    contexte: "La loi Sapin II impose aux entreprises dépassant certains seuils (500 salariés et 100 M€ de chiffre d'affaires, ou appartenant à un groupe atteignant ces seuils) un dispositif anticorruption complet, contrôlé par l'Agence française anticorruption (AFA). En deçà, une démarche proportionnée reste une bonne pratique et une exigence fréquente des donneurs d'ordre.",
    contactType: "prediag_anticorruption",
    groupes: [
      {
        titre: "Cadre & pilotage",
        questions: [
          { id: "seuils", legend: "Q1. Votre entreprise (ou votre groupe) dépasse-t-elle 500 salariés et 100 M€ de chiffre d'affaires ?", options: [
            { score: 3, label: "Oui" },
            { score: 0, label: "Non" },
            { score: 1, label: "Je ne sais pas" },
          ], constat: "Vous êtes probablement soumis à l'obligation de dispositif anticorruption Sapin II, contrôlable par l'AFA." },
          { id: "code", legend: "Q2. Un code de conduite anticorruption est-il formalisé et diffusé ?", options: [
            { score: 0, label: "Oui" },
            { score: 1, label: "En projet" },
            { score: 2, label: "Non" },
          ], constat: "Le code de conduite est le socle du dispositif ; pour les entreprises assujetties il doit être intégré au règlement intérieur." },
          { id: "cartographie", legend: "Q3. Une cartographie des risques de corruption a-t-elle été réalisée et est-elle actualisée ?", options: [
            { score: 0, label: "Oui, à jour" },
            { score: 1, label: "Oui, ancienne" },
            { score: 2, label: "Non" },
          ], constat: "La cartographie des risques conditionne tout le dispositif : sans elle, les mesures ne sont pas ciblées." },
        ],
      },
      {
        titre: "Sensibilisation & tiers",
        questions: [
          { id: "formation", legend: "Q4. Les cadres et personnels les plus exposés ont-ils été formés au risque de corruption ?", options: OPPN, constat: "La formation des personnels exposés (achats, commercial, direction) est une obligation explicite de la loi Sapin II." },
          { id: "cadeaux", legend: "Q5. Des règles claires encadrent-elles les cadeaux, invitations et frais de représentation ?", options: [
            { score: 0, label: "Oui, écrites" },
            { score: 1, label: "Informelles" },
            { score: 2, label: "Non" },
          ] },
          { id: "tiers", legend: "Q6. Les tiers (fournisseurs, agents, intermédiaires) font-ils l'objet d'une évaluation d'intégrité ?", options: [
            { score: 0, label: "Oui" },
            { score: 1, label: "Pour certains" },
            { score: 2, label: "Non" },
          ], constat: "Les intermédiaires et agents commerciaux sont un vecteur majeur de risque : une évaluation proportionnée est attendue." },
        ],
      },
      {
        titre: "Alerte & contrôle",
        questions: [
          { id: "alerte", legend: "Q7. Un dispositif d'alerte interne permet-il de signaler un fait de corruption en étant protégé ?", options: [
            { score: 0, label: "Oui, connu" },
            { score: 1, label: "Existe mais peu connu" },
            { score: 2, label: "Non" },
          ], constat: "Le dispositif d'alerte est obligatoire (loi Sapin II et directive sur les lanceurs d'alerte) et doit garantir la confidentialité." },
          { id: "comptable", legend: "Q8. Des contrôles comptables permettent-ils de détecter des paiements ou écritures anormaux ?", options: OPPN },
          { id: "sanctions", legend: "Q9. Le non-respect des règles anticorruption est-il assorti d'un régime de sanctions disciplinaires ?", options: OPN },
          { id: "suivi", legend: "Q10. Le dispositif fait-il l'objet d'un contrôle et d'une évaluation réguliers ?", options: OPN },
        ],
      },
    ],
    resultats: {
      ok: { titre: "Dispositif mature", message: "Les piliers d'un dispositif anticorruption sont en place. L'enjeu est l'actualisation régulière (cartographie, formations) et la preuve de son effectivité.", reco: [
        "Actualiser la cartographie des risques et le plan de formation chaque année",
        "Documenter les contrôles et l'évaluation du dispositif",
      ] },
      info: { titre: "Dispositif partiel", message: "Certains éléments clés existent mais d'autres manquent ou ne sont pas à jour. Un dispositif incomplet protège mal et se voit lors d'un contrôle.", reco: [
        "Réaliser ou actualiser la cartographie des risques de corruption",
        "Former les personnels exposés et formaliser les règles cadeaux / invitations",
        "Structurer l'évaluation des tiers et faire connaître l'alerte interne",
      ] },
      warn: { titre: "Dispositif à construire", message: "L'essentiel du dispositif attendu n'est pas en place. Si votre organisation est assujettie, l'écart avec les attentes de l'AFA est important.", reco: [
        "Établir une cartographie des risques et un code de conduite",
        "Mettre en place l'alerte interne et l'évaluation des tiers",
        "Lancer un plan de formation des personnels exposés",
      ] },
      alert: { titre: "À traiter en priorité", message: "Le dispositif anticorruption est absent. L'exposition juridique et le risque pour les dirigeants sont élevés, surtout en cas d'assujettissement.", reco: [
        "Cadrer un dispositif proportionné : code de conduite, cartographie, alerte",
        "Prioriser la formation des fonctions exposées (achats, commercial, direction)",
        "Mettre en place des contrôles comptables et un régime de sanctions",
      ] },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  {
    slug: "sobriete-numerique",
    theme: "sobriete-numerique",
    titre: "Pré-diagnostic sobriété numérique",
    eyebrow: "Auto-évaluation · 10 questions · 3 minutes",
    intro: "Situez la maturité de votre organisation en matière de numérique responsable : pilotage, cycle de vie des équipements, achats, sensibilisation, écoconception, mesure.",
    cardDescription: "10 questions sur le numérique responsable : stratégie, inventaire et durée de vie des équipements, achats, gestes des équipes, écoconception (RGESN), mesure d'impact.",
    contexte: "La loi REEN et le référentiel général d'écoconception des services numériques (RGESN) fixent des obligations croissantes, en particulier pour les collectivités et les grandes entreprises. La sobriété numérique est aussi un levier de réduction des coûts et un attendu RSE de plus en plus fréquent.",
    contactType: "prediag_sobriete",
    groupes: [
      {
        titre: "Pilotage",
        questions: [
          { id: "pilote", legend: "Q1. La réduction de l'empreinte environnementale du numérique est-elle portée par quelqu'un dans l'organisation ?", options: [
            { score: 0, label: "Oui" },
            { score: 1, label: "Informellement" },
            { score: 2, label: "Non" },
          ] },
          { id: "strategie", legend: "Q2. Une stratégie ou une feuille de route « numérique responsable » existe-t-elle ?", options: [
            { score: 0, label: "Oui" },
            { score: 1, label: "En projet" },
            { score: 2, label: "Non" },
          ], constat: "Les communes et intercommunalités de plus de 50 000 habitants doivent adopter une stratégie numérique responsable (loi REEN)." },
        ],
      },
      {
        titre: "Équipements",
        questions: [
          { id: "inventaire", legend: "Q3. Le parc d'équipements (postes, mobiles, serveurs) est-il inventorié, avec son âge ?", options: OPPN, constat: "La fabrication des équipements représente l'essentiel de l'impact : sans inventaire, impossible d'agir sur leur durée de vie." },
          { id: "dureeVie", legend: "Q4. La durée d'usage des équipements est-elle allongée (réemploi, reconditionné, réparation) ?", options: [
            { score: 0, label: "Oui, c'est une règle" },
            { score: 1, label: "Un peu" },
            { score: 2, label: "Non" },
          ], constat: "Allonger la durée de vie du matériel est le geste le plus efficace pour réduire l'empreinte du numérique." },
          { id: "finVie", legend: "Q5. Les équipements en fin d'usage sont-ils réemployés ou orientés vers une filière DEEE / ESS ?", options: OPPN },
          { id: "achats", legend: "Q6. Des critères environnementaux sont-ils intégrés aux achats numériques ?", options: [
            { score: 0, label: "Oui" },
            { score: 1, label: "Parfois" },
            { score: 2, label: "Non" },
          ] },
        ],
      },
      {
        titre: "Usages & services",
        questions: [
          { id: "sensibilisation", legend: "Q7. Les collaborateurs sont-ils sensibilisés aux gestes de sobriété (stockage, visio, pièces jointes) ?", options: [
            { score: 0, label: "Oui" },
            { score: 1, label: "Occasionnellement" },
            { score: 2, label: "Non" },
          ], constat: "Les gestes individuels (stockage, pièces jointes, streaming) ont un effet réel à l'échelle de l'organisation." },
          { id: "ecoconception", legend: "Q8. Les projets de sites et d'applications intègrent-ils l'écoconception (RGESN) ?", options: OPPN, constat: "Le RGESN devient une référence attendue dans les cahiers des charges, notamment publics." },
        ],
      },
      {
        titre: "Mesure",
        questions: [
          { id: "mesure", legend: "Q9. Mesurez-vous l'empreinte de vos services numériques (EcoIndex, bilan) ?", options: [
            { score: 0, label: "Oui" },
            { score: 1, label: "Ponctuellement" },
            { score: 2, label: "Non" },
          ] },
          { id: "reporting", legend: "Q10. Ces enjeux sont-ils intégrés à votre reporting RSE ou extra-financier ?", options: [
            { score: 0, label: "Oui" },
            { score: 1, label: "Non" },
          ] },
        ],
      },
    ],
    resultats: {
      ok: { titre: "Démarche engagée", message: "Votre organisation pilote sa sobriété numérique et agit sur les leviers principaux. L'enjeu est d'ancrer la mesure et le reporting.", reco: [
        "Systématiser la mesure d'impact (EcoIndex, bilan) et son suivi dans le temps",
        "Diffuser l'écoconception à tous les nouveaux projets numériques",
      ] },
      info: { titre: "Premiers pas faits", message: "Des actions existent, mais sans stratégie ni mesure d'ensemble : les efforts risquent de rester dispersés et peu démontrables.", reco: [
        "Formaliser une feuille de route et désigner un pilote",
        "Inventorier le parc et poser une règle de durée de vie des équipements",
        "Sensibiliser les équipes et intégrer l'écoconception aux projets",
      ] },
      warn: { titre: "Sujet peu structuré", message: "La sobriété numérique n'est pas réellement pilotée. Les gains de coûts et l'attendu réglementaire (REEN, RGESN) restent inexploités.", reco: [
        "Nommer un référent et cadrer une feuille de route",
        "Prioriser l'allongement de la durée de vie et le réemploi des équipements",
        "Lancer une sensibilisation des équipes aux gestes de sobriété",
      ] },
      alert: { titre: "Sujet non traité", message: "Aucune démarche n'est en place. Pour une collectivité concernée par la loi REEN, l'écart avec l'obligation est important.", reco: [
        "Désigner un pilote et établir une feuille de route numérique responsable",
        "Réaliser l'inventaire du parc et définir une politique de cycle de vie",
        "Former les équipes et intégrer l'écoconception aux cahiers des charges",
      ] },
    },
  },
];

export function getPrediag(slug: string): Prediag | undefined {
  return prediagnostics.find((p) => p.slug === slug);
}
