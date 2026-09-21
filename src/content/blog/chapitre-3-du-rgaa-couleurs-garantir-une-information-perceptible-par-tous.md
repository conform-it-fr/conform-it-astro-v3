---
title: "Chapitre 3 du RGAA : Couleurs – garantir une information perceptible par tous"
description: "Le chapitre 3 du RGAA est consacré à l’usage des couleurs dans les interfaces numériques. Il répond à un enjeu fondamental : s’assurer que l’information reste compréhensible, même…"
pubDate: 2026-02-09
featured: false
category: "Accessibilité RGAA"
image: "/images/articles/chapitre-3-du-rgaa-couleurs-garantir-une-information-perceptible-par-tous.webp"
imageAlt: "Illustration pour l'article relatif au chapitre 3 : Les couleurs"
hidden: true
---

## Introduction

Le chapitre 3 du RGAA est consacré à l’usage des couleurs dans les interfaces numériques. Il répond à un **enjeu fondamental** : s’assurer que l’information reste compréhensible, même pour les personnes qui ne perçoivent pas les couleurs de manière classique.

Les difficultés liées aux couleurs concernent notamment :

- Les personnes daltoniennes
- Les personnes malvoyantes
- Les utilisateurs en situation de fatigue visuelle
- Les usages en conditions dégradées (luminosité faible, écran de mauvaise qualité)

**Ce chapitre ne vise pas à limiter la créativité graphique, mais à éviter que la couleur devienne le seul moyen de comprendre une information.**

## Principe fondamental : la couleur ne doit jamais être la seule source d’information

C’est la règle centrale du chapitre.

Si une information est donnée uniquement par la couleur, certains utilisateurs ne pourront pas la percevoir.

Exemples problématiques :

- Les champs obligatoires affichés seulement en rouge
- Les liens différenciés uniquement par une couleur différente
- Les graphiques dont la lecture repose uniquement sur des codes couleur

Il faut toujours ajouter un autre indicateur visuel ou textuel.

### Exemple 1 : champ obligatoire dans un formulaire

#### Non conforme

```
<label style="color:red;">Nom</label>  
<input type="text">
```

Ici, seul le rouge indique que le champ est obligatoire.

#### Conforme

```
<label for="nom">Nom   
   <span aria-hidden="true">*</span>  
</label>  
<input id="nom" type="text" required aria-required="true">
```

Améliorations :

- L’astérisque complète l’information visuelle
- L’attribut `required` est natif
- `aria-required="true"` renforce l’information pour les technologies d’assistance

#### Exemple 2 : message d’erreur signalé uniquement par la couleur

#### Non conforme

```
<p style="color:red;">Mot de passe incorrect</p>
```

Si l’utilisateur ne perçoit pas le rouge, il peut ne pas comprendre qu’il s’agit d’une erreur.

#### Conforme

```
<p role="alert"> Erreur : le mot de passe saisi est incorrect </p>
```

Améliorations :

- Le mot « Erreur » explicite le message
- `role="alert"` permet au lecteur d’écran d’annoncer immédiatement l’information

## Les contrastes de couleurs : un critère essentiel

Le RGAA impose un contraste suffisant entre :

- Le texte et l’arrière-plan
- Les éléments interactifs et leur environnement

Un contraste trop faible rend la lecture difficile, voire impossible.

### Exemple : texte peu lisible (non conforme)

```
<p style="color:#aaa; background:#fff;"> Texte informatif </p>
```

Gris clair sur fond blanc : difficile à lire.

#### Exemple amélioré

```
<p style="color:#333; background:#fff;"> Texte informatif </p>
```

Le texte devient nettement plus lisible.

#### Exemple 3 : lien identifiable uniquement par la couleur

#### Non conforme

```
<p> Consultez notre <span style="color:blue;">guide pratique</span> </p>
```

Sans soulignement, un utilisateur peut ne pas identifier le lien.

#### Conforme

```
<p> Consultez notre <a href="/guide">guide pratique</a> </p>
```

Le lien est reconnaissable grâce à :

- Le soulignement
- Le comportement interactif
- Le rôle sémantique du lien

Pas besoin d’ARIA ici : le HTML fait le travail.

#### Exemple 4 : graphique basé uniquement sur des couleurs

Un graphique avec des segments rouges et verts peut être difficile à comprendre pour un daltonien.

##### Amélioration possible :

- Ajouter des motifs
- Ajouter des étiquettes textuelles
- Fournir une légende explicite

```
<img src="graphique-ventes.png" 
   alt="Graphique : les ventes augmentent de 20 % au premier trimestre" 
   aria-describedby="legende-graph"> 
<p id="legende-graph"> Les barres pleines représentent 2023, 
les barres hachurées représentent 2024. </p>
```

Ici, l’information ne repose plus uniquement sur la couleur.

#### Exemple 5 : état d’un élément indiqué par la couleur

Imaginons un statut affiché en vert pour « actif » et rouge pour « inactif ».

##### Version améliorée

```
<p> Statut : <span aria-label="Compte actif">🟢 Actif</span> </p>
```

Ou :

```
<p> Statut : <strong>Actif</strong> </p>
```

Le texte donne l’information principale, la couleur devient un complément.

## Le rôle d’ARIA dans la gestion des couleurs

ARIA ne sert pas à gérer les couleurs elles-mêmes, mais à compléter l’information quand la perception visuelle peut poser problème.

Cas utiles :

- `aria-required="true"` pour indiquer un champ obligatoire
- `role="alert"` pour signaler un message important
- `aria-describedby` pour relier une explication à un élément visuel

ARIA intervient donc en renfort du contenu textuel, pas en remplacement.

## Erreurs fréquentes observées en audit

On retrouve souvent :

- Des indications uniquement en rouge/vert
- Des contrastes trop faibles
- Des liens non soulignés
- Des états d’interface signalés seulement par une couleur
- Des graphiques incompréhensibles sans perception des couleurs

Ces problèmes peuvent sembler mineurs, mais ils créent de véritables barrières d’accès.

## Impact concret pour les utilisateurs

Un utilisateur daltonien peut :

- Ne pas distinguer un bouton actif d’un bouton inactif
- Ne pas voir un message d’erreur
- Confondre des données dans un graphique

L’ajout d’indices textuels ou visuels complémentaires améliore immédiatement la compréhension.

## Conclusion

Le chapitre 3 du RGAA rappelle une règle simple mais essentielle : la couleur ne doit jamais être le seul moyen de transmettre une information. Les contrastes doivent être suffisants et chaque information importante doit exister sous une forme alternative, notamment textuelle.

Les attributs ARIA peuvent compléter certains cas, en particulier dans les formulaires ou les messages dynamiques, mais l’essentiel repose sur une conception visuelle claire, lisible et inclusive dès le départ.
