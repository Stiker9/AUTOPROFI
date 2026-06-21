import { describe, it, expect } from "vitest";
import {
  getCars,
  getCarBySlug,
  getMakes,
  getModelsByMake,
  getYearsByMakeModel,
  getGenerationByMakeModelYear,
  getProductsForCar,
  getProductsByCategory,
  getLatestBlogPosts,
} from "./data";

describe("getCars", () => {
  it("returns non-empty array", () => {
    expect(getCars().length).toBeGreaterThan(0);
  });
  it("every car has required fields", () => {
    getCars().forEach((c) => {
      expect(c.slug).toBeTruthy();
      expect(c.brand).toBeTruthy();
      expect(c.model).toBeTruthy();
      expect(c.yearFrom).toBeGreaterThan(1970);
    });
  });
});

describe("getCarBySlug", () => {
  it("finds existing car", () => {
    const car = getCarBySlug("toyota-rav4-xa50");
    expect(car).toBeDefined();
    expect(car!.brand).toBe("Toyota");
    expect(car!.generation).toBe("XA50");
  });
  it("returns undefined for unknown slug", () => {
    expect(getCarBySlug("nonexistent-car")).toBeUndefined();
  });
});

describe("getMakes", () => {
  it("returns sorted unique makes", () => {
    const makes = getMakes();
    expect(makes).toContain("Toyota");
    expect(makes).toContain("Kia");
    expect(new Set(makes).size).toBe(makes.length);
    expect([...makes].sort()).toEqual(makes);
  });
});

describe("getModelsByMake", () => {
  it("returns models for Toyota", () => {
    const models = getModelsByMake("Toyota");
    expect(models).toContain("RAV4");
  });
  it("returns empty array for unknown make", () => {
    expect(getModelsByMake("UnknownBrand")).toEqual([]);
  });
});

describe("getYearsByMakeModel", () => {
  it("expands year range correctly", () => {
    const years = getYearsByMakeModel("Toyota", "RAV4");
    expect(years).toContain(2013);
    expect(years).toContain(2019);
    expect(years).toContain(new Date().getFullYear());
  });
  it("returns years newest-first", () => {
    const years = getYearsByMakeModel("Toyota", "RAV4");
    expect(years[0]).toBeGreaterThan(years[years.length - 1]);
  });
  it("returns empty for unknown model", () => {
    expect(getYearsByMakeModel("Toyota", "Corolla")).toEqual([]);
  });
});

describe("getGenerationByMakeModelYear", () => {
  it("resolves 2020 to RAV4 XA50 (2019–н.в.)", () => {
    const car = getGenerationByMakeModelYear("Toyota", "RAV4", 2020);
    expect(car).toBeDefined();
    expect(car!.slug).toBe("toyota-rav4-xa50");
  });
  it("resolves 2015 to RAV4 XA40 (2012–2018)", () => {
    const car = getGenerationByMakeModelYear("Toyota", "RAV4", 2015);
    expect(car).toBeDefined();
    expect(car!.slug).toBe("toyota-rav4-xa40");
  });
  it("returns undefined for year outside all ranges", () => {
    const car = getGenerationByMakeModelYear("Toyota", "RAV4", 1990);
    expect(car).toBeUndefined();
  });
});

describe("getProductsForCar", () => {
  it("returns products for known carSlug", () => {
    const prods = getProductsForCar("lada-vesta");
    expect(prods.length).toBeGreaterThan(0);
    prods.forEach((p) => {
      expect(p.fitsCars).toContain("lada-vesta");
    });
  });
  it("returns empty for unknown carSlug", () => {
    expect(getProductsForCar("unknown-car-0-2000")).toEqual([]);
  });
});

describe("getProductsByCategory", () => {
  it("filters towbars", () => {
    const towbars = getProductsByCategory("towbars");
    expect(towbars.length).toBeGreaterThan(0);
    towbars.forEach((p) => expect(p.category).toBe("towbars"));
  });
  it("filters electrics", () => {
    const electrics = getProductsByCategory("electrics");
    electrics.forEach((p) => expect(p.category).toBe("electrics"));
  });
});

describe("getLatestBlogPosts", () => {
  it("returns posts sorted by date descending", () => {
    const posts = getLatestBlogPosts(3);
    expect(posts.length).toBeLessThanOrEqual(3);
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(posts[i - 1].date) >= new Date(posts[i].date)).toBe(true);
    }
  });
  it("respects limit", () => {
    expect(getLatestBlogPosts(1).length).toBe(1);
    expect(getLatestBlogPosts(2).length).toBe(2);
  });
});
