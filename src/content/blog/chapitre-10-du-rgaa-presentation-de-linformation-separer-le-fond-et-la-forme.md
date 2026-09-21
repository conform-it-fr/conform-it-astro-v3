---
title: "Chapitre 10 du RGAA : Présentation de l’information – séparer le fond et la forme"
description: "Le chapitre 10 du RGAA porte sur la présentation de l’information, c’est-à-dire la manière dont le contenu est affiché visuellement : mise en page, styles, tailles de texte,…"
pubDate: 2026-02-09
featured: false
category: "Accessibilité RGAA"
image: "/images/articles/chapitre-10-du-rgaa-presentation-de-linformation-separer-le-fond-et-la-forme.webp"
imageAlt: "Illustration pour l'article relatif au chapitre 10 : Présentation de l'information"
hidden: true
---

## Introduction

Le chapitre 10 du RGAA porte sur la présentation de l’information, c’est-à-dire la manière dont le contenu est affiché visuellement : mise en page, styles, tailles de texte, espacements, positionnement, etc.

L’enjeu principal est de **garantir que l’information reste accessible quelles que soient les préférences d’affichage de l’utilisateur**. Certaines personnes agrandissent le texte, modifient les contrastes ou utilisent des feuilles de style personnalisées. Le contenu doit rester lisible et compréhensible dans ces conditions.

Ce chapitre repose sur un principe fondamental du web : séparer le contenu (HTML) de sa présentation (CSS).

## Pourquoi la présentation peut poser problème

Une mauvaise gestion de l’affichage peut entraîner :

- Du texte qui se superpose lors du zoom
- Des contenus coupés ou invisibles
- Des informations impossibles à lire avec des styles personnalisés
- Des éléments qui deviennent inutilisables sur petits écrans

Le RGAA impose donc que la mise en page reste robuste et adaptable.

## Principe fondamental : le contenu doit rester compréhensible sans mise en forme

L’information ne doit pas dépendre uniquement de la position, de la taille ou de l’apparence visuelle.

Par exemple, si l’on supprime le CSS, le contenu doit rester lisible et structuré.

### Exemple 1 : utiliser le CSS pour la présentation

#### Mauvaise pratique (présentation dans le HTML)

```
<p><font size="5">Actualités importantes</font></p>
```

##### Bonne pratique

```
<h2 class="titre-actualites">Actualités importantes</h2>
```

```
.titre-actualites {
  font-size: 2rem;
}
```

**Le HTML garde le sens, le CSS gère l’apparence.**

#### Exemple 2 : contenu compréhensible sans positionnement

Éviter de transmettre une information uniquement par la position visuelle.

##### Non conforme

```
<p>Voir les informations à droite.</p>
```

Cela devient incompréhensible si la mise en page change.

##### Conforme

```
<p>Voir les informations dans la section "Contact".</p>
```

L’information reste claire indépendamment de l’affichage.

#### Exemple 3 : adaptation au zoom

Le texte doit rester lisible lorsqu’on agrandit l’affichage jusqu’à 200 %.

##### Bonne pratique CSS

```
body {
  font-size: 1rem;
}

.container {
  width: 100%;
}
```

Utiliser des unités relatives permet une meilleure adaptation.

#### Exemple 4 : masquer un élément visuellement tout en le gardant accessible

Parfois, un texte utile pour les lecteurs d’écran n’est pas nécessaire visuellement.

```
<span class="visually-hidden">Champ obligatoire</span>
```

```
.visually-hidden {
  position: absolute;
  left: -9999px;
}
```

Dans ce cas, ARIA peut aussi être utilisé.

```
<input type="text" aria-required="true">
```

#### Exemple 5 : présentation contrôlée par ARIA (cas spécifiques)

ARIA peut compléter la présentation lorsqu’un élément change d’état visuel.

##### Onglet sélectionné

```
<button role="tab" aria-selected="true">
  Description
</button>
```

L’attribut `aria-selected` indique l’état actif, même si le style visuel change.

##### Bouton désactivé

```
<button aria-disabled="true">
  Envoyer
</button>
```

L’état est communiqué au-delà de l’apparence visuelle.

#### Exemple 6 : contenu qui s’adapte à différentes tailles d’écran

La mise en page doit rester fonctionnelle sur mobile, tablette et ordinateur.

```
.container {
  max-width: 1200px;
  margin: auto;
}
```

L’information ne doit pas disparaître si l’écran est réduit.

## Le rôle d’ARIA dans la présentation

ARIA ne sert pas à gérer l’apparence visuelle, mais à transmettre des informations qui peuvent être indiquées visuellement par le style.

Par exemple :

- `aria-selected` pour un onglet actif
- `aria-expanded` pour un bloc ouvert
- `aria-hidden` pour masquer un élément aux technologies d’assistance
- `aria-disabled` pour signaler un état inactif

Ces attributs permettent de compléter ce que l’utilisateur voit à l’écran.

## Les critères clés du RGAA pour la présentation

Le chapitre 10 vérifie notamment que :

- Le contenu reste lisible sans CSS
- Le texte peut être agrandi sans perte d’information
- Les éléments s’adaptent aux différentes tailles d’écran
- Les informations ne dépendent pas uniquement de la position visuelle
- Les espacements et tailles restent cohérents

Ces règles garantissent une meilleure adaptabilité.

## Erreurs fréquentes observées en audit

On retrouve souvent :

- Du contenu qui disparaît au zoom
- Des textes coupés dans des blocs fixes
- Des éléments positionnés de manière rigide
- Des informations liées uniquement à la mise en page
- Des états visibles non annoncés aux lecteurs d’écran

Ces problèmes peuvent rendre une interface difficile à utiliser.

## Impact concret pour les utilisateurs

Une personne malvoyante peut avoir besoin d’agrandir fortement le texte.  
Si la mise en page n’est pas adaptée :

- Le contenu peut se superposer
- Les boutons peuvent sortir de l’écran
- La lecture devient pénible

Une présentation souple améliore l’expérience pour tous.

## Conclusion

Le chapitre 10 du RGAA rappelle que la présentation ne doit jamais empêcher l’accès à l’information. Le contenu doit rester compréhensible, adaptable et lisible, quelles que soient les conditions d’affichage.

Le HTML porte le sens, le CSS gère l’apparence, et les attributs ARIA peuvent compléter certains états visuels pour les rendre accessibles. Cette séparation claire permet de créer des interfaces robustes, flexibles et inclusives.
