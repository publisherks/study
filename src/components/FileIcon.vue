<template>
    <i :class="['file-icon', `${classNm}`]" />
</template>

<script lang="ts">
// type
export type Props = {
    /** 파일 타입 */
    type: any;
};
</script>
<script setup lang="ts">
/* eslint-disable */
import { computed } from 'vue';

// props
const { type } = defineProps<Props>();

// variable
const icontype = {
    image: ['png', 'jpg', 'jpeg', 'heic'],
    document: ['pdf','docx','hwp','hwpx','xlsx','csv','pptx','txt'],
    video: ['mov','mp4'],
    zip: ['zip'],
}

// computed
const classNm = computed(() => {
    if(icontype.image.includes(type)){
        return 'fa-sharp fa-regular fa-file-image';
    }
    if(icontype.document.includes(type)){
        return 'fa-sharp fa-regular fa-file-lines';
    }
    if(icontype.video.includes(type)){
        return 'fa-sharp fa-regular fa-file-video';
    }
    if(icontype.zip.includes(type)){
        return 'fa-sharp fa-regular fa-file-zip';
    }
});
</script>