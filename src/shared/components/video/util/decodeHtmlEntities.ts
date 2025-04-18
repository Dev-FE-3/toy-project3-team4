/**
 * HTML 엔티티로 인코딩된 문자열을 디코딩합니다.
 * 예: "&quot;Hello&quot;" -> "\"Hello\""
 */
const decodeHtmlEntities = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.documentElement.textContent || html
}

export default decodeHtmlEntities
