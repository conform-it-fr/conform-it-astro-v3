---
title: "Chapitre 12 du RGAA : Navigation – permettre à tous de se repérer et se déplacer efficacement"
description: "Le chapitre 12 du RGAA est consacré à la navigation. Il concerne tous les mécanismes qui permettent à l’utilisateur de se déplacer dans un site ou une application : menus, liens…"
pubDate: 2026-02-09
featured: false
category: "Accessibilité RGAA"
image: "/images/articles/chapitre-12-du-rgaa-navigation-permettre-a-tous-de-se-reperer-et-se-deplacer-efficacement.webp"
imageAlt: "Illustration pour l'article relatif au chapitre 12 : Navigation"
hidden: true
---

## Introduction

Le chapitre 12 du RGAA est consacré à la navigation. Il concerne tous les mécanismes qui permettent à l’utilisateur de se déplacer dans un site ou une application : menus, liens d’évitement, fil d’Ariane, pagination, moteurs de recherche internes, etc.

Une **navigation claire et cohérente est essentielle** pour tous les utilisateurs, mais elle l’est encore davantage pour les personnes qui utilisent un clavier, un lecteur d’écran ou qui présentent des difficultés de concentration. L’objectif est de leur permettre de comprendre où ils se trouvent et d’accéder rapidement aux contenus importants.

## Les enjeux d’accessibilité de la navigation

Une navigation accessible doit permettre de :

- Accéder rapidement au contenu principal
- Comprendre la structure du site
- Se repérer facilement d’une page à l’autre
- Utiliser tous les menus au clavier
- Identifier sa position dans le site

Sans cela, la navigation peut devenir lente, confuse et frustrante.

### Exemple 1 : lien d’évitement vers le contenu principal

Les liens d’évitement permettent de passer directement au contenu sans parcourir tout le menu.

```
<a href="#contenu" class="skip-link">
  Aller au contenu principal
</a>

<main id="contenu">
  ...
</main>
```

Ces liens sont très utiles pour les utilisateurs clavier et lecteurs d’écran.

#### Exemple 2 : menu de navigation structuré

```
<nav aria-label="Menu principal">
  <ul>
    <li><a href="/accueil">Accueil</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

L’attribut `aria-label` permet d’identifier clairement la fonction du menu.

#### Exemple 3 : menu déroulant accessible

```
<button 
  aria-expanded="false"
  aria-controls="menu-services">
  Services
</button>

<ul id="menu-services" hidden>
  <li><a href="/etat-civil">État civil</a></li>
  <li><a href="/urbanisme">Urbanisme</a></li>
</ul>
```

Le script devra mettre à jour `aria-expanded` lors de l’ouverture.

#### Exemple 4 : fil d’Ariane (breadcrumb)

Le fil d’Ariane aide à comprendre la position dans le site.

```
<nav aria-label="Fil d’Ariane">
  <ol>
    <li><a href="/accueil">Accueil</a></li>
    <li><a href="/services">Services</a></li>
    <li aria-current="page">État civil</li>
  </ol>
</nav>
```

`aria-current="page"` indique la page active.

#### Exemple 5 : pagination

```
<nav aria-label="Pagination">
  <ul>
    <li><a href="?page=1">1</a></li>
    <li><a href="?page=2" aria-current="page">2</a></li>
    <li><a href="?page=3">3</a></li>
  </ul>
</nav>
```

Cela permet de savoir quelle page est affichée.

#### Exemple 6 : moteur de recherche interne

```
<form role="search">
  <label for="recherche">Rechercher</label>
  <input type="search" id="recherche">
  <button type="submit">Valider</button>
</form>
```

Le rôle `search` permet d’identifier rapidement la fonction du formulaire.

#### Exemple 7 : zones de navigation multiples

Un site peut comporter plusieurs menus. Il est important de les nommer.

```
<nav aria-label="Menu principal">
  ...
</nav>

<nav aria-label="Menu secondaire">
  ...
</nav>
```

Cela aide les utilisateurs à distinguer les différentes zones.

## Le rôle d’ARIA dans la navigation

ARIA permet de rendre la navigation plus compréhensible :

- `aria-label` pour nommer un menu
- `aria-expanded` pour indiquer l’état d’un menu déroulant
- `aria-controls` pour relier un bouton à une zone
- `aria-current="page"` pour indiquer la page active
- `role="search"` pour identifier un moteur de recherche

Ces attributs complètent la structure HTML.

## Les critères clés du RGAA pour la navigation

Le chapitre 12 vérifie notamment que :

- Des liens d’évitement sont présents
- Les menus sont utilisables au clavier
- La navigation est cohérente sur tout le site
- La position dans le site est identifiable
- Les zones de navigation sont clairement nommées

Ces éléments facilitent le déplacement et le repérage.

## Erreurs fréquentes observées en audit

On retrouve souvent :

- Absence de lien vers le contenu principal
- Menus déroulants non accessibles au clavier
- Position active non identifiable
- Menus non nommés ou confus
- Navigation incohérente d’une page à l’autre

Ces problèmes rendent le parcours du site difficile.

## Impact concret pour les utilisateurs

Un utilisateur clavier peut devoir parcourir des dizaines de liens avant d’atteindre le contenu principal si aucun lien d’évitement n’est prévu.

Un lecteur d’écran peut aussi avoir du mal à comprendre la structure du site sans zones de navigation clairement identifiées.

Une navigation bien pensée améliore fortement l’autonomie.

## Conclusion

Le chapitre 12 du RGAA met l’accent sur l’importance d’une navigation claire, cohérente et accessible. Les utilisateurs doivent pouvoir se repérer, comprendre où ils sont et accéder rapidement aux contenus essentiels.

Le HTML fournit déjà des éléments structurants efficaces, et les attributs ARIA viennent compléter cette organisation en précisant les rôles, les états et les zones de navigation. Une bonne navigation est un facteur clé d’accessibilité et de confort pour tous les utilisateurs.
