# jsOrientObject
function UpdateData(id, value, parentEle) {
  this.id = id
  this.value = value
  this.parentEle = parentEle
  this.initValue = value

  this.initElements()
  this.initEvents()
}
UpdateData.prototype = {
  constructor: UpdateData,
  /**
   * 初始化所有元素
   */
  initElements() {
    this.txtEle = $("<span/>")
    this.txtEle.text(this.value)

    this.textEle = $("<input type='text'/>")
    this.textEle.val(this.value)

    this.btnDiv = $("<div style='display:inline;'/>")
    this.saveBtn = $("<input type='button' value='保存'/>")
    this.cancelBtn = $("<input type='button' value='取消'/>")
    this.btnDiv.append(this.saveBtn).append(this.cancelBtn)

    this.parentEle.append(this.txtEle).append(this.textEle).append(this.btnDiv)

    this.convertToReadable()
  },
  /**
   * 切换到查看模式
   */
  convertToReadable() {
    this.txtEle.show()
    this.textEle.hide()
    this.btnDiv.hide()
  },
  /**
   * 初始化所有事件
   */
  initEvents() {
    var this_ = this
    this.txtEle.on('click', function(event) {
      this_.convertToEditable()
    })
    this.cancelBtn.on('click', function() {
      this_.cancel()
    })
    this.saveBtn.on('click', function() {
      this_.save()
    })
  },
  /**
   * 切换到编辑模式
   */
  convertToEditable() {
    this.txtEle.hide()
    this.textEle.show()
    this.textEle.focus()
    if (this.getValue() === this.initValue) {
      this.textEle.val("")
    }
    this.btnDiv.show()
  },
  /**
   * 点击保存
   */
  save() {
    this.setValue(this.textEle.val())
    this.txtEle.html(this.getValue().replace(/\n/g, "<br/>"))
      // 把回车替换为<br/>,g --- 一直到最后一个
    this.convertToReadable()
  },
  cancel() {
    this.textEle.val(this.getValue())
    this.convertToReadable()
  },
  setValue(value) {
    this.value = value
  },
  getValue() {
    return this.value
  }
}

function UpdateAreaData(id, value, parentEle) {
  UpdateAreaData._proto_.constructor.call(this, id, value, parentEle)
}
extend(UpdateAreaData, UpdateData)
UpdateAreaData.prototype.initElements = function() {
  this.txtEle = $("<span/>")
  this.txtEle.text(this.value)

  this.textEle = $("<textarea style='width:315px;height:70px;'/>")
  this.textEle.val(this.value)

  this.btnDiv = $("<div style='display:block;'/>")
  this.saveBtn = $("<input type='button' value='保存'/>")
  this.cancelBtn = $("<input type='button' value='取消'/>")
  this.btnDiv.append(this.saveBtn).append(this.cancelBtn)

  this.parentEle.append(this.txtEle).append(this.textEle).append(this.btnDiv)

  this.convertToReadable()
}

function extend(subClass, superClass) {
  var F = function() {}
  F.prototype = superClass.prototype
    // 子类的prototype指向F的_proto_,_proto_又指向父类的prototype
  subClass.prototype = new F()
    // 在子类上存储一个指向父类prototype的属性，便于子类的构造方法中与父类的名称解耦 使用
    // subClass._proto_.constructor.call 代替superClass.call  
  subClass._proto_ = superClass.prototype
}
