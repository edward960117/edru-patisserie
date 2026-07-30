# BLUE ISLET UI - Quick Reference Guide

## Button Classes Quick Reference

### Primary Button (CTA)
```jsx
<button className="btn-lux-primary">Discover Today</button>

// Sizes: Use tailwind sizing
<button className="btn-lux-primary text-sm">Small</button>
<button className="btn-lux-primary text-base">Default</button>
<button className="btn-lux-primary text-lg">Large</button>

// Full width
<button className="btn-lux-primary w-full">Save</button>

// With icon
<button className="btn-lux-primary inline-flex items-center gap-2">
  <span>✨</span> Browse Collection
</button>

// Loading state
<button className="btn-lux-primary is-loading">Saving...</button>
```

### Secondary Button (Alternative)
```jsx
<button className="btn-lux-secondary">Cancel</button>
<button className="btn-lux-secondary">Learn More</button>
```

### Tertiary Button (Minimal)
```jsx
<button className="btn-lux-tertiary">View All</button>
```

### Ghost Button (Text Link)
```jsx
<button className="btn-lux-ghost">Skip</button>
<button className="btn-lux-ghost">Help</button>
```

### Success Button (Green)
```jsx
<button className="btn-lux-success">Confirm Order</button>
```

### Danger Button (Red)
```jsx
<button className="btn-lux-danger">Delete Account</button>
```

---

## Form Input Classes Quick Reference

### Text Input
```jsx
<input 
  className="input-lux"
  type="text"
  placeholder="Enter your name"
  aria-label="Full name"
/>
```

### Input with Label
```jsx
<div className="form-group">
  <label className="form-label">
    Username
    <span className="required-indicator">*</span>
  </label>
  <input 
    className="input-lux"
    type="text"
    required
  />
</div>
```

### Input with Error
```jsx
<input 
  className="input-lux input-error"
  aria-invalid="true"
  aria-describedby="username-error"
/>
<p id="username-error" className="input-error-message">
  Username is required
</p>
```

### Input with Success
```jsx
<input 
  className="input-lux input-success"
  type="email"
  value="user@example.com"
/>
<p className="input-success-message">✓ Email verified</p>
```

### Textarea
```jsx
<textarea 
  className="input-lux"
  rows={4}
  placeholder="Enter description"
/>
```

### Select Dropdown
```jsx
<select className="select-premium">
  <option>Select a category</option>
  <option>Today's Recommendation</option>
  <option>For Her</option>
  <option>Custom Cakes</option>
</select>
```

### Checkbox
```jsx
<label className="flex items-center gap-2">
  <input type="checkbox" className="checkbox-premium" />
  <span>I agree to the terms</span>
</label>
```

### Form Container
```jsx
<section className="form-container">
  <h1 className="heading-serif text-[2.2rem]">Login</h1>
  <form className="space-y-6">
    {/* Form fields */}
  </form>
</section>
```

---

## Typography Classes Quick Reference

### Headings
```jsx
<h1 className="type-heading-1">Large Heading</h1>
<h2 className="type-heading-2">Medium Heading</h2>
<h3 className="type-heading-3">Small Heading</h3>

// Alternative with direct Tailwind
<h1 className="heading-serif text-[3rem] font-semibold leading-[1.1]">
  Custom Heading
</h1>
```

### Body Text
```jsx
<p className="type-body-large">Large paragraph text</p>
<p className="type-body-default">Standard paragraph text</p>
<p className="type-body-small">Small caption text</p>
```

### Captions & Labels
```jsx
<span className="type-caption">COLLECTION</span>
<span className="type-caption">READ MORE →</span>
```

---

## Animation Classes Quick Reference

### Fade In Up (Page Load)
```jsx
{/* Appears on page load */}
<div className="animate-fade-in-up">Content</div>

{/* With custom delay */}
<div 
  className="animate-fade-in-up"
  style={{ animationDelay: '100ms' }}
>
  Delayed content
</div>
```

### Staggered List Animation
```jsx
{items.map((item, index) => (
  <div
    key={item.id}
    className="animate-fade-in-up"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    {item.name}
  </div>
))}
```

### Hover Zoom
```jsx
<Image 
  className="hover-zoom"
  src="/cake.jpg"
  alt="Chocolate Cake"
/>

{/* Or on any element */}
<div className="hover-zoom">
  Scales to 1.08 on hover
</div>
```

### Card Elevation
```jsx
<div className="card-hover-lift">
  <h3>Premium Card</h3>
  <p>Elevates on hover</p>
</div>
```

