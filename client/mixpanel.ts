import mixpanel from 'mixpanel-browser';

mixpanel.init('5463b005fe8187d776de3095c3865c46', {
  debug: true,
  track_pageview: true,
  persistence: 'localStorage',
});

// Export para usarlo en cualquier parte
export default mixpanel;
