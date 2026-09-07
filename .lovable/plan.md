# Immersive 3D VEVRA Homepage Hero

## Goal
Replace only the current homepage opening with a premium, interactive Three.js presentation inspired by Jesper Landberg’s motion-led portfolio approach. Keep the existing navigation, lower homepage sections, routes, RFQ flow, and business content unchanged.

## Experience
- Build a full-width, first-viewport hero in VEVRA navy, white, and restrained red accents.
- Present a curated 3D “packaging ecosystem” containing recognizable corrugated cartons, a pallet/wooden crate, plastic returnable container, and metal transport rack/trolley.
- Arrange the products as a cinematic horizontal composition rather than a conventional product catalogue.
- Use pointer movement and touch drag for subtle inertial rotation/parallax; keep motion calm and engineering-focused rather than game-like.
- Add a slow automatic camera drift when idle, pausing or reducing it during direct interaction.
- Keep the hero headline, positioning statement, primary RFQ action, and service exploration action as accessible HTML above the 3D scene.
- Add an interactive product/service index along the lower edge. Selecting an item will smoothly focus the matching 3D object and update a concise label, category, and link to its existing product or service page.
- Preserve a visible hint of the next homepage section at standard desktop and mobile heights.

## Visual Direction
- Use a clean studio/showroom treatment: pale industrial floor, deep navy backdrop, controlled white light, crisp shadows, and VEVRA red details.
- Avoid neon, excessive gradients, floating decorative orbs, generic factory imagery, and text rendered inside the canvas.
- Source compact CC0 models for recognizable packaging objects where suitable; optimize and bundle them locally so the deployed site does not depend on third-party asset hosting.
- Use a restrained loading state that still shows the hero copy and lit stage immediately.

## Responsive and Accessible Behaviour
- Desktop: full interaction with pointer parallax, drag, object focus, and smooth camera movement.
- Mobile: simplified composition, touch-friendly selector, reduced object count/detail, and stable text/button placement.
- Respect reduced-motion preferences by disabling idle movement and replacing transitions with immediate state changes.
- Keep all actions keyboard accessible, with clear focus states and descriptive labels.
- Provide a static branded fallback if WebGL is unavailable.

## Technical Details
- Add React Three Fiber, Three.js, Drei, and Three.js types compatible with React 19.
- Create a client-only hero component so the rest of the homepage remains server-rendered and searchable.
- Keep the 3D canvas isolated inside the hero rather than making the whole route client-only.
- Use local semantic brand tokens for the surrounding interface and Three.js material constants matched to those tokens.
- Cap pixel ratio and shadow quality for mobile/integrated graphics; keep draw calls and geometry within a lightweight marketing-page budget.
- Load models inside a Canvas-level Suspense boundary while lights, floor, background, and HTML content remain visible.
- Update the homepage metadata only if needed; retain the existing title and description meaning.

## Validation
- Verify the hero at desktop and mobile sizes with browser screenshots.
- Confirm pointer/touch selection changes the focused product and destination link.
- Confirm the RFQ and Explore Solutions buttons still navigate correctly.
- Confirm the lower homepage content remains unchanged and no text overlaps the 3D scene.
- Check for clean browser console/network output, no hydration warnings, no missing assets, and a visible first frame.
- Verify the production-compatible build and Netlify asset paths.
