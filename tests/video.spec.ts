import { test, expect } from '@playwright/test'

test('동영상 썸네일 클릭 시 /watch?video 로 이동하는지 확인', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const thumbnail = page.locator('img[alt="동영상 썸네일"]').first()
  await thumbnail.click()

  // /watch?video=로 시작하는지 정규식으로 확인
  await expect(page).toHaveURL(/\/watch\?video=.*/)
})
