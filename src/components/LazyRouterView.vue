<!-- 현재 경로 화면 비동기 컴포넌트 -->
<template>
    <RouterView #="{ Component }">
        <VSuspense :is="Component" />
    </RouterView>
</template>
