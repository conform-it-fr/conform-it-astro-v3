---
title: "Chapitre 6 du RGAA : Liens – rendre la navigation compréhensible et explicite"
description: "Le chapitre 6 du RGAA est consacré aux liens, éléments fondamentaux de la navigation web. Ils permettent de se déplacer entre les pages, d’accéder à des documents, de déclencher…"
pubDate: 2026-02-09
featured: false
category: "Accessibilité RGAA"
image: "/images/articles/chapitre-6-du-rgaa-liens-rendre-la-navigation-comprehensible-et-explicite.webp"
imageAlt: "Illustration de l'article relatif au chapitre 6 : Liens"
hidden: true
---

## Introduction

Le chapitre 6 du RGAA est consacré aux liens, éléments fondamentaux de la navigation web. Ils permettent de se déplacer entre les pages, d’accéder à des documents, de déclencher des actions ou d’ouvrir des contenus externes.

Pour les utilisateurs de lecteurs d’écran, les liens sont souvent **parcourus indépendamment du reste du contenu**. Il est donc essentiel qu’ils soient compréhensibles, explicites et correctement identifiés.

L’objectif de ce chapitre est simple : permettre à chaque utilisateur de savoir où mène un lien, sans avoir besoin de lire tout le contexte autour.

## Principe fondamental : un lien doit être explicite

Un bon lien doit décrire clairement sa destination ou son action.

Exemple conforme :

```
<a href="/contact">Contacter le service client</a>
```

Exemple non conforme :

```
<a href="/contact">Cliquez ici</a>
```

Dans le second cas, si le lien est lu seul par un lecteur d’écran, l’utilisateur ne sait pas à quoi il correspond.

### Exemple 1 : lien avec texte explicite

```
<a href="/tarifs">Consulter les tarifs 2024</a>
```

Ce type de formulation permet une compréhension immédiate.

#### Exemple 2 : plusieurs liens identiques sur une page

Si plusieurs liens ont le même texte, ils doivent mener vers la même destination ou être différenciés.

##### Non conforme

```
<a href="/produit1">En savoir plus</a>
<a href="/produit2">En savoir plus</a>
```

##### Conforme avec précision contextuelle

```
<a href="/produit1">En savoir plus sur le produit Alpha</a>
<a href="/produit2">En savoir plus sur le produit Beta</a>
```

Chaque lien devient compréhensible indépendamment.

#### Exemple 3 : lien sur une image

Si une image est utilisée comme lien, son alternative doit décrire la destination.

```
<a href="/accueil">
  <img src="logo.png" alt="Retour à l’accueil">
</a>
```

L’attribut `alt` remplace le texte du lien.

#### Exemple 4 : lien ouvrant une nouvelle fenêtre

L’ouverture d’une nouvelle fenêtre doit être signalée.

```
<a 
  href="https://exemple.com" 
  target="_blank"
  aria-label="Consulter le site partenaire (ouvre dans une nouvelle fenêtre)">
  Site partenaire
</a>
```

`aria-label` permet d’ajouter une information que l’on ne souhaite pas forcément afficher visuellement.

#### Exemple 5 : lien vers un document téléchargeable

Il est important d’indiquer le type de fichier et éventuellement sa taille.

```
<a href="/guide.pdf">
  Télécharger le guide d’accessibilité (PDF)
</a>
```

Ou avec précision supplémentaire :

```
<a 
  href="/guide.pdf"
  aria-label="Télécharger le guide d’accessibilité au format PDF, 2 mégaoctets">
  Guide d’accessibilité (PDF)
</a>
```

#### Exemple 6 : lien stylisé sans balise `<a>` (à éviter)

Certaines interfaces utilisent des éléments cliquables qui ne sont pas de vrais liens.

##### Non conforme

```
<span onclick="location.href='/contact'">
  Contact
</span>
```

Ce n’est pas reconnu comme un lien par les technologies d’assistance.

##### Correction avec ARIA (solution de secours)

```
<span 
  role="link" 
  tabindex="0"
  onclick="location.href='/contact'">
  Contact
</span>
```

Cependant, la meilleure solution reste :

```
<a href="/contact">Contact</a>
```

Le HTML natif est toujours préférable.

#### Exemple 7 : lien interne pour naviguer dans la page

Les liens d’ancrage facilitent la navigation rapide.

```
<a href="#contenu">Aller au contenu principal</a>

<main id="contenu">
  ...
</main>
```

Ces liens sont particulièrement utiles pour les utilisateurs naviguant au clavier.

## Le rôle d’ARIA pour les liens

ARIA peut être utile dans certains cas spécifiques :

### Ajouter une précision contextuelle

```
<a 
  href="/compte"
  aria-describedby="info-compte">
  Mon compte
</a>

<span id="info-compte">
  Accès sécurisé nécessitant une authentification
</span>
```

#### Nommer un lien sans texte visible

```
<a href="/recherche" aria-label="Lancer la recherche">
  🔍
</a>
```

Ici, l’icône seule ne suffit pas, `aria-label` donne un sens clair.

## Les critères clés du RGAA pour les liens

Le chapitre 6 vérifie notamment que :

- Le texte du lien est explicite
- Un lien est identifiable visuellement
- La destination est compréhensible hors contexte
- Les images-liens ont une alternative pertinente
- Les liens ont un intitulé cohérent avec la page cible

Ces éléments améliorent fortement la navigation.

## Erreurs fréquentes observées en audit

On retrouve souvent :

- Des « cliquez ici » ou « lire la suite » trop génériques
- Des icônes cliquables sans nom accessible
- Des liens identiques menant vers des pages différentes
- Des faux liens créés avec du JavaScript
- Des ouvertures de nouvelles fenêtres non signalées

Ces problèmes compliquent la compréhension globale de la navigation.

## Impact concret pour les utilisateurs

Un lecteur d’écran peut afficher la liste de tous les liens d’une page. Si ceux-ci sont mal nommés, l’utilisateur entendra par exemple :

- « Cliquez ici »
- « Lire la suite »
- « En savoir plus »

Sans contexte, ces informations sont inutiles.

Avec des liens explicites, la navigation devient beaucoup plus efficace et autonome.

## Conclusion

Le chapitre 6 du RGAA rappelle qu’un lien n’est pas seulement un élément cliquable : c’est un repère de navigation. Son intitulé doit permettre de comprendre clairement sa destination ou sa fonction, même isolé du reste du contenu.

Le HTML natif fournit déjà la plupart des mécanismes nécessaires. Les attributs ARIA interviennent en complément, notamment pour nommer des liens iconographiques ou apporter des précisions contextuelles. Une bonne gestion des liens améliore directement la qualité de navigation pour tous les utilisateurs, en particulier ceux utilisant des technologies d’assistance.
