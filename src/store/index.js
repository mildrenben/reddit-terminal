import { store } from 'react-easy-state'

const state = store({
  // DATA
  user: {},
  subs: {},
  ui: {
    activeTab: 0,
    tabs: [
      { id: 0, name: 'Default (node.js)' }
    ],
    fakeRun: null
  },

  // ACTIONS
  // Tabs
  addTab () {
    const { length } = state.ui.tabs
    state.ui.tabs.push({ id: length, name: 'node.js' })
    state.ui.activeTab = length
  },
  removeTab ({ id }) {
    const { tabs, activeTab } = state.ui
    const remainingTabs = [...tabs.slice(0, id), ...tabs.slice(id + 1)]
    // After a tab is removed, they all need a new order number
    const newTabs = remainingTabs.map((tab, idx) => ({ ...tab, id: idx }))
    state.ui.tabs = newTabs
    if (activeTab === newTabs.length) {
      state.ui.activeTab = newTabs.length - 1
    }
  },
  makeTabActive ({ id }) {
    state.ui.activeTab = id
  },
  // Fake runner
  runFake ({ type }) {
    state.ui.fakeRun = type
  },
  stopFake () {
    state.ui.fakeRun = null
  }
})

export default state