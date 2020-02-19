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
      if (itemIndex !== null) {
        console.log(`added ${title} to list ${listIndex} at position ${itemIndex}`);
        state.lists[listIndex].items.splice(itemIndex, 0, new Data.Item(title, description, date));
      } else {
        console.log(`added ${title} to list ${listIndex}`);
        state.lists[listIndex].items.push(new Data.Item(title, description));
      }
    },
    moveList(state: IState, { from, to }: { from: number, to: number }): void {
      state.lists.splice(to, 0, state.lists.splice(from, 1)[0]);
    },
    removeItem(state: IState, { itemIndex, listIndex }): void {
      console.log(`removed ${itemIndex} from list ${listIndex}`);
      state.lists[listIndex].items.splice(itemIndex, 1);
    }
  },
  actions: {
  },
  modules: {
  }
})

