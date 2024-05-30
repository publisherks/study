import type { GlobalComponent } from '@/plugins/globalComponent';

declare module '@vue/runtime-core' {
    export interface GlobalComponents extends GlobalComponent {}
}
