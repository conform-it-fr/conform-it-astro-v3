---
title: "Chapitre 1 du RGAA : rendre les images accessibles à tous"
description: "Le premier chapitre du RGAA est consacré aux images. Ce positionnement n’est pas anodin : les images sont omniprésentes sur le web et constituent souvent un point de blocage…"
pubDate: 2026-02-09
featured: false
category: "Accessibilité RGAA"
image: "/images/articles/chapitre-1-du-rgaa-rendre-les-images-accessibles-a-tous.webp"
imageAlt: "Illustration de l'article relatif au chapitre 1 du RGAA : rendre les images accessibles à tous"
hidden: true
---

## Introduction

Le premier chapitre du RGAA est consacré aux images. Ce positionnement n’est pas anodin : les images sont omniprésentes sur le web et constituent souvent un point de blocage majeur pour les personnes utilisant des technologies d’assistance, notamment les lecteurs d’écran.

L’objectif de ce chapitre est simple : s’assurer que toute information transmise par une image soit également accessible sous une forme alternative.

## Pourquoi l’accessibilité des images est essentielle

Une image peut servir à illustrer, informer, expliquer ou guider la navigation. Mais pour une personne non voyante ou malvoyante, une image seule ne transmet aucune information si elle n’est pas correctement décrite.

Le chapitre 1 du RGAA vise donc à garantir que :

- Les images informatives soient compréhensibles sans perception visuelle
- Les images décoratives ne perturbent pas la navigation
- Les contenus complexes soient expliqués de manière adaptée

Il s’agit de restituer l’intention de l’image, pas simplement son apparence.

## Les différents types d’images

Le RGAA distingue plusieurs catégories d’images, car toutes ne doivent pas être traitées de la même manière.

### Les images informatives

Une image est dite informative lorsqu’elle apporte un contenu utile à la compréhension.

Exemples :

- Photo illustrant un article
- Icône accompagnant un bouton
- Schéma explicatif
- Image contenant du texte

Dans ce cas, une **alternative textuelle pertinente est obligatoire**. Elle doit transmettre l’information essentielle portée par l’image.

Exemple : Une image qui apporte une information utile doit avoir un texte alternatif pertinent.

```
<img src="reunion-equipe.jpg" 
alt="Réunion d’équipe autour d’une table avec des ordinateurs portables">
```

Exemple : Si l’image déclenche une action, l’alternative doit décrire la fonction, pas l’apparence.

```
<button type="submit" aria-label="Rechercher">
  <img src="icone-recherche.svg" alt="">
</button>
```

#### Les images décoratives

Certaines images ne servent qu’à l’habillage visuel : motifs, arrière-plans, illustrations sans valeur informative.

Dans ce cas, elles doivent être **ignorées par les technologies d’assistance** afin de ne pas alourdir la lecture. Cela implique généralement une **alternative vide**.

Exemple : Une image purement visuelle doit être ignorée par les technologies d’assistance.

```
<img src="decoration.svg" alt="" aria-hidden="true">
```

Exemple : Quand une icône est utilisée seule, il faut donner un nom accessible.

```
<button aria-label="Fermer">
  <svg aria-hidden="true">
    ...
  </svg>
</button>
```

#### Les images porteuses d’information complexe

Certaines images contiennent beaucoup de données :

- Graphiques
- Diagrammes
- Cartes
- Infographies

Une simple alternative courte ne suffit pas. Il faut alors proposer une description détaillée, soit à proximité de l’image, soit via un contenu associé.

Exemple : Une description courte dans `alt`, et une description longue ailleurs.

```
<img 
  src="graphique-ventes.png"
  alt="Graphique montrant une hausse des ventes en 2024"
  aria-describedby="desc-graphique">

<p id="desc-graphique">
  Les ventes augmentent régulièrement de janvier à juin,
  avec un pic en mai.
</p>
```

Exemple : Le texte dans l’image doit être restitué dans l’alternative.

```
<img src="promo.png" 
alt="Promotion : -30 % sur tout le site jusqu’à dimanche">
```

