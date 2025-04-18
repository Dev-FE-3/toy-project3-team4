import { test, expect } from '@playwright/test'

test('하단 네비게이션 바의 모든 링크를 클릭해보기', async ({ page }) => {
  await page.goto('http://localhost:5173')

  // nav 안의 모든 a 태그를 찾음
  const navLinks = page.locator('nav a')
  const count = await navLinks.count()

  for (let i = 0; i < count; i++) {
    const link = navLinks.nth(i)
    const href = await link.getAttribute('href')

    // 클릭
    await link.click()

    // 간단하게 현재 URL이 해당 href를 포함하고 있는지 확인
    if (href) {
      await expect(page).toHaveURL(new RegExp(href.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')))
    }

    // 다시 메인 페이지로 이동 (선택사항)
    await page.goto('http://localhost:5173')
  }
})
