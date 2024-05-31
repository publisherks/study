<!--
    Button 컴포넌트

    1. attrs
    1) disabled (boolean) : 비활성화 여부 (default : false)

    2. props (* : 필수)
    1) type ('button' | 'submit' | 'reset') : 유형 (default : 'button')
    2) kind (ButtonType : '@/mappings/enum') : 구분 (default : ButtonType.Main)
    3) large (boolean) : 큰 버튼 여부 (default : false)
    4) table (boolean) : 테이블 버튼 여부 (default : false)

    3. slots
    1) default : 버튼 텍스트
-->
<template>
    <VTitle sub>
        - Default Buttons
    </VTitle>
    <VFlex class="mb-30">
        <VRow cols="1">
            <VCol>
                <VBtn
                    class="mr-10"
                    @click="onClick"
                >
                    메인 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Sub"
                    class="mr-10"
                    @click="onClick"
                >
                    서브 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Cancel"
                    class="mr-10"
                    @click="onClick"
                >
                    취소 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Delete"
                    class="mr-30"
                    @click="onClick"
                >
                    삭제 버튼
                </VBtn>
                <VBtn
                    class="mr-10"
                    disabled
                    @click="onClick"
                >
                    메인 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Sub"
                    class="mr-10"
                    disabled
                    @click="onClick"
                >
                    서브 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Cancel"
                    class="mr-10"
                    disabled
                    @click="onClick"
                >
                    취소 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Delete"
                    disabled
                    @click="onClick"
                >
                    삭제 버튼
                </VBtn>
            </VCol>
        </VRow>
    </VFlex>

    <VTitle sub>
        - Small Buttons
    </VTitle>
    <VFlex class="mb-30">
        <VRow cols="1">
            <VCol>
                <VBtn
                    sm
                    class="mr-10"
                    @click="onClick"
                >
                    메인 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Sub"
                    sm
                    class="mr-10"
                    @click="onClick"
                >
                    서브 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Cancel"
                    sm
                    class="mr-10"
                    @click="onClick"
                >
                    취소 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Delete"
                    sm
                    class="mr-30"
                    @click="onClick"
                >
                    삭제 버튼
                </VBtn>
                <VBtn
                    sm
                    class="mr-10"
                    disabled
                    @click="onClick"
                >
                    메인 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Sub"
                    sm
                    class="mr-10"
                    disabled
                    @click="onClick"
                >
                    서브 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Cancel"
                    sm
                    class="mr-10"
                    disabled
                    @click="onClick"
                >
                    취소 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Delete"
                    sm
                    disabled
                    @click="onClick"
                >
                    삭제 버튼
                </VBtn>
            </VCol>
        </VRow>
    </VFlex>

    <!--
    <VTitle sub>
        - Large Buttons
    </VTitle>

    <VFlex class="mb-30">
        <VRow :cols="1">
            <VCol class="mb-10">
                <VBtn
                    large
                    class="mr-10"
                    @click="onClick"
                >
                    메인 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Sub"
                    large
                    class="mr-10"
                    @click="onClick"
                >
                    서브 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Cancel"
                    large
                    class="mr-10"
                    @click="onClick"
                >
                    취소 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Delete"
                    large
                    @click="onClick"
                >
                    삭제 버튼
                </VBtn>
            </VCol>
            <VCol>
                <VBtn
                    large
                    class="mr-10"
                    disabled
                    @click="onClick"
                >
                    메인 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Sub"
                    large
                    class="mr-10"
                    disabled
                    @click="onClick"
                >
                    서브 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Cancel"
                    large
                    class="mr-10"
                    disabled
                    @click="onClick"
                >
                    취소 버튼
                </VBtn>
                <VBtn
                    :kind="ButtonType.Delete"
                    large
                    disabled
                    @click="onClick"
                >
                    삭제 버튼
                </VBtn>
            </VCol>
        </VRow>
    </VFlex>
    -->
</template>

<script setup lang="ts">
import { ButtonType } from '@/mappings/enum';

// event
/**
 * 버튼 클릭 시
 * @param event 이벤트 정보
 */
const onClick = (event: MouseEvent) => console.log(event); // eslint-disable-line no-console
</script>
