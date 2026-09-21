---
title: "Chapitre 13 du RGAA : Consultation – garantir un accès universel aux contenus et aux fonctionnalités"
description: "Le chapitre 13 du RGAA, consacré à la consultation, aborde les conditions globales d’accès aux contenus numériques. Il ne concerne pas un type d’élément précis comme les images ou…"
pubDate: 2026-02-09
featured: false
category: "Accessibilité RGAA"
image: "/images/articles/chapitre-13-du-rgaa-consultation-garantir-un-acces-universel-aux-contenus-et-aux-fonctionnalites.webp"
imageAlt: "Illustration pour l'article relatif au chapitre 13 : Consultation"
hidden: true
---

## Introduction

Le chapitre 13 du RGAA, consacré à la consultation, aborde les conditions globales d’accès aux contenus numériques. Il ne concerne pas un type d’élément précis comme les images ou les formulaires, mais l’**expérience d’utilisation dans son ensemble** : compatibilité avec les technologies d’assistance, adaptation aux environnements de consultation, gestion du clavier, du focus et des paramètres utilisateurs.

Ce chapitre s’intéresse donc à la **capacité d’un service numérique à être consulté par tous, quels que soient les outils utilisés** : lecteur d’écran, navigation clavier, zoom, personnalisation de l’affichage ou environnement technique spécifique.

## Les enjeux de la consultation accessible

Un site peut être techniquement conforme sur de nombreux points, mais rester difficile à utiliser si l’expérience globale pose problème.

Le chapitre 13 vise notamment à garantir que :

- Le contenu reste accessible au clavier
- Le focus est visible et correctement géré
- Les technologies d’assistance peuvent interagir avec l’interface
- Les contenus ne provoquent pas de gêne ou de blocage
- L’utilisateur garde le contrôle de la consultation

Il s’agit d’un chapitre transversal, qui touche à l’usage réel du site.

### Exemple 1 : navigation complète au clavier

Tous les éléments interactifs doivent être accessibles avec la touche Tab.

#### Bon exemple avec un bouton natif

```
<button>Valider</button>
```

Ce bouton est automatiquement accessible au clavier.

##### Cas d’un élément personnalisé

```
<div 
  role="button"
  tabindex="0"
  onkeydown="if(event.key==='Enter'){valider();}">
  Valider
</div>
```

Ici :

- `tabindex="0"` permet d’atteindre l’élément au clavier
- `role="button"` indique sa fonction
- Le script permet de l’activer avec Entrée

Mais la meilleure solution reste toujours d’utiliser `<button>`.

#### Exemple 2 : visibilité du focus

Le focus clavier doit être clairement visible.

```
button:focus {
  outline: 3px solid black;
}
```

Sans indicateur visuel, un utilisateur clavier ne sait pas où il se trouve.

#### Exemple 3 : gestion du focus après une action

Quand un contenu s’ouvre (ex : modale), le focus doit être déplacé vers cette zone.

```
<div 
  role="dialog"
  aria-labelledby="titre-modal"
  tabindex="-1"
  id="modal">
  
  <h2 id="titre-modal">Confirmation</h2>
  <p>Votre action a été enregistrée.</p>
</div>
```

Puis, en script :

```
document.getElementById('modal').focus();
```

Cela permet au lecteur d’écran de lire directement le contenu.

#### Exemple 4 : éviter les pièges clavier

Un utilisateur doit pouvoir entrer et sortir facilement d’un composant.

Dans une modale, il faut s’assurer que :

- Le focus reste dans la fenêtre tant qu’elle est ouverte
- Il revient à l’élément d’origine à la fermeture

ARIA peut compléter l’information :

```
<div role="dialog" aria-modal="true">
```

#### Exemple 5 : contrôle des contenus en mouvement

Les animations ou défilements automatiques doivent pouvoir être arrêtés.

```
<button aria-controls="carrousel" aria-label="Mettre en pause le carrousel">
  Pause
</button>
```

Cela permet à l’utilisateur de reprendre le contrôle.

#### Exemple 6 : compatibilité avec les technologies d’assistance

Un contenu dynamique important doit être annoncé.

```
<div aria-live="polite">
  Nouveau message reçu
</div>
```

Le lecteur d’écran signalera l’information sans recharger la page.

#### Exemple 7 : éviter les contenus bloquants

Certains éléments peuvent gêner la consultation :

- Sons automatiques
- Pop-ups inattendus
- Changements de contexte sans action utilisateur

ARIA peut aider à mieux contrôler ces comportements :

```
<div aria-hidden="true">
  Animation décorative
</div>
```

Cela empêche une lecture inutile par un lecteur d’écran.

## Le rôle d’ARIA dans la consultation

ARIA joue un rôle important pour rendre l’interface compréhensible et utilisable :

- `role="dialog"` pour signaler une fenêtre active
- `aria-modal="true"` pour indiquer un contexte bloquant
- `aria-live` pour annoncer des changements
- `tabindex="0"` pour rendre un élément atteignable
- `aria-hidden="true"` pour masquer des éléments non utiles

Ces attributs améliorent l’interaction globale.

## Les critères clés du RGAA pour la consultation

Le chapitre 13 vérifie notamment que :

- Tous les contenus sont accessibles au clavier
- Le focus est visible et logique
- Les actions ne déclenchent pas de changements inattendus
- Les animations sont contrôlables
- Les technologies d’assistance peuvent lire les contenus

Ce sont des éléments essentiels pour une consultation confortable.

## Erreurs fréquentes observées en audit

On retrouve souvent :

- Des composants impossibles à atteindre au clavier
- Des focus invisibles
- Des modales mal gérées
- Des contenus qui changent sans prévenir
- Des animations impossibles à arrêter

Ces situations peuvent rendre un site inutilisable pour certains utilisateurs.

## Impact concret pour les utilisateurs

Une personne naviguant uniquement au clavier doit pouvoir :

- Atteindre tous les éléments
- Comprendre où elle se trouve
- Contrôler les interactions

Un utilisateur de lecteur d’écran doit être informé des changements importants sans confusion.

Une bonne gestion de la consultation améliore la fluidité et le confort d’utilisation.

## Conclusion

Le chapitre 13 du RGAA adopte une vision globale de l’accessibilité en s’intéressant à l’expérience réelle de consultation. Il garantit que les contenus restent accessibles dans différents contextes d’usage, avec différents outils et modes de navigation.

Le HTML constitue la base, et les attributs ARIA viennent renforcer la gestion du focus, des interactions et des changements dynamiques. Ensemble, ils permettent de créer des interfaces réellement utilisables, stables et confortables pour tous les utilisateurs.
