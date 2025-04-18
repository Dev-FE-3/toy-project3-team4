import { test, expect } from '@playwright/test'

test('검색 버튼 클릭 후 검색어 입력', async ({ page }) => {
  await page.goto('http://localhost:5173')

  // 검색 버튼 클릭 (cursor-pointer인 Search 아이콘)
  await page.locator('header .cursor-pointer').last().click()

  // 검색 input에 '아이유' 입력
  const input = page.locator('input[name="search"]')
  await input.fill('아이유')
  await input.press('Enter')

  // 페이지가 /search?q=아이유 로 이동했는지 확인
  await expect(page).toHaveURL(/\/search\?q=%EC%95%84%EC%9D%B4%EC%9C%A0/)

  // 또는 검색 결과에서 뭔가가 보이는지 확인
  // await expect(page.getByText('아이유')).toBeVisible()
})
