import { store } from 'react-easy-state'
import getFakeLines from '../utils/fakes/index'

const state = store({
  // DATA
  user: {},
  subs: {},
  ui: {
    activeTab: 0,
    tabs: [
      // linesRead defines the amount of lines the terminal 
      // has 'ran' through
      { id: 0, name: 'Default (node.js)', lines: [], linesRead: 0 }
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
  getActiveTab () {
    return state.ui.tabs[state.ui.activeTab]
  },
  // Fake runner
  runFake ({ type }) {
    const active = this.getActiveTab()
    active.lines = getFakeLines()
    active.linesRead = 0
  },
  isLinesFinished () {
    const active = this.getActiveTab()
    return active.lines.length === active.linesRead
  },
  setLinesFinished () {
    const active = this.getActiveTab()
    active.linesRead = active.lines.length
  },
  addNewLines ({ lines = [] }) {
    const active = this.getActiveTab()
    active.lines = [...active.lines, { first: { text: 'Hello world' } }]
    active.linesFinished = false
  }
 })

export default state