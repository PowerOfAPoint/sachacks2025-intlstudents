import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { db } from "@/lib/db";
import { Group, group } from "@/lib/db/forum";
import { exit } from "process";

const mockGroups: Omit<Group, "id">[] = [
  {
    name: "Internship",
    slug: "internship",
  },
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
    await db.insert(group).values(mockGroups).onConflictDoNothing();
    console.info("done");
  } catch (e) {
    console.error(e);
  }

  exit(0); // process hangs without this
}

seed();