Exemple : L’alternative doit décrire la destination.

```
<a href="/contact" aria-label="Contacter le service client">
  <img src="icone-mail.svg" alt="">
</a>
```

Exemple : Utilisation de `role="img"` avec ARIA.

```
<div role="img" aria-label="Suite de logos des partenaires du projet">
  <img src="logo1.png" alt="">
  <img src="logo2.png" alt="">
  <img src="logo3.png" alt="">
</div>
```

Exemple : Informer les lecteurs d’écran d’un changement.

```
<div aria-live="polite">
  <img src="meteo-soleil.png" alt="Météo : ensoleillé">
</div>
```

## Règle fondamentale RGAA à retenir

Ordre de priorité :

1. HTML sémantique correct
2. Attribut `alt` pertinent
3. ARIA seulement si nécessaire

À éviter : Mauvaise pratique si un simple `img alt=""` suffit.

```
<div role="img" aria-label="Image décorative">
```

## Les critères principaux du chapitre Images

Le chapitre 1 s’articule autour de plusieurs exigences fondamentales, chacune vérifiée par des tests précis lors d’un audit.

Parmi les points majeurs :

- Chaque image informative doit posséder une alternative textuelle
- L’alternative doit être pertinente et utile
- Les images décoratives doivent être correctement ignorées
- Les images contenant du texte doivent être compréhensibles sans l’image
- Les images complexes doivent proposer une description détaillée

Ces critères visent à garantir l’équivalence d’accès à l’information.

## La notion d’alternative textuelle pertinente

Le point central de ce chapitre est la qualité de l’alternative textuelle. Une description n’est pas seulement une formalité technique : elle doit être pensée pour l’utilisateur.

Une bonne alternative :

- Va à l’essentiel
- Décrit la fonction de l’image
- S’adapte au contexte

Par exemple, pour une icône de loupe servant à lancer une recherche, l’alternative pertinente n’est pas « loupe », mais « Rechercher ».

## Les images de texte : un cas particulier

Le RGAA attire une attention particulière sur les images contenant du texte.

Lorsque le texte est intégré dans une image :

- Il doit rester lisible
- Une alternative doit reprendre fidèlement le contenu
- Il est préférable d’éviter cette pratique lorsque le texte peut être affiché en HTML

Le texte sous forme d’image est souvent moins adaptable (zoom, contraste, personnalisation), ce qui peut nuire à l’accessibilité.

## Les tests réalisés lors d’un audit

Pour vérifier la conformité, les auditeurs appliquent plusieurs types de contrôles :

- Vérification de la présence d’attributs alternatifs
- Évaluation de la pertinence des descriptions
- Identification des images décoratives mal gérées
- Contrôle des images complexes et de leurs descriptions associées

Ces tests sont réalisés sur un échantillon représentatif de pages.

## Les erreurs fréquentes

Certaines pratiques reviennent souvent dans les non-conformités :

- Alternatives absentes ou génériques (« image », « photo », « icône »)
- Descriptions trop longues ou trop vagues
- Images décoratives inutilement annoncées
- Images de texte non retranscrites

Ces erreurs peuvent sembler mineures, mais elles dégradent fortement l’expérience des utilisateurs de lecteurs d’écran.

## Un enjeu pour plusieurs métiers

L’accessibilité des images ne concerne pas uniquement les développeurs.

Elle implique :

- Les rédacteurs, qui définissent le sens des visuels
- Les designers, qui choisissent d’utiliser ou non des images de texte
- Les intégrateurs, qui implémentent les alternatives
- Les chefs de projet, qui cadrent les bonnes pratiques

C’est un travail collectif qui commence dès la conception.

## Conclusion

Le chapitre 1 du RGAA pose une base essentielle : toute information portée par une image doit être accessible autrement. À travers des critères précis et des tests concrets, il encadre la manière de décrire, structurer et utiliser les images dans un service numérique.

Bien appliqué, ce chapitre améliore significativement l’accès à l’information pour les personnes utilisant des technologies d’assistance, tout en contribuant à une meilleure qualité globale des contenus.
