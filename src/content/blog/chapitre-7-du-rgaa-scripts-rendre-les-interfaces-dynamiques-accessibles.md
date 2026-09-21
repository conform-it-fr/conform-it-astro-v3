---
title: "Chapitre 7 du RGAA : Scripts – rendre les interfaces dynamiques accessibles"
description: "Le chapitre 7 du RGAA traite des scripts, c’est-à-dire de tous les contenus et fonctionnalités générés ou modifiés par JavaScript. Aujourd’hui, une grande partie des interfaces…"
pubDate: 2026-02-09
featured: false
category: "Accessibilité RGAA"
image: "/images/articles/chapitre-7-du-rgaa-scripts-rendre-les-interfaces-dynamiques-accessibles.webp"
imageAlt: "Illustration pour l'article relatif au chapitre 7 : Scripts"
hidden: true
---

## Introduction

Le chapitre 7 du RGAA traite des scripts, c’est-à-dire de tous les contenus et fonctionnalités générés ou modifiés par JavaScript. Aujourd’hui, une grande partie des interfaces web modernes repose sur des composants dynamiques : menus déroulants, modales, carrousels, accordéons, onglets, formulaires interactifs, etc.

Ces éléments peuvent poser des problèmes d’accessibilité s’ils ne sont pas correctement conçus, car ils modifient le contenu sans rechargement de page. L’objectif de ce chapitre est de s’assurer que ces **interactions restent compréhensibles, utilisables au clavier et compatibles avec les technologies d’assistance**.

## Les enjeux des scripts pour l’accessibilité

Contrairement au HTML statique, les scripts peuvent :

- Ajouter du contenu dynamiquement
- Modifier des états visuels
- Afficher ou masquer des éléments
- Créer des composants entièrement personnalisés

Sans indications adaptées, un lecteur d’écran peut ne pas détecter ces changements, et un utilisateur clavier peut ne pas pouvoir interagir correctement.

## Principe fondamental : une fonctionnalité scriptée doit rester accessible

Le RGAA impose notamment que :

- Tous les composants soient utilisables au clavier
- Les changements dynamiques soient signalés
- Les rôles et états soient correctement exposés
- Les composants personnalisés aient un équivalent sémantique

**ARIA joue ici un rôle central pour compléter le HTML.**

### Exemple 1 : menu déroulant (aria-expanded)

Un menu qui s’ouvre et se ferme doit annoncer son état.

```
<button 
  aria-expanded="false" 
  aria-controls="menu1"
  onclick="toggleMenu()">
  Menu
</button>

<ul id="menu1" hidden>
  <li><a href="/profil">Profil</a></li>
  <li><a href="/deconnexion">Déconnexion</a></li>
</ul>
```

Lors de l’ouverture, le script doit modifier l’état :

```
function toggleMenu() {
  const button = document.querySelector('button');
  const menu = document.getElementById('menu1');
  const isOpen = button.getAttribute('aria-expanded') === 'true';

  button.setAttribute('aria-expanded', !isOpen);
  menu.hidden = isOpen;
}
```

Cela permet au lecteur d’écran d’annoncer « développé » ou « réduit ».

#### Exemple 2 : fenêtre modale (role="dialog")

Une modale doit être identifiée comme telle.

```
<div 
  role="dialog" 
  aria-labelledby="titre-modal"
  aria-modal="true">
  
  <h2 id="titre-modal">Confirmation</h2>
  <p>Voulez-vous supprimer cet élément ?</p>
  <button>Oui</button>
  <button>Non</button>
</div>
```

ARIA permet d’indiquer :

- Le type de composant (`role="dialog"`)
- Le titre associé (`aria-labelledby`)
- Le contexte modal (`aria-modal="true"`)

#### Exemple 3 : contenu mis à jour dynamiquement (aria-live)

Si un script modifie une information importante, elle doit être annoncée.

```
<p aria-live="polite" id="resultat"></p>
```

Quand le contenu change :

```
document.getElementById('resultat').textContent =
  "Votre message a été envoyé";
```

Le lecteur d’écran annonce automatiquement la mise à jour.

#### Exemple 4 : onglets dynamiques (role="tab")

```
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel1">
    Description
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel2">
    Avis
  </button>
</div>

<div id="panel1" role="tabpanel">
  Contenu de la description
</div>

<div id="panel2" role="tabpanel" hidden>
  Contenu des avis
</div>
```

Le script doit mettre à jour `aria-selected` lors du changement d’onglet.

#### Exemple 5 : bouton personnalisé créé en div (solution de secours)

Si un composant n’utilise pas `<button>`, il faut recréer son accessibilité.

```
<div 
  role="button" 
  tabindex="0"
  onclick="valider()"
  onkeydown="if(event.key==='Enter'){valider();}">
  Valider
</div>
```

Mais la meilleure solution reste :

```
<button onclick="valider()">Valider</button>
```

Le HTML natif est toujours préférable.

#### Exemple 6 : indicateur de chargement (aria-busy)

```
<div aria-busy="true" id="zone">
  Chargement en cours...
</div>
```

Une fois le contenu chargé :

```
document.getElementById('zone').setAttribute('aria-busy', 'false');
```

Cela informe que la mise à jour est terminée.

## Les critères clés du RGAA pour les scripts

Le chapitre 7 vérifie notamment que :

- Les fonctionnalités sont accessibles au clavier
- Les événements ne reposent pas uniquement sur la souris
- Les changements dynamiques sont annoncés
- Les états des composants sont exposés
- Les technologies d’assistance peuvent comprendre les interactions

ARIA est souvent nécessaire pour répondre à ces exigences.

## Erreurs fréquentes observées en audit

On retrouve souvent :

- Menus qui s’ouvrent sans indication d’état
- Contenus dynamiques non annoncés
- Boutons créés en div non accessibles au clavier
- Focus perdu lors d’une action
- Modales impossibles à fermer au clavier

Ces problèmes rendent l’interface difficile, voire inutilisable.

## Impact concret pour les utilisateurs

Sans gestion correcte des scripts :

- Un lecteur d’écran ne sait pas qu’un contenu a changé
- Un utilisateur clavier peut rester bloqué
- Un composant peut sembler « invisible » malgré sa présence à l’écran

ARIA permet de rendre ces interactions compréhensibles et prévisibles.

## Conclusion

Le chapitre 7 du RGAA encadre l’accessibilité des interfaces dynamiques pilotées par JavaScript. Il impose que toute interaction reste utilisable au clavier, compréhensible par les technologies d’assistance et clairement annoncée lorsqu’un changement survient.

Les balises et attributs ARIA jouent ici un rôle majeur pour décrire les rôles, les états et les relations entre les composants. Toutefois, le principe reste le même : privilégier le HTML natif dès que possible, et utiliser ARIA pour compléter lorsque les interfaces deviennent plus complexes.
