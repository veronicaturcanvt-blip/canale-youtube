import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Public HLS test streams (Apple's own official player-testing examples,
// and Mux's public demo stream) — stand-ins until real filmed practices
// exist. Swap these for real CDN manifest URLs later; nothing else about
// the API or the app needs to change.
const BIPBOP_16X9 =
  'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8';
const BIPBOP_4X3 =
  'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8';
const MUX_DEMO = 'https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU.m3u8';

function thumbnail(label: string, hexColor: string): string {
  return `https://placehold.co/400x225/${hexColor}/FFFFFF?text=${encodeURIComponent(label)}`;
}

const YOGA_COLOR = '87A878'; // sage green
const PILATES_COLOR = 'A9D6D6'; // aqua

const practices: Prisma.PracticeCreateInput[] = [
  {
    id: 'seed-yoga-none-5-morning',
    title: '5-Minute Morning Stretch',
    type: 'YOGA',
    durationMinutes: 5,
    equipment: 'NONE',
    difficulty: 'BEGINNER',
    bodyFocus: ['full body'],
    intensity: 'LOW',
    videoUrl: BIPBOP_16X9,
    thumbnailUrl: thumbnail('Morning Stretch', YOGA_COLOR),
  },
  {
    id: 'seed-yoga-mat-15-core',
    title: 'Core Awakening Flow',
    type: 'YOGA',
    durationMinutes: 15,
    equipment: 'MAT',
    difficulty: 'BEGINNER',
    bodyFocus: ['core'],
    intensity: 'MEDIUM',
    videoUrl: BIPBOP_4X3,
    thumbnailUrl: thumbnail('Core Flow', YOGA_COLOR),
  },
  {
    id: 'seed-yoga-mat-15-hips',
    title: 'Hip Opener Flow',
    type: 'YOGA',
    durationMinutes: 15,
    equipment: 'MAT',
    difficulty: 'INTERMEDIATE',
    bodyFocus: ['hips', 'flexibility'],
    intensity: 'MEDIUM',
    videoUrl: MUX_DEMO,
    thumbnailUrl: thumbnail('Hip Openers', YOGA_COLOR),
  },
  {
    id: 'seed-yoga-mat-30-vinyasa',
    title: 'Power Vinyasa',
    type: 'YOGA',
    durationMinutes: 30,
    equipment: 'MAT',
    difficulty: 'INTERMEDIATE',
    bodyFocus: ['full body', 'arms'],
    intensity: 'HIGH',
    videoUrl: BIPBOP_16X9,
    thumbnailUrl: thumbnail('Power Vinyasa', YOGA_COLOR),
  },
  {
    id: 'seed-yoga-mat-45-backbend',
    title: 'Advanced Backbend Journey',
    type: 'YOGA',
    durationMinutes: 45,
    equipment: 'MAT',
    difficulty: 'ADVANCED',
    bodyFocus: ['back', 'flexibility'],
    intensity: 'HIGH',
    videoUrl: BIPBOP_4X3,
    thumbnailUrl: thumbnail('Backbend Journey', YOGA_COLOR),
  },
  {
    id: 'seed-yoga-none-15-winddown',
    title: 'Bedtime Wind-Down',
    type: 'YOGA',
    durationMinutes: 15,
    equipment: 'NONE',
    difficulty: 'BEGINNER',
    bodyFocus: ['relaxation'],
    intensity: 'LOW',
    videoUrl: MUX_DEMO,
    thumbnailUrl: thumbnail('Wind-Down', YOGA_COLOR),
  },
  {
    id: 'seed-pilates-mat-15-core',
    title: 'Pilates Core Basics',
    type: 'PILATES',
    durationMinutes: 15,
    equipment: 'MAT',
    difficulty: 'BEGINNER',
    bodyFocus: ['core'],
    intensity: 'MEDIUM',
    videoUrl: BIPBOP_16X9,
    thumbnailUrl: thumbnail('Pilates Core', PILATES_COLOR),
  },
  {
    id: 'seed-pilates-none-5-abs',
    title: 'Quick Ab Burner',
    type: 'PILATES',
    durationMinutes: 5,
    equipment: 'NONE',
    difficulty: 'INTERMEDIATE',
    bodyFocus: ['core'],
    intensity: 'HIGH',
    videoUrl: BIPBOP_4X3,
    thumbnailUrl: thumbnail('Ab Burner', PILATES_COLOR),
  },
  {
    id: 'seed-pilates-mat-30-legs',
    title: 'Lean Legs Pilates',
    type: 'PILATES',
    durationMinutes: 30,
    equipment: 'MAT',
    difficulty: 'INTERMEDIATE',
    bodyFocus: ['legs', 'glutes'],
    intensity: 'MEDIUM',
    videoUrl: MUX_DEMO,
    thumbnailUrl: thumbnail('Lean Legs', PILATES_COLOR),
  },
  {
    id: 'seed-pilates-reformer-30-fundamentals',
    title: 'Reformer Fundamentals',
    type: 'PILATES',
    durationMinutes: 30,
    equipment: 'REFORMER',
    difficulty: 'BEGINNER',
    bodyFocus: ['full body'],
    intensity: 'MEDIUM',
    videoUrl: BIPBOP_16X9,
    thumbnailUrl: thumbnail('Reformer Basics', PILATES_COLOR),
  },
  {
    id: 'seed-pilates-reformer-45-sculpt',
    title: 'Reformer Power Sculpt',
    type: 'PILATES',
    durationMinutes: 45,
    equipment: 'REFORMER',
    difficulty: 'ADVANCED',
    bodyFocus: ['full body', 'core'],
    intensity: 'HIGH',
    videoUrl: BIPBOP_4X3,
    thumbnailUrl: thumbnail('Power Sculpt', PILATES_COLOR),
  },
  {
    id: 'seed-pilates-mat-45-fullbody',
    title: 'Full-Body Pilates Sculpt',
    type: 'PILATES',
    durationMinutes: 45,
    equipment: 'MAT',
    difficulty: 'ADVANCED',
    bodyFocus: ['full body'],
    intensity: 'HIGH',
    videoUrl: MUX_DEMO,
    thumbnailUrl: thumbnail('Full-Body Sculpt', PILATES_COLOR),
  },
];

async function main() {
  for (const practice of practices) {
    const { id, ...rest } = practice;
    await prisma.practice.upsert({
      where: { id: id as string },
      create: practice,
      update: rest,
    });
  }
  console.log(`Seeded ${practices.length} practices.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
