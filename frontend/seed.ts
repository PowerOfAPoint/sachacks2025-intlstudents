import { db } from "@/lib/db";
import { Group, group } from "@/lib/db/forum";

const mockGroups: Omit<Group, "id">[] = [
  {
    name: "CPT",
    slug: "cpt",
  },
  {
    name: "OPT",
    slug: "opt",
  },
  {
    name: "STEM OPT",
    slug: "stem-opt",
  },
  {
    name: "Cap-Gap",
    slug: "cap-gap",
  },
  {
    name: "H-1B",
    slug: "h-1b",
  },
];

async function seed() {
  console.info("Seeding db");

  try {
    await db.insert(group).values(mockGroups);
  } catch (e) {
    console.error(e);
  }
}

seed();
