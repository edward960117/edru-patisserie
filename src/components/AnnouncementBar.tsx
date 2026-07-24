/**
 * Slim top announcement strip — mirrors the reference site's thin banner
 * above the main header used to surface pre-order / delivery messaging.
 */
export default function AnnouncementBar() {
  return (
    <div className="bg-charcoal text-cream text-center text-xs sm:text-sm py-2 px-4 tracking-wide">
      Order online for pickup or delivery — freshly baked, every day
    </div>
  );
}
