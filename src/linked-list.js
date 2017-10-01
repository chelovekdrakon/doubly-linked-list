const Node = require('./node');

class LinkedList {
    constructor() {
      this._head = null;
      this._tail = null;
      this.length = 0;
    }

    append(data) {
      let node = new Node(data);
      if (!this._head) {
          this._head = node;
          this._tail = node;
      } else {
          this._tail.next = node;
          node.prev = this._tail;
          this._tail = node;
      }
      this.length += 1;
      return this;
    }

    head() {
      if (!this._head) return null;
      return this._head.data;
    }

    tail() {
      if (!this._tail) return null;
      return this._tail.data;
    }

    findNode(index) {
      let current = this._head;
      let count = 0;
      while (current) {
         if (index === count) return current;
         current = current.next;
         count += 1;
      }
    }

    at(index) {
       return this.findNode(index).data;
    }

    insertAt(index, data) {
      if (this.length === 0) {
          this.append(data);
          return this;
      } else {
          let node = new Node(data);
          let curNode = this.findNode(index);
          if (index === 0) {
              this._head = node;
          } else {
              node.prev = curNode.prev;
              node.prev.next = node;
          }
          curNode.prev = node;
          node.next = curNode;
      }
      this.length += 1;
      return this;
    }

    isEmpty() {
      return (!this.length) ? true : false;
    }

    clear() {
      let current = this._tail;
      while(current != null) {
          let prev = current.prev;
          current.next = null;
          current.prev = null;
          current = prev;
      }
      this._head = null;
      this._tail = null;
      this.length = 0;
      return this;
    }

    deleteAt(index) {
      if (index === 0) {
          this.clear();
      } else {
          let delNode = this.findNode(index);
          let buffer = null;
          buffer = delNode.next;
          if (buffer) {
              buffer.prev = delNode.prev;
          }
          delNode.prev.next = buffer;
          this.length -= 1;
      }
      return this;
    }

    reverse() {
      if (this.length <= 1) {
          return this;
      }
      let current = this._head;
      let list = [];
      while (current) {
          list.push(current.data);
          current = current.next;
      }
      list.reverse();
      this.clear();
      for (let data of list) {
          this.append(data);
      }
      return this;
    }

    indexOf(data) {
      let current = this._head;
      let count = 0;
      while (current) {
          if (current.data === data) return count;
          current = current.next;
          count += 1;
      }
      return -1;
    }
}

module.exports = LinkedList;
