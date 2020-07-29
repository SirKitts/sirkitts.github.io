<template>
    <section class="videos">
        <div 
            v-for="(video, index) in videos"
            :key="index">
            <a :href="video.url"><img 
              class="size-thumbnail" alt="" 
              width="246" height="138"
              :src="video.src" /></a>
        </div>
    </section>
</template>

<script>
  export default {
    name: 'videos',
    data() {
      return {
        baseImgUrl: 'http://www.hexsoftstudio.com/images/',
        videos: [
          {
            url: 'https://www.youtube.com/watch?v=uETBm4Ocvfk',
            src: 'https://i.ytimg.com/vi/uETBm4Ocvfk/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCrBtt7XjDyXgE5PaLlcK5VcshjNg'
          },
          {
            url: 'https://www.youtube.com/watch?v=EtzGpKJ1DG0',
            src: 'https://i.ytimg.com/vi/EtzGpKJ1DG0/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCP4ViT2icaRCzFP0ktUkgrEQQFLg'
          },
          {
            url: 'https://www.youtube.com/watch?v=kvaGQk-0ClM',
            src: 'https://i.ytimg.com/vi/kvaGQk-0ClM/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDU1g5jX2WubQAlOIy4e8524SXbsA'
          },
          {
            url: 'https://www.youtube.com/watch?v=sQInjRL6iG8',
            src: 'https://i.ytimg.com/vi/sQInjRL6iG8/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAH41rn9Q8LtnOrAjBYjrF3xCD3Xw'
          }
        ]
      }
    }
  }
</script>

<style scoped>
.videos {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.size-thumbnail {
    padding: 5px 5px;
}
</style>
