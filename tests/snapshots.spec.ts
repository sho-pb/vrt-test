import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const storybookDir = resolve(__dirname, '..', 'storybook-static');

type StorybookEntry = {
  type: string;
  id: string;
  name: string;
  title: string;
  importPath: string;
  componentPath: string;
  tags: string[];
};

type StoryIndex = {
  v: number;
  entries: StorybookEntry[];
};

const data: StoryIndex = JSON.parse(
  readFileSync(resolve(storybookDir, 'index.json')).toString()
);

test.describe.parallel('visual regression testing', () => {
  Object.values(data.entries).forEach((story) => {
    test(`snapshot test ${story.title}: ${story.name}`, async ({ page }) => {
      await page.goto(`http://localhost:8080/iframe.html?id=${story.id}`, {
        waitUntil: 'networkidle',
      });
      expect(await page.screenshot({ fullPage: true })).toMatchSnapshot([
        story.title,
        `${story.id}.png`,
      ]);
    });
  });
});
