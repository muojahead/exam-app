<template>
  <div class="back-drop">
    <div class="modal-box">
      <h5 class="modal-title">
        <span><fa :icon="['fas', 'exclamation-circle']"></fa></span> be cerfull
      </h5>
      <button type="button" class="close btn btn-light" @click="ignoreIt">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="modal-body">
        {{ message }}
      </div>
      <div class="actions">
        <button type="button" class="btn btn-success" @click="ignoreIt">
          Stay in
        </button>
        <button type="button" class="btn btn-danger" @click="doIt">
          Leave
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  emits: {
    doIt: {
      type: Function,
      required: true,
    },
    ignoreIt: {
      type: Function,
      required: true,
    },
  },
  methods: {
    doIt() {
      this.$emit("doIt");
    },
    ignoreIt() {
      this.$emit("ignoreIt");
    },
  },
};
</script>

<style lang="scss" scoped>
.back-drop {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.336);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-box {
    width: 100%;
    max-width: 450px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2),
      0px 2px 4px -1px rgba(0, 0, 0, 0.6);
    .modal-title {
      padding: 15px;
      background-color: #323a41;
      width: 100%;
      font-weight: 500;
      font-size: 25px;
      color: #fff;
      font-weight: bold;
      span {
        color: #dc3545;
      }
    }
    .close {
      position: absolute;
      top: 15px;
      right: 15px;
    }
    .actions {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;
      button {
        margin-right: 10px;
        &:first-child {
          background-color: #323a41;
        }
      }
    }
  }
}
</style>
