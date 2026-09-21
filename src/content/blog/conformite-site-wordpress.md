---
title: J'améliore l'accessibilité numérique de mon site Wordpress !
description: Environ 43 % de tous les sites web dans le monde utilisent WordPress .
pubDate: '2026-02-20'
featured: false
hidden: false
category: Accessibilité RGAA
image: /images/articles/conformite-site-wordpress.webp
imageAlt: Illustration de la mise en conformité d'un site Wordpress
---
## 📊 Les chiffres clés (source w3techs.com)

- Environ **43 % de tous les sites web** dans le monde utilisent **WordPress**.
- Si on regarde uniquement les sites utilisant un CMS, **plus de 60 %** sont sous WordPress.
- Très peu de sites publics totalement conforme (<5%).

L'objectif de cet article est de vous présenter les quelques modifications sur votre site Wordpress qui permettent d'améliorer sensiblement le codage de vos pages.

**De base, un site créé avec Wordpress a un score RGAA entre 71% et 96%** (toujours la marge de contrôles manuels). C'est un bon score, voire très bon mais... qui sera difficile de garder lorsque vous allez ajouter des images, des tableaux et autres éléments.

**La moyenne des sites Wordpress testés à l'aide de mon [outil en ligne](/service-en-ligne/formulaire-rgaa/) est généralement entre 60% et 85%.**

Pourtant, avec quelques améliorations techniques, réalisées par votre administrateur Web, et de bonnes pratiques, il est possible de le rendre totalement conforme (100%).

[Partie 1 : Modifications techniques](#partie1)

[Partie 2 : Bonnes pratiques](#partie2)

### Conditions de mise en oeuvre pour le test réalisé :

Version utilisée : Wordpress 6.9.1 et le thème Twenty twenty-Five.

## Partie 1 : Modifications techniques

Cette partie est sous l'entière responsabilité de votre administrateur Web. conform-IT ne pourra être tenu responsable en cas de toutes mauvaises manipulations.

Les corrections sont réalisées sur le **[thème enfant](https://wordpress.com/fr/support/themes/themes-enfants/ "Lien pour accéder à une page d'explication du thème enfant sous Wordpress")** du thème principal (test réalisé sur le thème indiqué en pré-requis). Plusieurs fichiers sont modifiés ou ajoutés :

- functions.php, ne pas remplacer directement celui présent sur votre site mais intégrer le code de ce fichier dans le votre.
- plusieurs fichiers php, placés dans un répertoire inc
- plusieurs fichiers js, placés dans le répertoires assets/js

Le répertoire racine pour les fichiers est celui du thème enfant.

Par exemple : /www/*monsite*/wp-content/themes/*twentytwentyfive\_rgaa*

**Liste des fichiers et l'emplacement de stockage**

|  |  |  |
| --- | --- | --- |
| **Nom du fichier** | **Répertoire** | **Lien de téléchargement** |
| functions.php | racine | Télécharger |
| rgaa-tableau.php | inc | Télécharger |
| rgaa-image.php | inc | Télécharger |
| table-caption.js | assets/js | Télécharger |
| image-aria-hidden.js | assets/js | Télécharger |

### Que font ces corrections ?

Elles modifient l'interface de gestion des articles et pages en ajoutant des attributs dans le bloc respectif des éléments ciblés : images et tableaux.

#### Pour le bloc Images :

|  |  |
| --- | --- |
| Lorsque vous sélectionnez une image dans votre page, vous pourrez visualisez dans le bloc à droite, un nouvel attribut permettant d'indiquer si l'image est décorative ou informative. | ![Illustration de l'attribut ajouté au bloc Images](/images/articles/conformite-site-wordpress-wordpress-01.webp) |

#### Pour le bloc Tableaux :

|  |  |
| --- | --- |
| Lorsque vous sélectionnez un tableau dans votre page, vous pourrez visualisez dans le bloc à droite, 2 nouveaux attributs permettant  :   - de préciser le titre du tableau - d'indiquer si la première colonne contient les entêtes des lignes | ![Illustration montrant les attributs ajoutés au bloc de gestion des tableaux](/images/articles/conformite-site-wordpress-wordpress-02.webp) |

A l'aide de ces modifications, votre site Wordpress sera mieux codé et réduira sensiblement le nombre de non-conformités.

## Partie 2 : Bonnes pratiques

### Pour les images :

|  |  |
| --- | --- |
| Lorsque l'image est informative, il faut renseigner l'attribut Texte alternatif dans le bloc de droite avec une description succincte de l'image. Cela sert à lecture vocale des lecteurs d'écran. | ![Illustration montrant l'attribut "Texte alternatif" du bloc de gestion d'une image](/images/articles/conformite-site-wordpress-wordpress-03.webp) |

#### Pour les tableaux :

|  |  |
| --- | --- |
| Lorsque un tableau est sélectionné, il faut renseigner les bons attributs. Si vous avez des entêtes aux colonnes, il convient de cocher l'attribut "Section d'entête". | ![Illustration montrant les attributs de réglage du bloc de gestion d'un tableau](/images/articles/conformite-site-wordpress-wordpress-04.webp) |

```
Ces modifications ont été testées sur une version Wordpress et un thème indiqués en pré-requis. Il est possible que ces modifications ne fonctionnent pas sur une version différente de wordpress ou un autre thème.  
  
Cet article n'a pas été créé par une IA. Par contre, le code permettant de modifier le thème du site Wordpress a été obtenu par l'usage de requêtes sur une IA, une implémentation réelle sur un site et des tests réalisés avec l'outil SBC (Score By Conform-it), développé par conform-IT.
```
