<template>
  <q-page padding>
      <q-btn class="btn" round color="primary" icon="close" href="javascript:history.back()"/>
      <div class="video">
        <iframe
          width="100%"
          height="100%"
          src="https://wolfiex.synology.me:5001/vs/sharing/JssVAHSQ#!bW92aWUtMTkx"
          frameborder="0"
          allowfullscreen
        />
      </div>
  </q-page>
</template>

<script>

export default {
  name: "PeliculaView",
};
</script>

<style>

.video {
  height: calc(100vh - (115px + 16px + 16px));
}

.btn {
  position: absolute;
  float: right;
  right: 3em;
  top: 3em;
}

</style>