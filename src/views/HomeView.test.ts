import {mount} from "@vue/test-utils";
import {describe, expect, it} from "vitest";
import HomeView from "./HomeView.vue";

describe("HomeView", () => {
  it("should render", () => {
    const component = mount(HomeView);
    const el = component.element;
    expect(el).toBeInstanceOf(HTMLElement);
  });
});
