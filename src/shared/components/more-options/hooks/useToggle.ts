import { useState, useCallback } from 'react'

export const useToggle = (initialState = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState)

  const toggle = useCallback(() => {
    setState((prev) => !prev)
  }, [])

  return [state, toggle]
}
