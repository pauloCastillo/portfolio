## 1. Setup

- [x] 1.1 Install `motion` dependency in package.json

## 2. AnimatedSection Component

- [x] 2.1 Create `AnimatedSection.tsx` with scroll-reveal motion wrapper (fade in + slide up)
- [x] 2.2 Add stagger children variant support for grid/flex containers

## 3. Profile Photo

- [x] 3.1 Replace initials div in AboutPage.tsx avatar card with Next.js `<Image>` component
- [x] 3.2 Add `priority` prop and rounded-full object-cover styling

## 4. Section Animations

- [x] 4.1 Wrap StackSection with AnimatedSection
- [x] 4.2 Wrap ProjectsPage grid with stagger container, add motion.div to BaseCard
- [x] 4.3 Wrap AboutPage with AnimatedSection
- [x] 4.4 Wrap ValuesSection with stagger container, add motion.div to value cards
- [x] 4.5 Wrap ContactPage with AnimatedSection

## 5. Hero Animation

- [x] 5.1 Add sequential entrance animations to Hero elements (eyebrow, headline, subtitle, CTAs, code)

## 6. Card Hover Effects

- [x] 6.1 Add `whileHover={{ y: -4 }}` to BaseCard
- [x] 6.2 Add `whileHover={{ y: -4 }}` to value cards

## 7. Build & Verify

- [ ] 7.1 Run `npm run build` and fix any errors
- [ ] 7.2 Verify admin/auth routes remain unaffected
