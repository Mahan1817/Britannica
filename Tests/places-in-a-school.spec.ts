import { test, expect, Page } from '@playwright/test';
import 'dotenv/config';

const BASE_URL = process.env.BASE_URL!;
const EMAIL = process.env.STUDENT_EMAIL!;
const PASSWORD = process.env.STUDENT_PASSWORD!;

test.describe('Student - Places in a School Activity', () => {
  test.setTimeout(120000);

  async function playSound(page: Page) {
    const playSoundButton = page.getByRole('button', {
      name: 'Play Sound',
    });

    await expect(playSoundButton).toBeVisible({ timeout: 15000 });
    await expect(playSoundButton).toBeEnabled({ timeout: 15000 });
    await playSoundButton.click();
  }

  async function selectAnswer(page: Page, answer: RegExp) {
    const answerButton = page.getByRole('button', {
      name: answer,
    });

    await expect(answerButton).toBeVisible({ timeout: 15000 });
    await expect(answerButton).toBeEnabled({ timeout: 15000 });
    await answerButton.click();
  }

  test('Student can complete Places in a School successfully', async ({
    page,
  }) => {
    // Login
    await page.goto(BASE_URL, {
      waitUntil: 'domcontentloaded',
    });

    await expect(
      page.getByRole('textbox', { name: 'Email or username' })
    ).toBeVisible();

    await page
      .getByRole('textbox', { name: 'Email or username' })
      .fill(EMAIL);

    await page
      .getByRole('textbox', { name: 'Password' })
      .fill(PASSWORD);

    await page.getByRole('button', { name: 'Sign in' }).click();

    // Navigate to the activity
    await expect(
      page.getByRole('button', { name: 'Home Page' })
    ).toBeVisible({ timeout: 20000 });

    await page.getByRole('button', { name: 'Home Page' }).click();

    const schoolTopicIcon = page
      .locator('path[fill="#FF9F4C"]')
      .first();

    await expect(schoolTopicIcon).toBeVisible({ timeout: 15000 });
    await schoolTopicIcon.click();

    const placesInSchool = page.getByRole('button', {
      name: '1 Places in a School',
    });

    await expect(placesInSchool).toBeVisible({ timeout: 15000 });
    await placesInSchool.click();

    // Start the activity
    const letsGoButton = page.getByRole('button', {
      name: "Let's Go",
    });

    await expect(letsGoButton).toBeVisible({ timeout: 15000 });
    await letsGoButton.click();

    await expect(
      page.getByRole('button', { name: 'Play Sound' })
    ).toBeVisible({ timeout: 15000 });

    // Complete the first set of questions
    await playSound(page);
    await selectAnswer(page, /A library, labeled.*Library/i);

    await playSound(page);
    await selectAnswer(page, /A cafeteria, labeled/i);

    await playSound(page);
    await selectAnswer(page, /A gym, labeled.*Gym - Third/i);

    await playSound(page);
    await selectAnswer(page, /A science lab, labeled/i);

    await playSound(page);
    await selectAnswer(page, /A music room, labeled.*Music/i);

    // Continue to the next set
    const continueGameButton = page.getByRole('button', {
      name: 'Continue Game',
    });

    await expect(continueGameButton).toBeVisible({ timeout: 15000 });
    await continueGameButton.click();

    // Complete the remaining questions
    await playSound(page);
    await selectAnswer(page, /A classroom, labeled/i);

    await playSound(page);
    await selectAnswer(page, /An art room, labeled/i);

    await playSound(page);
    await selectAnswer(
      page,
      /A principal['’]s office, labeled/i
    );

    await playSound(page);
    await selectAnswer(page, /A computer lab, labeled/i);

    await playSound(page);
    await selectAnswer(
      page,
      /Nurse['’]s office, labeled/i
    );

    // Verify completion and results
    await expect(
      page.getByText("That’s the way!")
    ).toBeVisible({ timeout: 15000 });

    const resultMessage = page.getByText(
      /WOW, you got a score of/i
    );

    await expect(resultMessage).toBeVisible({ timeout: 15000 });

    const resultText = await resultMessage.innerText();
    console.log('Result:', resultText);

    const scoreMatch = resultText.match(/score of\s*(\d+)/i);

    expect(scoreMatch).not.toBeNull();

    const score = Number(scoreMatch![1]);

    console.log(`Final Score: ${score}/100`);

    expect(score).toBeGreaterThanOrEqual(60);

    await expect(
      page.getByText(/got all the stars/i)
    ).toBeVisible({ timeout: 15000 });

    console.log(`Stars Earned: 3/3`);
    console.log(`Activity Status: PASSED`);
  });
});