import { observable, action, computed } from 'mobx';

export default class MarketStore {
  @observable selectedItems = [];
  @observable coupon = null;

  @action.bound
  pushItem = (id, price) => {
    if ( this.selectedItems.map(i=>i.id).indexOf(id) === -1 ) {
      this.selectedItems.push({
        id: id,
        count: 1,
        price: price,
        checked: true,
        coupon: null
      });
    }
  };

  @action
  getLength = () => {
    return this.selectedItems.length;
  }
  
  @action
  popItem = (id) => {
    var index = this.selectedItems.map(i=>i.id).indexOf(id);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    }
  };

  @action
  getItem = (id) => {
    return this.selectedItems.find(item=>item.id === id);
  }

  @action
  changeCount = (id, count) => {
    this.selectedItems.find(item=>item.id === id).count = count;
  }

  @action
  changeCoupon = (id, coupon) => {
    this.selectedItems.find(item=>item.id === id).coupon = coupon;
  }

  @action
  toggleChecked = (id, checked) => {
    let item = this.selectedItems.find(item=>item.id === id);
    item.checked = !item.checked;
  }

  @action
  setCoupon = (coupon) => {
    this.coupon = coupon;
    console.log(this.coupon);
  }

  @computed
  get total(){
    return this.selectedItems.reduce((privious, current) => {
      if(current.checked){
        if(this.coupon){
          if(this.coupon.type === 'rate'){
            
          }
        }
        return privious + ( current.price * current.count );
      } else {
        return privious;
      }
    }, 0);
  }

}