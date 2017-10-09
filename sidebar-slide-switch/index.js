;(function() {

  // 菜单列表构造函数，位置放在Sidebar之前声明，因为在Sidebar中调用了
  var Menubar = function() {
    this.el = document.querySelector('#sidebar ul');
    this.state = 'allClosed';   // hasOpened

    // 过滤ul菜单列表
    this.el.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    var self = this;
    this.currentOpendMenuContent = null;    // 记录当前打开的
    this.menuList = document.querySelectorAll('#sidebar ul > li');
    for(var i = 0; i < this.menuList.length; i++) {
      this.menuList[i].addEventListener('click', function(e) {
        // 通过对应的id,获取到菜单对应内容
        var menuContentEl = document.getElementById(e.currentTarget.id + '-content');
        // console.log(e.currentTarget.id)
        if (self.state === 'allClosed') {   // 第一次打开，不用关闭上一个
          // 如果没有打开的
          console.log('第一次打开' + menuContentEl.id);
          classie.remove(menuContentEl, 'menuContent-move-left');
          classie.add(menuContentEl, 'menuContent-move-right');
          // 改状态，加记录
          self.state = 'hasOpened';
          self.currentOpendMenuContent = menuContentEl;   // 记录当前这个
        } else {
          // 如果有打开的
          console.log('关闭上一个' + self.currentOpendMenuContent.id);
          classie.remove(self.currentOpendMenuContent, 'menuContent-move-up');
          classie.add(self.currentOpendMenuContent, 'menuContent-move-left');

          console.log('打开当前' + menuContentEl.id);
          classie.remove(menuContentEl, 'menuContent-move-right');
          classie.remove(menuContentEl, 'menuContent-move-left');
          classie.add(menuContentEl, 'menuContent-move-up');
          // 改状态，加记录
          self.state = 'hasOpened';
          self.currentOpendMenuContent = menuContentEl;
        }
      });
    };
    // 获取收缩按钮
    this.menuContentList = document.querySelectorAll('.nav-content > div.nav-con-close');
    for(var i = 0; i < this.menuContentList.length; i++) {
      this.menuContentList[i].addEventListener('click', function(e){
        var menuContents = e.currentTarget.parentNode;    // 拿到父级
        console.log(menuContents)
        classie.remove(menuContents, 'menuContent-move-up');
        classie.add(menuContents, 'menuContent-move-left');
        // 关闭后设置状态
        self.state = 'allClosed';
      })
    }
  };

  // 声明Sidebar构造函数
  var Sidebar = function(eId, closeBarId) {
    this.state = 'opened';      // 状态
    this.el = document.getElementById(eId || 'sidebar');
    this.closeBarEl = document.getElementById(closeBarId || 'closeBar');

    // 同时new菜单列表，把menubar做Sidebar的子类
    this.menubar = new Menubar();
    var self = this;
    // 给整个div加事件，通过反向过滤掉不相干的元素
    this.el.addEventListener('click', function(event) {
      // console.log(event.target)
      // 过滤自己本身，这个大的div
      if(event.target !== self.el){
        self.triggerSwich();
      }
    });
  };

  // 添加原型方法
  Sidebar.prototype.close = function() {
    console.log('关闭sidebar')
    // 先删除之前的class
    classie.remove(this.el, 'sidebar-move-right');
    classie.remove(this.closeBarEl, 'closeBar-move-left');
    // sidebar添加动画
    classie.add(this.el, 'sidebar-move-left');
    // 给底部关闭按钮加动画
    classie.add(this.closeBarEl, 'closeBar-move-right');
    // 关闭的时候，把打开的菜单也关闭掉
    if(this.menubar.currentOpendMenuContent){
      classie.remove(this.menubar.currentOpendMenuContent, 'menuContent-move-up');
      classie.add(this.menubar.currentOpendMenuContent, 'menuContent-move-left');
      // 并且修改状态
      this.menubar.state = 'allClosed';
    }
    this.state = 'closed';
  };
  Sidebar.prototype.open = function() {
    console.log('打开sidebar')
    // 先删除之前的class
    classie.remove(this.el, 'sidebar-move-left');
    classie.remove(this.closeBarEl, 'closeBar-move-right');
    // 再添加新的class
    classie.add(this.el, 'sidebar-move-right');
    classie.add(this.closeBarEl, 'closeBar-move-left');
    this.state = 'opened';
  };

  // 管理打开和关闭状态
  Sidebar.prototype.triggerSwich = function() {
    if(this.state === 'opened'){
      this.close();
    } else {
      this.open();
    }
  };

  // new一下这个对象
  var sidebar = new Sidebar();

})();
