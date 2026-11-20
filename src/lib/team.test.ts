import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { team } from "@data/team";

describe("data/team.ts", () => {
  it("incluye al fundador y a la diseñadora", () => {
    expect(team.map((m) => m.id)).toEqual(["yanni-fernandez", "kamila-aiguesvives"]);
  });

  it.each(team)("$name: el CV existe en /public y pesa menos de 2 MB", (member) => {
    if (!member.cvUrl) return;
    const file = path.join(process.cwd(), "public", member.cvUrl);
    expect(existsSync(file), member.cvUrl).toBe(true);
    expect(statSync(file).size).toBeLessThan(2 * 1024 * 1024);
  });

  it.each(team)("$name: textos completos en ES y EN", (member) => {
    expect(member.bio.es.length).toBeGreaterThan(40);
    expect(member.bio.en.length).toBeGreaterThan(40);
    expect(member.skills.en).toHaveLength(member.skills.es.length);
  });
});
