import Vue from 'vue'
import Vuex from 'vuex'
import { Data } from './Data';

export class Utils {
  static listById(lists: Data.List[], id: string): Data.List {
    return lists.find(list => list.id === id) as Data.List;
  }
}


Vue.use(Vuex)

// Board > List > Item

export interface IState {
  lists: Data.List[]
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
      state.lists.push(new Data.List(title));
    },
    addItem(state: IState, { listId, title, description }: IAddItem): void {
      Utils.listById(state.lists, listId).items.push(new Data.Item(title, description));
    }
  },
  actions: {
  },
  modules: {
  }
})

