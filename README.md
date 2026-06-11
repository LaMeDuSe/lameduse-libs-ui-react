# LaMeDuSe Libs UI React

Contains the React components for the LaMeDuSe Libs UI.

## Note for external users

This package designed to work with / in LaMeDuSe Environment is not as today designed to be generic and used in other projects.

BUT, if you want to use it you can and this is how.

## Using the package

If you want to use it first you will need to create a fork.

Doing so, you will need to :

- rename the package.
- change the build pipeline to match your environment.
- change the tailwind configuration to match your brand.
- change the font to match your brand. (Fonts are in /src/assets/fonts and imported in /src/styles/base.css)
  - Note : The font are exported with the library.

## Usage

You can use the library in multiples ways.

### Specific import

```jsx
import { Button } from 'lameduse-libs-ui-react';

const App = () => {
  return (
    <Button>Click me</Button>
  );
};
```

### Global import

```jsx
import LameduseUI from 'lameduse-libs-ui-react';

const App = () => {
  return (
    <LameduseUI.LameduseUIProvider>
      <LameduseUI.Button>Click me</LameduseUI.Button>
    </LameduseUI.LameduseUIProvider>
  );
};
```

### Importing styles

You can import the styles in your project by importing the css file.

```css

@import 'lameduse-libs-ui-react/dist/styles/index.css';

```

## Composants Interactifs & Magnétiques (Nouveautés)

Cette bibliothèque intègre des effets interactifs de pointe basés sur le mouvement du curseur de la souris (physique d'attraction magnétique, effets de plexus sur `<canvas>`, etc.).

### 1. HeroSlider avec Effets de Fond Interactifs

Le composant `HeroSlider` permet d'utiliser des arrière-plans animés interactifs au survol de la souris à la place d'une image statique.

#### Propriétés d'une Diapositive (`Slide`)

Pour activer un effet interactif sur une diapositive, omettez la propriété `image` et renseignez les champs suivants :

- `gradientBg` (string) : Classes Tailwind pour le dégradé de fond. Exemple : `"bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-950"`.
- `bgEffect` (string) : L'effet interactif souhaité. Les valeurs possibles sont :
  - `'none'` : Aucun effet.
  - `'plexus'` : Réseau de nœuds reliés par des lignes, attirés magnétiquement par le curseur (effet gravité).
  - `'repulsion'` : Particules de ciel étoilé qui fuient le curseur à son approche.
  - `'magnetic-glow'` : Halos de couleurs flous qui se déplacent en parallaxe réagissant au curseur.
  - `'constellation'` : Étoiles dérivantes traçant des liens luminescents vers le curseur avec un réticule holographique.
  - `'grid-warp'` : Grille géométrique se déformant élastiquement sous la souris.
- `bgEffectColor` (string) : Couleur CSS primaire de l'effet. Exemple : `"rgba(1, 180, 182, 0.85)"`.
- `bgEffectColorSecondary` (string) : Couleur CSS secondaire de l'effet (utilisée pour `magnetic-glow` et `constellation`). Exemple : `"rgba(0, 128, 226, 0.85)"`.

#### Exemple d'utilisation (HeroSlider)

```jsx
import { HeroSlider } from '@lameduse/lameduse-libs-ui-react';

const slides = [
  {
    title: "Ambient Magnetic Glow",
    subtitle: "Halos de couleur flous qui bougent en parallaxe 3D.",
    gradientBg: "bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950",
    bgEffect: "magnetic-glow",
    bgEffectColor: "rgba(1, 180, 182, 0.6)",
    bgEffectColorSecondary: "rgba(236, 72, 153, 0.6)",
    buttons: [{ children: "En savoir plus", href: "#" }]
  }
];

const App = () => <HeroSlider slides={slides} autoPlay={false} />;
```

### 2. CTA (Variante `technology`)

Le composant `CTA` propose une variante immersive `"technology"` qui intègre un fond dégradé animé, un plexus interactif fluide et des boutons aimantés par le curseur.

#### Propriétés spécifiques (`CTAProps`)

- `variant` (string) : Définir à `"technology"` pour activer le style interactif.
- `title` (string) : Titre de la bannière.
- `description` (string) : Texte de description.
- `bgGradient` (string, optionnel) : Dégradé Tailwind de fond. Par défaut : `"from-lameduse-primary via-lameduse-secondary to-lameduse-tertiary"`.
- `glowColor` (string, optionnel) : Couleur CSS primaire pour le plexus et les halos. Par défaut : `"rgba(1, 180, 182, 0.85)"`.

#### Exemple d'utilisation (CTA)

```jsx
import { CTA } from '@lameduse/lameduse-libs-ui-react';

const App = () => (
  <CTA
    variant="technology"
    title="Prêt à propulser votre technologie ?"
    description="Explorez nos solutions cloud et IA avec nos experts."
    first={{ children: "Commencer", href: "/get-started", style: "solid" }}
    second={{ children: "Nous contacter", href: "/contact", style: "outline", type: "white" }}
  />
);
```

### 3. Hook d'Attraction Magnétique (`useMagnetic`)

Vous pouvez appliquer une attraction magnétique du curseur sur n'importe quel élément interactif (liens, boutons, ou éléments ayant la classe `.magnetic-target`) de votre site grâce au hook `useMagnetic`.

#### Signature du hook

`useMagnetic(strength = 0.35, radius = 100)`

- `strength` (number) : Force de l'attraction (entre 0 et 1).
- `radius` (number) : Rayon de détection en pixels autour du bouton.

#### Exemple d'utilisation (`useMagnetic`)

```jsx
import { useMagnetic } from '@lameduse/lameduse-libs-ui-react';

const MyComponent = () => {
  const containerRef = useMagnetic(0.4, 120);

  return (
    <div ref={containerRef}>
      {/* Tous les boutons dans ce conteneur seront attirés par la souris */}
      <button className="px-6 py-2 bg-blue-600 rounded">Bouton Aimanté</button>
      <a href="#" className="magnetic-target">Lien Aimanté</a>
    </div>
  );
};
```

## Development

You will find a makefile in the root of the project. He is your friend for the development.

Browse the makefile to see all the commands available.

## Copyright

This package is owned by LaMeDuSe, all rights reserved.

You can use it in your project but you can't sell it or use it in a commercial project without the agreement of LaMeDuSe.
