import { test, expect } from '@playwright/test'

test('검색 버튼 클릭 후 검색어 입력', async ({ page }) => {
  await page.goto('http://localhost:5173')

  // 검색 버튼 클릭
  await page.locator('header .cursor-pointer').last().click()

  // 검색 input에 '아이유' 입력
  const input = page.locator('input[name="search"]')
  await input.fill('아이유')
  await input.press('Enter')

  // URLSearchParams로 쿼리 파라미터 확인
  const currentUrl = new URL(page.url())
  const query = currentUrl.searchParams.get('q')

  expect(currentUrl.pathname).toBe('/search')
  expect(query).toBe('아이유')
})
