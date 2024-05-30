<!-- 파일 업로드 컴포넌트 -->
<template>
    <Form
        :invalid="invalid || !isValid"
        :leftLabel
        :required
        class="upload-wrap"
    >
        <template
            v-if="hasLabel"
            #label
        >
            <slot name="label" />
        </template>
        <div
            ref="uploadFileElement"
            class="upload-file"
        >
            <VBtn
                :kind="buttonType"
                class="mr-10"
                @click="onOpen()"
            >
                <slot>찾기</slot>
            </VBtn>
            <div class="input-box">
                <input
                    class="file-input"
                    type="text"
                    :value="info"
                    :placeholder
                    readonly
                />
            </div>
            <span
                v-if="multiple"
                class="info-text"
            >
                등록된 파일 수 :
                <strong>{{ comma(currentFiles.length) }}</strong>
            </span>
        </div>
    </Form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDropZone, useFileDialog, useArrayIncludes, isDefined } from '@vueuse/core';

import type { Props as ButtonProps } from '@/components/form/Button.vue';
import Form from '@/components/form/container/Default.vue';
import type { Props as InputProps } from '@/components/form/input/Default.vue';

import useSlots from '@/global/useSlots';

import { ButtonType } from '@/mappings/enum';
import type { Nullable, NullableHTMLElement, UploadFile } from '@/mappings/types/common';

import useMessageStore from '@/stores/message';

import isValidFile from '@/utils/file/isValid';
import comma from '@/utils/format/comma';
import fileSize from '@/utils/format/fileSize';

// type
type Props = Pick<InputProps, 'placeholder' | 'invalid' | 'leftLabel' | 'required' | 'invalidMessage'> & {
    /** 허용하는 파일 유형 */
    accept?: string;

    /** 디렉토리 업로드 여부 */
    directory?: boolean;

    /** 여러 파일 업로드 여부 */
    multiple?: boolean;

    /** 버튼 구분 */
    buttonType?: ButtonProps['kind'];
};
type Emits = {
    /** 파일 업로드 */
    upload: [file: UploadFile];
};

// props
const {
    placeholder = '파일을 선택해주세요.',
    accept,
    directory,
    invalid,
    leftLabel,
    multiple,
    required,
    buttonType = ButtonType.Sub1,
    invalidMessage = '유효한 파일이 아닙니다.',
} = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// refs
const uploadFileElement = ref<NullableHTMLElement<HTMLDivElement>>(null);

// global
const { files: dropFiles } = useDropZone(uploadFileElement, {
    dataTypes: [accept ?? ''],
    onDrop(drops, event) {
        const files = (event.dataTransfer?.files ?? null);

        if (multiple || !files || files.length <= 1) {
            upload(files);

            return;
        }

        dropFiles.value = null;
    },
});
const { files, open: onOpen, reset, onChange } = useFileDialog({
    accept,
    directory,
    multiple,
});
const { hasSlots } = useSlots();

// store
/** 메시지 */
const messageStore = useMessageStore();

// computed
/** 현재 파일 목록 */
const currentFiles = computed(() => (dropFiles.value ?? (isDefined(files) ? Array.from(files.value) : [])));
/** 라벨 존재 여부 */
const hasLabel = useArrayIncludes(hasSlots, 'label');
/** 정보 */
const info = computed(
    () => currentFiles.value.map(({ name, size }) => `${name} (${fileSize(size)})`)
        .join(', '),
);
/** 유효성 여부 */
const isValid = computed(() => (!accept || currentFiles.value.every((file) => isValidFile(file, accept))));

// method
/**
 * 파일 업로드
 * @param files 파일 목록
 */
const upload = (files: Nullable<FileList>) => {
    // 유효한 파일인 경우
    if (isValid.value) {
        // 파일 업로드
        emit('upload', multiple ? files : files?.[0]);

        return;
    }

    // 유효하지 않는 파일인 경우 메시지 표시
    messageStore.$patch({
        isShow: true,
        message: invalidMessage,
    });

    // 초기화
    reset();

    dropFiles.value = null;
};

// event
/**
 * 파일 변경 시
 */
onChange((files) => {
    dropFiles.value = null;

    upload(files);
});
</script>
