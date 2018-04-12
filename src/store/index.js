import { store } from 'react-easy-state'
import getFakeLines from '../utils/fakes/index'

const state = store({
  // DATA
  user: {},
  subs: {},
  ui: {
    activeTab: 0,
    tabs: [
      // linesFinished defines whether the terminal should run through those
      // lines when it becomes the active tab
      { id: 0, name: 'Default (node.js)', lines: [], linesFinished: false }
    ]
  },

  // ACTIONS
  // Tabs
  addTab () {
    const { length } = state.ui.tabs
    state.ui.tabs.push({ id: length, name: 'node.js', lines: [] })
    state.ui.activeTab = length
  },
  // I started with a structure of using only one object as
  // a function arg and that I'd destructure it below. This is obv great
  // for larger funcs, but turns out all mine only had like 1 arg lol, it was
  // too late to turn back as I couldn't be bothered to change style
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
    state.ui.tabs[state.ui.activeTab].linesFinished = false
    state.ui.tabs[state.ui.activeTab].lines = getFakeLines()
  },
  setLinesFinished () {
    state.ui.tabs[state.ui.activeTab].linesFinished = true
  }
})

export default state