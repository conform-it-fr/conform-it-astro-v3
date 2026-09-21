---
title: "Chapitre 11 du RGAA : Formulaires – rendre la saisie accessible et compréhensible"
description: "Le chapitre 11 du RGAA est consacré aux formulaires, éléments centraux de nombreux services numériques : création de compte, démarches administratives, recherches, paiements,…"
pubDate: 2026-02-09
featured: false
category: "Accessibilité RGAA"
image: "/images/articles/chapitre-11-du-rgaa-formulaires-rendre-la-saisie-accessible-et-comprehensible.webp"
imageAlt: "Illustration pour l'article relatif au chapitre 11: Tableaux"
hidden: true
---

## Introduction

Le chapitre 11 du RGAA est consacré aux formulaires, éléments centraux de nombreux services numériques : création de compte, démarches administratives, recherches, paiements, demandes de contact, etc.

Les formulaires représentent souvent un **point critique en accessibilité.** Une mauvaise conception peut empêcher un utilisateur de comprendre les champs à remplir, de corriger ses erreurs ou même de finaliser une action.

L’objectif de ce chapitre est de garantir que chaque utilisateur puisse identifier les champs, comprendre ce qui est attendu et recevoir un retour clair lors de la saisie.

## Les enjeux d’accessibilité des formulaires

Un formulaire accessible doit permettre :

- D’identifier clairement chaque champ
- De comprendre quelles informations sont attendues
- De repérer les champs obligatoires
- De recevoir des messages d’erreur explicites
- De naviguer facilement au clavier

Les technologies d’assistance s’appuient fortement sur la structure HTML et sur certains attributs ARIA pour restituer ces informations.

## Principe fondamental : chaque champ doit avoir une étiquette

L’étiquette (label) est l’élément qui décrit le rôle du champ.

### Exemple conforme

```
<label for="email">Adresse email</label>
<input type="email" id="email" name="email">
```

Le lecteur d’écran annoncera :  
« Adresse email, champ de saisie ».

#### Exemple non conforme

```
<input type="email" placeholder="Adresse email">
```

Le placeholder ne remplace pas un label. Il disparaît dès que l’utilisateur commence à écrire.

#### Exemple 2 : champ obligatoire

Un champ requis doit être clairement identifié.

```
<label for="nom">
  Nom <span aria-hidden="true">*</span>
</label>
<input 
  type="text" 
  id="nom" 
  name="nom" 
  required 
  aria-required="true">
```

Bonnes pratiques :

- `required` pour le navigateur
- `aria-required="true"` pour les technologies d’assistance
- L’astérisque visible complète l’information

#### Exemple 3 : aide à la saisie

On peut associer une instruction à un champ.

```
<label for="mdp">Mot de passe</label>
<input 
  type="password" 
  id="mdp" 
  aria-describedby="aide-mdp">

<p id="aide-mdp">
  Le mot de passe doit contenir au moins 8 caractères.
</p>
```

`aria-describedby` permet au lecteur d’écran de lire l’aide automatiquement.

#### Exemple 4 : message d’erreur lié à un champ

Lorsqu’une erreur apparaît, elle doit être compréhensible et associée au bon champ.

```
<label for="email">Adresse email</label>
<input 
  type="email" 
  id="email" 
  aria-describedby="erreur-email">

<p id="erreur-email" role="alert">
  L’adresse email saisie n’est pas valide.
</p>
```

`role="alert"` annonce immédiatement l’erreur.

#### Exemple 5 : groupe de champs liés

Pour des choix multiples, il faut regrouper les éléments.

```
<fieldset>
  <legend>Mode de contact préféré</legend>

  <label>
    <input type="radio" name="contact" value="email">
    Email
  </label>

  <label>
    <input type="radio" name="contact" value="telephone">
    Téléphone
  </label>
</fieldset>
```

Le `<legend>` donne un contexte au groupe.

#### Exemple 6 : champ avec icône seule

Si un bouton n’a pas de texte visible, il doit être nommé.

```
<button aria-label="Lancer la recherche">
  🔍
</button>
```

ARIA donne un nom accessible.

#### Exemple 7 : état invalide d’un champ

ARIA peut signaler qu’un champ contient une erreur.

```
<label for="code">Code postal</label>
<input 
  type="text" 
  id="code"
  aria-invalid="true">
```

Le lecteur d’écran annonce que la valeur est incorrecte.

#### Exemple 8 : désactiver temporairement un champ

```
<input 
  type="text" 
  aria-disabled="true">
```

Cela indique que le champ n’est pas utilisable, même si l’apparence le suggère déjà.

## Le rôle d’ARIA dans les formulaires

ARIA complète le HTML pour améliorer la compréhension :

- `aria-required="true"` : champ obligatoire
- `aria-describedby` : aide ou message associé
- `aria-invalid="true"` : erreur détectée
- `role="alert"` : annonce immédiate d’un message
- `aria-label` : nom accessible sans texte visible

Mais le HTML natif reste la base indispensable.

## Les critères clés du RGAA pour les formulaires

Le chapitre 11 vérifie notamment que :

- Chaque champ possède un label
- Les champs obligatoires sont identifiés
- Les messages d’erreur sont clairs
- Les aides à la saisie sont accessibles
- Les groupes de champs sont structurés

Ces éléments rendent l’interaction plus simple et plus fiable.

## Erreurs fréquentes observées en audit

On retrouve souvent :

- Des champs sans étiquette
- Des instructions uniquement en placeholder
- Des erreurs non associées aux champs
- Des formulaires difficiles à utiliser au clavier
- Des messages affichés mais non annoncés

Ces problèmes peuvent bloquer complètement un utilisateur.

## Impact concret pour les utilisateurs

Une personne utilisant un lecteur d’écran peut ne pas savoir :

- Quel champ elle remplit
- Ce qui est attendu
- Où se trouve l’erreur
- Comment corriger la saisie

Une bonne structuration transforme l’expérience : le formulaire devient clair, guidé et compréhensible.

## Conclusion

Le chapitre 11 du RGAA encadre la conception de formulaires accessibles, en insistant sur la clarté des étiquettes, la gestion des erreurs et l’accompagnement de l’utilisateur lors de la saisie.

Les balises HTML structurent les champs et les groupes, tandis que les attributs ARIA viennent enrichir les informations transmises aux technologies d’assistance. Ensemble, ils permettent de créer des formulaires inclusifs, compréhensibles et utilisables par tous.
