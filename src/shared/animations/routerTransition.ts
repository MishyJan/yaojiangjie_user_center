import { trigger, state, animate, style, transition } from '@angular/core';

export function appModuleAnimation() {
    return slideFromBottom();
}

export function accountModuleAnimation() {
    return slideFromUp();
}

export function slideFromBottom() {
    return trigger('routerTransition', [
        state('void', style({ transform: 'translateY(20px)', opacity: '0' })),
        state('*', style({ transform: 'translateY(0px)', opacity: '1' })),
        transition(':enter', [
            animate('0.45s ease-out', style({ opacity: '1', transform: 'translateY(0px)' }))
        ])
    ]);
}

export function slideFromUp() {
    return trigger('routerTransition', [
        state('void', style({ transform: 'translateY(-20px)', opacity: '0' })),
        state('*', style({ transform: 'translateY(0px)', opacity: '1' })),
        transition(':enter', [
            animate('0.45s ease-out', style({ opacity: '1', transform: 'translateY(0px)' }))
        ])
    ]);
}