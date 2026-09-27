Write less line of codes.
Write clean code.

# Frontend Design Rules

## Purpose

Build interfaces that feel **intentional, human-designed, restrained, and product-focused**.

The default goal is not to make the UI visually impressive. The goal is to make it **clear, useful, coherent, and believable as a real product**.

Avoid generic "AI-generated website" aesthetics.

---

## 1. Core Design Principles

* Prefer **clarity over decoration**.
* Prefer **hierarchy over visual noise**.
* Prefer **consistency over novelty**.
* Prefer **simple layouts executed extremely well** over complicated layouts.
* Every visual element should have a purpose.
* Do not add UI elements simply because there is empty space.
* Do not make every section look like a separate card.
* Design should feel like a product, not a template.

Before adding a component, ask:

> Does this improve usability, hierarchy, or understanding?

If not, remove it.

---

## 2. Avoid "AI Slop" Patterns

Do NOT automatically use:

* Purple/blue gradients
* Neon accents
* Gradient text
* Huge glowing blobs
* Glassmorphism everywhere
* Excessive `backdrop-filter`
* Excessive shadows
* Excessive rounded cards
* Floating cards on top of other cards
* Decorative abstract SVGs without purpose
* Random geometric shapes
* Giant hero sections
* "Revolutionary / Next-generation / AI-powered" marketing copy
* Fake statistics
* Fake testimonials
* Generic dashboard cards
* Excessive badges
* Pills for everything
* Emoji as UI decoration
* Excessive icon usage
* Stock-looking illustrations
* Random animations
* Cursor-following effects
* Parallax effects unless genuinely useful
* Text that exists purely to fill space

Do not use a design pattern simply because it is common in AI-generated websites.

---

## 3. Layout

Use a clear visual grid.

Prefer:

* Strong alignment
* Consistent spacing
* Reasonable content widths
* Clear grouping
* Generous but purposeful whitespace

Avoid:

* Everything centered
* Extremely wide content areas
* Arbitrary asymmetry
* Components floating without alignment
* Too many columns
* Unnecessary full-screen sections

Use a sensible max-width for content.

Typical starting point:

```css
max-width: 1200px;
margin-inline: auto;
padding-inline: 24px;
```

Adjust according to the actual content.

---

## 4. Typography

Typography should create hierarchy naturally.

Use a limited type scale.

Example:

```text
Display
Heading
Subheading
Body
Secondary
Caption
```

Do not use huge headings simply to make a page look impressive.

Avoid:

```text
THE FUTURE OF LEARNING
```

when a normal heading communicates the same thing better.

Prefer:

```text
Study previous-year questions more effectively.
```

Use:

* 1 primary font family
* At most 1 secondary font family
* Limited font weights
* Comfortable line heights
* Proper paragraph width

Do not randomly mix fonts.

---

## 5. Color

Use a restrained color system.

Define semantic colors:

```text
background
foreground
muted
border
primary
primary-foreground
destructive
success
warning
```

The interface should work primarily through:

* contrast
* spacing
* typography
* borders
* hierarchy

rather than through many colors.

### Avoid

```text
purple → pink gradient
blue → cyan gradient
rainbow gradients
neon backgrounds
glowing borders
```

unless the product's brand explicitly requires them.

Accent colors should be used intentionally.

---

## 6. Cards

Cards are useful, but **not everything should be a card**.

Do not turn:

* paragraphs
* navigation
* headings
* every statistic
* every button
* every section

into separate rounded containers.

Use cards when content represents a meaningful independent unit.

Prefer subtle separation:

```text
border
background contrast
spacing
typography
```

over:

```text
large shadow
huge radius
glow
gradient
```

Default border radius should be moderate.

Do not use extremely rounded `rounded-full` containers unless the component is actually pill-shaped.

---

## 7. Buttons

Buttons should look like controls, not decorative objects.

Use a clear hierarchy:

```text
Primary
Secondary
Tertiary / Ghost
Destructive
```

Avoid giving every button the same visual importance.

Do not create huge buttons unless there is a strong UX reason.

Button text should describe the action:

Good:

```text
Start Practice
Generate Notes
Save Changes
Continue
```

Bad:

```text
Let's Go 🚀
Experience the Future
Unlock Magic
```

---

## 8. Navigation

Navigation should be predictable.

Do not create:

* unnecessary floating navbars
* oversized navbars
* excessive navigation items
* decorative navigation
* duplicate navigation systems

Use familiar interaction patterns.

The user should immediately understand:

* where they are
* where they can go
* what the primary action is

---

## 9. Forms

Forms should prioritize usability.

* Clearly label inputs.
* Do not rely only on placeholders.
* Keep related fields together.
* Use appropriate input types.
* Show validation errors close to the relevant field.
* Provide useful loading and success states.
* Avoid unnecessarily long forms.

Do not put every input inside a separate giant card.

---

## 10. Icons

Icons should communicate meaning.

Use one consistent icon library.

Do not:

* mix multiple icon styles
* use icons everywhere
* add icons purely for decoration
* use an icon when plain text is clearer

An icon should either:

1. communicate meaning, or
2. improve interaction.

Otherwise, remove it.

---

## 11. Animation

Animation should explain or improve interaction.

Good uses:

* hover feedback
* loading states
* expanding/collapsing content
* page transitions
* state changes
* subtle entrance animations

