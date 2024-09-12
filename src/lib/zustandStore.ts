import { create, StateCreator } from 'zustand'
import { devtools, persist, PersistOptions } from 'zustand/middleware'

// Helper function để tạo store với middleware (devtools và persist)
export const createStore = <T>(
  store: StateCreator<T, [['zustand/devtools', never], ['zustand/persist', unknown]], []>,
  storeName: string
) => {
  return create<T>()(
    devtools(
      persist(store, {
        name: storeName
      } as PersistOptions<T>)
    )
  )
}
