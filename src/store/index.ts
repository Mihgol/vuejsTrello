import Vue from 'vue'
import Vuex from 'vuex'
import { Data } from './Data';
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

// Board > List > Item

export interface IState {
  lists: Data.List[]
}

export interface IAddItem {
  listIndex: number,
  itemIndex: number | null,
  title: string,
  description: string,
  date?: Date
}

export interface IMoveItem {
  sourceListIndex: number,
  sourceItemIndex: number,
  targetListIndex: number,
  targetItemIndex: number,
}

export default new Vuex.Store({
  state: {
    lists: [],
  },
  mutations: {
    addList(state: IState, { title }): void {
      state.lists.push(new Data.List(title));
    },
    removeItem(state: IState, { itemIndex, listIndex }): void {
      state.lists[listIndex].items.splice(itemIndex, 1);
    },
    addItem(state: IState, { listIndex, itemIndex, title, description, date }: IAddItem): void {
      if (itemIndex !== null && itemIndex !== undefined) {
        state.lists[listIndex].items.splice(itemIndex, 0, new Data.Item(title, description, date));
      } else {
        state.lists[listIndex].items.push(new Data.Item(title, description));
      }
    },
    moveList(state: IState, { from, to }: { from: number, to: number }): void {
      state.lists.splice(to, 0, state.lists.splice(from, 1)[0]);
    },
    removeList(state: IState, listIndex) {
      state.lists.splice(listIndex, 1);
    },
    sample(state: IState) {
      if (state.lists.length < 1) {
        state.lists.push(new Data.List("Plan for an app", [new Data.Item("Learn to code", ""), new Data.Item("Code a lot", ""), new Data.Item("Cry...", ""), new Data.Item("Don't give up", ""), new Data.Item("Kick a$$", "")]))
      }
    }
  },
  actions: {
  },
  modules: {
  },
  //@ts-ignore
  plugins: [new VuexPersistence().plugin]
})