---

## Color Usage Guide

### Text Colors
```jsx
// Primary text
<p className="text-[color:var(--ink)]">Main content</p>

// Secondary text
<p className="text-[color:var(--ink-soft)]">Supporting text</p>

// Tertiary text
<p className="text-[color:var(--ink-faint)]">Help text</p>

// Brand color
<span className="text-[color:var(--primary)]">Featured</span>

// Error color
<p className="text-[color:var(--accent-red)]">Error message</p>
```

### Background Colors
```jsx
// Primary backgrounds
<div className="bg-[color:var(--primary)]">Primary background</div>

// Subtle backgrounds
<div className="bg-[color:var(--bg)]">Subtle background</div>
<div className="bg-[color:var(--bg-soft)]">Softer background</div>

// Card backgrounds
<div className="bg-[color:var(--card)]">Card background</div>
```

### Border Colors
```jsx
<input 
  className="border border-[color:var(--border)]"
  type="text"
/>

// Stronger border
<div className="border-2 border-[color:var(--primary)]">
  Featured section
</div>
```

---

## Spacing Guide (8px Base Unit)

```jsx
// Padding
<div className="p-4">4px (0.25rem)</div>
<div className="p-6">6px (0.375rem)</div>
<div className="p-8">8px (0.5rem)</div>
<div className="p-12">12px (0.75rem)</div>
<div className="p-16">16px (1rem)</div>
<div className="p-24">24px (1.5rem)</div>
<div className="p-32">32px (2rem)</div>

// Gap (for flex/grid)
<div className="flex gap-4">Item 1</div>
<div className="flex gap-6">Item 2</div>
<div className="grid gap-8">Item 3</div>

// Margin
<div className="mt-4">Margin top 4px</div>
<div className="mb-8">Margin bottom 8px</div>
```

---

## Responsive Design Examples

### Hero Section
```jsx
<section className="relative overflow-hidden rounded-[32px]">
  <div className="flex flex-col gap-0 sm:flex-row sm:items-center">
    <div className="flex flex-1 flex-col gap-6 sm:gap-8 px-8 py-12 sm:px-12 sm:py-14">
      <h1 className="text-[2.2rem] sm:text-[3.2rem]">
        Mobile scales to 2.2rem, desktop to 3.2rem
      </h1>
    </div>
    
    <div className="hidden sm:flex">
      Only visible on tablet and up
    </div>
  </div>
</section>
```

### Category Cards Grid
```jsx
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
  {/* Cards auto-layout: 2-col mobile, 3-col tablet, 4-col desktop */}
</div>
```

### Navigation
```jsx
<nav className="flex items-center text-[0.8rem] sm:text-[0.9rem]">
  <span className="text-[0.72rem] sm:text-[0.9rem]">Mobile smaller, tablet larger</span>
</nav>
```

---

## Focus & Keyboard Navigation

### Focus Indicators
```jsx
{/* Automatic focus-visible styling */}
<button className="btn-lux-primary">
  {/* Shows outline on keyboard focus */}
</button>

<input className="input-lux" />
{/* Shows ring on focus */}
```

### Skip Links
```jsx
<a href="#main-content" className="skip-to-main">
  Skip to main content
</a>

<main id="main-content">
  {/* Main page content */}
</main>
```

### Keyboard Navigation Order
```jsx
{/* Tab order is left-to-right, top-to-bottom by default */}
<button className="btn-lux-primary">First</button>
<input className="input-lux" />
<button className="btn-lux-secondary">Last</button>

{/* Use tabIndex if you need custom order */}
<button tabIndex={2}>Second</button>
<button tabIndex={1}>First</button>
```

---

## Accessibility Attributes

### Form Fields
```jsx
<input
  id="email"
  className="input-lux"
  aria-label="Email address"
  aria-describedby="email-help"
  required
/>
<p id="email-help">We'll never share your email</p>
```

### Buttons
```jsx
<button aria-label="Close modal">×</button>
<button aria-pressed="false">Toggle</button>
<button disabled aria-disabled="true">Save</button>
```

### Validation
```jsx
<input
  aria-invalid={hasError}
  aria-describedby={hasError ? "error-id" : undefined}
/>
{hasError && <p id="error-id">{error}</p>}
```

### Icons & Images
```jsx
<img src="/logo.png" alt="BLUE ISLET logo" />
<button aria-label="Menu">☰</button>
<span aria-hidden="true">✨</span>
```

---

## Common Patterns

