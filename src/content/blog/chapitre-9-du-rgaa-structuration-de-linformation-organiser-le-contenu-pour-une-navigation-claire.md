---
title: "Chapitre 9 du RGAA : Structuration de l’information – organiser le contenu pour une navigation claire"
description: "Le chapitre 9 du RGAA est consacré à la structuration de l’information. Il s’agit d’un pilier essentiel de l’accessibilité, car une bonne organisation du contenu permet à tous les…"
pubDate: 2026-02-09
featured: false
category: "Accessibilité RGAA"
image: "/images/articles/chapitre-9-du-rgaa-structuration-de-linformation-organiser-le-contenu-pour-une-navigation-claire.webp"
imageAlt: "Illutsration pour l'article relatif au chapitre 9 : Structuration de l'information"
hidden: true
---

## Introduction

Le chapitre 9 du RGAA est consacré à la structuration de l’information. Il s’agit d’un pilier essentiel de l’accessibilité, car une bonne organisation du contenu permet à tous les utilisateurs de comprendre plus facilement une page et de s’y repérer rapidement.

Pour les personnes utilisant un lecteur d’écran, la structure n’est pas seulement visuelle : elle devient un véritable système de navigation. Les titres, listes, sections et regroupements logiques permettent de parcourir une page efficacement, sans devoir tout lire.

L’objectif de ce chapitre est donc de garantir que l’information soit organisée de manière cohérente, hiérarchisée et compréhensible.

## Pourquoi la structuration est essentielle

Une page web bien structurée permet de :

- Comprendre rapidement le contenu principal
- Identifier les différentes sections
- Naviguer de titre en titre
- Repérer les blocs d’informations importants

Sans structure claire, une page devient une succession de textes sans repères, difficile à interpréter pour tous les utilisateurs, et particulièrement pour ceux qui naviguent à la voix ou au clavier.

### Exemple 1 : hiérarchie correcte des titres

Les titres doivent suivre un ordre logique avec les balises `<h1>` à `<h6>`.

```
<h1>Services municipaux</h1>

<h2>État civil</h2>
<p>Informations sur les démarches administratives.</p>

<h2>Éducation</h2>
<p>Présentation des établissements scolaires.</p>

<h3>Inscriptions scolaires</h3>
<p>Modalités et calendrier.</p>
```

Bonnes pratiques :

- Un seul `<h1>` pour le titre principal
- Des sous-sections avec `<h2>`, `<h3>`, etc.
- Pas de saut de niveau (éviter de passer de `<h1>` à `<h4>`)

Cela permet au lecteur d’écran de proposer une navigation par titres.

#### Exemple 2 : faux titres créés avec du style (à éviter)

```
<p style="font-size:24px; font-weight:bold;">
  Nos services
</p>
```

Visuellement, cela ressemble à un titre, mais ce n’est pas reconnu comme tel.

Correction :

```
<h2>Nos services</h2>
```

#### Exemple 3 : structurer avec des listes

Les listes permettent de regrouper des éléments liés.

```
<h2>Documents à fournir</h2>
<ul>
  <li>Carte d’identité</li>
  <li>Justificatif de domicile</li>
  <li>Photo récente</li>
</ul>
```

Cela est plus compréhensible qu’une simple succession de lignes.

#### Exemple 4 : structurer avec des sections HTML

Les balises HTML5 aident à organiser les grandes parties d’une page.

```
<main>
  <section>
    <h2>Actualités</h2>
    ...
  </section>

  <section>
    <h2>Événements</h2>
    ...
  </section>
</main>
```

Ces balises sont reconnues par les technologies d’assistance.

#### Exemple 5 : renforcer la structure avec ARIA

Dans certaines interfaces complexes, ARIA peut préciser les rôles des zones.

```
<div role="region" aria-labelledby="titre-actu">
  <h2 id="titre-actu">Actualités</h2>
  ...
</div>
```

Cela permet au lecteur d’écran d’identifier clairement une région importante.

#### Exemple 6 : associer un groupe d’éléments

ARIA peut aussi aider à regrouper des contenus liés.

```
<div role="group" aria-labelledby="titre-contact">
  <h2 id="titre-contact">Coordonnées</h2>
  <p>Téléphone : 01 23 45 67 89</p>
  <p>Email : contact@ville.fr</p>
</div>
```

Le groupe devient identifiable comme un bloc cohérent.

#### Exemple 7 : structurer un article

```
<article>
  <header>
    <h1>Ouverture d’un nouveau centre culturel</h1>
  </header>

  <section>
    <h2>Présentation</h2>
    <p>Le centre ouvrira en septembre.</p>
  </section>

  <section>
    <h2>Programme</h2>
    <p>Des activités pour tous les publics.</p>
  </section>
</article>
```

La structure devient claire et prévisible.

## Le rôle d’ARIA dans la structuration

ARIA peut compléter la structuration lorsque le HTML seul ne suffit pas :

- `role="region"` pour identifier une zone importante
- `role="group"` pour regrouper des contenus liés
- `aria-labelledby` pour associer un titre à une section
- `aria-label` pour nommer une zone sans titre visible

Cependant, le principe reste le même : utiliser d’abord les balises HTML adaptées.

## Les critères clés du RGAA pour la structuration

Le chapitre 9 vérifie notamment que :

- Les titres sont correctement hiérarchisés
- Les sections sont clairement identifiables
- Les listes sont utilisées pour structurer des éléments similaires
- Les contenus sont regroupés de manière logique
- La structure est compréhensible sans mise en forme visuelle

Ces éléments permettent une navigation efficace.

## Erreurs fréquentes observées en audit

On retrouve souvent :

- Des titres créés uniquement avec du style CSS
- Des niveaux de titres incohérents
- Des blocs d’informations non structurés
- Des regroupements visuels non codés en HTML
- Une utilisation excessive d’ARIA pour compenser un manque de structure

Ces problèmes compliquent la navigation, notamment pour les lecteurs d’écran.

## Impact concret pour les utilisateurs

Un lecteur d’écran permet souvent de naviguer directement par titres. Si la structure est correcte, un utilisateur peut :

- Accéder rapidement à une section précise
- Comprendre l’organisation globale
- Sauter les parties non pertinentes

Sans structuration claire, la navigation devient lente et désorientante.

## Conclusion

Le chapitre 9 du RGAA met l’accent sur l’organisation logique de l’information. Une hiérarchie claire de titres, des sections bien définies et des regroupements cohérents permettent à tous les utilisateurs de comprendre et parcourir une page efficacement.

Les attributs ARIA peuvent venir renforcer cette structure dans certains cas, mais la base repose sur un HTML bien construit. Une bonne structuration améliore non seulement l’accessibilité, mais aussi la lisibilité et la qualité globale des contenus.
