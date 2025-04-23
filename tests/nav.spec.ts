import { test, expect } from '@playwright/test'

test('하단 네비게이션 바의 모든 링크를 클릭해보기', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const navLinks = page.locator('nav a')
  const count = await navLinks.count()

  for (let i = 0; i < count; i++) {
    const link = navLinks.nth(i)
    const href = await link.evaluate((el) => el.getAttribute('href'))

    await link.click()

    if (href) {
      await expect(page).toHaveURL(new RegExp(href.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')))
    }

    await page.goto('http://localhost:5173')
  }
})
