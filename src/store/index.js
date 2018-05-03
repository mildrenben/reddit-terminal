import { store } from 'react-easy-state'
import getFakeLines from '../utils/fakes/index'
import getData, { getSub, getMoreSub } from '../utils/request'
import o from '../options'

const state = store({
  // DATA
  user: {},
  subs: {},
  cmd: [],
  ui: {
    activeTab: 0,
    tabs: [
      // linesRead defines the amount of lines the terminal 
      // has 'ran' through
      { id: 0, name: 'Default (node.js)', lines: [], linesRead: 0 }
    ],
    cmdArrowPosition: 0,
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
    active.lines = [...active.lines, ...getFakeLines()]
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
    active.lines = [...active.lines, ...lines]
  },

  // Cmd - command line history
  async command({ message }) {
    // Write to cmd history. Only go to the history limit
    state.cmd = state.cmd.length === o.COMMAND_LINE_HISTORY_LENGTH
      ? [...state.cmd.slice(1), message]
      : [message, ...state.cmd]

    // Reset the cmdArrowPosition
    state.ui.cmdArrowPosition = 0

    if (message === 'next') {
      if (state.cmd.length < 2) {
        state.addNewLines({ lines: [{ first: { text: 'Nothing to hit next on', color: 'red' } }] })
        return
      } else {
        const prevCmd = state.cmd.find(item => item !== 'next')
        const [sub, type, time] = prevCmd.split(' ')
        const listing = await getMoreSub({ sub, type })
        state.subs[sub][type] = listing
        state.addNewLines({
          lines: state.subs[sub][type].slice(o.NEXT_AMOUNT * -1).map(item => ({
            number: item.ups - item.downs,
            first: { text: item.title },
            second: { text: item.url },
            third: { text: item.num_comments }
          }))
        })
      }
    } else {
      const [sub, type, time] = message.split(' ')
      const listing = await getSub({sub, type, time})

      if (!state.subs[sub]) state.subs[sub] = {}
      state.subs[sub][type] = listing

      state.addNewLines({
        lines: listing.map(item => ({
          number: item.ups - item.downs,
          first: { text: item.title },
          second: { text: item.url },
          third: { text: item.num_comments }
        }))
      })
    }
  }
 })

export default state