import Vue from 'vue'
import Vuex from 'vuex'
import { Data } from './Data';

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
    addItem(state: IState, { listIndex, itemIndex, title, description, date }: IAddItem): void {
      if (itemIndex) {
        state.lists[listIndex].items.splice(itemIndex, 0, new Data.Item(title, description, date));
      } else {
        state.lists[listIndex].items.push(new Data.Item(title, description));
      }

    },
    moveItem(state: IState, { sourceListIndex, targetListIndex, sourceItemIndex, targetItemIndex }: IMoveItem) {
      state.lists[targetListIndex].items.splice(targetItemIndex, 0, state.lists[sourceListIndex].items.splice(sourceItemIndex, 1)[0]);
    },
    moveList(state: IState, { from, to }: { from: number, to: number }): void {
      state.lists.splice(to, 0, state.lists.splice(from, 1)[0]);
    },
    removeItem(state: IState, { itemIndex, listIndex }): void {
      state.lists[listIndex].items.splice(itemIndex, 1);
    }
  },
  actions: {
  },
  modules: {
  }
})