Avoid:

* everything flying onto the screen
* excessive bouncing
* constant motion
* animated gradients
* unnecessary parallax
* scroll-triggered animation on every section
* animations longer than necessary

Default animations should be subtle and fast.

Respect:

```css
prefers-reduced-motion
```

---

## 12. Responsive Design

Design for real devices.

Do not simply shrink the desktop layout.

Check:

* mobile
* tablet
* laptop
* large desktop

On smaller screens:

* simplify layouts
* reduce unnecessary elements
* preserve hierarchy
* maintain readable text
* make controls accessible
* avoid horizontal scrolling

---

## 13. Empty States

Empty states should explain what happened and what the user can do next.

Bad:

```text
Nothing here.
```

Better:

```text
No questions saved yet.

Save questions while practicing and they'll appear here.
```

If there is a natural next action, provide it.

---

## 14. Loading States

Never leave users wondering whether the application is broken.

Use appropriate:

* skeletons
* spinners
* progress indicators
* disabled states
* optimistic updates

Do not use a giant loading animation when a small indicator is sufficient.

---

## 15. Error States

Errors should be understandable.

Avoid:

```text
Something went wrong.
```

when more useful information is available.

Prefer:

```text
Unable to load the questions.

Check your connection and try again.
```

Give users a recovery action where appropriate.

---

## 16. Content

Do not invent content simply to make the interface look populated.

Never fabricate:

* user statistics
* testimonials
* reviews
* ratings
* activity
* course counts
* company logos
* achievements
* social proof

Use realistic placeholder content during development, clearly marked as placeholder.

Content should determine the UI — not the other way around.

---

## 17. Data-Dense Interfaces

For dashboards, admin panels, educational tools, and developer tools:

Prefer:

```text
tables
lists
filters
tabs
search
clear sections
```

over:

```text
20 decorative statistic cards
```

Information density is acceptable when the product genuinely requires it.

Do not unnecessarily turn useful information into visually impressive cards.

---

## 18. AI / Chat Interfaces

For AI products:

Do NOT automatically copy ChatGPT.

Avoid:

* unnecessary gradient backgrounds
* oversized chatbot avatars
* excessive rounded message bubbles
* decorative AI particles
* "AI magic" animations
* fake typing animations everywhere
* excessive sparkle icons
* unnecessary model branding

The interface should make the interaction feel natural and efficient.

Focus on:

```text
input
conversation
context
actions
results
navigation
```

---

## 19. Design System

Before building many components, establish:

```text
Colors
Typography
Spacing
Radius
Borders
Shadows
Breakpoints
Component states
```

Reuse these values.

Do not create slightly different versions of the same component.

For example, avoid:

```text
rounded-lg
rounded-xl
rounded-2xl
rounded-[18px]
rounded-[22px]
```

randomly throughout the application.

Consistency matters more than individual component aesthetics.

---

## 20. Component Reuse

Create reusable components when patterns repeat.

Examples:

```text
Button
Input
Select
Modal
Dialog
Card
Tabs
Toast
Dropdown
Sidebar
Navbar
```

But do not abstract everything prematurely.

A component should exist because:

* it is reused, or
* it represents a meaningful UI concept.

Avoid unnecessary abstraction purely for the sake of architecture.

---

## 21. Accessibility

Accessibility is part of the design.

Always consider:

* keyboard navigation
* focus states
* sufficient contrast
* semantic HTML
* labels
* ARIA only when necessary
* screen-reader-friendly interactions
* reduced motion

Never remove focus indicators without providing an equivalent.

---

## 22. Visual Hierarchy

Every page should have an obvious hierarchy.

The user should quickly understand:

1. Where am I?
2. What is this page for?
3. What should I do?
4. What information matters?
5. What can I do next?

Use:

```text
size
weight
spacing
position
contrast
```

to create hierarchy.

Do not rely on:

```text
gradients
shadows
glows
animations
```

to create hierarchy.

---

## 23. Real-World Product Test

Before considering a page finished, ask:

> Would this look believable if I encountered it in a real production application?

Then check:

* Is anything unnecessary?
* Are there too many cards?
* Are there too many colors?
* Are there too many rounded elements?
* Is anything trying too hard to look futuristic?
* Is the hierarchy obvious?
* Is the primary action obvious?
* Does the interface still look good without animations?
* Does it work without gradients?
* Does it look coherent on mobile?

If removing decorative elements makes the UI better, remove them.

---

## 24. Implementation Rules

When implementing the UI:

1. Inspect the existing design system before creating new styles.
2. Reuse existing components whenever possible.
3. Do not introduce a new library for a problem already solved by the project.
4. Keep spacing and typography consistent.
5. Prefer semantic HTML.
6. Keep components understandable.
7. Avoid unnecessary CSS.
8. Avoid hardcoded magic numbers when a design token can be used.
9. Do not rewrite unrelated parts of the application.
10. Do not change functionality while performing visual work unless explicitly requested.

---

## 25. Final Rule

**Do less, but do it better.**

A good interface does not need to demonstrate how many CSS effects the developer knows.

If a design can be improved by removing something, remove it.

The final result should feel:

**intentional → restrained → coherent → usable → polished**

rather than:

**colorful → animated → futuristic → crowded → AI-generated**
