(() => {
  'use strict';
  const measurementId = 'G-RLL9J1Z7XV';
  const preferenceKey = 'ncf-analytics-consent-v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  let allowed = false;
  let loaded = false;
  let preference = null;
  try {
    const saved = JSON.parse(localStorage.getItem(preferenceKey));
    if (saved && typeof saved.allowed === 'boolean' && saved.expires > Date.now()) preference = saved;
  } catch (_) { /* A storage restriction must not prevent contacting us. */ }

  const panel = document.getElementById('analytics-choice');
  const status = document.getElementById('analytics-status');
  const settings = document.getElementById('analytics-settings');
  if (!panel || !settings) return;

  function startAnalytics() {
    if (loaded || !['noosaclearfencing.com.au', 'www.noosaclearfencing.com.au'].includes(location.hostname)) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    // Deliberately omit query strings, fragments and referrer paths.
    let referrer = '';
    try { referrer = new URL(document.referrer).origin; } catch (_) { /* Direct visit. */ }
    window.gtag('config', measurementId, {
      page_location: location.origin + (location.pathname === '/privacy.html' ? '/privacy.html' : '/'),
      page_referrer: referrer,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: lifetime / 1000
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(script);
  }

  function choose(value) {
    const wasLoaded = loaded;
    allowed = value;
    try { localStorage.setItem(preferenceKey, JSON.stringify({ allowed, expires: Date.now() + lifetime })); } catch (_) { /* Session-only choice. */ }
    panel.hidden = true;
    settings.setAttribute('aria-expanded', 'false');
    status.textContent = allowed ? 'Optional analytics enabled.' : 'Optional analytics disabled.';
    if (allowed) startAnalytics();
    else {
      window['ga-disable-' + measurementId] = true;
      // Remove this site's Analytics cookies when consent is withdrawn.
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim();
        if (name === '_ga' || name.startsWith('_ga_')) {
          for (const domain of ['', location.hostname, '.noosaclearfencing.com.au']) {
            document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' + (domain ? '; Domain=' + domain : '');
          }
        }
      }
      if (wasLoaded) location.reload();
    }
  }
  document.getElementById('analytics-accept').addEventListener('click', () => { window['ga-disable-' + measurementId] = false; choose(true); });
  document.getElementById('analytics-reject').addEventListener('click', () => choose(false));
  settings.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    settings.setAttribute('aria-expanded', String(!panel.hidden));
    if (!panel.hidden) document.getElementById('analytics-reject').focus();
  });
  if (preference) {
    allowed = preference.allowed;
    status.textContent = allowed ? 'Optional analytics enabled.' : 'Optional analytics disabled.';
    if (allowed) startAnalytics();
  } else panel.hidden = false;
  settings.setAttribute('aria-expanded', String(!panel.hidden));

  document.addEventListener('click', event => {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!allowed || !loaded || !link) return;
    const match = /^(tel|sms|mailto):/i.exec(link.getAttribute('href'));
    if (!match) return;
    const method = { tel: 'phone', sms: 'sms', mailto: 'email' }[match[1].toLowerCase()];
    // No phone number, email address, message body or customer details are sent.
    window.gtag('event', 'contact_click', { contact_method: method, transport_type: 'beacon' });
  });
})();