### Form with Validation
```jsx
<section className="form-container">
  <h1 className="heading-serif text-[2.2rem]">Create Account</h1>
  
  <form className="space-y-6" onSubmit={handleSubmit}>
    {/* Email field */}
    <div className="form-group">
      <label htmlFor="email" className="form-label">
        Email
        <span className="required-indicator">*</span>
      </label>
      <input
        id="email"
        className={`input-lux ${error ? 'input-error' : ''}`}
        type="email"
        aria-invalid={!!error}
        required
      />
      {error && <p className="input-error-message">{error}</p>}
    </div>

    {/* Password field */}
    <div className="form-group">
      <label htmlFor="password" className="form-label">
        Password
        <span className="required-indicator">*</span>
      </label>
      <input
        id="password"
        className="input-lux"
        type="password"
        required
      />
    </div>

    {/* Submit */}
    <button type="submit" className="btn-lux-primary w-full">
      Create Account
    </button>
  </form>
</section>
```

### Category Card
```jsx
<Link
  href={`/categories/${slug}`}
  className="group rounded-[28px] card-lux p-6 sm:p-7 hover:-translate-y-1.5 animate-fade-in-up"
>
  <div className="flex items-start justify-between gap-3">
    <span className="text-4xl">{emoji}</span>
    <span className="text-[0.68rem] uppercase tracking-[0.2em] font-semibold">
      View Category
    </span>
  </div>
  
  <h2 className="heading-serif text-[1.65rem] mt-4">
    {name}
  </h2>
  
  <div className="h-0.5 w-12 opacity-0 group-hover:opacity-100 mt-2 transition-opacity" />
</Link>
```

### Product Card
```jsx
<Link
  href={`/cakes/${slug}`}
  className="group card-lux overflow-hidden rounded-[28px] hover:-translate-y-2"
>
  {/* Image */}
  <div className="relative h-56 sm:h-72 overflow-hidden">
    <Image
      src={imageUrl}
      alt={name}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>
  
  {/* Content */}
  <div className="p-5 sm:p-6">
    <h2 className="heading-serif text-[1.6rem]">{name}</h2>
    <p className="text-[0.92rem] text-[color:var(--ink-soft)] mt-2">
      {description}
    </p>
    
    <div className="mt-auto pt-5">
      <p className="text-[1.5rem] font-bold text-[color:var(--primary)]">
        S${minPrice}
      </p>
      <button className="btn-lux-secondary w-full mt-4">
        View Details
      </button>
    </div>
  </div>
</Link>
```

---

## Common Mistakes to Avoid

❌ **Wrong**: Mixing old and new button classes
```jsx
<button className="rounded-xl bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)]">
```

✅ **Right**: Use the new button classes
```jsx
<button className="btn-lux-primary">
```

---

❌ **Wrong**: Inconsistent spacing
```jsx
<div className="py-2 px-6 sm:py-4 sm:px-12">
```

✅ **Right**: Use 8px grid consistently
```jsx
<div className="py-3 px-6 sm:py-6 sm:px-12">
```

---

❌ **Wrong**: No focus indicators
```jsx
<input className="input-lux" />
{/* User can't see where they are */}
```

✅ **Right**: Focus indicators included automatically
```jsx
<input className="input-lux" />
{/* Shows ring/outline on focus */}
```

---

❌ **Wrong**: Hard-coded colors
```jsx
<p className="text-red-600">Error message</p>
```

✅ **Right**: Use color system
```jsx
<p className="text-[color:var(--accent-red)]">Error message</p>
```

---

## Performance Tips

1. **Use `.btn-lux-primary` instead of custom button styles**
   - Already optimized and tested
   - Smaller CSS bundle

2. **Prefer `.hover-zoom` over custom transform styles**
   - Uses GPU-accelerated transforms
   - Consistent animation timing

3. **Use `.animate-fade-in-up` with staggered delays**
   - Avoid multiple keyframe definitions
   - Respects `prefers-reduced-motion`

4. **Lazy load images by default**
   ```jsx
   <Image src="/image.jpg" loading="lazy" />
   ```

5. **Use `priority={true}` only for hero images**
   ```jsx
   <Image src="/hero.jpg" priority />
   ```

---

## Testing Your Implementation

```jsx
// Test color contrast (Chrome DevTools → Inspect → Accessibility)
// Test keyboard navigation (Tab through entire page)
// Test screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
// Test animations (Motion → Prefers Reduced Motion in DevTools)
// Test responsive (Chrome DevTools → Device Toolbar)
```

---

**Version**: 1.0  
**Last Updated**: 2026-07-30
