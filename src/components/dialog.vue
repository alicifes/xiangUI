<template>
  <transition name="dialog-fade">
    <!-- @click.self避免冒泡，只有点击自己时才能触发   -->
    <!-- 第一个是对话框的遮罩,设置整体是否可见-->
    <div class="xiang-dialog_wrapper" v-show="visible" @click.self="handleClose">
      <!-- 真正的对话框   -->
      <div class="xiang-dialog" :style="{width:width,marginTop:top}">
        <div class="xiang-dialog_header">
          <slot name="title">
            <!-- 将span放到slot内，这样不仅可以定义title文本，还可以定义样式等 -->
            <!--这里面是提示 使用v-slot进行绑定title也可以执行-->
          <span class="xiang-dialog_title">
            {{title}}
          </span>
          </slot>
          <!--在点击处理之后关闭-->
          <button class="xiang-dialog_headerbtn" @click="handleClose">
            <i class="xiang-icon-close"></i>
          </button>
        </div>
        <div class="xiang-dialog_body">
          <!-- 内容可能是除span以外的其他内容，比如列表等，所以在这里使用插槽，并且不规定插槽内具体的标签 -->
          <!-- 并且在这里使用匿名插槽，使用匿名插槽的好处就是不用指定名称，这样在不使用<template v-slot>指定插槽内容的时候，也可以自定义内容 -->
          <!-- dialog内部的内容,内部什么东西都可可以写-->
          <slot></slot>
        </div>
        <div class="xiang-dialog_footer">
          <!-- 如果footer不传递内容，则不显示footer  使用实名slot,v-slot:footer -->
          <slot name="footer" v-if="$slots.footer">
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name:'xiangDialog',
  components: {
  },
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width: {  //接收传进来的值宽度
      type: String,
      default: '50%'
    },
    top: {    //接收传进来的高度
      type: String,
      default: '15vh'   //总共的高度为100vh
    },
    footer: {
      type: Object
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    handleClose () {
      //子组件无法改变父组件的visible
      //这里使用sync修饰符做语法糖
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.xiang-dialog_wrapper{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0,0,0,0.5);

  .xiang-dialog{
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    box-sizing: border-box;
    width: 30%;
    &_header{
      padding: 20px 20px 10px;
      .xiang-dialog_title{
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .xiang-dialog_headerbtn{
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        .xiang-icon-close{
          color:909399
        }
      }
    }
    &_body{
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    &_footer{
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      ::v-deep .xiang-button:first-child{
        margin-right: 20px;
      }
    }
  }
}
.dialog-fade-enter-active{
  animation: fade .3s;
}
.dialog-fade-leave-active{
  animation: fade .3s reverse;
}
@keyframes fade{
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
</style>