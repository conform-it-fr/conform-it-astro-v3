---
title: "Chapitre 5 du RGAA : Tableaux – structurer les données pour une lecture accessible"
description: "Le chapitre 5 du RGAA concerne les tableaux de données. Très utilisés pour présenter des informations chiffrées, des comparatifs ou des plannings, les tableaux peuvent devenir…"
pubDate: 2026-02-09
featured: false
category: "Accessibilité RGAA"
image: "/images/articles/chapitre-5-du-rgaa-tableaux-structurer-les-donnees-pour-une-lecture-accessible.webp"
imageAlt: "Illustration pour l'article relatif au chapitre 5 : Tableaux"
hidden: true
---

## Introduction

Le chapitre 5 du RGAA concerne les tableaux de données. Très utilisés pour présenter des informations chiffrées, des comparatifs ou des plannings, les tableaux peuvent devenir difficiles à comprendre pour les utilisateurs de technologies d’assistance s’ils ne sont pas correctement structurés.

L’objectif de ce chapitre est de garantir que les relations entre les données (lignes, colonnes, en-têtes) soient clairement identifiables et compréhensibles, notamment pour les personnes utilisant un lecteur d’écran.

## Deux types de tableaux à distinguer

Le RGAA fait une distinction essentielle entre deux usages :

- Les **tableaux de données** : utilisés pour présenter des informations structurées
- Les **tableaux de mise en page** : utilisés uniquement pour organiser visuellement du contenu (à éviter autant que possible)

Seuls les tableaux de données doivent utiliser les balises spécifiques du HTML tabulaire.

## Les règles fondamentales pour les tableaux de données

Pour être accessible, un tableau doit :

- Définir clairement ses en-têtes de colonnes et/ou de lignes
- Permettre de comprendre la relation entre chaque cellule et son en-tête
- Avoir un titre ou une légende si nécessaire
- Être lisible même lorsqu’il est parcouru de manière linéaire (lecture vocale)

Ces éléments permettent aux lecteurs d’écran d’annoncer correctement les informations.

### Exemple 1 : tableau simple avec en-têtes de colonnes

```
<table>
  <caption>Ventes trimestrielles 2024</caption>
  <thead>
    <tr>
      <th scope="col">Trimestre</th>
      <th scope="col">Produit A</th>
      <th scope="col">Produit B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>T1</td>
      <td>120</td>
      <td>95</td>
    </tr>
    <tr>
      <td>T2</td>
      <td>140</td>
      <td>110</td>
    </tr>
  </tbody>
</table>
```

Bonnes pratiques :

- Utilisation de `<th>` pour les en-têtes
- Attribut `scope="col"` pour associer les colonnes
- `<caption>` pour donner un titre au tableau

Un lecteur d’écran pourra annoncer :  
« Produit A, 120 » en lisant la cellule correspondante.

#### Exemple 2 : tableau avec en-têtes de lignes

```
<table>
  <caption>Population par région</caption>
  <tr>
    <th scope="row">Île-de-France</th>
    <td>12 000 000</td>
  </tr>
  <tr>
    <th scope="row">Occitanie</th>
    <td>6 000 000</td>
  </tr>
</table>
```

Ici, `scope="row"` permet d’associer chaque donnée à son en-tête de ligne.

#### Exemple 3 : tableau complexe avec plusieurs niveaux d’en-têtes

Dans certains cas, les en-têtes sont imbriqués. On peut alors utiliser des identifiants pour relier les cellules.

```
<table>
  <caption>Résultats annuels par service</caption>
  <tr>
    <th id="annee"></th>
    <th id="ventes">Ventes</th>
    <th id="support">Support</th>
  </tr>
  <tr>
    <th id="2023">2023</th>
    <td headers="2023 ventes">120</td>
    <td headers="2023 support">80</td>
  </tr>
</table>
```

L’attribut `headers` permet de préciser à quels en-têtes chaque cellule est liée.

#### Exemple 4 : tableau avec description complémentaire

```
<p id="desc-tableau">
  Ce tableau présente l’évolution des ventes sur deux années consécutives.
</p>

<table aria-describedby="desc-tableau">
  <caption>Comparatif des ventes</caption>
  ...
</table>
```

Ici, `aria-describedby` apporte un contexte supplémentaire.

## Utilisation d’ARIA : quand est-ce utile ?

Dans la majorité des cas, le HTML natif suffit largement si la structure est correcte. Les balises `<table>`, `<th>`, `<td>`, `<caption>` et les attributs `scope` couvrent les besoins.

ARIA peut être utile dans des cas spécifiques :

### Ajouter un rôle explicite (rarement nécessaire)

```
<table role="table">
```

Ce cas concerne surtout des composants recréés en HTML non tabulaire.

#### Associer une description détaillée

```
<table aria-label="Tableau des résultats financiers 2024">
```

Ou :

```
<table aria-describedby="explication">
```

Cela permet de donner un contexte global.

#### Exemple 5 : faux tableau créé avec des div (à éviter)

```
<div role="table">
  <div role="row">
    <div role="columnheader">Nom</div>
    <div role="columnheader">Score</div>
  </div>
</div>
```

Ce type de structure est possible avec ARIA, mais fortement déconseillé si un vrai tableau peut être utilisé.

Le principe RGAA reste :

> Privilégier le HTML natif plutôt que recréer un tableau avec ARIA.

#### Les tableaux de mise en page : vigilance

Si un tableau est utilisé uniquement pour la mise en page :

- Il ne doit pas contenir de balises `<th>`
- Il ne doit pas induire une lecture erronée
- Il doit rester simple et linéaire

Cependant, cette pratique est aujourd’hui déconseillée.

## Erreurs fréquentes observées en audit

Parmi les problèmes courants :

- Données présentées sans en-têtes
- En-têtes visuels non codés en `<th>`
- Absence de titre ou de légende
- Tableaux complexes incompréhensibles à la lecture vocale
- Utilisation excessive d’ARIA pour compenser une mauvaise structure

Ces erreurs rendent la compréhension difficile pour les utilisateurs de lecteurs d’écran.

## Impact concret pour les utilisateurs

Un lecteur d’écran lit les tableaux cellule par cellule. Sans structure claire, l’utilisateur entend uniquement une suite de chiffres ou de mots sans lien entre eux.

Avec une bonne structuration, chaque donnée est annoncée avec son contexte :

- Nom de la colonne
- Nom de la ligne
- Valeur

Cela transforme totalement l’expérience de lecture.

## Conclusion

Le chapitre 5 du RGAA insiste sur une structuration rigoureuse des tableaux de données afin que les relations entre les informations soient clairement identifiables. L’utilisation correcte des balises HTML dédiées suffit dans la majorité des cas à garantir une bonne accessibilité.

Les attributs ARIA peuvent compléter certains cas complexes, mais ils ne doivent jamais remplacer une structure tabulaire correcte. Un tableau bien construit devient ainsi lisible, compréhensible et exploitable pour tous les utilisateurs, quel que soit leur mode de navigation.
