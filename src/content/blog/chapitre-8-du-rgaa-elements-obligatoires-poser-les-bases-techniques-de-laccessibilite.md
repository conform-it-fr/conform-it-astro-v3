---
title: "Chapitre 8 du RGAA : Éléments obligatoires – poser les bases techniques de l’accessibilité"
description: "Le chapitre 8 du RGAA traite des éléments obligatoires présents dans toute page web. Contrairement aux chapitres précédents qui concernent des contenus spécifiques (images,…"
pubDate: 2026-02-09
featured: false
category: "Accessibilité RGAA"
image: "/images/articles/chapitre-8-du-rgaa-elements-obligatoires-poser-les-bases-techniques-de-laccessibilite.webp"
imageAlt: "Illustration pour l'article relatif au chapitre 8 : Eléments obligatoires"
hidden: true
---

## Introduction

Le chapitre 8 du RGAA traite des éléments obligatoires présents dans toute page web. Contrairement aux chapitres précédents qui concernent des contenus spécifiques (images, tableaux, scripts…), celui-ci porte sur les fondations techniques indispensables à l’accessibilité.

Ces éléments permettent aux technologies d’assistance de **comprendre correctement la structure, la langue et le fonctionnement global de la page**. S’ils sont absents ou mal définis, même un contenu bien conçu peut devenir difficile à interpréter.

## Les informations essentielles d’une page accessible

Le chapitre 8 impose notamment la présence et la qualité de plusieurs éléments structurants :

- Un titre de page pertinent
- Une langue principale déclarée
- Des changements de langue signalés
- Une structure HTML valide
- Des métadonnées utiles à la compréhension

Ces éléments sont souvent invisibles pour l’utilisateur, mais essentiels pour les lecteurs d’écran.

### Exemple 1 : le titre de page (balise `<title>`)

Le titre de la page est la première information annoncée par un lecteur d’écran. Il doit décrire clairement le contenu.

```
<head>
  <title>Contact – Ville de Nantes</title>
</head>
```

Bonnes pratiques :

- Le titre doit être unique et pertinent
- Il doit refléter le contenu principal
- Il doit permettre de distinguer les pages entre elles

Exemple non pertinent :

```
<title>Accueil</title>
```

Trop vague si plusieurs pages portent ce nom.

#### Exemple 2 : déclaration de la langue principale

La langue doit être indiquée pour permettre une bonne prononciation par les lecteurs d’écran.

```
<html lang="fr">
```

Cela permet au logiciel de lecture vocale d’utiliser la bonne synthèse vocale.

#### Exemple 3 : changement de langue dans le contenu

Lorsqu’un mot ou un passage est dans une autre langue, cela doit être signalé.

```
<p>
  Le terme <span lang="en">accessibility</span> signifie accessibilité.
</p>
```

Le lecteur d’écran change automatiquement de prononciation.

#### Exemple 4 : structure HTML correcte

Une page doit respecter les standards du web :

- Balises correctement imbriquées
- Attributs valides
- Absence d’erreurs bloquantes

Exemple simple :

```
<header>
  <h1>Actualités</h1>
</header>

<main>
  <article>
    <h2>Nouvelle version du site</h2>
  </article>
</main>
```

Une structure claire facilite la navigation pour tous.

#### Exemple 5 : identification des zones importantes avec ARIA

Dans les pages complexes, ARIA peut aider à identifier les grandes régions.

```
<header role="banner">
  ...
</header>

<nav role="navigation">
  ...
</nav>

<main role="main">
  ...
</main>

<footer role="contentinfo">
  ...
</footer>
```

Cependant, en HTML5, ces rôles sont souvent implicites. Par exemple :

```
<header>
<nav>
<main>
<footer>
```

Les rôles ARIA sont alors optionnels.

#### Exemple 6 : donner un nom à une zone spécifique

```
<nav aria-label="Menu principal">
  ...
</nav>
```

Cela permet au lecteur d’écran d’annoncer clairement la fonction de la zone.

#### Exemple 7 : gestion du focus lors du chargement

Dans certaines applications dynamiques, on peut préciser la zone principale.

```
<main tabindex="-1" id="contenu-principal">
  ...
</main>
```

Puis déplacer le focus avec un script pour faciliter la navigation.

## Le rôle d’ARIA dans ce chapitre

ARIA intervient surtout pour compléter la structure lorsque le HTML seul ne suffit pas :

- `role="main"` pour identifier le contenu principal
- `role="navigation"` pour nommer un menu
- `aria-label` pour préciser la fonction d’une zone
- `aria-labelledby` pour associer un titre

Mais dans la majorité des cas, le HTML5 fournit déjà les bonnes bases.

## Les critères clés du RGAA pour les éléments obligatoires

Le chapitre 8 vérifie notamment que :

- Le titre de page est présent et pertinent
- La langue principale est définie
- Les changements de langue sont signalés
- Le code HTML est valide
- Les régions principales sont identifiables

Ces éléments permettent aux technologies d’assistance d’interpréter correctement la page.

## Erreurs fréquentes observées en audit

On retrouve souvent :

- Des titres de pages identiques sur tout le site
- Une langue non déclarée
- Des mots étrangers non signalés
- Une structure HTML confuse
- Des zones importantes non identifiables

Ces problèmes dégradent fortement l’expérience de navigation.

## Impact concret pour les utilisateurs

Sans langue déclarée, un lecteur d’écran peut prononcer un texte français avec un accent anglais.  
Sans titre clair, il devient difficile de se repérer entre plusieurs onglets ouverts.  
Sans structure identifiable, la navigation devient lente et imprécise.

Ces éléments, bien que discrets, jouent un rôle majeur dans l’accessibilité globale.

## Conclusion

Le chapitre 8 du RGAA pose les fondations techniques indispensables à toute page accessible. Titre de page, langue, structure HTML et identification des régions principales permettent aux technologies d’assistance de comprendre correctement le contenu.

Les attributs ARIA peuvent compléter cette structure, notamment pour nommer certaines zones, mais l’essentiel repose sur une base HTML propre, cohérente et bien organisée. Ces éléments obligatoires constituent le socle sur lequel repose toute démarche d’accessibilité numérique.
