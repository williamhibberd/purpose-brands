import { getCollection, getEntry } from 'astro:content';

export async function getSettings() {
  const entry = await getEntry('settings', 'site');
  if (!entry) throw new Error('Missing settings/site content entry');
  return entry.data;
}

export async function getPrimaryContact() {
  const entry = await getEntry('contacts', 'phoebe');
  if (!entry) throw new Error('Missing contacts/phoebe content entry');
  return entry.data;
}

export async function getSecondaryContact() {
  const entry = await getEntry('contacts', 'biraj');
  if (!entry) throw new Error('Missing contacts/biraj content entry');
  return entry.data;
}

export async function getNavItems() {
  return (await getCollection('navItems')).sort((a, b) => a.data.order - b.data.order);
}

export async function getClientLogos() {
  return (await getCollection('clientLogos')).sort((a, b) => a.data.order - b.data.order);
}

export async function getFooter() {
  const entry = await getEntry('footer', 'footer');
  if (!entry) throw new Error('Missing footer content entry');
  return entry.data;
}

export function bookCallHref(calendly: string): string {
  return calendly || '/contact';
}
