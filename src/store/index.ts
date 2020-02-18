import Vue from 'vue'
import Vuex from 'vuex'
import { Item, List } from './Data';

export class Utils {
  static listById(lists: List[], id: string): List {
    return lists.find(list => list.id === id) as List;
  }
}


Vue.use(Vuex)

// Board > List > Item

export interface IState {
  lists: List[]
}

export interface IAddItem {
  listId: string,
  title: string,
  description: string,
}

export default new Vuex.Store({
  state: {
    lists: [],
  },
  mutations: {
    addList(state: IState, { title }): void {
      state.lists.push(new List(title));
    },
    addItem(state: IState, { listId, title, description }: IAddItem): void {
      Utils.listById(state.lists, listId).items.push(new Item(title, description));
    }
  },
  actions: {
  },
  modules: {
  }
})

