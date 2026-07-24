import { access, readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');
const expectText = (source, value, label) => {
  if (!source.includes(value)) throw new Error(`${label}: missing ${value}`);
};

const index = await read('src/pages/index.astro');
const travel = await read('src/pages/travel.astro');
const readme = await read('README.md');

[
  'data-skill-story="tennis"',
  'data-skill-story="go"',
  'data-skill-story="violin"',
  'data-skill-story="imsc"',
  'data-skill-story="music"',
  'https://github.com/noah200910070082-dotcom/fieldguard-ai',
  'https://github.com/noah200910070082-dotcom/ai-transit-station',
  'https://www.youtube.com/results?search_query=',
].forEach((value) => expectText(index, value, 'homepage'));

['travel-landscape-divider', 'WASHINGTON, D.C.', 'data-landscape-depth', '.landscape-copy.travel-reveal.is-visible'].forEach((value) =>
  expectText(travel, value, 'travel page'),
);

['```mermaid', 'FieldGuard AI', 'AI Transit Station', 'https://www.noahxu.org/travel'].forEach((value) =>
  expectText(readme, value, 'README'),
);

await Promise.all([
  'src/assets/skills/tennis-championship.jpg',
  'src/assets/skills/violin-portrait.jpg',
  'src/assets/skills/go-ranking-event.jpg',
  'src/assets/skills/music-concert.jpg',
  'src/assets/travel/abroad-washington-hotel.jpg',
  'src/assets/travel/abroad-washington-monument.jpg',
].map(access));

console.log('Profile contracts verified.');
