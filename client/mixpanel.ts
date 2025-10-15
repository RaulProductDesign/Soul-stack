import mixpanel from 'mixpanel-browser';

mixpanel.init('5463b005fe8187d776de3095c3865c46', {
  debug: true,
  track_pageview: true,
  autocapture: true,
  persistence: 'localStorage',
});

export function trackCategorySelected(category: "friends" | "partner" | "family") {
    mixpanel.track("Category Selected", {
      category,
    });
  }
