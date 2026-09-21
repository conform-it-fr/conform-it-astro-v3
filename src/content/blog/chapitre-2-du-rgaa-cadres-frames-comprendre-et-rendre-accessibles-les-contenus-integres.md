---
title: "Chapitre 2 du RGAA : Cadres (frames) – comprendre et rendre accessibles les contenus intégrés"
description: "Le chapitre 2 du RGAA est consacré aux cadres, plus communément appelés frames et iframes . Même si leur usage est aujourd’hui plus encadré qu’à l’époque des framesets, ils…"
pubDate: 2026-02-09
featured: false
category: "Accessibilité RGAA"
image: "/images/articles/chapitre-2-du-rgaa-cadres-frames-comprendre-et-rendre-accessibles-les-contenus-integres.webp"
imageAlt: "Illustration de l'article relatif au chapitre 2 : les cadres"
hidden: true
---

## Introduction

Le chapitre 2 du RGAA est consacré aux cadres, plus communément appelés *frames* et *iframes*. Même si leur usage est aujourd’hui plus encadré qu’à l’époque des framesets, ils restent très présents dans les sites web modernes : vidéos embarquées, cartes interactives, contenus tiers, modules externes, etc.

L’objectif de ce chapitre est de garantir que ces contenus intégrés soient identifiables, compréhensibles et utilisables par tous les utilisateurs, notamment ceux qui naviguent avec un lecteur d’écran.

## Qu’est-ce qu’un cadre (frame) ?

Un cadre est une zone d’une page web qui affiche un autre document HTML. Aujourd’hui, cela se traduit presque exclusivement par l’utilisation de la balise :

```
<iframe>
```

On la retrouve notamment pour intégrer :

- Une vidéo YouTube
- Une carte interactive
- Un module de paiement
- Un formulaire externe
- Un contenu provenant d’un autre site

**Pour un utilisateur de lecteur d’écran, chaque iframe est perçue comme une page dans la page. Sans identification claire, la navigation devient confuse.**

## L’exigence principale du RGAA

Le principe central du chapitre 2 est simple :

> Chaque cadre doit avoir un titre pertinent.

Ce titre permet aux technologies d’assistance d’annoncer clairement à l’utilisateur ce que contient la zone intégrée.

### Exemple 1 : iframe sans titre (non conforme)

```
<iframe src="https://www.youtube.com/embed/abc123">
</iframe>
```

Problème :

- Le lecteur d’écran annonce seulement « cadre »
- Impossible de savoir ce qu’il contient

#### Exemple 2 : iframe avec titre pertinent (conforme)

```
<iframe src="https://www.youtube.com/embed/abc123" 
    title="Vidéo de présentation du service"> 
</iframe>
```

Bon usage :

- L’attribut `title` décrit clairement le contenu
- L’utilisateur comprend immédiatement ce qu’il va trouver

#### Bonnes pratiques pour rédiger le titre

Le titre doit décrire la fonction du contenu intégré, pas seulement sa nature.

Exemples pertinents :

- `title="Carte indiquant l’emplacement de nos agences"`
- `title="Formulaire de contact"`
- `title="Module de paiement sécurisé"`
- `title="Vidéo explicative sur l’accessibilité"`

À éviter :

- `title="iframe"`
- `title="cadre"`
- `title="contenu"`

#### Exemple 3 : intégration d’une carte interactive

```
<iframe src="https://maps.google.com/..." 
    title="Carte montrant l’adresse du siège social"> 
</iframe>
```

Ici, le titre permet à l’utilisateur de comprendre qu’il s’agit d’une carte et à quoi elle sert.

#### Exemple 4 : intégration d’un service tiers

```
<iframe src="https://paiement.externe.com" 
    title="Interface de paiement sécurisé"> 
</iframe>
```

Le titre rassure et informe sur la nature du contenu externe.

## ARIA : est-ce nécessaire pour les cadres ?

Dans la majorité des cas, l’attribut `title` suffit. C’est la méthode recommandée et la plus robuste.

ARIA devient utile seulement dans des cas particuliers.

### Cas 1 : donner un nom accessible plus précis

```
<iframe src="/statistiques.html" 
   title="Tableau de bord" 
   aria-label="Tableau de bord des statistiques de fréquentation"> 
</iframe>
```

Ici :

- `title` reste obligatoire
- `aria-label` peut apporter un complément d’information

#### Cas 2 : associer une description plus détaillée

```
<p id="desc-carte"> Cette carte permet de localiser nos agences en France et d’obtenir un itinéraire. </p> 
<iframe src="https://maps.google.com/..." 
   title="Carte des agences" 
   aria-describedby="desc-carte"> 
</iframe>
```

L’utilisateur dispose alors :

- D’un titre court
- D’une description plus complète

## Navigation et accessibilité des contenus intégrés

Le RGAA ne se limite pas au titre du cadre. Il encourage aussi à vérifier que :

- Le contenu intégré est lui-même accessible
- La navigation au clavier fonctionne à l’intérieur du cadre
- Le focus n’est pas piégé

En pratique, cela dépend souvent du service tiers intégré. Il est donc important de choisir des solutions accessibles lorsque c’est possible.

### Cas particulier : iframe décorative

Si un iframe ne transmet aucune information utile (cas rare), il peut être masqué aux technologies d’assistance :

```
<iframe src="animation-decorative.html" 
   title="" 
   aria-hidden="true"> 
</iframe>
```

Mais cette situation doit rester exceptionnelle.

## Erreurs fréquentes observées en audit

Parmi les non-conformités courantes :

- Absence totale d’attribut `title`
- Titres trop vagues
- Multiples iframes avec le même intitulé
- Titres techniques incompréhensibles
- Contenus tiers impossibles à utiliser au clavier

Ces problèmes rendent la navigation difficile et désorientent les utilisateurs de lecteurs d’écran.

## Impact pour les utilisateurs

Sans titre clair, un utilisateur aveugle peut entendre une suite d’annonces comme :

- « Cadre »
- « Cadre »
- « Cadre »

Impossible alors de savoir où se trouve une vidéo, un formulaire ou une carte.

Un simple titre descriptif transforme complètement l’expérience de navigation.

## Conclusion

Le chapitre 2 du RGAA repose sur une règle simple mais essentielle : chaque cadre doit être identifiable et compréhensible. L’attribut `title` constitue la solution principale pour nommer correctement les iframes et permettre aux technologies d’assistance d’annoncer leur contenu.

Les attributs ARIA peuvent venir en complément pour enrichir l’information, mais ne remplacent jamais ce titre obligatoire. Bien appliquées, ces bonnes pratiques garantissent une navigation plus claire et évitent que les contenus intégrés deviennent des zones opaques pour certains utilisateurs.
