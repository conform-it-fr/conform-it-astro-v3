---
title: "Chapitre 4 du RGAA : Multimédia – rendre les contenus audio et vidéo accessibles"
description: "Le chapitre 4 du RGAA est consacré aux contenus multimédias : vidéos, fichiers audio, animations synchronisées ou tout média combinant image et son. Ces contenus sont très…"
pubDate: 2026-02-09
featured: false
category: "Accessibilité RGAA"
image: "/images/articles/chapitre-4-du-rgaa-multimedia-rendre-les-contenus-audio-et-video-accessibles.webp"
imageAlt: "Illustration pour l'article relatif au chapitre 4 : Multimédia"
hidden: true
---

## Introduction

Le chapitre 4 du RGAA est consacré aux **contenus multimédias** : vidéos, fichiers audio, animations synchronisées ou tout média combinant image et son. Ces contenus sont très présents sur les sites web modernes, mais ils peuvent constituer des obstacles importants pour de nombreux utilisateurs si aucune alternative n’est prévue.

L’objectif de ce chapitre est de garantir que chacun puisse accéder à l’information transmise par ces médias, quelles que soient ses capacités sensorielles ou son mode de navigation.

## Les enjeux d’accessibilité du multimédia

Un contenu vidéo peut poser plusieurs difficultés selon le profil de l’utilisateur :

- Une personne sourde ne perçoit pas le son
- Une personne aveugle ne voit pas les informations visuelles
- Un utilisateur ayant des difficultés cognitives peut avoir besoin de supports textuels
- Une personne naviguant au clavier doit pouvoir contrôler la lecture

**Le chapitre 4 vise donc à proposer des alternatives adaptées à chaque situation.**

## Les exigences principales du RGAA

Plusieurs obligations structurent ce chapitre :

- Les vidéos doivent proposer des sous-titres synchronisés
- Les contenus audio doivent avoir une transcription textuelle
- Les vidéos contenant des informations visuelles importantes doivent proposer une audiodescription
- Les lecteurs multimédias doivent être utilisables au clavier
- Les médias qui démarrent automatiquement doivent pouvoir être arrêtés facilement

Ces exigences permettent un accès équivalent à l’information.

### Exemple 1 : vidéo avec sous-titres

L’ajout de sous-titres est essentiel pour les personnes sourdes ou malentendantes.

```
<video controls>
  <source src="presentation.mp4" type="video/mp4">
  <track 
    kind="subtitles" 
    src="sous-titres-fr.vtt" 
    srclang="fr" 
    label="Français">
</video>
```

Bon usage :

- La balise `<track>` permet d’ajouter des sous-titres synchronisés
- Le lecteur natif reste accessible dans la plupart des cas

#### Exemple 2 : audio avec transcription

Un fichier audio doit être accompagné d’un équivalent textuel.

```
<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
</audio>

<p>
  <strong>Transcription :</strong>
  Présentation du service et explication des principales fonctionnalités...
</p>
```

La transcription permet aux personnes sourdes d’accéder au contenu.

#### Exemple 3 : vidéo nécessitant une audiodescription

Si des informations importantes sont transmises uniquement par l’image (gestes, textes affichés à l’écran, actions), une audiodescription est nécessaire.

```
<video controls aria-describedby="desc-video">
  <source src="tutoriel.mp4" type="video/mp4">
</video>

<p id="desc-video">
  Une version avec audiodescription est disponible pour décrire les actions à l’écran.
</p>
```

Ici, `aria-describedby` informe l’utilisateur qu’une description complémentaire existe.

#### Exemple 4 : lecteur multimédia accessible au clavier

Les lecteurs doivent permettre :

- Lecture / pause
- Réglage du volume
- Navigation dans la timeline

Les lecteurs HTML natifs sont généralement conformes :

```
<video controls>
  <source src="film.mp4" type="video/mp4">
</video>
```

Le simple attribut `controls` active une interface accessible dans la plupart des navigateurs.

#### Exemple 5 : vidéo intégrée avec un titre accessible

Lorsqu’un média est intégré via un lecteur externe ou un composant complexe, il peut être utile de fournir un nom accessible.

```
<video 
  controls
  aria-label="Vidéo de démonstration du formulaire de contact">
  <source src="demo.mp4" type="video/mp4">
</video>
```

`aria-label` permet d’annoncer clairement le contenu à l’utilisateur.

#### Exemple 6 : média qui démarre automatiquement

Les médias qui se lancent seuls peuvent perturber la navigation, en particulier avec un lecteur d’écran.

Une solution consiste à offrir un contrôle rapide :

```
<button aria-controls="video1" aria-label="Mettre en pause la vidéo">
  Pause
</button>

<video id="video1" autoplay>
  <source src="intro.mp4" type="video/mp4">
</video>
```

Les attributs ARIA permettent d’associer le bouton au média.

## Le rôle d’ARIA dans l’accessibilité multimédia

ARIA ne remplace pas les fonctionnalités natives du HTML, mais peut aider à :

- Nommer un lecteur multimédia (`aria-label`)
- Relier une description à un média (`aria-describedby`)
- Associer des contrôles personnalisés (`aria-controls`)
- Signaler des changements dynamiques (`aria-live`)

**Cependant, il est préférable d’utiliser en priorité les balises HTML prévues pour le multimédia.**

## Erreurs fréquentes observées en audit

On retrouve régulièrement :

- Vidéos sans sous-titres
- Audios sans transcription
- Informations importantes visibles mais non décrites
- Lecteurs impossibles à utiliser au clavier
- Médias qui se lancent automatiquement sans contrôle

Ces situations rendent le contenu inaccessible à une partie des utilisateurs.

## Impact concret pour les utilisateurs

Sans sous-titres, une personne sourde ne peut pas suivre une vidéo.  
Sans audiodescription, une personne aveugle peut manquer des informations essentielles.  
Sans contrôle clavier, un utilisateur peut être bloqué dans le lecteur.

Le multimédia doit donc être pensé comme un contenu à part entière, avec ses propres règles d’accessibilité.

## Conclusion

Le chapitre 4 du RGAA encadre l’accessibilité des contenus audio et vidéo afin que l’information soit disponible sous plusieurs formes : visuelle, sonore et textuelle. Les sous-titres, les transcriptions et l’audiodescription constituent les piliers de cette accessibilité.

Les attributs ARIA peuvent venir compléter certains dispositifs, notamment pour nommer les lecteurs ou associer des descriptions, mais l’essentiel repose sur l’usage correct des balises HTML dédiées au multimédia. Une mise en œuvre soignée garantit que chacun puisse accéder aux contenus, quel que soit son mode de perception.
